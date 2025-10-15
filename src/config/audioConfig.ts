// Configuration des chemins des fichiers audio
// Les fichiers doivent être placés dans le dossier public/audio/

export const AUDIO_PATHS = {
  music: {
    background: '/audio/music/background.mp3',
  },
  sfx: {
    footstep: '/audio/sfx/footstep.mp3',
    landing: '/audio/sfx/landing.mp3',
    collision: '/audio/sfx/collision.mp3',
  },
};

// Configuration des volumes (0.0 à 1.0)
export const AUDIO_VOLUMES = {
  music: 0.1,        // Volume de la musique de fond
  footstep: 0.4,     // Volume des bruits de pas
  landing: 0.6,      // Volume des atterrissages
  collision: 0.2,    // Volume des collisions
};
