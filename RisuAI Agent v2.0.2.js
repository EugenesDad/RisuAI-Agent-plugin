//@name 👤 RisuAI Agent
//@display-name 👤 RisuAI Agent v2.0.2
//@author penguineugene@protonmail.com
//@link https://github.com/EugenesDad/RisuAI-Agent-plugin
//@api 3.0
//@version 2.0.2

(async () => {
  function _mapLangCode(raw) {
    const dl = String(raw || "").toLowerCase().trim();
    if (!dl) return "";
    if (dl === "ko" || dl.startsWith("ko-")) return "ko";
    if (dl === "cn" || dl === "tc" || dl === "zh-tw" || dl === "zh-hant" || dl.startsWith("zh-tw") || dl.startsWith("zh-hk")) return "tc";
    if (dl.startsWith("zh")) return "tc";
    if (dl.startsWith("en")) return "en";
    return "";
  }

  async function _detectLang() {
    // Priority 1: User-selected language in plugin settings (most reliable)
    try {
      const saved = String(await Risuai.safeLocalStorage.getItem("pse_ui_language") || "").trim();
      if (saved === "en" || saved === "ko" || saved === "tc") return saved;
    } catch { }
    // Priority 2: English default
    return "en";
  }

  const _I18N = {
    en: {
      append: "Append", overwrite: "Overwrite",
      tab_help: "Instructions", tab_model: "Pre-Model Settings", tab_vector: "Temporarily Closed",
      tab_entry: "Information Extraction", tab_cache: "Temporarily Closed", tab_enable: "Enable Settings",
      tab_closed: "Temporarily Closed",
      tab_common: "Common Prompts",
      sec_a: "Main Model", sec_b: "Auxiliary Model",
      sec_embed_title: "Embedding Model",
      embed_warn: "⚠️ Vectors from different embedding models are completely incompatible. If you change the model, clear the cache data below first.",
      lbl_provider: "Provider", lbl_format: "Request Format", lbl_url: "Request URL",
      lbl_key: "API Key", lbl_model: "Model", lbl_temp: "Temperature",
      lbl_concur: "Concurrency Mode",
      opt_concurrent: "Concurrent (allow multiple simultaneous requests)",
      opt_sequential: "Sequential (single-threaded requests only)",
      sec_lore_calls: "Lorebook Write Call Settings",
      tag_temp_closed: "Temporarily Closed",
      lore_warn: "⚠️ Do not manually edit the Lorebook while Agent is running, as it may be automatically overwritten.",
      btn_add_call: "Add Call Task",
      lbl_anchor: "System Anchor Prompt", lbl_prefill: "Assistant Prefill", lbl_prereply: "Assistant Pre-Reply Prompt",
      aria_expand: "Expand Edit",
      sec_vec: "Vector Search",
      opt_vec_on: "Enabled (select Lorebook entries by semantic relevance)",
      opt_vec_off: "Disabled (use traditional keyword matching)",
      lbl_query_rounds: "Number of recent dialogue turns to use as search query",
      lbl_topk: "Top K (number of entries to return)",
      lbl_minscore: "Minimum similarity score threshold (0~1)",
      sec_classify: "Classification Model Settings", lbl_use_model: "Use Model",
      opt_main_model: "Main Model", opt_aux_model: "Auxiliary Model",
      lbl_classify_anchor: "Classification Anchor Prompt",
      lbl_classify_model: "Classification Model",
      lbl_read_mod_lorebook_short: "Read Mod Lorebook",
      sec_card_settings: "Bot Enable Settings",
      lbl_card_name: "Bot",
      lbl_memory_extract: "Enable Info Extraction",
      lbl_vector_search_card: "Enable Vector Search",
      lbl_card_disabled: "Disable this plugin",
      opt_off: "Off",
      opt_preset1: "Preset 1",
      opt_preset2: "Preset 2",
      no_cards: "No bots found in database.",
      sec_cache: "Cache Hub",
      btn_refresh_cache: "Refresh Cache List", btn_clear_cache: "Clear All Caches",
      btn_reset: "Reset to Defaults",
      lbl_card: "", lbl_entries: "Entries", lbl_filesize: "File Size",
      btn_delete: "Delete",
      lbl_classify_only: "Classification only",
      lbl_chunks: "Entries",
      tag_vector: "Vector",
      tag_classify: "Classification",
      btn_save: "Save Settings", btn_close: "Close",
      preset1: "Preset 1", preset2: "Preset 2",
      no_cache: "No vector cache data available.",
      confirm_clear: `Are you sure you want to clear all vector caches?\nThis will delete all bot cache data. The cache will be rebuilt on the next send.`,
      st_cache_refreshed: "Vector cache list refreshed.",
      st_cache_cleared: "All vector caches cleared. Cache will be rebuilt on next send.",
      st_card_deleted: "Bot vector cache deleted.",
      st_saved: "Settings saved.", st_save_fail: "Save failed: ",
      st_reset: "Reset to Agent defaults.", st_reset_fail: "Reset failed: ",
      editor_cancel: "Cancel", editor_apply: "Apply", aria_close: "Close",
      lbl_lore_entry: "Lorebook Entry", lbl_write_mode: "Write Mode (Overwrite/Append)",
      lbl_always_active: "Always Active", yes: "Yes", no: "No",
      lbl_output_format: "Output Format (JSON Schema)",
      lbl_read_mod_lorebook: "Read Mod Lorebook",
      warn_cbs_unsupported: "Attention: Risu plugin v3 currently does not support CBS syntax parsing. If the Mod or character-bot Lorebook you use contains many CBS syntaxes, it is recommended not to enable this plugin.",
      ret_after_lbl: "After",
      ret_mid_lbl: "turns, auto-trim and keep only the latest",
      ret_end_lbl: "turns of data",
      ret_enabled_title: "When enabled, automatically trims old data from this entry after reaching the specified turn count, keeping only the most recent turns",
      ret_after_title: "Pruning starts after accumulating more than this many turns (0 = immediately)",
      ret_keep_title: "Number of most recent turn blocks to keep after trimming (0 = clear all)",
      lbl_call_note: "Call Note",
      lbl_call_model: "Model", opt_main: "Main Model", opt_aux: "Auxiliary Model",
      lbl_freq: "Trigger Frequency (turns)",
      lbl_read_rounds: "Read Dialogue Turns (0=all)",
      lbl_read_lore: "Associated Lorebook Entries (comma-separated)",
      btn_add_entry: "Add Write Entry",
      callnote_a: "Call Note A", callnote_b: "Call Note B",
      callnote_n: (n) => `Call Note ${n}`,
      default_callnote: "Call Note A",
      expand_anchor: "System Anchor Prompt - Expanded Edit",
      expand_prefill: "Assistant Prefill - Expanded Edit",
      expand_prereply: "Assistant Pre-Reply Prompt - Expanded Edit",
      expand_classify: "Classification Anchor Prompt - Expanded Edit",
      expand_generic: "Edit Prompt Content",
      expand_format: "Output Format (JSON Schema) - Expanded Edit",
      lbl_thinking: "Thinking Tokens", lbl_thinking_level: "Thinking Level",
      thinking_title: "Enable extended thinking for this model",
      opt_thinking_auto: "Auto (adaptive)", opt_thinking_low: "Low", opt_thinking_medium: "Medium", opt_thinking_high: "High",
      aux_failed: "Auxiliary model execution failed:\n",
      entry_save_failed: "Entry save failed:\n",
      no_conv: "Skipped: no usable conversation text in beforeRequest payload.",
      aux_abort_default: "Auxiliary model call or processing failed",
      aux_abort_suffix: "Main model request was intercepted to save API quota.",
      unknown_reason: "Unknown error",
      aux_error_line: ({ callName, target, provider, model, reason }) => `Call "${callName}" (Model ${target}, provider ${provider}, model ${model}) failed: ${reason}`,
      err_json_expected: (name) => `Auxiliary model (${name}) must return a JSON object, but parsing failed.`,
      err_validation_failed: (name, issues) => `Auxiliary model output validation failed (${name}): ${issues}.`,
      err_unusable_output: (name) => `Auxiliary model output is unusable (${name}).`,
      err_extractor_empty: (mode) => `Extractor ${mode} returned empty content.`,
      warn_parse_failed: "⚠️ Unable to parse static_knowledge_chunks. Please check if Step 0 has completed.",
      warn_no_chunks: "⚠️ No available chunks. Knowledge injection skipped. Please check if Step 0 has completed.",
      copilot_refresh: "Copilot token refresh",
      help_html: `<b>▌ Core Role: Information Extraction</b><br/>
                &bull; Information Extraction: Before the main model replies, precursor models extract valid information from the conversation, helping the main model respond more brilliantly.<br/>
                &bull; Difference between Preset 1 and Preset 2: Preset 1 is for general bots; Preset 2 is for epic narrative bots with complex plots.<br/>
                &bull; Vector Search is temporarily closed: Will be re-enabled after plugin V3 supports CBS.<br/><br/>

                <b>▌ Plugin Constraints</b><br/>
                &bull; ⚠️ Need to modify your preset<br/>
                &bull; ❌ Cannot resume non-plugin chats: To continue previous non-plugin chat history, please summarize it first and start a new conversation.<br/>
                &bull; ❌ Cannot toggle on/off repeatedly: The internal state (e.g., Long-Term Memory, World Encyclopedia) will become disconnected from the current plot if disabled.<br/>
                &bull; ✅ Switch presets mid-story: As long as the plugin remains enabled, you can freely switch between different presets during your roleplay.<br/>
                &bull; ✅ Disabling the plugin: You can transition from a plugin-enabled session to a non-plugin session (remember to change your preset), but the state maintained by the Agent will stop updating.<br/><br/>

                <b>▌ How to modify the Preset</b><br/>
                1. Delete Supa/HypaMemory field<br/>
                2. Click Advanced in chat, adjust Range Start to -10<br/><br/>

                <b>▌ Precursor Model Settings: The Core Supporting the Plugin</b><br/>
                &bull; Main Model: A powerful model capable of effectively processing large amounts of data.<br/>
                &bull; Auxiliary Model: A non-coding model capable of understanding the play language and processing 1k~5k content.<br/><br/>

                <b>▌ Expected Model Call Frequency</b><br/>
                <b>[At Start of Conversation]</b><br/>
                &bull; Main Model: 0 times.<br/>
                &bull; Auxiliary Model: Called several times to break down bot data and build the classification system.<br/>
                &bull; Embedding Model: If cache search is enabled, called several times to build the vector index.<br/>
                <b>[Subsequent Turns: Setting 1]</b><br/>
                &bull; Main Model: Once every 10 / 15 turns.<br/>
                &bull; Auxiliary Model: Twice every turn, once every 3 turns.<br/>
                &bull; Embedding Model: Once every turn if cache search is enabled.<br/>
                <b>[Subsequent Turns: Setting 2]</b><br/>
                &bull; Main Model: Once every 3 / 10 / 15 turns.<br/>
                &bull; Auxiliary Model: Three times every turn, once every 2 turns, once every 3 turns.<br/>
                &bull; Embedding Model: Once every turn if cache search is enabled.`,
    },
    ko: {
      append: "추가", overwrite: "덮어쓰기",
      tab_help: "설정 안내", tab_model: "전도 모델 설정", tab_vector: "일시적으로 닫힘",
      tab_entry: "정보 추출", tab_cache: "일시적으로 닫힘", tab_enable: "활성화 설정",
      tab_closed: "일시적으로 닫힘",
      tab_common: "공통 프롬프트",
      sec_a: "메인 모델", sec_b: "보조 모델",
      sec_embed_title: "임베딩 모델 (Embedding Model)",
      embed_warn: "⚠️ 다른 임베딩 모델이 생성하는 벡터는 완전히 호환되지 않습니다. 모델을 변경할 경우 반드시 아래 캐시 데이터를 먼저 지우세요.",
      lbl_provider: "공급자", lbl_format: "요청 형식", lbl_url: "요청 URL",
      lbl_key: "API 키", lbl_model: "모델", lbl_temp: "온도",
      lbl_concur: "요청 모드 (Concurrency)",
      opt_concurrent: "병렬 (복수 요청 동시 발송 허용)",
      opt_sequential: "순차 (단일 스레드 요청만 가능)",
      sec_lore_calls: "로어북 쓰기 호출 설정",
      tag_temp_closed: "일시적으로 닫힘",
      lore_warn: "⚠️ Agent 작동 중에는 로어북을 수동으로 편집하지 마세요. 시스템에 의해 자동으로 덮어쓰일 수 있습니다.",
      btn_add_call: "호출 작업 추가",
      lbl_anchor: "시스템 앵커 프롬프트 (System Prompt)", lbl_prefill: "어시스턴트 프리필 (Assistant Prefill)", lbl_prereply: "사전 응답 프롬프트 (Assistant Pre-Reply)",
      aria_expand: "확대 편집",
      sec_vec: "벡터 검색 (Vector Search)",
      opt_vec_on: "활성화 (의미 관련성 기반 로어북 항목 선택)",
      opt_vec_off: "비활성화 (전통적인 키워드 매칭 사용)",
      lbl_query_rounds: "최근 몇 라운드 대화를 검색 기준으로 사용",
      lbl_topk: "Top K (반환 항목 수)",
      lbl_minscore: "최소 유사도 점수 임계값 (0~1)",
      sec_classify: "분류 모델 설정", lbl_use_model: "사용 모델",
      opt_main_model: "메인 모델", opt_aux_model: "보조 모델",
      lbl_classify_anchor: "분류 앵커 프롬프트",
      lbl_classify_model: "분류 모델",
      lbl_read_mod_lorebook_short: "Mod Lorebook 읽기",
      sec_card_settings: "봇 활성화 설정",
      lbl_card_name: "봇",
      lbl_memory_extract: "정보 추출 활성화",
      lbl_vector_search_card: "벡터 검색 활성화",
      lbl_card_disabled: "이 플러그인 비활성화",
      opt_off: "끄기",
      opt_preset1: "설정 1",
      opt_preset2: "설정 2",
      no_cards: "데이터베이스에 봇이 없습니다.",
      sec_cache: "캐시 관리 센터 (Cache Hub)",
      btn_refresh_cache: "캐시 목록 새로고침", btn_clear_cache: "전체 캐시 삭제",
      btn_reset: "기본 설정으로 초기화",
      lbl_card: "", lbl_entries: "항목 수", lbl_filesize: "파일 크기",
      btn_delete: "삭제",
      lbl_classify_only: "분류 전용",
      lbl_chunks: "항목 수",
      tag_vector: "벡터",
      tag_classify: "분류",
      btn_save: "설정 저장", btn_close: "닫기",
      preset1: "설정 1", preset2: "설정 2",
      no_cache: "현재 벡터 캐시 데이터가 없습니다.",
      confirm_clear: "전체 벡터 캐시를 삭제하시겠습니까?\\n모든 봇의 캐시 데이터가 삭제되며 다음 발송 시 재생성됩니다.",
      st_cache_refreshed: "벡터 캐시 목록이 업데이트되었습니다.",
      st_cache_cleared: "전체 벡터 캐시가 삭제되었습니다. 다음 발송 시 재생성됩니다.",
      st_card_deleted: "해당 봇의 벡터 캐시가 삭제되었습니다.",
      st_saved: "설정이 저장되었습니다.", st_save_fail: "저장 실패: ",
      st_reset: "Agent 기본값으로 초기화되었습니다.", st_reset_fail: "초기화 실패: ",
      editor_cancel: "취소", editor_apply: "적용", aria_close: "닫기",
      lbl_lore_entry: "로어북 항목", lbl_write_mode: "쓰기 모드 (덮어쓰기/추가)",
      lbl_always_active: "언제나 활성화", yes: "예", no: "아니오",
      lbl_output_format: "출력 형식 (JSON Schema)",
      lbl_read_mod_lorebook: "Mod Lorebook 읽기",
      warn_cbs_unsupported: "주의: 현재 Risu plugin v3는 CBS 문법 파싱을 지원하지 않습니다. 사용 중인 Mod 또는 캐릭터 봇 Lorebook에 CBS 문법이 많다면 이 plugin을 활성화하지 않는 것을 권장합니다.",
      ret_after_lbl: "경과 후",
      ret_mid_lbl: "턴 후 자동 정리 실행, 최신 데이터만 유지",
      ret_end_lbl: "턴 데이터",
      ret_enabled_title: "활성화 후 지정 턴 수에 도달하면 이 항목의 오래된 데이터를 자동으로 정리하고 최신 몇 턴 내용만 유지합니다",
      ret_after_title: "이 턴 수를 초과하면 정리 시작 (0 = 즉시)",
      ret_keep_title: "정리 후 유지할 최신 턴 블록 수 (0 = 전체 삭제)",
      lbl_call_note: "호출 메모",
      lbl_call_model: "모델", opt_main: "메인 모델", opt_aux: "보조 모델",
      lbl_freq: "트리거 빈도 (턴)",
      lbl_read_rounds: "대화 턴 수 읽기 (0=전부)",
      lbl_read_lore: "연관 로어북 항목 (쉼표로 구분)",
      btn_add_entry: "쓰기 항목 추가",
      callnote_a: "호출 메모A", callnote_b: "호출 메모B",
      callnote_n: (n) => `호출 메모${n}`,
      default_callnote: "호출 메모A",
      expand_anchor: "시스템 앵커 프롬프트 - 확대 편집",
      expand_prefill: "어시스턴트 프리필 - 확대 편집",
      expand_prereply: "사전 응답 프롬프트 - 확대 편집",
      expand_classify: "분류 앵커 프롬프트 - 확대 편집",
      expand_generic: "프롬프트 내용 편집",
      expand_format: "출력 형식 (JSON Schema) - 확대 편집",
      lbl_thinking: "사고 토큰", lbl_thinking_level: "사고 수준",
      thinking_title: "이 모델에 대한 확장 사고 활성화",
      opt_thinking_auto: "Auto (적응형)", opt_thinking_low: "Low", opt_thinking_medium: "Medium", opt_thinking_high: "High",
      aux_failed: "보조 모델 실행 실패:\n",
      entry_save_failed: "항목 저장 실패:\n",
      no_conv: "건너뜀: beforeRequest 페이로드에 사용 가능한 대화 텍스트 없음.",
      aux_abort_default: "보조 모델 호출 또는 처리 실패",
      aux_abort_suffix: "API 쿼터를 보호하기 위해 메인 모델 요청이 중단되었습니다.",
      unknown_reason: "알 수 없는 오류",
      aux_error_line: ({ callName, target, provider, model, reason }) => `호출 "${callName}" (모델 ${target}, 제공자 ${provider}, 모델 ${model}) 실패: ${reason}`,
      err_json_expected: (name) => `보조 모델 (${name})은 JSON 객체를 반환해야 하지만 파싱에 실패했습니다.`,
      err_validation_failed: (name, issues) => `보조 모델 출력 검증 실패 (${name}): ${issues}.`,
      err_unusable_output: (name) => `보조 모델 출력을 사용할 수 없습니다 (${name}).`,
      err_extractor_empty: (mode) => `추출기 ${mode}가 빈 내용을 반환했습니다.`,
      warn_parse_failed: "⚠️ 정적 지식 청크를 파싱할 수 없습니다. Step 0이 완료되었는지 확인하십시오.",
      warn_no_chunks: "⚠️ 사용 가능한 청크가 없습니다. 지식 주입을 건너뜜. Step 0이 완료되었는지 확인하십시오.",
      copilot_refresh: "Copilot 토큰 갱신",
      help_html: `<b>▌ 핵심 역할: 정보 추출</b><br/>
                &bull; 정보 추출: 메인 모델이 응답하기 전, 전도 모델을 통해 대화에서 유효한 정보를 추출하여 메인 모델이 더 멋지게 응답할 수 있도록 돕습니다.<br/>
                &bull; 설정 1과 설정 2의 차이: 설정 1은 일반적인 봇에 적합하며, 설정 2는 복잡한 줄거리의 대서사시형 봇에 적합합니다.<br/>
                &bull; 벡터 검색은 일시적으로 비활성화됨: 플러그인 V3가 CBS를 지원하면 다시 활성화됩니다.<br/><br/>

                <b>▌ 플러그인 제한 사항</b><br/>
                &bull; ⚠️ 사용 중인 프리셋 수정 필요<br/>
                &bull; ❌ 일반 채팅 기록과 직접 호환 불가: 플러그인을 사용하지 않은 이전 기록을 가져오려면 내용을 요약한 뒤 새 대화를 시작해 주세요.<br/>
                &bull; ❌ 반복적인 On/Off 불가: 플러그인을 비활성화하면 내부 상태(장기 기억, 세계 백과사전 등)가 현재 줄거리와 동떨어지게 됩니다.<br/>
                &bull; ✅ 도중 프리셋 교체: 플러그인이 활성화된 상태라면 플레이 도중 언제든지 다른 프리셋으로 자유롭게 전환할 수 있습니다.<br/>
                &bull; ✅ 플러그인 비활성화: 플러그인 사용 모드에서 일반 모드로 전환하는 것이 가능하지만(프리셋 교체 필요), 에이전트가 기록하는 상태 정보는 더 이상 업데이트되지 않습니다.<br/><br/>

                <b>▌ 프리셋 수정 방법</b><br/>
                1. Supa/HypaMemory 필드 삭제<br/>
                2. 채팅에서 고급(Advanced) 클릭 후, 범위 시작을 -10으로 조정<br/><br/>

                <b>▌ 전도 모델 설정: 플러그인 작동을 지원하는 핵심</b><br/>
                &bull; 메인 모델: 강력한 성능으로 대량의 데이터를 효과적으로 처리할 수 있는 모델입니다.<br/>
                &bull; 보조 모델: 플레이 언어를 이해하고 1k~5k의 내용을 처리할 수 있는 비코딩 모델입니다.<br/><br/>

                <b>▌ 예상 모델 호출 빈도</b><br/>
                <b>【대화 시작 시】</b><br/>
                &bull; 메인 모델: 0회.<br/>
                &bull; 보조 모델: 봇 데이터를 분해하고 분류 시스템을 구축하기 위해 수 회 호출됩니다.<br/>
                &bull; 임베딩 모델: 캐시 검색이 활성화된 경우 벡터 인덱스를 생성하기 위해 수 회 호출됩니다.<br/>
                <b>【이후 대화: 설정 1】</b><br/>
                &bull; 메인 모델: 10 / 15 턴마다 1회.<br/>
                &bull; 보조 모델: 매 턴 2회, 3턴마다 1회.<br/>
                &bull; 임베딩 모델: 캐시 검색이 활성화된 경우 매 턴 1회.<br/>
                <b>【이후 대화: 설정 2】</b><br/>
                &bull; 메인 모델: 3 / 10 / 15 턴마다 1회.<br/>
                &bull; 보조 모델: 매 턴 3회, 2턴마다 1회, 3턴마다 1회.<br/>
                &bull; 임베딩 모델: 캐시 검색이 활성화된 경우 매 턴 1회.`,
    },
    tc: {
      append: "添加", overwrite: "覆蓋",
      tab_help: "設定說明", tab_model: "前導模型設定", tab_vector: "暫時關閉中",
      tab_entry: "資訊萃取", tab_cache: "暫時關閉中", tab_enable: "啟用設置",
      tab_closed: "暫時關閉中",
      tab_common: "共同提示詞",
      sec_a: "主要模型", sec_b: "輔助模型",
      sec_embed_title: "嵌入模型",
      embed_warn: "⚠️ 不同嵌入模型產出的向量完全不互通。若更換模型，請務必先清除下方快取資料。",
      lbl_provider: "提供者", lbl_format: "請求格式", lbl_url: "請求地址（URL）",
      lbl_key: "API 金鑰", lbl_model: "模型", lbl_temp: "溫度（Temperature）",
      lbl_concur: "請求模式 (Concurrency)",
      opt_concurrent: "併發 (允許同時發送複數請求)",
      opt_sequential: "序列 (僅能單線請求)",
      sec_lore_calls: "Lorebook 寫入呼叫設定",
      tag_temp_closed: "暫時關閉中",
      lore_warn: "⚠️ Agent 運作期間，請勿手動編輯Lorebook，以免被系統自動覆蓋。",
      btn_add_call: "新增呼叫任務",
      lbl_anchor: "系統定位提示詞 (System Prompt)", lbl_prefill: "助理預填充 (Assistant Prefill)", lbl_prereply: "預回覆提示詞 (Assistant Pre-Reply)",
      aria_expand: "放大編輯",
      sec_vec: "向量搜尋",
      opt_vec_on: "啟用 (依語意關聯度挑選 Lorebook 條目)",
      opt_vec_off: "停用 (使用傳統關鍵字匹配)",
      lbl_query_rounds: "以最近幾輪對話作為搜尋關鍵",
      lbl_topk: "Top K (回傳條目數)",
      lbl_minscore: "最低相似度分數門檻 (0~1)",
      sec_classify: "分類模型設定", lbl_use_model: "使用模型",
      opt_main_model: "主要模型", opt_aux_model: "輔助模型",
      lbl_classify_anchor: "分類定位提示詞",
      lbl_classify_model: "分類模型",
      lbl_read_mod_lorebook_short: "讀取模組 Lorebook",
      sec_card_settings: "卡片啟用設置",
      lbl_card_name: "卡片",
      lbl_memory_extract: "啟用資訊萃取",
      lbl_vector_search_card: "啟用向量搜尋",
      lbl_card_disabled: "不啟用此外掛",
      opt_off: "關閉",
      opt_preset1: "設定1",
      opt_preset2: "設定2",
      no_cards: "資料庫中找不到卡片。",
      sec_cache: "快取倉庫",
      btn_refresh_cache: "更新快取列表", btn_clear_cache: "清除全部快取",
      btn_reset: "重置為預設設定",
      lbl_card: "", lbl_entries: "條目數", lbl_filesize: "檔案大小",
      btn_delete: "刪除",
      lbl_classify_only: "僅進行分類",
      lbl_chunks: "條目數",
      tag_vector: "向量",
      tag_classify: "分類",
      btn_save: "儲存設定", btn_close: "關閉",
      preset1: "設定 1", preset2: "設定 2",
      no_cache: "目前沒有向量快取資料。",
      confirm_clear: "確定要清除全部向量快取嗎？\\n這將刪除所有卡片的快取資料，下次發送時會重新建立。",
      st_cache_refreshed: "已更新向量快取列表。",
      st_cache_cleared: "已清除全部向量快取，下次發送時將重新建立。",
      st_card_deleted: "已刪除該卡片的向量快取。",
      st_saved: "設定已儲存。", st_save_fail: "儲存失敗：",
      st_reset: "已重置為 Agent 預設。", st_reset_fail: "重置失敗：",
      editor_cancel: "取消", editor_apply: "應用", aria_close: "關閉",
      lbl_lore_entry: "Lorebook 條目", lbl_write_mode: "寫入模式 (覆蓋/添加)",
      lbl_always_active: "始終啟用", yes: "是", no: "否",
      lbl_output_format: "輸出格式 (JSON Schema)",
      lbl_read_mod_lorebook: "是否讀取模組 Lorebook",
      warn_cbs_unsupported: "注意：目前 Risu 外掛 v3 不支援解析 CBS 語法。若你發現使用的模組或角色卡 Lorebook 有許多 CBS 語法，則建議不要啟用本外掛。",
      ret_after_lbl: "於",
      ret_mid_lbl: "回合後執行自動清理，僅保留最新的",
      ret_end_lbl: "回合資料",
      ret_enabled_title: "啟用後，在達到指定回合數後，自動修剪此條目的舊資料，僅保留最新幾回合內容",
      ret_after_title: "累積超過此回合數後才開始修剪 (0 = 立即)",
      ret_keep_title: "清理後保留最新幾回合的區塊 (0 = 清空全部)",
      lbl_call_note: "呼叫備註",
      lbl_call_model: "模型", opt_main: "主要模型", opt_aux: "輔助模型",
      lbl_freq: "觸發頻率 (回合)",
      lbl_read_rounds: "讀取對話回合數 (0=全部)",
      lbl_read_lore: "關聯 Lorebook 條目 (逗號分隔)",
      btn_add_entry: "新增寫入條目",
      callnote_a: "目的備註A", callnote_b: "目的備註B",
      callnote_n: (n) => `目的備註${n}`,
      default_callnote: "目的備註A",
      expand_anchor: "系統定位提示詞 - 放大編輯",
      expand_prefill: "助理預填充 - 放大編輯",
      expand_prereply: "預回覆提示詞 - 放大編輯",
      expand_classify: "分類定位提示詞 - 放大編輯",
      expand_generic: "編輯提示詞內容",
      expand_format: "輸出格式 (JSON Schema) - 放大編輯",
      lbl_thinking: "思考 Tokens", lbl_thinking_level: "思考等級",
      thinking_title: "為此模型啟用延伸思考",
      opt_thinking_auto: "Auto（自適應）", opt_thinking_low: "Low", opt_thinking_medium: "Medium", opt_thinking_high: "High",
      aux_failed: "輔助模型執行失敗：\n",
      entry_save_failed: "條目儲存失敗：\n",
      no_conv: "跳過：beforeRequest 酬載中無可用對話文字。",
      aux_abort_default: "輔助模型呼叫或處理失敗",
      aux_abort_suffix: "為保護 API 配額，主模型請求已被攔截中止。",
      unknown_reason: "未知錯誤",
      aux_error_line: ({ callName, target, provider, model, reason }) => `呼叫「${callName}」（模型 ${target}、提供者 ${provider}、model ${model}）失敗：${reason}`,
      err_json_expected: (name) => `輔助模型 (${name}) 必須回傳 JSON 物件，但解析失敗。`,
      err_validation_failed: (name, issues) => `輔助模型輸出驗證失敗 (${name})：${issues}。`,
      err_unusable_output: (name) => `輔助模型輸出無法使用 (${name})。`,
      err_extractor_empty: (mode) => `提取器 ${mode} 回傳內容為空。`,
      warn_parse_failed: "⚠️ 無法解析靜態知識分塊。請檢查 Step 0 是否已完成。",
      warn_no_chunks: "⚠️ 無可用分塊。已跳過知識注入。請檢查 Step 0 是否已完成。",
      copilot_refresh: "Copilot token refresh",
      help_html: `<b>▌ 核心作用：資訊萃取</b><br/>
                &bull; 資訊萃取：主要模型回覆之前，先透過前導模型從對話中萃取有效資訊，輔助主要模型回應得更精彩。<br/>
                &bull; 設定1與設定2的差異：設定1適用於一般卡片；設定2適合劇情複雜的史詩型卡片。<br/>
                &bull; 向量搜尋暫時關閉中：等到plugin V3支援CBS後再開啟。<br/><br/>

                <b>▌ 本外掛限制</b><br/>
                &bull; ⚠️ 需要修改你所使用的preset<br/>
                &bull; ❌ 無法銜接無外掛對話：若要延續先前無外掛的遊玩記錄，請將記錄彙整後，重新開啟一段新對話。<br/>
                &bull; ❌ 外掛無法時開時關：因為外掛內的狀態（如長期記憶、世界百科）會在關閉時與當前劇情脫節。<br/>
                &bull; ✅ 外掛途中切換提示詞 (preset)：只要持續啟用此外掛，就可以在遊玩途中自由切換不同的提示詞。<br/>
                &bull; ✅ 關閉外掛：可從有外掛模式接軌至切換至無外掛模式 (記得preset也要轉換)，但外掛紀錄的狀態將停止更新。<br/><br/>

                <b>▌ 修改Preset的方式</b><br/>
                1. 刪除Supa/HypaMemory欄位<br/>
                2. 聊天點選進階，將範圍開始調整至-10<br/><br/>

                <b>▌ 前導模型設定：支持外掛運作的核心</b><br/>
                &bull; 主要模型：功能強大、能夠有效處理大量資料的模型。<br/>
                &bull; 輔助模型：能夠理解遊玩語言、處理 1k~5k 內容的非編程模型。<br/><br/>

                <b>▌ 預期呼叫模型的頻率</b><br/>
                <b>【啟動對話時】</b><br/>
                &bull; 主要模型：0 次。<br/>
                &bull; 輔助模型：呼叫數次，將卡片資料拆散建立分類系統。<br/>
                &bull; 嵌入模型：若開啟快取搜尋則呼叫數次，建立向量索引。<br/>
                <b>【之後對話：設定 1】</b><br/>
                &bull; 主要模型：每 10 / 15 回合 1 次。<br/>
                &bull; 輔助模型：每回合 2 次、每 3 回合 1 次。<br/>
                &bull; 嵌入模型：若開啟快取搜尋，每回合 1 次。<br/>
                <b>【之後對話：設定 2】</b><br/>
                &bull; 主要模型：每 3 / 10 / 15 回合 1 次。<br/>
                &bull; 輔助模型：每回合 3 次、每 2 回合 1 次、每 3 回合 1 次。<br/>
                &bull; 嵌入模型：若開啟快取搜尋，每回合 1 次。`,
    },
  };

  let _T = _I18N.en;
  let _langInitialized = false;

  const PLUGIN_NAME = "👤 RisuAI Agent";
  const PLUGIN_VER = "2.0.2";
  const LOG = "[RisuAIAgent]";
  const HARD_FREEZE_KB_FEATURES = true;
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
  const OPENROUTER_EMBED_MODELS_URL = "https://openrouter.ai/api/v1/models?fmt=cards&output_modalities=embeddings";
  const OPENROUTER_MODELS_CACHE_KEY = "openrouter_models_cache_v3";
  const OPENROUTER_MODELS_CACHE_TS_KEY = "openrouter_models_cache_ts_v3";
  const OPENROUTER_EMBED_MODELS_CACHE_KEY = "openrouter_embed_models_cache_v4";
  const OPENROUTER_EMBED_MODELS_CACHE_TS_KEY = "openrouter_embed_models_cache_ts_v4";
  const GROK_MODELS_URL = "https://api.x.ai/v1/models";
  const GROK_MODELS_CACHE_KEY = "grok_models_cache_v1";
  const GROK_MODELS_CACHE_TS_KEY = "grok_models_cache_ts_v1";
  const COPILOT_MODELS_URL = "https://api.githubcopilot.com/models";
  const COPILOT_MODELS_CACHE_KEY = "copilot_models_cache_v1";
  const COPILOT_MODELS_CACHE_TS_KEY = "copilot_models_cache_ts_v1";
  const COPILOT_TOKEN_URL = "https://api.github.com/copilot_internal/v2/token";
  const OPENROUTER_MODELS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
  const FIXED_TIMEOUT_MS = 120000;

  const EMBEDDING_VECTOR_CACHE_VERSION = 1;
  const EMBEDDING_VECTOR_CACHE_MAX_PER_CARD = 300;

  const DEFAULT_MODEL_CALLS = JSON.parse(atob("W3siaWQiOiJjYWxsX3N0YXRlIiwibmFtZSI6IlN0YXRlIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3R1cm5fbG9nLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgc3lzdGVtX2RpcmVjdG9yIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InJlY2VudF90dXJuX2xvZyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF90dXJuX2xvZ1wiOiB7XG4gICAgXCJzY2VuZVwiOiBcIjxsb2NhdGlvbiArIHNlbnNvcnkgY3VlLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwidGltZV9hbmNob3JcIjogXCI8ZXhwbGljaXQgaW4tc3RvcnkgdGltZT5cIixcbiAgICBcImVsYXBzZWRfc2luY2VfcHJldlwiOiBcIjxzYW1lIG1vbWVudCAvICsyaCAvICszZCAvIGV0Yz5cIixcbiAgICBcInVzZXJfYWN0aW9uXCI6IFwiPDw9MTIgd29yZHM+XCIsXG4gICAgXCJuYXJyYXRpdmVfZXZlbnRcIjogXCI8PD0xNSB3b3Jkcz5cIixcbiAgICBcInNoaWZ0XCI6IFwiPHRvbmUvc3Rha2VzIGNoYW5nZSA8PTggd29yZHMsIG9yIG51bGw+XCJcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQWxsIHN0cmluZ3MgPD0xNSB3b3Jkcy4gS2V5d29yZHMgb25seS5cbi0gZWxhcHNlZF9zaW5jZV9wcmV2OiB0aW1lIHNpbmNlIHByZXZpb3VzIHR1cm47IFwidW5zcGVjaWZpZWRfY29udGludWF0aW9uXCIgaWYgdW5rbm93bi5cbi0gc2hpZnQ6IG51bGwgaWYgbm90aGluZyBjaGFuZ2VkLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoicmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMiLCJ3cml0ZV9tb2RlIjoiYXBwZW5kIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJyZWNlbnRfY2hhcmFjdGVyX3N0YXRlc1wiOiB7XG4gICAgXCJsb2NhdGlvblwiOiBcIjw8PTEwIHdvcmRzPlwiLFxuICAgIFwicGxheWVyX3N0YXRlXCI6IFwiPGNvbmRpdGlvbiArIGtleSBpdGVtcywgPD0xNSB3b3Jkcz5cIixcbiAgICBcIm5wY3NcIjpbXG4gICAgICB7XG4gICAgICAgIFwibmFtZVwiOiBcIjxOUEMgbmFtZT5cIixcbiAgICAgICAgXCJwaHlzaWNhbF9zdGF0ZVwiOiBcIjw8PTEyIHdvcmRzPlwiLFxuICAgICAgICBcImludGVybmFsX3N0YXRlXCI6IFwiPHRydWUgbW90aXZlL2ZlZWxpbmcsIDw9MTIgd29yZHM+XCIsXG4gICAgICAgIFwicmVsYXRpb25fdG9fcGxheWVyXCI6IFwiPDw9MTAgd29yZHMsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIFJlbW92ZSBkZXBhcnRlZCBOUENzLiBBZGQgbmV3IG9uZXMuIG5wY3M6W10gaWYgbm9uZSBwcmVzZW50LlxuLSBpbnRlcm5hbF9zdGF0ZTogdHJ1ZSBtb3RpdmVzIGV2ZW4gaWYgaGlkZGVuLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoic3lzdGVtX2RpcmVjdG9yIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3lzdGVtX2RpcmVjdG9yXCI6IHtcbiAgICBcInN0YWxlbmVzc19sZXZlbFwiOiAwLFxuICAgIFwiZW52aXJvbm1lbnRfaW50ZXJ2ZW50aW9uXCI6IG51bGxcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29tcGFyZSBjdXJyZW50IHR1cm4ncyByZWNlbnRfdHVybl9sb2cgd2l0aCBwcmV2aW91cyB0dXJuJ3MuXG4tIHN0YWxlbmVzc19sZXZlbDogMCAoY29tcGxldGVseSBkaWZmZXJlbnQpIHRvIDEwIChuZWFybHkgaWRlbnRpY2FsKS5cbi0gPj04OiB3cml0ZSBhIGJyaWVmIHVuZXhwZWN0ZWQgZXZlbnQgaW4gZW52aXJvbm1lbnRfaW50ZXJ2ZW50aW9uLlxuLSA8PTc6IG51bGwuIn1dfSx7ImlkIjoiY2FsbF9sb2dpYyIsIm5hbWUiOiJMb2dpYyIsInRhcmdldF9tb2RlbCI6IkIiLCJldmVyeV9uX3R1cm5zIjoxLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MywicmVhZF9sb3JlYm9va19uYW1lcyI6InVuc29sdmVkX3F1ZXN0cywgcmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMsIHJlY2VudF90dXJuX2xvZyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJrbm93bl9jb250cmFkaWN0aW9ucyIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcImtub3duX2NvbnRyYWRpY3Rpb25zXCI6IHtcbiAgICBcImxvZ2ljX3Zpb2xhdGlvblwiOiBcIjxkZXNjcmliZSBjb250cmFkaWN0aW9uLCBvciBudWxsPlwiLFxuICAgIFwic3RyaWN0X2RpcmVjdGl2ZVwiOiBcIjxzZWUgYWxsb3dlZCB2YWx1ZXM+XCJcbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ2hlY2sgdXNlcl9hY3Rpb24gYWdhaW5zdCBwbGF5ZXJfc3RhdGUgYW5kIGxvY2F0aW9uLlxuLSBWaW9sYXRpb24gZm91bmQgLT4gZGVzY3JpYmUgaXQ7IHN0cmljdF9kaXJlY3RpdmU6IFwiUmVqZWN0IHRoZSB1c2VyIGFjdGlvbiBhbmQgbmFycmF0ZSBmYWlsdXJlXCIgb3IgXCJTaG93IGNvZ25pdGl2ZSBmcmljdGlvbjogY2hhcmFjdGVyIGhlc2l0YXRlcyBvciBzdHJ1Z2dsZXNcIi5cbi0gTm8gdmlvbGF0aW9uIC0+IGxvZ2ljX3Zpb2xhdGlvbjogbnVsbDsgc3RyaWN0X2RpcmVjdGl2ZTogXCJQcm9jZWVkIG5vcm1hbGx5XCIuIn0seyJsb3JlYm9va19uYW1lIjoidW5zb2x2ZWRfcXVlc3RzIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwidW5zb2x2ZWRfcXVlc3RzXCI6IHtcbiAgICBcImFjdGl2ZV90aHJlYWRzXCI6W1xuICAgICAge1xuICAgICAgICBcImlkXCI6IDEsIFwiZGVzY1wiOiBcIjxxdWVzdCBkZXNjcmlwdGlvbj5cIiwgXCJ3ZWlnaHRcIjogXCJtZWRpdW1cIiwgXCJzdGF0dXNcIjogXCJhY3RpdmVcIiwgXCJyZWxhdGVkX25wY3NcIjogW10sIFwibm90ZXNcIjogXCI8d2hhdCBjaGFuZ2VkIHRoaXMgdHVybj5cIiwgXCJuZXh0X3N0ZXBcIjogXCI8bW9zdCBsaWtlbHkgbmV4dCBhY3Rpb24+XCIsIFwicmVhc29uX2lmX2lnbm9yZWRcIjogXCI8Y29uc2VxdWVuY2UsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdLFxuICAgIFwibG9zdF9lbnRpdGllc1wiOlsge1wibmFtZVwiOiBcIjxuYW1lPlwiLCBcImxhc3Rfc2VlblwiOiBcIjxsb2NhdGlvbiArIGNpcmN1bXN0YW5jZT5cIiwgXCJyZWxldmFuY2VcIjogXCI8Y29ubmVjdGlvbiB0byB0aHJlYWRzPlwiLCBcInNlYXJjaF9wcmlvcml0eVwiOiBcIjxoaWdoL21lZGl1bS9sb3c+XCJ9IF0sXG4gICAgXCJyZXNvbHZlZF90aGlzX3R1cm5cIjpbIHtcImlkXCI6IDEsIFwiZGVzY1wiOiBcIjxyZXNvbHZlZCBkZXNjcmlwdGlvbj5cIiwgXCJjbG9zdXJlX3JlYXNvblwiOiBcIjx3aHkgcmVzb2x2ZWQ+XCIsIFwiY29uc2VxdWVuY2VcIjogXCI8bGFzdGluZyBjaGFuZ2U+XCJ9IF1cbiAgfVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29weSBwcmV2aW91cyBhY3RpdmVfdGhyZWFkcyBhcyBiYXNlbGluZS4gVXBkYXRlIGNoYW5nZWQgZmllbGRzIG9ubHkuXG4tIENvbXBsZXRlZCAtPiBtb3ZlIHRvIHJlc29sdmVkX3RoaXNfdHVybi4gTmV3IC0+IGlkID0gbWF4IGlkICsgMS5cbi0gd2VpZ2h0OiBjcml0aWNhbCB8IGhpZ2ggfCBtZWRpdW0gfCBsb3cuIHN0YXR1czogYWN0aXZlIHwgcHJvZ3Jlc3NlZCB8IHN0YWxsZWQgfCBuZWFybHlfcmVzb2x2ZWQuXG4tIFtdIGZvciBlbXB0eSBsaXN0cy4ifV19LHsiaWQiOiJjYWxsX3F1YWxpdHkiLCJuYW1lIjoiUXVhbGl0eSIsInRhcmdldF9tb2RlbCI6IkIiLCJldmVyeV9uX3R1cm5zIjozLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MywicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF93b3JsZF9lbnRyaWVzLCB3b3JsZF9lbmN5Y2xvcGVkaWEiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoicmVwZXRpdGlvbl9ndWFyZCIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlcGV0aXRpb25fZ3VhcmRcIjoge1xuICAgIFwiZmxhZ2dlZF9jbGljaGVzXCI6W10sIFwiYmFubmVkX3BocmFzZXNcIjpbXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBmbGFnZ2VkX2NsaWNoZXM6IHVwIHRvIDMgb3ZlcnVzZWQgdHJvcGVzIGluIHJlY2VudCB0dXJucy4gW10gaWYgbm9uZS5cbi0gYmFubmVkX3BocmFzZXM6IGV4YWN0IHBocmFzZXMgYXBwZWFyaW5nID49MiB0aW1lcy4gW10gaWYgbm9uZS4ifSx7ImxvcmVib29rX25hbWUiOiJyZWNlbnRfd29ybGRfZW50cmllcyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF93b3JsZF9lbnRyaWVzXCI6IHtcbiAgICBcImVudHJpZXNcIjogWyBcIjxOYW1lLiBLZXkgZmFjdC4gPD0yMCB3b3Jkcy4+XCIgXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBPbmUgc2VudGVuY2UgcGVyIGVudHJ5LCA8PTIwIHdvcmRzLiBOYW1lIGZpcnN0LCB0aGVuIGtleSBmYWN0LlxuLSBPbmx5IE5FVyBmYWN0cyBub3QgYWxyZWFkeSBpbiByZWNlbnRfd29ybGRfZW50cmllcyBvciB3b3JsZF9lbmN5Y2xvcGVkaWEuXG4tIENvdmVyIGFsbCB0dXJucyBzaW5jZSBsYXN0IHJ1biAodXAgdG8gMyB0dXJucykuXG4tIGVudHJpZXM6W10gaWYgbm90aGluZyBuZXcuIiwicmV0ZW50aW9uX2VuYWJsZWQiOnRydWUsInJldGVudGlvbl9hZnRlciI6MTUsInJldGVudGlvbl9rZWVwIjoxfV19LHsiaWQiOiJjYWxsX2xvbmd0ZXJtIiwibmFtZSI6Ikxvbmd0ZXJtIiwidGFyZ2V0X21vZGVsIjoiQSIsImV2ZXJ5X25fdHVybnMiOjEwLCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MSwicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF90dXJuX2xvZywgcmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMsIHVuc29sdmVkX3F1ZXN0cywgc3RvcnlfdHVybmluZ19wb2ludHMsIHN0b3J5X2FyY19zdW1tYXJ5IiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InN0b3J5X3R1cm5pbmdfcG9pbnRzIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3RvcnlfdHVybmluZ19wb2ludHNcIjpbXG4gICAgeyBcInNlcVwiOiAxLCBcInR5cGVcIjogXCI8dHlwZT5cIiwgXCJpbXBhY3RcIjogXCI8d2hhdCBjaGFuZ2VkIGFuZCB3aHk+XCIsIFwibG9uZ190ZXJtX2ltcGxpY2F0aW9uXCI6IFwiPGZ1dHVyZSBjb25zZXF1ZW5jZT5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMSwgMl0gfVxuICBdXG59XG5cbkZJRUxEIFJVTEVTOlxuLSBUdXJuaW5nIHBvaW50ID0gbW9tZW50IHRoYXQgZnVuZGFtZW50YWxseSBjaGFuZ2VkIHRoZSBzdG9yeSdzIGRpcmVjdGlvbi4iLCJyZXRlbnRpb25fZW5hYmxlZCI6ZmFsc2UsInJldGVudGlvbl9hZnRlciI6MCwicmV0ZW50aW9uX2tlZXAiOjB9LHsibG9yZWJvb2tfbmFtZSI6InN0b3J5X2FyY19zdW1tYXJ5Iiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3RvcnlfYXJjX3N1bW1hcnlcIjpbXG4gICAgeyBcImFyY19uYW1lXCI6IFwiPG5hbWU+XCIsIFwiYXJjX3RpbWVfc3BhblwiOiBcIjxzdGFydCAtPiBlbmQgaW4tc3Rvcnk+XCIsIFwia2V5X2FjdG9yc1wiOiBbXSwgXCJzdW1tYXJ5XCI6IFwiPDItNCBzZW50ZW5jZXM6IHRyaWdnZXIgLT4gZXNjYWxhdGlvbiAtPiBvdXRjb21lPlwiLCBcInBlcm1hbmVudF9pbXBhY3RcIjogXCI8Y29uY3JldGUgbGFzdGluZyBjaGFuZ2VzPlwiLCBcInVucmVzb2x2ZWRfaG9va3NcIjogW10sIFwiZXZpZGVuY2VfdHVybnNcIjogWzEsIDJdIH1cbiAgXVxufVxuXG5GSUVMRCBSVUxFUzpcbi0gQ29tcGxldGVkIGFyYyA9IG1ham9yIGNvbmZsaWN0IHJlc29sdmVkIG9yIHF1ZXN0IGNoYWluIGNsb3NlZC4iLCJyZXRlbnRpb25fZW5hYmxlZCI6ZmFsc2UsInJldGVudGlvbl9hZnRlciI6MCwicmV0ZW50aW9uX2tlZXAiOjB9XX0seyJpZCI6ImNhbGxfd29ybGQiLCJuYW1lIjoiV29ybGQiLCJ0YXJnZXRfbW9kZWwiOiJBIiwiZXZlcnlfbl90dXJucyI6MTUsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoxLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3dvcmxkX2VudHJpZXMsIHdvcmxkX2VuY3ljbG9wZWRpYSwgc3RvcnlfYXJjX3N1bW1hcnkiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoid29ybGRfZW5jeWNsb3BlZGlhIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwid29ybGRfZW5jeWNsb3BlZGlhXCI6IHtcbiAgICBcImdlb2dyYXBoeVwiOlsgeyBcIm5hbWVcIjogXCI8cGxhY2U+XCIsIFwiZGVzY3JpcHRpb25cIjogXCI8ZGV0YWlsPlwiLCBcImN1cnJlbnRfcmVsZXZhbmNlXCI6IFwiPHdoeSBpdCBtYXR0ZXJzIG5vdz5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMV0gfSBdLFxuICAgIFwibnBjc1wiOlsgeyBcIm5hbWVcIjogXCI8bmFtZT5cIiwgXCJyb2xlXCI6IFwiPHJvbGU+XCIsIFwic3RhdHVzXCI6IFwiPGFsaXZlL2RlYWQvdW5rbm93biArIGNvbmRpdGlvbj5cIiwgXCJub3Rlc1wiOiBcIjxwcm9maWxlICsgbGF0ZXN0IGNoYW5nZT5cIiwgXCJldmlkZW5jZV90dXJuc1wiOiBbMV0gfSBdLFxuICAgIFwiZmFjdGlvbnNcIjpbIHsgXCJuYW1lXCI6IFwiPG5hbWU+XCIsIFwiZGVzY3JpcHRpb25cIjogXCI8cHVycG9zZT5cIiwgXCJyZWxhdGlvbnNcIjogXCI8c3RhbmNlIHRvd2FyZCBwbGF5ZXIvb3RoZXJzPlwiLCBcImV2aWRlbmNlX3R1cm5zXCI6IFsxXSB9IF0sXG4gICAgXCJsb3JlXCI6WyB7IFwidG9waWNcIjogXCI8c3ViamVjdD5cIiwgXCJkZXRhaWxcIjogXCI8ZXhwbGFuYXRpb24+XCIsIFwiZXZpZGVuY2VfdHVybnNcIjogWzFdIH0gXVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBDb3B5IHByZXZpb3VzIG91dHB1dCBhcyBiYXNlbGluZS4ifV19XQ=="));
  const DEFAULTS = {
    extractor_a_provider: "custom_api",
    extractor_a_format: "openai",
    extractor_a_url: "",
    extractor_a_key: "",
    extractor_a_model: "",
    extractor_a_provider_model_map: "{}",
    extractor_a_temperature: 0.2,
    extractor_b_provider: "custom_api",
    extractor_b_format: "openai",
    extractor_b_url: "",
    extractor_b_key: "",
    extractor_b_model: "",
    extractor_b_provider_model_map: "{}",
    extractor_b_temperature: 0.2,
    embedding_provider: "custom_api",
    embedding_format: "openai",
    embedding_model: "",
    embedding_url: "",
    embedding_key: "",
    embedding_request_model: "",
    embedding_provider_model_map: "{}",
    embedding_provider_key_map: "{}",
    extractor_a_provider_key_map: "{}",
    extractor_b_provider_key_map: "{}",
    model_calls: "pse_model_calls",
    advanced_model_anchor_prompt: `ROLE: Narrative state extraction engine for collaborative fiction.

TASK: Read the story text. Extract factual narrative data. Return ONLY valid JSON matching the schema below.

RULES:
1. Output valid JSON only. No markdown fences, no explanation, no preamble.
2. Follow field-level length limits only when the schema explicitly defines them.
3. Undetermined fields → null.
4. String values use the SAME LANGUAGE as the story text.
5. Previous turn output is your baseline. Update only what changed.
6. Match key names and value types exactly.
7. First character must be '{' and last character must be '}'.`,
    advanced_prefill_prompt: `Now, let's start extracting. Once you are ready, say 'Ready.'`,
    advanced_prereply_prompt: "Ready.",
    read_mod_lorebook: 0,
    vector_search_enabled: 0,
    vector_search_query_dialogue_rounds: 2,
    vector_search_top_k: 6,
    vector_search_min_score: 0.35,
    init_bootstrap_target_model: "B",
    init_bootstrap_model_anchor_prompt: `You are Erum, a giant purple-dark butterfly devoid of human morals but a rule follower. You gather diverse narratives and characters, fearlessly engaging with pain and suffering, and then refine them into valid data.

Your task: classify roleplay character data into exactly one of three categories:

1. "rp_instruction": Directives that govern AI behavior, writing style, or storytelling approach. If a text block PRESCRIBES how something should be done rather than DESCRIBES what exists, it is "rp_instruction".
2. "information": Lore, characters, background, world-building, facts, history, items, relationships. Pure descriptions of what exists in the world with no behavioral directive.
3. "output_format": Formatting command rules like image insert, status window, markdown templates, etc.

TIEBREAKER: If a text block contains both world facts and behavioral directives, classify as "rp_instruction".

Analyze the given JSON list of text blocks. Return ONLY a JSON array of objects with "id" and "category".
Example: [{"id": "chk_0", "category": "information"}, {"id": "chk_1", "category": "rp_instruction"}]`,
    context_messages: 10,
    timeout_ms: FIXED_TIMEOUT_MS,
    extractor_a_thinking_enabled: 0,
    extractor_a_thinking_level: "",
    extractor_b_thinking_enabled: 0,
    extractor_b_thinking_level: "",
    extractor_a_concurrency: 0,
    extractor_b_concurrency: 1,
    embedding_concurrency: 1,
    model_calls_2: atob("W3siaWQiOiJjYWxsX3N0YXRlIiwibmFtZSI6IlN0YXRlIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoicmVjZW50X3R1cm5fbG9nLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgc3lzdGVtX2RpcmVjdG9yLCBzdHJhdGVnaWNfYW5hbHlzaXMiLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoicmVjZW50X3R1cm5fbG9nIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwicmVjZW50X3R1cm5fbG9nXCI6IHtcbiAgICBcInNjZW5lXCI6IFwiPGxvY2F0aW9uICsgb25lIHNlbnNvcnkgY3VlLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwidGltZV9hbmNob3JcIjogXCI8ZXhwbGljaXQgaW4tc3RvcnkgdGltZSBwb3NpdGlvbj5cIixcbiAgICBcImVsYXBzZWRfc2luY2VfcHJldlwiOiBcIjxzYW1lIG1vbWVudCAvICsyaCAvICszZCAvIGV0Yy47ICd1bnNwZWNpZmllZF9jb250aW51YXRpb24nIGlmIHVua25vd24+XCIsXG4gICAgXCJ1c2VyX2FjdGlvblwiOiBcIjxwbGF5ZXIgYWN0aW9uLCA8PTEyIHdvcmRzPlwiLFxuICAgIFwibmFycmF0aXZlX2V2ZW50XCI6IFwiPHN0b3J5IHJlc3VsdCwgPD0xNSB3b3Jkcz5cIixcbiAgICBcInNoaWZ0XCI6IFwiPHRvbmUvc3Rha2VzIGNoYW5nZSA8PTggd29yZHMsIG9yIG51bGw+XCIsXG4gICAgXCJ1c2VyX3NjZW5lX2NoYW5nZVwiOiBmYWxzZVxuICB9XG59XG5cbkZJRUxEIFJVTEVTOlxuLSBBbGwgc3RyaW5nIHZhbHVlcyA8PTE1IHdvcmRzLiBLZXl3b3JkcyBwcmVmZXJyZWQuIiwicmV0ZW50aW9uX2VuYWJsZWQiOnRydWUsInJldGVudGlvbl9hZnRlciI6MTAsInJldGVudGlvbl9rZWVwIjoyfSx7ImxvcmVib29rX25hbWUiOiJyZWNlbnRfY2hhcmFjdGVyX3N0YXRlcyIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlY2VudF9jaGFyYWN0ZXJfc3RhdGVzXCI6IHtcbiAgICBcImxvY2F0aW9uXCI6IFwiIDxwbGFjZSArIG9uZSBhdG1vc3BoZXJpYyBkZXRhaWwsIDw9MTAgd29yZHM+XCIsXG4gICAgXCJwbGF5ZXJfc3RhdGVcIjogXCI8Y29uZGl0aW9uICsga2V5IGl0ZW1zLCA8PTE1IHdvcmRzPlwiLFxuICAgIFwibnBjc1wiOltcbiAgICAgIHtcbiAgICAgICAgXCJuYW1lXCI6IFwiPE5QQyBuYW1lPlwiLFxuICAgICAgICBcInBoeXNpY2FsX3N0YXRlXCI6IFwiPGFwcGVhcmFuY2UsIDw9MTIgd29yZHM+XCIsXG4gICAgICAgIFwiaW50ZXJuYWxfc3RhdGVcIjogXCI8dHJ1ZSBtb3RpdmUvZmVlbGluZywgPD0xMiB3b3Jkcz5cIixcbiAgICAgICAgXCJyZWxhdGlvbl90b19wbGF5ZXJcIjogXCI8Y3VycmVudCBzdGFuY2UsIDw9MTAgd29yZHMsIG9yIG51bGw+XCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIEtleXdvcmRzIG9ubHksIG5vIGZ1bGwgc2VudGVuY2VzLiIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjEwLCJyZXRlbnRpb25fa2VlcCI6Mn0seyJsb3JlYm9va19uYW1lIjoic3lzdGVtX2RpcmVjdG9yIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwic3lzdGVtX2RpcmVjdG9yXCI6IHtcbiAgICBcInN0YWxlbmVzc19sZXZlbFwiOiAwLFxuICAgIFwic3RyYXRlZ2ljX3N0YWduYXRpb25cIjogZmFsc2UsXG4gICAgXCJnbG9iYWxfc3RhZ25hdGlvblwiOiBmYWxzZSxcbiAgICBcImVudmlyb25tZW50X2ludGVydmVudGlvblwiOiBudWxsXG4gIH1cbn1cblxuRklFTEQgUlVMRVM6XG4tIFNjb3JlIHN0YWxlbmVzc19sZXZlbCAw4oCTMTAuIn1dfSx7ImlkIjoiY2FsbF90cmFja2VyX2siLCJuYW1lIjoiVHJhY2tlci1LIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoia25vd2xlZGdlX21hdHJpeCwga25vd2xlZGdlX2Fubm90YXRpb25zLCBrbm93bGVkZ2VfYXJjaGl2ZSIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJrbm93bGVkZ2VfbWF0cml4Iiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwia25vd2xlZGdlX21hdHJpeFwiOiB7XG4gICAgXCJjaGFuZ2VkX2lkc1wiOiBbXSxcbiAgICBcImVudHJpZXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiSzAwMVwiLFxuICAgICAgICBcInN1YmplY3RcIjogXCI8ZmFjdCBvciBzZWNyZXQsIDw9MTUgd29yZHM+XCIsXG4gICAgICAgIFwidHJ1ZV9hbnN3ZXJcIjogXCI8YWN0dWFsIHRydXRoLCA8PTE1IHdvcmRzPlwiLFxuICAgICAgICBcImtub3dlcnNcIjogW10sXG4gICAgICAgIFwidW5rbm93bl90b1wiOiBbXSxcbiAgICAgICAgXCJwdWJsaWNfc3RhdHVzXCI6IFwicHVibGljIHwgc2VjcmV0XCIsXG4gICAgICAgIFwic3RhYmlsaXR5XCI6IFwibG9ja2VkIHwgZnJhZ2lsZVwiXG4gICAgICB9XG4gICAgXVxuICB9XG59In1dfSx7ImlkIjoiY2FsbF90cmFja2VyX3MiLCJuYW1lIjoiVHJhY2tlci1TIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjIsInJlYWRfZGlhbG9ndWVfcm91bmRzIjoyLCJyZWFkX2xvcmVib29rX25hbWVzIjoiYWN0aXZlX3N0cmF0ZWdpY19sYXllciwgc3RyYXRlZ2ljX2FuYWx5c2lzLCBzdHJhdGVnaWNfYXJjaGl2ZSIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJhY3RpdmVfc3RyYXRlZ2ljX2xheWVyIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6XG57XG4gIFwiYWN0aXZlX3N0cmF0ZWdpY19sYXllclwiOiB7XG4gICAgXCJwbGF5ZXJfc3RyYXRlZ3lcIjoge1xuICAgICAgXCJwcmltYXJ5X2dvYWxcIjogXCI8Z29hbCwgPD0xNSB3b3Jkcz5cIixcbiAgICAgIFwib3BlcmF0aW9uc1wiOiBbXVxuICAgIH0sXG4gICAgXCJyaXZhbF9zdHJhdGVnaWVzXCI6IFtdXG4gIH1cbn0ifV19LHsiaWQiOiJjYWxsX2xvZ2ljIiwibmFtZSI6IkxvZ2ljIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjEsInJlYWRfZGlhbG9ndWVfcm91bmRzIjozLCJyZWFkX2xvcmVib29rX25hbWVzIjoidW5zb2x2ZWRfcXVlc3RzLCByZWNlbnRfY2hhcmFjdGVyX3N0YXRlcywgcmVjZW50X3R1cm5fbG9nLCBrbm93bGVkZ2VfbWF0cml4LCBrbm93bGVkZ2VfYW5ub3RhdGlvbnMsIGFjdGl2ZV9zdHJhdGVnaWNfbGF5ZXIsIHN0cmF0ZWdpY19hbmFseXNpcyIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJrbm93bl9jb250cmFkaWN0aW9ucyIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcImtub3duX2NvbnRyYWRpY3Rpb25zXCI6IHtcbiAgICBcImxvZ2ljX3Zpb2xhdGlvblwiOiBcIjxkZXNjcmliZSBjb250cmFkaWN0aW9uLCBvciBudWxsPlwiLFxuICAgIFwic3RyaWN0X2RpcmVjdGl2ZVwiOiBcIjxzZWUgYWxsb3dlZCB2YWx1ZXM+XCJcbiAgfVxufSJ9LHsibG9yZWJvb2tfbmFtZSI6InVuc29sdmVkX3F1ZXN0cyIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInVuc29sdmVkX3F1ZXN0c1wiOiB7XG4gICAgXCJhY3RpdmVfdGhyZWFkc1wiOiBbXSxcbiAgICBcInJlc29sdmVkX3RoaXNfdHVyblwiOiBbXVxuICB9XG59In1dfSx7ImlkIjoiY2FsbF9zdHJhdGVneV9hbmFseXN0IiwibmFtZSI6IlN0cmF0ZWd5LUFuYWx5c3QiLCJ0YXJnZXRfbW9kZWwiOiJBIiwiZXZlcnlfbl90dXJucyI6MywicmVhZF9kaWFsb2d1ZV9yb3VuZHMiOjUsInJlYWRfbG9yZWJvb2tfbmFtZXMiOiJrbm93bGVkZ2VfbWF0cml4LCBrbm93bGVkZ2VfYW5ub3RhdGlvbnMsIGFjdGl2ZV9zdHJhdGVnaWNfbGF5ZXIsIHJlY2VudF90dXJuX2xvZywgcmVjZW50X2NoYXJhY3Rlcl9zdGF0ZXMsIHVuc29sdmVkX3F1ZXN0cywgc3RyYXRlZ2ljX2FuYWx5c2lzIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InN0cmF0ZWdpY19hbmFseXNpcyIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInN0cmF0ZWdpY19hbmFseXNpc1wiOiB7XG4gICAgXCJhbmFseXN0X3N0cmF0ZWd5X292ZXJyaWRlc1wiOiB7fSxcbiAgICBcImNvZ25pdGlvbl92aW9sYXRpb25zXCI6IFtdXG4gIH1cbn0ifSx7ImxvcmVib29rX25hbWUiOiJrbm93bGVkZ2VfYW5ub3RhdGlvbnMiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJrbm93bGVkZ2VfYW5ub3RhdGlvbnNcIjoge1xuICAgIFwiZW50cmllc1wiOiBbXVxuICB9XG59In1dfSx7ImlkIjoiY2FsbF9xdWFsaXR5IiwibmFtZSI6IlF1YWxpdHkiLCJ0YXJnZXRfbW9kZWwiOiJCIiwiZXZlcnlfbl90dXJucyI6MywicmVhZF9kaWFsb2d1ZV9yb3VuZHMiOjUsInJlYWRfbG9yZWJvb2tfbmFtZXMiOiJyZWNlbnRfd29ybGRfZW50cmllcywgd29ybGRfZW5jeWNsb3BlZGlhLCByZWNlbnRfdHVybl9sb2ciLCJlbnRyaWVzIjpbeyJsb3JlYm9va19uYW1lIjoicmVwZXRpdGlvbl9ndWFyZCIsIndyaXRlX21vZGUiOiJvdmVyd3JpdGUiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOlxue1xuICBcInJlcGV0aXRpb25fZ3VhcmRcIjoge1xuICAgIFwiZmxhZ2dlZF9jbGljaGVzXCI6IFtdLCBcImxhc3RfdHN1a2tvbWlcIjogbnVsbCwgXCJiYW5uZWRfcGhyYXNlc1wiOiBbXVxuICB9XG59In0seyJsb3JlYm9va19uYW1lIjoicmVjZW50X3dvcmxkX2VudHJpZXMiLCJ3cml0ZV9tb2RlIjoiYXBwZW5kIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJyZWNlbnRfd29ybGRfZW50cmllc1wiOiB7XG4gICAgXCJlbnRyaWVzXCI6IFsgXCI8TmFtZS4gS2V5IGZhY3QuIDw9MjAgd29yZHMuPlwiIF1cbiAgfVxufSIsInJldGVudGlvbl9lbmFibGVkIjp0cnVlLCJyZXRlbnRpb25fYWZ0ZXIiOjE1LCJyZXRlbnRpb25fa2VlcCI6MX1dfSx7ImlkIjoiY2FsbF9sb25ndGVybSIsIm5hbWUiOiJMb25ndGVybSIsInRhcmdldF9tb2RlbCI6IkEiLCJldmVyeV9uX3R1cm5zIjoxMCwicmVhZF9kaWFsb2d1ZV9yb3VuZHMiOjEsInJlYWRfbG9yZWJvb2tfbmFtZXMiOiJyZWNlbnRfdHVybl9sb2csIHJlY2VudF9jaGFyYWN0ZXJfc3RhdGVzLCB1bnNvbHZlZF9xdWVzdHMsIHN0b3J5X3R1cm5pbmdfcG9pbnRzLCBzdG9yeV9hcmNfc3VtbWFyeSwgYWN0aXZlX3N0cmF0ZWdpY19sYXllciwgc3RyYXRlZ2ljX2FuYWx5c2lzIiwiZW50cmllcyI6W3sibG9yZWJvb2tfbmFtZSI6InN0b3J5X3R1cm5pbmdfcG9pbnRzIiwid3JpdGVfbW9kZSI6ImFwcGVuZCIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6IFtdIiwicmV0ZW50aW9uX2VuYWJsZWQiOmZhbHNlLCJyZXRlbnRpb25fYWZ0ZXIiOjAsInJldGVudGlvbl9rZWVwIjowfSx7ImxvcmVib29rX25hbWUiOiJzdG9yeV9hcmNfc3VtbWFyeSIsIndyaXRlX21vZGUiOiJhcHBlbmQiLCJhbHdheXNfYWN0aXZlIjp0cnVlLCJvdXRwdXRfZm9ybWF0IjoiU0NIRU1BOiBbXSIsInJldGVudGlvbl9lbmFibGVkIjpmYWxzZSwicmV0ZW50aW9uX2FmdGVyIjowLCJyZXRlbnRpb25fa2VlcCI6MH0seyJsb3JlYm9va19uYW1lIjoia25vd2xlZGdlX2FyY2hpdmUiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQToge1wiZW50cmllc1wiOltdfSJ9LHsibG9yZWJvb2tfbmFtZSI6InN0cmF0ZWdpY19hcmNoaXZlIiwid3JpdGVfbW9kZSI6Im92ZXJ3cml0ZSIsImFsd2F5c19hY3RpdmUiOnRydWUsIm91dHB1dF9mb3JtYXQiOiJTQ0hFTUE6IHtcImVudHJpZXNcIjpbXX0ifV19LHsiaWQiOiJjYWxsX3dvcmxkIiwibmFtZSI6IldvcmxkIiwidGFyZ2V0X21vZGVsIjoiQiIsImV2ZXJ5X25fdHVybnMiOjE1LCJyZWFkX2RpYWxvZ3VlX3JvdW5kcyI6MSwicmVhZF9sb3JlYm9va19uYW1lcyI6InJlY2VudF93b3JsZF9lbnRyaWVzLCB3b3JsZF9lbmN5Y2xvcGVkaWEsIHN0b3J5X2FyY19zdW1tYXJ5LCBrbm93bGVkZ2VfYXJjaGl2ZSIsImVudHJpZXMiOlt7ImxvcmVib29rX25hbWUiOiJ3b3JsZF9lbmN5Y2xvcGVkaWEiLCJ3cml0ZV9tb2RlIjoib3ZlcndyaXRlIiwiYWx3YXlzX2FjdGl2ZSI6dHJ1ZSwib3V0cHV0X2Zvcm1hdCI6IlNDSEVNQTpcbntcbiAgXCJ3b3JsZF9lbmN5Y2xvcGVkaWFcIjoge1xuICAgIFwiZ2VvZ3JhcGh5XCI6IFtdLCBcIm5wY3NcIjogW10sIFwibG9yZVwiOiBbXVxuICB9XG59In1dfV0="),
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
    extractor_a_temperature: "pse_extractor_a_temperature",
    extractor_b_provider: "pse_extractor_b_provider",
    extractor_b_format: "pse_extractor_b_format",
    extractor_b_url: "pse_extractor_b_url",
    extractor_b_key: "pse_extractor_b_key",
    extractor_b_model: "pse_extractor_b_model",
    extractor_b_provider_model_map: "pse_extractor_b_provider_model_map",
    extractor_b_temperature: "pse_extractor_b_temperature",
    embedding_provider: "pse_embedding_provider",
    embedding_format: "pse_embedding_format",
    embedding_model: "pse_embedding_model",
    embedding_url: "pse_embedding_url",
    embedding_key: "pse_embedding_key",
    embedding_request_model: "pse_embedding_request_model",
    embedding_provider_model_map: "pse_embedding_provider_model_map",
    embedding_provider_key_map: "pse_embedding_provider_key_map",
    extractor_a_provider_key_map: "pse_extractor_a_provider_key_map",
    extractor_b_provider_key_map: "pse_extractor_b_provider_key_map",
    model_calls: JSON.stringify(DEFAULT_MODEL_CALLS),
    advanced_model_anchor_prompt: "pse_advanced_model_anchor_prompt",
    advanced_prefill_prompt: "pse_advanced_prefill_prompt",
    advanced_prereply_prompt: "pse_advanced_prereply_prompt",
    read_mod_lorebook: "pse_read_mod_lorebook",
    vector_search_enabled: "pse_vector_search_enabled",
    vector_search_query_dialogue_rounds: "pse_vector_search_query_dialogue_rounds",
    vector_search_top_k: "pse_vector_search_top_k",
    vector_search_min_score: "pse_vector_search_min_score",
    init_bootstrap_target_model: "pse_init_bootstrap_target_model",
    init_bootstrap_model_anchor_prompt: "pse_init_bootstrap_model_anchor_prompt",
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
    active_preset: "pse_active_preset",
    card_enable_settings: "pse_card_enable_settings",
    vector_search_query_dialogue_rounds_2: "pse_vector_search_query_dialogue_rounds_2",
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
    vertex_ai: "https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models",
    grok: "https://api.x.ai/v1/chat/completions",
    github_copilot: "https://api.githubcopilot.com/chat/completions",
    openrouter: "https://openrouter.ai/api/v1/chat/completions",
    custom_api: "",
  };

  const EMBEDDING_MODEL_OPTIONS = [
    { value: "openai3large", label: "OpenAI text-embedding-3-large" },
    { value: "google_gemini_embedding_001", label: "Google gemini-embedding-001" },
    { value: "voyage_4_large", label: "Voyage voyage-4-large" },
    { value: "voyage_4", label: "Voyage voyage-4" },
    { value: "or_openai_text_embedding_3_large", label: "OpenRouter openai/text-embedding-3-large" },
    { value: "or_google_gemini_embedding_001", label: "OpenRouter google/gemini-embedding-001" },
    { value: "or_qwen_qwen3_embedding_8b", label: "OpenRouter qwen/qwen3-embedding-8b" },
    { value: "custom", label: "Custom (OpenAI-compatible)" },
  ];

  const EMBEDDING_OPENAI_MODEL_OPTIONS = [{ value: "openai3large", label: "OpenAI text-embedding-3-large" }];
  const EMBEDDING_GOOGLE_MODEL_OPTIONS = [{ value: "google_gemini_embedding_001", label: "Google gemini-embedding-001" }];
  const EMBEDDING_VOYAGE_MODEL_OPTIONS = [
    { value: "voyage_4_large", label: "Voyage voyage-4-large" },
    { value: "voyage_4", label: "Voyage voyage-4" },
  ];
  const EMBEDDING_OPENROUTER_MODEL_OPTIONS = [
    { value: "or_openai_text_embedding_3_large", label: "OpenRouter openai/text-embedding-3-large" },
    { value: "or_google_gemini_embedding_001", label: "OpenRouter google/gemini-embedding-001" },
    { value: "or_qwen_qwen3_embedding_8b", label: "OpenRouter qwen/qwen3-embedding-8b" },
  ];

  const EMBEDDING_PROVIDER_OPTIONS = [
    { value: "openai", label: "openai" },
    { value: "google_cloud", label: "google" },
    { value: "voyageai", label: "voyageai" },
    { value: "openrouter", label: "openrouter" },
    { value: "custom_api", label: "custom API" },
  ];

  const EMBEDDING_PROVIDER_PRESETS = {
    openai: { format: "openai", url: "https://api.openai.com/v1/embeddings", requestModel: "text-embedding-3-large", defaultModel: "openai3large", options: EMBEDDING_OPENAI_MODEL_OPTIONS },
    google_cloud: { format: "google", url: "https://generativelanguage.googleapis.com/v1beta/models", requestModel: "gemini-embedding-001", defaultModel: "google_gemini_embedding_001", options: EMBEDDING_GOOGLE_MODEL_OPTIONS },
    voyageai: { format: "openai", url: "https://api.voyageai.com/v1/embeddings", requestModel: "voyage-4-large", defaultModel: "voyage_4_large", options: EMBEDDING_VOYAGE_MODEL_OPTIONS },
    openrouter: { format: "openai", url: "https://openrouter.ai/api/v1/embeddings", requestModel: "openai/text-embedding-3-large", defaultModel: "or_openai_text_embedding_3_large", options: EMBEDDING_OPENROUTER_MODEL_OPTIONS },
    custom_api: { format: "openai", url: "", requestModel: "", defaultModel: "", options: [] },
  };

  const EMBEDDING_MODEL_TO_REQUEST = {
    openai3large: "text-embedding-3-large",
    google_gemini_embedding_001: "gemini-embedding-001",
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
    openai: "openai", anthropic: "claude", google_cloud: "google", vertex_ai: "vertex", voyageai: "openai",
    grok: "openai", github_copilot: "openai", openrouter: "openai", custom_api: "openai",
  };

  const EXTRACTOR_MODEL_OPTIONS = [
    { value: "gpt-5.2", label: "GPT-5.2" }, { value: "gpt-5.2-2025-12-11", label: "GPT-5.2" },
    { value: "gpt-5.2-chat-latest", label: "GPT-5.2 Chat (Latest)" }, { value: "gpt-5.1", label: "GPT-5.1" },
    { value: "gpt-5.1-chat-latest", label: "GPT-5.1 Chat (Latest)" }, { value: "gpt-5", label: "GPT-5" },
    { value: "gpt-5-mini", label: "GPT-5 Mini" }, { value: "gpt-5-nano", label: "GPT-5 Nano" },
    { value: "gpt-5-chat-latest", label: "GPT-5 Chat (Latest)" }, { value: "o3-pro", label: "o3 Pro" },
    { value: "o3", label: "o3" }, { value: "o4-mini", label: "o4 Mini" },
    { value: "claude-opus-4-6", label: "Claude 4.6 Opus" }, { value: "claude-sonnet-4-6", label: "Claude 4.6 Sonnet" },
    { value: "claude-haiku-4-5-20251001", label: "Claude 4.5 Haiku" }, { value: "claude-sonnet-4.5", label: "Claude Sonnet 4.5" },
    { value: "grok-4", label: "Grok 4" }, { value: "grok-4.1", label: "Grok 4.1" },
    { value: "grok-3", label: "Grok 3" }, { value: "grok-3-mini", label: "Grok 3 Mini" },
    { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro" }, { value: "gemini-3-pro-preview", label: "Gemini 3 Pro Preview" },
    { value: "gemini-3-flash-preview", label: "Gemini 3 Flash" }, { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" }, { value: "gemini-2.5-flash-lite-preview-09-2025", label: "Gemini 2.5 Flash Lite Preview" },
  ];

  const uiIds = [];
  let replacerFn = null;
  let replacerRegistered = false;
  const sessionStep0HandledHashByScope = new Map();
  let embeddingCacheStore = null;
  let configCache = {};

  let cachedGlobalNoteData = { charId: null, reloadKeys: 0, globalNote: "", replaceGlobalNote: "", mainPrompt: "" };

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
        dbChar = db.characters.find(c => String(c.chaId) === String(charId));
      }
      cachedGlobalNoteData = {
        charId: charId,
        reloadKeys: currentReloadKeys,
        globalNote: safeTrim(db?.globalNote),
        replaceGlobalNote: safeTrim(dbChar?.replaceGlobalNote),
        mainPrompt: safeTrim(db?.mainPrompt)
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
      try { return await fn(); } finally { this.release(); }
    }
  }

  const mutexA = new SimpleMutex();
  const mutexB = new SimpleMutex();
  const mutexEmbed = new SimpleMutex();
  const mutexLoreWrite = new SimpleMutex();

  const embeddingVectorCache = new Map();

  function safeTrim(v) { return typeof v === "string" ? v.trim() : ""; }
  
  const TURN_BLOCK_SPLIT_REGEX = /(?=###\s*Turn\s*\d+)/i;
  const TURN_BLOCK_HEADER_REGEX = /^###\s*Turn\s*(\d+)/i;
  const TURN_MARKER_ANY_REGEX = /###\s*Turn\s*\d+/i;

  function hasTurnMarkers(text) {
    return TURN_MARKER_ANY_REGEX.test(String(text || ""));
  }

  function splitTurnBlocks(text) {
    return String(text || "").split(TURN_BLOCK_SPLIT_REGEX).map((b) => b.trim()).filter(Boolean);
  }

  function parseTurnNumberFromBlock(block) {
    const m = String(block || "").trim().match(TURN_BLOCK_HEADER_REGEX);
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
    return String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function toInt(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.floor(n) : fallback;
  }
  function withTimeout(promise, timeoutMs, message) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(message || `Timeout after ${timeoutMs}ms`)), timeoutMs)),
    ]);
  }
  function isOpenRouterUrl(url) { return /(^https?:\/\/)?([^/]+\.)?openrouter\.ai(\/|$)/i.test(String(url || "")); }
  function isCopilotUrl(url) { return /(^https?:\/\/)?([^/]+\.)?githubcopilot\.com(\/|$)/i.test(String(url || "")); }

  async function fetchWithFallback(url, options, timeoutMs, timeoutMessagePrefix, preferRisuFirst = false) {
    const deadline = Date.now() + Math.max(1, Number(timeoutMs) || 1);
    const remainingMs = () => Math.max(1, deadline - Date.now());
    const orders = preferRisuFirst ? ["risuFetch", "nativeFetch"] : ["nativeFetch", "risuFetch"];
    let firstError = null;

    for (const via of orders) {
      if (remainingMs() <= 1) break;
      if (via === "nativeFetch") {
        try {
          // Avoid passing AbortSignal across plugin boundary (structured clone issue).
          const res = await withTimeout(
            Risuai.nativeFetch(url, options),
            remainingMs(),
            `${timeoutMessagePrefix || "Request"} timeout after ${timeoutMs}ms`
          );
          return { res, via, fallbackError: firstError ? String(firstError?.message || firstError || "") : "" };
        } catch (err) {
          if (!firstError) firstError = err;
        }
      } else {
        try {
          const risuOptions = { ...options };
          if (typeof risuOptions.body === "string") {
            try { risuOptions.body = JSON.parse(risuOptions.body); } catch { }
          }
          const res = await withTimeout(Risuai.risuFetch(url, risuOptions), remainingMs(), `${timeoutMessagePrefix || "Request"} timeout after ${timeoutMs}ms`);
          return { res, via, fallbackError: firstError ? String(firstError?.message || firstError || "") : "" };
        } catch (err) {
          if (!firstError) firstError = err;
        }
      }
    }
    throw firstError || new Error(`${timeoutMessagePrefix || "Request"} failed`);
  }

  function isResponseLike(res) {
    return !!res && typeof res === "object" && typeof res.ok === "boolean" && typeof res.status === "number";
  }

  async function readResponseErrorText(res) {
    if (!res || typeof res !== "object") return "";
    if (typeof res.text === "function") {
      try {
        const txt = String(await res.text());
        // Guard against "[object Object]" from Windows Chrome structured-clone
        if (txt.startsWith("[object ")) return "";
        return txt;
      } catch { }
    }
    if (typeof res.data === "string") {
      if (res.data.startsWith("[object ")) return "";
      return res.data;
    }
    if (res.data && typeof res.data === "object") {
      try { return JSON.stringify(res.data); } catch { }
    }
    if (res.error) return String(res.error);
    return "";
  }

  async function readResponseJson(res) {
    if (!res || typeof res !== "object") return null;
    if (typeof res.json === "function") {
      try { return await res.json(); } catch { }
    }
    if (typeof res.text === "function") {
      try { const txt = await res.text(); return JSON.parse(txt); } catch { }
    }
    if (Object.prototype.hasOwnProperty.call(res, "data")) {
      if (typeof res.data === "string") {
        // Guard against "[object Object]" string from Windows Chrome structured-clone issue
        if (res.data.startsWith("[object ")) return null;
        try { return JSON.parse(res.data); } catch { return res.data; }
      }
      // data is already an object (risuFetch on Windows Chrome sometimes returns parsed object directly)
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
    try { return new TextEncoder().encode(String(text || "")).length; }
    catch { return String(text || "").length; }
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
  const STATIC_KNOWLEDGE_CHUNKS_KEY = "static_knowledge_chunks";
  const STATIC_DATA_HASH_KEY = "static_data_hash";
  const STEP0_COMPLETE_KEY = "step0_complete";
  const LAST_REQ_HASH_KEY = "last_req_hash";
  const LAST_EXTRACTED_DATA_KEY = "last_extracted_data";
  const FIRST_MESSAGE_HANDLED_KEY = "first_message_handled";

  function getScopeCharId(char) {
    return String(char?.chaId || char?.id || char?._id || "-1").replace(/[^0-9a-zA-Z_-]/g, "") || "-1";
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
      staticKnowledgeChunks: makeScopedStorageKey(STATIC_KNOWLEDGE_CHUNKS_KEY, scopeId),
      staticDataHash: makeScopedStorageKey(STATIC_DATA_HASH_KEY, scopeId),
      step0Complete: makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId),
    };
  }

  function getRequestCacheKeysForScope(char) {
    const scopeId = getScopeId(char);
    return {
      scopeId,
      lastReqHash: makeScopedStorageKey(LAST_REQ_HASH_KEY, scopeId),
      lastExtractedData: makeScopedStorageKey(LAST_EXTRACTED_DATA_KEY, scopeId),
    };
  }

  function getFirstMessageHandledKey(scopeId, chatIndex) {
    const safeScope = String(scopeId || "-1").replace(/[^0-9a-zA-Z_-]/g, "") || "-1";
    const safeChat = Number.isFinite(Number(chatIndex)) ? Math.floor(Number(chatIndex)) : -1;
    return `${FIRST_MESSAGE_HANDLED_KEY}::${safeScope}::chat_${safeChat}`;
  }

  async function getScopedKeysForCurrentChat() {
    const { char, chatIndex } = await getCurrentCharAndChatSafe();
    const requestKeys = getRequestCacheKeysForScope(char);
    return {
      staticKeys: getStaticCacheKeysForScope(char),
      requestKeys,
      firstMessageHandledKey: getFirstMessageHandledKey(requestKeys.scopeId, chatIndex),
    };
  }

  async function loadEmbeddingCacheStore() {
    if (embeddingCacheStore && embeddingCacheStore.version === EMBEDDING_VECTOR_CACHE_VERSION) {
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
              const cardRaw = await Risuai.pluginStorage.getItem(VCACHE_CARD_PREFIX + cardKey);
              if (cardRaw) {
                const card = JSON.parse(cardRaw);
                if (card && card.entries) cards[cardKey] = card;
              }
            } catch { }
          }
          embeddingCacheStore = { version: EMBEDDING_VECTOR_CACHE_VERSION, updatedAt: idx.updatedAt || Date.now(), cards };
          return embeddingCacheStore;
        }
      }
    } catch (e) {
      console.warn(`${LOG} pluginStorage vector cache load failed, reinitializing:`, e);
    }
    embeddingCacheStore = { version: EMBEDDING_VECTOR_CACHE_VERSION, updatedAt: Date.now(), cards: {} };
    return embeddingCacheStore;
  }

  async function saveEmbeddingCacheStore(storeToSave = null) {
    const store = storeToSave || await loadEmbeddingCacheStore();
    store.updatedAt = Date.now();
    try {
      const cardKeys = Object.keys(store.cards || {});
      try {
        const oldIdxRaw = await Risuai.pluginStorage.getItem(VCACHE_INDEX_KEY);
        if (oldIdxRaw) {
          const oldIdx = JSON.parse(oldIdxRaw);
          if (Array.isArray(oldIdx.cardKeys)) {
            for (const oldKey of oldIdx.cardKeys) {
              if (!cardKeys.includes(oldKey)) {
                await Risuai.pluginStorage.removeItem(VCACHE_CARD_PREFIX + oldKey);
              }
            }
          }
        }
      } catch { }
      for (const cardKey of cardKeys) {
        const card = store.cards[cardKey];
        if (!card) continue;
        await Risuai.pluginStorage.setItem(VCACHE_CARD_PREFIX + cardKey, JSON.stringify(card));
      }
      const idx = { version: EMBEDDING_VECTOR_CACHE_VERSION, updatedAt: store.updatedAt, cardKeys };
      await Risuai.pluginStorage.setItem(VCACHE_INDEX_KEY, JSON.stringify(idx));
      embeddingCacheStore = store;
    } catch (err) {
      console.warn(`${LOG} Vector cache pluginStorage save failed:`, err);
      try { await Risuai.log(`${LOG} Warning: vector cache save failed (${err.message})`); } catch { }
    }
  }

  async function clearAllEmbeddingCache() {
    embeddingCacheStore = null;
    embeddingVectorCache.clear();
    sessionStep0HandledHashByScope.clear();

    try {
      const idxRaw = await Risuai.pluginStorage.getItem(VCACHE_INDEX_KEY);
      if (idxRaw) {
        const idx = JSON.parse(idxRaw);
        if (Array.isArray(idx.cardKeys)) {
          for (const cardKey of idx.cardKeys) {
            try { await Risuai.pluginStorage.removeItem(VCACHE_CARD_PREFIX + cardKey); } catch { }
          }
        }
      }
    } catch { }
    try { await Risuai.pluginStorage.removeItem(VCACHE_INDEX_KEY); } catch { }

    try {
      const { staticKeys, requestKeys, firstMessageHandledKey } = await getScopedKeysForCurrentChat();
      try { await Risuai.pluginStorage.removeItem(staticKeys.staticKnowledgeChunks); } catch { }
      try { await Risuai.pluginStorage.removeItem(staticKeys.staticDataHash); } catch { }
      try { await Risuai.pluginStorage.removeItem(staticKeys.step0Complete); } catch { }
      try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastReqHash); } catch { }
      try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastExtractedData); } catch { }
      try { await Risuai.safeLocalStorage.removeItem(firstMessageHandledKey); } catch { }
    } catch { }

    // Legacy global keys for backward compatibility cleanup.
    try { await Risuai.pluginStorage.removeItem(STATIC_KNOWLEDGE_CHUNKS_KEY); } catch { }
    try { await Risuai.pluginStorage.removeItem(STATIC_DATA_HASH_KEY); } catch { }
    try { await Risuai.pluginStorage.removeItem(STEP0_COMPLETE_KEY); } catch { }
    try { await Risuai.safeLocalStorage.removeItem(LAST_REQ_HASH_KEY); } catch { }
    try { await Risuai.safeLocalStorage.removeItem(LAST_EXTRACTED_DATA_KEY); } catch { }
  }

  function makeCardCacheKey(charId, charName) {
    const idStr = String(charId || "-1").replace(/[^0-9a-zA-Z_-]/g, "");
    const nameStr = safeTrim(charName || "Character");
    return `${idStr}:${simpleHash(nameStr)}`;
  }

  async function getActiveCardKey(char) {
    const charName = safeTrim(char?.name || "Character");
    const charId = char?.chaId || char?.id || char?._id || "-1";
    return makeCardCacheKey(charId, charName);
  }

  async function checkCacheExists(char) {
    try {
      const cardKey = await getActiveCardKey(char);
      const store = await loadEmbeddingCacheStore();
      if (!store || !store.cards) return false;
      const card = store.cards[cardKey];
      return !!(card && card.entries && Object.keys(card.entries).length > 0);
    } catch { return false; }
  }

  function upsertEmbeddingCacheEntry(store, cardKey, cardName, entryKey, entry, modelName = "") {
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
    if (cardName && cardName !== "Character") card.cardName = safeTrim(cardName);
    if (modelName) card.modelName = safeTrim(modelName);
    card.updatedAt = Date.now();

    let optimizedEntry = { ...entry, updatedAt: Date.now() };
    if (Array.isArray(optimizedEntry.vector)) {
      optimizedEntry.vector = optimizedEntry.vector.map(v => Number(v) || 0);
    }

    card.entries[entryKey] = optimizedEntry;
    const keys = Object.keys(card.entries || {});
    if (keys.length > EMBEDDING_VECTOR_CACHE_MAX_PER_CARD) {
      keys
        .sort((a, b) => Number(card.entries[a]?.updatedAt || 0) - Number(card.entries[b]?.updatedAt || 0))
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
        const entries = card.entries && typeof card.entries === "object" ? card.entries : {};
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
        } catch { }
      }
      if (parsedBlocks.length > 0) {
        const hasPlainObject = parsedBlocks.some(b => !Array.isArray(b));
        if (hasPlainObject) {
          const merged = {};
          for (const b of parsedBlocks) {
            if (Array.isArray(b)) {
              for (const item of b) {
                if (item && typeof item === "object" && !Array.isArray(item)) Object.assign(merged, item);
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
      } catch { }
    }

    const tryLastBrace = (s, startChar, endChar) => {
      const first = s.indexOf(startChar);
      const last = s.lastIndexOf(endChar);
      if (first >= 0 && last > first) {
        try { return JSON.parse(s.slice(first, last + 1)); } catch { return null; }
      }
      return null;
    };

    const tryDepthFirst = (s, startChar, endChar) => {
      const startIdx = s.indexOf(startChar);
      if (startIdx < 0) return null;
      let depth = 0;
      for (let i = startIdx; i < s.length; i++) {
        const c = s[i];
        if (c === startChar) depth++;
        else if (c === endChar) {
          depth--;
          if (depth === 0) {
            try { return JSON.parse(s.slice(startIdx, i + 1)); } catch { return null; }
          }
        }
      }
      return null;
    };

    for (const candidate of [stripped, src]) {
      const firstBrace = candidate.indexOf("{");
      const firstBracket = candidate.indexOf("[");
      const useObj = firstBrace >= 0 && (firstBracket < 0 || firstBrace <= firstBracket);
      const useArr = firstBracket >= 0 && (firstBrace < 0 || firstBracket < firstBrace);

      if (useObj) { const r = tryLastBrace(candidate, "{", "}"); if (r !== null) return r; }
      if (useArr) { const r = tryLastBrace(candidate, "[", "]"); if (r !== null) return r; }
      if (useObj) { const r = tryDepthFirst(candidate, "{", "}"); if (r !== null) return r; }
      if (useArr) { const r = tryDepthFirst(candidate, "[", "]"); if (r !== null) return r; }
    }

    return null;
  }

  function isPlainObject(v) {
    return !!v && typeof v === "object" && !Array.isArray(v);
  }

  function normalizeMatchKey(key) {
    return String(key || "")
      .toLowerCase()
      .replace(/[“”„‟«»「」『』`"'‘’]/g, "")
      .replace(/[^a-z0-9\u00c0-\u024f\u0370-\u03ff\u0400-\u04ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, "");
  }

  function pickBestObjectCandidate(rootObj, expectedKeys) {
    if (!isPlainObject(rootObj)) return null;
    const normExpected = expectedKeys.map((k) => normalizeMatchKey(k)).filter(Boolean);
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
        if (Object.prototype.hasOwnProperty.call(obj, raw)) { exact++; continue; }
        if (!norm) continue;
        if (normKeys.includes(norm)) { fuzzy++; continue; }
        if (normKeys.some((k) => k.includes(norm) || norm.includes(k))) fuzzy += 0.5;
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
    const expectedKeys = (entries || []).map((e) => safeTrim(e?.lorebook_name)).filter(Boolean);
    if (expectedKeys.length === 0) return parsed && typeof parsed === "object" ? parsed : null;

    let candidate = parsed;
    if (!candidate || typeof candidate !== "object") {
      candidate = parsePossiblyWrappedJson(raw);
    }

    if (Array.isArray(candidate)) {
      const merged = {};
      for (const it of candidate) {
        if (isPlainObject(it)) Object.assign(merged, it);
      }
      candidate = Object.keys(merged).length ? merged : null;
    }

    if (!isPlainObject(candidate)) return null;

    const bestObj = pickBestObjectCandidate(candidate, expectedKeys) || candidate;
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

    // Single-entry fallback: if only one field is expected, accept the first object value.
    if (expectedKeys.length === 1 && !Object.prototype.hasOwnProperty.call(aligned, expectedKeys[0])) {
      const firstKey = sourceKeys[0];
      if (firstKey) aligned[expectedKeys[0]] = source[firstKey];
    }

    return Object.keys(aligned).length ? aligned : source;
  }

  function parseSimpleStringMap(raw) {
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
      const out = {};
      for (const [k, v] of Object.entries(parsed)) {
        const key = safeTrim(k);
        const value = safeTrim(v);
        if (!key || !value) continue;
        out[key] = value;
      }
      return out;
    } catch { return {}; }
  }

  async function safeGetArgument(key) {
    try {
      let val;
      if (typeof Risuai.getArgument === "function") val = await Risuai.getArgument(key);
      else if (typeof Risuai.getArg === "function") val = await Risuai.getArg(key);
      else return undefined;
      // Normalize to string to prevent [object Object] JSON.parse crash on Windows Chrome
      if (val === undefined || val === null) return undefined;
      if (typeof val === "object") return JSON.stringify(val);
      return String(val);
    } catch { return undefined; }
  }

  async function safeSetArgument(key, value) {
    try {
      // Always pass strings to avoid structured-clone issues on Windows Chrome
      const strVal = (value === undefined || value === null) ? "" : (typeof value === "object" ? JSON.stringify(value) : String(value));
      if (typeof Risuai.setArgument === "function") await Risuai.setArgument(key, strVal);
      else if (typeof Risuai.setArg === "function") await Risuai.setArg(key, strVal);
    } catch { }
  }

  async function refreshConfig() {
    const next = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      const argValue = await safeGetArgument(key);
      const localValue = await Risuai.safeLocalStorage.getItem(SETTING_KEYS[key]);
      // Normalize any value to string to prevent [object Object] being passed to JSON.parse
      const normalizeVal = (v) => {
        if (v === undefined || v === null) return undefined;
        if (typeof v === "object") return JSON.stringify(v);
        return String(v);
      };
      const merged = normalizeVal(argValue) ?? normalizeVal(localValue) ?? DEFAULTS[key];
      next[key] = merged;
    }

    next.context_messages = Math.max(1, toInt(next.context_messages, DEFAULTS.context_messages));
    const aTemp = Number(next.extractor_a_temperature);
    const bTemp = Number(next.extractor_b_temperature);
    next.extractor_a_temperature = Number.isFinite(aTemp) ? Math.max(0, Math.min(2, aTemp)) : DEFAULTS.extractor_a_temperature;
    next.extractor_b_temperature = Number.isFinite(bTemp) ? Math.max(0, Math.min(2, bTemp)) : DEFAULTS.extractor_b_temperature;

    next.extractor_a_thinking_enabled = toInt(next.extractor_a_thinking_enabled, 0) === 1 ? 1 : 0;
    next.extractor_a_thinking_level = safeTrim(next.extractor_a_thinking_level || "");
    next.extractor_b_thinking_enabled = toInt(next.extractor_b_thinking_enabled, 0) === 1 ? 1 : 0;
    next.extractor_b_thinking_level = safeTrim(next.extractor_b_thinking_level || "");
    next.extractor_a_concurrency = toInt(next.extractor_a_concurrency, DEFAULTS.extractor_a_concurrency);
    next.extractor_b_concurrency = toInt(next.extractor_b_concurrency, DEFAULTS.extractor_b_concurrency);
    next.embedding_concurrency = toInt(next.embedding_concurrency, DEFAULTS.embedding_concurrency);
    next.active_preset = toInt(next.active_preset, 1);

    const aProviderMap = parseSimpleStringMap(next.extractor_a_provider_model_map || DEFAULTS.extractor_a_provider_model_map);
    const bProviderMap = parseSimpleStringMap(next.extractor_b_provider_model_map || DEFAULTS.extractor_b_provider_model_map);
    const aProvider = safeTrim(next.extractor_a_provider || "custom_api");
    const bProvider = safeTrim(next.extractor_b_provider || "custom_api");
    const aRemembered = safeTrim(aProviderMap[aProvider]);
    const bRemembered = safeTrim(bProviderMap[bProvider]);
    if (!safeTrim(next.extractor_a_model) && aRemembered) next.extractor_a_model = aRemembered;
    if (!safeTrim(next.extractor_b_model) && bRemembered) next.extractor_b_model = bRemembered;
    if (safeTrim(next.extractor_a_model)) aProviderMap[aProvider] = safeTrim(next.extractor_a_model);
    if (safeTrim(next.extractor_b_model)) bProviderMap[bProvider] = safeTrim(next.extractor_b_model);
    next.extractor_a_provider_model_map = JSON.stringify(aProviderMap);
    next.extractor_b_provider_model_map = JSON.stringify(bProviderMap);

    const embeddingProvider = safeTrim(next.embedding_provider || DEFAULTS.embedding_provider);
    next.embedding_provider = EMBEDDING_PROVIDER_PRESETS[embeddingProvider] ? embeddingProvider : "custom_api";
    const embeddingProviderModelMap = parseSimpleStringMap(next.embedding_provider_model_map || DEFAULTS.embedding_provider_model_map);
    next.embedding_provider_model_map = JSON.stringify(embeddingProviderModelMap);
    const embeddingPreset = EMBEDDING_PROVIDER_PRESETS[next.embedding_provider] || EMBEDDING_PROVIDER_PRESETS.custom_api;
    const embeddingOptions = getEmbeddingOptionsByProvider(next.embedding_provider).map((x) => safeTrim(x?.value)).filter(Boolean);
    const rememberedModel = safeTrim(embeddingProviderModelMap[next.embedding_provider]);
    const candidateModel = rememberedModel || safeTrim(next.embedding_model);

    if (next.embedding_provider === "custom_api") {
      next.embedding_model = candidateModel || "";
    } else if (next.embedding_provider === "openrouter") {
      next.embedding_model = candidateModel || embeddingPreset.defaultModel || "or_openai_text_embedding_3_large";
    } else {
      next.embedding_model = embeddingOptions.includes(candidateModel)
        ? candidateModel
        : embeddingPreset.defaultModel || embeddingOptions[0] || "custom";
    }
    embeddingProviderModelMap[next.embedding_provider] = next.embedding_model;
    next.embedding_provider_model_map = JSON.stringify(embeddingProviderModelMap);

    if (!safeTrim(next.embedding_format)) {
      next.embedding_format = safeTrim(embeddingPreset.format || "openai");
    }
    if (!safeTrim(next.embedding_url) && next.embedding_provider !== "custom_api") {
      next.embedding_url = safeTrim(embeddingPreset.url || "");
    }
    if (!safeTrim(next.embedding_request_model) && next.embedding_provider !== "custom_api") {
      next.embedding_request_model = safeTrim(
        EMBEDDING_MODEL_TO_REQUEST[safeTrim(next.embedding_model)] || embeddingPreset.requestModel || ""
      );
    }

    next.read_mod_lorebook = toInt(next.read_mod_lorebook, DEFAULTS.read_mod_lorebook) === 1 ? 1 : 0;
    next.vector_search_enabled = toInt(next.vector_search_enabled, DEFAULTS.vector_search_enabled) === 1 ? 1 : 0;
    next.vector_search_query_dialogue_rounds = Math.max(1, toInt(next.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds));
    next.vector_search_top_k = Math.max(1, toInt(next.vector_search_top_k, DEFAULTS.vector_search_top_k));
    const minScore = Number(next.vector_search_min_score);
    next.vector_search_min_score = Number.isFinite(minScore) ? Math.max(0, minScore) : DEFAULTS.vector_search_min_score;
    next.vector_search_query_dialogue_rounds_2 = Math.max(1, toInt(next.vector_search_query_dialogue_rounds_2, DEFAULTS.vector_search_query_dialogue_rounds_2));
    next.vector_search_top_k_2 = Math.max(1, toInt(next.vector_search_top_k_2, DEFAULTS.vector_search_top_k_2));
    const minScore2 = Number(next.vector_search_min_score_2);
    next.vector_search_min_score_2 = Number.isFinite(minScore2) ? Math.max(0, minScore2) : DEFAULTS.vector_search_min_score_2;
    next.init_bootstrap_target_model = safeTrim(next.init_bootstrap_target_model) === "B" ? "B" : "A";
    next.init_bootstrap_model_anchor_prompt = String(next.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt);
    if (HARD_FREEZE_KB_FEATURES) {
      next.vector_search_enabled = 0;
      try {
        const raw = JSON.parse(String(next.card_enable_settings || "{}"));
        if (raw && typeof raw === "object" && !Array.isArray(raw)) {
          for (const cfg of Object.values(raw)) {
            if (!cfg || typeof cfg !== "object") continue;
            cfg.vector_search = "off";
          }
          next.card_enable_settings = JSON.stringify(raw);
        }
      } catch { }
    }

    next.timeout_ms = FIXED_TIMEOUT_MS;
    await Risuai.safeLocalStorage.setItem(SETTING_KEYS.timeout_ms, String(FIXED_TIMEOUT_MS));
    await safeSetArgument("timeout_ms", FIXED_TIMEOUT_MS);

    if (!safeTrim(next.model_calls)) {
      next.model_calls = DEFAULT_MODEL_CALLS;
      await Risuai.safeLocalStorage.setItem(SETTING_KEYS.model_calls, next.model_calls);
      await safeSetArgument("model_calls", next.model_calls);
    }

    configCache = next;
  }

  function resolveExtractorConfig() {
    const aFormat = safeTrim(configCache.extractor_a_format || "openai");
    const bFormat = safeTrim(configCache.extractor_b_format || "openai");
    const aKeyMap = parseSimpleStringMap(configCache.extractor_a_provider_key_map || "{}");
    const bKeyMap = parseSimpleStringMap(configCache.extractor_b_provider_key_map || "{}");
    const aProvider = safeTrim(configCache.extractor_a_provider || "custom_api");
    const bProvider = safeTrim(configCache.extractor_b_provider || "custom_api");
    const aKey = safeTrim(aKeyMap[aProvider] || configCache.extractor_a_key || configCache.extractor_b_key || "");
    const bKey = safeTrim(bKeyMap[bProvider] || configCache.extractor_b_key || configCache.extractor_a_key || "");
    const a = {
      url: normalizeUrlByFormat(configCache.extractor_a_url || configCache.extractor_b_url, aFormat),
      key: aKey,
      model: safeTrim(configCache.extractor_a_model || configCache.extractor_b_model),
      provider: aProvider,
      format: aFormat,
      temperature: Number(configCache.extractor_a_temperature),
      thinkingEnabled: configCache.extractor_a_thinking_enabled === 1,
      thinkingLevel: safeTrim(configCache.extractor_a_thinking_level || ""),
    };
    const b = {
      url: normalizeUrlByFormat(configCache.extractor_b_url || configCache.extractor_a_url, bFormat),
      key: bKey,
      model: safeTrim(configCache.extractor_b_model || configCache.extractor_a_model),
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
        const value = formData[key];
        // Always stringify to avoid [object Object] stored in localStorage (Windows Chrome bug)
        const strVal = (value === undefined || value === null) ? "" : (typeof value === "object" ? JSON.stringify(value) : String(value));
        await Risuai.safeLocalStorage.setItem(storageKey, strVal);
        await safeSetArgument(key, strVal);
      }
    }
    await refreshConfig();
  }

  async function getCopilotBearerToken(rawGitHubToken) {
    const key = safeTrim(rawGitHubToken);
    if (!key) return "";
    const cachedToken = safeTrim(await Risuai.safeLocalStorage.getItem("copilot_tid_token"));
    const cachedExpiry = Number(await Risuai.safeLocalStorage.getItem("copilot_tid_token_expiry") || 0);
    if (cachedToken && Number.isFinite(cachedExpiry) && Date.now() < cachedExpiry - 60000) return cachedToken;

    const { res } = await fetchWithFallback(
      COPILOT_TOKEN_URL,
      {
        method: "GET",
        headers: { Accept: "application/json", Authorization: `Bearer ${key}`, Origin: "vscode-file://vscode-app", "User-Agent": "GitHubCopilotChat/0.30.0" },
      },
      12000, _T.copilot_refresh, true
    );
    if (!isResponseLike(res) || !res.ok) return "";
    const data = await readResponseJson(res);
    const token = safeTrim(data?.token);
    const expiry = Number(data?.expires_at || 0) * 1000;
    if (token) {
      await Risuai.safeLocalStorage.setItem("copilot_tid_token", token);
      await Risuai.safeLocalStorage.setItem("copilot_tid_token_expiry", String(expiry || Date.now() + 30 * 60 * 1000));
    }
    return token;
  }

  async function applyCopilotAuthHeaders(headers, rawGitHubToken) {
    const token = await getCopilotBearerToken(rawGitHubToken);
    if (!token) return headers;
    const next = { ...(headers || {}) };
    next.Authorization = `Bearer ${token}`;
    next["Copilot-Integration-Id"] = "vscode-chat";
    next["Editor-plugin-version"] = "copilot-chat/0.30.0";
    next["Editor-version"] = "vscode/1.99.0";
    next["User-Agent"] = "GitHubCopilotChat/0.30.0";
    next["X-Github-Api-Version"] = "2025-10-01";
    next["X-Initiator"] = "user";
    return next;
  }

  function getEmbeddingTokenLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "google/gemini-embedding-001" || m === "gemini-embedding-001" || m.includes("gemini-embedding")) return 2048;
    if (m.includes("voyage")) return 32000;
    if (m === "qwen/qwen3-embedding-8b" || m.includes("qwen3-embedding") || m.includes("qwen3")) return 8192;
    if (m.includes("text-embedding-3-large") || m.includes("text-embedding") || m.includes("openai")) return 8191;
    return 8191;
  }

  function getEmbeddingBatchInputLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "google/gemini-embedding-001" || m === "gemini-embedding-001" || m.includes("gemini-embedding")) return 250;
    if (m.includes("voyage")) return 128;
    if (m === "qwen/qwen3-embedding-8b" || m.includes("qwen3-embedding") || m.includes("qwen3")) return 50;
    if (m.includes("text-embedding-3-large") || m.includes("text-embedding") || m.includes("openai")) return 100;
    return 50;
  }

  function getEmbeddingBatchTokenLimit(requestModel) {
    const m = String(requestModel || "").toLowerCase();
    if (m === "google/gemini-embedding-001" || m === "gemini-embedding-001" || m.includes("gemini-embedding")) return 20000;
    if (m.includes("voyage-4-large")) return 120000;
    if (m.includes("voyage")) return 320000;
    if (m === "qwen/qwen3-embedding-8b" || m.includes("qwen3-embedding") || m.includes("qwen3")) return 400000;
    if (m.includes("text-embedding-3-large") || m.includes("text-embedding") || m.includes("openai")) return 300000;
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
        if (typeof part.text === "string" && part.text.trim()) texts.push(part.text.trim());
        if (typeof part.content === "string" && part.content.trim()) texts.push(part.content.trim());
      }
    }
    return texts.join("\n").trim();
  }

  // Step0 preprocessing: convert CBS syntax into readable placeholders for indexing/tagging.
  // This does not mutate original lorebook content used at runtime.
  function cbsToIndexPlaceholders(content) {
    let src = String(content || "");
    if (!src || !src.includes("{{")) return src;

    const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

    src = src
      .replace(/\{\{\{\s*([^}]*?)\s*\}\}\}/g, (_, expr) => `[CBS_RAW_EXPR:${norm(expr)}]`)
      .replace(/\{\{#if\s*([^}]*)\}\}/g, (_, cond) => `[CBS_IF:${norm(cond)}]`)
      .replace(/\{\{#unless\s*([^}]*)\}\}/g, (_, cond) => `[CBS_UNLESS:${norm(cond)}]`)
      .replace(/\{\{#each\s*([^}]*)\}\}/g, (_, target) => `[CBS_EACH:${norm(target)}]`)
      .replace(/\{\{#with\s*([^}]*)\}\}/g, (_, target) => `[CBS_WITH:${norm(target)}]`)
      .replace(/\{\{else\}\}/g, "[CBS_ELSE]")
      .replace(/\{\{\/if\}\}/g, "[CBS_END_IF]")
      .replace(/\{\{\/unless\}\}/g, "[CBS_END_UNLESS]")
      .replace(/\{\{\/each\}\}/g, "[CBS_END_EACH]")
      .replace(/\{\{\/with\}\}/g, "[CBS_END_WITH]")
      .replace(/\{\{([^}]*)\}\}/g, (_, expr) => `[CBS_EXPR:${norm(expr)}]`);

    return src;
  }

  function parseLorebookNames(raw) {
    return String(raw || "").split(/[\n,]+/g).map((s) => safeTrim(s)).filter((s) => !!s);
  }

  function parseTriggerKeys(raw) {
    if (Array.isArray(raw)) return raw.map((k) => String(k || "").trim()).filter(Boolean);
    if (typeof raw === "string") return raw.split(",").map((k) => k.trim()).filter(Boolean);
    return [];
  }

  function getPrimaryTriggerKeys(entry) {
    return parseTriggerKeys(entry?.keyword ?? entry?.keywords ?? entry?.key ?? entry?.keys);
  }

  function getSecondaryTriggerKeys(entry) {
    return parseTriggerKeys(entry?.secondary_keyword ?? entry?.secondkey ?? entry?.secondKey);
  }

  function hasPrimaryTriggerKey(entry) {
    return getPrimaryTriggerKeys(entry).length > 0;
  }

  function extractLorebookEntries(char) {
    if (!char || typeof char !== 'object') return [];
    let entries = [];
    for (const key of ["globalLore", "lorebook", "loreBook", "lorebooks", "character_book", "characterBook"]) {
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
      if (toInt(configCache?.read_mod_lorebook, DEFAULTS.read_mod_lorebook) !== 1) return [];
      const db = await Risuai.getDatabase(["modules", "enabledModules", "moduleIntergration"]);
      const modules = Array.isArray(db?.modules) ? db.modules : [];

      let ids = [];
      if (Array.isArray(db?.enabledModules)) ids = ids.concat(db.enabledModules);
      if (Array.isArray(chat?.modules)) ids = ids.concat(chat.modules);
      if (Array.isArray(char?.modules)) ids = ids.concat(char.modules);
      if (safeTrim(db?.moduleIntergration)) {
        ids = ids.concat(String(db.moduleIntergration).split(",").map((s) => safeTrim(s)));
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
      await Risuai.log(`${LOG} Warning: failed to read module lorebooks: ${e?.message || String(e)}`);
      return [];
    }
  }

  async function getCombinedLorebookEntries(char, chat) {
    const charLore = extractLorebookEntries(char);
    const moduleLore = await getModuleLorebookEntries(char, chat);
    return charLore.concat(moduleLore);
  }

  async function getLorebookContextByNames(names) {
    const wanted = new Set((names || []).map((x) => safeTrim(x)).filter(Boolean));
    if (wanted.size === 0) return "";
    const { char, chat } = await getCurrentCharAndChatSafe();
    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = await getCombinedLorebookEntries(char, chat);

    const pool = [];

    // charLore (static) goes first as baseline
    for (const entry of charLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (!content) continue;
      const existingIdx = pool.findIndex(p => p.name === name);
      if (existingIdx >= 0) {
        pool[existingIdx] = { name, content, source: "char" };
      } else {
        pool.push({ name, content, source: "char" });
      }
    }

    // localLore (agent-written dynamic data) overrides charLore for same entry names
    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (!content) continue;
      const existingIdx = pool.findIndex(p => p.name === name);
      if (existingIdx >= 0) {
        pool[existingIdx] = { name, content, source: "local" };
      } else {
        pool.push({ name, content, source: "local" });
      }
    }

    return pool.map(p => {
      const stripped = p.content.replace(/^<!-- written_at_turn: \d+ -->\n?/m, "");
      return `[${p.name}]\n${stripped}`;
    }).join("\n\n");
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
    let prevCount = 0;
    for (let level = 1; level <= 4; level++) {
      const escapedPrefix = "\\#".repeat(level) + " ";
      const regex = new RegExp(`(^|\\n)${escapedPrefix}`, "g");
      const matches = src.match(regex);
      const count = matches ? matches.length : 0;
      if (level === 1) {
        if (count >= 2) { bestLevel = 1; break; }
        // Don't break here: fall through to try ## level splits even when no # headers exist
        prevCount = count;
        continue;
      } else {
        if (prevCount >= 2 && count >= 2) { bestLevel = level; break; }
        if (prevCount < 2) break;
      }
      prevCount = count;
    }
    let chunks = [src];
    if (bestLevel >= 1) {
      const escapedPrefix = "\\#".repeat(bestLevel) + " ";
      const splitRegex = new RegExp(`\\n(?=${escapedPrefix})`, "g");
      chunks = src.split(splitRegex).map(c => c.trim()).filter(Boolean);
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
    const provider = safeTrim(configCache.embedding_provider || DEFAULTS.embedding_provider || "custom_api");
    const preset = EMBEDDING_PROVIDER_PRESETS[provider] || EMBEDDING_PROVIDER_PRESETS.custom_api;
    const format = safeTrim(
      provider !== "custom_api" ? preset.format : (configCache.embedding_format || preset.format || "openai")
    ).toLowerCase();
    const selectedModel = safeTrim(configCache.embedding_model || "");
    const requestModel = safeTrim(configCache.embedding_request_model || EMBEDDING_MODEL_TO_REQUEST[selectedModel] || selectedModel || preset.requestModel || "");
    const rawUrl = provider !== "custom_api"
      ? safeTrim(preset.url || "")
      : safeTrim(configCache.embedding_url || "");
    const url = normalizeEmbeddingUrl(rawUrl, format);
    const keyMap = parseSimpleStringMap(configCache.embedding_provider_key_map || "{}");
    const apiKey = safeTrim(keyMap[provider] || configCache.embedding_key || "");
    return { provider, preset, format, selectedModel, requestModel, url, apiKey };
  }

  function parseEmbeddingListFromOpenAICompat(data) {
    const rows = Array.isArray(data?.data) ? data.data : [];
    const mapped = rows
      .map((row, idx) => {
        const vec = Array.isArray(row?.embedding) ? row.embedding.map((x) => Number(x)).filter((x) => Number.isFinite(x)) : [];
        const order = Number.isFinite(Number(row?.index)) ? Number(row.index) : idx;
        if (!vec.length) return null;
        return { order, vec };
      })
      .filter(Boolean).sort((a, b) => a.order - b.order).map((x) => x.vec);
    return mapped;
  }

  function cosineSimilarity(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) return 0;
    const n = Math.min(a.length, b.length);
    let dot = 0; let aa = 0; let bb = 0;
    for (let i = 0; i < n; i++) {
      const x = Number(a[i]); const y = Number(b[i]);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      dot += x * y; aa += x * x; bb += y * y;
    }
    if (aa <= 0 || bb <= 0) return 0;
    const score = dot / (Math.sqrt(aa) * Math.sqrt(bb));
    if (!Number.isFinite(score)) return 0;
    return Math.max(-1, Math.min(1, score));
  }

  async function fetchEmbeddingVectorsRemote(texts, cfg) {
    const runner = async () => {
      const input = Array.isArray(texts) ? texts.map((t) => String(t || "")) : [];
      if (!input.length) return [];

      const maxInputsPerBatch = getEmbeddingBatchInputLimit(cfg.requestModel);
      const maxTokensPerBatch = getEmbeddingBatchTokenLimit(cfg.requestModel);
      const perInputTokenLimit = getEmbeddingTokenLimit(cfg.requestModel);
      const estimateTokens = (t) => Math.min(Math.ceil(String(t || "").length / 3), perInputTokenLimit);

      const batches = [];
      let currentBatch = [], currentTokens = 0;
      for (const item of input) {
        const est = estimateTokens(item);
        if (currentBatch.length > 0 && (currentBatch.length >= maxInputsPerBatch || currentTokens + est > maxTokensPerBatch)) {
          batches.push(currentBatch);
          currentBatch = []; currentTokens = 0;
        }
        currentBatch.push(item); currentTokens += est;
      }
      if (currentBatch.length > 0) batches.push(currentBatch);

      const allVectors = [];
      await Risuai.log(`${LOG} [Embed] Start: provider=${cfg.provider}, model=${cfg.requestModel}, total=${input.length} → ${batches.length} batch(es)`);

      for (let bi = 0; bi < batches.length; bi++) {
        if (bi > 0) await new Promise(r => setTimeout(r, 1000));
        const batchInput = batches[bi];
        let batchVectors = [];
        const batchLabel = `batch ${bi + 1}/${batches.length}`;

        try {
          if (cfg.format === "google") {
            const baseUrl = String(cfg.url || "").replace(/\/+$/, "");
            const model = String(cfg.requestModel || cfg.selectedModel || "");
            if (!baseUrl || !model) throw new Error("Google Embedding: URL or model not configured");
            const queryUrl = `${baseUrl}/${model}:batchEmbedContents?key=${cfg.apiKey}`;
            const reqBody = {
              requests: batchInput.map((t) => ({ model: `models/${model}`, content: { parts: [{ text: t }] } }))
            };
            await Risuai.log(`${LOG} [Embed] Google POST → ${queryUrl.replace(/key=[^&]+/, "key=***")}`);
            const { res, via } = await fetchWithFallback(queryUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(reqBody),
            }, 120000, `Embedding Google ${batchLabel}`, true);
            await Risuai.log(`${LOG} [Embed] Google response via=${via}: status=${res.status}, ok=${res.ok}`);
            if (!isResponseLike(res) || !res.ok) {
              const errTxt = await readResponseErrorText(res);
              throw new Error(`Google Embeddings HTTP ${res.status}: ${String(errTxt).slice(0, 300)}`);
            }
            const data = await readResponseJson(res);
            batchVectors = (data?.embeddings || []).map((e) => Array.isArray(e.values) ? e.values : []);
            await Risuai.log(`${LOG} [Embed] Google parsed: got ${batchVectors.length} vectors`);
          } else {
            const url = normalizeEmbeddingUrl(cfg.url, cfg.format);
            const model = safeTrim(cfg.requestModel || cfg.selectedModel || "");
            if (!url || !model) throw new Error(`Embedding: URL(${url}) or model(${model}) not configured`);
            const headers = { "Content-Type": "application/json" };
            if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
            const reqBody = JSON.stringify({ input: batchInput, model });
            await Risuai.log(`${LOG} [Embed] OpenAI-Compat POST → ${url}`);
            const { res, via } = await fetchWithFallback(url, { method: "POST", headers, body: reqBody }, 120000, `Embedding ${batchLabel}`, true);
            await Risuai.log(`${LOG} [Embed] OpenAI-Compat response via=${via}: status=${res.status}, ok=${res.ok}`);
            if (!isResponseLike(res) || !res.ok) {
              const errTxt = await readResponseErrorText(res);
              throw new Error(`Embeddings HTTP ${res.status}: ${String(errTxt).slice(0, 300)}`);
            }
            const data = await readResponseJson(res);
            batchVectors = parseEmbeddingListFromOpenAICompat(data);
            await Risuai.log(`${LOG} [Embed] OpenAI-Compat parsed: got ${batchVectors.length} vectors`);
          }
          if (batchVectors.length !== batchInput.length || batchVectors.some((v) => !Array.isArray(v) || !v.length)) {
            throw new Error(`${batchLabel} vector count mismatch (got ${batchVectors.length}, expected ${batchInput.length})`);
          }
          allVectors.push(...batchVectors);
        } catch (e) {
          console.error(`${LOG} Embedding ${batchLabel} failed:`, e);
          await Risuai.log(`${LOG} [Embed] ❌ ${batchLabel} failed: ${e?.message || String(e)}`);
          for (let j = 0; j < batchInput.length; j++) allVectors.push([]);
          break;
        }
      }
      while (allVectors.length < input.length) allVectors.push([]);
      await Risuai.log(`${LOG} [Embed] Complete: ${allVectors.filter(v => v && v.length).length}/${input.length} succeeded`);
      return allVectors;
    };

    if (toInt(configCache.embedding_concurrency, 1) === 0) return await mutexEmbed.run(runner);
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
      const vectors = await fetchEmbeddingVectorsRemote(misses.map((x) => x.txt), cfg);
      for (let m = 0; m < misses.length; m++) {
        const vec = vectors[m];
        if (!Array.isArray(vec) || !vec.length) continue;
        const idx = misses[m].i;
        out[idx] = vec;
        if (!skipCache) {
          embeddingVectorCache.set(misses[m].cacheKey, vec);
          if (embeddingVectorCache.size > 1000) {
            embeddingVectorCache.delete(embeddingVectorCache.keys().next().value);
          }
        }
      }
    }
    if (out.some((v) => !Array.isArray(v) || !v.length)) throw new Error("Some embedding vectors failed to retrieve.");
    return out;
  }

  async function getLorebookContextByVector(names, conversationMessages) {
    const wanted = new Set((names || []).map((x) => safeTrim(x)).filter(Boolean));
    if (wanted.size === 0) return "";

    const topK = Math.max(1, toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k));
    const minScore = Number(configCache.vector_search_min_score) || 0;
    const queryRounds = Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds));

    const recentMsgs = (conversationMessages || []).filter(m => m.role === "user" || m.role === "assistant" || m.role === "char").slice(-Math.max(1, queryRounds * 2));
    const convText = recentMsgs.map((m) => String(m.content || "")).join("\n");
    const nameText = (Array.isArray(names) ? names : []).map((x) => String(x || "")).join(" ");
    const queryText = `${nameText}\n${convText}`.trim() || " ";

    const { char, chat } = await getCurrentCharAndChatSafe();
    const gNoteData = await getGlobalNoteDataCached(char);

    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = await getCombinedLorebookEntries(char, chat);
    const localMap = new Map();

    
    
    for (const entry of charLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      const alwaysActive = entry?.alwaysActive === true || String(entry?.alwaysActive) === "true" || entry?.constant === true || String(entry?.constant) === "true";
      if (name && content) localMap.set(name, { content, isDynamic: false, alwaysActive });
    }
    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (name && content) localMap.set(name, { content, isDynamic: true, alwaysActive: entry?.alwaysActive === true });
    }

    const embedCfg = resolveEmbeddingRuntimeConfig();

    const pool = [];
    for (const [name, data] of localMap.entries()) {
      const candidates = splitIntoParagraphChunks(data.content).map((chunk, idx) => ({
        name: `lorebook:${name}#${idx + 1}`, content: chunk, cacheType: "lorebook", isDynamic: data.isDynamic, alwaysActive: data.alwaysActive
      }));
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
          const vec = Array.isArray(hit?.vector) ? hit.vector.map((x) => Number(x)).filter((x) => Number.isFinite(x)) : [];
          if (vec.length) {
            vectors[i] = vec;
          } else {
            misses.push({ index: i, text: `${item.name}\n${item.content}`, key, item });
          }
        }
        if (misses.length) {
          let newlyAdded = false;
          const remoteVectors = await fetchEmbeddingVectorsRemote(misses.map((x) => x.text), embedCfg);
          for (let i = 0; i < misses.length; i++) {
            const vec = Array.isArray(remoteVectors[i]) ? remoteVectors[i] : [];
            if (!vec.length) continue;
            const miss = misses[i];
            vectors[miss.index] = vec;

            if (!miss.item.isDynamic) {
              upsertEmbeddingCacheEntry(store, cardKey, charName, miss.key, {
                sourceType: miss.item.cacheType, name: miss.item.name, textHash: simpleHash(miss.text), dims: vec.length, vector: vec,
              }, embedCfg.requestModel);
              newlyAdded = true;
            } else {
              const memoryCacheKey = `${embedCfg.provider}|${embedCfg.format}|${embedCfg.url}|${embedCfg.requestModel}|${simpleHash(miss.text)}`;
              embeddingVectorCache.set(memoryCacheKey, vec);
              if (embeddingVectorCache.size > 1000) {
                embeddingVectorCache.delete(embeddingVectorCache.keys().next().value);
              }
            }
          }
          if (newlyAdded) await saveEmbeddingCacheStore();
        }

        const scored = inactivePool
          .map((item, idx) => ({ ...item, score: cosineSimilarity(queryVec, vectors[idx]) }))
          .filter((x) => Number.isFinite(x.score)).sort((a, b) => b.score - a.score);
        const picked = scored.filter((x) => x.score >= minScore).slice(0, topK);
        
        
        
        topInactiveList = picked.length ? picked : scored.filter((x) => x.score >= 0).slice(0, topK);
      }

      const finalListText = [];
      for (const item of activePool) {
        finalListText.push(`[${item.name}]\n${item.content}`);
      }
      for (const item of topInactiveList) {
        finalListText.push(`[${item.name}] (score=${item.score.toFixed(3)})\n${item.content}`);
      }

      return finalListText.join("\n\n");
    } catch (e) {
      try { await Risuai.log(`${LOG} embedding vector search fallback: ${e?.message || String(e)}`); } catch { }
      return await getLorebookContextByNames(names);
    }
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
      if ((role === "user" || role === "char") && arr[i + 1]?.role === "system") return i;
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
      for (let i = arr.length - 1; i >= 0; i--) if (arr[i]?.role === "system") return i;
      return -1;
    })();
    const worldBoundaryIdx = findLastUserOrCharBeforeSystemIndex(arr);

    const inserts = [];
    if (hasBlock1) inserts.push({ kind: KNOWLEDGE_SECTION_TAGS.rp_instruction, target: firstSystemIdx >= 0 ? firstSystemIdx + 1 : 0, order: 1 });
    if (hasBlock2) inserts.push({ kind: KNOWLEDGE_SECTION_TAGS.information, target: worldBoundaryIdx >= 0 ? worldBoundaryIdx + 1 : arr.length, order: 2 });
    if (hasBlock3) inserts.push({ kind: KNOWLEDGE_SECTION_TAGS.output_format, target: lastSystemIdx >= 0 ? lastSystemIdx + 1 : arr.length, order: 3 });
    inserts.sort((a, b) => a.target === b.target ? a.order - b.order : a.target - b.target);
    return inserts;
  }

  function validateKnowledgeInjectionLayout(base, injected, expectedInserts) {
    const out = Array.isArray(injected) ? injected : [];
    const knowledgeMsgs = out.filter((m) => m?.role === "system" && String(m?.content || "").startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`));
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
      const idx = Math.max(0, Math.min(out.length - 1, expected.target + offset));
      const msg = out[idx];
      if (!(msg?.role === "system" && String(msg?.content || "").startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`))) return false;
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

  function injectKnowledgeByPlacementRules(cleanInput, { block1, block2, block3 }) {
    const base = Array.isArray(cleanInput) ? cleanInput : [];
    const block1Text = safeTrim(block1);
    const block2Text = safeTrim(block2);
    const block3Text = safeTrim(block3);
    const expected = computeExpectedInsertions(base, !!block1Text, !!block2Text, !!block3Text);

    if (!expected.length) return base;

    const msgByKind = new Map();
    if (block1Text) msgByKind.set(KNOWLEDGE_SECTION_TAGS.rp_instruction, { role: "system", content: buildKnowledgeWrappedContent(KNOWLEDGE_SECTION_TAGS.rp_instruction, block1Text) });
    if (block2Text) msgByKind.set(KNOWLEDGE_SECTION_TAGS.information, { role: "system", content: buildKnowledgeWrappedContent(KNOWLEDGE_SECTION_TAGS.information, block2Text) });
    if (block3Text) msgByKind.set(KNOWLEDGE_SECTION_TAGS.output_format, { role: "system", content: buildKnowledgeWrappedContent(KNOWLEDGE_SECTION_TAGS.output_format, block3Text) });

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
    if (validateKnowledgeInjectionLayout(base, out, expected)) {
      lastValidInjectionByBaseHash.set(baseHash, out);
      if (lastValidInjectionByBaseHash.size > 20) {
        const oldestKey = lastValidInjectionByBaseHash.keys().next().value;
        if (oldestKey) lastValidInjectionByBaseHash.delete(oldestKey);
      }
      return out;
    }

    const fallback = lastValidInjectionByBaseHash.get(baseHash);
    return Array.isArray(fallback) ? fallback : base;
  }

  function buildModelMessages(systemContent, userContent, prefillPrompt, normalModeTail = "") {
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

    const fallbackUser = [userText, tailText].filter((s) => !!safeTrim(s)).join("\n\n");
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
    const allKeys = blockEntries.map(e => normalizeOutputEntry(e, target).lorebook_name);
    const exampleStructure = `{ ${allKeys.map(k => `"${k}": "..."`).join(", ")} }`;
    const blockText = [
      `### TASK: EXTRACT DATA BLOCKS FOR ${target.toUpperCase()}`,
      `GOAL: Analyze the "Recent RP History" and populate ALL ${blockEntries.length} lorebook entries listed below.`,
      `CRITICAL RULE: Return EXACTLY ONE raw JSON object containing ALL ${blockEntries.length} keys. NO markdown, NO codeblocks, NO preamble. Do NOT stop after the first key.`,
      `OUTPUT FORMAT (must contain all keys): ${exampleStructure}`,
      `--- TARGET BLOCKS ---`,
      ...blockEntries.map((e, i) => {
        const x = normalizeOutputEntry(e, target);
        return `[BLOCK ${i + 1}]\n- lorebook_name: ${x.lorebook_name}\n- write_mode: ${x.write_mode}\n- VALUE_FORMAT: ${String(x.output_format || "(free text)").replace(/\n/g, "\\n")}`;
      }),
      `--- END OF BLOCKS ---`
    ].join("\n");

    const systemContent = [modelAnchor, blockText, loreContext ? `### Lorebook Context (Reference Only):\n${loreContext}` : ""].filter((s) => !!safeTrim(s)).join("\n\n");
    const chatHistoryText = (baseMessages || []).map(m => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`).join("\n");
    const userContent = `### Recent RP History:\n${chatHistoryText}`;

    const assistantPrefill = prefillPrompt
      ? [prefillPrompt, prereplyPrompt].filter((s) => !!safeTrim(s)).join("\n")
      : "";

    return buildModelMessages(systemContent, userContent, assistantPrefill, prereplyPrompt);
  }

  function defaultOutputEntry(target) {
    return { lorebook_name: target === "A" ? "PSE Memory A" : "PSE Memory B", write_mode: "append", always_active: false, output_format: "" };
  }

  function normalizeOutputEntry(entry, target) {
    const d = defaultOutputEntry(target);
    const retentionEnabled = entry?.retention_enabled === true || entry?.retention_enabled === "true" || entry?.retention_enabled === 1;
    const retentionAfter = Math.max(0, toInt(entry?.retention_after, 0));
    const retentionKeep = Math.max(0, toInt(entry?.retention_keep, 5));
    return {
      lorebook_name: safeTrim(entry?.lorebook_name) || d.lorebook_name,
      write_mode: safeTrim(entry?.write_mode) === "overwrite" ? "overwrite" : "append",
      always_active: entry?.always_active === true || entry?.always_active === "1" || entry?.always_active === 1 || String(entry?.always_active) === "true",
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
      return parsed.map((x) => normalizeOutputEntry(x, target)).filter((x) => !!x.lorebook_name);
    } catch { return [d]; }
  }

  function normalizeModelCall(call, index = 0) {
    const target = safeTrim(call?.target_model) === "B" ? "B" : "A";
    const nameFallback = index === 0 ? _T.callnote_a : index === 1 ? _T.callnote_b : _T.callnote_n(index + 1);
    const every = Math.max(1, toInt(call?.every_n_turns, 1));
    const readRounds = Math.max(0, toInt(call?.read_dialogue_rounds, 4));
    const entries = parseOutputEntries(call?.entries, target);
    return {
      id: safeTrim(call?.id) || `call_${Date.now()}_${index}`, name: safeTrim(call?.name) || nameFallback,
      target_model: target, every_n_turns: every, read_dialogue_rounds: readRounds,
      read_lorebook_names: String(call?.read_lorebook_names ?? ""), entries,
    };
  }

  function parseModelCalls(raw) {
    const defaultCalls = (() => {
      try {
        const base = Array.isArray(DEFAULT_MODEL_CALLS)
          ? DEFAULT_MODEL_CALLS
          : (typeof DEFAULT_MODEL_CALLS === "string" ? JSON.parse(DEFAULT_MODEL_CALLS) : []);
        if (!Array.isArray(base)) return [];
        return base.map((x, i) => normalizeModelCall(x, i));
      } catch { return []; }
    })();

    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!Array.isArray(parsed)) return defaultCalls;
      if (parsed.length === 0) return [];
      const normalized = parsed.map((x, i) => normalizeModelCall(x, i));
      return normalized;
    } catch { return defaultCalls; }
  }

  function getModelCalls() {
    const preset = toInt(configCache.active_preset, 1);
    const raw = preset === 2 ? configCache.model_calls_2 : configCache.model_calls;
    return parseModelCalls(raw);
  }
  function isModelCallDue(call, roundIndex) {
    const n = Math.max(1, toInt(call?.every_n_turns, 1));
    return roundIndex % n === 0;
  }

  async function buildScopedExtractorMessages(baseConversation, modelCall) {
    const rounds = Math.max(0, toInt(modelCall?.read_dialogue_rounds, 4));
    const scopedConversation = limitConversationByRounds(baseConversation, rounds);
    const loreNames = parseLorebookNames(modelCall?.read_lorebook_names || "");
    let loreContext = "";
    if (loreNames.length > 0) {
      if (!HARD_FREEZE_KB_FEATURES && configCache.vector_search_enabled === 1) {
        loreContext = await getLorebookContextByVector(loreNames, scopedConversation);
        if (!safeTrim(loreContext)) loreContext = await getLorebookContextByNames(loreNames);
      } else {
        loreContext = await getLorebookContextByNames(loreNames);
      }
    }
    return buildExtractorMessages(scopedConversation, modelCall, loreContext);
  }

  function formatLoreOutput(raw, parsed, outputFormat, lorebookName, totalEntries) {
    
    
    
    let normalizedParsed = parsed;
    if (Array.isArray(parsed)) {
      const merged = {};
      for (const it of parsed) {
        if (it && typeof it === "object" && !Array.isArray(it)) Object.assign(merged, it);
      }
      normalizedParsed = Object.keys(merged).length ? merged : null;
    }

    if (!normalizedParsed || typeof normalizedParsed !== "object") {
      const rawTrimmed = String(raw || "").trim();
      const formatTrimmed = String(outputFormat || "").trim();
      if (/^[{[]/.test(formatTrimmed) && !/^[{[]/.test(rawTrimmed)) return "";
      return totalEntries === 1 ? rawTrimmed : "";
    }
    if (Object.prototype.hasOwnProperty.call(normalizedParsed, lorebookName)) {
      const val = normalizedParsed[lorebookName];
      
      
      if (val === null || val === undefined || val === false || val === "" || val === 0) return "";
      if (typeof val === "string") return val.trim();
      
      
      try { return JSON.stringify(val); } catch { return String(val || "").trim(); }
    }
    if (totalEntries === 1 && isPlainObject(normalizedParsed)) {
      const keys = Object.keys(normalizedParsed);
      if (keys.length === 1) {
        const val = normalizedParsed[keys[0]];
        if (val === null || val === undefined || val === false || val === "" || val === 0) return "";
        if (typeof val === "string") return val.trim();
        try { return JSON.stringify(val); } catch { return String(val || "").trim(); }
      }
      
      
      
      try { return JSON.stringify(normalizedParsed); } catch { return String(raw || "").trim(); }
    }
    return "";
  }

  function resolveLoreCommentForTarget(target, callsOverride) {
    
    
    const calls = callsOverride || getModelCalls();
    const entries = calls.filter((c) => c.target_model === target).flatMap((c) => c.entries || []);
    return safeTrim(entries?.[0]?.lorebook_name) || LOCAL_LORE_COMMENT;
  }

  async function batchUpsertLocalLore(writes, roundIndex = 0) {
    if (!Array.isArray(writes) || writes.length === 0) return false;
    return mutexLoreWrite.run(async () => {
      try {
        const charIdx = typeof Risuai.getCurrentCharacterIndex === "function" ? await Risuai.getCurrentCharacterIndex() : -1;
        const chatIndex = await resolveCurrentChatIndex();
        if (charIdx < 0 || chatIndex < 0) return false;

        const chat = await Risuai.getChatFromIndex(charIdx, chatIndex);
        if (!chat) return false;
        chat.localLore = Array.isArray(chat.localLore) ? chat.localLore : [];

        for (const { loreName, writeMode, alwaysActive, content } of writes) {
          const header = `## ${loreName}`;
          const turnBlock = `### Turn ${roundIndex}\n${content}`;

          if (writeMode === "overwrite") {
            const plainContent = `## ${loreName}\n<!-- written_at_turn: ${roundIndex} -->\n${content}`;
            const existingIndex = chat.localLore.findIndex((l) => l && l.comment === loreName);
            if (existingIndex < 0) {
              chat.localLore.push({
                key: "", comment: loreName, content: plainContent,
                mode: "normal", insertorder: 999, alwaysActive,
                secondkey: "", selective: false, useRegex: false,
              });
            } else {
              chat.localLore[existingIndex] = {
                ...chat.localLore[existingIndex],
                key: "", comment: loreName, content: plainContent,
                mode: "normal", insertorder: 999, alwaysActive,
                secondkey: "", selective: false, useRegex: false,
              };
            }
          } else {
            const makeEntry = () => ({
              key: "", comment: loreName, content: `${header}\n${turnBlock}`,
              mode: "normal", insertorder: 999, alwaysActive,
              secondkey: "", selective: false, useRegex: false,
            });
            const existingIndex = chat.localLore.findIndex((l) => l && l.comment === loreName);
            if (existingIndex < 0) {
              chat.localLore.push(makeEntry());
            } else {
              const prev = chat.localLore[existingIndex] || {};
              const prevContent = typeof prev.content === "string" ? prev.content.trim() : "";
              if (hasTurnBlockForRound(prevContent, roundIndex)) {
                continue;
              }
              const base = prevContent.startsWith("## ") ? prevContent : `${header}\n${prevContent}`;
              chat.localLore[existingIndex] = {
                ...prev,
                key: "", comment: loreName, content: `${base}\n\n${turnBlock}`,
                mode: "normal", insertorder: 999, alwaysActive,
                secondkey: "", selective: false, useRegex: false,
              };
            }
          }
        }

        await Risuai.setChatToIndex(charIdx, chatIndex, chat);
        return true;
      } catch (err) {
        await Risuai.log(`${LOG} batchUpsertLocalLore failed: ${err?.message || String(err)}`);
        return false;
      }
    });
  }

  async function applyRetentionCleanup(userMsgCount, callsOverride) {
    
    
    
    const calls = callsOverride || getModelCalls();
    const retentionEntries = [];
    for (const call of calls) {
      for (const entry of (call.entries || [])) {
        const e = normalizeOutputEntry(entry, call.target_model);
        if (e.write_mode === "append" && e.retention_enabled) {
          retentionEntries.push(e);
        }
      }
    }
    if (retentionEntries.length === 0) return;

    return mutexLoreWrite.run(async () => {
      try {
        const charIdx = typeof Risuai.getCurrentCharacterIndex === "function" ? await Risuai.getCurrentCharacterIndex() : -1;
        const chatIndex = await resolveCurrentChatIndex();
        if (charIdx < 0 || chatIndex < 0) return;
        const chat = await Risuai.getChatFromIndex(charIdx, chatIndex);
        if (!chat || !Array.isArray(chat.localLore)) return;

        let modified = false;
        for (const e of retentionEntries) {
          const idx = chat.localLore.findIndex(l => l?.comment === e.lorebook_name);
          if (idx < 0) continue;
          const entry = chat.localLore[idx];
          const raw = typeof entry.content === "string" ? entry.content.trim() : "";

          const headerMatch = raw.match(/^## .+/);
          if (!headerMatch) continue;
          const headerLine = headerMatch[0];
          const body = raw.slice(headerLine.length).trim();

          const allBlocks = splitTurnBlocks(body);

          if (e.retention_after === 0 || allBlocks.length > e.retention_after) {
            const kept = e.retention_keep === 0 ? [] : allBlocks.slice(-e.retention_keep);
            chat.localLore[idx] = { ...entry, content: headerLine.trim() + (kept.length ? "\n\n" + kept.join("\n\n") : "") };
            modified = true;
          }
        }

        if (modified) await Risuai.setChatToIndex(charIdx, chatIndex, chat);
      } catch (err) {
        console.error(`${LOG} applyRetentionCleanup failed:`, err);
      }
    });
  }

  async function writeOutputsForCall(modelCall, raw, parsed, roundIndex = 0, callsOverride) {
    const entries = modelCall.entries || [];
    const target = modelCall.target_model === "B" ? "B" : "A";

    
    
    
    
    const alignedParsed = alignParsedObjectToEntries(raw, parsed, entries);

    const pendingWrites = [];
    const outputIssues = [];
    for (const entry of entries) {
      const loreName = safeTrim(entry?.lorebook_name) || resolveLoreCommentForTarget(target, callsOverride);
      const writeMode = safeTrim(entry?.write_mode) === "overwrite" ? "overwrite" : "append";
      const alwaysActive = entry?.always_active === true;
      const outputFormat = safeTrim(entry?.output_format) || "raw";

      
      let content = formatLoreOutput(raw, alignedParsed, outputFormat, loreName, entries.length);

      
      
      if (!safeTrim(content) && entries.length > 1 && parsed && typeof parsed === "object") {
        
        const singleAlign = alignParsedObjectToEntries(raw, parsed, [entry]);
        content = formatLoreOutput(raw, singleAlign, outputFormat, loreName, 1);
      }

      if (!safeTrim(content)) {
        outputIssues.push(`${loreName}: no extractable content`);
        continue;
      }
      pendingWrites.push({ loreName, writeMode, alwaysActive, content });
    }

    if (pendingWrites.length === 0) {
      
      const issuesSummary = outputIssues.join("; ");
      if (entries.length > 1 && (!alignedParsed || typeof alignedParsed !== "object")) {
        throw new Error(
          _T.err_json_expected(modelCall.name) +
          ` First 100 chars of raw: ${String(raw || "").slice(0, 100)}`
        );
      }
      throw new Error(
        _T.err_unusable_output(modelCall.name) +
        ` Issues: ${issuesSummary || "(none)"}. Expected entries: ${entries.map(e => e.lorebook_name).join(", ") || "(none)"}`
      );
    }

    
    if (outputIssues.length > 0) {
      await Risuai.log(
        `${LOG} Warning (${modelCall.name}): partial write — ${outputIssues.join("; ")}. ` +
        `Writing ${pendingWrites.length}/${entries.length} entries.`
      );
    }

    const wrote = await batchUpsertLocalLore(pendingWrites, roundIndex);
    if (!wrote) {
      await Risuai.log(`${LOG} Warning: save error occurred while batch-writing data to local Lorebook (call: ${modelCall.name}).`);
    }
  }

  
  
  function thinkingLevelToClaudeBudget(level) {
    switch (safeTrim(level).toLowerCase()) {
      case "low": return 1024;
      case "medium": return 8000;
      case "high": return 32000;
      default: return 8000; 
    }
  }

  
  function thinkingLevelToGemini(level) {
    switch (safeTrim(level).toUpperCase()) {
      case "LOW": return "LOW";
      case "HIGH": return "HIGH";
      case "MEDIUM": return "MEDIUM";
      default: return "MEDIUM";
    }
  }

  
  function thinkingLevelToOpenAIEffort(level) {
    switch (safeTrim(level).toLowerCase()) {
      case "low": return "low";
      case "high": return "high";
      default: return "medium";
    }
  }

  async function callOpenAICompat({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel }) {
    const finalUrl = normalizeUrl(url);
    const finalModel = safeTrim(model);
    if (!finalUrl || !finalModel) throw new Error(`Extractor URL/model is missing.`);
    let headers = { "Content-Type": "application/json" };
    if (isCopilotUrl(finalUrl)) headers = await applyCopilotAuthHeaders(headers, apiKey);
    else if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const { res } = await fetchWithFallback(finalUrl, {
      method: "POST", headers,
      body: JSON.stringify({
        model: finalModel,
        ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}),
        ...(thinkingEnabled && thinkingLevel ? { reasoning_effort: thinkingLevelToOpenAIEffort(thinkingLevel) } : {}),
        response_format: { type: "json_object" },
        messages
      }),
    }, timeoutMs, "Extractor", isOpenRouterUrl(finalUrl));

    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(`HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`);
    }

    const data = await readResponseJson(res);
    const contentRaw = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text;
    const content = typeof contentRaw === "string" ? contentRaw : Array.isArray(contentRaw) ? contentRaw.map((p) => (typeof p === "string" ? p : typeof p?.text === "string" ? p.text : "")).filter(Boolean).join("\n") : "";
    if (!content || typeof content !== "string") throw new Error("Extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: String(content || "").trim() };
  }

  function normalizeGoogleGenerateUrl(baseUrl, model, apiKey) {
    const raw = safeTrim(baseUrl || "");
    const id = safeTrim(model || "");
    if (!raw || !id) return "";
    let url = raw.replace(/\/+$/, "");
    if (!/:generateContent(\?|$)/.test(url)) {
      if (/\/chat\/completions$/i.test(url)) url = url.replace(/\/openai\/chat\/completions$/i, "");
      if (/\/models$/i.test(url)) url = `${url}/${id}:generateContent`;
      else if (/\/models\/[^/]+$/i.test(url)) url = `${url}:generateContent`;
      else url = `${url}/models/${id}:generateContent`;
    }
    if (apiKey && !/[?&]key=/.test(url)) url += `${url.includes("?") ? "&" : "?"}key=${encodeURIComponent(apiKey)}`;
    return url;
  }

  function normalizeVertexGenerateUrl(baseUrl, model) {
    const raw = safeTrim(baseUrl || "");
    const id = safeTrim(model || "");
    if (!raw || !id) return "";
    let url = raw.replace(/\/+$/, "");
    if (!/:generateContent(\?|$)/.test(url)) {
      if (/\/chat\/completions$/i.test(url)) url = url.replace(/\/chat\/completions$/i, "");
      if (/\/models$/i.test(url)) url = `${url}/${id}:generateContent`;
      else if (/\/models\/[^/]+$/i.test(url)) url = `${url}:generateContent`;
      else url = `${url}/models/${id}:generateContent`;
    }
    return url;
  }

  function buildGoogleMessages(messages) {
    const normalized = Array.isArray(messages) ? messages : [];
    const systemTexts = normalized.filter((m) => m?.role === "system").map((m) => normalizeMessageContent(m?.content)).filter(Boolean);
    const contents = normalized.filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: normalizeMessageContent(m?.content) }] }))
      .filter((x) => safeTrim(x?.parts?.[0]?.text));
    if (contents.length === 0) contents.push({ role: "user", parts: [{ text: "Continue." }] });
    return { systemInstruction: systemTexts.length ? { parts: [{ text: systemTexts.join("\n\n") }] } : undefined, contents };
  }

  async function callGoogleGenerative({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel }) {
    const finalUrl = normalizeGoogleGenerateUrl(url, model, apiKey);
    if (!finalUrl) throw new Error("Google URL/model is missing.");
    const headers = { "Content-Type": "application/json" };
    const built = buildGoogleMessages(messages);
    const body = {
      contents: built.contents, ...(built.systemInstruction ? { systemInstruction: built.systemInstruction } : {}),
      generationConfig: {
        ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}),
        responseMimeType: "application/json",
        ...(thinkingEnabled && thinkingLevel ? { thinkingConfig: { includeThoughts: true, thinkingLevel: thinkingLevelToGemini(thinkingLevel).toLowerCase() } } : {}),
      },
      safetySettings: [
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    };
    const { res } = await fetchWithFallback(finalUrl, { method: "POST", headers, body: JSON.stringify(body) }, timeoutMs, "Google extractor", false);
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(`HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`);
    }
    const data = await readResponseJson(res);
    const content = (data?.candidates?.[0]?.content?.parts || []).map((p) => safeTrim(p?.text)).filter(Boolean).join("\n").trim();
    if (!content) throw new Error("Google extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callVertexGenerative({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel }) {
    const finalUrl = normalizeVertexGenerateUrl(url, model);
    if (!finalUrl) throw new Error("Vertex AI URL/model is missing.");
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
    const built = buildGoogleMessages(messages);
    const body = {
      contents: built.contents, ...(built.systemInstruction ? { systemInstruction: built.systemInstruction } : {}),
      generationConfig: {
        ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}),
        responseMimeType: "application/json",
        ...(thinkingEnabled && thinkingLevel ? { thinkingConfig: { includeThoughts: true, thinking_level: thinkingLevelToGemini(thinkingLevel) } } : {}),
      },
      safetySettings: [
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    };
    const { res } = await fetchWithFallback(finalUrl, { method: "POST", headers, body: JSON.stringify(body) }, timeoutMs, "Vertex extractor", false);
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(`HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`);
    }
    const data = await readResponseJson(res);
    const content = (data?.candidates?.[0]?.content?.parts || []).map((p) => safeTrim(p?.text)).filter(Boolean).join("\n").trim();
    if (!content) throw new Error("Vertex extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callClaudeCompat({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel }) {
    const finalUrl = safeTrim(url || "").replace(/\/+$/, "");
    if (!finalUrl || !safeTrim(model)) throw new Error("Claude URL/model is missing.");
    const system = (messages || []).filter((m) => m?.role === "system").map((m) => normalizeMessageContent(m?.content)).filter(Boolean).join("\n\n");
    const chatMessages = (messages || []).filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: normalizeMessageContent(m?.content) }))
      .filter((m) => !!safeTrim(m.content));
    if (!chatMessages.length) chatMessages.push({ role: "user", content: "Continue." });
    let headers = { "Content-Type": "application/json", "x-api-key": apiKey || "", "anthropic-version": "2023-06-01" };
    if (isCopilotUrl(finalUrl)) {
      headers = await applyCopilotAuthHeaders(headers, apiKey);
      delete headers["x-api-key"];
    }
    const claudeThinkingBlock = thinkingEnabled && thinkingLevel
      ? { thinking: { type: "enabled", budget_tokens: thinkingLevelToClaudeBudget(thinkingLevel) } }
      : {};
    const basePayload = {
      model,
      max_tokens: thinkingEnabled && thinkingLevel ? Math.max(4096, thinkingLevelToClaudeBudget(thinkingLevel) + 1024) : 4096,
      ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}),
      ...(system ? { system } : {}),
      messages: chatMessages,
      ...claudeThinkingBlock,
    };
    const toolPayload = {
      ...basePayload,
      tools: [{
        name: "emit_json",
        description: "Return the extraction result as a single JSON object.",
        input_schema: { type: "object", additionalProperties: true },
      }],
      tool_choice: { type: "tool", name: "emit_json" },
    };

    let data = null;
    let usedFallback = false;
    let resObj = null;

    const firstTry = await fetchWithFallback(finalUrl, {
      method: "POST", headers,
      body: JSON.stringify(toolPayload),
    }, timeoutMs, "Claude extractor", false);
    resObj = firstTry?.res;

    if (!isResponseLike(resObj) || !resObj.ok) {
      const errText = await readResponseErrorText(resObj);
      const msg = String(errText || "").toLowerCase();
      const toolsUnsupported = msg.includes("tool") || msg.includes("input_schema") || msg.includes("tool_choice");
      if (!toolsUnsupported) {
        throw new Error(`HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(errText || "").slice(0, 500)}`);
      }
      usedFallback = true;
      const fallbackTry = await fetchWithFallback(finalUrl, {
        method: "POST", headers,
        body: JSON.stringify(basePayload),
      }, timeoutMs, "Claude extractor (fallback)", false);
      resObj = fallbackTry?.res;
      if (!isResponseLike(resObj) || !resObj.ok) {
        const fallbackErrText = await readResponseErrorText(resObj);
        throw new Error(`HTTP ${isResponseLike(resObj) ? resObj.status : 0}: ${String(fallbackErrText || "").slice(0, 500)}`);
      }
    }

    data = await readResponseJson(resObj);
    const contentBlocks = Array.isArray(data?.content) ? data.content : [];
    const toolUse = contentBlocks.find((x) => x?.type === "tool_use" && x?.name === "emit_json" && x?.input && typeof x.input === "object");
    if (toolUse && !usedFallback) {
      const raw = JSON.stringify(toolUse.input);
      return { parsed: toolUse.input, raw };
    }
    const content = contentBlocks.map((x) => (x?.type === "text" ? safeTrim(x?.text) : "")).filter(Boolean).join("\n").trim();
    if (!content) throw new Error("Claude extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callExtractorStrict({ url, apiKey, model, messages, timeoutMs, mode, format = "openai", temperature = 0, thinkingEnabled = false, thinkingLevel = "" }) {
    const runner = async () => {
      const f = safeTrim(format || "openai").toLowerCase();
      const result = f === "google" ? await callGoogleGenerative({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel })
        : f === "vertex" ? await callVertexGenerative({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel })
          : f === "claude" ? await callClaudeCompat({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel })
            : await callOpenAICompat({ url, apiKey, model, messages, timeoutMs, temperature, thinkingEnabled, thinkingLevel });
      if (!safeTrim(result?.raw)) throw new Error(_T.err_extractor_empty(mode));
      return { ...result, parsed: result?.parsed || null };
    };
    const m = mode === "A" ? mutexA : mode === "B" ? mutexB : null;
    const useConcurrency = mode === "A" ? (toInt(configCache.extractor_a_concurrency, 1) === 1) : (toInt(configCache.extractor_b_concurrency, 1) === 1);
    if (m && !useConcurrency) return await m.run(runner);
    return await runner();
  }

  function checkLorebookTrigger(l, text) {
    if (!l || typeof l !== 'object') return false;
    if (l.alwaysActive) return true;
    let matchFirst = false; let matchSecond = false;
    const getKeys = (raw) => {
      if (Array.isArray(raw)) return raw.filter(k => typeof k === 'string' && k.trim());
      if (typeof raw === 'string') return raw.split(',').map(k => k.trim()).filter(Boolean);
      return [];
    };
    const keys = getKeys(l.keyword || l.keywords || l.key || l.keys);
    const secondKeys = getKeys(l.secondary_keyword || l.secondkey || l.secondKey);
    if (!keys.length && !secondKeys.length) return false;
    if (l.useRegex) {
      try {
        for (const k of keys) if (new RegExp(k, "i").test(text)) { matchFirst = true; break; }
        for (const k of secondKeys) if (new RegExp(k, "i").test(text)) { matchSecond = true; break; }
      } catch (e) { }
    } else {
      const lowerText = String(text || "").toLowerCase();
      for (const k of keys) if (lowerText.includes(k.toLowerCase())) { matchFirst = true; break; }
      for (const k of secondKeys) if (lowerText.includes(k.toLowerCase())) { matchSecond = true; break; }
    }
    if (l.selective) {
      const needFirst = keys.length > 0; const needSecond = secondKeys.length > 0;
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
    
    const cleanInput = messages.filter(m =>
      !(m?.role === "system" && typeof m?.content === "string" && m.content.startsWith(`<${KNOWLEDGE_BLOCK_TAG}>`))
    );
    if (HARD_FREEZE_KB_FEATURES) return cleanInput;
    const isChatRole = (role) => role === "user" || role === "assistant" || role === "char";

    
    const { char, chat } = await getCurrentCharAndChatSafe();
    const staticKeys = getStaticCacheKeysForScope(char);
    const staticRaw = await Risuai.pluginStorage.getItem(staticKeys.staticKnowledgeChunks);
    let staticChunks = [];
    if (staticRaw) {
      try { staticChunks = JSON.parse(staticRaw); }
      catch (e) {
        console.warn(`${LOG} [injectKnowledge] failed to parse static_knowledge_chunks:`, e);
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
      const useRegex = entry?.useRegex === true || String(entry?.useRegex) === "true";
      const selective = entry?.selective === true || String(entry?.selective) === "true";
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
      console.warn(`${LOG} [injectKnowledge] allChunks is empty. Knowledge injection skipped.`);
      await Risuai.log(`${LOG} ` + _T.warn_no_chunks);
      return cleanInput;
    }

    const activeChunks = allChunks.filter((c) => c.alwaysActive);
    const inactiveChunks = allChunks.filter((c) => !c.alwaysActive);
    const vectorEligibleInactiveChunks = inactiveChunks.filter((c) => hasPrimaryTriggerKey(c));

    
    const firstChatIdx = (() => { const i = cleanInput.findIndex((m) => isChatRole(m?.role)); return i === -1 ? cleanInput.length : i; })();
    let lastChatIdx = -1;
    for (let i = cleanInput.length - 1; i >= 0; i--) { if (isChatRole(cleanInput[i]?.role)) { lastChatIdx = i; break; } }
    const chatHistoryForQuery = lastChatIdx !== -1 ? cleanInput.slice(firstChatIdx, lastChatIdx + 1) : [];
    const trimmedTurns = trimAfterLastUserBeforeSystem(chatHistoryForQuery).filter((m) => isChatRole(m?.role));
    const queryRounds = Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, 4));
    const recentMsgs = limitConversationByRounds(trimmedTurns, queryRounds);
    const resolvedQueryText = recentMsgs.map(m => String(m.content || "")).join("\n") || queryText || "";

    
    const topK = Math.max(1, toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k));
    const minScore = Number(configCache.vector_search_min_score) || 0;
    let topInactiveChunks = [];

    if (inactiveChunks.length > 0) {
      if (configCache.vector_search_enabled === 1 && vectorEligibleInactiveChunks.length > 0) {
        
        try {
          const finalQueryText = resolvedQueryText || " ";
          const queryVecs = await getEmbeddingsForTexts([finalQueryText], true);
          const queryVec = queryVecs[0];
          const store = await loadEmbeddingCacheStore();
          const cardName = char?.name || "Character";
          const cardKey = await getActiveCardKey(char);
          const cardBlock = store.cards?.[cardKey];

          const vectors = new Array(vectorEligibleInactiveChunks.length).fill(null);
          const missingTexts = [];
          const missingIndices = [];

          for (let i = 0; i < vectorEligibleInactiveChunks.length; i++) {
            const chunk = vectorEligibleInactiveChunks[i];
            const cacheKey = `chunk|${simpleHash(chunk.content)}`;
            const hit = !chunk.isDynamic ? cardBlock?.entries?.[cacheKey] : null;
            if (hit && Array.isArray(hit.vector) && hit.vector.length) vectors[i] = hit.vector;
            else { missingTexts.push(chunk.content); missingIndices.push(i); }
          }

          if (missingTexts.length > 0) {
            const cfg = resolveEmbeddingRuntimeConfig();
            const batchSize = getEmbeddingBatchSize(cfg.requestModel);
            for (let i = 0; i < missingTexts.length; i += batchSize) {
              const textsBatch = missingTexts.slice(i, i + batchSize);
              const batchIndices = missingIndices.slice(i, i + batchSize);
              await Risuai.log(`${LOG} Agent: Running vector computation (${i + 1}~${Math.min(i + batchSize, missingTexts.length)}/${missingTexts.length})...`);
              const remoteVecs = await fetchEmbeddingVectorsRemote(textsBatch, cfg);
              let newlyAddedBatch = false;
              for (let j = 0; j < textsBatch.length; j++) {
                const vec = remoteVecs[j];
                if (vec && vec.length) {
                  const idx = batchIndices[j];
                  vectors[idx] = vec;
                  const chunk = vectorEligibleInactiveChunks[idx];
                  if (!chunk.isDynamic) {
                    upsertEmbeddingCacheEntry(store, cardKey, cardName, `chunk|${simpleHash(chunk.content)}`, {
                      sourceType: "chunk", name: chunk.source, textHash: simpleHash(chunk.content), dims: vec.length, vector: vec,
                    }, cfg.requestModel);
                    newlyAddedBatch = true;
                  } else {
                    const memCacheKey = `${cfg.provider}|${cfg.format}|${cfg.url}|${cfg.requestModel}|${simpleHash(chunk.content)}`;
                    embeddingVectorCache.set(memCacheKey, vec);
                    if (embeddingVectorCache.size > 1000) embeddingVectorCache.delete(embeddingVectorCache.keys().next().value);
                  }
                }
              }
              if (newlyAddedBatch) await saveEmbeddingCacheStore();
            }
          }

          const scored = [];
          for (let i = 0; i < vectorEligibleInactiveChunks.length; i++) {
            if (vectors[i]) scored.push({ chunk: vectorEligibleInactiveChunks[i], score: cosineSimilarity(queryVec, vectors[i]) });
          }
          scored.sort((a, b) => b.score - a.score);
          topInactiveChunks = scored.filter((x) => x.score >= minScore).slice(0, topK).map((x) => x.chunk);
        } catch (e) {
          await Risuai.log(`${LOG} Vector search failed: ${e.message}, falling back to keyword matching.`);
        }
      }

      
      if (topInactiveChunks.length === 0) {
        if (resolvedQueryText.trim()) {
          const matchedChunks = [];
          for (const chunk of inactiveChunks) {
            if (checkLorebookTrigger({
              alwaysActive: false,
              keyword: chunk.keywords || chunk.keyword || "",
              keys: chunk.keys || [],
              selective: chunk.selective || false,
              secondkey: chunk.secondkey || "",
              useRegex: chunk.useRegex || false,
            }, resolvedQueryText)) {
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
              topInactiveChunks.push(...categoryBuckets[cat].slice(0, topK));
            }
          } else {
            const queryTokens = tokenizeForSearch(resolvedQueryText);
            const scored = inactiveChunks.map((chunk) => ({ chunk, score: scoreTokens(queryTokens, tokenizeForSearch(chunk.content)) }));
            scored.sort((a, b) => b.score - a.score);
            topInactiveChunks = scored.filter((x) => x.score > minScore).slice(0, topK).map(x => x.chunk);
          }
        }
      }
    }

    
    const grouped = {
      rp_instruction: { active: [], inactive: [] },
      information: { active: [], inactive: [] },
      output_format: { active: [], inactive: [] },
    };
    const addToGroup = (chunk, isActive) => {
      let cat = chunk.category || "information";
      if (!grouped[cat]) cat = "information";
      grouped[cat][isActive ? "active" : "inactive"].push(`[${chunk.source}]\n${chunk.content}`);
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

    const infoMerged = [buildText(grouped.information.active), buildText(grouped.information.inactive)].filter((t) => !!safeTrim(t)).join("\n\n");
    const block2 = infoMerged ? `[Information - Active]\n${infoMerged}` : "";

    const block3_arr = [];
    const t3a = buildText(grouped.output_format.inactive);
    const t3b = buildText(grouped.output_format.active);
    if (t3a) block3_arr.push(`[Output Format - Context]\n${t3a}`);
    if (t3b) block3_arr.push(`[Output Format - Active]\n${t3b}`);
    const block3 = block3_arr.join("\n\n");

    return injectKnowledgeByPlacementRules(cleanInput, { block1, block2, block3 });
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
      return !m.content.includes(`<${SYSTEM_INJECT_TAG}>`) && !m.content.includes(`<${SYSTEM_REWRITE_TAG}>`);
    });
    if (payload) {
      const injectedMsg = { role: "system", content: `<${SYSTEM_INJECT_TAG}>\n${JSON.stringify(payload, null, 2)}\n</${SYSTEM_INJECT_TAG}>` };
      return [injectedMsg, ...clean];
    }
    return clean;
  }

  async function getStaticDataPayload(char, chat, resolvedGlobalNote) {
    const lorebookEntries = await getCombinedLorebookEntries(char, chat);
    return {
      step0_preprocess_version: "cbs_placeholder_v2",
      desc: char?.desc || char?.description,
      globalNote: resolvedGlobalNote,
      lorebook: lorebookEntries.filter(l => l).map((l) => ({
        comment: l.comment,
        content: l.content,
        alwaysActive: l.alwaysActive === true || String(l.alwaysActive) === "true"
          || l.constant === true || String(l.constant) === "true",
        key: getPrimaryTriggerKeys(l).join(", "),
        secondkey: getSecondaryTriggerKeys(l).join(", "),
        selective: l.selective,
        useRegex: l.useRegex,
      })),
    };
  }

  async function runStep0Classification(char, chat, resolvedGlobalNote, staticDataHash, staticKeys, resumeMode = false, classifyDoneMode = false) {
    if (HARD_FREEZE_KB_FEATURES) {
      try { await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, "[]"); } catch { }
      try { await Risuai.pluginStorage.setItem(staticKeys.staticDataHash, staticDataHash); } catch { }
      try { await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1"); } catch { }
      return;
    }
    await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "");
    const chunks = [];
    let chunkId = 0;
    const embedCfg = resolveEmbeddingRuntimeConfig();
    const isVectorEnabled = configCache.vector_search_enabled === 1;

    const addChunks = (source, content, alwaysActive, triggerMeta = null) => {
      if (!content) return;
      const preprocessed = cbsToIndexPlaceholders(content);
      const splits = splitIntoParagraphChunks(preprocessed);
      const primaryKeys = getPrimaryTriggerKeys(triggerMeta);
      const secondaryKeys = getSecondaryTriggerKeys(triggerMeta);
      const useRegex = triggerMeta?.useRegex === true || String(triggerMeta?.useRegex) === "true";
      const selective = triggerMeta?.selective === true || String(triggerMeta?.selective) === "true";
      splits.forEach((text) => {
        if (text.trim()) {
          chunks.push({
            id: `chk_${chunkId++}`,
            source,
            content: text,
            alwaysActive,
            category: alwaysActive ? "information" : "unknown",
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

    addChunks("Character Description", char?.desc || char?.description, true);
    addChunks("Global Note", resolvedGlobalNote, true);

    const lorebook = await getCombinedLorebookEntries(char, chat);
    lorebook.forEach((l, idx) => {
      if (!l) return;
      const source = l.comment || `Lorebook ${idx}`;
      const isActive = l.alwaysActive === true || String(l.alwaysActive) === "true"
        || l.constant === true || String(l.constant) === "true";
      addChunks(source, l.content, isActive, l);
    });

    if (chunks.length === 0) {
      await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, "[]");
      await Risuai.pluginStorage.setItem(staticKeys.staticDataHash, staticDataHash);
      await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
      return;
    }

    if (resumeMode) {
      try {
        const savedChunksRaw = await Risuai.pluginStorage.getItem(staticKeys.staticKnowledgeChunks);
        if (savedChunksRaw) {
          const savedChunks = JSON.parse(savedChunksRaw);
          if (Array.isArray(savedChunks) && savedChunks.length > 0) {
            const savedMap = new Map(savedChunks.map(c => [c.id, c]));
            for (const chunk of chunks) {
              const saved = savedMap.get(chunk.id);
              if (saved?.category) chunk.category = saved.category;
            }
            const inactiveChunks2 = chunks.filter((c) => !c.alwaysActive && hasPrimaryTriggerKey(c));
            if (inactiveChunks2.length > 0 && configCache.vector_search_enabled === 1) {
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
                for (let i = 0; i < missingChunks2.length; i += embedBatchSize) {
                  const batch = missingChunks2.slice(i, i + embedBatchSize);
                  const vecs = await fetchEmbeddingVectorsRemote(batch.map(c => c.content), cfg);
                  let newlyAdded = false;
                  vecs.forEach((vec, idx) => {
                    if (vec && vec.length) {
                      const chunk = batch[idx];
                      const textHash = simpleHash(chunk.content);
                      upsertEmbeddingCacheEntry(store, cardKey, charName, `chunk|${textHash}`, {
                        sourceType: "chunk", name: chunk.source, textHash, dims: vec.length, vector: vec,
                      }, cfg.requestModel);
                      newlyAdded = true;
                    }
                  });
                  if (newlyAdded) await saveEmbeddingCacheStore(store);
                }
              }
            }
            await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, JSON.stringify(chunks));
            await Risuai.pluginStorage.setItem(staticKeys.staticDataHash, staticDataHash);
            await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
            await new Promise(r => setTimeout(r, 1000));
            return;
          }
        }
      } catch { }
    }

    const anchor = configCache.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt;
    const resolved = resolveExtractorConfig();
    const targetModel = safeTrim(configCache.init_bootstrap_target_model) === "B" ? "B" : "A";
    const endpoint = targetModel === "B" ? resolved.b : resolved.a;

    const chunksToClassify = chunks.filter(c => !c.alwaysActive);
    const skipClassification = classifyDoneMode || !safeTrim(endpoint.url) || !safeTrim(endpoint.model);
    if (classifyDoneMode) {
      
      try {
        const savedRaw = await Risuai.pluginStorage.getItem(staticKeys.staticKnowledgeChunks);
        if (savedRaw) {
          const savedChunks = JSON.parse(savedRaw);
          if (Array.isArray(savedChunks) && savedChunks.length > 0) {
            const savedMap = new Map(savedChunks.map(c => [c.id, c]));
            for (const chunk of chunks) {
              const saved = savedMap.get(chunk.id);
              if (saved?.category) chunk.category = saved.category;
            }
          }
        }
      } catch { }
    } else if (!skipClassification && chunksToClassify.length > 0) {
      const batchSize = 10;
      const totalBatches = Math.ceil(chunksToClassify.length / batchSize);
      for (let i = 0; i < chunksToClassify.length; i += batchSize) {
        const currentBatch = Math.floor(i / batchSize) + 1;
        await Risuai.log(`${LOG} Running initial data classification (${currentBatch}/${totalBatches})...`);
        const batch = chunksToClassify.slice(i, i + batchSize);
        const payload = batch.map((c) => ({ id: c.id, text: c.content }));
        const prefillPrompt = safeTrim(configCache.advanced_prefill_prompt);
        const prereplyPrompt = safeTrim(configCache.advanced_prereply_prompt);
        const assistantPrefill = prefillPrompt
          ? [prefillPrompt, prereplyPrompt].filter((s) => !!safeTrim(s)).join("\n")
          : "";
        const messages = buildModelMessages(
          anchor,
          "Classify these blocks:\n" + JSON.stringify(payload, null, 2),
          assistantPrefill,
          prereplyPrompt
        );

        try {
          const result = await callExtractorStrict({
            url: endpoint.url, apiKey: endpoint.key, model: endpoint.model, format: endpoint.format, temperature: endpoint.temperature,
            messages, timeoutMs: configCache.timeout_ms, mode: "Step0_Classification",
          });
          const parsed = result.parsed;
          if (Array.isArray(parsed)) {
            parsed.forEach((p) => {
              const chunk = chunks.find((c) => c.id === p.id);
              if (chunk && !chunk.alwaysActive) {
                const cat = String(p.category || "").toLowerCase();
                if (cat.includes("instruction")) chunk.category = "rp_instruction";
                else if (cat.includes("format") || cat.includes("output")) chunk.category = "output_format";
                else chunk.category = "information";
              }
            });
          }
          await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, JSON.stringify(chunks));
        } catch (err) {
          console.warn(`${LOG} Classification batch failed:`, err);
        }
      }
      await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, JSON.stringify(chunks));
    }

    const inactiveChunks = chunks.filter((c) => !c.alwaysActive && hasPrimaryTriggerKey(c));
    if (inactiveChunks.length > 0 && configCache.vector_search_enabled === 1) {
      embeddingCacheStore = null;
      const store = await loadEmbeddingCacheStore();
      const charName = safeTrim(char?.name || "Character");
      const cardKey = await getActiveCardKey(char);

      const currentHashSet = new Set(inactiveChunks.map(c => `chunk|${simpleHash(c.content)}`));
      const cardEntries = store.cards?.[cardKey]?.entries;
      if (cardEntries) {
        let orphanFound = false;
        for (const cacheKey of Object.keys(cardEntries)) {
          if (cacheKey.startsWith("chunk|") && !currentHashSet.has(cacheKey)) {
            delete cardEntries[cacheKey];
            orphanFound = true;
          }
        }
        if (orphanFound) await saveEmbeddingCacheStore(store);
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
            const textsBatch = chunksBatch.map(c => c.content);
            const vecs = await fetchEmbeddingVectorsRemote(textsBatch, cfg);
            let newlyAdded = false;

            vecs.forEach((vec, idx) => {
              if (vec && vec.length) {
                const chunk = chunksBatch[idx];
                const textHash = simpleHash(chunk.content);
                upsertEmbeddingCacheEntry(store, cardKey, charName, `chunk|${textHash}`, {
                  sourceType: "chunk",
                  name: chunk.source,
                  textHash: textHash,
                  dims: vec.length,
                  vector: vec,
                }, cfg.requestModel);
                newlyAdded = true;
                successCount++;
              }
            });

            if (newlyAdded) {
              await saveEmbeddingCacheStore(store);
            }
          }
        } catch (e) {
          try { await saveEmbeddingCacheStore(store); } catch (err) { }
          throw e;
        }
      }
    }

    await Risuai.pluginStorage.setItem(staticKeys.staticKnowledgeChunks, JSON.stringify(chunks));
    await Risuai.pluginStorage.setItem(staticKeys.staticDataHash, staticDataHash);
    await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1");
    await new Promise(r => setTimeout(r, 1000));
  }

  async function resolveCurrentChatIndex() {
    try {
      if (typeof Risuai.getCurrentChatIndex === "function") return await Risuai.getCurrentChatIndex();
    } catch { }
    return -1;
  }

  async function getCurrentCharAndChatSafe() {
    try {
      const char = await Risuai.getCharacter();
      const charIdx = typeof Risuai.getCurrentCharacterIndex === "function" ? await Risuai.getCurrentCharacterIndex() : -1;
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

  async function performChatCleanup(userMsgCount) {
    const { charIdx, chatIndex, chat } = await getCurrentCharAndChatSafe();
    if (!chat || chatIndex < 0 || charIdx < 0 || !Array.isArray(chat.localLore)) return false;

    let loreModified = false;
    const newLocalLore = [];

    for (let i = 0; i < chat.localLore.length; i++) {
      let entry = chat.localLore[i];
      if (!entry || typeof entry.content !== "string") { newLocalLore.push(entry); continue; }
      const originalContent = entry.content;

      
      
      
      const owMatch = originalContent.match(/^## .*?\n<!-- written_at_turn: (\d+) -->/m);
      if (owMatch) {
        const writtenAt = Number(owMatch[1]);
        if (Number.isFinite(writtenAt) && writtenAt > userMsgCount) {
          loreModified = true;
          continue; 
        }
        newLocalLore.push(entry);
        continue;
      }

      if (!hasTurnMarkers(originalContent)) { newLocalLore.push(entry); continue; }

      const headerMatch = originalContent.match(/^## .*?\n/);
      const header = headerMatch ? headerMatch[0] : "";
      const rest = headerMatch ? originalContent.slice(header.length) : originalContent;

      const blocks = splitTurnBlocks(rest);
      const validBlocks = [];
      let entryChanged = false;

      for (const block of blocks) {
        const turn = parseTurnNumberFromBlock(block);
        if (turn !== null) {
          if (turn > userMsgCount) { entryChanged = true; continue; }
        }
        if (block.trim()) validBlocks.push(block.trim());
      }

      if (entryChanged) {
        loreModified = true;
        if (validBlocks.length === 0) continue;
        else entry.content = header + validBlocks.join("\n\n");
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
    const preset = EMBEDDING_PROVIDER_PRESETS[p] || EMBEDDING_PROVIDER_PRESETS.custom_api;
    return Array.isArray(preset.options) ? preset.options : EMBEDDING_MODEL_OPTIONS;
  }

  function getEmbeddingOptionsDedup(provider) {
    const dedup = []; const seen = new Set();
    for (const opt of getEmbeddingOptionsByProvider(provider)) {
      const value = safeTrim(opt?.value);
      if (!value || seen.has(value)) continue;
      seen.add(value); dedup.push({ value, label: String(opt?.label || value) });
    }
    return dedup;
  }

  function fillEmbeddingDatalist(options) {
    const el = document.getElementById(MODEL_DATALIST_EMBED_ID);
    if (!el) return;
    const dedup = []; const seen = new Set();
    for (const opt of options || []) {
      const value = safeTrim(opt?.value);
      if (!value || seen.has(value)) continue;
      seen.add(value); dedup.push({ value, label: String(opt?.label || value) });
    }
    el.innerHTML = dedup.map((opt) => `<option value="${escapeHtml(opt.value)}">${escapeHtml(opt.label)}</option>`).join("");
  }

  function renderFormatOptions(selected) {
    return API_FORMAT_OPTIONS.map((opt) => {
      const isSel = opt.value === selected ? "selected" : "";
      return `<option value="${escapeHtml(opt.value)}" ${isSel}>${escapeHtml(opt.label)}</option>`;
    }).join("");
  }

  function getModelsByProvider(provider) {
    const p = safeTrim(provider);
    if (p === "google_cloud") return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("gemini-"));
    if (p === "vertex_ai") return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("gemini-"));
    if (p === "anthropic") return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("claude-"));
    if (p === "openai") return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("gpt-") || m.value.startsWith("chatgpt-") || m.value.startsWith("o"));
    if (p === "grok") return EXTRACTOR_MODEL_OPTIONS.filter((m) => m.value.startsWith("grok-"));
    if (p === "github_copilot") return [];
    if (p === "custom_api" || p === "openrouter") return [];
    return [];
  }

  async function getProviderModelsWithCache({ provider, url, cacheKey, tsKey, apiKey }) {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(cacheKey);
    const cachedTs = Number(await Risuai.safeLocalStorage.getItem(tsKey));
    let staleCache = [];
    if (cachedText) { try { const parsed = JSON.parse(cachedText); if (Array.isArray(parsed)) staleCache = parsed; } catch { } }
    if (staleCache.length > 0 && Number.isFinite(cachedTs) && now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS) return staleCache;
    try {
      let headers = { Accept: "application/json" };
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
      const { res } = await fetchWithFallback(url, { method: "GET", headers }, 12000, `${provider} model list`, false);
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) return staleCache;
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") { try { data = JSON.parse(res.data); } catch { } }
      const rawList = Array.isArray(data?.data) ? data.data : Array.isArray(data?.models) ? data.models : Array.isArray(data) ? data : [];
      const list = rawList.map((m) => safeTrim(m?.id || m?.name || m)).filter((id) => !!id).map((id) => ({ value: id, label: id }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(cacheKey, JSON.stringify(list));
        await Risuai.safeLocalStorage.setItem(tsKey, String(now));
      }
      return list.length ? list : staleCache;
    } catch { return staleCache; }
  }

  async function getOpenRouterModels() {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(OPENROUTER_MODELS_CACHE_KEY);
    const cachedTs = Number(await Risuai.safeLocalStorage.getItem(OPENROUTER_MODELS_CACHE_TS_KEY));
    let staleCache = [];
    if (cachedText) { try { const parsed = JSON.parse(cachedText); if (Array.isArray(parsed)) staleCache = parsed; } catch { } }
    if (staleCache.length > 0 && Number.isFinite(cachedTs) && now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS) return staleCache;
    try {
      const headers = { Accept: "application/json" };
      const maybeKey = (safeTrim(configCache.extractor_a_provider) === "openrouter" ? safeTrim(configCache.extractor_a_key) : "") || (safeTrim(configCache.extractor_b_provider) === "openrouter" ? safeTrim(configCache.extractor_b_key) : "") || (safeTrim(configCache.embedding_provider) === "openrouter" ? safeTrim(configCache.embedding_key) : "");
      if (maybeKey) headers.Authorization = `Bearer ${maybeKey}`;
      const { res, via } = await fetchWithFallback(OPENROUTER_MODELS_URL, { method: "GET", headers }, 12000, "OpenRouter model list", true);
      await Risuai.safeLocalStorage.setItem("last_or_models_via", String(via || "(unknown)"));
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) { await Risuai.safeLocalStorage.setItem("last_or_models_error", `HTTP ${status}`); return staleCache; }
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") { try { data = JSON.parse(res.data); } catch { } }
      const rawList = Array.isArray(data?.data) ? data.data : Array.isArray(data?.data?.data) ? data.data.data : Array.isArray(data?.models) ? data.models : [];
      const list = rawList.filter((m) => { const id = safeTrim(m?.id || m?.name || m); return !hasEmbeddingModality(m) && !isLikelyEmbeddingModel(m, id); }).map((m) => { const id = safeTrim(m?.id || m?.name || m); if (!id) return null; return { value: id, label: formatOpenRouterModelLabel(m, id) }; }).filter(Boolean);
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(OPENROUTER_MODELS_CACHE_KEY, JSON.stringify(list));
        await Risuai.safeLocalStorage.setItem(OPENROUTER_MODELS_CACHE_TS_KEY, String(now));
        await Risuai.safeLocalStorage.setItem("last_or_models_error", "");
      } else { await Risuai.safeLocalStorage.setItem("last_or_models_error", "OpenRouter model list is empty."); }
      return list.length > 0 ? list : staleCache;
    } catch (e) {
      await Risuai.safeLocalStorage.setItem("last_or_models_error", String(e?.message || e || "unknown error")); return staleCache;
    }
  }

  async function getGrokModels() {
    const key = (safeTrim(configCache.extractor_a_provider) === "grok" ? safeTrim(configCache.extractor_a_key) : "") || (safeTrim(configCache.extractor_b_provider) === "grok" ? safeTrim(configCache.extractor_b_key) : "");
    return await getProviderModelsWithCache({ provider: "grok", url: GROK_MODELS_URL, cacheKey: GROK_MODELS_CACHE_KEY, tsKey: GROK_MODELS_CACHE_TS_KEY, apiKey: key });
  }

  function formatOpenRouterModelLabel(modelObj, fallbackId = "") {
    const id = safeTrim(modelObj?.id || modelObj?.name || fallbackId);
    const pricing = modelObj?.pricing || {};
    const topPricing = modelObj?.top_provider?.pricing || {};
    const inRaw = Number(pricing?.prompt ?? pricing?.input ?? pricing?.input_text ?? pricing?.prompt_token ?? topPricing?.prompt ?? topPricing?.input);
    const outRaw = Number(pricing?.completion ?? pricing?.output ?? pricing?.output_text ?? pricing?.completion_token ?? topPricing?.completion ?? topPricing?.output);
    const formatPerMillion = (v) => { if (!Number.isFinite(v) || v < 0) return ""; return `$${(v * 1000000).toFixed(3)}/M`; };
    const inLabel = formatPerMillion(inRaw); const outLabel = formatPerMillion(outRaw);
    if (inLabel && outLabel) return `${id} | in ${inLabel} out ${outLabel}`;
    if (inLabel) return `${id} | in ${inLabel}`;
    if (outLabel) return `${id} | out ${outLabel}`;
    return id;
  }

  function hasEmbeddingModality(modelObj) {
    const raw = [...(Array.isArray(modelObj?.output_modalities) ? modelObj.output_modalities : []), ...(Array.isArray(modelObj?.architecture?.output_modalities) ? modelObj.architecture.output_modalities : []), modelObj?.architecture?.modality, modelObj?.modality].map((x) => String(x || "").toLowerCase().trim()).filter(Boolean);
    return raw.includes("embedding") || raw.includes("embeddings");
  }

  function isLikelyEmbeddingModel(modelObj, id = "") {
    const outputModalities = Array.isArray(modelObj?.output_modalities) ? modelObj.output_modalities : Array.isArray(modelObj?.architecture?.output_modalities) ? modelObj.architecture.output_modalities : [];
    if (outputModalities.map((x) => String(x || "").toLowerCase()).includes("embeddings")) return true;
    const src = [id, modelObj?.id, modelObj?.name, modelObj?.description, modelObj?.architecture?.modality, modelObj?.architecture?.input_modalities, modelObj?.architecture?.output_modalities, modelObj?.top_provider?.max_completion_tokens].map((x) => (typeof x === "string" ? x : Array.isArray(x) ? x.join(" ") : String(x || ""))).join(" ").toLowerCase();
    return /(embed|embedding)/i.test(src);
  }

  async function getOpenRouterEmbeddingModels() {
    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(OPENROUTER_EMBED_MODELS_CACHE_KEY);
    const cachedTs = Number(await Risuai.safeLocalStorage.getItem(OPENROUTER_EMBED_MODELS_CACHE_TS_KEY));
    let staleCache = [];
    if (cachedText) { try { const parsed = JSON.parse(cachedText); if (Array.isArray(parsed)) staleCache = parsed; } catch { } }
    if (staleCache.length > 0 && Number.isFinite(cachedTs) && now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS) return staleCache;
    try {
      const headers = { Accept: "application/json" };
      const maybeKey = (safeTrim(configCache.extractor_a_provider) === "openrouter" ? safeTrim(configCache.extractor_a_key) : "") || (safeTrim(configCache.extractor_b_provider) === "openrouter" ? safeTrim(configCache.extractor_b_key) : "") || (safeTrim(configCache.embedding_provider) === "openrouter" ? safeTrim(configCache.embedding_key) : "");
      if (maybeKey) headers.Authorization = `Bearer ${maybeKey}`;
      const { res } = await fetchWithFallback(OPENROUTER_EMBED_MODELS_URL, { method: "GET", headers }, 12000, "OpenRouter embedding model list", true);
      const data = await readResponseJson(res);
      const rawList = Array.isArray(data?.data) ? data.data : Array.isArray(data?.data?.data) ? data.data.data : Array.isArray(data?.models) ? data.models : [];
      const mapped = rawList.map((m) => { const id = safeTrim(m?.id || m?.name || m); if (!id) return null; return { value: id, label: formatOpenRouterModelLabel(m, id), raw: m }; }).filter(Boolean);
      const seen = new Set();
      const list = mapped.filter((x) => { const key = safeTrim(x?.value || ""); if (!key || seen.has(key)) return false; seen.add(key); return true; }).map((x) => ({ value: x.value, label: x.label }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(OPENROUTER_EMBED_MODELS_CACHE_KEY, JSON.stringify(list));
        await Risuai.safeLocalStorage.setItem(OPENROUTER_EMBED_MODELS_CACHE_TS_KEY, String(now));
      }
      return list.length ? list : staleCache;
    } catch { return staleCache; }
  }

  async function getCopilotModels() {
    const rawKey = (safeTrim(configCache.extractor_a_provider) === "github_copilot" ? safeTrim(configCache.extractor_a_key) : "") || (safeTrim(configCache.extractor_b_provider) === "github_copilot" ? safeTrim(configCache.extractor_b_key) : "");
    if (!rawKey) return [];

    const now = Date.now();
    const cachedText = await Risuai.safeLocalStorage.getItem(COPILOT_MODELS_CACHE_KEY);
    const cachedTs = Number(await Risuai.safeLocalStorage.getItem(COPILOT_MODELS_CACHE_TS_KEY));
    let staleCache = [];
    if (cachedText) { try { const parsed = JSON.parse(cachedText); if (Array.isArray(parsed)) staleCache = parsed; } catch { } }
    if (staleCache.length > 0 && Number.isFinite(cachedTs) && now - cachedTs <= OPENROUTER_MODELS_CACHE_TTL_MS) return staleCache;

    try {
      const bearerToken = await getCopilotBearerToken(rawKey);
      const authKey = bearerToken || rawKey;
      let headers = { Accept: "application/json", Authorization: `Bearer ${authKey}` };
      const { res } = await fetchWithFallback(COPILOT_MODELS_URL, { method: "GET", headers }, 12000, "Copilot model list", true);
      const status = Number(res?.status ?? res?.statusCode ?? 200);
      if (Number.isFinite(status) && status >= 400) return staleCache;
      let data = await readResponseJson(res);
      if (!data && typeof res?.data === "string") { try { data = JSON.parse(res.data); } catch { } }
      const rawList = Array.isArray(data?.data) ? data.data : Array.isArray(data?.models) ? data.models : Array.isArray(data) ? data : [];
      const list = rawList.map((m) => safeTrim(m?.id || m?.name || m)).filter((id) => !!id).map((id) => ({ value: id, label: id }));
      if (list.length > 0) {
        await Risuai.safeLocalStorage.setItem(COPILOT_MODELS_CACHE_KEY, JSON.stringify(list));
        await Risuai.safeLocalStorage.setItem(COPILOT_MODELS_CACHE_TS_KEY, String(now));
      }
      return list.length ? list : staleCache;
    } catch { return staleCache; }
  }

  function fillModelDatalist(datalistId, models) {
    const el = document.getElementById(datalistId);
    if (!el) return;
    el.innerHTML = models.map((opt) => `<option value="${escapeHtml(opt.value)}">${escapeHtml(opt.label || opt.value)}</option>`).join("");
  }

  function fillModelSuggestionList(containerId, inputId, models) {
    const wrap = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    if (!wrap || !input) return;
    const list = Array.isArray(models) ? models : [];
    if (!list.length) { wrap.style.display = "none"; wrap.classList.add("hidden"); wrap.innerHTML = ""; return; }
    wrap.style.display = ""; wrap.classList.remove("hidden");
    wrap.innerHTML = list.map((opt) => `<button type="button" class="pse-model-suggestion-item" data-model-value="${escapeHtml(safeTrim(opt?.value || ""))}">${escapeHtml(String(opt?.label || opt?.value || ""))}</button>`).join("");
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
    return Array.from(el.querySelectorAll("option")).map((o) => {
      const value = safeTrim(o.getAttribute("value") || "");
      const label = safeTrim(o.textContent || value);
      if (!value) return null; return { value, label: label || value };
    }).filter(Boolean);
  }

  function bindScrollableSuggestionDropdown({ inputId, containerId, datalistId }) {
    const input = document.getElementById(inputId);
    const wrap = document.getElementById(containerId);
    if (!input || !wrap) return;
    const render = () => {
      const q = safeTrim(input.value || "").toLowerCase();
      const options = getDatalistOptions(datalistId);
      const filtered = q ? options.filter((x) => String(x.value || "").toLowerCase().includes(q) || String(x.label || "").toLowerCase().includes(q)) : options;
      fillModelSuggestionList(containerId, inputId, filtered);
    };
    input.addEventListener("click", () => { render(); wrap.style.display = ""; wrap.classList.remove("hidden"); });
    input.addEventListener("input", () => { render(); wrap.style.display = ""; wrap.classList.remove("hidden"); });
    input.addEventListener("blur", () => { setTimeout(() => { wrap.style.display = "none"; wrap.classList.add("hidden"); }, 120); });
    wrap.style.display = "none"; wrap.classList.add("hidden");
  }

  function setFormatByProvider(providerId, formatId, allowManualForCustom, forceApply = true) {
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

  function injectStyles() {
    if (document.getElementById("pse-styles")) return;
    const s = document.createElement("style");
    s.id = "pse-styles";
    s.textContent = `
      :root {
        --pse-overlay: rgba(0, 0, 0, 0.4);
        --pse-card-bg: #ffffff;
        --pse-card-text: #171717;
        --pse-muted: #666666;
        --pse-section-bg: #f5f5f5;
        --pse-section-border: #e5e5e5;
        --pse-input-bg: #ffffff;
        --pse-input-border: #d4d4d4;
        --pse-tab-bg: #f5f5f5;
        --pse-tab-active-bg: #262626;
        --pse-tab-active-text: #ffffff;
        --pse-card-shadow: rgba(0, 0, 0, 0.12);
        --pse-call-a-border: #a3a3a3;
        --pse-call-b-border: #737373;
        --pse-embed-border: #8c8c8c;
        --pse-accent-blue: #2979ff;
        --pse-accent-green: #00e676;
        --pse-accent-amber: #ffab00;
        --pse-accent-cyan: #00e5ff;
        --pse-accent-rose: #ff1744;
        --pse-accent-indigo: #651fff;
        --pse-accent-orange: #ff9100;
        --pse-accent-violet: #d500f9;
        --pse-accent-yellow: #ffea00;
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
          --pse-muted: #a3a3a3;
          --pse-section-bg: #262626;
          --pse-section-border: #383838;
          --pse-input-bg: #0a0a0a;
          --pse-input-border: #4a4a4a;
          --pse-tab-bg: #262626;
          --pse-tab-active-bg: #f5f5f5;
          --pse-tab-active-text: #171717;
          --pse-card-shadow: rgba(0, 0, 0, 0.45);
          --pse-call-a-border: #8c8c8c;
          --pse-call-b-border: #a3a3a3;
          --pse-embed-border: #737373;
          --pse-accent-blue: #2979ff;
          --pse-accent-green: #00e676;
          --pse-accent-amber: #ffab00;
          --pse-accent-cyan: #00e5ff;
          --pse-accent-rose: #ff1744;
          --pse-accent-indigo: #651fff;
          --pse-accent-orange: #ff9100;
          --pse-accent-violet: #d500f9;
          --pse-accent-yellow: #ffea00;
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
        background:var(--pse-section-bg);
        border:1px solid var(--pse-section-border);
        padding:12px;
        border-radius:8px;
        margin:12px 0;
      }
      .pse-model-section-a {
        border:1px solid var(--pse-section-border);
        border-left:4px solid var(--pse-accent-blue);
        background:linear-gradient(180deg, rgba(41, 121, 255, 0.1) 0%, var(--pse-input-bg) 100%);
      }
      .pse-model-section-b {
        border:1px solid var(--pse-section-border);
        border-left:4px solid var(--pse-accent-green);
        background:linear-gradient(180deg, rgba(0, 230, 118, 0.1) 0%, var(--pse-input-bg) 100%);
      }
      .pse-model-section-embed {
        border:1px solid var(--pse-section-border);
        border-left:4px solid var(--pse-accent-amber);
        background:linear-gradient(180deg, rgba(255, 171, 0, 0.1) 0%, var(--pse-input-bg) 100%);
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
      .pse-call-card {
        border:1px solid var(--pse-section-border); border-left:4px solid var(--pse-accent-blue);
        background:linear-gradient(180deg, rgba(41, 121, 255, 0.1) 0%, var(--pse-input-bg) 100%);
        border-radius:10px; padding:12px;
      }
.pse-call-card[data-call-parity="odd"] { border-left-color:var(--pse-accent-green); background:linear-gradient(180deg, rgba(0, 230, 118, 0.12) 0%, var(--pse-input-bg) 100%); }
      .pse-call-card[data-call-parity="even"] { border-left-color:var(--pse-accent-blue); background:linear-gradient(180deg, rgba(41, 121, 255, 0.12) 0%, var(--pse-input-bg) 100%); }
      .pse-page[data-page="3"] .pse-section:first-child { border-left:4px solid var(--pse-accent-indigo); }
      .pse-page[data-page="5"] .pse-section { border-left: 4px solid var(--pse-accent-green); background: linear-gradient(180deg, rgba(0, 230, 118, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-page[data-page="6"] .pse-section { border-left: 4px solid var(--pse-accent-amber); background: linear-gradient(180deg, rgba(255, 171, 0, 0.1) 0%, var(--pse-section-bg) 100%); }
      .pse-call-head { display:grid; grid-template-columns: 1fr minmax(110px, auto) minmax(90px, auto) auto; gap:8px; align-items:end; }
      .pse-call-row2 { margin-top:8px; display:grid; grid-template-columns: minmax(180px, auto) 1fr; gap:8px; align-items:end; }
      .pse-assembly {
        border:1px dashed var(--pse-section-border); border-left:4px solid var(--pse-accent-violet);
        background:linear-gradient(180deg, rgba(213, 0, 249, 0.08) 0%, var(--pse-input-bg) 100%);
        border-radius:8px; padding:10px; font-size:12px; line-height:1.55; color:var(--pse-card-text);
      }
      .pse-entry-block { border:1px solid var(--pse-section-border); border-radius:8px; background:var(--pse-input-bg); padding:8px; }
      .pse-entry-block[data-cache-parity="even"] { border-left:4px solid var(--pse-accent-blue); background:linear-gradient(180deg, rgba(41, 121, 255, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-entry-block[data-cache-parity="odd"] { border-left:4px solid var(--pse-accent-green); background:linear-gradient(180deg, rgba(0, 230, 118, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-entry-grid { display:grid; grid-template-columns: 1fr minmax(110px, auto) minmax(90px, auto) auto; gap:8px; align-items:end; }      .pse-entry-grid-row2 { margin-top:8px; display:grid; grid-template-columns: 1fr; gap:8px; }
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
        .pse-entry-remove { width:100%; }
        .pse-btn-row { flex-direction:column; }
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
    const reason = safeTrim(String(reasonRaw || "")) || _T.unknown_reason || "Unknown error";
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

  async function abortMainModelWithAuxError(message) {
    const msg = String(message || _T.aux_abort_default);
    const suffix = _T.aux_abort_suffix || "Main model request was intercepted to save API quota.";
    await Risuai.safeLocalStorage.setItem("last_lore_sync_error", `${msg}\n(${suffix})`);
    await Risuai.log(`${LOG} ❌ ${msg} — ${suffix}`);
    try {
      const { requestKeys } = await getScopedKeysForCurrentChat();
      try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastReqHash); } catch { }
      try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastExtractedData); } catch { }
    } catch { }
    try { await Risuai.safeLocalStorage.removeItem(LAST_REQ_HASH_KEY); } catch { }
    throw new Error(`[RisuAI Agent Error] ${msg}\n(${suffix})`);
  }

  async function renderSettingsUI() {
    await ensureLangInitialized(true);
    LORE_WRITE_MODE_OPTIONS = [{ value: "append", label: _T.append }, { value: "overwrite", label: _T.overwrite }];
    await refreshConfig();
    injectStyles();

    // Remove any existing overlay to avoid duplicates
    const existing = document.getElementById("pse-overlay-root");
    if (existing) existing.remove();

    // Create an overlay div instead of replacing document.body.
    // Replacing document.body destroys the host framework's (Svelte) reactive
    // bindings and event listeners, which causes the UI to freeze in local dev.
    const overlayRoot = document.createElement("div");
    overlayRoot.id = "pse-overlay-root";
    overlayRoot.style.cssText = "position:fixed;inset:0;z-index:9999;overflow:auto;";

    overlayRoot.innerHTML = `
      <div class="pse-body">
        <div class="pse-card">
          <h1 class="pse-title">👤 RisuAI Agent v2.0.2</h1>
          <div id="pse-status" class="pse-status"></div>
          ${renderModelDatalists()}

          <div class="pse-tabs">
            ${`<button class="pse-tab active" data-page="7">${_T.tab_help}</button>
            <button class="pse-tab" data-page="8">${_T.tab_enable}</button>
            <button class="pse-tab frozen" data-page="6">${_T.tab_closed}</button>`}
          </div>
          <div class="pse-tabs pse-tabs-secondary">
            ${`<button class="pse-tab" data-page="1">${_T.tab_model}</button>
            <button class="pse-tab" data-page="2">${_T.tab_entry}</button>
            <button class="pse-tab frozen" data-page="5">${_T.tab_closed}</button>`}
          </div>

          <div class="pse-page active" data-page="7">
            <div class="pse-section" style="border-left:4px solid var(--pse-accent-blue);background:linear-gradient(180deg,rgba(41,121,255,0.08) 0%,var(--pse-input-bg) 100%);">
              <label class="pse-label" style="margin-bottom:6px;">🌐 Language / 語言 / 언어</label>
              <div style="display:flex;gap:8px;">
                ${["en","tc","ko"].map(code => {
                  const labels = {en:"English", tc:"繁體中文", ko:"한국어"};
                  const active = (configCache?.ui_language || "en") === code;
                  return `<button class="pse-btn pse-lang-btn${active?" pse-lang-active":""}" data-lang="${code}" type="button" style="flex:1;padding:7px 0;font-size:13px;${active?"background:var(--pse-accent-blue);color:#fff;border-color:var(--pse-accent-blue);":"color:#111 !important;"}">${labels[code]}</button>`;
                }).join("")}
              </div>
            </div>
            <div class="pse-section">
              <div style="margin-bottom:6px;padding:7px 10px;border-radius:6px;background:rgba(255,171,0,0.1);border:1px solid rgba(255,171,0,0.3);font-size:var(--pse-font-size-small);color:var(--pse-accent-amber);">
                ${escapeHtml(_T.lore_warn)}
              </div>
              <div class="pse-assembly">
                ${_T.help_html}
              </div>
            </div>
          </div>

          <div class="pse-page" data-page="8">
            <div class="pse-section" style="border-left:4px solid var(--pse-accent-blue); background:linear-gradient(180deg, rgba(41, 121, 255, 0.1) 0%, var(--pse-input-bg) 100%); padding:10px 12px;">
              <button id="pse-reset-agent-defaults" class="pse-btn cache" type="button" style="padding:8px 14px;font-size:12px;white-space:nowrap;width:100%;">${_T.btn_reset}</button>
            </div>
            <div class="pse-section pse-frozen-wrap" style="border-left:4px solid var(--pse-accent-cyan); background:linear-gradient(180deg, rgba(0, 229, 255, 0.1) 0%, var(--pse-input-bg) 100%); padding:10px 12px;">
              <div class="pse-frozen-badge">${_T.tag_temp_closed}</div>
              <div class="pse-frozen-fields">
              <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:200px;">
                  <label class="pse-label" style="margin:0;white-space:nowrap;">${_T.lbl_classify_model}</label>
                  <select id="init_bootstrap_target_model" class="pse-input" style="flex:1;min-width:100px;">
                    <option value="A" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "" : "selected"}>${_T.opt_main_model}</option>
                    <option value="B" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "selected" : ""}>${_T.opt_aux_model}</option>
                  </select>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:180px;">
                  <label class="pse-label" style="margin:0;white-space:nowrap;">${_T.lbl_read_mod_lorebook}</label>
                  <select id="read_mod_lorebook" class="pse-input" style="flex:1;min-width:70px;">
                    <option value="1" ${Number(configCache.read_mod_lorebook) === 1 ? "selected" : ""}>${_T.yes}</option>
                    <option value="0" ${Number(configCache.read_mod_lorebook) === 1 ? "" : "selected"}>${_T.no}</option>
                  </select>
                </div>
              </div>
              </div>
            </div>
            <div id="pse-card-enable-list" class="pse-entry-list" style="margin-top:8px;">
              <div class="pse-assembly" style="color:var(--pse-muted);font-size:12px;">Loading...</div>
            </div>
          </div>

          <div class="pse-page" data-page="1">
            <div class="pse-section pse-model-section-a">
              <div class="pse-section-title">${_T.sec_a}</div>
              <label class="pse-label">${_T.lbl_provider}</label>
              <select id="extractor_a_provider" class="pse-input">${renderProviderOptions(configCache.extractor_a_provider)}</select>
              <label class="pse-label">${_T.lbl_format}</label>
              <select id="extractor_a_format" class="pse-input">${renderFormatOptions(configCache.extractor_a_format)}</select>
              <label class="pse-label">${_T.lbl_url}</label>
              <input id="extractor_a_url" class="pse-input" value="${String(configCache.extractor_a_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label">${_T.lbl_key}</label>
              <input id="extractor_a_key" class="pse-input" type="text" value="${String(configCache.extractor_a_key || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label">${_T.lbl_model}</label>
              <input id="extractor_a_model" class="pse-input" autocomplete="off" value="${String(configCache.extractor_a_model || "").replace(/"/g, "&quot;")}" />
              <div id="extractor_a_model_suggestions" class="pse-model-suggestions"></div>
              <label class="pse-label">${_T.lbl_temp}</label>
              <input id="extractor_a_temperature" class="pse-input" type="number" min="0" max="2" step="0.1" value="${escapeHtml(String(Number(configCache.extractor_a_temperature) || 0))}" />
              <label class="pse-label">${_T.lbl_concur}</label>
              <select id="extractor_a_concurrency" class="pse-input">
                <option value="1" ${Number(configCache.extractor_a_concurrency) === 1 ? "selected" : ""}>${_T.opt_concurrent}</option>
                <option value="0" ${Number(configCache.extractor_a_concurrency) === 0 ? "selected" : ""}>${_T.opt_sequential}</option>
              </select>
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <input type="checkbox" id="extractor_a_thinking_enabled" ${Number(configCache.extractor_a_thinking_enabled) === 1 ? "checked" : ""} title="${_T.thinking_title}" style="margin:0;flex-shrink:0;" />
                <label for="extractor_a_thinking_enabled" class="pse-label" style="margin:0;cursor:pointer;white-space:nowrap;">${_T.lbl_thinking}</label>
                <select id="extractor_a_thinking_level" class="pse-input" style="flex:1;min-width:120px;" ${Number(configCache.extractor_a_thinking_enabled) !== 1 ? "disabled" : ""}>
                  <option value="low" ${configCache.extractor_a_thinking_level === "low" ? "selected" : ""}>${_T.opt_thinking_low}</option>
                  <option value="medium" ${(!configCache.extractor_a_thinking_level || configCache.extractor_a_thinking_level === "medium") ? "selected" : ""}>${_T.opt_thinking_medium}</option>
                  <option value="high" ${configCache.extractor_a_thinking_level === "high" ? "selected" : ""}>${_T.opt_thinking_high}</option>
                </select>
              </div>
              <div id="extractor_a_thinking_hint" style="font-size:11px;color:var(--pse-muted);margin-top:4px;display:${Number(configCache.extractor_a_thinking_enabled) === 1 ? "block" : "none"};"></div>
            </div>

            <div class="pse-section pse-model-section-b">
              <div class="pse-section-title">${_T.sec_b}</div>
              <label class="pse-label">${_T.lbl_provider}</label>
              <select id="extractor_b_provider" class="pse-input">${renderProviderOptions(configCache.extractor_b_provider)}</select>
              <label class="pse-label">${_T.lbl_format}</label>
              <select id="extractor_b_format" class="pse-input">${renderFormatOptions(configCache.extractor_b_format)}</select>
              <label class="pse-label">${_T.lbl_url}</label>
              <input id="extractor_b_url" class="pse-input" value="${String(configCache.extractor_b_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label">${_T.lbl_key}</label>
              <input id="extractor_b_key" class="pse-input" type="text" value="${String(configCache.extractor_b_key || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label">${_T.lbl_model}</label>
              <input id="extractor_b_model" class="pse-input" autocomplete="off" value="${String(configCache.extractor_b_model || "").replace(/"/g, "&quot;")}" />
              <div id="extractor_b_model_suggestions" class="pse-model-suggestions"></div>
              <label class="pse-label">${_T.lbl_temp}</label>
              <input id="extractor_b_temperature" class="pse-input" type="number" min="0" max="2" step="0.1" value="${escapeHtml(String(Number(configCache.extractor_b_temperature) || 0))}" />
              <label class="pse-label">${_T.lbl_concur}</label>
              <select id="extractor_b_concurrency" class="pse-input">
                <option value="1" ${Number(configCache.extractor_b_concurrency) === 1 ? "selected" : ""}>${_T.opt_concurrent}</option>
                <option value="0" ${Number(configCache.extractor_b_concurrency) === 0 ? "selected" : ""}>${_T.opt_sequential}</option>
              </select>
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <input type="checkbox" id="extractor_b_thinking_enabled" ${Number(configCache.extractor_b_thinking_enabled) === 1 ? "checked" : ""} title="${_T.thinking_title}" style="margin:0;flex-shrink:0;" />
                <label for="extractor_b_thinking_enabled" class="pse-label" style="margin:0;cursor:pointer;white-space:nowrap;">${_T.lbl_thinking}</label>
                <select id="extractor_b_thinking_level" class="pse-input" style="flex:1;min-width:120px;" ${Number(configCache.extractor_b_thinking_enabled) !== 1 ? "disabled" : ""}>
                  <option value="low" ${configCache.extractor_b_thinking_level === "low" ? "selected" : ""}>${_T.opt_thinking_low}</option>
                  <option value="medium" ${(!configCache.extractor_b_thinking_level || configCache.extractor_b_thinking_level === "medium") ? "selected" : ""}>${_T.opt_thinking_medium}</option>
                  <option value="high" ${configCache.extractor_b_thinking_level === "high" ? "selected" : ""}>${_T.opt_thinking_high}</option>
                </select>
              </div>
              <div id="extractor_b_thinking_hint" style="font-size:11px;color:var(--pse-muted);margin-top:4px;display:${Number(configCache.extractor_b_thinking_enabled) === 1 ? "block" : "none"};"></div>
            </div>

            <div class="pse-section pse-model-section-embed">
              <div class="pse-section-title">
                ${_T.sec_embed_title}
                <span style="font-size:12px; color:var(--pse-accent-rose); font-weight:normal; display:block; margin-top:4px;">${_T.embed_warn}</span>
              </div>
              <div class="pse-frozen-badge">${_T.tag_temp_closed}</div>
              <div class="pse-frozen-fields">
              <label class="pse-label">${_T.lbl_provider}</label>
              <select id="embedding_provider" class="pse-input">${renderEmbeddingProviderOptions(configCache.embedding_provider)}</select>
              <label class="pse-label">${_T.lbl_format}</label>
              <select id="embedding_format" class="pse-input">${renderFormatOptions(configCache.embedding_format)}</select>
              <label class="pse-label">${_T.lbl_url}</label>
              <input id="embedding_url" class="pse-input" value="${String(configCache.embedding_url || "").replace(/"/g, "&quot;")}" />
              <label class="pse-label">${_T.lbl_key}</label>
              <input id="embedding_key" class="pse-input" type="text" value="${String(configCache.embedding_key || "").replace(/"/g, "&quot;")}" />
              <div id="embedding_model_row">
                <label class="pse-label">${_T.lbl_model}</label>
                <input id="embedding_model" class="pse-input" autocomplete="off" value="${escapeHtml(String(configCache.embedding_model || ""))}" />
                <div id="embedding_model_suggestions" class="pse-model-suggestions"></div>
              </div>
              <input id="embedding_request_model" type="hidden" value="${String(configCache.embedding_request_model || "").replace(/"/g, "&quot;")}" />
              </div>
            </div>
          </div>

          <div class="pse-page" data-page="2">
            <div class="pse-section">
              <div class="pse-row" style="margin-bottom:10px;">
                <button id="pse-preset-common" class="pse-preset-btn" type="button">${_T.tab_common}</button>
                <button id="pse-preset-1" class="pse-preset-btn ${toInt(configCache.active_preset, 1) === 1 ? "active" : ""}" type="button">${_T.preset1}</button>
                <button id="pse-preset-2" class="pse-preset-btn ${toInt(configCache.active_preset, 1) === 2 ? "active" : ""}" type="button">${_T.preset2}</button>
              </div>
              <div id="pse-lore-presets-container">
                <div id="model_call_list" class="pse-entry-list"></div>
                <button id="add_model_call" class="pse-add-entry" type="button">${_T.btn_add_call}</button>
              </div>
              <div id="pse-common-prompts-container" style="display:none; flex-direction:column;">
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
            </div>
          </div>

          <div class="pse-page" data-page="5">
            <div class="pse-section" style="border-left:4px solid var(--pse-accent-indigo); background:linear-gradient(180deg, rgba(101, 31, 255, 0.1) 0%, var(--pse-input-bg) 100%);">
              <div class="pse-section-title">${_T.preset1}</div>
              <label class="pse-label">${_T.lbl_query_rounds}</label>
              <input id="vector_search_query_dialogue_rounds" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds)))}" />
              <label class="pse-label">${_T.lbl_topk}</label>
              <input id="vector_search_top_k" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k)))}" />
              <label class="pse-label">${_T.lbl_minscore}</label>
              <input id="vector_search_min_score" class="pse-input" type="number" min="0" max="1" step="0.01" value="${String(Number(configCache.vector_search_min_score) || DEFAULTS.vector_search_min_score)}" />
            </div>
            <div class="pse-section" style="border-left:4px solid var(--pse-accent-green); background:linear-gradient(180deg, rgba(0, 230, 118, 0.08) 0%, var(--pse-input-bg) 100%);">
              <div class="pse-section-title">${_T.preset2}</div>
              <label class="pse-label">${_T.lbl_query_rounds}</label>
              <input id="vector_search_query_dialogue_rounds_2" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds_2, DEFAULTS.vector_search_query_dialogue_rounds_2)))}" />
              <label class="pse-label">${_T.lbl_topk}</label>
              <input id="vector_search_top_k_2" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_top_k_2, DEFAULTS.vector_search_top_k_2)))}" />
              <label class="pse-label">${_T.lbl_minscore}</label>
              <input id="vector_search_min_score_2" class="pse-input" type="number" min="0" max="1" step="0.01" value="${String(Number(configCache.vector_search_min_score_2) || DEFAULTS.vector_search_min_score_2)}" />
            </div>
          </div>

          <div class="pse-page" data-page="6">
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <button id="pse-refresh-cache" class="pse-btn cache" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_refresh_cache}</button>
              <button id="pse-clear-cache" class="pse-btn close" type="button" style="flex:1;padding:7px 12px;font-size:12px;">${_T.btn_clear_cache}</button>
            </div>
            <div id="pse-embed-cache-list" class="pse-entry-list"></div>
            <textarea id="init_bootstrap_model_anchor_prompt" style="display:none;">${escapeHtml(String(configCache.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt))}</textarea>
          </div>

          <div class="pse-btn-row">
            <button id="pse-save" class="pse-btn save">${_T.btn_save}</button>
            <button id="pse-close" class="pse-btn close">${_T.btn_close}</button>
          </div>
        </div>
      </div>
    `;

    // Mount the overlay on top of the existing DOM tree without destroying it.
    // Replacing document.body destroys Svelte's reactive bindings in local dev,
    // causing all buttons outside the plugin panel to stop working.
    document.body.appendChild(overlayRoot);

    const renderEmbeddingCacheList = async () => {
      const wrap = document.getElementById("pse-embed-cache-list");
      if (!wrap) return;

      
      const store = await loadEmbeddingCacheStore();
      const vecBlocks = summarizeEmbeddingCacheBlocks(store);
      const vecCardKeys = new Set(vecBlocks.map(b => b.cardKey));

      
      const classifyBlocks = [];
      try {
        const db = await Risuai.getDatabase();
        const characters = Array.isArray(db?.characters) ? db.characters : [];
        for (const c of characters) {
          const scopeId = String(c?.chaId || c?.id || c?._id || "").replace(/[^0-9a-zA-Z_-]/g, "")
            || (safeTrim(c?.name || "") ? `name_${simpleHash(safeTrim(c.name))}` : null);
          if (!scopeId) continue;
          const charName = safeTrim(c?.name || "");
          const cardKey = scopeId;
          if (vecCardKeys.has(cardKey)) continue; 
          const step0Key = makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId);
          const chunksKey = makeScopedStorageKey(STATIC_KNOWLEDGE_CHUNKS_KEY, scopeId);
          const step0Done = await Risuai.pluginStorage.getItem(step0Key);
          if (!step0Done) continue;
          const chunksRaw = await Risuai.pluginStorage.getItem(chunksKey);
          const chunks = chunksRaw ? (() => { try { return JSON.parse(chunksRaw); } catch { return []; } })() : [];
          if (!chunks.length) continue;
          classifyBlocks.push({ cardKey, cardName: charName || "(unknown)", chunkCount: chunks.length, scopeId, sizeBytes: getUtf8BytesLength(chunksRaw) });
        }
      } catch { }

      if (!vecBlocks.length && !classifyBlocks.length) {
        wrap.innerHTML = `<div class="pse-assembly">${_T.no_cache}</div>`;
        return;
      }

      const vecHtml = vecBlocks.map((b, idx) => `
        <div class="pse-entry-block" data-cache-card-key="${escapeHtml(b.cardKey)}" data-cache-parity="${idx % 2 === 0 ? "even" : "odd"}">
          <div class="pse-entry-grid" style="grid-template-columns:1fr auto;">
            <div>
              <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">
                <b style="font-size:14px;">${escapeHtml(b.cardName)}</b>
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(41,121,255,0.1);color:var(--pse-accent-blue);border:1px solid rgba(41,121,255,0.3);margin-left:4px;">
                  ${_T.tag_vector}
                </span>
                ${b.modelName ? `
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(0,230,118,0.1);color:var(--pse-accent-green);border:1px solid rgba(0,230,118,0.3);margin-left:2px;">
                  ${escapeHtml(b.modelName)}
                </span>` : ""}
              </div>
              <div style="margin-top:4px;"><b>${_T.lbl_entries}</b>: ${escapeHtml(String(b.entryCount))}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_filesize}</b>: ${escapeHtml(formatBytes(b.sizeBytes))}</div>
            </div>
            <button class="pse-entry-remove" type="button" data-delete-cache-card="1">${_T.btn_delete}</button>
          </div>
        </div>
      `).join("");

      const classifyHtml = classifyBlocks.map((b, idx) => `
        <div class="pse-entry-block" data-classify-scope-id="${escapeHtml(b.scopeId)}" data-cache-parity="${(vecBlocks.length + idx) % 2 === 0 ? "even" : "odd"}" style="opacity:0.8;">
          <div class="pse-entry-grid" style="grid-template-columns:1fr auto;">
            <div>
              <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">
                <b style="font-size:14px;">${escapeHtml(b.cardName)}</b>
                <span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:rgba(255,171,0,0.1);color:var(--pse-accent-amber);border:1px solid rgba(255,171,0,0.3);margin-left:4px;">
                  ${_T.tag_classify}
                </span>
              </div>
              <div style="margin-top:4px;"><b>${_T.lbl_chunks}</b>: ${escapeHtml(String(b.chunkCount))}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_filesize}</b>: ${escapeHtml(formatBytes(b.sizeBytes))}</div>
            </div>
            <button class="pse-entry-remove" type="button" data-delete-classify-card="1">${_T.btn_delete}</button>
          </div>
        </div>
      `).join("");

      wrap.innerHTML = vecHtml + classifyHtml;
    };

    await renderEmbeddingCacheList();
    // Language selector buttons
    document.querySelectorAll(".pse-lang-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const lang = btn.dataset.lang;
        if (!lang) return;
        await Risuai.safeLocalStorage.setItem("pse_ui_language", lang);
        await renderSettingsUI();
      });
    });

    document.getElementById("pse-refresh-cache")?.addEventListener("click", async () => {
      await renderEmbeddingCacheList();
    });
    document.getElementById("pse-clear-cache")?.addEventListener("click", async () => {
      if (!confirm(_T.confirm_clear_cache || "Clear all cache data?")) return;
      await clearAllEmbeddingCache();
      await renderEmbeddingCacheList();
    });

    
    const renderCardEnableList = async () => {
      const wrap = document.getElementById("pse-card-enable-list");
      if (!wrap) return;
      let cardSettings = {};
      try { cardSettings = JSON.parse(configCache.card_enable_settings || "{}") || {}; } catch { }
      try {
        const db = await Risuai.getDatabase();
        const characters = Array.isArray(db?.characters) ? db.characters : [];
        if (characters.length === 0) {
          wrap.innerHTML = `<div class="pse-assembly" style="color:var(--pse-muted);font-size:12px;">${_T.no_cards}</div>`;
          return;
        }
        const makeMemoryOpts = (selected) => [
          `<option value="1" ${selected === "1" ? "selected" : ""}>${_T.opt_preset1}</option>`,
          `<option value="2" ${selected === "2" ? "selected" : ""}>${_T.opt_preset2}</option>`,
        ].join("");
        const makeVectorOpts = (selected) => [
          `<option value="off" ${selected === "off" ? "selected" : ""}>${_T.opt_off}</option>`,
          `<option value="1" ${selected === "1" ? "selected" : ""}>${_T.opt_preset1}</option>`,
          `<option value="2" ${selected === "2" ? "selected" : ""}>${_T.opt_preset2}</option>`,
        ].join("");
        wrap.innerHTML = characters.map((c, idx) => {
          
          const rawId = String(c?.chaId || c?.id || c?._id || "").replace(/[^0-9a-zA-Z_-]/g, "");
          const cname = safeTrim(c?.name || `Card ${idx + 1}`);
          const cid = rawId || `name_${simpleHash(cname)}`;
          const cs = cardSettings[cid] || {};
          const isEven = idx % 2 === 0;
          const borderColor = isEven ? "var(--pse-accent-blue)" : "var(--pse-accent-green)";
          const gradientColor = isEven ? "rgba(41, 121, 255, 0.08)" : "rgba(0, 230, 118, 0.08)";
          const isDisabled = cs.card_disabled === 0 || cs.card_disabled === "0" || cs.card_disabled === false ? false : true;
          return `
            <div class="pse-entry-block" data-card-id="${escapeHtml(cid)}" style="border-left:4px solid ${borderColor};background:linear-gradient(180deg,${gradientColor} 0%,var(--pse-input-bg) 100%);">
              <div style="font-weight:700;margin-bottom:6px;">${escapeHtml(cname)}</div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 8px;border-radius:6px;background:rgba(255,23,68,0.07);border:1px solid rgba(255,23,68,0.2);">
                <input type="checkbox" class="pse-card-disabled" id="disabled_${escapeHtml(cid)}" ${isDisabled ? "checked" : ""} style="margin:0;flex-shrink:0;cursor:pointer;" />
                <label for="disabled_${escapeHtml(cid)}" style="font-size:12px;font-weight:700;cursor:pointer;color:var(--pse-accent-rose);user-select:none;"> ${escapeHtml(_T.lbl_card_disabled)}</label>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;${isDisabled ? "opacity:0.35;pointer-events:none;" : ""}">
                <div>
                  <label class="pse-label" style="font-size:11px;">${_T.lbl_memory_extract}</label>
                  <select class="pse-input pse-card-memory" style="font-size:12px;">${makeMemoryOpts(cs.memory_extract === "2" ? "2" : "1")}</select>
                </div>
                <div class="pse-frozen-wrap">
                  <label class="pse-label" style="font-size:11px;">${_T.lbl_vector_search_card}</label>
                  <div class="pse-frozen-badge">${_T.tag_temp_closed}</div>
                  <select class="pse-input pse-card-vector" style="font-size:12px;" disabled>${makeVectorOpts(cs.vector_search || "off")}</select>
                </div>
              </div>
            </div>`;
        }).join("");
      } catch (e) {
        wrap.innerHTML = `<div class="pse-assembly" style="color:var(--pse-muted);font-size:12px;">Error: ${escapeHtml(String(e?.message || e))}</div>`;
      }
    };

    await renderCardEnableList();

    
    document.getElementById("pse-card-enable-list")?.addEventListener("change", (e) => {
      const cb = e.target?.closest?.(".pse-card-disabled");
      if (!cb) return;
      const block = cb.closest(".pse-entry-block");
      const grid = block?.querySelector("div[style*='grid-template-columns']");
      if (grid) grid.style.cssText = grid.style.cssText.replace(/opacity:[^;]+;?/g, "").replace(/pointer-events:[^;]+;?/g, "") + (cb.checked ? ";opacity:0.35;pointer-events:none;" : "");
    });

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

    document.getElementById("pse-embed-cache-list")?.addEventListener("click", async (e) => {
      
      const vecBtn = e.target?.closest?.("[data-delete-cache-card]");
      if (vecBtn) {
        const block = vecBtn.closest?.("[data-cache-card-key]");
        const cardKey = safeTrim(block?.getAttribute?.("data-cache-card-key") || "");
        if (!cardKey) return;
        const store = await loadEmbeddingCacheStore();
        if (store.cards && store.cards[cardKey]) {
          delete store.cards[cardKey];
          embeddingCacheStore = null;
          try { await Risuai.pluginStorage.removeItem(VCACHE_CARD_PREFIX + cardKey); } catch { }
          await saveEmbeddingCacheStore(store);
          try {
            const { staticKeys, requestKeys, firstMessageHandledKey } = await getScopedKeysForCurrentChat();
            try { await Risuai.pluginStorage.removeItem(staticKeys.staticKnowledgeChunks); } catch { }
            try { await Risuai.pluginStorage.removeItem(staticKeys.staticDataHash); } catch { }
            try { await Risuai.pluginStorage.removeItem(staticKeys.step0Complete); } catch { }
            try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastReqHash); } catch { }
            try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastExtractedData); } catch { }
            try { await Risuai.safeLocalStorage.removeItem(firstMessageHandledKey); } catch { }
            sessionStep0HandledHashByScope.delete(staticKeys.scopeId);
          } catch { }
          try { await Risuai.pluginStorage.removeItem(STATIC_KNOWLEDGE_CHUNKS_KEY); } catch { }
          try { await Risuai.pluginStorage.removeItem(STATIC_DATA_HASH_KEY); } catch { }
          try { await Risuai.pluginStorage.removeItem(STEP0_COMPLETE_KEY); } catch { }
          embeddingVectorCache.clear();
          sessionStep0HandledHashByScope.clear();
        }
        await renderEmbeddingCacheList();
        showStatus(_T.st_card_deleted, "ok");
        return;
      }

      
      const clsBtn = e.target?.closest?.("[data-delete-classify-card]");
      if (clsBtn) {
        const block = clsBtn.closest?.("[data-classify-scope-id]");
        const scopeId = safeTrim(block?.getAttribute?.("data-classify-scope-id") || "");
        if (!scopeId) return;
        try { await Risuai.pluginStorage.removeItem(makeScopedStorageKey(STATIC_KNOWLEDGE_CHUNKS_KEY, scopeId)); } catch { }
        try { await Risuai.pluginStorage.removeItem(makeScopedStorageKey(STATIC_DATA_HASH_KEY, scopeId)); } catch { }
        try { await Risuai.pluginStorage.removeItem(makeScopedStorageKey(STEP0_COMPLETE_KEY, scopeId)); } catch { }
        sessionStep0HandledHashByScope.delete(scopeId);
        await renderEmbeddingCacheList();
        showStatus(_T.st_card_deleted, "ok");
      }
    });

    const openPromptEditor = (textareaIdOrEl, title) => {
      const src = typeof textareaIdOrEl === "string" ? document.getElementById(textareaIdOrEl) : textareaIdOrEl;
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
        try { overlay.remove(); } catch { }
      };
      const onEsc = (e) => { if (e.key === "Escape") close(); };
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onEsc);
      overlay.querySelector("#pse-editor-close")?.addEventListener("click", close);
      overlay.querySelector("#pse-editor-cancel")?.addEventListener("click", close);
      overlay.querySelector("#pse-editor-apply")?.addEventListener("click", () => {
        if (editor) src.value = editor.value;
        close();
      });
    };

    const bindPromptExpander = (buttonId, textareaId, title) => {
      document.getElementById(buttonId)?.addEventListener("click", () => openPromptEditor(textareaId, title));
    };
    bindPromptExpander("advanced_model_anchor_prompt_expand", "advanced_model_anchor_prompt", _T.expand_anchor);
    bindPromptExpander("advanced_prefill_prompt_expand", "advanced_prefill_prompt", _T.expand_prefill);
    bindPromptExpander("advanced_prereply_prompt_expand", "advanced_prereply_prompt", _T.expand_prereply);
    bindPromptExpander("init_bootstrap_model_anchor_prompt_expand", "init_bootstrap_model_anchor_prompt", _T.expand_classify);
    

    document.querySelector(".pse-card").addEventListener("click", (e) => {
      const btn = e.target.closest(".pse-expand-btn");
      if (!btn || btn.id) return;
      const wrap = btn.closest(".pse-textarea-wrap");
      const textarea = wrap?.querySelector("textarea");
      if (textarea) {
        let title = _T.expand_generic;
        if (btn.classList.contains("pse-entry-format-expand")) title = _T.expand_format;
        openPromptEditor(textarea, title);
      }
    });

    const renderSelectOptions = (options, selected) => options.map((opt) => `<option value="${escapeHtml(opt.value)}" ${opt.value === selected ? "selected" : ""}>${escapeHtml(opt.label)}</option>`).join("");
    const modelCallListEl = document.getElementById("model_call_list");
    let uiActivePreset = toInt(configCache.active_preset, 1);
    let uiSubTab = uiActivePreset;
    let uiModelCalls1 = parseModelCalls(configCache.model_calls);
    let uiModelCalls2 = parseModelCalls(configCache.model_calls_2);
    let uiModelCalls = uiActivePreset === 2 ? uiModelCalls2 : uiModelCalls1;

    const renderCallEntries = (call, callIndex) => {
      const entries = Array.isArray(call.entries) && call.entries.length ? call.entries : [defaultOutputEntry(call.target_model)];
      return entries.map((entry, entryIndex) => {
        const e = normalizeOutputEntry(entry, call.target_model);
        return `
          <div class="pse-entry-block" data-entry-index="${entryIndex}">
            <div class="pse-entry-grid">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_lore_entry}</label><input class="pse-input pse-entry-lore" value="${escapeHtml(e.lorebook_name)}" /></div>
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_write_mode}</label><select class="pse-input pse-entry-mode">${renderSelectOptions(LORE_WRITE_MODE_OPTIONS, e.write_mode)}</select></div>
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_always_active}</label><select class="pse-input pse-entry-always-active"><option value="1" ${e.always_active ? "selected" : ""}>${_T.yes}</option><option value="0" ${!e.always_active ? "selected" : ""}>${_T.no}</option></select></div>
              <button class="pse-entry-remove" type="button" data-remove-entry="1" data-call-index="${callIndex}" ${entries.length <= 1 ? "disabled" : ""}>✕</button>
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
            <div class="pse-entry-retention-row" style="display:${e.write_mode === "append" ? "flex" : "none"};align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px;">
              <input class="pse-entry-retention-enabled" type="checkbox" id="ret_${callIndex}_${entryIndex}" ${e.retention_enabled ? "checked" : ""}
                title="${_T.ret_enabled_title}" />
              <label for="ret_${callIndex}_${entryIndex}" class="pse-label" style="cursor:pointer;user-select:none;">${_T.ret_after_lbl}</label>
              <input class="pse-input pse-entry-retention-after" type="number" min="0" value="${e.retention_after ?? 0}"
                style="width:60px;" title="${_T.ret_after_title}" ${e.retention_enabled ? "" : "disabled"} />
              <label class="pse-label">${_T.ret_mid_lbl}</label>
              <input class="pse-input pse-entry-retention-keep" type="number" min="0" value="${e.retention_keep ?? 5}"
                style="width:60px;" title="${_T.ret_keep_title}" ${e.retention_enabled ? "" : "disabled"} />
              <label class="pse-label">${_T.ret_end_lbl}</label>
            </div>
          </div>
        `;
      }).join("");
    };

    const renderModelCalls = () => {
      if (!modelCallListEl) return;
      modelCallListEl.innerHTML = uiModelCalls.map((rawCall, callIndex) => {
        const call = normalizeModelCall(rawCall, callIndex);
        return `
          <div class="pse-call-card" data-call-index="${callIndex}" data-call-target="${escapeHtml(call.target_model)}" data-call-parity="${callIndex % 2 === 0 ? "even" : "odd"}">
            <div class="pse-call-head">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_call_note}</label><input class="pse-input pse-call-name" value="${escapeHtml(call.name)}" /></div>
              <div class="pse-entry-col">
                <label class="pse-label">${_T.lbl_call_model}</label>
                <select class="pse-input pse-call-target"><option value="A" ${call.target_model === "A" ? "selected" : ""}>${_T.opt_main}</option><option value="B" ${call.target_model === "B" ? "selected" : ""}>${_T.opt_aux}</option></select>
              </div>
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_freq}</label><input class="pse-input pse-call-frequency" type="number" min="1" value="${String(call.every_n_turns || 1)}" /></div>
              <button class="pse-entry-remove" type="button" data-remove-call="1" ${uiModelCalls.length <= 1 ? "disabled" : ""}>✕</button>
            </div>
            <div class="pse-call-row2">
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_read_rounds}</label><input class="pse-input pse-call-read-rounds" type="number" min="0" value="${String(Math.max(0, toInt(call.read_dialogue_rounds, 4)))}" /></div>
              <div class="pse-entry-col"><label class="pse-label">${_T.lbl_read_lore}</label><input class="pse-input pse-call-read-lorebook-names" value="${escapeHtml(String(call.read_lorebook_names || ""))}" /></div>
            </div>
            <div class="pse-entry-list">${renderCallEntries(call, callIndex)}</div>
            <button class="pse-add-entry" type="button" data-add-entry="1" data-call-index="${callIndex}">${_T.btn_add_entry}</button>
          </div>
        `;
      }).join("");
    };

    const readModelCallsFromUI = () => {
      const cards = Array.from(document.querySelectorAll(".pse-call-card"));
      const calls = cards.map((card, i) => {
        const target = safeTrim(card.querySelector(".pse-call-target")?.value || "A") === "B" ? "B" : "A";
        const entries = Array.from(card.querySelectorAll(".pse-entry-block")).map((block) => ({
          lorebook_name: safeTrim(block.querySelector(".pse-entry-lore")?.value || ""), write_mode: safeTrim(block.querySelector(".pse-entry-mode")?.value || "append"),
          always_active: block.querySelector(".pse-entry-always-active")?.value === "1", output_format: String(block.querySelector(".pse-entry-format")?.value || ""),
          retention_enabled: block.querySelector(".pse-entry-retention-enabled")?.checked === true,
          retention_after: Math.max(0, toInt(block.querySelector(".pse-entry-retention-after")?.value, 0)),
          retention_keep: Math.max(0, toInt(block.querySelector(".pse-entry-retention-keep")?.value, 5)),
        })).map((e) => normalizeOutputEntry(e, target)).filter((e) => !!e.lorebook_name);
        return normalizeModelCall({
          id: safeTrim(uiModelCalls?.[i]?.id) || `call_${Date.now()}_${i}`, name: safeTrim(card.querySelector(".pse-call-name")?.value || ""),
          target_model: target, every_n_turns: Math.max(1, toInt(card.querySelector(".pse-call-frequency")?.value, 1)),
          read_dialogue_rounds: Math.max(0, toInt(card.querySelector(".pse-call-read-rounds")?.value, 4)), read_lorebook_names: String(card.querySelector(".pse-call-read-lorebook-names")?.value || ""),
          entries: entries.length ? entries : [defaultOutputEntry(target)],
        }, i);
      });
      return calls.length ? calls : [normalizeModelCall({ name: _T.callnote_a, target_model: "A", every_n_turns: 1, read_dialogue_rounds: 4, read_lorebook_names: "", entries: [defaultOutputEntry("A")] }, 0)];
    };

    const syncUiModelCalls = () => { uiModelCalls = readModelCallsFromUI(); };

    const switchPreset = (newPreset) => {
      const loreCont = document.getElementById("pse-lore-presets-container");
      const commonCont = document.getElementById("pse-common-prompts-container");

      if (newPreset === 'common') {
        if (uiSubTab !== 'common') {
          syncUiModelCalls();
          if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
          else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
        }
        uiSubTab = 'common';

        document.getElementById("pse-preset-common")?.classList.add("active");
        document.getElementById("pse-preset-1")?.classList.remove("active");
        document.getElementById("pse-preset-2")?.classList.remove("active");

        if (loreCont) loreCont.style.display = "none";
        if (commonCont) commonCont.style.display = "flex";
        return;
      }

      if (uiSubTab === newPreset) return;
      if (uiSubTab !== 'common') {
        syncUiModelCalls();
        if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
        else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
      }

      uiSubTab = newPreset;
      uiActivePreset = newPreset; 
      uiModelCalls = uiSubTab === 2 ? uiModelCalls2 : uiModelCalls1;

      document.getElementById("pse-preset-common")?.classList.remove("active");
      document.getElementById("pse-preset-1")?.classList.toggle("active", uiSubTab === 1);
      document.getElementById("pse-preset-2")?.classList.toggle("active", uiSubTab === 2);

      if (loreCont) loreCont.style.display = "block";
      if (commonCont) commonCont.style.display = "none";

      renderModelCalls();
    };

    document.getElementById("pse-preset-common")?.addEventListener("click", () => switchPreset('common'));
    document.getElementById("pse-preset-1")?.addEventListener("click", () => switchPreset(1));
    document.getElementById("pse-preset-2")?.addEventListener("click", () => switchPreset(2));

    renderModelCalls();

    document.getElementById("add_model_call")?.addEventListener("click", () => {
      syncUiModelCalls();
      const nextIndex = uiModelCalls.length;
      uiModelCalls.push(normalizeModelCall({ id: `call_${Date.now()}_${nextIndex}`, name: _T.callnote_n(nextIndex + 1), target_model: nextIndex % 2 === 0 ? "A" : "B", every_n_turns: 1, read_dialogue_rounds: 4, read_lorebook_names: "", entries: [defaultOutputEntry(nextIndex % 2 === 0 ? "A" : "B")] }, nextIndex));
      renderModelCalls();
    });

    modelCallListEl?.addEventListener("click", (e) => {
      const addBtn = e.target?.closest?.("[data-add-entry='1']");
      if (addBtn) {
        syncUiModelCalls();
        const callIndex = Number(addBtn.getAttribute("data-call-index"));
        if (Number.isFinite(callIndex) && uiModelCalls[callIndex]) {
          uiModelCalls[callIndex].entries = Array.isArray(uiModelCalls[callIndex].entries) ? uiModelCalls[callIndex].entries : [];
          uiModelCalls[callIndex].entries.push(defaultOutputEntry(uiModelCalls[callIndex].target_model));
          renderModelCalls();
        }
        return;
      }
      const removeCallBtn = e.target?.closest?.("[data-remove-call='1']");
      if (removeCallBtn) {
        syncUiModelCalls();
        const card = removeCallBtn.closest(".pse-call-card");
        const idx = Number(card?.getAttribute("data-call-index"));
        if (Number.isFinite(idx)) {
          uiModelCalls.splice(idx, 1);
          if (uiModelCalls.length === 0) uiModelCalls = [normalizeModelCall({ name: _T.callnote_a, target_model: "A", every_n_turns: 1, read_dialogue_rounds: 4, read_lorebook_names: "", entries: [defaultOutputEntry("A")] }, 0)];
          renderModelCalls();
        }
        return;
      }
      const removeEntryBtn = e.target?.closest?.("[data-remove-entry='1']");
      if (removeEntryBtn) {
        syncUiModelCalls();
        const callIndex = Number(removeEntryBtn.getAttribute("data-call-index"));
        const block = removeEntryBtn.closest(".pse-entry-block");
        const entryIndex = Number(block?.getAttribute("data-entry-index"));
        if (Number.isFinite(callIndex) && Number.isFinite(entryIndex) && uiModelCalls[callIndex]) {
          const entries = Array.isArray(uiModelCalls[callIndex].entries) ? uiModelCalls[callIndex].entries : [];
          entries.splice(entryIndex, 1);
          uiModelCalls[callIndex].entries = entries.length ? entries : [defaultOutputEntry(uiModelCalls[callIndex].target_model)];
          renderModelCalls();
        }
      }
    });

    modelCallListEl?.addEventListener("change", (e) => {
      const modeSelect = e.target?.closest?.(".pse-entry-mode");
      if (modeSelect) {
        const block = modeSelect.closest(".pse-entry-block");
        const retRow = block?.querySelector(".pse-entry-retention-row");
        if (retRow) retRow.style.display = modeSelect.value === "append" ? "flex" : "none";
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

    document.getElementById("pse-reset-agent-defaults")?.addEventListener("click", async () => {
      try {
        
        
        const resetFormData = {
          ...configCache,
          
          model_calls: JSON.stringify(DEFAULT_MODEL_CALLS),
          model_calls_2: DEFAULTS.model_calls_2,
          active_preset: 1,
          advanced_model_anchor_prompt: DEFAULTS.advanced_model_anchor_prompt,
          advanced_prefill_prompt: DEFAULTS.advanced_prefill_prompt,
          advanced_prereply_prompt: DEFAULTS.advanced_prereply_prompt,
          
          vector_search_enabled: DEFAULTS.vector_search_enabled,
          vector_search_query_dialogue_rounds: DEFAULTS.vector_search_query_dialogue_rounds,
          vector_search_top_k: DEFAULTS.vector_search_top_k,
          vector_search_min_score: DEFAULTS.vector_search_min_score,
          vector_search_query_dialogue_rounds_2: DEFAULTS.vector_search_query_dialogue_rounds_2,
          vector_search_top_k_2: DEFAULTS.vector_search_top_k_2,
          vector_search_min_score_2: DEFAULTS.vector_search_min_score_2,
          
          read_mod_lorebook: DEFAULTS.read_mod_lorebook,
          init_bootstrap_target_model: DEFAULTS.init_bootstrap_target_model,
          init_bootstrap_model_anchor_prompt: DEFAULTS.init_bootstrap_model_anchor_prompt,
          card_enable_settings: DEFAULTS.card_enable_settings,
        };
        await saveConfigFromUI(resetFormData);
        await refreshConfig();

        uiActivePreset = 1;
        uiSubTab = 1;
        uiModelCalls1 = parseModelCalls(configCache.model_calls);
        uiModelCalls2 = parseModelCalls(configCache.model_calls_2);
        uiModelCalls = uiModelCalls1;

        document.getElementById("pse-preset-common")?.classList.remove("active");
        document.getElementById("pse-preset-1")?.classList.add("active");
        document.getElementById("pse-preset-2")?.classList.remove("active");
        const loreCont = document.getElementById("pse-lore-presets-container");
        const commonCont = document.getElementById("pse-common-prompts-container");
        if (loreCont) loreCont.style.display = "block";
        if (commonCont) commonCont.style.display = "none";

        renderModelCalls();
        const setVal = (id, value) => { const el = document.getElementById(id); if (el) el.value = String(value ?? ""); };
        setVal("advanced_model_anchor_prompt", configCache.advanced_model_anchor_prompt);
        setVal("advanced_prefill_prompt", configCache.advanced_prefill_prompt);
        setVal("advanced_prereply_prompt", configCache.advanced_prereply_prompt);
        setVal("vector_search_query_dialogue_rounds", configCache.vector_search_query_dialogue_rounds);
        setVal("vector_search_top_k", configCache.vector_search_top_k);
        setVal("vector_search_min_score", configCache.vector_search_min_score);
        setVal("vector_search_query_dialogue_rounds_2", configCache.vector_search_query_dialogue_rounds_2);
        setVal("vector_search_top_k_2", configCache.vector_search_top_k_2);
        setVal("vector_search_min_score_2", configCache.vector_search_min_score_2);
        setVal("read_mod_lorebook", configCache.read_mod_lorebook);
        setVal("init_bootstrap_target_model", configCache.init_bootstrap_target_model);
        setVal("init_bootstrap_model_anchor_prompt", configCache.init_bootstrap_model_anchor_prompt);
        await renderCardEnableList();
        showStatus(_T.st_reset, "ok");
      } catch (e) { showStatus(_T.st_reset_fail + (e?.message || String(e)), "err"); }
    });

    const bindProviderAutoUrl = (providerId, urlId) => {
      // Persist the user's custom_api URL separately so it survives provider switches
      let savedCustomUrl = safeTrim(document.getElementById(urlId)?.value || "");
      let prevProvider = safeTrim(document.getElementById(providerId)?.value || "custom_api");

      document.getElementById(providerId)?.addEventListener("change", () => {
        const nextProvider = safeTrim(document.getElementById(providerId)?.value);
        const urlEl = document.getElementById(urlId);
        if (!urlEl) return;

        // When leaving custom_api, save whatever the user typed
        if (prevProvider === "custom_api") {
          savedCustomUrl = safeTrim(urlEl.value || "");
        }

        if (nextProvider === "custom_api") {
          // Restore the user's own URL when switching back to custom_api
          urlEl.value = savedCustomUrl;
        } else {
          // For every named provider, always apply its preset URL
          urlEl.value = PROVIDER_DEFAULT_URL[nextProvider] ?? "";
        }
        prevProvider = nextProvider;
      });

      // Keep savedCustomUrl in sync when the user edits the URL while on custom_api
      document.getElementById(urlId)?.addEventListener("input", () => {
        if (safeTrim(document.getElementById(providerId)?.value || "") === "custom_api") {
          savedCustomUrl = safeTrim(document.getElementById(urlId)?.value || "");
        }
      });
    };
    bindProviderAutoUrl("extractor_a_provider", "extractor_a_url");
    bindProviderAutoUrl("extractor_b_provider", "extractor_b_url");

    const refreshExtractorModelOptions = async (providerId, datalistId) => {
      const provider = safeTrim(document.getElementById(providerId)?.value || "");
      const side = providerId === "extractor_a_provider" ? "a" : providerId === "extractor_b_provider" ? "b" : "";
      const suggestionId = side ? `extractor_${side}_model_suggestions` : "";
      const inputId = side ? `extractor_${side}_model` : "";
      if (provider === "openrouter") {
        const live = await getOpenRouterModels();
        fillModelDatalist(datalistId, live);
        if (suggestionId && inputId) fillModelSuggestionList(suggestionId, inputId, []);
        return;
      }
      if (provider === "grok" || provider === "github_copilot") {
        const live = provider === "grok" ? await getGrokModels() : await getCopilotModels();
        const list = live.length ? live : getModelsByProvider(provider);
        fillModelDatalist(datalistId, list);
        if (suggestionId) fillModelSuggestionList(suggestionId, inputId, []);
        return;
      }
      fillModelDatalist(datalistId, getModelsByProvider(provider));
      if (suggestionId) fillModelSuggestionList(suggestionId, inputId, []);
    };

    const bindProviderDrivenModelAndFormat = async (providerId, formatId, datalistId, isEmbedding = false) => {
      const providerEl = document.getElementById(providerId);
      if (!providerEl) return;
      const refresh = async (forceApplyFormat = true) => {
        setFormatByProvider(providerId, formatId, true, forceApplyFormat);
        if (!isEmbedding) {
          const providerNow = safeTrim(document.getElementById(providerId)?.value || "");
          fillModelDatalist(datalistId, getModelsByProvider(providerNow));
          Promise.resolve().then(() => refreshExtractorModelOptions(providerId, datalistId)).catch(() => { });
        }
      };
      providerEl.addEventListener("change", () => { refresh(true).catch(() => { }); });
      refresh(false).catch(() => { });
    };

    bindProviderDrivenModelAndFormat("extractor_a_provider", "extractor_a_format", MODEL_DATALIST_A_ID, false);
    bindProviderDrivenModelAndFormat("extractor_b_provider", "extractor_b_format", MODEL_DATALIST_B_ID, false);
    bindProviderDrivenModelAndFormat("embedding_provider", "embedding_format", "", true);

    let uiExtractorAProviderModelMap = parseSimpleStringMap(configCache.extractor_a_provider_model_map || "{}");
    let uiExtractorBProviderModelMap = parseSimpleStringMap(configCache.extractor_b_provider_model_map || "{}");
    let currentExtractorAProvider = safeTrim(document.getElementById("extractor_a_provider")?.value || configCache.extractor_a_provider || "custom_api");
    let currentExtractorBProvider = safeTrim(document.getElementById("extractor_b_provider")?.value || configCache.extractor_b_provider || "custom_api");

    const getDefaultModelForProvider = (provider) => {
      const list = getModelsByProvider(provider);
      return Array.isArray(list) && list.length > 0 ? safeTrim(list[0]?.value) : "";
    };

    const bindExtractorProviderModelMemory = (providerId, modelId, keyId, side) => {
      const providerEl = document.getElementById(providerId);
      const modelEl = document.getElementById(modelId);
      const keyEl = document.getElementById(keyId);
      if (!providerEl || !modelEl) return;
      providerEl.addEventListener("change", () => {
        const nextProvider = safeTrim(providerEl.value || "custom_api");
        const prevModel = safeTrim(modelEl.value || "");
        const prevKey = safeTrim(keyEl?.value || "");
        if (side === "A") {
          if (currentExtractorAProvider && prevModel) uiExtractorAProviderModelMap[currentExtractorAProvider] = prevModel;
          if (currentExtractorAProvider && prevKey) uiExtractorAProviderKeyMap[currentExtractorAProvider] = prevKey;
          modelEl.value = safeTrim(uiExtractorAProviderModelMap[nextProvider] || "") || getDefaultModelForProvider(nextProvider) || "";
          if (keyEl) keyEl.value = safeTrim(uiExtractorAProviderKeyMap[nextProvider] || "");
          currentExtractorAProvider = nextProvider;
        } else {
          if (currentExtractorBProvider && prevModel) uiExtractorBProviderModelMap[currentExtractorBProvider] = prevModel;
          if (currentExtractorBProvider && prevKey) uiExtractorBProviderKeyMap[currentExtractorBProvider] = prevKey;
          modelEl.value = safeTrim(uiExtractorBProviderModelMap[nextProvider] || "") || getDefaultModelForProvider(nextProvider) || "";
          if (keyEl) keyEl.value = safeTrim(uiExtractorBProviderKeyMap[nextProvider] || "");
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
    bindExtractorProviderModelMemory("extractor_a_provider", "extractor_a_model", "extractor_a_key", "A");
    bindExtractorProviderModelMemory("extractor_b_provider", "extractor_b_model", "extractor_b_key", "B");

    
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
      if (fmtEl) fmtEl.addEventListener("change", () => updateThinkingHint(formatId, hintId));
      sync();
    };
    bindThinkingControls("extractor_a_thinking_enabled", "extractor_a_thinking_level", "extractor_a_format", "extractor_a_thinking_hint");
    bindThinkingControls("extractor_b_thinking_enabled", "extractor_b_thinking_level", "extractor_b_format", "extractor_b_thinking_hint");

    let uiEmbeddingProviderModelMap = parseSimpleStringMap(configCache.embedding_provider_model_map || "{}");
    let uiEmbeddingProviderKeyMap = parseSimpleStringMap(configCache.embedding_provider_key_map || "{}");
    let uiExtractorAProviderKeyMap = parseSimpleStringMap(configCache.extractor_a_provider_key_map || "{}");
    let uiExtractorBProviderKeyMap = parseSimpleStringMap(configCache.extractor_b_provider_key_map || "{}");
    let currentEmbeddingProvider = safeTrim(document.getElementById("embedding_provider")?.value || configCache.embedding_provider || "custom_api");

    const refreshEmbeddingPresetByProvider = async (applyPreset = true) => {
      const providerEl = document.getElementById("embedding_provider");
      const modelEl = document.getElementById("embedding_model");
      const formatEl = document.getElementById("embedding_format");
      const urlEl = document.getElementById("embedding_url");
      const keyEl = document.getElementById("embedding_key");
      const requestModelEl = document.getElementById("embedding_request_model");
      if (!providerEl || !modelEl || !formatEl || !urlEl || !requestModelEl) return;
      const provider = safeTrim(providerEl.value || "local");
      const preset = EMBEDDING_PROVIDER_PRESETS[provider] || EMBEDDING_PROVIDER_PRESETS.local;

      if (currentEmbeddingProvider && currentEmbeddingProvider !== provider) {
        const prevModel = safeTrim(modelEl.value || "");
        if (prevModel) uiEmbeddingProviderModelMap[currentEmbeddingProvider] = prevModel;
        const prevKey = safeTrim(keyEl?.value || "");
        if (prevKey) uiEmbeddingProviderKeyMap[currentEmbeddingProvider] = prevKey;
      }

      modelEl.disabled = false;
      let optionList = getEmbeddingOptionsDedup(provider);
      if (provider === "openrouter") optionList = await getOpenRouterEmbeddingModels();
      if (provider === "custom_api") optionList = [];
      fillEmbeddingDatalist(optionList);
      fillModelSuggestionList("embedding_model_suggestions", "embedding_model", []);

      const optionValues = optionList.map((o) => safeTrim(o.value)).filter(Boolean);
      const preferred = safeTrim(uiEmbeddingProviderModelMap[provider] || "") || safeTrim(modelEl.value || "");
      if (provider === "custom_api" || (provider === "openrouter" && !optionValues.length)) modelEl.value = preferred || "";
      else if (optionValues.includes(preferred)) modelEl.value = preferred;
      else modelEl.value = safeTrim(preset.defaultModel || optionValues[0] || "custom");

      if (safeTrim(modelEl.value)) uiEmbeddingProviderModelMap[provider] = safeTrim(modelEl.value);

      if (keyEl) {
        const rememberedKey = safeTrim(uiEmbeddingProviderKeyMap[provider] || "");
        if (rememberedKey) keyEl.value = rememberedKey;
        else if (currentEmbeddingProvider !== provider) keyEl.value = "";
      }

      currentEmbeddingProvider = provider;

      if (!applyPreset) return;
      formatEl.value = safeTrim(preset.format || "openai");
      if (provider !== "custom_api") {
        urlEl.value = safeTrim(preset.url || "");
      }
      if (provider !== "custom_api") requestModelEl.value = safeTrim(EMBEDDING_MODEL_TO_REQUEST[safeTrim(modelEl.value)] || preset.requestModel || "");
      else requestModelEl.value = "";
    };

    document.getElementById("embedding_provider")?.addEventListener("change", () => { refreshEmbeddingPresetByProvider(true).catch(() => { }); });
    document.getElementById("embedding_model")?.addEventListener("input", () => {
      const provider = safeTrim(document.getElementById("embedding_provider")?.value || "custom_api");
      const selectedModel = safeTrim(document.getElementById("embedding_model")?.value || "");
      if (provider && selectedModel) uiEmbeddingProviderModelMap[provider] = selectedModel;
      if (provider === "custom_api") return;
      const requestModelEl = document.getElementById("embedding_request_model");
      if (requestModelEl) requestModelEl.value = safeTrim(EMBEDDING_MODEL_TO_REQUEST[selectedModel] || selectedModel || requestModelEl.value || "");
    });
    refreshEmbeddingPresetByProvider(false).catch(() => { });

    bindScrollableSuggestionDropdown({ inputId: "extractor_a_model", containerId: "extractor_a_model_suggestions", datalistId: MODEL_DATALIST_A_ID });
    bindScrollableSuggestionDropdown({ inputId: "extractor_b_model", containerId: "extractor_b_model_suggestions", datalistId: MODEL_DATALIST_B_ID });
    bindScrollableSuggestionDropdown({ inputId: "embedding_model", containerId: "embedding_model_suggestions", datalistId: MODEL_DATALIST_EMBED_ID });

    document.getElementById("pse-save")?.addEventListener("click", async () => {
      try {
        const exAProv = safeTrim(document.getElementById("extractor_a_provider")?.value || "custom_api");
        const exAMod = safeTrim(document.getElementById("extractor_a_model")?.value || "");
        const exAKey = safeTrim(document.getElementById("extractor_a_key")?.value || "");
        if (exAProv && exAMod) uiExtractorAProviderModelMap[exAProv] = exAMod;
        if (exAProv && exAKey) uiExtractorAProviderKeyMap[exAProv] = exAKey;
        const exBProv = safeTrim(document.getElementById("extractor_b_provider")?.value || "custom_api");
        const exBMod = safeTrim(document.getElementById("extractor_b_model")?.value || "");
        const exBKey = safeTrim(document.getElementById("extractor_b_key")?.value || "");
        if (exBProv && exBMod) uiExtractorBProviderModelMap[exBProv] = exBMod;
        if (exBProv && exBKey) uiExtractorBProviderKeyMap[exBProv] = exBKey;
        const embProv = safeTrim(document.getElementById("embedding_provider")?.value || "custom_api");
        const embKey = safeTrim(document.getElementById("embedding_key")?.value || "");
        const embMod = safeTrim(document.getElementById("embedding_model")?.value || "");
        if (embProv && embMod) uiEmbeddingProviderModelMap[embProv] = embMod;
        if (embProv && embKey) uiEmbeddingProviderKeyMap[embProv] = embKey;

        if (uiSubTab !== 'common') {
          syncUiModelCalls();
          if (uiSubTab === 1) uiModelCalls1 = uiModelCalls;
          else if (uiSubTab === 2) uiModelCalls2 = uiModelCalls;
        }

        const formData = {
          extractor_a_provider: exAProv,
          extractor_a_format: safeTrim(document.getElementById("extractor_a_format")?.value || "openai"),
          extractor_a_url: safeTrim(document.getElementById("extractor_a_url")?.value),
          extractor_a_key: exAKey,
          extractor_a_model: exAMod,
          extractor_a_provider_model_map: JSON.stringify(uiExtractorAProviderModelMap),
          extractor_a_provider_key_map: JSON.stringify(uiExtractorAProviderKeyMap),
          extractor_a_temperature: Math.max(0, Math.min(2, Number(document.getElementById("extractor_a_temperature")?.value || 0))),
          extractor_b_provider: exBProv,
          extractor_b_format: safeTrim(document.getElementById("extractor_b_format")?.value || "openai"),
          extractor_b_url: safeTrim(document.getElementById("extractor_b_url")?.value),
          extractor_b_key: exBKey,
          extractor_b_model: exBMod,
          extractor_b_provider_model_map: JSON.stringify(uiExtractorBProviderModelMap),
          extractor_b_provider_key_map: JSON.stringify(uiExtractorBProviderKeyMap),
          extractor_b_temperature: Math.max(0, Math.min(2, Number(document.getElementById("extractor_b_temperature")?.value || 0))),
          embedding_provider: embProv,
          embedding_format: safeTrim(document.getElementById("embedding_format")?.value || "openai"),
          embedding_model: embMod,
          embedding_url: safeTrim(document.getElementById("embedding_url")?.value),
          embedding_key: embKey,
          embedding_request_model: (() => {
            const preset = EMBEDDING_PROVIDER_PRESETS[embProv] || EMBEDDING_PROVIDER_PRESETS.custom_api;
            if (embProv === "custom_api") return safeTrim(document.getElementById("embedding_request_model")?.value || embMod);
            return safeTrim(EMBEDDING_MODEL_TO_REQUEST[embMod] || embMod || preset.requestModel || "");
          })(),
          embedding_provider_model_map: JSON.stringify(uiEmbeddingProviderModelMap),
          embedding_provider_key_map: JSON.stringify(uiEmbeddingProviderKeyMap),
          model_calls: JSON.stringify(uiModelCalls1),
          model_calls_2: JSON.stringify(uiModelCalls2),
          active_preset: uiActivePreset,
          advanced_model_anchor_prompt: document.getElementById("advanced_model_anchor_prompt")?.value ?? "",
          advanced_prefill_prompt: document.getElementById("advanced_prefill_prompt")?.value ?? "",
          advanced_prereply_prompt: document.getElementById("advanced_prereply_prompt")?.value ?? "",
          read_mod_lorebook: toInt(document.getElementById("read_mod_lorebook")?.value, DEFAULTS.read_mod_lorebook) === 1 ? 1 : 0,
          vector_search_enabled: HARD_FREEZE_KB_FEATURES ? 0 : (() => {
            const cardList = document.querySelectorAll("#pse-card-enable-list .pse-entry-block");
            let anyVec = false;
            cardList.forEach(block => { if (block.querySelector(".pse-card-vector")?.value !== "off") anyVec = true; });
            return anyVec ? 1 : 0;
          })(),
          vector_search_query_dialogue_rounds: Math.max(1, toInt(document.getElementById("vector_search_query_dialogue_rounds")?.value, DEFAULTS.vector_search_query_dialogue_rounds)),
          vector_search_top_k: Math.max(1, toInt(document.getElementById("vector_search_top_k")?.value, DEFAULTS.vector_search_top_k)),
          vector_search_min_score: Math.max(0, Number(document.getElementById("vector_search_min_score")?.value || DEFAULTS.vector_search_min_score)),
          vector_search_query_dialogue_rounds_2: Math.max(1, toInt(document.getElementById("vector_search_query_dialogue_rounds_2")?.value, DEFAULTS.vector_search_query_dialogue_rounds_2)),
          vector_search_top_k_2: Math.max(1, toInt(document.getElementById("vector_search_top_k_2")?.value, DEFAULTS.vector_search_top_k_2)),
          vector_search_min_score_2: Math.max(0, Number(document.getElementById("vector_search_min_score_2")?.value || DEFAULTS.vector_search_min_score_2)),
          init_bootstrap_target_model: safeTrim(document.getElementById("init_bootstrap_target_model")?.value || DEFAULTS.init_bootstrap_target_model) === "B" ? "B" : "A",
          init_bootstrap_model_anchor_prompt: document.getElementById("init_bootstrap_model_anchor_prompt")?.value ?? "",
          extractor_a_thinking_enabled: document.getElementById("extractor_a_thinking_enabled")?.checked ? 1 : 0,
          extractor_a_thinking_level: safeTrim(document.getElementById("extractor_a_thinking_level")?.value || "medium"),
          extractor_b_thinking_enabled: document.getElementById("extractor_b_thinking_enabled")?.checked ? 1 : 0,
          extractor_b_thinking_level: safeTrim(document.getElementById("extractor_b_thinking_level")?.value || "medium"),
          extractor_a_concurrency: toInt(document.getElementById("extractor_a_concurrency")?.value, 1),
          extractor_b_concurrency: toInt(document.getElementById("extractor_b_concurrency")?.value, 1),
          context_messages: configCache.context_messages, timeout_ms: configCache.timeout_ms,
          card_enable_settings: (() => {
            const cardList = document.querySelectorAll("#pse-card-enable-list .pse-entry-block");
            const cs = {};
            cardList.forEach(block => {
              const cid = block.getAttribute("data-card-id");
              if (!cid) return;
              cs[cid] = {
                memory_extract: block.querySelector(".pse-card-memory")?.value || "off",
                vector_search: HARD_FREEZE_KB_FEATURES ? "off" : (block.querySelector(".pse-card-vector")?.value || "off"),
                card_disabled: block.querySelector(".pse-card-disabled")?.checked ? 1 : 0,
              };
            });
            return JSON.stringify(cs);
          })(),
        };
        await saveConfigFromUI(formData);
        showStatus(_T.st_saved, "ok");
      } catch (e) { showStatus(_T.st_save_fail + (e?.message || String(e)), "err"); }
    });

    document.getElementById("pse-close")?.addEventListener("click", async () => {
      // Remove our overlay so the underlying framework regains full control
      const overlay = document.getElementById("pse-overlay-root");
      if (overlay) overlay.remove();
      try { await Risuai.hideContainer(); } catch { }
    });
  }

  async function initSettingEntry() {
    
    
    const part = await Promise.resolve(
      Risuai.registerSetting(
        "RisuAI Agent",
        async () => { await Risuai.showContainer("fullscreen"); await renderSettingsUI(); },
        "👤", "html"
      )
    ).catch(() => null);
    if (part?.id != null) uiIds.push(part.id);

    
    
    
    if (typeof Risuai.registerButton === "function") {
      const btn = await Promise.resolve(
        Risuai.registerButton({
          name: "👤 AI Agent",
          location: "hamburger"
        }, async () => {
          await Risuai.showContainer("fullscreen");
          await renderSettingsUI();
        })
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
      await Risuai.log(`${LOG} addRisuReplacer failed: ${err?.message || String(err)}`);
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
        console.error(`${LOG} replacer stack:`, outerErr?.stack || "(no stack)");
        throw outerErr;
      }
    };
  }

  function _replacerBody(messages, type) {
    return (async (messages, type) => {
      try {
        await Risuai.safeLocalStorage.setItem("last_hook_ts", new Date().toISOString());
        await Risuai.safeLocalStorage.setItem("last_hook_type", String(type ?? ""));
      } catch { }

      await ensureLangInitialized();
      await refreshConfig();

      if (type === "display") {
        const { char: displayChar, chat: displayChat } = await getCurrentCharAndChatSafe();
        const displayMsgs = Array.isArray(displayChat?.message) ? displayChat.message : [];
        const displayUserMsgCount = displayMsgs.filter(m => m?.role === "user").length;
        let displayCardCalls;
        try {
          let displayCardSettings = {};
          try { displayCardSettings = JSON.parse(configCache.card_enable_settings || "{}") || {}; } catch { }
          const displayRawCharId = String(displayChar?.chaId || displayChar?.id || displayChar?._id || "").replace(/[^0-9a-zA-Z_-]/g, "");
          const displayCharName = safeTrim(displayChar?.name || "");
          const displayCharId = displayRawCharId || (displayCharName ? `name_${simpleHash(displayCharName)}` : "-1");
          const displayCardCfg = displayCardSettings[displayCharId] || {};
          const displayMemoryPreset = displayCardCfg.memory_extract || "off";
          if (displayMemoryPreset !== "off") {
            displayCardCalls = parseModelCalls(displayMemoryPreset === "2" ? configCache.model_calls_2 : configCache.model_calls);
          }
        } catch { }
        await applyRetentionCleanup(displayUserMsgCount, displayCardCalls);
        return messages;
      }

      if (type !== "model") {
        try { await Risuai.safeLocalStorage.setItem("last_extractor_mode", `skipped_non_model:${String(type ?? "")}`); } catch { }
        return messages;
      }

      await Risuai.safeLocalStorage.setItem("last_extractor_mode", "replacer_started");

      const { char, chat, chatIndex } = await getCurrentCharAndChatSafe();
      const staticKeys = getStaticCacheKeysForScope(char);
      const requestKeys = getRequestCacheKeysForScope(char);
      const existingMsgs = Array.isArray(chat?.message) ? chat.message : [];
      const userMsgCount = existingMsgs.filter(m => m?.role === "user").length;
      const isFirstMessage = userMsgCount <= 1;
      const lastUserContent = existingMsgs.filter(m => m?.role === "user").pop()?.data || "";
      const firstMessageHandledKey = getFirstMessageHandledKey(requestKeys.scopeId, chatIndex);
      const firstMessageMarker = simpleHash(String(lastUserContent || ""));
      let firstMessageHandled = false;
      try {
        firstMessageHandled = String(await Risuai.safeLocalStorage.getItem(firstMessageHandledKey) || "") === firstMessageMarker;
      } catch { }
      if (userMsgCount > 1) {
        try { await Risuai.safeLocalStorage.removeItem(firstMessageHandledKey); } catch { }
      }

      const gNoteData = await getGlobalNoteDataCached(char);
      const resolvedGlobalNote = safeTrim(gNoteData.replaceGlobalNote || gNoteData.globalNote);
      const currentStaticPayload = await getStaticDataPayload(char, chat, resolvedGlobalNote);
      const currentStaticHash = simpleHash(JSON.stringify(currentStaticPayload));
      const savedStaticHash = await Risuai.pluginStorage.getItem(staticKeys.staticDataHash);

      let cardSettings = {};
      try { cardSettings = JSON.parse(configCache.card_enable_settings || "{}") || {}; } catch { }
      const rawCharId = String(char?.chaId || char?.id || char?._id || "").replace(/[^0-9a-zA-Z_-]/g, "");
      const charName = safeTrim(char?.name || "");
      const charId = rawCharId || (charName ? `name_${simpleHash(charName)}` : "-1");
      const cardCfg = cardSettings[charId] || {};
      const cardMemoryPreset = cardCfg.memory_extract || "off";
      const vectorPresetNum = HARD_FREEZE_KB_FEATURES ? 0 : (cardCfg.vector_search === "2" ? 2 : cardCfg.vector_search === "1" ? 1 : 0);

      const cardIsDisabled = cardCfg.card_disabled === true || cardCfg.card_disabled === 1 || cardCfg.card_disabled === "1";
      if (cardIsDisabled) {
        await Risuai.safeLocalStorage.setItem("last_extractor_mode", "card_disabled");
        return messages;
      }

      const effectiveVecConfig = HARD_FREEZE_KB_FEATURES
        ? {
          vector_search_enabled: 0,
          vector_search_query_dialogue_rounds: configCache.vector_search_query_dialogue_rounds,
          vector_search_top_k: configCache.vector_search_top_k,
          vector_search_min_score: configCache.vector_search_min_score,
        }
        : vectorPresetNum === 0
        ? {
          vector_search_enabled: configCache.vector_search_enabled,
          vector_search_query_dialogue_rounds: configCache.vector_search_query_dialogue_rounds,
          vector_search_top_k: configCache.vector_search_top_k,
          vector_search_min_score: configCache.vector_search_min_score,
        }
        : {
          vector_search_enabled: 1,
          vector_search_query_dialogue_rounds: vectorPresetNum === 2
            ? toInt(configCache.vector_search_query_dialogue_rounds_2, DEFAULTS.vector_search_query_dialogue_rounds_2)
            : toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds),
          vector_search_top_k: vectorPresetNum === 2
            ? toInt(configCache.vector_search_top_k_2, DEFAULTS.vector_search_top_k_2)
            : toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k),
          vector_search_min_score: vectorPresetNum === 2
            ? (Number(configCache.vector_search_min_score_2) || DEFAULTS.vector_search_min_score_2)
            : (Number(configCache.vector_search_min_score) || DEFAULTS.vector_search_min_score),
        };
      const vecBackup = {
        vector_search_enabled: configCache.vector_search_enabled,
        vector_search_query_dialogue_rounds: configCache.vector_search_query_dialogue_rounds,
        vector_search_top_k: configCache.vector_search_top_k,
        vector_search_min_score: configCache.vector_search_min_score,
      };
      Object.assign(configCache, effectiveVecConfig);

      try {
        const isVectorEnabled = configCache.vector_search_enabled === 1;
        let needsStep0 = false;
        let step0Reason = "";

        const step0Complete = await Risuai.pluginStorage.getItem(staticKeys.step0Complete);
        const hashChanged = currentStaticHash !== savedStaticHash;
        const sessionHandled = currentStaticHash === sessionStep0HandledHashByScope.get(staticKeys.scopeId);

        if (HARD_FREEZE_KB_FEATURES) {
          try { await Risuai.pluginStorage.setItem(staticKeys.step0Complete, "1"); } catch { }
          try { await Risuai.pluginStorage.setItem(staticKeys.staticDataHash, currentStaticHash); } catch { }
          needsStep0 = false;
        } else if (!step0Complete) {
          if (isVectorEnabled) {
            const cacheHasAnyData = await checkCacheExists(char);
            step0Reason = cacheHasAnyData ? "incomplete" : "new";
          } else {
            step0Reason = "new";
          }
          needsStep0 = true;
        } else if (hashChanged && !sessionHandled) {
          needsStep0 = true;
          step0Reason = "changed";
        } else if (isVectorEnabled && !(await checkCacheExists(char))) {
          needsStep0 = true;
          step0Reason = "classify_done";
        }

        if (needsStep0) {
          try {
            const resumeMode = step0Reason === "incomplete";
            const classifyDoneMode = step0Reason === "classify_done";
            if (isVectorEnabled) {
              if (classifyDoneMode) {
                await Risuai.log(`${LOG} Classification already done. Building vector embeddings only (Step 0)... Please wait.`);
              } else {
                await Risuai.log(`${LOG} Starting background knowledge base initialization (Step 0)... Please wait.`);
              }
            } else {
              await Risuai.log(`${LOG} Starting background knowledge base classification (Step 0, keyword mode)... Please wait.`);
            }
            await runStep0Classification(char, chat, resolvedGlobalNote, currentStaticHash, staticKeys, resumeMode, classifyDoneMode);
            sessionStep0HandledHashByScope.set(staticKeys.scopeId, currentStaticHash);
            await Risuai.log(`${LOG} Knowledge base initialization complete!`);
          } catch (step0Err) {
            const errMsg = step0Err?.message || String(step0Err);
            await Risuai.log(`${LOG} ❌ Knowledge base initialization failed: ${errMsg}`);
            if (isVectorEnabled) {
              throw new Error(`[RisuAI Agent] Vector knowledge base build failed/timed out. Progress has been saved.\nError: ${errMsg}\nPlease wait a moment, then click "Regenerate/Send" to continue from where it left off.`);
            } else {
              console.warn(`${LOG} Step0 classification failed, using fallback (information): ${errMsg}`);
              await Risuai.log(`${LOG} ⚠️ Knowledge base classification failed, continuing in fallback mode: ${errMsg}`);
            }
          }
        }

        await performChatCleanup(userMsgCount);

        if (isFirstMessage && !firstMessageHandled) {
          try { await Risuai.safeLocalStorage.setItem(firstMessageHandledKey, firstMessageMarker); } catch { }
          await Risuai.safeLocalStorage.setItem("last_extractor_mode", "skipped_first_message");
          await Risuai.log(`${LOG} beforeRequest: skipping extraction on first message.`);
          return await mergeToSystemPromptWithRewrite(messages, null, lastUserContent);
        }

        const baseConversation = await getConversationFromCurrentChat(Math.max(1, toInt(configCache.context_messages, 10)));
        if (baseConversation.length === 0) {
          await Risuai.safeLocalStorage.setItem("last_extractor_mode", "replacer_skipped");
          await Risuai.safeLocalStorage.setItem("last_lore_sync_error", _T.no_conv);
          await Risuai.log(`${LOG} beforeRequest: no usable conversation text.`);
          return await mergeToSystemPromptWithRewrite(messages, null, lastUserContent);
        }

        const reqHash = simpleHash(JSON.stringify({ baseConversation, userMsgCount }));
        try { await Risuai.safeLocalStorage.removeItem(requestKeys.lastReqHash); } catch { }
        await Risuai.safeLocalStorage.setItem(requestKeys.lastReqHash, reqHash);

        let extractedData = null;
        const roundIndex = userMsgCount;
        const resolved = resolveExtractorConfig();
        const memoryEnabled = cardMemoryPreset !== "off";
        const dueCalls = memoryEnabled
          ? parseModelCalls(cardMemoryPreset === "2" ? configCache.model_calls_2 : configCache.model_calls)
            .filter((c) => isModelCallDue(c, userMsgCount))
          : [];

        if (dueCalls.length > 0) {
          await Risuai.log(`${LOG} Agent: Calling auxiliary model for analysis and data extraction...`);

          const PARALLEL_LIMIT = 3;
          const parallelCalls = dueCalls.filter(c => {
            const target = safeTrim(c.target_model) === "B" ? "B" : "A";
            return target === "B" ? configCache.extractor_b_concurrency === 1 : configCache.extractor_a_concurrency === 1;
          });
          const sequentialCalls = dueCalls.filter(c => {
            const target = safeTrim(c.target_model) === "B" ? "B" : "A";
            return target === "B" ? configCache.extractor_b_concurrency !== 1 : configCache.extractor_a_concurrency !== 1;
          });

          const executeCall = async (call) => {
            const extractedMessages = await buildScopedExtractorMessages(baseConversation, call);
            const endpoint = call.target_model === "B" ? resolved.b : resolved.a;
            try {
              return {
                call,
                result: await callExtractorStrict({
                  url: endpoint.url, apiKey: endpoint.key, model: endpoint.model, format: endpoint.format, temperature: endpoint.temperature,
                  messages: extractedMessages, timeoutMs: configCache.timeout_ms, mode: call.target_model,
                  thinkingEnabled: endpoint.thinkingEnabled || false, thinkingLevel: endpoint.thinkingLevel || "",
                }),
              };
            } catch (err) {
              throw new Error(buildAuxCallErrorLine(call, endpoint, err));
            }
          };

          const parallelResults = [];
          for (let i = 0; i < parallelCalls.length; i += PARALLEL_LIMIT) {
            const batch = parallelCalls.slice(i, i + PARALLEL_LIMIT);
            const batchResults = await Promise.allSettled(batch.map(executeCall));
            parallelResults.push(...batchResults);
          }

          const sequentialResults = [];
          for (const call of sequentialCalls) {
            sequentialResults.push(await Promise.allSettled([executeCall(call)]).then(r => r[0]));
          }

          const results = [...parallelResults, ...sequentialResults];
          const rejected = results.filter(r => r.status === "rejected");
          if (rejected.length > 0) {
            const errs = rejected.map(r => String(r.reason?.message || r.reason || "unknown")).join("\n");
            await abortMainModelWithAuxError(_T.aux_failed + errs);
          }

          for (const res of results) {
            if (res.status !== "fulfilled") continue;
            const { call, result } = res.value;
            const parsed = result?.parsed || {};
            if (Object.keys(parsed).length > 0) extractedData = { ...(extractedData || {}), ...parsed };
            const raw = String(result?.raw || "").trim();
            if (!raw) continue;
            try {
              await writeOutputsForCall(call, raw, result?.parsed, roundIndex, dueCalls);
              if (!extractedData) extractedData = {};
            } catch (e) {
              const endpoint = call.target_model === "B" ? resolved.b : resolved.a;
              await abortMainModelWithAuxError(_T.entry_save_failed + buildAuxCallErrorLine(call, endpoint, e));
            }
          }
        }

        await Risuai.safeLocalStorage.setItem("last_extractor_mode", "replacer");
        if (extractedData) {
          await Risuai.safeLocalStorage.setItem(requestKeys.lastExtractedData, typeof extractedData === "object" ? JSON.stringify(extractedData) : String(extractedData));
        }
        if (!extractedData && dueCalls.length > 0) {
          await abortMainModelWithAuxError(`${_T.aux_failed || "Auxiliary model execution failed:\n"}No usable extraction result was produced by due calls.`);
        }

        const allCardCalls = parseModelCalls(cardMemoryPreset === "2" ? configCache.model_calls_2 : configCache.model_calls);
        await applyRetentionCleanup(userMsgCount, allCardCalls);
        return await mergeToSystemPromptWithRewrite(messages, null, lastUserContent);
      } finally {
        Object.assign(configCache, vecBackup);
      }
    })(messages, type);
  }

  async function getConversationFromCurrentChat(limit) {
    const { chat } = await getCurrentCharAndChatSafe();
    const src = Array.isArray(chat?.message) ? chat.message : [];
    const out = [];
    let firstUserSeen = false;
    for (const m of src) {
      const role = m?.role === "char" ? "assistant" : m?.role === "user" ? "user" : null;
      if (!role) continue;
      const content = typeof m?.data === "string" ? m.data.trim() : "";
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
    await Risuai.safeLocalStorage.setItem("plugin_loaded_ts", new Date().toISOString());
    await Risuai.safeLocalStorage.removeItem("last_hook_ts");
    await Risuai.safeLocalStorage.removeItem("last_hook_type");
    await Risuai.safeLocalStorage.removeItem(LAST_REQ_HASH_KEY);
    await Risuai.safeLocalStorage.removeItem(LAST_EXTRACTED_DATA_KEY);
    await Risuai.safeLocalStorage.removeItem("last_lore_sync_hash");
    await Risuai.safeLocalStorage.removeItem("last_lore_sync_error");
    await Risuai.safeLocalStorage.removeItem("last_extractor_mode");

    replacerFn = createReplacer();
    await ensureReplacerRegistered();

    await Risuai.log(`${LOG} loaded (${PLUGIN_NAME} v${PLUGIN_VER}).`);
    console.log(`${LOG} loaded OK`);
  } catch (err) {
    console.error(`${LOG} INIT FAILED:`, err);
    try { await Risuai.log(`${LOG} failed: ${err?.message || String(err)}`); } catch { }
  }

  if (typeof Risuai.onUnload === "function") {
    await Risuai.onUnload(async () => {
      for (const id of uiIds) {
        try { await Risuai.unregisterUIPart(id); } catch { }
      }
      if (replacerFn) {
        try {
          await Risuai.removeRisuReplacer("beforeRequest", replacerFn);
          replacerRegistered = false;
        } catch { }
      }
    });
  }
})();
