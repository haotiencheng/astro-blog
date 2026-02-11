---
title: "/llms.txt → AI 時代的內容使用手冊"
slug: llms-txt-user-manual-for-content-in-the-ai-era
lang: zh-tw
excerpt: "掌握 AI 時代的內容使用手冊！⁠/llms.txt 讓你的內容更容易被 LLM 理解，無論是 AI Coding、企業知識庫，還是教育學習，都能大幅提升效率。立即了解！"
feature_image: /images/ghost/2025/04/---3-1.png
featured: false
published_at: "2025-04-01T09:50:10.000Z"
updated_at: "2025-04-01T09:52:58.000Z"
created_at: "2025-04-01T08:34:53.000Z"
tags:
  - name: "AI"
    slug: "ai"
  - name: "Development"
    slug: "development"
pair_slug: llms-txt-user-manual-for-content-in-the-ai-era-en
pair_lang: en
---

<p>AI 時代的內容使用手冊是什麼樣子？</p><p><code>/llms.txt</code> 就是解答。</p><p>讓 AI 擁有最新技術的知識，企業內部的繁文縟節也能靠 AI 一句提問解決，大幅提升工作效率，釋放團隊創造力。</p><p>這一切都源於 <code>⁠/llms.txt</code>，一個針對 LLMs 的標準化提案，旨在讓網站提供精煉且結構化的資訊，讓 LLM 能夠更精準地理解和推理。</p><p>這項提案不僅適用於網站，更能廣泛應用於 AI Coding、個人網站、教育領域等各種層面。</p><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://llmstxt.org/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">The /llms.txt file – llms-txt</div><div class="kg-bookmark-description">A proposal to standardise on using an /llms.txt file to provide information to help LLMs use a website at inference time.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/favicon.ico" alt=""><span class="kg-bookmark-author">llms-txt</span><span class="kg-bookmark-publisher">Jeremy Howard</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/sample.png" alt="" onerror="this.style.display = 'none'"></div></a></figure>
<!--kg-card-begin: html-->
<!-- Table of contents -->
<div class="toc-placeholder"></div>
<!--kg-card-end: html-->
<h2 id="%E8%83%8C%E6%99%AF">背景</h2><ul><li>LLMs 有越來越依賴最新網站資訊的趨勢</li><li>重要的限制：Context Window 沒辦法處理大多數網站整體的內容</li><li>實際上要轉換複雜的 HTML 頁面（包含導覽列、廣告、JS等等）成 LLM 友善的純文字是困難且不精準的</li></ul><p>如果能有一個精簡且專業等級的資訊，集中在單一，且易於存取、訪問的位置，這對於 LLMs 來說是非常有益的。</p><p>特別是開發的環境中，LLMs 可以輕鬆存取到開發相關的文件以及 APIs。</p><h2 id="%E6%8F%90%E6%A1%88">提案</h2><h3 id="llm-%E7%B6%B2%E7%AB%99%E7%B4%A2%E5%BC%95">LLM 網站索引</h3><p>將&nbsp;<code>/llms.txt</code>&nbsp;markdown 文件加在網站的 root folder 下，提供 LLM 友善的內容</p><ul><li>這份文件提供網站背景資訊、指示以及各個細節 markdown 文件的連結。</li></ul><h3 id="%E9%87%8D%E9%BB%9E%E7%B6%B2%E9%A0%81%EF%BC%9A%E6%8F%90%E4%BE%9B%E6%B8%85%E7%90%86%E9%81%8E%E7%9A%84-llm-markdown-%E7%89%88%E6%9C%AC">重點網頁：提供清理過的 LLM Markdown 版本&nbsp;</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/04/---2.png" class="kg-image" alt="" loading="lazy" width="1839" height="465" srcset="/images/ghost/size/w600/2025/04/---2.png 600w, /images/ghost/size/w1000/2025/04/---2.png 1000w, /images/ghost/size/w1600/2025/04/---2.png 1600w, /images/ghost/2025/04/---2.png 1839w" sizes="(min-width: 720px) 720px"></figure><p>網站上提供可能對大型語言模型（LLM）有用資訊的頁面，應在與原始頁面相同的 URL 上提供這些頁面的乾淨 markdown 版本，但附加.md。</p><ul><li>如：<code>tutorial.html</code>&nbsp;應要附上&nbsp;<code>tutorial.html.md</code></li></ul><p>FastHTML 就有實作這兩個提案：</p><ol><li>網站導覽：<a href="https://docs.fastht.ml/llms.txt" rel="noopener noreferrer nofollow">https://docs.fastht.ml/llms.txt</a></li><li>重點網頁：<ul><li><a href="https://answerdotai.github.io/fasthtml/tutorials/by_example.html" rel="noopener noreferrer nofollow">answerdotai.github.io/fasthtml/tutorials/by_example.html</a></li><li><a href="https://answerdotai.github.io/fasthtml/tutorials/by_example.html.md" rel="noopener noreferrer nofollow">answerdotai.github.io/fasthtml/tutorials/by_example.html.md</a></li></ul></li></ol><blockquote>注意：由於具體應用場景各不相同，提案並不包含如何處理&nbsp;<code>llms.txt</code>&nbsp;檔案的方式或給出特定建議。</blockquote><h3 id="%E6%A0%BC%E5%BC%8F">格式</h3><ul><li>一個 H1 標題，包含專案或網站的名稱。這是唯一必須包含的部分。</li><li>一個區塊引用 (blockquote)，簡短總結專案，其中包含理解檔案其餘部分所需的關鍵資訊。</li><li>零個或多個 Markdown 區段 (例如段落、清單等)，除了標題之外的任何類型，包含關於專案以及如何解讀所提供檔案的更詳細資訊。</li><li>零個或多個由 H2 標題分隔的 Markdown 區段，包含可用於獲取更多細節的 URL「檔案清單」。</li><li>每個「檔案清單」都是一個 Markdown 清單，包含一個必須存在的 Markdown 超連結，然後選擇性地包含一個冒號 (:) 以及關於該檔案的註釋。</li></ul><p>daisyUI 5 範例：</p><pre><code># daisyUI 5
daisyUI 5 is a CSS library for Tailwind CSS
daisyUI 5 provides class names for common UI components

[docs](http://daisyui.com)

## daisyUI 5 install notes
[install guide](https://daisyui.com/docs/install/)
1. daisyUI 5 requires Tailwind CSS v4
2. `tailwind.config.js` file is deprecated in Tailwind CSS v4. do not use `tailwind.config.js`. Tailwind CSS v4 only needs `@import "tailwindcss";` in the CSS file if it's a node dependency.
3. daisyUI 5 can be installed using `npm i -D daisyui@latest` and then adding `@plugin "daisyui";` to the CSS file
4. daisyUI is suggested to be installed as a dependency but if you really want to use it from CDN, you can use Tailwind CSS and daisyUI CDN files:
```html
&amp;lt;link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" /&amp;gt;
&amp;lt;script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"&amp;gt;&amp;lt;/script&amp;gt;
```
5. A CSS file with Tailwind CSS and daisyUI looks like this (if it's a node dependency)
```css
@import "tailwindcss";
@plugin "daisyui";
```</code></pre><h2 id="%E6%87%89%E7%94%A8%E6%83%85%E5%A2%83">應用情境</h2><h3 id="%E8%BC%94%E5%8A%A9-ai-coding%EF%BC%9Allms-%E5%8F%AF%E4%BB%A5%E8%AE%80%E5%8F%96%E6%9C%80%E6%96%B0%E3%80%81%E6%AD%A3%E7%A2%BA%E6%96%87%E4%BB%B6">輔助 AI Coding：LLMs 可以讀取最新、正確文件</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/04/---2025-04-01---5.45.30.png" class="kg-image" alt="" loading="lazy" width="904" height="370" srcset="/images/ghost/size/w600/2025/04/---2025-04-01---5.45.30.png 600w, /images/ghost/2025/04/---2025-04-01---5.45.30.png 904w" sizes="(min-width: 720px) 720px"></figure><p>最近越來越多網站提供 <code>llms.txt</code> 供開發者使用，如：</p><ul><li><a href="https://supabase.com/llms.txt" rel="noopener noreferrer nofollow">Supabase</a></li><li><a href="https://www.prisma.io/docs/llms.txt" rel="noopener noreferrer nofollow">Prisma</a></li><li><a href="https://resend.com/docs/llms.txt" rel="noopener noreferrer nofollow">Resend</a></li><li><a href="https://svelte.dev/llms.txt" rel="noopener noreferrer nofollow">Svelte</a></li><li><a href="https://daisyui.com/llms.txt">daisyUI</a></li></ul><p>不論是在 Cursor 添加&nbsp;<a href="https://docs.cursor.com/context/@-symbols/@-docs" rel="noopener noreferrer nofollow">doc</a>&nbsp;或是直接在 AI Chat 中新增&nbsp;<code>llms.txt</code>&nbsp;進行對話，都能享受到最完備的資訊以及 LLM 的方便快速。</p><p>如果開發者已經定義好自己的 tech stack，那將各個 stack 的&nbsp;<code>llms.txt</code>&nbsp;整合並利用 Agent 去產出 Code 的錯誤率會大幅降低，且速度會因為清晰的架構而大幅提升。</p><h3 id="%E5%80%8B%E4%BA%BA%E7%B6%B2%E7%AB%99%EF%BC%9A%E5%9B%9E%E7%AD%94%E9%97%9C%E6%96%BC%E5%80%8B%E4%BA%BA%E5%B1%A5%E6%AD%B7%E3%80%81%E6%88%96%E6%98%AF%E4%BB%BB%E4%BD%95%E7%9B%B8%E9%97%9C%E5%95%8F%E9%A1%8C">個人網站：回答關於個人履歷、或是任何相關問題</h3><p>試想將你自己的所有經歷，資訊精簡成一份&nbsp;<code>llms.txt</code>&nbsp;，再透過 AI 去跟自己對話，是否可以看出之前沒有看出的觀點？（當局者迷的那種）。</p><p>或者將你的聯絡資訊、報價方案（如果有在接案）等等放在網站的回答機器人中，那就可以和潛在客戶完整的對答，不需花費額外的人力、時間對接。</p><h3 id="%E4%BC%81%E6%A5%AD%E5%85%A7%E9%83%A8%E7%9F%A5%E8%AD%98%E5%BA%AB%EF%BC%9A%E6%89%93%E7%A0%B4%E9%83%A8%E9%96%80%E5%A3%81%E5%A3%98%EF%BC%8C%E6%8F%90%E5%8D%87%E8%B3%87%E8%A8%8A%E6%B5%81%E9%80%9A%E6%95%88%E7%8E%87"><strong>企業內部知識庫：</strong>打破部門壁壘，提升資訊流通效率</h3><p>將 ⁠<code>llms.txt</code> 的概念應用於企業內部知識庫，讓員工可以利用 LLM 快速查找和利用企業內部的資訊。</p><p>想像一下，企業將其 API 文檔、開發規範、設計指南、常見問題解答、以及產品資訊等，整理成結構化的 <code>llms.txt</code> 檔案。員工可以使用 LLM，透過簡單的提問，快速獲取所需的資訊，例如：「請給我新進員工的必須流程。」或「公司對於 Component 命名的最佳實踐是什麼？」。</p><p>LLM 可以讀取 <code>llms.txt</code>，理解企業知識庫的結構，並從相關的文件中提取答案。 此外，企業還可以針對不同的部門或專案，建立客製化的 <code>llms-full.txt</code>，將所有相關的資訊整合在一個檔案中，方便 LLM 快速存取。這可以大幅提升員工的工作效率，減少尋找資訊的時間，並確保員工使用的是最新的企業知識。</p><h3 id="%E6%95%99%E8%82%B2%E9%A0%98%E5%9F%9F%EF%BC%9A%E7%8F%BE%E4%BB%A3%E5%AD%B8%E7%BF%92%E5%8A%A0%E9%80%9F%E5%99%A8"><strong>教育領域：現代</strong>學習加速器</h3><p>教師可以提供課程的 ⁠<code>llms.txt</code>，讓學生可以利用 LLM 更方便地學習和複習課程內容。</p><p>例如，一位教授 python 的教師，可以為其課程建立一個 <code>llms.txt</code> 檔案，其中包含課程大綱、作業說明、參考文獻、以及範例程式碼的連結。</p><p>學生可以使用 LLM，針對課程內容進行提問，例如：「什麼是遞迴？」，LLM 可以讀取 <code>llms.txt</code>，並從相關的課程資料中提取答案。</p><p>教師還可以為每個章節或主題，建立對應的 Markdown 文件，並在 <code>llms.txt</code> 中建立連結，方便學生深入學習。</p><p>此外，學生也可以利用 LLM，總結課程內容、複習重點、以及準備考試。透過 <code>llms.txt</code>，學生可以更有效地利用 LLM 輔助學習，提升學習效果。 進一步地，可以將歷屆考題、作業範例、以及學生常犯錯誤等資訊也加入 <code>llms.txt</code> 中，讓 LLM 能夠更全面地輔助學生學習。</p><h2 id="llmstxt-vs-llms-fulltxt"><code>llms.txt</code>&nbsp;vs.&nbsp;<code>llms-full.txt</code></h2><p>llms.txt 是一個索引檔案，包含連結以及內容的簡短描述。LLM 或 Agent 必須追蹤這些連結才能存取詳細資訊。</p><p>llms-full.txt 則將所有詳細內容直接包含在單一檔案中，從而無需額外的導覽。</p><p>使用 llms-full.txt 的一個關鍵考量因素是其<strong>檔案大小</strong>。 對於大量的文件來說，這個檔案可能會變得太大，以至於無法放入 LLM 的上下文窗口中。</p><h3 id="%E5%B0%8F%E5%9E%8B%E5%B0%88%E6%A1%88%EF%BC%9A%E9%81%B8%E6%93%87-llms-fulltxt">小型專案：選擇&nbsp;<code>llms-full.txt</code></h3><p>如果你的專案還在初期階段，並且架構並不龐大，那我會推薦你選擇&nbsp;<code>llms-full.txt</code>&nbsp;去做開發以及調整。</p><p>因為含有所有詳細內容，你的專案可以享受較快的開發速度以及較低的出錯率。對於小型專案來說，<code>llms.txt</code>的內容過於廣泛，會需要額外的查找，浪費了初期快速迭代的時間。且&nbsp;<code>llms-full.txt</code>&nbsp;的數量以及內容不會太過於龐大，以至於超過 LLM 的上下文窗口。</p><h3 id="%E4%B8%AD%E5%A4%A7%E5%9E%8B%E5%B0%88%E6%A1%88%EF%BC%9Allmstxt-%E7%82%BA%E4%B8%BB%EF%BC%8C%E9%87%8D%E9%BB%9E%E5%85%A7%E5%AE%B9%E4%BD%BF%E7%94%A8-llms-fulltxt">中大型專案：<code>llms.txt</code>&nbsp;為主，重點內容使用&nbsp;<code>llms-full.txt</code></h3><p>中大型專案的架構龐大，內含的技術框架基本上以現今的伺服器環境下沒有辦法塞入全數的&nbsp;<code>llms-full.txt</code>&nbsp;。會建議將資源放在重點項目上，如最新的技術或者影響力最大的技術上。其餘的技術框架則靠&nbsp;<code>llms.txt</code>&nbsp;用索引的方式去查找。</p><h3 id="%E5%BD%88%E6%80%A7%E9%81%B8%E6%93%87%EF%BC%9A%E6%A8%A1%E7%B5%84%E5%8C%96%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95">彈性選擇：模組化的使用方法</h3><p>這其實是我最推薦的一種方法，在使用&nbsp;<code>llms.txt</code>&nbsp;之前，你是否有想過這段 code 有需要用全部的 tech stack 去修改嗎？是不是其實這段程式碼只需要一兩個技術框架的搭配就可以完成。</p><p>根據你開發中的程式碼，搭配相對應技術的&nbsp;<code>llms-full.txt</code>&nbsp;，就可以達到客製化且不會浪費任何上下文窗口的優勢。</p><h2 id="llmstxt-vs-robotstxt-vs-sitemapxml"><code>llms.txt</code> vs. <code>robots.txt</code> vs. <code>sitemap.xml</code></h2><p>想像一下，你在經營一個網站，這三個檔案就像是給不同對象看的地圖：</p><ul><li><code>llms.txt</code> 是特別為 AI 聊天機器人準備的精簡版網站導覽，讓它們快速了解網站重點，以便在回答問題時提供更精準的資訊</li><li><code>robots.txt</code> 則是告訴網路爬蟲哪些地方可以去、哪些地方不要去，確保網站不會被不當抓取</li><li>而 <code>sitemap.xml</code> 就像是網站的完整目錄，列出所有頁面，方便搜尋引擎找到並收錄網站的內容。</li></ul><h3 id="%E8%A1%A8%E6%A0%BC%E6%AF%94%E8%BC%83">表格比較</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th style="text-align:left"></th>
<th style="text-align:left">llms.txt</th>
<th style="text-align:left">robots.txt</th>
<th style="text-align:left">sitemap.xml</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">用途</td>
<td style="text-align:left">為 LLM 提供網站的精選概述，用於推理。</td>
<td style="text-align:left">告知自動化工具可接受的網站存取權限。</td>
<td style="text-align:left">列出網站上所有可索引的人工可讀資訊。</td>
</tr>
<tr>
<td style="text-align:left">主要使用者</td>
<td style="text-align:left">大型語言模型 (LLM)</td>
<td style="text-align:left">搜尋引擎機器人和其他自動化工具</td>
<td style="text-align:left">搜尋引擎</td>
</tr>
<tr>
<td style="text-align:left">包含內容</td>
<td style="text-align:left">網站的精選資訊、指向外部網站的連結、結構化資料標記參考。</td>
<td style="text-align:left">允許或禁止抓取和建立索引的規則。</td>
<td style="text-align:left">網站上所有可索引頁面的列表。</td>
</tr>
<tr>
<td style="text-align:left">LLM 可讀性</td>
<td style="text-align:left">專為 LLM 設計。</td>
<td style="text-align:left">不適用。</td>
<td style="text-align:left">通常不是 LLM 的最佳格式。</td>
</tr>
<tr>
<td style="text-align:left">資訊量</td>
<td style="text-align:left">精選，較少資訊但更相關。</td>
<td style="text-align:left">不適用。</td>
<td style="text-align:left">所有可索引頁面的完整列表，資訊量大。</td>
</tr>
<tr>
<td style="text-align:left">使用時機</td>
<td style="text-align:left">在使用者明確要求有關主題的資訊時。</td>
<td style="text-align:left">在搜尋引擎機器人抓取網站時。</td>
<td style="text-align:left">在搜尋引擎索引網站時。</td>
</tr>
<tr>
<td style="text-align:left">與其他檔案的關係</td>
<td style="text-align:left">可以補充 robots.txt，並參考結構化資料標記。</td>
<td style="text-align:left">與 llms.txt 互補，用於控制網站的存取。</td>
<td style="text-align:left">不是 llms.txt 的替代品，因為它缺少 LLM 可讀版本和外部連結。</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="%E5%A6%82%E4%BD%95%E7%9F%A5%E9%81%93%E7%B6%B2%E7%AB%99%E6%9C%89%E6%8F%90%E4%BE%9B-llmstxt%EF%BC%9F">如何知道網站有提供 llms.txt？</h2><p>基本上現在的網站都會明確標示有提供&nbsp;<code>llms.txt</code>&nbsp;，如果你不想浪費時間查找，那&nbsp;<a href="https://llmstxthub.com/" rel="noopener noreferrer nofollow">llms.txt hub</a>&nbsp;是一個方便的儲存庫選項。</p><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://llmstxthub.com/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">llms.txt hub - Discover AI-Ready Documentation</div><div class="kg-bookmark-description">Explore AI-friendly websites and tools implementing the llms.txt standard. Find and submit llms.txt files for better AI integration.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/favicon-1.ico" alt=""><span class="kg-bookmark-author">llms.txt hub</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/opengraph-image.png" alt="" onerror="this.style.display = 'none'"></div></a></figure><p>儲存庫也有提供&nbsp;<a href="https://chromewebstore.google.com/detail/llmstxt-checker/klcihkijejcgnaiinaehcjbggamippej" rel="noopener noreferrer nofollow">Chrome Extension</a>、<a href="https://marketplace.visualstudio.com/items?itemName=TheDavidDias.vscode-llms-txt" rel="noopener noreferrer nofollow">VSCode 插件</a>、<a href="https://github.com/thedaviddias/mcp-llms-txt-explorer" rel="noopener noreferrer nofollow">MCP Server</a>、<a href="https://www.raycast.com/thedaviddias/llms-txt" rel="noopener noreferrer nofollow">Raycast 插件</a>等等選擇，大家可以自己斟酌使用！</p>
