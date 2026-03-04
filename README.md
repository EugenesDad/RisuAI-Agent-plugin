# 🛰️ RisuAI Agent

<p align="center">
  <strong>Multi-Agent Orchestrated Roleplay Engine for RisuAI</strong><br/>
  Parallel reasoning · Long-term memory · Vector retrieval · Token efficiency<br/>
  🇬🇧 English | 🇹🇼 Traditional Chinese | 🇰🇷 Korean
</p>

### Since Curly Braced Syntax (CBS, e.g. {{ }}) is not supported, the vector retrieval function is temporarily closed.

<p align="center">

![Version](https://img.shields.io/badge/version-v2.0-8b5cf6)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/GPL-3.0-blue)
![RisuAI](https://img.shields.io/badge/platform-RisuAI-6366f1)
![Maintenance](https://img.shields.io/badge/maintained-yes-22c55e)

</p>

---

## 🚀 Overview

**RisuAI Agent** is a plugin that simulates an AI agent orchestration layer on top of RisuAI.

It enhances roleplay with:

* 🧠 Contract-based memory discipline
* 🔍 Semantic vector retrieval (temporarily closed)
* ⚖️ Automatic contradiction enforcement
* 📉 Major token consumption reduction
* 🧩 Modular task orchestration (temporarily closed)

Unlike traditional presets, this system separates responsibilities into parallel task groups, dramatically increasing narrative stability and logical rigor.

---

## ✨ Key Benefits

* **Reduced token usage** in long sessions
* **Auxiliary model delegation** for structured reasoning
* Fully automated memory lifecycle
* Works with your preferred preset
* Does not modify the original character bot
* Clean reset when starting a new chat

---

### 🤖 Five Parallel Agent Groups

| Agent        | Frequency      | Responsibility                                  |
| ------------ | -------------- | ----------------------------------------------- |
| **State**    | Every turn     | Tracks scene state and character status         |
| **Logic**    | Every turn     | Detects contradictions and enforces consistency |
| **Quality**  | Every 3 turns  | Prevents repetition and updates world entries   |
| **Longterm** | Every 10 turns | Extracts major plot threads                     |
| **World**    | Every 15 turns | Maintains global world encyclopedia             |

This distributed task design reduces the main model's cognitive load while increasing narrative coherence.
Another default: for a complex bot like The Song of Ice and Fire.

---

### 🔍 Vector Intelligent Retrieval (temporarily closed)

---

## ⚡ Recommended Model Configuration

### Auxiliary Model

* Handles structured JSON only (1k–5k tokens)
* Recommended: 100B+ class models
* Cost-effective reasoning delegation

### Main Model

* Flash-level models are sufficient for short sessions
* Upgrade to Pro-tier models for 50–100+ turn sessions

---

## 🎛 Control Panel Features

### Independent Model Configuration

Main and auxiliary models can use separate API providers.

### Customizable Agent Frequencies

* Modify execution intervals
* Adjust turn read depth
* Enable/disable parallel execution

---

## 📦 Installation

1. Install the plugin from the RisuAI plugin page.
2. Configure API credentials.
3. Apply preset adjustments (see below).

---

## 🔧 Preset Adjustment Guide

### Required Cleanup

Remove from your preset:

* Supa / HypaMemory fields

Plugin regenerates them automatically.

---

### Chat Range Adjustment

Set chat range in Advanced, Range Start to `-10`:

---

### Recommended Injection Prompt

Insert below system prompt:

```markdown
## Contract-First Authority
- Amnesia awareness: you only access the most recent few turns. Rely on injected upstream contracts (`## recent_turn_log`, `## recent_character_states`, etc.) as the ONLY source of truth. Never invent past events absent from the logs. 

## Criticality & Pacing Hooks 
- Resource depletion: if NPC implies fatigue/resource drain in `## recent_character_states`, swap immediately from Active/Advance to Passive/Defensive/Bargaining. Never maintain high-intensity output past this flag. 
- Director injection: if `## system_director` is non-null, introduce that external event this turn to break staleness. 
- Repetition guard: if `## repetition_guard` flags a pattern, actively steer the scene away from it. 
- Contradiction enforcement: if `## known_contradictions` flags a violation, explicitly enforce it in-character.
```

---

## ⚠ Limitations

* Auxiliary model invoked multiple times per turn
* New Chat ONLY. Old chats cannot be continued directly

---

## ❓ Q&A

### Q1: What should I do if the output gets censored or fails to generate?

**A:**
Switch to a different, less-censored model.

Since the system splits data into smaller chunks, the NSFW density will be higher, potentially triggering filtering in some models more often. 

Or, you may try strengthening the prefill prompt, but note:

* Weaker models may experience performance degradation.
* Overly strong prompt injection can reduce task-solving quality.

---

### Q2: What does the “The requested model is not supported” error mean?

**A:**
It might mean the selected model does not support Prefill functionality.

To fix this:

Go to:

```
Global Prompt → Prefill Response Field (default: "Ready.")
```

Clear that field completely, then try again.

---

### Q3: Can I modify the summarization system or system notes?

**A:**
Yes, but you must follow these rules:

* Keep the same JSON template structure.
* Lorebook entry names act as backend classification tags, so each entry must retain the same tag name.

If tags are not matched, the backend retrieval system will fail to correctly classify entries.

---

# 📜 License

GPL-3.0 license
