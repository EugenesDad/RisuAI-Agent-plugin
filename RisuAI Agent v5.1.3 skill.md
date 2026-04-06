---
name: risuai-agent
description: >
  Reference guide for developing, debugging, and extending the RisuAI Agent plugin
  (RisuAI_Agent_v5_1_3.js). Use this skill whenever the user asks to modify, fix,
  add features to, or understand the Agent plugin — including the replacer pipeline,
  Step 0 classification, vector search, persona extraction, settings UI, i18n, or
  storage layer. Also use when the user mentions call configs, lorebook writes,
  model calls, or the progress panel. Also triggers for turn recovery, API key
  rotation, prereply prompts, thinking levels, concurrency settings, Director system,
  Continue Chat feature, GitHub Copilot/Grok/OpenRouter/Google Cloud/Vertex AI providers,
  Manual Append, VecModeSwitch, or any ra_ lorebook entries.
---

# RisuAI Agent — Developer Reference (v5.1.3)

> **Token budget**: This file is the single source of truth. Read it fully before touching code.  
> For large subsystems, jump to the relevant section heading.

---

## 1. Architecture at a Glance

```
RisuAI (host app)
│
├── addRisuReplacer("beforeRequest", replacerFn)
│       └── _replacerBody(messages, type)          ← main entry point
│               ├── ensureLangInitialized()         i18n init
│               ├── refreshConfig()                 load settings
│               ├── Card enable/disable check
│               ├── TurnRecoveryManager.checkPending() ← NEW in v5
│               ├── Step 0 (first-run init)
│               │     ├── runStep0Classification()  classify + embed chunks
│               │     └── runPersonaExtraction()    build persona cache
│               ├── performChatCleanup()            prune future lore entries
│               ├── getConversationFromCurrentChat() build context
│               ├── buildScopedExtractorMessages()  per-call prompt assembly
│               ├── callExtractorStrict()           call A/B model
│               ├── writeOutputsForCall()           write to localLore
│               ├── TurnRecoveryManager.markDone()  ← NEW in v5
│               └── mergeToSystemPromptWithRewrite() inject knowledge blocks
│
├── registerSetting() / registerButton()           open settings UI
│       └── renderSettingsUI()                     full settings panel
│
└── ProgressPanel                                  iframe overlay during extraction
```

---

## 2. Settings & Config

### `configCache` — the live config object

Populated by `refreshConfig()` on every replacer invocation. Priority: `safeLocalStorage[SETTING_KEYS[k]]` → `pluginStorage["sync_"+key]` (API keys only) → `getArgument(k)` → `DEFAULTS[k]`.

**All storage keys are versioned**: `SETTING_KEYS = { ...SETTING_KEYS_BASE entries suffixed with "_v5" }`.  
Example: `pse_active_preset` → stored as `pse_active_preset_v5`.

**Critical keys:**
| Key | Type | Purpose |
|-----|------|---------|
| `active_preset` | 1–4 | Which model_calls_N to use (default: **3**) |
| `model_calls` / `model_calls_2/3/4` | JSON string | Array of call configs |
| `persona_calls` | JSON string | Persona extraction calls |
| `card_enable_settings` | JSON string | Per-card enable/disable + preset selection |
| `vector_search_enabled` | 0/1 | Enable semantic search in prompt injection |
| `extractor_a/b_*` | various | Main/Aux model connection config |
| `embedding_*` | various | Embedding model config |
| `advanced_model_anchor_prompt` | string | System prompt for extractor calls |
| `advanced_prefill_prompt` | string | Assistant prefill (Claude/Copilot) |
| `advanced_prereply_prompt` | string | **NEW v5**: Assistant pre-reply prompt |
| `extractor_a/b_thinking_enabled` | 0/1 | **NEW v5**: Enable extended thinking |
| `extractor_a/b_thinking_level` | "low"\|"medium"\|"high" | **NEW v5**: Thinking budget level |
| `extractor_a/b_concurrency` | 0/1 | **NEW v5**: 1=concurrent, 0=sequential |
| `embedding_concurrency` | 0/1 | **NEW v5**: Embedding concurrency |
| `ui_language` | "en"\|"tc"\|"ko" | **NEW v5**: UI language (stored in `pse_ui_language_v5`) |

**Save flow**: UI calls `saveConfigFromUI(formData)` → writes each key to `safeLocalStorage[SETTING_KEYS[k]]` + `setArgument(k)` → calls `refreshConfig()`.

**NEVER overwrite with empty**: `NEVER_EMPTY_OVERWRITE_KEYS` = `advanced_model_anchor_prompt`, `model_calls*`, `persona_calls`, `init_bootstrap_model_anchor_prompt`.

---

## 3. Card Enable Settings

```json
{
  "<charId>": {
    "memory_extract": "1"|"2"|"3"|"4"|"off",
    "vector_search":  "off"|"card_reorg"|"1"|"2",
    "card_disabled":  0|1
  }
}
```

- `memory_extract` selects which `model_calls_N` preset runs.
- `vector_search` = `"card_reorg"` → classify+embed but no semantic injection. `"1"` or `"2"` → full vector search.
- `_currentIsCardReorgEnabled` / `_currentIsNewPreset` set **per replacer call**, reset in `finally`.
- `isKbFeatureEnabled()` returns `_currentIsCardReorgEnabled`.
- `isNewPresetEnabled()` returns `_currentIsNewPreset`.
- **card_reorg + alwaysActive (v5.1 patch)**: When `isKbFeatureEnabled()` is true, `batchUpsertLocalLore` forces all writes to `alwaysActive=true`.

`charId` derivation: `String(char.chaId || char.id || char._id).replace(/[^0-9a-zA-Z_-]/g, "")` or `"name_" + simpleHash(name)`.

---

## 4. Storage Architecture

### 4.1 Scoped Keys Pattern

All persistent data is scoped by character identity **and** storage namespace (`v5`):

```js
const scopeId = getScopeId(char)
const key = makeScopedStorageKey(BASE_KEY, scopeId)
// → "base_key::v5::scopeId"
```

### 4.2 Storage Backends

| Data | Backend | Key pattern |
|------|---------|-------------|
| Static knowledge chunks | `pluginStorage` | `static_knowledge_chunks::v5::scopeId` |
| Step 0 complete flag | `pluginStorage` | `step0_complete::v5::scopeId` |
| Vector cache (index) | `pluginStorage` | `pse_vec_index_v5` |
| Vector cache (per card) | `pluginStorage` | `pse_vec_card_v5:<cardKey>` |
| Persona cache | `pluginStorage` | `pse_persona_cache_v5:<cardKey>` |
| **Turn recovery** | `pluginStorage` | `pse_pending_turn_v5::v5::scopeId` ← **NEW v5** |
| Last req hash / regen skip | `safeLocalStorage` | scoped per char+chat |
| Settings | `safeLocalStorage` | `SETTING_KEYS[k]` (all `_v5` suffixed) |
| API keys (cross-device) | `pluginStorage` | `"sync_" + SETTING_KEYS[k]` |
| UI language | `safeLocalStorage` | `pse_ui_language_v5` |
| OpenRouter models cache | `pluginStorage` | `openrouter_models_cache_v5` / `openrouter_embed_models_cache_v5` |
| Grok models cache | `pluginStorage` | `grok_models_cache_v5` |
| Copilot models cache | `pluginStorage` | `copilot_models_cache_v5` |

### 4.3 Embedding Cache Structure

```js
store = {
  version: 1,
  cards: {
    "<cardKey>": {
      cardName, modelName, updatedAt,
      entries: {
        "chunk|<hash>": { vector: Float[], sourceType, textHash, dims },
        "persona|<hash>": { vector: Float[], name, text, textHash }
      }
    }
  }
}
```

---

## 5. Turn Recovery — NEW in v5

`TurnRecoveryManager` handles recovery from mid-turn crashes or regen interruptions.

```js
TurnRecoveryManager.registerPending(scopeId, chatScopedKey, userMsgCount, cardMemoryPreset)
TurnRecoveryManager.markDone(scopeId)
TurnRecoveryManager.checkPending(scopeId)            // returns pending data or null (180s TTL)
TurnRecoveryManager.isCallAlreadyWritten(call, chat, turnCount)
```

**Flow**: `registerPending()` at extraction start → run calls → `markDone()`.  
Next run: `checkPending()` → skip already-written calls via `isCallAlreadyWritten()`.

---

## 6. API Key Rotation — NEW in v5

Multiple API keys per endpoint (comma/newline separated). Auto-cycles on `429 / Quota Exceeded`.

```js
function _parseKeys(raw)  // raw string → string[]
```

UI shows `🔄 N` badge when N > 1. Applies to `extractor_a_key`, `extractor_b_key`, `embedding_key`.

---

## 7. Model Call Config

### Call Object Shape (after `normalizeModelCall`)

```js
{
  id: string,
  name: string,
  target_model: "A"|"B",
  every_n_turns: number,
  read_dialogue_rounds: number,   // 0 = all
  read_lorebook_names: string,    // comma-separated
  read_persona_names: string,     // comma-separated (new preset only)
  entries: [OutputEntry]
}
```

### OutputEntry Shape

```js
{
  lorebook_name: string,
  write_mode: "append"|"overwrite",
  always_active: boolean,
  output_format: string,
  retention_enabled: boolean,
  retention_after: number,
  retention_keep: number
}
```

### Active Preset

Default is **3** (was 1 in v4). Presets 3/4 = "New Preset" (persona-aware + Director system).  
`_currentIsNewPreset = true` when preset is `"3"` or `"4"`.

### Call Execution Flow

```
isModelCallDue(call, userMsgCount)
→ TurnRecoveryManager.registerPending()
→ buildScopedExtractorMessages()
→ callExtractorStrict()
→ writeOutputsForCall()
→ applyRetentionCleanup()
→ TurnRecoveryManager.markDone()
```

---

## 8. Step 0 — First-Run Initialization

Triggered when `staticDataHash` changes or cache is missing.

**Flow:**
1. Parse char desc + globalNote + lorebook → `chunks[]`
2. CBS-render all content via `normalizeAgentCbsText()`
3. Classify chunks → `ra_instruction | character | information | output_format`
4. If `_newPreset`: run `runPersonaExtraction()`
5. If vector enabled: embed inactive chunks → store in vector cache

**Resume modes** (`step0Pending` storage key):
- `"incomplete"` → resume from saved chunks, skip re-classification
- `"classify_done"` → classification done, re-embed only
- `"reembed"` → embedding model changed, rebuild vectors only

Gated behind **ProgressPanel confirm dialog**. Cancel → `_ppCancelled: true` → `abortMainModelWithAuxError`.

---

## 9. Thinking Mode — NEW in v5

| Config key | Purpose |
|-----------|---------|
| `extractor_a_thinking_enabled` | 0/1 toggle |
| `extractor_a_thinking_level` | `"low"` \| `"medium"` \| `"high"` |
| `extractor_b_thinking_enabled` | 0/1 toggle |
| `extractor_b_thinking_level` | `"low"` \| `"medium"` \| `"high"` |

`thinkingLevelToClaudeBudget(level)` → token budget int.  
When thinking enabled: `temperature` removed from request (Claude/Vertex requirement).

---

## 10. Prereply Prompt — NEW in v5

`advanced_prereply_prompt` — injected after prefill into extractor calls:

```js
[prefillPrompt, prereplyPrompt].filter(Boolean).join("\n")
```

UI label: **"Assistant Pre-Reply Prompt"** in the Common Prompts section (Entries tab).

---

## 11. Prompt Injection Pipeline

`mergeToSystemPromptWithRewrite(messages, payload, queryText, cardMemoryPreset)`:

1. Collect active chunks (category-filtered)
2. Always-active chunks → direct injection
3. `read_lorebook_names` → named entry injection
4. Inactive chunks → vector search or keyword fallback
5. `injectKnowledgeByPlacementRules()` → stable insertion

Vector config: Preset 1 uses `vector_search_*`, Preset 2 uses `vector_search_*_2`. Resolved via `effectiveVecConfig`, reset in `finally`.

---

## 12. Persona Extraction (New Presets 3/4)

Persona cache keys: `ra_persona_inventory_(CharName)` and `ra_character_core_(CharName)` — must come in **pairs**.  
Error key: `err_persona_pair_missing` — requires both `ra_persona_inventory` and `ra_character_core`.

`runPersonaExtraction(char, chunks, strict, {missingOnly})`:
- Filters `category === "character"` chunks, batches 5 → extractor
- Writes to `pse_persona_cache_v5:<cardKey>`
- Embeds → stores as `"persona|<hash>"` in vector cache

`getPersonaContextByVector(messages, char, filterNames)` → top-K persona by cosine similarity.

---

## 13. Director System — NEW in v5.1.2

The Director system (Presets 3/4) adds narrative steering lorebook entries that guide the actor LLM:

| Lorebook Entry | Purpose |
|----------------|---------|
| `ra_director` | `staleness_level` (0–10) + `environment_intervention` suggestion for scene variety |
| `ra_pattern_guard` | Detects `expression_repetition` (0–10), `flagged_cliches`, `banned_phrases`, `variation_hint` |
| `ra_persona_importance` | Per-character ranked facets with `activation_kind`, `stability`, `mode` |
| `ra_turn_advice` | Final writing policy: `response_guard`, `character_routing`, `candidate_hint` |

**Director flow in prompt injection**: `ra_director.environment_intervention` is organically integrated by the actor LLM. `ra_director.loop_signal` (if non-null) is incorporated into `reply_strategy` or `candidate_hint`.

**`ra_director` field rules**:
- `staleness_level`: 0 = completely different scene; 10 = nearly identical to previous turn.
- `environment_intervention`: null when `staleness_level < 5`. Mild shift suggestion at ≥5, stronger pivot at ≥8.

UI labels (Entries tab): `lbl_director_vec`, `lbl_director_call`, `lbl_extraction_director`.  
Tab names: `"Setting 1 (Extraction+Director)"`, `"Setting 2 (Extraction+Director)"` for new presets.

---

## 14. Extended Director Lorebook Entries — NEW in v5.1.3

Presets 3 and 4 now include additional `ra_` lorebook entries beyond the base Director system. These extend narrative tracking, persona management, and world/logic state across presets.

### Preset 3 — Additional Entries

| Lorebook Entry | Purpose |
|----------------|---------|
| `ra_turn_trace` | Current scene snapshot: `scene_context`, `time_anchor`, `elapsed_since_prev`, `user_move`, `narrative_event`, `user_scene_change`, `shift` |
| `ra_scene_state` | Authoritative scene location, atmosphere, and characters present |
| `ra_inventory` | Strict tracking of held items and clothing for user and NPCs |
| `ra_logic_state` | Continuity rules and strict directives |
| `ra_quest_log` | Active/resolved plot threads with `next_step`, `requires_absent` |
| `ra_world_log` | In-world event log |
| `ra_turning_point_log` | Durable turning points with `carry_forward_details` |
| `ra_arc_memory` | Arc phase condensation: `phase_shift_detected`, `arc_phase`, `turning_point`, `lasting_effect` |
| `ra_persistent_memory` | Long-term persistent facts |
| `ra_reentry_guard` | Handles character re-entry restoration |
| `ra_world_encyclopedia` | Factual worldbuilding reference |
| `ra_facet_audit` | **NEW v5.1.3**: Audits previous turn reply against the prior plan; feeds `micro_repair` to `ra_turn_advice` |
| `ra_persona_evolution` | **NEW v5.1.3**: Tracks `stable_core`, `drift_risks`, `baseline_adjustment_candidates`; confidence medium/high feeds `evolution_nudge` in `ra_turn_advice` |

### Preset 4 — Additional Entries (Preset 3 + extras)

Preset 4 includes all Preset 3 entries plus:

| Lorebook Entry | Purpose |
|----------------|---------|
| `ra_knowledge_matrix` | Secret/info tracking: `id`, `subject`, `true_answer`, `knowers`, `unknown_to`, `public_status`, `stability` |
| `ra_knowledge_annotations` | Per-entry annotation + `exploit_risk` for `ra_knowledge_matrix` entries |
| `ra_strategy_layer` | Faction operations, leverage, and risk |
| `ra_strategy_analysis` | `analyst_strategy_overrides`, `cognition_violations` |
| `ra_response_guard` | Output format and safety guard |
| `ra_relation_web` | Interpersonal edge tracking: `current_dynamic`, `trust_level`, `imbalance`, `recent_shift` |
| `ra_scene_principles` | **NEW v5.1.3**: Scene principles with `priority_dimensions`, `facet_success_criteria`, `short_term_success` |
| `ra_mask_state` | **NEW v5.1.3**: Per-character active deception state: `inner_active_facets`, `displayed_facets`, `concealed_facets`, `mask_goal` |

### `ra_turn_advice` — Extended Fields (v5.1.3)

`character_routing[CharName]` now includes:
- `micro_repair` — small correction sourced from `ra_facet_audit`
- `evolution_nudge` — allowed emphasis when `ra_persona_evolution` confidence is medium/high
- `integrity_guard` — canon/dignity rule reminder
- `reentry_restore` — what to restore when character returns
- `mask_note` — *(Preset 4 only)* active concealment reminder from `ra_mask_state`

`response_guard.strict_directive` extended values: `"Maintain political caution"` *(Preset 4 only)*.

---

## 15. CBS Runtime

`normalizeAgentCbsText(text)` → `renderStandaloneCbsText(text, runtime)`. Standalone CBS evaluator. Supports variables, logic, math, arrays, time, RNG. Used in Step 0 pre-render.

---

## 16. HTTP Calls — `callExtractorStrict`

| format / provider | function | auth |
|-------------------|----------|------|
| `"openai"` | `callOpenAICompat` | Bearer token |
| `"google"` | `callGoogleGenerative` | `?key=` param |
| `"vertex"` | `callVertexGenerative` | Service Account JWT |
| `"claude"` | `callClaudeCompat` | `x-api-key` header |
| `"github_copilot"` | `callOpenAICompat` + `applyCopilotAuthHeaders` | GitHub OAuth token → exchanged for session token |

Uses `fetchWithFallback()` (native → risu, or reverse in iframe). Timeout: `300000ms`.  
Key rotation: On 429, cycles to next key in `_parseKeys()` pool.

**Copilot special handling** (`isCopilotUrl(url)`):
- Auto-injects `Editor-Version`, `Editor-Plugin-Version` headers.
- `getCopilotBearerToken(rawGitHubToken)` exchanges raw token → short-lived session token.
- `applyCopilotAuthHeaders(headers, rawGitHubToken)` applies auth to requests.
- `getCopilotModels()` fetches available Copilot models (cached in `copilot_models_cache_v5`).
- Constants: `COPILOT_CODE_VERSION = "1.111.0"`, `COPILOT_CHAT_VERSION = "0.40.2026031401"`.

---

## 17. Provider Support

Supported providers for Extractor A/B:

| Provider value | Label | Format | Default URL |
|----------------|-------|--------|-------------|
| `"openai"` | openai | `openai` | `https://api.openai.com/v1/chat/completions` |
| `"anthropic"` | anthropic | `claude` | `https://api.anthropic.com/v1/messages` |
| `"google_cloud"` | google cloud | `google` | `https://generativelanguage.googleapis.com/v1beta/models` |
| `"vertex_ai"` | vertex ai | `vertex` | `https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/...` |
| `"grok"` | grok (xAI) | `openai` | `https://api.x.ai/v1/chat/completions` |
| `"github_copilot"` | github copilot | `openai` | `https://api.githubcopilot.com/chat/completions` |
| `"openrouter"` | openrouter | `openai` | `https://openrouter.ai/api/v1/chat/completions` |
| `"custom_api"` | custom API | manual | `` |

Supported providers for Embedding:

| Provider value | Format | Notes |
|----------------|--------|-------|
| `"openai"` | `openai` | `text-embedding-3-large` |
| `"google_cloud"` | `google` | `gemini-embedding-001`, `gemini-embedding-2-preview` |
| `"voyageai"` | `openai` | `voyage-4-large`, `voyage-4` |
| `"openrouter"` | `openai` | Supports OpenAI, Google, Qwen embedding models |
| `"custom_api"` | `openai` | Custom OpenAI-compatible endpoint |

**Model caches**: `grok_models_cache_v5`, `copilot_models_cache_v5`, `openrouter_models_cache_v5`, `openrouter_embed_models_cache_v5`.

**Vertex AI**: Key field = Service Account JSON body (not a file path).  
**GitHub Copilot**: Key field = GitHub OAuth/Copilot token; auto-exchanged for session token.

**Recommended Models** (shown in Settings UI `model_suggest_s1/s2`):
- Setting 1 (single char / light): Main → Gemini 3 Flash; Aux → Gemini 3.1 Flash Lite; Embed → `gemini-embedding-2-preview`
- Setting 1–2 (complex / multi-char): Main → Gemini 3.1 Pro / Claude 4.6 Sonnet; Aux → Gemini 3 Flash; Embed → `gemini-embedding-2-preview`

---

## 18. VecModeSwitch — NEW in v5.1.2

`patchChatLoreAlwaysActiveForMode(chat, chatIndex, charIdx, calls, forceAll)`:

Patches `chat.localLore[].alwaysActive` when the user switches vector search mode (card_reorg ↔ vector search). Only processes entries written by this plugin (content starts with `"## "`).

- `forceAll = true` → set all plugin entries to `alwaysActive: true` (card_reorg mode)
- `forceAll = false` → apply per-entry `always_active` config from `model_calls` entries (vector search mode)
- Uses `entryConfigMap` (lorebook_name → always_active) built from all call entries.
- Calls `Risuai.setChatToIndex(charIdx, chatIndex, chat)` after patching.

Triggered from `_replacerBody` when mode-change is detected:
```js
await patchChatLoreAlwaysActiveForMode(chat, chatIndex, _patchCharIdx, calls, forceAll)
```

---

## 19. Continue Chat Feature — NEW in v5.1.2

Allows resuming a previous chat session from within the Enable Settings card list.

**UI**: Each card row has a `pse-continue-chat-btn` button. Clicking opens `openContinueChatPicker(charIdx)` dialog (`dlg_continue_chat_title`).

**Functions**:
```js
async function openContinueChatPicker(charIdx)   // shows chat selection dialog
function closeContinueChatPicker()
async function continueChatFromCharacter(charIdx, sourceChatIndex)
```

`continueChatFromCharacter` flow:
1. Get character by index (`getCharacterFromIndex`)
2. Clone source chat via `buildContinuedChat(sourceChat, 5)` (copies last 5 turns)
3. Prepend new chat to `char.chats` array, set `chatPage = 0`
4. Save via `Risuai.setCharacterToIndex` + `Risuai.setCharacter`

i18n keys: `btn_continue_chat`, `dlg_continue_chat_title`, `st_continue_chat_no_chat_for_card`, `st_continue_chat_no_chat`.

---

## 20. Manual Append — NEW in v5.1.3

Allows manually adding persona data for characters when automatic extraction fails or is unavailable.

**UI location**: Cache tab → character card → `btn_manual_append_persona` button (`data-manual-persona-from-classify="1"`).

**Flow**:
1. Click `btn_manual_append_persona` → `openManualAppendOverlay(charId, charName, cardKey, onSuccess)`
2. Overlay shows a copyable extraction prompt (`manual_append_guide`)
3. User feeds prompt + character data to an external LLM → pastes JSON result
4. Click "Submit Data" → parses JSON, writes persona pairs to `pse_persona_cache_v5:<cardKey>`

**i18n keys**:
| Key | Description |
|-----|-------------|
| `btn_manual_append_persona` | Button label ("Manual Append") |
| `manual_append_title` | Overlay title |
| `manual_append_guide` | Instruction text shown in overlay |
| `st_manual_append_ok(n)` | Success: N characters added |
| `st_manual_append_partial(written, skipped)` | Partial success message |
| `st_manual_append_failed` | Failure prefix |
| `st_manual_append_invalid_json` | JSON parse error message |

**Validation**: Requires valid JSON with character entry pairs; skips incomplete pairs. Uses `err_persona_pair_missing` when required `ra_persona_inventory` / `ra_character_core` pair is missing.

---

## 21. Lorebook Write — `batchUpsertLocalLore`

Protected by `mutexLoreWrite`. Writes to `chat.localLore[]`:
- `overwrite`: replaces entry with `## name\n<!-- written_at_turn: N -->\ncontent`
- `append`: appends `### Turn N\ncontent` block

**card_reorg override (v5.1)**: If `isKbFeatureEnabled()` → all `writes` remapped to `alwaysActive=true` before processing.

`normalizeLoreContentForStorage(loreName, content)` — returns `null` as DELETE signal on empty entries.

`performChatCleanup(userMsgCount)` removes blocks with `turn > userMsgCount`.

---

## 22. Progress Panel

```js
await ProgressPanel.show({ main, aux, embed, mainTokens, auxTokens, isStep0, ... })
ProgressPanel.step(stepId, "pending"|"active"|"done"|"error")
ProgressPanel.increment("main"|"aux"|"embed")
ProgressPanel.setTokens("main"|"aux", count)
await ProgressPanel.markDone()
await ProgressPanel.waitForConfirm()  // "run"|"cancel"
```

Step IDs: `classify`, `embed`, `persona`, `extract`, `compose`.

---

## 23. Settings UI

| Tab | Page | Content |
|-----|------|---------|
| Help | 7 | Language picker + help_p1/p2 content + Recommended Models section |
| Enable | 8 | Card list (with Continue Chat button), classify model, mod lorebook, mode guide |
| Models | 1 | Extractor A/B + Embedding: provider/format/url/key/model/temp/concurrency/thinking |
| Entries | 2 | Preset tabs 1–4 + Common (anchor/prefill/prereply) + Persona calls |
| Vector | 5 | Thresholds for Preset 1 and Preset 2 independently |
| Cache | 6 | Cache viewer/delete + **Manual Append button (NEW v5.1.3)** + file size display |

**Autosave**: `input`/`change` in `.pse-card` → `scheduleAutosave(500ms)`.

---

## 24. i18n

```js
_T = _I18N[lang]   // lang: "en" | "ko" | "tc"
```

`ensureLangInitialized()` before any UI render. Language stored in `safeLocalStorage["pse_ui_language_v5"]`.

**New i18n keys in v5.1.3**:
| Key | Description |
|-----|-------------|
| `btn_manual_append_persona` | Manual Append button label |
| `manual_append_title` | Manual Append overlay title |
| `manual_append_guide` | Instruction text for manual append |
| `st_manual_append_ok(n)` | Success status (function) |
| `st_manual_append_partial(written, skipped)` | Partial success status (function) |
| `st_manual_append_failed` | Failure prefix |
| `st_manual_append_invalid_json` | JSON parse error |
| `lbl_filesize` | "File Size" label in cache viewer |
| `lbl_chunks` | "Entries" label in cache viewer |
| `model_suggest_title` | Recommended Models section title |
| `model_suggest_s1` | Setting 1 model recommendation text |
| `model_suggest_s2` | Setting 1/2 model recommendation text |
| `err_persona_pair_missing(missing)` | Persona pair validation error |

**i18n keys from v5.1.2** (still present): `btn_continue_chat`, `dlg_continue_chat_title`, `st_continue_chat_no_chat_for_card`, `st_continue_chat_no_chat`, `lbl_director_vec`, `lbl_director_call`, `lbl_extraction_director`.

---

## 25. Error Handling

`abortMainModelWithAuxError(message, requestKeys)` — always throws, sets `lastSyncError`, clears state.

`_replacerBody` outer try/catch — catches all, logs, calls `alertError`, re-throws.

Mutexes: `mutexA`, `mutexB`, `mutexEmbed`, `mutexLoreWrite`. Bypassed when concurrency = 1.

---

## 26. Key Utility Functions

| Function | Purpose |
|----------|---------|
| `simpleHash(str)` | 8-char hex hash |
| `safeTrim(v)` | Safe string trim |
| `normalizeAgentCbsText(text)` | CBS-render string |
| `parsePossiblyWrappedJson(text)` | Robust JSON extractor |
| `alignParsedObjectToEntries(raw, parsed, entries)` | Map model output to lorebook_name keys |
| `countUserMessages(messages)` | Count `role === "user"` messages |
| `getTurnOffsetFromLocalLore(localLore)` | Read `pse_turn_offset` |
| `cosineSimilarity(a, b)` | Float[] cosine similarity |
| `chunkTextSafely(text, maxChars)` | Paragraph-safe splitting |
| `withTimeout(promise, ms, msg)` | Timeout race |
| `fetchWithFallback(...)` | Native/risu fetch with fallback |
| `resolveExtractorConfig()` | `{a, b}` from configCache |
| `getModelCalls()` | Calls for current active_preset |
| `getModelCallsByPreset(preset)` | Calls for specific preset string |
| `isModelCallDue(call, roundIndex)` | `roundIndex % every_n_turns === 0` |
| `isKbFeatureEnabled()` | Returns `_currentIsCardReorgEnabled` |
| `isNewPresetEnabled()` | Returns `_currentIsNewPreset` |
| `_parseKeys(raw)` | Split API key string → string[] |
| `thinkingLevelToClaudeBudget(level)` | Level → token budget int |
| `normalizeLoreContentForStorage(loreName, content)` | Normalize lore; null = delete |
| `TurnRecoveryManager.*` | Turn recovery lifecycle (see §5) |
| `isCopilotUrl(url)` | Detect GitHub Copilot endpoint URL |
| `getCopilotBearerToken(rawToken)` | Exchange GitHub token → Copilot session token |
| `applyCopilotAuthHeaders(headers, token)` | Apply Copilot auth headers to request |
| `getCopilotModels()` | Fetch available Copilot models (cached) |
| `getGrokModels()` | Fetch available Grok models (cached) |
| `getOpenRouterModels()` | Fetch available OpenRouter models (cached) |
| `patchChatLoreAlwaysActiveForMode(...)` | Sync localLore alwaysActive on mode switch |
| `continueChatFromCharacter(charIdx, srcIdx)` | Resume previous chat session |
| `openContinueChatPicker(charIdx)` | Open chat selection dialog |
| `buildContinuedChat(sourceChat, n)` | Clone chat with last N turns |
| `openManualAppendOverlay(charId, charName, cardKey, onSuccess)` | **NEW v5.1.3**: Open manual persona append overlay |
| `callGoogleGenerative(...)` | **NEW v5.1.3**: Call Google Gemini/Cloud API (`google` format) |

---

## 27. Common Development Patterns

### Adding a new model call field
1. Add to `normalizeModelCall()` return object
2. Add to `renderCallsToContainer()` HTML template
3. Add to `readCallsFromContainer()` DOM reader
4. Handle in `buildScopedExtractorMessages()` if prompt-affecting

### Adding a new settings key
1. Add to `DEFAULTS`
2. Add to `SETTING_KEYS_BASE` (auto-suffixed `_v5`)
3. Parse/validate in `refreshConfig()`
4. Add DOM element in `renderSettingsUI()`
5. Add to `collectFormData()`

### Adding a new scoped storage key
```js
const MY_KEY = "my_feature_state"
// Key format: "my_feature_state::v5::scopeId"
await Risuai.pluginStorage.setItem(makeScopedStorageKey(MY_KEY, scopeId), value)
```

### Adding a new provider
1. Add `{ value: "provider_id", label: "Provider Name" }` to `MODEL_PROVIDER_OPTIONS`
2. Add default URL to `PROVIDER_DEFAULT_URL`
3. Add default format to provider format map
4. Add model fetch function `getProviderModels()` with cache key `provider_models_cache_v5`
5. Handle in `callExtractorStrict` / `callOpenAICompat` if auth is non-standard
6. Add key placeholder text in settings UI key field

### Debugging a replacer issue
- `last_hook_ts` / `last_hook_type` — last hook invocation timestamp + type
- `last_extractor_mode` — what happened last run
- `last_lore_sync_error` — last error message
- `last_req_hash` — hash of last processed request
- `regen_skip` — regen detection token

---

## 28. Version & File Info

- Plugin: `RisuAI Agent v5.1.3`
- API: `Risuai API v3.0` (iframe sandbox, all async)
- Main file: `RisuAI_Agent_v5_1_3.js` (~17000+ lines, single IIFE)
- Storage namespace: `v5` (all scoped keys include `::v5::`)
- All setting storage keys suffixed `_v5`
- Default active preset: **3** (new preset, persona-aware)
- New preset: `preset === "3" || preset === "4"` → `_currentIsNewPreset = true`
- `PLUGIN_VER = "5.1.3"`
- `EMBEDDING_VECTOR_CACHE_VERSION = 5`
- `FIXED_TIMEOUT_MS = 300000`

### Key changes from v5.1.2 → v5.1.3

| Area | Change |
|------|--------|
| Preset 3 — new entries | `ra_facet_audit` (turn audit → micro_repair), `ra_persona_evolution` (drift tracking → evolution_nudge) |
| Preset 4 — new entries | `ra_scene_principles` (scene dimension analysis), `ra_mask_state` (per-character deception tracking) |
| `ra_turn_advice` fields | Added `micro_repair`, `evolution_nudge`, `integrity_guard`, `reentry_restore`; Preset 4 adds `mask_note` |
| Provider: Google Cloud / Vertex AI | `google_cloud` and `vertex_ai` now available as extractor providers; `callGoogleGenerative()` added |
| Embedding: Google expanded | `gemini-embedding-2-preview` added to `EMBEDDING_GOOGLE_MODEL_OPTIONS` |
| Embedding: Qwen via OpenRouter | `or_qwen_qwen3_embedding_8b` option added |
| Manual Append | `openManualAppendOverlay()` allows offline LLM-assisted persona entry for characters in cache panel |
| Cache viewer | Now shows file size (`lbl_filesize`) and entry count (`lbl_chunks`) per card |
| i18n | New keys for Manual Append, cache labels, model recommendations, persona pair error |
| Settings → Help tab | New "Recommended Models" section (`model_suggest_title`, `model_suggest_s1`, `model_suggest_s2`) |
| Persona pair validation | `err_persona_pair_missing(missing)` — explicit error when `ra_persona_inventory` / `ra_character_core` pair is incomplete |

### Key changes from v5.1 → v5.1.2

| Area | Change |
|------|--------|
| Director system | New `ra_director`, `ra_pattern_guard`, `ra_persona_importance`, `ra_turn_advice` lorebook entries in Presets 3/4 |
| Provider: GitHub Copilot | `github_copilot` provider with OAuth token exchange, `getCopilotModels()`, Copilot-specific auth headers |
| Provider: Grok | `grok` provider with `getGrokModels()` and model cache |
| Provider: OpenRouter | Expanded with embed model cache (`openrouter_embed_models_cache_v5`) |
| Continue Chat | New `continueChatFromCharacter()` feature + picker dialog in Enable Settings card list |
| VecModeSwitch | `patchChatLoreAlwaysActiveForMode()` syncs `alwaysActive` flags when switching vector modes |
| i18n | New keys for Director UI labels and Continue Chat feature |
| Preset tab names | Presets 3/4 tabs renamed to include "Extraction+Director" |

### Key changes from v4.1.2 → v5.1

| Area | Change |
|------|--------|
| Storage namespace | All scoped keys now include `::v5::` |
| Setting key suffix | All suffixed `_v5` |
| Default preset | 1 → 3 |
| Turn recovery | New `TurnRecoveryManager` (180s TTL) |
| API key rotation | Multiple keys per endpoint, auto-cycle on 429 |
| Thinking mode | Per-model enable + level (low/medium/high) |
| Prereply prompt | New `advanced_prereply_prompt` |
| Concurrency | Per-model + embedding toggle |
| UI language | Language picker in Help tab |
| card_reorg patch | `batchUpsertLocalLore` forces `alwaysActive=true` in card_reorg mode |
