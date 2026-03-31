# 🛰️ RisuAI Agent

<p align="center">
  <strong>Multi-Agent Orchestrated Roleplay Engine for RisuAI</strong><br/>
  Parallel Reasoning · Persona Directing · Vector Retrieval · Token Efficiency<br/>
  🇬🇧 English | 🇹🇼 Traditional Chinese | 🇰🇷 Korean
</p>

<p align="center">
<img src="https://img.shields.io/badge/status-active-success" alt="Status">
<img src="https://img.shields.io/badge/GPL-3.0-blue" alt="License">
<img src="https://img.shields.io/badge/platform-RisuAI-6366f1" alt="RisuAI">
</p>

---

## 🚀 Overview

**RisuAI Agent** is an advanced orchestration layer built on top of [RisuAI](https://github.com/kwaroran/Risuai). Think of it as a **versatile secretary standing beside a star actor**. 

Instead of forcing your main AI model to juggle memory, world-building, and acting all at once, this plugin delegates the heavy lifting (memory management, logical consistency, and character directing) to specialized background AI agents. This allows your main model to focus entirely on delivering a stellar, immersive performance in the present moment.

---

## 🖼️ Plugin UI

<table>
  <tr>
    <td valign="top">
      <img src="./image/plugin image 1.png" width="100%">
    </td>
    <td valign="top">
      <img src="./image/plugin image 2.png" width="100%">
    </td>
  </tr>
</table>

---

## ✨ Core Features

*   🦾 **Information Extraction:** Distills long, sprawling chat histories into high-density, easily digestible information blocks, completely replacing traditional Supa/HypaMemory and saving massive amounts of tokens.
*   🔀 **Bot Reorganization:** Dismantles the character card and intelligently re-categorizes entries, injecting them into the most optimal structural positions within the prompt.
*   👨‍👦 **Broad Prompt Compatibility:** Works alongside your favorite prompts. The plugin includes a built-in guide to help you tweak your presets for maximum compatibility.

**The following advanced features can be selectively enabled based on your needs:**

*   🎬 **Director's Notes:** Actively guides the plot, manages the character's emotional shifts and reactions, and corrects minor logical inconsistencies in real-time.
*   🔍 **Vector Search:** Replaces rigid keyword matching with intelligent semantic retrieval, drastically increasing the relevance and density of injected background lore.

---

## 🧋 Preset Architecture

This plugin is designed to power [RisuAI](https://github.com/kwaroran/Risuai)'s most advanced prompt architecture to date. Characters remember more, responses are richer, and personalities are multi-dimensional.

### 🏗️ Preset Structure
The optimal prompt execution flow under this architecture looks like this:

```text
System Prompts [Actor Rules] ->
Initial Setting [Bot Info] ->
10 Chat [Recent 5 Message Pairs] -> 
Author's Note -> 
Story Progression [Memory Extraction & Director Instructions] ->
Response Control [Detailed Acting Directives] -> 
Command Setting [Image insert prompts, Status Panel UI] ->
Prefill with Jailbreak [⚠️ Delete this for Claude, DeepSeek, Mistral]
```

---

## 📦 Setup & Configuration

1. **Install the Plugin** directly within [RisuAI](https://github.com/kwaroran/Risuai).
2. Open the **Plugin Settings** (👤 RisuAI Agent).

All step-by-step preset modifications, API key setups, model recommendations, and feature toggles are explained interactively directly inside the [RisuAI](https://github.com/kwaroran/Risuai) interface!

---

## ⁉️ FAQ & Troubleshooting

**Q: I am getting `ERROR 400: Call model not supported`. What do I do?**
> **A:** You are likely using Claude, DeepSeek, or another model that does not support the "Prefill" format. 
> Go to the plugin settings -> **Information Extraction** -> **Common Prompts**. Clear the **Assistant Pre-Reply Prompt** and save. If the error persists, clear the **Assistant Prefill** as well.

**Q: My AI's responses are coming back empty, or I am hitting severe censorship.**
> **A:** Because the Agent splits your data into smaller chunks for background analysis, the "NSFW density" of a specific chunk might be much higher than normal, which can trigger the model's safety filters.
> *Fix:* Switch your Main/Aux background models to ones with lower censorship restrictions, or strengthen your prefill prompts.

---


## 🔗 References
*   *[HER: Human-like Reasoning and Reinforcement Learning for LLM Role-playing](https://www.alphaxiv.org/abs/2601.21459?chatId=019cd9ab-2c7a-7db3-9a1e-6bafa8fe626f)*
*   *[ENHANCING PERSONA FOLLOWING AT DECODING TIME VIA DYNAMIC IMPORTANCE ESTIMATION FOR ROLE-PLAYING AGENT](https://www.alphaxiv.org/abs/2603.01438)*
*   *[Facet-Level Persona Control by Trait-Activated Routing with Contrastive SAE for Role-Playing LLMs](https://www.alphaxiv.org/abs/2602.19157)*
*   *[Structured Personality Control and Adaptation for LLM Agents](https://www.alphaxiv.org/abs/2601.10025)*

---

### 📜 License
Licensed under the **GPL-3.0** License.
