---
title: "從 0 到 5000 粉，我用 Claude Code 自動化社群發文，單月做到 82 萬流量"
slug: claude-code-automated-social-media-pipeline
lang: zh-tw
excerpt: "手動七步驟搬運內容到放棄邊緣，用 Claude Code 重新設計自動化工作流：資料驗證、Marp 簡報、Buffer 發佈、子貼文導流，單月 82 萬流量。"
feature_image: /assets/posts/claude-code-automated-social-media-pipeline/feature.png
featured: true
published_at: "2026-04-13T00:00:00.000Z"
updated_at: "2026-04-13T00:00:00.000Z"
created_at: "2026-04-13T00:00:00.000Z"
tags:
  - ai
  - automation
  - social-media
pair_slug: claude-code-automated-social-media-pipeline
pair_lang: en
---

## 里程碑

[@mocky.pro](https://www.threads.net/@mocky.pro) Threads 帳號：

- 5,201 粉絲
- 單月 82 萬流量
- 貼文平均 237 次分享、16.5K 觀看、8 次轉發
- 全部只有我加上 Claude Code 在經營

---

## 一開始的策略

一開始的策略很單純：分享外商實習、職缺資訊，幫大家整理好，讓求職者不用自己一個個去翻。

聽起來簡單，但實際執行起來是這樣的：

1. 手動把職缺資訊貼到 Telegram
2. n8n 接收後丟給 Gemini 整理摘要，再回傳到 Telegram
3. 我再手動把資訊貼到 Gamma 做成簡報
4. 微調排版，調整文字大小跟顏色
5. 下載成 PNG
6. 用 Mac 捷徑把 logo 加到每張 slide 右下角
7. 手動上傳到 Threads 跟 IG

七個步驟，每天重複。

更荒謬的是，我還花錢訂了 Gamma Plus，只是為了移除簡報上的 Gamma 浮水印。

這個流程跑了一陣子之後，我非常確定一件事：**如果繼續這樣搬運，我一定會喪失動力且放棄。**

---

## 轉折點：用 Claude Code 重新設計工作流

轉折點是我開始用 Claude Code 把整個工作流程從頭到尾重新設計，讓他變成自動化引擎的角色。

我把流程拆成四個階段：

### 第一階段：取得職缺資訊

我還是會自己從 Facebook 社團、各種管道手動挑選高品質的職缺。自動化的部分是每天早上通知我哪些職缺開放了，但最終要跑哪一筆由我決定。

這是刻意的設計：**讓我控制品質的入口，後面的流程才全部交給自動化。**

### 第二階段：資料整理跟驗證

這一步很重要，也是很多人做內容會跳過的。

我讓 Claude Code 拿到職缺資訊後，自動去對比有公信力的網站：公司官網、104、1111。交叉驗證薪資範圍、職缺描述、公司資訊有沒有對得上。

為什麼要這樣做？因為如果你分享的資訊有錯，粉絲只會記得你不可靠。驗證這件事不花你多少時間，但會幫你省掉很多信任危機。

### 第三階段：產出簡報跟貼文

這一段是我花最多時間調校的。

首先，我準備了好幾篇表現好的貼文當範例，讓 AI 參考這些範例來產出新內容。這個概念叫 **few-shots example**，簡單說就是：你給 AI 看「好的長什麼樣」，它就比較不會亂寫。

再來是簡報的部分。我捨棄了 Gamma，改用 **Marp CLI**——一個用 Markdown 寫簡報的工具，搭配我自己做的 CSS 範本跟背景圖（Figma），出來的風格統一又好看。而且因為是 CLI 工具，Claude Code 可以直接呼叫，完全不需要我手動操作。

logo 也不用自己加了，Claude Code 會自動抓取該公司的 logo，直接放進簡報裡。

以下是一篇實際產出的貼文，從簡報到文案全部自動生成：

![實際產出的 Threads 貼文範例 — UNIQLO 2026 全球儲備菁英計畫](/assets/posts/claude-code-automated-social-media-pipeline/threads-example.png)

### 第四階段：發佈貼文

這裡我用了 **Buffer** 搭配 **MCP（Model Context Protocol）**。

好處是：

- 我完全不需要去碰 Meta API（自己串過的人都知道那有多痛苦）
- 發出去之前會先存成 Draft，我可以用手機檢查一遍再按發佈
- 也可以直接 Queue，排程到指定時段自動發出
- Buffer 的免費額度就夠我同時管三個社群平台了

等於最後一步也只剩「看一眼，按一下」，如果品質確認沒問題甚至連檢查都不用直接排程。

---

## 加碼：用子貼文把流量導回網站

除了主貼文，我還做了一件事：自動產生子貼文（subpost）。

每篇職缺貼文發出後，Claude Code 會透過我網站開放的 API，自動建立一個專屬頁面，頁面上有兩個東西：AI 模擬面試練習、還有這個職缺的深度分析。

然後子貼文會自動附上這個頁面的連結，接在主貼文下面。

以下是實際的子貼文範例——模擬面試練習跟職缺深度分析，都是自動產生的：

![子貼文：AI 模擬面試練習](/assets/posts/claude-code-automated-social-media-pipeline/subpost-mock-interview.png)

![子貼文：職缺深度分析](/assets/posts/claude-code-automated-social-media-pipeline/subpost-deep-analysis.png)

這個做法單月幫我從 Threads 導了 **3,300 個用戶**到 mocky.pro。等於每篇貼文不只是曝光，還直接幫產品帶來流量。

重點是整個過程也是自動的：發貼文 → 呼叫 API 建頁面 → 產生子貼文附連結。我不需要額外操作任何一步。

---

## 讓整套系統穩定運作的幾個關鍵設計

### 統一的背景圖跟客製化 CSS 範本

我用 Figma 設計好固定的背景圖，搭配一套 CSS 範本控制字型、配色、排版。不管今天跑哪一筆職缺，出來的簡報視覺都是一致的。這件事看起來小，但對社群經營來說非常重要——粉絲滑過去的時候一眼就認得出是你的內容。

### 模組化的 Skill 架構

我把 Claude Code 的能力拆成 **unified skills** 跟 **independent skills**。unified skills 是每次都會載入的共用能力；independent skills 是按需載入的，例如驗證資料、抓 logo、抓職缺，各自獨立。

這樣做的好處是系統不會太臃腫，每次只跑需要的部分，速度快也比較不容易出錯。

### Subagent 做 Context 隔離

像資料驗證這種任務，我是用 subagent 來跑的。subagent 是獨立的執行環境，跟主流程的上下文完全隔離。好處是不會互相干擾——驗證過程中查到的大量資料不會污染主流程的 context，讓產出簡報跟貼文的品質更穩定。

---

## 回頭看這整段歷程

自動化幫我省下的時間，全部拿去做一件事：**迭代**。

研究哪種標題粉絲更有感、測試不同的簡報排版、調整貼文結構看哪個分享率更高。這些事情在以前根本沒空做，因為光是搬運就把時間吃完了。

從 0 到 5000 粉不是因為我發得多，是因為我有餘裕不斷改進每一篇的品質。

還有一點很現實：當每篇貼文消耗的精力變少，你就能持續發。社群經營最難的從來不是爆一篇，而是不斷線。很多帳號不是內容不好，是人先累了就停更。

**降低每次產出的消耗，就是在拉長你能持續經營的時間，這在現在的社群環境裡影響比什麼都大。**

---

如果你也在經營社群，不管是個人品牌還是公司帳號，可以想想看你的流程裡，哪些步驟其實是在重複搬運。

那些就是最值得自動化的地方。
