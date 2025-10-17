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
    trainHorn: '/audio/sfx/train_horn.mp3',
    chicken1: '/audio/sfx/chicken1.mp3',
    chicken2: '/audio/sfx/chicken2.mp3',
    // Car sounds
    carDoorOpen: '/audio/sfx/car/door-open.mp3',
    carDoorClose: '/audio/sfx/car/door-close.mp3',
    carEngineStart: '/audio/sfx/car/engine-start.mp3',
    carEngineDriving: '/audio/sfx/car/engine-driving.mp3',
  },
  collisions: {
    default: '/audio/sfx/collision.mp3',
    tree: '/audio/sfx/collisions/tree.mp3',
    rock: '/audio/sfx/collisions/rock.mp3',
    fence: '/audio/sfx/collisions/fence.mp3',
    bush: '/audio/sfx/collisions/bush.mp3',
    bigTree: '/audio/sfx/collisions/big_tree.mp3',
    cactus: '/audio/sfx/collisions/cactus.mp3',
    house: '/audio/sfx/collisions/house.mp3',
    car: '/audio/sfx/collisions/car.mp3',
    duck: '/audio/sfx/collisions/duck.mp3',
    oldMan: '/audio/sfx/collisions/old_man.mp3',
  },
};

// Configuration des volumes (0.0 à 1.0)
export const AUDIO_VOLUMES = {
  music: 0.1,        // Volume de la musique de fond
  footstep: 0.5,     // Volume des bruits de pas
  landing: 0.6,      // Volume des atterrissages
  collision: 0.8,    // Volume des collisions
  trainHorn: 0.3,    // Volume du klaxon du train
  chicken: 0.5,      // Volume des sons de canard/poule
  carDoor: 0.4,      // Volume des portières de voiture
  carEngineStart: 0.5, // Volume du démarrage du moteur
  carEngineDriving: 0.3, // Volume du moteur en conduite
};
