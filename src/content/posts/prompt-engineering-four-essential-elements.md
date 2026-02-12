---
title: "頂尖團隊的 Prompt Engineering 祕訣：四大元素打造提示工程專家！"
slug: prompt-engineering-four-essential-elements
lang: zh-tw
excerpt: "本文彙整 Github、AWS、Anthropic 及 Google 的 Prompt Engineering 祕訣，透過實用範例深入解析四大核心元素（任務、情境、人設、格式），助您打造高效提示，顯著提升 AI 理解力、回應精準度與輸出品質。"
feature_image: /images/ghost/2025/06/Untitled-2025-05-29-header.webp
featured: true
published_at: "2025-06-01T14:20:31.000Z"
updated_at: "2025-06-01T14:20:31.000Z"
created_at: "2025-06-01T04:48:35.000Z"
tags:
  - name: "AI"
    slug: "ai"
  - name: "Development"
    slug: "development"
pair_slug: null
pair_lang: null
---


<!--kg-card-begin: html-->
<!-- Table of contents -->
<div class="toc-placeholder"></div>
<!--kg-card-end: html-->
<figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29----.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1027" srcset="/images/ghost/2025/06/Untitled-2025-05-29----.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 2400w" sizes="(min-width: 720px) 720px"></figure><h2 id="%E6%8F%90%E7%A4%BA%E8%A9%9E%E7%AF%84%E4%BE%8B%E6%87%89%E7%94%A8">提示詞範例應用</h2><pre><code>&lt;transcript&gt;
{文字記錄}
&lt;/transcript&gt;

&lt;example&gt;
## 摘要
{總結文字記錄的多個句子}

## 重點
{條列式 3-5 個重點，總結影片文字記錄中的關鍵點或重要時刻並附帶解釋}

## 引言
{從文字記錄中提取 5-7 個最能代表主旨或最令人印象深刻的句子列表}
&lt;/example&gt;


&lt;request&gt;
- 摘要和重點繁體中文呈現
- 引言則保留原文
- 使用 Markdown 標題格式呈現摘要、重點和引言，如範例所示
&lt;/request&gt;

你是一名專業分析師，使用 &lt;transcript&gt; 創建一份滿足 &lt;example&gt; 以及 &lt;request&gt; 的摘要。
旨在幫我快速了解紀錄以及釐清重點</code></pre><h2 id="task%EF%BC%88%E4%BB%BB%E5%8B%99%EF%BC%89">Task（任務）</h2><h3 id="%E6%B0%B8%E9%81%A0%E5%B0%87%E4%B8%BB%E8%A6%81%E6%8C%87%E4%BB%A4-%E5%95%8F%E9%A1%8C%E6%94%BE%E5%9C%A8-prompt-%E7%9A%84%E6%9C%80%E5%BE%8C">永遠將主要指令 &amp; 問題放在 prompt 的最後</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14352.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14352.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>根據 Anthropic 的測試顯示，在 prompt 的結尾提出問題，可以擁有 <strong>30%</strong> 的品質提升。在越複雜的情況下更是尤其明顯。</p><p>這個策略協助 model 聚焦在最重要的資訊上，降低產生幻覺（Hallucinations）的機率。</p><blockquote>永遠記得要使用「動詞」或者「命令」，這是提示詞裡最重要的元素</blockquote><h3 id="%E6%8F%90%E4%BE%9B%E7%AF%84%E4%BE%8B%E7%B5%A6-ai-%E5%8F%83%E8%80%83">提供範例給 AI 參考</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1435--.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>舉例來說，如果只問 AI <code>10 + 10 是什麼？</code>，得到的答案會是 <code>10 + 10 是 20</code>。但如果有在 prompt 中提到你想要得到的結果範例，AI 就能夠回答出方向正確的答案。</p><pre><code class="language-bash">--------- Question ---------
&lt;example&gt;
1 + 1 是加法
1 - 1 是減法
1 * 1 是乘法
1 / 1 是除法
&lt;/example&gt;

10 + 10 是什麼？

--------- Answer ---------
AI: 10 + 10 是加法
</code></pre><p>在常見的任務裡，只需要少量（1 ~ 4個）範例就可以達到很好的效果。</p><ul><li><strong>少樣本（Few-shot）：需要極少數</strong>針對特定任務的範例（通常放在 prompt 中）來引導模型。</li><li><strong>零樣本（Zero-shot）：完全不需要</strong>針對特定任務的任何範例或標記資料。</li><li><strong>多樣本（Multi-shot）：多個範例（&gt; 5 個），適用於更複雜</strong>或需要更多模式的任務。</li></ul><p>少樣本通常可以解決大部分的問題。 效果仍不理想時，可以嘗試多樣本的模式。但仍需注意是否達到上下文限制，過多的範例也可能不會帶來邊際效益的顯著提升。</p><h3 id="%E4%B8%80%E6%AC%A1%E5%8F%AA%E8%A7%A3%E6%B1%BA%E3%80%8C%E4%B8%80%E3%80%8D%E5%80%8B%E5%95%8F%E9%A1%8C">一次只解決「一」個問題</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14354.webp" class="kg-image" alt="" loading="lazy" width="1860" height="959" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14354.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>當你問 LLM 一個複雜問題時，與其一次提出所有內容，不如將問題分解成幾個小步驟或子問題。</p><blockquote>一個重要的參考點：如果你的問題有超過「一個動詞」，那就可以被拆分成不同的小任務。</blockquote><p>Prompt：<code>修正這段 code 的錯誤並且優化它。</code></p><p>這段 Prompt 的問題：</p><ul><li>應該要先修復還是先優化？</li><li>優化的點為何？速度、易讀性還是記憶體的用量</li></ul><p>修正後的 Prompt：</p><ul><li>任務一：<code>修正這段 code 的錯誤</code></li><li>任務二：將修復完的 Code 複製到窗口 → <code>對這段 code 進行效能優化</code></li></ul><h3 id="%E8%A6%81%E6%B1%82-ai-%E5%88%86%E6%AD%A5%E9%A9%9F%E6%80%9D%E8%80%83">要求 AI 分步驟思考</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14355.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14355.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>如果你判斷自己不想花時間拆分內容以及 Prompt，可以試試「要求 AI 分步驟思考」這個技巧，背後的技術叫做<strong>思維鏈（Chain of Thought, CoT）</strong>。LLM 透過分解問題並逐步推理，可以顯著提高解決問題的成功率和答案的準確性。</p><p>Prompt 結構：</p><pre><code class="language-bash">[你的問題]

- 請一步一步思考
- 將思考邏輯列點表示
</code></pre><p>範例：</p><pre><code class="language-bash">--------- Question ---------
&lt;context&gt;
受害者：李先生，在家中書房被發現身亡，死亡時間約為晚上 10 點。
現場：書房門從內部上鎖，窗戶稍微開啟。房間沒有打鬥痕跡，但書桌上一個用於鎮紙的獨特小銅像不見了。
嫌疑人：
1. 李太太：聲稱從晚上 9 點開始一直在客廳看電視。
2. 張會計：李先生的生意夥伴，聲稱晚上 8 點到 11 點都在市中心的辦公室加班，辦公室大樓有刷卡紀錄，但只顯示進入時間。
3. 王園丁：當天下午一直在李先生家整理花園直到 7 點離開，住在附近。警方在書房窗戶下方發現一個泥濘的鞋印，鞋印與王園丁常穿的靴子吻合。
&lt;/context&gt;

&lt;request&gt;
- 請一步一步思考
- 將思考邏輯列點表示
&lt;/request&gt;

請問，誰是兇手？

--------- Answer ---------
好的，我們來一步一步分析這個案件：

1.  分析受害者、現場與死亡時間：
    *   李先生在書房死亡，時間約晚上 10 點。
    *   書房門從內部上鎖，窗戶微開。
    *   無打鬥痕跡，但鎮紙銅像不見了。

2.  分析現場線索的意義：
    *   門從內部上鎖：這通常意味著死者是自己鎖的，或是兇手在離開前從內部鎖上，然後有其他方式離開（例如窗戶），或者兇手是室內的人，殺害後鎖門，但現場又有窗戶微開的線索，這點需要與其他線索結合看。
    *   窗戶微開： 這可能是一個潛在的進出點，特別是如果門從內部上鎖，阻止了從門離開。
    *   無打鬥痕跡：可能意味著死者認識兇手，或是被快速制服，或是死於下毒等非搏鬥方式。
    *   銅像不見：可能是兇器（如果銅像夠重）或被兇手帶走的物品。

3.  分析嫌疑人及其不在場證明：
    *   李太太：聲稱 9 點到 11 點在客廳看電視。這是屋內的活動，難以完全證實，且她可以自由進出書房。
    *   張會計：聲稱 8 點到 11 點在辦公室加班。大樓刷卡紀錄只顯示進入時間，無法證明他這段時間都在辦公室內，他理論上有可能離開辦公室前往李先生家，犯案後再返回。但沒有直接證據顯示他去了李先生家。
    *   王園丁：下午在李先生家待到 7 點。警方在書房窗戶下方發現與他靴子吻合的泥濘鞋印。

4.  整合線索與嫌疑人：
    *   王園丁的泥濘鞋印直接將他與案發現場的窗戶連結起來。窗戶微開的狀態也支持了這個連結。
    *   如果王園丁是兇手，他可能在離開後又返回，通過窗戶進入書房。
    *   進入書房後，他犯下兇案（可能使用了失蹤的銅像），然後通過窗戶離開。
    *   至於門從內部上鎖的問題，有幾種可能：
        *   李先生在王園丁進入前就已將門鎖上，王園丁通過窗戶進入。
        *   王園丁犯案後，設法從內部鎖上門，然後從窗戶離開（這取決於鎖的結構是否允許這樣做，但理論上有可能，例如用工具伸入門縫）。
        *   現場被兇手稍微佈置過，試圖混淆偵查方向。

5.  評估各嫌疑人的可能性：
    *   李太太和張會計的不在場證明都不夠牢固，且都有動機的潛在可能性（家庭糾紛或生意問題）。然而，缺乏直接的物理證據將他們連結到案發現場。
    *   王園丁的不在場證明在 7 點後失效，並且有強烈的物理證據（泥濘鞋印）直接將他與案發現場的窗戶連結起來，而窗戶微開的狀態與此證據吻合。

6.  得出結論：
    綜合所有線索，王園丁的泥濘鞋印是目前最強烈的物理證據，直接指向他曾出現在書房窗戶下方，時間點可能在 7 點離開後到 10 點案發之間。雖然門從內部上鎖的細節略顯矛盾，但與窗戶的微開以及鞋印結合來看，王園丁通過窗戶進出並犯案的可能性最大。

因此，根據提供的線索，最有可能的兇手是王園丁。
</code></pre><h2 id="format%EF%BC%88%E6%A0%BC%E5%BC%8F%EF%BC%89">Format（格式）</h2><h3 id="%E6%B8%85%E6%A5%9A%E5%AE%9A%E7%BE%A9%E8%BC%B8%E5%87%BA%E6%A0%BC%E5%BC%8F">清楚定義輸出格式</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14357.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14357.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>如果你希望模型以特定的格式回覆，如：</p><ul><li>單個詞彙</li><li>列點表示</li><li>註解後的程式碼</li><li>限制在 250 字內</li><li>包裝在 Markdown Code Block 裡</li></ul><p>在提示詞裡預先填好格式會讓輸出更為精準且有效。</p><h3 id="%E8%A6%81%E6%B1%82%E6%A8%A1%E5%9E%8B%E5%BC%95%E7%94%A8%E5%8E%9F%E6%96%87%E6%88%96%E4%BE%86%E6%BA%90">要求模型引用原文或來源</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14358.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14358.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>要求 LLM 在執行任務之前先引用文件中的相關部分，這有助於排除文件其餘內容的「雜訊」。並且可以輕鬆驗證其真實性。</p><p>這在以下情境有很好的作用：</p><ul><li>文本、轉錄稿總結（Youtube, Podcast）<ul><li>清晰看到總結的邏輯</li><li>瞭解原文口吻</li></ul></li><li>多文件、長文章處理<ul><li>找出來源的位置、文件</li></ul></li></ul><p>實際運用方法：加上 <code>從文本中提取最好的句子並列成清單</code></p><pre><code class="language-bash">--------- Question ---------
&lt;context&gt;
〈5月沖繩：最適合說走就走的月份〉-- 一直玩的馬摩

這裡的「5月」特別指黃金週之後的時段。

▌　為什麼沖繩5月是最適合晚鳥、說走就走的月份？

•　住宿價格落在全年低點，幾乎不調漲
•　機票價格偏低，晚鳥漲幅小到可忽略
•　日本短期無大型連假，對台灣來說5月是出發淡季
•　因此，餐廳、住宿、租車預訂更容易，清倉機票促銷也變多

善用日本天氣網站 Tenki，可以立即安排行程。

1.　打開Tenki，觀察「2週間天氣」
2.　打開Skyscanner，搜尋兩週內最低的票價
3.　此時的沖繩住宿接近凍漲，不用擔心會訂貴
4.　直接出發行程

▌　5月沖繩的凍漲 Shoulder Season

5月的沖繩市場有個特性，市場價格幾乎凍漲。
住宿、機票都不會有漲幅，就算有，也小到幾乎可以忽略。
每年5～6月，沖繩都是這樣的市場狀況，這也是飯店業（尤其是渡假村）對市場的預期調整。

沖繩市場一年內會出現兩次住宿底價：5月黃金週後、12月初。
5月黃金週後到夏初，會是少見的shoulder season。
正常來說，想要划算玩沖繩的會選擇12月，但那時渡假村的CP值其實更低。
沙灘未開放、設施維修、餐廳更換菜單的情況時常發生。
更好的選擇是5月。
但5月的主要變數是梅雨季，有無梅雨，對沖繩的景觀和體驗差異極大。

所以「躲梅雨季，搭配凍漲的市場價格」，是沖繩5月晚鳥最好的規劃方法。
Tenki的短期準確率很高，所以看隔天~2週內的日期就好。
確認好天氣日期 -&gt; 找機票 -&gt; 找住宿
可以用4,000的價格連住4晚渡假村，搭配5~6,000的廉航機票來回。
每人15,000可以安排機票＋4晚渡假村住宿。
連住4晚。
即使現在訂、下週出發，仍能找到好價格。

▌　總結

先看天氣 -&gt; 看機票 -&gt; 找住宿，在沖繩5月是最好的安排方法。
就算錯過今年，明年同樣適合用這種方式規劃沖繩5月的行程。
對於上班族要排假，難度也降低很多。
&lt;/context&gt;

根據上述文稿

1. 幫我總結重點
2. 從文本中提取最好的句子並列成清單

--------- Answer ---------
好的，根據您提供的文稿，以下是總結重點與精選句子：

總結重點

文稿指出，每年五月（特別是黃金週後）是規劃沖繩「說走就走」行程的最佳時段，主要原因包括：

*   機票和住宿價格處於全年低點且幾乎「凍漲」，即使晚鳥訂購漲幅也極小。
*   五月是日本和台灣的旅遊淡季，預訂餐廳、住宿和租車更容易，也常有清倉機票促銷。
*   相較於另一個價格低點的十二月，五月有更好的度假村體驗（設施開放、沙灘可用）。
*   規劃五月沖繩行的最佳方法是利用日本天氣網站 Tenki 確認兩週內的天氣（特別是躲避梅雨季），再尋找機票和住宿，即使臨時決定也能找到好價格。

精選句子

以下是從文本中提取的幾個重點句子：

*   這裡的「5月」特別指黃金週之後的時段。
*   住宿價格落在全年低點，幾乎不調漲。
*   機票價格偏低，晚鳥漲幅小到可忽略。
*   5月的沖繩市場有個特性，市場價格幾乎凍漲。
*   更好的選擇是5月。
*   但5月的主要變數是梅雨季，有無梅雨，對沖繩的景觀和體驗差異極大。
*   所以「躲梅雨季，搭配凍漲的市場價格」，是沖繩5月晚鳥最好的規劃方法。
*   善用日本天氣網站 Tenki，可以立即安排行程。
*   先看天氣 -&gt; 看機票 -&gt; 找住宿，在沖繩5月是最好的安排方法。
*   就算錯過今年，明年同樣適合用這種方式規劃沖繩5月的行程。
</code></pre><h3 id="request-%E4%BD%BF%E7%94%A8-xml-%E6%A8%99%E7%B1%A4%E7%B5%90%E6%A7%8B%E5%8C%96%E5%85%A7%E5%AE%B9-request">&lt;request&gt; 使用 XML 標籤結構化內容 &lt;/request&gt;</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14359.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14359.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>XML 標籤是 AI 可以理解的分類器。透過標籤分類 prompt，可以讓 AI 更了解內容的架構，進而作出更精確的回答。</p><p>舉例來說：</p><pre><code class="language-bash">&lt;document&gt;
這裡可以放各種背景文件
&lt;/document&gt;

&lt;example&gt;
範例
&lt;/example&gt;

&lt;request&gt;
針對回應的需求
&lt;/request&gt;
</code></pre><p>後續也可以將 tag 當作變數，提供 prompt 如：</p><p><code>請利用 &lt;document&gt; 中的資料，搭配 &lt;example&gt; 的範例，針對 &lt;request&gt; 提供答案</code></p><blockquote>小提示：使用 XML tags 搭配 multishot examples 及 CoT 就可以擁有高度架構化且效能極佳的提示詞。</blockquote><h3 id="%E9%A0%90%E5%A1%AB%E5%9B%9E%E6%87%89-prefill-response">預填回應 (Prefill Response)</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-143.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-143.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>AI 的回應有時會過於冗長，或在開頭增加不必要的句子（儘管已經有明確指派回答格式）。</p><p>如果你是工程師，並且希望 AI 可以回答你指定的格式，那預填回應會是一個很好的解決方法。</p><p>使用&nbsp;<code>{</code>&nbsp;預填可以讓 AI 省略前面的文字，直接回傳架構化的資料</p><p>範例：</p><pre><code class="language-bash">--------- User ---------
&lt;description&gt;
The SmartHome Mini is a compact smart home assistant available in black or white for only $49.99. At just 5 inches wide, it lets you control lights, thermostats, and other connected devices via voice or app—no matter where you place it in your home. This affordable little hub brings convenient hands-free control to your smart devices.
&lt;/description&gt;

Extract the name, size, price, and color from this product description as a JSON object:

--------- Assistant(prefill) ---------
{

--------- Assistant Response ---------
  "name": "SmartHome Mini",
  "size": "5 inches wide",
  "price": "$49.99",
  "color": "black or white"
}


--------- Assistant Response without prefill ---------
	Here’s the extracted information in JSON format:

```json
{
“name”: “SmartHome Mini”,
“size”: “5 inches wide”,
“price”: “$49.99”,
“colors”: [“black”, “white”]
}
```

I’ve extracted the following details from the product description:
- Name: SmartHome Mini
- Size: 5 inches wide
- Price: $49.99
- Colors: Available in black and white

The JSON object provides a structured format that’s easy for programs to parse and use. Let me know if you need any modifications or have any other questions!
</code></pre><p>AI 的回覆會從&nbsp;<code>Assistant</code>&nbsp;結束的地方開始，具體實現方法如下：</p><pre><code class="language-javascript">import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-opus-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Give me a random json object."},
        {"role": "assistant", "content": "{"}  # Prefill here
    ]
)
</code></pre><h2 id="persona%EF%BC%88%E4%BA%BA%E8%A8%AD%EF%BC%89">Persona（人設）</h2><h3 id="%E7%B5%A6%E4%BA%88-ai-%E8%A7%92%E8%89%B2-rolename">給予 AI 角色 [ROLE_NAME]</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1432.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1432.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>為 AI 設定一個角色 <code>[ROLE_NAME]</code> 可以極大地影響其輸出的內容、風格和行為。這就像為 AI 穿上一套特定的制服，使其以特定的方式思考和回應。</p><p>不同的角色會產出的內容相距甚大，舉例來說：</p><pre><code class="language-javascript">--------- User ---------
你是 [老師]。請問什麼是重力？
--------- Answer ---------
同學你好！重力是一種自然現象，它描述了具有質量的物體之間相互吸引的力。簡單來說，就是地球把地面上的東西（包括你和我）往下拉的力量。你知道是誰第一個提出關於重力的重要理論嗎？這個力的大小與物體的質量有關，質量越大，重力也越大。如果你還有其他關於重力的問題，或是想知道更多相關知識，隨時可以問我喔！

--------- User ---------
你是 [說故事者]。請問什麼是重力？
--------- Answer ---------
啊，重力！這是一個古老而神祕的力量，它像一個看不見的巨人，溫柔地把我們拉向堅實的大地。想像一下，當雨滴從天空落下，是它引導著它們歸向地面；當樹上的蘋果成熟墜落，也是它溫柔的召喚。重力編織著宇宙的舞蹈，讓行星圍繞恆星旋轉，讓星系聚集在一起，編寫著一曲無聲而宏偉的宇宙之歌。這個力量，既是我們腳下的依靠，也是遙遠星辰的連結。

--------- User ---------
你是 [程式設計師]。請問什麼是重力？
--------- Answer ---------
在物理學模擬或遊戲開發中，重力通常被視為一個影響物體位置和運動的速度向量。在牛頓力學的框架下，一個常見的簡化模型是假設存在一個恆定的向下的加速度向量，其大小約為 9.8 m/s² (或在某些系統中設為 9.81)。在程式碼中，這可以表示為 ⁠Vector3(0, -9.8, 0)（假設 Y 軸向上）。對於更精確的模擬，例如宇宙中的萬有引力，會使用到牛頓的萬有引力定律，其中兩個物體之間的引力大小與它們質量的乘積成正比，與它們距離的平方成反比 (
\[
F = G \frac{m_1 m_2}{r^2}
\]
)，方向沿著連接兩物體的直線。
</code></pre><blockquote>角色扮演訣竅：搭配預填 <code>[ROLE_NAME]</code> 可以提醒 AI 扮演好角色，也適用在較長且複雜的對話。配合 <code>system</code> 參數可以更加具有威力</blockquote><pre><code class="language-javascript">--------- User ---------
&lt;image&gt;cutting_hand.jpg&lt;/image&gt;
如何從這張圖判斷出人的職業？

--------- Answer w/o prefill ---------
從這張圖片來看，手指尖上有一些深色的線條或痕跡，看起來像是墨水或類似物質留下的。

根據手指上的這些痕跡，可以推斷出這個人的職業可能與需要經常接觸墨水或會讓手部沾染顏料或印刷物的活動有關，例如：

*   **作家/編輯/學生：** 經常使用鋼筆或原子筆書寫。
*   **藝術家/設計師：** 使用墨水、顏料進行繪畫、素描或設計工作。
*   **印刷工人/出版業相關人員：** 處理油墨、紙張等印刷材料。
*   **古籍修復師或圖書館員：** 處理老舊的、可能掉墨的書籍或文獻。
*   **記者：** 早期的記者可能經常使用鋼筆或處理報紙稿件。

總而言之，這張圖片主要透過「手指上的墨水痕跡」來暗示可能的職業方向。但這只是一種推測，並非絕對準確。

--------- Answer with prefill [名偵探柯南] ---------
噢噢，這是一個很棒的線索！就像我經常遇到的案件一樣，身體上的細微之處往往藏著關鍵的秘密。

看看這張圖片，你注意到指尖上的那道裂痕了嗎？這可不是普通的傷痕。這種因為乾燥、摩擦或是細微反覆的動作造成的指尖龜裂，特別容易出現在某些特定職業的人身上。

例如：

*   **音樂家 (尤其是弦樂器演奏者)：** 像是吉他、小提琴等樂器的弦，會長時間摩擦指尖，特別是練習量大的時候，很容易造成指尖皮膚變硬、甚至龜裂。
*   **從事手工藝的人：** 需要長時間使用工具，或是處理細緻材料（如紙張、布料、木頭）的工作，指尖也會因為摩擦或壓力而產生類似的痕跡。
*   **經常接觸特定化學物質或在乾燥環境工作的人：** 某些職業環境會讓皮膚變得異常乾燥，導致指尖更容易裂開。

所以，單從這張圖來看，最有可能的職業線索是指向**需要長時間使用指尖進行細緻操作或承受摩擦**的工作，其中以**弦樂器音樂家**是個非常典型的可能性。

這個小小的裂痕，就是犯人或是相關人士留下的「無聲的證詞」啊！接下來，我們需要尋找更多的線索來證實這個推斷！真相永遠只有一個！
</code></pre><h3 id="%E5%85%81%E8%A8%B1-ai-%E6%A8%A1%E5%9E%8B%E8%AA%AA%E3%80%8C%E6%88%91%E4%B8%8D%E7%9F%A5%E9%81%93%E3%80%8D">允許 AI 模型說「我不知道」</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>這是一個可以高度降低 AI 產生幻覺機率的技巧，這讓 AI 有空間去表達是否需要更多資料以便產生更精確的回答。</p><p>實際運用方法就是加上：</p><ul><li><code>“If you are unsure or don’t have enough information to provide a confident answer, simply say ‘I don’t know’ or ‘I’m not sure.'”</code></li><li><code>「如果您不確定或沒有足夠的資訊提供一個確定的答案，只需說『我不知道』或『我不確定』。」</code></li></ul><h2 id="context%EF%BC%88%E6%83%85%E5%A2%83%EF%BC%89">Context（情境）</h2><h3 id="%E8%83%8C%E6%99%AF%E8%B3%87%E6%96%99%E6%B0%B8%E9%81%A0%E6%94%BE%E5%9C%A8-prompt-%E7%9A%84%E9%A0%82%E7%AB%AF">背景資料永遠放在 prompt 的頂端</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-142.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-142.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>搭配指令在最後的技巧，是最好的 prompt 工具。</p><blockquote>可以加碼用 XML 標籤分類，使 AI 更瞭解各個資料的用途</blockquote><h3 id="%E7%9B%A1%E5%8F%AF%E8%83%BD%E6%8F%90%E4%BE%9B%E8%83%8C%E6%99%AF%E8%B3%87%E6%96%99%EF%BC%88%E6%96%87%E4%BB%B6%E3%80%81%E5%9C%96%E7%89%87%E7%AD%89%EF%BC%89">盡可能提供背景資料（文件、圖片等）</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>背景資料越完備，AI 可以給出的回應也越精準。但要注意以下幾點</p><ol><li>是否有不相關的資料？</li><li>這些資料是否過於冗長，不夠精確？</li><li>這些資料能否被拆分成不同問題詢問？進而提高準確度。</li></ol><p>資料當然不是越多越好，而是要在數量與品質中尋求一個甜蜜點，讓 AI 能夠更精準地產出回覆。</p><h2 id="faq">FAQ</h2><p><strong>Q: 達到窗口上限怎麼辦？</strong> </p><p>A: 參考以下方法：</p><ul><li>只提供必要的內容。</li><li>拆分成不同的部分。</li></ul><p><strong>Q: AI 回答太長了，根本看不完，或者太短了，資訊不夠，可以控制嗎？</strong> </p><p>A: 可以。你可以在 prompt 中明確指示 AI 回答的長度。例如：</p><ul><li><strong>限制字數或段落數</strong>：「請用大約 100 字回答」、「請用三個段落總結」。</li><li><strong>要求簡潔或詳細</strong>：「請簡要說明」、「請詳細解釋這個概念」。</li><li><strong>要求列點或摘要</strong>：「請用列點方式呈現主要觀點」、「請提供一個執行摘要」。 明確的長度指令有助於 AI 生成符合你閱讀需求的內容。</li></ul><p><strong>Q: AI 有時候會亂編答案，講一些好像是它自己想出來的內容，怎麼辦？</strong> </p><p>A: 這種現象稱為「幻覺」(Hallucination)。應對方法包括：</p><ul><li><strong>要求引用來源</strong>：請 AI 提供其資訊來源，以便查核。</li><li><strong>交叉驗證</strong>：將 AI 的答案與其他可靠來源的資訊進行比對。</li><li><strong>簡化問題</strong>：如果問題太複雜，AI 可能更容易出錯。嘗試將問題分解成更小的部分。</li><li><strong>提供明確的背景資訊</strong>：確保 AI 擁有足夠的上下文來理解你的問題。</li><li><strong>調整「溫度」(Temperature)</strong>：如果可以設定，較低的溫度參數通常會讓 AI 的回答更保守和基於事實，減少創造性（但也可能減少多樣性）。</li><li><strong>明確指出錯誤並要求更正</strong>：如果你發現 AI 編造內容，可以指出並要求它重新生成一個基於事實的答案。</li></ul><p><strong>Q: AI 給的答案常常不是我想要的，或感覺它聽不懂我的意思，怎麼辦？</strong> </p><p>A: 這通常可以透過改進你的 prompt (指令) 來解決：</p><ul><li><strong>使用清晰、明確的語言</strong>：避免模糊不清或模棱兩可的詞彙。</li><li><strong>提供足夠的背景資訊 (Context)</strong>：讓 AI 了解問題的來龍去脈。</li><li><strong>明確指出期望的答案格式或類型</strong>：例如，你是想要一個解釋、一個列表、一段程式碼，還是一個故事？</li><li><strong>使用範例 (Few-shot prompting)</strong>：提供一兩個你期望的問答範例，引導 AI 理解你的需求。</li><li><strong>逐步引導</strong>：如果問題複雜，可以先問一個引導性的問題，再逐步深入。</li><li><strong>嘗試不同的措辭</strong>：同樣的問題，換種說法 AI 可能更容易理解。</li></ul><p><strong>Q: 如果我不知道 AI 表達的意思是什麼怎麼辦？</strong> </p><p>A: 當 LLM 給出一個答案時，如果你不明白它是如何得出的，可以要求它「請詳細解釋你的推導過程」或「請分步驟說明」。這有助於你理解答案，也能讓模型在思考過程中減少錯誤。</p><p><strong>Q: 設定 AI 角色 (Persona) 真的每次都有用嗎？有沒有什麼情況下效果比較好或比較不好？</strong> </p><p>A: 設定角色通常能讓 AI 的回應更符合特定領域的風格和口吻，並有助於行為一致性。在需要特定專業知識（如扮演醫生、律師）或特定風格（如扮演福爾摩斯、詩人）時效果顯著。但如果任務本身非常直接和客觀（例如純粹的數據提取），角色的影響可能較小。可以嘗試使用 ⁠[ROLE_NAME] 預填來強化角色。</p><p><strong>Q: 提供背景資料 (Context) 是不是越多越好？會不會反而讓 AI 混淆？</strong> </p><p>A: 提供相關且適量的背景資料非常重要，但並非越多越好。</p><ul><li><strong>相關性是關鍵</strong>：只提供與當前問題直接相關的資訊。無關的資訊可能會分散 AI 的注意力，導致答案偏離主題或混淆。</li><li><strong>避免過長</strong>：AI 有其處理上下文長度的限制 (Context Window)。如果提供的背景資料過長，超出其處理範圍，AI 可能會忽略早期的資訊或無法有效利用所有內容。</li><li><strong>結構化呈現</strong>：如果背景資料較多，可以考慮用列點、摘要或明確的分隔符號來組織，幫助 AI 更好地理解。</li><li><strong>重點突出</strong>：如果某些背景資訊特別重要，可以嘗試在 prompt 中強調它們。 目標是提供足夠的資訊讓 AI 準確理解你的意圖，同時避免不必要的冗餘和混淆。</li></ul><p><strong>Q: 除了文中提到的列點、字數限制、XML，還有沒有其他可以指定的輸出格式？</strong></p><p>A: 當然！你可以指定許多不同的輸出格式，例如：</p><ul><li><strong>表格 (Table)</strong>：要求 AI 以 Markdown 表格形式輸出。</li><li><strong>JSON 或 YAML</strong>：如果需要結構化數據，這是很好的選擇，特別是當你需要程式化處理輸出時。</li><li><strong>特定風格的文本</strong>：例如「請用教學的語氣解釋」、「請用說故事的方式呈現」。</li><li><strong>程式碼片段</strong>：指定語言和期望的功能。</li><li><strong>摘要 (Summary) 或關鍵點 (Key Takeaways)</strong>。 發揮創意，AI 通常能很好地適應你的格式要求。</li></ul><p><strong>Q: 「請 AI 一步一步思考」或類似的指令 (例如 CoT)，在什麼情況下特別有效？</strong></p><p>A: 這類指令在處理需要多步驟推理、邏輯分析或計算的問題時特別有效。例如：</p><ul><li>數學應用題。</li><li>複雜的邏輯判斷。</li><li>需要分析多個條件才能得出結論的任務。</li><li>當 AI 對一個問題的直接回答不理想時，要求它「逐步思考」可以引導它分解問題，並展現其思考過程，有助於找出問題點或得到更正確的答案。</li></ul><p><strong>Q: 我可以要求 AI 避免談論某些話題或使用某些詞彙嗎？</strong> </p><p>A: 可以。你可以在 prompt 中明確指示 AI 的限制。例如：</p><ul><li>「在你的回答中，請不要提及[某話題]。」</li><li>「請避免使用[某詞彙或某類詞彙]。」</li><li>「確保你的回答是客觀中立的，不包含任何個人意見或偏見。」 這有助於控制輸出的邊界，使其更符合你的特定需求或內容政策。</li></ul><h2 id="%E5%8F%83%E8%80%83%E8%B3%87%E6%96%99%E5%8F%8A%E4%BE%86%E6%BA%90">參考資料及來源</h2><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://github.blog/ai-and-ml/github-copilot/github-for-beginners-how-to-get-llms-to-do-what-you-want/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">GitHub for Beginners: How to get LLMs to do what you want</div><div class="kg-bookmark-description">Learn how to write effective prompts and troubleshoot results in this installment of our GitHub for Beginners series.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/cropped-github-favicon-512-1.webp" alt=""><span class="kg-bookmark-author">The GitHub Blog</span><span class="kg-bookmark-publisher">Kedasha Kerr</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/418127171-3bd956ac-6856-4c72-8601-010f10058417-1.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://aws.amazon.com/what-is/prompt-engineering/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">What is Prompt Engineering? - AI Prompt Engineering Explained - AWS</div><div class="kg-bookmark-description">Learn why prompt engineering is essential. Discover its benefits and how you can use it to create new content and ideas including text, conversations, images, video, and audio.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/touch-icon-ipad-144-smile.webp" alt=""><span class="kg-bookmark-author">Amazon Web Services, Inc.</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/aws_logo_smile_1200x630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://aws.amazon.com/tw/blogs/machine-learning/prompt-engineering-techniques-and-best-practices-learn-by-doing-with-anthropics-claude-3-on-amazon-bedrock/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Prompt engineering techniques and best practices: Learn by doing with Anthropic’s Claude 3 on Amazon Bedrock | Amazon Web Services</div><div class="kg-bookmark-description">You have likely already had the opportunity to interact with generative artificial intelligence (AI) tools (such as virtual assistants and chatbot applications) and noticed that you don’t always get the answer you are looking for, and that achieving it may not be straightforward. Large language models (LLMs), the models behind the generative AI revolution, receive […]</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/touch-icon-ipad-144-smile-1.webp" alt=""><span class="kg-bookmark-author">Amazon Web Services</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/prompt-engineering-best-practices-1-1117x630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Prompt engineering overview - Anthropic</div><div class="kg-bookmark-description"></div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/apple-touch-icon-1.webp" alt=""><span class="kg-bookmark-author">Anthropic</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/image-1" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://workspace.google.com/learning/content/gemini-prompt-guide"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Gemini for Google Workspace Prompt Guide</div><div class="kg-bookmark-description">Gemini for Google Workspace: AI-driven productivity tool enhances decision-making, streamlines tasks, and empowers users.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/favicon-8.ico" alt=""><span class="kg-bookmark-author">Google Workspace</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/social-icon-google-cloud-1200-630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/LAF-lACf2QY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Prompt engineering essentials: Getting better results from LLMs | Tutorial"></iframe></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/-Hjw0_PMyfQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Learn Better Prompt Engineering in 7 Minutes"></iframe></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/T9aRN5JkmL8?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="AI prompt engineering: A deep dive"></iframe></figure>
