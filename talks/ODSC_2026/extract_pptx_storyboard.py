#!/usr/bin/env python3
"""Extract a PPTX into a deliberately simple Markdown storyboard.

Each slide becomes: heading, body, one dominant embedded image, and citations.
The original slide number is kept in an HTML comment for later synchronization.
"""

from __future__ import annotations

import argparse
import html
import posixpath
import re
import shutil
import zipfile
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from urllib.parse import urlparse
from xml.etree import ElementTree as ET


NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pr": "http://schemas.openxmlformats.org/package/2006/relationships",
}


@dataclass
class TextBlock:
    text: str
    x: int
    y: int
    cx: int
    cy: int
    placeholder: str
    links: list[str]


@dataclass
class Picture:
    rel_id: str
    x: int
    y: int
    cx: int
    cy: int

    @property
    def area(self) -> int:
        return self.cx * self.cy


def q(prefix: str, name: str) -> str:
    return f"{{{NS[prefix]}}}{name}"


def rels_for(zf: zipfile.ZipFile, part: str) -> dict[str, tuple[str, str]]:
    p = PurePosixPath(part)
    rel_path = str(p.parent / "_rels" / f"{p.name}.rels")
    try:
        root = ET.fromstring(zf.read(rel_path))
    except KeyError:
        return {}
    result = {}
    for rel in root.findall("pr:Relationship", NS):
        result[rel.attrib["Id"]] = (
            rel.attrib.get("Target", ""),
            rel.attrib.get("TargetMode", "Internal"),
        )
    return result


def resolve_part(source_part: str, target: str) -> str:
    return posixpath.normpath(posixpath.join(posixpath.dirname(source_part), target))


def slide_parts_in_order(zf: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(zf.read("ppt/presentation.xml"))
    rels = rels_for(zf, "ppt/presentation.xml")
    parts = []
    for sld_id in root.findall(".//p:sldId", NS):
        rid = sld_id.attrib.get(q("r", "id"))
        if rid and rid in rels:
            parts.append(resolve_part("ppt/presentation.xml", rels[rid][0]))
    return parts


def xfrm_bounds(node: ET.Element) -> tuple[int, int, int, int]:
    xfrm = node.find(".//a:xfrm", NS)
    if xfrm is None:
        return (0, 0, 0, 0)
    off = xfrm.find("a:off", NS)
    ext = xfrm.find("a:ext", NS)
    return (
        int(off.attrib.get("x", 0)) if off is not None else 0,
        int(off.attrib.get("y", 0)) if off is not None else 0,
        int(ext.attrib.get("cx", 0)) if ext is not None else 0,
        int(ext.attrib.get("cy", 0)) if ext is not None else 0,
    )


def clean_text(value: str) -> str:
    value = html.unescape(value).replace("\u00a0", " ")
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def text_from_shape(shape: ET.Element, slide_rels: dict[str, tuple[str, str]]) -> TextBlock | None:
    paras: list[str] = []
    links: list[str] = []
    for paragraph in shape.findall(".//a:p", NS):
        chunks: list[str] = []
        for run in paragraph.findall("a:r", NS):
            text = "".join((t.text or "") for t in run.findall("a:t", NS))
            chunks.append(text)
            props = run.find("a:rPr", NS)
            if props is not None:
                click = props.find("a:hlinkClick", NS)
                if click is not None:
                    rid = click.attrib.get(q("r", "id"))
                    if rid in slide_rels and slide_rels[rid][1] == "External":
                        links.append(slide_rels[rid][0])
        # Some generators place text outside explicit runs.
        if not chunks:
            chunks = [t.text or "" for t in paragraph.findall(".//a:t", NS)]
        line = clean_text("".join(chunks))
        if line:
            paras.append(line)
    text = clean_text("\n".join(paras))
    if not text:
        return None
    ph = shape.find(".//p:nvPr/p:ph", NS)
    placeholder = ph.attrib.get("type", "") if ph is not None else ""
    x, y, cx, cy = xfrm_bounds(shape)
    return TextBlock(text, x, y, cx, cy, placeholder, links)


def slide_content(zf: zipfile.ZipFile, part: str) -> tuple[list[TextBlock], list[Picture], list[str]]:
    root = ET.fromstring(zf.read(part))
    rels = rels_for(zf, part)
    blocks = [
        block
        for shape in root.findall(".//p:sp", NS)
        if (block := text_from_shape(shape, rels)) is not None
    ]
    pictures: list[Picture] = []
    for pic in root.findall(".//p:pic", NS):
        blip = pic.find(".//a:blip", NS)
        rid = blip.attrib.get(q("r", "embed")) if blip is not None else None
        if rid:
            pictures.append(Picture(rid, *xfrm_bounds(pic)))
    external = [target for target, mode in rels.values() if mode == "External"]
    return blocks, pictures, external


def is_citation_text(text: str) -> bool:
    lower = text.lower().strip()
    return (
        lower.startswith(("source:", "sources:", "citation:", "paper:", "read:"))
        or "http://" in lower
        or "https://" in lower
        or "arxiv.org" in lower
    )


def is_footer(text: str) -> bool:
    value = text.strip().lower()
    return bool(re.fullmatch(r"\d+", value)) or value in {"@rajistics", "rajistics"}


def pick_title(blocks: list[TextBlock], slide_number: int) -> tuple[str, TextBlock | None]:
    for block in blocks:
        if block.placeholder in {"title", "ctrTitle"} and not is_footer(block.text):
            return block.text.replace("\n", " "), block
    candidates = [b for b in blocks if not is_citation_text(b.text) and not is_footer(b.text)]
    if candidates:
        top = min(candidates, key=lambda b: (b.y, b.x))
        return top.text.replace("\n", " "), top
    return f"Slide {slide_number}", None


def body_text(blocks: list[TextBlock], title_block: TextBlock | None) -> str:
    body = []
    for block in sorted(blocks, key=lambda b: (b.y, b.x)):
        if block is title_block or is_citation_text(block.text) or is_footer(block.text):
            continue
        if block.placeholder in {"sldNum", "dt", "ftr"}:
            continue
        body.append(block.text)
    # Keep the storyboard readable. Dense chart labels remain in the image itself.
    value = clean_text("\n\n".join(body))
    if len(value) > 1000:
        value = value[:997].rstrip() + "…"
    return value


def citations(blocks: list[TextBlock], external: list[str]) -> list[tuple[str, str]]:
    found: list[tuple[str, str]] = []
    for block in blocks:
        if is_citation_text(block.text):
            urls = re.findall(r"https?://[^\s)>]+", block.text)
            urls.extend(block.links)
            for url in urls:
                found.append((block.text.replace("\n", " "), url.rstrip(".,;")))
    for url in external:
        found.append((urlparse(url).netloc or "Source", url))
    unique = []
    seen = set()
    for label, url in found:
        if url not in seen:
            seen.add(url)
            unique.append((label, url))
    return unique


def copy_dominant_image(
    zf: zipfile.ZipFile,
    slide_part: str,
    pictures: list[Picture],
    output_images: Path,
    slide_number: int,
) -> Path | None:
    if not pictures:
        return None
    rels = rels_for(zf, slide_part)
    valid: list[tuple[Picture, str]] = []
    for picture in pictures:
        if picture.rel_id not in rels:
            continue
        target, mode = rels[picture.rel_id]
        if mode == "External":
            continue
        media_part = resolve_part(slide_part, target)
        if media_part.startswith("ppt/media/"):
            valid.append((picture, media_part))
    if not valid:
        return None
    picture, media_part = max(valid, key=lambda pair: pair[0].area)
    suffix = Path(media_part).suffix.lower() or ".bin"
    destination = output_images / f"slide-{slide_number:03d}{suffix}"
    with zf.open(media_part) as source, destination.open("wb") as sink:
        shutil.copyfileobj(source, sink)
    return destination


def escape_heading(text: str) -> str:
    return clean_text(text).replace("#", "\\#")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pptx", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    image_dir = args.output_dir / "images"
    image_dir.mkdir(exist_ok=True)
    output_md = args.output_dir / "deck.md"

    lines = [
        "# ODSC Harness Engineering — working storyboard",
        "",
        f"Source deck: `{args.pptx.name}`",
        "",
        "Move whole slide blocks to change the order. Edit the heading and body directly. "
        "The hidden source-slide comment lets us sync changes back to the deck later.",
        "",
        "---",
        "",
    ]

    with zipfile.ZipFile(args.pptx) as zf:
        slide_parts = slide_parts_in_order(zf)
        for number, slide_part in enumerate(slide_parts, start=1):
            blocks, pictures, external = slide_content(zf, slide_part)
            title, title_block = pick_title(blocks, number)
            body = body_text(blocks, title_block)
            source_links = citations(blocks, external)
            image = copy_dominant_image(zf, slide_part, pictures, image_dir, number)

            lines.append(f"<!-- source-slide: {number:03d} -->")
            lines.append(f"## {escape_heading(title)}")
            lines.append("")
            if body:
                lines.append(body)
                lines.append("")
            if image:
                lines.append(f"![{escape_heading(title)}](images/{image.name})")
                lines.append("")
            if source_links:
                formatted = "; ".join(f"[{label}]({url})" for label, url in source_links)
                lines.append(f"Source: {formatted}")
                lines.append("")
            lines.extend(["---", ""])

    output_md.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {output_md}")
    print(f"Slides: {len(slide_parts)}")
    print(f"Images: {len(list(image_dir.iterdir()))}")


if __name__ == "__main__":
    main()
