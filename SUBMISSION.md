---
title: "PassionCast: I Built an AI Hype Man for World Cup Fans Using Gemini + ElevenLabs"
published: false
tags: devchallenge, weekendchallenge
---

*This is a submission for [Weekend Challenge: Passion Edition](https://dev.to/challenges/weekend-2026-07-09)*

## What I Built

The World Cup quarter-finals are on right now. I'm watching matches, yelling at my screen, and I thought: what if I could bottle that feeling into an audio clip?

**PassionCast** lets you pick your team, choose a passion mode (hype speech, glory moment, rivalry fire, heartbreak, fan anthem, or custom), and generates a 60-second AI commentary clip. Not the generic "your team is amazing" stuff. Actual references to your team's players, history, and rivals.

Pick India, select "Rivalry Fire," hit generate. You get a breathless commentator talking about the India-Pakistan cricket-meets-football tension, with real names and real context. Try Argentina and you get Maradona, La Albiceleste, the Diego legacy. That's what I was going for.

## Demo

{% embed https://youtu.be/A_qoRuVKNPk?si=0SV_vfNw1CFk8xRN %}

👉 **[Try PassionCast Live](https://simplynadaf.github.io/PassionCast/)**

Three pre-generated sample clips are on the page. Hit play, no keys needed. You'll hear:
- Argentina rivalry fire (Match Commentator voice)
- India pre-match hype (Epic Narrator voice)  
- England heartbreak (Epic Narrator voice)

To generate your own, you'll need free API keys (30 seconds each):
- [Google AI Studio key](https://aistudio.google.com/apikey)
- [ElevenLabs key](https://elevenlabs.io/app/settings/api-keys)

**The flow:**

![Landing with sample clips you can play immediately](https://raw.githubusercontent.com/simplynadaf/PassionCast/main/screenshots/01-landing.png)

![48 teams to choose from](https://raw.githubusercontent.com/simplynadaf/PassionCast/main/screenshots/02-team-grid.png)

![Six passion modes](https://raw.githubusercontent.com/simplynadaf/PassionCast/main/screenshots/03-passion-modes.png)

![Ready to generate](https://raw.githubusercontent.com/simplynadaf/PassionCast/main/screenshots/04-ready-to-generate.png)

## Code

{% github simplynadaf/PassionCast %}

## How I Built It

No backend. No framework. One page, vanilla JS, two API calls. Vite for bundling, GitHub Pages for hosting.

```
Browser → Gemini 2.0 Flash (writes script) → ElevenLabs (speaks it) → Audio playback
```

I specifically didn't want a backend here. The whole point is that someone can fork this, drop in their own keys, and have it running in 30 seconds.

### The Gemini Part (where I spent most of my time)

Getting Gemini to write *passionate* content was harder than I expected. At temperature 0.7, everything came out bland. "Your team has a proud history. The fans are excited." Useless.

At **0.9**, things got interesting. Combined with a detailed system prompt that includes the team name, their rivals, their football culture, and the specific style I want (narrator vs commentator vs poet), the output started feeling real.

The trick was constraining length. I needed 150-200 words, the sweet spot for 45-60 seconds of audio. Too short and it feels empty. Too long and ElevenLabs starts rushing or the clip drags.

```javascript
// Note: ${apiKey} is a template literal variable, not a real key. 
// Users provide their own free key from aistudio.google.com/apikey
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 500 }
    })
  }
);
```

### The ElevenLabs Part (where the magic happens)

I tested default voice settings first. Sounded flat. Like a GPS reading football commentary.

The fix: crank down **stability to 0.4** (default is higher). This adds emotional variation. The voice wavers, speeds up, gets louder on key phrases. Exactly what you want for sports commentary.

Then **style to 0.6** for extra expressiveness, and **speaker boost on** for clarity.

Three voices, matched to content:
- **Brian** (dramatic narrator) for glory moments
- **Liam** (energetic) for rivalry and hype
- **George** (poetic storyteller) for heartbreak and anthems

```javascript
body: JSON.stringify({
  text: script,
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.4,
    similarity_boost: 0.8,
    style: 0.6,
    use_speaker_boost: true,
  }
})
```

### Other Decisions

I used flag images from flagcdn.com instead of emoji because emoji flags don't render on Windows for England, Wales, and Scotland (they show as black rectangles). Learned that the hard way after building the whole grid with emoji first.

Dark theme with gold/fire accents because... it's a passion app. Light mode would feel wrong.

### What I'd Add

If I had another weekend: social sharing (let people post their clips), match-day mode that checks today's fixtures and auto-suggests hype content, and a gallery so you can hear what other fans generated. PRs welcome if you want to tackle any of these.

---

## Prize Categories

- **Best Use of Google AI**: Gemini 2.0 Flash with temperature 0.9 and detailed cultural prompting. Produces scripts with real player names, real rivalry history, and team-specific fan culture for 48 nations. Three distinct writing styles (narrator, commentator, poet) via style instructions in the prompt.

- **Best Use of ElevenLabs**: Multilingual v2 model with deliberately tuned settings. Stability at 0.4 for emotional range (default sounds robotic for sports content). Style at 0.6 for expressiveness. Three voices paired to content types. The output sounds like broadcast commentary, not text-to-speech.

---

⭐ [Star the repo](https://github.com/simplynadaf/PassionCast) if you want to try it, and drop a comment with your team — I'll generate a clip for you.
