// World Cup 2026 Teams (48 teams, grouped for display)
export const TEAMS = [
  { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
  { name: 'Brazil', flag: '🇧🇷', code: 'BRA' },
  { name: 'France', flag: '🇫🇷', code: 'FRA' },
  { name: 'Germany', flag: '🇩🇪', code: 'GER' },
  { name: 'Spain', flag: '🇪🇸', code: 'ESP' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'ENG' },
  { name: 'Portugal', flag: '🇵🇹', code: 'POR' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NED' },
  { name: 'Italy', flag: '🇮🇹', code: 'ITA' },
  { name: 'Belgium', flag: '🇧🇪', code: 'BEL' },
  { name: 'Croatia', flag: '🇭🇷', code: 'CRO' },
  { name: 'Uruguay', flag: '🇺🇾', code: 'URU' },
  { name: 'Colombia', flag: '🇨🇴', code: 'COL' },
  { name: 'Mexico', flag: '🇲🇽', code: 'MEX' },
  { name: 'USA', flag: '🇺🇸', code: 'USA' },
  { name: 'Canada', flag: '🇨🇦', code: 'CAN' },
  { name: 'Japan', flag: '🇯🇵', code: 'JPN' },
  { name: 'South Korea', flag: '🇰🇷', code: 'KOR' },
  { name: 'Australia', flag: '🇦🇺', code: 'AUS' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'KSA' },
  { name: 'Morocco', flag: '🇲🇦', code: 'MAR' },
  { name: 'Senegal', flag: '🇸🇳', code: 'SEN' },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NGA' },
  { name: 'Ghana', flag: '🇬🇭', code: 'GHA' },
  { name: 'Cameroon', flag: '🇨🇲', code: 'CMR' },
  { name: 'Egypt', flag: '🇪🇬', code: 'EGY' },
  { name: 'Serbia', flag: '🇷🇸', code: 'SRB' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'SUI' },
  { name: 'Denmark', flag: '🇩🇰', code: 'DEN' },
  { name: 'Poland', flag: '🇵🇱', code: 'POL' },
  { name: 'Ecuador', flag: '🇪🇨', code: 'ECU' },
  { name: 'Chile', flag: '🇨🇱', code: 'CHI' },
  { name: 'Paraguay', flag: '🇵🇾', code: 'PAR' },
  { name: 'Peru', flag: '🇵🇪', code: 'PER' },
  { name: 'Costa Rica', flag: '🇨🇷', code: 'CRC' },
  { name: 'Jamaica', flag: '🇯🇲', code: 'JAM' },
  { name: 'Iran', flag: '🇮🇷', code: 'IRN' },
  { name: 'Qatar', flag: '🇶🇦', code: 'QAT' },
  { name: 'Tunisia', flag: '🇹🇳', code: 'TUN' },
  { name: 'Algeria', flag: '🇩🇿', code: 'ALG' },
  { name: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', code: 'WAL' },
  { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'SCO' },
  { name: 'Turkey', flag: '🇹🇷', code: 'TUR' },
  { name: 'Austria', flag: '🇦🇹', code: 'AUT' },
  { name: 'Ukraine', flag: '🇺🇦', code: 'UKR' },
  { name: 'Sweden', flag: '🇸🇪', code: 'SWE' },
  { name: 'Indonesia', flag: '🇮🇩', code: 'IDN' },
  { name: 'India', flag: '🇮🇳', code: 'IND' },
];

// Passion mode prompts
export const MODE_PROMPTS = {
  hype: "Generate a PRE-MATCH HYPE speech — a rally cry to fire up fans before a huge World Cup 2026 match. Build anticipation, reference their history, their legends, and why THIS is their moment.",
  glory: "Generate a GLORY MOMENT narration — describe an iconic, breathtaking winning moment as if it just happened. The goal, the celebration, the disbelief, the tears of joy. Make it feel like the greatest moment in football history.",
  rivalry: "Generate a RIVALRY commentary — stoke the flames of the team's biggest rivalry. Reference the history between these nations, the battles fought on the pitch, the stakes, the pride. Make it feel personal.",
  heartbreak: "Generate a BEAUTIFUL HEARTBREAK narration — capture the devastating passion of a close loss. The last-minute goal conceded, the silence in the stadium, the tears, but also the pride in fighting to the end. Make it poetic and gut-wrenching.",
  anthem: "Generate a FAN ANTHEM — a rhythmic, chant-like spoken word piece that fans could recite together. Short punchy lines, repetition, building intensity. Think terrace poetry meets war cry.",
  custom: "" // Will use user's custom prompt
};

// Voice style instructions for Gemini
export const VOICE_STYLES = {
  dramatic: "Write in a DEEP CINEMATIC style — like a movie trailer narrator. Short powerful sentences. Dramatic pauses (indicated by '...'). Epic vocabulary. Think Morgan Freeman meets World Cup final.",
  energetic: "Write in a HIGH-ENERGY COMMENTATOR style — breathless, excited, fast-paced like a live match commentator losing their mind over a goal. 'GOOOAAL!' energy. Peter Drury meets Ray Hudson.",
  poetic: "Write in a POETIC STORYTELLER style — lyrical, emotional, using metaphors and imagery. Beautiful prose that makes football feel like art. Think Eduardo Galeano writing about the beautiful game."
};

// ElevenLabs voice IDs (using pre-made voices from their library)
export const ELEVEN_VOICES = {
  dramatic: 'nPczCjzI2devNBz1zQrb', // Brian - deep dramatic male
  energetic: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - energetic male
  poetic: 'XB0fDUnXU5powFXDhCwa', // Charlotte - warm storyteller
};
