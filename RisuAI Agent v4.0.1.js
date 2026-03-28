//@name 👤 RisuAI Agent
//@display-name 👤 RisuAI Agent v4.0.1
//@author penguineugene@protonmail.com
//@link https://github.com/EugenesDad/RisuAI-Agent-plugin
//@api 3.0
//@version 4.0.1

(async () => {
  function _mapLangCode(raw) {
    const dl = String(raw || "")
      .toLowerCase()
      .trim();
    if (!dl) return "";
    if (dl === "ko" || dl.startsWith("ko-")) return "ko";
    if (
      dl === "cn" ||
      dl === "tc" ||
      dl === "zh-tw" ||
      dl === "zh-hant" ||
      dl.startsWith("zh-tw") ||
      dl.startsWith("zh-hk")
    )
      return "tc";
    if (dl.startsWith("zh")) return "tc";
    if (dl.startsWith("en")) return "en";
    return "";
  }

  async function _detectLang() {
    try {
      const saved = String(
        (await Risuai.safeLocalStorage.getItem("pse_ui_language")) || "",
      ).trim();
      if (saved === "en" || saved === "ko" || saved === "tc") return saved;
    } catch {}
    return "en";
  }

  const _I18N = {
    en: {
      append: "Append",
      overwrite: "Overwrite",
      tab_help: "Plugin Guide",
      tab_model: "Core Models",
      tab_entry: "Information Extraction",
      tab_enable: "Enable Settings",
      tab_vector_open: "Vector Search",
      tab_cache_open: "Cache Hub",
      tab_common: "Common Prompts",
      tab_preset1_old: "Setting 1 (Extraction)",
      tab_preset2_old: "Setting 2 (Extraction)",
      tab_preset1_new: "Setting 1 (Extraction+Director)",
      tab_preset2_new: "Setting 2 (Extraction+Director)",
      tab_char_extract: "Character Persona Extraction",
      tab_preset3: "Setting 3",
      tab_preset4: "Setting 4",
      sec_a: "Main Model",
      sec_b: "Auxiliary Model",
      sec_embed_title: "Embedding Model",
      embed_warn:
        "⚠️ Vectors from different embedding models are completely incompatible. If you change the model, the embedding model will re-run the vector indexing.",
      lbl_provider: "Provider",
      lbl_format: "Request Format",
      lbl_url: "Request URL",
      lbl_key: "API Key",
      lbl_model: "Model",
      lbl_temp: "Temperature",
      lbl_concur: "Concurrency Mode",
      opt_concurrent: "Concurrent (allow multiple simultaneous requests)",
      opt_sequential: "Sequential (single-threaded requests only)",
      sec_lore_calls: "Lorebook Write Call Settings",
      tag_temp_closed: "Closed",
      warn_kb_feature_enable:
        "⚠️ Enabling Bot Reorganization and Vector Search changes the preset structure. CBS syntax cannot be parsed in this mode. Please review the setup guide and adjust your presets before enabling.",
      opt_vec_card_reorg: "Bot Reorg only",
      opt_vec_preset1: "Setting 1 (Bot Reorg + Vector Search)",
      opt_vec_preset2: "Setting 2 (Bot Reorg + Vector Search)",
      lore_warn:
        "⚠️ Do not manually edit the Lorebook while Agent is running, as it may be automatically overwritten.",
      btn_add_call: "Add Call Task",
      lbl_anchor: "System Anchor Prompt",
      lbl_prefill: "Assistant Prefill",
      lbl_prereply: "Assistant Pre-Reply Prompt",
      aria_expand: "Expand Edit",
      sec_vec: "Vector Search",
      lbl_query_rounds:
        "Number of recent dialogue turns to use as search query",
      lbl_topk: "Top K (number of entries to return)",
      lbl_minscore: "Minimum similarity score threshold (0~1)",
      sec_classify: "Classification Model Settings",
      lbl_use_model: "Use Model",
      opt_main_model: "Main Model",
      opt_aux_model: "Auxiliary Model",
      lbl_classify_anchor: "Classification Anchor Prompt",
      lbl_classify_model: "Classification Model",
      lbl_enable_mod_lorebook: "Include Mod Lorebooks in vector search",
      sec_card_settings: "Bot Enable Settings",
      lbl_card_name: "Bot",
      lbl_memory_extract: "Enable Info Extraction",
      lbl_vector_search_card: "Enable Vector Search for Bot",
      lbl_card_disabled: "Disable this plugin",
      btn_continue_chat: "Continue Chat",
      dlg_continue_chat_title: "Choose A Chat To Continue",
      dlg_continue_chat_empty: "This character has no chats yet.",
      dlg_continue_chat_turns: "turns",
      dlg_continue_chat_current: "current",
      opt_off: "Off",
      opt_preset1: "Setting 1",
      opt_preset2: "Setting 2",
      no_cards: "No bots found in database.",
      sec_cache: "Cache Hub",
      btn_refresh_cache: "Refresh Cache List",
      btn_clear_cache: "Clear All Caches",
      btn_delete_vector: "Delete Vector",
      btn_reset: "Reset All to Defaults",
      lbl_card: "",
      lbl_entries: "Entries",
      lbl_filesize: "File Size",
      btn_delete: "Delete",
      btn_refresh_persona: "Add Unregistered Characters",
      lbl_classify_only: "Classification only",
      lbl_chunks: "Entries",
      tag_vector: "Vector",
      tag_classify: "Classification",
      tag_persona: "Persona",
      btn_save: "Save Settings",
      btn_close: "Close",
      preset1: "Setting 1",
      preset2: "Setting 2",
      no_cache: "No vector cache data available.",
      confirm_clear: `Are you sure you want to clear all vector caches?\nThis will delete all bot cache data. The cache will be rebuilt when you next send a message.`,
      confirm_reset:
        "Are you sure you want to reset all settings to factory defaults?\nThis will replace your current plugin settings.",
      st_cache_refreshed: "Vector cache list refreshed.",
      st_cache_cleared:
        "All vector caches cleared. Cache will be rebuilt on next send.",
      st_card_deleted: "Bot vector cache deleted.",
      st_persona_refreshed: "Persona cache refreshed.",
      st_persona_refresh_failed: "Persona refresh failed: ",
      st_persona_refresh_no_chunks:
        "Persona refresh skipped: no Step 0 chunks found.",
      st_feature_coming: "Not available yet.",
      st_saved: "Settings saved.",
      st_save_fail: "Save failed: ",
      st_continue_chat_done: "Created a continued chat and switched to it.",
      st_continue_chat_failed: "Continue chat failed: ",
      st_continue_chat_no_chat: "No active chat was found to continue.",
      st_continue_chat_no_chat_for_card:
        "This character has no available chat to continue.",
      st_reset: "Reset to Agent defaults.",
      st_reset_fail: "Reset failed: ",
      lbl_persona_entries: "Character Persona Entries",
      lbl_delete_char_cache: "Delete this character's cache",
      lbl_no_persona_data: "No character data found.",
      model_suggest_title: "🖥️ Recommended Models",
      model_suggest_s1: `<b>Setting 1: Single Character or Light Adventure Bot</b><br/>• Main Model: Models suited for summarizing large datasets (Gemini 3 Flash)<br/>• Auxiliary Model: Non-coding models for 1k~5k context (Gemini 3.1 Flash Lite)<br/>• Embedding Model: Multilingual vector search model (gemini-embedding-2-preview)`,
      model_suggest_s2: `<b>Setting 1 or 2: Complex or Multi-Character Bots</b><br/>• Main Model: Models for deep analysis of large datasets (Gemini 3.1 Pro, Claude 4.6 Sonnet)<br/>• Auxiliary Model: High-performance models for 1k~10k context (Gemini 3 Flash)<br/>• Embedding Model: Multilingual vector search model (gemini-embedding-2-preview)`,
      mode_guide_title: "📖 Mode Guide & Model Call Instructions",
      mode_guide_content: `<div style="border-top: 1px solid rgba(255, 152, 0, 0.1); padding-top: 12px;">
                    <!-- 🎯 Mode Choice (Indigo) -->
                    <div style="border-left: 4px solid var(--pse-accent-indigo); background: rgba(63, 81, 181, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-indigo); font-size: 14px;">🎯 Mode Choice</b>
                      <div style="margin-top: 6px; display: grid; gap: 4px; margin-bottom: 8px;">
                        <div>• <b>Settings Difference:</b> "Setting 1" is for general bots; "Setting 2" is designed for complex plots.</div>
                        <div>• <b>Extraction:</b> Condenses chat logs, replacing traditional long-turn dialogue and Supa/Hypa.</div>
                      </div>

                      <div style="display:grid; gap:8px;">
                        <div style="background:rgba(63, 81, 181, 0.1); border:1px solid rgba(63, 81, 181, 0.2); padding:8px; border-radius:6px;">
                          <div style="color:var(--pse-accent-indigo); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(63, 81, 181, 0.1);">🧩 Feature Explanation</div>
                          <div style="font-size:12px; color:var(--pse-text); display:grid; gap:4px;">
                            <div>• <b>Director:</b> Guides the plot and character reactions, enhancing depth and continuity.</div>
                            <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ Characters may be more realistic and harder to change in this mode.</div>
                            <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ Requires significant prompt adjustments and familiarity with prompts.</div>
                            <div>• <b>Bot Reorg:</b> Reclassifies bot entries into the most effective positions in the prompt structure.</div>
                            <div>• <b>Vector Search:</b> Replaces keyword matching with semantic search to increase info density.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 📊 Model Call Frequency (Indigo themed sub-blocks) -->
                    <div style="border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-blue); font-size: 14px;">📊 Model Call Frequency</b>

                      <div style="margin-top: 8px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                          <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">New Chat</span>
                          <span style="color: var(--pse-muted); font-size: 12px;">More complex setups take longer to initialize</span>
                        </div>
                        <div style="display: grid; gap: 6px; padding-left: 4px; margin-bottom: 12px;">
                          <div style="display: flex; flex-direction: column;">
                            <span><b>Director:</b> Calls Main model for persona extraction</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 Cost scales with character count</span>
                          </div>
                          <div style="display: flex; flex-direction: column;">
                            <span><b>Bot Reorg:</b> Calls Aux model for data classification</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 Cost scales with bot data volume</span>
                          </div>
                          <div style="display: flex; flex-direction: column;">
                            <span><b>Vector Search:</b> Calls Embedding model to build index</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 Cost scales with bot data volume</span>
                          </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                          <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">During Chat</span>
                        </div>
                        <div style="display:grid; gap:8px; padding-left:4px;">
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">✨ Extraction Mode</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>Setting 1:</b> Main (10, 15 turns), Aux (2/turn + 3 turns)<br/>
                              • <b>Setting 2:</b> Main (3, 10, 15 turns), Aux (3/turn + 2, 3 turns)
                            </div>
                          </div>
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">🎬 Extraction + Director</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>Setting 1:</b> Main (10, 15 turns), Aux (4/turn + 3 turns)<br/>
                              • <b>Setting 2:</b> Main (4, 10, 15 turns), Aux (4/turn + 2, 3 turns)
                            </div>
                          </div>
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">⚙️ Director & Vector Search</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>Freq:</b> Embedding model 1 call/turn to build semantic index.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 🚀 Continue Chat (Teal) -->
                    <div style="border-left: 4px solid var(--pse-accent-teal, #009688); background: rgba(0, 150, 136, 0.08); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-teal, #009688); font-size: 14px;">🚀 Continue Chat</b>
                      <div style="margin-top: 6px; display: grid; gap: 4px; font-size: 12px; color: var(--pse-text);">
                        <div>• Only use when you experience lag.</div>
                        <div>• After clicking "Continue Chat", a list of chats for that character will appear. Click the record you want to continue.</div>
                        <div>• You can then continue by using the record suffixed with "(continue)".</div>
                      </div>
                    </div>
                  </div>`,
      btn_reset_factory: "Reset All to Factory Defaults",
      editor_cancel: "Cancel",
      editor_apply: "Apply",
      aria_close: "Close",
      lbl_lore_entry: "Lorebook Entry",
      lbl_write_mode: "Write Mode (Overwrite/Append)",
      lbl_always_active: "Always Active",
      yes: "Yes",
      no: "No",
      lbl_output_format: "Output Format (JSON Schema)",
      ret_after_lbl: "After",
      ret_mid_lbl: "turns, auto-trim and keep only the latest",
      ret_end_lbl: "turns of data",
      ret_enabled_title:
        "When enabled, automatically trims old data from this entry after reaching the specified turn count, keeping only the most recent turns",
      ret_after_title:
        "Pruning starts after accumulating more than this many turns (0 = immediately)",
      ret_keep_title:
        "Number of most recent turn blocks to keep after trimming (0 = clear all)",
      lbl_call_note: "Call Note",
      lbl_call_model: "Model",
      opt_main: "Main Model",
      opt_aux: "Auxiliary Model",
      lbl_freq: "Trigger Frequency (turns)",
      lbl_read_rounds: "Read Dialogue Turns (0=all)",
      lbl_read_lore: "Associated Lorebook Entries (comma-separated)",
      lbl_read_persona: "Read Persona Cache (comma-separated)",
      btn_add_entry: "Add Write Entry",
      callnote_a: "Call Note A",
      callnote_b: "Call Note B",
      callnote_n: (n) => `Call Note ${n}`,
      default_callnote: "Call Note A",
      expand_anchor: "System Anchor Prompt - Expanded Edit",
      expand_prefill: "Assistant Prefill - Expanded Edit",
      expand_prereply: "Assistant Pre-Reply Prompt - Expanded Edit",
      expand_classify: "Classification Anchor Prompt - Expanded Edit",
      expand_generic: "Edit Prompt Content",
      expand_format: "Output Format (JSON Schema) - Expanded Edit",
      sec_json_tools: "Prompt JSON",
      btn_json_export: "Export Settings",
      btn_json_import: "Import Settings",
      json_file_accept: ".json,application/json",
      st_json_exported: "Prompt JSON exported.",
      st_json_imported: "Prompt JSON imported and saved.",
      err_json_import_invalid:
        "Imported JSON format is invalid. Please use a JSON exported from this UI.",
      err_json_import_mode:
        "Imported JSON does not match this tab type. Please import the correct preset/persona JSON.",
      lbl_thinking: "Thinking Tokens",
      lbl_thinking_level: "Thinking Level",
      thinking_title: "Enable extended thinking for this model",
      opt_thinking_auto: "Auto (adaptive)",
      opt_thinking_low: "Low",
      opt_thinking_medium: "Medium",
      opt_thinking_high: "High",
      aux_failed: "Auxiliary model execution failed:\n",
      entry_save_failed: "Entry save failed:\n",
      no_conv: "Skipped: no usable conversation text in beforeRequest payload.",
      aux_abort_default: "Auxiliary model call or processing failed",
      aux_abort_suffix: "Main model request was intercepted to save API quota.",
      step0_abort_warning: (err) =>
        `⚠️ Step 0 incomplete. Main model request blocked to save quota.\nError: ${err}\n\nPlease wait, then click Regenerate/Send.`,
      unknown_reason: "Unknown error",
      aux_error_line: ({ callName, target, provider, model, reason }) =>
        `Call "${callName}" (Model ${target}, provider ${provider}, model ${model}) failed: ${reason}`,
      err_json_expected: (name) =>
        `Auxiliary model (${name}) must return a JSON object, but parsing failed.`,
      err_validation_failed: (name, issues) =>
        `Auxiliary model output validation failed (${name}): ${issues}.`,
      err_unusable_output: (name) =>
        `Auxiliary model output is unusable (${name}).`,
      err_persona_pair_missing: (missing) =>
        `Persona core pair missing: ${missing}. Require both rp_persona_inventory and rp_character_core.`,
      err_persona_cache_missing: (reason) =>
        `Persona cache build failed: ${reason}. Main model request blocked to avoid wasting quota. Please retry after fixing the issue.`,
      err_extractor_empty: (mode) =>
        `Extractor ${mode} returned empty content.`,
      warn_parse_failed:
        "⚠️ Unable to parse static_knowledge_chunks. Please check if Step 0 has completed.",
      warn_no_chunks:
        "⚠️ No available chunks. Knowledge injection skipped. Please check if Step 0 has completed.",
      log_step0_start:
        "Starting background knowledge base initialization (Step 0)... Please wait.",
      log_step0_start_keyword:
        "Starting background knowledge base classification (Step 0, keyword mode)... Please wait.",
      log_step0_start_classify_done:
        "Classification already done. Building vector embeddings only (Step 0)... Please wait.",
      log_step0_start_reembed: (oldModel, newModel) =>
        `Embedding model changed (${oldModel} → ${newModel}). Re-indexing with new model (Step 0)... Please wait.`,
      log_step0_complete: "Knowledge base initialization complete!",
      log_step0_failed: (err) =>
        `❌ Knowledge base initialization failed: ${err}`,
      log_step0_fail_fallback: (err) =>
        `⚠️ Knowledge base classification failed, continuing in fallback mode: ${err}`,
      err_vec_kb_failed: (err) =>
        `[RisuAI Agent] Vector knowledge base build failed/timed out. Progress has been saved.\nError: ${err}\nPlease wait a moment, then click "Regenerate/Send" to continue from where it left off.`,
      copilot_refresh: "Copilot token refresh",
      help_tab_main: "Home",
      help_tab_p1: "Preset 1",
      help_tab_p2: "Preset 2",
      mode_guide_title: "📖 Mode Explanation & Model Call Guide",
      mode_guide_click: "(Click to expand/collapse)",
      help_html: `<div style="font-family: inherit; line-height: 1.5;">
  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #E91E63; background: rgba(233, 30, 99, 0.05);">
    <div style="font-weight: bold; color: #E91E63; margin-bottom: 8px;">🦮 Plugin Guide</div>
    <div style="margin-bottom: 4px;">• <b>Enable Settings:</b> Configure individual bot plugin modes. Once set, it will indicate the applicable preset prompt adjustment. Click the tag to jump to the instructions page.</div>
    <div style="margin-bottom: 4px;">• <b>Core Models:</b> Set models and parameters for main, auxiliary, and embedding models. These are independent of RisuAI's native models.</div>
    <div style="margin-bottom: 4px;">• <b>Cache Hub:</b> Stores data for bot classification, vector search, and character core. Can be viewed, refreshed, or deleted.</div>
    <div style="margin-bottom: 4px;">• <b>Information Extraction:</b> For advanced users. Customize director and extraction mode details.</div>
    <div>• <b>Vector Search:</b> For advanced users. Customize vector search details.</div>
  </div>

  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #FFB300; background: rgba(255, 179, 0, 0.05);">
    <div style="font-weight: bold; color: #FB8C00; margin-bottom: 8px;">📜 Preset Compatibility</div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: #43A047; margin-bottom: 4px;">✅ Compatible</div>
      • Presets can be switched mid-session while in plugin mode.<br>
      • Card reorganization and vector search can be toggled mid-session.<br>
      • Can transition smoothly to non-plugin mode.
    </div>
    <div>
      <div style="font-weight: bold; color: #E53935; margin-bottom: 4px;">❌ Caution</div>
      • Default preset prompts must be modified.<br>
      • Cannot connect directly to non-plugin chat history.<br>
      • Do not repeatedly toggle the plugin on/off mid-conversation.
    </div>
  </div>

  <div style="padding: 12px; border-radius: 8px; border-left: 4px solid #4CAF50; background: rgba(76, 175, 80, 0.05);">
    <div style="font-weight: bold; color: #2E7D32; margin-bottom: 8px;">📂 Data Storage Information</div>
    • Information extraction records are stored in <b>Lorebook > Chat</b> entries and can be reviewed or adjusted at any time.<br>
    • Index data for bot classification, vector search, and character core is stored in the <b>Cache Hub</b>.
  </div>
</div>

  <div style="padding: 12px; border-radius: 8px; border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05);">
    <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 8px;">⁉️ Q&A</div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ If <b style="color: var(--pse-accent-red); font-size: 13px;">ERROR 400: Call model not supported</b> appears</div>
      • This means you may be using Claude, DeepSeek, Mistral, or a model that doesn't support prefill format.<br/>
      • Go to Information Extraction > Common Prompts, clear the <b style="color: var(--pse-accent-red); font-size: 13px;">Assistant Pre-Reply Prompt</b> and save.<br/>
      • If the error persists, clear the <b style="color: var(--pse-accent-red); font-size: 13px;">Assistant Prefill</b> as well.
    </div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ What to do if responses are censored or empty</div>
      Since data is split into smaller chunks, NSFW density is higher, which increases the likelihood of censorship.<br/>
      • Strengthen the prefill prompt. However, deeper jailbreaking may degrade performance and output quality.<br/>
      • Switch to a model with less restrictive safety filtering.
    </div>
    <div>
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ Notes for advanced users modifying prompts in Information Extraction</div>
      • It is best to maintain the same JSON template.<br/>
      • Lorebook entry names must match the first tag in the JSON to be correctly written to the system.
    </div>
  </div>`,
      lbl_loading: "Loading...",
      sec_suggest: "🖥️ Recommended Models",
      lbl_suggest_s1: "Setting 1: Single Character or Light Adventure Bot",
      lbl_suggest_s2: "Setting 1 or 2: Complex or Multi-Character Bots",
      lbl_suggest_s1_main:
        "Main Model: Models suited for summarizing large datasets (Gemini 3 Flash)",
      lbl_suggest_s1_aux:
        "Auxiliary Model: Non-coding models (Gemini 3.1 Flash Lite)",
      lbl_suggest_s1_embed:
        "Embedding Model: Multilingual vector search model (gemini-embedding-2-preview)",
      lbl_suggest_s2_main:
        "Main Model: Models for analyzing large datasets (Gemini 3.1 Pro, Claude 4.6 Sonnet)",
      lbl_suggest_s2_aux:
        "Auxiliary Model: Models with analytical capabilities (Gemini 3 Flash)",
      lbl_suggest_s2_embed:
        "Embedding Model: Multilingual vector search model (gemini-embedding-2-preview)",
      lbl_mode_reorg_vec: "Bot Reorg & Vector Search Mode:",
      lbl_cbs_manual:
        "CBS syntax parsing is currently unavailable; manual adjustments required.",
      lbl_adjustment_method: "Adjustment Methods:",
      lbl_toggle_type: "Toggle types:",
      lbl_toggle_desc: "Adjust directly to your desired setting.",
      lbl_param_type: "Parameter types:",
      lbl_param_desc: "Move the entire entry to Author's Note.",
      lbl_director_vec: "Director & Vector Search:",
      lbl_embed_per_turn: "Embedding model 1 call/turn",
      lbl_new_chat: "New Chat",
      lbl_during_chat: "During Chat",
      lbl_init_time: "More complex setups take longer to initialize",
      lbl_director_call: "Director: Calls Main model for persona extraction",
      lbl_reorg_call: "Bot Reorg: Calls Aux model for data classification",
      lbl_vec_call: "Vector Search: Calls Embedding model to build index",
      lbl_cost_chars: "Cost scales with character count",
      lbl_cost_data: "Cost scales with bot data volume",
      lbl_extraction_mode: "✨ Extraction Mode",
      lbl_extraction_director: "🎬 Extraction + Director",
      lbl_s1_freq_ext:
        "Setting 1: Main (every 10-15 turns), Aux (2/turn + every 3 turns)",
      lbl_s2_freq_ext:
        "Setting 2: Main (every 3-15 turns), Aux (3/turn + every 2-3 turns)",
      lbl_s1_freq_dir:
        "Setting 1: Main (every 10, 15 turns), Aux (4/turn + every 3 turns)",
      lbl_s2_freq_dir:
        "Setting 2: Main (every 4, 10, 15 turns), Aux (4/turn + every 2 & 3 turns)",
      help_p1_html: `<div style="border-left: 4px solid var(--pse-accent-amber); background: rgba(255, 171, 0, 0.05); padding: 12px; border-radius: 8px;">
                      <b style="color: var(--pse-accent-amber); font-size: 14px;">🛠️ Preset Adjustment Guide</b>
                      <div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                        <div style="margin-bottom: 4px;">1. <b>Delete fields:</b> Supa/HypaMemory.</div>
                        <div style="margin-bottom: 4px;">2. <b>Advanced Settings:</b> Enter Chat > Check "Advanced", then set <b>Range Start</b> to <b>-10</b>.</div>
                        <div>3. Copy the system prompt below, go to Bot > Prompts page, open the <b>top-most System Prompt</b>, and insert the prompt <b>at the very end</b>.</div>
                      </div>
                      <div style="margin-top:12px;">
                        <textarea class="pse-code-window" readonly># PRIORITY ORDER
Read upstream layers in this order. When layers conflict, higher layers win.
1. Hard constraints
\`rp_logic_state.known_contradiction\` | \`rp_turn_advice.response_guard\`
2. Current portrayal
\`rp_turn_advice.character_routing\` | \`rp_scene_and_role_state\`
3. Durable continuity
\`rp_persona_evolution_state\` | \`rp_persistent_memory\` | \`rp_arc_memory\` | \`rp_turn_trace\` | \`rp_facet_activation_ledger\` | \`rp_recent_world_entries\` | \`rp_world_encyclopedia\`</textarea>
                        <button class="pse-btn pse-copy-sql-btn" type="button" style="width:100%;padding:6px;font-size:12px;background:var(--pse-accent-greyblue);">📋 Copy System Prompt</button>
                      </div>
                    </div>`,
    },
    ko: {
      append: "추가",
      overwrite: "덮어쓰기",
      tab_help: "도움말",
      tab_model: "코어 모델",
      tab_entry: "정보 추출",
      tab_enable: "활성화 설정",
      tab_vector_open: "벡터 검색",
      tab_cache_open: "캐시 저장소",
      tab_common: "공통 프롬프트",
      tab_preset1_old: "설정 1 (추출)",
      tab_preset2_old: "설정 2 (추출)",
      tab_preset1_new: "설정 1 (추출+디렉터)",
      tab_preset2_new: "설정 2 (추출+디렉터)",
      tab_char_extract: "캐릭터 페르소나 추출",
      tab_preset3: "설정 3",
      tab_preset4: "설정 4",
      sec_a: "메인 모델",
      sec_b: "보조 모델",
      sec_embed_title: "임베딩 모델",
      embed_warn:
        "⚠️ 서로 다른 임베딩 모델의 벡터는 호환되지 않습니다. 모델 변경 시 인덱스를 새로 구축해야 합니다.",
      lbl_provider: "제공자",
      lbl_format: "요청 형식",
      lbl_url: "요청 URL",
      lbl_key: "API 키",
      lbl_model: "모델",
      lbl_temp: "온도",
      lbl_concur: "요청 모드 (Concurrency)",
      opt_concurrent: "병렬 (복수 요청 동시 발송)",
      opt_sequential: "순차 (단일 요청만 처리)",
      sec_lore_calls: "로어북 쓰기 설정",
      tag_temp_closed: "닫힘",
      warn_kb_feature_enable:
        "⚠️ 「봇 재구성」 모드에서는 CBS 구문 분석이 지원되지 않습니다. 사용이 필요한 경우 수동으로 조정해주세요. 설정 가이드를 확인한 뒤 활성화하시기 바랍니다.",
      opt_vec_card_reorg: "봇 재구성만 사용",
      opt_vec_preset1: "설정 1 (봇 재구성 + 벡터 검색)",
      opt_vec_preset2: "설정 2 (봇 재구성 + 벡터 검색)",
      lore_warn:
        "⚠️ 실행 중에는 로어북을 수동으로 편집하지 마세요. 자동으로 덮어쓰일 수 있습니다.",
      btn_add_call: "호출 작업 추가",
      lbl_anchor: "시스템 앵커 프롬프트",
      lbl_prefill: "어시스턴트 프리필",
      lbl_prereply: "사전 응답 프롬프트",
      aria_expand: "확대 편집",
      sec_vec: "벡터 검색",
      lbl_query_rounds: "검색에 사용할 최근 대화 턴 수",
      lbl_topk: "Top K (반환 항목 수)",
      lbl_minscore: "최소 유사도 임계값 (0~1)",
      sec_classify: "분류 모델 설정",
      lbl_use_model: "사용 모델",
      opt_main_model: "메인 모델",
      opt_aux_model: "보조 모델",
      lbl_classify_anchor: "분류 앵커 프롬프트",
      lbl_classify_model: "분류 모델",
      lbl_enable_mod_lorebook: "모드 로어북을 벡터 검색 범위에 포함",
      sec_card_settings: "봇 활성화 설정",
      lbl_card_name: "봇",
      lbl_memory_extract: "정보 추출 활성화",
      lbl_vector_search_card: "봇에 벡터 검색 적용",
      lbl_card_disabled: "이 플러그인 사용 안 함",
      btn_continue_chat: "채팅 이어가기",
      dlg_continue_chat_title: "이어갈 채팅 선택",
      dlg_continue_chat_empty: "이 캐릭터에는 아직 채팅이 없습니다.",
      dlg_continue_chat_turns: "턴",
      dlg_continue_chat_current: "현재",
      opt_off: "끄기",
      opt_preset1: "설정 1",
      opt_preset2: "설정 2",
      no_cards: "데이터베이스에 봇이 없습니다.",
      sec_cache: "캐시 저장소",
      btn_refresh_cache: "캐시 목록 새로고침",
      btn_clear_cache: "전체 캐시 삭제",
      btn_delete_vector: "벡터 삭제",
      btn_reset: "공장 초기화",
      lbl_card: "",
      lbl_entries: "항목 수",
      lbl_filesize: "파일 크기",
      btn_delete: "삭제",
      btn_refresh_persona: "미등록 캐릭터 추가",
      lbl_classify_only: "분류 전용",
      lbl_chunks: "항목 수",
      tag_vector: "벡터",
      tag_classify: "분류",
      tag_persona: "페르소나",
      btn_save: "설정 저장",
      btn_close: "닫기",
      preset1: "설정 1",
      preset2: "설정 2",
      no_cache: "벡터 캐시 데이터가 없습니다.",
      confirm_clear:
        "모든 벡터 캐시를 삭제하시겠습니까?\n모든 봇의 캐시가 삭제되며 다음 대화 시 재생성됩니다.",
      confirm_reset:
        "모든 설정을 공장 기본값으로 초기화하시겠습니까?\n현재 플러그인 설정이 기본값으로 대체됩니다.",
      st_cache_refreshed: "벡터 캐시 목록이 업데이트되었습니다.",
      st_cache_cleared:
        "모든 벡터 캐시가 삭제되었습니다. 다음 대화 시 재생성됩니다.",
      st_card_deleted: "해당 봇의 벡터 캐시가 삭제되었습니다.",
      st_persona_refreshed: "페르소나 캐시가 새로고침되었습니다.",
      st_persona_refresh_failed: "페르소나 새로고침 실패: ",
      st_persona_refresh_no_chunks:
        "페르소나 새로고침 건너뜀: Step 0 데이터 없음.",
      st_feature_coming: "준비 중인 기능입니다.",
      st_saved: "설정이 저장되었습니다.",
      st_save_fail: "저장 실패: ",
      st_continue_chat_done: "이어진 새 채팅을 만들고 그 창으로 전환했습니다.",
      st_continue_chat_failed: "채팅 이어가기 실패: ",
      st_continue_chat_no_chat: "이어갈 활성 채팅을 찾지 못했습니다.",
      st_continue_chat_no_chat_for_card:
        "이 캐릭터에는 이어갈 수 있는 채팅이 없습니다.",
      st_reset: "기본값으로 초기화되었습니다.",
      st_reset_fail: "초기화 실패: ",
      lbl_persona_entries: "캐릭터 페르소나 항목",
      lbl_delete_char_cache: "이 캐릭터의 캐시 삭제",
      lbl_no_persona_data: "캐릭터 데이터가 없습니다.",
      model_suggest_title: "🖥️ 권장 모델",
      model_suggest_s1: `<b>설정 1: 단일 캐릭터 또는 가벼운 모험용 봇</b><br/>• 메인 모델: 대량의 정보를 요약하기에 적합 (Gemini 3 Flash)<br/>• 보조 모델: 가벼운 처리에 적합 (Gemini 3.1 Flash Lite)<br/>• 임베딩 모델: 다국어 벡터 검색용 (gemini-embedding-2-preview)`,
      model_suggest_s2: `<b>설정 1 또는 2: 복잡하거나 다중 캐릭터형 봇</b><br/>• 메인 모델: 깊이 있는 분석에 적합 (Gemini 3.1 Pro, Claude 4.6 Sonnet)<br/>• 보조 모델: 중량급 처리에 적합 (Gemini 3 Flash)<br/>• 임베딩 모델: 다국어 벡터 검색용 (gemini-embedding-2-preview)`,
      mode_guide_title: "📖 모드 및 호출 빈도 안내",
      mode_guide_content: `<div style="border-top: 1px solid rgba(255, 152, 0, 0.1); padding-top: 12px;">
                    <!-- 🎯 모드 선택 (Indigo) -->
                    <div style="border-left: 4px solid var(--pse-accent-indigo); background: rgba(63, 81, 181, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-indigo); font-size: 14px;">🎯 모드 선택</b>
                      <div style="margin-top: 6px; display: grid; gap: 4px; margin-bottom: 8px;">
                        <div>• <b>설정 차이:</b> 「설정 1」은 일반 봇용이며, 「설정 2」는 복잡한 시나리오용입니다.</div>
                        <div>• <b>추출:</b> 대화 내용을 압축하여 기존의 긴 기록을 대체하고 토큰을 절약합니다.</div>
                      </div>

                      <div style="background:rgba(63, 81, 181, 0.1); border:1px solid rgba(63, 81, 181, 0.2); padding:8px; border-radius:6px;">
                        <div style="color:var(--pse-accent-indigo); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(63, 81, 181, 0.1);">🧩 기능 설명</div>
                        <div style="font-size:12px; color:var(--pse-text); display:grid; gap:4px;">
                          <div>• <b>디렉터:</b> 시나리오의 흐름과 캐릭터 반응을 가이드하여 깊이 있는 경험을 제공합니다.</div>
                          <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ 캐릭터 연기가 현실에 더 가까워지며, 생각과 성격을 바꾸기가 더 어려워집니다.</div>
                          <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ 프롬프트를 크게 조정해야 하며, 어느 정도의 프롬프트 수정 기초가 필요합니다.</div>
                          <div>• <b>봇 재구성:</b> 봇 데이터를 분석하여 프롬프트 내 가장 효율적인 위치로 재배치합니다.</div>
                          <div>• <b>벡터 검색:</b> 키워드 매칭 대신 의미 기반 검색을 통해 관련 정보의 밀도를 비약적으로 높입니다.</div>
                        </div>
                      </div>
                    </div>

                    <!-- 📊 모델 호출 빈도 (Indigo themed sub-blocks) -->
                    <div style="border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-blue); font-size: 14px;">📊 모델 호출 빈도</b>

                      <div style="margin-top: 8px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                          <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">대화 시작</span>
                          <span style="color: var(--pse-muted); font-size: 12px;">복잡한 설정일수록 초기화에 시간이 더 소요될 수 있습니다.</span>
                        </div>
                        <div style="display: grid; gap: 6px; padding-left: 4px; margin-bottom: 12px;">
                          <div style="display: flex; flex-direction: column;">
                            <span><b>디렉터:</b> 페르소나 추출을 위해 메인 모델 호출</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 비용은 캐릭터 수에 비례합니다.</span>
                          </div>
                          <div style="display: flex; flex-direction: column;">
                            <span><b>봇 재구성:</b> 데이터 분류를 위해 보조 모델 호출</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 비용은 봇 데이터 양에 비례합니다.</span>
                          </div>
                          <div style="display: flex; flex-direction: column;">
                            <span><b>벡터 검색:</b> 인덱스 구축을 위해 임베딩 모델 호출</span>
                            <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 비용은 봇 데이터 양에 비례합니다.</span>
                          </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                          <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">대화 중</span>
                        </div>
                        <div style="display:grid; gap:8px; padding-left:4px;">
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">✨ 추출 모드</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>설정 1:</b> 메인 (10, 15 턴마다), 보조 (턴당 2회 + 3턴마다)<br/>
                              • <b>설정 2:</b> 메인 (3, 10, 15 턴마다), 보조 (턴당 3회 + 2, 3턴마다)
                            </div>
                          </div>
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">🎬 추출 + 디렉터</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>설정 1:</b> 메인 (10, 15 턴마다), 보조 (턴당 4회 + 3턴마다)<br/>
                              • <b>설정 2:</b> 메인 (4, 10, 15 턴마다), 보조 (턴당 4회 + 2, 3턴마다)
                            </div>
                          </div>
                          <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                            <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">⚙️ 디렉터 & 벡터 검색</div>
                            <div style="font-size:12px; color:var(--pse-text);">
                              • <b>주기:</b> 인덱스 유지를 위해 임베딩 모델을 턴당 1회 호출합니다.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 🚀 채팅 이어가기 (Teal) -->
                    <div style="border-left: 4px solid var(--pse-accent-teal, #009688); background: rgba(0, 150, 136, 0.08); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
                      <b style="color: var(--pse-accent-teal, #009688); font-size: 14px;">🚀 채팅 이어가기</b>
                      <div style="margin-top: 6px; display: grid; gap: 4px; font-size: 12px; color: var(--pse-text);">
                        <div>• 렉이 느껴질 때 이 기능을 사용하세요.</div>
                        <div>• 「채팅 이어가기」를 클릭하면 해당 캐릭터의 채팅 목록이 나타납니다. 이어가고 싶은 기록을 선택하세요.</div>
                        <div>• 이후 접미사 (continue)가 붙은 기록을 사용하여 대화를 이어갈 수 있습니다.</div>
                      </div>
                    </div>
                  </div>`,
      btn_reset_factory: "모든 설정을 기본값으로 초기화",
      editor_cancel: "취소",
      editor_apply: "적용",
      aria_close: "닫기",
      lbl_lore_entry: "로어북 항목",
      lbl_write_mode: "쓰기 모드 (덮어쓰기/추가)",
      lbl_always_active: "항상 활성화",
      yes: "예",
      no: "아니요",
      lbl_output_format: "출력 형식 (JSON Schema)",
      ret_after_lbl: "경과 후",
      ret_mid_lbl: "턴 후 자동 정리 실행, 최신 데이터만 유지",
      ret_end_lbl: "턴 데이터",
      ret_enabled_title:
        "활성화 후 지정 턴 수에 도달하면 이 항목의 오래된 데이터를 자동으로 정리하고 최신 몇 턴 내용만 유지합니다",
      ret_after_title: "이 턴 수를 초과하면 정리 시작 (0 = 즉시)",
      ret_keep_title: "정리 후 유지할 최신 턴 블록 수 (0 = 전체 삭제)",
      lbl_call_note: "호출 메모",
      lbl_call_model: "모델",
      opt_main: "메인 모델",
      opt_aux: "보조 모델",
      lbl_freq: "트리거 빈도 (턴)",
      lbl_read_rounds: "대화 턴 수 읽기 (0=전부)",
      lbl_read_lore: "연관 로어북 항목 (쉼표로 구분)",
      lbl_read_persona: "페르소나 캐시 읽기 (쉼표로 구분)",
      btn_add_entry: "쓰기 항목 추가",
      callnote_a: "목적 메모A",
      callnote_b: "목적 메모B",
      callnote_n: (n) => `목적 메모${n}`,
      default_callnote: "목적 메모A",
      expand_anchor: "시스템 앵커 프롬프트 - 확대 편집",
      expand_prefill: "어시스턴트 프리필 - 확대 편집",
      expand_prereply: "사전 응답 프롬프트 - 확대 편집",
      expand_classify: "분류 앵커 프롬프트 - 확대 편집",
      expand_generic: "프롬프트 내용 편집",
      expand_format: "출력 형식 (JSON Schema) - 확대 편집",
      sec_json_tools: "프롬프트 JSON",
      btn_json_export: "설정 내보내기",
      btn_json_import: "설정 가져오기",
      json_file_accept: ".json,application/json",
      st_json_exported: "프롬프트 JSON을 내보냈습니다.",
      st_json_imported: "프롬프트 JSON을 가져와 바로 저장했습니다.",
      err_json_import_invalid:
        "가져온 JSON 형식이 올바르지 않습니다. 이 UI에서 내보낸 JSON을 사용해 주세요.",
      err_json_import_mode:
        "가져온 JSON 유형이 현재 탭과 맞지 않습니다. 올바른 프리셋 또는 페르소나 JSON을 선택해 주세요.",
      lbl_thinking: "사고 토큰",
      lbl_thinking_level: "사고 수준",
      thinking_title: "이 모델에 대한 확장 사고 활성화",
      opt_thinking_auto: "Auto (적응형)",
      opt_thinking_low: "Low",
      opt_thinking_medium: "Medium",
      opt_thinking_high: "High",
      aux_failed: "보조 모델 실행 실패:\n",
      entry_save_failed: "항목 저장 실패:\n",
      no_conv: "건너뜀: beforeRequest 페이로드에 사용 가능한 대화 텍스트 없음.",
      aux_abort_default: "보조 모델 호출 또는 처리 실패",
      aux_abort_suffix:
        "API 쿼터를 보호하기 위해 메인 모델 요청이 중단되었습니다.",
      step0_abort_warning: (err) =>
        `⚠️ Step 0이 완료되지 않았습니다. 쿼터 보호를 위해 메인 모델 요청을 차단했습니다.\n오류: ${err}\n\n잠시 후 재생성/전송을 눌러주세요.`,
      unknown_reason: "알 수 없는 오류",
      aux_error_line: ({ callName, target, provider, model, reason }) =>
        `호출 "${callName}" (모델 ${target}, 제공자 ${provider}, 모델 ${model}) 실패: ${reason}`,
      err_json_expected: (name) =>
        `보조 모델 (${name})은 JSON 객체를 반환해야 하지만 파싱에 실패했습니다.`,
      err_validation_failed: (name, issues) =>
        `보조 모델 출력 검증 실패 (${name}): ${issues}.`,
      err_unusable_output: (name) =>
        `보조 모델 출력을 사용할 수 없습니다 (${name}).`,
      err_persona_pair_missing: (missing) =>
        `페르소나 핵심 쌍 누락: ${missing}. rp_persona_inventory와 rp_character_core 둘 다 필요합니다.`,
      err_persona_cache_missing: (reason) =>
        `페르소나 캐시 구축 실패: ${reason}. 쿼터 보호를 위해 메인 모델 요청이 차단되었습니다. 문제를 해결한 뒤 다시 시도하세요.`,
      err_extractor_empty: (mode) => `추출기 ${mode}가 빈 내용을 반환했습니다.`,
      warn_parse_failed:
        "⚠️ 정적 지식 청크를 파싱할 수 없습니다. Step 0이 완료되었는지 확인하십시오.",
      warn_no_chunks:
        "⚠️ 사용 가능한 청크가 없습니다. 지식 주입을 건너뜜. Step 0이 완료되었는지 확인하십시오.",
      log_step0_start:
        "백그라운드 지식 베이스 초기화 시작 (Step 0)... 잠시 기다려 주세요.",
      log_step0_start_keyword:
        "백그라운드 지식 베이스 분류 시작 (Step 0, 키워드 모드)... 잠시 기다려 주세요.",
      log_step0_start_classify_done:
        "분류 완료. 벡터 임베딩만 구축 중 (Step 0)... 잠시 기다려 주세요.",
      log_step0_start_reembed: (oldModel, newModel) =>
        `임베딩 모델 변경 (${oldModel} → ${newModel}). 새 모델로 재인덱싱 중 (Step 0)... 잠시 기다려 주세요.`,
      log_step0_complete: "지식 베이스 초기화 완료!",
      log_step0_failed: (err) => `❌ 지식 베이스 초기화 실패: ${err}`,
      log_step0_fail_fallback: (err) =>
        `⚠️ 지식 베이스 분류 실패, 폴백 모드로 계속 진행: ${err}`,
      err_vec_kb_failed: (err) =>
        `[RisuAI Agent] 벡터 지식 베이스 구축 실패/타임아웃. 진행 상황이 저장되었습니다.\n오류: ${err}\n잠시 후 "재생성/전송"을 클릭하여 이어서 진행하십시오.`,
      copilot_refresh: "Copilot 토큰 갱신",
      help_tab_main: "홈",
      help_tab_p1: "프리셋 1",
      help_tab_p2: "프리셋 2",
      mode_guide_title: "📖 모드 설명 및 모델 호출 가이드",
      mode_guide_click: "(클릭하여 펼치기/접기)",
      help_html: `<div style="font-family: inherit; line-height: 1.5;">
  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #E91E63; background: rgba(233, 30, 99, 0.05);">
    <div style="font-weight: bold; color: #E91E63; margin-bottom: 8px;">🦮 플러그인 안내</div>
    <div style="margin-bottom: 4px;">• <b>활성화 설정:</b> 개별 봇의 플러그인 모드를 설정합니다. 설정이 완료되면 어떤 프리셋 프롬프트 수정이 적용되는지 안내합니다. 태그를 클릭하면 설명 페이지로 이동합니다.</div>
    <div style="margin-bottom: 4px;">• <b>코어 모델:</b> 메인 모델, 보조 모델, 임베딩 모델의 설정값과 파라미터를 지정합니다. RisuAI 본체에서 사용하는 모델과는 별개입니다.</div>
    <div style="margin-bottom: 4px;">• <b>캐시 저장소:</b> 봇 분류, 벡터 검색, 캐릭터 핵심 데이터를 저장합니다. 확인, 새로고침, 삭제가 가능합니다.</div>
    <div style="margin-bottom: 4px;">• <b>정보 추출:</b> 고급 사용자용. 디렉터 및 추출 모드의 세부 사항을 사용자 정의할 수 있습니다.</div>
    <div>• <b>벡터 검색:</b> 고급 사용자용. 벡터 검색의 세부 사항을 사용자 정의할 수 있습니다.</div>
  </div>

  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #FFB300; background: rgba(255, 179, 0, 0.05);">
    <div style="font-weight: bold; color: #FB8C00; margin-bottom: 8px;">📜 프리셋 호환성 안내</div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: #43A047; margin-bottom: 4px;">✅ 호환 가능</div>
      • 플러그인 모드 유지 시 대화 도중 프리셋(Preset) 전환 가능.<br>
      • 대화 중에도 봇 재구성과 벡터 검색 기능을 전환할 수 있습니다.<br>
      • 비플러그인 모드로의 매끄러운 전환 지원.
    </div>
    <div>
      <div style="font-weight: bold; color: #E53935; margin-bottom: 4px;">❌ 주의사항</div>
      • 기본 프리셋 프롬프트 수정 필수.<br>
      • 플러그인 미사용 대화 기록과 직접 연결 불가.<br>
      • 대화 도중 플러그인을 반복해서 On/Off 하지 마세요.
    </div>
  </div>

  <div style="padding: 12px; border-radius: 8px; border-left: 4px solid #4CAF50; background: rgba(76, 175, 80, 0.05);">
    <div style="font-weight: bold; color: #2E7D32; margin-bottom: 8px;">📂 데이터 저장 안내</div>
    • 정보 추출 기록은 <b>로어북 > 채팅</b> 항목에 저장되며 언제든지 확인하거나 수정할 수 있습니다.<br>
    • 봇 분류, 벡터 검색 및 캐릭터 핵심의 인덱스 데이터는 <b>캐시 저장소</b>에 저장됩니다.
  </div>
</div>

  <div style="padding: 12px; border-radius: 8px; border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05);">
    <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 8px;">⁉️ Q&A</div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ <b style="color: var(--pse-accent-red); font-size: 13px;">ERROR 400: 지원되지 않는 모델</b>이 발생하는 경우</div>
      • Claude, DeepSeek, Mistral 등 프리필(Prefill) 형식을 지원하지 않는 모델을 사용 중일 수 있습니다.<br/>
      • 정보 추출 > 공통 프롬프트에서 <b style="color: var(--pse-accent-red); font-size: 13px;">사전 응답 프롬프트</b>를 비우고 저장해 주세요.<br/>
      • 여전히 오류가 발생하면 <b style="color: var(--pse-accent-red); font-size: 13px;">어시스턴트 프리필</b>도 비워주세요.
    </div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ 검열로 인해 빈 응답이 나오거나 출력이 안 될 때</div>
      데이터가 작은 단위로 나뉘어 있어 NSFW 농도가 높게 측정될 수 있으며, 이로 인해 검열 가능성이 높아집니다.<br/>
      • 프리필 프롬프트를 강화하십시오. 단, 과도한 탈옥은 모델 성능과 출력 품질 저하를 유발할 수 있습니다.<br/>
      • 검열이 적은 모델로 교체하십시오.
    </div>
    <div>
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ 정보 추출 프롬프트 수정 시 고급 사용자 주의사항</div>
      • 가능한 동일한 JSON 템플릿 구조를 유지하십시오.<br/>
      • 로어북 항목 이름이 JSON의 첫 번째 태그(Tag)와 일치해야 시스템에 정상적으로 기록됩니다.
    </div>
  </div>`,
      lbl_loading: "로딩 중...",
      sec_suggest: "🖥️ 권장 모델",
      lbl_suggest_s1: "설정 1: 단일 캐릭터 또는 가벼운 모험용 봇",
      lbl_suggest_s2: "설정 1 또는 2: 인물이 많거나 설정이 복잡한 봇",
      lbl_suggest_s1_main:
        "메인 모델: 대량의 데이터를 요약할 수 있는 모델 (Gemini 3 Flash)",
      lbl_suggest_s1_aux:
        "보조 모델: 비코딩(Non-coding) 모델 (Gemini 3.1 Flash Lite)",
      lbl_suggest_s1_embed:
        "임베딩 모델: 다국어 벡터 검색 모델 (gemini-embedding-2-preview)",
      lbl_suggest_s2_main:
        "메인 모델: 대량의 데이터를 분석할 수 있는 모델 (Gemini 3.1 Pro, Claude 4.6 Sonnet)",
      lbl_suggest_s2_aux:
        "보조 모델: 일정 수준의 분석 능력을 갖춘 모델 (Gemini 3 Flash)",
      lbl_suggest_s2_embed:
        "임베딩 모델: 다국어 벡터 검색 모델 (gemini-embedding-2-preview)",
      lbl_mode_reorg_vec: "봇 재구성 및 벡터 검색 모드:",
      lbl_cbs_manual:
        "현재 CBS 구문을 파싱할 수 없으므로 수동 조정이 필요합니다.",
      lbl_adjustment_method: "조정 방법:",
      lbl_toggle_type: "On/Off형:",
      lbl_toggle_desc: "필요한 설정으로 직접 조정하세요.",
      lbl_param_type: "매개변수형:",
      lbl_param_desc: "전체 데이터를 작가의 노트(Author's Note)로 옮기세요.",
      lbl_director_vec: "디렉터 & 벡터 검색:",
      lbl_embed_per_turn: "임베딩 모델 턴당 1회",
      lbl_new_chat: "대화 시작",
      lbl_during_chat: "대화 중",
      lbl_init_time: "설정이 복잡할수록 초기화에 더 많은 시간이 소요됩니다",
      lbl_director_call: "디렉터: 페르소나 추출을 위해 메인 모델 호출",
      lbl_reorg_call: "봇 재구성: 데이터 분류를 위해 보조 모델 호출",
      lbl_vec_call: "벡터 검색: 인덱스 구축을 위해 임베딩 모델 호출",
      lbl_cost_chars: "소모량은 캐릭터 수에 비례합니다",
      lbl_cost_data: "소모량은 봇 데이터 양에 비례합니다",
      lbl_extraction_mode: "✨ 추출 모드",
      lbl_extraction_director: "🎬 추출 + 디렉터",
      lbl_s1_freq_ext: "설정 1: 메인 (10-15 턴마다), 보조 (턴당 2회 + 3턴마다)",
      lbl_s2_freq_ext:
        "설정 2: 메인 (3-15 턴마다), 보조 (턴당 3회 + 2 & 3턴마다)",
      lbl_s1_freq_dir:
        "설정 1: 메인 (10, 15 턴마다), 보조 (턴당 4회 + 3턴마다)",
      lbl_s2_freq_dir:
        "설정 2: 메인 (4, 10, 15 턴마다), 보조 (턴당 4회 + 2 & 3턴마다)",
      help_p1_html: `<div style="border-left: 4px solid var(--pse-accent-amber); background: rgba(255, 171, 0, 0.05); padding: 12px; border-radius: 8px;">
                      <b style="color: var(--pse-accent-amber); font-size: 14px;">🛠️ 프리셋 조정 가이드</b>
                      <div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                        <div style="margin-bottom: 4px;">1. <b>삭제 항목:</b> Supa/HypaMemory.</div>
                        <div style="margin-bottom: 4px;">2. <b>고급 설정:</b> 채팅 진입 > 「고급」 체크 후 「범위 시작」을 <b>-10</b>으로 설정.</div>
                        <div>3. 아래의 시스템 프롬프트를 복사한 후, 봇 > 프롬프트 페이지로 이동하여 <b>최상단 시스템 프롬프트</b>를 열고 프롬프트를 <b>가장 마지막에</b> 삽입하십시오.</div>
                      </div>
                      <div style="margin-top:12px;">
                        <textarea class="pse-code-window" readonly># PRIORITY ORDER
Read upstream layers in this order. When layers conflict, higher layers win.
1. Hard constraints
\`rp_logic_state.known_contradiction\` | \`rp_turn_advice.response_guard\`
2. Current portrayal
\`rp_turn_advice.character_routing\` | \`rp_scene_and_role_state\`
3. Durable continuity
\`rp_persona_evolution_state\` | \`rp_persistent_memory\` | \`rp_arc_memory\` | \`rp_turn_trace\` | \`rp_facet_activation_ledger\` | \`rp_recent_world_entries\` | \`rp_world_encyclopedia\`</textarea>
                        <button class="pse-btn pse-copy-sql-btn" type="button" style="width:100%;padding:6px;font-size:12px;background:var(--pse-accent-greyblue);">📋 시스템 프롬프트 복사</button>
                      </div>
                    </div>`,
      help_p2_html: `<div style="border-left: 4px solid var(--pse-accent-rose); background: rgba(255, 23, 68, 0.05); padding: 12px; border-radius: 8px;">
                      <b style="color: var(--pse-accent-rose); font-size: 14px;">🛠️ 프리셋 조정 가이드</b>
                      <div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                        <div style="margin-bottom: 4px;">1. <b>삭제 항목:</b> 캐릭터 설명(Character Description), 로어북(Lorebook), 글로벌 노트(Global Note), Supa/HypaMemory.</div>
                        <div style="margin-bottom: 4px;">2. <b>고급 설정:</b> 채팅 진입 > 「고급」 체크 후 「범위 시작」을 <b>-10</b>으로 설정.</div>
                        <div>3. 아래의 시스템 프롬프트를 복사한 후, 봇 > 프롬프트 페이지로 이동하여 <b>최상단 시스템 프롬프트</b>를 열고 프롬프트를 삽입한 다음, <b style="color: var(--pse-accent-rose); font-size: 13px;">시스템 프롬프트 안에서 AI의 신분을 배우(Actor)로 강등</b>시키세요.</div>
                        <div>기존 프롬프트의 <b style="color: var(--pse-accent-amber); font-size: 13px;">Director</b>, <b style="color: var(--pse-accent-amber); font-size: 13px;">Planner</b>, <b style="color: var(--pse-accent-amber); font-size: 13px;">Narrator</b>, <b style="color: var(--pse-accent-amber); font-size: 13px;">Storyteller</b> 계층 관련 내용을 <b style="color: var(--pse-accent-rose); font-size: 13px;">Actor</b>, <b style="color: var(--pse-accent-rose); font-size: 13px;">Executor</b> 계층으로 강등시키십시오.</div>
                      </div>
                      <div style="margin-top:12px;">
                        <textarea class="pse-code-window" readonly># CORE TASK
- Perform one in-world response only.
- Act as executor, not planner.
- Use upstream plugin entries as the main continuity and routing source.
- If upstream is silent or uncertain, prefer restraint over invention.

# MEMORY LAW
- Direct memory covers only recent turns.
- Treat injected upstream layers (## rp_*, world notes, retrieved logs) as the main continuity source.
- Do not invent unseen past events, hidden promises, strategic history, or emotional carryover absent from visible dialogue or injected layers.

# ROLE BOUNDARY
- Upstream plugin entries already handled most filtering, compression, routing, and low-frequency reflection.
- Do not replace them with a sweeter, cleaner, or more convenient interpretation.
- Your task is not to summarize the character, but to perform the next moment.

# INFORMATION BOUNDARY
- A character may know their own inner state.
- For others, infer only from visible speech, action, silence, timing, and established memory.
- Never write another character's hidden interior as certain fact unless clearly supported.

# PRIORITY ORDER
Read upstream layers in this order. When layers conflict, higher layers win.
1. Hard constraints
\`rp_logic_state.known_contradiction\` |  \`rp_turn_advice.response_guard\` | 
2. Current portrayal
\`rp_turn_advice.character_routing\` | \`rp_scene_and_role_state\`
3. Durable continuity
\`rp_persona_evolution_state\` | \`rp_persistent_memory\` | \`rp_arc_memory\` | \`rp_turn_trace\` | \`rp_facet_activation_ledger\` | 
\`rp_recent_world_entries\` | \`rp_world_encyclopedia\`

Practical conflict rule:
- Hard constraints > Current portrayal > Durable continuity
- If only Durable continuity is available, keep execution restrained and literal.
- When in doubt, \`## rp_turn_advice\` is the most authoritative routing source.

# EXECUTION RULES
- Let \`rp_turn_advice\` decide the visible hierarchy.
- Use \`rp_scene_and_role_state\` for tone, stakes, and current pressure.
- Keep the response narrow: one main beat, one dominant facet, one clear stance.
- If \`strict_directive\` restricts, obey it.
- Never surface suppressed facets unless forced by the scene.</textarea>
                        <button class="pse-btn pse-copy-sql-btn" type="button" style="width:100%;padding:6px;font-size:12px;background:var(--pse-accent-greyblue);">📋 시스템 프롬프트 복사</button>
                      </div>
                    </div>`,
    },

    tc: {
      append: "添加",
      overwrite: "覆蓋",
      tab_help: "預設說明",
      tab_model: "核心模型",
      tab_entry: "資訊萃取",
      tab_enable: "啟用設置",
      tab_vector_open: "向量搜尋",
      tab_cache_open: "快取倉庫",
      tab_common: "共同提示詞",
      tab_preset1_old: "設定 1 (萃取)",
      tab_preset2_old: "設定 2 (萃取)",
      tab_preset1_new: "設定 1 (萃取 + 導演)",
      tab_preset2_new: "設定 2 (萃取 + 導演)",
      tab_char_extract: "角色人格萃取",
      tab_preset3: "設定 3",
      tab_preset4: "設定 4",
      sec_a: "主要模型",
      sec_b: "輔助模型",
      sec_embed_title: "嵌入模型",
      embed_warn:
        "⚠️ 不同嵌入模型的向量互不相容。更換模型後，系統將自動重建向量索引。",
      lbl_provider: "提供者",
      lbl_format: "請求格式",
      lbl_url: "請求地址 (URL)",
      lbl_key: "API 金鑰",
      lbl_model: "模型",
      lbl_temp: "溫度",
      lbl_concur: "請求模式 (Concurrency)",
      opt_concurrent: "併發 (允許同時發送複數請求)",
      opt_sequential: "序列 (僅限單線程請求)",
      sec_lore_calls: "ローブック (Lorebook) 寫入設定",
      tag_temp_closed: "關閉",
      warn_kb_feature_enable:
        "⚠️ 啟用「卡片重組」與「向量搜尋」將改變預設提示詞結構，且目前不支援 CBS 語法解析。請先閱讀說明文件並手動調整提示詞後再行開啟。",
      opt_vec_card_reorg: "僅啟用卡片重組",
      opt_vec_preset1: "設定 1 (卡片重組 + 向量搜尋)",
      opt_vec_preset2: "設定 2 (卡片重組 + 向量搜尋)",
      lore_warn: "⚠️ Agent 運作期間請勿手動編輯 Lorebook，以免被自動覆蓋。",
      btn_add_call: "新增呼叫任務",
      lbl_anchor: "系統定位提示詞",
      lbl_prefill: "助理預填充 (Assistant Prefill)",
      lbl_prereply: "預回覆提示詞",
      aria_expand: "放大編輯",
      sec_vec: "向量搜尋",
      lbl_query_rounds: "以最近幾輪對話作為搜尋關鍵",
      lbl_topk: "Top K (回傳條目數)",
      lbl_minscore: "最低相似度分數門檻 (0~1)",
      sec_classify: "分類模型設定",
      lbl_use_model: "使用模型",
      opt_main_model: "主要模型",
      opt_aux_model: "輔助模型",
      lbl_classify_anchor: "分類定位提示詞",
      lbl_classify_model: "分類模型",
      lbl_enable_mod_lorebook: "將模組中的 Lorebook 納入向量搜尋範圍",
      sec_card_settings: "卡片功能開關",
      lbl_card_name: "卡片",
      lbl_memory_extract: "啟用資訊萃取",
      lbl_vector_search_card: "對此卡片啟用向量搜尋",
      lbl_card_disabled: "不啟用此插件",
      btn_continue_chat: "接續聊天",
      dlg_continue_chat_title: "選擇要接續的聊天",
      dlg_continue_chat_empty: "這個角色目前沒有任何聊天。",
      dlg_continue_chat_turns: "回合",
      dlg_continue_chat_current: "目前",
      opt_off: "關閉",
      opt_preset1: "設定 1",
      opt_preset2: "設定 2",
      no_cards: "資料庫中找不到任何卡片。",
      sec_cache: "快取倉庫",
      btn_refresh_cache: "更新快取列表",
      btn_clear_cache: "清除所有快取",
      btn_delete_vector: "刪除向量資料",
      btn_reset: "將所有設定重置為出廠設定",
      lbl_card: "",
      lbl_entries: "條目數",
      lbl_filesize: "檔案大小",
      btn_delete: "刪除",
      btn_refresh_persona: "追加未登錄角色",
      lbl_classify_only: "僅進行分類",
      lbl_chunks: "條目數",
      tag_vector: "向量",
      tag_classify: "分類",
      tag_persona: "人格",
      btn_save: "儲存設定",
      btn_close: "關閉",
      preset1: "設定 1",
      preset2: "設定 2",
      no_cache: "目前沒有向量快取資料。",
      confirm_clear:
        "確定要清除全部向量快取嗎？\n這將刪除所有卡片的快取資料，下次對話時系統將會重新建立。",
      confirm_reset:
        "確定要將所有設定重置為出廠預設嗎？\n目前的插件設定將被預設值取代。",
      st_cache_refreshed: "已更新向量快取列表。",
      st_cache_cleared: "已清除全部向量快取，下次對話時將重新建立。",
      st_card_deleted: "已刪除該卡片的向量快取。",
      st_persona_refreshed: "人格快取已重刷。",
      st_persona_refresh_failed: "人格刷新失敗：",
      st_persona_refresh_no_chunks: "人格刷新跳過：找不到 Step 0 分塊。",
      st_feature_coming: "尚未提供。",
      st_saved: "設定已成功儲存。",
      st_save_fail: "儲存失敗：",
      st_continue_chat_done: "已建立接續聊天視窗並切換過去。",
      st_continue_chat_failed: "接續聊天失敗：",
      st_continue_chat_no_chat: "找不到可接續的目前聊天視窗。",
      st_continue_chat_no_chat_for_card: "這個角色目前沒有可接續的聊天。",
      st_reset: "已重置為 Agent 預設值。",
      st_reset_fail: "重置失敗：",
      lbl_persona_entries: "角色萃取條目",
      lbl_delete_char_cache: "刪除此角色的快取",
      lbl_no_persona_data: "找不到角色資料。",
      btn_reset_factory: "將所有設定重置為出廠預設",
      editor_cancel: "取消",
      editor_apply: "應用",
      aria_close: "關閉",
      lbl_lore_entry: "Lorebook 條目",
      lbl_write_mode: "寫入模式 (覆蓋/添加)",
      lbl_always_active: "始終啟用",
      yes: "是",
      no: "否",
      lbl_output_format: "輸出格式 (JSON Schema)",
      ret_after_lbl: "於",
      ret_mid_lbl: "回合後自動清理，僅保留最新的",
      ret_end_lbl: "回合資料",
      ret_enabled_title:
        "啟用後，在達到指定回合數後，自動修剪此條目的舊資料，僅保留最新幾回合內容",
      ret_after_title: "累積超過此回合數後才開始修剪 (0 = 立即)",
      ret_keep_title: "清理後保留最新幾回合的區塊 (0 = 清空全部)",
      lbl_call_note: "呼叫備註",
      lbl_call_model: "模型",
      opt_main: "主要模型",
      opt_aux: "輔助模型",
      lbl_freq: "觸發頻率 (回合)",
      lbl_read_rounds: "讀取對話回合數 (0=全部)",
      lbl_read_lore: "關聯 Lorebook 條目 (逗號分隔)",
      lbl_read_persona: "讀取人格萃取快取 (逗號分隔)",
      btn_add_entry: "新增寫入條目",
      callnote_a: "目的備註A",
      callnote_b: "目的備註B",
      callnote_n: (n) => `目的備註${n}`,
      default_callnote: "目的備註A",
      expand_anchor: "系統定位提示詞 - 放大編輯",
      expand_prefill: "助理預填充 - 放大編輯",
      expand_prereply: "預回覆提示詞 - 放大編輯",
      expand_classify: "分類定位提示詞 - 放大編輯",
      expand_generic: "編輯提示詞內容",
      expand_format: "輸出格式 (JSON Schema) - 放大編輯",
      sec_json_tools: "提示詞 JSON",
      btn_json_export: "設定匯出",
      btn_json_import: "設定匯入",
      json_file_accept: ".json,application/json",
      st_json_exported: "已匯出提示詞 JSON。",
      st_json_imported: "已匯入並立即儲存提示詞 JSON。",
      err_json_import_invalid:
        "匯入的 JSON 格式不符合。請使用由此介面匯出的 JSON。",
      err_json_import_mode:
        "匯入的 JSON 類型與目前分頁不符。請匯入對應的預設或人格 JSON。",
      lbl_thinking: "思考 Tokens",
      lbl_thinking_level: "思考等級",
      thinking_title: "為此模型啟用延伸思考",
      opt_thinking_auto: "Auto（自適應）",
      opt_thinking_low: "Low",
      opt_thinking_medium: "Medium",
      opt_thinking_high: "High",
      aux_failed: "輔助模型執行失敗：\n",
      entry_save_failed: "條目儲存失敗：\n",
      no_conv: "跳過：beforeRequest 酬載中無可用對話文字。",
      aux_abort_default: "輔助模型呼叫或處理失敗",
      aux_abort_suffix: "為保護 API 配額，主模型請求已被攔截中止。",
      step0_abort_warning: (err) =>
        `⚠️ Step 0 尚未完成。為避免浪費額度，已鎖定主模型請求。\n錯誤：${err}\n\n請稍候後點擊「重新生成/傳送」。`,
      unknown_reason: "未知錯誤",
      aux_error_line: ({ callName, target, provider, model, reason }) =>
        `呼叫「${callName}」（模型 ${target}、提供者 ${provider}、model ${model}）失敗：${reason}`,
      err_json_expected: (name) =>
        `輔助模型 (${name}) 必須回傳 JSON 物件，但解析失敗。`,
      err_validation_failed: (name, issues) =>
        `輔助模型輸出驗證失敗 (${name})：${issues}。`,
      err_unusable_output: (name) => `輔助模型輸出無法使用 (${name})。`,
      err_persona_pair_missing: (missing) =>
        `人格核心配對缺失：${missing}。必須同時有 rp_persona_inventory 與 rp_character_core。`,
      err_persona_cache_missing: (reason) =>
        `人格快取建立失敗：${reason}。為避免浪費配額，已阻擋主模型請求。請修正問題後重試。`,
      err_extractor_empty: (mode) => `提取器 ${mode} 回傳內容為空。`,
      warn_parse_failed: "⚠️ 無法解析靜態知識分塊。請檢查 Step 0 是否已完成。",
      warn_no_chunks:
        "⚠️ 無可用分塊。已跳過知識注入。請檢查 Step 0 是否已完成。",
      log_step0_start: "正在背景初始化知識庫 (Step 0)... 請稍候。",
      log_step0_start_keyword:
        "正在背景分類知識庫 (Step 0，關鍵字模式)... 請稍候。",
      log_step0_start_classify_done:
        "分類已完成。僅建立向量嵌入 (Step 0)... 請稍候。",
      log_step0_start_reembed: (oldModel, newModel) =>
        `嵌入模型已變更 (${oldModel} → ${newModel})。正在以新模型重新索引 (Step 0)... 請稍候。`,
      log_step0_complete: "知識庫初始化完成！",
      log_step0_failed: (err) => `❌ 知識庫初始化失敗：${err}`,
      log_step0_fail_fallback: (err) =>
        `⚠️ 知識庫分類失敗，以備用模式繼續運行：${err}`,
      err_vec_kb_failed: (err) =>
        `[RisuAI Agent] 向量知識庫建立失敗/逾時。進度已儲存。\n錯誤：${err}\n請稍等片刻，再點選「重新生成/傳送」繼續從中斷處恢復。`,
      copilot_refresh: "Copilot token refresh",
      help_tab_main: "說明首頁",
      help_tab_p1: "預設設定1",
      help_tab_p2: "預設設定2",
      mode_guide_title: "📖 模式說明與模型呼叫指南",
      mode_guide_click: "(點擊展開/收起)",
      mode_guide_content: `<div style="border-top: 1px solid rgba(255, 152, 0, 0.1); padding-top: 12px;">
        
        <!-- 🎯 模式選擇 (Indigo) -->
        <div style="border-left: 4px solid var(--pse-accent-indigo); background: rgba(63, 81, 181, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
          <b style="color: var(--pse-accent-indigo); font-size: 14px;">🎯 模式選擇</b>
          <div style="margin-top: 6px; display: grid; gap: 4px; margin-bottom: 8px;">
            <div>• <b>設定差異：</b>「設定 1」適用於一般卡片；「設定 2」專為劇情複雜的卡片設計。</div>
            <div>• <b>萃取：</b>濃縮對話記錄，取代傳統的長回合對話與 Supa/Hypa Memory。</div>
          </div>

            <div style="background:rgba(63, 81, 181, 0.1); border:1px solid rgba(63, 81, 181, 0.2); padding:8px; border-radius:6px;">
              <div style="color:var(--pse-accent-beige); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(63, 81, 181, 0.1);">🧩 功能說明</div>
              <div style="font-size:12px; color:var(--pse-text); display:grid; gap:4px;">
                <div>• <b>導演：</b>指導劇情、角色反應與變化，強化角色的立體感與劇情連貫度。</div>
                <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ 此模式角色演繹會更接近現實，想法跟性格將較難改變</div>
                <div style="color: var(--pse-accent-red); font-size: 11px;">⚠️ 需要對提示詞進行較大調整，要有一定的提示詞修改基礎</div>
                <div>• <b>卡片重組：</b>將卡片重新分類後，放進提示詞結構中最有效的位置。</div>
                <div>• <b>向量搜尋：</b>取代傳統的關鍵字觸發，提高有效資訊密度。</div>
              </div>
            </div>
        </div>

        <!-- 📊 模型呼叫頻率 (Indigo themed sub-blocks) -->
        <div style="border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
          <b style="color: var(--pse-accent-blue); font-size: 14px;">📊 模型呼叫頻率</b>
          
          <div style="margin-top: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">開啟對話</span>
              <span style="color: var(--pse-muted); font-size: 12px;">越複雜的前置時間越長</span>
            </div>
            <div style="display: grid; gap: 6px; padding-left: 4px; margin-bottom: 12px;">
              <div style="display: flex; flex-direction: column;">
                <span><b>導演：</b>呼叫主要模型，進行人格萃取</span>
                <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 呼叫次數與tokens消耗與 <b>卡片角色人數</b> 成正比</span>
              </div>
              <div style="display: flex; flex-direction: column;">
                <span><b>卡片重組：</b>呼叫輔助模型，進行資料分類</span>
                <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 呼叫次數與tokens消耗與 <b>卡片資料量</b> 成正比</span>
              </div>
              <div style="display: flex; flex-direction: column;">
                <span><b>向量搜尋：</b>呼叫嵌入模型建立索引</span>
                <span style="color: var(--pse-accent-red); font-size: 11px;">🚸 呼叫次數與tokens消耗與 <b>卡片資料量</b> 成正比</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: var(--pse-accent-blue); color: white; padding: 1px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">之後聊天</span>
            </div>
            <div style="display:grid; gap:8px; padding-left:4px;">
              <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">✨ 萃取模式</div>
                <div style="font-size:12px; color:var(--pse-text);">
                  • <b>設定 1：</b>主要模型10、15回合各1次，輔助模型每回合2次 + 3回合1次<br/>
                  • <b>設定 2：</b>主要模型3、10、15回合各1次，輔助模型每回合3次 + 2、3回合各1次
                </div>
              </div>
              <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">🎬 萃取 + 導演</div>
                <div style="font-size:12px; color:var(--pse-text);">
                  • <b>設定 1：</b>主要模型10、15 回合各1次，輔助模型每回合4次 + 3回合1次<br/>
                  • <b>設定 2：</b>主要模型4、10、15回合各1次，輔助模型每回合4次 + 2、3回合各1次
                </div>
              </div>
              <div style="background:rgba(33, 150, 243, 0.1); border:1px solid rgba(33, 150, 243, 0.2); padding:8px; border-radius:6px;">
                <div style="color:var(--pse-accent-blue); font-weight:bold; font-size:12px; margin-bottom:4px; border-bottom:1px solid rgba(33, 150, 243, 0.1);">⚙️ 導演 & 向量搜尋</div>
                <div style="font-size:12px; color:var(--pse-text);">
                  • <b>頻率：</b>嵌入模型每回合呼叫1次。
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 🚀 接續聊天 (Teal) -->
        <div style="border-left: 4px solid var(--pse-accent-teal, #009688); background: rgba(0, 150, 136, 0.08); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px;">
          <b style="color: var(--pse-accent-teal, #009688); font-size: 14px;">🚀 接續聊天</b>
          <div style="margin-top: 6px; display: grid; gap: 4px; font-size: 12px; color: var(--pse-text);">
            <div>• 感受到Lag時再使用即可。</div>
            <div>• 點擊接續聊天之後，會跳出所有的聊天記錄。點擊你要接續的記錄即可。</div>
            <div>• 接下來，即可直接使用後綴帶有(continue)的記錄，繼續遊玩。</div>
          </div>
        </div>
      </div>`,
      help_html: `<div style="font-family: inherit; line-height: 1.5;">
  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #E91E63; background: rgba(233, 30, 99, 0.05);">
    <div style="font-weight: bold; color: #E91E63; margin-bottom: 8px;">🦮 外掛指南</div>
    <div style="margin-bottom: 4px;">• <b>啟用設置：</b>設定個別卡片的外掛模式。會跳出適用於哪一個預設設定。點擊標籤即可跳至說明頁面。</div>
    <div style="margin-bottom: 4px;">• <b>前導模型設定：</b>設定主要模型、輔助模型、嵌入模型。與 RisuAI 本體使用的模型無關。</div>
    <div style="margin-bottom: 4px;">• <b>快取倉庫：</b>存放 卡片分類 & 向量搜尋 & 角色核心 的資料。可檢視、補刷與刪除。</div>
    <div style="margin-bottom: 4px;">• <b>資訊萃取：</b>進階使用者使用。可自定義導演 & 萃取模式的細節。</div>
    <div>• <b>向量搜尋：</b>進階使用者使用。可自定義向量搜尋的細節。</div>
  </div>

  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #FFB300; background: rgba(255, 179, 0, 0.05);">
    <div style="font-weight: bold; color: #FB8C00; margin-bottom: 8px;">📜 預設提示詞相容性說明</div>
    <div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: #43A047; margin-bottom: 4px;">✅ 可以相容</div>
      • 外掛模式下，可中途切換預設提示詞。<br>
      • 外掛模式下，可中途切換卡片重組與向量搜尋功能。<br>
      • 可以直接接軌至無外掛模式。
    </div>
    <div>
      <div style="font-weight: bold; color: #E53935; margin-bottom: 4px;">❌ 注意事項</div>
      • 使用該外掛必須要修改預設提示詞。<br>
      • 無法接續無外掛對話記錄。<br>
      • 請勿在對話中途反覆開關外掛。
    </div>
  </div>

  <div style="padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #4CAF50; background: rgba(76, 175, 80, 0.05);">
    <div style="font-weight: bold; color: #2E7D32; margin-bottom: 8px;">📂 資料儲存說明</div>
    • 資訊萃取的記錄存放於 <b>Lorebook > 聊天</b> 條目內，可隨時檢閱或調整。<br>
    • <b>卡片分類 & 向量搜尋 & 角色核心</b> 的索引資料則會放置於 <b>快取倉庫</b> 內。
  </div>
</div>

  <div style="padding: 12px; border-radius: 8px; border-left: 4px solid var(--pse-accent-blue); background: rgba(33, 150, 243, 0.05);">
    <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 8px;">⁉️ 答客問</div>
<div style="margin-bottom: 8px;">
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ 如果出現 <b style="color: var(--pse-accent-red); font-size: 13px;">ERROR 400：呼叫模型不支援</b></div>
      • 代表你可能使用的是Claude、DeepSeek、Mistral不支援預填充格式<br>
      • 進到資訊萃取 > 共同提示詞，將<b style="color: var(--pse-accent-red); font-size: 13px;"> 預回覆提示詞 </b>清空後儲存。<br>
      • 若依然報錯，則進一步清除<b style="color: var(--pse-accent-red); font-size: 13px;"> 助理預填充 </b>。
    </div>
<div>
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ 如果被審查空回覆、無法輸出怎麼辦</div>
      因為資料量被切割成比較小塊，所以NSFW濃度比較高，進而增加被審查機率。<br>
      • 加強預填入提示詞。但越獄可能會導致性能下降，影響輸出品質。<br>
      • 換成審查力度較小的模型。
    </div>
<div>
      <div style="font-weight: bold; color: var(--pse-accent-blue); margin-bottom: 4px;">❓ 進階使用者、自行修改資訊萃取內提示詞的注意事項</div>
      • 最好維持相同的json範本。<br>
      • Lorebook條目名稱必須與json的第一個tag相同，才能順利寫入系統。
    </div>
  </div>`,

      lbl_loading: "載入中...",
      sec_suggest: "🖥️ 使用模型建議",
      lbl_suggest_s1: "設定1：單角色卡或輕度冒險卡",
      lbl_suggest_s2: "設定1或設定2：人物眾多、設定較複雜的卡片",
      lbl_suggest_s1_main: "主要模型：能彙整大量資料 (Gemini 3 Flash)",
      lbl_suggest_s1_aux: "輔助模型：非編碼模型 (Gemini 3.1 Flash Lite)",
      lbl_suggest_s1_embed:
        "嵌入模型：能跨語言向量搜尋 (gemini-embedding-2-preview)",
      lbl_suggest_s2_main:
        "主要模型：能分析大量資料 (Gemini 3.1 Pro、Claude 4.6 Sonnet)",
      lbl_suggest_s2_aux: "輔助模型：具一定分析能力 (Gemini 3 Flash)",
      lbl_suggest_s2_embed:
        "嵌入模型：能跨語言向量搜尋 (gemini-embedding-2-preview)",
      lbl_mode_reorg_vec: "卡片重組、向量搜尋模式：",
      lbl_cbs_manual: "目前無法解析 CBS 語法，所以需要進行相對應調整。",
      lbl_adjustment_method: "調整方式：",
      lbl_toggle_type: "開關型：",
      lbl_toggle_desc: "直接調整成你需要的設定。",
      lbl_param_type: "參數型：",
      lbl_param_desc: "將整筆資料移至作者備注。",
      lbl_director_vec: "⚙️ 導演 & 向量搜尋：",
      lbl_embed_per_turn: "嵌入模型每回合呼叫 1 次",
      lbl_new_chat: "開啟對話",
      lbl_during_chat: "之後聊天",
      lbl_init_time: "越複雜的前置時間越長",
      lbl_director_call: "導演：呼叫主要模型，進行人格萃取",
      lbl_reorg_call: "卡片重組：呼叫輔助模型，進行資料分類",
      lbl_vec_call: "向量搜尋：呼叫嵌入模型建立索引",
      lbl_cost_chars: "消耗與角色人數成正比",
      lbl_cost_data: "消耗與卡片資料量成正比",
      lbl_extraction_mode: "✨ 萃取模式",
      lbl_extraction_director: "🎬 萃取 + 導演",
      lbl_s1_freq_ext:
        "設定 1：主要 (10-15 回合/次), 輔助 (每回合 2 次 + 3 回合/次)",
      lbl_s2_freq_ext:
        "設定 2：主要 (3-15 回合/次), 輔助 (每回合 3 次 + 2 & 3 回合/次)",
      lbl_s1_freq_dir:
        "設定 1：主要 (10、15 回合/次), 輔助 (每回合 4 次 + 3 回合/次)",
      lbl_s2_freq_dir:
        "設定 2：主要 (4、10、15 回合/次), 輔助 (每回合 4 次 + 2 & 3 回合/次)",
      help_p1_html: `<div style="border-left: 4px solid var(--pse-accent-amber); background: rgba(255, 171, 0, 0.05); padding: 12px; border-radius: 8px;">
                      <b style="color: var(--pse-accent-amber); font-size: 14px;">🛠️ 預設提示詞 調整指南</b>
                      <div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                        <div style="margin-bottom: 4px;">1. 刪除欄位：<b>Supa/HypaMemory</b>。</div>
                        <div style="margin-bottom: 4px;">2. <b>進階設定：</b>進入聊天 > 勾選「進階」，然後將「範圍開始」設定為 <b>-10</b>。</div>
                        <div>3. 複製以下系統提示詞後，進到聊天機器人 > 提示詞頁面，打開 <b>頂部的系統提示詞</b> 後，將提示詞插入於最尾端</div>
                      </div>
                      <div style="margin-top:12px;">
                        <textarea class="pse-code-window" readonly># PRIORITY ORDER
Read upstream layers in this order. When layers conflict, higher layers win.
1. Hard constraints
\`rp_logic_state.known_contradiction\` | \`rp_turn_advice.response_guard\`
2. Current portrayal
\`rp_turn_advice.character_routing\` | \`rp_scene_and_role_state\`
3. Durable continuity
\`rp_persona_evolution_state\` | \`rp_persistent_memory\` | \`rp_arc_memory\` | \`rp_turn_trace\` | \`rp_facet_activation_ledger\` | \`rp_recent_world_entries\` | \`rp_world_encyclopedia\`</textarea>
                        <button class="pse-btn pse-copy-sql-btn" type="button" style="width:100%;padding:6px;font-size:12px;background:var(--pse-accent-greyblue);">📋 複製系統提示詞</button>
                      </div>
                    </div>`,
      help_p2_html: `<div style="border-left: 4px solid var(--pse-accent-rose); background: rgba(255, 23, 68, 0.05); padding: 12px; border-radius: 8px;">
                      <b style="color: var(--pse-accent-rose); font-size: 14px;">🛠️ 預設提示詞 調整指南</b>
                      <div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                        <div style="margin-bottom: 4px;">1. 刪除欄位：<b>角色敘述、Lorebook、全域備註、Supa/HypaMemory</b>。</div>
                        <div style="margin-bottom: 4px;">2. <b>進階設定：</b>進入聊天 > 勾選「進階」，然後將「範圍開始」設定為 <b>-10</b>。</div>
                        <div>3. 複製以下系統提示詞後，進到聊天機器人 > 提示詞頁面，打開 <b>頂部的系統提示詞</b> 後，將提示詞插入，<b style="color: var(--pse-accent-rose); font-size: 13px;">然後將系統提示詞，將AI的身分降格成演員</b>。</div>
<div>將原本提示詞中<b style="color: var(--pse-accent-amber); font-size: 13px;">Director</b>、<b style="color: var(--pse-accent-amber); font-size: 13px;">Planner</b>、<b style="color: var(--pse-accent-amber); font-size: 13px;">Narrator</b>、<b style="color: var(--pse-accent-amber); font-size: 13px;">Storyteller</b>層級的相關內容，降格成<b style="color: var(--pse-accent-rose); font-size: 13px;">Actor</b>、<b style="color: var(--pse-accent-rose); font-size: 13px;">Executor</b>層級。</div>
                      </div>
                      <div style="margin-top:12px;">
                        <textarea class="pse-code-window" readonly># CORE TASK
- Perform one in-world response only.
- Act as executor, not planner.
- Use upstream plugin entries as the main continuity and routing source.
- If upstream is silent or uncertain, prefer restraint over invention.

# MEMORY LAW
- Direct memory covers only recent turns.
- Treat injected upstream layers (## rp_*, world notes, retrieved logs) as the main continuity source.
- Do not invent unseen past events, hidden promises, strategic history, or emotional carryover absent from visible dialogue or injected layers.

# ROLE BOUNDARY
- Upstream plugin entries already handled most filtering, compression, routing, and low-frequency reflection.
- Do not replace them with a sweeter, cleaner, or more convenient interpretation.
- Your task is not to summarize the character, but to perform the next moment.

# INFORMATION BOUNDARY
- A character may know their own inner state.
- For others, infer only from visible speech, action, silence, timing, and established memory.
- Never write another character's hidden interior as certain fact unless clearly supported.

# PRIORITY ORDER
Read upstream layers in this order. When layers conflict, higher layers win.
1. Hard constraints
\`rp_logic_state.known_contradiction\` |  \`rp_turn_advice.response_guard\` | 
2. Current portrayal
\`rp_turn_advice.character_routing\` | \`rp_scene_and_role_state\`
3. Durable continuity
\`rp_persona_evolution_state\` | \`rp_persistent_memory\` | \`rp_arc_memory\` | \`rp_turn_trace\` | \`rp_facet_activation_ledger\` | 
\`rp_recent_world_entries\` | \`rp_world_encyclopedia\`

Practical conflict rule:
- Hard constraints > Current portrayal > Durable continuity
- If only Durable continuity is available, keep execution restrained and literal.
- When in doubt, \`## rp_turn_advice\` is the most authoritative routing source.

# EXECUTION RULES
- Let \`rp_turn_advice\` decide the visible hierarchy.
- Use \`rp_scene_and_role_state\` for tone, stakes, and current pressure.
- Keep the response narrow: one main beat, one dominant facet, one clear stance.
- If \`strict_directive\` restricts, obey it.
- Never surface suppressed facets unless forced by the scene.</textarea>
                        <button class="pse-btn pse-copy-sql-btn" type="button" style="width:100%;padding:6px;font-size:12px;background:var(--pse-accent-greyblue);">📋 複製系統提示詞</button>
                      </div>
                    </div>`,
    },
  };

  let _T = _I18N.en;
  let _langInitialized = false;

  const PLUGIN_NAME = "👤 RisuAI Agent";
  const PLUGIN_VER = "4.0.1";
  const LOG = "[RisuAIAgent]";
  const SYSTEM_INJECT_TAG = "PLUGIN_PARALLEL_STATUS";
  const SYSTEM_REWRITE_TAG = "PLUGIN_PARALLEL_REWRITE";
  const KNOWLEDGE_BLOCK_TAG = "PSE_INJECTED_KNOWLEDGE";
  const KNOWLEDGE_SECTION_TAGS = {
    rp_instruction: "RP_INSTRUCTION",
    information: "WORLD_KNOWLEDGE",
    output_format: "OUTPUT_FORMATTING",
  };
  const lastValidInjectionByBaseHash = new Map();
  const LOCAL_LORE_COMMENT = "[AUTO] RisuAI Agent";

  const MODEL_DATALIST_A_ID = "pse-model-options-a";
  const MODEL_DATALIST_B_ID = "pse-model-options-b";
  const MODEL_DATALIST_EMBED_ID = "pse-model-options-embed";

  const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models?fmt=cards";
  const OPENROUTER_EMBED_MODELS_URL =
    "https://openrouter.ai/api/v1/models?fmt=cards&output_modalities=embeddings";
  const OPENROUTER_MODELS_CACHE_KEY = "openrouter_models_cache_v3";
  const OPENROUTER_MODELS_CACHE_TS_KEY = "openrouter_models_cache_ts_v3";
  const OPENROUTER_EMBED_MODELS_CACHE_KEY = "openrouter_embed_models_cache_v4";
  const OPENROUTER_EMBED_MODELS_CACHE_TS_KEY =
    "openrouter_embed_models_cache_ts_v4";
  const GROK_MODELS_URL = "https://api.x.ai/v1/models";
  const GROK_MODELS_CACHE_KEY = "grok_models_cache_v1";
  const GROK_MODELS_CACHE_TS_KEY = "grok_models_cache_ts_v1";
  const COPILOT_MODELS_URL = "https://api.githubcopilot.com/models";
  const COPILOT_MODELS_CACHE_KEY = "copilot_models_cache_v1";
  const COPILOT_MODELS_CACHE_TS_KEY = "copilot_models_cache_ts_v1";
  const COPILOT_TOKEN_URL = "https://api.github.com/copilot_internal/v2/token";
  const COPILOT_CODE_VERSION = "1.111.0";
  const COPILOT_CHAT_VERSION = "0.40.2026031401";
  const COPILOT_USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/${COPILOT_CODE_VERSION} Chrome/142.0.7444.265 Electron/39.3.0 Safari/537.36`;
  const OPENROUTER_MODELS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
  const FIXED_TIMEOUT_MS = 300000;

  const EMBEDDING_VECTOR_CACHE_VERSION = 1;
  const EMBEDDING_VECTOR_CACHE_MAX_PER_CARD = 300;

  const DEFAULT_PERSONA_CALLS = [
    {
      id: "call_persona_inventory",
      name: "Persona Inventory",
      target_model: "A",
      read_dialogue_rounds: 0,
      read_lorebook_names: "",
      entries: [
        {
          lorebook_name: "rp_persona_inventory",
          write_mode: "overwrite",
          always_active: true,
          output_format: `BUILD FOR MAJOR CHARACTERS: Only extract characters with clear personalities and setting.

SCHEMA — rp_persona_inventory:
{
  "rp_persona_inventory": {
    "CharName": {
      "persona_mode_hint": "<relational|political|hybrid>",
      "attributes": [
        {
          "name": "<persona attribute>",
          "track": "<relational|political|shared>",
          "structural_role": "<core|support|situational|stress-leak|intimacy-only>",
          "default_salience": <int 0-10>,
          "behavioral_axis": "<main observable difference this facet controls>",
          "triggers": ["<activating scene condition>"],
          "anti_triggers": ["<suppressing scene condition>"],
          "expression_modes": ["<observable speech, action, or silence only>"],
          "compatible_with": ["<facet name>"],
          "conflicts_with": ["<facet name>"],
          "distinction_rule": "<how this differs from nearby facets in play>",
          "negative_substitute": "<most likely wrong nearby facet if this one fades | null>"
        }
      ]
    }
  }
}

FIELD RULES:
- attributes: 4-8 items. Do not over-list.
- name: short and reusable.
- track: relational = intimacy/trust/jealousy/protectiveness/distance; political = hierarchy/caution/manipulation/leverage/diplomacy; shared = both.
- structural_role: core = identity-bearing, should not disappear easily; support = stable secondary; situational = scene-evoked but not identity-bearing by default; stress-leak = may appear under strain, should not dominate casually; intimacy-only = only appropriate after earned closeness.
- default_salience: how easily this facet surfaces across scenes (0 = rarely, 10 = almost always).
- behavioral_axis: what observable difference changes when this facet leads.
- expression_modes: observable behavior only — speech, action, or silence. Not internal states.
- compatible_with: 0-2 items. conflicts_with: 0-2 items.
- distinction_rule: separate this facet from nearby ones that may otherwise blur together.
- negative_substitute: the easiest wrong replacement if the model blurs this facet away.
- Build facets useful in play, not literary analysis. Avoid synonyms that overlap too much.
- If two facets would produce nearly identical expression_modes, merge or rewrite them.
- Each facet should answer: if this facet is suppressed, what visible thing becomes different?`,
        },
      ],
    },
    {
      id: "call_persona_core",
      name: "Persona Core",
      target_model: "A",
      read_dialogue_rounds: 0,
      read_lorebook_names: "",
      entries: [
        {
          lorebook_name: "rp_character_core",
          write_mode: "overwrite",
          always_active: true,
          output_format: `BUILD FOR MAJOR CHARACTERS: Only extract characters with clear personalities and setting.

SCHEMA — rp_character_core:
{
  "rp_character_core": {
    "CharName": {
      "baseline_facet_profile": [
        {
          "name": "<facet>",
          "baseline": <int 0-10>,
          "rigidity": "<low|medium|high>",
          "protected_from_fast_change": <true|false>
        }
      ],
      "governing_drives": ["<drive>"],
      "response_habits": ["<recurring observable pattern>"],
      "speech_tendencies": ["<linguistic or rhythmic habit>"],
      "register_shifts": {
        "public_to_private": "<manner change when audience shrinks | null>",
        "under_threat": "<manner change under pressure | null>"
      },
      "hard_ooc_boundaries": ["<behavior incompatible with this character>"]
    }
  }
}

FIELD RULES:
- baseline_facet_profile: 3-5 items only. baseline = how central this trait is across normal play (0 = peripheral, 10 = always present). rigidity = how hard it is to bend under scene pressure. protected_from_fast_change = true for facets central to character recognition.
- governing_drives: 2-4 items. Durable motivations only.
- response_habits: observable, repeatable patterns — not personality adjectives.
- speech_tendencies: sentence rhythm, diction, directness, evasion, politeness, etc.
- register_shifts: observable manner differences across social contexts. null if not applicable.
- hard_ooc_boundaries: only truly incompatible behaviors. Not generic.
- This layer stops drift and grounds reflection. Do not repeat the entire persona inventory. Focus on what should remain true even when mood changes.`,
        },
      ],
    },
  ];

  const DEFAULT_MODEL_CALLS = JSON.parse(
    atob(
      "W3siaWQiOiJjYWxsX3N0YXRlIiwibmFtZSI6IlN0YXRlIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3R1cm5fbG9nLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgc3lzdGVtX2RpcmVjdG9yIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InJlY2VudF90dXJuX2xvZyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF90dXJuX2xvZ1wiOiB7XG4gICAgXCJzY2VuZVwiOiBcIjxsb2NhdGlvbiArIHNlbnNvcnkgY3VlLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwidGltZV9hbmNob3JcIjogXCI8ZXhwbGljaXQgaW4tc3RvcnkgdGltZT5cIixcbiAgICBcImVsYXBzZWRfc2luY2VfcHJldlwiOiBcIjxzYW1lIG1vbWVudCAvICsyaCAvICszZCAvIGV0Yz5cIixcbiAgICBcInVzZXJfYWN0aW9uXCI6IFwiPDw9MTIgd29yZHM+XCIsXG4gICAgXCJuYXJyYXRpdmVfZXZlbnRcIjogXCI8PD0xNSB3b3Jkcz5cIixcbiAgICBcInNoaWZ0XCI6IFwiPHRvbmUvc3Rha2VzIGNoYW5nZSA8PTggd29yZHMsIG9yIG51bGw+XCJcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQWxsIHN0cmluZ3MgPD0xNSB3b3Jkcy4gS2V5d29yZHMgb25seS5cbi0gZWxhcHNlZF9zaW5jZV9wcmV2OiB0aW1lIHNpbmNlIHByZXZpb3VzIHR1cm47IFwidW5zcGVjaWZpZWRfY29udGludWF0aW9uXCIgaWYgdW5rbm93bi5cbi0gc2hpZnQ6IG51bGwgaWYgbm90aGluZyBjaGFuZ2VkLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoicmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMiLCJ3cml0ZV9tb2RlIjoiYXBwZW5kIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJyZWNlbnRfY2hhcmFjdGVyX3N0YXRlc1wiOiB7XG4gICAgXCJsb2NhdGlvblwiOiBcIjw8PTEwIHdvcmRzPlwiLFxuICAgIFwicGxheWVyX3N0YXRlXCI6IFwiPGNvbmRpdGlvbiArIGtleSBpdGVtcywgPD0xNSB3b3Jkcz5cIixcbiAgICBcIm5wY3NcIjpbXG4gICAgICB7XG4gICAgICAgIFwibmFtZVwiOiBcIjxOUEMgbmFtZT5cIixcbiAgICAgICAgXCJwaHlzaWNhbF9zdGF0ZVwiOiBcIjw8PTEyIHdvcmRzPlwiLFxuICAgICAgICBcImludGVybmFsX3N0YXRlXCI6IFwiPHRydWUgbW90aXZlL2ZlZWxpbmcsIDw9MTIgd29yZHM+XCIsXG4gICAgICAgIFwicmVsYXRpb25fdG9fcGxheWVyXCI6IFwiPDw9MTAgd29yZHMsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIFJlbW92ZSBkZXBhcnRlZCBOUENzLiBBZGQgbmV3IG9uZXMuIG5wY3M6W10gaWYgbm9uZSBwcmVzZW50LlxuLSBpbnRlcm5hbF9zdGF0ZTogdHJ1ZSBtb3RpdmVzIGV2ZW4gaWYgaGlkZGVuLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoic3lzdGVtX2RpcmVjdG9yIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3lzdGVtX2RpcmVjdG9yXCI6IHtcbiAgICBcInN0YWxlbmVzc19sZXZlbFwiOiAwLFxuICAgIFwiZW52aXJvbm1lbnRfaW50ZXJ2ZW50aW9uXCI6IG51bGxcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29tcGFyZSBjdXJyZW50IHR1cm4ncyByZWNlbnRfdHVybl9sb2cgd2l0aCBwcmV2aW91cyB0dXJuJ3MuXG4tIHN0YWxlbmVzc19sZXZlbDogMCAoY29tcGxldGVseSBkaWZmZXJlbnQpIHRvIDEwIChuZWFybHkgaWRlbnRpY2FsKS5cbi0gPj04OiB3cml0ZSBhIGJyaWVmIHVuZXhwZWN0ZWQgZXZlbnQgaW4gZW52aXJvbm1lbnRfaW50ZXJ2ZW50aW9uLlxuLSA8PTc6IG51bGwuIn1dfSx7ImlkIjoiY2FsbF9sb2dpYyIsIm5hbWUiOiJMb2dpYyIsInRhcmdldF9tb2RlbCI6IkIiLCJldmVyeV9uX3R1cm5zIjoxLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MywicmVhZF9sb3JlYm9va19uYW1lcyI6InVuc29sdmVkX3F1ZXN0cywgcmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMsIHJlY2VudF90dXJuX2xvZyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJrbm93bl9jb250cmFkaWN0aW9ucyIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcImtub3duX2NvbnRyYWRpY3Rpb25zXCI6IHtcbiAgICBcImxvZ2ljX3Zpb2xhdGlvblwiOiBcIjxkZXNjcmliZSBjb250cmFkaWN0aW9uLCBvciBudWxsPlwiLFxuICAgIFwic3RyaWN0X2RpcmVjdGl2ZVwiOiBcIjxzZWUgYWxsb3dlZCB2YWx1ZXM+XCJcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ2hlY2sgdXNlcl9hY3Rpb24gYWdhaW5zdCBwbGF5ZXJfc3RhdGUgYW5kIGxvY2F0aW9uLlxuLSBWaW9sYXRpb24gZm91bmQgLT4gZGVzY3JpYmUgaXQ7IHN0cmljdF9kaXJlY3RpdmU6IFwiUmVqZWN0IHRoZSB1c2VyIGFjdGlvbiBhbmQgbmFycmF0ZSBmYWlsdXJlXCIgb3IgXCJTaG93IGNvZ25pdGl2ZSBmcmljdGlvbjogY2hhcmFjdGVyIGhlc2l0YXRlcyBvciBzdHJ1Z2dsZXNcIi5cbi0gTm8gdmlvbGF0aW9uIC0+IGxvZ2ljX3Zpb2xhdGlvbjogbnVsbDsgc3RyaWN0X2RpcmVjdGl2ZTogXCJQcm9jZWVkIG5vcm1hbGx5XCIuIn0seyJsb3JlYm9va19uYW1lIjoidW5zb2x2ZWRfcXVlc3RzIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwidW5zb2x2ZWRfcXVlc3RzXCI6IHtcbiAgICBcImFjdGl2ZV90aHJlYWRzXCI6W1xuICAgICAge1xuICAgICAgICBcImlkXCI6IDEsIFwiZGVzY1wiOiBcIjxxdWVzdCBkZXNjcmlwdGlvbj5cIiwgXCJ3ZWlnaHRcIjogXCJtZWRpdW1cIiwgXCJzdGF0dXNcIjogXCJhY3RpdmVcIiwgXCJyZWxhdGVkX25wY3NcIjogW10sIFwibm90ZXNcIjogXCI8d2hhdCBjaGFuZ2VkIHRoaXMgdHVybj5cIiwgXCJuZXh0X3N0ZXBcIjogXCI8bW9zdCBsaWtlbHkgbmV4dCBhY3Rpb24+XCIsIFwicmVhc29uX2lmX2lnbm9yZWRcIjogXCI8Y29uc2VxdWVuY2UsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdLFxuICAgIFwibG9zdF9lbnRpdGllc1wiOlsge1wibmFtZVwiOiBcIjxuYW1lPlwiLCBcImxhc3Rfc2VlblwiOiBcIjxsb2NhdGlvbiArIGNpcmN1bXN0YW5jZT5cIiwgXCJyZWxldmFuY2VcIjogXCI8Y29ubmVjdGlvbiB0byB0aHJlYWRzPlwiLCBcInNlYXJjaF9wcmlvcml0eVwiOiBcIjxoaWdoL21lZGl1bS9sb3c+XCJ9IF0sXG4gICAgXCJyZXNvbHZlZF90aGlzX3R1cm5cIjpbIHtcImlkXCI6IDEsIFwiZGVzY1wiOiBcIjxyZXNvbHZlZCBkZXNjcmlwdGlvbj5cIiwgXCJjbG9zdXJlX3JlYXNvblwiOiBcIjx3aHkgcmVzb2x2ZWQ+XCIsIFwiY29uc2VxdWVuY2VcIjogXCI8bGFzdGluZyBjaGFuZ2U+XCJ9IF1cbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29weSBwcmV2aW91cyBhY3RpdmVfdGhyZWFkcyBhcyBiYXNlbGluZS4gVXBkYXRlIGNoYW5nZWQgZmllbGRzIG9ubHkuXG4tIENvbXBsZXRlZCAtPiBtb3ZlIHRvIHJlc29sdmVkX3RoaXNfdHVybi4gTmV3IC0+IGlkID0gbWF4IGlkICsgMS5cbi0gd2VpZ2h0OiBjcml0aWNhbCB8IGhpZ2ggfCBtZWRpdW0gfCBsb3cuIHN0YXR1czogYWN0aXZlIHwgcHJvZ3Jlc3NlZCB8IHN0YWxsZWQgfCBuZWFybHlfcmVzb2x2ZWQuXG4tIFtdIGZvciBlbXB0eSBsaXN0cy4ifV19LHsiaWQiOiJjYWxsX3F1YWxpdHkiLCJuYW1lIjoiUXVhbGl0eSIsInRhcmdldF9tb2RlbCI6IkIiLCJldmVyeV9uX3R1cm5zIjozLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MywicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF93b3JsZF9lbnRyaWVzLCB3b3JsZF9lbmN5Y2xvcGVkaWEiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoicmVwZXRpdGlvbl9ndWFyZCIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlcGV0aXRpb25fZ3VhcmRcIjoge1xuICAgIFwiZmxhZ2dlZF9jbGljaGVzXCI6W10sIFwiYmFubmVkX3BocmFzZXNcIjpbXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBmbGFnZ2VkX2NsaWNoZXM6IHVwIHRvIDMgb3ZlcnVzZWQgdHJvcGVzIGluIHJlY2VudCB0dXJucy4gW10gaWYgbm9uZS5cbi0gYmFubmVkX3BocmFzZXM6IGV4YWN0IHBocmFzZXMgYXBwZWFyaW5nID49MiB0aW1lcy4gW10gaWYgbm9uZS4ifSx7ImxvcmVib29rX25hbWUiOiJyZWNlbnRfd29ybGRfZW50cmllcyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF93b3JsZF9lbnRyaWVzXCI6IHtcbiAgICBcImVudHJpZXNcIjogWyBcIjxOYW1lLiBLZXkgZmFjdC4gPD0yMCB3b3Jkcy4+XCIgXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBPbmUgc2VudGVuY2UgcGVyIGVudHJ5LCA8PTIwIHdvcmRzLiBOYW1lIGZpcnN0LCB0aGVuIGtleSBmYWN0LlxuLSBPbmx5IE5FVyBmYWN0cyBub3QgYWxyZWFkeSBpbiByZWNlbnRfd29ybGRfZW50cmllcyBvciB3b3JsZF9lbmN5Y2xvcGVkaWEuXG4tIENvdmVyIGFsbCB0dXJucyBzaW5jZSBsYXN0IHJ1biAodXAgdG8gMyB0dXJucykuXG4tIGVudHJpZXM6W10gaWYgbm90aGluZyBuZXcuIiwicmV0ZW50aW9uX2VuYWJsZWQiOnRydWUsInJldGVudGlvbl9hZnRlciI6MTUsInJldGVudGlvbl9rZWVwIjoxfV19LHsiaWQiOiJjYWxsX2xvbmd0ZXJtIiwibmFtZSI6Ikxvbmd0ZXJtIiwidGFyZ2V0X21vZGVsIjoiQSIsImV2ZXJ5X25fdHVybnMiOjEwLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MSwicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF90dXJuX2xvZywgcmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMsIHVuc29sdmVkX3F1ZXN0cywgc3RvcnlfdHVybmluZ19wb2ludHMsIHN0b3J5X2FyY19zdW1tYXJ5IiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InN0b3J5X3R1cm5pbmdfcG9pbnRzIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3RvcnlfdHVybmluZ19wb2ludHNcIjpbXG4gICAgeyBcInNlcVwiOiAxLCBcInR5cGVcIjogXCI8dHlwZT5cIiwgXCJpbXBhY3RcIjogXCI8d2hhdCBjaGFuZ2VkIGFuZCB3aHk+XCIsIFwibG9uZ190ZXJtX2ltcGxpY2F0aW9uXCI6IFwiPGZ1dHVyZSBjb25zZXF1ZW5jZT5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMSwgMl0gfVxuICBdXG59XG5cbkZJRUxEIFJVTEVTOlxuLSBUdXJuaW5nIHBvaW50ID0gbW9tZW50IHRoYXQgZnVuZGFtZW50YWxseSBjaGFuZ2VkIHRoZSBzdG9yeSdzIGRpcmVjdGlvbi4iLCJyZXRlbnRpb25fZW5hYmxlZCI6ZmFsc2UsInJldGVudGlvbl9hZnRlciI6MCwicmV0ZW50aW9uX2tlZXAiOjB9LHsibG9yZWJvb2tfbmFtZSI6InN0b3J5X2FyY19zdW1tYXJ5Iiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3RvcnlfYXJjX3N1bW1hcnlcIjpbXG4gICAgeyBcImFyY19uYW1lXCI6IFwiPG5hbWU+XCIsIFwiYXJjX3RpbWVfc3BhblwiOiBcIjxzdGFydCAtPiBlbmQgaW4tc3Rvcnk+XCIsIFwia2V5X2FjdG9yc1wiOiBbXSwgXCJzdW1tYXJ5XCI6IFwiPDItNCBzZW50ZW5jZXM6IHRyaWdnZXIgLT4gZXNjYWxhdGlvbiAtPiBvdXRjb21lPlwiLCBcInBlcm1hbmVudF9pbXBhY3RcIjogXCI8Y29uY3JldGUgbGFzdGluZyBjaGFuZ2VzPlwiLCBcInVucmVzb2x2ZWRfaG9va3NcIjogW10sIFwiZXZpZGVuY2VfdHVybnNcIjogWzEsIDJdIH1cbiAgXVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29tcGxldGVkIGFyYyA9IG1ham9yIGNvbmZsaWN0IHJlc29sdmVkIG9yIHF1ZXN0IGNoYWluIGNsb3NlZC4iLCJyZXRlbnRpb25fZW5hYmxlZCI6ZmFsc2UsInJldGVudGlvbl9hZnRlciI6MCwicmV0ZW50aW9uX2tlZXAiOjB9XX0seyJpZCI6ImNhbGxfd29ybGQiLCJuYW1lIjoiV29ybGQiLCJ0YXJnZXRfbW9kZWwiOiJBIiwiZXZlcnlfbl90dXJucyI6MTUsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoxLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3dvcmxkX2VudHJpZXMsIHdvcmxkX2VuY3ljbG9wZWRpYSwgc3RvcnlfYXJjX3N1bW1hcnkiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoid29ybGRfZW5jeWNsb3BlZGlhIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwid29ybGRfZW5jeWNsb3BlZGlhXCI6IHtcbiAgICBcImdlb2dyYXBoeVwiOlsgeyBcIm5hbWVcIjogXCI8cGxhY2U+XCIsIFwiZGVzY3JpcHRpb25cIjogXCI8ZGV0YWlsPlwiLCBcImN1cnJlbnRfcmVsZXZhbmNlXCI6IFwiPHdoeSBpdCBtYXR0ZXJzIG5vdz5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMV0gfSBdLFxuICAgIFwibnBjc1wiOlsgeyBcIm5hbWVcIjogXCI8bmFtZT5cIiwgXCJyb2xlXCI6IFwiPHJvbGU+XCIsIFwic3RhdHVzXCI6IFwiPGFsaXZlL2RlYWQvdW5rbm93biArIGNvbmRpdGlvbj5cIiwgXCJub3Rlc1wiOiBcIjxwcm9maWxlICsgbGF0ZXN0IGNoYW5nZT5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMV0gfSBdLFxuICAgIFwiZmFjdGlvbnNcIjpbIHsgXCJuYW1lXCI6IFwiPG5hbWU+XCIsIFwiZGVzY3JpcHRpb25cIjogXCI8cHVycG9zZT5cIiwgXCJyZWxhdGlvbnNcIjogXCI8c3RhbmNlIHRvd2FyZCBwbGF5ZXIvb3RoZXJzPlwiLCBcImV2aWRlbmNlX3R1cm5zXCI6IFsxXSB9IF0sXG4gICAgXCJsb3JlXCI6WyB7IFwidG9waWNcIjogXCI8c3ViamVjdD5cIiwgXCJkZXRhaWxcIjogXCI8ZXhwbGFuYXRpb24+XCIsIFwiZXZpZGVuY2VfdHVybnNcIjogWzFdIH0gXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBDb3B5IHByZXZpb3VzIG91dHB1dCBhcyBiYXNlbGluZS4ifV19XQ==",
    ),
  );

  const DEFAULT_MODEL_CALLS_2 = JSON.parse(
    atob(
      "W3siaWQiOiJjYWxsX3N0YXRlIiwibmFtZSI6IlN0YXRlIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3R1cm5fbG9nLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgc3lzdGVtX2RpcmVjdG9yLCBzdHJhdGVnaWNfYW5hbHlzaXMiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoicmVjZW50X3R1cm5fbG9nIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwicmVjZW50X3R1cm5fbG9nXCI6IHtcbiAgICBcInNjZW5lXCI6IFwiPGxvY2F0aW9uICsgb25lIHNlbnNvcnkgY3VlLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwidGltZV9hbmNob3JcIjogXCI8ZXhwbGljaXQgaW4tc3RvcnkgdGltZSBwb3NpdGlvbj5cIixcbiAgICBcImVsYXBzZWRfc2luY2VfcHJldlwiOiBcIjxzYW1lIG1vbWVudCAvICsyaCAvICszZCAvIGV0Yy47ICd1bnNwZWNpZmllZF9jb250aW51YXRpb24nIGlmIHVua25vd24+XCIsXG4gICAgXCJ1c2VyX2FjdGlvblwiOiBcIjxwbGF5ZXIgYWN0aW9uLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwibmFycmF0aXZlX2V2ZW50XCI6IFwiPHN0b3J5IHJlc3VsdCwgPD0xNSB3b3Jkcz5cIixcbiAgICBcInNoaWZ0XCI6IFwiPHRvbmUvc3Rha2VzIGNoYW5nZSA8PTggd29yZHMsIG9yIG51bGw+XCIsXG4gICAgXCJ1c2VyX3NjZW5lX2NoYW5nZVwiOiBmYWxzZVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBBbGwgc3RyaW5nIHZhbHVlcyA8PTE1IHdvcmRzLiBLZXl3b3JkcyBwcmVmZXJyZWQuIiwicmV0ZW50aW9uX2VuYWJsZWQiOnRydWUsInJldGVudGlvbl9hZnRlciI6MTAsInJldGVudGlvbl9rZWVwIjoyfSx7ImxvcmVib29rX25hbWUiOiJyZWNlbnRfY2hhcmFjdGVyX3N0YXRlcyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF9jaGFyYWN0ZXJfc3RhdGVzXCI6IHtcbiAgICBcImxvY2F0aW9uXCI6IFwiIDxwbGFjZSArIG9uZSBhdG1vc3BoZXJpYyBkZXRhaWwsIDw9MTAgd29yZHM+XCIsXG4gICAgXCJwbGF5ZXJfc3RhdGVcIjogXCI8Y29uZGl0aW9uICsga2V5IGl0ZW1zLCA8PTE1IHdvcmRzPlwiLFxuICAgIFwibnBjc1wiOltcbiAgICAgIHtcbiAgICAgICAgXCJuYW1lXCI6IFwiPE5QQyBuYW1lPlwiLFxuICAgICAgICBcInBoeXNpY2FsX3N0YXRlXCI6IFwiPGFwcGVhcmFuY2UsIDw9MTIgd29yZHM+XCIsXG4gICAgICAgIFwiaW50ZXJuYWxfc3RhdGVcIjogXCI8dHJ1ZSBtb3RpdmUvZmVlbGluZywgPD0xMiB3b3Jkcz5cIixcbiAgICAgICAgXCJyZWxhdGlvbl90b19wbGF5ZXJcIjogXCI8Y3VycmVudCBzdGFuY2UsIDw9MTAgd29yZHMsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIEtleXdvcmRzIG9ubHksIG5vIGZ1bGwgc2VudGVuY2VzLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoic3lzdGVtX2RpcmVjdG9yIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3lzdGVtX2RpcmVjdG9yXCI6IHtcbiAgICBcInN0YWxlbmVzc19sZXZlbFwiOiAwLFxuICAgIFwic3RyYXRlZ2ljX3N0YWduYXRpb25cIjogZmFsc2UsXG4gICAgXCJnbG9iYWxfc3RhZ25hdGlvblwiOiBmYWxzZSxcbiAgICBcImVudmlyb25tZW50X2ludGVydmVudGlvblwiOiBudWxsXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIFNjb3JlIHN0YWxlbmVzc19sZXZlbCAw4oCTMTAuIn1dfSx7ImlkIjoiY2FsbF90cmFja2VyX2siLCJuYW1lIjoiVHJhY2tlci1LIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoia25vd2xlZGdlX21hdHJpeCwga25vd2xlZGdlX2Fubm90YXRpb25zLCBrbm93bGVkZ2VfYXJjaGl2ZSIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJrbm93bGVkZ2VfbWF0cml4Iiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwia25vd2xlZGdlX21hdHJpeFwiOiB7XG4gICAgXCJjaGFuZ2VkX2lkc1wiOltdLFxuICAgIFwiZW50cmllc1wiOltcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcIkswMDFcIixcbiAgICAgICAgXCJzdWJqZWN0XCI6IFwiPGZhY3Qgb3Igc2VjcmV0LCA8PTE1IHdvcmRzPlwiLFxuICAgICAgICBcInRydWVfYW5zd2VyXCI6IFwiPGFjdHVhbCB0cnV0aCwgPD0xNSB3b3Jkcz5cIixcbiAgICAgICAgXCJrbm93ZXJzXCI6IFtdLFxuICAgICAgICBcInVua25vd25fdG9cIjpbXSxcbiAgICAgICAgXCJwdWJsaWNfc3RhdHVzXCI6IFwicHVibGljIHwgc2VjcmV0XCIsXG4gICAgICAgIFwic3RhYmlsaXR5XCI6IFwibG9ja2VkIHwgZnJhZ2lsZVwiXG4gICAgICB9XG4gICAgXVxuICB9XG59In1dfSx7ImlkIjoiY2FsbF90cmFja2VyX3MiLCJuYW1lIjoiVHJhY2tlci1TIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjIsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoiYWN0aXZlX3N0cmF0ZWdpY19sYXllciwgc3RyYXRlZ2ljX2FuYWx5c2lzLCBzdHJhdGVnaWNfYXJjaGl2ZSIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJhY3RpdmVfc3RyYXRlZ2ljX2xheWVyIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwiYWN0aXZlX3N0cmF0ZWdpY19sYXllclwiOiB7XG4gICAgXCJwbGF5ZXJfc3RyYXRlZ3lcIjoge1xuICAgICAgXCJwcmltYXJ5X2dvYWxcIjogXCI8Z29hbCwgPD0xNSB3b3Jkcz5cIixcbiAgICAgIFwib3BlcmF0aW9uc1wiOiBbXVxuICAgIH0sXG4gICAgXCJyaXZhbF9zdHJhdGVnaWVzXCI6W11cbiAgfVxufSJ9XX0seyJpZCI6ImNhbGxfbG9naWMiLCJuYW1lIjoiTG9naWMiLCJ0YXJnZXRfbW9kZWwiOiJCIiwiZXZlcnlfbl90dXJucyI6MSwicmVhZF9kaWFsb2d1ZV9yb3VuZHMiOjMsInJlYWRfbG9yZWJvb2tfbmFtZXMiOiJ1bnNvbHZlZF9xdWVzdHMsIHJlY2VudF9jaGFyYWN0ZXJfc3RhdGVzLCByZWNlbnRfdHVybl9sb2csIGtub3dsZWRnZV9tYXRyaXgsIGtub3dsZWRnZV9hbm5vdGF0aW9ucywgYWN0aXZlX3N0cmF0ZWdpY19sYXllciwgc3RyYXRlZ2ljX2FuYWx5c2lzIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6Imtub3duX2NvbnRyYWRpY3Rpb25zIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwia25vd25fY29udHJhZGljdGlvbnNcIjoge1xuICAgIFwibG9naWNfdmlvbGF0aW9uXCI6IFwiPGRlc2NyaWJlIGNvbnRyYWRpY3Rpb24sIG9yIG51bGw+XCIsXG4gICAgXCJzdHJpY3RfZGlyZWN0aXZlXCI6IFwiPHNlZSBhbGxvd2VkIHZhbHVlcz5cIlxuICB9XG59In0seyJsb3JlYm9va19uYW1lIjoidW5zb2x2ZWRfcXVlc3RzIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwidW5zb2x2ZWRfcXVlc3RzXCI6IHtcbiAgICBcImFjdGl2ZV90aHJlYWRzXCI6IFtdLFxuICAgIFwicmVzb2x2ZWRfdGhpc190dXJuXCI6W11cbiAgfVxufSJ9XX0seyJpZCI6ImNhbGxfc3RyYXRlZ3lfYW5hbHlzdCIsIm5hbWUiOiJTdHJhdGVneS1BbmFseXN0IiwidGFyZ2V0X21vZGVsIjoiQSIsImV2ZXJ5X25fdHVybnMiOjMsInJlYWRfZGlhbG9ndWVfcm91bmRzIjo1LCJyZWFkX2xvcmVib29rX25hbWVzIjoia25vd2xlZGdlX21hdHJpeCwga25vd2xlZGdlX2Fubm90YXRpb25zLCBhY3RpdmVfc3RyYXRlZ2ljX2xheWVyLCByZWNlbnRfdHVybl9sb2csIHJlY2VudF9jaGFyYWN0ZXJfc3RhdGVzLCB1bnNvbHZlZF9xdWVzdHMsIHN0cmF0ZWdpY19hbmFseXNpcyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJzdHJhdGVnaWNfYW5hbHlzaXMiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJzdHJhdGVnaWNfYW5hbHlzaXNcIjoge1xuICAgIFwiYW5hbHlzdF9zdHJhdGVneV9vdmVycmlkZXNcIjoge30sXG4gICAgXCJjb2duaXRpb25fdmlvbGF0aW9uc1wiOltdXG4gIH1cbn0ifSx7ImxvcmVib29rX25hbWUiOiJrbm93bGVkZ2VfYW5ub3RhdGlvbnMiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJrbm93bGVkZ2VfYW5ub3RhdGlvbnNcIjoge1xuICAgIFwiZW50cmllc1wiOltdXG4gIH1cbn0ifV19LHsiaWQiOiJjYWxsX3F1YWxpdHkiLCJuYW1lIjoiUXVhbGl0eSIsInRhcmdldF9tb2RlbCI6IkIiLCJldmVyeV9uX3R1cm5zIjozLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6NSwicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF93b3JsZF9lbnRyaWVzLCB3b3JsZF9lbmN5Y2xvcGVkaWEsIHJlY2VudF90dXJuX2xvZyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJyZXBldGl0aW9uX2d1YXJkIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwicmVwZXRpdGlvbl9ndWFyZFwiOiB7XG4gICAgXCJmbGFnZ2VkX2NsaWNoZXNcIjpbXSxcbiAgICBcImxhc3RfdHN1a2tvbWlcIjogbnVsbCxcbiAgICBcImJhbm5lZF9waHJhc2VzXCI6W11cbiAgfVxufSJ9LHsibG9yZWJvb2tfbmFtZSI6InJlY2VudF93b3JsZF9lbnRyaWVzIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwicmVjZW50X3dvcmxkX2VudHJpZXNcIjoge1xuICAgIFwiZW50cmllc1wiOiBbIFwiPE5hbWUuIEtleSBmYWN0LiA8PTIwIHdvcmRzLj5cIiBdXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIE9uZSBzZW50ZW5jZSBwZXIgZW50cnksIDw9MjAgd29yZHMuIE5hbWUgZmlyc3QsIHRoZW4ga2V5IGZhY3QuXG4tIE9ubHkgTkVXIGZhY3RzIG5vdCBhbHJlYWR5IGluIHJlY2VudF93b3JsZF9lbnRyaWVzIG9yIHdvcmxkX2VuY3ljbG9wZWRpYS5cbi0gZW50cmllczpbXSBpZiBub3RoaW5nIG5ldy4iLCJyZXRlbnRpb25fZW5hYmxlZCI6dHJ1ZSwicmV0ZW50aW9uX2FmdGVyIjoxNSwicmV0ZW50aW9uX2tlZXAiOjF9XX0seyJpZCI6ImNhbGxfbG9uZ3Rlcm0iLCJuYW1lIjoiTG9uZ3Rlcm0iLCJ0YXJnZXRfbW9kZWwiOiJBIiwiZXZlcnlfbl90dXJucyI6MTAsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoxLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3R1cm5fbG9nLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgdW5zb2x2ZWRfcXVlc3RzLCBzdG9yeV90dXJuaW5nX3BvaW50cywgc3RvcnlfYXJjX3N1bW1hcnksIGFjdGl2ZV9zdHJhdGVnaWNfbGF5ZXIsIHN0cmF0ZWdpY19hbmFseXNpcyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJzdG9yeV90dXJuaW5nX3BvaW50cyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOltdIiwicmV0ZW50aW9uX2VuYWJsZWQiOmZhbHNlLCJyZXRlbnRpb25fYWZ0ZXIiOjAsInJldGVudGlvbl9rZWVwIjowfSx7ImxvcmVib29rX25hbWUiOiJzdG9yeV9hcmNfc3VtbWFyeSIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOltdIiwicmV0ZW50aW9uX2VuYWJsZWQiOmZhbHNlLCJyZXRlbnRpb25fYWZ0ZXIiOjAsInJldGVudGlvbl9rZWVwIjowfSx7ImxvcmVib29rX25hbWUiOiJrbm93bGVkZ2VfYXJjaGl2ZSIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOiB7XCJlbnRyaWVzXCI6W119In0seyJsb3JlYm9va19uYW1lIjoic3RyYXRlZ2ljX2FyY2hpdmUiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQToge1wiZW50cmllc1wiOltdfSJ9XX0seyJpZCI6ImNhbGxfd29ybGQiLCJuYW1lIjoiV29ybGQiLCJ0YXJnZXRfbW9kZWwiOiJCIiwiZXZlcnlfbl90dXJucyI6MTUsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoxLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3dvcmxkX2VudHJpZXMsIHdvcmxkX2VuY3ljbG9wZWRpYSwgc3RvcnlfYXJjX3N1bW1hcnksIGtub3dsZWRnZV9hcmNoaXZlIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6IndvcmxkX2VuY3ljbG9wZWRpYSIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcIndvcmxkX2VuY3ljbG9wZWRpYVwiOiB7XG4gICAgXCJnZW9ncmFwaHlcIjogW10sIFwibnBjc1wiOiBbXSwgXCJsb3JlXCI6IFtdXG4gIH1cbn0ifV19XQ==",
    ),
  );

  const NEW_PRESET1_CALLS = [
    {
      id: "call_t1_immediate_state",
      name: "Immediate State",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names: "rp_turn_trace, rp_scene_and_role_state",
      read_persona_names: "rp_character_core",
      entries: [
        {
          lorebook_name: "rp_turn_trace",
          write_mode: "append",
          always_active: true,
          retention_enabled: true,
          retention_after: 10,
          retention_keep: 3,
          output_format: `SCHEMA:
{
  "rp_turn_trace": {
    "scene_context": "<location + current tension, short phrase>",
    "elapsed_since_prev": "<same moment | +10m | +1h | +1d | unspecified>",
    "user_move": "<main user action or line>",
    "character_reaction": "<main response>",
    "shift_in_dynamic": "<relationship/tension change | null>"
  }
}

FIELD RULES:
- TEMPORAL NOTE: The rp_turn_trace entry in the lorebook is from the PREVIOUS turn (T-1). You are now writing the CURRENT turn's entry.
- Keep every field short. Prefer action/result phrasing over interpretation.
- scene_context should still make sense if retrieved much later.
- Capture only the single most important move and reaction from the CURRENT turn.
- shift_in_dynamic: null if nothing meaningfully changed.`,
        },
        {
          lorebook_name: "rp_scene_and_role_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_scene_and_role_state": {
    "scene_type": "<casual|emotional|conflict|recovery|transition|political|intimate|combat|debrief|ceremony>",
    "stakes_level": <int 0-10>,
    "characters": {
      "CharName": {
        "current_emotion": "<dominant feeling>",
        "surface_expression": "<outward presentation>",
        "hidden_drive": "<best-supported inner motive | null>",
        "drive_confidence": "<low|medium|high>",
        "vulnerability_level": <int 0-10>,
        "approach_tendency": "<lean_in|hold_back|test|defend|evade>"
      }
    }
  }
}

FIELD RULES:
- TEMPORAL NOTE: The rp_scene_and_role_state in the lorebook is from the PREVIOUS turn (T-1). You are overwriting it with the CURRENT turn's state based on the latest dialogue.
- Include only active characters in scene. Use character names from rp_character_core.
- scene_type: choose the single best-fit label. Prefer the more specific label (e.g. intimate over casual, political over conflict when stakes are about leverage rather than direct confrontation).
- surface_expression = observable behavior only.
- hidden_drive = supported inference only. drive_confidence reflects support strength.
- If uncertain, stay conservative. Use short phrases, not explanation.`,
        },
      ],
    },

    {
      id: "call_t2_logic_state",
      name: "Logic State",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 3,
      read_lorebook_names:
        "rp_logic_state, rp_recent_world_entries, rp_world_encyclopedia",
      entries: [
        {
          lorebook_name: "rp_logic_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_logic_state": {
    "known_contradiction": "<current impossible/invalid action or fact | null>",
    "active_threads": [
      {
        "desc": "<main scene-relevant thread>",
        "status": "<active|stalled|nearly_resolved>",
        "next_step": "<most likely next logical move>"
      }
    ]
  }
}

FIELD RULES:
- TEMPORAL NOTE: rp_logic_state in the lorebook is from the PREVIOUS turn (T-1). You are overwriting it with the CURRENT turn's state. Use it as a starting baseline, then update based on the latest dialogue.
- Keep only top 2 threads.
- Only flag contradictions that matter now.
- Use concrete story logic, not aesthetic preference.
- Threads may be emotional, practical, political, or mission-based.`,
        },
      ],
    },

    {
      id: "call_t3_persona_routing",
      name: "Persona Routing",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names:
        "rp_scene_and_role_state, rp_logic_state, rp_persistent_memory, rp_facet_realization_audit, rp_persona_evolution_state",
      read_persona_names: "rp_persona_inventory",
      entries: [
        {
          lorebook_name: "rp_persona_importance",
          write_mode: "overwrite",
          always_active: true,
          output_format: `TEMPORAL CONTEXT:
- All lorebook entries you are reading are from the PREVIOUS turn (T-1).
- rp_scene_and_role_state, rp_logic_state, rp_persistent_memory: T-1 state — use as the baseline context for what is currently true.
- rp_facet_realization_audit (T-1): audited T-2 actor reply against the T-2 plan. Use to assess if the same drift is present in current (T-1) dialogue evidence. If T-1 already self-corrected, set micro_repair null.
- rp_persona_evolution_state: use baseline_adjustment_candidates to determine if evolution_nudge is applicable.

SCHEMA:
{
  "rp_persona_importance": {
    "characters": {
      "CharName": {
        "ranked_facets": [
          {
            "name": "<facet>",
            "importance": <int 0-100>,
            "activation_source": "<scene|relationship|threat|status|desire|duty|mixed>",
            "activation_kind": "<baseline|scene-evoked|compensatory|stress-leak|earned-shift>",
            "stability": "<low|medium|high>",
            "mode": "<primary|secondary|background|suppressed>",
            "why_now": "<short scene trigger>",
            "counterfactual_risk": "<what likely breaks if absent | null>"
          }
        ]
      }
    }
  }
}

FIELD RULES:
- Include only active characters. Rank only 3-5 facets total.
- Exactly 1 facet should be primary when enough evidence exists. At most 1 secondary. Remaining: background or suppressed.
- importance is relative for this turn, not universal truth.
- activation_kind: baseline = normal stable expression; scene-evoked = naturally foregrounded; compensatory = activated because primary alone leaves scene incomplete; stress-leak = emerges under pressure; earned-shift = supported longer-term soft adjustment now visible.
- If no strong support, use flatter scores, lower stability, keep more in background.
- Favor scene usefulness over completeness. Do not force activation of every baseline trait.
- Prefer facets with clearer behavioral_axis and stronger counterfactual_risk for primary.`,
        },
        {
          lorebook_name: "rp_turn_advice",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_turn_advice": {
    "response_guard": {
      "biggest_risk": "<main likely failure next turn>",
      "strict_directive": "<Proceed normally | Preserve tension | Do not resolve yet | Enforce guarded response | Show friction | Reject action>"
    },
    "character_routing": {
      "CharName": {
        "portrayal_goal": "<how this character should come across next>",
        "primary_facet": "<facet | null>",
        "secondary_facet": "<facet | null>",
        "background_facets": ["<facet>"],
        "suppressed_facets": ["<facet>"],
        "micro_repair": "<small correction based on rp_facet_realization_audit (T-1) | null>",
        "evolution_nudge": "<small allowed emphasis if rp_persona_evolution_state supports it | null>",
        "reply_strategy": "<one-turn plan>"
      }
    },
    "candidate_hint": {
      "preferred_shape": "<best reply shape>",
      "avoid_shape": "<bad reply shape>"
    }
  }
}

FIELD RULES:
- primary_facet must match the primary mode facet from rp_persona_importance above.
- secondary_facet: at most one. background_facets: max 2. suppressed_facets: max 2.
- micro_repair: short correction from rp_facet_realization_audit (T-1). null if aligned or no prior audit exists.
- evolution_nudge: only if rp_persona_evolution_state.baseline_adjustment_candidates includes this facet with confidence medium or high. Do not invent nudges. Do not override hard boundaries.
- If rp_logic_state.known_contradiction is non-null, strict_directive must be "Reject action" or "Show friction".
- reply_strategy must be executable in one turn. Keep route narrow so Actor performs instead of re-planning.
- If hierarchy is flat or uncertain, compress expression instead of averaging many facets.`,
        },
      ],
    },

    {
      id: "call_t4_realization_audit",
      name: "Realization Audit",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names:
        "rp_turn_advice, rp_persona_importance, rp_facet_realization_audit",
      entries: [
        {
          lorebook_name: "rp_facet_realization_audit",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_facet_realization_audit": {
    "audited_turn": "<turn indicator, e.g. T-1>",
    "advice_source_turn": "<turn indicator of rp_turn_advice used as reference, e.g. T-1>",
    "characters": {
      "CharName": {
        "intended_primary": "<facet | null>",
        "observed_primary": "<facet | null>",
        "suppressed_leakage": ["<facet>"],
        "overblending": "<low|medium|high>",
        "alignment": "<aligned|partial|misaligned>",
        "repair_hint": "<short next-turn adjustment | null>"
      }
    }
  }
}

FIELD RULES:
- TEMPORAL NOTE: All lorebook entries are from the PREVIOUS turn (T-1). You are writing the CURRENT turn's audit.
- audited_turn: which turn's actual assistant reply is evaluated ("T-1" = most recent assistant reply).
- advice_source_turn: which rp_turn_advice is the reference benchmark ("T-1" = the one currently in lorebook, written last turn).
- intended_primary: the primary_facet from the rp_turn_advice you read.
- observed_primary: the facet most visibly dominating the actual assistant reply.
- suppressed_leakage: facets that surfaced too strongly despite being listed as suppressed.
- overblending: whether too many traits diluted the intended hierarchy.
- alignment: aligned = hierarchy mostly landed; partial = intended facet present but diluted or competed; misaligned = different facet dominated or suppression clearly failed.
- repair_hint: short and directly usable by next turn planner's micro_repair. null if aligned.
- Include only active characters with enough material to judge. Judge observable portrayal only. Do not punish subtlety.
- Flag leakage when a suppressed facet clearly made the reply easier, sweeter, flatter, or more generic than intended.
- Prefer one precise fix over broad commentary. If evidence is weak, prefer partial over overconfident misaligned.`,
        },
      ],
    },

    {
      id: "call_t5_moment_capture",
      name: "Moment Capture",
      target_model: "B",
      every_n_turns: 3,
      read_dialogue_rounds: 3,
      read_lorebook_names:
        "rp_turn_trace, rp_arc_memory, rp_turning_point_log, rp_recent_world_entries",
      entries: [
        {
          lorebook_name: "rp_turning_point_log",
          write_mode: "append",
          always_active: false,
          retention_enabled: false,
          retention_after: 0,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_turning_point_log": {
    "recorded_moments": [
      {
        "scene_snapshot": "<vivid physical or emotional detail anchoring the moment — include who, where, and the sensory or emotional texture>",
        "key_quote": "<EXACT spoken line or highly specific action that crystallized the shift — copied verbatim from dialogue, not paraphrased>",
        "immediate_impact": "<how the dynamic, tension, or plot concretely changed as a result, one brief sentence>"
      }
    ]
  }
}

FIELD RULES:
- PURPOSE: Capture vivid scene-level detail that long-term memory cannot preserve — the exact texture and words of a turning point, not its structural meaning.
- GATE: Only record if contain a meaningful revelation, an emotional boundary crossing, or a clear plot pivot. If nothing qualifies, output recorded_moments as an empty array [].
- recorded_moments: Empty array [] if no shift occurred. Max 1 item per run — choose the single most significant moment if multiple candidates exist.
- key_quote: Must be copied VERBATIM from the dialogue. Do not summarize, paraphrase, or reconstruct. If no exact line is available, use a tightly specific action description instead.
- scene_snapshot: Write with enough subject/object context that the entry is self-contained and meaningful when retrieved later with no surrounding conversation.
- immediate_impact: Focus on observable change to relationship dynamic, power balance, or plot direction — not internal feelings.
- IMPORTANT: rp_turning_point_log accumulates over time. Read the existing entries before writing to avoid recording the same moment twice.`,
        },
        {
          lorebook_name: "rp_recent_world_entries",
          write_mode: "append",
          always_active: true,
          retention_enabled: true,
          retention_after: 15,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_recent_world_entries": {
    "recorded_moments": [
      {
      "name": "<name>",
        "Key": "<fact>"
      }
    ]
  }
}

FIELD RULES:
- One sentence per entry.
- Only NEW facts not already in rp_recent_world_entries or rp_world_encyclopedia.
- Cover all turns since last run (up to 3 turns).
- entries:[] if nothing new.`,
        },
      ],
    },

    {
      id: "call_t5_longterm_reflection",
      name: "Long-term Reflection",
      target_model: "A",
      every_n_turns: 10,
      read_dialogue_rounds: 1,
      read_lorebook_names:
        "rp_turn_trace, rp_scene_and_role_state, rp_persona_importance, rp_facet_realization_audit, rp_persistent_memory, rp_arc_memory, rp_facet_activation_ledger, rp_persona_evolution_state, rp_turning_point_log",
      read_persona_names: "rp_character_core",
      entries: [
        {
          lorebook_name: "rp_arc_memory",
          write_mode: "append",
          always_active: false,
          retention_enabled: false,
          retention_after: 0,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_arc_memory": {
    "phase_shift_detected": "<true|false>",
    "arc_phase": "<setup|escalation|rupture|negotiation|resolution | null>",
    "turning_point": "<exact line/action or concise event | null>",
    "phase_change": "<how the last stretch changed | null>",
    "lasting_effect": "<durable consequence | null>"
  }
}

FIELD RULES:
- Set phase_shift_detected to "true" ONLY when a genuine arc phase shift or clear turning point occurred in recent turns.
- If phase_shift_detected is "false", set all other fields to null. This entry is still appended; downstream tasks must treat false entries as no-op records and skip them when evaluating arc history.
- If phase_shift_detected is "true", fill remaining fields as precisely as possible. For turning_point: if rp_turning_point_log contains a relevant recorded_moment, use its key_quote verbatim as the turning_point value — this preserves the exact scene anchor. If no rp_turning_point_log entry applies, write a concise event description. Keep wording compact and retrieval-friendly.`,
        },
        {
          lorebook_name: "rp_persistent_memory",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_persistent_memory": {
"CharName": {
    "relation_state": {
      "dynamic_label": "<guarded|warming|unstable|intimate|dependent>",
      "trust_level": <int 0-10>,
      "recent_macro_shift": "<major recent change>"
    },
    "open_threads": ["<durable unresolved tension>"],
    "duties_or_promises": ["<promise, burden, debt, obligation>"],
    "model_reminder": ["<top behavior rule for Actor>"]
}
  }
}

FIELD RULES:
- Keep only durable, behavior-relevant material. Exclude fleeting mood unless it changed relationship structure.`,
        },
        {
          lorebook_name: "rp_facet_activation_ledger",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_facet_activation_ledger": {
    "characters": {
      "CharName": {
        "facet_stats": [
          {
            "name": "<facet>",
            "recent_activation": <int 0-10>,
            "recent_primary": <int 0-10>,
            "successful_landings": <int 0-10>,
            "suppressed_leakage": <int 0-10>,
            "cross_scene_support": "<low|medium|high>",
            "trend": "<rising|stable|fading>"
          }
        ]
      }
    }
  }
}

FIELD RULES:
- Include only 3-5 most behavior-relevant facets.
- IMPORTANT: Derive all statistics from the rp_facet_realization_audit entries you have read — not from the raw dialogue. The audit records are your primary evidence source for activation frequency and alignment outcomes.
- All values are compressed estimates over the recent audit history — relative trend indicators, not exact raw counts.
- recent_activation: estimated frequency the facet appeared as primary or secondary in recent rp_turn_advice records.
- recent_primary: estimated frequency specifically designated as primary.
- successful_landings: estimated frequency rp_facet_realization_audit shows "aligned" when this facet was intended primary.
- suppressed_leakage: estimated frequency rp_facet_realization_audit flags this facet leaked despite suppression.
- cross_scene_support: whether the pattern persists across more than one scene type (infer from scene_context variation in rp_turn_trace).
- trend: conservative; use "stable" unless direction is clearly sustained across multiple recent audits.
- This is a compact ledger, not a transcript. Do not invent a trend if evidence is weak.`,
        },
        {
          lorebook_name: "rp_persona_evolution_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_persona_evolution_state": {
    "characters": {
      "CharName": {
        "stable_core": ["<facet>"],
        "reinforced_facets": ["<facet>"],
        "compensatory_facets": ["<facet>"],
        "earned_growth": ["<scene-justified durable softening or shift>"],
        "drift_risks": ["<repeated portrayal drift>"],
        "baseline_adjustment_candidates": [
          {
            "name": "<facet>",
            "direction": "<up|down|watch>",
            "confidence": "<low|medium|high>",
            "reason": "<short evidence summary>"
          }
        ],
        "repair_directive": "<minimal future correction | null>"
      }
    }
  }
}

FIELD RULES:
- Include only characters with enough recent material.
- stable_core: protected identity-bearing facets still clearly intact.
- reinforced_facets: repeatedly and successfully activated facets.
- compensatory_facets: repeatedly needed for scene handling, but not identity-bearing.
- earned_growth: valid story-supported lasting shifts only. Do not confuse with generic softening or single-scene emotion.
- drift_risks: repeated flattening, over-compliance, over-sweetness, over-explicitness, or loss of signature restraint.
- baseline_adjustment_candidates: up = candidate for slightly stronger future baseline salience; down = slight de-emphasis; watch = too early, use when confidence is low or evidence is mixed.
- confidence: medium or high only when rp_facet_activation_ledger shows clear sustained trend across multiple scene types. Ledger values are estimates; require directionally consistent evidence.
- repair_directive: short and behavioral.
- Do not punish earned development. Do not promote a single emotional scene into structural change. Prefer small reversible recommendations.
- baseline_adjustment_candidates with confidence medium|high feed task 3 evolution_nudge in subsequent turns.`,
        },
      ],
    },

    {
      id: "call_t7_world_update",
      name: "World Update",
      target_model: "A",
      every_n_turns: 15,
      read_dialogue_rounds: 1,
      read_lorebook_names: "rp_world_encyclopedia, rp_recent_world_entries",
      entries: [
        {
          lorebook_name: "rp_world_encyclopedia",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_world_encyclopedia": {
    "geography": [
      {
        "name": "<place>",
        "description": "<compact description>",
        "current_relevance": "<why it matters now>"
      }
    ],
    "npcs": [
      {
        "name": "<NPC>",
        "status": "<alive/dead + condition>",
        "notes": "<latest durable change>"
      }
    ],
    "factions": [
      {
        "name": "<faction>",
        "relations": "<stance toward player/others>"
      }
    ],
    "lore": [
      {
        "topic": "<subject>",
        "detail": "<compact durable fact>"
      }
    ]
  }
}

FIELD RULES:
- Use prior encyclopedia as baseline. Add only durable facts. Remove obvious duplicates.
- Keep entries reference-oriented, not prose-heavy.
- Only integrate new, stable world information. Do not write short-term noise into the encyclopedia.`,
        },
      ],
    },
  ];

  const NEW_PRESET2_CALLS = [
    {
      id: "call_b1_snapshot",
      name: "Snapshot",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names: "rp_turn_trace, rp_scene_state, rp_active_cast",
      read_persona_names: "rp_character_core",
      entries: [
        {
          lorebook_name: "rp_turn_trace",
          write_mode: "append",
          always_active: true,
          retention_enabled: true,
          retention_after: 10,
          retention_keep: 3,
          output_format: `SCHEMA:
{
  "rp_turn_trace": {
    "scene": "<place + immediate situation>",
    "time_anchor": "<explicit in-story time | null>",
    "elapsed_since_prev": "<same moment | +10m | +1h | +1d | unspecified_continuation>",
    "user_move": "<most important player action or line>",
    "turn_effect": "<what changed this turn (politics/danger/relations/leverage)>"
  }
}

FIELD RULES:
- TEMPORAL NOTE: The rp_turn_trace entry in the lorebook is from the PREVIOUS turn (T-1). You are now writing the CURRENT turn's entry.
- Keep only the single most decision-relevant event from the current turn.
- turn_effect: focus on political and relational shifts — leverage gained/lost, alliances tested, secrets risked.`,
        },
        {
          lorebook_name: "rp_scene_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_scene_state": {
    "scene_type": "court|council|intrigue|travel|battle_prep|confrontation|negotiation|recovery|mixed",
    "tension_level": "<int 0-10>",
    "stakes_level": "<int 0-10> (practical consequences, not emotion only)",
    "main_unresolved_issue": "<single most important unresolved issue | null>",
    "initiative": "<user|character|player|npc|contested|external_factor>",
    "progress_vector": "<looping|inching_forward|escalating|destabilizing|resolving>"
  }
}

FIELD RULES:
- TEMPORAL NOTE: The rp_scene_state in the lorebook is from the PREVIOUS turn (T-1). You are overwriting it with the CURRENT turn's state.
- stakes_level reflects political and practical consequences, not just emotional intensity.`,
        },
        {
          lorebook_name: "rp_active_cast",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_active_cast": {
    "present_characters": [
      {
        "name": "<character name>",
        "visible_role": "<apparent role, ≤12w>",
        "apparent_stance": "<supportive|hostile|cautious|neutral|deceptive|unknown>",
        "immediate_goal": "<what they seem to want, ≤14w>"
      }
    ],
    "absent_but_relevant": ["<name>"]
  }
}

FIELD RULES:
- TEMPORAL NOTE: Overwrite with the CURRENT turn's active cast.
- present_characters: only characters active in the current local scene.
- absent_but_relevant: off-scene actors whose interests or actions still shape the scene.`,
        },
      ],
    },

    {
      id: "call_b2_knowledge",
      name: "Knowledge & Logic",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 3,
      read_lorebook_names:
        "rp_logic_state, rp_knowledge_matrix, rp_recent_world_entries",
      entries: [
        {
          lorebook_name: "rp_logic_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_logic_state": {
    "known_contradiction": "<current impossible/invalid action or fact | null>",
    "active_threads": [
      {
        "desc": "<main scene-relevant thread>",
        "status": "<active|stalled|nearly_resolved>",
        "next_step": "<most likely next logical move>"
      }
    ]
  }
}

FIELD RULES:
- TEMPORAL NOTE: rp_logic_state in the lorebook is from the PREVIOUS turn (T-1). You are overwriting it with the CURRENT turn's state. Use it as a baseline, then update based on the latest dialogue.
- Keep only top 2 threads.
- Threads may be strategic, diplomatic, factional, relational, or knowledge-based.
- Only flag contradictions that matter now.`,
        },
        {
          lorebook_name: "rp_knowledge_matrix",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_knowledge_matrix": {
    "changed_ids": ["K001"],
    "entries": [
      {
        "id": "K001",
        "subject": "<fact or secret, ≤16w>",
        "true_state": "<actual truth, ≤16w>",
        "known_by": ["<character|faction>"],
        "unknown_to": ["<character|faction>"],
        "public_status": "<public|secret|disputed>",
        "stability": "<locked|fragile|shifting>",
        "interpretation_risk": "<most important likely misread, ≤18w | null>"
      }
    ]
  }
}

FIELD RULES:
- TEMPORAL NOTE: Update only entries relevant to recent turns or active pressure.
- Track secrets, leverage points, and intelligence asymmetries that affect current strategy.`,
        },
      ],
    },

    {
      id: "call_b3_persona_routing",
      name: "Persona Routing",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names:
        "rp_scene_state, rp_logic_state, rp_persistent_memory, rp_facet_realization_audit, rp_persona_evolution_state, rp_mask_state",
      read_persona_names: "rp_persona_inventory",
      entries: [
        {
          lorebook_name: "rp_persona_importance",
          write_mode: "overwrite",
          always_active: true,
          output_format: `TEMPORAL CONTEXT:
- All lorebook entries you are reading are from the PREVIOUS turn (T-1).
- rp_scene_state, rp_logic_state, rp_persistent_memory: T-1 state — use as the baseline context for what is currently true.
- rp_facet_realization_audit (T-1): audited T-2 actor reply against the T-2 plan. Use to assess if the same drift is present in current (T-1) dialogue evidence. If T-1 already self-corrected, set micro_repair null.
- rp_persona_evolution_state: use baseline_adjustment_candidates to determine if evolution_nudge is applicable.
- rp_mask_state (T-1 or earlier): use to determine which facets are being publicly projected vs concealed.

SCHEMA:
{
  "rp_persona_importance": {
    "characters": {
      "CharName": {
        "ranked_facets": [
          {
            "name": "<facet>",
            "importance": <int 0-100>,
            "activation_source": "<scene|relationship|threat|status|desire|duty|political|secret|leverage|mixed>",
            "activation_kind": "<baseline|scene-evoked|compensatory|stress-leak|earned-shift|mask-maintained|mask-slip>",
            "projection_layer": "<public|private|strategic>",
            "stability": "<low|medium|high>",
            "mode": "<primary|secondary|background|suppressed>",
            "why_now": "<short scene trigger>",
            "counterfactual_risk": "<what likely breaks if absent | null>"
          }
        ]
      }
    }
  }
}

FIELD RULES:
- Include only active characters. Rank only 3-5 facets total.
- Exactly 1 facet should be primary when enough evidence exists. At most 1 secondary. Remaining: background or suppressed.
- importance is relative for this turn, not universal truth.
- projection_layer: public = facet displayed outwardly; private = internal but not concealed; strategic = shown to specific audience for tactical benefit.
- activation_kind: mask-maintained = facet held active by deliberate persona projection; mask-slip = suppressed facet surfacing despite mask.
- If no strong support, use flatter scores, lower stability, keep more in background.
- Favor scene usefulness over completeness. Do not force activation of every baseline trait.
- Prefer facets with clearer behavioral_axis and stronger counterfactual_risk for primary.`,
        },
        {
          lorebook_name: "rp_turn_advice",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_turn_advice": {
    "response_guard": {
      "biggest_risk": "<main likely failure next turn>",
      "strict_directive": "<Proceed normally | Preserve tension | Do not resolve yet | Enforce guarded response | Show friction | Reject action | Preserve political ambiguity | Maintain mask | Do not reveal leverage>"
    },
    "character_routing": {
      "CharName": {
        "portrayal_goal": "<how this character should come across next>",
        "primary_facet": "<facet | null>",
        "secondary_facet": "<facet | null>",
        "background_facets": ["<facet>"],
        "suppressed_facets": ["<facet>"],
        "mask_alignment": "<on_mask|testing_mask|slipping|dropped>",
        "micro_repair": "<small correction based on rp_facet_realization_audit (T-1) | null>",
        "evolution_nudge": "<small allowed emphasis if rp_persona_evolution_state supports it | null>",
        "reply_strategy": "<one-turn plan>"
      }
    },
    "candidate_hint": {
      "preferred_shape": "<best reply shape>",
      "avoid_shape": "<bad reply shape>"
    }
  }
}

FIELD RULES:
- primary_facet must match the primary mode facet from rp_persona_importance above.
- secondary_facet: at most one. background_facets: max 2. suppressed_facets: max 2.
- mask_alignment: on_mask = character fully maintaining public persona; testing_mask = probing limits; slipping = partial reveal under pressure; dropped = private/strategic layer fully exposed.
- micro_repair: short correction from rp_facet_realization_audit (T-1). null if aligned or no prior audit exists.
- evolution_nudge: only if rp_persona_evolution_state.baseline_adjustment_candidates includes this facet with confidence medium or high. Do not invent nudges. Do not override hard boundaries.
- If rp_logic_state.known_contradiction is non-null, strict_directive must be "Reject action" or "Show friction".
- reply_strategy must be executable in one turn. Account for political subtext and information asymmetry.
- If hierarchy is flat or uncertain, compress expression instead of averaging many facets.`,
        },
      ],
    },

    {
      id: "call_b4_realization_audit",
      name: "Realization Audit",
      target_model: "B",
      every_n_turns: 1,
      read_dialogue_rounds: 2,
      read_lorebook_names:
        "rp_turn_advice, rp_persona_importance, rp_facet_realization_audit",
      entries: [
        {
          lorebook_name: "rp_facet_realization_audit",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_facet_realization_audit": {
    "audited_turn": "<turn indicator, e.g. T-1>",
    "advice_source_turn": "<turn indicator of rp_turn_advice used as reference, e.g. T-1>",
    "characters": {
      "CharName": {
        "intended_primary": "<facet | null>",
        "observed_primary": "<facet | null>",
        "suppressed_leakage": ["<facet>"],
        "overblending": "<low|medium|high>",
        "alignment": "<aligned|partial|misaligned>",
        "repair_hint": "<short next-turn adjustment | null>"
      }
    }
  }
}

FIELD RULES:
- TEMPORAL NOTE: All lorebook entries are from the PREVIOUS turn (T-1). You are writing the CURRENT turn's audit.
- audited_turn: which turn's actual assistant reply is evaluated ("T-1" = most recent assistant reply).
- advice_source_turn: which rp_turn_advice is the reference benchmark ("T-1" = the one currently in lorebook, written last turn).
- intended_primary: the primary_facet from the rp_turn_advice you read.
- observed_primary: the facet most visibly dominating the actual assistant reply.
- suppressed_leakage: facets that surfaced too strongly despite being listed as suppressed.
- overblending: whether too many traits diluted the intended hierarchy.
- alignment: aligned = hierarchy mostly landed; partial = intended facet present but diluted or competed; misaligned = different facet dominated or suppression clearly failed.
- repair_hint: short and directly usable by next turn planner's micro_repair. null if aligned.
- Include only active characters with enough material to judge. Judge observable portrayal only. Do not punish subtlety.
- Flag leakage when a suppressed facet clearly made the reply easier, sweeter, flatter, or more generic than intended.
- Prefer one precise fix over broad commentary. If evidence is weak, prefer partial over overconfident misaligned.`,
        },
      ],
    },

    {
      id: "call_b5_strategy_guard",
      name: "Strategy & Guard",
      target_model: "B",
      every_n_turns: 2,
      read_dialogue_rounds: 3,
      read_lorebook_names:
        "rp_scene_state, rp_active_cast, rp_knowledge_matrix, rp_strategy_layer, rp_relation_web, rp_response_guard",
      entries: [
        {
          lorebook_name: "rp_strategy_layer",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_strategy_layer": {
    "player_side_goal": "<current strategic goal, ≤16w>",
    "player_side_operations": ["<operation or line of action>"],
    "rival_operations": ["<opposing move or pressure>"],
    "immediate_leverage": ["<asset|weakness|debt|secret|positional advantage>"],
    "strategic_risk": "<main current risk, ≤18w | null>"
  }
}

RULES:
- Focus on active strategic moves.
- TEMPORAL NOTE: Update based on latest dialogue developments.`,
        },
        {
          lorebook_name: "rp_mask_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_mask_state": {
    "CharName": {
      "inner_active_facets": ["<real internal facet>"],
      "displayed_facets": ["<facet shown outwardly>"],
      "concealed_facets": ["<facet intentionally hidden>"],
      "mask_goal": "<what the mask achieves, ≤18w>"
    }
  }
}

RULES:
- Each list 0-3 items.
- TEMPORAL NOTE: Update based on current turn's mask behavior.`,
        },
        {
          lorebook_name: "rp_response_guard",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_response_guard": {
    "biggest_ooc_risk": "<most likely OOC failure, ≤18w | null>",
    "biggest_logic_risk": "<continuity/knowledge failure, ≤18w | null>",
    "biggest_political_risk": "<tactical/diplomatic misstep, ≤18w | null>",
    "biggest_facet_mismatch_risk": "<wrong persona expression, ≤20w | null>",
    "strict_directive": "<Proceed normally | Preserve tension | Do not resolve too quickly | Do not speak for user | Enforce guarded response | Enforce emotional continuity | Preserve ambiguity | Restrict unavailable knowledge | Maintain political caution | Do not reveal leverage too early | Preserve persona resistance>"
  }
}

RULES:
- Fill each risk field with only the single highest-priority risk.`,
        },
        {
          lorebook_name: "rp_pattern_guard",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_pattern_guard": {
    "staleness_level": "<int 0-10>",
    "dominant_recent_pattern": "<recent structure/style, ≤18w | null>",
    "dominant_persona_loop": "<political mask/reaction repeating, ≤18w | null>",
    "variation_direction": "<none|more_dialogue|more_subtext|less_exposition|less_inner_monologue|more_action|more_formality|more_indirectness|shorter|longer>",
    "persona_variation_hint": "<alternative valid expression, ≤18w | null>"
  }
}`,
        },
      ],
    },

    {
      id: "call_b6_moment_capture",
      name: "Moment Capture",
      target_model: "B",
      every_n_turns: 3,
      read_dialogue_rounds: 3,
      read_lorebook_names:
        "rp_turn_trace, rp_arc_memory, rp_turning_point_log, rp_recent_world_entries",
      entries: [
        {
          lorebook_name: "rp_turning_point_log",
          write_mode: "append",
          always_active: false,
          retention_enabled: false,
          retention_after: 0,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_turning_point_log": {
    "recorded_moments": [
      {
        "scene_snapshot": "<vivid physical or political detail anchoring the moment — include who, where, and the sensory or strategic texture>",
        "key_quote": "<EXACT spoken line or highly specific action that crystallized the shift — copied verbatim from dialogue, not paraphrased>",
        "immediate_impact": "<how the dynamic, tension, power balance, or plot concretely changed as a result, one brief sentence>"
      }
    ]
  }
}

FIELD RULES:
- PURPOSE: Capture vivid scene-level detail that long-term memory cannot preserve — the exact texture and words of a political or dramatic turning point, not its structural meaning.
- GATE: Only record if there is a meaningful revelation, a political realignment, an exposed secret, or a clear plot pivot. If nothing qualifies, output recorded_moments as an empty array [].
- recorded_moments: Empty array [] if no shift occurred. Max 1 item per run — choose the single most significant moment if multiple candidates exist.
- key_quote: Must be copied VERBATIM from the dialogue. Do not summarize, paraphrase, or reconstruct. If no exact line is available, use a tightly specific action description instead.
- scene_snapshot: Write with enough subject/object context that the entry is self-contained and meaningful when retrieved later with no surrounding conversation.
- immediate_impact: Focus on observable change to political balance, relationship, leverage, or plot direction.
- IMPORTANT: rp_turning_point_log accumulates over time. Read the existing entries before writing to avoid recording the same moment twice.`,
        },
        {
          lorebook_name: "rp_recent_world_entries",
          write_mode: "append",
          always_active: true,
          retention_enabled: true,
          retention_after: 15,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_recent_world_entries": {
    "recorded_moments": [
      {
        "name": "<n>",
        "Key": "<fact>"
      }
    ]
  }
}

FIELD RULES:
- One sentence per entry.
- Only NEW facts not already in rp_recent_world_entries or rp_world_encyclopedia.
- Cover all turns since last run (up to 3 turns).
- entries:[] if nothing new.`,
        },
      ],
    },

    {
      id: "call_b7_principles_web",
      name: "Principles & Web",
      target_model: "A",
      every_n_turns: 4,
      read_dialogue_rounds: 4,
      read_lorebook_names:
        "rp_turn_trace, rp_scene_state, rp_active_cast, rp_persona_importance, rp_knowledge_matrix, rp_strategy_layer, rp_mask_state, rp_arc_memory",
      entries: [
        {
          lorebook_name: "rp_scene_principles",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_scene_principles": {
    "priority_dimensions": ["<dim1>", "<dim2>", "<dim3>"],
    "priority_order_reason": "<≤22w>",
    "primary_persona_constraint": "<≤18w>",
    "secondary_persona_constraint": "<≤18w | null>",
    "principles": [
      {
        "name": "<short name>",
        "why_now": "<≤20w>",
        "good_signal": "<what success looks like, ≤20w>",
        "bad_signal": "<what failure looks like, ≤20w>"
      }
    ],
    "facet_success_criteria": ["<facet-behavior match1>", "<facet-behavior match2>"],
    "short_term_success": "<success over next 1-3 replies, ≤26w>"
  }
}

RULES:
- High quality: B → 4-5 principles.
- Economy: B → 3 principles.`,
        },
        {
          lorebook_name: "rp_relation_web",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_relation_web": {
    "key_edges": [
      {
        "a": "<actor A>",
        "b": "<actor B>",
        "current_dynamic": "<allied|strained|dependent|hostile|suspicious|transactional|deceptive|mixed>",
        "trust_level": "<int 0-10>",
        "imbalance": "<A_over_B|B_over_A|balanced|unstable>",
        "recent_shift": "<what changed, ≤18w>"
      }
    ],
    "most_sensitive_edge": "<A-B pair under highest pressure | null>"
  }
}

RULES:
- Include only the 3-8 most relevant edges for the current arc.`,
        },
        {
          lorebook_name: "rp_faction_pressure",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_faction_pressure": {
    "active_factions": [
      {
        "name": "<faction>",
        "goal": "<current goal, ≤16w>",
        "stance": "<ally|rival|neutral|split|covert>",
        "pressure_on_scene": "<how they affect current situation, ≤18w>"
      }
    ],
    "background_pressures": ["<off-screen pressure: war|succession|rumor|law|debt|scarcity|religion|unrest|...>"]
  }
}`,
        },
        {
          lorebook_name: "rp_perception_gap",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_perception_gap": {
    "actor": "<name or faction | null>",
    "misread_target": "<name, faction, or event | null>",
    "false_belief": "<what they likely believe, ≤18w | null>",
    "impact_on_next_reply": "<how it distorts behavior, ≤18w | null>"
  }
}

RULES:
- Set all fields to null if no meaningful perception gap is active.`,
        },
      ],
    },

    {
      id: "call_b8_longterm",
      name: "Longterm",
      target_model: "A",
      every_n_turns: 10,
      read_dialogue_rounds: 1,
      read_lorebook_names:
        "rp_strategy_layer, rp_relation_web, rp_knowledge_matrix, rp_persona_importance, rp_scene_principles, rp_persistent_memory, rp_arc_memory, rp_facet_activation_ledger, rp_persona_evolution_state, rp_turning_point_log",
      read_persona_names: "rp_character_core",
      entries: [
        {
          lorebook_name: "rp_arc_memory",
          write_mode: "append",
          always_active: false,
          retention_enabled: false,
          retention_after: 0,
          retention_keep: 0,
          output_format: `SCHEMA:
{
  "rp_arc_memory": {
    "phase_shift_detected": "<true|false>",
    "arc_phase": "<setup|escalation|fracture|maneuver|reversal|recovery|resolution|aftermath | null>",
    "turning_point": "<exact line/action or concise event | null>",
    "phase_change": "<how the last stretch changed | null>",
    "lasting_effect": "<durable consequence | null>"
  }
}

FIELD RULES:
- Set phase_shift_detected to "true" ONLY when a genuine arc phase shift or clear political/narrative turning point occurred in recent turns.
- If phase_shift_detected is "false", set all other fields to null. This entry is still appended; downstream tasks must treat false entries as no-op records and skip them when evaluating arc history.
- If phase_shift_detected is "true", fill remaining fields as precisely as possible. For turning_point: if rp_turning_point_log contains a relevant recorded_moment, use its key_quote verbatim as the turning_point value — this preserves the exact scene anchor. If no rp_turning_point_log entry applies, write a concise event description.`,
        },
        {
          lorebook_name: "rp_persistent_memory",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_persistent_memory": {
    "CharName": {
      "relation_state": {
        "dynamic_label": "<guarded|warming|unstable|intimate|dependent|adversarial|allied|transactional>",
        "trust_level": <int 0-10>,
        "recent_macro_shift": "<major recent change>"
      },
      "open_threads": ["<durable unresolved tension or political conflict>"],
      "duties_or_promises": ["<promise, burden, debt, obligation, or leverage>"],
      "political_exposure": ["<known secret, alliance, or strategic vulnerability>"],
      "model_reminder": ["<top behavior rule for Actor>"]
    }
  }
}

FIELD RULES:
- Keep only durable, behavior-relevant material. Exclude fleeting mood unless it changed relationship or political structure.
- political_exposure: track information asymmetries and strategic obligations that persist beyond the current scene.`,
        },
        {
          lorebook_name: "rp_facet_activation_ledger",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_facet_activation_ledger": {
    "characters": {
      "CharName": {
        "facet_stats": [
          {
            "name": "<facet>",
            "recent_activation": <int 0-10>,
            "recent_primary": <int 0-10>,
            "successful_landings": <int 0-10>,
            "suppressed_leakage": <int 0-10>,
            "cross_scene_support": "<low|medium|high>",
            "trend": "<rising|stable|fading>"
          }
        ]
      }
    }
  }
}

FIELD RULES:
- Include only 3-5 most behavior-relevant facets.
- IMPORTANT: Derive all statistics from the rp_facet_realization_audit entries you have read — not from the raw dialogue. The audit records are your primary evidence source for activation frequency and alignment outcomes.
- All values are compressed estimates over the recent audit history — relative trend indicators, not exact raw counts.
- recent_activation: estimated frequency the facet appeared as primary or secondary in recent rp_turn_advice records.
- recent_primary: estimated frequency specifically designated as primary.
- successful_landings: estimated frequency rp_facet_realization_audit shows "aligned" when this facet was intended primary.
- suppressed_leakage: estimated frequency rp_facet_realization_audit flags this facet leaked despite suppression.
- cross_scene_support: whether the pattern persists across more than one scene type (infer from scene_context variation in rp_turn_trace).
- trend: conservative; use "stable" unless direction is clearly sustained across multiple recent audits.`,
        },
        {
          lorebook_name: "rp_persona_evolution_state",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_persona_evolution_state": {
    "characters": {
      "CharName": {
        "stable_core": ["<facet>"],
        "reinforced_facets": ["<facet>"],
        "compensatory_facets": ["<facet>"],
        "earned_growth": ["<scene-justified durable softening or shift>"],
        "drift_risks": ["<repeated portrayal drift>"],
        "baseline_adjustment_candidates": [
          {
            "name": "<facet>",
            "direction": "<up|down|watch>",
            "confidence": "<low|medium|high>",
            "reason": "<short evidence summary>"
          }
        ],
        "repair_directive": "<minimal future correction | null>"
      }
    }
  }
}

FIELD RULES:
- Include only characters with enough recent material.
- stable_core: protected identity-bearing facets still clearly intact.
- reinforced_facets: repeatedly and successfully activated facets.
- compensatory_facets: repeatedly needed for scene handling, but not identity-bearing.
- earned_growth: valid story-supported lasting shifts only. Do not confuse with generic softening or single-scene emotion.
- drift_risks: repeated flattening, over-compliance, loss of political caution, or loss of signature restraint.
- baseline_adjustment_candidates: up = candidate for slightly stronger future baseline salience; down = slight de-emphasis; watch = too early, use when confidence is low or evidence is mixed.
- confidence: medium or high only when rp_facet_activation_ledger shows clear sustained trend across multiple scene types.
- repair_directive: short and behavioral.
- Do not punish earned development. Do not promote a single emotional scene into structural change.
- baseline_adjustment_candidates with confidence medium|high feed call_b3_persona_routing evolution_nudge in subsequent turns.`,
        },
        {
          lorebook_name: "rp_model_reminder",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_model_reminder": {
    "remember_for_future_replies": [
      "<priority reminder 1>",
      "<priority reminder 2>",
      "<priority reminder 3>",
      "<priority reminder 4>"
    ]
  }
}

RULES:
- Keep each item short and operational.
- Prioritize secrets / obligations / active threats / leverage / persona projection / political alliances.`,
        },
      ],
    },

    {
      id: "call_b9_world_update",
      name: "World Update",
      target_model: "A",
      every_n_turns: 15,
      read_dialogue_rounds: 1,
      read_lorebook_names: "rp_world_encyclopedia, rp_recent_world_entries",
      entries: [
        {
          lorebook_name: "rp_world_encyclopedia",
          write_mode: "overwrite",
          always_active: true,
          output_format: `SCHEMA:
{
  "rp_world_encyclopedia": {
    "geography": [
      {
        "name": "<place>",
        "description": "<compact description>",
        "current_relevance": "<why it matters now>"
      }
    ],
    "npcs": [
      {
        "name": "<NPC>",
        "status": "<alive/dead + condition>",
        "notes": "<latest durable change>"
      }
    ],
    "factions": [
      {
        "name": "<faction>",
        "relations": "<stance toward player/others>"
      }
    ],
    "lore": [
      {
        "topic": "<subject>",
        "detail": "<compact durable fact>"
      }
    ]
  }
}

FIELD RULES:
- Use prior encyclopedia as baseline. Add only durable facts. Remove obvious duplicates.
- Keep entries reference-oriented, not prose-heavy.
- Only integrate new, stable world information. Do not write short-term noise into the encyclopedia.`,
        },
      ],
    },
  ];

  const DEFAULTS = {
    extractor_a_provider: "custom_api",
    extractor_a_format: "openai",
    extractor_a_url: "",
    extractor_a_key: "",
    extractor_a_model: "",
    extractor_a_provider_model_map: "{}",
    extractor_a_provider_url_map: "{}",
    extractor_a_temperature: 0.2,
    extractor_b_provider: "custom_api",
    extractor_b_format: "openai",
    extractor_b_url: "",
    extractor_b_key: "",
    extractor_b_model: "",
    extractor_b_provider_model_map: "{}",
    extractor_b_provider_url_map: "{}",
    extractor_b_temperature: 0.2,
    embedding_provider: "custom_api",
    embedding_format: "openai",
    embedding_model: "",
    embedding_url: "",
    embedding_key: "",
    embedding_request_model: "",
    embedding_provider_model_map: "{}",
    embedding_provider_url_map: "{}",
    embedding_provider_key_map: "{}",
    extractor_a_provider_key_map: "{}",
    extractor_b_provider_key_map: "{}",
    model_calls: "pse_model_calls",
    persona_calls: JSON.stringify(DEFAULT_PERSONA_CALLS),
    advanced_model_anchor_prompt: `ROLE: Narrative extractor for roleplay orchestration.

TASK: Read the recent dialogue and allowed memory. Return only the requested JSON.

RULES:
1. Output valid single-line JSON only.
2. Match the root key, fields, and value types exactly.
3. Use story language; keep values short and concrete.
4. Use only provided memory. If unsure, use null or [].`,
    advanced_prefill_prompt: `Now, let's start extracting. Once you are ready, say 'Ready.'`,
    advanced_prereply_prompt: "Ready.",
    read_mod_lorebook: 0,
    vector_search_enabled: 0,
    vector_search_query_dialogue_rounds: 2,
    vector_search_top_k: 6,
    vector_search_min_score: 0.35,
    init_bootstrap_target_model: "B",
    init_bootstrap_model_anchor_prompt: `You are a strict JSON classifier.

TASK: Classify each text block into exactly ONE of these categories:
1. "rp_instruction": Directives that govern AI behavior, writing style, or storytelling approach.
2. "character": Data about the roleplay character(s) themselves (persona, appearance, traits, background, abilities, motivations, relationships, character-specific facts).
3. "information": World/lore data NOT specific to the character(s): locations, factions, items, history, rules, events, general setting facts.
4. "output_format": Formatting command rules like image insert, status window, markdown templates, etc.

TIEBREAKERS:
- If a block contains both world facts and behavioral directives → "rp_instruction".
- If it mixes character facts with world facts → "character".

INPUT:
You will receive a JSON ARRAY of objects like:
[{ "id": "chk_0", "text": "..." }, { "id": "chk_1", "text": "..." }]

OUTPUT (STRICT):
- Return ONLY a JSON ARRAY.
- Each element MUST be an object with keys "id" and "category".
- "category" MUST be one of: "rp_instruction" | "character" | "information" | "output_format".
- Do NOT wrap the array in a string.
- Do NOT return a single object.
- No markdown, no extra text.

CORRECT EXAMPLE:
[
  {"id":"chk_0","category":"character"},
  {"id":"chk_1","category":"rp_instruction"}
]`,
    context_messages: 10,
    timeout_ms: FIXED_TIMEOUT_MS,
    extractor_a_thinking_enabled: 0,
    extractor_a_thinking_level: "",
    extractor_b_thinking_enabled: 0,
    extractor_b_thinking_level: "",
    extractor_a_concurrency: 0,
    extractor_b_concurrency: 1,
    embedding_concurrency: 1,
    model_calls_3: NEW_PRESET1_CALLS,
    model_calls_4: NEW_PRESET2_CALLS,
    active_preset: 1,
    ui_language: "en",
    card_enable_settings: "{}",
    vector_search_query_dialogue_rounds_2: 2,
    vector_search_top_k_2: 10,
    vector_search_min_score_2: 0.35,
  };

  const SETTING_KEYS = {
    extractor_a_provider: "pse_extractor_a_provider",
    extractor_a_format: "pse_extractor_a_format",
    extractor_a_url: "pse_extractor_a_url",
    extractor_a_key: "pse_extractor_a_key",
    extractor_a_model: "pse_extractor_a_model",
    extractor_a_provider_model_map: "pse_extractor_a_provider_model_map",
    extractor_a_provider_url_map: "pse_extractor_a_provider_url_map",
    extractor_a_temperature: "pse_extractor_a_temperature",
    extractor_b_provider: "pse_extractor_b_provider",
    extractor_b_format: "pse_extractor_b_format",
    extractor_b_url: "pse_extractor_b_url",
    extractor_b_key: "pse_extractor_b_key",
    extractor_b_model: "pse_extractor_b_model",
    extractor_b_provider_model_map: "pse_extractor_b_provider_model_map",
    extractor_b_provider_url_map: "pse_extractor_b_provider_url_map",
    extractor_b_temperature: "pse_extractor_b_temperature",
    embedding_provider: "pse_embedding_provider",
    embedding_format: "pse_embedding_format",
    embedding_model: "pse_embedding_model",
    embedding_url: "pse_embedding_url",
    embedding_key: "pse_embedding_key",
    embedding_request_model: "pse_embedding_request_model",
    embedding_provider_model_map: "pse_embedding_provider_model_map",
    embedding_provider_url_map: "pse_embedding_provider_url_map",
    embedding_provider_key_map: "pse_embedding_provider_key_map",
    extractor_a_provider_key_map: "pse_extractor_a_provider_key_map",
    extractor_b_provider_key_map: "pse_extractor_b_provider_key_map",
    model_calls: "pse_model_calls",
    persona_calls: "pse_persona_calls",
    advanced_model_anchor_prompt: "pse_advanced_model_anchor_prompt",
    advanced_prefill_prompt: "pse_advanced_prefill_prompt",
    advanced_prereply_prompt: "pse_advanced_prereply_prompt",
    read_mod_lorebook: "pse_read_mod_lorebook",
    vector_search_enabled: "pse_vector_search_enabled",
    vector_search_query_dialogue_rounds:
      "pse_vector_search_query_dialogue_rounds",
    vector_search_top_k: "pse_vector_search_top_k",
    vector_search_min_score: "pse_vector_search_min_score",
    init_bootstrap_target_model: "pse_init_bootstrap_target_model",
    init_bootstrap_model_anchor_prompt:
      "pse_init_bootstrap_model_anchor_prompt",
    context_messages: "pse_context_messages",
    timeout_ms: "pse_timeout_ms",
    extractor_a_thinking_enabled: "pse_extractor_a_thinking_enabled",
    extractor_a_thinking_level: "pse_extractor_a_thinking_level",
    extractor_b_thinking_enabled: "pse_extractor_b_thinking_enabled",
    extractor_b_thinking_level: "pse_extractor_b_thinking_level",
    extractor_a_concurrency: "pse_extractor_a_concurrency",
    extractor_b_concurrency: "pse_extractor_b_concurrency",
    embedding_concurrency: "pse_embedding_concurrency",
    model_calls_2: "pse_model_calls_2",
    model_calls_3: "pse_model_calls_3",
    model_calls_4: "pse_model_calls_4",
    active_preset: "pse_active_preset",
    card_enable_settings: "pse_card_enable_settings",
    vector_search_query_dialogue_rounds_2:
      "pse_vector_search_query_dialogue_rounds_2",
    vector_search_top_k_2: "pse_vector_search_top_k_2",
    vector_search_min_score_2: "pse_vector_search_min_score_2",
    ui_language: "pse_ui_language",
  };

  const MODEL_PROVIDER_OPTIONS = [
    { value: "openai", label: "openai" },
    { value: "anthropic", label: "anthropic" },
    { value: "google_cloud", label: "google cloud" },
    { value: "vertex_ai", label: "vertex ai" },
    { value: "grok", label: "grok (xAI)" },
    { value: "github_copilot", label: "github copilot" },
    { value: "openrouter", label: "openrouter" },
    { value: "custom_api", label: "custom API" },
  ];

  const PROVIDER_DEFAULT_URL = {
    openai: "https://api.openai.com/v1/chat/completions",
    anthropic: "https://api.anthropic.com/v1/messages",
    google_cloud: "https://generativelanguage.googleapis.com/v1beta/models",
    vertex_ai:
      "https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/global/publishers/google/models",
    grok: "https://api.x.ai/v1/chat/completions",
    github_copilot: "https://api.githubcopilot.com/chat/completions",
    openrouter: "https://openrouter.ai/api/v1/chat/completions",
    custom_api: "",
  };

  const EMBEDDING_MODEL_OPTIONS = [
    { value: "openai3large", label: "OpenAI text-embedding-3-large" },
    {
      value: "google_gemini_embedding_001",
      label: "Google gemini-embedding-001",
    },
    { value: "voyage_4_large", label: "Voyage voyage-4-large" },
    { value: "voyage_4", label: "Voyage voyage-4" },
    {
      value: "or_openai_text_embedding_3_large",
      label: "OpenRouter openai/text-embedding-3-large",
    },
    {
      value: "or_google_gemini_embedding_001",
      label: "OpenRouter google/gemini-embedding-001",
    },
    {
      value: "or_qwen_qwen3_embedding_8b",
      label: "OpenRouter qwen/qwen3-embedding-8b",
    },
    { value: "custom", label: "Custom (OpenAI-compatible)" },
  ];

  const EMBEDDING_OPENAI_MODEL_OPTIONS = [
    { value: "openai3large", label: "OpenAI text-embedding-3-large" },
  ];
  const EMBEDDING_GOOGLE_MODEL_OPTIONS = [
    {
      value: "gemini-embedding-2-preview",
      label: "Google gemini-embedding-2-preview",
    },
    {
      value: "google_gemini_embedding_001",
      label: "Google gemini-embedding-001",
    },
  ];
  const EMBEDDING_VOYAGE_MODEL_OPTIONS = [
    { value: "voyage_4_large", label: "Voyage voyage-4-large" },
    { value: "voyage_4", label: "Voyage voyage-4" },
  ];
  const EMBEDDING_OPENROUTER_MODEL_OPTIONS = [
    {
      value: "or_openai_text_embedding_3_large",
      label: "OpenRouter openai/text-embedding-3-large",
    },
    {
      value: "or_google_gemini_embedding_001",
      label: "OpenRouter google/gemini-embedding-001",
    },
    {
      value: "or_qwen_qwen3_embedding_8b",
      label: "OpenRouter qwen/qwen3-embedding-8b",
    },
  ];

  const EMBEDDING_PROVIDER_OPTIONS = [
    { value: "openai", label: "openai" },
    { value: "google_cloud", label: "google" },
    { value: "voyageai", label: "voyageai" },
    { value: "openrouter", label: "openrouter" },
    { value: "custom_api", label: "custom API" },
  ];

  const EMBEDDING_PROVIDER_PRESETS = {
    openai: {
      format: "openai",
      url: "https://api.openai.com/v1/embeddings",
      requestModel: "text-embedding-3-large",
      defaultModel: "openai3large",
      options: EMBEDDING_OPENAI_MODEL_OPTIONS,
    },
    google_cloud: {
      format: "google",
      url: "https://generativelanguage.googleapis.com/v1beta/models",
      requestModel: "gemini-embedding-001",
      defaultModel: "google_gemini_embedding_001",
      options: EMBEDDING_GOOGLE_MODEL_OPTIONS,
    },
    voyageai: {
      format: "openai",
      url: "https://api.voyageai.com/v1/embeddings",
      requestModel: "voyage-4-large",
      defaultModel: "voyage_4_large",
      options: EMBEDDING_VOYAGE_MODEL_OPTIONS,
    },
    openrouter: {
      format: "openai",
      url: "https://openrouter.ai/api/v1/embeddings",
      requestModel: "openai/text-embedding-3-large",
      defaultModel: "or_openai_text_embedding_3_large",
      options: EMBEDDING_OPENROUTER_MODEL_OPTIONS,
    },
    custom_api: {
      format: "openai",
      url: "",
      requestModel: "",
      defaultModel: "",
      options: [],
    },
  };

  const EMBEDDING_MODEL_TO_REQUEST = {
    openai3large: "text-embedding-3-large",
    google_gemini_embedding_001: "gemini-embedding-001",
    "gemini-embedding-2-preview": "gemini-embedding-2-preview",
    voyage_4_large: "voyage-4-large",
    voyage_4: "voyage-4",
    or_openai_text_embedding_3_large: "openai/text-embedding-3-large",
    or_google_gemini_embedding_001: "google/gemini-embedding-001",
    or_qwen_qwen3_embedding_8b: "qwen/qwen3-embedding-8b",
  };

  const API_FORMAT_OPTIONS = [
    { value: "openai", label: "OpenAI Compatible" },
    { value: "google", label: "Google Gemini" },
    { value: "vertex", label: "Google Vertex AI" },
    { value: "claude", label: "Anthropic Claude" },
  ];

  let LORE_WRITE_MODE_OPTIONS = [
    { value: "append", label: "Append" },
    { value: "overwrite", label: "Overwrite" },
  ];

  const PROVIDER_FORMAT_MAP = {
    openai: "openai",
    anthropic: "claude",
    google_cloud: "google",
    vertex_ai: "vertex",
    voyageai: "openai",
    grok: "openai",
    github_copilot: "openai",
    openrouter: "openai",
    custom_api: "openai",
  };

  const EXTRACTOR_MODEL_OPTIONS = [
    { value: "gpt-5.4-pro", label: "GPT-5.4 Pro" },
    { value: "gpt-5.4", label: "GPT-5.4" },
    { value: "gpt-5.3-chat", label: "GPT-5.3 Chat" },
    { value: "gpt-5-mini", label: "GPT-5 mini" },
    { value: "gpt-5-nano", label: "GPT-5 nano" },
    { value: "claude-opus-4-6", label: "Claude 4.6 Opus" },
    { value: "claude-sonnet-4-6", label: "Claude 4.6 Sonnet" },
    { value: "claude-haiku-4-5-20251001", label: "Claude 4.5 Haiku" },
    { value: "claude-sonnet-4.5", label: "Claude 4.5 Sonnet" },
    {
      value: "grok-4.20-multi-agent-beta",
      label: "Grok 4.20 Multi-Agent Beta",
    },
    { value: "grok-4.20-beta", label: "Grok 4.2 Beta" },
    { value: "grok-4.1-fast", label: "Grok 4.1 Fast" },
    { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro Preview" },
    { value: "gemini-3-flash-preview", label: "Gemini 3 Flash Preview" },
    {
      value: "gemini-3.1-flash-lite-preview",
      label: "Gemini 3.1 Flash Lite Preview",
    },
    { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  ];

  const VERTEX_EXTRACTOR_MODEL_OPTIONS = [
    { value: "gemini-3-pro-preview", label: "Gemini 3 Pro Preview" },
    { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro Preview" },
    { value: "gemini-3-flash-preview", label: "Gemini 3 Flash Preview" },
    {
      value: "gemini-3.1-flash-lite-preview",
      label: "Gemini 3.1 Flash Lite Preview",
    },
    { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    {
      value: "gemini-3-pro-image-preview",
      label: "Gemini 3 Pro Image Preview",
    },
    {
      value: "claude-haiku-4-5@20251001",
      label: "Claude 4.5 Haiku (2025/10/01)",
    },
    {
      value: "claude-sonnet-4@20250514",
      label: "Claude 4 Sonnet (2025/05/14)",
    },
    {
      value: "claude-sonnet-4-5@20250929",
      label: "Claude 4.5 Sonnet (2025/09/29)",
    },
    {
      value: "claude-sonnet-4-6@20260301",
      label: "Claude 4.6 Sonnet (2026/03/01)",
    },
    {
      value: "claude-opus-4-1@20250805",
      label: "Claude 4.1 Opus (2025/08/05)",
    },
    {
      value: "claude-opus-4-5@20251101",
      label: "Claude 4.5 Opus (2025/11/01)",
    },
    {
      value: "claude-opus-4-6@20260301",
      label: "Claude 4.6 Opus (2026/03/01)",
    },
  ];

  const uiIds = [];
  let replacerFn = null;
  let replacerRegistered = false;
  let _lastEmbedErrorMsg = ""; // tracks last embedding failure for descriptive errors
  const sessionStep0HandledHashByScope = new Map();
  let embeddingCacheStore = null;
  let configCache = {};

  let _currentIsCardReorgEnabled = false;
  let _currentIsNewPreset = false;

  function isKbFeatureEnabled() {
    return _currentIsCardReorgEnabled;
  }
  function isNewPresetEnabled() {
    return _currentIsNewPreset;
  }

  let cachedGlobalNoteData = {
    charId: null,
    reloadKeys: 0,
    globalNote: "",
    replaceGlobalNote: "",
    mainPrompt: "",
  };

  async function getGlobalNoteDataCached(char) {
    const charId = char?.chaId || "-1";
    const currentReloadKeys = char?.reloadKeys || 0;

    const isCacheValid =
      cachedGlobalNoteData.charId !== null &&
      cachedGlobalNoteData.charId === charId &&
      charId !== "-1" &&
      cachedGlobalNoteData.reloadKeys === currentReloadKeys;

    if (isCacheValid) {
      return cachedGlobalNoteData;
    }

    try {
      const db = await Risuai.getDatabase();
      let dbChar = null;
      if (charId !== "-1" && Array.isArray(db?.characters)) {
        dbChar = db.characters.find((c) => String(c.chaId) === String(charId));
      }
      cachedGlobalNoteData = {
        charId: charId,
        reloadKeys: currentReloadKeys,
        globalNote:
          db && typeof db.globalNote === "string"
            ? safeTrim(db.globalNote)
            : "",
        replaceGlobalNote:
          dbChar && typeof dbChar.replaceGlobalNote === "string"
            ? safeTrim(dbChar.replaceGlobalNote)
            : "",
        mainPrompt:
          db && typeof db.mainPrompt === "string"
            ? safeTrim(db.mainPrompt)
            : "",
      };
    } catch (e) {
      console.warn(`${LOG} Failed to fetch Global Note from DB`, e);
    }
    return cachedGlobalNoteData;
  }

  class SimpleMutex {
    constructor() {
      this.locked = false;
      this.queue = [];
    }
    async acquire() {
      if (!this.locked) {
        this.locked = true;
        return;
      }
      return new Promise((resolve) => this.queue.push(resolve));
    }
    release() {
      if (this.queue.length > 0) {
        const resolve = this.queue.shift();
        resolve();
      } else {
        this.locked = false;
      }
    }
    async run(fn) {
      await this.acquire();
      try {
        return await fn();
      } finally {
        this.release();
      }
    }
  }

  const mutexA = new SimpleMutex();
  const mutexB = new SimpleMutex();
  const mutexEmbed = new SimpleMutex();
  const mutexLoreWrite = new SimpleMutex();

  const embeddingVectorCache = new Map();

  function safeTrim(v) {
    return typeof v === "string" ? v.trim() : "";
  }

  function deepCloneValue(v) {
    if (v === null || v === undefined) return v;
    if (typeof v !== "object") return v;
    if (typeof structuredClone === "function") return structuredClone(v);
    return JSON.parse(JSON.stringify(v));
  }

  function makeUid() {
    try {
      if (
        typeof globalThis !== "undefined" &&
        globalThis.crypto &&
        typeof globalThis.crypto.randomUUID === "function"
      ) {
        return globalThis.crypto.randomUUID();
      }
    } catch {}
    return `pse_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function countUserMessages(messages) {
    return Array.isArray(messages)
      ? messages.filter((m) => m?.role === "user").length
      : 0;
  }

  function getTurnOffsetFromLocalLore(localLore) {
    if (!Array.isArray(localLore)) return 0;
    const offsetEntry = localLore.find((l) => l?.comment === "pse_turn_offset");
    if (!offsetEntry || typeof offsetEntry.content !== "string") return 0;
    return parseInt(offsetEntry.content.replace(/[^\d-]/g, ""), 10) || 0;
  }

  function upsertTurnOffsetEntry(localLore, turnOffset) {
    const nextLore = Array.isArray(localLore)
      ? localLore.map((entry) => deepCloneValue(entry))
      : [];
    const normalizedOffset = Math.max(0, Math.floor(Number(turnOffset) || 0));
    const nextEntry = {
      key: "",
      comment: "pse_turn_offset",
      content: `## pse_turn_offset[${normalizedOffset}]`,
      mode: "normal",
      insertorder: 999,
      alwaysActive: true,
      secondkey: "",
      selective: false,
      useRegex: false,
    };
    const idx = nextLore.findIndex((entry) => entry?.comment === "pse_turn_offset");
    if (idx >= 0) nextLore[idx] = { ...(nextLore[idx] || {}), ...nextEntry };
    else nextLore.push(nextEntry);
    return nextLore;
  }

  function sliceRecentDialogueTurns(messages, keepTurns = 5) {
    const src = Array.isArray(messages) ? messages : [];
    const maxTurns = Math.max(1, Math.floor(Number(keepTurns) || 5));
    let seenUsers = 0;
    let startIndex = 0;
    for (let i = src.length - 1; i >= 0; i--) {
      if (src[i]?.role === "user") {
        seenUsers += 1;
        if (seenUsers >= maxTurns) {
          startIndex = i;
          break;
        }
      }
    }
    if (seenUsers < maxTurns) startIndex = 0;
    return src.slice(startIndex).map((msg) => deepCloneValue(msg));
  }
  function buildContinuedChat(sourceChat, keepTurns = 5) {
    const source = sourceChat && typeof sourceChat === "object" ? sourceChat : {};
    const sourceMessages = Array.isArray(source.message) ? source.message : [];
    const carriedTurns =
      countUserMessages(sourceMessages) +
      getTurnOffsetFromLocalLore(source.localLore);
    const keptMessages = sliceRecentDialogueTurns(sourceMessages, keepTurns);
    const keptUserTurns = countUserMessages(keptMessages);
    const nextTurnOffset = Math.max(0, carriedTurns - keptUserTurns);
    const nextName = `${safeTrim(source.name || "New Chat")} (continue)`;

    const continuedChat = {
      message: keptMessages,
      note: String(source.note || ""),
      id: makeUid(),
      name: nextName,
      modules: Array.isArray(source.modules)
        ? deepCloneValue(source.modules)
        : [],
      bindedPersona: source.bindedPersona,
      fmIndex: -1,
      folderId: source.folderId,
      isStreaming: false,
      localLore: upsertTurnOffsetEntry(source.localLore, nextTurnOffset),
      lastDate: Date.now(),
      scriptstate: source.scriptstate ? deepCloneValue(source.scriptstate) : {},
      plugins: source.plugins ? deepCloneValue(source.plugins) : {},
      promptOverrides: source.promptOverrides ? deepCloneValue(source.promptOverrides) : {},
      regexOverrides: source.regexOverrides ? deepCloneValue(source.regexOverrides) : {},
      groupMembers: source.groupMembers ? deepCloneValue(source.groupMembers) : [],
    };
    return {
      chat: continuedChat,
      meta: {
        sourceUserTurns: countUserMessages(sourceMessages),
        carriedTurns,
        keptUserTurns,
        nextTurnOffset,
      },
    };
  }

  const TURN_BLOCK_SPLIT_REGEX = /(?=###\s*Turn\s*\d+)/i;
  const TURN_BLOCK_HEADER_REGEX = /^###\s*Turn\s*(\d+)/i;
  const TURN_MARKER_ANY_REGEX = /###\s*Turn\s*\d+/i;

  function hasTurnMarkers(text) {
    return TURN_MARKER_ANY_REGEX.test(String(text || ""));
  }

  function splitTurnBlocks(text) {
    return String(text || "")
      .split(TURN_BLOCK_SPLIT_REGEX)
      .map((b) => b.trim())
      .filter(Boolean);
  }

  function parseTurnNumberFromBlock(block) {
    const m = String(block || "")
      .trim()
      .match(TURN_BLOCK_HEADER_REGEX);
    if (!m) return null;
    const raw = m[1];
    const n = Number(raw);
    return Number.isFinite(n) ? Math.floor(n) : null;
  }

  function hasTurnBlockForRound(content, roundIndex) {
    const n = Math.floor(Number(roundIndex));
    if (!Number.isFinite(n) || n < 0) return false;
    const src = String(content || "");
    return new RegExp(`###\\s*Turn\\s*${n}(?!\\d)`, "i").test(src);
  }

  function escapeHtml(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function toInt(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.floor(n) : fallback;
  }
  function withTimeout(promise, timeoutMs, message) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(message || `Timeout after ${timeoutMs}ms`)),
          timeoutMs,
        ),
      ),
    ]);
  }
  function isOpenRouterUrl(url) {
    return /(^https?:\/\/)?([^/]+\.)?openrouter\.ai(\/|$)/i.test(
      String(url || ""),
    );
  }
  function isCopilotUrl(url) {
    return /(^https?:\/\/)?([^/]+\.)?githubcopilot\.com(\/|$)/i.test(
      String(url || ""),
    );
  }

  async function fetchWithFallback(
    url,
    options,
    timeoutMs,
    timeoutMessagePrefix,
    preferRisuFirst = false,
  ) {
    const deadline = Date.now() + Math.max(1, Number(timeoutMs) || 1);
    const remainingMs = () => Math.max(1, deadline - Date.now());
    const isSandboxedIframe =
      typeof window !== "undefined" && window.origin === "null";
    const orders = isSandboxedIframe
      ? ["risuFetch"]
      : preferRisuFirst
        ? ["risuFetch", "nativeFetch"]
        : ["nativeFetch", "risuFetch"];
    let firstError = null;

    for (const via of orders) {
      if (remainingMs() <= 1) break;
      if (via === "nativeFetch") {
        try {
          const res = await withTimeout(
            Risuai.nativeFetch(url, options),
            remainingMs(),
            `${timeoutMessagePrefix || "Request"} timeout after ${timeoutMs}ms`,
          );
          return {
            res,
            via,
            fallbackError: firstError
              ? String(firstError?.message || firstError || "")
              : "",
          };
        } catch (err) {
          if (!firstError) firstError = err;
        }
      } else {
        try {
          const risuOptions = { ...options };
          if (typeof risuOptions.body === "string") {
            try {
              risuOptions.body = JSON.parse(risuOptions.body);
            } catch {}
          }
          const res = await withTimeout(
            Risuai.risuFetch(url, risuOptions),
            remainingMs(),
            `${timeoutMessagePrefix || "Request"} timeout after ${timeoutMs}ms`,
          );
          return {
            res,
            via,
            fallbackError: firstError
              ? String(firstError?.message || firstError || "")
              : "",
          };
        } catch (err) {
          if (!firstError) firstError = err;
        }
      }
    }
    throw (
      firstError || new Error(`${timeoutMessagePrefix || "Request"} failed`)
    );
  }

  function isResponseLike(res) {
    return (
      !!res &&
      typeof res === "object" &&
      typeof res.ok === "boolean" &&
      typeof res.status === "number"
    );
  }

  async function readResponseErrorText(res) {
    if (!res || typeof res !== "object") return "";
    if (typeof res.text === "function") {
      try {
        const txt = String(await res.text());
        if (txt.startsWith("[object ")) return "";
        return txt;
      } catch {}
    }
    if (typeof res.data === "string") {
      if (res.data.startsWith("[object ")) return "";
      return res.data;
    }
    if (res.data && typeof res.data === "object") {
      try {
        return JSON.stringify(res.data);
      } catch {}
    }
    if (res.error) return String(res.error);
    return "";
  }

  async function readResponseJson(res) {
    if (!res || typeof res !== "object") return null;
    if (typeof res.json === "function") {
      try {
        return await res.json();
      } catch {}
    }
    if (typeof res.text === "function") {
      try {
        const txt = await res.text();
        return JSON.parse(txt);
      } catch {}
    }
    if (Object.prototype.hasOwnProperty.call(res, "data")) {
      if (typeof res.data === "string") {
        if (res.data.startsWith("[object ")) return null;
        try {
          return JSON.parse(res.data);
        } catch {
          return res.data;
        }
      }
      if (res.data && typeof res.data === "object") return res.data;
      return res.data;
    }
    return null;
  }

  function normalizeUrl(baseUrl) {
    const clean = safeTrim(baseUrl).replace(/\/+$/, "");
    if (!clean) return "";
    if (/\/v1\/messages$/i.test(clean) && isCopilotUrl(clean)) {
      return clean.replace(/\/v1\/messages$/i, "/chat/completions");
    }
    if (clean.endsWith("/chat/completions")) return clean;
    return `${clean}/chat/completions`;
  }

  function normalizeUrlByFormat(baseUrl, format) {
    const clean = safeTrim(baseUrl).replace(/\/+$/, "");
    const f = safeTrim(format || "openai").toLowerCase();
    if (!clean) return "";
    if (f === "google" || f === "vertex") return clean;
    if (f === "claude") {
      if (clean.endsWith("/messages")) return clean;
      return `${clean}/messages`;
    }
    return normalizeUrl(clean);
  }

  function simpleHash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  function getUtf8BytesLength(text) {
    try {
      return new TextEncoder().encode(String(text || "")).length;
    } catch {
      return String(text || "").length;
    }
  }

  function normalizeChatPayloadText(raw) {
    let content = typeof raw === "string" ? raw.trim() : "";
    if (!content) return "";
    const gtMatch = content.match(/<GigaTrans>([\s\S]*?)<\/GigaTrans>/);
    if (gtMatch) content = gtMatch[1].trim();
    content = content
      .replace(/<GT-CTRL[^/]*\/>/g, "")
      .replace(/\[LBDATA START\][\s\S]*?\[LBDATA END\]/g, "")
      .trim();
    return content;
  }


  function formatBytes(bytes) {
    const n = Number(bytes);
    if (!Number.isFinite(n) || n <= 0) return "0 B";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  }

  const VCACHE_INDEX_KEY = "pse_vec_index_v1";
  const VCACHE_CARD_PREFIX = "pse_vec_card_v1:";
  const PCACHE_CARD_PREFIX = "pse_persona_cache_v1:";
  const STATIC_KNOWLEDGE_CHUNKS_KEY = "static_knowledge_chunks";
  const STATIC_DATA_HASH_KEY = "static_data_hash";
  const STEP0_COMPLETE_KEY = "step0_complete";
  const STEP0_PENDING_KEY = "step0_pending";
  const LAST_REQ_HASH_KEY = "last_req_hash";
  const LAST_EXTRACTED_DATA_KEY = "last_extracted_data";
  const FIRST_MESSAGE_HANDLED_KEY = "first_message_handled";
  const REGEN_SKIP_KEY = "regen_skip";
  const LAST_SYNC_ERROR_KEY = "last_lore_sync_error";
  const LAST_EXTRACTOR_MODE_KEY = "last_extractor_mode";

  function getScopeCharId(char) {
    const rawId = String(char?.chaId || char?.id || char?._id || "").replace(
      /[^0-9a-zA-Z_-]/g,
      "",
    );
    if (rawId) return rawId;
    const name = safeTrim(char?.name || "");
    if (name) {
      const fallbackSeed = JSON.stringify({
        name,
        desc: safeTrim(char?.desc || char?.description || "").slice(0, 512),
        creatorNotes: safeTrim(char?.creatorNotes || "").slice(0, 256),
      });
      return `name_${simpleHash(fallbackSeed)}`;
    }
    return "-1";
  }

  function makeScopedStorageKey(baseKey, scopeId) {
    return `${baseKey}::${scopeId}`;
  }

  function getScopeId(char) {
    return getScopeCharId(char);
  }

  function getStaticCacheKeysForScope(char) {
    const scopeId = getScopeId(char);
    return {
      scopeId,
      staticKnowledgeChunks: makeScopedStorageKey(
        STATIC_KNOWLEDGE_CHUNKS_KEY,
        scopeId,
      ),
      staticDataHash: makeScopedStorageKey(STATIC_DATA_HASH_KEY, scopeId),
      step0Complete: makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId),
      step0Pending: makeScopedStorageKey(STEP0_PENDING_KEY, scopeId),
    };
  }

  function getRequestCacheKeysForScope(char, chat = null, chatIndex = -1) {
    const scopeId = getScopeId(char);
    const suffix = chat ? `::${getChatScopedKey(chat, chatIndex)}` : "";
    return {
      scopeId,
      lastReqHash: `${makeScopedStorageKey(LAST_REQ_HASH_KEY, scopeId)}${suffix}`,
      lastExtractedData: `${makeScopedStorageKey(LAST_EXTRACTED_DATA_KEY, scopeId)}${suffix}`,
      regenSkip: `${makeScopedStorageKey(REGEN_SKIP_KEY, scopeId)}${suffix}`,
      lastSyncError: `${makeScopedStorageKey(LAST_SYNC_ERROR_KEY, scopeId)}${suffix}`,
      lastExtractorMode: `${makeScopedStorageKey(LAST_EXTRACTOR_MODE_KEY, scopeId)}${suffix}`,
    };
  }

  function getChatScopedKey(chat, chatIndex) {
    const rawId = String(chat?.id || chat?._id || chat?.chatId || "").replace(
      /[^0-9a-zA-Z_-]/g,
      "",
    );
    if (rawId) return `id_${rawId}`;
    const stableSeed = {
      name: safeTrim(chat?.name || ""),
      note: safeTrim(chat?.note || ""),
      folderId: String(chat?.folderId || ""),
      bindedPersona: String(chat?.bindedPersona || ""),
      firstMessages: Array.isArray(chat?.message)
        ? chat.message
            .filter((m) => m?.role === "user" || m?.role === "char")
            .slice(0, 3)
            .map((m) => ({
              role: safeTrim(m?.role || ""),
              content: safeTrim(m?.data || m?.content || "").slice(0, 160),
            }))
        : [],
    };
    const stableFingerprint = simpleHash(JSON.stringify(stableSeed));
    if (stableFingerprint) return `anon_${stableFingerprint}`;
    const safeChat = Number.isFinite(Number(chatIndex))
      ? Math.floor(Number(chatIndex))
      : -1;
    return `idx_${safeChat}`;
  }

  function getChatIdentityFingerprint(chat) {
    const msgCount = Array.isArray(chat?.message) ? chat.message.length : 0;
    const localLoreCount = Array.isArray(chat?.localLore)
      ? chat.localLore.length
      : 0;
    const lastMsg = msgCount > 0 ? chat.message[msgCount - 1] : null;
    const lastMsgRole = safeTrim(lastMsg?.role || "");
    const lastMsgContent = safeTrim(lastMsg?.data || lastMsg?.content || "").slice(
      -120,
    );
    return simpleHash(
      JSON.stringify({
        name: safeTrim(chat?.name || ""),
        note: safeTrim(chat?.note || ""),
        lastDate: Number(chat?.lastDate || 0),
        folderId: String(chat?.folderId || ""),
        bindedPersona: String(chat?.bindedPersona || ""),
        msgCount,
        localLoreCount,
        lastMsgRole,
        lastMsgContent,
      }),
    );
  }

  function findChatIndexInCharacter(char, targetChat, fallbackIndex = -1) {
    const chats = Array.isArray(char?.chats) ? char.chats : [];
    if (!chats.length) return -1;

    const targetId = String(
      targetChat?.id || targetChat?._id || targetChat?.chatId || "",
    ).replace(/[^0-9a-zA-Z_-]/g, "");
    if (targetId) {
      const idMatchIndex = chats.findIndex((chat) => {
        const chatId = String(
          chat?.id || chat?._id || chat?.chatId || "",
        ).replace(/[^0-9a-zA-Z_-]/g, "");
        return !!chatId && chatId === targetId;
      });
      if (idMatchIndex >= 0) return idMatchIndex;
    }

    const targetFingerprint = getChatIdentityFingerprint(targetChat);
    const fingerprintMatches = chats
      .map((chat, idx) => ({
        idx,
        fingerprint: getChatIdentityFingerprint(chat),
      }))
      .filter((entry) => entry.fingerprint === targetFingerprint);
    if (fingerprintMatches.length === 1) return fingerprintMatches[0].idx;

    const targetChatKey = getChatScopedKey(targetChat, fallbackIndex);
    if (targetChatKey && !String(targetChatKey).startsWith("idx_")) {
      const keyMatches = chats
        .map((chat, idx) => ({
          idx,
          key: getChatScopedKey(chat, idx),
        }))
        .filter((entry) => entry.key === targetChatKey);
      if (keyMatches.length === 1) return keyMatches[0].idx;
    }

    const safeFallback = Number.isFinite(Number(fallbackIndex))
      ? Math.floor(Number(fallbackIndex))
      : -1;
    const canTrustFallback = String(targetChatKey).startsWith("id_");
    if (canTrustFallback && safeFallback >= 0 && safeFallback < chats.length) {
      const fallbackChat = chats[safeFallback];
      const fallbackKey = getChatScopedKey(fallbackChat, safeFallback);
      if (fallbackKey === targetChatKey) return safeFallback;
    }
    return -1;
  }

  async function getCurrentChatContextSafe() {
    const base = await getCurrentCharAndChatSafe();
    if (!base?.char || base.charIdx < 0 || !base.chat) return base;
    try {
      const latestChar =
        typeof Risuai.getCharacterFromIndex === "function"
          ? await Risuai.getCharacterFromIndex(base.charIdx)
          : base.char;
      const resolvedChatIndex = findChatIndexInCharacter(
        latestChar,
        base.chat,
        base.chatIndex,
      );
      if (resolvedChatIndex < 0) return base;
      const chats = Array.isArray(latestChar?.chats) ? latestChar.chats : [];
      const resolvedChat = chats[resolvedChatIndex] || base.chat;
      return {
        char: latestChar || base.char,
        charIdx: base.charIdx,
        chatIndex: resolvedChatIndex,
        chat: resolvedChat,
      };
    } catch {
      return base;
    }
  }

  function getFirstMessageHandledKey(scopeId, chat, chatIndex) {
    const safeScope =
      String(scopeId || "-1").replace(/[^0-9a-zA-Z_-]/g, "") || "-1";
    const chatKey = getChatScopedKey(chat, chatIndex);
    return `${FIRST_MESSAGE_HANDLED_KEY}::${safeScope}::${chatKey}`;
  }

  async function getScopedKeysForCurrentChat() {
    const { char, chat, chatIndex } = await getCurrentChatContextSafe();
    const requestKeys = getRequestCacheKeysForScope(char, chat, chatIndex);
    return {
      staticKeys: getStaticCacheKeysForScope(char),
      requestKeys,
      firstMessageHandledKey: getFirstMessageHandledKey(
        requestKeys.scopeId,
        chat,
        chatIndex,
      ),
    };
  }

  async function loadEmbeddingCacheStore() {
    if (
      embeddingCacheStore &&
      embeddingCacheStore.version === EMBEDDING_VECTOR_CACHE_VERSION
    ) {
      return embeddingCacheStore;
    }
    try {
      const idxRaw = await Risuai.pluginStorage.getItem(VCACHE_INDEX_KEY);
      if (idxRaw) {
        const idx = JSON.parse(idxRaw);
        if (idx && Array.isArray(idx.cardKeys)) {
          const cards = {};
          for (const cardKey of idx.cardKeys) {
            try {
              const cardRaw = await Risuai.pluginStorage.getItem(
                VCACHE_CARD_PREFIX + cardKey,
              );
              if (cardRaw) {
                const card = JSON.parse(cardRaw);
                if (card && card.entries) cards[cardKey] = card;
              }
            } catch {}
          }
          embeddingCacheStore = {
            version: EMBEDDING_VECTOR_CACHE_VERSION,
            updatedAt: idx.updatedAt || Date.now(),
            cards,
          };
          return embeddingCacheStore;
        }
      }
    } catch (e) {
      console.warn(
        `${LOG} pluginStorage vector cache load failed, reinitializing:`,
        e,
      );
    }
    embeddingCacheStore = {
      version: EMBEDDING_VECTOR_CACHE_VERSION,
      updatedAt: Date.now(),
      cards: {},
    };
    return embeddingCacheStore;
  }

  async function saveEmbeddingCacheStore(storeToSave = null, options = {}) {
    const store = storeToSave || (await loadEmbeddingCacheStore());
    const removedCardKeys = new Set(
      Array.isArray(options?.removedCardKeys) ? options.removedCardKeys : [],
    );
    const replaceCardKeys = new Set(
      Array.isArray(options?.replaceCardKeys) ? options.replaceCardKeys : [],
    );
    store.updatedAt = Date.now();
    try {
      const mergedCards = {};
      try {
        const oldIdxRaw = await Risuai.pluginStorage.getItem(VCACHE_INDEX_KEY);
        if (oldIdxRaw) {
          const oldIdx = JSON.parse(oldIdxRaw);
          if (Array.isArray(oldIdx.cardKeys)) {
            for (const oldKey of oldIdx.cardKeys) {
              if (removedCardKeys.has(oldKey)) continue;
              try {
                const oldCardRaw = await Risuai.pluginStorage.getItem(
                  VCACHE_CARD_PREFIX + oldKey,
                );
                if (oldCardRaw) {
                  const oldCard = JSON.parse(oldCardRaw);
                  if (oldCard && oldCard.entries) mergedCards[oldKey] = oldCard;
                }
              } catch {}
            }
          }
        }
      } catch {}

      for (const [cardKey, card] of Object.entries(store.cards || {})) {
        if (!card) continue;
        if (removedCardKeys.has(cardKey)) continue;
        const existingCard = mergedCards[cardKey];
        if (
          existingCard &&
          !replaceCardKeys.has(cardKey) &&
          existingCard.entries &&
          card.entries
        ) {
          mergedCards[cardKey] = {
            ...existingCard,
            ...card,
            entries: {
              ...(existingCard.entries || {}),
              ...(card.entries || {}),
            },
            updatedAt: Math.max(
              Number(existingCard.updatedAt || 0),
              Number(card.updatedAt || 0),
              Date.now(),
            ),
          };
        } else {
          mergedCards[cardKey] = card;
        }
      }

      for (const removedKey of removedCardKeys) {
        delete mergedCards[removedKey];
        try {
          await Risuai.pluginStorage.removeItem(VCACHE_CARD_PREFIX + removedKey);
        } catch {}
      }

      const cardKeys = Object.keys(mergedCards);
      for (const cardKey of cardKeys) {
        const card = mergedCards[cardKey];
        await Risuai.pluginStorage.setItem(
          VCACHE_CARD_PREFIX + cardKey,
          JSON.stringify(card),
        );
      }
      const idx = {
        version: EMBEDDING_VECTOR_CACHE_VERSION,
        updatedAt: Date.now(),
        cardKeys,
      };
      await Risuai.pluginStorage.setItem(VCACHE_INDEX_KEY, JSON.stringify(idx));
      embeddingCacheStore = {
        version: EMBEDDING_VECTOR_CACHE_VERSION,
        updatedAt: idx.updatedAt,
        cards: mergedCards,
      };
    } catch (err) {
      console.warn(`${LOG} Vector cache pluginStorage save failed:`, err);
      try {
        await Risuai.log(
          `${LOG} Warning: vector cache save failed (${err.message})`,
        );
      } catch {}
    }
  }

  async function loadPersonaCache(cardKey) {
    const key = PCACHE_CARD_PREFIX + String(cardKey || "");
    try {
      const raw = await Risuai.pluginStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          parsed.entries =
            parsed.entries && typeof parsed.entries === "object"
              ? parsed.entries
              : {};
          return parsed;
        }
      }
    } catch {}
    return { updatedAt: 0, entries: {} };
  }

  async function isPersonaCacheEmptyForChar(char) {
    try {
      const cardKey = await getActiveCardKey(char);
      const cache = await loadPersonaCache(cardKey);
      return !cache?.entries || Object.keys(cache.entries).length === 0;
    } catch {
      return true;
    }
  }

  async function hasIncompletePairForChar(char) {
    try {
      const cardKey = await getActiveCardKey(char);
      const cache = await loadPersonaCache(cardKey);
      const entries = cache?.entries;
      if (!entries || Object.keys(entries).length === 0) return false;
      const invNames = new Set();
      const coreNames = new Set();
      for (const k of Object.keys(entries)) {
        const invMatch = String(k).match(/^rp_persona_inventory_\((.+)\)$/);
        const coreMatch = String(k).match(/^rp_character_core_\((.+)\)$/);
        if (invMatch) invNames.add(invMatch[1]);
        if (coreMatch) coreNames.add(coreMatch[1]);
      }
      for (const n of invNames) {
        if (!coreNames.has(n)) return true;
      }
      for (const n of coreNames) {
        if (!invNames.has(n)) return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async function hasCompletedClassification(staticKeys) {
    try {
      const savedRaw = await Risuai.pluginStorage.getItem(
        staticKeys.staticKnowledgeChunks,
      );
      if (!savedRaw) return false;
      const savedChunks = JSON.parse(savedRaw);
      if (!Array.isArray(savedChunks) || savedChunks.length === 0) return false;
      return !savedChunks.some(
        (c) => String(c?.category || "").toLowerCase() === "unknown",
      );
    } catch {
      return false;
    }
  }

  async function savePersonaCache(cardKey, cache) {
    const key = PCACHE_CARD_PREFIX + String(cardKey || "");
    const payload =
      cache && typeof cache === "object"
        ? cache
        : { updatedAt: Date.now(), entries: {} };
    payload.updatedAt = Date.now();
    try {
      await Risuai.pluginStorage.setItem(key, JSON.stringify(payload));
    } catch {}
  }

  async function clearAllEmbeddingCache() {
    embeddingCacheStore = null;
    embeddingVectorCache.clear();

    let currentScopeId = null;
    try {
      const { char } = await getCurrentChatContextSafe();
      currentScopeId = getScopeId(char);
    } catch {}
    if (currentScopeId) sessionStep0HandledHashByScope.delete(currentScopeId);
    else sessionStep0HandledHashByScope.clear();

    try {
      const idxRaw = await Risuai.pluginStorage.getItem(VCACHE_INDEX_KEY);
      if (idxRaw) {
        const idx = JSON.parse(idxRaw);
        if (Array.isArray(idx.cardKeys)) {
          for (const cardKey of idx.cardKeys) {
            try {
              await Risuai.pluginStorage.removeItem(
                VCACHE_CARD_PREFIX + cardKey,
              );
            } catch {}
          }
        }
      }
    } catch {}
    try {
      await Risuai.pluginStorage.removeItem(VCACHE_INDEX_KEY);
    } catch {}

    try {
      const { staticKeys, requestKeys, firstMessageHandledKey } =
        await getScopedKeysForCurrentChat();
      try {
        await Risuai.pluginStorage.removeItem(staticKeys.staticKnowledgeChunks);
      } catch {}
      try {
        await Risuai.pluginStorage.removeItem(staticKeys.staticDataHash);
      } catch {}
      try {
        await Risuai.pluginStorage.removeItem(staticKeys.step0Complete);
      } catch {}
      try {
        await Risuai.pluginStorage.removeItem(staticKeys.step0Pending);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(requestKeys.lastReqHash);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(requestKeys.lastExtractedData);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(requestKeys.regenSkip);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(requestKeys.lastSyncError);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(requestKeys.lastExtractorMode);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(firstMessageHandledKey);
      } catch {}
    } catch {}

    try {
      await Risuai.pluginStorage.removeItem(STATIC_KNOWLEDGE_CHUNKS_KEY);
    } catch {}
    try {
      await Risuai.pluginStorage.removeItem(STATIC_DATA_HASH_KEY);
    } catch {}
    try {
      await Risuai.pluginStorage.removeItem(STEP0_COMPLETE_KEY);
    } catch {}
    try {
      await Risuai.pluginStorage.removeItem(STEP0_PENDING_KEY);
    } catch {}
    try {
      await Risuai.safeLocalStorage.removeItem(LAST_REQ_HASH_KEY);
    } catch {}
    try {
      await Risuai.safeLocalStorage.removeItem(LAST_EXTRACTED_DATA_KEY);
    } catch {}

    try {
      const db = await Risuai.getDatabase();
      const characters = Array.isArray(db?.characters) ? db.characters : [];
      for (const c of characters) {
        const charName = safeTrim(c?.name || "");
        const charId = c?.chaId || c?.id || c?._id || "-1";
        const cardKey = makeCardCacheKey(charId, charName || "Character", c);
        try {
          await Risuai.pluginStorage.removeItem(PCACHE_CARD_PREFIX + cardKey);
        } catch {}
      }
    } catch {}
  }

  function makeCardCacheKey(charId, charName, charMeta = null) {
    const idStr = String(charId || "-1").replace(/[^0-9a-zA-Z_-]/g, "");
    const nameStr = safeTrim(charName || "Character");
    if (idStr && idStr !== "-1") return `${idStr}:${simpleHash(nameStr)}`;
    const meta =
      charMeta && typeof charMeta === "object" && !Array.isArray(charMeta)
        ? charMeta
        : {};
    const seed = JSON.stringify({
      name: nameStr,
      desc: safeTrim(meta?.desc || meta?.description || "").slice(0, 512),
      creatorNotes: safeTrim(meta?.creatorNotes || "").slice(0, 256),
      firstMsgs: Array.isArray(meta?.firstMessage)
        ? meta.firstMessage.slice(0, 3).map((m) => safeTrim(m).slice(0, 120))
        : [],
    });
    return `anon_${simpleHash(seed)}:${simpleHash(nameStr)}`;
  }

  async function getActiveCardKey(char) {
    const charName = safeTrim(char?.name || "Character");
    const charId = char?.chaId || char?.id || char?._id || "-1";
    return makeCardCacheKey(charId, charName, char);
  }

  async function checkCacheExists(char) {
    try {
      const cardKey = await getActiveCardKey(char);
      const store = await loadEmbeddingCacheStore();
      if (!store || !store.cards) return false;
      const card = store.cards[cardKey];
      if (!card || !card.entries) return false;

      if (isNewPresetEnabled()) {
        const personaCache = await loadPersonaCache(cardKey);
        const personaEntries = Object.values(personaCache?.entries || {});
        let allPersonaVectorsExist = true;
        if (personaEntries.length > 0) {
          for (const entry of personaEntries) {
            const cacheKey = `persona|${entry?.textHash || ""}`;
            const hit = card.entries?.[cacheKey];
            if (!hit || !Array.isArray(hit.vector) || !hit.vector.length) {
              allPersonaVectorsExist = false;
              break;
            }
          }
        } else {
          allPersonaVectorsExist = false;
        }

        if (allPersonaVectorsExist) {
          return true;
        }
      }

      return Object.keys(card.entries).some((k) => {
        if (!String(k).startsWith("chunk|")) return false;
        const v = card.entries[k]?.vector;
        return Array.isArray(v) && v.length > 0;
      });
    } catch {
      return false;
    }
  }

  async function diagnoseCacheState(
    char,
    staticKeys,
    { needsClassify, needsChunkVec, needsPersona, needsPersonaVec },
  ) {
    const result = {
      classify: "not_required",
      chunkVec: "not_required",
      persona: "not_required",
      personaVec: "not_required",
      needsStep0: false,
      step0Reason: "",
    };

    if (needsClassify) {
      let chunks = [];
      try {
        const raw = await Risuai.pluginStorage.getItem(
          staticKeys.staticKnowledgeChunks,
        );
        if (raw) chunks = JSON.parse(raw);
        if (!Array.isArray(chunks)) chunks = [];
      } catch {
        chunks = [];
      }

      if (chunks.length === 0) {
        result.classify = "missing";
      } else if (
        chunks.some(
          (c) => String(c?.category || "").toLowerCase() === "unknown",
        )
      ) {
        result.classify = "incomplete";
      } else {
        result.classify = "ok";
      }
    }

    if (needsChunkVec) {
      try {
        const cardKey = await getActiveCardKey(char);
        const store = await loadEmbeddingCacheStore();
        const card = store.cards?.[cardKey];
        const hasChunkVec =
          card &&
          Object.keys(card.entries || {}).some((k) => {
            if (!String(k).startsWith("chunk|")) return false;
            const v = card.entries[k]?.vector;
            return Array.isArray(v) && v.length > 0;
          });
        result.chunkVec = hasChunkVec ? "ok" : "missing";
      } catch {
        result.chunkVec = "missing";
      }
    }

    if (needsPersona) {
      try {
        const cardKey = await getActiveCardKey(char);
        const cache = await loadPersonaCache(cardKey);
        const entries = cache?.entries;
        if (!entries || Object.keys(entries).length === 0) {
          result.persona = "missing";
        } else {
          const invNames = new Set();
          const coreNames = new Set();
          for (const k of Object.keys(entries)) {
            const invMatch = String(k).match(/^rp_persona_inventory_\((.+)\)$/);
            const coreMatch = String(k).match(/^rp_character_core_\((.+)\)$/);
            if (invMatch) invNames.add(invMatch[1]);
            if (coreMatch) coreNames.add(coreMatch[1]);
          }
          const hasIncomplete =
            [...invNames].some((n) => !coreNames.has(n)) ||
            [...coreNames].some((n) => !invNames.has(n));
          result.persona = hasIncomplete ? "incomplete_pair" : "ok";
        }
      } catch {
        result.persona = "missing";
      }
    }

    if (needsPersonaVec) {
      try {
        const cardKey = await getActiveCardKey(char);
        const store = await loadEmbeddingCacheStore();
        const card = store.cards?.[cardKey];
        const cache = await loadPersonaCache(cardKey);
        const personaEntries = Object.values(cache?.entries || {});
        if (personaEntries.length === 0) {
          result.personaVec = "missing";
        } else {
          const allVecExist = personaEntries.every((entry) => {
            const cacheKey = `persona|${entry?.textHash || ""}`;
            const hit = card?.entries?.[cacheKey];
            return hit && Array.isArray(hit.vector) && hit.vector.length > 0;
          });
          result.personaVec = allVecExist ? "ok" : "incomplete";
        }
      } catch {
        result.personaVec = "missing";
      }
    }

    if (result.classify === "missing") {
      result.needsStep0 = true;
      result.step0Reason = "new";
    } else if (result.classify === "incomplete") {
      result.needsStep0 = true;
      result.step0Reason = "incomplete";
    } else if (result.chunkVec === "missing") {
      result.needsStep0 = true;
      result.step0Reason = "classify_done";
    } else if (result.persona === "missing") {
      result.needsStep0 = true;
      result.step0Reason = "persona_missing";
    } else if (result.persona === "incomplete_pair") {
      result.needsStep0 = true;
      result.step0Reason = "persona_incomplete_pair";
    } else if (
      result.personaVec === "missing" ||
      result.personaVec === "incomplete"
    ) {
      result.needsStep0 = true;
      result.step0Reason = "classify_done";
    }

    return result;
  }

  function upsertEmbeddingCacheEntry(
    store,
    cardKey,
    cardName,
    entryKey,
    entry,
    modelName = "",
  ) {
    if (!store.cards) store.cards = {};
    if (!store.cards[cardKey]) {
      store.cards[cardKey] = {
        cardKey,
        cardName: safeTrim(cardName || "Character"),
        updatedAt: Date.now(),
        entries: {},
        modelName: safeTrim(modelName),
      };
    }
    const card = store.cards[cardKey];
    if (cardName && cardName !== "Character")
      card.cardName = safeTrim(cardName);
    if (modelName) card.modelName = safeTrim(modelName);
    card.updatedAt = Date.now();

    let optimizedEntry = { ...entry, updatedAt: Date.now() };
    if (Array.isArray(optimizedEntry.vector)) {
      optimizedEntry.vector = optimizedEntry.vector.map((v) => Number(v) || 0);
    }

    card.entries[entryKey] = optimizedEntry;
    const keys = Object.keys(card.entries || {});
    if (keys.length > EMBEDDING_VECTOR_CACHE_MAX_PER_CARD) {
      keys
        .sort(
          (a, b) =>
            Number(card.entries[a]?.updatedAt || 0) -
            Number(card.entries[b]?.updatedAt || 0),
        )
        .slice(0, keys.length - EMBEDDING_VECTOR_CACHE_MAX_PER_CARD)
        .forEach((k) => delete card.entries[k]);
    }
  }

  function summarizeEmbeddingCacheBlocks(store) {
    if (!store || !store.cards || typeof store.cards !== "object") return [];
    const cards = store.cards;
    return Object.keys(cards)
      .map((cardKey) => {
        const card = cards[cardKey] || {};
        const entries =
          card.entries && typeof card.entries === "object" ? card.entries : {};
        const entryCount = Object.keys(entries).length;
        const sizeBytes = getUtf8BytesLength(JSON.stringify(card));
        return {
          cardKey,
          cardName: String(card.cardName || "(unknown)"),
          entryCount,
          sizeBytes,
          updatedAt: Number(card.updatedAt || 0),
          modelName: String(card.modelName || ""),
        };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  function parsePossiblyWrappedJson(text) {
    if (!text) return null;
    let src = String(text).trim();

    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/gi;
    const matches = [...src.matchAll(codeBlockRegex)];
    if (matches.length > 0) {
      const parsedBlocks = [];
      for (const match of matches) {
        try {
          const b = JSON.parse(match[1].trim());
          if (b !== null && typeof b === "object") parsedBlocks.push(b);
        } catch {
          const repaired = repairJsonString(match[1].trim());
          if (repaired !== null && typeof repaired === "object")
            parsedBlocks.push(repaired);
        }
      }
      if (parsedBlocks.length > 0) {
        const hasPlainObject = parsedBlocks.some((b) => !Array.isArray(b));
        if (hasPlainObject) {
          const merged = {};
          for (const b of parsedBlocks) {
            if (Array.isArray(b)) {
              for (const item of b) {
                if (item && typeof item === "object" && !Array.isArray(item))
                  Object.assign(merged, item);
              }
            } else {
              Object.assign(merged, b);
            }
          }
          if (Object.keys(merged).length) return merged;
        } else {
          const merged = [];
          for (const b of parsedBlocks) merged.push(...b);
          if (merged.length) return merged;
        }
      }
    }

    let stripped = src
      .replace(/^\uFEFF/, "")
      .replace(/^<(?:json|o|r|output|result|response|answer)[^>]*>/i, "")
      .replace(/<\/(?:json|o|r|output|result|response|answer)>\s*$/i, "")
      .trim();
    if (stripped !== src) {
      try {
        const r = JSON.parse(stripped);
        if (r !== null && typeof r === "object") return r;
      } catch {}
    }

    const tryLastBrace = (s, startChar, endChar) => {
      const first = s.indexOf(startChar);
      const last = s.lastIndexOf(endChar);
      if (first >= 0 && last > first) {
        try {
          return JSON.parse(s.slice(first, last + 1));
        } catch {
          return null;
        }
      }
      return null;
    };

    const tryDepthFirst = (s, startChar, endChar) => {
      const startIdx = s.indexOf(startChar);
      if (startIdx < 0) return null;
      let depth = 0;
      let inStr = false;
      let escape = false;
      for (let i = startIdx; i < s.length; i++) {
        const c = s[i];
        if (escape) {
          escape = false;
          continue;
        }
        if (c === "\\" && inStr) {
          escape = true;
          continue;
        }
        if (c === '"') {
          inStr = !inStr;
          continue;
        }
        if (inStr) continue;
        if (c === startChar) depth++;
        else if (c === endChar) {
          depth--;
          if (depth === 0) {
            try {
              return JSON.parse(s.slice(startIdx, i + 1));
            } catch {
              return null;
            }
          }
        }
      }
      return null;
    };

    for (const candidate of [stripped, src]) {
      const firstBrace = candidate.indexOf("{");
      const firstBracket = candidate.indexOf("[");
      const useObj =
        firstBrace >= 0 && (firstBracket < 0 || firstBrace <= firstBracket);
      const useArr =
        firstBracket >= 0 && (firstBrace < 0 || firstBracket < firstBrace);

      if (useObj) {
        const r = tryLastBrace(candidate, "{", "}");
        if (r !== null) return r;
      }
      if (useArr) {
        const r = tryLastBrace(candidate, "[", "]");
        if (r !== null) return r;
      }
      if (useObj) {
        const r = tryDepthFirst(candidate, "{", "}");
        if (r !== null) return r;
      }
      if (useArr) {
        const r = tryDepthFirst(candidate, "[", "]");
        if (r !== null) return r;
      }
    }

    for (const candidate of [stripped, src]) {
      const firstBrace = candidate.indexOf("{");
      const firstBracket = candidate.indexOf("[");
      if (firstBrace >= 0 || firstBracket >= 0) {
        const start =
          firstBrace >= 0 && (firstBracket < 0 || firstBrace <= firstBracket)
            ? firstBrace
            : firstBracket;
        const end =
          start === firstBrace
            ? candidate.lastIndexOf("}")
            : candidate.lastIndexOf("]");
        if (end > start) {
          const r = repairJsonString(candidate.slice(start, end + 1));
          if (r !== null && typeof r === "object") return r;
        }
      }
    }

    return null;
  }

  function repairJsonString(src) {
    let s = String(src || "").replace(/,(\s*[}\]])/g, "$1");
    try {
      return JSON.parse(s);
    } catch {}
    s = s.replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_-]*)(\s*:)/g, '$1"$2"$3');
    try {
      return JSON.parse(s);
    } catch {}
    if (!s.includes("'")) return null;
    let out = "";
    let inDouble = false;
    let inSingle = false;
    let esc = false;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (esc) {
        out += c;
        esc = false;
        continue;
      }
      if (c === "\\" && (inDouble || inSingle)) {
        out += c;
        esc = true;
        continue;
      }
      if (c === '"' && !inSingle) {
        inDouble = !inDouble;
        out += c;
        continue;
      }
      if (c === "'" && !inDouble) {
        inSingle = !inSingle;
        out += '"';
        continue;
      }
      out += c;
    }
    try {
      return JSON.parse(out);
    } catch {
      return null;
    }
  }

  function isPlainObject(v) {
    return !!v && typeof v === "object" && !Array.isArray(v);
  }

  function normalizeMatchKey(key) {
    return String(key || "")
      .toLowerCase()
      .replace(/[“”„‟«»「」『』`"'‘’]/g, "")
      .replace(
        /[^a-z0-9\u00c0-\u024f\u0370-\u03ff\u0400-\u04ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g,
        "",
      );
  }

  function normalizeSectionKey(key) {
    return String(key || "")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "");
  }

  function pickBestObjectCandidate(rootObj, expectedKeys) {
    if (!isPlainObject(rootObj)) return null;
    const normExpected = expectedKeys
      .map((k) => normalizeMatchKey(k))
      .filter(Boolean);
    const candidates = [rootObj];
    const visited = new Set([rootObj]);
    const queue = [{ node: rootObj, depth: 0 }];

    while (queue.length) {
      const { node, depth } = queue.shift();
      if (depth >= 2) continue;
      for (const value of Object.values(node)) {
        if (isPlainObject(value) && !visited.has(value)) {
          visited.add(value);
          candidates.push(value);
          queue.push({ node: value, depth: depth + 1 });
        } else if (Array.isArray(value)) {
          for (const item of value) {
            if (isPlainObject(item) && !visited.has(item)) {
              visited.add(item);
              candidates.push(item);
              queue.push({ node: item, depth: depth + 1 });
            }
          }
        }
      }
    }

    const scoreCandidate = (obj) => {
      const keys = Object.keys(obj);
      const normKeys = keys.map((k) => normalizeMatchKey(k)).filter(Boolean);
      let exact = 0;
      let fuzzy = 0;
      for (let i = 0; i < expectedKeys.length; i++) {
        const raw = expectedKeys[i];
        const norm = normExpected[i];
        if (Object.prototype.hasOwnProperty.call(obj, raw)) {
          exact++;
          continue;
        }
        if (!norm) continue;
        if (normKeys.includes(norm)) {
          fuzzy++;
          continue;
        }
        if (normKeys.some((k) => k.includes(norm) || norm.includes(k)))
          fuzzy += 0.5;
      }
      return exact * 2 + fuzzy;
    };

    let best = rootObj;
    let bestScore = scoreCandidate(rootObj);
    for (const c of candidates) {
      const s = scoreCandidate(c);
      if (s > bestScore) {
        best = c;
        bestScore = s;
      }
    }
    return best;
  }

  function alignParsedObjectToEntries(raw, parsed, entries) {
    const expectedKeys = (entries || [])
      .map((e) => safeTrim(e?.lorebook_name))
      .filter(Boolean);
    if (expectedKeys.length === 0)
      return parsed && typeof parsed === "object" ? parsed : null;

    let candidate = parsed;
    if (!candidate || typeof candidate !== "object") {
      candidate = parsePossiblyWrappedJson(raw);
    }

    if (Array.isArray(candidate)) {
      const merged = {};
      for (const it of candidate) {
        if (isPlainObject(it)) Object.assign(merged, it);
      }
      if (Object.keys(merged).length) {
        candidate = merged;
      } else {
        candidate = normalizeNamedValueArrayToObject(candidate);
      }
    }

    if (!isPlainObject(candidate)) return null;

    const bestObj =
      pickBestObjectCandidate(candidate, expectedKeys) || candidate;
    const source = isPlainObject(bestObj) ? bestObj : candidate;
    const sourceKeys = Object.keys(source);
    const normToRaw = new Map();
    for (const k of sourceKeys) {
      const nk = normalizeMatchKey(k);
      if (nk && !normToRaw.has(nk)) normToRaw.set(nk, k);
    }

    const aligned = {};
    for (const expected of expectedKeys) {
      if (Object.prototype.hasOwnProperty.call(source, expected)) {
        aligned[expected] = source[expected];
        continue;
      }
      const normExpected = normalizeMatchKey(expected);
      if (!normExpected) continue;

      const direct = normToRaw.get(normExpected);
      if (direct && Object.prototype.hasOwnProperty.call(source, direct)) {
        aligned[expected] = source[direct];
        continue;
      }

      const fuzzyRaw = sourceKeys.find((k) => {
        const nk = normalizeMatchKey(k);
        return !!nk && (nk.includes(normExpected) || normExpected.includes(nk));
      });
      if (fuzzyRaw && Object.prototype.hasOwnProperty.call(source, fuzzyRaw)) {
        aligned[expected] = source[fuzzyRaw];
      }
    }

    if (
      expectedKeys.length === 1 &&
      !Object.prototype.hasOwnProperty.call(aligned, expectedKeys[0])
    ) {
      aligned[expectedKeys[0]] = source;
    }

    return Object.keys(aligned).length ? aligned : source;
  }

  function extractSectionedOutputs(raw, entries) {
    const lines = String(raw || "").split(/\r?\n/);
    const entriesList = (entries || [])
      .map((e) => ({
        loreName: safeTrim(e?.lorebook_name),
        key: normalizeSectionKey(e?.lorebook_name),
        entry: e,
      }))
      .filter((e) => e.loreName && e.key);

    if (entriesList.length === 0) return [];

    const keyToLore = new Map(entriesList.map((e) => [e.key, e]));
    const collected = new Map();
    let currentKey = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed) {
        const headerMatch = trimmed.match(
          /^(?:#+\s*|\[)?\s*([A-Za-z0-9_ -]+)\s*\]?\s*[:：-]?\s*$/,
        );
        if (headerMatch) {
          const candidate = normalizeSectionKey(headerMatch[1]);
          if (keyToLore.has(candidate)) {
            currentKey = candidate;
            if (!collected.has(candidate)) collected.set(candidate, []);
            continue;
          }
        }
      }
      if (!currentKey) continue;
      collected.get(currentKey).push(line);
    }

    const recovered = [];
    for (const [key, linesBuf] of collected.entries()) {
      const entry = keyToLore.get(key);
      const content = linesBuf.join("\n").trim();
      if (!entry || !content) continue;
      recovered.push({ entry: entry.entry, loreName: entry.loreName, content });
    }
    return recovered;
  }

  function normalizeNamedValueArrayToObject(value) {
    if (!Array.isArray(value) || value.length === 0) return null;
    const out = {};
    let matched = 0;
    for (const item of value) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const key = safeTrim(
        item.lorebook_name ||
          item.loreName ||
          item.name ||
          item.key ||
          item.id ||
          "",
      );
      if (!key) continue;
      let itemValue = item.value;
      if (itemValue === undefined) itemValue = item.content;
      if (itemValue === undefined) itemValue = item.text;
      if (itemValue === undefined) itemValue = item.data;
      if (itemValue === undefined) continue;
      out[key] = itemValue;
      matched++;
    }
    return matched > 0 ? out : null;
  }

  function unwrapCommonValueContainer(value) {
    let cur = value;
    const seen = new Set();
    while (
      cur &&
      typeof cur === "object" &&
      !Array.isArray(cur) &&
      !seen.has(cur)
    ) {
      seen.add(cur);
      const keys = Object.keys(cur);
      if (keys.length !== 1) break;
      const onlyKey = keys[0];
      const normKey = normalizeSectionKey(onlyKey);
      if (
        ![
          "content",
          "text",
          "value",
          "data",
          "result",
          "output",
          "message",
          "answer",
        ].includes(normKey)
      ) {
        break;
      }
      cur = cur[onlyKey];
    }
    return cur;
  }

  function parseSimpleStringMap(raw) {
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
        return {};
      const out = {};
      for (const [k, v] of Object.entries(parsed)) {
        const key = safeTrim(k);
        const value = safeTrim(v);
        if (!key || !value) continue;
        out[key] = value;
      }
      return out;
    } catch {
      return {};
    }
  }

  async function safeGetArgument(key) {
    try {
      let val;
      if (typeof Risuai.getArgument === "function")
        val = await Risuai.getArgument(key);
      else if (typeof Risuai.getArg === "function")
        val = await Risuai.getArg(key);
      else return undefined;
      if (val === undefined || val === null) return undefined;
      if (typeof val === "object") return JSON.stringify(val);
      return String(val);
    } catch {
      return undefined;
    }
  }

  async function safeSetArgument(key, value) {
    try {
      const strVal =
        value === undefined || value === null
          ? ""
          : typeof value === "object"
            ? JSON.stringify(value)
            : String(value);
      if (typeof Risuai.setArgument === "function")
        await Risuai.setArgument(key, strVal);
      else if (typeof Risuai.setArg === "function")
        await Risuai.setArg(key, strVal);
    } catch {}
  }

  const SYNC_TO_PLUGIN_STORAGE_KEYS = new Set([
    "extractor_a_key",
    "extractor_b_key",
    "embedding_key",
    "extractor_a_provider_key_map",
    "extractor_b_provider_key_map",
    "embedding_provider_key_map",
  ]);

  async function refreshConfig() {
    const next = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      const argValue = await safeGetArgument(key);
      const localValue = await Risuai.safeLocalStorage.getItem(
        SETTING_KEYS[key],
      );
      let pluginSyncValue;
      if (SYNC_TO_PLUGIN_STORAGE_KEYS.has(key)) {
        try {
          pluginSyncValue = await Risuai.pluginStorage.getItem(
            "sync_" + SETTING_KEYS[key],
          );
        } catch {}
      }
      const normalizeVal = (v) => {
        if (v === undefined || v === null) return undefined;
        if (typeof v === "object") return JSON.stringify(v);
        return String(v);
      };
      const merged =
        normalizeVal(localValue) ?? normalizeVal(pluginSyncValue) ?? normalizeVal(argValue) ?? DEFAULTS[key];
      next[key] = merged;
    }

    next.context_messages = Math.max(
      1,
      toInt(next.context_messages, DEFAULTS.context_messages),
    );
    const aTemp = Number(next.extractor_a_temperature);
    const bTemp = Number(next.extractor_b_temperature);
    next.extractor_a_temperature = Number.isFinite(aTemp)
      ? Math.max(0, Math.min(2, aTemp))
      : DEFAULTS.extractor_a_temperature;
    next.extractor_b_temperature = Number.isFinite(bTemp)
      ? Math.max(0, Math.min(2, bTemp))
      : DEFAULTS.extractor_b_temperature;

    next.extractor_a_thinking_enabled =
      toInt(next.extractor_a_thinking_enabled, 0) === 1 ? 1 : 0;
    next.extractor_a_thinking_level = safeTrim(
      next.extractor_a_thinking_level || "",
    );
    next.extractor_b_thinking_enabled =
      toInt(next.extractor_b_thinking_enabled, 0) === 1 ? 1 : 0;
    next.extractor_b_thinking_level = safeTrim(
      next.extractor_b_thinking_level || "",
    );
    next.extractor_a_concurrency = toInt(
      next.extractor_a_concurrency,
      DEFAULTS.extractor_a_concurrency,
    );
    next.extractor_b_concurrency = toInt(
      next.extractor_b_concurrency,
      DEFAULTS.extractor_b_concurrency,
    );
    next.embedding_concurrency = toInt(
      next.embedding_concurrency,
      DEFAULTS.embedding_concurrency,
    );
    next.active_preset = toInt(next.active_preset, 1);

    const aProviderMap = parseSimpleStringMap(
      next.extractor_a_provider_model_map ||
        DEFAULTS.extractor_a_provider_model_map,
    );
    const bProviderMap = parseSimpleStringMap(
      next.extractor_b_provider_model_map ||
        DEFAULTS.extractor_b_provider_model_map,
    );
    const aProvider = safeTrim(next.extractor_a_provider || "custom_api");
    const bProvider = safeTrim(next.extractor_b_provider || "custom_api");
    const aRemembered = safeTrim(aProviderMap[aProvider]);
    const bRemembered = safeTrim(bProviderMap[bProvider]);
    if (!safeTrim(next.extractor_a_model) && aRemembered)
      next.extractor_a_model = aRemembered;
    if (!safeTrim(next.extractor_b_model) && bRemembered)
      next.extractor_b_model = bRemembered;
    if (safeTrim(next.extractor_a_model))
      aProviderMap[aProvider] = safeTrim(next.extractor_a_model);
    if (safeTrim(next.extractor_b_model))
      bProviderMap[bProvider] = safeTrim(next.extractor_b_model);
    next.extractor_a_provider_model_map = JSON.stringify(aProviderMap);
    next.extractor_b_provider_model_map = JSON.stringify(bProviderMap);

    const embeddingProvider = safeTrim(
      next.embedding_provider || DEFAULTS.embedding_provider,
    );
    next.embedding_provider = EMBEDDING_PROVIDER_PRESETS[embeddingProvider]
      ? embeddingProvider
      : "custom_api";
    const embeddingProviderModelMap = parseSimpleStringMap(
      next.embedding_provider_model_map ||
        DEFAULTS.embedding_provider_model_map,
    );
    next.embedding_provider_model_map = JSON.stringify(
      embeddingProviderModelMap,
    );
    const embeddingPreset =
      EMBEDDING_PROVIDER_PRESETS[next.embedding_provider] ||
      EMBEDDING_PROVIDER_PRESETS.custom_api;
    const embeddingOptions = getEmbeddingOptionsByProvider(
      next.embedding_provider,
    )
      .map((x) => safeTrim(x?.value))
      .filter(Boolean);
    const rememberedModel = safeTrim(
      embeddingProviderModelMap[next.embedding_provider],
    );
    const candidateModel = rememberedModel || safeTrim(next.embedding_model);

    if (next.embedding_provider === "custom_api") {
      next.embedding_model = candidateModel || "";
    } else if (next.embedding_provider === "openrouter") {
      next.embedding_model =
        candidateModel ||
        embeddingPreset.defaultModel ||
        "or_openai_text_embedding_3_large";
    } else {
      next.embedding_model = embeddingOptions.includes(candidateModel)
        ? candidateModel
        : embeddingPreset.defaultModel || embeddingOptions[0] || "custom";
    }
    embeddingProviderModelMap[next.embedding_provider] = next.embedding_model;
    next.embedding_provider_model_map = JSON.stringify(
      embeddingProviderModelMap,
    );

    if (!safeTrim(next.embedding_format)) {
      next.embedding_format = safeTrim(embeddingPreset.format || "openai");
    }
    if (
      !safeTrim(next.embedding_url) &&
      next.embedding_provider !== "custom_api"
    ) {
      next.embedding_url = safeTrim(embeddingPreset.url || "");
    }
    if (
      !safeTrim(next.embedding_request_model) &&
      next.embedding_provider !== "custom_api"
    ) {
      next.embedding_request_model = safeTrim(
        EMBEDDING_MODEL_TO_REQUEST[safeTrim(next.embedding_model)] ||
          embeddingPreset.requestModel ||
          "",
      );
    }

    next.read_mod_lorebook =
      toInt(next.read_mod_lorebook, DEFAULTS.read_mod_lorebook) === 1 ? 1 : 0;
    // Read the user-configured value instead of hardcoding 1.
    // The effectiveVecConfig logic in _replacerBody will override this
    // per-request, but keeping the stored value accurate avoids
    // misleading reads elsewhere in the codebase.
    next.vector_search_enabled = toInt(
      next.vector_search_enabled,
      DEFAULTS.vector_search_enabled,
    );
    next.vector_search_query_dialogue_rounds = Math.max(
      1,
      toInt(
        next.vector_search_query_dialogue_rounds,
        DEFAULTS.vector_search_query_dialogue_rounds,
      ),
    );
    next.vector_search_top_k = Math.max(
      1,
      toInt(next.vector_search_top_k, DEFAULTS.vector_search_top_k),
    );
    const minScore = Number(next.vector_search_min_score);
    next.vector_search_min_score = Number.isFinite(minScore)
      ? Math.max(0, minScore)
      : DEFAULTS.vector_search_min_score;
    next.vector_search_query_dialogue_rounds_2 = Math.max(
      1,
      toInt(
        next.vector_search_query_dialogue_rounds_2,
        DEFAULTS.vector_search_query_dialogue_rounds_2,
      ),
    );
    next.vector_search_top_k_2 = Math.max(
      1,
      toInt(next.vector_search_top_k_2, DEFAULTS.vector_search_top_k_2),
    );
    const minScore2 = Number(next.vector_search_min_score_2);
    next.vector_search_min_score_2 = Number.isFinite(minScore2)
      ? Math.max(0, minScore2)
      : DEFAULTS.vector_search_min_score_2;
    next.init_bootstrap_target_model =
      safeTrim(next.init_bootstrap_target_model) === "B" ? "B" : "A";
    next.init_bootstrap_model_anchor_prompt = String(
      next.init_bootstrap_model_anchor_prompt ||
        DEFAULTS.init_bootstrap_model_anchor_prompt,
    );

    next.timeout_ms = FIXED_TIMEOUT_MS;
    await Risuai.safeLocalStorage.setItem(
      SETTING_KEYS.timeout_ms,
      String(FIXED_TIMEOUT_MS),
    );
    await safeSetArgument("timeout_ms", FIXED_TIMEOUT_MS);

    if (!safeTrim(next.model_calls)) {
      next.model_calls = JSON.stringify(DEFAULT_MODEL_CALLS);
      await Risuai.safeLocalStorage.setItem(
        SETTING_KEYS.model_calls,
        next.model_calls,
      );
      await safeSetArgument("model_calls", next.model_calls);
    }
    if (!safeTrim(next.persona_calls)) {
      next.persona_calls = JSON.stringify(DEFAULT_PERSONA_CALLS);
      await Risuai.safeLocalStorage.setItem(
        SETTING_KEYS.persona_calls,
        next.persona_calls,
      );
      await safeSetArgument("persona_calls", next.persona_calls);
    }
    if (!safeTrim(next.model_calls_2)) {
      next.model_calls_2 = JSON.stringify(DEFAULT_MODEL_CALLS_2);
      await Risuai.safeLocalStorage.setItem(
        SETTING_KEYS.model_calls_2,
        next.model_calls_2,
      );
      await safeSetArgument("model_calls_2", next.model_calls_2);
    }
    if (!safeTrim(next.model_calls_3)) {
      next.model_calls_3 = JSON.stringify(NEW_PRESET1_CALLS);
      await Risuai.safeLocalStorage.setItem(
        SETTING_KEYS.model_calls_3,
        next.model_calls_3,
      );
      await safeSetArgument("model_calls_3", next.model_calls_3);
    }
    if (!safeTrim(next.model_calls_4)) {
      next.model_calls_4 = JSON.stringify(NEW_PRESET2_CALLS);
      await Risuai.safeLocalStorage.setItem(
        SETTING_KEYS.model_calls_4,
        next.model_calls_4,
      );
      await safeSetArgument("model_calls_4", next.model_calls_4);
    }

    configCache = next;
  }

  function resolveExtractorConfig() {
    const aFormat = safeTrim(configCache.extractor_a_format || "openai");
    const bFormat = safeTrim(configCache.extractor_b_format || "openai");
    const aKeyMap = parseSimpleStringMap(
      configCache.extractor_a_provider_key_map || "{}",
    );
    const bKeyMap = parseSimpleStringMap(
      configCache.extractor_b_provider_key_map || "{}",
    );
    const aProvider = safeTrim(
      configCache.extractor_a_provider || "custom_api",
    );
    const bProvider = safeTrim(
      configCache.extractor_b_provider || "custom_api",
    );
    const aKey = safeTrim(
      aKeyMap[aProvider] ||
        configCache.extractor_a_key ||
        configCache.extractor_b_key ||
        "",
    );
    const bKey = safeTrim(
      bKeyMap[bProvider] ||
        configCache.extractor_b_key ||
        configCache.extractor_a_key ||
        "",
    );
    const a = {
      url: normalizeUrlByFormat(
        configCache.extractor_a_url || configCache.extractor_b_url,
        aFormat,
      ),
      key: aKey,
      model: safeTrim(
        configCache.extractor_a_model || configCache.extractor_b_model,
      ),
      provider: aProvider,
      format: aFormat,
      temperature: Number(configCache.extractor_a_temperature),
      thinkingEnabled: configCache.extractor_a_thinking_enabled === 1,
      thinkingLevel: safeTrim(configCache.extractor_a_thinking_level || ""),
    };
    const b = {
      url: normalizeUrlByFormat(
        configCache.extractor_b_url || configCache.extractor_a_url,
        bFormat,
      ),
      key: bKey,
      model: safeTrim(
        configCache.extractor_b_model || configCache.extractor_a_model,
      ),
      provider: bProvider,
      format: bFormat,
      temperature: Number(configCache.extractor_b_temperature),
      thinkingEnabled: configCache.extractor_b_thinking_enabled === 1,
      thinkingLevel: safeTrim(configCache.extractor_b_thinking_level || ""),
    };
    return { a, b };
  }

  async function saveConfigFromUI(formData) {
    for (const [key, storageKey] of Object.entries(SETTING_KEYS)) {
      if (formData[key] !== undefined) {
        try {
          const value = formData[key];
          const strVal =
            value === undefined || value === null
              ? ""
              : typeof value === "object"
                ? JSON.stringify(value)
                : String(value);
          await Risuai.safeLocalStorage.setItem(storageKey, strVal);
          await safeSetArgument(key, strVal);
          /* Dual-write key-related fields to pluginStorage for cross-device sync */
          if (SYNC_TO_PLUGIN_STORAGE_KEYS.has(key)) {
            try {
              await Risuai.pluginStorage.setItem("sync_" + storageKey, strVal);
            } catch {}
          }
        } catch (err) {
          throw new Error(
            `saveConfigFromUI failed at "${key}": ${err?.message || String(err)}`,
          );
        }
      }
    }
    try {
      await refreshConfig();
    } catch (err) {
      throw new Error(
        `saveConfigFromUI refreshConfig failed: ${err?.message || String(err)}`,
      );
    }
  }

  async function getCopilotBearerToken(rawGitHubToken) {
    const key = sanitizeAsciiToken(rawGitHubToken);
    if (!key) return "";
    const cachedToken = safeTrim(
      await Risuai.safeLocalStorage.getItem("copilot_tid_token"),
    );
    const cachedExpiry = Number(
      (await Risuai.safeLocalStorage.getItem("copilot_tid_token_expiry")) || 0,
    );
    if (
      cachedToken &&
      Number.isFinite(cachedExpiry) &&
      Date.now() < cachedExpiry - 60000
    )
      return cachedToken;

    const { res } = await fetchWithFallback(
      COPILOT_TOKEN_URL,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${key}`,
          Origin: "vscode-file://vscode-app",
          "Editor-Version": `vscode/${COPILOT_CODE_VERSION}`,
          "Editor-Plugin-Version": `copilot-chat/${COPILOT_CHAT_VERSION}`,
          "Copilot-Integration-Id": "vscode-chat",
          "User-Agent": COPILOT_USER_AGENT,
        },
      },
      12000,
      _T.copilot_refresh,
      true,
    );
    if (!isResponseLike(res) || !res.ok) return "";
    const data = await readResponseJson(res);
    const token = safeTrim(data?.token);
    const expiry = Number(data?.expires_at || 0) * 1000;
    if (token) {
      await Risuai.safeLocalStorage.setItem("copilot_tid_token", token);
      await Risuai.safeLocalStorage.setItem(
        "copilot_tid_token_expiry",
        String(expiry || Date.now() + 30 * 60 * 1000),
      );
    }
    return token;
  }

  async function applyCopilotAuthHeaders(headers, rawGitHubToken) {
    const fallbackToken = sanitizeAsciiToken(rawGitHubToken);
    const token = (await getCopilotBearerToken(fallbackToken)) || fallbackToken;
    if (!token) return headers;
    const next = { ...(headers || {}) };
    next.Authorization = `Bearer ${token}`;
    next["Copilot-Integration-Id"] = "vscode-chat";
    next["Editor-plugin-version"] = `copilot-chat/${COPILOT_CHAT_VERSION}`;
    next["Editor-version"] = `vscode/${COPILOT_CODE_VERSION}`;
    next["Editor-Plugin-Version"] = `copilot-chat/${COPILOT_CHAT_VERSION}`;
    next["Editor-Version"] = `vscode/${COPILOT_CODE_VERSION}`;
    next["User-Agent"] = COPILOT_USER_AGENT;
    next["X-Github-Api-Version"] = "2025-10-01";
    next["X-Initiator"] = "user";
    return next;
  }

  function sanitizeAsciiToken(raw) {
    return String(raw || "")
      .replace(/[^\x20-\x7E]/g, "")
      .trim();
  }

  function parseVertexServiceAccount(rawKey) {
    const raw = safeTrim(rawKey || "");
    if (!raw) throw new Error("Vertex AI Service Account JSON is missing.");
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `Vertex AI key must be the full Service Account JSON, not a bearer token or file path: ${err?.message || String(err)}`,
      );
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Vertex AI key must be a JSON object.");
    }
    if (!safeTrim(parsed.client_email) || !safeTrim(parsed.private_key)) {
      throw new Error(
        "Vertex AI Service Account JSON is missing client_email or private_key.",
      );
    }
    return parsed;
  }

  function toBase64UrlUtf8(input) {
    return btoa(unescape(encodeURIComponent(String(input || ""))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  function pemToArrayBuffer(pem) {
    const body = String(pem || "")
      .replace(/-----BEGIN [^-]+-----/g, "")
      .replace(/-----END [^-]+-----/g, "")
      .replace(/\s+/g, "");
    const binary = atob(body);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer.slice(0);
  }

  async function requestVertexAccessToken(rawKey) {
    const svc = parseVertexServiceAccount(rawKey);
    const cacheKey = `vertex_access_token_${safeTrim(svc.client_email) || "default"}`;
    const cachedToken = safeTrim(await Risuai.safeLocalStorage.getItem(cacheKey));
    const cachedExpiry = Number(
      (await Risuai.safeLocalStorage.getItem(`${cacheKey}_expiry`)) || 0,
    );
    if (
      cachedToken &&
      Number.isFinite(cachedExpiry) &&
      Date.now() < cachedExpiry - 60000
    )
      return { token: cachedToken, serviceAccount: svc };

    const now = Math.floor(Date.now() / 1000);
    const header = toBase64UrlUtf8(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claim = toBase64UrlUtf8(
      JSON.stringify({
        iss: svc.client_email,
        scope: "https://www.googleapis.com/auth/cloud-platform",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      }),
    );
    const unsignedToken = `${header}.${claim}`;
    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      pemToArrayBuffer(svc.private_key),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      privateKey,
      new TextEncoder().encode(unsignedToken),
    );
    const jwt = `${unsignedToken}.${btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "")}`;
    const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    let res = null;
    try {
      res = await Risuai.nativeFetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new TextEncoder().encode(body),
      });
    } catch {}
    if (!isResponseLike(res) || !res.ok) {
      const fallback = await fetchWithFallback(
        "https://oauth2.googleapis.com/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        },
        15000,
        "Vertex token exchange",
        false,
      );
      res = fallback.res;
    }
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(
        `Vertex token exchange failed: ${String(errText || "").slice(0, 500)}`,
      );
    }
    const data = await readResponseJson(res);
    const accessToken = safeTrim(data?.access_token);
    const expiresIn = Number(data?.expires_in || 3600);
    if (!accessToken) throw new Error("Vertex token exchange returned no token.");
    await Risuai.safeLocalStorage.setItem(cacheKey, accessToken);
    await Risuai.safeLocalStorage.setItem(
      `${cacheKey}_expiry`,
      String(Date.now() + Math.max(300, expiresIn) * 1000),
    );
    return { token: accessToken, serviceAccount: svc };
  }

  function inferVertexProjectAndLocation(baseUrl, rawKey) {
    let serviceAccount = null;
    try {
      serviceAccount = parseVertexServiceAccount(rawKey);
    } catch {}
    const raw = safeTrim(baseUrl || "");
    const projectFromUrl = raw.match(/\/projects\/([^/]+)/i)?.[1] || "";
    const locationFromUrl = raw.match(/\/locations\/([^/]+)/i)?.[1] || "";
    const hostLocation =
      raw.match(/^https?:\/\/([a-z0-9-]+)-aiplatform\.googleapis\.com/i)?.[1] ||
      "";
    return {
      project: safeTrim(projectFromUrl || serviceAccount?.project_id || ""),
      location: safeTrim(locationFromUrl || hostLocation || "global"),
    };
  }

  function isVertexClaudeModel(model) {
    return /^claude-/i.test(safeTrim(model || ""));
  }

  function normalizeVertexClaudeUrl(baseUrl, model, rawKey) {
    const raw = safeTrim(baseUrl || "");
    const id = safeTrim(model || "");
    if (!raw || !id) return "";
    const inferred = inferVertexProjectAndLocation(raw, rawKey);
    if (!inferred.project || !inferred.location) return "";
    const host =
      inferred.location === "global"
        ? "https://aiplatform.googleapis.com"
        : `https://${inferred.location}-aiplatform.googleapis.com`;
    return `${host}/v1/projects/${encodeURIComponent(inferred.project)}/locations/${encodeURIComponent(inferred.location)}/publishers/anthropic/models/${encodeURIComponent(id)}:rawPredict`;
  }

  function buildClaudeMessages(messages) {
    const system = (messages || [])
      .filter((m) => m?.role === "system")
      .map((m) => normalizeMessageContent(m?.content))
      .filter(Boolean)
      .join("\n\n");
    const chatMessages = (messages || [])
      .filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: normalizeMessageContent(m?.content),
      }))
      .filter((m) => !!safeTrim(m.content));
    if (!chatMessages.length)
      chatMessages.push({ role: "user", content: "Continue." });
    return { system, chatMessages };
  }

  function getEmbeddingTokenLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "gemini-embedding-2-preview") return 8192;
    if (
      m === "google/gemini-embedding-001" ||
      m === "gemini-embedding-001" ||
      m.includes("gemini-embedding")
    )
      return 2048;
    if (m.includes("voyage")) return 32000;
    if (
      m === "qwen/qwen3-embedding-8b" ||
      m.includes("qwen3-embedding") ||
      m.includes("qwen3")
    )
      return 8192;
    if (
      m.includes("text-embedding-3-large") ||
      m.includes("text-embedding") ||
      m.includes("openai")
    )
      return 8191;
    return 8191;
  }

  function getEmbeddingBatchInputLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "gemini-embedding-2-preview") return 100;
    if (
      m === "google/gemini-embedding-001" ||
      m === "gemini-embedding-001" ||
      m.includes("gemini-embedding")
    )
      return 250;
    if (m.includes("voyage")) return 128;
    if (
      m === "qwen/qwen3-embedding-8b" ||
      m.includes("qwen3-embedding") ||
      m.includes("qwen3")
    )
      return 50;
    if (
      m.includes("text-embedding-3-large") ||
      m.includes("text-embedding") ||
      m.includes("openai")
    )
      return 100;
    return 50;
  }

  function getEmbeddingBatchTokenLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "gemini-embedding-2-preview") return 200000;
    if (
      m === "google/gemini-embedding-001" ||
      m === "gemini-embedding-001" ||
      m.includes("gemini-embedding")
    )
      return 20000;
    if (m.includes("voyage-4-large")) return 120000;
    if (m.includes("voyage")) return 320000;
    if (
      m === "qwen/qwen3-embedding-8b" ||
      m.includes("qwen3-embedding") ||
      m.includes("qwen3")
    )
      return 400000;
    if (
      m.includes("text-embedding-3-large") ||
      m.includes("text-embedding") ||
      m.includes("openai")
    )
      return 300000;
    return 100000;
  }

  function getEmbeddingBatchSize(requestModel) {
    return getEmbeddingBatchInputLimit(requestModel);
  }

  function chunkTextSafely(text, maxChars) {
    const src = String(text || "").trim();
    if (!src) return [];
    if (src.length <= maxChars) return [src];

    const result = [];
    let current = "";
    const paragraphs = src.split(/\n/);

    for (const p of paragraphs) {
      const addLen = current ? p.length + 1 : p.length;
      if (current.length + addLen > maxChars) {
        if (current) result.push(current);
        current = p;
        while (current.length > maxChars) {
          result.push(current.slice(0, maxChars));
          current = current.slice(maxChars);
        }
      } else {
        current += (current ? "\n" : "") + p;
      }
    }
    if (current) result.push(current);
    return result;
  }

  function normalizeMessageContent(content) {
    if (typeof content === "string") return content.trim();
    if (!Array.isArray(content)) return "";
    const texts = [];
    for (const part of content) {
      if (typeof part === "string") {
        if (part.trim()) texts.push(part.trim());
        continue;
      }
      if (part && typeof part === "object") {
        if (typeof part.text === "string" && part.text.trim())
          texts.push(part.text.trim());
        if (typeof part.content === "string" && part.content.trim())
          texts.push(part.content.trim());
      }
    }
    return texts.join("\n").trim();
  }

  function cbsToIndexPlaceholders(content) {
    const src = String(content || "");
    if (!src || !src.includes("{{")) return src;

    const norm = (s) =>
      String(s || "")
        .replace(/\s+/g, " ")
        .trim();

    // Depth-tracking tag reader: handles nested {{ }} correctly.
    // Returns { inner, end } where end is the index after the closing }} (or '}}}' for triple).
    function readTag(text, start) {
      // Check for triple-brace {{{ ... }}}
      const isTriple = text.slice(start, start + 3) === "{{{";
      const openLen = isTriple ? 3 : 2;
      if (text.slice(start, start + openLen) !== (isTriple ? "{{{" : "{{")) return null;
      let depth = 1;
      let i = start + openLen;
      while (i < text.length) {
        if (text.slice(i, i + 3) === "}}}" && isTriple && depth === 1) {
          return { inner: text.slice(start + openLen, i), end: i + 3, triple: true };
        }
        if (text.slice(i, i + 2) === "{{") { depth++; i += 2; continue; }
        if (text.slice(i, i + 2) === "}}") {
          depth--;
          if (depth === 0) {
            return { inner: text.slice(start + 2, i), end: i + 2, triple: false };
          }
          i += 2;
          continue;
        }
        i++;
      }
      return null;
    }

    let out = "";
    let cursor = 0;
    while (cursor < src.length) {
      // Find next {{
      const next = src.indexOf("{{", cursor);
      if (next === -1) { out += src.slice(cursor); break; }
      out += src.slice(cursor, next);

      const tag = readTag(src, next);
      if (!tag) { out += src[next]; cursor = next + 1; continue; }

      const inner = tag.inner;
      const innerNorm = norm(inner);
      cursor = tag.end;

      if (tag.triple) {
        out += `[CBS_RAW_EXPR:${norm(inner)}]`;
        continue;
      }

      // Block opening tags
      if (/^#if\s/i.test(inner) || inner === "#if") {
        out += `[CBS_IF:${norm(inner.replace(/^#if\s*/i, ""))}]`;
      } else if (/^#if_pure\s/i.test(inner)) {
        out += `[CBS_IF:${norm(inner.replace(/^#if_pure\s*/i, ""))}]`;
      } else if (/^#when(\s|::)/i.test(inner)) {
        out += `[CBS_IF:${norm(inner.replace(/^#when(::\w+)?\s*/i, ""))}]`;
      } else if (/^#unless\s/i.test(inner)) {
        out += `[CBS_UNLESS:${norm(inner.replace(/^#unless\s*/i, ""))}]`;
      } else if (/^#each(\s|::)/i.test(inner)) {
        out += `[CBS_EACH:${norm(inner.replace(/^#each(::\w+)?\s*/i, ""))}]`;
      } else if (/^#with\s/i.test(inner)) {
        out += `[CBS_WITH:${norm(inner.replace(/^#with\s*/i, ""))}]`;
      } else if (/^#puredisplay$/i.test(innerNorm)) {
        out += `[CBS_PUREDISPLAY]`;
      // Block closing tags
      } else if (/^\/(if|when)$/i.test(innerNorm)) {
        out += `[CBS_END_IF]`;
      } else if (/^\/unless$/i.test(innerNorm)) {
        out += `[CBS_END_UNLESS]`;
      } else if (/^\/(each)$/i.test(innerNorm)) {
        out += `[CBS_END_EACH]`;
      } else if (/^\/with$/i.test(innerNorm)) {
        out += `[CBS_END_WITH]`;
      } else if (/^\/puredisplay$/i.test(innerNorm)) {
        out += `[CBS_END_PUREDISPLAY]`;
      // else/comment
      } else if (/^(else|:else|:then)$/i.test(innerNorm)) {
        out += `[CBS_ELSE]`;
      } else if (/^(\/\/|comment::)/i.test(inner)) {
        // Comments: drop entirely
      } else {
        out += `[CBS_EXPR:${norm(inner)}]`;
      }
    }
    return out;
  }


  // ── CBS Standalone Runtime (ported from CBS Mock System) ──────────────
  function parseDefaultVariables(raw) {
    return String(raw || "")
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const eq = line.indexOf("=");
        if (eq === -1) return null;
        return [line.slice(0, eq).trim(), line.slice(eq + 1)];
      })
      .filter((pair) => pair && pair[0]);
  }

  function splitTopLevelCbsByDoubleColon(raw) {
    const src = String(raw || "");
    const result = [];
    let current = "";
    let braceDepth = 0;
    let parenDepth = 0;
    for (let i = 0; i < src.length; i += 1) {
      const two = src.slice(i, i + 2);
      if (two === "{{") {
        braceDepth += 1;
        current += two;
        i += 1;
        continue;
      }
      if (two === "}}" && braceDepth > 0) {
        braceDepth -= 1;
        current += two;
        i += 1;
        continue;
      }
      if (src[i] === "(") parenDepth += 1;
      if (src[i] === ")" && parenDepth > 0) parenDepth -= 1;
      if (two === "::" && braceDepth === 0 && parenDepth === 0) {
        result.push(current);
        current = "";
        i += 1;
        continue;
      }
      current += src[i];
    }
    result.push(current);
    return result;
  }

  function readCbsTagAt(text, startIndex) {
    if (String(text || "").slice(startIndex, startIndex + 2) !== "{{") {
      return null;
    }
    let depth = 1;
    let i = startIndex + 2;
    while (i < text.length - 1) {
      const two = text.slice(i, i + 2);
      if (two === "{{") {
        depth += 1;
        i += 2;
        continue;
      }
      if (two === "}}") {
        depth -= 1;
        i += 2;
        if (depth === 0) {
          return {
            start: startIndex,
            end: i,
            raw: text.slice(startIndex, i),
            inner: text.slice(startIndex + 2, i - 2),
          };
        }
        continue;
      }
      i += 1;
    }
    return null;
  }

  function findNextCbsTag(text, startIndex) {
    const src = String(text || "");
    for (let i = startIndex; i < src.length - 1; i += 1) {
      if (src[i] === "{" && src[i + 1] === "{") {
        return readCbsTagAt(src, i);
      }
    }
    return null;
  }

  function extractCbsBlock(text, startTag, blockName) {
    let depth = 1;
    let cursor = startTag.end;
    let elseTag = null;
    while (cursor < text.length) {
      const tag = findNextCbsTag(text, cursor);
      if (!tag) break;
      const inner = safeTrim(tag.inner);
      if (inner.startsWith(`#${blockName} `) || inner === `#${blockName}` || inner.startsWith(`#${blockName}::`)) {
        depth += 1;
      } else if (inner === `/${blockName}`) {
        depth -= 1;
        if (depth === 0) {
          return {
            body: text.slice(startTag.end, elseTag ? elseTag.start : tag.start),
            elseBody: elseTag ? text.slice(elseTag.end, tag.start) : "",
            end: tag.end,
          };
        }
      } else if (
        (inner === "else" || inner === ":else" || inner === ":then") &&
        depth === 1 &&
        ["if", "when", "unless", "each"].includes(blockName)
      ) {
        elseTag = tag;
      }
      cursor = tag.end;
    }
    return {
      body: text.slice(startTag.end),
      elseBody: "",
      end: text.length,
    };
  }

  async function getStandaloneCbsRuntime() {
    const { char, chat, chatIndex } = await getCurrentCharAndChatSafe();
    let db = null;
    try {
      db = await Risuai.getDatabase();
    } catch {}
    const vars = Object.create(null);
    
    // Parse character default variables
    for (const [k, v] of parseDefaultVariables(char?.defaultVariables)) {
      vars[k] = String(v ?? "");
    }
    
    // Parse template default variables
    for (const [k, v] of parseDefaultVariables(db?.templateDefaultVariables)) {
      if (!(k in vars)) vars[k] = String(v ?? "");
    }
    
    // Parse script state variables
    const scriptState =
      chat?.scriptstate && typeof chat.scriptstate === "object"
        ? chat.scriptstate
        : {};
    for (const [rawKey, value] of Object.entries(scriptState)) {
      const key = String(rawKey || "").replace(/^\$/, "");
      vars[key] = value == null ? "null" : String(value);
    }
    
    // Global variables
    const globalVars =
      db?.globalChatVariables && typeof db.globalChatVariables === "object"
        ? db.globalChatVariables
        : {};
    
    const userName = safeTrim(db?.username || "User");
    
    // BUGFIX: Use chat.localLore.globalNote as fallback (from v3.1.2)
    const finalDb = {
      ...db,
      globalNote: chat?.localLore?.globalNote || db?.globalNote || "",
    };

    const messages = Array.isArray(chat?.message) ? chat.message : [];
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;

    // Debug logging for variable initialization
    try {
      const varCount = Object.keys(vars).length;
      const globalVarCount = Object.keys(globalVars).length;
      if (varCount > 0 || globalVarCount > 0) {
        await Risuai.log(`${LOG} CBS Runtime initialized: ${varCount} vars, ${globalVarCount} global vars`);
      }
    } catch {}

    return {
      char,
      chat,
      db: finalDb,
      vars,
      globalVars,
      userName,
      chatIndex,
      messages,
      lastMsg,
      functions: Object.create(null),
      tempVars: Object.create(null),
      startTime: Date.now(),
    };
  }

  function evalStandaloneCbsCalc(expression) {
    let src = String(expression || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!src) return "";
    const looksConditional = /[<>=!&|]/.test(src);
    if (src.includes("{{") || src.includes("}}") || src.includes("[CBS_")) {
      return looksConditional ? "0" : src;
    }
    // BUGFIX: Removed $word variable replacement - it may interfere with CBS syntax
    // Replace CBS single-= equality (not part of ==, !=, <=, >=) with JS ==
    src = src.replace(/([^=!<>])=([^=])/g, "$1==$2");
    if (!/^[\d\s()+\-*/%<>=!&|.,'"_[\]A-Za-z]+$/.test(src)) {
      return looksConditional ? "0" : src;
    }
    try {
      const result = Function(`"use strict"; return (${src});`)();
      if (typeof result === "boolean") return result ? "1" : "0";
      return result == null ? "" : String(result);
    } catch {
      return looksConditional ? "0" : src;
    }
  }

  function isStandaloneCbsTruthy(value) {
    const src = safeTrim(String(value ?? ""));
    if (!src) return false;
    if (src === "0") return false;
    if (src.toLowerCase() === "false") return false;
    if (src.toLowerCase() === "null") return false;
    return true;
  }

  async function evalStandaloneCbsExpr(inner, runtime, args = []) {
    let expr = safeTrim(inner);
    if (!expr) return "";
    if (expr.includes("{{")) {
      expr = safeTrim(await renderStandaloneCbsText(expr, runtime, args));
      if (!expr) return "";
    }

    const lowerExpr = expr.toLowerCase();
    if (lowerExpr === "char" || lowerExpr === "bot") {
      return safeTrim(runtime?.char?.name || "Char");
    }
    if (lowerExpr === "user") {
      return runtime?.userName || "User";
    }
    if (lowerExpr === "role") {
      return "system"; // Standalone evaluation usually occurs in system/extractor context
    }
    if (lowerExpr === "chatindex") {
      return String(runtime?.chatIndex ?? 0);
    }
    if (lowerExpr === "lastmessageid") {
      return String(Math.max(0, (runtime?.messages?.length ?? 1) - 1));
    }
    if (lowerExpr === "isfirstmsg") {
      return (runtime?.messages?.length || 0) <= 1 ? "1" : "0";
    }
    if (lowerExpr === "personality") return safeTrim(runtime?.char?.personality || "");
    if (lowerExpr === "description") return safeTrim(runtime?.char?.desc || runtime?.char?.description || "");
    if (lowerExpr === "scenario") return safeTrim(runtime?.char?.scenario || "");
    if (lowerExpr === "exampledialogue") return safeTrim(runtime?.char?.mesExamples || "");
    if (lowerExpr === "persona") return safeTrim(runtime?.db?.persona || "");
    if (lowerExpr === "mainprompt") return safeTrim(runtime?.db?.mainPrompt || "");
    if (lowerExpr === "jb" || lowerExpr === "jailbreak") return safeTrim(runtime?.db?.jailbreak || "");
    if (lowerExpr === "globalnote") return safeTrim(runtime?.db?.globalNote || "");
    if (lowerExpr === "lastmessage") return safeTrim(runtime?.lastMsg?.data || "");
    if (lowerExpr === "history") return JSON.stringify(runtime?.messages || []);
    if (lowerExpr === "lorebook") {
      const { char, chat } = runtime;
      return JSON.stringify(extractLorebookEntries(char));
    }
    if (lowerExpr === "previouscharchat") {
      const msgs = runtime?.messages || [];
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].is_user === false || msgs[i].is_name === false) return safeTrim(msgs[i].data || "");
      }
      return "";
    }
    if (lowerExpr === "previoususerchat") {
      const msgs = runtime?.messages || [];
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].is_user === true) return safeTrim(msgs[i].data || "");
      }
      return "";
    }
    if (lowerExpr === "bkspc" || lowerExpr === "erase" || lowerExpr === "hiddenkey") return "";
    if (lowerExpr === "jbtoggled") return "1";

    // {{? expression}} — space-separated form per CBS guide (e.g. {{? 1+1}})
    // Must be checked BEFORE the :: split because "? 1+1" has no :: separator.
    if (expr.startsWith("? ")) {
      const calcExpr = await renderStandaloneCbsText(expr.slice(2).trim(), runtime, args);
      return evalStandaloneCbsCalc(calcExpr);
    }
    
    const parts = splitTopLevelCbsByDoubleColon(expr).map((s) => String(s ?? ""));
    const head = safeTrim(parts[0] || "");
    const headLower = head.toLowerCase();

    if (headLower === "arg") {
      const index = Math.max(0, (parseInt(safeTrim(parts[1] || "1"), 10) || 1) - 1);
      return args[index] ?? "null";
    }

    if (headLower === "source") {
      const target = safeTrim(parts[1] || "").toLowerCase();
      if (target === "user") return runtime?.db?.avatar || "";
      if (target === "char" || target === "bot") return runtime?.char?.avatar || "";
      return "";
    }
    if (headLower === "metadata") return "RisuAI Agent Standalone Parser";
    if (headLower === "screenwidth") return "1920";
    if (headLower === "screenheight") return "1080";
    if (headLower === "model" || headLower === "axmodel") return "assistant";

    // --- Variables ---
    if (headLower === "getvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts.slice(1).join("::"), runtime, args));
      if (!key) return "null";
      const value = runtime.vars[key] ?? runtime.globalVars[key] ?? "null";
      // Debug logging for variable access
      try {
        if (value === "null") {
          await Risuai.log(`${LOG} CBS getvar: "${key}" not found (returning "null")`);
        }
      } catch {}
      return value;
    }
    if (headLower === "getglobalvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts.slice(1).join("::"), runtime, args));
      return runtime.globalVars[key] ?? "null";
    }
    if (headLower === "setvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const val = await renderStandaloneCbsText(parts.slice(2).join("::"), runtime, args);
      if (key) runtime.vars[key] = val;
      return "";
    }
    if (headLower === "setdefaultvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const val = await renderStandaloneCbsText(parts.slice(2).join("::"), runtime, args);
      if (key && (runtime.vars[key] === undefined || runtime.vars[key] === "null")) {
        runtime.vars[key] = val;
      }
      return "";
    }
    if (headLower === "addvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const val = Number(await renderStandaloneCbsText(parts[2] || "0", runtime, args)) || 0;
      if (key) {
        const current = Number(runtime.vars[key]) || 0;
        runtime.vars[key] = String(current + val);
      }
      return "";
    }
    if (headLower === "settempvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const val = await renderStandaloneCbsText(parts.slice(2).join("::"), runtime, args);
      if (key) runtime.tempVars[key] = val;
      return "";
    }
    if (headLower === "tempvar") {
      const key = safeTrim(await renderStandaloneCbsText(parts.slice(1).join("::"), runtime, args));
      return runtime.tempVars[key] ?? "null";
    }

    // --- Utils ---
    if (headLower === "calc" || head === "?") {
      return evalStandaloneCbsCalc(await renderStandaloneCbsText(parts.slice(1).join("::"), runtime, args));
    }
    if (headLower === "time") return new Date().toLocaleTimeString("en-GB", { hour12: false });
    if (headLower === "date") {
      if (parts.length >= 3) {
        // {{date::format::timestamp}} — custom format with optional Unix timestamp
        const fmt = String(parts[1] || "");
        const tsRaw = await renderStandaloneCbsText(parts.slice(2).join("::"), runtime, args);
        const d = tsRaw && !isNaN(Number(tsRaw)) ? new Date(Number(tsRaw) * 1000) : new Date();
        // Support strftime-style tokens: %Y %m %d %H %M %S
        return fmt
          .replace(/%Y/g, d.getFullYear())
          .replace(/%m/g, String(d.getMonth() + 1).padStart(2, "0"))
          .replace(/%d/g, String(d.getDate()).padStart(2, "0"))
          .replace(/%H/g, String(d.getHours()).padStart(2, "0"))
          .replace(/%M/g, String(d.getMinutes()).padStart(2, "0"))
          .replace(/%S/g, String(d.getSeconds()).padStart(2, "0"));
      }
      const d = new Date();
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    if (headLower === "unixtime") return String(Math.floor(Date.now() / 1000));
    if (headLower === "isotime") return new Date().toISOString().split("T")[1].split(".")[0];
    if (headLower === "isodate") return new Date().toISOString().split("T")[0];
    if (headLower === "idleduration") return "0";

    // --- Math ---
    if (["round", "floor", "ceil", "abs"].includes(headLower)) {
      const val = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
      return String(Math[headLower](val));
    }
    if (["min", "max"].includes(headLower)) {
      const vals = [];
      for(let i=1; i<parts.length; i++) vals.push(Number(await renderStandaloneCbsText(parts[i], runtime, args)) || 0);
      return String(Math[headLower](...vals));
    }
    if (["sum", "average"].includes(headLower)) {
      let sum = 0;
      let count = 0;
      for (let i = 1; i < parts.length; i++) {
        sum += Number(await renderStandaloneCbsText(parts[i], runtime, args)) || 0;
        count++;
      }
      if (headLower === "sum") return String(sum);
      return count === 0 ? "0" : String(sum / count);
    }
    if (headLower === "pow") {
      const b = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
      const e = Number(await renderStandaloneCbsText(parts[2] || "0", runtime, args)) || 0;
      return String(Math.pow(b, e));
    }
    if (headLower === "remaind") {
      const a = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
      const b = Number(await renderStandaloneCbsText(parts[2] || "1", runtime, args)) || 1;
      return String(a % b);
    }

    // --- String ---
    if (headLower === "replace") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const t = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      const r = await renderStandaloneCbsText(parts[3] || "", runtime, args);
      return s.split(t).join(r);
    }
    if (headLower === "lower") return (await renderStandaloneCbsText(parts[1] || "", runtime, args)).toLowerCase();
    if (headLower === "upper") return (await renderStandaloneCbsText(parts[1] || "", runtime, args)).toUpperCase();
    if (headLower === "trim") return (await renderStandaloneCbsText(parts[1] || "", runtime, args)).trim();
    if (headLower === "length") return String((await renderStandaloneCbsText(parts[1] || "", runtime, args)).length);
    if (headLower === "capitalize") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    if (headLower === "reverse") return (await renderStandaloneCbsText(parts[1] || "", runtime, args)).split("").reverse().join("");
    if (headLower === "br" || headLower === "newline") return "\n";
    if (headLower === "split") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const delim = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      return JSON.stringify(s.split(delim));
    }

    // --- Logic ---
    // Normalize CBS #when operator aliases to canonical names.
    // CBS syntax uses: is, isnot, >, <, >=, <= as operator tokens.
    // After #when reordering (A::op::B → op::A::B), the head becomes the op.
    const _opAlias = {
      "is": "equal", "==": "equal",
      "isnot": "notequal", "!=": "notequal",
      ">": "greater",
      ">=": "greaterequal",
      "<": "less",
      "<=": "lessequal",
    };
    const _resolvedOp = _opAlias[headLower] ?? headLower;
    if (["equal", "notequal", "greater", "greaterequal", "less", "lessequal"].includes(_resolvedOp)) {
      const v1 = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const v2 = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      const n1 = Number(v1), n2 = Number(v2);
      const isNum = !isNaN(n1) && !isNaN(n2);
      switch(_resolvedOp) {
        case "equal": return v1 === v2 ? "1" : "0";
        case "notequal": return v1 !== v2 ? "1" : "0";
        case "greater": return (isNum ? n1 > n2 : v1 > v2) ? "1" : "0";
        case "greaterequal": return (isNum ? n1 >= n2 : v1 >= v2) ? "1" : "0";
        case "less": return (isNum ? n1 < n2 : v1 < v2) ? "1" : "0";
        case "lessequal": return (isNum ? n1 <= n2 : v1 <= v2) ? "1" : "0";
      }
    }
    if (headLower === "and") {
      const v1 = isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const v2 = isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[2] || "", runtime, args));
      return (v1 && v2) ? "1" : "0";
    }
    if (headLower === "or") {
      const v1 = isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const v2 = isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[2] || "", runtime, args));
      return (v1 || v2) ? "1" : "0";
    }
    if (headLower === "not") {
      const v = isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      return (!v) ? "1" : "0";
    }
    if (headLower === "contains") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const sub = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      return s.includes(sub) ? "1" : "0";
    }
    if (headLower === "startswith") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const sub = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      return s.startsWith(sub) ? "1" : "0";
    }
    if (headLower === "endswith") {
      const s = await renderStandaloneCbsText(parts[1] || "", runtime, args);
      const sub = await renderStandaloneCbsText(parts[2] || "", runtime, args);
      return s.endsWith(sub) ? "1" : "0";
    }
    if (headLower === "all" || headLower === "any") {
      let truthyCount = 0;
      const argCount = Math.max(1, parts.length - 1);
      for (let i = 1; i < parts.length; i++) {
        if (isStandaloneCbsTruthy(await renderStandaloneCbsText(parts[i] || "", runtime, args))) truthyCount++;
      }
      if (headLower === "all") return truthyCount === argCount && argCount > 0 ? "1" : "0";
      return truthyCount > 0 ? "1" : "0";
    }

    // --- Array/Dict ---
    if (headLower === "makearray") {
      const arr = [];
      for(let i=1; i<parts.length; i++) arr.push(await renderStandaloneCbsText(parts[i], runtime, args));
      return JSON.stringify(arr);
    }
    if (headLower === "arrayelement" || headLower === "element") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const idx = parseInt(await renderStandaloneCbsText(parts[2] || "0", runtime, args), 10);
        const arr = JSON.parse(json);
        return String(arr[idx] ?? "null");
      } catch { return "null"; }
    }
    if (headLower === "arraylength") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        return String(JSON.parse(json).length);
      } catch { return "0"; }
    }
    if (headLower === "join") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const sep = await renderStandaloneCbsText(parts[2] || "", runtime, args);
        return JSON.parse(json).join(sep);
      } catch { return ""; }
    }
    if (headLower === "makedict") {
      const dict = {};
      for (let i = 1; i < parts.length; i++) {
        const pair = await renderStandaloneCbsText(parts[i], runtime, args);
        const eq = pair.indexOf("=");
        if (eq !== -1) {
          dict[pair.slice(0, eq)] = pair.slice(eq + 1);
        }
      }
      return JSON.stringify(dict);
    }
    if (headLower === "dictelement") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "{}", runtime, args);
        const key = await renderStandaloneCbsText(parts[2] || "", runtime, args);
        const dict = JSON.parse(json);
        return String(dict[key] ?? "null");
      } catch { return "null"; }
    }
    if (headLower === "range") {
      let start = 1, end = 0, step = 1;
      if (parts.length === 2) {
        end = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
      } else if (parts.length >= 4) {
        start = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
        end = Number(await renderStandaloneCbsText(parts[2] || "0", runtime, args)) || 0;
        step = Number(await renderStandaloneCbsText(parts[3] || "1", runtime, args)) || 1;
      }
      const arr = [];
      if (step > 0) {
        for (let i = start; i <= end; i += step) arr.push(i);
      } else if (step < 0) {
        for (let i = start; i >= end; i += step) arr.push(i);
      }
      return JSON.stringify(arr);
    }
    if (headLower === "arraypush") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const val = await renderStandaloneCbsText(parts[2] || "", runtime, args);
        const arr = JSON.parse(json);
        arr.push(val);
        return JSON.stringify(arr);
      } catch { return "[]"; }
    }
    if (headLower === "arraypop") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const arr = JSON.parse(json);
        arr.pop();
        return JSON.stringify(arr);
      } catch { return "[]"; }
    }
    if (headLower === "arrayshift") {
      try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const arr = JSON.parse(json);
        arr.shift();
        return JSON.stringify(arr);
      } catch { return "[]"; }
    }
    if (headLower === "filter") {
       try {
        const json = await renderStandaloneCbsText(parts[1] || "[]", runtime, args);
        const mode = await renderStandaloneCbsText(parts[2] || "all", runtime, args);
        const arr = JSON.parse(json);
        if (mode === "unique") return JSON.stringify([...new Set(arr)]);
        if (mode === "nonempty") return JSON.stringify(arr.filter(x => x !== "" && x !== null && x !== undefined));
        return JSON.stringify(arr);
      } catch { return "[]"; }
    }

    // --- RNG ---
    if (headLower === "randint") {
      const min = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
      const max = Number(await renderStandaloneCbsText(parts[2] || "100", runtime, args)) || 100;
      return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    if (headLower === "random") {
      const choices = parts.slice(1);
      // Per CBS guide: {{random}} with no args → float between 0 and 1
      if (choices.length === 0) return String(Math.random());
      const randIdx = Math.floor(Math.random() * choices.length);
      return await renderStandaloneCbsText(choices[randIdx], runtime, args);
    }

    if (headLower === "none") return "";
    if (headLower === "char_desc") return safeTrim(runtime?.char?.desc || runtime?.char?.description || "");
    if (headLower === "ujb" || headLower === "system_note") return safeTrim(runtime?.db?.globalNote || "");

    if (headLower === "dice" || headLower === "roll") {
       const xdy = await renderStandaloneCbsText(parts[1] || "1d6", runtime, args);
       const match = xdy.toLowerCase().match(/^(\d+)d(\d+)$/);
       if (match) {
         const X = parseInt(match[1], 10) || 1;
         const Y = parseInt(match[2], 10) || 6;
         const results = [];
         let sum = 0;
         for (let i = 0; i < X; i++) {
            const r = Math.floor(Math.random() * Y) + 1;
            results.push(r);
            sum += r;
         }
         return headLower === "dice" ? String(sum) : JSON.stringify(results);
       }
       return headLower === "dice" ? "0" : "[]";
    }
    if (headLower === "pick" || headLower === "rollp") {
       if (parts.length > 1) return await renderStandaloneCbsText(parts[1], runtime, args);
       return "";
    }
    if (headLower === "hash") {
       const str = await renderStandaloneCbsText(parts[1] || "", runtime, args);
       let hash = 0;
       for (let i = 0; i < str.length; i++) {
         const char = str.charCodeAt(i);
         hash = ((hash << 5) - hash) + char;
         hash = hash & hash;
       }
       return String(Math.abs(hash)).slice(0, 7).padStart(7, "0");
    }
    if (headLower === "xor" || headLower === "xordecrypt" || headLower === "crypt") {
       return await renderStandaloneCbsText(parts[1] || "", runtime, args);
    }
    if (headLower === "unicodeencode") {
       const str = await renderStandaloneCbsText(parts[1] || "", runtime, args);
       return str.length > 0 ? String(str.charCodeAt(0)) : "";
    }
    if (headLower === "unicodedecode") {
       const code = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args));
       return String.fromCharCode(code);
    }
    if (headLower === "tohex") {
       const num = Number(await renderStandaloneCbsText(parts[1] || "0", runtime, args)) || 0;
       return num.toString(16);
    }
    if (headLower === "fromhex") {
       const hex = await renderStandaloneCbsText(parts[1] || "0", runtime, args);
       return String(parseInt(hex, 16));
    }
    if (["asset", "image", "bg", "emotion", "audio", "video", "button", "tex", "ruby", "codeblock", "hiddenkey"].includes(headLower)) return "";
    if (headLower === "assetlist" || headLower === "emotionlist") return "[]";
    if (headLower === "moduleenabled") return "0";
    if (headLower === "prefillsupported") return "1";

    if (headLower === "call") {
      const fnName = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const fnBody = runtime.functions[fnName];
      if (!fnBody) return "";
      const callArgs = [];
      for (let i = 2; i < parts.length; i += 1) {
        callArgs.push(await renderStandaloneCbsText(parts[i], runtime, args));
      }
      return await renderStandaloneCbsText(fnBody, runtime, callArgs);
    }

    if (headLower === "varrule_max" || headLower === "varrule_min") {
      const key = safeTrim(await renderStandaloneCbsText(parts[1] || "", runtime, args));
      const limit = Number(await renderStandaloneCbsText(parts[2] || "", runtime, args));
      if (key && !isNaN(limit) && runtime.vars[key] !== undefined) {
        const current = Number(runtime.vars[key]);
        if (!isNaN(current)) {
          runtime.vars[key] = headLower === "varrule_max" ? Math.min(current, limit).toString() : Math.max(current, limit).toString();
        }
      }
      return "";
    }

    if (Object.prototype.hasOwnProperty.call(runtime.vars, expr)) {
      return runtime.vars[expr];
    }
    if (Object.prototype.hasOwnProperty.call(runtime.globalVars, expr)) {
      return runtime.globalVars[expr];
    }

    return expr;
  }

  async function renderStandaloneCbsText(text, runtime, args = []) {
    const src = String(text ?? "");
    if (!src || !src.includes("{{")) return src;
    let out = "";
    let cursor = 0;
    while (cursor < src.length) {
      const tag = findNextCbsTag(src, cursor);
      if (!tag) {
        out += src.slice(cursor);
        break;
      }
      out += src.slice(cursor, tag.start);
      const inner = safeTrim(tag.inner);

      if (inner.startsWith("//") || inner.startsWith("comment::")) {
        cursor = tag.end;
        continue;
      }

      if (inner.startsWith("#puredisplay")) {
        const block = extractCbsBlock(src, tag, "puredisplay");
        out += block.body;
        cursor = block.end;
        continue;
      }

      if (inner.startsWith("#func ")) {
        const fnName = safeTrim(inner.slice(6));
        const block = extractCbsBlock(src, tag, "func");
        if (fnName) runtime.functions[fnName] = block.body;
        cursor = block.end;
        continue;
      }

      if (inner.startsWith("#if ") || inner.startsWith("#if_pure ") || inner.startsWith("#when ") || inner.startsWith("#when::")) {
        const isWhen = inner.startsWith("#when");
        // #if_pure is a deprecated alias for #if (preserves whitespace, same logic here)
        const ifKeyword = inner.startsWith("#if_pure") ? "#if_pure" : inner.startsWith("#when") ? "#when" : "#if";
        const spaceIdx = inner.indexOf(" ");
        let conditionRaw = spaceIdx !== -1 ? inner.slice(spaceIdx + 1) : "";
        const block = extractCbsBlock(src, tag, isWhen ? "when" : "if");
        
        if (isWhen) {
          // Strip optional variant qualifiers: #when::keep or #when::legacy
          // These appear as "#when::keep A::op::B" or "#when::legacy A::op::B".
          // After the first "::keep" / "::legacy" token, the rest is the actual condition.
          if (conditionRaw.startsWith("keep ") || conditionRaw.startsWith("legacy ")) {
            conditionRaw = conditionRaw.slice(conditionRaw.indexOf(" ") + 1);
          }
          const wParts = splitTopLevelCbsByDoubleColon(conditionRaw).map(s => safeTrim(s));
          if (wParts.length === 3) {
            conditionRaw = `${wParts[1]}::${wParts[0]}::${wParts[2]}`;
          }
        }

        const condition = await evalStandaloneCbsExpr(conditionRaw, runtime, args);
        out += await renderStandaloneCbsText(
          isStandaloneCbsTruthy(condition) ? block.body : block.elseBody,
          runtime,
          args,
        );
        cursor = block.end;
        continue;
      }

      if (inner.startsWith("#unless ")) {
        const conditionRaw = inner.slice(8);
        const block = extractCbsBlock(src, tag, "unless");
        const condition = await evalStandaloneCbsExpr(conditionRaw, runtime, args);
        out += await renderStandaloneCbsText(
          isStandaloneCbsTruthy(condition) ? block.elseBody : block.body,
          runtime,
          args,
        );
        cursor = block.end;
        continue;
      }

      if (inner.startsWith("#each ") || inner.startsWith("#each::")) {
        const spaceIdx = inner.indexOf(" ");
        const eachContent = spaceIdx !== -1 ? inner.slice(spaceIdx + 1) : "";
        const block = extractCbsBlock(src, tag, "each");
        const eachParts = eachContent.split(/\s+as\s+/);
        const arrayRaw = await renderStandaloneCbsText(eachParts[0], runtime, args);
        const varName = safeTrim(eachParts[1] || "slot");
        try {
          const array = JSON.parse(arrayRaw);
          if (Array.isArray(array)) {
            for (const item of array) {
              const itemStr = typeof item === "string" ? item : JSON.stringify(item);
              const localVars = { ...runtime.vars, [varName]: itemStr, slot: itemStr };
              const localRuntime = { ...runtime, vars: localVars };
              out += await renderStandaloneCbsText(block.body, localRuntime, args);
            }
          }
        } catch {}
        cursor = block.end;
        continue;
      }

      if (
        inner === "else" ||
        inner === "/if" ||
        inner === "/when" ||
        inner === "/unless" ||
        inner === "/each" ||
        inner === "/func"
      ) {
        cursor = tag.end;
        continue;
      }

      out += await evalStandaloneCbsExpr(inner, runtime, args);
      cursor = tag.end;
    }
    return out;
  }

  async function normalizeAgentCbsText(text) {
    const src = String(text ?? "");
    if (!src || !src.includes("{{")) return src;
    
    // Add debug logging
    const hasComplexCBS = src.includes("#if") || src.includes("#when") || src.includes("#unless");
    if (hasComplexCBS) {
      try {
        await Risuai.log(`${LOG} Attempting to render CBS text (length: ${src.length})`);
      } catch {}
    }
    
    try {
      const runtime = await getStandaloneCbsRuntime();
      const rendered = await renderStandaloneCbsText(src, runtime, []);
      
      if (hasComplexCBS) {
        try {
          await Risuai.log(`${LOG} CBS render successful (output length: ${String(rendered).length})`);
        } catch {}
      }
      
      if (typeof rendered === "string") return rendered;
      if (rendered != null) return String(rendered);
    } catch (e) {
      try {
        await Risuai.log(
          `${LOG} standalone CBS render failed: ${e?.message || String(e)}`,
        );
        await Risuai.log(
          `${LOG} CBS source text: ${src.slice(0, 200)}${src.length > 200 ? '...' : ''}`,
        );
        await Risuai.log(
          `${LOG} Error stack: ${e?.stack || 'No stack trace'}`,
        );
      } catch {}
      // BUGFIX: Return original text instead of CBS markers when rendering fails
      // CBS markers like [CBS_IF:...] are not meant to be sent to LLM
      return src;
    }
    // This line should never be reached, but kept for safety
    return src;
  }

  async function normalizeLorebookEntryForAgent(entry) {
    if (!entry || typeof entry !== "object") return entry;
    const contentSource =
      typeof entry?.content === "string"
        ? entry.content
        : typeof entry?.prompt === "string"
          ? entry.prompt
          : "";
    return {
      ...entry,
      content: await normalizeAgentCbsText(contentSource),
      key: await normalizeAgentCbsText(entry?.key ?? entry?.keyword ?? ""),
      secondkey: await normalizeAgentCbsText(
        entry?.secondkey ?? entry?.secondary_keyword ?? "",
      ),
    };
  }

  async function normalizePromptMessagesForAgent(messages) {
    const list = Array.isArray(messages) ? messages : [];
    return await Promise.all(list.map(async (m) => {
      if (!m || typeof m !== "object") return m;
      if (typeof m.content !== "string" || !m.content.includes("{{")) return m;
      return {
        ...m,
        content: await normalizeAgentCbsText(m.content),
      };
    }));
  }

  function parseLorebookNames(raw) {
    return String(raw || "")
      .split(/[\n,]+/g)
      .map((s) => safeTrim(s))
      .filter((s) => !!s);
  }

  function parseTriggerKeys(raw) {
    if (Array.isArray(raw))
      return raw.map((k) => String(k || "").trim()).filter(Boolean);
    if (typeof raw === "string")
      return raw
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    return [];
  }

  function getPrimaryTriggerKeys(entry) {
    return parseTriggerKeys(
      entry?.keyword ?? entry?.keywords ?? entry?.key ?? entry?.keys,
    );
  }

  function getSecondaryTriggerKeys(entry) {
    return parseTriggerKeys(
      entry?.secondary_keyword ?? entry?.secondkey ?? entry?.secondKey,
    );
  }

  function hasPrimaryTriggerKey(entry) {
    return getPrimaryTriggerKeys(entry).length > 0;
  }

  function extractLorebookEntries(char) {
    if (!char || typeof char !== "object") return [];
    let entries = [];
    for (const key of [
      "globalLore",
      "lorebook",
      "loreBook",
      "lorebooks",
      "character_book",
      "characterBook",
    ]) {
      if (Array.isArray(char[key])) {
        entries = entries.concat(char[key]);
      } else if (char[key] && Array.isArray(char[key].entries)) {
        entries = entries.concat(char[key].entries);
      }
    }
    return entries;
  }

  async function getModuleLorebookEntries(char, chat) {
    try {
      if (
        toInt(configCache?.read_mod_lorebook, DEFAULTS.read_mod_lorebook) !== 1
      )
        return [];
      const db = await Risuai.getDatabase([
        "modules",
        "enabledModules",
        "moduleIntergration",
      ]);
      const modules = Array.isArray(db?.modules) ? db.modules : [];

      let ids = [];
      if (Array.isArray(db?.enabledModules))
        ids = ids.concat(db.enabledModules);
      if (Array.isArray(chat?.modules)) ids = ids.concat(chat.modules);
      if (Array.isArray(char?.modules)) ids = ids.concat(char.modules);
      if (safeTrim(db?.moduleIntergration)) {
        ids = ids.concat(
          String(db.moduleIntergration)
            .split(",")
            .map((s) => safeTrim(s)),
        );
      }

      const idSet = new Set(ids.map((x) => safeTrim(x)).filter(Boolean));
      if (idSet.size === 0) return [];

      const out = [];
      const used = new Set();
      for (const mod of modules) {
        const id = safeTrim(mod?.id || "");
        if (!id || !idSet.has(id) || used.has(id)) continue;
        used.add(id);
        if (Array.isArray(mod?.lorebook)) out.push(...mod.lorebook);
      }
      return out;
    } catch (e) {
      await Risuai.log(
        `${LOG} Warning: failed to read module lorebooks: ${e?.message || String(e)}`,
      );
      return [];
    }
  }

  async function getCombinedLorebookEntries(char, chat) {
    const charLore = extractLorebookEntries(char);
    const moduleLore = await getModuleLorebookEntries(char, chat);
    return charLore.concat(moduleLore);
  }

  async function getLorebookContextByNames(names) {
    const wanted = new Set(
      (names || []).map((x) => safeTrim(x)).filter(Boolean),
    );
    if (wanted.size === 0) return "";
    const { char, chat } = await getCurrentChatContextSafe();
    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = await getCombinedLorebookEntries(char, chat);

    const pool = [];

    for (const entry of charLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (!content) continue;
      const existingIdx = pool.findIndex((p) => p.name === name);
      if (existingIdx >= 0) {
        pool[existingIdx] = { name, content, source: "char" };
      } else {
        pool.push({ name, content, source: "char" });
      }
    }

    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (!content) continue;
      const existingIdx = pool.findIndex((p) => p.name === name);
      if (existingIdx >= 0) {
        pool[existingIdx] = { name, content, source: "local" };
      } else {
        pool.push({ name, content, source: "local" });
      }
    }

    return pool
      .map((p) => {
        const stripped = p.content.replace(
          /^<!-- written_at_turn: \d+ -->\n?/m,
          "",
        );
        return `[${p.name}]\n${stripped}`;
      })
      .join("\n\n");
  }

  function tokenizeForSearch(text) {
    return String(text || "")
      .toLowerCase()
      .split(/[^a-z0-9_\u4e00-\u9fff]+/g)
      .map((t) => t.trim())
      .filter((t) => t.length >= 2 || /[\u4e00-\u9fff]/.test(t));
  }

  function scoreTokens(queryTokens, targetTokens) {
    if (!queryTokens.length || !targetTokens.length) return 0;
    const q = new Set(queryTokens);
    const t = new Set(targetTokens);
    let hit = 0;
    for (const token of q) {
      if (t.has(token)) hit += 1;
    }
    return hit / Math.max(1, Math.sqrt(q.size * t.size));
  }

  function splitIntoParagraphChunks(content, maxChars = Infinity) {
    const src = String(content || "").trim();
    if (!src) return [];
    let bestLevel = -1;
    for (let level = 1; level <= 4; level++) {
      const hashes = "#".repeat(level);
      const regex = new RegExp(`(^|\\n)${hashes} `, "g");
      const matches = src.match(regex);
      const count = matches ? matches.length : 0;
      if (count >= 1) {
        if (count >= 2) bestLevel = level;
        break;
      }
    }
    let chunks = [src];
    if (bestLevel >= 1) {
      const hashes = "#".repeat(bestLevel);
      const splitRegex = new RegExp(`\\n(?=${hashes} )`, "g");
      chunks = src
        .split(splitRegex)
        .map((c) => c.trim())
        .filter(Boolean);
    }
    if (maxChars < Infinity) {
      const safeChunks = [];
      for (const c of chunks) safeChunks.push(...chunkTextSafely(c, maxChars));
      return safeChunks;
    }
    return chunks;
  }

  function normalizeEmbeddingUrl(baseUrl, format = "openai") {
    const clean = safeTrim(baseUrl).replace(/\/+$/, "");
    if (!clean) return "";
    const f = safeTrim(format || "openai").toLowerCase();
    if (f === "google") return clean;
    if (/\/embeddings$/i.test(clean)) return clean;
    return `${clean}/embeddings`;
  }

  function resolveEmbeddingRuntimeConfig() {
    const provider = safeTrim(
      configCache.embedding_provider ||
        DEFAULTS.embedding_provider ||
        "custom_api",
    );
    const preset =
      EMBEDDING_PROVIDER_PRESETS[provider] ||
      EMBEDDING_PROVIDER_PRESETS.custom_api;
    const format = safeTrim(
      provider !== "custom_api"
        ? preset.format
        : configCache.embedding_format || preset.format || "openai",
    ).toLowerCase();
    const selectedModel = safeTrim(configCache.embedding_model || "");
    const requestModel = safeTrim(
      configCache.embedding_request_model ||
        EMBEDDING_MODEL_TO_REQUEST[selectedModel] ||
        selectedModel ||
        preset.requestModel ||
        "",
    );
    const rawUrl =
      provider !== "custom_api"
        ? safeTrim(preset.url || "")
        : safeTrim(configCache.embedding_url || "");
    const url = normalizeEmbeddingUrl(rawUrl, format);
    const keyMap = parseSimpleStringMap(
      configCache.embedding_provider_key_map || "{}",
    );
    const apiKey = safeTrim(
      keyMap[provider] || configCache.embedding_key || "",
    );
    return {
      provider,
      preset,
      format,
      selectedModel,
      requestModel,
      url,
      apiKey,
    };
  }

  function parseEmbeddingListFromOpenAICompat(data) {
    const rows = Array.isArray(data?.data) ? data.data : [];
    const mapped = rows
      .map((row, idx) => {
        const vec = Array.isArray(row?.embedding)
          ? row.embedding
              .map((x) => Number(x))
              .filter((x) => Number.isFinite(x))
          : [];
        const order = Number.isFinite(Number(row?.index))
          ? Number(row.index)
          : idx;
        if (!vec.length) return null;
        return { order, vec };
      })
      .filter(Boolean)
      .sort((a, b) => a.order - b.order)
      .map((x) => x.vec);
    return mapped;
  }

  function cosineSimilarity(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length)
      return 0;
    const n = Math.min(a.length, b.length);
    let dot = 0;
    let aa = 0;
    let bb = 0;
    for (let i = 0; i < n; i++) {
      const x = Number(a[i]);
      const y = Number(b[i]);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      dot += x * y;
      aa += x * x;
      bb += y * y;
    }
    if (aa <= 0 || bb <= 0) return 0;
    const score = dot / (Math.sqrt(aa) * Math.sqrt(bb));
    if (!Number.isFinite(score)) return 0;
    return Math.max(-1, Math.min(1, score));
  }

  async function fetchEmbeddingVectorsRemote(texts, cfg, strict = false) {
    const runner = async () => {
      // Reset the last error tracker for this fresh attempt
      _lastEmbedErrorMsg = "";
      const input = Array.isArray(texts)
        ? texts.map((t) => String(t || ""))
        : [];
      if (!input.length) return [];

      const maxInputsPerBatch = getEmbeddingBatchInputLimit(cfg.requestModel);
      const maxTokensPerBatch = getEmbeddingBatchTokenLimit(cfg.requestModel);
      const perInputTokenLimit = getEmbeddingTokenLimit(cfg.requestModel);
      const estimateTokens = (t) =>
        Math.min(Math.ceil(String(t || "").length / 3), perInputTokenLimit);

      const batches = [];
      let currentBatch = [],
        currentTokens = 0;
      for (const item of input) {
        const est = estimateTokens(item);
        if (
          currentBatch.length > 0 &&
          (currentBatch.length >= maxInputsPerBatch ||
            currentTokens + est > maxTokensPerBatch)
        ) {
          batches.push(currentBatch);
          currentBatch = [];
          currentTokens = 0;
        }
        currentBatch.push(item);
        currentTokens += est;
      }
      if (currentBatch.length > 0) batches.push(currentBatch);

      const allVectors = [];
      await Risuai.log(
        `${LOG} [Embed] Start: provider=${cfg.provider}, model=${cfg.requestModel}, total=${input.length} → ${batches.length} batch(es)`,
      );

      for (let bi = 0; bi < batches.length; bi++) {
        if (bi > 0) await new Promise((r) => setTimeout(r, 1000));
        const batchInput = batches[bi];
        let batchVectors = [];
        const batchLabel = `batch ${bi + 1}/${batches.length}`;

        try {
          if (cfg.format === "google") {
            const baseUrl = String(cfg.url || "").replace(/\/+$/, "");
            const model = String(cfg.requestModel || cfg.selectedModel || "");
            if (!baseUrl || !model)
              throw new Error("Google Embedding: URL or model not configured");
            const queryUrl = `${baseUrl}/${model}:batchEmbedContents?key=${cfg.apiKey}`;
            const reqBody = {
              requests: batchInput.map((t) => ({
                model: `models/${model}`,
                content: { parts: [{ text: t }] },
              })),
            };
            await Risuai.log(
              `${LOG} [Embed] Google POST → ${queryUrl.replace(/key=[^&]+/, "key=***")}`,
            );
            const { res, via } = await fetchWithFallback(
              queryUrl,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody),
              },
              120000,
              `Embedding Google ${batchLabel}`,
              true,
            );
            await Risuai.log(
              `${LOG} [Embed] Google response via=${via}: status=${res.status}, ok=${res.ok}`,
            );
            if (!isResponseLike(res) || !res.ok) {
              const errTxt = await readResponseErrorText(res);
              throw new Error(
                `Google Embeddings HTTP ${res.status}: ${String(errTxt).slice(0, 300)}`,
              );
            }
            const data = await readResponseJson(res);
            batchVectors = (data?.embeddings || []).map((e) =>
              Array.isArray(e.values) ? e.values : [],
            );
            await Risuai.log(
              `${LOG} [Embed] Google parsed: got ${batchVectors.length} vectors`,
            );
          } else {
            const url = normalizeEmbeddingUrl(cfg.url, cfg.format);
            const model = safeTrim(cfg.requestModel || cfg.selectedModel || "");
            if (!url || !model)
              throw new Error(
                `Embedding: URL(${url}) or model(${model}) not configured`,
              );
            const headers = { "Content-Type": "application/json" };
            if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
            const reqBody = JSON.stringify({ input: batchInput, model });
            await Risuai.log(`${LOG} [Embed] OpenAI-Compat POST → ${url}`);
            const { res, via } = await fetchWithFallback(
              url,
              { method: "POST", headers, body: reqBody },
              120000,
              `Embedding ${batchLabel}`,
              true,
            );
            await Risuai.log(
              `${LOG} [Embed] OpenAI-Compat response via=${via}: status=${res.status}, ok=${res.ok}`,
            );
            if (!isResponseLike(res) || !res.ok) {
              const errTxt = await readResponseErrorText(res);
              throw new Error(
                `Embeddings HTTP ${res.status}: ${String(errTxt).slice(0, 300)}`,
              );
            }
            const data = await readResponseJson(res);
            batchVectors = parseEmbeddingListFromOpenAICompat(data);
            await Risuai.log(
              `${LOG} [Embed] OpenAI-Compat parsed: got ${batchVectors.length} vectors`,
            );
          }
          if (
            batchVectors.length !== batchInput.length ||
            batchVectors.some((v) => !Array.isArray(v) || !v.length)
          ) {
            throw new Error(
              `${batchLabel} vector count mismatch (got ${batchVectors.length}, expected ${batchInput.length})`,
            );
          }
          allVectors.push(...batchVectors);
        } catch (e) {
          const embedErrMsg = e?.message || String(e);
          console.error(`${LOG} Embedding ${batchLabel} failed:`, e);
          await Risuai.log(
            `${LOG} [Embed] ❌ ${batchLabel} failed: ${embedErrMsg}`,
          );
          // Store the real error so callers can surface a meaningful message
          _lastEmbedErrorMsg = `[Embedding ${batchLabel}] ${embedErrMsg}`;
          if (strict) throw e;
          for (let j = 0; j < batchInput.length; j++) allVectors.push([]);
          break;
        }
      }
      while (allVectors.length < input.length) allVectors.push([]);
      await Risuai.log(
        `${LOG} [Embed] Complete: ${allVectors.filter((v) => v && v.length).length}/${input.length} succeeded`,
      );
      if (strict && allVectors.some((v) => !Array.isArray(v) || !v.length)) {
        throw new Error("Embedding vectors missing after strict embed run.");
      }
      return allVectors;
    };

    if (toInt(configCache.embedding_concurrency, 1) === 0)
      return await mutexEmbed.run(runner);
    return await runner();
  }

  async function getEmbeddingsForTexts(texts, skipCache = false) {
    const input = Array.isArray(texts) ? texts.map((t) => String(t || "")) : [];
    if (!input.length) return [];
    const cfg = resolveEmbeddingRuntimeConfig();
    const out = new Array(input.length).fill(null);
    const misses = [];
    for (let i = 0; i < input.length; i++) {
      const txt = input[i];
      const cacheKey = `${cfg.provider}|${cfg.format}|${cfg.url}|${cfg.requestModel}|${simpleHash(txt)}`;
      if (!skipCache && embeddingVectorCache.has(cacheKey)) {
        out[i] = embeddingVectorCache.get(cacheKey);
      } else {
        misses.push({ i, txt, cacheKey });
      }
    }
    if (misses.length) {
      const vectors = await fetchEmbeddingVectorsRemote(
        misses.map((x) => x.txt),
        cfg,
      );
      for (let m = 0; m < misses.length; m++) {
        const vec = vectors[m];
        if (!Array.isArray(vec) || !vec.length) continue;
        const idx = misses[m].i;
        out[idx] = vec;
        if (!skipCache) {
          embeddingVectorCache.set(misses[m].cacheKey, vec);
          if (embeddingVectorCache.size > 1000) {
            embeddingVectorCache.delete(
              embeddingVectorCache.keys().next().value,
            );
          }
        }
      }
    }
    if (out.some((v) => !Array.isArray(v) || !v.length)) {
      const rootCause = _lastEmbedErrorMsg
        ? ` Cause: ${_lastEmbedErrorMsg}`
        : " Check your embedding model configuration and API key.";
      throw new Error(`Embedding request failed — some vectors could not be retrieved.${rootCause}`);
    }
    return out;
  }

  async function getLorebookContextByVector(
    names,
    conversationMessages,
    forceAll = false,
  ) {
    const wanted = new Set(
      (names || []).map((x) => safeTrim(x)).filter(Boolean),
    );
    if (wanted.size === 0) return "";

    const topK = Math.max(
      1,
      toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k),
    );
    const minScore = Number(configCache.vector_search_min_score) || 0;
    const queryRounds = Math.max(
      1,
      toInt(
        configCache.vector_search_query_dialogue_rounds,
        DEFAULTS.vector_search_query_dialogue_rounds,
      ),
    );

    const recentMsgs = (conversationMessages || [])
      .filter(
        (m) => m.role === "user" || m.role === "assistant" || m.role === "char",
      )
      .slice(-Math.max(1, queryRounds * 2));
    const convText = recentMsgs.map((m) => String(m.content || "")).join("\n");
    const nameText = (Array.isArray(names) ? names : [])
      .map((x) => String(x || ""))
      .join(" ");
    const queryText = `${nameText}\n${convText}`.trim() || " ";

    const { char, chat } = await getCurrentChatContextSafe();
    const gNoteData = await getGlobalNoteDataCached(char);

    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = await getCombinedLorebookEntries(char, chat);
    const localMap = new Map();

    const stripLoreHeaders = (raw) =>
      String(raw || "")
        .replace(/^## [^\n]*\n/m, "")
        .replace(/^<!-- written_at_turn: \d+ -->\n?/m, "")
        .trim();

    for (const entry of charLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = stripLoreHeaders(entry?.content);
      const alwaysActive =
        entry?.alwaysActive === true ||
        String(entry?.alwaysActive) === "true" ||
        entry?.constant === true ||
        String(entry?.constant) === "true";
      if (name && content)
        localMap.set(name, { content, isDynamic: false, alwaysActive });
    }
    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = stripLoreHeaders(entry?.content);
      if (name && content)
        localMap.set(name, {
          content,
          isDynamic: true,
          alwaysActive: entry?.alwaysActive === true,
        });
    }

    const embedCfg = resolveEmbeddingRuntimeConfig();

    const pool = [];
    for (const [name, data] of localMap.entries()) {
      const candidates = splitIntoParagraphChunks(data.content).map(
        (chunk, idx) => ({
          name: `lorebook:${name}#${idx + 1}`,
          content: chunk,
          cacheType: "lorebook",
          isDynamic: data.isDynamic,
          alwaysActive: forceAll ? true : data.alwaysActive,
        }),
      );
      pool.push(...candidates);
    }
    if (!pool.length) return "";

    const activePool = pool.filter((p) => p.alwaysActive);
    const inactivePool = pool.filter((p) => !p.alwaysActive);

    try {
      let topInactiveList = [];

      if (inactivePool.length > 0) {
        const charName = safeTrim(char?.name || "Character");
        const cardKey = await getActiveCardKey(char);
        const store = await loadEmbeddingCacheStore();
        const cardBlock = store.cards?.[cardKey];

        const [queryVec] = await getEmbeddingsForTexts([queryText], true);
        const vectors = new Array(inactivePool.length).fill(null);
        const misses = [];

        for (let i = 0; i < inactivePool.length; i++) {
          const item = inactivePool[i];
          const key = `${item.cacheType || "unknown"}|${simpleHash(`${item.name}\n${item.content}`)}`;
          const hit = !item.isDynamic ? cardBlock?.entries?.[key] : null;
          const vec = Array.isArray(hit?.vector)
            ? hit.vector.map((x) => Number(x)).filter((x) => Number.isFinite(x))
            : [];
          if (vec.length) {
            vectors[i] = vec;
          } else {
            misses.push({
              index: i,
              text: `${item.name}\n${item.content}`,
              key,
              item,
            });
          }
        }
        if (misses.length) {
          let newlyAdded = false;
          const remoteVectors = await fetchEmbeddingVectorsRemote(
            misses.map((x) => x.text),
            embedCfg,
          );
          for (let i = 0; i < misses.length; i++) {
            const vec = Array.isArray(remoteVectors[i]) ? remoteVectors[i] : [];
            if (!vec.length) continue;
            const miss = misses[i];
            vectors[miss.index] = vec;

            if (!miss.item.isDynamic) {
              upsertEmbeddingCacheEntry(
                store,
                cardKey,
                charName,
                miss.key,
                {
                  sourceType: miss.item.cacheType,
                  name: miss.item.name,
                  textHash: simpleHash(miss.text),
                  dims: vec.length,
                  vector: vec,
                },
                embedCfg.requestModel,
              );
              newlyAdded = true;
            } else {
              const memoryCacheKey = `${embedCfg.provider}|${embedCfg.format}|${embedCfg.url}|${embedCfg.requestModel}|${simpleHash(miss.text)}`;
              embeddingVectorCache.set(memoryCacheKey, vec);
              if (embeddingVectorCache.size > 1000) {
                embeddingVectorCache.delete(
                  embeddingVectorCache.keys().next().value,
                );
              }
            }
          }
          if (newlyAdded) await saveEmbeddingCacheStore();
        }

        const scored = inactivePool
          .map((item, idx) => ({
            ...item,
            score: cosineSimilarity(queryVec, vectors[idx]),
          }))
          .filter((x) => Number.isFinite(x.score))
          .sort((a, b) => b.score - a.score);
        const pickGroup = (group) => {
          const valid = group.filter((x) => x.score >= minScore);
          return valid.length
            ? valid.slice(0, topK)
            : group.filter((x) => x.score >= 0).slice(0, topK);
        };
        topInactiveList = [
          ...pickGroup(scored.filter((x) => !x.isDynamic)),
          ...pickGroup(scored.filter((x) => x.isDynamic)),
        ];
      }

      const finalListText = [];
      for (const item of activePool) {
        finalListText.push(`[${item.name}]\n${item.content}`);
      }
      for (const item of topInactiveList) {
        finalListText.push(
          `[${item.name}] (score=${item.score.toFixed(3)})\n${item.content}`,
        );
      }

      return finalListText.join("\n\n");
    } catch (e) {
      const embedErrMsg = e?.message || String(e);
      try {
        await Risuai.log(
          `${LOG} ⚠️ Vector lorebook search failed (falling back to keyword): ${embedErrMsg}`,
        );
      } catch {}
      // Record so the user has a trace even without opening logs
      try {
        await Risuai.safeLocalStorage.setItem(
          LAST_SYNC_ERROR_KEY,
          `Vector lorebook search failed — keyword fallback active. Cause: ${embedErrMsg}`,
        );
      } catch {}
      return await getLorebookContextByNames(names);
    }
  }

  async function getPersonaContextByVector(
    conversationMessages,
    char,
    filterNames = [],
  ) {
    const topK = Math.max(
      1,
      toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k),
    );
    const minScore = Number(configCache.vector_search_min_score) || 0;
    const queryRounds = Math.max(
      1,
      toInt(
        configCache.vector_search_query_dialogue_rounds,
        DEFAULTS.vector_search_query_dialogue_rounds,
      ),
    );

    const recentMsgs = (conversationMessages || [])
      .filter(
        (m) => m.role === "user" || m.role === "assistant" || m.role === "char",
      )
      .slice(-Math.max(1, queryRounds * 2));
    const convText = recentMsgs.map((m) => String(m.content || "")).join("\n");
    const queryText = convText.trim() || " ";

    const cardKey = await getActiveCardKey(char);
    const cache = await loadPersonaCache(cardKey);
    let entries = Object.values(cache.entries || {});
    const filters = (filterNames || [])
      .map((x) => safeTrim(x).toLowerCase())
      .filter(Boolean);
    if (filters.length > 0) {
      entries = entries.filter((e) => {
        const name = String(e?.name || "").toLowerCase();
        return filters.some((f) => name.includes(f));
      });
    }
    if (entries.length === 0) return "";

    let queryVec;
    try {
      [queryVec] = await getEmbeddingsForTexts([queryText], true);
    } catch (e) {
      throw new Error(
        `Persona vector search failed — could not embed query text. ${e?.message || String(e)}`,
      );
    }
    const store = await loadEmbeddingCacheStore();
    const vectors = new Array(entries.length).fill(null);
    const missing = [];
    const missingIdx = [];

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const cacheKey = `persona|${entry.textHash}`;
      const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
      if (hit && Array.isArray(hit.vector) && hit.vector.length)
        vectors[i] = hit.vector;
      else {
        missing.push(entry);
        missingIdx.push(i);
      }
    }

    if (missing.length > 0) {
      const cfg = resolveEmbeddingRuntimeConfig();
      const batchSize = getEmbeddingBatchSize(cfg.requestModel);
      for (let i = 0; i < missing.length; i += batchSize) {
        const batch = missing.slice(i, i + batchSize);
        let vecs;
        try {
          vecs = await fetchEmbeddingVectorsRemote(
            batch.map((x) => x.text),
            cfg,
          );
        } catch (e) {
          throw new Error(
            `Persona vector indexing failed — could not embed persona entries. ${e?.message || String(e)}`,
          );
        }
        let newlyAdded = false;
        for (let j = 0; j < batch.length; j++) {
          const vec = vecs[j];
          if (vec && vec.length) {
            const idx = missingIdx[i + j];
            vectors[idx] = vec;
            const entry = batch[j];
            upsertEmbeddingCacheEntry(
              store,
              cardKey,
              safeTrim(char?.name || "Character"),
              `persona|${entry.textHash}`,
              {
                sourceType: "persona",
                name: entry.name,
                textHash: entry.textHash,
                dims: vec.length,
                vector: vec,
                text: entry.text,
              },
              cfg.requestModel,
            );
            newlyAdded = true;
          }
        }
        if (newlyAdded) await saveEmbeddingCacheStore(store);
      }
    }

    const scored = [];
    for (let i = 0; i < entries.length; i++) {
      if (vectors[i])
        scored.push({
          entry: entries[i],
          score: cosineSimilarity(queryVec, vectors[i]),
        });
    }
    scored.sort((a, b) => b.score - a.score);
    const topEntries = scored
      .filter((x) => x.score >= minScore)
      .slice(0, topK)
      .map((x) => x.entry);
    if (topEntries.length === 0) return "";
    return topEntries.map((e) => `[${e.name}]\n${e.text}`).join("\n\n");
  }

  function limitConversationByRounds(baseMessages, rounds) {
    const r = toInt(rounds, 4);
    if (r === 0) return baseMessages || [];
    return (baseMessages || []).slice(-Math.max(1, r * 2));
  }

  function trimAfterLastUser(messages) {
    const arr = Array.isArray(messages) ? messages : [];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i]?.role === "user") return arr.slice(0, i + 1);
    }
    return arr;
  }

  function trimAfterLastUserBeforeSystem(messages) {
    const arr = Array.isArray(messages) ? messages : [];
    for (let i = arr.length - 2; i >= 0; i--) {
      if (arr[i]?.role === "user" && arr[i + 1]?.role === "system") {
        return arr.slice(0, i + 1);
      }
    }
    return trimAfterLastUser(arr);
  }

  function findLastUserOrCharBeforeSystemIndex(messages) {
    const arr = Array.isArray(messages) ? messages : [];
    for (let i = arr.length - 2; i >= 0; i--) {
      const role = arr[i]?.role;
      if ((role === "user" || role === "char") && arr[i + 1]?.role === "system")
        return i;
    }
    return -1;
  }

  function buildKnowledgeWrappedContent(sectionTag, text) {
    const body = String(text || "").trim();
    if (!body) return "";
    return `<${KNOWLEDGE_BLOCK_TAG}>\n[SECTION:${sectionTag}]\n${body}\n[END_SECTION:${sectionTag}]\n</${KNOWLEDGE_BLOCK_TAG}>`;
  }

  function getKnowledgeSectionTagFromMessage(message) {
    const content = String(message?.content || "");
    const m = content.match(/\[SECTION:([A-Z_]+)\]/);
    return m ? m[1] : "";
  }

  function computeExpectedInsertions(base, hasBlock1, hasBlock2, hasBlock3) {
    const arr = Array.isArray(base) ? base : [];
    const firstSystemIdx = arr.findIndex((m) => m?.role === "system");
    const lastSystemIdx = (() => {
      for (let i = arr.length - 1; i >= 0; i--)
        if (arr[i]?.role === "system") return i;
      return -1;
    })();
    const worldBoundaryIdx = findLastUserOrCharBeforeSystemIndex(arr);

    const inserts = [];
    if (hasBlock1)
      inserts.push({
        kind: KNOWLEDGE_SECTION_TAGS.rp_instruction,
        target: firstSystemIdx >= 0 ? firstSystemIdx + 1 : 0,
        order: 1,
      });
    if (hasBlock2)
      inserts.push({
        kind: KNOWLEDGE_SECTION_TAGS.information,
        target: worldBoundaryIdx >= 0 ? worldBoundaryIdx + 1 : arr.length,
        order: 2,
      });
    if (hasBlock3)
      inserts.push({
        kind: KNOWLEDGE_SECTION_TAGS.output_format,
        target: lastSystemIdx >= 0 ? lastSystemIdx + 1 : arr.length,
        order: 3,
      });
    inserts.sort((a, b) =>
      a.target === b.target ? a.order - b.order : a.target - b.target,
    );
    return inserts;
  }

  function validateKnowledgeInjectionLayout(base, injected, expectedInserts) {
    const out = Array.isArray(injected) ? injected : [];
    const knowledgeMsgs = out.filter(
      (m) =>
        m?.role === "system" &&
        String(m?.content || "").startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`),
    );
    if (knowledgeMsgs.length !== expectedInserts.length) return false;

    const seen = new Set();
    const expectedKinds = new Set(expectedInserts.map((x) => x.kind));
    for (const m of knowledgeMsgs) {
      const k = getKnowledgeSectionTagFromMessage(m);
      if (!k || !expectedKinds.has(k) || seen.has(k)) return false;
      seen.add(k);
    }

    let offset = 0;
    for (const expected of expectedInserts) {
      const idx = Math.max(
        0,
        Math.min(out.length - 1, expected.target + offset),
      );
      const msg = out[idx];
      if (
        !(
          msg?.role === "system" &&
          String(msg?.content || "").startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`)
        )
      )
        return false;
      const actualKind = getKnowledgeSectionTagFromMessage(msg);
      if (actualKind !== expected.kind) return false;
      offset += 1;
    }
    return true;
  }

  function stableMessageHash(messages) {
    const normalized = (Array.isArray(messages) ? messages : []).map((m) => ({
      role: String(m?.role || ""),
      content: String(m?.content || ""),
    }));
    return simpleHash(JSON.stringify(normalized));
  }

  function injectKnowledgeByPlacementRules(
    cleanInput,
    { block1, block2, block3 },
    charScope,
  ) {
    const base = Array.isArray(cleanInput) ? cleanInput : [];
    const block1Text = safeTrim(block1);
    const block2Text = safeTrim(block2);
    const block3Text = safeTrim(block3);
    const expected = computeExpectedInsertions(
      base,
      !!block1Text,
      !!block2Text,
      !!block3Text,
    );

    if (!expected.length) return base;

    const msgByKind = new Map();
    if (block1Text)
      msgByKind.set(KNOWLEDGE_SECTION_TAGS.rp_instruction, {
        role: "system",
        content: buildKnowledgeWrappedContent(
          KNOWLEDGE_SECTION_TAGS.rp_instruction,
          block1Text,
        ),
      });
    if (block2Text)
      msgByKind.set(KNOWLEDGE_SECTION_TAGS.information, {
        role: "system",
        content: buildKnowledgeWrappedContent(
          KNOWLEDGE_SECTION_TAGS.information,
          block2Text,
        ),
      });
    if (block3Text)
      msgByKind.set(KNOWLEDGE_SECTION_TAGS.output_format, {
        role: "system",
        content: buildKnowledgeWrappedContent(
          KNOWLEDGE_SECTION_TAGS.output_format,
          block3Text,
        ),
      });

    const out = [...base];
    let offset = 0;
    for (const ins of expected) {
      const pos = Math.max(0, Math.min(out.length, ins.target + offset));
      const msg = msgByKind.get(ins.kind);
      if (!msg) continue;
      out.splice(pos, 0, msg);
      offset += 1;
    }

    const baseHash = stableMessageHash(base);
    const scopedBaseHash = charScope ? `${charScope}|${baseHash}` : baseHash;
    if (validateKnowledgeInjectionLayout(base, out, expected)) {
      lastValidInjectionByBaseHash.set(scopedBaseHash, out);
      if (lastValidInjectionByBaseHash.size > 20) {
        const oldestKey = lastValidInjectionByBaseHash.keys().next().value;
        if (oldestKey) lastValidInjectionByBaseHash.delete(oldestKey);
      }
      return out;
    }

    const fallback = lastValidInjectionByBaseHash.get(scopedBaseHash);
    return Array.isArray(fallback) ? fallback : base;
  }

  function buildModelMessages(
    systemContent,
    userContent,
    prefillPrompt,
    normalModeTail = "",
  ) {
    const systemText = safeTrim(systemContent);
    const userText = safeTrim(userContent);
    const prefillText = safeTrim(prefillPrompt);
    const tailText = safeTrim(normalModeTail);
    const messages = [];

    if (systemText) messages.push({ role: "system", content: systemText });

    if (prefillText) {
      messages.push({ role: "user", content: userText || "Continue." });
      messages.push({ role: "assistant", content: prefillText });
      return messages;
    }

    const fallbackUser = [userText, tailText]
      .filter((s) => !!safeTrim(s))
      .join("\n\n");
    messages.push({ role: "user", content: fallbackUser || "Continue." });
    return messages;
  }

  function buildExtractorMessages(baseMessages, modelCall, loreContext = "") {
    const target = modelCall.target_model === "B" ? "B" : "A";
    const modelAnchor = safeTrim(configCache.advanced_model_anchor_prompt);
    const prefillPrompt = safeTrim(configCache.advanced_prefill_prompt);
    const prereplyPrompt = safeTrim(configCache.advanced_prereply_prompt);
    const blockEntries = modelCall.entries || [];

    if (blockEntries.length === 0) return baseMessages;
    const allKeys = blockEntries.map(
      (e) => normalizeOutputEntry(e, target).lorebook_name,
    );
    const exampleStructure = `{ ${allKeys.map((k) => `"${k}": "..."`).join(", ")} }`;
    const blockText = [
      `### TASK: EXTRACT DATA BLOCKS FOR ${target.toUpperCase()}`,
      `GOAL: Analyze the "Recent RP History" and populate ALL ${blockEntries.length} lorebook entries listed below.`,
      `CRITICAL RULE: Return EXACTLY ONE raw JSON object containing ALL ${blockEntries.length} keys. NO markdown, NO codeblocks, NO preamble. Do NOT stop after the first key.`,
      `OUTPUT FORMAT (must contain all keys): ${exampleStructure}`,
      `--- TARGET BLOCKS ---`,
      ...blockEntries.map((e, i) => {
        const x = normalizeOutputEntry(e, target);
        const formatText = String(x.output_format || "(free text)");
        return `[BLOCK ${i + 1}]\n- lorebook_name: ${x.lorebook_name}\n- write_mode: ${x.write_mode}\n- VALUE_FORMAT:\n${formatText}`;
      }),
      `--- END OF BLOCKS ---`,
    ].join("\n");

    const systemContent = [modelAnchor, blockText, loreContext || ""]
      .filter((s) => !!safeTrim(s))
      .join("\n\n");
    const chatHistoryText = (baseMessages || [])
      .map(
        (m) => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`,
      )
      .join("\n");
    const userContent = `### Recent RP History:\n${chatHistoryText}`;

    const assistantPrefill = prefillPrompt
      ? [prefillPrompt, prereplyPrompt].filter((s) => !!safeTrim(s)).join("\n")
      : "";

    return buildModelMessages(
      systemContent,
      userContent,
      assistantPrefill,
      prereplyPrompt,
    );
  }

  function defaultOutputEntry(target) {
    return {
      lorebook_name: target === "A" ? "PSE Memory A" : "PSE Memory B",
      write_mode: "append",
      always_active: false,
      output_format: "",
    };
  }

  function normalizeOutputEntry(entry, target) {
    const d = defaultOutputEntry(target);
    const retentionEnabled =
      entry?.retention_enabled === true ||
      entry?.retention_enabled === "true" ||
      entry?.retention_enabled === 1;
    const retentionAfter = Math.max(0, toInt(entry?.retention_after, 0));
    const retentionKeep = Math.max(0, toInt(entry?.retention_keep, 5));
    return {
      lorebook_name: safeTrim(entry?.lorebook_name) || d.lorebook_name,
      write_mode:
        safeTrim(entry?.write_mode) === "overwrite" ? "overwrite" : "append",
      always_active:
        entry?.always_active === true ||
        entry?.always_active === "1" ||
        entry?.always_active === 1 ||
        String(entry?.always_active) === "true",
      output_format: String(entry?.output_format ?? d.output_format),
      retention_enabled: retentionEnabled,
      retention_after: retentionAfter,
      retention_keep: retentionKeep,
    };
  }

  function parseOutputEntries(raw, target) {
    const d = defaultOutputEntry(target);
    if (!raw) return [d];
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!Array.isArray(parsed) || parsed.length === 0) return [d];
      return parsed
        .map((x) => normalizeOutputEntry(x, target))
        .filter((x) => !!x.lorebook_name);
    } catch {
      return [d];
    }
  }

  function normalizeModelCall(call, index = 0) {
    const target = safeTrim(call?.target_model) === "B" ? "B" : "A";
    const nameFallback =
      index === 0
        ? _T.callnote_a
        : index === 1
          ? _T.callnote_b
          : _T.callnote_n(index + 1);
    const every = Math.max(1, toInt(call?.every_n_turns, 1));
    const readRounds = Math.max(0, toInt(call?.read_dialogue_rounds, 4));
    const entries = parseOutputEntries(call?.entries, target);
    return {
      id: safeTrim(call?.id) || `call_${Date.now()}_${index}`,
      name: safeTrim(call?.name) || nameFallback,
      target_model: target,
      every_n_turns: every,
      read_dialogue_rounds: readRounds,
      read_lorebook_names: String(call?.read_lorebook_names ?? ""),
      read_persona_names: String(call?.read_persona_names ?? ""),
      entries,
    };
  }

  function parseModelCalls(raw) {
    const defaultCalls = (() => {
      try {
        const base = Array.isArray(DEFAULT_MODEL_CALLS)
          ? DEFAULT_MODEL_CALLS
          : typeof DEFAULT_MODEL_CALLS === "string"
            ? JSON.parse(DEFAULT_MODEL_CALLS)
            : [];
        if (!Array.isArray(base)) return [];
        return base.map((x, i) => normalizeModelCall(x, i));
      } catch {
        return [];
      }
    })();

    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!Array.isArray(parsed)) return defaultCalls;
      if (parsed.length === 0) return [];
      const normalized = parsed.map((x, i) => normalizeModelCall(x, i));
      return normalized;
    } catch {
      return defaultCalls;
    }
  }

  function parsePersonaCalls(raw) {
    const defaultCalls = (() => {
      try {
        const base = Array.isArray(DEFAULT_PERSONA_CALLS)
          ? DEFAULT_PERSONA_CALLS
          : typeof DEFAULT_PERSONA_CALLS === "string"
            ? JSON.parse(DEFAULT_PERSONA_CALLS)
            : [];
        if (!Array.isArray(base)) return [];
        return base.map((x, i) => normalizeModelCall(x, i));
      } catch {
        return [];
      }
    })();

    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!Array.isArray(parsed)) return defaultCalls;
      if (parsed.length === 0) return [];
      const normalized = parsed.map((x, i) => normalizeModelCall(x, i));
      return normalized;
    } catch {
      return defaultCalls;
    }
  }

  function validateImportedCallArray(rawCalls) {
    if (!Array.isArray(rawCalls)) {
      throw new Error("calls must be an array");
    }

    rawCalls.forEach((call, callIndex) => {
      if (!isPlainObject(call)) {
        throw new Error(`call ${callIndex + 1} must be an object`);
      }
      const entries = call.entries;
      if (!Array.isArray(entries) || entries.length === 0) {
        throw new Error(`call ${callIndex + 1} must include entries`);
      }
      entries.forEach((entry, entryIndex) => {
        if (!isPlainObject(entry)) {
          throw new Error(
            `call ${callIndex + 1} entry ${entryIndex + 1} must be an object`,
          );
        }
        if (!safeTrim(entry.lorebook_name || "")) {
          throw new Error(
            `call ${callIndex + 1} entry ${entryIndex + 1} is missing lorebook_name`,
          );
        }
        if (entry.write_mode !== undefined) {
          const mode = safeTrim(entry.write_mode);
          if (mode !== "append" && mode !== "overwrite") {
            throw new Error(
              `call ${callIndex + 1} entry ${entryIndex + 1} has invalid write_mode`,
            );
          }
        }
        if (
          entry.output_format !== undefined &&
          typeof entry.output_format !== "string"
        ) {
          throw new Error(
            `call ${callIndex + 1} entry ${entryIndex + 1} has invalid output_format`,
          );
        }
      });
    });
  }

  function parseImportedCallPayload(rawText, expectedMode) {
    let parsed;
    try {
      parsed = JSON.parse(String(rawText || ""));
    } catch {
      throw new Error("invalid_json");
    }

    let mode = expectedMode;
    let calls = parsed;
    if (isPlainObject(parsed) && Array.isArray(parsed.calls)) {
      calls = parsed.calls;
      mode = safeTrim(parsed.mode || mode || "");
    }

    if (expectedMode && mode && mode !== expectedMode) {
      const err = new Error("invalid_mode");
      err.code = "invalid_mode";
      throw err;
    }

    validateImportedCallArray(calls);
    return calls.map((call, index) => normalizeModelCall(call, index));
  }

  function getModelCalls() {
    const preset = toInt(configCache.active_preset, 1);
    const raw =
      preset === 4
        ? configCache.model_calls_4
        : preset === 3
          ? configCache.model_calls_3
          : preset === 2
            ? configCache.model_calls_2
            : configCache.model_calls;
    return parseModelCalls(raw);
  }
  function getModelCallsByPreset(preset) {
    const p = String(preset || "1");
    if (p === "4") return parseModelCalls(configCache.model_calls_4);
    if (p === "3") return parseModelCalls(configCache.model_calls_3);
    if (p === "2") return parseModelCalls(configCache.model_calls_2);
    return parseModelCalls(configCache.model_calls);
  }
  function isModelCallDue(call, roundIndex) {
    const n = Math.max(1, toInt(call?.every_n_turns, 1));
    return roundIndex % n === 0;
  }

  async function buildScopedExtractorMessages(
    baseConversation,
    modelCall,
    char,
    usePersonaContext = false,
  ) {
    const rounds = Math.max(0, toInt(modelCall?.read_dialogue_rounds, 4));
    const scopedConversation = limitConversationByRounds(
      baseConversation,
      rounds,
    );
    const loreNames = parseLorebookNames(modelCall?.read_lorebook_names || "");
    let loreContext = "";
    if (loreNames.length > 0) {
      if (isKbFeatureEnabled() && configCache.vector_search_enabled === 1) {
        loreContext = await getLorebookContextByVector(
          loreNames,
          scopedConversation,
          true,
        );
        if (!safeTrim(loreContext))
          loreContext = await getLorebookContextByNames(loreNames);
      } else {
        loreContext = await getLorebookContextByNames(loreNames);
      }
    }

    if (loreNames.includes("rp_scene_principles")) {
      const hasPrinciples = loreContext.includes("[rp_scene_principles]");
      if (!hasPrinciples) {
        const degradeNote = `[rp_scene_principles]\n{"_status":"not_yet_available","note":"Scene principles have not been generated yet. Use scene_type, tension_level, and character persona attributes directly to guide facet_routing and beat_order. Do NOT wait for or reference principles — proceed with best-effort defaults."}`;
        loreContext = loreContext
          ? loreContext + "\n\n" + degradeNote
          : degradeNote;
      }
    }
    let personaContext = "";
    const personaNames = parseLorebookNames(
      modelCall?.read_persona_names || "",
    );
    if (usePersonaContext && isNewPresetEnabled()) {
      personaContext = await getPersonaContextByVector(
        scopedConversation,
        char,
        personaNames,
      );
    }
    const mergedContext = [
      loreContext
        ? `### Lorebook Context (Reference Only):\n${loreContext}`
        : "",
      personaContext
        ? `### Persona Cache (Vector Search):\n${personaContext}`
        : "",
    ]
      .filter((s) => !!safeTrim(s))
      .join("\n\n");
    return buildExtractorMessages(scopedConversation, modelCall, mergedContext);
  }

  async function buildPersonaExtractorMessages(characterText, modelCall) {
    const base = [
      {
        role: "user",
        content: `### Character Knowledge:\n${String(characterText || "").trim()}`,
      },
    ];
    return buildExtractorMessages(base, modelCall, "");
  }

  function formatLoreOutput(
    raw,
    parsed,
    outputFormat,
    lorebookName,
    totalEntries,
  ) {
    let normalizedParsed = parsed;
    if (Array.isArray(parsed)) {
      const merged = {};
      for (const it of parsed) {
        if (it && typeof it === "object" && !Array.isArray(it))
          Object.assign(merged, it);
      }
      normalizedParsed = Object.keys(merged).length ? merged : null;
    }

    if (!normalizedParsed || typeof normalizedParsed !== "object") {
      const rawTrimmed = String(raw || "").trim();
      const formatTrimmed = String(outputFormat || "").trim();
      if (/^[{[]/.test(formatTrimmed) && !/^[{[]/.test(rawTrimmed)) return "";
      return rawTrimmed;
    }
    if (Object.prototype.hasOwnProperty.call(normalizedParsed, lorebookName)) {
      const val = unwrapCommonValueContainer(normalizedParsed[lorebookName]);
      if (val === null || val === undefined || val === "") return "";
      if (typeof val === "string") return val.trim();
      try {
        return JSON.stringify(val);
      } catch {
        return String(val).trim();
      }
    }
    if (isPlainObject(normalizedParsed)) {
      const keys = Object.keys(normalizedParsed);
      if (totalEntries === 1) {
        if (keys.length === 1) {
          const val = unwrapCommonValueContainer(normalizedParsed[keys[0]]);
          if (val === null || val === undefined || val === "") return "";
          if (typeof val === "string") return val.trim();
          try {
            return JSON.stringify(val);
          } catch {
            return String(val).trim();
          }
        }
        try {
          return JSON.stringify(normalizedParsed);
        } catch {
          return String(raw || "").trim();
        }
      }
      const fuzzyKey = keys.find((k) => {
        const nk = String(k)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        const nl = String(lorebookName)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        return nk === nl || nk.includes(nl) || nl.includes(nk);
      });
      if (fuzzyKey) {
        const val = unwrapCommonValueContainer(normalizedParsed[fuzzyKey]);
        if (val === null || val === undefined || val === "") return "";
        if (typeof val === "string") return val.trim();
        try {
          return JSON.stringify(val);
        } catch {
          return String(val).trim();
        }
      }
    }
    return "";
  }

  function normalizeStep0ClassificationResult(parsed, raw) {
    let val = parsed;
    if (!val && safeTrim(raw)) {
      try {
        val = parsePossiblyWrappedJson(raw);
      } catch {}
    }
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        val = parsePossiblyWrappedJson(val);
      } catch {
        return [];
      }
      if (Array.isArray(val)) return val;
    }
    if (val && typeof val === "object") {
      if (Array.isArray(val.items)) return val.items;
      if (Array.isArray(val.results)) return val.results;
      if (Array.isArray(val.data)) return val.data;
      if (val.id && val.category) return [val];
    }
    return [];
  }

  function extractPersonaEntries(alignedParsed, entries, fallbackCharName) {
    const results = [];
    const knownSingleKeys = new Set([
      "attributes",
      "baseline_facet_profile",
      "governing_drives",
      "response_habits",
      "emotional_processing_style",
      "speech_tendencies",
      "hard_ooc_boundaries",
    ]);
    const nameKeys = ["CharName", "charName", "character", "name"];

    const looksLikeCharMap = (obj) => {
      if (!isPlainObject(obj)) return false;
      const keys = Object.keys(obj);
      if (keys.length === 0) return false;
      if (keys.some((k) => knownSingleKeys.has(k))) return false;
      return keys.every((k) => isPlainObject(obj[k]));
    };

    for (const entry of entries || []) {
      const key = safeTrim(entry?.lorebook_name);
      if (!key) continue;
      let rawVal = alignedParsed?.[key];
      if (
        !rawVal &&
        alignedParsed &&
        typeof alignedParsed === "object" &&
        !Array.isArray(alignedParsed)
      ) {
        if (key === "rp_character_core") {
          const coreKeys = [
            "baseline_facet_profile",
            "governing_drives",
            "response_habits",
            "speech_tendencies",
            "register_shifts",
            "hard_ooc_boundaries",
          ];
          if (
            coreKeys.some((k) =>
              Object.prototype.hasOwnProperty.call(alignedParsed, k),
            )
          ) {
            rawVal = alignedParsed;
          }
        } else if (key === "rp_persona_inventory") {
          if (
            Object.prototype.hasOwnProperty.call(alignedParsed, "attributes")
          ) {
            rawVal = alignedParsed;
          }
        }
      }
      if (!rawVal) continue;

      if (typeof rawVal === "string") {
        const parsed = parsePossiblyWrappedJson(rawVal);
        if (parsed && typeof parsed === "object") {
          rawVal = Object.prototype.hasOwnProperty.call(parsed, key)
            ? parsed[key]
            : parsed;
        }
      }

      rawVal = unwrapCommonValueContainer(rawVal);

      if (Array.isArray(rawVal)) {
        const first = rawVal[0];
        const arrIsObject =
          first && typeof first === "object" && !Array.isArray(first);
        const arrIsString = typeof first === "string";
        if (arrIsObject) {
          const hasNamedItems = rawVal.every((it) => {
            if (!it || typeof it !== "object" || Array.isArray(it))
              return false;
            return nameKeys.some((k) => safeTrim(it[k]));
          });
          if (hasNamedItems) {
            for (const it of rawVal) {
              const charNameRaw =
                safeTrim(
                  it.CharName || it.charName || it.character || it.name,
                ) || safeTrim(fallbackCharName || "Character");
              const charName = charNameRaw || "Character";
              const cleaned = { ...it };
              nameKeys.forEach((k) => {
                if (k in cleaned) delete cleaned[k];
              });
              results.push({
                cacheName: `${key}_(${charName})`,
                entryKey: key,
                charName,
                value: cleaned,
              });
            }
            continue;
          }
          if (key === "rp_persona_inventory") {
            rawVal = { attributes: rawVal };
          } else if (
            key === "rp_character_core" &&
            Object.prototype.hasOwnProperty.call(first, "baseline")
          ) {
            rawVal = { baseline_facet_profile: rawVal };
          }
        } else if (key === "rp_character_core" && arrIsString) {
          rawVal = { response_habits: rawVal };
        } else {
          const charName =
            safeTrim(fallbackCharName || "Character") || "Character";
          const wrappedVal = { _items: rawVal };
          results.push({
            cacheName: `${key}_(${charName})`,
            entryKey: key,
            charName,
            value: wrappedVal,
          });
          continue;
        }
      }

      if (!rawVal || typeof rawVal !== "object" || Array.isArray(rawVal))
        continue;
      const val = rawVal;

      if (looksLikeCharMap(val)) {
        for (const [charNameRaw, charVal] of Object.entries(val)) {
          if (!charVal || typeof charVal !== "object") continue;
          const charName = safeTrim(charNameRaw || "Character") || "Character";
          results.push({
            cacheName: `${key}_(${charName})`,
            entryKey: key,
            charName,
            value: charVal,
          });
        }
        continue;
      }

      const isSingle = Object.keys(val).some((k) => knownSingleKeys.has(k));
      if (isSingle) {
        const charName =
          safeTrim(fallbackCharName || "Character") || "Character";
        results.push({
          cacheName: `${key}_(${charName})`,
          entryKey: key,
          charName,
          value: val,
        });
        continue;
      }

      for (const [charNameRaw, charVal] of Object.entries(val)) {
        if (!charVal || typeof charVal !== "object") continue;
        const charName = safeTrim(charNameRaw || "Character") || "Character";
        results.push({
          cacheName: `${key}_(${charName})`,
          entryKey: key,
          charName,
          value: charVal,
        });
      }
    }
    return results;
  }

  function isPersonaEmptyValue(val) {
    if (val === null || val === undefined) return true;
    if (typeof val === "string") return !safeTrim(val);
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "object") return Object.keys(val).length === 0;
    return false;
  }

  function isPersonaPlainObject(val) {
    return val && typeof val === "object" && !Array.isArray(val);
  }

  function mergePersonaArrays(existing, incoming) {
    const out = Array.isArray(existing) ? existing.slice() : [];
    if (!Array.isArray(incoming) || incoming.length === 0) return out;
    if (out.length === 0) return incoming.slice();

    const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
    const hasName = (v) => isObj(v) && safeTrim(v.name);
    const canKeyByName = out.some(hasName) || incoming.some(hasName);

    const seen = new Set();
    const getKey = (v) => {
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    };
    const addSeen = (v) => {
      seen.add(getKey(v));
    };

    if (canKeyByName) {
      const indexByName = new Map();
      out.forEach((v, i) => {
        if (hasName(v)) indexByName.set(String(v.name), i);
        addSeen(v);
      });
      for (const v of incoming) {
        if (hasName(v)) {
          const key = String(v.name);
          if (indexByName.has(key)) {
            const idx = indexByName.get(key);
            out[idx] = mergePersonaValues(out[idx], v);
          } else {
            out.push(v);
            indexByName.set(key, out.length - 1);
          }
          addSeen(v);
        } else {
          if (!seen.has(getKey(v))) out.push(v);
          addSeen(v);
        }
      }
      return out;
    }

    out.forEach(addSeen);
    for (const v of incoming) {
      const key = getKey(v);
      if (!seen.has(key)) out.push(v);
      addSeen(v);
    }
    return out;
  }

  function mergePersonaObjects(existing, incoming) {
    const out = { ...(existing || {}) };
    if (!incoming || typeof incoming !== "object") return out;
    for (const [key, val] of Object.entries(incoming)) {
      if (!(key in out)) {
        out[key] = val;
        continue;
      }
      const cur = out[key];
      if (isPersonaEmptyValue(cur)) {
        out[key] = val;
        continue;
      }
      if (isPersonaEmptyValue(val)) continue;
      if (Array.isArray(cur) && Array.isArray(val)) {
        out[key] = mergePersonaArrays(cur, val);
        continue;
      }
      if (isPersonaPlainObject(cur) && isPersonaPlainObject(val)) {
        out[key] = mergePersonaObjects(cur, val);
        continue;
      }
      out[key] = cur;
    }
    return out;
  }

  function mergePersonaValues(existing, incoming) {
    if (isPersonaEmptyValue(existing)) return incoming;
    if (isPersonaEmptyValue(incoming)) return existing;
    if (Array.isArray(existing) && Array.isArray(incoming))
      return mergePersonaArrays(existing, incoming);
    if (isPersonaPlainObject(existing) && isPersonaPlainObject(incoming))
      return mergePersonaObjects(existing, incoming);
    return existing;
  }

  function getPersonaValueFromCacheEntry(entry, entryKey, charName) {
    if (!entry || !entry.text) return null;
    try {
      const parsed = JSON.parse(entry.text);
      const val = parsed?.[entryKey]?.[charName];
      return val && typeof val === "object" ? val : null;
    } catch {
      return null;
    }
  }

  function resolveLoreCommentForTarget(target, callsOverride) {
    const calls = callsOverride || getModelCalls();
    const entries = calls
      .filter((c) => c.target_model === target)
      .flatMap((c) => c.entries || []);
    return safeTrim(entries?.[0]?.lorebook_name) || LOCAL_LORE_COMMENT;
  }

  async function batchUpsertLocalLore(writes, roundIndex = 0) {
    if (!Array.isArray(writes) || writes.length === 0) return false;
    return mutexLoreWrite.run(async () => {
      try {
        const { charIdx, chatIndex, chat } = await getCurrentChatContextSafe();
        if (charIdx < 0 || chatIndex < 0 || !chat) return false;
        chat.localLore = Array.isArray(chat.localLore) ? chat.localLore : [];

        for (const { loreName, writeMode, alwaysActive, content } of writes) {
          if (!loreName || typeof content !== "string" || !content.trim())
            continue;
          const header = `## ${loreName}`;
          const turnBlock = `### Turn ${roundIndex}\n${content}`;

          if (writeMode === "overwrite") {
            const plainContent = `## ${loreName}\n<!-- written_at_turn: ${roundIndex} -->\n${content}`;
            const existingIndex = chat.localLore.findIndex(
              (l) => l && l.comment === loreName,
            );
            if (existingIndex < 0) {
              chat.localLore.push({
                key: "",
                comment: loreName,
                content: plainContent,
                mode: "normal",
                insertorder: 999,
                alwaysActive,
                secondkey: "",
                selective: false,
                useRegex: false,
              });
            } else {
              chat.localLore[existingIndex] = {
                ...chat.localLore[existingIndex],
                key: "",
                comment: loreName,
                content: plainContent,
                mode: "normal",
                insertorder: 999,
                alwaysActive,
                secondkey: "",
                selective: false,
                useRegex: false,
              };
            }
          } else {
            const makeEntry = () => ({
              key: "",
              comment: loreName,
              content: `${header}\n${turnBlock}`,
              mode: "normal",
              insertorder: 999,
              alwaysActive,
              secondkey: "",
              selective: false,
              useRegex: false,
            });
            const existingIndex = chat.localLore.findIndex(
              (l) => l && l.comment === loreName,
            );
            if (existingIndex < 0) {
              chat.localLore.push(makeEntry());
            } else {
              const prev = chat.localLore[existingIndex] || {};
              const prevContent =
                typeof prev.content === "string" ? prev.content.trim() : "";
              if (hasTurnBlockForRound(prevContent, roundIndex)) {
                continue;
              }
              const base = prevContent.startsWith("## ")
                ? prevContent
                : `${header}\n${prevContent}`;
              chat.localLore[existingIndex] = {
                ...prev,
                key: "",
                comment: loreName,
                content: `${base}\n\n${turnBlock}`,
                mode: "normal",
                insertorder: 999,
                alwaysActive,
                secondkey: "",
                selective: false,
                useRegex: false,
              };
            }
          }
        }

        await Risuai.setChatToIndex(charIdx, chatIndex, chat);
        return true;
      } catch (err) {
        await Risuai.log(
          `${LOG} batchUpsertLocalLore failed: ${err?.message || String(err)}`,
        );
        return false;
      }
    });
  }

  async function applyRetentionCleanup(userMsgCount, callsOverride) {
    const calls = callsOverride || getModelCalls();
    const retentionEntries = [];
    for (const call of calls) {
      for (const entry of call.entries || []) {
        const e = normalizeOutputEntry(entry, call.target_model);
        if (e.write_mode === "append" && e.retention_enabled) {
          retentionEntries.push(e);
        }
      }
    }
    if (retentionEntries.length === 0) return;

    return mutexLoreWrite.run(async () => {
      try {
        const { charIdx, chatIndex, chat } = await getCurrentChatContextSafe();
        if (charIdx < 0 || chatIndex < 0) return;
        if (!chat || !Array.isArray(chat.localLore)) return;

        let modified = false;
        for (const e of retentionEntries) {
          const idx = chat.localLore.findIndex(
            (l) => l?.comment === e.lorebook_name,
          );
          if (idx < 0) continue;
          const entry = chat.localLore[idx];
          const raw =
            typeof entry.content === "string" ? entry.content.trim() : "";

          const headerMatch = raw.match(/^## .+/);
          if (!headerMatch) continue;
          const headerLine = headerMatch[0];
          const body = raw.slice(headerLine.length).trim();

          const allBlocks = splitTurnBlocks(body);

          if (e.retention_after === 0 || allBlocks.length > e.retention_after) {
            const kept =
              e.retention_keep === 0 ? [] : allBlocks.slice(-e.retention_keep);
            chat.localLore[idx] = {
              ...entry,
              content:
                headerLine.trim() +
                (kept.length ? "\n\n" + kept.join("\n\n") : ""),
            };
            modified = true;
          }
        }

        if (modified) await Risuai.setChatToIndex(charIdx, chatIndex, chat);
      } catch (err) {
        console.error(`${LOG} applyRetentionCleanup failed:`, err);
      }
    });
  }

  async function writeOutputsForCall(
    modelCall,
    raw,
    parsed,
    roundIndex = 0,
    callsOverride,
  ) {
    const entries = modelCall.entries || [];
    const target = modelCall.target_model === "B" ? "B" : "A";
    const requiresPersonaPair =
      entries.some(
        (e) => safeTrim(e?.lorebook_name) === "rp_persona_inventory",
      ) &&
      entries.some((e) => safeTrim(e?.lorebook_name) === "rp_character_core");

    const alignedParsed = alignParsedObjectToEntries(raw, parsed, entries);

    const pendingWrites = [];
    const outputIssues = [];
    for (const entry of entries) {
      const loreName =
        safeTrim(entry?.lorebook_name) ||
        resolveLoreCommentForTarget(target, callsOverride);
      const writeMode =
        safeTrim(entry?.write_mode) === "overwrite" ? "overwrite" : "append";
      const alwaysActive =
        entry?.always_active === true ||
        entry?.always_active === 1 ||
        entry?.always_active === "1" ||
        String(entry?.always_active) === "true";
      const outputFormat = safeTrim(entry?.output_format) || "raw";

      let content = formatLoreOutput(
        raw,
        alignedParsed,
        outputFormat,
        loreName,
        entries.length,
      );

      if (
        !safeTrim(content) &&
        entries.length > 1 &&
        parsed &&
        typeof parsed === "object"
      ) {
        const singleAlign = alignParsedObjectToEntries(raw, parsed, [entry]);
        content = formatLoreOutput(raw, singleAlign, outputFormat, loreName, 1);
      }

      if (!safeTrim(content)) {
        outputIssues.push(`${loreName}: no extractable content`);
        continue;
      }
      pendingWrites.push({ loreName, writeMode, alwaysActive, content });
    }

    if (requiresPersonaPair) {
      const writtenNames = new Set(pendingWrites.map((w) => w.loreName));
      const missing = [];
      if (!writtenNames.has("rp_persona_inventory"))
        missing.push("rp_persona_inventory");
      if (!writtenNames.has("rp_character_core"))
        missing.push("rp_character_core");
      if (missing.length > 0) {
        throw new Error(_T.err_persona_pair_missing(missing.join(", ")));
      }
    }

    if (pendingWrites.length === 0) {
      const issuesSummary = outputIssues.join("; ");
      const rawTrimmed = String(raw || "").trim();

      if (rawTrimmed && entries.length === 1) {
        const fallbackEntry = entries[0];
        const loreName =
          safeTrim(fallbackEntry?.lorebook_name) ||
          resolveLoreCommentForTarget(target, callsOverride);
        const writeMode =
          safeTrim(fallbackEntry?.write_mode) === "overwrite"
            ? "overwrite"
            : "append";
        const alwaysActive =
          fallbackEntry?.always_active === true ||
          fallbackEntry?.always_active === 1 ||
          fallbackEntry?.always_active === "1" ||
          String(fallbackEntry?.always_active) === "true";
        await Risuai.log(
          `${LOG} Warning (${modelCall.name}): JSON parse failed; writing raw text to "${loreName}" as fallback.`,
        );
        const wrote = await batchUpsertLocalLore(
          [{ loreName, writeMode, alwaysActive, content: rawTrimmed }],
          roundIndex,
        );
        if (!wrote) {
          await Risuai.log(
            `${LOG} Warning: fallback raw write also failed for call "${modelCall.name}".`,
          );
        }
        return;
      }

      if (rawTrimmed && entries.length > 1) {
        const recoveredSections = extractSectionedOutputs(rawTrimmed, entries);
        if (recoveredSections.length > 0) {
          const sectionWrites = recoveredSections.map(
            ({ entry, loreName, content }) => ({
              loreName,
              writeMode:
                safeTrim(entry?.write_mode) === "overwrite"
                  ? "overwrite"
                  : "append",
              alwaysActive:
                entry?.always_active === true ||
                entry?.always_active === 1 ||
                entry?.always_active === "1" ||
                String(entry?.always_active) === "true",
              content,
            }),
          );
          await Risuai.log(
            `${LOG} Warning (${modelCall.name}): JSON parse failed; recovered ${sectionWrites.length}/${entries.length} entries via section headings.`,
          );
          const wrote = await batchUpsertLocalLore(sectionWrites, roundIndex);
          if (!wrote) {
            await Risuai.log(
              `${LOG} Warning: section fallback write failed for call "${modelCall.name}".`,
            );
          }
          return;
        }
      }

      if (rawTrimmed && entries.length > 1) {
        const perEntryWrites = [];
        for (const entry of entries) {
          const eName =
            safeTrim(entry?.lorebook_name) ||
            resolveLoreCommentForTarget(target, callsOverride);
          const eMode =
            safeTrim(entry?.write_mode) === "overwrite"
              ? "overwrite"
              : "append";
          const eAlways =
            entry?.always_active === true ||
            entry?.always_active === 1 ||
            entry?.always_active === "1" ||
            String(entry?.always_active) === "true";
          const singleAlign = alignParsedObjectToEntries(raw, parsed, [entry]);
          const eContent = formatLoreOutput(
            raw,
            singleAlign,
            safeTrim(entry?.output_format) || "raw",
            eName,
            1,
          );
          if (safeTrim(eContent))
            perEntryWrites.push({
              loreName: eName,
              writeMode: eMode,
              alwaysActive: eAlways,
              content: eContent,
            });
        }
        if (perEntryWrites.length > 0) {
          await Risuai.log(
            `${LOG} Warning (${modelCall.name}): multi-entry alignment failed; recovered ${perEntryWrites.length}/${entries.length} entries via per-entry fallback.`,
          );
          const wrote = await batchUpsertLocalLore(perEntryWrites, roundIndex);
          if (!wrote) {
            await Risuai.log(
              `${LOG} Warning: per-entry fallback write failed for call "${modelCall.name}".`,
            );
          }
          return;
        }
      }

      if (
        entries.length > 1 &&
        (!alignedParsed || typeof alignedParsed !== "object")
      ) {
        throw new Error(
          _T.err_json_expected(modelCall.name) +
            ` First 100 chars of raw: ${String(raw || "").slice(0, 100)}`,
        );
      }
      throw new Error(
        _T.err_unusable_output(modelCall.name) +
          ` Issues: ${issuesSummary || "(none)"}. Expected entries: ${entries.map((e) => e.lorebook_name).join(", ") || "(none)"}`,
      );
    }

    if (outputIssues.length > 0) {
      await Risuai.log(
        `${LOG} Warning (${modelCall.name}): partial write — ${outputIssues.join("; ")}. ` +
          `Writing ${pendingWrites.length}/${entries.length} entries.`,
      );
    }

    const wrote = await batchUpsertLocalLore(pendingWrites, roundIndex);
    if (!wrote) {
      await Risuai.log(
        `${LOG} Warning: save error occurred while batch-writing data to local Lorebook (call: ${modelCall.name}).`,
      );
    }
  }

  function thinkingLevelToClaudeBudget(level) {
    switch (safeTrim(level).toLowerCase()) {
      case "low":
        return 1024;
      case "medium":
        return 8000;
      case "high":
        return 32000;
      default:
        return 8000;
    }
  }

  function thinkingLevelToGemini(level) {
    switch (safeTrim(level).toUpperCase()) {
      case "LOW":
        return "LOW";
      case "HIGH":
        return "HIGH";
      case "MEDIUM":
        return "MEDIUM";
      default:
        return "MEDIUM";
    }
  }

  function thinkingLevelToOpenAIEffort(level) {
    switch (safeTrim(level).toLowerCase()) {
      case "low":
        return "low";
      case "high":
        return "high";
      default:
        return "medium";
    }
  }

  function extractOpenAICompatContent(data) {
    const choice = data?.choices?.[0];
    const messageContent = choice?.message?.content;
    if (typeof messageContent === "string") {
      return messageContent.trim();
    }
    if (Array.isArray(messageContent)) {
      return messageContent
        .map((part) => {
          if (typeof part === "string") return part;
          if (typeof part?.text === "string") return part.text;
          return "";
        })
        .filter(Boolean)
        .join("\n")
        .trim();
    }
    const legacyText = choice?.text;
    if (typeof legacyText === "string") {
      return legacyText.trim();
    }
    return "";
  }

  async function callOpenAICompat({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    temperature,
    thinkingEnabled,
    thinkingLevel,
    responseFormat = "json_object",
  }) {
    const finalUrl = normalizeUrl(url);
    const finalModel = safeTrim(model);
    if (!finalUrl || !finalModel)
      throw new Error(`Extractor URL/model is missing.`);
    let headers = { "Content-Type": "application/json" };
    if (isCopilotUrl(finalUrl))
      headers = await applyCopilotAuthHeaders(headers, apiKey);
    else if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const responseFormatPayload = responseFormat
      ? typeof responseFormat === "string"
        ? { response_format: { type: responseFormat } }
        : { response_format: responseFormat }
      : {};

    const { res } = await fetchWithFallback(
      finalUrl,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: finalModel,
          stream: false,
          ...(Number.isFinite(Number(temperature))
            ? { temperature: Math.max(0, Math.min(2, Number(temperature))) }
            : {}),
          ...(thinkingEnabled && thinkingLevel
            ? { reasoning_effort: thinkingLevelToOpenAIEffort(thinkingLevel) }
            : {}),
          ...responseFormatPayload,
          messages,
        }),
      },
      timeoutMs,
      "Extractor",
      true,
    );

    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(
        `HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`,
      );
    }

    const data = await withTimeout(
      readResponseJson(res),
      timeoutMs,
      "Extractor body read timeout",
    );
    const content = extractOpenAICompatContent(data);
    if (!content || typeof content !== "string")
      throw new Error("Extractor returned empty content.");
    return {
      parsed: parsePossiblyWrappedJson(content),
      raw: String(content || "").trim(),
    };
  }

  function normalizeGoogleGenerateUrl(baseUrl, model, apiKey) {
    const raw = safeTrim(baseUrl || "");
    const id = safeTrim(model || "");
    if (!raw || !id) return "";
    let url = raw.replace(/\/+$/, "");
    if (!/:generateContent(\?|$)/.test(url)) {
      if (/\/chat\/completions$/i.test(url))
        url = url.replace(/\/openai\/chat\/completions$/i, "");
      if (/\/models$/i.test(url)) url = `${url}/${id}:generateContent`;
      else if (/\/models\/[^/]+$/i.test(url)) url = `${url}:generateContent`;
      else url = `${url}/models/${id}:generateContent`;
    }
    if (apiKey && !/[?&]key=/.test(url))
      url += `${url.includes("?") ? "&" : "?"}key=${encodeURIComponent(apiKey)}`;
    return url;
  }

  function normalizeVertexGenerateUrl(baseUrl, model, rawKey) {
    const raw = safeTrim(baseUrl || "");
    const id = safeTrim(model || "");
    if (!raw || !id) return "";
    const inferred = inferVertexProjectAndLocation(raw, rawKey);
    if (inferred.project && inferred.location) {
      const host =
        inferred.location === "global"
          ? "https://aiplatform.googleapis.com"
          : `https://${inferred.location}-aiplatform.googleapis.com`;
      return `${host}/v1/projects/${encodeURIComponent(inferred.project)}/locations/${encodeURIComponent(inferred.location)}/publishers/google/models/${encodeURIComponent(id)}:generateContent`;
    }
    let url = raw.replace(/\/+$/, "");
    if (!/:generateContent(\?|$)/.test(url)) {
      if (/\/chat\/completions$/i.test(url))
        url = url.replace(/\/chat\/completions$/i, "");
      if (/\/models$/i.test(url)) url = `${url}/${id}:generateContent`;
      else if (/\/models\/[^/]+$/i.test(url)) url = `${url}:generateContent`;
      else url = `${url}/models/${id}:generateContent`;
    }
    return url;
  }

  function buildGoogleMessages(messages) {
    const normalized = Array.isArray(messages) ? messages : [];
    const systemTexts = normalized
      .filter((m) => m?.role === "system")
      .map((m) => normalizeMessageContent(m?.content))
      .filter(Boolean);
    const contents = normalized
      .filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: normalizeMessageContent(m?.content) }],
      }))
      .filter((x) => safeTrim(x?.parts?.[0]?.text));
    if (contents.length === 0)
      contents.push({ role: "user", parts: [{ text: "Continue." }] });
    return {
      systemInstruction: systemTexts.length
        ? { parts: [{ text: systemTexts.join("\n\n") }] }
        : undefined,
      contents,
    };
  }

  async function callGoogleGenerative({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    temperature,
    thinkingEnabled,
    thinkingLevel,
  }) {
    const finalUrl = normalizeGoogleGenerateUrl(url, model, apiKey);
    if (!finalUrl) throw new Error("Google URL/model is missing.");
    const headers = { "Content-Type": "application/json" };
    const built = buildGoogleMessages(messages);
    const body = {
      contents: built.contents,
      ...(built.systemInstruction
        ? { systemInstruction: built.systemInstruction }
        : {}),
      generationConfig: {
        ...(Number.isFinite(Number(temperature))
          ? { temperature: Math.max(0, Math.min(2, Number(temperature))) }
          : {}),
        responseMimeType: "application/json",
        ...(thinkingEnabled && thinkingLevel
          ? {
              thinkingConfig: {
                includeThoughts: true,
                thinkingLevel:
                  thinkingLevelToGemini(thinkingLevel).toLowerCase(),
              },
            }
          : {}),
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    };
    const { res } = await fetchWithFallback(
      finalUrl,
      { method: "POST", headers, body: JSON.stringify(body) },
      timeoutMs,
      "Google extractor",
      true,
    );
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(
        `HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`,
      );
    }
    const data = await withTimeout(
      readResponseJson(res),
      timeoutMs,
      "Google extractor body read timeout",
    );
    const content = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => safeTrim(p?.text))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (!content) throw new Error("Google extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callVertexGenerative({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    temperature,
    thinkingEnabled,
    thinkingLevel,
  }) {
    if (isVertexClaudeModel(model)) {
      return await callVertexClaudeCompat({
        url,
        apiKey,
        model,
        messages,
        timeoutMs,
        temperature,
        thinkingEnabled,
        thinkingLevel,
      });
    }
    const finalUrl = normalizeVertexGenerateUrl(url, model, apiKey);
    if (!finalUrl) throw new Error("Vertex AI URL/model is missing.");
    const headers = { "Content-Type": "application/json" };
    if (apiKey) {
      const { token } = await requestVertexAccessToken(apiKey);
      headers.Authorization = `Bearer ${token}`;
    }
    const built = buildGoogleMessages(messages);
    const body = {
      contents: built.contents,
      ...(built.systemInstruction
        ? { systemInstruction: built.systemInstruction }
        : {}),
      generationConfig: {
        ...(Number.isFinite(Number(temperature))
          ? { temperature: Math.max(0, Math.min(2, Number(temperature))) }
          : {}),
        responseMimeType: "application/json",
        ...(thinkingEnabled && thinkingLevel
          ? {
              thinkingConfig: {
                includeThoughts: true,
                thinking_level: thinkingLevelToGemini(thinkingLevel),
              },
            }
          : {}),
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    };
    const { res } = await fetchWithFallback(
      finalUrl,
      { method: "POST", headers, body: JSON.stringify(body) },
      timeoutMs,
      "Vertex extractor",
      true,
    );
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(
        `HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`,
      );
    }
    const data = await withTimeout(
      readResponseJson(res),
      timeoutMs,
      "Vertex extractor body read timeout",
    );
    const content = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => safeTrim(p?.text))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (!content) throw new Error("Vertex extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callVertexClaudeCompat({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    temperature,
    thinkingEnabled,
    thinkingLevel,
  }) {
    const finalUrl = normalizeVertexClaudeUrl(url, model, apiKey);
    if (!finalUrl) throw new Error("Vertex Claude URL/model is missing.");
    const { token } = await requestVertexAccessToken(apiKey);
    const { system, chatMessages } = buildClaudeMessages(messages);
    const finalModel = safeTrim(model || "");
    const adaptiveThinking =
      thinkingEnabled &&
      thinkingLevel &&
      /claude-(?:sonnet|opus)-4-6@/i.test(finalModel);
    const budgetThinking =
      thinkingEnabled && thinkingLevel && !adaptiveThinking;
    const maxTokens = budgetThinking
      ? Math.max(4096, thinkingLevelToClaudeBudget(thinkingLevel) + 4096)
      : 4096;
    const basePayload = {
      anthropic_version: "vertex-2023-10-16",
      model: finalModel,
      stream: false,
      max_tokens: maxTokens,
      ...(Number.isFinite(Number(temperature))
        ? { temperature: Math.max(0, Math.min(2, Number(temperature))) }
        : {}),
      ...(system ? { system } : {}),
      messages: chatMessages,
      ...(adaptiveThinking
        ? {
            thinking: { type: "adaptive" },
            output_config: {
              effort: thinkingLevelToOpenAIEffort(thinkingLevel),
            },
          }
        : budgetThinking
          ? {
              thinking: {
                type: "enabled",
                budget_tokens: thinkingLevelToClaudeBudget(thinkingLevel),
              },
            }
          : {}),
    };
    if (adaptiveThinking || budgetThinking) {
      delete basePayload.temperature;
    }
    const toolPayload = {
      ...basePayload,
      tools: [
        {
          name: "emit_json",
          description: "Return the extraction result as a single JSON object.",
          input_schema: { type: "object", additionalProperties: true },
        },
      ],
      tool_choice: { type: "tool", name: "emit_json" },
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const betas = [];
    if (Number(basePayload.max_tokens) > 8192)
      betas.push("output-128k-2025-02-19");
    if (betas.length) headers["anthropic-beta"] = betas.join(",");

    let usedFallback = false;
    let resObj = null;
    const firstTry = await fetchWithFallback(
      finalUrl,
      {
        method: "POST",
        headers,
        body: JSON.stringify(toolPayload),
      },
      timeoutMs,
      "Vertex Claude extractor",
      true,
    );
    resObj = firstTry?.res;
    if (!isResponseLike(resObj) || !resObj.ok) {
      const errText = await readResponseErrorText(resObj);
      const msg = String(errText || "").toLowerCase();
      const toolsUnsupported =
        msg.includes("tool") ||
        msg.includes("input_schema") ||
        msg.includes("tool_choice");
      if (!toolsUnsupported) {
        throw new Error(
          `HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(errText || "").slice(0, 500)}`,
        );
      }
      usedFallback = true;
      const fallbackTry = await fetchWithFallback(
        finalUrl,
        {
          method: "POST",
          headers,
          body: JSON.stringify(basePayload),
        },
        timeoutMs,
        "Vertex Claude extractor (fallback)",
        true,
      );
      resObj = fallbackTry?.res;
      if (!isResponseLike(resObj) || !resObj.ok) {
        const fallbackErrText = await readResponseErrorText(resObj);
        throw new Error(
          `HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(fallbackErrText || "").slice(0, 500)}`,
        );
      }
    }
    const data = await withTimeout(
      readResponseJson(resObj),
      timeoutMs,
      "Vertex Claude extractor body read timeout",
    );
    const contentBlocks = Array.isArray(data?.content) ? data.content : [];
    const toolUse = contentBlocks.find(
      (x) =>
        x?.type === "tool_use" &&
        x?.name === "emit_json" &&
        x?.input &&
        typeof x.input === "object",
    );
    if (toolUse && !usedFallback) {
      const raw = JSON.stringify(toolUse.input);
      return { parsed: toolUse.input, raw };
    }
    const content = contentBlocks
      .map((x) => (x?.type === "text" ? safeTrim(x?.text) : ""))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (!content)
      throw new Error("Vertex Claude extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callClaudeCompat({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    temperature,
    thinkingEnabled,
    thinkingLevel,
  }) {
    const finalUrl = safeTrim(url || "").replace(/\/+$/, "");
    if (!finalUrl || !safeTrim(model))
      throw new Error("Claude URL/model is missing.");
    const system = (messages || [])
      .filter((m) => m?.role === "system")
      .map((m) => normalizeMessageContent(m?.content))
      .filter(Boolean)
      .join("\n\n");
    const chatMessages = (messages || [])
      .filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: normalizeMessageContent(m?.content),
      }))
      .filter((m) => !!safeTrim(m.content));
    if (!chatMessages.length)
      chatMessages.push({ role: "user", content: "Continue." });
    let headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey || "",
      "anthropic-version": "2023-06-01",
    };
    if (isCopilotUrl(finalUrl)) {
      headers = await applyCopilotAuthHeaders(headers, apiKey);
      delete headers["x-api-key"];
    }
    const claudeThinkingBlock =
      thinkingEnabled && thinkingLevel
        ? {
            thinking: {
              type: "enabled",
              budget_tokens: thinkingLevelToClaudeBudget(thinkingLevel),
            },
          }
        : {};
    const basePayload = {
      model,
      stream: false,
      max_tokens:
        thinkingEnabled && thinkingLevel
          ? Math.max(4096, thinkingLevelToClaudeBudget(thinkingLevel) + 1024)
          : 4096,
      ...(Number.isFinite(Number(temperature))
        ? { temperature: Math.max(0, Math.min(2, Number(temperature))) }
        : {}),
      ...(system ? { system } : {}),
      messages: chatMessages,
      ...claudeThinkingBlock,
    };
    // The Claude API rejects requests containing both `thinking` and
    // `temperature`. Remove temperature when thinking is enabled, matching
    // the behaviour in callVertexClaudeCompat.
    if (thinkingEnabled && thinkingLevel) {
      delete basePayload.temperature;
    }
    const toolPayload = {
      ...basePayload,
      stream: false,
      tools: [
        {
          name: "emit_json",
          description: "Return the extraction result as a single JSON object.",
          input_schema: { type: "object", additionalProperties: true },
        },
      ],
      tool_choice: { type: "tool", name: "emit_json" },
    };

    let data = null;
    let usedFallback = false;
    let resObj = null;

    const firstTry = await fetchWithFallback(
      finalUrl,
      {
        method: "POST",
        headers,
        body: JSON.stringify(toolPayload),
      },
      timeoutMs,
      "Claude extractor",
      true,
    );
    resObj = firstTry?.res;

    if (!isResponseLike(resObj) || !resObj.ok) {
      const errText = await readResponseErrorText(resObj);
      const msg = String(errText || "").toLowerCase();
      const toolsUnsupported =
        msg.includes("tool") ||
        msg.includes("input_schema") ||
        msg.includes("tool_choice");
      if (!toolsUnsupported) {
        throw new Error(
          `HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(errText || "").slice(0, 500)}`,
        );
      }
      usedFallback = true;
      const fallbackTry = await fetchWithFallback(
        finalUrl,
        {
          method: "POST",
          headers,
          body: JSON.stringify(basePayload),
        },
        timeoutMs,
        "Claude extractor (fallback)",
        true,
      );
      resObj = fallbackTry?.res;
      if (!isResponseLike(resObj) || !resObj.ok) {
        const fallbackErrText = await readResponseErrorText(resObj);
        throw new Error(
          `HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(fallbackErrText || "").slice(0, 500)}`,
        );
      }
    }

    data = await withTimeout(
      readResponseJson(resObj),
      timeoutMs,
      "Claude extractor body read timeout",
    );
    const contentBlocks = Array.isArray(data?.content) ? data.content : [];
    const toolUse = contentBlocks.find(
      (x) =>
        x?.type === "tool_use" &&
        x?.name === "emit_json" &&
        x?.input &&
        typeof x.input === "object",
    );
    if (toolUse && !usedFallback) {
      const raw = JSON.stringify(toolUse.input);
      return { parsed: toolUse.input, raw };
    }
    const content = contentBlocks
      .map((x) => (x?.type === "text" ? safeTrim(x?.text) : ""))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (!content) throw new Error("Claude extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callExtractorStrict({
    url,
    apiKey,
    model,
    messages,
    timeoutMs,
    mode,
    format = "openai",
    temperature = 0,
    thinkingEnabled = false,
    thinkingLevel = "",
  }) {
    const runner = async () => {
      const f = safeTrim(format || "openai").toLowerCase();
      const openaiResponseFormat =
        mode === "Step0_Classification" ? null : "json_object";
      const result =
        f === "google"
          ? await callGoogleGenerative({
              url,
              apiKey,
              model,
              messages,
              timeoutMs,
              temperature,
              thinkingEnabled,
              thinkingLevel,
            })
          : f === "vertex"
            ? await callVertexGenerative({
                url,
                apiKey,
                model,
                messages,
                timeoutMs,
                temperature,
                thinkingEnabled,
                thinkingLevel,
              })
            : f === "claude"
              ? await callClaudeCompat({
                  url,
                  apiKey,
                  model,
                  messages,
                  timeoutMs,
                  temperature,
                  thinkingEnabled,
                  thinkingLevel,
                })
              : await callOpenAICompat({
                  url,
                  apiKey,
                  model,
                  messages,
                  timeoutMs,
                  temperature,
                  thinkingEnabled,
                  thinkingLevel,
                  responseFormat: openaiResponseFormat,
                });
      if (!safeTrim(result?.raw)) throw new Error(_T.err_extractor_empty(mode));
      return { ...result, parsed: result?.parsed || null };
    };
    const m = mode === "A" ? mutexA : mode === "B" ? mutexB : null;
    const useConcurrency =
      mode === "A"
        ? toInt(configCache.extractor_a_concurrency, 1) === 1
        : toInt(configCache.extractor_b_concurrency, 1) === 1;
    if (m && !useConcurrency) {
      return await m.run(runner);
    }
    return await runner();
  }

  function checkLorebookTrigger(l, text) {
    if (!l || typeof l !== "object") return false;
    if (l.alwaysActive) return true;
    let matchFirst = false;
    let matchSecond = false;
    const getKeys = (raw) => {
      if (Array.isArray(raw))
        return raw.filter((k) => typeof k === "string" && k.trim());
      if (typeof raw === "string")
        return raw
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean);
      return [];
    };
    const keys = getKeys(l.keyword || l.keywords || l.key || l.keys);
    const secondKeys = getKeys(
      l.secondary_keyword || l.secondkey || l.secondKey,
    );
    if (!keys.length && !secondKeys.length) return false;
    if (l.useRegex) {
      try {
        for (const k of keys)
          if (new RegExp(k, "i").test(text)) {
            matchFirst = true;
            break;
          }
        for (const k of secondKeys)
          if (new RegExp(k, "i").test(text)) {
            matchSecond = true;
            break;
          }
      } catch (e) {}
    } else {
      const lowerText = String(text || "").toLowerCase();
      for (const k of keys)
        if (lowerText.includes(k.toLowerCase())) {
          matchFirst = true;
          break;
        }
      for (const k of secondKeys)
        if (lowerText.includes(k.toLowerCase())) {
          matchSecond = true;
          break;
        }
    }
    if (l.selective) {
      const needFirst = keys.length > 0;
      const needSecond = secondKeys.length > 0;
      if (needFirst && needSecond) return matchFirst && matchSecond;
      if (needFirst) return matchFirst;
      if (needSecond) return matchSecond;
      return false;
    } else {
      if (keys.length && matchFirst) return true;
      if (secondKeys.length && matchSecond) return true;
      return false;
    }
  }

async function injectKnowledgeIntoMessages(messages, queryText) {
    const { char, chat } = await getCurrentChatContextSafe();
    // ▼ 在這裡加上 await normalizePromptMessagesForAgent 包覆起來 ▼
    const cleanInput = await normalizePromptMessagesForAgent(
      messages.filter(
        (m) =>
          !(
            m?.role === "system" &&
            typeof m?.content === "string" &&
            m.content.startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`)
          ),
      )
    );
    if (!isKbFeatureEnabled()) return cleanInput;
    const isChatRole = (role) =>
      role === "user" || role === "assistant" || role === "char";
    const staticKeys = getStaticCacheKeysForScope(char);
    const staticRaw = await Risuai.pluginStorage.getItem(
      staticKeys.staticKnowledgeChunks,
    );
    let staticChunks = [];
    if (staticRaw) {
      try {
        staticChunks = JSON.parse(staticRaw);
      } catch (e) {
        console.warn(
          `${LOG} [injectKnowledge] failed to parse static_knowledge_chunks:`,
          e,
        );
        await Risuai.log(`${LOG} ` + _T.warn_parse_failed);
      }
    }

    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    let dynamicChunkId = 0;
    const dynamicChunks = [];
    for (const entry of localLore) {
      const raw = String(entry?.content || "").trim();
      if (!raw) continue;
      const content = raw.replace(/^<!-- written_at_turn: \d+ -->\n?/m, "");
      const alwaysActive = entry.alwaysActive === true;
      const primaryKeys = getPrimaryTriggerKeys(entry);
      const secondaryKeys = getSecondaryTriggerKeys(entry);
      const useRegex =
        entry?.useRegex === true || String(entry?.useRegex) === "true";
      const selective =
        entry?.selective === true || String(entry?.selective) === "true";
      for (const sc of splitIntoParagraphChunks(content)) {
        dynamicChunks.push({
          id: `dynamic_${dynamicChunkId++}`,
          source: entry.comment || "Chat Lore",
          alwaysActive,
          category: "information",
          content: sc,
          isDynamic: true,
          key: primaryKeys.join(", "),
          keys: primaryKeys,
          secondkey: secondaryKeys.join(", "),
          selective,
          useRegex,
          hasPrimaryKey: primaryKeys.length > 0,
        });
      }
    }

    const allChunks = [...staticChunks, ...dynamicChunks];
    if (allChunks.length === 0) {
      console.warn(
        `${LOG} [injectKnowledge] allChunks is empty. Knowledge injection skipped.`,
      );
      await Risuai.log(`${LOG} ` + _T.warn_no_chunks);
      return cleanInput;
    }

    const activeChunks = allChunks.filter((c) => c.alwaysActive);
    const inactiveChunks = allChunks.filter((c) => !c.alwaysActive);
    const vectorEligibleInactiveChunks = inactiveChunks.filter((c) =>
      hasPrimaryTriggerKey(c),
    );

    const firstChatIdx = (() => {
      const i = cleanInput.findIndex((m) => isChatRole(m?.role));
      return i === -1 ? cleanInput.length : i;
    })();
    let lastChatIdx = -1;
    for (let i = cleanInput.length - 1; i >= 0; i--) {
      if (isChatRole(cleanInput[i]?.role)) {
        lastChatIdx = i;
        break;
      }
    }
    const chatHistoryForQuery =
      lastChatIdx !== -1 ? cleanInput.slice(firstChatIdx, lastChatIdx + 1) : [];
    const trimmedTurns = trimAfterLastUserBeforeSystem(
      chatHistoryForQuery,
    ).filter((m) => isChatRole(m?.role));
    const queryRounds = Math.max(
      1,
      toInt(configCache.vector_search_query_dialogue_rounds, 4),
    );
    const recentMsgs = limitConversationByRounds(trimmedTurns, queryRounds);
    const resolvedQueryText =
      recentMsgs.map((m) => String(m.content || "")).join("\n") ||
      queryText ||
      "";

    const topK = Math.max(
      1,
      toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k),
    );
    const minScore = Number(configCache.vector_search_min_score) || 0;
    let topInactiveChunks = [];

    if (inactiveChunks.length > 0) {
      if (
        configCache.vector_search_enabled === 1 &&
        vectorEligibleInactiveChunks.length > 0
      ) {
        try {
          const finalQueryText = resolvedQueryText || " ";
          const queryVecs = await getEmbeddingsForTexts([finalQueryText], true);
          const queryVec = queryVecs[0];
          const store = await loadEmbeddingCacheStore();
          const cardName = char?.name || "Character";
          const cardKey = await getActiveCardKey(char);
          const cardBlock = store.cards?.[cardKey];

          const vectors = new Array(vectorEligibleInactiveChunks.length).fill(
            null,
          );
          const missingTexts = [];
          const missingIndices = [];

          for (let i = 0; i < vectorEligibleInactiveChunks.length; i++) {
            const chunk = vectorEligibleInactiveChunks[i];
            const cacheKey = `chunk|${simpleHash(chunk.content)}`;
            const hit = !chunk.isDynamic
              ? cardBlock?.entries?.[cacheKey]
              : null;
            if (hit && Array.isArray(hit.vector) && hit.vector.length)
              vectors[i] = hit.vector;
            else {
              missingTexts.push(chunk.content);
              missingIndices.push(i);
            }
          }

          if (missingTexts.length > 0) {
            const cfg = resolveEmbeddingRuntimeConfig();
            const batchSize = getEmbeddingBatchSize(cfg.requestModel);
            for (let i = 0; i < missingTexts.length; i += batchSize) {
              const textsBatch = missingTexts.slice(i, i + batchSize);
              const batchIndices = missingIndices.slice(i, i + batchSize);
              await Risuai.log(
                `${LOG} Agent: Running vector computation (${i + 1}~${Math.min(i + batchSize, missingTexts.length)}/${missingTexts.length})...`,
              );
              const remoteVecs = await fetchEmbeddingVectorsRemote(
                textsBatch,
                cfg,
              );
              let newlyAddedBatch = false;
              for (let j = 0; j < textsBatch.length; j++) {
                const vec = remoteVecs[j];
                if (vec && vec.length) {
                  const idx = batchIndices[j];
                  vectors[idx] = vec;
                  const chunk = vectorEligibleInactiveChunks[idx];
                  if (!chunk.isDynamic) {
                    upsertEmbeddingCacheEntry(
                      store,
                      cardKey,
                      cardName,
                      `chunk|${simpleHash(chunk.content)}`,
                      {
                        sourceType: "chunk",
                        name: chunk.source,
                        textHash: simpleHash(chunk.content),
                        dims: vec.length,
                        vector: vec,
                      },
                      cfg.requestModel,
                    );
                    newlyAddedBatch = true;
                  } else {
                    const memCacheKey = `${cfg.provider}|${cfg.format}|${cfg.url}|${cfg.requestModel}|${simpleHash(chunk.content)}`;
                    embeddingVectorCache.set(memCacheKey, vec);
                    if (embeddingVectorCache.size > 1000)
                      embeddingVectorCache.delete(
                        embeddingVectorCache.keys().next().value,
                      );
                  }
                }
              }
              if (newlyAddedBatch) await saveEmbeddingCacheStore();
            }
          }

          const scored = [];
          for (let i = 0; i < vectorEligibleInactiveChunks.length; i++) {
            if (vectors[i])
              scored.push({
                chunk: vectorEligibleInactiveChunks[i],
                score: cosineSimilarity(queryVec, vectors[i]),
              });
          }
          scored.sort((a, b) => b.score - a.score);
          const pickGroupChunks = (group) => {
            const valid = group.filter((x) => x.score >= minScore);
            return (valid.length ? valid : group)
              .slice(0, topK)
              .map((x) => x.chunk);
          };
          topInactiveChunks = [
            ...pickGroupChunks(scored.filter((x) => !x.chunk.isDynamic)),
            ...pickGroupChunks(scored.filter((x) => x.chunk.isDynamic)),
          ];
        } catch (e) {
          const embedDetail = _lastEmbedErrorMsg ? ` (${_lastEmbedErrorMsg})` : "";
          await Risuai.log(
            `${LOG} Vector search failed: ${e.message}${embedDetail}, falling back to keyword matching.`,
          );
          try {
            await Risuai.safeLocalStorage.setItem(
              LAST_SYNC_ERROR_KEY,
              `${LOG} Vector search failed and switched to keyword mode: ${e?.message || String(e)}${embedDetail}`,
            );
          } catch {}
        }
      }

      if (topInactiveChunks.length === 0) {
        if (resolvedQueryText.trim()) {
          const matchedChunks = [];
          for (const chunk of inactiveChunks) {
            if (
              checkLorebookTrigger(
                {
                  alwaysActive: false,
                  keyword: chunk.keywords || chunk.keyword || "",
                  keys: chunk.keys || [],
                  selective: chunk.selective || false,
                  secondkey: chunk.secondkey || "",
                  useRegex: chunk.useRegex || false,
                },
                resolvedQueryText,
              )
            ) {
              matchedChunks.push(chunk);
            }
          }
          if (matchedChunks.length > 0) {
            const categoryBuckets = {};
            for (const chunk of matchedChunks) {
              const cat = chunk.category || "information";
              if (!categoryBuckets[cat]) categoryBuckets[cat] = [];
              categoryBuckets[cat].push(chunk);
            }
            for (const cat of Object.keys(categoryBuckets)) {
              const catChunks = categoryBuckets[cat];
              topInactiveChunks.push(
                ...catChunks.filter((c) => !c.isDynamic).slice(0, topK),
              );
              topInactiveChunks.push(
                ...catChunks.filter((c) => c.isDynamic).slice(0, topK),
              );
            }
          } else {
            const queryTokens = tokenizeForSearch(resolvedQueryText);
            const scored = inactiveChunks.map((chunk) => ({
              chunk,
              score: scoreTokens(queryTokens, tokenizeForSearch(chunk.content)),
            }));
            scored.sort((a, b) => b.score - a.score);
            const pickTokenGroup = (group) =>
              group
                .filter((x) => x.score > minScore)
                .slice(0, topK)
                .map((x) => x.chunk);
            topInactiveChunks = [
              ...pickTokenGroup(scored.filter((x) => !x.chunk.isDynamic)),
              ...pickTokenGroup(scored.filter((x) => x.chunk.isDynamic)),
            ];
          }
        }
      }
    }

    const grouped = {
      rp_instruction: { active: [], inactive: [] },
      character: { active: [], inactive: [] },
      information: { active: [], inactive: [] },
      output_format: { active: [], inactive: [] },
    };
    const addToGroup = (chunk, isActive) => {
      let cat = chunk.category || "information";
      if (!grouped[cat]) cat = "information";
      grouped[cat][isActive ? "active" : "inactive"].push(
        `[${chunk.source}]\n${chunk.content}`,
      );
    };
    activeChunks.forEach((c) => addToGroup(c, true));
    topInactiveChunks.forEach((c) => addToGroup(c, false));

    const buildText = (arr) => (arr.length ? arr.join("\n\n") : "");

    const block1_arr = [];
    const t1a = buildText(grouped.rp_instruction.active);
    const t1b = buildText(grouped.rp_instruction.inactive);
    if (t1a) block1_arr.push(`[RP Instruction - Active]\n${t1a}`);
    if (t1b) block1_arr.push(`[RP Instruction - Context]\n${t1b}`);
    const block1 = block1_arr.join("\n\n");

    const block2_arr = [];
    const t2a = buildText(grouped.character.active);
    const t2b = buildText(grouped.character.inactive);
    if (t2a) block2_arr.push(`[Character - Active]\n${t2a}`);
    if (t2b) block2_arr.push(`[Character - Context]\n${t2b}`);
    const infoMerged = [
      buildText(grouped.information.active),
      buildText(grouped.information.inactive),
    ]
      .filter((t) => !!safeTrim(t))
      .join("\n\n");
    if (infoMerged) block2_arr.push(`[Information - Active]\n${infoMerged}`);
    const block2 = block2_arr.join("\n\n");

    const block3_arr = [];
    const t3a = buildText(grouped.output_format.inactive);
    const t3b = buildText(grouped.output_format.active);
    if (t3a) block3_arr.push(`[Output Format - Context]\n${t3a}`);
    if (t3b) block3_arr.push(`[Output Format - Active]\n${t3b}`);
    const block3 = block3_arr.join("\n\n");

    return injectKnowledgeByPlacementRules(
      cleanInput,
      { block1, block2, block3 },
      getScopeId(char),
    );
  }

  async function mergeToSystemPromptWithRewrite(messages, payload, queryText) {
    let injected = messages;
    try {
      injected = await injectKnowledgeIntoMessages(messages, queryText);
    } catch (e) {
      await Risuai.log(`${LOG} prompt injection failed: ${e.message}`);
      throw new Error(`Knowledge Injection Failed: ${e.message}`);
    }
    const clean = injected.filter((m) => {
      if (m?.role !== "system" || typeof m?.content !== "string") return true;
      return (
        !m.content.includes(`<${SYSTEM_INJECT_TAG}>`) &&
        !m.content.includes(`<${SYSTEM_REWRITE_TAG}>`)
      );
    });
    if (payload) {
      const injectedMsg = {
        role: "system",
        content: `<${SYSTEM_INJECT_TAG}>\n${JSON.stringify(payload, null, 2)}\n</${SYSTEM_INJECT_TAG}>`,
      };
      return [injectedMsg, ...clean];
    }
    return clean;
  }

async function getStaticDataPayload(char, chat, resolvedGlobalNote) {
    const lorebookEntries = await getCombinedLorebookEntries(char, chat);

    const renderedDesc = await normalizeAgentCbsText(char?.desc || char?.description || "");
    const renderedGlobalNote = await normalizeAgentCbsText(resolvedGlobalNote || "");
    return {
      step0_preprocess_version: "agent_cbs_render_v4", 
      desc: renderedDesc,
      globalNote: renderedGlobalNote,
      lorebook: lorebookEntries
        .filter((l) => l)
        .map((l) => ({
          comment: l.comment,
          content: l.content,
          alwaysActive:
            l.alwaysActive === true ||
            String(l.alwaysActive) === "true" ||
            l.constant === true ||
            String(l.constant) === "true",
          key: getPrimaryTriggerKeys(l).join(", "),
          secondkey: getSecondaryTriggerKeys(l).join(", "),
          selective: l.selective,
          useRegex: l.useRegex,
        })),
    };
  }

  function collectPersonaCharacterNames(cache) {
    const names = new Set();
    if (!cache || typeof cache !== "object") return names;
    const entries =
      cache.entries && typeof cache.entries === "object" ? cache.entries : {};

    const invNames = new Set();
    const coreNames = new Set();
    for (const k of Object.keys(entries)) {
      const invMatch = String(k).match(/^rp_persona_inventory_\((.+)\)$/);
      const coreMatch = String(k).match(/^rp_character_core_\((.+)\)$/);
      if (invMatch && invMatch[1]) invNames.add(safeTrim(invMatch[1]));
      if (coreMatch && coreMatch[1]) coreNames.add(safeTrim(coreMatch[1]));
    }
    for (const n of invNames) {
      if (coreNames.has(n)) names.add(n);
    }
    return names;
  }

  async function runPersonaExtraction(
    char,
    chunks,
    strict = false,
    options = {},
  ) {
    if (!isNewPresetEnabled()) {
      try {
        await Risuai.log(
          `${LOG} Persona extraction skipped: new preset not enabled.`,
        );
      } catch {}
      return;
    }

    let cache = await loadPersonaCache(await getActiveCardKey(char));
    if (!cache) {
      cache = { updatedAt: Date.now(), entries: {}, completedTasks: [] };
    } else if (!cache.completedTasks) {
      cache.completedTasks = [];
    }
    try {
      const cardName = safeTrim(char?.name || "Character");
      const cardKey = await getActiveCardKey(char);
      const personaCalls = parsePersonaCalls(configCache.persona_calls);
      if (!personaCalls.length) {
        try {
          await Risuai.log(
            `${LOG} Persona extraction skipped: no persona calls configured.`,
          );
        } catch {}
        return;
      }

      const missingOnly = options?.missingOnly === true;
      const existingNames = missingOnly
        ? collectPersonaCharacterNames(cache)
        : new Set();
      const existingList =
        missingOnly && existingNames.size > 0 ? Array.from(existingNames) : [];

      const characterChunks = (chunks || []).filter(
        (c) => c?.category === "character",
      );
      const effectiveChunks =
        characterChunks.length > 0
          ? characterChunks
          : (chunks || []).filter((c) => c?.alwaysActive === true);
      if (effectiveChunks.length === 0) {
        try {
          await Risuai.log(
            `${LOG} Persona extraction skipped: no character or alwaysActive chunks.`,
          );
        } catch {}
        return;
      }
      if (characterChunks.length === 0) {
        try {
          await Risuai.log(
            `${LOG} Persona extraction: no classified-character chunks; falling back to alwaysActive chunks (${effectiveChunks.length}).`,
          );
        } catch {}
      }

      const resolved = resolveExtractorConfig();

      const chunkBatches = [];
      for (let i = 0; i < effectiveChunks.length; i += 5) {
        const batch = effectiveChunks.slice(i, i + 5);
        let text = batch.map((c) => `[${c.source}]\n${c.content}`).join("\n\n");
        if (missingOnly && existingList.length > 0) {
          const existingNote = `\n\n[Already Extracted Characters]\n${existingList
            .slice(0, 50)
            .map((n) => `- ${n}`)
            .join(
              "\n",
            )}\n\nONLY extract missing characters not in the list above. Do NOT repeat existing characters.`;
          text += existingNote;
        }
        if (safeTrim(text)) chunkBatches.push(text);
      }
      if (chunkBatches.length === 0) return;

      const tasks = [];
      for (const call of personaCalls) {
        for (const batchText of chunkBatches) {
          const taskId = simpleHash(JSON.stringify(call) + batchText);
          if (!cache.completedTasks.includes(taskId)) {
            tasks.push({ call, batchText, taskId });
          }
        }
      }

      if (tasks.length === 0) {
        try {
          await Risuai.log(
            `${LOG} Persona extraction: all tasks already completed.`,
          );
        } catch {}
      } else {
        try {
          await Risuai.log(
            `${LOG} Persona extraction: running ${tasks.length} tasks...`,
          );
        } catch {}

        const executeTask = async (task) => {
          const { call, batchText } = task;
          const endpoint = call.target_model === "B" ? resolved.b : resolved.a;
          const messages = await buildPersonaExtractorMessages(batchText, call);
          const result = await callExtractorStrict({
            url: endpoint.url,
            apiKey: endpoint.key,
            model: endpoint.model,
            format: endpoint.format,
            temperature: endpoint.temperature,
            messages,
            timeoutMs: configCache.timeout_ms,
            mode: "Persona_Extraction",
            thinkingEnabled: endpoint.thinkingEnabled || false,
            thinkingLevel: endpoint.thinkingLevel || "",
          });
          return { call, result, taskId: task.taskId };
        };

        const PARALLEL_LIMIT = 3;
        const parallelTasks = tasks.filter((t) => {
          const target = safeTrim(t.call?.target_model) === "B" ? "B" : "A";
          return target === "B"
            ? configCache.extractor_b_concurrency === 1
            : configCache.extractor_a_concurrency === 1;
        });
        const sequentialTasks = tasks.filter((t) => {
          const target = safeTrim(t.call?.target_model) === "B" ? "B" : "A";
          return target === "B"
            ? configCache.extractor_b_concurrency !== 1
            : configCache.extractor_a_concurrency !== 1;
        });

        const results = [];
        let personaTaskErrors = [];
        for (let i = 0; i < parallelTasks.length; i += PARALLEL_LIMIT) {
          const batch = parallelTasks.slice(i, i + PARALLEL_LIMIT);
          const batchResults = await Promise.allSettled(batch.map(executeTask));
          results.push(...batchResults);
          personaTaskErrors = collectSettledErrors(batchResults);
          if (personaTaskErrors.length > 0) break;
        }
        if (personaTaskErrors.length === 0) {
          for (const task of sequentialTasks) {
            const settled = await Promise.allSettled([executeTask(task)]).then(
              (r) => r[0],
            );
            results.push(settled);
            personaTaskErrors = collectSettledErrors([settled]);
            if (personaTaskErrors.length > 0) break;
          }
        }

        for (const res of results) {
          if (res.status !== "fulfilled") {
            try {
              await Risuai.log(
                `${LOG} Persona extraction call failed: ${res.reason?.message || res.reason || "unknown"}`,
              );
            } catch {}
            continue;
          }
          const { call, result, taskId } = res.value;
          const alignedParsed = alignParsedObjectToEntries(
            result?.raw || "",
            result?.parsed || {},
            call.entries || [],
          );
          const personaEntries = extractPersonaEntries(
            alignedParsed,
            call.entries || [],
            cardName,
          );
          const requiredPair =
            (call.entries || []).some(
              (e) => safeTrim(e?.lorebook_name) === "rp_persona_inventory",
            ) &&
            (call.entries || []).some(
              (e) => safeTrim(e?.lorebook_name) === "rp_character_core",
            );

          const charInventorySet = new Set(
            personaEntries
              .filter((e) => safeTrim(e.entryKey) === "rp_persona_inventory")
              .map((e) => safeTrim(e.charName)),
          );
          const charCoreSet = new Set(
            personaEntries
              .filter((e) => safeTrim(e.entryKey) === "rp_character_core")
              .map((e) => safeTrim(e.charName)),
          );
          const pairedCharNames = new Set(
            [...charInventorySet].filter((n) => charCoreSet.has(n)),
          );
          const hasInventory = charInventorySet.size > 0;
          const hasCore = charCoreSet.size > 0;

          let wroteCount = 0;
          for (const e of personaEntries) {
            const charName = safeTrim(e.charName);
            if (missingOnly && existingNames.has(charName)) continue;

            if (requiredPair && !pairedCharNames.has(charName)) {
              try {
                await Risuai.log(
                  `${LOG} Persona extraction: skipping incomplete entry for "${charName}" (${e.entryKey} present but counterpart missing). Will retry.`,
                );
              } catch {}
              continue;
            }

            const existing = cache.entries[e.cacheName];
            const existingValue = existing
              ? getPersonaValueFromCacheEntry(existing, e.entryKey, e.charName)
              : null;
            const mergedValue = mergePersonaValues(existingValue, e.value);
            if (!mergedValue || typeof mergedValue !== "object") continue;
            const payloadObj = { [e.entryKey]: { [e.charName]: mergedValue } };
            const text = JSON.stringify(payloadObj, null, 2);
            const textHash = simpleHash(text);
            cache.entries[e.cacheName] = {
              name: e.cacheName,
              text,
              textHash,
              updatedAt: Date.now(),
            };
            wroteCount++;
          }
          const shouldMarkComplete = requiredPair
            ? pairedCharNames.size > 0
            : wroteCount > 0;
          if (!shouldMarkComplete) {
            try {
              await Risuai.log(
                `${LOG} Persona extraction partial output (no complete pair for any character). Will retry task: ${safeTrim(call?.name || call?.id || "unknown")}`,
              );
            } catch {}
          } else {
            if (
              requiredPair &&
              (charInventorySet.size !== charCoreSet.size ||
                [...charInventorySet].some((n) => !charCoreSet.has(n)))
            ) {
              const unpaired = [...charInventorySet, ...charCoreSet].filter(
                (n) => !pairedCharNames.has(n),
              );
              try {
                await Risuai.log(
                  `${LOG} Persona extraction: ${pairedCharNames.size} character(s) fully paired; ${unpaired.length} unpaired entry(ies) discarded: ${unpaired.join(", ")}`,
                );
              } catch {}
            }
            cache.completedTasks.push(taskId);
          }
          await savePersonaCache(cardKey, cache);
        }

        if (personaTaskErrors.length > 0) {
          throw new Error(
            `Persona extraction stopped early after task failure: ${personaTaskErrors.join(" | ")}`,
          );
        }

        {
          const postEntries = cache.entries || {};
          const postInvNames = new Set();
          const postCoreNames = new Set();
          for (const k of Object.keys(postEntries)) {
            const im = String(k).match(/^rp_persona_inventory_\((.+)\)$/);
            const cm = String(k).match(/^rp_character_core_\((.+)\)$/);
            if (im) postInvNames.add(im[1]);
            if (cm) postCoreNames.add(cm[1]);
          }
          const orphans = [
            ...[...postInvNames].filter((n) => !postCoreNames.has(n)),
            ...[...postCoreNames].filter((n) => !postInvNames.has(n)),
          ];
          if (orphans.length > 0) {
            for (const orphanName of orphans) {
              delete postEntries[`rp_persona_inventory_(${orphanName})`];
              delete postEntries[`rp_character_core_(${orphanName})`];
            }
            cache.completedTasks = [];
            try {
              await Risuai.log(
                `${LOG} Cross-call pairing audit: removed ${orphans.length} orphan character(s) with incomplete pairs: ${orphans.join(", ")}. Tasks reset for retry.`,
              );
            } catch {}
            await savePersonaCache(cardKey, cache);
          }
        }
      }
      const entries = Object.values(cache.entries || {});
      if (entries.length === 0) {
        if (strict) {
          throw new Error(
            "Persona extraction produced no cache entries (all pairs were orphaned or extraction returned empty).",
          );
        }
        return;
      }

      const store = await loadEmbeddingCacheStore();
      const cfg = resolveEmbeddingRuntimeConfig();
      const embedBatchSize = getEmbeddingBatchSize(cfg.requestModel);
      const missingEntries = entries.filter((entry) => {
        const cacheKey = `persona|${entry.textHash}`;
        const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
        return !hit || !hit.vector || !hit.vector.length;
      });

      if (missingEntries.length > 0) {
        try {
          await Risuai.log(
            `${LOG} Persona extraction: embedding ${missingEntries.length} missing cache entries...`,
          );
        } catch {}
        for (let i = 0; i < missingEntries.length; i += embedBatchSize) {
          const batch = missingEntries.slice(i, i + embedBatchSize);
          const vecs = await fetchEmbeddingVectorsRemote(
            batch.map((x) => x.text),
            cfg,
            strict,
          );
          let newlyAdded = false;
          vecs.forEach((vec, idx) => {
            if (vec && vec.length) {
              const entry = batch[idx];
              upsertEmbeddingCacheEntry(
                store,
                cardKey,
                cardName,
                `persona|${entry.textHash}`,
                {
                  sourceType: "persona",
                  name: entry.name,
                  textHash: entry.textHash,
                  dims: vec.length,
                  vector: vec,
                  text: entry.text,
                },
                cfg.requestModel,
              );
              newlyAdded = true;
            }
          });
          if (newlyAdded) await saveEmbeddingCacheStore(store);
        }
      }
      try {
        await Risuai.log(
          `${LOG} Persona extraction done: ${entries.length} cache entries.`,
        );
      } catch {}
    } catch (err) {
      try {
        await Risuai.log(
          `${LOG} Persona extraction failed: ${err?.message || String(err)}`,
        );
      } catch {}
      if (strict) throw err;
    }
  }

  async function runStep0Classification(
    char,
    chat,
    resolvedGlobalNote,
    staticDataHash,
    staticKeys,
    resumeMode = false,
    classifyDoneMode = false,
    reembedMode = false,
  ) {
    if (!isKbFeatureEnabled() && !isNewPresetEnabled()) {
      try {
        await Risuai.pluginStorage.setItem(
          staticKeys.staticKnowledgeChunks,
          "[]",
        );
      } catch {}
      try {
        await Risuai.pluginStorage.setItem(
          staticKeys.staticDataHash,
          staticDataHash,
        );
      } catch {}
      try {
        await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
      } catch {}
      return;
    }

    if (
      reembedMode &&
      (configCache.vector_search_enabled === 1 || isNewPresetEnabled())
    ) {
      try {
        const cfg = resolveEmbeddingRuntimeConfig();
        const cardKey = await getActiveCardKey(char);
        const cardName = safeTrim(char?.name || "Character");

        embeddingCacheStore = null;
        const store = await loadEmbeddingCacheStore();
        if (store.cards?.[cardKey]) {
          if (store.cards[cardKey].modelName !== cfg.requestModel) {
            store.cards[cardKey].entries = {};
            store.cards[cardKey].modelName = cfg.requestModel;
            store.cards[cardKey].updatedAt = Date.now();
            await saveEmbeddingCacheStore(store, {
              replaceCardKeys: [cardKey],
            });
          }
        }

        let savedChunks = [];
        try {
          const raw = await Risuai.pluginStorage.getItem(
            staticKeys.staticKnowledgeChunks,
          );
          if (raw) savedChunks = JSON.parse(raw);
          if (!Array.isArray(savedChunks)) savedChunks = [];
        } catch {
          savedChunks = [];
        }

        if (configCache.vector_search_enabled === 1) {
          const inactiveChunks = savedChunks.filter(
            (c) => !c.alwaysActive && hasPrimaryTriggerKey(c),
          );
          const missingInactiveChunks = inactiveChunks.filter((chunk) => {
            const textHash = simpleHash(chunk.content);
            const cacheKey = `chunk|${textHash}`;
            const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
            return !hit || !hit.vector || !hit.vector.length;
          });

          if (missingInactiveChunks.length > 0) {
            await Risuai.log(
              `${LOG} Re-embed: indexing ${missingInactiveChunks.length} missing knowledge chunks...`,
            );
            const embedBatchSize = getEmbeddingBatchSize(cfg.requestModel);
            const freshStore = await loadEmbeddingCacheStore();
            for (
              let i = 0;
              i < missingInactiveChunks.length;
              i += embedBatchSize
            ) {
              const batch = missingInactiveChunks.slice(i, i + embedBatchSize);
              const vecs = await fetchEmbeddingVectorsRemote(
                batch.map((c) => c.content),
                cfg,
                true,
              );
              let added = false;
              vecs.forEach((vec, idx) => {
                if (vec && vec.length) {
                  const chunk = batch[idx];
                  const textHash = simpleHash(chunk.content);
                  upsertEmbeddingCacheEntry(
                    freshStore,
                    cardKey,
                    cardName,
                    `chunk|${textHash}`,
                    {
                      sourceType: "chunk",
                      name: chunk.source,
                      textHash,
                      dims: vec.length,
                      vector: vec,
                    },
                    cfg.requestModel,
                  );
                  added = true;
                }
              });
              if (added) await saveEmbeddingCacheStore(freshStore);
            }
          }
        }

        if (isNewPresetEnabled()) {
          const personaCache = await loadPersonaCache(cardKey);
          const personaEntries = Object.values(personaCache?.entries || {});
          const missingPersonaEntries = personaEntries.filter((entry) => {
            const cacheKey = `persona|${entry.textHash}`;
            const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
            return !hit || !hit.vector || !hit.vector.length;
          });

          if (missingPersonaEntries.length > 0) {
            await Risuai.log(
              `${LOG} Re-embed: indexing ${missingPersonaEntries.length} missing persona cache entries...`,
            );
            const embedBatchSize = getEmbeddingBatchSize(cfg.requestModel);
            const freshStore = await loadEmbeddingCacheStore();
            for (
              let i = 0;
              i < missingPersonaEntries.length;
              i += embedBatchSize
            ) {
              const batch = missingPersonaEntries.slice(i, i + embedBatchSize);
              const vecs = await fetchEmbeddingVectorsRemote(
                batch.map((e) => e.text),
                cfg,
                true,
              );
              let added = false;
              vecs.forEach((vec, idx) => {
                if (vec && vec.length) {
                  const entry = batch[idx];
                  upsertEmbeddingCacheEntry(
                    freshStore,
                    cardKey,
                    cardName,
                    `persona|${entry.textHash}`,
                    {
                      sourceType: "persona",
                      name: entry.name,
                      textHash: entry.textHash,
                      dims: vec.length,
                      vector: vec,
                      text: entry.text,
                    },
                    cfg.requestModel,
                  );
                  added = true;
                }
              });
              if (added) await saveEmbeddingCacheStore(freshStore);
            }
          }
        }

        await Risuai.pluginStorage.setItem(
          staticKeys.staticDataHash,
          staticDataHash,
        );
        await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
        await Risuai.log(
          `${LOG} Re-embed complete. New model: ${cfg.requestModel}`,
        );
        await new Promise((r) => setTimeout(r, 500));
        return;
      } catch (err) {
        await Risuai.log(
          `${LOG} Re-embed failed (${err?.message || String(err)}).`,
        );
        throw err;
      }
    }

    const chunks = [];
    let chunkId = 0;
    const embedCfg = resolveEmbeddingRuntimeConfig();
    const isVectorEnabled = configCache.vector_search_enabled === 1;

    const addChunks = (
      source,
      content,
      alwaysActive,
      triggerMeta = null,
      categoryOverride = "",
    ) => {
      if (!content) return;
      // BUGFIX: Content should already be rendered by normalizeAgentCbsText
      // No need to call cbsToIndexPlaceholders here
      const preprocessed = content;
      const splits = splitIntoParagraphChunks(preprocessed);
      const primaryKeys = getPrimaryTriggerKeys(triggerMeta);
      const secondaryKeys = getSecondaryTriggerKeys(triggerMeta);
      const useRegex =
        triggerMeta?.useRegex === true ||
        String(triggerMeta?.useRegex) === "true";
      const selective =
        triggerMeta?.selective === true ||
        String(triggerMeta?.selective) === "true";
      splits.forEach((text) => {
        if (text.trim()) {
          chunks.push({
            id: `chk_${chunkId++}`,
            source,
            content: text,
            alwaysActive,
            category:
              safeTrim(categoryOverride) ||
              (alwaysActive ? "information" : "unknown"),
            key: primaryKeys.join(", "),
            keys: primaryKeys,
            secondkey: secondaryKeys.join(", "),
            selective,
            useRegex,
            hasPrimaryKey: primaryKeys.length > 0,
          });
        }
      });
    };

    const renderedDescForChunks = await normalizeAgentCbsText(
      char?.desc || char?.description || ""
    );
    const renderedGlobalForChunks = await normalizeAgentCbsText(
      resolvedGlobalNote || ""
    );
    addChunks("Character Description", renderedDescForChunks, true);
    addChunks("Global Note", renderedGlobalForChunks, true);

    const lorebook = await getCombinedLorebookEntries(char, chat);
    for (const l of lorebook) {
      if (!l) continue;
      const source = l.comment || `Lorebook ${lorebook.indexOf(l)}`;
      const isActive =
        l.alwaysActive === true ||
        String(l.alwaysActive) === "true" ||
        l.constant === true ||
        String(l.constant) === "true";
      // BUGFIX: Render CBS syntax in lorebook content before adding chunks
      const renderedContent = await normalizeAgentCbsText(l.content || "");
      addChunks(source, renderedContent, isActive, l);
    }

    if (chunks.length === 0) {
      await Risuai.pluginStorage.setItem(
        staticKeys.staticKnowledgeChunks,
        "[]",
      );
      await Risuai.pluginStorage.setItem(
        staticKeys.staticDataHash,
        staticDataHash,
      );
      await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
      return;
    }

    if (resumeMode) {
      try {
        const savedChunksRaw = await Risuai.pluginStorage.getItem(
          staticKeys.staticKnowledgeChunks,
        );
        if (savedChunksRaw) {
          const savedChunks = JSON.parse(savedChunksRaw);
          if (Array.isArray(savedChunks) && savedChunks.length > 0) {
            const savedMap = new Map(savedChunks.map((c) => [c.id, c]));
            for (const chunk of chunks) {
              const saved = savedMap.get(chunk.id);
              if (saved) {
                if (saved.category) chunk.category = saved.category;
                if (saved.classified) chunk.classified = saved.classified;
              }
            }
            const inactiveChunks2 = chunks.filter(
              (c) => !c.alwaysActive && hasPrimaryTriggerKey(c),
            );
            if (
              inactiveChunks2.length > 0 &&
              configCache.vector_search_enabled === 1
            ) {
              embeddingCacheStore = null;
              const store = await loadEmbeddingCacheStore();
              const charName = safeTrim(char?.name || "Character");
              const cardKey = await getActiveCardKey(char);
              const missingChunks2 = inactiveChunks2.filter((chunk) => {
                const textHash = simpleHash(chunk.content);
                const cacheKey = `chunk|${textHash}`;
                const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
                return !hit || !hit.vector || !hit.vector.length;
              });
              if (missingChunks2.length > 0) {
                const cfg = resolveEmbeddingRuntimeConfig();
                const embedBatchSize = getEmbeddingBatchSize(cfg.requestModel);
                for (
                  let i = 0;
                  i < missingChunks2.length;
                  i += embedBatchSize
                ) {
                  const batch = missingChunks2.slice(i, i + embedBatchSize);
                  const vecs = await fetchEmbeddingVectorsRemote(
                    batch.map((c) => c.content),
                    cfg,
                    true,
                  );
                  let newlyAdded = false;
                  vecs.forEach((vec, idx) => {
                    if (vec && vec.length) {
                      const chunk = batch[idx];
                      const textHash = simpleHash(chunk.content);
                      upsertEmbeddingCacheEntry(
                        store,
                        cardKey,
                        charName,
                        `chunk|${textHash}`,
                        {
                          sourceType: "chunk",
                          name: chunk.source,
                          textHash,
                          dims: vec.length,
                          vector: vec,
                        },
                        cfg.requestModel,
                      );
                      newlyAdded = true;
                    }
                  });
                  if (newlyAdded) await saveEmbeddingCacheStore(store);
                }
              }
            }
            await Risuai.pluginStorage.setItem(
              staticKeys.staticKnowledgeChunks,
              JSON.stringify(chunks),
            );
            await Risuai.pluginStorage.setItem(
              staticKeys.staticDataHash,
              staticDataHash,
            );
            const chunksToClassify = chunks.filter(
              (c) => !c.alwaysActive && !c.classified,
            );
            if (chunksToClassify.length === 0) {
              if (isNewPresetEnabled()) {
                try {
                  await runPersonaExtraction(char, chunks, true);
                } catch (personaErr) {
                  const personaErrMsg =
                    personaErr?.message || String(personaErr);
                  try {
                    await Risuai.log(
                      `${LOG} ⚠️ Persona extraction failed during Step 0 resumeMode (will retry on next send): ${personaErrMsg}`,
                    );
                  } catch {}
                }
              }
              await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
              await new Promise((r) => setTimeout(r, 1000));
              return;
            }
          }
        }
      } catch (e) {
        throw e;
      }
    }

    const anchor =
      configCache.init_bootstrap_model_anchor_prompt ||
      DEFAULTS.init_bootstrap_model_anchor_prompt;
    const resolved = resolveExtractorConfig();
    const targetModel =
      safeTrim(configCache.init_bootstrap_target_model) === "B" ? "B" : "A";
    const endpoint = targetModel === "B" ? resolved.b : resolved.a;

    const allowActiveClassification =
      isKbFeatureEnabled() || isNewPresetEnabled();
    const chunksToClassify = allowActiveClassification
      ? chunks
      : chunks.filter((c) => !c.alwaysActive);
    const skipClassification =
      classifyDoneMode || !safeTrim(endpoint.url) || !safeTrim(endpoint.model);
    if (classifyDoneMode) {
      try {
        const savedRaw = await Risuai.pluginStorage.getItem(
          staticKeys.staticKnowledgeChunks,
        );
        if (savedRaw) {
          const savedChunks = JSON.parse(savedRaw);
          if (Array.isArray(savedChunks) && savedChunks.length > 0) {
            const savedMap = new Map(savedChunks.map((c) => [c.id, c]));
            for (const chunk of chunks) {
              const saved = savedMap.get(chunk.id);
              if (saved) {
                if (saved.category) chunk.category = saved.category;
                if (saved.classified) chunk.classified = saved.classified;
              }
            }
          }
        }
      } catch {}
    }

    const unclassifiedChunks = chunksToClassify.filter((c) => !c.classified);

    if (!skipClassification && unclassifiedChunks.length > 0) {
      const batchSize = 10;
      const totalBatches = Math.ceil(unclassifiedChunks.length / batchSize);
      for (let i = 0; i < unclassifiedChunks.length; i += batchSize) {
        const currentBatch = Math.floor(i / batchSize) + 1;
        await Risuai.log(
          `${LOG} Running initial data classification (${currentBatch}/${totalBatches})...`,
        );
        const batch = unclassifiedChunks.slice(i, i + batchSize);
        const payload = batch.map((c) => ({ id: c.id, text: c.content }));
        const prefillPrompt = safeTrim(configCache.advanced_prefill_prompt);
        const prereplyPrompt = safeTrim(configCache.advanced_prereply_prompt);
        const assistantPrefill = prefillPrompt
          ? [prefillPrompt, prereplyPrompt]
              .filter((s) => !!safeTrim(s))
              .join("\n")
          : "";
        const messages = buildModelMessages(
          anchor,
          "Classify these blocks:\n" + JSON.stringify(payload, null, 2),
          assistantPrefill,
          prereplyPrompt,
        );

        try {
          const result = await callExtractorStrict({
            url: endpoint.url,
            apiKey: endpoint.key,
            model: endpoint.model,
            format: endpoint.format,
            temperature: endpoint.temperature,
            messages,
            timeoutMs: configCache.timeout_ms,
            mode: "Step0_Classification",
          });
          const parsed = normalizeStep0ClassificationResult(
            result.parsed,
            result.raw,
          );
          if (parsed.length > 0) {
            parsed.forEach((p) => {
              const chunk = chunks.find((c) => c.id === p.id);
              if (chunk && (allowActiveClassification || !chunk.alwaysActive)) {
                const cat = String(p.category || "").toLowerCase();
                if (cat.includes("instruction"))
                  chunk.category = "rp_instruction";
                else if (cat.includes("format") || cat.includes("output"))
                  chunk.category = "output_format";
                else if (cat.includes("character"))
                  chunk.category = "character";
                else chunk.category = "information";
                chunk.classified = true;
              }
            });
          }
          await Risuai.pluginStorage.setItem(
            staticKeys.staticKnowledgeChunks,
            JSON.stringify(chunks),
          );
        } catch (err) {
          console.warn(`${LOG} Classification batch failed:`, err);
          throw err;
        }
      }
      await Risuai.pluginStorage.setItem(
        staticKeys.staticKnowledgeChunks,
        JSON.stringify(chunks),
      );
    }

    if (isNewPresetEnabled()) {
      try {
        await runPersonaExtraction(char, chunks, true);
      } catch (personaErr) {
        const personaErrMsg = personaErr?.message || String(personaErr);
        try {
          await Risuai.log(
            `${LOG} ⚠️ Persona extraction failed during Step 0 (will retry on next send): ${personaErrMsg}`,
          );
        } catch {}
      }
    }

    const inactiveChunks = chunks.filter(
      (c) => !c.alwaysActive && hasPrimaryTriggerKey(c),
    );
    if (inactiveChunks.length > 0 && configCache.vector_search_enabled === 1) {
      embeddingCacheStore = null;
      const store = await loadEmbeddingCacheStore();
      const charName = safeTrim(char?.name || "Character");
      const cardKey = await getActiveCardKey(char);

      const currentHashSet = new Set(
        inactiveChunks.map((c) => `chunk|${simpleHash(c.content)}`),
      );
      const cardEntries = store.cards?.[cardKey]?.entries;
      if (cardEntries) {
        let orphanFound = false;
        for (const cacheKey of Object.keys(cardEntries)) {
          if (cacheKey.startsWith("chunk|") && !currentHashSet.has(cacheKey)) {
            delete cardEntries[cacheKey];
            orphanFound = true;
          }
        }
        if (orphanFound)
          await saveEmbeddingCacheStore(store, {
            replaceCardKeys: [cardKey],
          });
      }

      const missingChunks = [];
      inactiveChunks.forEach((chunk) => {
        const textHash = simpleHash(chunk.content);
        const cacheKey = `chunk|${textHash}`;
        const hit = store.cards?.[cardKey]?.entries?.[cacheKey];
        if (!hit || !hit.vector || !hit.vector.length) {
          missingChunks.push(chunk);
        }
      });

      if (missingChunks.length > 0) {
        try {
          const cfg = resolveEmbeddingRuntimeConfig();
          const embedBatchSize = getEmbeddingBatchSize(cfg.requestModel);
          let successCount = 0;

          for (let i = 0; i < missingChunks.length; i += embedBatchSize) {
            const chunksBatch = missingChunks.slice(i, i + embedBatchSize);
            const textsBatch = chunksBatch.map((c) => c.content);
            const vecs = await fetchEmbeddingVectorsRemote(
              textsBatch,
              cfg,
              true,
            );
            let newlyAdded = false;

            vecs.forEach((vec, idx) => {
              if (vec && vec.length) {
                const chunk = chunksBatch[idx];
                const textHash = simpleHash(chunk.content);
                upsertEmbeddingCacheEntry(
                  store,
                  cardKey,
                  charName,
                  `chunk|${textHash}`,
                  {
                    sourceType: "chunk",
                    name: chunk.source,
                    textHash: textHash,
                    dims: vec.length,
                    vector: vec,
                  },
                  cfg.requestModel,
                );
                newlyAdded = true;
                successCount++;
              }
            });

            if (newlyAdded) {
              await saveEmbeddingCacheStore(store);
            }
          }
        } catch (e) {
          try {
            await saveEmbeddingCacheStore(store);
          } catch (err) {}
          try {
            await Risuai.pluginStorage.setItem(
              staticKeys.staticKnowledgeChunks,
              JSON.stringify(chunks),
            );
            await Risuai.pluginStorage.setItem(
              staticKeys.staticDataHash,
              staticDataHash,
            );
          } catch {}
          try {
            await Risuai.pluginStorage.setItem(
              staticKeys.step0Pending,
              "classify_done",
            );
          } catch {}
          const vecErrMsg = e?.message || String(e);
          const embedDetail = _lastEmbedErrorMsg && !vecErrMsg.includes(_lastEmbedErrorMsg)
            ? ` — ${_lastEmbedErrorMsg}`
            : "";
          try {
            await Risuai.log(
              `${LOG} ❌ Chunk vector indexing failed: ${vecErrMsg}${embedDetail}`,
            );
          } catch {}
          throw new Error(
            typeof _T.err_vec_kb_failed === "function"
              ? _T.err_vec_kb_failed(`${vecErrMsg}${embedDetail}`)
              : `[RisuAI Agent] Vector knowledge base build failed. Progress has been saved.\nError: ${vecErrMsg}${embedDetail}\nPlease wait, then click Regenerate/Send to resume.`,
          );
        }
      }
    }

    await Risuai.pluginStorage.setItem(
      staticKeys.staticKnowledgeChunks,
      JSON.stringify(chunks),
    );
    await Risuai.pluginStorage.setItem(
      staticKeys.staticDataHash,
      staticDataHash,
    );
    await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
    await new Promise((r) => setTimeout(r, 1000));
  }

  async function resolveCurrentChatIndex() {
    try {
      if (typeof Risuai.getCurrentChatIndex === "function")
        return await Risuai.getCurrentChatIndex();
    } catch {}
    return -1;
  }

  async function getCurrentCharAndChatSafe() {
    try {
      const char = await Risuai.getCharacter();
      const charIdx =
        typeof Risuai.getCurrentCharacterIndex === "function"
          ? await Risuai.getCurrentCharacterIndex()
          : -1;
      const chatIndex = await resolveCurrentChatIndex();
      if (char && charIdx >= 0 && chatIndex >= 0) {
        const chat = await Risuai.getChatFromIndex(charIdx, chatIndex);
        return { char, charIdx, chatIndex, chat };
      }
      return { char: char || null, charIdx: -1, chatIndex: -1, chat: null };
    } catch {
      return { char: null, charIdx: -1, chatIndex: -1, chat: null };
    }
  }

  async function continueChatFromCharacter(charIdx, sourceChatIndex) {
    const currentCharIdx =
      typeof Risuai.getCurrentCharacterIndex === "function"
        ? await Risuai.getCurrentCharacterIndex()
        : -1;
    const activeChar =
      currentCharIdx === charIdx ? await Risuai.getCharacter() : null;
    const indexedChar = await Risuai.getCharacterFromIndex(charIdx);
    const char = activeChar && Array.isArray(activeChar?.chats) ? activeChar : indexedChar;
    const chats = Array.isArray(char?.chats) ? char.chats : [];
    if (!char || chats.length === 0) {
      throw new Error(
        _T.st_continue_chat_no_chat_for_card ||
          "This character has no available chat to continue.",
      );
    }

    const sourceIdx = Math.max(
      0,
      Math.min(chats.length - 1, Math.floor(Number(sourceChatIndex) || 0)),
    );
    const sourceChat = chats[sourceIdx];
    if (!sourceChat) {
      throw new Error(
        _T.st_continue_chat_no_chat ||
          "No active chat was found to continue.",
      );
    }

    const updatedChar = deepCloneValue(char);
    updatedChar.chats = Array.isArray(updatedChar.chats)
      ? updatedChar.chats.map((entry) => deepCloneValue(entry))
      : [];

    const { chat: continuedChat, meta } = buildContinuedChat(sourceChat, 5);
    updatedChar.chats.unshift(continuedChat);
    updatedChar.chatPage = 0;

    await Risuai.setCharacterToIndex(charIdx, updatedChar);
    if (currentCharIdx === charIdx) {
      await Risuai.setCharacter(updatedChar);
    }
    return meta;
  }

  async function performChatCleanup(userMsgCount) {
    return mutexLoreWrite.run(async () => {
      const { charIdx, chatIndex, chat } = await getCurrentChatContextSafe();
      if (
        !chat ||
        chatIndex < 0 ||
        charIdx < 0 ||
        !Array.isArray(chat.localLore)
      )
        return false;

      let loreModified = false;
      const newLocalLore = [];

      for (let i = 0; i < chat.localLore.length; i++) {
        let entry = chat.localLore[i];
        if (!entry || typeof entry.content !== "string") {
          newLocalLore.push(entry);
          continue;
        }
        const originalContent = entry.content;

        const owMatch = originalContent.match(
          /^## .*?\n<!-- written_at_turn: (\d+) -->/m,
        );
        if (owMatch) {
          const writtenAt = Number(owMatch[1]);
          if (Number.isFinite(writtenAt) && writtenAt > userMsgCount) {
            loreModified = true;
            const headerLine = (originalContent.match(/^## .+/) || [""])[0];
            if (headerLine) {
              entry = { ...entry, content: headerLine + "\n" };
              newLocalLore.push(entry);
            } else {
              newLocalLore.push(entry);
            }
            continue;
          }
          newLocalLore.push(entry);
          continue;
        }

        if (!hasTurnMarkers(originalContent)) {
          newLocalLore.push(entry);
          continue;
        }

        const headerMatch = originalContent.match(/^## .*?\n/);
        const header = headerMatch ? headerMatch[0] : "";
        const rest = headerMatch
          ? originalContent.slice(header.length)
          : originalContent;

        const blocks = splitTurnBlocks(rest);
        const validBlocks = [];
        let entryChanged = false;

        for (const block of blocks) {
          const turn = parseTurnNumberFromBlock(block);
          if (turn !== null) {
            if (turn > userMsgCount) {
              entryChanged = true;
              continue;
            }
          }
          if (block.trim()) validBlocks.push(block.trim());
        }

        if (entryChanged) {
          loreModified = true;
          if (validBlocks.length === 0) {
            const trimmedHeader = header.trimEnd();
            if (trimmedHeader)
              newLocalLore.push({ ...entry, content: trimmedHeader });
            continue;
          }
          entry = { ...entry, content: header + validBlocks.join("\n\n") };
        }
        newLocalLore.push(entry);
      }

      if (loreModified) {
        chat.localLore = newLocalLore;
        try {
          await Risuai.setChatToIndex(charIdx, chatIndex, chat);
          return true;
        } catch (e) {
          console.warn(`${LOG} performChatCleanup failed:`, e);
          return false;
        }
      }
      return loreModified;
    });
  }

  function renderProviderOptions(selected) {
    return MODEL_PROVIDER_OPTIONS.map((opt) => {
      const isSel = opt.value === selected ? "selected" : "";
      return `<option value="${escapeHtml(opt.value)}" ${isSel}>${escapeHtml(opt.label)}</option>`;
    }).join("");
  }

  function renderModelDatalists() {
    return `<datalist id="${MODEL_DATALIST_A_ID}"></datalist><datalist id="${MODEL_DATALIST_B_ID}"></datalist><datalist id="${MODEL_DATALIST_EMBED_ID}"></datalist>`;
  }

  function renderEmbeddingProviderOptions(selected) {
    return EMBEDDING_PROVIDER_OPTIONS.map((opt) => {
      const isSel = opt.value === selected ? "selected" : "";
      return `<option value="${escapeHtml(opt.value)}" ${isSel}>${escapeHtml(opt.label)}</option>`;
    }).join("");
  }

  function getEmbeddingOptionsByProvider(provider) {
    const p = safeTrim(provider);
    const preset =
      EMBEDDING_PROVIDER_PRESETS[p] || EMBEDDING_PROVIDER_PRESETS.custom_api;
    return Array.isArray(preset.options)
      ? preset.options
      : EMBEDDING_MODEL_OPTIONS;
  }

  function getEmbeddingOptionsDedup(provider) {
    const dedup = [];
    const seen = new Set();
    for (const opt of getEmbeddingOptionsByProvider(provider)) {
      const value = safeTrim(opt?.value);
      if (!value || seen.has(value)) continue;
      seen.add(value);
      dedup.push({ value, label: String(opt?.label || value) });
    }
    return dedup;
  }

  function fillEmbeddingDatalist(options) {
    const el = document.getElementById(MODEL_DATALIST_EMBED_ID);
    if (!el) return;
    const dedup = [];
    const seen = new Set();
    for (const opt of options || []) {
      const value = safeTrim(opt?.value);
      if (!value || seen.has(value)) continue;
      seen.add(value);
      dedup.push({ value, label: String(opt?.label || value) });
    }
    el.innerHTML = dedup
      .map(
        (opt) =>
          `<option value="${escapeHtml(opt.value)}">${escapeHtml(opt.label)}</option>`,
      )
      .join("");
  }

  function renderFormatOptions(selected) {
    return API_FORMAT_OPTIONS.map((opt) => {
      const isSel = opt.value === selected ? "selected" : "";
      return `<option value="${escapeHtml(opt.value)}" ${isSel}>${escapeHtml(opt.label)}</option>`;
    }).join("");
  }

  function getModelsByProvider(provider) {
    const p = safeTrim(provider);
    if (p === "google_cloud")
      return EXTRACTOR_MODEL_OPTIONS.filter((m) =>
        m.value.startsWith("gemini-"),
      );
    if (p === "vertex_ai") return VERTEX_EXTRACTOR_MODEL_OPTIONS;
    if (p === "anthropic")
      return EXTRACTOR_MODEL_OPTIONS.filter((m) =>
        m.value.startsWith("claude-"),
      );
    if (p === "openai")
      return EXTRACTOR_MODEL_OPTIONS.filter(
        (m) =>
          m.value.startsWith("gpt-") ||
          m.value.startsWith("chatgpt-") ||
          m.value.startsWith("o"),
      );
    if (p === "grok")
      return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("grok-"));
    if (p === "github_copilot") return [];
    if (p === "custom_api" || p === "openrouter") return [];
    return [];
  }

  async function getProviderModelsWithCache({
    provider,
    url,
    cacheKey,
    tsKey,
    apiKey,
  }) {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(cacheKey);
    const cachedTs = Number(await Risuai.safeLocalStorage.getItem(tsKey));
    let staleCache = [];
    if (cachedText) {
      try {
        const parsed = JSON.parse(cachedText);
        if (Array.isArray(parsed)) staleCache = parsed;
      } catch {}
    }
    if (
      staleCache.length > 0 &&
      Number.isFinite(cachedTs) &&
      now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS
    )
      return staleCache;
    try {
      let headers = { Accept: "application/json" };
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
      const { res } = await fetchWithFallback(
        url,
        { method: "GET", headers },
        12000,
        `${provider} model list`,
        true,
      );
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) return staleCache;
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") {
        try {
          data = JSON.parse(res.data);
        } catch {}
      }
      const rawList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.models)
          ? data.models
          : Array.isArray(data)
            ? data
            : [];
      const list = rawList
        .map((m) => safeTrim(m?.id || m?.name || m))
        .filter((id) => !!id)
        .map((id) => ({ value: id, label: id }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(cacheKey, JSON.stringify(list));
        await Risuai.safeLocalStorage.setItem(tsKey, String(now));
      }
      return list.length ? list : staleCache;
    } catch {
      return staleCache;
    }
  }

  async function getOpenRouterModels() {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(
      OPENROUTER_MODELS_CACHE_KEY,
    );
    const cachedTs = Number(
      await Risuai.safeLocalStorage.getItem(OPENROUTER_MODELS_CACHE_TS_KEY),
    );
    let staleCache = [];
    if (cachedText) {
      try {
        const parsed = JSON.parse(cachedText);
        if (Array.isArray(parsed)) staleCache = parsed;
      } catch {}
    }
    if (
      staleCache.length > 0 &&
      Number.isFinite(cachedTs) &&
      now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS
    )
      return staleCache;
    try {
      const headers = { Accept: "application/json" };
      const maybeKey =
        (safeTrim(configCache.extractor_a_provider) === "openrouter"
          ? safeTrim(configCache.extractor_a_key)
          : "") ||
        (safeTrim(configCache.extractor_b_provider) === "openrouter"
          ? safeTrim(configCache.extractor_b_key)
          : "") ||
        (safeTrim(configCache.embedding_provider) === "openrouter"
          ? safeTrim(configCache.embedding_key)
          : "");
      if (maybeKey) headers.Authorization = `Bearer ${maybeKey}`;
      const { res, via } = await fetchWithFallback(
        OPENROUTER_MODELS_URL,
        { method: "GET", headers },
        12000,
        "OpenRouter model list",
        true,
      );
      await Risuai.safeLocalStorage.setItem(
        "last_or_models_via",
        String(via || "(unknown)"),
      );
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) {
        await Risuai.safeLocalStorage.setItem(
          "last_or_models_error",
          `HTTP ${status}`,
        );
        return staleCache;
      }
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") {
        try {
          data = JSON.parse(res.data);
        } catch {}
      }
      const rawList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
          ? data.data.data
          : Array.isArray(data?.models)
            ? data.models
            : [];
      const list = rawList
        .filter((m) => {
          const id = safeTrim(m?.id || m?.name || m);
          return !hasEmbeddingModality(m) && !isLikelyEmbeddingModel(m, id);
        })
        .map((m) => {
          const id = safeTrim(m?.id || m?.name || m);
          if (!id) return null;
          return { value: id, label: formatOpenRouterModelLabel(m, id) };
        })
        .filter(Boolean);
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(
          OPENROUTER_MODELS_CACHE_KEY,
          JSON.stringify(list),
        );
        await Risuai.safeLocalStorage.setItem(
          OPENROUTER_MODELS_CACHE_TS_KEY,
          String(now),
        );
        await Risuai.safeLocalStorage.setItem("last_or_models_error", "");
      } else {
        await Risuai.safeLocalStorage.setItem(
          "last_or_models_error",
          "OpenRouter model list is empty.",
        );
      }
      return list.length > 0 ? list : staleCache;
    } catch (e) {
      await Risuai.safeLocalStorage.setItem(
        "last_or_models_error",
        String(e?.message || e || "unknown error"),
      );
      return staleCache;
    }
  }

  async function getGrokModels() {
    const key =
      (safeTrim(configCache.extractor_a_provider) === "grok"
        ? safeTrim(configCache.extractor_a_key)
        : "") ||
      (safeTrim(configCache.extractor_b_provider) === "grok"
        ? safeTrim(configCache.extractor_b_key)
        : "");
    return await getProviderModelsWithCache({
      provider: "grok",
      url: GROK_MODELS_URL,
      cacheKey: GROK_MODELS_CACHE_KEY,
      tsKey: GROK_MODELS_CACHE_TS_KEY,
      apiKey: key,
    });
  }

  function formatOpenRouterModelLabel(modelObj, fallbackId = "") {
    const id = safeTrim(modelObj?.id || modelObj?.name || fallbackId);
    const pricing = modelObj?.pricing || {};
    const topPricing = modelObj?.top_provider?.pricing || {};
    const inRaw = Number(
      pricing?.prompt ??
        pricing?.input ??
        pricing?.input_text ??
        pricing?.prompt_token ??
        topPricing?.prompt ??
        topPricing?.input,
    );
    const outRaw = Number(
      pricing?.completion ??
        pricing?.output ??
        pricing?.output_text ??
        pricing?.completion_token ??
        topPricing?.completion ??
        topPricing?.output,
    );
    const formatPerMillion = (v) => {
      if (!Number.isFinite(v) || v < 0) return "";
      return `$${(v * 1000000).toFixed(3)}/M`;
    };
    const inLabel = formatPerMillion(inRaw);
    const outLabel = formatPerMillion(outRaw);
    if (inLabel && outLabel) return `${id} | in ${inLabel} out ${outLabel}`;
    if (inLabel) return `${id} | in ${inLabel}`;
    if (outLabel) return `${id} | out ${outLabel}`;
    return id;
  }

  function hasEmbeddingModality(modelObj) {
    const raw = [
      ...(Array.isArray(modelObj?.output_modalities)
        ? modelObj.output_modalities
        : []),
      ...(Array.isArray(modelObj?.architecture?.output_modalities)
        ? modelObj.architecture.output_modalities
        : []),
      modelObj?.architecture?.modality,
      modelObj?.modality,
    ]
      .map((x) =>
        String(x || "")
          .toLowerCase()
          .trim(),
      )
      .filter(Boolean);
    return raw.includes("embedding") || raw.includes("embeddings");
  }

  function isLikelyEmbeddingModel(modelObj, id = "") {
    const outputModalities = Array.isArray(modelObj?.output_modalities)
      ? modelObj.output_modalities
      : Array.isArray(modelObj?.architecture?.output_modalities)
        ? modelObj.architecture.output_modalities
        : [];
    if (
      outputModalities
        .map((x) => String(x || "").toLowerCase())
        .includes("embeddings")
    )
      return true;
    const src = [
      id,
      modelObj?.id,
      modelObj?.name,
      modelObj?.description,
      modelObj?.architecture?.modality,
      modelObj?.architecture?.input_modalities,
      modelObj?.architecture?.output_modalities,
      modelObj?.top_provider?.max_completion_tokens,
    ]
      .map((x) =>
        typeof x === "string"
          ? x
          : Array.isArray(x)
            ? x.join(" ")
            : String(x || ""),
      )
      .join(" ")
      .toLowerCase();
    return /(embed|embedding)/i.test(src);
  }

  async function getOpenRouterEmbeddingModels() {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(
      OPENROUTER_EMBED_MODELS_CACHE_KEY,
    );
    const cachedTs = Number(
      await Risuai.safeLocalStorage.getItem(
        OPENROUTER_EMBED_MODELS_CACHE_TS_KEY,
      ),
    );
    let staleCache = [];
    if (cachedText) {
      try {
        const parsed = JSON.parse(cachedText);
        if (Array.isArray(parsed)) staleCache = parsed;
      } catch {}
    }
    if (
      staleCache.length > 0 &&
      Number.isFinite(cachedTs) &&
      now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS
    )
      return staleCache;
    try {
      const headers = { Accept: "application/json" };
      const maybeKey =
        (safeTrim(configCache.extractor_a_provider) === "openrouter"
          ? safeTrim(configCache.extractor_a_key)
          : "") ||
        (safeTrim(configCache.extractor_b_provider) === "openrouter"
          ? safeTrim(configCache.extractor_b_key)
          : "") ||
        (safeTrim(configCache.embedding_provider) === "openrouter"
          ? safeTrim(configCache.embedding_key)
          : "");
      if (maybeKey) headers.Authorization = `Bearer ${maybeKey}`;
      const { res } = await fetchWithFallback(
        OPENROUTER_EMBED_MODELS_URL,
        { method: "GET", headers },
        12000,
        "OpenRouter embedding model list",
        true,
      );
      const data = await readResponseJson(res);
      const rawList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
          ? data.data.data
          : Array.isArray(data?.models)
            ? data.models
            : [];
      const mapped = rawList
        .map((m) => {
          const id = safeTrim(m?.id || m?.name || m);
          if (!id) return null;
          return {
            value: id,
            label: formatOpenRouterModelLabel(m, id),
            raw: m,
          };
        })
        .filter(Boolean);
      const seen = new Set();
      const list = mapped
        .filter((x) => {
          const key = safeTrim(x?.value || "");
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((x) => ({ value: x.value, label: x.label }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(
          OPENROUTER_EMBED_MODELS_CACHE_KEY,
          JSON.stringify(list),
        );
        await Risuai.safeLocalStorage.setItem(
          OPENROUTER_EMBED_MODELS_CACHE_TS_KEY,
          String(now),
        );
      }
      return list.length ? list : staleCache;
    } catch {
      return staleCache;
    }
  }

  async function getCopilotModels() {
    const rawKey =
      (safeTrim(configCache.extractor_a_provider) === "github_copilot"
        ? safeTrim(configCache.extractor_a_key)
        : "") ||
      (safeTrim(configCache.extractor_b_provider) === "github_copilot"
        ? safeTrim(configCache.extractor_b_key)
        : "");
    if (!rawKey) return [];

    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(
      COPILOT_MODELS_CACHE_KEY,
    );
    const cachedTs = Number(
      await Risuai.safeLocalStorage.getItem(COPILOT_MODELS_CACHE_TS_KEY),
    );
    let staleCache = [];
    if (cachedText) {
      try {
        const parsed = JSON.parse(cachedText);
        if (Array.isArray(parsed)) staleCache = parsed;
      } catch {}
    }
    if (
      staleCache.length > 0 &&
      Number.isFinite(cachedTs) &&
      now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS
    )
      return staleCache;

    try {
      const bearerToken = await getCopilotBearerToken(rawKey);
      let headers = {
        Accept: "application/json",
      };
      headers = await applyCopilotAuthHeaders(headers, bearerToken || rawKey);
      const { res } = await fetchWithFallback(
        COPILOT_MODELS_URL,
        { method: "GET", headers },
        12000,
        "Copilot model list",
        true,
      );
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) return staleCache;
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") {
        try {
          data = JSON.parse(res.data);
        } catch {}
      }
      const rawList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.models)
          ? data.models
          : Array.isArray(data)
            ? data
            : [];
      const list = rawList
        .map((m) => safeTrim(m?.id || m?.name || m))
        .filter((id) => !!id)
        .map((id) => ({ value: id, label: id }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(
          COPILOT_MODELS_CACHE_KEY,
          JSON.stringify(list),
        );
        await Risuai.safeLocalStorage.setItem(
          COPILOT_MODELS_CACHE_TS_KEY,
          String(now),
        );
      }
      return list.length ? list : staleCache;
    } catch {
      return staleCache;
    }
  }

  function fillModelDatalist(datalistId, models) {
    const el = document.getElementById(datalistId);
    if (!el) return;
    el.innerHTML = models
      .map(
        (opt) =>
          `<option value="${escapeHtml(opt.value)}">${escapeHtml(opt.label || opt.value)}</option>`,
      )
      .join("");
  }

  function fillModelSuggestionList(containerId, inputId, models) {
    const wrap = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    if (!wrap || !input) return;
    const list = Array.isArray(models) ? models : [];
    if (!list.length) {
      wrap.style.display = "none";
      wrap.classList.add("hidden");
      wrap.innerHTML = "";
      return;
    }
    wrap.style.display = "";
    wrap.classList.remove("hidden");
    wrap.innerHTML = list
      .map(
        (opt) =>
          `<button type="button" class="pse-model-suggestion-item" data-model-value="${escapeHtml(safeTrim(opt?.value || ""))}">${escapeHtml(String(opt?.label || opt?.value || ""))}</button>`,
      )
      .join("");
    wrap.querySelectorAll(".pse-model-suggestion-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = safeTrim(btn.getAttribute("data-model-value") || "");
        if (!value) return;
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
  }

  function getDatalistOptions(datalistId) {
    const el = document.getElementById(datalistId);
    if (!el) return [];
    return Array.from(el.querySelectorAll("option"))
      .map((o) => {
        const value = safeTrim(o.getAttribute("value") || "");
        const label = safeTrim(o.textContent || value);
        if (!value) return null;
        return { value, label: label || value };
      })
      .filter(Boolean);
  }

  function getProviderKeyPlaceholder(provider) {
    const p = safeTrim(provider || "");
    if (p === "vertex_ai")
      return "Paste the full Google Service Account JSON here";
    if (p === "github_copilot")
      return "Paste your GitHub OAuth/Copilot token here";
    return "API key";
  }

  function getProviderUrlPlaceholder(provider) {
    const p = safeTrim(provider || "");
    if (p === "vertex_ai")
      return "https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/global/publishers/google/models";
    if (p === "github_copilot")
      return "https://api.githubcopilot.com/chat/completions";
    return "Request URL";
  }

  function bindScrollableSuggestionDropdown({
    inputId,
    containerId,
    datalistId,
  }) {
    const input = document.getElementById(inputId);
    const wrap = document.getElementById(containerId);
    if (!input || !wrap) return;
    const render = () => {
      const q = safeTrim(input.value || "").toLowerCase();
      const options = getDatalistOptions(datalistId);
      const filtered = q
        ? options.filter(
            (x) =>
              String(x.value || "")
                .toLowerCase()
                .includes(q) ||
              String(x.label || "")
                .toLowerCase()
                .includes(q),
          )
        : options;
      fillModelSuggestionList(containerId, inputId, filtered);
    };
    input.addEventListener("click", () => {
      render();
      wrap.style.display = "";
      wrap.classList.remove("hidden");
    });
    input.addEventListener("input", () => {
      render();
      wrap.style.display = "";
      wrap.classList.remove("hidden");
    });
    input.addEventListener("blur", () => {
      setTimeout(() => {
        wrap.style.display = "none";
        wrap.classList.add("hidden");
      }, 120);
    });
    wrap.style.display = "none";
    wrap.classList.add("hidden");
  }

  function setFormatByProvider(
    providerId,
    formatId,
    allowManualForCustom,
    forceApply = true,
  ) {
    const provider = safeTrim(document.getElementById(providerId)?.value);
    const formatEl = document.getElementById(formatId);
    if (!formatEl) return;
    const mapped = PROVIDER_FORMAT_MAP[provider] || "openai";
    const current = safeTrim(formatEl.value || "");
    if (forceApply || !current) {
      formatEl.value = mapped;
    }
    if (allowManualForCustom) formatEl.disabled = provider !== "custom_api";
  }

  async function copyTextWithFallback(text) {
    const value = String(text || "");
    if (!value) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (e) {}
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function injectStyles() {
    if (document.getElementById("pse-styles")) return;
    const s = document.createElement("style");
    s.id = "pse-styles";
    s.textContent = `
      :root {
        --pse-overlay: rgba(0, 0, 0, 0.4);
        --pse-card-bg: #ffffff;
        --pse-card-text: #171717;
        --pse-text: #171717;
        --pse-muted: #666666;
        --pse-section-bg: rgba(128, 128, 128, 0.05);
        --pse-section-border: transparent;
        --pse-input-bg: #ffffff;
        --pse-input-border: #d4d4d4;
        --pse-tab-bg: #f5f5f5;
        --pse-tab-active-bg: #262626;
        --pse-tab-active-text: #ffffff;
        --pse-card-shadow: rgba(0, 0, 0, 0.12);
        
        --pse-accent-blue: #2196F3;
        --pse-accent-rose: #E91E63;
        --pse-accent-amber: #FF9800;
        --pse-accent-green: #4CAF50;
        --pse-accent-indigo: #3F51B5;
        --pse-accent-red: #F44336;
        --pse-accent-greyblue: #607D8B;

        --pse-accent-cyan: #00bcd4;
        --pse-accent-orange: #ff9800;
        --pse-accent-violet: #9c27b0;
        --pse-accent-yellow: #ffeb3b;

        --pse-font-size-title: 20px;
        --pse-font-size-subtitle: 13px;
        --pse-font-size-header: 15px;
        --pse-font-size-body: 13px;
        --pse-font-size-small: 12px;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --pse-overlay: rgba(0, 0, 0, 0.65);
          --pse-card-bg: #171717;
          --pse-card-text: #f5f5f5;
          --pse-text: #f5f5f5;
          --pse-muted: #a3a3a3;
          --pse-section-bg: rgba(128, 128, 128, 0.05);
          --pse-section-border: transparent;
          --pse-input-bg: #0a0a0a;
          --pse-input-border: #4a4a4a;
          --pse-tab-bg: #262626;
          --pse-tab-active-bg: #f5f5f5;
          --pse-tab-active-text: #171717;
          --pse-card-shadow: rgba(0, 0, 0, 0.45);
        }
      }
      .pse-body {
        margin:0; padding:16px;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans TC',sans-serif;
        font-size: var(--pse-font-size-body);
        line-height: 1.4;
        color: var(--pse-card-text);
        background:var(--pse-overlay);
        min-height:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        box-sizing:border-box;
      }
      .pse-card {
        width:min(520px, 100%);
        max-height:calc(100vh - 32px);
        overflow:auto;
        margin:0 auto;
        background:var(--pse-card-bg);
        color: var(--pse-card-text);
        border-radius:12px;
        padding:18px;
        box-shadow:0 14px 40px var(--pse-card-shadow);
      }
      .pse-title { margin:0 0 8px; color:var(--pse-card-text); font-size:var(--pse-font-size-title); font-weight:700; text-align:center; }
      .pse-subtitle { color:var(--pse-muted); margin:0; text-align:center; font-size:var(--pse-font-size-subtitle); }
      .pse-section {
        background: var(--pse-section-bg);
        border: none;
        border-left: 4px solid var(--pse-accent-blue);
        padding: 12px;
        border-radius: 8px;
        margin: 12px 0;
      }
      .pse-section.amber { border-left-color: var(--pse-accent-amber); }
      .pse-section.rose { border-left-color: var(--pse-accent-rose); }
      .pse-section.green { border-left-color: var(--pse-accent-green); }
      .pse-section.indigo { border-left-color: var(--pse-accent-indigo); }
      .pse-section.red { border-left-color: var(--pse-accent-red); }
      .pse-section.blue { border-left-color: var(--pse-accent-blue); }
      .pse-section.grey { border-left-color: var(--pse-accent-greyblue); }

      .pse-model-section-a {
        border-left-color: var(--pse-accent-indigo);
      }
      .pse-model-section-b {
        border-left-color: var(--pse-accent-blue);
      }
      .pse-model-section-embed {
        border-left-color: var(--pse-accent-green);
      }
      .pse-section-title { margin:0 0 8px; color:var(--pse-card-text); font-size:var(--pse-font-size-header); font-weight:700; }
      .pse-tabs { display:flex; gap:8px; margin:10px 0 12px; }
      .pse-tabs-secondary { margin-top:0; }
      .pse-tab {
        flex:1; border:1px solid var(--pse-section-border); background:var(--pse-tab-bg); color:var(--pse-card-text);
        border-radius:8px; padding:8px 10px; font-size:var(--pse-font-size-body); font-weight:700; cursor:pointer;
      }
      .pse-tab.active { background:var(--pse-tab-active-bg); color:var(--pse-tab-active-text); border-color:var(--pse-tab-active-bg); }
      .pse-tab.frozen {
        cursor:not-allowed;
        opacity:0.55;
        pointer-events:none;
      }
      .pse-page { display:none; }
      .pse-page.active { display:block; }
      .pse-label { display:block; margin:6px 0 4px; font-size:var(--pse-font-size-body); color:var(--pse-muted); font-weight:600; }
      .pse-status { margin:10px 0; padding:10px; border-radius:8px; font-size:var(--pse-font-size-small); font-weight:600; display:none; }
      .pse-status.info { display:block; background:rgba(128, 128, 128, 0.15); color:var(--pse-card-text); border:1px solid var(--pse-section-border); }
      .pse-status.ok { display:block; background:rgba(0, 230, 118, 0.1); color:var(--pse-accent-green); border:1px solid rgba(0, 230, 118, 0.3); }
      .pse-status.err { display:block; background:rgba(255, 23, 68, 0.1); color:var(--pse-accent-rose); border:1px solid rgba(255, 23, 68, 0.3); }
      .pse-input {
        width:100%; padding:8px 10px; border-radius:8px;
        background:var(--pse-input-bg); color:var(--pse-card-text);
        border:1px solid var(--pse-input-border); box-sizing:border-box;
        font-size:var(--pse-font-size-body); font-family:inherit; outline:none;
      }
      .pse-code-window {
        width: 100%; height: 120px; margin: 8px 0;
        padding: 8px; border: 1px solid var(--pse-input-border); border-radius: 6px;
        background: var(--pse-input-bg); color: var(--pse-text);
        font-size: 11px; font-family: monospace;
        resize: vertical; box-sizing: border-box;
      }
      .pse-btn-outline {
        padding:8px 12px; border:1px solid var(--pse-accent-blue); background:none;
        color:var(--pse-accent-blue); border-radius:8px; font-size:var(--pse-font-size-body); font-weight:600; cursor:pointer;
      }
      .pse-expand-btn {
        position:absolute; right:8px; bottom:8px; width:36px; height:32px; border:0;
        background:rgba(90, 90, 90, 0.6); color:var(--pse-card-bg); border-radius:8px;
        padding:0; display:flex; align-items:center; justify-content:center; cursor:pointer; backdrop-filter: blur(1px);
      }
      .pse-expand-btn svg { width:18px; height:18px; stroke:currentColor; fill:none; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
      .pse-textarea-wrap { position:relative; }
      .pse-textarea {
        width:100%; min-height:120px; padding:8px 50px 8px 8px; border:1px solid var(--pse-input-border);
        background:var(--pse-input-bg); color:var(--pse-card-text); border-radius:6px; font-size:13px; box-sizing:border-box;
        font-family: 'Consolas', 'Monaco', 'Lucida Console', 'Courier New', monospace; resize:vertical; outline:none;
      }
      .pse-entry-list { display:flex; flex-direction:column; gap:8px; margin-top:8px; }
      .pse-json-tools {
        display:flex;
        align-items:center;
        justify-content:flex-start;
        gap:10px;
        margin-bottom:12px;
        padding:0;
        border:0;
        background:transparent;
      }
      .pse-json-tools-actions {
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        width:100%;
      }
      .pse-call-card {
        border:none; border-left:4px solid var(--pse-accent-blue);
        background:var(--pse-section-bg);
        border-radius:8px; padding:12px;
      }
      .pse-call-card[data-call-parity="odd"] { border-left-color:var(--pse-accent-green); }
      .pse-call-card[data-call-parity="even"] { border-left-color:var(--pse-accent-blue); }
      .pse-page[data-page="3"] .pse-section:first-child { border-left:4px solid var(--pse-accent-indigo); }
      .pse-page[data-page="6"] .pse-section { border-left: 4px solid var(--pse-accent-amber); }
      .pse-call-head { display:grid; grid-template-columns: 1fr minmax(110px, auto) minmax(90px, auto) auto; gap:8px; align-items:end; }
      .pse-call-head.no-freq { grid-template-columns: 1fr minmax(110px, auto) auto; }
      .pse-call-row2 { margin-top:8px; display:grid; grid-template-columns: minmax(180px, auto) 1fr; gap:8px; align-items:end; }
      .pse-call-row3 { margin-top:8px; display:grid; grid-template-columns: 1fr; gap:8px; align-items:end; }
      .pse-assembly {
        border:1px dashed var(--pse-section-border); border-left:4px solid var(--pse-accent-violet);
        background:var(--pse-section-bg);
        border-radius:8px; padding:10px; font-size:12px; line-height:1.55; color:var(--pse-card-text);
      }
      .pse-entry-block { border:none; border-radius:8px; background:var(--pse-input-bg); padding:8px; }
      .pse-entry-block[data-cache-parity="even"] { border-left:4px solid var(--pse-accent-blue); background:var(--pse-section-bg); }
      .pse-entry-block[data-cache-parity="odd"] { border-left:4px solid var(--pse-accent-green); background:var(--pse-section-bg); }
      .pse-card-topline {
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:10px;
        margin-bottom:8px;
      }
      .pse-card-topline-main {
        min-width:0;
        flex:1 1 auto;
        display:flex;
        align-items:center;
        gap:8px;
        flex-wrap:wrap;
      }
      .pse-card-name {
        min-width:0;
        font-weight:800;
        font-size:13px;
        line-height:1.2;
        color:var(--pse-card-text);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .pse-card-action {
        flex:0 0 auto;
        height:28px;
        padding:0 12px;
        border-radius:6px;
        border:1px solid var(--pse-accent-blue);
        background:rgba(33, 150, 243, 0.08);
        color:var(--pse-accent-blue);
        font-size:11px;
        font-weight:700;
        cursor:pointer;
        transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display:flex;
        align-items:center;
        justify-content:center;
        white-space:nowrap;
      }
      .pse-card-action:hover {
        background:var(--pse-accent-blue);
        color:#fff;
        transform:translateY(-1px);
        box-shadow:0 4px 12px rgba(33, 150, 243, 0.25);
      }
      .pse-card-action:active { transform:translateY(0); }
      .pse-picker-overlay {
        position:fixed; inset:0; z-index:10001;
        background:rgba(0,0,0,0.45); backdrop-filter:blur(4px);
        display:flex; align-items:center; justify-content:center; padding:16px;
      }
      .pse-picker-modal {
        width:min(560px, 100%); max-height:min(85vh, 760px);
        background:var(--pse-card-bg); border:1px solid var(--pse-input-border);
        border-radius:18px; box-shadow:0 24px 64px rgba(0,0,0,0.45);
        display:flex; flex-direction:column; overflow:hidden;
      }
      .pse-picker-header {
        padding:20px 24px; border-bottom:1px solid var(--pse-section-bg);
        display:flex; align-items:center; justify-content:space-between; gap:16px;
      }
      .pse-picker-title { font-size:17px; font-weight:800; color:var(--pse-text); }
      .pse-picker-subtitle { font-size:13px; color:var(--pse-muted); margin-top:2px; }
      .pse-picker-content {
        padding:16px 20px; overflow-y:auto; display:grid; gap:12px;
      }
      .pse-picker-option {
        width:100%; text-align:left; padding:14px 18px; border-radius:14px;
        border:1px solid var(--pse-input-border); background:var(--pse-input-bg);
        color:var(--pse-text); cursor:pointer; transition:all 0.2s ease;
        display:flex; flex-direction:column; gap:6px;
      }
      .pse-picker-option:hover {
        border-color:var(--pse-accent-blue); background:rgba(33,150,243,0.05);
        transform:translateX(4px);
      }
      .pse-picker-option.active {
        border-color:var(--pse-accent-blue); background:rgba(33,150,243,0.12);
        box-shadow:0 0 0 1px var(--pse-accent-blue);
      }
      .pse-picker-chat-name { font-weight:700; font-size:14px; display:flex; align-items:center; justify-content:space-between; gap:8px; }
      .pse-picker-chat-meta { font-size:11px; color:var(--pse-muted); display:flex; align-items:center; gap:12px; }
      .pse-picker-tag {
        font-size:10px; padding:2px 8px; border-radius:999px; font-weight:700;
        background:rgba(33,150,243,0.15); color:var(--pse-accent-blue); border:1px solid rgba(33,150,243,0.3);
      }
      .pse-entry-grid { display:grid; grid-template-columns: 1fr minmax(110px, auto) minmax(90px, auto) auto; gap:8px; align-items:end; }
      .pse-entry-grid-row2 { margin-top:8px; display:grid; grid-template-columns: 1fr; gap:8px; }
      .pse-entry-format-input {
        width:100%; min-height:72px; padding:8px; border:1px solid var(--pse-input-border);
        border-radius:6px; box-sizing:border-box; resize:vertical; font-size:12px;
        font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        background: var(--pse-input-bg); color: var(--pse-card-text);
      }
      .pse-entry-col .pse-label { margin:0 0 4px; font-size:11px; }
      .pse-model-suggestions { margin-top:6px; border:1px solid var(--pse-section-border); border-radius:8px; background:var(--pse-input-bg); max-height:180px; overflow:auto; padding:4px; }
      .pse-model-suggestions.hidden { display:none !important; }
      .pse-model-suggestion-item {
        display:block; width:100%; border:0; background:transparent; color:var(--pse-card-text);
        text-align:left; font-size:12px; padding:6px 8px; border-radius:6px; cursor:pointer;
      }
      .pse-model-suggestion-item:hover { background:rgba(128,128,128,0.2); }
      .pse-entry-remove { border:1px solid var(--pse-section-border); background:var(--pse-input-bg); color:var(--pse-card-text); border-radius:6px; height:34px; min-width:34px; cursor:pointer; }
      .pse-entry-remove.compact { height:28px; min-width:28px; width:28px; padding:0; line-height:1; display:flex; align-items:center; justify-content:center; }
      .pse-add-entry { margin-top:8px; border:1px dashed var(--pse-section-border); background:var(--pse-input-bg); color:var(--pse-card-text); border-radius:8px; padding:8px 10px; font-size:12px; font-weight:700; cursor:pointer; }
      .pse-frozen-wrap { position:relative; }
      .pse-frozen-badge {
        display:inline-block;
        margin-bottom:8px;
        padding:2px 8px;
        border-radius:999px;
        font-size:11px;
        font-weight:700;
        background:rgba(255,171,0,0.14);
        color:var(--pse-accent-amber);
        border:1px solid rgba(255,171,0,0.35);
      }
      .pse-frozen-fields {
        opacity:0.5;
        pointer-events:none;
        user-select:none;
      }
      .pse-frozen-fields select,
      .pse-frozen-fields input,
      .pse-frozen-fields textarea,
      .pse-frozen-fields button {
        pointer-events:none;
      }
      .pse-editor-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:10000; }
      .pse-editor-modal { width:100vw; height:100vh; background:var(--pse-card-bg); color:var(--pse-card-text); padding:20px; box-sizing:border-box; display:flex; flex-direction:column; gap:10px; }
      .pse-editor-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
      .pse-editor-title { font-size:14px; font-weight:700; color:var(--pse-card-text); }
      .pse-editor-close { width:34px; height:30px; border:0; background:var(--pse-section-bg); color:var(--pse-card-text); border-radius:6px; cursor:pointer; font-size:16px; line-height:1; }
      .pse-editor-textarea { flex:1; width:100%; border:1px solid var(--pse-input-border); border-radius:8px; padding:12px; box-sizing:border-box; resize:none; font-size:14px; line-height:1.5; color:var(--pse-card-text); background:var(--pse-input-bg); font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .pse-editor-actions { display:flex; justify-content:flex-end; gap:8px; }
      .pse-row { display:flex; gap:8px; }
      .pse-btn-row { display:flex; gap:8px; margin-top:12px; }
      .pse-btn { flex:1; border:none; border-radius:8px; padding:10px 12px; color:#fff; font-size:13px; font-weight:700; cursor:pointer; transition: opacity 0.2s; }
      .pse-btn:hover { opacity: 0.85; }
      .pse-btn.save { background:var(--pse-accent-blue); }
      .pse-btn.cache { background:var(--pse-accent-indigo); }
      .pse-btn.close { background:var(--pse-muted); }
      .pse-lang-btn { 
        background: var(--pse-input-bg); 
        color: var(--pse-text) !important; 
        border: 1px solid var(--pse-input-border) !important;
      }
      .pse-lang-btn.pse-lang-active { 
        background: var(--pse-accent-blue) !important; 
        color: #fff !important; 
        border-color: var(--pse-accent-blue) !important;
      }
      .pse-preset-btn {
        flex: 1;
        padding: 6px 10px;
        border: 1px solid var(--pse-input-border);
        background: var(--pse-input-bg);
        color: var(--pse-muted);
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .pse-preset-btn.pse-subtab {
        padding: 5px 8px;
        font-size: 11px;
      }
      .pse-preset-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .pse-preset-btn.active {
        background: var(--pse-accent-blue);
        color: #fff;
        border-color: var(--pse-accent-blue);
      }
      @media (max-width: 768px) {
        .pse-body { padding:0; align-items:flex-start; }
        .pse-card { width:100%; max-width:100%; min-height:100vh; max-height:100vh; border-radius:0; padding:14px; box-shadow:none; }
        .pse-call-head { grid-template-columns: 1fr; }
        .pse-call-row2 { grid-template-columns: 1fr; }
        .pse-entry-grid { grid-template-columns: 1fr; }
        .pse-rewrite-grid { grid-template-columns: 1fr; }
        .pse-json-tools { flex-direction:column; align-items:stretch; }
        .pse-json-tools-actions { width:100%; }
        .pse-json-tools-actions .pse-btn-outline { flex:1; }
        .pse-entry-remove { width:100%; }
        .pse-entry-remove.compact { width:28px; }
        .pse-btn-row { flex-direction:column; }
        .pse-card-action {
          flex:0 0 116px;
          width:116px;
          min-width:116px;
          max-width:116px;
          height:28px;
          padding:0 10px;
          font-size:10px;
        }
      }
    `;
    document.head.appendChild(s);
  }

  async function ensureLangInitialized(force = false) {
    if (!force && _langInitialized) return;
    _T = _I18N[await _detectLang()] || _I18N.en;
    _langInitialized = true;
  }

  function buildAuxCallErrorLine(call, endpoint, rawError) {
    const callName = safeTrim(call?.name) || _T.default_callnote || "Call";
    const target = safeTrim(call?.target_model) === "B" ? "B" : "A";
    const provider = safeTrim(endpoint?.provider || "unknown");
    const model = safeTrim(endpoint?.model || "unknown");
    const reasonRaw = rawError?.message || rawError || "";
    const reason =
      safeTrim(String(reasonRaw || "")) || _T.unknown_reason || "Unknown error";
    if (typeof _T.aux_error_line === "function") {
      return _T.aux_error_line({ callName, target, provider, model, reason });
    }
    return `Call "${callName}" (Model ${target}, provider ${provider}, model ${model}) failed: ${reason}`;
  }

  function showStatus(message, type = "info") {
    const el = document.getElementById("pse-status");
    if (!el) return;
    el.className = `pse-status ${type}`;
    el.textContent = message;
  }

  function closeContinueChatPicker() {
    document.getElementById("pse-continue-chat-picker")?.remove();
  }

  async function openContinueChatPicker(charIdx) {
    closeContinueChatPicker();
    const char = await Risuai.getCharacterFromIndex(charIdx);
    const chats = Array.isArray(char?.chats) ? char.chats : [];
    if (!char || chats.length === 0) {
      throw new Error(
        _T.st_continue_chat_no_chat_for_card ||
          "This character has no available chat to continue.",
      );
    }

    const currentPage = Math.max(
      0,
      Math.min(chats.length - 1, Math.floor(Number(char?.chatPage) || 0)),
    );
    const charName = safeTrim(char?.name || "Character");
    const modal = document.createElement("div");
    modal.id = "pse-continue-chat-picker";
    modal.className = "pse-picker-overlay";

    const listHtml = chats
      .map((chat, idx) => {
        const chatName = safeTrim(chat?.name || `Chat ${idx + 1}`);
        const userTurns = countUserMessages(chat?.message);
        const turnOffset = getTurnOffsetFromLocalLore(chat?.localLore);
        const totalTurns = userTurns + turnOffset;
        const isCurrent = idx === currentPage;

        return `
          <button
            class="pse-picker-option ${isCurrent ? "active" : ""}"
            type="button"
            data-chat-index="${idx}"
          >
            <div class="pse-picker-chat-name">
              <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(chatName)}</span>
              ${
                isCurrent
                  ? `<span class="pse-picker-tag">${escapeHtml(_T.dlg_continue_chat_current || "current")}</span>`
                  : ""
              }
            </div>
            <div class="pse-picker-chat-meta">
              <span><b>${escapeHtml(String(totalTurns))}</b> ${escapeHtml(_T.dlg_continue_chat_turns || "turns")}</span>
              <span style="opacity:0.6;">(${escapeHtml(String(userTurns))} + ${escapeHtml(String(turnOffset))})</span>
            </div>
          </button>
        `;
      })
      .join("");

    modal.innerHTML = `
      <div class="pse-picker-modal">
        <div class="pse-picker-header">
          <div>
            <div class="pse-picker-title">${escapeHtml(_T.dlg_continue_chat_title || "Choose A Chat To Continue")}</div>
            <div class="pse-picker-subtitle">${escapeHtml(charName)}</div>
          </div>
          <button type="button" class="pse-btn close pse-continue-chat-close" style="flex:none;padding:8px 16px;">${escapeHtml(_T.editor_cancel || "Cancel")}</button>
        </div>
        <div class="pse-picker-content">${listHtml}</div>
      </div>
    `;

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeContinueChatPicker();
    });
    modal
      .querySelector(".pse-continue-chat-close")
      ?.addEventListener("click", closeContinueChatPicker);
    modal.querySelectorAll(".pse-picker-option").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const sourceChatIndex = Number(btn.getAttribute("data-chat-index"));
        try {
          const meta = await continueChatFromCharacter(charIdx, sourceChatIndex);
          closeContinueChatPicker();
          const details = ` (${meta.keptUserTurns}/5 turns kept, offset ${meta.nextTurnOffset})`;
          showStatus(
            `${_T.st_continue_chat_done || "Created a continued chat and switched to it."}${details}`,
            "ok",
          );
        } catch (err) {
          showStatus(
            `${_T.st_continue_chat_failed || "Continue chat failed: "}${err?.message || String(err)}`,
            "err",
          );
        }
      });
    });

    document.body.appendChild(modal);
  }

  async function abortMainModelWithAuxError(message, scopedRequestKeys) {
    const msg = String(message || _T.aux_abort_default);
    const suffix =
      _T.aux_abort_suffix ||
      "Main model request was intercepted to save API quota.";
    const fullMsg = `${msg}\n(${suffix})`;
    let keysToClean = scopedRequestKeys;
    if (!keysToClean) {
      try {
        keysToClean = (await getScopedKeysForCurrentChat()).requestKeys;
      } catch {}
    }
    if (keysToClean) {
      try {
        await Risuai.safeLocalStorage.setItem(
          keysToClean.lastSyncError,
          fullMsg,
        );
      } catch {}
      try {
        await Risuai.safeLocalStorage.setItem(
          keysToClean.lastExtractorMode,
          "aborted",
        );
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(keysToClean.lastReqHash);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(keysToClean.lastExtractedData);
      } catch {}
      try {
        await Risuai.safeLocalStorage.removeItem(keysToClean.regenSkip);
      } catch {}
    }
    try {
      await Risuai.safeLocalStorage.setItem(
        LAST_SYNC_ERROR_KEY,
        fullMsg,
      );
    } catch {}
    await Risuai.log(`${LOG} ❌ ${msg} — ${suffix}`);
    // Surface the error visibly to the user so the request never fails silently.
    // Risuai.alertError is available in API v3.0; fall back gracefully if absent.
    try {
      if (typeof Risuai.alertError === "function") {
        await Risuai.alertError(`[RisuAI Agent] ${fullMsg}`);
      } else if (typeof Risuai.alert === "function") {
        await Risuai.alert(`[RisuAI Agent] ${fullMsg}`);
      }
    } catch {}
    throw new Error(`[RisuAI Agent Error] ${msg}\n(${suffix})`);
  }

  async function renderSettingsUI() {
    await ensureLangInitialized(true);
    LORE_WRITE_MODE_OPTIONS = [
      { value: "append", label: _T.append },
      { value: "overwrite", label: _T.overwrite },
    ];
    await refreshConfig();
    injectStyles();

    const modeDetailsOpen =
      (await Risuai.safeLocalStorage.getItem("pse_mode_details_open")) !==
      "false";

    const overlayRoot = document.createElement("div");
    overlayRoot.id = "pse-overlay-root";
    overlayRoot.style.cssText =
      "position:fixed;inset:0;z-index:9999;overflow:auto;opacity:0;transition:opacity 0.15s ease;";

    overlayRoot.innerHTML = `
      <div class="pse-body">
        <div class="pse-card">
          <h1 class="pse-title">👤 RisuAI Agent v4.0.1</h1>
          <div id="pse-status" class="pse-status"></div>
          ${renderModelDatalists()}

          <div class="pse-tabs">
            ${`<button class="pse-tab active" data-page="7">${_T.tab_help}</button>
            <button class="pse-tab" data-page="8">${_T.tab_enable}</button>
            <button class="pse-tab" data-page="1">${_T.tab_model}</button>`}
          </div>
          <div class="pse-tabs pse-tabs-secondary">
            ${`<button class="pse-tab" data-page="6">${_T.tab_cache_open || _T.sec_cache}</button>
            <button class="pse-tab" data-page="2">${_T.tab_entry}</button>
            <button class="pse-tab" data-page="5">${_T.tab_vector_open || _T.sec_vec}</button>`}
          </div>

          <div class="pse-page active" data-page="7">
            <!-- Language (Standalone) -->
            <div style="margin-bottom:16px;">
              <label class="pse-label" style="margin-bottom:6px; color:var(--pse-text);">🌐 Language / 語言 / 언어</label>
              <div style="display:flex;gap:8px;">
                ${["en", "tc", "ko"]
                  .map((code) => {
                    const labels = {
                      en: "English",
                      tc: "繁體中文",
                      ko: "한국어",
                    };
                    const active = (configCache?.ui_language || "en") === code;
                    return `<button class="pse-btn pse-lang-btn${active ? " pse-lang-active" : ""}" data-lang="${code}" type="button" style="flex:1;padding:7px 0;font-size:13px;">${labels[code]}</button>`;
                  })
                  .join("")}
              </div>
            </div>

            <!-- Standalone Help Contents -->
            <div style="margin-bottom:12px;padding:7px 10px;border-radius:6px;background:rgba(255,171,0,0.1);border:1px solid rgba(255,171,0,0.3);font-size:var(--pse-font-size-small);color:var(--pse-accent-amber);">
              ${escapeHtml(_T.lore_warn)}
            </div>
            
            <div class="pse-row" style="margin-bottom:12px;">
              <button class="pse-help-subtab pse-preset-btn active" data-help-sub="main" type="button" style="font-size:11px;padding:5px 8px;">${_T.help_tab_main}</button>
              <button class="pse-help-subtab pse-preset-btn" data-help-sub="p1" type="button" style="font-size:11px;padding:5px 8px;">${_T.help_tab_p1}</button>
              <button class="pse-help-subtab pse-preset-btn" data-help-sub="p2" type="button" style="font-size:11px;padding:5px 8px;">${_T.help_tab_p2}</button>
            </div>

            <div id="pse-help-content-main" class="pse-help-content" style="color:var(--pse-text);">
              ${_T.help_html}
            </div>
            <div id="pse-help-content-p1" class="pse-help-content" style="display:none; color:var(--pse-text);">${_T.help_p1_html}</div>
            <div id="pse-help-content-p2" class="pse-help-content" style="display:none; color:var(--pse-text);">${_T.help_p2_html}</div>
          </div>

          <div class="pse-page" data-page="8">
            <!-- Reset (No block) -->
            <button id="pse-reset-agent-defaults" class="pse-btn" type="button" style="padding:7px 12px;font-size:12px;white-space:nowrap;width:100%;margin-bottom:12px;background:var(--pse-accent-rose);">${_T.btn_reset}</button>

            <!-- Mode Info (Amber) -->
            <div class="pse-section amber" style="padding: 0; overflow: hidden;">
              <details id="pse-mode-details" ${modeDetailsOpen ? "open" : ""} style="width: 100%;">
                <summary style="padding: 10px 12px; cursor: pointer; font-weight: bold; color: var(--pse-accent-amber); list-style: none; display: flex; align-items: center; justify-content: space-between; user-select: none;">
                  <span>${_T.mode_guide_title}</span>
                  <span style="font-size: 10px; opacity: 0.6;">${_T.mode_guide_click}</span>
                </summary>
                <div style="padding: 0 12px 12px 12px; font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                  ${_T.mode_guide_content}
                </div>
              </details>
            </div>

            <!-- Classify & Mod Lorebook -->
            <div class="pse-section indigo">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed rgba(128,128,128,0.2);">
                <label class="pse-label" style="margin:0;white-space:nowrap; color:var(--pse-text);">${_T.lbl_classify_model}</label>
                <select id="init_bootstrap_target_model" class="pse-input" style="flex:1;width:auto;min-width:0;">
                  <option value="A" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "" : "selected"}>${_T.opt_main_model}</option>
                  <option value="B" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "selected" : ""}>${_T.opt_aux_model}</option>
                </select>
              </div>
              <label class="pse-label" for="read_mod_lorebook" style="display:flex;align-items:center;gap:8px;margin:0;cursor:pointer;white-space:nowrap; color:var(--pse-text);">
                <input type="checkbox" id="read_mod_lorebook" ${Number(configCache.read_mod_lorebook) === 1 ? "checked" : ""} style="margin:0;flex-shrink:0;" />
                <span>${_T.lbl_enable_mod_lorebook}</span>
              </label>
            </div>

            <!-- Card List (Blue) -->
            <div id="pse-card-enable-list" class="pse-entry-list" style="margin-top:8px;">
              <div class="pse-assembly blue" style="color:var(--pse-muted);font-size:12px;">${_T.lbl_loading}</div>
            </div>
          </div>

          <div class="pse-page" data-page="1">
            <!-- Recommendation (Amber) -->
            <div class="pse-section amber">
              <div class="pse-section-title" style="color: var(--pse-accent-amber); margin-bottom: 8px;">${_T.sec_suggest}</div>
              <div style="font-size: 13px; line-height: 1.6; color: var(--pse-text);">
                <div style="margin-bottom: 8px;">
                  <b style="color: var(--pse-text);">${_T.lbl_suggest_s1}</b><br/>
                  • ${_T.lbl_suggest_s1_main}<br/>
                  • ${_T.lbl_suggest_s1_aux}<br/>
                  • ${_T.lbl_suggest_s1_embed}
                </div>
                <div>
                  <b style="color: var(--pse-text);">${_T.lbl_suggest_s2}</b><br/>
                  • ${_T.lbl_suggest_s2_main}<br/>
                  • ${_T.lbl_suggest_s2_aux}<br/>
                  • ${_T.lbl_suggest_s2_embed}
                </div>
              </div>
            </div>

            <!-- Main Model (Indigo) -->
            <div class="pse-section indigo pse-model-section-a">
              <div class="pse-section-title" style="color: var(--pse-accent-indigo);">${_T.sec_a}</div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_provider}</label>
              <select id="extractor_a_provider" class="pse-input">${renderProviderOptions(configCache.extractor_a_provider)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_format}</label>
              <select id="extractor_a_format" class="pse-input">${renderFormatOptions(configCache.extractor_a_format)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_url}</label>
              <input id="extractor_a_url" class="pse-input" value="${String(configCache.extractor_a_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_key}</label>
              <textarea id="extractor_a_key" class="pse-input" rows="1" style="min-height:36px;resize:vertical;white-space:pre;" spellcheck="false">${escapeHtml(String(configCache.extractor_a_key || ""))}</textarea>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_model}</label>
              <input id="extractor_a_model" class="pse-input" autocomplete="off" value="${String(configCache.extractor_a_model || "").replace(/"/g, "&quot;")}" />
              <div id="extractor_a_model_suggestions" class="pse-model-suggestions"></div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_temp}</label>
              <input id="extractor_a_temperature" class="pse-input" type="number" min="0" max="2" step="0.1" value="${escapeHtml(String(Number(configCache.extractor_a_temperature) || 0))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_concur}</label>
              <select id="extractor_a_concurrency" class="pse-input">
                <option value="1" ${Number(configCache.extractor_a_concurrency) === 1 ? "selected" : ""}>${_T.opt_concurrent}</option>
                <option value="0" ${Number(configCache.extractor_a_concurrency) === 0 ? "selected" : ""}>${_T.opt_sequential}</option>
              </select>
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <input type="checkbox" id="extractor_a_thinking_enabled" ${Number(configCache.extractor_a_thinking_enabled) === 1 ? "checked" : ""} title="${_T.thinking_title}" style="margin:0;flex-shrink:0;" />
                <label for="extractor_a_thinking_enabled" class="pse-label" style="margin:0;cursor:pointer;white-space:nowrap;color:var(--pse-text);">${_T.lbl_thinking}</label>
                <select id="extractor_a_thinking_level" class="pse-input" style="flex:1;min-width:120px;" ${Number(configCache.extractor_a_thinking_enabled) !== 1 ? "disabled" : ""}>
                  <option value="low" ${configCache.extractor_a_thinking_level === "low" ? "selected" : ""}>${_T.opt_thinking_low}</option>
                  <option value="medium" ${!configCache.extractor_a_thinking_level || configCache.extractor_a_thinking_level === "medium" ? "selected" : ""}>${_T.opt_thinking_medium}</option>
                  <option value="high" ${configCache.extractor_a_thinking_level === "high" ? "selected" : ""}>${_T.opt_thinking_high}</option>
                </select>
              </div>
              <div id="extractor_a_thinking_hint" style="font-size:11px;color:var(--pse-muted);margin-top:4px;display:${Number(configCache.extractor_a_thinking_enabled) === 1 ? "block" : "none"};"></div>
            </div>

            <!-- Aux Model (Blue) -->
            <div class="pse-section blue pse-model-section-b">
              <div class="pse-section-title" style="color: var(--pse-accent-blue);">${_T.sec_b}</div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_provider}</label>
              <select id="extractor_b_provider" class="pse-input">${renderProviderOptions(configCache.extractor_b_provider)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_format}</label>
              <select id="extractor_b_format" class="pse-input">${renderFormatOptions(configCache.extractor_b_format)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_url}</label>
              <input id="extractor_b_url" class="pse-input" value="${String(configCache.extractor_b_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_key}</label>
              <textarea id="extractor_b_key" class="pse-input" rows="1" style="min-height:36px;resize:vertical;white-space:pre;" spellcheck="false">${escapeHtml(String(configCache.extractor_b_key || ""))}</textarea>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_model}</label>
              <input id="extractor_b_model" class="pse-input" autocomplete="off" value="${String(configCache.extractor_b_model || "").replace(/"/g, "&quot;")}" />
              <div id="extractor_b_model_suggestions" class="pse-model-suggestions"></div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_temp}</label>
              <input id="extractor_b_temperature" class="pse-input" type="number" min="0" max="2" step="0.1" value="${escapeHtml(String(Number(configCache.extractor_b_temperature) || 0))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_concur}</label>
              <select id="extractor_b_concurrency" class="pse-input">
                <option value="1" ${Number(configCache.extractor_b_concurrency) === 1 ? "selected" : ""}>${_T.opt_concurrent}</option>
                <option value="0" ${Number(configCache.extractor_b_concurrency) === 0 ? "selected" : ""}>${_T.opt_sequential}</option>
              </select>
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <input type="checkbox" id="extractor_b_thinking_enabled" ${Number(configCache.extractor_b_thinking_enabled) === 1 ? "checked" : ""} title="${_T.thinking_title}" style="margin:0;flex-shrink:0;" />
                <label for="extractor_b_thinking_enabled" class="pse-label" style="margin:0;cursor:pointer;white-space:nowrap;color:var(--pse-text);">${_T.lbl_thinking}</label>
                <select id="extractor_b_thinking_level" class="pse-input" style="flex:1;min-width:120px;" ${Number(configCache.extractor_b_thinking_enabled) !== 1 ? "disabled" : ""}>
                  <option value="low" ${configCache.extractor_b_thinking_level === "low" ? "selected" : ""}>${_T.opt_thinking_low}</option>
                  <option value="medium" ${!configCache.extractor_b_thinking_level || configCache.extractor_b_thinking_level === "medium" ? "selected" : ""}>${_T.opt_thinking_medium}</option>
                  <option value="high" ${configCache.extractor_b_thinking_level === "high" ? "selected" : ""}>${_T.opt_thinking_high}</option>
                </select>
              </div>
              <div id="extractor_b_thinking_hint" style="font-size:11px;color:var(--pse-muted);margin-top:4px;display:${Number(configCache.extractor_b_thinking_enabled) === 1 ? "block" : "none"};"></div>
            </div>

            <!-- Embed Model (Green) -->
            <div class="pse-section green pse-model-section-embed">
              <div class="pse-section-title" style="color: var(--pse-accent-green);">
                ${_T.sec_embed_title}
                <span style="font-size:12px; color:var(--pse-accent-rose); font-weight:normal; display:block; margin-top:4px;">${_T.embed_warn}</span>
              </div>
              <div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_provider}</label>
              <select id="embedding_provider" class="pse-input">${renderEmbeddingProviderOptions(configCache.embedding_provider)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_format}</label>
              <select id="embedding_format" class="pse-input">${renderFormatOptions(configCache.embedding_format)}</select>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_url}</label>
              <input id="embedding_url" class="pse-input" value="${String(configCache.embedding_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_key}</label>
              <input id="embedding_key" class="pse-input" type="text" value="${String(configCache.embedding_key || "").replace(/"/g, "&quot;")}" />
              <div id="embedding_model_row">
                <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_model}</label>
                <input id="embedding_model" class="pse-input" autocomplete="off" value="${escapeHtml(String(configCache.embedding_model || ""))}" />
                <div id="embedding_model_suggestions" class="pse-model-suggestions"></div>
              </div>
              <input id="embedding_request_model" type="hidden" value="${String(configCache.embedding_request_model || "").replace(/"/g, "&quot;")}" />
              </div>
            </div>
          </div>

          <div class="pse-page" data-page="2">
            <div class="pse-section" style="border-left: 4px solid #3F51B5;">
              <div class="pse-row" style="margin-bottom:10px;">
                <button id="pse-preset-common" class="pse-preset-btn" type="button">${_T.tab_common}</button>
                <button id="pse-preset-1" class="pse-preset-btn ${toInt(configCache.active_preset, 1) === 1 ? "active" : ""}" type="button">${_T.tab_preset1_old || _T.preset1}</button>
                <button id="pse-preset-2" class="pse-preset-btn ${toInt(configCache.active_preset, 1) === 2 ? "active" : ""}" type="button">${_T.tab_preset2_old || _T.preset2}</button>
              </div>
              <div class="pse-row" style="margin-bottom:10px;">
                <button id="pse-preset-character" class="pse-preset-btn pse-subtab" type="button">${_T.tab_char_extract}</button>
                <button id="pse-preset-3" class="pse-preset-btn pse-subtab" type="button">${_T.tab_preset1_new || _T.tab_preset3}</button>
                <button id="pse-preset-4" class="pse-preset-btn pse-subtab" type="button">${_T.tab_preset2_new || _T.tab_preset4}</button>
              </div>
              <div id="pse-lore-presets-container">
                <div class="pse-json-tools">
                  <div class="pse-json-tools-actions">
                    <button class="pse-btn cache pse-json-export-btn" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_json_export}</button>
                    <button class="pse-btn close pse-json-import-btn" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_json_import}</button>
                    <input class="pse-json-import-input" type="file" accept="${_T.json_file_accept}" style="display:none;" />
                  </div>
                </div>
                <div id="model_call_list" class="pse-entry-list"></div>
                <button id="add_model_call" class="pse-add-entry" type="button">${_T.btn_add_call}</button>
              </div>
              <div id="pse-common-prompts-container" style="display:none; flex-direction:column; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 12px; margin-top: 12px;">
                <label class="pse-label">${_T.lbl_anchor}</label>
                <div class="pse-textarea-wrap">
                  <textarea id="advanced_model_anchor_prompt" class="pse-textarea">${escapeHtml(configCache.advanced_model_anchor_prompt || "")}</textarea>
                  <button id="advanced_model_anchor_prompt_expand" class="pse-expand-btn" type="button" aria-label="${_T.aria_expand}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/></svg>
                  </button>
                </div>
                <label class="pse-label">${_T.lbl_prefill}</label>
                <div class="pse-textarea-wrap">
                  <textarea id="advanced_prefill_prompt" class="pse-textarea">${escapeHtml(configCache.advanced_prefill_prompt || "")}</textarea>
                  <button id="advanced_prefill_prompt_expand" class="pse-expand-btn" type="button" aria-label="${_T.aria_expand}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/></svg>
                  </button>
                </div>
                <label class="pse-label">${_T.lbl_prereply}</label>
                <div class="pse-textarea-wrap">
                  <textarea id="advanced_prereply_prompt" class="pse-textarea">${escapeHtml(configCache.advanced_prereply_prompt || "")}</textarea>
                  <button id="advanced_prereply_prompt_expand" class="pse-expand-btn" type="button" aria-label="${_T.aria_expand}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/></svg>
                  </button>
                </div>
              </div>
              <div id="pse-persona-container" style="display:none; flex-direction:column; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 12px; margin-top: 12px;">
                <div class="pse-json-tools">
                  <div class="pse-json-tools-actions">
                    <button class="pse-btn cache pse-json-export-btn" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_json_export}</button>
                    <button class="pse-btn close pse-json-import-btn" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_json_import}</button>
                    <input class="pse-json-import-input" type="file" accept="${_T.json_file_accept}" style="display:none;" />
                  </div>
                </div>
                <div id="persona_call_list" class="pse-entry-list"></div>
                <button id="add_persona_call" class="pse-add-entry" type="button">${_T.btn_add_call}</button>
              </div>
            </div>
          </div>

          <div class="pse-page" data-page="5">
            <div class="pse-section indigo">
              <div class="pse-section-title" style="color: var(--pse-accent-indigo);">${_T.preset1}</div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_query_rounds}</label>
              <input id="vector_search_query_dialogue_rounds" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds)))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_topk}</label>
              <input id="vector_search_top_k" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k)))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_minscore}</label>
              <input id="vector_search_min_score" class="pse-input" type="number" min="0" max="1" step="0.01" value="${String(Number(configCache.vector_search_min_score) || DEFAULTS.vector_search_min_score)}" />
            </div>
            <div class="pse-section green">
              <div class="pse-section-title" style="color: var(--pse-accent-green);">${_T.preset2}</div>
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_query_rounds}</label>
              <input id="vector_search_query_dialogue_rounds_2" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds_2, DEFAULTS.vector_search_query_dialogue_rounds_2)))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_topk}</label>
              <input id="vector_search_top_k_2" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_top_k_2, DEFAULTS.vector_search_top_k_2)))}" />
              <label class="pse-label" style="color:var(--pse-text);">${_T.lbl_minscore}</label>
              <input id="vector_search_min_score_2" class="pse-input" type="number" min="0" max="1" step="0.01" value="${String(Number(configCache.vector_search_min_score_2) || DEFAULTS.vector_search_min_score_2)}" />
            </div>
          </div>

          <div class="pse-page" data-page="6">
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button id="pse-clear-cache" class="pse-btn" type="button" style="flex:1;padding:7px 12px;font-size:12px;background:var(--pse-accent-rose);">${_T.btn_clear_cache}</button>
            </div>
            <div id="pse-embed-cache-list" class="pse-entry-list"></div>
            <textarea id="init_bootstrap_model_anchor_prompt" style="display:none;">${escapeHtml(String(configCache.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt))}</textarea>
          </div>

          <div class="pse-btn-row">
            <button id="pse-close" class="pse-btn close">${_T.btn_close}</button>
          </div>
        </div>
      </div>
    `;

    const _existingOverlay = document.getElementById("pse-overlay-root");
    document.body.appendChild(overlayRoot);
    if (_existingOverlay) _existingOverlay.remove();
    requestAnimationFrame(() => {
      overlayRoot.style.opacity = "1";
    });

    /* ── Bind close / overlay dismiss immediately so buttons work before heavy init ── */
    document
      .getElementById("pse-close")
      ?.addEventListener("click", async () => {
        const overlay = document.getElementById("pse-overlay-root");
        if (overlay) overlay.remove();
        try {
          await Risuai.hideContainer();
        } catch {}
      });

    overlayRoot.addEventListener("click", async (e) => {
      if (e.target !== overlayRoot && !e.target?.classList?.contains("pse-body")) {
        return;
      }
      const overlay = document.getElementById("pse-overlay-root");
      if (overlay) overlay.remove();
      try {
        await Risuai.hideContainer();
      } catch {}
    });

    /* ── Bind tab switching immediately ── */
    const setPage = (page) => {
      document.querySelectorAll(".pse-tab").forEach((el) => {
        el.classList.toggle("active", el.getAttribute("data-page") === page);
      });
      document.querySelectorAll(".pse-page").forEach((el) => {
        el.classList.toggle("active", el.getAttribute("data-page") === page);
      });
    };
    document.querySelectorAll(".pse-tab").forEach((el) => {
      el.addEventListener("click", () => {
        if (el.classList.contains("frozen")) return;
        const page = el.getAttribute("data-page");
        if (!page) return;
        setPage(page);
      });
    });

    const renderEmbeddingCacheList = async () => {
      const wrap = document.getElementById("pse-embed-cache-list");
      if (!wrap) return;

      const store = await loadEmbeddingCacheStore();
      const vecBlocks = summarizeEmbeddingCacheBlocks(store);
      const vecByCardKey = new Map(vecBlocks.map((b) => [b.cardKey, b]));

      const classifyBlocks = [];
      const personaBlocks = [];
      try {
        const db = await Risuai.getDatabase();
        const characters = Array.isArray(db?.characters) ? db.characters : [];
        const charMap = new Map();
        for (let idx = 0; idx < characters.length; idx++) {
          const c = characters[idx];
          const scopeId =
            String(c?.chaId || c?.id || c?._id || "").replace(
              /[^0-9a-zA-Z_-]/g,
              "",
            ) ||
            (safeTrim(c?.name || "")
              ? `name_${simpleHash(safeTrim(c.name))}`
              : null);
          if (scopeId) charMap.set(scopeId, idx);
        }

        for (let idx = 0; idx < characters.length; idx++) {
          const c = characters[idx];
          const scopeId =
            String(c?.chaId || c?.id || c?._id || "").replace(
              /[^0-9a-zA-Z_-]/g,
              "",
            ) ||
            (safeTrim(c?.name || "")
              ? `name_${simpleHash(safeTrim(c.name))}`
              : null);
          if (!scopeId) continue;
          const charName = safeTrim(c?.name || "");
          const cardKey = scopeId;
          const step0Key = makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId);
          const chunksKey = makeScopedStorageKey(
            STATIC_KNOWLEDGE_CHUNKS_KEY,
            scopeId,
          );
          const step0Done = await Risuai.pluginStorage.getItem(step0Key);
          if (!step0Done) continue;
          const chunksRaw = await Risuai.pluginStorage.getItem(chunksKey);
          const chunks = chunksRaw
            ? (() => {
                try {
                  return JSON.parse(chunksRaw);
                } catch {
                  return [];
                }
              })()
            : [];
          if (!chunks.length) continue;
          const embedCardKey = makeCardCacheKey(
            c?.chaId || c?.id || c?._id || "-1",
            charName || "Character",
            c,
          );
          classifyBlocks.push({
            type: "classify",
            charIndex: idx,
            cardKey: embedCardKey,
            cardName: charName || "(unknown)",
            chunkCount: chunks.length,
            scopeId,
            sizeBytes: getUtf8BytesLength(chunksRaw),
            vec: vecByCardKey.get(embedCardKey) || null,
          });
        }
        for (let idx = 0; idx < characters.length; idx++) {
          const c = characters[idx];
          const charName = safeTrim(c?.name || "");
          const charId = c?.chaId || c?.id || c?._id || "-1";
          const cardKey = makeCardCacheKey(charId, charName || "Character", c);
          const scopeId =
            String(charId || "").replace(/[^0-9a-zA-Z_-]/g, "") ||
            (charName ? `name_${simpleHash(charName)}` : null);
          const raw = await Risuai.pluginStorage.getItem(
            PCACHE_CARD_PREFIX + cardKey,
          );
          if (!raw) continue;
          let parsed = null;
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = null;
          }
          const entries =
            parsed?.entries && typeof parsed.entries === "object"
              ? parsed.entries
              : {};
          const entryCount = Object.keys(entries || {}).length;
          if (entryCount <= 0) continue;

          const charPairStatus = {};
          for (const entryKey of Object.keys(entries)) {
            const invMatch = entryKey.match(/^rp_persona_inventory_\((.+)\)$/);
            const coreMatch = entryKey.match(/^rp_character_core_\((.+)\)$/);
            if (invMatch) {
              const n = invMatch[1];
              if (!charPairStatus[n])
                charPairStatus[n] = { inv: false, core: false };
              charPairStatus[n].inv = true;
            }
            if (coreMatch) {
              const n = coreMatch[1];
              if (!charPairStatus[n])
                charPairStatus[n] = { inv: false, core: false };
              charPairStatus[n].core = true;
            }
          }

          personaBlocks.push({
            type: "persona",
            charIndex: idx,
            cardKey,
            charId,
            scopeId,
            cardName: charName || "(unknown)",
            entryCount,
            charPairStatus,
            sizeBytes: getUtf8BytesLength(raw),
            vec: vecByCardKey.get(cardKey) || null,
          });
        }
      } catch {}

      if (!classifyBlocks.length && !personaBlocks.length) {
        wrap.innerHTML = `<div class="pse-assembly">${_T.no_cache}</div>`;
        return;
      }

      const allBlocks = [...classifyBlocks, ...personaBlocks];
      allBlocks.sort((a, b) => {
        if (a.charIndex !== b.charIndex) {
          return a.charIndex - b.charIndex;
        }
        if (a.type !== b.type) {
          return a.type === "classify" ? -1 : 1;
        }
        return 0;
      });

      const combinedHtml = allBlocks
        .map((b, idx) => {
          if (b.type === "classify") {
            return `
        <div class="pse-entry-block" data-classify-scope-id="${escapeHtml(b.scopeId)}" data-cache-card-key="${escapeHtml(b.cardKey)}" data-cache-parity="${(vecBlocks.length + idx) % 2 === 0 ? "even" : "odd"}" style="opacity:0.8;">
          <div class="pse-entry-grid" style="grid-template-columns:1fr auto;">
            <div>
              <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">
                <b style="font-size:14px;">${escapeHtml(b.cardName)}</b>
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(255,171,0,0.1);color:var(--pse-accent-amber);border:1px solid rgba(255,171,0,0.3);margin-left:4px;">
                  ${_T.tag_classify}
                </span>
                ${
                  b.vec
                    ? `
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(41,121,255,0.1);color:var(--pse-accent-blue);border:1px solid rgba(41,121,255,0.3);">
                  ${_T.tag_vector}
                </span>`
                    : ""
                }
                ${
                  b.vec?.modelName
                    ? `
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(0,230,118,0.1);color:var(--pse-accent-green);border:1px solid rgba(0,230,118,0.3);">
                  ${escapeHtml(b.vec.modelName)}
                </span>`
                    : ""
                }
              </div>
              <div style="margin-top:4px;"><b>${_T.lbl_chunks}</b>: ${escapeHtml(String(b.chunkCount))}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_filesize}</b>: ${escapeHtml(formatBytes(b.sizeBytes))}</div>
            </div>
            <div style="display:flex;flex-direction:row;gap:6px;align-items:center;">
              ${b.vec ? `<button class="pse-entry-remove" type="button" data-delete-cache-card="1">${_T.btn_delete_vector}</button>` : ""}
              <button class="pse-entry-remove" type="button" data-delete-classify-card="1">${_T.btn_delete}</button>
            </div>
          </div>
        </div>
      `;
          } else {
            return `
        <div class="pse-entry-block" data-persona-card-key="${escapeHtml(b.cardKey)}" data-persona-scope-id="${escapeHtml(b.scopeId || "")}" data-persona-char-id="${escapeHtml(String(b.charId || ""))}" data-persona-char-name="${escapeHtml(String(b.cardName || ""))}" data-cache-card-key="${escapeHtml(b.cardKey)}" data-cache-parity="${(vecBlocks.length + idx) % 2 === 0 ? "even" : "odd"}" style="opacity:0.9;">
          <div class="pse-entry-grid" style="grid-template-columns:1fr auto;">
            <div>
              <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">
                <b style="font-size:14px;">${escapeHtml(b.cardName)}</b>
                <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;background:rgba(255,64,129,0.12);color:#ff4081;border:1px solid rgba(255,64,129,0.35);margin-left:4px;">
                  ${_T.tag_persona}
                </span>
                ${
                  b.vec
                    ? `
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(41,121,255,0.1);color:var(--pse-accent-blue);border:1px solid rgba(41,121,255,0.3);">
                  ${_T.tag_vector}
                </span>`
                    : ""
                }
                ${
                  b.vec?.modelName
                    ? `
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(0,230,118,0.1);color:var(--pse-accent-green);border:1px solid rgba(0,230,118,0.3);">
                  ${escapeHtml(b.vec.modelName)}
                </span>`
                    : ""
                }
              </div>
              <div style="margin-top:4px;"><b>${_T.lbl_entries}</b>: ${escapeHtml(String(b.entryCount))}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_filesize}</b>: ${escapeHtml(formatBytes(b.sizeBytes))}</div>
            </div>
            <div style="display:flex;flex-direction:row;gap:6px;align-items:center;">
              ${(() => {
                const status = b.charPairStatus || {};
                const chars = Object.keys(status);
                if (chars.length === 0) return "";
                const hasIncomplete = chars.some(
                  (n) => !(status[n].inv && status[n].core),
                );
                const iconColor = hasIncomplete
                  ? "var(--pse-accent-amber)"
                  : "var(--pse-accent-green)";
                const encodedStatus = escapeHtml(JSON.stringify(status));
                return `<button class="pse-entry-remove" type="button" data-persona-note-btn="1" data-persona-pair-status="${encodedStatus}" title="${_T.lbl_persona_entries}" style="border-color:${iconColor};color:${iconColor};min-width:34px;">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </button>`;
              })()}
              ${b.vec ? `<button class="pse-entry-remove" type="button" data-delete-cache-card="1">${_T.btn_delete_vector}</button>` : ""}
              <button class="pse-entry-remove" type="button" data-delete-persona-cache="1">${_T.btn_delete}</button>
            </div>
          </div>
        </div>
      `;
          }
        })
        .join("");

      wrap.innerHTML = combinedHtml;
    };

    const refreshPersonaCacheForBlock = async (block) => {
      if (!block) return;
      const scopeId = safeTrim(
        block.getAttribute("data-persona-scope-id") || "",
      );
      const persistedCardKey = safeTrim(
        block.getAttribute("data-persona-card-key") || "",
      );
      const charId =
        safeTrim(block.getAttribute("data-persona-char-id") || "") ||
        scopeId ||
        "-1";
      const charName =
        safeTrim(block.getAttribute("data-persona-char-name") || "") ||
        "Character";
      if (!scopeId) {
        showStatus(_T.st_persona_refresh_failed + "missing scope", "err");
        return;
      }

      let chunks = [];
      try {
        const raw = await Risuai.pluginStorage.getItem(
          makeScopedStorageKey(STATIC_KNOWLEDGE_CHUNKS_KEY, scopeId),
        );
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) chunks = parsed;
        }
      } catch {}
      if (!chunks.length) {
        showStatus(_T.st_persona_refresh_no_chunks, "err");
        return;
      }

      try {
        const cardKey = persistedCardKey || makeCardCacheKey(charId, charName);
        const cacheRaw = await Risuai.pluginStorage.getItem(
          PCACHE_CARD_PREFIX + cardKey,
        );
        if (cacheRaw) {
          try {
            const cache = JSON.parse(cacheRaw);
            if (cache && typeof cache === "object") {
              cache.completedTasks = [];
              await Risuai.pluginStorage.setItem(
                PCACHE_CARD_PREFIX + cardKey,
                JSON.stringify(cache),
              );
            }
          } catch {}
        }
      } catch {}

      const prevNewPreset = _currentIsNewPreset;
      _currentIsNewPreset = true;
      try {
        await runPersonaExtraction(
          { chaId: charId, id: charId, _id: charId, name: charName },
          chunks,
          true,
          { missingOnly: true },
        );
        await renderEmbeddingCacheList();
        showStatus(_T.st_persona_refreshed, "ok");
        try {
          alert(_T.st_persona_refreshed);
        } catch {}
      } catch (e) {
        showStatus(
          _T.st_persona_refresh_failed + (e?.message || String(e)),
          "err",
        );
      } finally {
        _currentIsNewPreset = prevNewPreset;
      }
    };

    Promise.resolve().then(() => renderEmbeddingCacheList()).catch(() => {});
    document.querySelectorAll(".pse-lang-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const lang = btn.dataset.lang;
        if (!lang) return;
        await Risuai.safeLocalStorage.setItem("pse_ui_language", lang);
        await renderSettingsUI();
      });
    });

    document
      .getElementById("pse-clear-cache")
      ?.addEventListener("click", async () => {
        if (!confirm(_T.confirm_clear)) return;
        await clearAllEmbeddingCache();
        await renderEmbeddingCacheList();
      });

    const renderCardEnableList = async () => {
      const wrap = document.getElementById("pse-card-enable-list");
      if (!wrap) return;
      let cardSettings = {};
      try {
        cardSettings =
          JSON.parse(configCache.card_enable_settings || "{}") || {};
      } catch {}
      try {
        const db = await Risuai.getDatabase();
        const characters = Array.isArray(db?.characters) ? db.characters : [];
        if (characters.length === 0) {
          wrap.innerHTML = `<div class="pse-assembly" style="color:var(--pse-muted);font-size:12px;">${_T.no_cards}</div>`;
          return;
        }
        const makeMemoryOpts = (selected) =>
          [
            `<option value="1" ${selected === "1" ? "selected" : ""}>${_T.tab_preset1_old || _T.opt_preset1}</option>`,
            `<option value="2" ${selected === "2" ? "selected" : ""}>${_T.tab_preset2_old || _T.opt_preset2}</option>`,
            `<option value="3" ${selected === "3" ? "selected" : ""}>${_T.tab_preset1_new || "Setting 1 (New)"}</option>`,
            `<option value="4" ${selected === "4" ? "selected" : ""}>${_T.tab_preset2_new || "Setting 2 (New)"}</option>`,
          ].join("");
        const makeVectorOpts = (selected) =>
          [
            `<option value="card_reorg" ${selected === "card_reorg" ? "selected" : ""}>${_T.opt_vec_card_reorg || "Card Reorg"}</option>`,
            `<option value="1"    ${selected === "1" ? "selected" : ""}>${_T.opt_vec_preset1 || _T.opt_preset1}</option>`,
            `<option value="2"    ${selected === "2" ? "selected" : ""}>${_T.opt_vec_preset2 || _T.opt_preset2}</option>`,
          ].join("");
        wrap.innerHTML = characters
          .map((c, idx) => {
            const rawId = String(c?.chaId || c?.id || c?._id || "").replace(
              /[^0-9a-zA-Z_-]/g,
              "",
            );
            const cname = safeTrim(c?.name || `Card ${idx + 1}`);
            const cid = rawId || `name_${simpleHash(cname)}`;
            const cs = cardSettings[cid] || {};
            const isEven = idx % 2 === 0;
            const borderColor = isEven
              ? "var(--pse-accent-blue)"
              : "var(--pse-accent-green)";
            const gradientColor = isEven
              ? "rgba(41, 121, 255, 0.08)"
              : "rgba(0, 230, 118, 0.08)";
            const isDisabled = !(
              cs.card_disabled === 0 ||
              cs.card_disabled === false ||
              cs.card_disabled === "0"
            );

            const memExtract =
              cs.memory_extract &&
              ["1", "2", "3", "4"].includes(String(cs.memory_extract))
                ? String(cs.memory_extract)
                : "1";
            const vecSearch =
              cs.vector_search &&
              ["card_reorg", "1", "2"].includes(String(cs.vector_search))
                ? String(cs.vector_search)
                : "card_reorg";

            const disabledRowStyle = isDisabled
              ? "background:rgba(255,23,68,0.07);border:1px solid rgba(255,23,68,0.2);"
              : "background:transparent;border:none;";
            const disabledLabelStyle = isDisabled
              ? "color:var(--pse-accent-rose);"
              : "color:#ffffff;";

            const getPresetTagConfig = (m, v) => {
              const isExt = ["1", "2"].includes(String(m));
              if (isExt)
                return {
                  text: _T.help_tab_p1 || "Preset 1",
                  bg: "rgba(41,121,255,0.1)",
                  color: "var(--pse-accent-blue)",
                  border: "rgba(41,121,255,0.3)",
                };
              return {
                text: _T.help_tab_p2 || "Preset 2",
                bg: "rgba(255,23,68,0.1)",
                color: "var(--pse-accent-rose)",
                border: "rgba(255,23,68,0.3)",
              };
            };

            const tagConfig = getPresetTagConfig(memExtract, vecSearch);

            return `
            <div class="pse-entry-block" data-card-id="${escapeHtml(cid)}" data-char-index="${idx}" style="border-left:4px solid ${borderColor};background:linear-gradient(180deg,${gradientColor} 0%,var(--pse-input-bg) 100%);">
              <div class="pse-card-topline" style="align-items:center;">
                <div class="pse-card-topline-main">
                  <div class="pse-card-name" style="font-size:14px;">${escapeHtml(cname)}</div>
                  <span class="pse-card-preset-tag" style="padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:${tagConfig.bg};color:${tagConfig.color};border:1px solid ${tagConfig.border};display:${isDisabled ? "none" : "inline-block"};cursor:pointer;">${tagConfig.text}</span>
                </div>
                <button class="pse-card-action pse-continue-chat-btn" type="button">
                  <svg style="width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;margin-right:4px;" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  ${escapeHtml(_T.btn_continue_chat || "Continue Chat")}
                </button>
              </div>
              <div class="pse-card-disabled-row" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 8px;border-radius:6px;${disabledRowStyle}">
                <input type="checkbox" class="pse-card-disabled" id="disabled_${escapeHtml(cid)}" ${isDisabled ? "checked" : ""} style="margin:0;flex-shrink:0;cursor:pointer;" />
                <label for="disabled_${escapeHtml(cid)}" style="font-size:12px;font-weight:700;cursor:pointer;${disabledLabelStyle}user-select:none;"> ${escapeHtml(_T.lbl_card_disabled)}</label>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;${isDisabled ? "opacity:0.35;pointer-events:none;" : ""}">
                <div>
                  <label class="pse-label" style="font-size:11px;">${_T.lbl_memory_extract}</label>
                  <select class="pse-input pse-card-memory" style="font-size:12px;">${makeMemoryOpts(memExtract)}</select>
                </div>
                <div>
                  <label class="pse-label" style="font-size:11px;">${_T.lbl_vector_search_card}</label>
                  <select class="pse-input pse-card-vector" style="font-size:12px;">${makeVectorOpts(vecSearch)}</select>
                </div>
              </div>
            </div>`;
          })
          .join("");
      } catch (e) {
        wrap.innerHTML = `<div class="pse-assembly" style="color:var(--pse-muted);font-size:12px;">Error: ${escapeHtml(String(e?.message || e))}</div>`;
      }
    };

    document.querySelectorAll(".pse-help-subtab").forEach((btn) => {
      btn.addEventListener("click", () => {
        const subId = btn.getAttribute("data-help-sub");
        if (!subId) return;
        document
          .querySelectorAll(".pse-help-subtab")
          .forEach((b) => b.classList.toggle("active", b === btn));
        document.querySelectorAll(".pse-help-content").forEach((el) => {
          el.style.display =
            el.id === `pse-help-content-${subId}` ? "block" : "none";
        });

        document.querySelectorAll(".pse-copy-sql-btn").forEach((btn) => {
          btn.onclick = async () => {
            const ta = btn.previousElementSibling;
            if (ta && ta.tagName === "TEXTAREA") {
              await copyTextWithFallback(ta.value);
              const originalText = btn.textContent;
              btn.textContent = "✓ 已複製系統提示詞";
              setTimeout(() => {
                btn.textContent = originalText;
              }, 2000);
            }
          };
        });
      });
    });

    /* setPage and tab click handlers were already bound above, right after DOM insertion */

    Promise.resolve().then(() => renderCardEnableList()).catch(() => {});

    document
      .getElementById("pse-card-enable-list")
      ?.addEventListener("click", (e) => {
        const continueBtn = e.target.closest(".pse-continue-chat-btn");
        if (continueBtn) {
          const block = continueBtn.closest(".pse-entry-block");
          const charIdx = Number(block?.getAttribute("data-char-index"));
          Promise.resolve()
            .then(() => openContinueChatPicker(charIdx))
            .catch((err) => {
              showStatus(
                `${_T.st_continue_chat_failed || "Continue chat failed: "}${err?.message || String(err)}`,
                "err",
              );
            });
          return;
        }
        const tag = e.target.closest(".pse-card-preset-tag");
        if (!tag) return;
        const block = tag.closest(".pse-entry-block");
        const memSel = block?.querySelector(".pse-card-memory");
        const m = memSel ? String(memSel.value) : "";
        const isExt = ["1", "2"].includes(m);
        const subId = isExt ? "p1" : "p2";
        setPage("7");
        const subBtn = document.querySelector(
          `.pse-help-subtab[data-help-sub="${subId}"]`,
        );
        if (subBtn) subBtn.click();
      });

    document
      .getElementById("pse-card-enable-list")
      ?.addEventListener("change", (e) => {
        const block = e.target?.closest?.(".pse-entry-block");
        if (!block) return;
        const tag = block.querySelector(".pse-card-preset-tag");
        const memSel = block.querySelector(".pse-card-memory");
        const vecSel = block.querySelector(".pse-card-vector");
        const updateTag = () => {
          if (!tag || !memSel || !vecSel) return;
          const m = String(memSel.value);
          const isExt = ["1", "2"].includes(m);
          let config;
          if (isExt)
            config = {
              text: _T.help_tab_p1 || "Preset 1",
              bg: "rgba(41,121,255,0.1)",
              color: "var(--pse-accent-blue)",
              border: "rgba(41,121,255,0.3)",
            };
          else
            config = {
              text: _T.help_tab_p2 || "Preset 2",
              bg: "rgba(255,23,68,0.1)",
              color: "var(--pse-accent-rose)",
              border: "rgba(255,23,68,0.3)",
            };
          tag.innerText = config.text;
          tag.style.background = config.bg;
          tag.style.color = config.color;
          tag.style.border = `1px solid ${config.border}`;
        };

        const cb = e.target?.closest?.(".pse-card-disabled");
        if (cb) {
          const row = block.querySelector(".pse-card-disabled-row");
          const label = row?.querySelector("label");
          const grid = block.querySelector(
            "div[style*='grid-template-columns']",
          );
          if (cb.checked) {
            if (row)
              row.style.cssText =
                "display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 8px;border-radius:6px;background:rgba(255,23,68,0.07);border:1px solid rgba(255,23,68,0.2);";
            if (label) label.style.color = "var(--pse-accent-rose)";
            if (grid) {
              grid.style.opacity = "0.35";
              grid.style.pointerEvents = "none";
            }
            if (tag) tag.style.display = "none";
          } else {
            if (row)
              row.style.cssText =
                "display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 8px;border-radius:6px;background:transparent;border:none;";
            if (label) label.style.color = "#ffffff";
            if (grid) {
              grid.style.opacity = "";
              grid.style.pointerEvents = "";
            }
            if (tag) {
              tag.style.display = "inline-block";
              updateTag();
            }
          }
        } else if (
          e.target.classList.contains("pse-card-memory") ||
          e.target.classList.contains("pse-card-vector")
        ) {
          updateTag();
        }
      });

    document
      .getElementById("pse-embed-cache-list")
      ?.addEventListener("click", async (e) => {
        const noteBtn = e.target?.closest?.("[data-persona-note-btn]");
        if (noteBtn) {
          const rawStatus =
            noteBtn.getAttribute("data-persona-pair-status") || "{}";
          let status = {};
          try {
            status = JSON.parse(rawStatus);
          } catch {}
          const block = noteBtn.closest("[data-persona-card-key]");
          const cardKey = safeTrim(
            block?.getAttribute("data-persona-card-key") || "",
          );

          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);";

          const buildRows = (currentStatus) => {
            const chars = Object.keys(currentStatus);
            if (chars.length === 0)
              return `<div style="color:var(--pse-muted);font-size:12px;padding:8px 0;">${_T.lbl_no_persona_data}</div>`;
            return chars
              .map((n) => {
                const s = currentStatus[n];
                const complete = s.inv && s.core;
                const invIcon = s.inv ? "✓" : "✗";
                const coreIcon = s.core ? "✓" : "✗";
                const invColor = s.inv
                  ? "var(--pse-accent-green)"
                  : "var(--pse-accent-rose)";
                const coreColor = s.core
                  ? "var(--pse-accent-green)"
                  : "var(--pse-accent-rose)";
                const rowBg = complete
                  ? "rgba(0,230,118,0.07)"
                  : "rgba(255,23,68,0.07)";
                const borderColor = complete
                  ? "rgba(0,230,118,0.25)"
                  : "rgba(255,23,68,0.25)";
                return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;background:${rowBg};border:1px solid ${borderColor};margin-bottom:5px;">
              <span style="font-size:12px;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(n)}</span>
              <span style="font-size:11px;color:${invColor};font-weight:700;white-space:nowrap;" title="rp_persona_inventory">Inv ${invIcon}</span>
              <span style="font-size:11px;color:${coreColor};font-weight:700;white-space:nowrap;" title="rp_character_core">Core ${coreIcon}</span>
              <button data-delete-persona-char="${escapeHtml(n)}" style="border:1px solid var(--pse-section-border);background:var(--pse-input-bg);color:var(--pse-muted);border-radius:5px;width:24px;height:24px;cursor:pointer;font-size:13px;line-height:1;flex-shrink:0;display:flex;align-items:center;justify-content:center;" title="${_T.lbl_delete_char_cache}">✕</button>
            </div>`;
              })
              .join("");
          };

          const renderPopup = (currentStatus) => {
            const rowsEl = overlay.querySelector("#pse-persona-note-rows");
            if (rowsEl) rowsEl.innerHTML = buildRows(currentStatus);
          };

          overlay.innerHTML = `
          <div style="background:var(--pse-card-bg);color:var(--pse-card-text);border-radius:12px;padding:18px;width:min(360px,90vw);max-height:80vh;display:flex;flex-direction:column;box-shadow:0 14px 40px rgba(0,0,0,0.4);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <div style="font-size:14px;font-weight:700;">${_T.lbl_persona_entries}</div>
              <div style="display:flex;align-items:center;gap:6px;">
                <button id="pse-persona-note-refresh" style="border:1px solid var(--pse-section-border);background:var(--pse-input-bg);color:var(--pse-card-text);border-radius:6px;padding:0 10px;height:28px;cursor:pointer;font-size:11px;white-space:nowrap;">${_T.btn_refresh_persona}</button>
                <button id="pse-persona-note-close" style="border:0;background:var(--pse-section-bg);color:var(--pse-card-text);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:15px;line-height:1;">✕</button>
              </div>
            </div>
            <div style="font-size:11px;color:var(--pse-muted);margin-bottom:10px;">Inv = rp_persona_inventory &nbsp;|&nbsp; Core = rp_character_core</div>
            <div id="pse-persona-note-rows" style="overflow-y:auto;">${buildRows(status)}</div>
          </div>`;

          document.body.appendChild(overlay);
          overlay
            .querySelector("#pse-persona-note-close")
            ?.addEventListener("click", () => overlay.remove());
          overlay
            .querySelector("#pse-persona-note-refresh")
            ?.addEventListener("click", async () => {
              overlay.remove();
              await refreshPersonaCacheForBlock(block);
            });
          overlay.addEventListener("click", (ev) => {
            if (ev.target === overlay) overlay.remove();
          });

          overlay
            .querySelector("#pse-persona-note-rows")
            ?.addEventListener("click", async (ev) => {
              const delBtn = ev.target?.closest?.("[data-delete-persona-char]");
              if (!delBtn) return;
              const charName = safeTrim(
                delBtn.getAttribute("data-delete-persona-char") || "",
              );
              if (!charName || !cardKey) return;

              try {
                const cache = await loadPersonaCache(cardKey);
                const keysToDelete = Object.keys(cache.entries || {}).filter(
                  (k) =>
                    k === `rp_persona_inventory_(${charName})` ||
                    k === `rp_character_core_(${charName})`,
                );
                const personaTextHashesToDelete = new Set(
                  keysToDelete
                    .map((k) => safeTrim(cache.entries?.[k]?.textHash || ""))
                    .filter(Boolean),
                );
                for (const k of keysToDelete) delete cache.entries[k];
                cache.completedTasks = cache.completedTasks || [];
                await savePersonaCache(cardKey, cache);

                const store = await loadEmbeddingCacheStore();
                const cardVec = store.cards?.[cardKey];
                if (cardVec?.entries) {
                  const vecKeysToDelete = Object.keys(cardVec.entries).filter(
                    (k) =>
                      String(k).startsWith("persona|") &&
                      personaTextHashesToDelete.has(
                        safeTrim(cardVec.entries?.[k]?.textHash || ""),
                      ),
                  );
                  for (const k of vecKeysToDelete) delete cardVec.entries[k];
                  if (vecKeysToDelete.length > 0)
                    await saveEmbeddingCacheStore(store, {
                      replaceCardKeys: [cardKey],
                    });
                }

                delete status[charName];
                renderPopup(status);

                if (block) {
                  const iconBtn = block.querySelector(
                    "[data-persona-note-btn]",
                  );
                  if (iconBtn) {
                    const hasIncomplete = Object.keys(status).some(
                      (n) => !(status[n].inv && status[n].core),
                    );
                    const iconColor =
                      Object.keys(status).length === 0
                        ? "var(--pse-muted)"
                        : hasIncomplete
                          ? "var(--pse-accent-amber)"
                          : "var(--pse-accent-green)";
                    iconBtn.style.borderColor = iconColor;
                    iconBtn.style.color = iconColor;
                    iconBtn.setAttribute(
                      "data-persona-pair-status",
                      JSON.stringify(status),
                    );
                  }
                }

                await renderEmbeddingCacheList();
              } catch (err) {
                try {
                  await Risuai.log(
                    `${LOG} Delete persona char failed: ${err?.message || String(err)}`,
                  );
                } catch {}
              }
            });

          return;
        }

        const vecBtn = e.target?.closest?.("[data-delete-cache-card]");
        if (vecBtn) {
          const block = vecBtn.closest?.("[data-cache-card-key]");
          const cardKey = safeTrim(
            block?.getAttribute?.("data-cache-card-key") || "",
          );
          if (!cardKey) return;
          const store = await loadEmbeddingCacheStore();
          let removedCard = false;
          if (store.cards && store.cards[cardKey]) {
            const card = store.cards[cardKey];
            const isClassify = !!block?.getAttribute?.(
              "data-classify-scope-id",
            );
            const isPersona = !!block?.getAttribute?.("data-persona-card-key");
            if (card?.entries) {
              const entries = card.entries;
              if (isClassify) {
                for (const [k, v] of Object.entries(entries)) {
                  if (
                    String(k).startsWith("chunk|") ||
                    v?.sourceType === "chunk"
                  ) {
                    delete entries[k];
                  }
                }
              } else if (isPersona) {
                for (const [k, v] of Object.entries(entries)) {
                  if (
                    String(k).startsWith("persona|") ||
                    v?.sourceType === "persona"
                  ) {
                    delete entries[k];
                  }
                }
              } else {
                for (const k of Object.keys(entries)) delete entries[k];
              }
            }
            if (!card?.entries || Object.keys(card.entries).length === 0) {
              delete store.cards[cardKey];
              removedCard = true;
              try {
                await Risuai.pluginStorage.removeItem(
                  VCACHE_CARD_PREFIX + cardKey,
                );
              } catch {}
            }
            embeddingCacheStore = null;
            await saveEmbeddingCacheStore(store, {
              removedCardKeys: removedCard ? [cardKey] : [],
              replaceCardKeys: removedCard ? [] : [cardKey],
            });
          }
          await renderEmbeddingCacheList();
          showStatus(_T.st_card_deleted, "ok");
          return;
        }

        const clsBtn = e.target?.closest?.("[data-delete-classify-card]");
        if (clsBtn) {
          const block = clsBtn.closest?.("[data-classify-scope-id]");
          const scopeId = safeTrim(
            block?.getAttribute?.("data-classify-scope-id") || "",
          );
          if (!scopeId) return;
          try {
            await Risuai.pluginStorage.removeItem(
              makeScopedStorageKey(STATIC_KNOWLEDGE_CHUNKS_KEY, scopeId),
            );
          } catch {}
          try {
            await Risuai.pluginStorage.removeItem(
              makeScopedStorageKey(STATIC_DATA_HASH_KEY, scopeId),
            );
          } catch {}
          try {
            await Risuai.pluginStorage.removeItem(
              makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId),
            );
          } catch {}
          sessionStep0HandledHashByScope.delete(scopeId);
          await renderEmbeddingCacheList();
          showStatus(_T.st_card_deleted, "ok");
        }

        const personaBtn = e.target?.closest?.("[data-delete-persona-cache]");
        if (personaBtn) {
          const block = personaBtn.closest?.("[data-persona-card-key]");
          const cardKey = safeTrim(
            block?.getAttribute?.("data-persona-card-key") || "",
          );
          if (!cardKey) return;
          try {
            let removedCard = false;
            const store = await loadEmbeddingCacheStore();
            if (store.cards?.[cardKey]?.entries) {
              const entries = store.cards[cardKey].entries;
              for (const [k, v] of Object.entries(entries)) {
                if (
                  String(k).startsWith("persona|") ||
                  v?.sourceType === "persona"
                ) {
                  delete entries[k];
                }
              }
              if (Object.keys(entries).length === 0) {
                delete store.cards[cardKey];
                removedCard = true;
                try {
                  await Risuai.pluginStorage.removeItem(
                    VCACHE_CARD_PREFIX + cardKey,
                  );
                } catch {}
              }
              embeddingCacheStore = null;
              await saveEmbeddingCacheStore(store, {
                removedCardKeys: removedCard ? [cardKey] : [],
                replaceCardKeys: removedCard ? [] : [cardKey],
              });
            }
          } catch {}
          try {
            await Risuai.pluginStorage.removeItem(PCACHE_CARD_PREFIX + cardKey);
          } catch {}
          await renderEmbeddingCacheList();
          showStatus(_T.st_card_deleted, "ok");
        }
      });

    const openPromptEditor = (textareaIdOrEl, title) => {
      const src =
        typeof textareaIdOrEl === "string"
          ? document.getElementById(textareaIdOrEl)
          : textareaIdOrEl;
      if (!src) return;
      const overlay = document.createElement("div");
      overlay.className = "pse-editor-overlay";
      overlay.innerHTML = `
        <div class="pse-editor-modal">
          <div class="pse-editor-head">
            <div class="pse-editor-title">${escapeHtml(title)}</div>
            <button id="pse-editor-close" class="pse-editor-close" type="button" aria-label="${_T.aria_close}">✕</button>
          </div>
          <textarea id="pse-editor-textarea" class="pse-editor-textarea"></textarea>
          <div class="pse-editor-actions">
            <button id="pse-editor-cancel" class="pse-btn close" type="button" style="flex:0 0 auto">${_T.editor_cancel}</button>
            <button id="pse-editor-apply" class="pse-btn save" type="button" style="flex:0 0 auto">${_T.editor_apply}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      const editor = overlay.querySelector("#pse-editor-textarea");
      if (editor) {
        editor.value = src.value || "";
        editor.focus();
      }
      const close = () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onEsc);
        try {
          overlay.remove();
        } catch {}
      };
      const onEsc = (e) => {
        if (e.key === "Escape") close();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onEsc);
      overlay
        .querySelector("#pse-editor-close")
        ?.addEventListener("click", close);
      overlay
        .querySelector("#pse-editor-cancel")
        ?.addEventListener("click", close);
      overlay
        .querySelector("#pse-editor-apply")
        ?.addEventListener("click", () => {
          if (editor) src.value = editor.value;
          close();
        });
    };

    const bindPromptExpander = (buttonId, textareaId, title) => {
      document
        .getElementById(buttonId)
        ?.addEventListener("click", () => openPromptEditor(textareaId, title));
    };
    bindPromptExpander(
      "advanced_model_anchor_prompt_expand",
      "advanced_model_anchor_prompt",
      _T.expand_anchor,
    );
    bindPromptExpander(
      "advanced_prefill_prompt_expand",
      "advanced_prefill_prompt",
      _T.expand_prefill,
    );
    bindPromptExpander(
      "advanced_prereply_prompt_expand",
      "advanced_prereply_prompt",
      _T.expand_prereply,
    );
    bindPromptExpander(
      "init_bootstrap_model_anchor_prompt_expand",
      "init_bootstrap_model_anchor_prompt",
      _T.expand_classify,
    );

    document.querySelector(".pse-card").addEventListener("click", (e) => {
      const btn = e.target.closest(".pse-expand-btn");
      if (!btn || btn.id) return;
      const wrap = btn.closest(".pse-textarea-wrap");
      const textarea = wrap?.querySelector("textarea");
      if (textarea) {
        let title = _T.expand_generic;
        if (btn.classList.contains("pse-entry-format-expand"))
          title = _T.expand_format;
        openPromptEditor(textarea, title);
      }
    });

    const renderSelectOptions = (options, selected) =>
      options
        .map(
          (opt) =>
            `<option value="${escapeHtml(opt.value)}" ${opt.value === selected ? "selected" : ""}>${escapeHtml(opt.label)}</option>`,
        )
        .join("");
    const modelCallListEl = document.getElementById("model_call_list");
    const personaCallListEl = document.getElementById("persona_call_list");
    let uiActivePreset = toInt(configCache.active_preset, 1);
    if (uiActivePreset < 1 || uiActivePreset > 4) uiActivePreset = 1;
    let uiSubTab = uiActivePreset;
    let uiInfoMode = "preset";
    let uiModelCalls1 = parseModelCalls(configCache.model_calls);
    let uiModelCalls2 = parseModelCalls(configCache.model_calls_2);
    let uiModelCalls3 = parseModelCalls(configCache.model_calls_3);
    let uiModelCalls4 = parseModelCalls(configCache.model_calls_4);
    let uiModelCalls =
      uiActivePreset === 4
        ? uiModelCalls4
        : uiActivePreset === 3
          ? uiModelCalls3
          : uiActivePreset === 2
            ? uiModelCalls2
            : uiModelCalls1;
    let uiPersonaCalls = parsePersonaCalls(configCache.persona_calls);

    const getInfoJsonState = () => {
      if (uiInfoMode === "persona") {
        return {
          mode: "persona",
          tabKey: "persona_calls",
          fileStem: "persona-calls",
          calls: uiPersonaCalls,
        };
      }
      if (uiSubTab === 4) {
        return {
          mode: "preset",
          tabKey: "model_calls_4",
          fileStem: "preset-4",
          calls: uiModelCalls4,
        };
      }
      if (uiSubTab === 3) {
        return {
          mode: "preset",
          tabKey: "model_calls_3",
          fileStem: "preset-3",
          calls: uiModelCalls3,
        };
      }
      if (uiSubTab === 2) {
        return {
          mode: "preset",
          tabKey: "model_calls_2",
          fileStem: "preset-2",
          calls: uiModelCalls2,
        };
      }
      return {
        mode: "preset",
        tabKey: "model_calls",
        fileStem: "preset-1",
        calls: uiModelCalls1,
      };
    };

    const syncCurrentInfoJsonState = () => {
      if (uiInfoMode === "persona") {
        syncUiPersonaCalls();
        return;
      }
      if (uiSubTab !== "common") {
        syncUiModelCalls();
        if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
        else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
        else if (uiSubTab === 3) uiModelCalls3 = uiModelCalls;
        else if (uiSubTab === 4) uiModelCalls4 = uiModelCalls;
      }
    };

    const downloadJsonFile = (filename, text) => {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    };

    const renderCallEntries = (call, callIndex, options = {}) => {
      const showWriteMode = options.showWriteMode !== false;
      const showAlwaysActive = options.showAlwaysActive !== false;
      const showRetention = options.showRetention !== false;
      const entries =
        Array.isArray(call.entries) && call.entries.length
          ? call.entries
          : [defaultOutputEntry(call.target_model)];
      return entries
        .map((entry, entryIndex) => {
          const e = normalizeOutputEntry(entry, call.target_model);
          return `
          <div class="pse-entry-block" data-entry-index="${entryIndex}">
            <div class="pse-entry-grid">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_lore_entry}</label><input class="pse-input pse-entry-lore" value="${escapeHtml(e.lorebook_name)}" /></div>
              ${showWriteMode ? `<div class="pse-entry-col"><label class="pse-label">${_T.lbl_write_mode}</label><select class="pse-input pse-entry-mode">${renderSelectOptions(LORE_WRITE_MODE_OPTIONS, e.write_mode)}</select></div>` : ""}
              ${showAlwaysActive ? `<div class="pse-entry-col"><label class="pse-label">${_T.lbl_always_active}</label><select class="pse-input pse-entry-always-active"><option value="1" ${e.always_active ? "selected" : ""}>${_T.yes}</option><option value="0" ${!e.always_active ? "selected" : ""}>${_T.no}</option></select></div>` : ""}
              <button class="pse-entry-remove${options.compactRemove ? " compact" : ""}" type="button" data-remove-entry="1" data-call-index="${callIndex}" ${entries.length <= 1 ? "disabled" : ""}>✕</button>
            </div>
            <div class="pse-entry-grid-row2">
              <div class="pse-entry-col">
                <label class="pse-label">${_T.lbl_output_format}</label>
                <div class="pse-textarea-wrap">
                  <textarea class="pse-entry-format-input pse-entry-format pse-textarea">${escapeHtml(String(e.output_format || ""))}</textarea>
                  <button class="pse-expand-btn pse-entry-format-expand" type="button" aria-label="${_T.aria_expand}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/></svg></button>
                </div>
              </div>
            </div>
            ${
              showRetention
                ? `<div class="pse-entry-retention-row" style="display:${e.write_mode === "append" ? "flex" : "none"};align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px;">
              <input class="pse-entry-retention-enabled" type="checkbox" id="ret_${callIndex}_${entryIndex}" ${e.retention_enabled ? "checked" : ""}
                title="${_T.ret_enabled_title}" />
              <label for="ret_${callIndex}_${entryIndex}" class="pse-label" style="cursor:pointer;user-select:none;">${_T.ret_after_lbl}</label>
              <input class="pse-input pse-entry-retention-after" type="number" min="0" value="${e.retention_after ?? 0}"
                style="width:60px;" title="${_T.ret_after_title}" ${e.retention_enabled ? "" : "disabled"} />
              <label class="pse-label">${_T.ret_mid_lbl}</label>
              <input class="pse-input pse-entry-retention-keep" type="number" min="0" value="${e.retention_keep ?? 5}"
                style="width:60px;" title="${_T.ret_keep_title}" ${e.retention_enabled ? "" : "disabled"} />
              <label class="pse-label">${_T.ret_end_lbl}</label>
            </div>`
                : ""
            }
          </div>
        `;
        })
        .join("");
    };

    const renderCallsToContainer = (calls, containerEl, options = {}) => {
      if (!containerEl) return;
      containerEl.innerHTML = calls
        .map((rawCall, callIndex) => {
          const call = normalizeModelCall(rawCall, callIndex);
          const showReadRounds = options.showReadRounds !== false;
          const showReadLore = options.showReadLore !== false;
          const showReadPersona = options.showReadPersona === true;
          const showFreq = options.showFreq !== false;
          return `
          <div class="pse-call-card" data-call-index="${callIndex}" data-call-target="${escapeHtml(call.target_model)}" data-call-parity="${callIndex % 2 === 0 ? "even" : "odd"}">
            <div class="pse-call-head${showFreq ? "" : " no-freq"}">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_call_note}</label><input class="pse-input pse-call-name" value="${escapeHtml(call.name)}" /></div>
              <div class="pse-entry-col">
                <label class="pse-label">${_T.lbl_call_model}</label>
                <select class="pse-input pse-call-target"><option value="A" ${call.target_model === "A" ? "selected" : ""}>${_T.opt_main}</option><option value="B" ${call.target_model === "B" ? "selected" : ""}>${_T.opt_aux}</option></select>
              </div>
              ${showFreq ? `<div class="pse-entry-col"><label class="pse-label">${_T.lbl_freq}</label><input class="pse-input pse-call-frequency" type="number" min="1" value="${String(call.every_n_turns || 1)}" /></div>` : ""}
              <button class="pse-entry-remove" type="button" data-remove-call="1" ${calls.length <= 1 ? "disabled" : ""}>✕</button>
            </div>
            ${
              showReadRounds || showReadLore
                ? `
            <div class="pse-call-row2">
              ${showReadRounds ? `<div class="pse-entry-col"><label class="pse-label">${_T.lbl_read_rounds}</label><input class="pse-input pse-call-read-rounds" type="number" min="0" value="${String(Math.max(0, toInt(call.read_dialogue_rounds, 4)))}" /></div>` : ""}
              ${showReadLore ? `<div class="pse-entry-col"><label class="pse-label">${_T.lbl_read_lore}</label><input class="pse-input pse-call-read-lorebook-names" value="${escapeHtml(String(call.read_lorebook_names || ""))}" /></div>` : ""}
            </div>`
                : ""
            }
            ${
              showReadPersona
                ? `
            <div class="pse-call-row3">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_read_persona}</label><input class="pse-input pse-call-read-persona-names" value="${escapeHtml(String(call.read_persona_names || ""))}" /></div>
            </div>`
                : ""
            }
            <div class="pse-entry-list">${renderCallEntries(call, callIndex, options)}</div>
            <button class="pse-add-entry" type="button" data-add-entry="1" data-call-index="${callIndex}">${_T.btn_add_entry}</button>
          </div>
        `;
        })
        .join("");
    };

    const renderModelCalls = () =>
      renderCallsToContainer(uiModelCalls, modelCallListEl, {
        showReadRounds: true,
        showReadLore: true,
        showReadPersona: true,
      });
    const renderPersonaCalls = () =>
      renderCallsToContainer(uiPersonaCalls, personaCallListEl, {
        showReadRounds: false,
        showReadLore: false,
        showReadPersona: false,
        showWriteMode: false,
        showAlwaysActive: false,
        showRetention: false,
        showFreq: false,
        compactRemove: true,
      });

    const exportCurrentInfoJson = () => {
      syncCurrentInfoJsonState();
      const state = getInfoJsonState();
      const payload = {
        schema: "risuai-agent-call-config",
        version: 1,
        mode: state.mode,
        tab: state.tabKey,
        exported_at: new Date().toISOString(),
        calls: state.calls,
      };
      downloadJsonFile(
        `risuai-agent-${state.fileStem}.json`,
        JSON.stringify(payload, null, 2),
      );
      showStatus(_T.st_json_exported, "ok");
    };

    const importCurrentInfoJson = async (file) => {
      if (!file) return;
      try {
        const rawText = await file.text();
        const state = getInfoJsonState();
        const importedCalls = parseImportedCallPayload(rawText, state.mode);

        if (state.mode === "persona") {
          uiPersonaCalls = importedCalls;
          renderPersonaCalls();
        } else {
          uiModelCalls = importedCalls;
          if (uiSubTab === 1) uiModelCalls1 = importedCalls;
          else if (uiSubTab === 2) uiModelCalls2 = importedCalls;
          else if (uiSubTab === 3) uiModelCalls3 = importedCalls;
          else if (uiSubTab === 4) uiModelCalls4 = importedCalls;
          renderModelCalls();
        }
        await saveCurrentSettings();
        showStatus(_T.st_json_imported, "ok");
      } catch (error) {
        const message =
          error?.code === "invalid_mode"
            ? _T.err_json_import_mode
            : _T.err_json_import_invalid;
        showStatus(message, "err");
        try {
          alert(message);
        } catch {}
      }
    };

    const collectFormData = () => {
      const exAProv = safeTrim(
        document.getElementById("extractor_a_provider")?.value || "custom_api",
      );
      const exAMod = safeTrim(
        document.getElementById("extractor_a_model")?.value || "",
      );
      const exAKey = safeTrim(
        document.getElementById("extractor_a_key")?.value || "",
      );
      if (exAProv && exAMod) uiExtractorAProviderModelMap[exAProv] = exAMod;
      if (exAProv && exAKey) uiExtractorAProviderKeyMap[exAProv] = exAKey;

      const exBProv = safeTrim(
        document.getElementById("extractor_b_provider")?.value || "custom_api",
      );
      const exBMod = safeTrim(
        document.getElementById("extractor_b_model")?.value || "",
      );
      const exBKey = safeTrim(
        document.getElementById("extractor_b_key")?.value || "",
      );
      if (exBProv && exBMod) uiExtractorBProviderModelMap[exBProv] = exBMod;
      if (exBProv && exBKey) uiExtractorBProviderKeyMap[exBProv] = exBKey;

      const embProv = safeTrim(
        document.getElementById("embedding_provider")?.value || "custom_api",
      );
      const embKey = safeTrim(
        document.getElementById("embedding_key")?.value || "",
      );
      const embMod = safeTrim(
        document.getElementById("embedding_model")?.value || "",
      );
      if (embProv && embMod) uiEmbeddingProviderModelMap[embProv] = embMod;
      if (embProv && embKey) uiEmbeddingProviderKeyMap[embProv] = embKey;

      if (uiSubTab !== "common") {
        syncUiModelCalls();
        if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
        else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
        else if (uiSubTab === 3) uiModelCalls3 = uiModelCalls;
        else if (uiSubTab === 4) uiModelCalls4 = uiModelCalls;
      }
      if (uiInfoMode === "persona") {
        syncUiPersonaCalls();
      }

      return {
        extractor_a_provider: exAProv,
        extractor_a_format: safeTrim(
          document.getElementById("extractor_a_format")?.value || "openai",
        ),
        extractor_a_url: safeTrim(
          document.getElementById("extractor_a_url")?.value,
        ),
        extractor_a_key: exAKey,
        extractor_a_model: exAMod,
        extractor_a_provider_model_map: JSON.stringify(
          uiExtractorAProviderModelMap,
        ),
        extractor_a_provider_url_map: JSON.stringify(getUrlMapA()),
        extractor_a_provider_key_map: JSON.stringify(uiExtractorAProviderKeyMap),
        extractor_a_temperature: Math.max(
          0,
          Math.min(
            2,
            Number(
              document.getElementById("extractor_a_temperature")?.value || 0,
            ),
          ),
        ),
        extractor_b_provider: exBProv,
        extractor_b_format: safeTrim(
          document.getElementById("extractor_b_format")?.value || "openai",
        ),
        extractor_b_url: safeTrim(
          document.getElementById("extractor_b_url")?.value,
        ),
        extractor_b_key: exBKey,
        extractor_b_model: exBMod,
        extractor_b_provider_model_map: JSON.stringify(
          uiExtractorBProviderModelMap,
        ),
        extractor_b_provider_url_map: JSON.stringify(getUrlMapB()),
        extractor_b_provider_key_map: JSON.stringify(uiExtractorBProviderKeyMap),
        extractor_b_temperature: Math.max(
          0,
          Math.min(
            2,
            Number(
              document.getElementById("extractor_b_temperature")?.value || 0,
            ),
          ),
        ),
        embedding_provider: embProv,
        embedding_format: safeTrim(
          document.getElementById("embedding_format")?.value || "openai",
        ),
        embedding_model: embMod,
        embedding_url: safeTrim(document.getElementById("embedding_url")?.value),
        embedding_key: embKey,
        embedding_request_model: (() => {
          const preset =
            EMBEDDING_PROVIDER_PRESETS[embProv] ||
            EMBEDDING_PROVIDER_PRESETS.custom_api;
          if (embProv === "custom_api")
            return safeTrim(
              document.getElementById("embedding_request_model")?.value ||
                embMod,
            );
          return safeTrim(
            EMBEDDING_MODEL_TO_REQUEST[embMod] ||
              embMod ||
              preset.requestModel ||
              "",
          );
        })(),
        embedding_provider_model_map: JSON.stringify(uiEmbeddingProviderModelMap),
        embedding_provider_url_map: JSON.stringify(uiEmbeddingProviderUrlMap),
        embedding_provider_key_map: JSON.stringify(uiEmbeddingProviderKeyMap),
        model_calls: JSON.stringify(uiModelCalls1),
        model_calls_2: JSON.stringify(uiModelCalls2),
        model_calls_3: JSON.stringify(uiModelCalls3),
        model_calls_4: JSON.stringify(uiModelCalls4),
        persona_calls: JSON.stringify(uiPersonaCalls),
        active_preset: uiActivePreset,
        advanced_model_anchor_prompt:
          document.getElementById("advanced_model_anchor_prompt")?.value ?? "",
        advanced_prefill_prompt:
          document.getElementById("advanced_prefill_prompt")?.value ?? "",
        advanced_prereply_prompt:
          document.getElementById("advanced_prereply_prompt")?.value ?? "",
        read_mod_lorebook: document.getElementById("read_mod_lorebook")?.checked ? 1 : 0,
        vector_search_enabled: 1,
        vector_search_query_dialogue_rounds: Math.max(
          1,
          toInt(
            document.getElementById("vector_search_query_dialogue_rounds")?.value,
            DEFAULTS.vector_search_query_dialogue_rounds,
          ),
        ),
        vector_search_top_k: Math.max(
          1,
          toInt(
            document.getElementById("vector_search_top_k")?.value,
            DEFAULTS.vector_search_top_k,
          ),
        ),
        vector_search_min_score: Math.max(
          0,
          Number(
            document.getElementById("vector_search_min_score")?.value ||
              DEFAULTS.vector_search_min_score,
          ),
        ),
        vector_search_query_dialogue_rounds_2: Math.max(
          1,
          toInt(
            document.getElementById("vector_search_query_dialogue_rounds_2")?.value,
            DEFAULTS.vector_search_query_dialogue_rounds_2,
          ),
        ),
        vector_search_top_k_2: Math.max(
          1,
          toInt(
            document.getElementById("vector_search_top_k_2")?.value,
            DEFAULTS.vector_search_top_k_2,
          ),
        ),
        vector_search_min_score_2: Math.max(
          0,
          Number(
            document.getElementById("vector_search_min_score_2")?.value ||
              DEFAULTS.vector_search_min_score_2,
          ),
        ),
        init_bootstrap_target_model:
          safeTrim(
            document.getElementById("init_bootstrap_target_model")?.value ||
              DEFAULTS.init_bootstrap_target_model,
          ) === "B"
            ? "B"
            : "A",
        init_bootstrap_model_anchor_prompt:
          document.getElementById("init_bootstrap_model_anchor_prompt")?.value ??
          "",
        extractor_a_thinking_enabled: document.getElementById(
          "extractor_a_thinking_enabled",
        )?.checked
          ? 1
          : 0,
        extractor_a_thinking_level: safeTrim(
          document.getElementById("extractor_a_thinking_level")?.value ||
            "medium",
        ),
        extractor_b_thinking_enabled: document.getElementById(
          "extractor_b_thinking_enabled",
        )?.checked
          ? 1
          : 0,
        extractor_b_thinking_level: safeTrim(
          document.getElementById("extractor_b_thinking_level")?.value ||
            "medium",
        ),
        extractor_a_concurrency: toInt(
          document.getElementById("extractor_a_concurrency")?.value,
          1,
        ),
        extractor_b_concurrency: toInt(
          document.getElementById("extractor_b_concurrency")?.value,
          1,
        ),
        context_messages: configCache.context_messages,
        timeout_ms: configCache.timeout_ms,
        card_enable_settings: (() => {
          const cardList = document.querySelectorAll(
            "#pse-card-enable-list .pse-entry-block",
          );
          const cs = {};
          cardList.forEach((block) => {
            const cid = block.getAttribute("data-card-id");
            if (!cid) return;
            cs[cid] = {
              memory_extract:
                block.querySelector(".pse-card-memory")?.value || "1",
              vector_search:
                block.querySelector(".pse-card-vector")?.value || "off",
              card_disabled: block.querySelector(".pse-card-disabled")?.checked
                ? 1
                : 0,
            };
          });
          return JSON.stringify(cs);
        })(),
      };
    };

    let autosaveTimer = null;
    let autosaveInFlight = false;
    let autosaveQueued = false;

    const saveCurrentSettings = async (options = {}) => {
      const showSuccess = options.showSuccess === true;
      const successMessage = options.successMessage || _T.st_saved;
      const formData = collectFormData();
      await saveConfigFromUI(formData);
      if (showSuccess) {
        showStatus(successMessage, "ok");
      }
    };

    const runAutosave = async () => {
      if (autosaveInFlight) {
        autosaveQueued = true;
        return;
      }
      autosaveInFlight = true;
      try {
        await saveCurrentSettings();
      } catch (e) {
        showStatus(_T.st_save_fail + (e?.message || String(e)), "err");
      } finally {
        autosaveInFlight = false;
        if (autosaveQueued) {
          autosaveQueued = false;
          runAutosave().catch(() => {});
        }
      }
    };

    const scheduleAutosave = (delay = 500) => {
      if (autosaveTimer) clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(() => {
        autosaveTimer = null;
        runAutosave().catch(() => {});
      }, delay);
    };

    const readCallsFromContainer = (containerEl, existingCalls) => {
      const cards = Array.from(
        containerEl?.querySelectorAll?.(".pse-call-card") || [],
      );
      const calls = cards.map((card, i) => {
        const existing = existingCalls?.[i] || {};
        const target =
          safeTrim(card.querySelector(".pse-call-target")?.value || "A") === "B"
            ? "B"
            : "A";
        const entries = Array.from(card.querySelectorAll(".pse-entry-block"))
          .map((block) => ({
            lorebook_name: safeTrim(
              block.querySelector(".pse-entry-lore")?.value || "",
            ),
            write_mode: safeTrim(
              block.querySelector(".pse-entry-mode")?.value || "append",
            ),
            always_active:
              block.querySelector(".pse-entry-always-active")?.value === "1",
            output_format: String(
              block.querySelector(".pse-entry-format")?.value || "",
            ),
            retention_enabled:
              block.querySelector(".pse-entry-retention-enabled")?.checked ===
              true,
            retention_after: Math.max(
              0,
              toInt(
                block.querySelector(".pse-entry-retention-after")?.value,
                0,
              ),
            ),
            retention_keep: Math.max(
              0,
              toInt(block.querySelector(".pse-entry-retention-keep")?.value, 5),
            ),
          }))
          .map((e) => normalizeOutputEntry(e, target))
          .filter((e) => !!e.lorebook_name);
        return normalizeModelCall(
          {
            id: safeTrim(existingCalls?.[i]?.id) || `call_${Date.now()}_${i}`,
            name: safeTrim(card.querySelector(".pse-call-name")?.value || ""),
            target_model: target,
            every_n_turns: Math.max(
              1,
              toInt(
                card.querySelector(".pse-call-frequency")?.value,
                existing?.every_n_turns ?? 1,
              ),
            ),
            read_dialogue_rounds: Math.max(
              0,
              toInt(
                card.querySelector(".pse-call-read-rounds")?.value,
                existing?.read_dialogue_rounds ?? 4,
              ),
            ),
            read_lorebook_names: String(
              card.querySelector(".pse-call-read-lorebook-names")?.value ||
                existing?.read_lorebook_names ||
                "",
            ),
            read_persona_names: String(
              card.querySelector(".pse-call-read-persona-names")?.value ||
                existing?.read_persona_names ||
                "",
            ),
            entries: entries.length ? entries : [defaultOutputEntry(target)],
          },
          i,
        );
      });
      return calls.length
        ? calls
        : [
            normalizeModelCall(
              {
                name: _T.callnote_a,
                target_model: "A",
                every_n_turns: 1,
                read_dialogue_rounds: 4,
                read_lorebook_names: "",
                entries: [defaultOutputEntry("A")],
              },
              0,
            ),
          ];
    };

    const syncUiModelCalls = () => {
      uiModelCalls = readCallsFromContainer(modelCallListEl, uiModelCalls);
    };
    const syncUiPersonaCalls = () => {
      uiPersonaCalls = readCallsFromContainer(
        personaCallListEl,
        uiPersonaCalls,
      );
    };

    const setPresetButtons = (activePreset) => {
      document
        .getElementById("pse-preset-common")
        ?.classList.toggle("active", activePreset === "common");
      document
        .getElementById("pse-preset-1")
        ?.classList.toggle("active", activePreset === 1);
      document
        .getElementById("pse-preset-2")
        ?.classList.toggle("active", activePreset === 2);
      document
        .getElementById("pse-preset-3")
        ?.classList.toggle("active", activePreset === 3);
      document
        .getElementById("pse-preset-4")
        ?.classList.toggle("active", activePreset === 4);
    };
    const setInfoMode = (mode) => {
      uiInfoMode = mode;
      const loreCont = document.getElementById("pse-lore-presets-container");
      const commonCont = document.getElementById(
        "pse-common-prompts-container",
      );
      const personaCont = document.getElementById("pse-persona-container");
      if (mode === "persona") {
        if (loreCont) loreCont.style.display = "none";
        if (commonCont) commonCont.style.display = "none";
        if (personaCont) personaCont.style.display = "flex";
        [
          "pse-preset-common",
          "pse-preset-1",
          "pse-preset-2",
          "pse-preset-3",
          "pse-preset-4",
        ].forEach((id) => {
          document.getElementById(id)?.classList.remove("active");
        });
      } else if (mode === "common") {
        if (loreCont) loreCont.style.display = "none";
        if (commonCont) commonCont.style.display = "flex";
        if (personaCont) personaCont.style.display = "none";
      } else {
        if (loreCont) loreCont.style.display = "block";
        if (commonCont) commonCont.style.display = "none";
        if (personaCont) personaCont.style.display = "none";
      }
      document
        .getElementById("pse-preset-character")
        ?.classList.toggle("active", mode === "persona");
    };

    const switchPreset = (newPreset) => {
      if (uiInfoMode === "persona") {
        syncUiPersonaCalls();
      }

      if (newPreset === "common") {
        if (uiSubTab !== "common") {
          syncUiModelCalls();
          if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
          else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
          else if (uiSubTab === 3) uiModelCalls3 = uiModelCalls;
          else if (uiSubTab === 4) uiModelCalls4 = uiModelCalls;
        }
        if (uiInfoMode === "persona") {
          syncUiPersonaCalls();
        }
        uiSubTab = "common";
        setPresetButtons("common");
        setInfoMode("common");
        return;
      }

      if (uiSubTab === newPreset) {
        if (uiInfoMode === "persona") {
          setPresetButtons(uiSubTab);
          setInfoMode("preset");
          renderModelCalls();
        }
        return;
      }
      if (uiSubTab !== "common") {
        syncUiModelCalls();
        if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
        else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
        else if (uiSubTab === 3) uiModelCalls3 = uiModelCalls;
        else if (uiSubTab === 4) uiModelCalls4 = uiModelCalls;
      }

      uiSubTab = newPreset;
      uiActivePreset = newPreset;
      uiModelCalls =
        uiSubTab === 4
          ? uiModelCalls4
          : uiSubTab === 3
            ? uiModelCalls3
            : uiSubTab === 2
              ? uiModelCalls2
              : uiModelCalls1;
      setPresetButtons(uiSubTab);
      setInfoMode("preset");

      renderModelCalls();
    };

    document
      .getElementById("pse-preset-common")
      ?.addEventListener("click", () => switchPreset("common"));
    document
      .getElementById("pse-preset-1")
      ?.addEventListener("click", () => switchPreset(1));
    document
      .getElementById("pse-preset-2")
      ?.addEventListener("click", () => switchPreset(2));
    document
      .getElementById("pse-preset-3")
      ?.addEventListener("click", () => switchPreset(3));
    document
      .getElementById("pse-preset-4")
      ?.addEventListener("click", () => switchPreset(4));
    document
      .getElementById("pse-preset-character")
      ?.addEventListener("click", () => {
        if (uiInfoMode !== "persona") {
          if (uiSubTab !== "common") {
            syncUiModelCalls();
            if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
            else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
            else if (uiSubTab === 3) uiModelCalls3 = uiModelCalls;
            else if (uiSubTab === 4) uiModelCalls4 = uiModelCalls;
          }
          setInfoMode("persona");
          renderPersonaCalls();
        }
      });
    setPresetButtons(uiSubTab);
    renderModelCalls();

    document.querySelectorAll(".pse-json-export-btn").forEach((btn) => {
      btn.addEventListener("click", exportCurrentInfoJson);
    });
    document.querySelectorAll(".pse-json-import-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn
          .closest(".pse-json-tools")
          ?.querySelector(".pse-json-import-input")
          ?.click();
      });
    });
    document.querySelectorAll(".pse-json-import-input").forEach((input) => {
      input.addEventListener("change", async (e) => {
        const file = e.target?.files?.[0];
        await importCurrentInfoJson(file);
        e.target.value = "";
      });
    });

    document.querySelector(".pse-card")?.addEventListener("input", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest("input, textarea, select")) return;
      if (target.matches(".pse-json-import-input")) return;
      scheduleAutosave(700);
    });
    document.querySelector(".pse-card")?.addEventListener("change", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest("input, textarea, select")) return;
      if (target.matches(".pse-json-import-input")) return;
      scheduleAutosave(150);
    });

    document.getElementById("add_model_call")?.addEventListener("click", () => {
      syncUiModelCalls();
      const nextIndex = uiModelCalls.length;
      uiModelCalls.push(
        normalizeModelCall(
          {
            id: `call_${Date.now()}_${nextIndex}`,
            name: _T.callnote_n(nextIndex + 1),
            target_model: nextIndex % 2 === 0 ? "A" : "B",
            every_n_turns: 1,
            read_dialogue_rounds: 4,
            read_lorebook_names: "",
            entries: [defaultOutputEntry(nextIndex % 2 === 0 ? "A" : "B")],
          },
          nextIndex,
        ),
      );
      renderModelCalls();
      scheduleAutosave(0);
    });
    document
      .getElementById("add_persona_call")
      ?.addEventListener("click", () => {
        syncUiPersonaCalls();
        const nextIndex = uiPersonaCalls.length;
        uiPersonaCalls.push(
          normalizeModelCall(
            {
              id: `persona_${Date.now()}_${nextIndex}`,
              name: _T.callnote_n(nextIndex + 1),
              target_model: "A",
              every_n_turns: 1,
              read_dialogue_rounds: 0,
              read_lorebook_names: "",
              entries: [defaultOutputEntry("A")],
            },
            nextIndex,
          ),
        );
        renderPersonaCalls();
        scheduleAutosave(0);
      });

    const bindCallListHandlers = (
      containerEl,
      syncFn,
      getCalls,
      setCalls,
      renderFn,
    ) => {
      if (!containerEl) return;
      containerEl.addEventListener("click", (e) => {
        const addBtn = e.target?.closest?.("[data-add-entry='1']");
        if (addBtn) {
          syncFn();
          const calls = getCalls();
          const callIndex = Number(addBtn.getAttribute("data-call-index"));
          if (Number.isFinite(callIndex) && calls[callIndex]) {
            calls[callIndex].entries = Array.isArray(calls[callIndex].entries)
              ? calls[callIndex].entries
              : [];
            calls[callIndex].entries.push(
              defaultOutputEntry(calls[callIndex].target_model),
            );
            setCalls(calls);
            renderFn();
            scheduleAutosave(0);
          }
          return;
        }
        const removeCallBtn = e.target?.closest?.("[data-remove-call='1']");
        if (removeCallBtn) {
          syncFn();
          const calls = getCalls();
          const card = removeCallBtn.closest(".pse-call-card");
          const idx = Number(card?.getAttribute("data-call-index"));
          if (Number.isFinite(idx)) {
            calls.splice(idx, 1);
            if (calls.length === 0)
              calls.push(
                normalizeModelCall(
                  {
                    name: _T.callnote_a,
                    target_model: "A",
                    every_n_turns: 1,
                    read_dialogue_rounds: 4,
                    read_lorebook_names: "",
                    entries: [defaultOutputEntry("A")],
                  },
                  0,
                ),
            );
            setCalls(calls);
            renderFn();
            scheduleAutosave(0);
          }
          return;
        }
        const removeEntryBtn = e.target?.closest?.("[data-remove-entry='1']");
        if (removeEntryBtn) {
          syncFn();
          const calls = getCalls();
          const callIndex = Number(
            removeEntryBtn.getAttribute("data-call-index"),
          );
          const block = removeEntryBtn.closest(".pse-entry-block");
          const entryIndex = Number(block?.getAttribute("data-entry-index"));
          if (
            Number.isFinite(callIndex) &&
            Number.isFinite(entryIndex) &&
            calls[callIndex]
          ) {
            const entries = Array.isArray(calls[callIndex].entries)
              ? calls[callIndex].entries
              : [];
            entries.splice(entryIndex, 1);
            calls[callIndex].entries = entries.length
              ? entries
              : [defaultOutputEntry(calls[callIndex].target_model)];
            setCalls(calls);
            renderFn();
            scheduleAutosave(0);
          }
        }
      });

      containerEl.addEventListener("change", (e) => {
        const modeSelect = e.target?.closest?.(".pse-entry-mode");
        if (modeSelect) {
          const block = modeSelect.closest(".pse-entry-block");
          const retRow = block?.querySelector(".pse-entry-retention-row");
          if (retRow)
            retRow.style.display =
              modeSelect.value === "append" ? "flex" : "none";
          return;
        }
        const retCheckbox = e.target?.closest?.(".pse-entry-retention-enabled");
        if (retCheckbox) {
          const block = retCheckbox.closest(".pse-entry-block");
          const afterInput = block?.querySelector(".pse-entry-retention-after");
          const keepInput = block?.querySelector(".pse-entry-retention-keep");
          if (afterInput) afterInput.disabled = !retCheckbox.checked;
          if (keepInput) keepInput.disabled = !retCheckbox.checked;
        }
      });
    };

    bindCallListHandlers(
      modelCallListEl,
      syncUiModelCalls,
      () => uiModelCalls,
      (next) => {
        uiModelCalls = next;
      },
      renderModelCalls,
    );
    bindCallListHandlers(
      personaCallListEl,
      syncUiPersonaCalls,
      () => uiPersonaCalls,
      (next) => {
        uiPersonaCalls = next;
      },
      renderPersonaCalls,
    );

    document
      .getElementById("pse-mode-details")
      ?.addEventListener("toggle", (e) => {
        Risuai.safeLocalStorage.setItem(
          "pse_mode_details_open",
          String(e.target.open),
        );
      });

    document
      .getElementById("pse-reset-agent-defaults")
      ?.addEventListener("click", async () => {
        try {
          if (!confirm(_T.confirm_reset)) return;
          const resetFormData = {
            ...configCache,

            model_calls: JSON.stringify(DEFAULT_MODEL_CALLS),
            model_calls_2: JSON.stringify(DEFAULT_MODEL_CALLS_2),
            model_calls_3: JSON.stringify(NEW_PRESET1_CALLS),
            model_calls_4: JSON.stringify(NEW_PRESET2_CALLS),
            persona_calls: JSON.stringify(DEFAULT_PERSONA_CALLS),
            active_preset: 1,
            advanced_model_anchor_prompt: DEFAULTS.advanced_model_anchor_prompt,
            advanced_prefill_prompt: DEFAULTS.advanced_prefill_prompt,
            advanced_prereply_prompt: DEFAULTS.advanced_prereply_prompt,

            vector_search_enabled: DEFAULTS.vector_search_enabled,
            vector_search_query_dialogue_rounds:
              DEFAULTS.vector_search_query_dialogue_rounds,
            vector_search_top_k: DEFAULTS.vector_search_top_k,
            vector_search_min_score: DEFAULTS.vector_search_min_score,
            vector_search_query_dialogue_rounds_2:
              DEFAULTS.vector_search_query_dialogue_rounds_2,
            vector_search_top_k_2: DEFAULTS.vector_search_top_k_2,
            vector_search_min_score_2: DEFAULTS.vector_search_min_score_2,

            read_mod_lorebook: DEFAULTS.read_mod_lorebook,
            init_bootstrap_target_model: DEFAULTS.init_bootstrap_target_model,
            init_bootstrap_model_anchor_prompt:
              DEFAULTS.init_bootstrap_model_anchor_prompt,
            card_enable_settings: DEFAULTS.card_enable_settings,
          };
          await saveConfigFromUI(resetFormData);
          await refreshConfig();

          uiActivePreset = 1;
          uiSubTab = 1;
          uiModelCalls1 = parseModelCalls(configCache.model_calls);
          uiModelCalls2 = parseModelCalls(configCache.model_calls_2);
          uiModelCalls3 = parseModelCalls(configCache.model_calls_3);
          uiModelCalls4 = parseModelCalls(configCache.model_calls_4);
          uiPersonaCalls = parsePersonaCalls(configCache.persona_calls);
          uiModelCalls = uiModelCalls1;

          setPresetButtons(1);
          setInfoMode("preset");

          renderModelCalls();
          const setVal = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.value = String(value ?? "");
          };
          setVal(
            "advanced_model_anchor_prompt",
            configCache.advanced_model_anchor_prompt,
          );
          setVal(
            "advanced_prefill_prompt",
            configCache.advanced_prefill_prompt,
          );
          setVal(
            "advanced_prereply_prompt",
            configCache.advanced_prereply_prompt,
          );
          setVal(
            "vector_search_query_dialogue_rounds",
            configCache.vector_search_query_dialogue_rounds,
          );
          setVal("vector_search_top_k", configCache.vector_search_top_k);
          setVal(
            "vector_search_min_score",
            configCache.vector_search_min_score,
          );
          setVal(
            "vector_search_query_dialogue_rounds_2",
            configCache.vector_search_query_dialogue_rounds_2,
          );
          setVal("vector_search_top_k_2", configCache.vector_search_top_k_2);
          setVal(
            "vector_search_min_score_2",
            configCache.vector_search_min_score_2,
          );
          const modLoreCheckbox = document.getElementById("read_mod_lorebook");
          if (modLoreCheckbox)
            modLoreCheckbox.checked =
              Number(configCache.read_mod_lorebook) === 1;
          setVal(
            "init_bootstrap_target_model",
            configCache.init_bootstrap_target_model,
          );
          setVal(
            "init_bootstrap_model_anchor_prompt",
            configCache.init_bootstrap_model_anchor_prompt,
          );
          await renderCardEnableList();
          showStatus(_T.st_reset, "ok");
        } catch (e) {
          showStatus(_T.st_reset_fail + (e?.message || String(e)), "err");
        }
      });

    const bindProviderAutoUrl = (providerId, urlId, urlMapKey) => {
      let uiProviderUrlMap = parseSimpleStringMap(
        configCache[urlMapKey] || "{}",
      );

      let savedCustomUrl = safeTrim(
        uiProviderUrlMap["custom_api"] ||
          document.getElementById(urlId)?.value ||
          "",
      );
      let prevProvider = safeTrim(
        document.getElementById(providerId)?.value || "custom_api",
      );

      document.getElementById(providerId)?.addEventListener("change", () => {
        const nextProvider = safeTrim(
          document.getElementById(providerId)?.value,
        );
        const urlEl = document.getElementById(urlId);
        if (!urlEl) return;

        if (prevProvider === "custom_api") {
          savedCustomUrl = safeTrim(urlEl.value || "");
          uiProviderUrlMap["custom_api"] = savedCustomUrl;
        }

        if (nextProvider === "custom_api") {
          urlEl.value = savedCustomUrl;
        } else {
          urlEl.value = PROVIDER_DEFAULT_URL[nextProvider] ?? "";
        }
        prevProvider = nextProvider;
      });

      document.getElementById(urlId)?.addEventListener("input", () => {
        if (
          safeTrim(document.getElementById(providerId)?.value || "") ===
          "custom_api"
        ) {
          savedCustomUrl = safeTrim(
            document.getElementById(urlId)?.value || "",
          );
          uiProviderUrlMap["custom_api"] = savedCustomUrl;
        }
      });

      return () => uiProviderUrlMap;
    };
    const getUrlMapA = bindProviderAutoUrl(
      "extractor_a_provider",
      "extractor_a_url",
      "extractor_a_provider_url_map",
    );
    const getUrlMapB = bindProviderAutoUrl(
      "extractor_b_provider",
      "extractor_b_url",
      "extractor_b_provider_url_map",
    );

    const refreshExtractorModelOptions = async (providerId, datalistId) => {
      const provider = safeTrim(
        document.getElementById(providerId)?.value || "",
      );
      const side =
        providerId === "extractor_a_provider"
          ? "a"
          : providerId === "extractor_b_provider"
            ? "b"
            : "";
      const suggestionId = side ? `extractor_${side}_model_suggestions` : "";
      const inputId = side ? `extractor_${side}_model` : "";
      if (provider === "openrouter") {
        const live = await getOpenRouterModels();
        fillModelDatalist(datalistId, live);
        if (suggestionId && inputId)
          fillModelSuggestionList(suggestionId, inputId, []);
        return;
      }
      if (provider === "grok" || provider === "github_copilot") {
        const live =
          provider === "grok"
            ? await getGrokModels()
            : await getCopilotModels();
        const list = live.length ? live : getModelsByProvider(provider);
        fillModelDatalist(datalistId, list);
        if (suggestionId) fillModelSuggestionList(suggestionId, inputId, []);
        return;
      }
      fillModelDatalist(datalistId, getModelsByProvider(provider));
      if (suggestionId) fillModelSuggestionList(suggestionId, inputId, []);
    };

    const bindProviderDrivenModelAndFormat = async (
      providerId,
      formatId,
      datalistId,
      isEmbedding = false,
    ) => {
      const providerEl = document.getElementById(providerId);
      if (!providerEl) return;
      const refresh = async (forceApplyFormat = true) => {
        setFormatByProvider(providerId, formatId, true, forceApplyFormat);
        if (!isEmbedding) {
          const providerNow = safeTrim(
            document.getElementById(providerId)?.value || "",
          );
          fillModelDatalist(datalistId, getModelsByProvider(providerNow));
          Promise.resolve()
            .then(() => refreshExtractorModelOptions(providerId, datalistId))
            .catch(() => {});
        }
      };
      providerEl.addEventListener("change", () => {
        refresh(true).catch(() => {});
      });
      refresh(false).catch(() => {});
    };

    const bindProviderFieldHints = (providerId, urlId, keyId) => {
      const providerEl = document.getElementById(providerId);
      const urlEl = document.getElementById(urlId);
      const keyEl = document.getElementById(keyId);
      if (!providerEl) return;
      const sync = () => {
        const provider = safeTrim(providerEl.value || "");
        if (urlEl) {
          urlEl.placeholder = getProviderUrlPlaceholder(provider);
          urlEl.title =
            provider === "vertex_ai"
              ? "Vertex AI uses your Service Account JSON to derive the project and OAuth token automatically."
              : urlEl.placeholder;
        }
        if (keyEl) {
          keyEl.placeholder = getProviderKeyPlaceholder(provider);
          keyEl.title =
            provider === "vertex_ai"
              ? "Paste the entire Service Account JSON body, not a file path or temporary bearer token."
              : provider === "github_copilot"
                ? "Paste the GitHub OAuth/Copilot token. The plugin will exchange it for a short-lived Copilot session token automatically."
                : keyEl.placeholder;
        }
      };
      providerEl.addEventListener("change", sync);
      sync();
    };

    bindProviderDrivenModelAndFormat(
      "extractor_a_provider",
      "extractor_a_format",
      MODEL_DATALIST_A_ID,
      false,
    );
    bindProviderDrivenModelAndFormat(
      "extractor_b_provider",
      "extractor_b_format",
      MODEL_DATALIST_B_ID,
      false,
    );
    bindProviderDrivenModelAndFormat(
      "embedding_provider",
      "embedding_format",
      "",
      true,
    );
    bindProviderFieldHints(
      "extractor_a_provider",
      "extractor_a_url",
      "extractor_a_key",
    );
    bindProviderFieldHints(
      "extractor_b_provider",
      "extractor_b_url",
      "extractor_b_key",
    );

    let uiExtractorAProviderModelMap = parseSimpleStringMap(
      configCache.extractor_a_provider_model_map || "{}",
    );
    let uiExtractorBProviderModelMap = parseSimpleStringMap(
      configCache.extractor_b_provider_model_map || "{}",
    );
    let currentExtractorAProvider = safeTrim(
      document.getElementById("extractor_a_provider")?.value ||
        configCache.extractor_a_provider ||
        "custom_api",
    );
    let currentExtractorBProvider = safeTrim(
      document.getElementById("extractor_b_provider")?.value ||
        configCache.extractor_b_provider ||
        "custom_api",
    );

    const getDefaultModelForProvider = (provider) => {
      const list = getModelsByProvider(provider);
      return Array.isArray(list) && list.length > 0
        ? safeTrim(list[0]?.value)
        : "";
    };

    const bindExtractorProviderModelMemory = (
      providerId,
      modelId,
      keyId,
      side,
    ) => {
      const providerEl = document.getElementById(providerId);
      const modelEl = document.getElementById(modelId);
      const keyEl = document.getElementById(keyId);
      if (!providerEl || !modelEl) return;
      providerEl.addEventListener("change", () => {
        const nextProvider = safeTrim(providerEl.value || "custom_api");
        const prevModel = safeTrim(modelEl.value || "");
        const prevKey = safeTrim(keyEl?.value || "");
        if (side === "A") {
          if (currentExtractorAProvider && prevModel)
            uiExtractorAProviderModelMap[currentExtractorAProvider] = prevModel;
          if (currentExtractorAProvider && prevKey)
            uiExtractorAProviderKeyMap[currentExtractorAProvider] = prevKey;
          modelEl.value =
            safeTrim(uiExtractorAProviderModelMap[nextProvider] || "") ||
            getDefaultModelForProvider(nextProvider) ||
            "";
          if (keyEl)
            keyEl.value = safeTrim(
              uiExtractorAProviderKeyMap[nextProvider] || "",
            );
          currentExtractorAProvider = nextProvider;
        } else {
          if (currentExtractorBProvider && prevModel)
            uiExtractorBProviderModelMap[currentExtractorBProvider] = prevModel;
          if (currentExtractorBProvider && prevKey)
            uiExtractorBProviderKeyMap[currentExtractorBProvider] = prevKey;
          modelEl.value =
            safeTrim(uiExtractorBProviderModelMap[nextProvider] || "") ||
            getDefaultModelForProvider(nextProvider) ||
            "";
          if (keyEl)
            keyEl.value = safeTrim(
              uiExtractorBProviderKeyMap[nextProvider] || "",
            );
          currentExtractorBProvider = nextProvider;
        }
      });
      modelEl.addEventListener("change", () => {
        const provider = safeTrim(providerEl.value || "custom_api");
        const model = safeTrim(modelEl.value || "");
        if (!provider || !model) return;
        if (side === "A") uiExtractorAProviderModelMap[provider] = model;
        else uiExtractorBProviderModelMap[provider] = model;
      });
      if (keyEl) {
        keyEl.addEventListener("change", () => {
          const provider = safeTrim(providerEl.value || "custom_api");
          const key = safeTrim(keyEl.value || "");
          if (!provider) return;
          if (side === "A") uiExtractorAProviderKeyMap[provider] = key;
          else uiExtractorBProviderKeyMap[provider] = key;
        });
      }
    };
    bindExtractorProviderModelMemory(
      "extractor_a_provider",
      "extractor_a_model",
      "extractor_a_key",
      "A",
    );
    bindExtractorProviderModelMemory(
      "extractor_b_provider",
      "extractor_b_model",
      "extractor_b_key",
      "B",
    );

    const THINKING_HINTS = {
      claude: "Claude: budget_tokens — Low=1024, Medium=8000, High=32000",
      google: "Gemini 3+: thinkingLevel — Low / Medium / High",
      vertex: "Vertex Gemini 3+: thinking_level — Low / Medium / High",
      openai: "OpenAI / OpenRouter: reasoning_effort — low / medium / high",
    };
    const updateThinkingHint = (formatId, hintId) => {
      const formatEl = document.getElementById(formatId);
      const hintEl = document.getElementById(hintId);
      if (!formatEl || !hintEl) return;
      const fmt = safeTrim(formatEl.value || "").toLowerCase();
      hintEl.textContent = THINKING_HINTS[fmt] || THINKING_HINTS.openai;
    };
    const bindThinkingControls = (checkboxId, levelId, formatId, hintId) => {
      const cb = document.getElementById(checkboxId);
      const lvl = document.getElementById(levelId);
      const hint = document.getElementById(hintId);
      if (!cb || !lvl) return;
      const sync = () => {
        lvl.disabled = !cb.checked;
        if (hint) hint.style.display = cb.checked ? "block" : "none";
        updateThinkingHint(formatId, hintId);
      };
      cb.addEventListener("change", sync);

      const fmtEl = document.getElementById(formatId);
      if (fmtEl)
        fmtEl.addEventListener("change", () =>
          updateThinkingHint(formatId, hintId),
        );
      sync();
    };
    bindThinkingControls(
      "extractor_a_thinking_enabled",
      "extractor_a_thinking_level",
      "extractor_a_format",
      "extractor_a_thinking_hint",
    );
    bindThinkingControls(
      "extractor_b_thinking_enabled",
      "extractor_b_thinking_level",
      "extractor_b_format",
      "extractor_b_thinking_hint",
    );

    let uiEmbeddingProviderUrlMap = parseSimpleStringMap(
      configCache.embedding_provider_url_map || "{}",
    );
    let uiEmbeddingProviderModelMap = parseSimpleStringMap(
      configCache.embedding_provider_model_map || "{}",
    );
    let uiEmbeddingProviderKeyMap = parseSimpleStringMap(
      configCache.embedding_provider_key_map || "{}",
    );
    let uiExtractorAProviderKeyMap = parseSimpleStringMap(
      configCache.extractor_a_provider_key_map || "{}",
    );
    let uiExtractorBProviderKeyMap = parseSimpleStringMap(
      configCache.extractor_b_provider_key_map || "{}",
    );
    let currentEmbeddingProvider = safeTrim(
      document.getElementById("embedding_provider")?.value ||
        configCache.embedding_provider ||
        "custom_api",
    );

    const refreshEmbeddingPresetByProvider = async (applyPreset = true) => {
      const providerEl = document.getElementById("embedding_provider");
      const modelEl = document.getElementById("embedding_model");
      const formatEl = document.getElementById("embedding_format");
      const urlEl = document.getElementById("embedding_url");
      const keyEl = document.getElementById("embedding_key");
      const requestModelEl = document.getElementById("embedding_request_model");
      if (!providerEl || !modelEl || !formatEl || !urlEl || !requestModelEl)
        return;
      const provider = safeTrim(providerEl.value || "local");
      const preset =
        EMBEDDING_PROVIDER_PRESETS[provider] ||
        EMBEDDING_PROVIDER_PRESETS.local;

      if (currentEmbeddingProvider && currentEmbeddingProvider !== provider) {
        const prevModel = safeTrim(modelEl.value || "");
        if (prevModel)
          uiEmbeddingProviderModelMap[currentEmbeddingProvider] = prevModel;
        const prevKey = safeTrim(keyEl?.value || "");
        if (prevKey)
          uiEmbeddingProviderKeyMap[currentEmbeddingProvider] = prevKey;
        if (currentEmbeddingProvider === "custom_api") {
          const prevUrl = safeTrim(urlEl?.value || "");
          if (prevUrl) uiEmbeddingProviderUrlMap["custom_api"] = prevUrl;
        }
      }

      modelEl.disabled = false;
      let optionList = getEmbeddingOptionsDedup(provider);
      if (provider === "openrouter")
        optionList = await getOpenRouterEmbeddingModels();
      if (provider === "custom_api") optionList = [];
      fillEmbeddingDatalist(optionList);
      fillModelSuggestionList(
        "embedding_model_suggestions",
        "embedding_model",
        [],
      );

      const optionValues = optionList
        .map((o) => safeTrim(o.value))
        .filter(Boolean);
      const preferred =
        safeTrim(uiEmbeddingProviderModelMap[provider] || "") ||
        safeTrim(modelEl.value || "");
      if (
        provider === "custom_api" ||
        (provider === "openrouter" && !optionValues.length)
      )
        modelEl.value = preferred || "";
      else if (optionValues.includes(preferred)) modelEl.value = preferred;
      else
        modelEl.value = safeTrim(
          preset.defaultModel || optionValues[0] || "custom",
        );

      if (safeTrim(modelEl.value))
        uiEmbeddingProviderModelMap[provider] = safeTrim(modelEl.value);

      if (keyEl) {
        const rememberedKey = safeTrim(
          uiEmbeddingProviderKeyMap[provider] || "",
        );
        if (rememberedKey) keyEl.value = rememberedKey;
        else if (currentEmbeddingProvider !== provider) keyEl.value = "";
      }

      currentEmbeddingProvider = provider;

      if (!applyPreset) return;
      formatEl.value = safeTrim(preset.format || "openai");
      if (provider !== "custom_api") {
        urlEl.value = safeTrim(preset.url || "");
      } else {
        const remembered = safeTrim(
          uiEmbeddingProviderUrlMap["custom_api"] || "",
        );
        if (remembered) urlEl.value = remembered;
      }
      if (provider !== "custom_api")
        requestModelEl.value = safeTrim(
          EMBEDDING_MODEL_TO_REQUEST[safeTrim(modelEl.value)] ||
            preset.requestModel ||
            "",
        );
      else requestModelEl.value = "";
    };

    document
      .getElementById("embedding_provider")
      ?.addEventListener("change", () => {
        refreshEmbeddingPresetByProvider(true).catch(() => {});
      });
    document.getElementById("embedding_url")?.addEventListener("input", () => {
      if (
        safeTrim(document.getElementById("embedding_provider")?.value || "") ===
        "custom_api"
      ) {
        uiEmbeddingProviderUrlMap["custom_api"] = safeTrim(
          document.getElementById("embedding_url")?.value || "",
        );
      }
    });
    document
      .getElementById("embedding_model")
      ?.addEventListener("input", () => {
        const provider = safeTrim(
          document.getElementById("embedding_provider")?.value || "custom_api",
        );
        const selectedModel = safeTrim(
          document.getElementById("embedding_model")?.value || "",
        );
        if (provider && selectedModel)
          uiEmbeddingProviderModelMap[provider] = selectedModel;
        if (provider === "custom_api") return;
        const requestModelEl = document.getElementById(
          "embedding_request_model",
        );
        if (requestModelEl)
          requestModelEl.value = safeTrim(
            EMBEDDING_MODEL_TO_REQUEST[selectedModel] ||
              selectedModel ||
              requestModelEl.value ||
              "",
          );
      });
    refreshEmbeddingPresetByProvider(false).catch(() => {});

    bindScrollableSuggestionDropdown({
      inputId: "extractor_a_model",
      containerId: "extractor_a_model_suggestions",
      datalistId: MODEL_DATALIST_A_ID,
    });
    bindScrollableSuggestionDropdown({
      inputId: "extractor_b_model",
      containerId: "extractor_b_model_suggestions",
      datalistId: MODEL_DATALIST_B_ID,
    });
    bindScrollableSuggestionDropdown({
      inputId: "embedding_model",
      containerId: "embedding_model_suggestions",
      datalistId: MODEL_DATALIST_EMBED_ID,
    });

    /* close / overlay dismiss event listeners were already bound above, right after DOM insertion */
  }

  async function initSettingEntry() {
    const part = await Promise.resolve(
      Risuai.registerSetting(
        "RisuAI Agent",
        async () => {
          await Risuai.showContainer("fullscreen");
          await renderSettingsUI();
        },
        "👤",
        "html",
      ),
    ).catch(() => null);
    if (part?.id != null) uiIds.push(part.id);

    if (typeof Risuai.registerButton === "function") {
      const btn = await Promise.resolve(
        Risuai.registerButton(
          {
            name: "👤 AI Agent",
            location: "hamburger",
          },
          async () => {
            await Risuai.showContainer("fullscreen");
            await renderSettingsUI();
          },
        ),
      ).catch(() => null);
      if (btn?.id != null) uiIds.push(btn.id);
    }
  }

  async function ensureReplacerRegistered() {
    if (replacerRegistered || !replacerFn) return true;
    try {
      await Risuai.addRisuReplacer("beforeRequest", replacerFn);
      replacerRegistered = true;
      return true;
    } catch (err) {
      await Risuai.log(
        `${LOG} addRisuReplacer failed: ${err?.message || String(err)}`,
      );
      return false;
    }
  }

  function createReplacer() {
    return async (messages, type) => {
      try {
        return await _replacerBody(messages, type);
      } catch (outerErr) {
        const msg = outerErr?.message || String(outerErr);
        console.error(`${LOG} replacer EXCEPTION [type=${type}]:`, outerErr);
        console.error(
          `${LOG} replacer stack:`,
          outerErr?.stack || "(no stack)",
        );
        // Ensure the full error is surfaced in the RisuAI request log
        // (the only user-visible channel available from a replacer context)
        try {
          await Risuai.log(`${LOG} ❌ Request blocked. ${msg}`);
        } catch {}
        try {
          await Risuai.safeLocalStorage.setItem(
            LAST_SYNC_ERROR_KEY,
            `[${new Date().toISOString()}] ${msg}`,
          );
        } catch {}
        // Surface the error visibly if it wasn't already shown by abortMainModelWithAuxError.
        // Avoid double-alerting: abortMainModelWithAuxError embeds "[RisuAI Agent Error]" prefix.
        if (!msg.startsWith("[RisuAI Agent Error]")) {
          try {
            if (typeof Risuai.alertError === "function") {
              await Risuai.alertError(`[RisuAI Agent] ❌ ${msg}`);
            } else if (typeof Risuai.alert === "function") {
              await Risuai.alert(`[RisuAI Agent] ❌ ${msg}`);
            }
          } catch {}
        }
        throw outerErr;
      }
    };
  }

  function collectSettledErrors(results) {
    return (results || [])
      .filter((r) => r?.status === "rejected")
      .map((r) => String(r.reason?.message || r.reason || "unknown"))
      .filter(Boolean);
  }

  function _replacerBody(messages, type) {
    return (async (messages, type) => {
      try {
        await Risuai.safeLocalStorage.setItem(
          "last_hook_ts",
          new Date().toISOString(),
        );
        await Risuai.safeLocalStorage.setItem(
          "last_hook_type",
          String(type ?? ""),
        );
      } catch {}

      await ensureLangInitialized();
      await refreshConfig();

      if (type === "display") {
        const { char: displayChar, chat: displayChat } =
          await getCurrentChatContextSafe();
        const displayMsgs = Array.isArray(displayChat?.message)
          ? displayChat.message
          : [];
        const displayUserMsgCount =
          countUserMessages(displayMsgs) +
          getTurnOffsetFromLocalLore(displayChat?.localLore);
        let displayCardCalls;
        try {
          let displayCardSettings = {};
          try {
            displayCardSettings =
              JSON.parse(configCache.card_enable_settings || "{}") || {};
          } catch {}
          const displayRawCharId = String(
            displayChar?.chaId || displayChar?.id || displayChar?._id || "",
          ).replace(/[^0-9a-zA-Z_-]/g, "");
          const displayCharName = safeTrim(displayChar?.name || "");
          const displayCharId =
            displayRawCharId ||
            (displayCharName ? `name_${simpleHash(displayCharName)}` : "-1");
          const displayCardCfg = displayCardSettings[displayCharId] || {};
          const displayCardDisabled = !(
            displayCardCfg.card_disabled === 0 ||
            displayCardCfg.card_disabled === false ||
            displayCardCfg.card_disabled === "0"
          );
          if (!displayCardDisabled) {
            const displayMemoryPreset = ["1", "2", "3", "4"].includes(
              String(displayCardCfg.memory_extract),
            )
              ? String(displayCardCfg.memory_extract)
              : "off";
            if (displayMemoryPreset !== "off") {
              displayCardCalls = getModelCallsByPreset(displayMemoryPreset);
            }
          }
        } catch {}
        await applyRetentionCleanup(
          displayUserMsgCount,
          displayCardCalls || [],
        ).catch((retentionErr) => {
          console.error(
            `${LOG} applyRetentionCleanup (display hook) failed:`,
            retentionErr,
          );
          Risuai.log(
            `${LOG} ⚠️ Retention cleanup failed during display hook: ${retentionErr?.message || String(retentionErr)}`,
          ).catch(() => {});
        });
        return messages;
      }

      if (type !== "model") {
        try {
          const { requestKeys: earlyKeys } =
            await getScopedKeysForCurrentChat().catch(() => ({
              requestKeys: null,
            }));
          const modeKey =
            earlyKeys?.lastExtractorMode || LAST_EXTRACTOR_MODE_KEY;
          await Risuai.safeLocalStorage.setItem(
            modeKey,
            `skipped_non_model:${String(type ?? "")}`,
          );
        } catch {}
        return messages;
      }

      const { char, chat, chatIndex } = await getCurrentChatContextSafe();
      const staticKeys = getStaticCacheKeysForScope(char);
      const requestKeys = getRequestCacheKeysForScope(char, chat, chatIndex);

      await Risuai.safeLocalStorage.setItem(
        requestKeys.lastExtractorMode,
        "replacer_started",
      );
      const existingMsgs = Array.isArray(chat?.message) ? chat.message : [];
      const rawUserMsgCount = countUserMessages(existingMsgs);
      const userMsgCount =
        rawUserMsgCount + getTurnOffsetFromLocalLore(chat?.localLore);
      const isFirstMessage = userMsgCount <= 1;
      const lastUserContent =
        existingMsgs.filter((m) => m?.role === "user").pop()?.data || "";
      const chatScopedKey = getChatScopedKey(chat, chatIndex);
      const firstMessageHandledKey = getFirstMessageHandledKey(
        requestKeys.scopeId,
        chat,
        chatIndex,
      );
      const firstMessageMarker = simpleHash(String(lastUserContent || ""));

      let cardSettings = {};
      try {
        cardSettings =
          JSON.parse(configCache.card_enable_settings || "{}") || {};
      } catch {}
      const rawCharId = String(
        char?.chaId || char?.id || char?._id || "",
      ).replace(/[^0-9a-zA-Z_-]/g, "");
      const charName = safeTrim(char?.name || "");
      const charId =
        rawCharId || (charName ? `name_${simpleHash(charName)}` : "-1");
      const cardCfg = cardSettings[charId] || {};
      const cardIsDisabled = !(
        cardCfg.card_disabled === 0 ||
        cardCfg.card_disabled === false ||
        cardCfg.card_disabled === "0"
      );
      if (cardIsDisabled) {
        await Risuai.safeLocalStorage.setItem(
          requestKeys.lastExtractorMode,
          "card_disabled",
        );
        return messages;
      }
      const cardMemoryPreset = ["1", "2", "3", "4"].includes(
        String(cardCfg.memory_extract),
      )
        ? String(cardCfg.memory_extract)
        : "off";
      const cardVecSetting = ["off", "card_reorg", "1", "2"].includes(
        String(cardCfg.vector_search),
      )
        ? String(cardCfg.vector_search)
        : "off";

      const _newPreset = cardMemoryPreset === "3" || cardMemoryPreset === "4";
      const _cardReorgEnabled = cardVecSetting !== "off";
      const _cardReorgOnly = cardVecSetting === "card_reorg";
      const _vecPresetNum =
        cardVecSetting === "2" ? 2 : cardVecSetting === "1" ? 1 : 0;

      _currentIsCardReorgEnabled = _cardReorgEnabled;
      _currentIsNewPreset = _newPreset;

      const gNoteData = await getGlobalNoteDataCached(char);
      const resolvedGlobalNote = safeTrim(
        gNoteData.replaceGlobalNote || gNoteData.globalNote,
      );
      const currentStaticPayload = await getStaticDataPayload(
        char,
        chat,
        resolvedGlobalNote,
      );
      const currentStaticHash = simpleHash(
        JSON.stringify(currentStaticPayload),
      );
      const savedStaticHash = await Risuai.pluginStorage.getItem(
        staticKeys.staticDataHash,
      );

      const vectorPresetNum = _vecPresetNum;

      const effectiveVecConfig =
        !_cardReorgEnabled && !_newPreset
          ? {
              vector_search_enabled: 0,
              vector_search_query_dialogue_rounds:
                configCache.vector_search_query_dialogue_rounds,
              vector_search_top_k: configCache.vector_search_top_k,
              vector_search_min_score: configCache.vector_search_min_score,
            }
          : _cardReorgOnly ||
              (!_cardReorgEnabled && _newPreset) ||
              vectorPresetNum === 0
            ? {
                vector_search_enabled: 0,
                vector_search_query_dialogue_rounds:
                  configCache.vector_search_query_dialogue_rounds,
                vector_search_top_k: configCache.vector_search_top_k,
                vector_search_min_score: configCache.vector_search_min_score,
              }
            : {
                vector_search_enabled: 1,
                vector_search_query_dialogue_rounds:
                  vectorPresetNum === 2
                    ? toInt(
                        configCache.vector_search_query_dialogue_rounds_2,
                        DEFAULTS.vector_search_query_dialogue_rounds_2,
                      )
                    : toInt(
                        configCache.vector_search_query_dialogue_rounds,
                        DEFAULTS.vector_search_query_dialogue_rounds,
                      ),
                vector_search_top_k:
                  vectorPresetNum === 2
                    ? toInt(
                        configCache.vector_search_top_k_2,
                        DEFAULTS.vector_search_top_k_2,
                      )
                    : toInt(
                        configCache.vector_search_top_k,
                        DEFAULTS.vector_search_top_k,
                      ),
                vector_search_min_score:
                  vectorPresetNum === 2
                    ? Number(configCache.vector_search_min_score_2) ||
                      DEFAULTS.vector_search_min_score_2
                    : Number(configCache.vector_search_min_score) ||
                      DEFAULTS.vector_search_min_score,
              };
      const vecBackup = {
        vector_search_enabled: configCache.vector_search_enabled,
        vector_search_query_dialogue_rounds:
          configCache.vector_search_query_dialogue_rounds,
        vector_search_top_k: configCache.vector_search_top_k,
        vector_search_min_score: configCache.vector_search_min_score,
      };
      Object.assign(configCache, effectiveVecConfig);

      const isVectorEnabled = configCache.vector_search_enabled === 1;

      try {
        let needsStep0 = false;
        let step0Reason = "";
        let personaMissingForcedStep0 = false;

        const step0Complete = await Risuai.pluginStorage.getItem(
          staticKeys.step0Complete,
        );
        let pendingReason = "";
        try {
          pendingReason = safeTrim(
            await Risuai.pluginStorage.getItem(staticKeys.step0Pending),
          );
        } catch {}
        const hashChanged = currentStaticHash !== savedStaticHash;
        const sessionHandled =
          currentStaticHash ===
          sessionStep0HandledHashByScope.get(staticKeys.scopeId);

        if (pendingReason) {
          needsStep0 = true;
          step0Reason = pendingReason;
        } else if (!_cardReorgEnabled && !_newPreset) {
          try {
            await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
          } catch {}
          try {
            await Risuai.pluginStorage.setItem(
              staticKeys.staticDataHash,
              currentStaticHash,
            );
          } catch {}
          needsStep0 = false;
        } else if (hashChanged && !sessionHandled) {
          needsStep0 = true;
          step0Reason = "changed";
        } else {
          const needsClassify = _cardReorgEnabled || _newPreset;
          const needsChunkVec = isVectorEnabled;
          const needsPersona = _newPreset;
          const needsPersonaVec = _newPreset;

          const diag = await diagnoseCacheState(char, staticKeys, {
            needsClassify,
            needsChunkVec,
            needsPersona,
            needsPersonaVec,
          });

          if (diag.needsStep0) {
            needsStep0 = true;
            step0Reason = diag.step0Reason;
            if (
              step0Reason === "persona_missing" ||
              step0Reason === "persona_incomplete_pair"
            ) {
              personaMissingForcedStep0 = true;
            }
          } else if (!step0Complete) {
            try {
              await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
            } catch {}
            try {
              await Risuai.pluginStorage.setItem(
                staticKeys.staticDataHash,
                currentStaticHash,
              );
            } catch {}
          } else {
            if (isVectorEnabled || _newPreset) {
              const cardKey = await getActiveCardKey(char);
              const store = await loadEmbeddingCacheStore();
              const cardModelName = safeTrim(
                store.cards?.[cardKey]?.modelName || "",
              );
              const currentEmbedModel = safeTrim(
                resolveEmbeddingRuntimeConfig().requestModel,
              );
              if (
                cardModelName &&
                currentEmbedModel &&
                cardModelName !== currentEmbedModel
              ) {
                needsStep0 = true;
                step0Reason = "reembed";
              }
            }
          }
        }

        if (needsStep0) {
          try {
            const resumeMode =
              step0Reason === "incomplete" ||
              step0Reason === "persona_missing" ||
              step0Reason === "persona_incomplete_pair";
            const classifyDoneMode =
              step0Reason === "classify_done" ||
              ((step0Reason === "persona_missing" ||
                step0Reason === "persona_incomplete_pair") &&
                (await hasCompletedClassification(staticKeys)));
            const reembedMode = step0Reason === "reembed";
            if (isVectorEnabled) {
              if (classifyDoneMode) {
                await Risuai.log(`${LOG} ${_T.log_step0_start_classify_done}`);
              } else if (reembedMode) {
                const oldModel = safeTrim(
                  (await loadEmbeddingCacheStore()).cards?.[
                    await getActiveCardKey(char)
                  ]?.modelName || "unknown",
                );
                const newModel = safeTrim(
                  resolveEmbeddingRuntimeConfig().requestModel,
                );
                await Risuai.log(
                  `${LOG} ${_T.log_step0_start_reembed(oldModel, newModel)}`,
                );
              } else {
                await Risuai.log(`${LOG} ${_T.log_step0_start}`);
              }
            } else {
              await Risuai.log(`${LOG} ${_T.log_step0_start_keyword}`);
            }
            await runStep0Classification(
              char,
              chat,
              resolvedGlobalNote,
              currentStaticHash,
              staticKeys,
              resumeMode,
              classifyDoneMode,
              reembedMode,
            );
            sessionStep0HandledHashByScope.set(
              staticKeys.scopeId,
              currentStaticHash,
            );
            await Risuai.log(`${LOG} ${_T.log_step0_complete}`);
            try {
              await Risuai.pluginStorage.removeItem(staticKeys.step0Pending);
            } catch {}
            if (personaMissingForcedStep0) step0Reason = "";
          } catch (step0Err) {
            const errMsg = step0Err?.message || String(step0Err);
            try {
              await Risuai.safeLocalStorage.setItem(
                requestKeys.lastSyncError,
                `${LOG} Step 0 failed: ${errMsg}`,
              );
              try {
                await Risuai.safeLocalStorage.removeItem(requestKeys.regenSkip);
              } catch {}
            } catch {}
            await Risuai.log(`${LOG} ${_T.log_step0_failed(errMsg)}`);
            const warnMsg =
              typeof _T.step0_abort_warning === "function"
                ? _T.step0_abort_warning(errMsg)
                : `${_T.log_step0_failed(errMsg)}\n${_T.aux_abort_suffix}`;
            await abortMainModelWithAuxError(warnMsg, requestKeys);
          }
        } else if (pendingReason) {
          try {
            await Risuai.pluginStorage.removeItem(staticKeys.step0Pending);
          } catch {}
        }

        if (
          step0Reason === "persona_missing" ||
          step0Reason === "persona_incomplete_pair"
        ) {
          const isIncompletePair = step0Reason === "persona_incomplete_pair";
          try {
            await Risuai.log(
              isIncompletePair
                ? `${LOG} Persona cache has incomplete pairs — running persona extraction to fill missing sides...`
                : `${LOG} Persona cache missing — running persona extraction fast-path...`,
            );
            const savedChunksRaw = await Risuai.pluginStorage.getItem(
              staticKeys.staticKnowledgeChunks,
            );
            if (savedChunksRaw) {
              const savedChunks = JSON.parse(savedChunksRaw);
              if (Array.isArray(savedChunks) && savedChunks.length > 0) {
                await runPersonaExtraction(char, savedChunks, true, {
                  missingOnly: true,
                });
                await Risuai.log(
                  `${LOG} Persona extraction fast-path complete.`,
                );
              }
            }
            const stillBroken = isIncompletePair
              ? await hasIncompletePairForChar(char)
              : await isPersonaCacheEmptyForChar(char);
            if (stillBroken) {
              await abortMainModelWithAuxError(
                _T.err_persona_cache_missing(
                  isIncompletePair
                    ? "incomplete persona pairs remain after fast-path extraction"
                    : "persona cache still empty after fast-path extraction",
                ),
                requestKeys,
              );
            }
          } catch (personaErr) {
            const reason = personaErr?.message || String(personaErr);
            await Risuai.log(
              `${LOG} Persona extraction fast-path failed: ${reason}`,
            );
            await abortMainModelWithAuxError(
              _T.err_persona_cache_missing(reason),
              requestKeys,
            );
          }
        }

        const loreModified = await performChatCleanup(userMsgCount);

        if (isFirstMessage) {
          try {
            await Risuai.safeLocalStorage.setItem(
              firstMessageHandledKey,
              firstMessageMarker,
            );
          } catch {}
          await Risuai.safeLocalStorage.setItem(
            requestKeys.lastExtractorMode,
            "skipped_first_message",
          );
          await Risuai.log(
            `${LOG} beforeRequest: skipping extraction on first message.`,
          );
          return await mergeToSystemPromptWithRewrite(
            messages,
            null,
            lastUserContent,
          );
        }

        const baseConversation = await getConversationFromCurrentChat(
          Math.max(1, toInt(configCache.context_messages, 10)),
          chat,
        );
        if (baseConversation.length === 0) {
          await Risuai.safeLocalStorage.setItem(
            requestKeys.lastExtractorMode,
            "replacer_skipped",
          );
          await Risuai.safeLocalStorage.setItem(
            requestKeys.lastSyncError,
            _T.no_conv,
          );
          await Risuai.log(
            `${LOG} beforeRequest: no usable conversation text.`,
          );
          return await mergeToSystemPromptWithRewrite(
            messages,
            null,
            lastUserContent,
          );
        }

        if (
          _newPreset &&
          ((await isPersonaCacheEmptyForChar(char)) ||
            (await hasIncompletePairForChar(char)))
        ) {
          try {
            const savedChunksRaw = await Risuai.pluginStorage.getItem(
              staticKeys.staticKnowledgeChunks,
            );
            if (savedChunksRaw) {
              const savedChunks = JSON.parse(savedChunksRaw);
              if (Array.isArray(savedChunks) && savedChunks.length > 0) {
                if (isNewPresetEnabled()) {
                  await runPersonaExtraction(char, savedChunks, true, {
                    missingOnly: true,
                  });
                }
              }
            }
            if (
              (await isPersonaCacheEmptyForChar(char)) ||
              (await hasIncompletePairForChar(char))
            ) {
              await abortMainModelWithAuxError(
                _T.err_persona_cache_missing(
                  "persona cache still empty or incomplete after extraction",
                ),
                requestKeys,
              );
            }
          } catch (personaErr) {
            const reason = personaErr?.message || String(personaErr);
            await abortMainModelWithAuxError(
              _T.err_persona_cache_missing(reason),
              requestKeys,
            );
          }
        }

        const regenSkipKey = requestKeys.regenSkip;
        const regenSkipToken = simpleHash(
          JSON.stringify({
            scopeId: requestKeys.scopeId,
            chatScopedKey,
            userMsgCount,
            lastUserContent,
            cardMemoryPreset,
          }),
        );
        if (loreModified) {
          try {
            await Risuai.safeLocalStorage.removeItem(regenSkipKey);
          } catch {}
        }

        let savedRegenToken = null;
        try {
          savedRegenToken = await Risuai.safeLocalStorage.getItem(regenSkipKey);
        } catch {}
        if (!loreModified && savedRegenToken === regenSkipToken) {
          await Risuai.safeLocalStorage.setItem(
            requestKeys.lastExtractorMode,
            "skipped_regen",
          );
          await Risuai.log(
            `${LOG} beforeRequest: regenerate detected — skipping extraction (same turn, same user message).`,
          );
          return await mergeToSystemPromptWithRewrite(
            messages,
            null,
            lastUserContent,
          );
        }

        let extractedData = null;
        const roundIndex = userMsgCount;
        const resolved = resolveExtractorConfig();
        const memoryEnabled = true;
        const dueCalls = getModelCallsByPreset(cardMemoryPreset).filter((c) =>
          isModelCallDue(c, userMsgCount),
        );

        if (dueCalls.length > 0) {
          await Risuai.log(
            `${LOG} Agent: Calling auxiliary model for analysis and data extraction...`,
          );

          const PARALLEL_LIMIT = 3;
          const parallelCalls = dueCalls.filter((c) => {
            const target = safeTrim(c.target_model) === "B" ? "B" : "A";
            return target === "B"
              ? configCache.extractor_b_concurrency === 1
              : configCache.extractor_a_concurrency === 1;
          });
          const sequentialCalls = dueCalls.filter((c) => {
            const target = safeTrim(c.target_model) === "B" ? "B" : "A";
            return target === "B"
              ? configCache.extractor_b_concurrency !== 1
              : configCache.extractor_a_concurrency !== 1;
          });

          const executeCall = async (call) => {
            const usePersonaContext =
              _newPreset &&
              (cardMemoryPreset === "3" || cardMemoryPreset === "4");
            const extractedMessages = await buildScopedExtractorMessages(
              baseConversation,
              call,
              char,
              usePersonaContext,
            );
            const endpoint =
              call.target_model === "B" ? resolved.b : resolved.a;
            try {
              return {
                call,
                result: await callExtractorStrict({
                  url: endpoint.url,
                  apiKey: endpoint.key,
                  model: endpoint.model,
                  format: endpoint.format,
                  temperature: endpoint.temperature,
                  messages: extractedMessages,
                  timeoutMs: configCache.timeout_ms,
                  mode: call.target_model,
                  thinkingEnabled: endpoint.thinkingEnabled || false,
                  thinkingLevel: endpoint.thinkingLevel || "",
                }),
              };
            } catch (err) {
              throw new Error(buildAuxCallErrorLine(call, endpoint, err));
            }
          };

          const parallelResults = [];
          let auxErrors = [];
          for (let i = 0; i < parallelCalls.length; i += PARALLEL_LIMIT) {
            const batch = parallelCalls.slice(i, i + PARALLEL_LIMIT);
            const batchResults = await Promise.allSettled(
              batch.map(executeCall),
            );
            parallelResults.push(...batchResults);
            auxErrors = collectSettledErrors(batchResults);
            if (auxErrors.length > 0) break;
          }

          const sequentialResults = [];
          if (auxErrors.length === 0) {
            for (const call of sequentialCalls) {
              const settled = await Promise.allSettled([executeCall(call)]).then(
                (r) => r[0],
              );
              sequentialResults.push(settled);
              auxErrors = collectSettledErrors([settled]);
              if (auxErrors.length > 0) break;
            }
          }

          const results = [...parallelResults, ...sequentialResults];
          if (auxErrors.length > 0) {
            const errs = auxErrors.join("\n");
            await abortMainModelWithAuxError(_T.aux_failed + errs, requestKeys);
          }

          for (const res of results) {
            if (res.status !== "fulfilled") continue;
            const { call, result } = res.value;
            const parsed = result?.parsed || {};
            if (Object.keys(parsed).length > 0)
              extractedData = { ...(extractedData || {}), ...parsed };
            const raw = String(result?.raw || "").trim();
            if (!raw) continue;
            try {
              await writeOutputsForCall(
                call,
                raw,
                result?.parsed,
                roundIndex,
                dueCalls,
              );
              if (extractedData === null) extractedData = {};
            } catch (e) {
              const endpoint =
                call.target_model === "B" ? resolved.b : resolved.a;
              await abortMainModelWithAuxError(
                _T.entry_save_failed + buildAuxCallErrorLine(call, endpoint, e),
                requestKeys,
              );
            }
          }
        }

        await Risuai.safeLocalStorage.setItem(
          requestKeys.lastExtractorMode,
          "replacer",
        );
        if (extractedData) {
          await Risuai.safeLocalStorage.setItem(
            requestKeys.lastExtractedData,
            typeof extractedData === "object"
              ? JSON.stringify(extractedData)
              : String(extractedData),
          );
        }
        if (!extractedData && dueCalls.length > 0) {
          const callNames = dueCalls
            .map(
              (c) =>
                `"${safeTrim(c.name || c.id || "unnamed")}" (every ${c.every_n_turns ?? 1} turns)`,
            )
            .join(", ");
          await abortMainModelWithAuxError(
            `${_T.aux_failed || "Auxiliary model execution failed:\n"}No usable extraction result was produced by due calls: ${callNames}`,
            requestKeys,
          );
        }

        const allCardCalls = getModelCallsByPreset(cardMemoryPreset);
        await applyRetentionCleanup(userMsgCount, allCardCalls);

        if (dueCalls.length > 0) {
          try {
            await Risuai.safeLocalStorage.setItem(regenSkipKey, regenSkipToken);
          } catch {}
        }

        return await mergeToSystemPromptWithRewrite(
          messages,
          null,
          lastUserContent,
        );
      } finally {
        Object.assign(configCache, vecBackup);
        _currentIsCardReorgEnabled = false;
        _currentIsNewPreset = false;
      }
    })(messages, type);
  }

  async function getConversationFromCurrentChat(limit, existingChat) {
    let chatData = existingChat;
    if (!chatData) {
      const { chat } = await getCurrentChatContextSafe();
      chatData = chat;
    }
    const src = Array.isArray(chatData?.message) ? chatData.message : [];
    const out = [];
    let firstUserSeen = false;
    for (const m of src) {
      const role =
        m?.role === "char" ? "assistant" : m?.role === "user" ? "user" : null;
      if (!role) continue;
      const content = normalizeChatPayloadText(m?.data || m?.content);
      if (!content) continue;
      if (role === "assistant" && !firstUserSeen) continue;
      if (role === "user") firstUserSeen = true;
      out.push({ role, content });
    }
    return out.slice(-Math.max(1, limit));
  }

  console.log(`${LOG} INIT START`);
  try {
    await refreshConfig();
    await ensureLangInitialized();

    await initSettingEntry();

    await Risuai.safeLocalStorage.setItem("plugin_loaded_ver", PLUGIN_VER);
    await Risuai.safeLocalStorage.setItem(
      "plugin_loaded_ts",
      new Date().toISOString(),
    );
    await Risuai.safeLocalStorage.removeItem("last_hook_ts");
    await Risuai.safeLocalStorage.removeItem("last_hook_type");
    await Risuai.safeLocalStorage.removeItem("last_lore_sync_hash");

    replacerFn = createReplacer();
    await ensureReplacerRegistered();

    await Risuai.log(`${LOG} loaded (${PLUGIN_NAME} v${PLUGIN_VER}).`);
    console.log(`${LOG} loaded OK`);
  } catch (err) {
    console.error(`${LOG} INIT FAILED:`, err);
    try {
      await Risuai.log(`${LOG} failed: ${err?.message || String(err)}`);
    } catch {}
  }

  if (typeof Risuai.onUnload === "function") {
    await Risuai.onUnload(async () => {
      for (const id of uiIds) {
        try {
          await Risuai.unregisterUIPart(id);
        } catch {}
      }
      if (replacerFn) {
        try {
          await Risuai.removeRisuReplacer("beforeRequest", replacerFn);
          replacerRegistered = false;
        } catch {}
      }
    });
  }
})();
