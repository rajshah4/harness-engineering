# ODSC Harness Engineering: current headline story

Synced from the working Markdown deck. Stable IDs preserve source identity when slides move.

## Opening

1. `[001]` **Engineering the Harness: A Practical Workshop**

2. `[003]` **Coding agents now complete tasks instead of suggesting code**

3. `[004]` **An agent combines a model with a harness**

4. `[NEW: agent-canvas-run]` **The harness supplies context and executes the model's tool requests**

5. `[006]` **The harness is everything outside the model**

6. `[057]` **Claude Code shows how complex a modern harness has become**

7. `[008]` **Claude Code adoption rose while Cursor and Copilot fell**

8. `[009]` **Model providers now ship their own harnesses**

9. `[010]` **Provider harnesses are good enough for general software tasks**

10. `[011]` **Why look beyond the model providers?**

11. `[NEW: why-alternatives]` **Provider harnesses make the engineering choices for you**

12. `[091]` **Where memory lives affects how easily you can change harnesses**

13. `[NEW: existing-harness-starting-point]` **An existing harness is a starting point for testing better choices**

14. `[012]` **Six harness choices organize the workshop**

## Workshop 1: Harness choice

15. `[013]` **What changes when the model stays fixed?**

16. `[014]` **Where will the runs diverge first?**

17. `[015]` **A simple harness gives the model tools, feedback, and another turn**

18. `[017]` **Harness performance varied by 18 points with the same model**

19. `[019]` **Harnesses changed completion, process quality, and cost**

20. `[018]` **No harness led on accuracy, speed, and token use**

21. `[016]` **A custom data harness improved accuracy while cutting cost**

22. `[NEW: harvey-harness-result]` **A document-review harness raised average rubric pass rate by 39 points**

23. `[NEW: harvey-harness-mechanism]` **The harness divided the reading and kept findings available for synthesis**

24. `[NEW: model-harness-coadaptation]` **Models learn the harness they train against**

25. `[058]` **Small harness changes degraded production coding quality**

26. `[197]` **Identical runs changed the outcome about one time in ten**

27. `[022]` **Open-source harnesses are already widely used**

28. `[024]` **Two harnesses make dozens of different decisions**

29. `[025]` **Trace one decision back to the harness**

30. `[026]` **The harness changed cost far more than it changed quality**

31. `[NEW: workshop-1-debrief]` **A useful comparison isolates the harness decision**

32. `[NEW: harness-improvement-method]` **A harness change needs a repeatable comparison**

33. `[NEW: pi-cache-intervention]` **Cache markers reduced fresh input in the Pi rerun**

## Workshop 2: Tool design

34. `[029]` **The first way people improve an agent is to add tools**

35. `[030]` **Tools turn model decisions into real actions**

36. `[034]` **Which tool surface earns its place?**

37. `[NEW: workshop-2-prediction]` **What should the harness expose first?**

38. `[NEW: workshop-2-result]` **One task-shaped tool beat both the terminal and a broad catalog**

39. `[NEW: workshop-2-mechanism]` **The task-shaped tool removed a predictable retrieval loop**

40. `[NEW: workshop-2-reversal]` **Specialized tools earn their place on repeated, bounded work**

41. `[031]` **Growing tool catalogs forced better ways to describe tools**

42. `[033]` **The same capability behaves differently through an API, MCP, or CLI**

43. `[NEW: edit-format]` **The edit format changes how often the agent must retry**

44. `[032]` **Tool search keeps unused definitions out of the prompt**

45. `[150]` **Uber moved tool definitions out of the initial prompt**

46. `[196]` **Large tool catalogs can consume the context before work begins**

47. `[038]` **One program can replace thousands of tool definitions**

48. `[151]` **Uber moved repetitive polling out of the model loop**

49. `[205]` **The scaffold changed cost by two orders of magnitude**

50. `[NEW: untrusted-tool-results]` **Tool results create a new trust boundary**

51. `[035]` **Inspect the tool path in Agent Canvas**

52. `[036]` **More tools added cost while most browser actions failed**

53. `[NEW: tool-evaluation-levels]` **A valid tool call can still leave the task unfinished**

54. `[NEW: workshop-2-debrief]` **Tool quality depends on the work compressed behind the interface**

## Workshop 3: Context, working state, and memory

55. `[040]` **How much context should the harness save?**

56. `[NEW: workshop-3-prediction]` **Which context policy will survive the external verifier?**

57. `[NEW: workshop-3-result]` **Stale context was worse than forgetting**

58. `[NEW: workshop-3-mechanism]` **The stale instruction changed the architecture and the tests**

59. `[NEW: workshop-3-reversal]` **Curated context improved the process, not the outcome**

60. `[041]` **A saved fact still needs a loading rule**

61. `[042]` **The same task needs information at different lifetimes**

62. `[NEW: context-state-hierarchy]` **Agent state can live at several distances from the next call**

63. `[044]` **The harness assembles the next model call**

64. `[NEW: tools-to-context]` **Tool calls compete for space in the context window**

65. `[046]` **Retrieval brings the next useful evidence into context**

66. `[050]` **A million-token window still fills**

67. `[051]` **Long contexts lose accuracy before they reach the limit**

68. `[053]` **More conversation can make important facts harder to use**

69. `[055]` **Stronger models were supposed to need shorter prompts**

70. `[056]` **System prompts kept getting longer**

71. `[NEW: context-budget-stack]` **Average context per call varied across harnesses**

72. `[047]` **Every extra instruction competes with the task for attention**

73. `[064]` **Working state lets a fresh session resume the task**

74. `[043]` **Memory can live outside the model's working context**

75. `[NEW: summarization]` **A useful summary preserves the information needed to continue**

76. `[NEW: compaction-preservation-policy]` **Compaction needs a policy for what stays exact**

77. `[NEW: repeated-compaction-drift]` **Repeated summaries can erase a requirement**

78. `[060]` **Reset and compaction recover active context**

79. `[061]` **Compaction cut the cost of long OpenHands sessions**

80. `[NEW: prompt-caching]` **Compaction can save tokens while reducing cache reuse**

81. `[063]` **A larger window still needs checkpoints and retrieval**

82. `[065]` **Files preserve working state better than chat history**

83. `[068]` **LangChain writes plans outside the model context**

84. `[071]` **Durable memory carries useful guidance into future tasks**

85. `[073]` **AGENTS.md became the shared instruction file for coding agents**

86. `[074]` **Every line in AGENTS.md adds cost to every prompt**

87. `[102]` **One repository needs one shared source of instructions**

88. `[103]` **Repository facts transfer, but model-specific prompts do not**

89. `[075]` **Auto-generated AGENTS.md reduced success and raised cost**

90. `[076]` **Instruction files accumulate duplication and stale rules**

91. `[077]` **Context files changed workflow more than correctness in 288 runs**

92. `[078]` **Observed failures should determine what enters durable memory**

93. `[079]` **Anthropic removed 80% of Claude Code's system prompt**

94. `[059]` **LangChain cut its base prompt from 6K to 2K tokens**

95. `[080]` **Codex is building memory beyond AGENTS.md**

96. `[081]` **Skills load procedures only when the task needs them**

97. `[082]` **Curated skills raised average pass rate by 16.6 points**

98. `[084]` **One in six skills reduced performance**

99. `[NEW: memory-social-scope]` **Shared memory needs a scope before the agent retrieves it**

100. `[NEW: memory-writers]` **Only trusted sources should write durable memory**

101. `[090]` **Skills need evaluation before they become memory**

102. `[094]` **Give each fact a home and a loading rule**

103. `[095]` **The safer policy starts with no saved context**

104. `[NEW: workshop-3-debrief]` **Durable guidance should earn its place one line at a time**

## Workshop 4: Model routing

105. `[096]` **The model can change at every step**

106. `[097]` **When has the cheaper route earned another attempt?**

107. `[098]` **Route these two tasks**

108. `[NEW: workshop-4-repeated-result]` **Routing preserved 12 passes while cutting the bill by 41.5%**

109. `[NEW: workshop-4-task-risk]` **The cheap model solved the race but missed the security requirement**

110. `[NEW: routing-policy-design-space]` **A router can choose before, during, or after an attempt**

111. `[099]` **New evidence can change the model choice**

112. `[100]` **Routing balances quality against cost for each request**

113. `[108]` **Serving choices change behavior behind the same model name**

114. `[109]` **Two cheap attempts beat one expensive attempt on this task**

115. `[111]` **The stronger model spent more effort checking its work**

116. `[106]` **Execution failures provide better routing signals than the request alone**

117. `[107]` **The adaptive cascade escalated four times and still missed a requirement**

118. `[112]` **Write the route before seeing the trace**

119. `[113]` **The stronger model fixed one result but doubled the time**

120. `[NEW: workshop-4-debrief]` **A routing policy needs a failure signal it can trust**

## Workshop 5: Completion, recovery, and stopping

121. `[114]` **Routing needs a loop that can produce trustworthy evidence**

122. `[115]` **What evidence lets the harness declare the goal complete?**

123. `[NEW: efficiency-needs-completion-evidence]` **Fewer tokens can mean less work completed**

124. `[116]` **A completion contract specifies evidence and terminal states**

125. `[NEW: workshop-5-ceiling]` **Independent validation added cost after the agent already passed 8/8**

126. `[NEW: workshop-5-repair-cost]` **Two repair rounds improved Pi from 4/9 to 6/9 at 11.4 times the tokens**

127. `[NEW: durable-goal-budget]` **The goal needs a budget that survives individual model calls**

128. `[117]` **An agent loop needs a budget and an external stop rule**

129. `[118]` **Long-running work needs state that survives a fresh session**

130. `[123]` **A coding agent can take hundreds of actions for one request**

131. `[066]` **Scratchpad use best predicted long-run survival**

132. `[067]` **Every model eventually failed during a 20M-token run**

133. `[127]` **Long tasks fail safely when progress survives the failure**

134. `[129]` **External evidence should define when the agent is done**

135. `[135]` **Evidence gates eliminated unsupported completion claims**

136. `[133]` **Factory gave completion control to a separate validator**

137. `[134]` **The implementer never saw the grading instrument**

138. `[136]` **Blind retries repeat the failure without learning from it**

139. `[137]` **Blind retries still built a C compiler**

140. `[125]` **Less instruction can force the agent to inspect the evidence**

141. `[NEW: hooks]` **Hooks enforce rules outside the model**

142. `[142]` **Tests written after the code can repeat the agent's mistake**

143. `[143]` **System constraints turn architecture rules into executable checks**

144. `[146]` **Approval friction should match the blast radius**

145. `[147]` **The agent can game the check you gave it**

146. `[152]` **Write the continuation contract**

147. `[153]` **Independent validation improved one task but not the other**

148. `[NEW: workshop-5-debrief]` **The next attempt needs evidence and a stopping rule**

## Workshop 6: Multi-agent systems

149. `[154]` **A second agent buys another context window at a high price**

150. `[155]` **Does this work separate cleanly enough for another agent?**

151. `[156]` **Choose an architecture for each task**

152. `[157]` **Multiple agents need work that separates cleanly**

153. `[158]` **Parallel agents add context and coordination at the same time**

154. `[162]` **Subagents can keep unrelated work out of the main context**

155. `[167]` **A 90.2% research lift used about 15 times the tokens**

156. `[169]` **With equal compute, one agent won six of eight comparisons**

157. `[172]` **More agents hurt once coordination outweighed the work**

158. `[170]` **Multi-agent systems work best with narrow, testable handoffs**

159. `[171]` **Serial handoffs erase the benefit of parallel work**

160. `[174]` **Dynamic workflows help only when the task has clean boundaries**

161. `[175]` **Define the handoff before adding the agent**

162. `[176]` **More agents recovered omissions, then plateaued**

163. `[NEW: workshop-6-debrief]` **Delegation needs a boundary and an owner for the result**

## Close

164. `[NEW: harness-update-regression]` **A harness update needs to preserve behavior that already worked**

165. `[177]` **A good harness can beat a larger model**

## Reserves

166. `[NEW: state-independent-compute]` **Durable agent state can outlive the machine doing the work**

167. `[NEW: openjarvis-system-search]` **Local-agent optimization can change several layers together**

168. `[072]` **Durable memory should survive the task**

169. `[002]` **Engineering the Harness: A Practical Workshop**

170. `[007]` **A harness is everything outside the model**

171. `[020]` **ARC-AGI-3 · SAME GPT-5.6 SOL MODEL**

172. `[021]` **NVIDIA AVO · CUSTOM HARNESS FOR KERNEL OPTIMIZATION**

173. `[027]` **Harnesses carry technical debt**

174. `[028]` **PRODUCTION CODING AGENTS · TECHNICAL DEBT**

175. `[037]` **Retrieval is another import tool**

176. `[045]` **CONTEXT PLACEMENT**

177. `[049]` **Coding agents struggle with long context models**

178. `[052]` **Key facts disappear inside long model inputs**

179. `[054]` **Are you excited about 10M Context Windows?**

180. `[062]` **Layer 1: How does Codex do it???**

181. `[069]` **Extreme Layer 2: Recursive Language Models (RLM)**

182. `[070]` **RLMs maintain accuracy at 1M tokens.**

183. `[083]` **SKILLS CAN HARM**

184. `[085]` **Skills as Externalized Expertise**

185. `[086]` **Skills can replace Code**

186. `[087]` **Building a learning loop with skills**

187. `[088]` **Continual learning outer loop with skills**

188. `[089]` **Generic skills beat personalized skills.**

189. `[092]` **Constant Innovation around Memory**

190. `[093]` **Memory & Claude**

191. `[104]` **Example: Splitting by Role**

192. `[110]` **Oracle routing lifted 94.2% to 97.4%.**

193. `[120]` **Engineering the Loop**

194. `[121]` **We no longer rely on single-shot execution.**

195. `[122]` **We no longer rely on single-shot execution.**

196. `[126]` **Capability is rising faster than reliability.**

197. `[128]` **95% per step becomes 60% over ten steps.**

198. `[130]` **Build the benchmark before the model.**

199. `[131]` **Uber Engineering, Aug. 27, 2026**

200. `[132]` **FACTORY · PROGRAMBENCH**

201. `[138]` **Cognitive Discipline via JSON Schema and Plan**

202. `[139]` **Moving from Ralph Wiggum to AutoResearch**

203. `[140]` **An Improved Loop for AutoResearch**

204. `[144]` **Safety & Friction: Sandboxes**

205. `[145]` **Safety & Friction: Sandboxes**

206. `[148]` **The "offline" sandbox still had a route to the web.**

207. `[149]` **Principles for Agentic Loop**

208. `[160]` **Who’s using a multi-agent for coding?**

209. `[161]` **Single agents degrade as complexity grows.**

210. `[163]` **Multi-Agent is like Distributed Systems: Complex!**

211. `[164]` **Many ways to orchestrate multiple agents**

212. `[165]` **DYNAMIC WORKFLOWS**

213. `[166]` **DYNAMIC WORKFLOWS · BUN PORT**

214. `[168]` **BENCHAGENT**

215. `[173]` **Multi-Agent critics using reflection**

216. `[178]` **Appendix: Harnesses may eventually self-improve.**

217. `[179]` **The harness can learn from failure without changing the model.**

218. `[180]` **Appendix: Context may eventually tune itself.**

219. `[181]` **Externalize process**

220. `[183]` **Specs for software development**
