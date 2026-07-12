// World Cup 2026 Teams (48 teams, grouped for display)
export const TEAMS = [
  { name: 'Argentina', flagCode: 'ar', code: 'ARG' },
  { name: 'Brazil', flagCode: 'br', code: 'BRA' },
  { name: 'France', flagCode: 'fr', code: 'FRA' },
  { name: 'Germany', flagCode: 'de', code: 'GER' },
  { name: 'Spain', flagCode: 'es', code: 'ESP' },
  { name: 'England', flagCode: 'gb-eng', code: 'ENG' },
  { name: 'Portugal', flagCode: 'pt', code: 'POR' },
  { name: 'Netherlands', flagCode: 'nl', code: 'NED' },
  { name: 'Italy', flagCode: 'it', code: 'ITA' },
  { name: 'Belgium', flagCode: 'be', code: 'BEL' },
  { name: 'Croatia', flagCode: 'hr', code: 'CRO' },
  { name: 'Uruguay', flagCode: 'uy', code: 'URU' },
  { name: 'Colombia', flagCode: 'co', code: 'COL' },
  { name: 'Mexico', flagCode: 'mx', code: 'MEX' },
  { name: 'USA', flagCode: 'us', code: 'USA' },
  { name: 'Canada', flagCode: 'ca', code: 'CAN' },
  { name: 'Japan', flagCode: 'jp', code: 'JPN' },
  { name: 'South Korea', flagCode: 'kr', code: 'KOR' },
  { name: 'Australia', flagCode: 'au', code: 'AUS' },
  { name: 'Saudi Arabia', flagCode: 'sa', code: 'KSA' },
  { name: 'Morocco', flagCode: 'ma', code: 'MAR' },
  { name: 'Senegal', flagCode: 'sn', code: 'SEN' },
  { name: 'Nigeria', flagCode: 'ng', code: 'NGA' },
  { name: 'Ghana', flagCode: 'gh', code: 'GHA' },
  { name: 'Cameroon', flagCode: 'cm', code: 'CMR' },
  { name: 'Egypt', flagCode: 'eg', code: 'EGY' },
  { name: 'Serbia', flagCode: 'rs', code: 'SRB' },
  { name: 'Switzerland', flagCode: 'ch', code: 'SUI' },
  { name: 'Denmark', flagCode: 'dk', code: 'DEN' },
  { name: 'Poland', flagCode: 'pl', code: 'POL' },
  { name: 'Ecuador', flagCode: 'ec', code: 'ECU' },
  { name: 'Chile', flagCode: 'cl', code: 'CHI' },
  { name: 'Paraguay', flagCode: 'py', code: 'PAR' },
  { name: 'Peru', flagCode: 'pe', code: 'PER' },
  { name: 'Costa Rica', flagCode: 'cr', code: 'CRC' },
  { name: 'Jamaica', flagCode: 'jm', code: 'JAM' },
  { name: 'Iran', flagCode: 'ir', code: 'IRN' },
  { name: 'Qatar', flagCode: 'qa', code: 'QAT' },
  { name: 'Tunisia', flagCode: 'tn', code: 'TUN' },
  { name: 'Algeria', flagCode: 'dz', code: 'ALG' },
  { name: 'Wales', flagCode: 'gb-wls', code: 'WAL' },
  { name: 'Scotland', flagCode: 'gb-sct', code: 'SCO' },
  { name: 'Turkey', flagCode: 'tr', code: 'TUR' },
  { name: 'Austria', flagCode: 'at', code: 'AUT' },
  { name: 'Ukraine', flagCode: 'ua', code: 'UKR' },
  { name: 'Sweden', flagCode: 'se', code: 'SWE' },
  { name: 'Indonesia', flagCode: 'id', code: 'IDN' },
  { name: 'India', flagCode: 'in', code: 'IND' },
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
  dramatic: 'nPczCjzI2devNBz1zQrb', // Brian - deep resonant narrator
  energetic: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - energetic social media creator
  poetic: 'JBFqnCBsd6RMkjVDRZzb', // George - warm captivating storyteller
};
