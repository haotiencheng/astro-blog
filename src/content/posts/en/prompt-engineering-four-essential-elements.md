---
title: "Prompt Engineering Secrets from Top Teams: Four Essential Elements to Master AI Prompting"
slug: prompt-engineering-four-essential-elements
lang: en
excerpt: "This post compiles prompt engineering tips from GitHub, AWS, Anthropic, and Google. Through practical examples, it breaks down the four core elements — Task, Context, Persona, and Format — to help you craft effective prompts that dramatically improve AI comprehension, response accuracy, and output quality."
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
<figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29----.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1027" srcset="/images/ghost/2025/06/Untitled-2025-05-29----.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29----.webp 2400w" sizes="(min-width: 720px) 720px"></figure><h2 id="%E6%8F%90%E7%A4%BA%E8%A9%9E%E7%AF%84%E4%BE%8B%E6%87%89%E7%94%A8">Prompt Example in Action</h2><pre><code>&lt;transcript&gt;
{transcript}
&lt;/transcript&gt;

&lt;example&gt;
## Summary
{multiple sentences summarizing the transcript}

## Key Points
{bulleted list of 3–5 key points summarizing the main takeaways and important moments from the video transcript, with explanations}

## Quotes
{a list of 5–7 sentences from the transcript that best represent the main theme or are most memorable}
&lt;/example&gt;


&lt;request&gt;
- Present the summary and key points in Traditional Chinese
- Keep the quotes in their original language
- Use Markdown heading format for the summary, key points, and quotes as shown in the example
&lt;/request&gt;

You are a professional analyst. Use the &lt;transcript&gt; to create a summary that satisfies the &lt;example&gt; and &lt;request&gt;.
Your goal is to help me quickly understand the recording and identify the key points.</code></pre><h2 id="task%EF%BC%88%E4%BB%BB%E5%8B%99%EF%BC%89">Task</h2><h3 id="%E6%B0%B8%E9%81%A0%E5%B0%87%E4%B8%BB%E8%A6%81%E6%8C%87%E4%BB%A4-%E5%95%8F%E9%A1%8C%E6%94%BE%E5%9C%A8-prompt-%E7%9A%84%E6%9C%80%E5%BE%8C">Always Place Your Main Instruction &amp; Question at the End of the Prompt</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14352.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14352.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14352.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>According to Anthropic's testing, placing the question at the end of a prompt leads to a <strong>30%</strong> improvement in output quality. This effect is even more pronounced in complex scenarios.</p><p>This strategy helps the model focus on the most important information and reduces the likelihood of hallucinations.</p><blockquote>Always remember to use a "verb" or a "command" — it is the most important element in a prompt.</blockquote><h3 id="%E6%8F%90%E4%BE%9B%E7%AF%84%E4%BE%8B%E7%B5%A6-ai-%E5%8F%83%E8%80%83">Provide Examples for the AI to Reference</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1435--.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1435--.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>For example, if you simply ask the AI <code>What is 10 + 10?</code>, the answer will be <code>10 + 10 is 20</code>. But if you include an example of the type of response you want in your prompt, the AI can provide an answer in the right direction.</p><pre><code class="language-bash">--------- Question ---------
&lt;example&gt;
1 + 1 is addition
1 - 1 is subtraction
1 * 1 is multiplication
1 / 1 is division
&lt;/example&gt;

What is 10 + 10?

--------- Answer ---------
AI: 10 + 10 is addition
</code></pre><p>For common tasks, just a few (1–4) examples are enough to achieve great results.</p><ul><li><strong>Few-shot: Requires very few</strong> task-specific examples (usually included in the prompt) to guide the model.</li><li><strong>Zero-shot: Requires no</strong> task-specific examples or labeled data at all.</li><li><strong>Multi-shot: Multiple examples (&gt; 5), suitable for more complex</strong> tasks or those requiring more pattern recognition.</li></ul><p>Few-shot prompting can solve most problems. If results are still unsatisfactory, try multi-shot. However, be mindful of hitting the context limit — too many examples may not yield significant marginal gains.</p><h3 id="%E4%B8%80%E6%AC%A1%E5%8F%AA%E8%A7%A3%E6%B1%BA%E3%80%8C%E4%B8%80%E3%80%8D%E5%80%8B%E5%95%8F%E9%A1%8C">Solve Only "One" Problem at a Time</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14354.webp" class="kg-image" alt="" loading="lazy" width="1860" height="959" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14354.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14354.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>When asking an LLM a complex question, rather than presenting everything at once, break the question down into smaller steps or sub-questions.</p><blockquote>A useful rule of thumb: if your prompt contains more than "one verb," it can be split into separate smaller tasks.</blockquote><p>Prompt: <code>Fix the bugs in this code and optimize it.</code></p><p>The problem with this prompt:</p><ul><li>Should it fix first or optimize first?</li><li>What aspect should be optimized? Speed, readability, or memory usage?</li></ul><p>Improved prompts:</p><ul><li>Task 1: <code>Fix the bugs in this code</code></li><li>Task 2: Copy the fixed code into a new window → <code>Optimize this code for performance</code></li></ul><h3 id="%E8%A6%81%E6%B1%82-ai-%E5%88%86%E6%AD%A5%E9%A9%9F%E6%80%9D%E8%80%83">Ask the AI to Think Step by Step</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14355.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14355.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14355.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>If you decide you don't want to spend time breaking down the content and prompts yourself, try the "ask the AI to think step by step" technique. The underlying technology is called <strong>Chain of Thought (CoT)</strong>. By decomposing a problem and reasoning through it incrementally, LLMs can significantly improve their problem-solving success rate and answer accuracy.</p><p>Prompt structure:</p><pre><code class="language-bash">[Your question]

- Please think step by step
- Present your reasoning as a bulleted list
</code></pre><p>Example:</p><pre><code class="language-bash">--------- Question ---------
&lt;context&gt;
Victim: Mr. Li, found dead in his home study. Time of death approximately 10 PM.
Scene: The study door was locked from the inside, and the window was slightly open. There were no signs of a struggle, but a distinctive small bronze figurine used as a paperweight was missing from the desk.
Suspects:
1. Mrs. Li: Claims she was watching TV in the living room from 9 PM onward.
2. Mr. Zhang, the accountant: Mr. Li's business partner, claims he was working overtime at a downtown office from 8 PM to 11 PM. The office building has a card-swipe record, but it only shows the entry time.
3. Mr. Wang, the gardener: Was tending Mr. Li's garden that afternoon until leaving at 7 PM. Lives nearby. Police found a muddy footprint below the study window that matches the boots Mr. Wang typically wears.
&lt;/context&gt;

&lt;request&gt;
- Please think step by step
- Present your reasoning as a bulleted list
&lt;/request&gt;

Who is the culprit?

--------- Answer ---------
Sure, let's analyze this case step by step:

1.  Analyze the victim, scene, and time of death:
    *   Mr. Li died in his study at approximately 10 PM.
    *   The study door was locked from the inside, and the window was slightly open.
    *   No signs of a struggle, but the bronze figurine paperweight is missing.

2.  Analyze the significance of the scene clues:
    *   Door locked from the inside: This typically means the victim locked it himself, or the perpetrator locked it from the inside before leaving through another exit (such as the window), or the perpetrator was already inside and locked the door after committing the act — but the slightly open window must be considered alongside this.
    *   Slightly open window: This could be a potential entry/exit point, especially since the door was locked from the inside, preventing exit through it.
    *   No signs of a struggle: This may mean the victim knew the perpetrator, was subdued quickly, or died by non-physical means such as poisoning.
    *   Missing figurine: It may have been used as a weapon (if heavy enough) or taken by the perpetrator.

3.  Analyze suspects and their alibis:
    *   Mrs. Li: Claims she was watching TV in the living room from 9 to 11 PM. This is an indoor activity and difficult to fully verify; she also had free access to the study.
    *   Mr. Zhang: Claims he was working overtime at the office from 8 to 11 PM. The building's card-swipe record only shows entry time, so it cannot confirm he stayed the entire time. In theory, he could have left the office, gone to Mr. Li's home, committed the act, and returned — but there is no direct evidence placing him there.
    *   Mr. Wang: Was at Mr. Li's home until 7 PM that afternoon. Police found a muddy footprint below the study window that matches his boots.

4.  Integrate clues and suspects:
    *   Mr. Wang's muddy footprint directly links him to the area below the study window. The slightly open window supports this connection.
    *   If Mr. Wang is the culprit, he may have returned after leaving and entered the study through the window.
    *   After entering, he committed the crime (possibly using the missing figurine), then exited through the window.
    *   As for the door being locked from the inside, several possibilities exist:
        *   Mr. Li had already locked the door before Mr. Wang entered, and Mr. Wang came in through the window.
        *   Mr. Wang locked the door from the inside after the act and then exited through the window (depending on the lock mechanism, this is theoretically possible — for example, using a tool inserted through the door gap).
        *   The scene was slightly staged by the perpetrator to mislead investigators.

5.  Evaluate the likelihood of each suspect:
    *   Both Mrs. Li and Mr. Zhang have weak alibis and potential motives (domestic disputes or business issues). However, there is no direct physical evidence linking either of them to the scene.
    *   Mr. Wang's alibi expires after 7 PM, and there is strong physical evidence — the muddy footprint — directly linking him to the area below the study window, consistent with the window being slightly open.

6.  Conclusion:
    Taking all clues together, Mr. Wang's muddy footprint is the strongest physical evidence currently available, directly indicating he was near the study window sometime between leaving at 7 PM and the crime occurring at 10 PM. While the door-locked-from-inside detail is somewhat contradictory, combined with the open window and the footprint, Mr. Wang entering and exiting through the window and committing the crime is the most probable scenario.

Therefore, based on the available clues, the most likely culprit is Mr. Wang, the gardener.
</code></pre><h2 id="format%EF%BC%88%E6%A0%BC%E5%BC%8F%EF%BC%89">Format</h2><h3 id="%E6%B8%85%E6%A5%9A%E5%AE%9A%E7%BE%A9%E8%BC%B8%E5%87%BA%E6%A0%BC%E5%BC%8F">Clearly Define the Output Format</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14357.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14357.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14357.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>If you want the model to respond in a specific format, such as:</p><ul><li>A single word</li><li>A bulleted list</li><li>Code with comments</li><li>Limited to 250 words</li><li>Wrapped in a Markdown code block</li></ul><p>Pre-specifying the format in your prompt will make the output more precise and effective.</p><h3 id="%E8%A6%81%E6%B1%82%E6%A8%A1%E5%9E%8B%E5%BC%95%E7%94%A8%E5%8E%9F%E6%96%87%E6%88%96%E4%BE%86%E6%BA%90">Ask the Model to Quote the Source Text or Original Content</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14358.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14358.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14358.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>Ask the LLM to first quote the relevant parts of a document before completing the task. This helps filter out the "noise" from the rest of the document and makes it easy to verify accuracy.</p><p>This works well in the following scenarios:</p><ul><li>Summarizing text or transcripts (YouTube, Podcasts)<ul><li>Clearly see the logic behind the summary</li><li>Understand the tone of the original</li></ul></li><li>Processing multiple documents or long articles<ul><li>Identify the source location or document</li></ul></li></ul><p>How to apply it in practice: add <code>Extract the best sentences from the text and list them</code></p><pre><code class="language-bash">--------- Question ---------
&lt;context&gt;
"May in Okinawa: The Best Month for Last-Minute Trips" — by Mamo, Always Traveling

The "May" here refers specifically to the period after Golden Week.

▌ Why is Okinawa in May the best time for late birds and spontaneous trips?

•  Accommodation prices are at their annual low, with virtually no price increases
•  Flight prices are low, and last-minute fare hikes are negligible
•  Japan has no major national holidays in this period, making May an off-peak season for Taiwanese travelers
•  As a result, restaurant, accommodation, and car rental bookings are easier, and clearance flight deals are more common

Use the Japanese weather site Tenki to plan your trip immediately.

1. Open Tenki and check the "2-week forecast"
2. Open Skyscanner and search for the lowest fares within two weeks
3. Okinawa accommodation prices are nearly frozen at this time, so no need to worry about overpaying
4. Book and go

▌ The Frozen-Price Shoulder Season of Okinawa in May

The Okinawa market in May has a unique characteristic: prices are nearly frozen.
Accommodation and flights see almost no price increases — and if there are any, they're small enough to ignore.
Every year from May to June, Okinawa operates under these market conditions, reflecting the hospitality industry's (especially resorts') adjusted expectations for the season.

Okinawa sees two annual accommodation price lows: after Golden Week in May, and in early December.
The period from after Golden Week in May to early summer is a rare shoulder season.
Normally, budget-conscious travelers choose December, but resort value is actually lower then.
Beaches are closed, facilities are under maintenance, and restaurants frequently change their menus.
May is the better choice.
The main variable in May is the rainy season — whether or not it rains has a huge impact on the Okinawa experience.

So "dodging the rainy season while taking advantage of frozen market prices" is the best strategy for a last-minute Okinawa trip in May.
Tenki's short-term accuracy is high, so focus on dates from the next day to within 2 weeks.
Confirm good weather dates -> find flights -> find accommodation
You can stay 4 nights at a resort for 4,000 (per person), combined with a budget airline round trip for 5,000–6,000.
15,000 per person covers flights + 4 nights at a resort.
Stay 4 consecutive nights.
Even if you book now and leave next week, you can still find great prices.

▌ Summary

Check weather first -> check flights -> find accommodation. This is the best approach for Okinawa in May.
Even if you miss it this year, the same strategy works perfectly the following year.
For office workers who need to arrange time off, it also becomes much easier.
&lt;/context&gt;

Based on the above transcript

1. Summarize the key points for me
2. Extract the best sentences from the text and list them

--------- Answer ---------
Sure. Based on the transcript you provided, here are the key points and selected sentences:

Key Points Summary

The transcript explains that every May (especially after Golden Week) is the best time to plan a last-minute Okinawa trip, primarily because:

*   Flight and accommodation prices are at their annual low and nearly "frozen" — even last-minute bookings see minimal price hikes.
*   May is an off-peak travel season for both Japan and Taiwan, making restaurant, accommodation, and car rental bookings easier, with more clearance flight deals available.
*   Compared to December, the other low-price period, May offers a better resort experience (open facilities, accessible beaches).
*   The best way to plan a May Okinawa trip is to use the Japanese weather site Tenki to confirm weather within two weeks (especially to avoid the rainy season), then search for flights and accommodation — good prices are still available even on short notice.

Selected Sentences

Here are several key sentences extracted from the text:

*   The "May" here refers specifically to the period after Golden Week.
*   Accommodation prices are at their annual low, with virtually no price increases.
*   Flight prices are low, and last-minute fare hikes are negligible.
*   The Okinawa market in May has a unique characteristic: prices are nearly frozen.
*   May is the better choice.
*   The main variable in May is the rainy season — whether or not it rains has a huge impact on the Okinawa experience.
*   So "dodging the rainy season while taking advantage of frozen market prices" is the best strategy for a last-minute Okinawa trip in May.
*   Use the Japanese weather site Tenki to plan your trip immediately.
*   Check weather first -> check flights -> find accommodation. This is the best approach for Okinawa in May.
*   Even if you miss it this year, the same strategy works perfectly the following year.
</code></pre><h3 id="request-%E4%BD%BF%E7%94%A8-xml-%E6%A8%99%E7%B1%A4%E7%B5%90%E6%A7%8B%E5%8C%96%E5%85%A7%E5%AE%B9-request">&lt;request&gt; Use XML Tags to Structure Content &lt;/request&gt;</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14359.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14359.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14359.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>XML tags act as classifiers that AI can understand. By using tags to categorize a prompt, you help the AI better grasp the structure of the content and produce more accurate responses.</p><p>For example:</p><pre><code class="language-bash">&lt;document&gt;
Background documents of any kind go here
&lt;/document&gt;

&lt;example&gt;
Example
&lt;/example&gt;

&lt;request&gt;
Requirements for the response
&lt;/request&gt;
</code></pre><p>You can also reference the tags as variables in your prompt, such as:</p><p><code>Using the data in &lt;document&gt;, the examples in &lt;example&gt;, provide an answer for &lt;request&gt;</code></p><blockquote>Pro tip: Combining XML tags with multi-shot examples and CoT gives you a highly structured, high-performance prompt.</blockquote><h3 id="%E9%A0%90%E5%A1%AB%E5%9B%9E%E6%87%89-prefill-response">Prefill Response</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-143.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-143.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-143.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>AI responses can sometimes be overly verbose or include unnecessary sentences at the beginning, even when a response format has been clearly specified.</p><p>If you are an engineer and want the AI to respond in a specific format, prefilling the response is a great solution.</p><p>Using&nbsp;<code>{</code>&nbsp;as a prefill lets the AI skip preamble text and return structured data directly.</p><p>Example:</p><pre><code class="language-bash">--------- User ---------
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
	Here's the extracted information in JSON format:

```json
{
"name": "SmartHome Mini",
"size": "5 inches wide",
"price": "$49.99",
"colors": ["black", "white"]
}
```

I've extracted the following details from the product description:
- Name: SmartHome Mini
- Size: 5 inches wide
- Price: $49.99
- Colors: Available in black and white

The JSON object provides a structured format that's easy for programs to parse and use. Let me know if you need any modifications or have any other questions!
</code></pre><p>The AI's response will begin from where the&nbsp;<code>Assistant</code>&nbsp;message ends. Here is the specific implementation:</p><pre><code class="language-javascript">import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-opus-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Give me a random json object."},
        {"role": "assistant", "content": "{"}  # Prefill here
    ]
)
</code></pre><h2 id="persona%EF%BC%88%E4%BA%BA%E8%A8%AD%EF%BC%89">Persona</h2><h3 id="%E7%B5%A6%E4%BA%88-ai-%E8%A7%92%E8%89%B2-rolename">Assign the AI a Role [ROLE_NAME]</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1432.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1432.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1432.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>Assigning the AI a role <code>[ROLE_NAME]</code> can greatly influence the content, style, and behavior of its output. It is like putting a specific uniform on the AI, causing it to think and respond in a particular way.</p><p>Different roles produce vastly different outputs. For example:</p><pre><code class="language-javascript">--------- User ---------
You are a [Teacher]. What is gravity?
--------- Answer ---------
Hello, student! Gravity is a natural phenomenon that describes the force of mutual attraction between objects that have mass. Simply put, it is the force that pulls everything on the surface of the Earth (including you and me) downward. Do you know who first proposed an important theory about gravity? The magnitude of this force is related to the mass of the objects — the greater the mass, the stronger the gravity. If you have any other questions about gravity or want to learn more, feel free to ask!

--------- User ---------
You are a [Storyteller]. What is gravity?
--------- Answer ---------
Ah, gravity! This is an ancient and mysterious force — like an invisible giant, gently pulling us toward the solid earth. Imagine raindrops falling from the sky, guided by it back to the ground; a ripe apple dropping from a tree, answering its gentle call. Gravity weaves the dance of the universe, keeping planets orbiting stars and galaxies clustering together, composing a silent and magnificent cosmic song. This force is both the ground beneath our feet and the thread connecting us to the most distant stars.

--------- User ---------
You are a [Programmer]. What is gravity?
--------- Answer ---------
In physics simulations or game development, gravity is typically treated as a velocity vector that affects the position and motion of objects. Under the framework of Newtonian mechanics, a common simplified model assumes the existence of a constant downward acceleration vector with a magnitude of approximately 9.8 m/s² (or 9.81 in some systems). In code, this can be represented as ⁠Vector3(0, -9.8, 0) (assuming the Y-axis points upward). For more precise simulations, such as gravitational interactions in space, Newton's law of universal gravitation is used, where the gravitational force between two objects is proportional to the product of their masses and inversely proportional to the square of the distance between them (
\[
F = G \frac{m_1 m_2}{r^2}
\]
), directed along the line connecting the two objects.
</code></pre><blockquote>Role-play tip: Combining prefill with <code>[ROLE_NAME]</code> reminds the AI to stay in character, which is especially useful in longer, more complex conversations. Pairing this with the <code>system</code> parameter makes it even more powerful.</blockquote><pre><code class="language-javascript">--------- User ---------
&lt;image&gt;cutting_hand.jpg&lt;/image&gt;
How can you determine a person's profession from this image?

--------- Answer w/o prefill ---------
Looking at this image, there appear to be some dark lines or marks on the fingertips, which look like they were left by ink or a similar substance.

Based on these marks on the fingers, one can infer that this person's profession may be related to activities that involve frequent contact with ink or substances that stain the hands, such as:

*   **Writer/Editor/Student:** Frequently uses a fountain pen or ballpoint pen for writing.
*   **Artist/Designer:** Uses ink or paint for drawing, sketching, or design work.
*   **Print worker/Publishing industry:** Handles ink, paper, and other printing materials.
*   **Antiquarian book restorer or librarian:** Handles old books or documents that may shed ink.
*   **Journalist:** Early journalists may have frequently used fountain pens or handled newspaper manuscripts.

In summary, this image primarily hints at possible professions through the "ink stains on the fingers." But this is only speculation and is not definitive.

--------- Answer with prefill [Detective Conan] ---------
Oh ho, this is a great clue! Just like the cases I often encounter, small details on the body often hide the key secrets.

Look at this image — do you notice the crack on the fingertip? This is no ordinary wound. This kind of fingertip cracking caused by dryness, friction, or repetitive fine movements tends to appear specifically in people in certain professions.

For example:

*   **Musicians (especially string instrument players):** The strings of instruments like guitar or violin rub against the fingertips for long periods, especially with heavy practice, which easily causes the skin on the fingertips to harden and even crack.
*   **People engaged in handicrafts:** Work that requires long-term use of tools or handling of delicate materials (such as paper, fabric, wood) can also produce similar marks on the fingertips from friction or pressure.
*   **People who frequently contact certain chemicals or work in dry environments:** Some occupational environments cause the skin to become unusually dry, making fingertip cracking more likely.

So, from this image alone, the most likely occupational clue points to **work that requires long-term fine use of the fingertips or sustained friction** — with a **string instrument musician** being a very typical possibility.

This small crack is the "silent testimony" left by the culprit or person of interest! Next, we need to find more clues to confirm this inference! There is always only one truth!
</code></pre><h3 id="%E5%85%81%E8%A8%B1-ai-%E6%A8%A1%E5%9E%8B%E8%AA%AA%E3%80%8C%E6%88%91%E4%B8%8D%E7%9F%A5%E9%81%93%E3%80%8D">Allow the AI Model to Say "I Don't Know"</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-1.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-1.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-1.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>This is a technique that can significantly reduce the likelihood of AI hallucinations. It gives the AI room to express whether it needs more information to provide a more accurate answer.</p><p>The practical way to apply it is to add:</p><ul><li><code>"If you are unsure or don't have enough information to provide a confident answer, simply say 'I don't know' or 'I'm not sure.'"</code></li></ul><h2 id="context%EF%BC%88%E6%83%85%E5%A2%83%EF%BC%89">Context</h2><h3 id="%E8%83%8C%E6%99%AF%E8%B3%87%E6%96%99%E6%B0%B8%E9%81%A0%E6%94%BE%E5%9C%A8-prompt-%E7%9A%84%E9%A0%82%E7%AB%AF">Always Place Background Information at the Top of the Prompt</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-142.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-142.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-142.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>Combined with the technique of placing instructions at the end, this forms the best prompt structure.</p><blockquote>You can further use XML tags to categorize information, helping the AI better understand the purpose of each piece of data.</blockquote><h3 id="%E7%9B%A1%E5%8F%AF%E8%83%BD%E6%8F%90%E4%BE%9B%E8%83%8C%E6%99%AF%E8%B3%87%E6%96%99%EF%BC%88%E6%96%87%E4%BB%B6%E3%80%81%E5%9C%96%E7%89%87%E7%AD%89%EF%BC%89">Provide as Much Background Information as Possible (Documents, Images, etc.)</h3><figure class="kg-card kg-image-card"><img src="/images/ghost/2025/06/Untitled-2025-05-29-14.webp" class="kg-image" alt="" loading="lazy" width="1860" height="960" srcset="/images/ghost/2025/06/Untitled-2025-05-29-14.webp 600w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1000w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1600w, /images/ghost/2025/06/Untitled-2025-05-29-14.webp 1860w" sizes="(min-width: 720px) 720px"></figure><p>The more complete the background information, the more accurate the AI's response can be. However, keep the following in mind:</p><ol><li>Is there any irrelevant information?</li><li>Is the information too verbose or imprecise?</li><li>Can the information be split into different sub-questions to improve accuracy?</li></ol><p>More is not always better. The goal is to find a sweet spot between quantity and quality, enabling the AI to generate more precise responses.</p><h2 id="faq">FAQ</h2><p><strong>Q: What should I do when I hit the context window limit?</strong> </p><p>A: Try the following:</p><ul><li>Only include essential content.</li><li>Split it into separate parts.</li></ul><p><strong>Q: The AI's answer is too long to read through, or too short and lacking information. Can I control this?</strong> </p><p>A: Yes. You can explicitly instruct the AI about the desired response length in your prompt. For example:</p><ul><li><strong>Limit word count or number of paragraphs</strong>: "Please answer in about 100 words," "Please summarize in three paragraphs."</li><li><strong>Request brevity or detail</strong>: "Please give a brief explanation," "Please explain this concept in detail."</li><li><strong>Request bullet points or a summary</strong>: "Please present the main points as bullet points," "Please provide an executive summary." Clear length instructions help the AI generate content that matches your reading needs.</li></ul><p><strong>Q: Sometimes the AI makes up answers and includes content that seems to come from its own imagination. What can I do?</strong> </p><p>A: This phenomenon is called "hallucination." Ways to address it include:</p><ul><li><strong>Request citations</strong>: Ask the AI to provide sources for its information so you can verify them.</li><li><strong>Cross-validate</strong>: Compare the AI's answer against other reliable sources.</li><li><strong>Simplify the question</strong>: If the question is too complex, the AI is more likely to make errors. Try breaking it into smaller parts.</li><li><strong>Provide clear background information</strong>: Make sure the AI has enough context to understand your question.</li><li><strong>Adjust the "temperature"</strong>: If you can set this parameter, a lower temperature generally makes the AI's responses more conservative and fact-based, reducing creativity (but also potentially reducing variety).</li><li><strong>Point out errors and ask for corrections</strong>: If you notice the AI fabricating content, point it out and ask it to regenerate a fact-based answer.</li></ul><p><strong>Q: The AI's answers often aren't what I want, or it seems like it doesn't understand me. What can I do?</strong> </p><p>A: This can usually be resolved by improving your prompt:</p><ul><li><strong>Use clear, specific language</strong>: Avoid vague or ambiguous wording.</li><li><strong>Provide sufficient context</strong>: Let the AI understand the full background of the question.</li><li><strong>Clearly specify the expected format or type of answer</strong>: For example, do you want an explanation, a list, a code snippet, or a story?</li><li><strong>Use examples (few-shot prompting)</strong>: Provide one or two examples of the expected Q&amp;A to guide the AI toward your needs.</li><li><strong>Guide it incrementally</strong>: For complex questions, start with a guiding question and then go deeper step by step.</li><li><strong>Try different wording</strong>: The same question phrased differently may be easier for the AI to understand.</li></ul><p><strong>Q: What if I don't understand what the AI is expressing?</strong> </p><p>A: When an LLM gives an answer and you don't understand how it arrived at it, you can ask it to "please explain your reasoning in detail" or "please walk through it step by step." This helps you understand the answer and also encourages the model to reduce errors in its reasoning process.</p><p><strong>Q: Does assigning the AI a persona always work? Are there situations where it works better or worse?</strong> </p><p>A: Assigning a role generally helps the AI's responses better match the style and tone of a specific domain and promotes behavioral consistency. It is most effective when specific expertise is needed (such as playing a doctor or lawyer) or a specific style is desired (such as playing Sherlock Holmes or a poet). However, if the task itself is very direct and objective (such as pure data extraction), the impact of a persona may be minimal. You can try prefilling with <code>[ROLE_NAME]</code> to reinforce the role.</p><p><strong>Q: Is more context always better? Can too much context confuse the AI?</strong> </p><p>A: Providing relevant and appropriate context is very important, but more is not always better.</p><ul><li><strong>Relevance is key</strong>: Only include information directly relevant to the current question. Irrelevant information can distract the AI, causing answers to drift off-topic or become confused.</li><li><strong>Avoid excessive length</strong>: AI has a limit on the context length it can process (the context window). If the background information is too long and exceeds this limit, the AI may ignore earlier information or fail to effectively use all the content.</li><li><strong>Present it in a structured way</strong>: If you have a lot of background information, consider organizing it with bullet points, summaries, or clear separators to help the AI understand it better.</li><li><strong>Highlight what matters</strong>: If certain background information is especially important, try emphasizing it in the prompt. The goal is to provide enough information for the AI to accurately understand your intent, while avoiding unnecessary redundancy and confusion.</li></ul><p><strong>Q: Besides bullet points, word limits, and XML mentioned in the article, are there other output formats I can specify?</strong></p><p>A: Absolutely! You can specify many different output formats, such as:</p><ul><li><strong>Table</strong>: Ask the AI to output in Markdown table format.</li><li><strong>JSON or YAML</strong>: A great choice when you need structured data, especially when you need to process the output programmatically.</li><li><strong>Text in a specific style</strong>: For example, "Please explain it in a tutorial tone," "Please present it as a story."</li><li><strong>Code snippets</strong>: Specify the language and desired functionality.</li><li><strong>Summary or Key Takeaways</strong>. Be creative — the AI can usually adapt to your format requirements quite well.</li></ul><p><strong>Q: In what situations is "asking the AI to think step by step" (e.g., CoT) especially effective?</strong></p><p>A: This type of instruction is particularly effective when dealing with problems that require multi-step reasoning, logical analysis, or computation. For example:</p><ul><li>Math word problems.</li><li>Complex logical judgments.</li><li>Tasks that require analyzing multiple conditions to reach a conclusion.</li><li>When the AI's direct answer to a question is unsatisfactory, asking it to "think step by step" can guide it to break down the problem and show its reasoning process, which helps identify where things went wrong or arrive at a more correct answer.</li></ul><p><strong>Q: Can I ask the AI to avoid certain topics or use certain words?</strong> </p><p>A: Yes. You can explicitly specify restrictions for the AI in your prompt. For example:</p><ul><li>"In your response, please do not mention [topic]."</li><li>"Please avoid using [word or type of word]."</li><li>"Ensure your response is objective and neutral, containing no personal opinions or biases." This helps control the boundaries of the output, making it more suited to your specific needs or content policy.</li></ul><h2 id="%E5%8F%83%E8%80%83%E8%B3%87%E6%96%99%E5%8F%8A%E4%BE%86%E6%BA%90">References and Sources</h2><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://github.blog/ai-and-ml/github-copilot/github-for-beginners-how-to-get-llms-to-do-what-you-want/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">GitHub for Beginners: How to get LLMs to do what you want</div><div class="kg-bookmark-description">Learn how to write effective prompts and troubleshoot results in this installment of our GitHub for Beginners series.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/cropped-github-favicon-512-1.webp" alt=""><span class="kg-bookmark-author">The GitHub Blog</span><span class="kg-bookmark-publisher">Kedasha Kerr</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/418127171-3bd956ac-6856-4c72-8601-010f10058417-1.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://aws.amazon.com/what-is/prompt-engineering/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">What is Prompt Engineering? - AI Prompt Engineering Explained - AWS</div><div class="kg-bookmark-description">Learn why prompt engineering is essential. Discover its benefits and how you can use it to create new content and ideas including text, conversations, images, video, and audio.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/touch-icon-ipad-144-smile.webp" alt=""><span class="kg-bookmark-author">Amazon Web Services, Inc.</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/aws_logo_smile_1200x630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://aws.amazon.com/tw/blogs/machine-learning/prompt-engineering-techniques-and-best-practices-learn-by-doing-with-anthropics-claude-3-on-amazon-bedrock/"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Prompt engineering techniques and best practices: Learn by doing with Anthropic's Claude 3 on Amazon Bedrock | Amazon Web Services</div><div class="kg-bookmark-description">You have likely already had the opportunity to interact with generative artificial intelligence (AI) tools (such as virtual assistants and chatbot applications) and noticed that you don't always get the answer you are looking for, and that achieving it may not be straightforward. Large language models (LLMs), the models behind the generative AI revolution, receive […]</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/touch-icon-ipad-144-smile-1.webp" alt=""><span class="kg-bookmark-author">Amazon Web Services</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/prompt-engineering-best-practices-1-1117x630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Prompt engineering overview - Anthropic</div><div class="kg-bookmark-description"></div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/apple-touch-icon-1.webp" alt=""><span class="kg-bookmark-author">Anthropic</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/image-1" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://workspace.google.com/learning/content/gemini-prompt-guide"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Gemini for Google Workspace Prompt Guide</div><div class="kg-bookmark-description">Gemini for Google Workspace: AI-driven productivity tool enhances decision-making, streamlines tasks, and empowers users.</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="/images/ghost/icon/favicon-8.ico" alt=""><span class="kg-bookmark-author">Google Workspace</span></div></div><div class="kg-bookmark-thumbnail"><img src="/images/ghost/thumbnail/social-icon-google-cloud-1200-630.webp" alt="" onerror="this.style.display = 'none'"></div></a></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/LAF-lACf2QY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Prompt engineering essentials: Getting better results from LLMs | Tutorial"></iframe></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/-Hjw0_PMyfQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Learn Better Prompt Engineering in 7 Minutes"></iframe></figure><figure class="kg-card kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/T9aRN5JkmL8?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="AI prompt engineering: A deep dive"></iframe></figure>
