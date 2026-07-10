---
title: PassionCast — I Built an AI Hype Man for World Cup Fans Using Gemini + ElevenLabs
published: false
tags: devchallenge, weekendchallenge
---

*This is a submission for [Weekend Challenge: Passion Edition](https://dev.to/challenges/weekend-2026-07-09)*

## What I Built

**PassionCast** turns World Cup passion into personalized, AI-generated audio commentary.

Pick your team. Choose a passion mode — pre-match hype, glory moment, rivalry fire, beautiful heartbreak, or fan anthem. Select a voice style. Hit generate. In seconds, you get a passionate, emotionally-charged audio clip that sounds like a professional commentator losing their mind over YOUR team.

The World Cup quarter-finals are happening right now. Passion is everywhere. I wanted to build something that captures that raw, irrational, beautiful fire that football fans feel — and turn it into something you can actually listen to and share.

**The idea:** What if every fan had their own personal hype man? Someone who knows your team's history, your legends, your rivals — and can turn that into a 60-second piece of audio art on demand?

## Demo

<!-- REPLACE THIS with your deployed Vercel/Netlify/Cloudflare Pages link -->
👉 **[Try PassionCast Live](YOUR_DEPLOYED_URL)**

**How it works in 15 seconds:**

1. Choose Argentina 🇦🇷
2. Select "Rivalry Fire" ⚔️
3. Pick "Match Commentator" voice 📢
4. Hit Generate 🔥
5. Get a passionate audio clip about the Argentina-Brazil rivalry, narrated like a live World Cup match

<!-- REPLACE with a screen recording or GIF -->
![PassionCast Demo](YOUR_DEMO_GIF_OR_VIDEO_URL)

## Code

{% github YOUR_USERNAME/passioncast %}

## How I Built It

### Architecture (Deliberately Simple)

```
Browser → Gemini API (script generation) → ElevenLabs API (voice synthesis) → Audio playback
```

No backend. No database. No framework. Just vanilla JS, two API calls, and a single `index.html`. I wanted the entire thing to be deployable to any static host in seconds.

### Google AI (Gemini 2.0 Flash)

Gemini generates the passionate scripts. The prompt engineering was the fun part — I needed the AI to:

- Know real players, real rivalries, real football culture for 48 nations
- Write in distinctly different styles (cinematic narrator vs. breathless commentator vs. poetic storyteller)
- Keep scripts to ~150-200 words (the sweet spot for 45-60 second audio)
- Actually sound passionate, not generic

The key insight: high temperature (0.9) + specific cultural context in the prompt = scripts that feel genuinely personal to each team's fanbase.

```javascript
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

### ElevenLabs

ElevenLabs brings the script to life. I use the Multilingual v2 model with tuned voice settings:

- **Low stability (0.4)** — more emotional variation, feels less robotic
- **High similarity boost (0.8)** — stays close to the chosen voice character
- **Style cranked up (0.6)** — more expressive delivery

Different passion modes pair with different voices. The "Epic Narrator" voice with a glory moment script sounds genuinely cinematic. The "Match Commentator" with rivalry fire mode sounds like actual World Cup coverage.

```javascript
const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
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
  }
);
```

### Design Choices

- **Dark theme with fire/gold accents** — matches the intensity of the subject
- **Step-by-step flow** — each choice builds anticipation toward the generate button
- **Client-side API keys** — stored in localStorage, never sent anywhere except official APIs
- **No signup, no backend** — zero friction between "I want to try this" and hearing your result

### What I'd Add With More Time

- Share clips directly to social media
- Multiple language support (Gemini can write in Spanish, Portuguese, French...)
- "Match day mode" that auto-generates hype for today's actual fixtures
- A gallery of community-generated PassionCasts

## Prize Categories

- **Best Use of Google AI** — Gemini 2.0 Flash generates culturally-aware, team-specific passionate commentary scripts with distinct style variations
- **Best Use of ElevenLabs** — Multilingual v2 model with fine-tuned voice settings (low stability for emotion, high style for expressiveness) converts scripts into dramatic audio

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Thanks for participating! -->
