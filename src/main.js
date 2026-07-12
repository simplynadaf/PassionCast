import { TEAMS, MODE_PROMPTS, VOICE_STYLES, ELEVEN_VOICES } from './data.js';

// State
let state = {
  selectedTeam: null,
  selectedMode: null,
  selectedVoice: null,
  customPrompt: '',
  geminiKey: localStorage.getItem('passioncast_gemini_key') || '',
  elevenLabsKey: localStorage.getItem('passioncast_elevenlabs_key') || '',
};

// DOM Elements
const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');

// Initialize
function init() {
  renderTeams();
  setupEventListeners();
}

// Render team grid
function renderTeams() {
  const grid = $('team-grid');
  grid.innerHTML = TEAMS.map(team => `
    <button class="team-card" data-team="${team.code}">
      <img class="team-flag-img" src="https://flagcdn.com/w80/${team.flagCode}.png" alt="${team.name}" />
      <span class="team-name">${team.name}</span>
    </button>
  `).join('');
}

// Event Listeners
function setupEventListeners() {
  // Team selection
  $('team-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.team-card');
    if (!card) return;
    
    document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.selectedTeam = TEAMS.find(t => t.code === card.dataset.team);
    
    show($('step-mode'));
    $('step-mode').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Mode selection
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedMode = card.dataset.mode;
      
      if (state.selectedMode === 'custom') {
        show($('custom-input'));
      } else {
        hide($('custom-input'));
      }
      
      show($('step-voice'));
      $('step-voice').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Voice selection
  document.querySelectorAll('.voice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedVoice = card.dataset.voice;
      
      show($('step-generate'));
      $('step-generate').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Generate button
  $('generate-btn').addEventListener('click', handleGenerate);
  
  // Regenerate
  $('regenerate-btn')?.addEventListener('click', handleGenerate);
  
  // Start over
  $('start-over-btn')?.addEventListener('click', () => {
    location.reload();
  });
  
  // Retry
  $('retry-btn')?.addEventListener('click', handleGenerate);

  // API Key Modal
  $('save-keys-btn').addEventListener('click', () => {
    const geminiKey = $('gemini-key').value.trim();
    const elevenLabsKey = $('elevenlabs-key').value.trim();
    
    if (!geminiKey || !elevenLabsKey) {
      alert('Both API keys are required');
      return;
    }
    
    state.geminiKey = geminiKey;
    state.elevenLabsKey = elevenLabsKey;
    localStorage.setItem('passioncast_gemini_key', geminiKey);
    localStorage.setItem('passioncast_elevenlabs_key', elevenLabsKey);
    hide($('api-modal'));
  });

  // Cancel API key modal — go back to previous state
  $('cancel-keys-btn').addEventListener('click', () => {
    hide($('api-modal'));
  });

  // Download button
  $('download-btn')?.addEventListener('click', () => {
    const audio = $('audio-player');
    if (audio.src) {
      const a = document.createElement('a');
      a.href = audio.src;
      a.download = `passioncast-${state.selectedTeam?.code || 'audio'}.mp3`;
      a.click();
    }
  });
}

// Main generation flow
async function handleGenerate() {
  if (!state.selectedTeam || !state.selectedMode || !state.selectedVoice) {
    alert('Please complete all steps first');
    return;
  }

  if (!state.geminiKey || !state.elevenLabsKey) {
    show($('api-modal'));
    return;
  }

  // Show loading
  hide($('step-generate'));
  hide($('step-result'));
  hide($('step-error'));
  show($('step-loading'));
  
  const lsScript = $('ls-script');
  const lsVoice = $('ls-voice');
  lsScript.classList.add('active');
  lsScript.classList.remove('done');
  lsVoice.classList.remove('active', 'done');

  try {
    // Step 1: Generate script with Gemini
    $('loading-text').textContent = 'Writing your passionate script...';
    const script = await generateScript();
    
    lsScript.classList.remove('active');
    lsScript.classList.add('done');
    lsVoice.classList.add('active');
    $('loading-text').textContent = 'Recording your commentary...';

    // Step 2: Generate audio with ElevenLabs
    const audioBlob = await generateAudio(script);
    
    lsVoice.classList.remove('active');
    lsVoice.classList.add('done');

    // Show result
    hide($('step-loading'));
    showResult(script, audioBlob);
    
  } catch (error) {
    console.error('Generation failed:', error);
    hide($('step-loading'));
    show($('step-error'));
    $('error-text').textContent = error.message || 'Failed to generate. Check your API keys and try again.';
    show($('step-generate'));
  }
}

// Generate passionate script using Gemini API
async function generateScript() {
  const team = state.selectedTeam;
  const modePrompt = state.selectedMode === 'custom' 
    ? $('custom-prompt').value 
    : MODE_PROMPTS[state.selectedMode];
  const voiceStyle = VOICE_STYLES[state.selectedVoice];

  const prompt = `You are a world-class sports commentator and storyteller. 
  
${modePrompt}

TEAM: ${team.name}

STYLE: ${voiceStyle}

RULES:
- Write approximately 150-200 words (about 45-60 seconds when spoken)
- Make it feel authentic and passionately personal to ${team.name} fans
- Reference real players, real history, real rivalries where possible
- This is for the FIFA World Cup 2026 in USA/Mexico/Canada
- Use the team's actual football/soccer culture and fan traditions
- Do NOT use any markdown formatting — plain text only
- Do NOT include stage directions or speaker labels
- Write ONLY the spoken script, nothing else
- Make every word drip with passion and fire`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${state.geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 500,
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err.error?.message || response.statusText;
    if (response.status === 429) {
      throw new Error('Gemini API quota exceeded. Free tier resets daily. Try again tomorrow or check your billing at ai.google.dev');
    }
    if (response.status === 400) {
      throw new Error('Gemini API key invalid. Check your key at aistudio.google.com/apikey');
    }
    throw new Error(`Gemini API error: ${msg}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Gemini returned empty response');
  }
  
  return text.trim();
}

// Generate audio using ElevenLabs API
async function generateAudio(text) {
  const voiceId = ELEVEN_VOICES[state.selectedVoice];
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': state.elevenLabsKey,
      },
      body: JSON.stringify({
        text: text,
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

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err.detail?.message || err.detail?.status || response.statusText;
    if (response.status === 401) {
      throw new Error('ElevenLabs API key invalid. Check your key at elevenlabs.io/app/settings/api-keys');
    }
    if (response.status === 402) {
      throw new Error('This voice requires a paid ElevenLabs plan. Try a different voice style or upgrade at elevenlabs.io');
    }
    if (response.status === 429) {
      throw new Error('ElevenLabs character limit reached. Free tier gives 10,000 chars/month. Resets monthly.');
    }
    throw new Error(`ElevenLabs API error: ${msg}`);
  }

  return await response.blob();
}

// Show results
function showResult(script, audioBlob) {
  show($('step-result'));
  
  // Team badge
  $('result-team-badge').innerHTML = `
    <img src="https://flagcdn.com/w80/${state.selectedTeam.flagCode}.png" alt="${state.selectedTeam.name}" style="width:64px;height:43px;object-fit:cover;border-radius:6px;" />
    <span style="font-size: 1rem; display: block; margin-top: 0.5rem; color: var(--text-secondary);">${state.selectedTeam.name}</span>
  `;
  
  // Script
  $('script-text').textContent = script;
  
  // Audio
  const audioUrl = URL.createObjectURL(audioBlob);
  const audioPlayer = $('audio-player');
  audioPlayer.src = audioUrl;
  
  // Auto-play
  audioPlayer.play().catch(() => {});
  
  $('step-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Boot
document.addEventListener('DOMContentLoaded', init);
