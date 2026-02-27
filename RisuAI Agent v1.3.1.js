//@name 👤 RisuAI Agent
//@display-name 👤 RisuAI Agent v1.3.1
//@author penguineugene@protonmail.com
//@link https://github.com/EugenesDad/RisuAI-Agent-plugin
//@api 3.0
//@version 1.3.1

(async () => {
  async function _detectLang() {
    try {
      const db = await Risuai.getDatabase();
      const dl = String(db?.language || "").toLowerCase().trim();
      if (dl === "ko" || dl.startsWith("ko-")) return "ko";
      if (dl === "cn" || dl === "tc" || dl === "zh-tw" || dl === "zh-hant" || dl.startsWith("zh-tw") || dl.startsWith("zh-hk")) return "tc";
      if (dl.startsWith("zh")) return "tc";
      if (dl.startsWith("ko")) return "ko";
      if (dl.startsWith("en")) return "en";
    } catch { }
    try {
      const rootDoc = await Risuai.getRootDocument();
      const settingsRoot = await (rootDoc?.querySelector?.(".rs-setting-cont") || null);
      const settingsText = String(await (settingsRoot?.textContent?.() || "")).trim();
      if (settingsText) {
        if (/[가-힣]/.test(settingsText) || settingsText.includes("플러그인") || settingsText.includes("한국어")) return "ko";
        if (settingsText.includes("外掛程式") || settingsText.includes("介面語言") || settingsText.includes("中文(繁體)")) return "tc";
        if (settingsText.includes("插件") || settingsText.includes("界面语言")) return "tc";
        if (settingsText.includes("Plugin") || settingsText.includes("UI Language")) return "en";
      }
    } catch { }
    return "en";
  }

  const _I18N = {
    en: {
      append: "Append", overwrite: "Overwrite",
      tab_help: "Help", tab_model: "Model Settings", tab_vector: "Vector Search",
      tab_prompt: "Global Prompt", tab_lore: "Lorebook Calls", tab_cache: "Cache Manager",
      sec_a: "Main Model (Model A)", sec_b: "Auxiliary Model (Model B)",
      sec_embed_title: "Embedding Model",
      embed_warn: "⚠️ Vectors from different embedding models are completely incompatible. If you change the model, clear the cache data below first.",
      lbl_provider: "Provider", lbl_format: "Request Format", lbl_url: "Request URL",
      lbl_key: "API Key", lbl_model: "Model", lbl_temp: "Temperature",
      lbl_concur: "Concurrency Mode",
      opt_concurrent: "Concurrent (allow multiple simultaneous requests)",
      opt_sequential: "Sequential (single-threaded requests only)",
      sec_lore_calls: "Lorebook Write Call Settings",
      lore_warn: "⚠️ Do not manually edit the current chat's Local Lorebook while Agent is running, as it may be automatically overwritten.",
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
      opt_main_model: "Main Model (A)", opt_aux_model: "Auxiliary Model (B)",
      lbl_classify_anchor: "Classification Anchor Prompt",
      sec_cache: "Cache Manager",
      btn_refresh_cache: "Refresh Cache List", btn_clear_cache: "Clear All Caches",
      btn_reset: "Reset to Defaults",
      lbl_card: "Card", lbl_entries: "Entries", lbl_filesize: "File Size",
      btn_delete: "Delete",
      btn_save: "Save Settings", btn_close: "Close",
      no_cache: "No vector cache data available.",
      confirm_clear: `Are you sure you want to clear all vector caches?\nThis will delete all card cache data. The cache will be rebuilt on the next send.`,
      st_cache_refreshed: "Vector cache list refreshed.",
      st_cache_cleared: "All vector caches cleared. Cache will be rebuilt on next send.",
      st_card_deleted: "Card vector cache deleted.",
      st_saved: "Settings saved.", st_save_fail: "Save failed: ",
      st_reset: "Reset to Agent defaults.", st_reset_fail: "Reset failed: ",
      editor_cancel: "Cancel", editor_apply: "Apply", aria_close: "Close",
      lbl_lore_entry: "Lorebook Entry", lbl_write_mode: "Write Mode (Overwrite/Append)",
      lbl_always_active: "Always Active", yes: "Yes", no: "No",
      lbl_output_format: "Output Format (JSON Schema)",
      ret_after_lbl: "After",
      ret_mid_lbl: "turns, auto-trim and keep only the latest",
      ret_end_lbl: "turns of data",
      ret_enabled_title: "When enabled, automatically trims old data from this entry after reaching the specified turn count, keeping only the most recent turns",
      ret_after_title: "Pruning starts after accumulating more than this many turns (0 = immediately)",
      ret_keep_title: "Number of most recent turn blocks to keep after trimming (0 = clear all)",
      lbl_parallel: "Parallel Execution",
      parallel_title: "When enabled, this task will execute concurrently with other parallel tasks to reduce wait time.",
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
      aux_failed: "Auxiliary model execution failed:\n",
      entry_save_failed: "Entry save failed:\n",
      no_conv: "Skipped: no usable conversation text in beforeRequest payload.",
      aux_abort_default: "Auxiliary model call or processing failed",
      copilot_refresh: "Copilot token refresh",
      help_html: `<b>▌ Core System: Narrative Auditing &amp; State Extraction Engine</b><br/>
                This plugin automatically extracts facts from dialogue via multiple parallel model calls, tracks logical consistency, and maintains a dynamically updated world-state database. Suitable for all narrative contexts including collaborative fiction and roleplay.<br/><br/>
                <b>▌ Step 0 (Database Construction)</b><br/><br/>
                <b>On the first conversation, all bot content is chunked and tagged (initial / main model / embedding model)</b><br/>
                This may take a while — please wait patiently.<br/>
                &bull; <code>Purpose</code>: Optimizes subsequent bot reading efficiency.<br/>
                &bull; <code>Vector Search</code>: If enabled, a vector database will also be built.<br/>
                &bull; <code>Cache Manager</code>: Built databases are stored here and do not need to be rebuilt every time the plugin is reloaded.<br/><br/>
                <b>▌ Pipeline Architecture (5 Parallel Task Groups)</b><br/><br/>
                <b>Part 1 — Narrative Snapshot &amp; Character Status (every turn / auxiliary model)</b><br/>
                Maintains the story's real-time "working memory":<br/>
                &bull; <code>recent_turn_log</code>: Precisely records current scene changes, player actions, and narrative results.<br/>
                &bull; <code>recent_character_states</code>: Tracks the outward states and hidden motives of NPCs in the scene to ensure behavioral consistency.<br/>
                &bull; <code>system_director</code>: Detects narrative stagnation and triggers external events when necessary to break conversational deadlocks.<br/><br/>
                <b>Part 2 — Logic Audit &amp; Story Thread Management (every turn / auxiliary model)</b><br/>
                Ensures story logic is tight and prevents setting conflicts:<br/>
                &bull; <code>known_contradictions</code>: Detects unreasonable actions (e.g., violating injury conditions, using unpossessed items, or breaking world rules).<br/>
                &bull; <code>unsolved_quests</code>: Tracks and manages all unresolved conflicts, long-term goals, and quest thread progress.<br/><br/>
                <b>Part 3 — Narrative Quality Guard &amp; New Lore Recording (every 3 turns / auxiliary model)</b><br/>
                Improves writing quality and captures newly introduced lore:<br/>
                &bull; <code>repetition_guard</code>: Filters repetitive narrative tropes, banned phrases, or overused verbal patterns.<br/>
                &bull; <code>recent_world_entries</code>: Automatically records newly mentioned locations, rule details, or character traits.<br/><br/>
                <b>Part 4 — Long-Term Memory Summarization &amp; Milestones (every 10 turns / main model)</b><br/>
                The main model distills story highlights and updates long-term memory:<br/>
                &bull; <code>story_turning_points</code>: Records key turning point moments that changed the story's direction.<br/>
                &bull; <code>story_arc_summary</code>: Summarizes completed arcs and records permanent impacts on the world or relationships.<br/><br/>
                <b>Part 5 — Persistent World Encyclopedia (every 15 turns / main model)</b><br/>
                Integrates fragmented information into a structured knowledge base:<br/>
                &bull; <code>world_encyclopedia</code>: Consolidates geography, NPCs, factions, and lore, providing a stable consistency foundation for long stories.<br/><br/>
                <b>▌ Knowledge Injection Placement Rules</b><br/>
                &bull; <b>Instructions</b>: Injected below the system prompt to guide AI behavior.<br/>
                &bull; <b>Information</b>: Injected below the chat history to provide background context.<br/>
                &bull; <b>Format</b>: Injected at the very bottom of the prompt to ensure JSON or specific format output.<br/>
                &bull; <b>Vector Search</b>: If enabled, a vector search is performed each turn to extract the most contextually relevant Lorebook entries.<br/><br/>
                <b>▌ Notes</b><br/>
                &bull; <b>Manual Editing</b>: Do not manually edit the current chat's Local Lorebook while the Agent is running, as it may be automatically overwritten.<br/>
                &bull; <b>Vector Search</b>: When vector search is enabled, the system automatically selects the most relevant entries to inject based on semantic relevance.<br/>
                &bull; <b>Reset Defaults</b>: If errors occur after an update, click "Reset to Defaults" to restore all prompts and configuration.`,
    },
    ko: {
      append: "추가", overwrite: "덮어쓰기",
      tab_help: "사용 설명", tab_model: "모델 설정", tab_vector: "벡터 검색",
      tab_prompt: "전역 프롬프트", tab_lore: "로어북 호출", tab_cache: "캐시 관리",
      sec_a: "주요 모델 (Main Model)", sec_b: "보조 모델 (Auxiliary Model)",
      sec_embed_title: "임베딩 모델 (Embedding Model)",
      embed_warn: "⚠️ 다른 임베딩 모델이 생성하는 벡터는 완전히 호환되지 않습니다. 모델을 변경할 경우 반드시 아래 캐시 데이터를 먼저 지우세요.",
      lbl_provider: "제공자", lbl_format: "요청 형식", lbl_url: "요청 주소 (URL)",
      lbl_key: "API 키", lbl_model: "모델", lbl_temp: "온도 (Temperature)",
      lbl_concur: "요청 모드 (Concurrency)",
      opt_concurrent: "병렬 (복수 요청 동시 발송 허용)",
      opt_sequential: "순차 (단일 스레드 요청만 가능)",
      sec_lore_calls: "로어북 쓰기 호출 설정",
      lore_warn: "⚠️ Agent 작동 중에는 현재 대화의 로컬 로어북을 수동으로 편집하지 마세요. 시스템에 의해 자동으로 덮어쓰일 수 있습니다.",
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
      opt_main_model: "주요 모델 (Main)", opt_aux_model: "보조 모델 (Aux)",
      lbl_classify_anchor: "분류 앵커 프롬프트",
      sec_cache: "캐시 관리 센터 (Cache Hub)",
      btn_refresh_cache: "캐시 목록 새로고침", btn_clear_cache: "전체 캐시 삭제",
      btn_reset: "기본 설정으로 초기화",
      lbl_card: "카드", lbl_entries: "항목 수", lbl_filesize: "파일 크기",
      btn_delete: "삭제",
      btn_save: "설정 저장", btn_close: "닫기",
      no_cache: "현재 벡터 캐시 데이터가 없습니다.",
      confirm_clear: "전체 벡터 캐시를 삭제하시겠습니까?\\n모든 카드의 캐시 데이터가 삭제되며 다음 발송 시 재생성됩니다.",
      st_cache_refreshed: "벡터 캐시 목록이 업데이트되었습니다.",
      st_cache_cleared: "전체 벡터 캐시가 삭제되었습니다. 다음 발송 시 재생성됩니다.",
      st_card_deleted: "해당 카드의 벡터 캐시가 삭제되었습니다.",
      st_saved: "설정이 저장되었습니다.", st_save_fail: "저장 실패: ",
      st_reset: "Agent 기본값으로 초기화되었습니다.", st_reset_fail: "초기화 실패: ",
      editor_cancel: "취소", editor_apply: "적용", aria_close: "닫기",
      lbl_lore_entry: "로어북 항목", lbl_write_mode: "쓰기 모드 (덮어쓰기/추가)",
      lbl_always_active: "항상 활성화", yes: "예", no: "아니오",
      lbl_output_format: "출력 형식 (JSON Schema)",
      ret_after_lbl: "경과 후",
      ret_mid_lbl: "턴 후 자동 정리 실행, 최신 데이터만 유지",
      ret_end_lbl: "턴 데이터",
      ret_enabled_title: "활성화 후 지정 턴 수에 도달하면 이 항목의 오래된 데이터를 자동으로 정리하고 최신 몇 턴 내용만 유지합니다",
      ret_after_title: "이 턴 수를 초과하면 정리 시작 (0 = 즉시)",
      ret_keep_title: "정리 후 유지할 최신 턴 블록 수 (0 = 전체 삭제)",
      lbl_parallel: "병렬 실행",
      parallel_title: "활성화 후 이 작업이 다른 병렬 작업과 동시에 실행되어 대기 시간을 단축합니다.",
      lbl_call_note: "호출 메모",
      lbl_call_model: "모델", opt_main: "주요 모델", opt_aux: "보조 모델",
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
      aux_failed: "보조 모델 실행 실패:\n",
      entry_save_failed: "항목 저장 실패:\n",
      no_conv: "건너뜀: beforeRequest 페이로드에 사용 가능한 대화 텍스트 없음.",
      aux_abort_default: "보조 모델 호출 또는 처리 실패",
      copilot_refresh: "Copilot 토큰 갱신",
      help_html: `<b>▌ 시스템 핵심: 서사 감사 및 상태 추출 엔진</b><br/>
                이 플러그인은 여러 병렬 모델 호출을 통해 대화에서 사실을 자동으로 추출하고, 논리적 일관성을 추적하며, 동적으로 업데이트되는 세계관 데이터베이스를 유지합니다. 협업 소설, 롤플레이 등 모든 서사 시나리오에 적합합니다.<br/><br/>
                <b>▌ Step0 (데이터베이스 구축)</b><br/><br/>
                <b>첫 번째 대화 시 모든 카드 내용을 청크로 분할하고 태그를 부여합니다 (초기화/주요 모델/임베딩 모델)</b><br/>
                시간이 걸릴 수 있으니 인내심 있게 기다려주세요.<br/>
                &bull; <code>목적</code>: 이후 카드 읽기 효율 최적화.<br/>
                &bull; <code>벡터 검색</code>: 활성화된 경우 벡터 데이터베이스도 함께 빌드됩니다.<br/>
                &bull; <code>캐시 관리</code>: 빌드된 데이터베이스는 여기에 저장되므로 매번 재시작 시 재빌드할 필요가 없습니다.<br/><br/>
                <b>▌ 프로세스 구조 (5개 병렬 작업 그룹)</b><br/><br/>
                <b>Part1 — 서사 스냅샷 및 캐릭터 현황 (매 턴/보조 모델)</b><br/>
                스토리의 실시간 '작업 메모리' 유지:<br/>
                &bull; <code>recent_turn_log</code>: 현재 씬 변화, 플레이어 행동 및 서사 전개 결과를 정확히 기록.<br/>
                &bull; <code>recent_character_states</code>: 현장 NPC의 외적 상태 및 숨겨진 동기를 추적하여 행동 일관성 확보.<br/>
                &bull; <code>system_director</code>: 스토리 흐름을 감지하고 필요 시 외부 이벤트를 발생시켜 대화 교착 상태를 타개.<br/><br/>
                <b>Part2 — 논리 감사 및 스토리라인 관리 (매 턴/보조 모델)</b><br/>
                스토리 논리의 엄밀성을 확보하고 설정 충돌 방지:<br/>
                &bull; <code>known_contradictions</code>: 불합리한 행동 감지 (예: 부상 설정 위반, 미보유 아이템, 세계관 규칙 위반).<br/>
                &bull; <code>unsolved_quests</code>: 모든 미해결 갈등, 장기 목표, 퀘스트 라인 전개를 추적 및 관리.<br/><br/>
                <b>Part3 — 서사 품질 보호 및 새 설정 기록 (3턴마다/보조 모델)</b><br/>
                글쓰기 품질을 향상시키고 새롭게 등장하는 설정을 포착:<br/>
                &bull; <code>repetition_guard</code>: 반복되는 서사 클리셰, 금지 표현, 과도하게 사용된 말투를 필터링.<br/>
                &bull; <code>recent_world_entries</code>: 새롭게 등장하는 지리적 위치, 규칙 세부사항, 캐릭터 특성을 자동 기록.<br/><br/>
                <b>Part4 — 장기 기억 요약 및 중요 이정표 (10턴마다/주요 모델)</b><br/>
                주요 모델이 스토리 핵심을 추출하고 장기 기억을 업데이트합니다:<br/>
                &bull; <code>story_turning_points</code>: 스토리 방향을 바꾸는 핵심 전환점 기록.<br/>
                &bull; <code>story_arc_summary</code>: 특정 갈등 종료 시 요약하고 세계나 관계에 대한 영구적 영향 기록.<br/><br/>
                <b>Part5 — 지속적 세계 백과사전 (15턴마다/주요 모델)</b><br/>
                단편적인 정보를 구조화된 지식 베이스로 통합:<br/>
                &bull; <code>world_encyclopedia</code>: 지리, NPC, 파벌, 전설 설정을 정리하여 장편 대화에 안정적인 일관성 기반 제공.<br/><br/>
                <b>▌ 지식 주입 및 배치 규칙</b><br/>
                &bull; <b>지시</b>: 시스템 프롬프트 아래에 주입하여 AI 행동을 안내.<br/>
                &bull; <b>정보</b>: 채팅 기록 아래에 주입하여 배경 참조 제공.<br/>
                &bull; <b>형식</b>: 프롬프트 최하단에 주입하여 JSON 또는 특정 형식 출력 보장.<br/>
                &bull; <b>벡터 검색</b>: 활성화된 경우 매 대화 시 벡터 검색을 수행하여 현재 상황에 가장 적합한 로어북 항목을 추출합니다.<br/><br/>
                <b>▌ 주의 사항</b><br/>
                &bull; <b>수동 편집</b>: Agent 작동 중에는 현재 채팅의 로컬 로어북을 수동으로 편집하지 마세요. 시스템에 의해 자동으로 덮어쓰일 수 있습니다.<br/>
                &bull; <b>벡터 검색</b>: 활성화 후 시스템이 자동으로 의미적 관련성에 따라 최적 항목을 선택하여 주입합니다.<br/>
                &bull; <b>기본값 초기화</b>: 업데이트 후 오류 발생 시 「기본 설정으로 초기화」를 클릭하여 모든 프롬프트와 설정을 복원.`,
    },
    tc: {
      append: "添加", overwrite: "覆蓋",
      tab_help: "使用說明", tab_model: "模型設定", tab_vector: "向量搜尋",
      tab_prompt: "全域提示詞", tab_lore: "Lorebook 呼叫", tab_cache: "快取管理",
      sec_a: "主要模型 (Main Model)", sec_b: "輔助模型 (Auxiliary Model)",
      sec_embed_title: "嵌入模型 (Embedding Model)",
      embed_warn: "⚠️ 不同嵌入模型產出的向量完全不互通。若更換模型，請務必先清除下方快取資料。",
      lbl_provider: "提供者", lbl_format: "請求格式", lbl_url: "請求地址 (URL)",
      lbl_key: "API 金鑰", lbl_model: "模型", lbl_temp: "溫度 (Temperature)",
      lbl_concur: "請求模式 (Concurrency)",
      opt_concurrent: "併發 (允許同時發送複數請求)",
      opt_sequential: "序列 (僅能單線請求)",
      sec_lore_calls: "Lorebook 寫入呼叫設定",
      lore_warn: "⚠️ Agent 運作期間請勿手動編輯當前對話的 Local Lorebook，以免被系統自動覆蓋。",
      btn_add_call: "新增呼叫任務",
      lbl_anchor: "系統定位提示詞 (System Prompt)", lbl_prefill: "助理預填充 (Assistant Prefill)", lbl_prereply: "預回覆提示詞 (Assistant Pre-Reply)",
      aria_expand: "放大編輯",
      sec_vec: "向量搜尋 (Vector Search)",
      opt_vec_on: "啟用 (依語意關聯度挑選 Lorebook 條目)",
      opt_vec_off: "停用 (使用傳統關鍵字匹配)",
      lbl_query_rounds: "以最近幾輪對話作為搜尋關鍵",
      lbl_topk: "Top K (回傳條目數)",
      lbl_minscore: "最低相似度分數門檻 (0~1)",
      sec_classify: "分類模型設定", lbl_use_model: "使用模型",
      opt_main_model: "主要模型 (Main)", opt_aux_model: "輔助模型 (Aux)",
      lbl_classify_anchor: "分類定位提示詞",
      sec_cache: "快取管理中心 (Cache Hub)",
      btn_refresh_cache: "更新快取列表", btn_clear_cache: "清除全部快取",
      btn_reset: "重置為預設設定",
      lbl_card: "卡片", lbl_entries: "條目數", lbl_filesize: "檔案大小",
      btn_delete: "刪除",
      btn_save: "儲存設定", btn_close: "關閉",
      no_cache: "目前沒有向量快取資料。",
      confirm_clear: "確定要清除全部向量快取嗎？\\n這將刪除所有卡片的快取資料，下次發送時會重新建立。",
      st_cache_refreshed: "已更新向量快取列表。",
      st_cache_cleared: "已清除全部向量快取，下次發送時將重新建立。",
      st_card_deleted: "已刪除該卡片的向量快取。",
      st_saved: "設定已儲存。", st_save_fail: "儲存失敗：",
      st_reset: "已重置為 Agent 預設。", st_reset_fail: "重置失敗：",
      editor_cancel: "取消", editor_apply: "套用", aria_close: "關閉",
      lbl_lore_entry: "Lorebook 條目", lbl_write_mode: "寫入模式 (覆蓋/添加)",
      lbl_always_active: "始終啟用", yes: "是", no: "否",
      lbl_output_format: "輸出格式 (JSON Schema)",
      ret_after_lbl: "於",
      ret_mid_lbl: "回合後執行自動清理，僅保留最新的",
      ret_end_lbl: "回合資料",
      ret_enabled_title: "啟用後，在達到指定回合數後，自動修剪此條目的舊資料，僅保留最新幾回合內容",
      ret_after_title: "累積超過此回合數後才開始修剪 (0 = 立即)",
      ret_keep_title: "清理後保留最新幾回合的區塊 (0 = 清空全部)",
      lbl_parallel: "併發執行",
      parallel_title: "啟用後，此任務將與其他併發任務同時執行，縮短等待時間。",
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
      aux_failed: "輔助模型執行失敗：\n",
      entry_save_failed: "條目儲存失敗：\n",
      no_conv: "跳過：beforeRequest 酬載中無可用對話文字。",
      aux_abort_default: "輔助模型呼叫或處理失敗",
      copilot_refresh: "Copilot token refresh",
      help_html: `<b>▌ 系統核心：敘事稽核與狀態提取引擎</b><br/>
                本插件透過多個並行模型呼叫，自動從對話中提取事實、追蹤邏輯連貫性，並維護一個動態更新的世界觀資料庫。適用於協作小說、角色扮演等所有敘事場景。<br/><br/>
                <b>▌ Step0（建構資料庫）</b><br/><br/>
                <b>第一次對話，會將所有卡片中的內容分塊，進行標籤 (開局/主要模型/嵌入模型)</b><br/>
                會花上好一陣子，請耐心等待。<br/>
                &bull; <code>目的</code>：效率最佳化後續的卡片讀取。<br/>
                &bull; <code>向量搜尋</code>：若有開啟，則會一併建立向量資料庫。<br/>
                &bull; <code>快取管理</code>：建立好的資料庫都會放在這，不用每次重開啟就重建一次。<br/><br/>
                <b>▌ 流程架構（5 個並行任務組）</b><br/><br/>
                <b>Part1 — 敘事快照與角色現況 (每回合/輔助模型)</b><br/>
                維持故事的即時「工作記憶」：<br/>
                &bull; <code>recent_turn_log</code>：精確紀錄當前場景變化、玩家行為與敘事發展結果。<br/>
                &bull; <code>recent_character_states</code>：追蹤在場 NPC 的外在狀態與隱藏動機，確保行為連貫。<br/>
                &bull; <code>system_director</code>：偵測劇情流暢度，必要時引發外部事件以打破對話僵局。<br/><br/>
                <b>Part2 — 邏輯稽核與劇情線管理 (每回合/輔助模型)</b><br/>
                確保故事邏輯嚴密，防止設定衝突：<br/>
                &bull; <code>known_contradictions</code>：偵測不合理的行動（如：違反傷勢設定、未持有的道具或世界觀規則）。<br/>
                &bull; <code>unsolved_quests</code>：追蹤並管理所有懸而未決的衝突、長期目標或任務線發展。<br/><br/>
                <b>Part3 — 敘事品質防護與新設定紀錄 (每3回合/輔助模型)</b><br/>
                提升寫作質量並捕捉新出現的設定：<br/>
                &bull; <code>repetition_guard</code>：過濾重複的敘事套路、禁用詞彙或過度使用的口頭禪。<br/>
                &bull; <code>recent_world_entries</code>：自動紀錄新出現的地理位置、規則細節或角色特徵。<br/><br/>
                <b>Part4 — 長期記憶總結與重要里程碑 (每10回合/主要模型)</b><br/>
                由主要模型提煉故事精華，更新長效記憶：<br/>
                &bull; <code>story_turning_points</code>：紀錄改變故事走向的關鍵轉折時刻。<br/>
                &bull; <code>story_arc_summary</code>：於特定衝突結束時進行總結，並紀錄對世界或關係的永久性影響。<br/><br/>
                <b>Part5 — 持久化世界百科 (每15回合/主要模型)</b><br/>
                將碎片化資訊整合為結構化知識庫：<br/>
                &bull; <code>world_encyclopedia</code>：彙整地理、NPC、派系與傳說設定，為長篇對話提供穩定的一致性基礎。<br/><br/>
                <b>▌ 知識注入與放置規則</b><br/>
                &bull; <b>指示</b>：注入於系統提示詞下方，引導 AI 行為。<br/>
                &bull; <b>資訊</b>：注入於聊天記錄下方，提供背景參考。<br/>
                &bull; <b>格式</b>：注入於提示詞最底部，確保 JSON 或特定格式輸出。<br/>
                &bull; <b>向量搜尋</b>：若有開啟，則會在每次對話進行向量搜尋，抽取出最符合當下情境的Lorebook條目。<br/><br/>
                <b>▌ 注意事項</b><br/>
                &bull; <b>手動編輯</b>：Agent 運作期間請勿手動編輯當前聊天的 Local Lorebook，以免被系統自動覆蓋。<br/>
                &bull; <b>向量搜尋</b>：啟用向量搜尋後，系統會自動根據語意相關性挑選最合適的條目注入。<br/>
                &bull; <b>預設重置</b>：若更新後發生錯誤，可點擊「重置為預設設定」還原所有提示詞與配置。`,
    },
  };

  let _T = _I18N.en;

  const PLUGIN_NAME = "👤 RisuAI Agent";
  const PLUGIN_VER = "1.3.1";
  const LOG = "[RisuAIAgent]";
  const SYSTEM_INJECT_TAG = "PLUGIN_PARALLEL_STATUS";
  const SYSTEM_REWRITE_TAG = "PLUGIN_PARALLEL_REWRITE";
  const KNOWLEDGE_BLOCK_TAG = "PSE_INJECTED_KNOWLEDGE";
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

  const DEFAULT_MODEL_CALLS = JSON.stringify([
    {
      "id": "call_state",
      "name": "State",
      "target_model": "B",
      "every_n_turns": 1,
      "read_dialogue_rounds": 2,
      "read_lorebook_names": "recent_turn_log,recent_character_states,system_director",
      "allow_parallel": true,
      "entries": [
        {
          "lorebook_name": "recent_turn_log",
          "write_mode": "append",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"recent_turn_log\": {\n    \"scene\": \"<location, ≤12 words>\",\n    \"user_action\": \"<player action, ≤12 words>\",\n    \"narrative_event\": \"<story result, ≤15 words>\",\n    \"shift\": \"<tone/stakes change ≤8 words, or null>\",\n    \"user_scene_change\": false\n  }\n}\n\nFIELD RULES:\n- All string values: ≤15 words. Be telegraphic, not descriptive.\n- scene: location + one sensory cue only.\n- user_action: player's latest input only.\n- narrative_event: story output result only.\n- shift: only if something changed. null if unchanged.\n- user_scene_change: true only if player moved to a new location.",
          "retention_enabled": true,
          "retention_after": 10,
          "retention_keep": 2
        },
        {
          "lorebook_name": "recent_character_states",
          "write_mode": "append",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"recent_character_states\": {\n    \"location\": \"<place, ≤10 words>\",\n    \"player_state\": \"<condition + key items, ≤15 words>\",\n    \"npcs\": [\n      {\n        \"name\": \"<NPC name>\",\n        \"physical_state\": \"<appearance, ≤12 words>\",\n        \"internal_state\": \"<true motive/feeling, ≤12 words>\",\n        \"relation_to_player\": \"<dynamic, ≤10 words, or null>\"\n      }\n    ]\n  }\n}\n\nFIELD RULES:\n- All string values: ≤15 words. Keywords only, no full sentences.\n- location: place name + one key atmospheric detail.\n- player_state: current condition, injuries, and items on person.\n- npcs: one object per NPC in scene. Remove departed NPCs. Add new ones.\n- internal_state: true motives even if hidden. System use only.\n- relation_to_player: current stance toward player. null if irrelevant.\n- npcs: [] if no NPCs present.",
          "retention_enabled": true,
          "retention_after": 10,
          "retention_keep": 2
        },
        {
          "lorebook_name": "system_director",
          "write_mode": "overwrite",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"system_director\": {\n    \"staleness_level\": 0,\n    \"environment_intervention\": null\n  }\n}\n\nFIELD RULES:\n- Compare this turn's recent_turn_log with previous turn's.\n- staleness_level: 0 (completely different) to 10 (nearly identical). Evaluate current vs previous turn only.\n- If staleness_level ≥ 8: write a brief unexpected external event in environment_intervention.\n- If staleness_level ≤ 7: set environment_intervention to null."
        }
      ]
    },
    {
      "id": "call_logic",
      "name": "Logic",
      "target_model": "B",
      "every_n_turns": 1,
      "read_dialogue_rounds": 3,
      "read_lorebook_names": "unsolved_quests,recent_character_states,recent_turn_log",
      "allow_parallel": true,
      "entries": [
        {
          "lorebook_name": "known_contradictions",
          "write_mode": "overwrite",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"known_contradictions\": {\n    \"logic_violation\": \"<describe contradiction, or null>\",\n    \"strict_directive\": \"<see allowed values>\"\n  }\n}\n\nFIELD RULES:\n- Read user_action from recent_turn_log. Read player_state and location from recent_character_states.\n- Check for:\n  a) Action impossible given current injuries or equipment.\n  b) Player in a distant location without traveling.\n  c) Action contradicts established world rules or NPC capabilities.\n- If found:\n  - logic_violation: describe the specific contradiction.\n  - strict_directive: one of exactly:\n      \"Reject the user action and narrate failure\"\n      \"Show cognitive friction: character hesitates or struggles\"\n- If none found:\n  - logic_violation: null\n  - strict_directive: \"Proceed normally\""
        },
        {
          "lorebook_name": "unsolved_quests",
          "write_mode": "overwrite",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"unsolved_quests\": {\n    \"active_threads\": [\n      {\n        \"id\": 1,\n        \"desc\": \"<quest or goal description>\",\n        \"weight\": \"medium\",\n        \"status\": \"active\",\n        \"related_npcs\": [],\n        \"notes\": null\n      }\n    ],\n    \"lost_entities\": [\n      {\n        \"name\": \"<character name>\",\n        \"last_seen\": \"<location and circumstance>\",\n        \"relevance\": \"<connection to active threads>\"\n      }\n    ],\n    \"resolved_this_turn\": []\n  }\n}\n\nFIELD RULES:\n- Start from previous turn's data. Copy all active_threads forward as baseline.\n- If this turn shows developments: update status and notes.\n- If no change: keep entry exactly as it was.\n- Completed quest → remove from active_threads, add to resolved_this_turn with explanation.\n- New quest → add with id = highest existing id + 1.\n- weight: critical | high | medium | low.\n- status: active | progressed | stalled | nearly_resolved.\n- lost_entities: characters who disappeared. Track name, last_seen, relevance.\n- [] for any list with no entries."
        }
      ]
    },
    {
      "id": "call_quality",
      "name": "Quality",
      "target_model": "B",
      "every_n_turns": 3,
      "read_dialogue_rounds": 3,
      "read_lorebook_names": "recent_world_entries,world_encyclopedia",
      "allow_parallel": true,
      "entries": [
        {
          "lorebook_name": "repetition_guard",
          "write_mode": "overwrite",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"repetition_guard\": {\n    \"flagged_cliches\": [],\n    \"last_tsukkomi\": null,\n    \"banned_phrases\": []\n  }\n}\n\nFIELD RULES:\n- flagged_cliches: up to 3 overused tropes or narrative patterns found in recent turns. [] if none.\n- last_tsukkomi: most recent sarcastic, comedic, or meta-commentary remark by any character. null if none.\n- banned_phrases: exact phrases or sentence structures appearing ≥2 times in recent turns. [] if none.\n- The Actor LLM must avoid reusing anything listed here."
        },
        {
          "lorebook_name": "recent_world_entries",
          "write_mode": "append",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"recent_world_entries\": [\n    \"<entry: Name. Key fact. ≤20 words.>\"\n  ]\n}\n\nFIELD RULES:\n- Each entry: one sentence, ≤20 words. Name first, then the single most important fact.\n- Only include NEW info not already in recent_world_entries or world_encyclopedia.\n- Cover all turns since last run (up to 3 turns).\n- null if nothing new. Do not use [].",
          "retention_enabled": true,
          "retention_after": 15,
          "retention_keep": 1
        }
      ]
    },
    {
      "id": "call_longterm",
      "name": "Longterm",
      "target_model": "A",
      "every_n_turns": 10,
      "read_dialogue_rounds": 1,
      "read_lorebook_names": "recent_turn_log,recent_character_states,unsolved_quests,story_turning_points,story_arc_summary",
      "allow_parallel": true,
      "entries": [
        {
          "lorebook_name": "story_turning_points",
          "write_mode": "append",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"story_turning_points\": [\n    {\n      \"seq\": 1,\n      \"type\": \"<type>\",\n      \"impact\": \"<description of how this moment changed the story>\"\n    }\n  ]\n}\n\nFIELD RULES:\n- A turning point = a moment that fundamentally changed the story's direction.\n- type: one of relationship_shift | power_change | revelation | betrayal | loss | discovery.\n- Read previous story_turning_points. Find highest seq. New entries start at highest seq + 1.\n- Keep all prior entries unchanged. Append new turning points only.\n- Review all turns since the last time this block ran (up to 10 turns).\n- [] if no turning point occurred in the reviewed window.",
          "retention_enabled": false,
          "retention_after": 0,
          "retention_keep": 0
        },
        {
          "lorebook_name": "story_arc_summary",
          "write_mode": "append",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"story_arc_summary\": [\n    {\n      \"arc_name\": \"<name of completed arc>\",\n      \"summary\": \"<what happened across this arc>\",\n      \"permanent_impact\": \"<lasting consequences on world or characters>\"\n    }\n  ]\n}\n\nFIELD RULES:\n- A completed arc = major conflict resolved, character journey concluded, or quest chain fully closed.\n- Check resolved_this_turn in unsolved_quests for evidence.\n- Review all turns since the last time this block ran (up to 10 turns).\n- Keep all prior entries unchanged. Append new arcs only.\n- [] if no arc completed in the reviewed window.",
          "retention_enabled": false,
          "retention_after": 0,
          "retention_keep": 0
        }
      ]
    },
    {
      "id": "call_world",
      "name": "World",
      "target_model": "A",
      "every_n_turns": 15,
      "read_dialogue_rounds": 1,
      "read_lorebook_names": "recent_world_entries,world_encyclopedia,story_arc_summary",
      "allow_parallel": false,
      "entries": [
        {
          "lorebook_name": "world_encyclopedia",
          "write_mode": "overwrite",
          "always_active": true,
          "output_format": "SCHEMA:\n{\n  \"world_encyclopedia\": {\n    \"geography\": [\n      { \"name\": \"<place>\", \"description\": \"<detail>\" }\n    ],\n    \"npcs\": [\n      { \"name\": \"<name>\", \"role\": \"<role>\", \"status\": \"<alive/dead/unknown + condition>\", \"notes\": \"<key info>\" }\n    ],\n    \"factions\": [\n      { \"name\": \"<name>\", \"description\": \"<purpose/nature>\", \"relations\": \"<stance toward player and other factions>\" }\n    ],\n    \"lore\": [\n      { \"topic\": \"<subject>\", \"detail\": \"<explanation>\" }\n    ]\n  }\n}\n\nFIELD RULES:\n- Start from previous output. Copy as baseline.\n- Merge all recent_world_entries accumulated since the last time this block ran (up to 15 turns) into the correct category.\n- Apply permanent_impact from story_arc_summary to affected entries.\n- Same entity name in old and new data → keep most current version only.\n- Retain all prior entries not contradicted by new information.\n- Output the full updated encyclopedia every time.\n- [] for any category with no entries."
        }
      ]
    }
  ]);

  const DEFAULTS = {
    extractor_a_provider: "custom_api",
    extractor_a_format: "openai",
    extractor_a_url: "",
    extractor_a_key: "",
    extractor_a_model: "",
    extractor_a_provider_model_map: "{}",
    extractor_a_temperature: 1,
    extractor_b_provider: "custom_api",
    extractor_b_format: "openai",
    extractor_b_url: "",
    extractor_b_key: "",
    extractor_b_model: "",
    extractor_b_provider_model_map: "{}",
    extractor_b_temperature: 1,
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
    model_calls: DEFAULT_MODEL_CALLS,
    advanced_model_anchor_prompt: `ROLE: Narrative state extraction engine for collaborative fiction.

TASK: Read the story text. Extract factual narrative data. Return ONLY valid JSON matching the schema below.

RULES:
1. Output valid JSON only. No markdown fences, no explanation, no preamble.
2. All string values: ≤15 words unless a schema explicitly allows more. Be telegraphic.
3. Undetermined fields → null.
4. String values use the SAME LANGUAGE as the story text.
5. Previous turn output is your baseline. Update only what changed.
6. Match key names and value types exactly.`,
    advanced_prefill_prompt: `ANALYZE input text. Update database JSON:`,
    advanced_prereply_prompt: "Ready.",
    vector_search_enabled: 0,
    vector_search_query_dialogue_rounds: 2,
    vector_search_top_k: 8,
    vector_search_min_score: 0.35,
    init_bootstrap_target_model: "A",
    init_bootstrap_model_anchor_prompt: `You are an AI assistant helping to classify roleplay character data into exactly one of three categories:\n1. "rp_instruction": Rules, guidelines, instructions on how to RP, behaviors, personality traits.\n2. "information": Lore, background, world-building, facts, history, items, relationships.\n3. "output_format": JSON templates, formatting rules, status window schemas.\n\nAnalyze the given JSON list of text blocks. Return ONLY a JSON array of objects with "id" and "category".\nExample: [{"id": "chk_0", "category": "information"}, {"id": "chk_1", "category": "rp_instruction"}]`,
    context_messages: 10,
    timeout_ms: FIXED_TIMEOUT_MS,
    enable_cache: 1,
    extractor_a_concurrency: 0,
    extractor_b_concurrency: 1,
    embedding_concurrency: 1,
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
    model_calls: "pse_model_calls",
    advanced_model_anchor_prompt: "pse_advanced_model_anchor_prompt",
    advanced_prefill_prompt: "pse_advanced_prefill_prompt",
    advanced_prereply_prompt: "pse_advanced_prereply_prompt",
    vector_search_enabled: "pse_vector_search_enabled",
    vector_search_query_dialogue_rounds: "pse_vector_search_query_dialogue_rounds",
    vector_search_top_k: "pse_vector_search_top_k",
    vector_search_min_score: "pse_vector_search_min_score",
    init_bootstrap_target_model: "pse_init_bootstrap_target_model",
    init_bootstrap_model_anchor_prompt: "pse_init_bootstrap_model_anchor_prompt",
    context_messages: "pse_context_messages",
    timeout_ms: "pse_timeout_ms",
    enable_cache: "pse_enable_cache",
    extractor_a_concurrency: "pse_extractor_a_concurrency",
    extractor_b_concurrency: "pse_extractor_b_concurrency",
    embedding_concurrency: "pse_embedding_concurrency",
  };

  const MODEL_PROVIDER_OPTIONS = [
    { value: "openai", label: "openai" },
    { value: "anthropic", label: "anthropic" },
    { value: "google_cloud", label: "google cloud" },
    { value: "grok", label: "grok (xAI)" },
    { value: "github_copilot", label: "github copilot" },
    { value: "openrouter", label: "openrouter" },
    { value: "custom_api", label: "custom API" },
  ];

  const PROVIDER_DEFAULT_URL = {
    openai: "https://api.openai.com/v1/chat/completions",
    anthropic: "https://api.anthropic.com/v1/messages",
    google_cloud: "https://generativelanguage.googleapis.com/v1beta/models",
    grok: "https://api.x.ai/v1/chat/completions",
    github_copilot: "https://api.githubcopilot.com/v1/messages",
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
    { value: "claude", label: "Anthropic Claude" },
  ];

  let LORE_WRITE_MODE_OPTIONS = [
    { value: "append", label: "Append" },
    { value: "overwrite", label: "Overwrite" },
  ];

  const PROVIDER_FORMAT_MAP = {
    openai: "openai", anthropic: "claude", google_cloud: "google", voyageai: "openai",
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
  let sessionStep0HandledHash = null;
  let embeddingCacheStore = null;
  let configCache = {};

  let cachedGlobalNoteData = { charId: null, reloadKeys: 0, globalNote: "", replaceGlobalNote: "", mainPrompt: "" };

  async function getGlobalNoteDataCached(char) {
    const charId = char?.chaId || "-1";
    const currentReloadKeys = char?.reloadKeys || 0;

    if (cachedGlobalNoteData.charId === charId &&
      cachedGlobalNoteData.reloadKeys === currentReloadKeys &&
      cachedGlobalNoteData.charId !== null) {
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
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), remainingMs());
        try {
          const res = await Risuai.nativeFetch(url, { ...options, signal: controller.signal });
          clearTimeout(tid);
          return { res, via, fallbackError: firstError ? String(firstError?.message || firstError || "") : "" };
        } catch (err) {
          clearTimeout(tid);
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
      try { return String(await res.text()); } catch { }
    }
    if (typeof res.data === "string") return res.data;
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
        try { return JSON.parse(res.data); } catch { return res.data; }
      }
      return res.data;
    }
    return null;
  }

  function normalizeUrl(baseUrl) {
    const clean = safeTrim(baseUrl).replace(/\/+$/, "");
    if (!clean) return "";
    if (clean.endsWith("/chat/completions")) return clean;
    return `${clean}/chat/completions`;
  }

  function normalizeUrlByFormat(baseUrl, format) {
    const clean = safeTrim(baseUrl).replace(/\/+$/, "");
    const f = safeTrim(format || "openai").toLowerCase();
    if (!clean) return "";
    if (f === "google") return clean;
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
    sessionStep0HandledHash = null;

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

    try { await Risuai.pluginStorage.removeItem("static_knowledge_chunks"); } catch { }
    try { await Risuai.pluginStorage.removeItem("static_data_hash"); } catch { }
    try { await Risuai.pluginStorage.removeItem("step0_complete"); } catch { }
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

  function upsertEmbeddingCacheEntry(store, cardKey, cardName, entryKey, entry) {
    if (!store.cards) store.cards = {};
    if (!store.cards[cardKey]) {
      store.cards[cardKey] = {
        cardKey,
        cardName: safeTrim(cardName || "Character"),
        updatedAt: Date.now(),
        entries: {},
      };
    }
    const card = store.cards[cardKey];
    if (cardName && cardName !== "Character") card.cardName = safeTrim(cardName);
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
        };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  function parsePossiblyWrappedJson(text) {
    if (!text) return null;
    let src = String(text).trim();
    let mergedResult = null;

    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/gi;
    const matches = [...src.matchAll(codeBlockRegex)];
    if (matches.length > 0) {
      matches.forEach(match => {
        try {
          const parsed = JSON.parse(match[1].trim());
          if (parsed && typeof parsed === "object") {
            if (!mergedResult) mergedResult = Array.isArray(parsed) ? [] : {};
            if (Array.isArray(mergedResult) && Array.isArray(parsed)) mergedResult = mergedResult.concat(parsed);
            else Object.assign(mergedResult, parsed);
          }
        } catch { }
      });
      if (mergedResult) return mergedResult;
    }

    const tryLastBrace = (startChar, endChar) => {
      const first = src.indexOf(startChar);
      const last = src.lastIndexOf(endChar);
      if (first >= 0 && last > first) {
        try { return JSON.parse(src.slice(first, last + 1)); } catch { return null; }
      }
      return null;
    };

    const tryDepthFirst = (startChar, endChar) => {
      const startIdx = src.indexOf(startChar);
      if (startIdx < 0) return null;
      let depth = 0;
      for (let i = startIdx; i < src.length; i++) {
        const c = src[i];
        if (c === startChar) depth++;
        else if (c === endChar) {
          depth--;
          if (depth === 0) {
            try { return JSON.parse(src.slice(startIdx, i + 1)); } catch { return null; }
          }
        }
      }
      return null;
    };

    const firstBrace = src.indexOf("{");
    const firstBracket = src.indexOf("[");
    const useObj = firstBrace >= 0 && (firstBracket < 0 || firstBrace <= firstBracket);
    const useArr = firstBracket >= 0 && (firstBrace < 0 || firstBracket < firstBrace);

    if (useObj) { const r = tryLastBrace("{", "}"); if (r !== null) return r; }
    if (useArr) { const r = tryLastBrace("[", "]"); if (r !== null) return r; }
    if (useObj) { const r = tryDepthFirst("{", "}"); if (r !== null) return r; }
    if (useArr) { const r = tryDepthFirst("[", "]"); if (r !== null) return r; }

    return null;
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
    if (typeof Risuai.getArgument === "function") return await Risuai.getArgument(key);
    if (typeof Risuai.getArg === "function") return await Risuai.getArg(key);
    return undefined;
  }

  async function safeSetArgument(key, value) {
    if (typeof Risuai.setArgument === "function") await Risuai.setArgument(key, value);
    else if (typeof Risuai.setArg === "function") await Risuai.setArg(key, value);
  }

  async function refreshConfig() {
    const next = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      const argValue = await safeGetArgument(key);
      const localValue = await Risuai.safeLocalStorage.getItem(SETTING_KEYS[key]);
      const merged = argValue ?? localValue ?? DEFAULTS[key];
      next[key] = merged;
    }

    next.context_messages = Math.max(1, toInt(next.context_messages, DEFAULTS.context_messages));
    const aTemp = Number(next.extractor_a_temperature);
    const bTemp = Number(next.extractor_b_temperature);
    next.extractor_a_temperature = Number.isFinite(aTemp) ? Math.max(0, Math.min(2, aTemp)) : DEFAULTS.extractor_a_temperature;
    next.extractor_b_temperature = Number.isFinite(bTemp) ? Math.max(0, Math.min(2, bTemp)) : DEFAULTS.extractor_b_temperature;

    next.extractor_a_concurrency = toInt(next.extractor_a_concurrency, DEFAULTS.extractor_a_concurrency);
    next.extractor_b_concurrency = toInt(next.extractor_b_concurrency, DEFAULTS.extractor_b_concurrency);
    next.embedding_concurrency = toInt(next.embedding_concurrency, DEFAULTS.embedding_concurrency);

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

    next.vector_search_enabled = toInt(next.vector_search_enabled, DEFAULTS.vector_search_enabled) === 1 ? 1 : 0;
    next.vector_search_query_dialogue_rounds = Math.max(1, toInt(next.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds));
    next.vector_search_top_k = Math.max(1, toInt(next.vector_search_top_k, DEFAULTS.vector_search_top_k));
    const minScore = Number(next.vector_search_min_score);
    next.vector_search_min_score = Number.isFinite(minScore) ? Math.max(0, minScore) : DEFAULTS.vector_search_min_score;
    next.init_bootstrap_target_model = safeTrim(next.init_bootstrap_target_model) === "B" ? "B" : "A";
    next.init_bootstrap_model_anchor_prompt = String(next.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt);

    next.timeout_ms = FIXED_TIMEOUT_MS;
    await Risuai.safeLocalStorage.setItem(SETTING_KEYS.timeout_ms, String(FIXED_TIMEOUT_MS));
    await safeSetArgument("timeout_ms", FIXED_TIMEOUT_MS);
    next.enable_cache = toInt(next.enable_cache, DEFAULTS.enable_cache) === 1 ? 1 : 0;

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
      format: aFormat,
      temperature: Number(configCache.extractor_a_temperature),
    };
    const b = {
      url: normalizeUrlByFormat(configCache.extractor_b_url || configCache.extractor_a_url, bFormat),
      key: bKey,
      model: safeTrim(configCache.extractor_b_model || configCache.extractor_a_model),
      format: bFormat,
      temperature: Number(configCache.extractor_b_temperature),
    };
    return { a, b };
  }

  async function saveConfigFromUI(formData) {
    for (const [key, storageKey] of Object.entries(SETTING_KEYS)) {
      if (formData[key] !== undefined) {
        const value = formData[key];
        await Risuai.safeLocalStorage.setItem(storageKey, String(value ?? ""));
        const argVal = key === "enable_cache" ? (value ? 1 : 0) : value;
        await safeSetArgument(key, argVal);
      }
    }
    await refreshConfig();
  }

  async function getCopilotBearerToken(rawGitHubToken) {
    const key = safeTrim(rawGitHubToken);
    if (!key) return "";
    const cachedToken = safeTrim(await Risuai.safeLocalStorage.getItem("copilot_tid_token"));
    const cachedExpiry = Number(await Risuai.safeLocalStorage.getItem("copilot_tid_token_expiry") || 0);
    if (cachedToken && Number.isFinite(cachedExpiry) && Date.now() < cachedExpiry - 60_000) return cachedToken;

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

  function parseLorebookNames(raw) {
    return String(raw || "").split(/[\n,]+/g).map((s) => safeTrim(s)).filter((s) => !!s);
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

  async function getLorebookContextByNames(names) {
    const wanted = new Set((names || []).map((x) => safeTrim(x)).filter(Boolean));
    if (wanted.size === 0) return "";
    const { char, chat } = await getCurrentCharAndChatSafe();
    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = extractLorebookEntries(char);

    const pool = [];
    const seenNames = new Set();

    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (!content) continue;
      pool.push({ name, content, source: "local" });
      seenNames.add(name);
    }

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
        break;
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

    const topK = Math.max(1, toInt(configCache.vector_search_top_k, 8));
    const minScore = Number(configCache.vector_search_min_score) || 0;
    const queryRounds = Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds));

    const recentMsgs = (conversationMessages || []).filter(m => m.role === "user" || m.role === "assistant" || m.role === "char").slice(-Math.max(1, queryRounds * 2));
    const convText = recentMsgs.map((m) => String(m.content || "")).join("\n");
    const nameText = (Array.isArray(names) ? names : []).map((x) => String(x || "")).join(" ");
    const queryText = `${nameText}\n${convText}`.trim() || " ";

    const { char, chat } = await getCurrentCharAndChatSafe();
    const gNoteData = await getGlobalNoteDataCached(char);

    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    const charLore = extractLorebookEntries(char);
    const localMap = new Map();

    for (const entry of localLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      if (name && content) localMap.set(name, { content, isDynamic: true, alwaysActive: entry?.alwaysActive === true });
    }
    for (const entry of charLore) {
      const name = safeTrim(entry?.comment || "");
      if (!wanted.has(name)) continue;
      const content = String(entry?.content || "").trim();
      const alwaysActive = entry?.alwaysActive === true || String(entry?.alwaysActive) === "true" || entry?.constant === true || String(entry?.constant) === "true";
      if (name && content) localMap.set(name, { content, isDynamic: false, alwaysActive });
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
              });
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
        topInactiveList = picked.length ? picked : scored.slice(0, topK);
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
    const allowParallel = call?.allow_parallel === true || call?.allow_parallel === "true";
    return {
      id: safeTrim(call?.id) || `call_${Date.now()}_${index}`, name: safeTrim(call?.name) || nameFallback,
      target_model: target, every_n_turns: every, read_dialogue_rounds: readRounds,
      read_lorebook_names: String(call?.read_lorebook_names ?? ""), allow_parallel: allowParallel, entries,
    };
  }

  function parseModelCalls(raw) {
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!Array.isArray(parsed) || parsed.length === 0) return JSON.parse(DEFAULT_MODEL_CALLS).map((x, i) => normalizeModelCall(x, i));
      const normalized = parsed.map((x, i) => normalizeModelCall(x, i));
      return normalized;
    } catch { return JSON.parse(DEFAULT_MODEL_CALLS).map((x, i) => normalizeModelCall(x, i)); }
  }

  function getModelCalls() { return parseModelCalls(configCache.model_calls); }
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
      if (configCache.vector_search_enabled === 1) {
        loreContext = await getLorebookContextByVector(loreNames, scopedConversation);
        if (!safeTrim(loreContext)) loreContext = await getLorebookContextByNames(loreNames);
      } else {
        loreContext = await getLorebookContextByNames(loreNames);
      }
    }
    return buildExtractorMessages(scopedConversation, modelCall, loreContext);
  }

  function formatLoreOutput(raw, parsed, outputFormat, lorebookName, totalEntries) {
    if (!parsed || typeof parsed !== "object") {
      const rawTrimmed = String(raw || "").trim();
      const formatTrimmed = String(outputFormat || "").trim();
      if (/^[{[]/.test(formatTrimmed) && !/^[{[]/.test(rawTrimmed)) return "";
      return totalEntries === 1 ? rawTrimmed : "";
    }
    if (Object.prototype.hasOwnProperty.call(parsed, lorebookName)) {
      const val = parsed[lorebookName];
      if (typeof val === "string") return val.trim();
      try { return JSON.stringify(val); } catch { return String(val || "").trim(); }
    }
    return "";
  }

  function resolveLoreCommentForTarget(target) {
    const entries = getModelCalls().filter((c) => c.target_model === target).flatMap((c) => c.entries || []);
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
              const turnMarker = `### Turn ${roundIndex}`;
              if (prevContent.includes(turnMarker)) {
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

  async function applyRetentionCleanup(userMsgCount) {
    const calls = getModelCalls();
    const retentionEntries = [];
    for (const call of calls) {
      if (!isModelCallDue(call, userMsgCount)) continue;
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

          const allBlocks = body.split(/(?=### Turn \d+|\[Turn: \d+\])/g).map(b => b.trim()).filter(Boolean);

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

  async function writeOutputsForCall(modelCall, raw, parsed, reqHash, roundIndex = 0) {
    const entries = modelCall.entries || [];
    const target = modelCall.target_model === "B" ? "B" : "A";
    if (entries.length > 1 && (!parsed || typeof parsed !== "object")) {
      throw new Error(`Auxiliary model (${modelCall.name}) must return a JSON object, but parsing failed. First 100 chars of raw: ${String(raw || "").slice(0, 100)}`);
    }

    const pendingWrites = [];
    for (const entry of entries) {
      const loreName = safeTrim(entry?.lorebook_name) || resolveLoreCommentForTarget(target);
      const writeMode = safeTrim(entry?.write_mode) === "overwrite" ? "overwrite" : "append";
      const alwaysActive = entry?.always_active === true;
      const outputFormat = safeTrim(entry?.output_format) || "raw";
      if (parsed && typeof parsed === "object" && entries.length > 1 && !Object.prototype.hasOwnProperty.call(parsed, loreName)) continue;
      const content = formatLoreOutput(raw, parsed, outputFormat, loreName, entries.length);
      if (!safeTrim(content)) continue;
      pendingWrites.push({
        loreName, writeMode, alwaysActive, content,
        retentionEnabled: entry?.retention_enabled === true, retentionAfter: Math.max(0, toInt(entry?.retention_after, 0)),
        retentionKeep: Math.max(0, toInt(entry?.retention_keep, 5))
      });
    }

    if (pendingWrites.length === 0) {
      if (entries.length > 0) {
        await Risuai.log(`${LOG} Warning: model output does not match expected entry names (${entries.map(e => e.lorebook_name).join(", ")}) or format is invalid, skipping write.`);
      }
      return;
    }

    const wrote = await batchUpsertLocalLore(pendingWrites, roundIndex);
    if (!wrote) {
      await Risuai.log(`${LOG} Warning: save error occurred while batch-writing data to local Lorebook (call: ${modelCall.name}).`);
    }
  }

  async function callOpenAICompat({ url, apiKey, model, messages, timeoutMs, temperature }) {
    const finalUrl = normalizeUrl(url);
    const finalModel = safeTrim(model);
    if (!finalUrl || !finalModel) throw new Error(`Extractor URL/model is missing.`);
    let headers = { "Content-Type": "application/json" };
    if (isCopilotUrl(finalUrl)) headers = await applyCopilotAuthHeaders(headers, apiKey);
    else if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const { res } = await fetchWithFallback(finalUrl, {
      method: "POST", headers,
      body: JSON.stringify({ model: finalModel, ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}), messages }),
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

  function buildGoogleMessages(messages) {
    const normalized = Array.isArray(messages) ? messages : [];
    const systemTexts = normalized.filter((m) => m?.role === "system").map((m) => normalizeMessageContent(m?.content)).filter(Boolean);
    const contents = normalized.filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: normalizeMessageContent(m?.content) }] }))
      .filter((x) => safeTrim(x?.parts?.[0]?.text));
    if (contents.length === 0) contents.push({ role: "user", parts: [{ text: "Continue." }] });
    return { systemInstruction: systemTexts.length ? { parts: [{ text: systemTexts.join("\n\n") }] } : undefined, contents };
  }

  async function callGoogleGenerative({ url, apiKey, model, messages, timeoutMs, temperature }) {
    const finalUrl = normalizeGoogleGenerateUrl(url, model, apiKey);
    if (!finalUrl) throw new Error("Google URL/model is missing.");
    const headers = { "Content-Type": "application/json" };
    const built = buildGoogleMessages(messages);
    const body = {
      contents: built.contents, ...(built.systemInstruction ? { systemInstruction: built.systemInstruction } : {}),
      generationConfig: { ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}) },
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

  async function callClaudeCompat({ url, apiKey, model, messages, timeoutMs, temperature }) {
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
    const { res } = await fetchWithFallback(finalUrl, {
      method: "POST", headers,
      body: JSON.stringify({ model, max_tokens: 4096, ...(Number.isFinite(Number(temperature)) ? { temperature: Math.max(0, Math.min(2, Number(temperature))) } : {}), ...(system ? { system } : {}), messages: chatMessages }),
    }, timeoutMs, "Claude extractor", false);
    if (!isResponseLike(res) || !res.ok) {
      const errText = await readResponseErrorText(res);
      throw new Error(`HTTP ${isResponseLike(res) ? res.status : 0}: ${String(errText || "").slice(0, 500)}`);
    }
    const data = await readResponseJson(res);
    const content = (data?.content || []).map((x) => (x?.type === "text" ? safeTrim(x?.text) : "")).filter(Boolean).join("\n").trim();
    if (!content) throw new Error("Claude extractor returned empty content.");
    return { parsed: parsePossiblyWrappedJson(content), raw: content };
  }

  async function callExtractorStrict({ url, apiKey, model, messages, timeoutMs, mode, format = "openai", temperature = 0 }) {
    const runner = async () => {
      const f = safeTrim(format || "openai").toLowerCase();
      const result = f === "google" ? await callGoogleGenerative({ url, apiKey, model, messages, timeoutMs, temperature })
        : f === "claude" ? await callClaudeCompat({ url, apiKey, model, messages, timeoutMs, temperature })
          : await callOpenAICompat({ url, apiKey, model, messages, timeoutMs, temperature });
      if (!safeTrim(result?.raw)) throw new Error(`Extractor ${mode} returned empty content.`);
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

    if (configCache.vector_search_enabled === 0) {
      const { char, chat } = await getCurrentCharAndChatSafe();
      const gNoteData = await getGlobalNoteDataCached(char);
      const globalNote = safeTrim(gNoteData.replaceGlobalNote || gNoteData.globalNote);

      let firstChatIdx = cleanInput.findIndex((m) => m.role === "user" || m.role === "assistant" || m.role === "char");
      if (firstChatIdx === -1) firstChatIdx = cleanInput.length;
      let lastChatIdx = -1;
      for (let i = cleanInput.length - 1; i >= 0; i--) {
        if (cleanInput[i].role === "user" || cleanInput[i].role === "assistant" || cleanInput[i].role === "char") { lastChatIdx = i; break; }
      }

      let topSystems = []; let chatHistory = []; let bottomSystems = []; let prefill = [];
      if (lastChatIdx !== -1) {
        topSystems = cleanInput.slice(0, firstChatIdx);
        chatHistory = cleanInput.slice(firstChatIdx, lastChatIdx + 1);
        const remainder = cleanInput.slice(lastChatIdx + 1);
        bottomSystems = remainder.filter((m) => m.role === "system");
        prefill = remainder.filter((m) => m.role !== "system");
      } else {
        topSystems = cleanInput.filter((m) => m.role === "system");
        prefill = cleanInput.filter((m) => m.role !== "system");
      }

      const recentMsgs = limitConversationByRounds(chatHistory, configCache.vector_search_query_dialogue_rounds || 4);
      const triggerQueryText = recentMsgs.map(m => String(m.content || "")).join("\n") || queryText || "";

      const topK = Math.max(1, toInt(configCache.vector_search_top_k, 8));

      let staticChunks = [];
      const staticRaw = await Risuai.pluginStorage.getItem("static_knowledge_chunks");
      if (staticRaw) {
        try {
          staticChunks = JSON.parse(staticRaw);
        } catch (e) {
          console.warn(`${LOG} [injectKnowledge] failed to parse static_knowledge_chunks:`, e);
          await Risuai.log(`${LOG} ⚠️ Unable to parse static_knowledge_chunks, falling back to live fetch mode`);
        }
      } else {
      }

      const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
      let dynamicChunks = [];
      let dynamicChunkId = 0;
      for (const entry of localLore) {
        const raw = String(entry?.content || "").trim();
        if (!raw) continue;
        const content = raw.replace(/^<!-- written_at_turn: \d+ -->\n?/m, "");
        const alwaysActive = entry.alwaysActive === true;
        const subChunks = splitIntoParagraphChunks(content);
        for (const sc of subChunks) {
          dynamicChunks.push({ id: `dynamic_${dynamicChunkId++}`, source: entry.comment || "Chat Lore", alwaysActive, category: "information", content: sc, isDynamic: true });
        }
      }

      const allChunks = [...staticChunks, ...dynamicChunks];

      if (allChunks.length === 0) {
        console.warn(`${LOG} [injectKnowledge] allChunks is empty — no static_knowledge_chunks and no dynamicChunks. Messages will not be enriched.`);
        await Risuai.log(`${LOG} ⚠️ No available chunks (static_knowledge_chunks is empty and no dynamicChunks). Knowledge injection skipped. Please check if initialization (Step 0) has completed.`);
      }

      const activeChunks = allChunks.filter((c) => c.alwaysActive);
      const inactiveChunks = allChunks.filter((c) => !c.alwaysActive);

      let topInactiveChunks = [];
      if (inactiveChunks.length > 0) {
        const matchedChunks = [];
        for (const chunk of inactiveChunks) {
          const lorebookEntry = {
            alwaysActive: false,
            keyword: chunk.keywords || chunk.keyword || "",
            keys: chunk.keys || [],
            selective: chunk.selective || false,
            secondkey: chunk.secondkey || "",
            useRegex: chunk.useRegex || false,
          };
          if (checkLorebookTrigger(lorebookEntry, triggerQueryText)) {
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
        } else if (triggerQueryText.trim()) {
          const queryTokens = tokenizeForSearch(triggerQueryText);
          const scored = inactiveChunks.map((chunk) => {
            const tokens = tokenizeForSearch(chunk.content);
            return { chunk, score: scoreTokens(queryTokens, tokens) };
          });
          scored.sort((a, b) => b.score - a.score);
          const minScore = Number(configCache.vector_search_min_score) || 0;
          const tokScored = scored.filter((x) => x.score > minScore).slice(0, topK).map(x => x.chunk);
          topInactiveChunks = tokScored;
        } else {
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
      const text_3_1 = buildText(grouped.rp_instruction.active);
      const text_3_2 = buildText(grouped.rp_instruction.inactive);
      const text_3_3 = buildText(grouped.information.active);
      const text_3_4 = buildText(grouped.information.inactive);
      const text_3_5 = buildText(grouped.output_format.inactive);
      const text_3_6 = buildText(grouped.output_format.active);

      const block1_arr = [];
      if (text_3_1) block1_arr.push(`[RP Instruction - Active]\n${text_3_1}`);
      if (text_3_2) block1_arr.push(`[RP Instruction - Context]\n${text_3_2}`);
      const block1 = block1_arr.join("\n\n");

      const block2_arr = [];
      if (text_3_3) block2_arr.push(`[Information - Active]\n${text_3_3}`);
      if (text_3_4) block2_arr.push(`[Information - Context]\n${text_3_4}`);
      const block2 = block2_arr.join("\n\n");

      const block3_arr = [];
      if (text_3_5) block3_arr.push(`[Output Format - Context]\n${text_3_5}`);
      if (text_3_6) block3_arr.push(`[Output Format - Active]\n${text_3_6}`);
      const block3 = block3_arr.join("\n\n");

      if (globalNote) {
        const gnChunk = { source: "Global Note", content: globalNote, alwaysActive: true, category: "rp_instruction" };
        const gnText = `[${gnChunk.source}]\n${gnChunk.content}`;
        if (!grouped.rp_instruction.active.includes(gnText)) {
          grouped.rp_instruction.active.unshift(gnText);
        }
      }

      const block1Final_arr = [];
      const t1a = buildText(grouped.rp_instruction.active);
      const t1b = buildText(grouped.rp_instruction.inactive);
      if (t1a) block1Final_arr.push(`[RP Instruction - Active]\n${t1a}`);
      if (t1b) block1Final_arr.push(`[RP Instruction - Context]\n${t1b}`);
      const block1Final = block1Final_arr.join("\n\n");

      const injectedMessages = [...topSystems];
      if (block1Final) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block1Final}\n</${KNOWLEDGE_BLOCK_TAG}>` });
      injectedMessages.push(...chatHistory);
      if (block2) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block2}\n</${KNOWLEDGE_BLOCK_TAG}>` });
      injectedMessages.push(...bottomSystems);
      if (block3) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block3}\n</${KNOWLEDGE_BLOCK_TAG}>` });
      injectedMessages.push(...prefill);

      return injectedMessages;
    }

    const staticRaw = await Risuai.pluginStorage.getItem("static_knowledge_chunks");
    let staticChunks = [];
    if (staticRaw) { try { staticChunks = JSON.parse(staticRaw); } catch (e) { } }

    const { char, chat } = await getCurrentCharAndChatSafe();
    const localLore = Array.isArray(chat?.localLore) ? chat.localLore : [];
    let dynamicChunks = [];
    let dynamicChunkId = 0;
    for (const entry of localLore) {
      const raw = String(entry?.content || "").trim();
      if (!raw) continue;
      const content = raw.replace(/^<!-- written_at_turn: \d+ -->\n?/m, "");
      const alwaysActive = entry.alwaysActive === true;
      const subChunks = splitIntoParagraphChunks(content);
      for (const sc of subChunks) {
        dynamicChunks.push({ id: `dynamic_${dynamicChunkId++}`, source: entry.comment || "Chat Lore", alwaysActive, category: "information", content: sc, isDynamic: true });
      }
    }

    const allChunks = [...staticChunks, ...dynamicChunks];
    const activeChunks = allChunks.filter((c) => c.alwaysActive);
    const inactiveChunks = allChunks.filter((c) => !c.alwaysActive);
    let topInactiveChunks = [];

    if (inactiveChunks.length > 0) {
      try {
        const queryRounds = Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, 4));
        const recentMsgs = messages.filter(m => m.role === "user" || m.role === "assistant" || m.role === "char").slice(-Math.max(1, queryRounds * 2));
        const finalQueryText = recentMsgs.map(m => String(m.content || "")).join("\n") || queryText || " ";

        const queryVecs = await getEmbeddingsForTexts([finalQueryText], true);
        const queryVec = queryVecs[0];
        const store = await loadEmbeddingCacheStore();
        const cardName = char?.name || "Character";
        const cardKey = await getActiveCardKey(char);
        const cardBlock = store.cards?.[cardKey];

        const missingTexts = [];
        const missingIndices = [];
        const vectors = new Array(inactiveChunks.length).fill(null);

        for (let i = 0; i < inactiveChunks.length; i++) {
          const chunk = inactiveChunks[i];
          const textHash = simpleHash(chunk.content);
          const cacheKey = `chunk|${textHash}`;
          const hit = !chunk.isDynamic ? cardBlock?.entries?.[cacheKey] : null;
          if (hit && Array.isArray(hit.vector) && hit.vector.length) vectors[i] = hit.vector;
          else { missingTexts.push(chunk.content); missingIndices.push(i); }
        }

        if (missingTexts.length > 0) {
          const cfg = resolveEmbeddingRuntimeConfig();
          const batchSize = getEmbeddingBatchSize(cfg.requestModel);
          let newlyAddedAny = false;
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
                const chunk = inactiveChunks[idx];

                if (!chunk.isDynamic) {
                  const textHash = simpleHash(chunk.content);
                  upsertEmbeddingCacheEntry(store, cardKey, cardName, `chunk|${textHash}`, {
                    sourceType: "chunk", name: chunk.source, textHash: textHash, dims: vec.length, vector: vec,
                  });
                  newlyAddedBatch = true;
                  newlyAddedAny = true;
                } else {
                  const memCacheKey = `${cfg.provider}|${cfg.format}|${cfg.url}|${cfg.requestModel}|${simpleHash(chunk.content)}`;
                  embeddingVectorCache.set(memCacheKey, vec);
                  if (embeddingVectorCache.size > 1000) {
                    embeddingVectorCache.delete(embeddingVectorCache.keys().next().value);
                  }
                }
              }
            }
            if (newlyAddedBatch) await saveEmbeddingCacheStore();
          }
        }

        const scored = [];
        for (let i = 0; i < inactiveChunks.length; i++) {
          if (vectors[i]) scored.push({ chunk: inactiveChunks[i], score: cosineSimilarity(queryVec, vectors[i]) });
        }
        const minScore = Number(configCache.vector_search_min_score) || 0;
        const topK = Math.max(1, toInt(configCache.vector_search_top_k, 8));
        scored.sort((a, b) => b.score - a.score);
        topInactiveChunks = scored.filter((x) => x.score >= minScore).slice(0, topK).map((x) => x.chunk);
      } catch (e) {
        await Risuai.log(`${LOG} Vector search failed: ${e.message}, falling back to token matching.`);
      }
    }

    if (inactiveChunks.length > 0 && topInactiveChunks.length === 0) {
      const queryTokens = tokenizeForSearch(queryText);
      const scored = inactiveChunks.map((chunk) => {
        const tokens = tokenizeForSearch(chunk.content);
        return { chunk, score: scoreTokens(queryTokens, tokens) };
      });
      const minScore = Number(configCache.vector_search_min_score) || 0;
      const topK = Math.max(1, toInt(configCache.vector_search_top_k, 8));
      scored.sort((a, b) => b.score - a.score);
      topInactiveChunks = scored.filter((x) => x.score >= minScore).slice(0, topK).map((x) => x.chunk);
    }

    const grouped = {
      rp_instruction: { active: [], inactive: [] },
      information: { active: [], inactive: [] },
      output_format: { active: [], inactive: [] },
    };

    const addToGroup = (chunk, isActive) => {
      let cat = chunk.category;
      if (!grouped[cat]) cat = "information";
      grouped[cat][isActive ? "active" : "inactive"].push(`[${chunk.source}]\n${chunk.content}`);
    };

    activeChunks.forEach((c) => addToGroup(c, true));
    topInactiveChunks.forEach((c) => addToGroup(c, false));

    const buildText = (arr) => (arr.length ? arr.join("\n\n") : "");
    const text_3_1 = buildText(grouped.rp_instruction.active);
    const text_3_2 = buildText(grouped.rp_instruction.inactive);
    const text_3_3 = buildText(grouped.information.active);
    const text_3_4 = buildText(grouped.information.inactive);
    const text_3_5 = buildText(grouped.output_format.inactive);
    const text_3_6 = buildText(grouped.output_format.active);

    const block1_arr = [];
    if (text_3_1) block1_arr.push(`[RP Instruction - Active]\n${text_3_1}`);
    if (text_3_2) block1_arr.push(`[RP Instruction - Context]\n${text_3_2}`);
    const block1 = block1_arr.join("\n\n");

    const block2_arr = [];
    if (text_3_3) block2_arr.push(`[Information - Active]\n${text_3_3}`);
    if (text_3_4) block2_arr.push(`[Information - Context]\n${text_3_4}`);
    const block2 = block2_arr.join("\n\n");

    const block3_arr = [];
    if (text_3_5) block3_arr.push(`[Output Format - Context]\n${text_3_5}`);
    if (text_3_6) block3_arr.push(`[Output Format - Active]\n${text_3_6}`);
    const block3 = block3_arr.join("\n\n");

    let firstChatIdx = cleanInput.findIndex((m) => m.role === "user" || m.role === "assistant" || m.role === "char");
    if (firstChatIdx === -1) firstChatIdx = cleanInput.length;
    let lastChatIdx = -1;
    for (let i = cleanInput.length - 1; i >= 0; i--) {
      if (cleanInput[i].role === "user" || cleanInput[i].role === "assistant" || cleanInput[i].role === "char") { lastChatIdx = i; break; }
    }

    let topSystems = []; let chatHistory = []; let bottomSystems = []; let prefill = [];
    if (lastChatIdx !== -1) {
      topSystems = cleanInput.slice(0, firstChatIdx);
      chatHistory = cleanInput.slice(firstChatIdx, lastChatIdx + 1);
      const remainder = cleanInput.slice(lastChatIdx + 1);
      bottomSystems = remainder.filter((m) => m.role === "system");
      prefill = remainder.filter((m) => m.role !== "system");
    } else {
      topSystems = cleanInput.filter((m) => m.role === "system");
      prefill = cleanInput.filter((m) => m.role !== "system");
    }

    const injectedMessages = [...topSystems];
    if (block1) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block1}\n</${KNOWLEDGE_BLOCK_TAG}>` });
    injectedMessages.push(...chatHistory);
    if (block2) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block2}\n</${KNOWLEDGE_BLOCK_TAG}>` });
    injectedMessages.push(...bottomSystems);
    if (block3) injectedMessages.push({ role: "system", content: `<${KNOWLEDGE_BLOCK_TAG}>\n${block3}\n</${KNOWLEDGE_BLOCK_TAG}>` });
    injectedMessages.push(...prefill);

    return injectedMessages;
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

  function getStaticDataPayload(char, resolvedGlobalNote) {
    return {
      desc: char?.desc || char?.description,
      globalNote: resolvedGlobalNote,
      lorebook: extractLorebookEntries(char).filter(l => l).map((l) => ({ comment: l.comment, content: l.content, alwaysActive: l.alwaysActive })),
    };
  }

  async function runStep0Classification(char, resolvedGlobalNote, staticDataHash, resumeMode = false) {
    await Risuai.pluginStorage.setItem("step0_complete", "");
    const chunks = [];
    let chunkId = 0;
    const embedCfg = resolveEmbeddingRuntimeConfig();
    const isVectorEnabled = configCache.vector_search_enabled === 1;

    const addChunks = (source, content, alwaysActive) => {
      if (!content) return;
      const splits = splitIntoParagraphChunks(content);
      splits.forEach((text) => {
        if (text.trim()) chunks.push({ id: `chk_${chunkId++}`, source, content: text, alwaysActive, category: alwaysActive ? "information" : "unknown" });
      });
    };

    addChunks("Character Description", char?.desc || char?.description, true);
    addChunks("Global Note", resolvedGlobalNote, true);

    const lorebook = extractLorebookEntries(char);
    lorebook.forEach((l, idx) => {
      if (!l) return;
      const source = l.comment || `Lorebook ${idx}`;
      const isActive = l.alwaysActive === true || String(l.alwaysActive) === "true"
        || l.constant === true || String(l.constant) === "true";
      addChunks(source, l.content, isActive);
    });

    if (chunks.length === 0) {
      await Risuai.pluginStorage.setItem("static_knowledge_chunks", "[]");
      await Risuai.pluginStorage.setItem("static_data_hash", staticDataHash);
      await Risuai.pluginStorage.setItem("step0_complete", "1");
      return;
    }

    if (resumeMode) {
      try {
        const savedChunksRaw = await Risuai.pluginStorage.getItem("static_knowledge_chunks");
        if (savedChunksRaw) {
          const savedChunks = JSON.parse(savedChunksRaw);
          if (Array.isArray(savedChunks) && savedChunks.length > 0) {
            const savedMap = new Map(savedChunks.map(c => [c.id, c]));
            for (const chunk of chunks) {
              const saved = savedMap.get(chunk.id);
              if (saved?.category) chunk.category = saved.category;
            }
            const inactiveChunks2 = chunks.filter((c) => !c.alwaysActive);
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
                      });
                      newlyAdded = true;
                    }
                  });
                  if (newlyAdded) await saveEmbeddingCacheStore(store);
                }
              }
            }
            await Risuai.pluginStorage.setItem("static_knowledge_chunks", JSON.stringify(chunks));
            await Risuai.pluginStorage.setItem("static_data_hash", staticDataHash);
            await Risuai.pluginStorage.setItem("step0_complete", "1");
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
    const skipClassification = !safeTrim(endpoint.url) || !safeTrim(endpoint.model);
    if (skipClassification || chunksToClassify.length === 0) {
    } else {
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
          await Risuai.pluginStorage.setItem("static_knowledge_chunks", JSON.stringify(chunks));
        } catch (err) {
          console.warn(`${LOG} Classification batch failed:`, err);
        }
      }
      await Risuai.pluginStorage.setItem("static_knowledge_chunks", JSON.stringify(chunks));
    }

    const inactiveChunks = chunks.filter((c) => !c.alwaysActive);
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
                });
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

    await Risuai.pluginStorage.setItem("static_knowledge_chunks", JSON.stringify(chunks));
    await Risuai.pluginStorage.setItem("static_data_hash", staticDataHash);
    await Risuai.pluginStorage.setItem("step0_complete", "1");
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
      if (!originalContent.includes("[Turn: ") && !originalContent.includes("### Turn ")) { newLocalLore.push(entry); continue; }

      const headerMatch = originalContent.match(/^## .*?\n/);
      const header = headerMatch ? headerMatch[0] : "";
      const rest = headerMatch ? originalContent.slice(header.length) : originalContent;

      const blocks = rest.split(/(?=### Turn \d+|\[Turn: \d+\])/g);
      const validBlocks = [];
      let entryChanged = false;

      for (const block of blocks) {
        const m = block.match(/^### Turn (\d+)|^\[Turn: (\d+)\]/);
        if (m) {
          const turn = parseInt(m[1] ?? m[2], 10);
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
    const formatPerMillion = (v) => { if (!Number.isFinite(v) || v < 0) return ""; return `$${(v * 1_000_000).toFixed(3)}/M`; };
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

  function setFormatByProvider(providerId, formatId, allowManualForCustom) {
    const provider = safeTrim(document.getElementById(providerId)?.value);
    const formatEl = document.getElementById(formatId);
    if (!formatEl) return;
    const mapped = PROVIDER_FORMAT_MAP[provider] || "openai";
    formatEl.value = mapped;
    if (allowManualForCustom) formatEl.disabled = provider !== "custom_api";
  }

  function injectStyles() {
    if (document.getElementById("pse-styles")) return;
    const s = document.createElement("style");
    s.id = "pse-styles";
    s.textContent = `
      :root {
        --pse-overlay: rgba(82, 82, 82, 0.55);
        --pse-card-bg: #f5f5f5;
        --pse-card-text: #1f1f1f;
        --pse-muted: #525252;
        --pse-section-bg: #ebebeb;
        --pse-section-border: #cfcfcf;
        --pse-input-bg: #ffffff;
        --pse-input-border: #bdbdbd;
        --pse-tab-bg: #f0f0f0;
        --pse-tab-active-bg: #3f3f3f;
        --pse-tab-active-text: #f5f5f5;
        --pse-card-shadow: rgba(0, 0, 0, 0.28);
        --pse-call-a-border: #9a9a9a;
        --pse-call-b-border: #6f6f6f;
        --pse-embed-border: #7f7f7f;
        --pse-accent-blue: #2563eb;
        --pse-accent-green: #059669;
        --pse-accent-amber: #d97706;
        --pse-accent-cyan: #0891b2;
        --pse-accent-rose: #e11d48;
        --pse-accent-indigo: #4f46e5;
        --pse-accent-orange: #ea580c;
        --pse-accent-violet: #7c3aed;
        --pse-accent-yellow: #ca8a04;
        --pse-font-size-title: 20px;
        --pse-font-size-subtitle: 13px;
        --pse-font-size-header: 15px;
        --pse-font-size-body: 13px;
        --pse-font-size-small: 12px;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --pse-overlay: rgba(10, 10, 10, 0.72);
          --pse-card-bg: #202020;
          --pse-card-text: #e9e9e9;
          --pse-muted: #b9b9b9;
          --pse-section-bg: #292929;
          --pse-section-border: #3e3e3e;
          --pse-input-bg: #171717;
          --pse-input-border: #4c4c4c;
          --pse-tab-bg: #272727;
          --pse-tab-active-bg: #dbdbdb;
          --pse-tab-active-text: #1b1b1b;
          --pse-card-shadow: rgba(0, 0, 0, 0.52);
          --pse-call-a-border: #8f8f8f;
          --pse-call-b-border: #b0b0b0;
          --pse-embed-border: #7e7e7e;
          --pse-accent-blue: #60a5fa;
          --pse-accent-green: #34d399;
          --pse-accent-amber: #fbbf24;
          --pse-accent-cyan: #67e8f9;
          --pse-accent-rose: #fb7185;
          --pse-accent-indigo: #818cf8;
          --pse-accent-orange: #fb923c;
          --pse-accent-violet: #a78bfa;
          --pse-accent-yellow: #facc15;
        }
      }
      .pse-body {
        margin:0; padding:16px;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans TC',sans-serif;
        font-size: var(--pse-font-size-body);
        line-height: 1.4;
        color: var(--pse-card-text);
        background:var(--pse-overlay);
        min-height:100vh;
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
        background:linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, var(--pse-input-bg) 100%);
      }
      .pse-model-section-b {
        border:1px solid var(--pse-section-border);
        border-left:4px solid var(--pse-accent-green);
        background:linear-gradient(180deg, rgba(5, 150, 105, 0.1) 0%, var(--pse-input-bg) 100%);
      }
      .pse-model-section-embed {
        border:1px solid var(--pse-section-border);
        border-left:4px solid var(--pse-accent-amber);
        background:linear-gradient(180deg, rgba(217, 119, 6, 0.1) 0%, var(--pse-input-bg) 100%);
      }
      .pse-section-title { margin:0 0 8px; color:var(--pse-card-text); font-size:var(--pse-font-size-header); font-weight:700; }
      .pse-tabs { display:flex; gap:8px; margin:10px 0 12px; }
      .pse-tabs-secondary { margin-top:0; }
      .pse-tab {
        flex:1; border:1px solid var(--pse-section-border); background:var(--pse-tab-bg); color:var(--pse-card-text);
        border-radius:8px; padding:8px 10px; font-size:var(--pse-font-size-body); font-weight:700; cursor:pointer;
      }
      .pse-tab.active { background:var(--pse-tab-active-bg); color:var(--pse-tab-active-text); border-color:var(--pse-tab-active-bg); }
      .pse-page { display:none; }
      .pse-page.active { display:block; }
      .pse-label { display:block; margin:6px 0 4px; font-size:var(--pse-font-size-body); color:var(--pse-muted); font-weight:600; }
      .pse-status { margin:10px 0; padding:10px; border-radius:8px; font-size:var(--pse-font-size-small); font-weight:600; display:none; }
      .pse-status.info { display:block; background:#dcdcdc; color:#2b2b2b; }
      .pse-status.ok { display:block; background:#cecece; color:#1f1f1f; }
      .pse-status.err { display:block; background:#bdbdbd; color:#111; }
      .pse-input {
        width:100%; padding:8px 10px; border-radius:8px;
        background:var(--pse-input-bg); color:var(--pse-card-text);
        border:1px solid var(--pse-input-border); box-sizing:border-box;
        font-size:var(--pse-font-size-body); font-family:inherit; outline:none;
      }
      .pse-btn {
        padding:10px 16px; border:none; border-radius:8px;
        font-size:var(--pse-font-size-body); font-weight:700; cursor:pointer;
        background:var(--pse-accent-blue); color:#fff; transition:opacity 0.2s;
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
        background:#1a1a1a; color:#f5f5f5; border-radius:6px; font-size:13px; box-sizing:border-box;
        font-family: 'Consolas', 'Monaco', 'Lucida Console', 'Courier New', monospace; resize:vertical; outline:none;
      }
      .pse-entry-list { display:flex; flex-direction:column; gap:8px; margin-top:8px; }
      .pse-call-card {
        border:1px solid var(--pse-section-border); border-left:4px solid var(--pse-accent-blue);
        background:linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, var(--pse-input-bg) 100%);
        border-radius:10px; padding:12px;
      }
.pse-call-card[data-call-parity="odd"] { border-left-color:var(--pse-accent-green); background:linear-gradient(180deg, rgba(5, 150, 105, 0.12) 0%, var(--pse-input-bg) 100%); }
      .pse-call-card[data-call-parity="even"] { border-left-color:var(--pse-accent-blue); background:linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, var(--pse-input-bg) 100%); }
      .pse-page[data-page="3"] .pse-section:first-child { border-left:4px solid var(--pse-accent-indigo); }
      .pse-page[data-page="5"] .pse-section { border-left: 4px solid var(--pse-accent-green); background: linear-gradient(180deg, rgba(5, 150, 105, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-page[data-page="6"] .pse-section { border-left: 4px solid var(--pse-accent-amber); background: linear-gradient(180deg, rgba(217, 119, 6, 0.1) 0%, var(--pse-section-bg) 100%); }
      .pse-call-head { display:grid; grid-template-columns: auto 1fr 120px 120px auto; gap:8px; align-items:end; }
      .pse-call-row2 { margin-top:8px; display:grid; grid-template-columns: 180px 1fr; gap:8px; align-items:end; }
      .pse-assembly {
        border:1px dashed var(--pse-section-border); border-left:4px solid var(--pse-accent-violet);
        background:linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, var(--pse-input-bg) 100%);
        border-radius:8px; padding:10px; font-size:12px; line-height:1.55; color:var(--pse-card-text);
      }
      .pse-entry-block { border:1px solid var(--pse-section-border); border-radius:8px; background:var(--pse-input-bg); padding:8px; }
      .pse-entry-block[data-cache-parity="even"] { border-left:4px solid var(--pse-accent-blue); background:linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-entry-block[data-cache-parity="odd"] { border-left:4px solid var(--pse-accent-green); background:linear-gradient(180deg, rgba(5, 150, 105, 0.08) 0%, var(--pse-input-bg) 100%); }
      .pse-entry-grid { display:grid; grid-template-columns: 1fr 120px 100px auto; gap:8px; align-items:end; }
      .pse-entry-grid-row2 { margin-top:8px; display:grid; grid-template-columns: 1fr; gap:8px; }
      .pse-entry-format-input {
        width:100%; min-height:72px; padding:8px; border:1px solid var(--pse-input-border);
        border-radius:6px; box-sizing:border-box; resize:vertical; font-size:12px;
        font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      .pse-entry-col .pse-label { margin:0 0 4px; font-size:11px; }
      .pse-model-suggestions { margin-top:6px; border:1px solid var(--pse-section-border); border-radius:8px; background:var(--pse-input-bg); max-height:180px; overflow:auto; padding:4px; }
      .pse-model-suggestions.hidden { display:none !important; }
      .pse-model-suggestion-item {
        display:block; width:100%; border:0; background:transparent; color:var(--pse-card-text);
        text-align:left; font-size:12px; padding:6px 8px; border-radius:6px; cursor:pointer;
      }
      .pse-model-suggestion-item:hover { background:rgba(120,120,120,0.18); }
      .pse-entry-remove { border:1px solid var(--pse-section-border); background:var(--pse-input-bg); color:var(--pse-card-text); border-radius:6px; height:34px; min-width:34px; cursor:pointer; }
      .pse-add-entry { margin-top:8px; border:1px dashed var(--pse-section-border); background:var(--pse-input-bg); color:var(--pse-card-text); border-radius:8px; padding:8px 10px; font-size:12px; font-weight:700; cursor:pointer; }
      .pse-editor-overlay { position:fixed; inset:0; background:#161616; z-index:10000; }
      .pse-editor-modal { width:100vw; height:100vh; background:#161616; color:#e6edf3; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; gap:10px; }
      .pse-editor-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
      .pse-editor-title { font-size:14px; font-weight:700; color:#e6edf3; }
      .pse-editor-close { width:34px; height:30px; border:0; background:rgba(255,255,255,.12); color:#fff; border-radius:6px; cursor:pointer; font-size:16px; line-height:1; }
      .pse-editor-textarea { flex:1; width:100%; border:1px solid #3a3a3a; border-radius:8px; padding:12px; box-sizing:border-box; resize:none; font-size:14px; line-height:1.5; color:#e6edf3; background:#111; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .pse-editor-actions { display:flex; justify-content:flex-end; gap:8px; }
      .pse-row { display:flex; gap:8px; }
      .pse-btn-row { display:flex; gap:8px; margin-top:12px; }
      .pse-btn { flex:1; border:none; border-radius:8px; padding:10px 12px; color:#fff; font-size:13px; font-weight:700; cursor:pointer; }
      .pse-btn.save { background:#454545; }
      .pse-btn.cache { background:#666; }
      .pse-btn.close { background:#7c7c7c; }
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

  function showStatus(message, type = "info") {
    const el = document.getElementById("pse-status");
    if (!el) return;
    el.className = `pse-status ${type}`;
    el.textContent = message;
  }

  async function abortMainModelWithAuxError(message) {
    const msg = String(message || _T.aux_abort_default);
    await Risuai.pluginStorage.setItem("last_lore_sync_error", msg);
    await Risuai.log(`${LOG} ❌ Error: ${msg}. Main model response has been forcibly aborted!`);
    try { await Risuai.safeLocalStorage.removeItem("last_req_hash"); } catch { }
    throw new Error(`[RisuAI Agent Error] ${msg} \n(Main model request was intercepted to save API quota)`);
  }

  async function renderSettingsUI() {
    _T = _I18N[await _detectLang()] || _I18N.en;
    LORE_WRITE_MODE_OPTIONS = [{ value: "append", label: _T.append }, { value: "overwrite", label: _T.overwrite }];
    await refreshConfig();
    injectStyles();

    document.body.innerHTML = `
      <div class="pse-body">
        <div class="pse-card">
          <h1 class="pse-title">👤 RisuAI Agent v1.3.1</h1>
          <div id="pse-status" class="pse-status"></div>
          ${renderModelDatalists()}

          <div class="pse-tabs">
            ${`<button class="pse-tab" data-page="7">${_T.tab_help}</button>
            <button class="pse-tab active" data-page="1">${_T.tab_model}</button>
            <button class="pse-tab" data-page="5">${_T.tab_vector}</button>`}
          </div>
          <div class="pse-tabs pse-tabs-secondary">
            ${`<button class="pse-tab" data-page="3">${_T.tab_prompt}</button>
            <button class="pse-tab" data-page="2">${_T.tab_lore}</button>
            <button class="pse-tab" data-page="6">${_T.tab_cache}</button>`}
          </div>

          <div class="pse-page active" data-page="1">
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
            </div>

            <div class="pse-section pse-model-section-embed">
              <div class="pse-section-title">
                ${_T.sec_embed_title}
                <span style="font-size:12px; color:var(--pse-accent-rose); font-weight:normal; display:block; margin-top:4px;">${_T.embed_warn}</span>
              </div>
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
              <label class="pse-label" style="margin-top:10px;">${_T.lbl_concur}</label>
              <select id="embedding_concurrency" class="pse-input">
                <option value="1" ${Number(configCache.embedding_concurrency) === 1 ? "selected" : ""}>${_T.opt_concurrent}</option>
                <option value="0" ${Number(configCache.embedding_concurrency) === 0 ? "selected" : ""}>${_T.opt_sequential}</option>
              </select>
            </div>
          </div>

          <div class="pse-page" data-page="2">
            <div class="pse-section">
              <div class="pse-section-title">${_T.sec_lore_calls}</div>
              <div style="margin-bottom:6px;padding:7px 10px;border-radius:6px;background:rgba(180,140,0,0.1);border:1px solid rgba(180,140,0,0.25);font-size:var(--pse-font-size-small);color:var(--pse-muted);">
                ⚠️ Do not manually edit the current chat's Local Lorebook while the Agent is running, as it may be automatically overwritten by the system.
              </div>
              <div id="model_call_list" class="pse-entry-list"></div>
              <button id="add_model_call" class="pse-add-entry" type="button">${_T.btn_add_call}</button>
            </div>
          </div>

          <div class="pse-page" data-page="3">
            <div class="pse-section">
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

          <div class="pse-page" data-page="5">
            <div class="pse-section" style="border-left:4px solid var(--pse-accent-indigo); background:linear-gradient(180deg, rgba(79, 70, 229, 0.08) 0%, var(--pse-input-bg) 100%);">
              <div class="pse-section-title">${_T.sec_vec}</div>
              <select id="vector_search_enabled" class="pse-input">
                <option value="1" ${Number(configCache.vector_search_enabled) === 1 ? "selected" : ""}>${_T.opt_vec_on}</option>
                <option value="0" ${Number(configCache.vector_search_enabled) === 1 ? "" : "selected"}>${_T.opt_vec_off}</option>
              </select>
              <label class="pse-label">${_T.lbl_query_rounds}</label>
              <input id="vector_search_query_dialogue_rounds" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_query_dialogue_rounds, DEFAULTS.vector_search_query_dialogue_rounds)))}" />
              <label class="pse-label">${_T.lbl_topk}</label>
              <input id="vector_search_top_k" class="pse-input" type="number" min="1" value="${String(Math.max(1, toInt(configCache.vector_search_top_k, DEFAULTS.vector_search_top_k)))}" />
              <label class="pse-label">${_T.lbl_minscore}</label>
              <input id="vector_search_min_score" class="pse-input" type="number" min="0" max="1" step="0.01" value="${String(Number(configCache.vector_search_min_score) || DEFAULTS.vector_search_min_score)}" />
            </div>

            <div class="pse-section" style="border-left:4px solid var(--pse-accent-cyan); background:linear-gradient(180deg, rgba(8, 145, 178, 0.08) 0%, var(--pse-input-bg) 100%);">
              <div class="pse-section-title">${_T.sec_classify}</div>
              <label class="pse-label">${_T.lbl_use_model}</label>
              <select id="init_bootstrap_target_model" class="pse-input">
                <option value="A" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "" : "selected"}>${_T.opt_main_model}</option>
                <option value="B" ${safeTrim(configCache.init_bootstrap_target_model) === "B" ? "selected" : ""}>${_T.opt_aux_model}</option>
              </select>
              <label class="pse-label">${_T.lbl_classify_anchor}</label>
              <div class="pse-textarea-wrap">
                <textarea id="init_bootstrap_model_anchor_prompt" class="pse-textarea">${escapeHtml(String(configCache.init_bootstrap_model_anchor_prompt || DEFAULTS.init_bootstrap_model_anchor_prompt))}</textarea>
                <button id="init_bootstrap_model_anchor_prompt_expand" class="pse-expand-btn" type="button" aria-label="${_T.aria_expand}">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5a1 1 0 0 0-1 1v3"/><path d="M16 4h3a1 1 0 0 1 1 1v3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="pse-page" data-page="6">
            <div class="pse-section">
              <div class="pse-section-title">${_T.sec_cache}</div>
              <div class="pse-row" style="margin-bottom:8px;">
                <button id="pse-embed-cache-refresh" class="pse-btn cache" type="button" style="flex:0 0 auto;">${_T.btn_refresh_cache}</button>
                <button id="pse-embed-cache-clear-all" class="pse-btn" type="button" style="flex:0 0 auto;background:#b44;">${_T.btn_clear_cache}</button>
              </div>
              <div id="pse-embed-cache-list" class="pse-entry-list"></div>
            </div>
          </div>

          <div class="pse-page" data-page="7">
            <div class="pse-section">
              <div class="pse-row" style="margin-bottom:8px;">
                <button id="pse-reset-agent-defaults" class="pse-btn cache" type="button" style="flex:0 0 auto;">${_T.btn_reset}</button>
              </div>
              <div class="pse-assembly">
                ${_T.help_html}
              </div>
            </div>
          </div>

          <div class="pse-btn-row">
            <button id="pse-save" class="pse-btn save">${_T.btn_save}</button>
            <button id="pse-close" class="pse-btn close">${_T.btn_close}</button>
          </div>
        </div>
      </div>
    `;

    const renderEmbeddingCacheList = async () => {
      const wrap = document.getElementById("pse-embed-cache-list");
      if (!wrap) return;
      const store = await loadEmbeddingCacheStore();
      const blocks = summarizeEmbeddingCacheBlocks(store);
      if (!blocks.length) {
        wrap.innerHTML = `<div class="pse-assembly">${_T.no_cache}</div>`;
        return;
      }
      wrap.innerHTML = blocks.map((b, idx) => `
        <div class="pse-entry-block" data-cache-card-key="${escapeHtml(b.cardKey)}" data-cache-parity="${idx % 2 === 0 ? "even" : "odd"}">
          <div class="pse-entry-grid" style="grid-template-columns:1fr auto;">
            <div>
              <div><b>${_T.lbl_card}</b>: ${escapeHtml(b.cardName)}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_entries}</b>: ${escapeHtml(String(b.entryCount))}</div>
              <div style="margin-top:4px;"><b>${_T.lbl_filesize}</b>: ${escapeHtml(formatBytes(b.sizeBytes))}</div>
            </div>
            <button class="pse-entry-remove" type="button" data-delete-cache-card="1">${_T.btn_delete}</button>
          </div>
        </div>
      `).join("");
    };

    await renderEmbeddingCacheList();

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
        const page = el.getAttribute("data-page");
        if (!page) return;
        setPage(page);
      });
    });

    document.getElementById("pse-embed-cache-refresh")?.addEventListener("click", async () => {
      await renderEmbeddingCacheList();
      showStatus(_T.st_cache_refreshed, "info");
    });

    document.getElementById("pse-embed-cache-clear-all")?.addEventListener("click", async (e) => {
      if (!confirm(_T.confirm_clear)) return;
      await clearAllEmbeddingCache();
      await renderEmbeddingCacheList();
      showStatus(_T.st_cache_cleared, "ok");
    });

    document.getElementById("pse-embed-cache-list")?.addEventListener("click", async (e) => {
      const btn = e.target?.closest?.("[data-delete-cache-card]");
      if (!btn) return;
      const block = btn.closest?.("[data-cache-card-key]");
      const cardKey = safeTrim(block?.getAttribute?.("data-cache-card-key") || "");
      if (!cardKey) return;
      const store = await loadEmbeddingCacheStore();
      if (store.cards && store.cards[cardKey]) {
        delete store.cards[cardKey];
        embeddingCacheStore = null;
        try { await Risuai.pluginStorage.removeItem(VCACHE_CARD_PREFIX + cardKey); } catch { }
        await saveEmbeddingCacheStore(store);
        try { await Risuai.pluginStorage.removeItem("static_knowledge_chunks"); } catch { }
        try { await Risuai.pluginStorage.removeItem("static_data_hash"); } catch { }
        try { await Risuai.pluginStorage.removeItem("step0_complete"); } catch { }
        embeddingVectorCache.clear();
        sessionStep0HandledHash = null;
      }
      await renderEmbeddingCacheList();
      showStatus(_T.st_card_deleted, "ok");
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
    let uiModelCalls = getModelCalls();

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
              <div class="pse-entry-col" style="display:flex;align-items:center;gap:6px;">
                <input class="pse-call-allow-parallel" type="checkbox" ${call.allow_parallel ? "checked" : ""} title="${_T.parallel_title}" style="margin:0;flex-shrink:0;" />
                <label class="pse-label" style="margin:0;cursor:pointer;white-space:nowrap;">${_T.lbl_parallel}</label>
              </div>
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
          allow_parallel: card.querySelector(".pse-call-allow-parallel")?.checked === true,
          entries: entries.length ? entries : [defaultOutputEntry(target)],
        }, i);
      });
      return calls.length ? calls : [normalizeModelCall({ name: _T.callnote_a, target_model: "A", every_n_turns: 1, read_dialogue_rounds: 4, read_lorebook_names: "", entries: [defaultOutputEntry("A")] }, 0)];
    };

    const syncUiModelCalls = () => { uiModelCalls = readModelCallsFromUI(); };

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
          ...configCache, model_calls: DEFAULT_MODEL_CALLS, advanced_model_anchor_prompt: DEFAULTS.advanced_model_anchor_prompt,
          advanced_prefill_prompt: DEFAULTS.advanced_prefill_prompt, advanced_prereply_prompt: DEFAULTS.advanced_prereply_prompt,
          vector_search_query_dialogue_rounds: DEFAULTS.vector_search_query_dialogue_rounds, vector_search_top_k: DEFAULTS.vector_search_top_k,
          vector_search_min_score: DEFAULTS.vector_search_min_score, vector_search_enabled: DEFAULTS.vector_search_enabled,
          init_bootstrap_target_model: DEFAULTS.init_bootstrap_target_model, init_bootstrap_model_anchor_prompt: DEFAULTS.init_bootstrap_model_anchor_prompt,
          extractor_a_provider_model_map: DEFAULTS.extractor_a_provider_model_map, extractor_b_provider_model_map: DEFAULTS.extractor_b_provider_model_map,
          embedding_provider_model_map: DEFAULTS.embedding_provider_model_map,
        };
        await saveConfigFromUI(resetFormData);
        await refreshConfig();
        uiModelCalls = getModelCalls();
        uiEmbeddingProviderModelMap = parseSimpleStringMap(configCache.embedding_provider_model_map || "{}");
        uiEmbeddingProviderKeyMap = parseSimpleStringMap(configCache.embedding_provider_key_map || "{}");
        uiExtractorAProviderKeyMap = parseSimpleStringMap(configCache.extractor_a_provider_key_map || "{}");
        uiExtractorBProviderKeyMap = parseSimpleStringMap(configCache.extractor_b_provider_key_map || "{}");
        currentEmbeddingProvider = safeTrim(configCache.embedding_provider || "custom_api");
        uiExtractorAProviderModelMap = parseSimpleStringMap(configCache.extractor_a_provider_model_map || "{}");
        uiExtractorBProviderModelMap = parseSimpleStringMap(configCache.extractor_b_provider_model_map || "{}");
        currentExtractorAProvider = safeTrim(configCache.extractor_a_provider || "custom_api");
        currentExtractorBProvider = safeTrim(configCache.extractor_b_provider || "custom_api");
        renderModelCalls();
        const setVal = (id, value) => { const el = document.getElementById(id); if (el) el.value = String(value ?? ""); };
        setVal("advanced_model_anchor_prompt", configCache.advanced_model_anchor_prompt);
        setVal("advanced_prefill_prompt", configCache.advanced_prefill_prompt);
        setVal("advanced_prereply_prompt", configCache.advanced_prereply_prompt);
        setVal("vector_search_query_dialogue_rounds", configCache.vector_search_query_dialogue_rounds);
        setVal("vector_search_top_k", configCache.vector_search_top_k);
        setVal("vector_search_min_score", configCache.vector_search_min_score);
        setVal("init_bootstrap_target_model", configCache.init_bootstrap_target_model);
        setVal("init_bootstrap_model_anchor_prompt", configCache.init_bootstrap_model_anchor_prompt);
        showStatus(_T.st_reset, "ok");
      } catch (e) { showStatus(_T.st_reset_fail + (e?.message || String(e)), "err"); }
    });

    const bindProviderAutoUrl = (providerId, urlId) => {
      document.getElementById(providerId)?.addEventListener("change", () => {
        const provider = safeTrim(document.getElementById(providerId)?.value);
        const urlEl = document.getElementById(urlId);
        if (!urlEl) return;
        const current = safeTrim(urlEl.value);
        const next = PROVIDER_DEFAULT_URL[provider] ?? "";
        if (!current || Object.values(PROVIDER_DEFAULT_URL).includes(current)) urlEl.value = next;
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
      const refresh = async () => {
        setFormatByProvider(providerId, formatId, true);
        if (!isEmbedding) {
          const providerNow = safeTrim(document.getElementById(providerId)?.value || "");
          fillModelDatalist(datalistId, getModelsByProvider(providerNow));
          Promise.resolve().then(() => refreshExtractorModelOptions(providerId, datalistId)).catch(() => { });
        }
      };
      providerEl.addEventListener("change", () => { refresh().catch(() => { }); });
      refresh().catch(() => { });
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

        const modelCallsForSave = readModelCallsFromUI();

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
          model_calls: JSON.stringify(modelCallsForSave),
          advanced_model_anchor_prompt: document.getElementById("advanced_model_anchor_prompt")?.value ?? "",
          advanced_prefill_prompt: document.getElementById("advanced_prefill_prompt")?.value ?? "",
          advanced_prereply_prompt: document.getElementById("advanced_prereply_prompt")?.value ?? "",
          vector_search_enabled: toInt(document.getElementById("vector_search_enabled")?.value, 0) === 1 ? 1 : 0,
          vector_search_query_dialogue_rounds: Math.max(1, toInt(document.getElementById("vector_search_query_dialogue_rounds")?.value, DEFAULTS.vector_search_query_dialogue_rounds)),
          vector_search_top_k: Math.max(1, toInt(document.getElementById("vector_search_top_k")?.value, DEFAULTS.vector_search_top_k)),
          vector_search_min_score: Math.max(0, Number(document.getElementById("vector_search_min_score")?.value || DEFAULTS.vector_search_min_score)),
          init_bootstrap_target_model: safeTrim(document.getElementById("init_bootstrap_target_model")?.value || DEFAULTS.init_bootstrap_target_model) === "B" ? "B" : "A",
          init_bootstrap_model_anchor_prompt: document.getElementById("init_bootstrap_model_anchor_prompt")?.value ?? "",
          extractor_a_concurrency: toInt(document.getElementById("extractor_a_concurrency")?.value, 1),
          extractor_b_concurrency: toInt(document.getElementById("extractor_b_concurrency")?.value, 1),
          embedding_concurrency: toInt(document.getElementById("embedding_concurrency")?.value, 1),
          context_messages: configCache.context_messages, timeout_ms: configCache.timeout_ms, enable_cache: configCache.enable_cache,
        };
        await saveConfigFromUI(formData);
        showStatus(_T.st_saved, "ok");
      } catch (e) { showStatus(_T.st_save_fail + (e?.message || String(e)), "err"); }
    });

    document.getElementById("pse-close")?.addEventListener("click", async () => { await Risuai.hideContainer(); });
  }

  async function initSettingEntry() {
    const part = await Risuai.registerSetting(
      "RisuAI Agent",
      async () => { await Risuai.showContainer("fullscreen"); await renderSettingsUI(); },
      "👤", "html"
    );
    uiIds.push(part.id);
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

      await refreshConfig();

      if (type === "display") {
        const { chat: displayChat } = await getCurrentCharAndChatSafe();
        const displayMsgs = Array.isArray(displayChat?.message) ? displayChat.message : [];
        const displayUserMsgCount = displayMsgs.filter(m => m?.role === "user").length;
        await applyRetentionCleanup(displayUserMsgCount);
        return messages;
      }

      await Risuai.safeLocalStorage.setItem("last_extractor_mode", "replacer_started");

      const { char, chat } = await getCurrentCharAndChatSafe();
      const existingMsgs = Array.isArray(chat?.message) ? chat.message : [];
      const isFirstMessage = existingMsgs.filter(m => m?.role === "user").length <= 1;
      const lastUserContent = existingMsgs.filter(m => m?.role === "user").pop()?.data || "";

      const gNoteData = await getGlobalNoteDataCached(char);
      const resolvedGlobalNote = safeTrim(gNoteData.replaceGlobalNote || gNoteData.globalNote);

      const currentStaticPayload = getStaticDataPayload(char, resolvedGlobalNote);
      const currentStaticHash = simpleHash(JSON.stringify(currentStaticPayload));
      const savedStaticHash = await Risuai.pluginStorage.getItem("static_data_hash");

      const isVectorEnabled = configCache.vector_search_enabled === 1;
      let needsStep0 = false;
      let step0Reason = "";

      const step0Complete = await Risuai.pluginStorage.getItem("step0_complete");
      const hashChanged = currentStaticHash !== savedStaticHash;
      const sessionHandled = currentStaticHash === sessionStep0HandledHash;

      if (!step0Complete) {
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
      }

      if (needsStep0 && type === "model") {
        try {
          const resumeMode = step0Reason === "incomplete";
          if (isVectorEnabled) {
            await Risuai.log(`${LOG} Starting background knowledge base initialization (Step 0)... Please wait.`);
          } else {
            await Risuai.log(`${LOG} Starting background knowledge base classification (Step 0, keyword mode)... Please wait.`);
          }
          await runStep0Classification(char, resolvedGlobalNote, currentStaticHash, resumeMode);
          sessionStep0HandledHash = currentStaticHash;
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

      const userMsgCount = existingMsgs.filter(m => m?.role === "user").length;
      await performChatCleanup(userMsgCount);

      if (isFirstMessage) {
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
      let extractedData = null; let usedCache = false;

      if (configCache.enable_cache === 1) {
        const completedHash = await Risuai.safeLocalStorage.getItem("last_completed_req_hash");
        if (completedHash === reqHash) {
          extractedData = await Risuai.safeLocalStorage.getItem("last_extracted_data");
          usedCache = true;
        }
      }

      if (!usedCache) {
        await Risuai.safeLocalStorage.setItem("last_req_hash", reqHash);

        const roundIndex = userMsgCount;
        const resolved = resolveExtractorConfig();
        const dueCalls = getModelCalls().filter((c) => isModelCallDue(c, userMsgCount));

        if (dueCalls.length > 0) {
          await Risuai.log(`${LOG} Agent: Calling auxiliary model for analysis and data extraction...`);

          const PARALLEL_LIMIT = 3;
          const parallelCalls = dueCalls.filter(c => c.allow_parallel);
          const sequentialCalls = dueCalls.filter(c => !c.allow_parallel);

          const executeCall = async (call) => {
            const extractedMessages = await buildScopedExtractorMessages(baseConversation, call);
            const endpoint = call.target_model === "B" ? resolved.b : resolved.a;
            return {
              call,
              result: await callExtractorStrict({
                url: endpoint.url, apiKey: endpoint.key, model: endpoint.model, format: endpoint.format, temperature: endpoint.temperature,
                messages: extractedMessages, timeoutMs: configCache.timeout_ms, mode: call.target_model,
              })
            };
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
            if (res.status === "fulfilled") {
              const { call, result } = res.value;
              const parsed = result?.parsed || {};
              if (Object.keys(parsed).length > 0) extractedData = { ...(extractedData || {}), ...parsed };
              const raw = String(result?.raw || "").trim();
              if (raw) {
                try {
                  await writeOutputsForCall(call, raw, result?.parsed, reqHash, roundIndex);
                  if (!extractedData) extractedData = {};
                } catch (e) { await abortMainModelWithAuxError(_T.entry_save_failed + e.message); }
              }
            }
          }
          await Risuai.safeLocalStorage.setItem("last_completed_req_hash", reqHash);
        }

        await Risuai.safeLocalStorage.setItem("last_extractor_mode", "replacer");
        if (extractedData) await Risuai.safeLocalStorage.setItem("last_extracted_data", typeof extractedData === "object" ? JSON.stringify(extractedData) : String(extractedData));
      }

      if (!extractedData && !usedCache) {
        const due = getModelCalls().filter((c) => isModelCallDue(c, userMsgCount));
        if (due.length > 0) await Risuai.log(`${LOG} Warning: auxiliary model returned no usable content or format could not be parsed.`);
      }

      const injectedMessages = await mergeToSystemPromptWithRewrite(messages, null, lastUserContent);

      return injectedMessages;
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

    await initSettingEntry();

    await Risuai.safeLocalStorage.setItem("plugin_loaded_ver", PLUGIN_VER);
    await Risuai.safeLocalStorage.setItem("plugin_loaded_ts", new Date().toISOString());
    await Risuai.safeLocalStorage.removeItem("last_hook_ts");
    await Risuai.safeLocalStorage.removeItem("last_hook_type");
    await Risuai.safeLocalStorage.removeItem("last_req_hash");
    await Risuai.safeLocalStorage.removeItem("last_completed_req_hash");
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
