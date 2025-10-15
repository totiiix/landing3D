# Audio Assets

Ce dossier contient tous les fichiers audio du jeu.

## Structure

```
audio/
├── music/           # Musiques de fond
│   └── background.mp3   (requis)
│
└── sfx/             # Effets sonores
    ├── footstep.mp3     (requis)
    └── landing.mp3      (requis)
```

## Fichiers nécessaires

### Musique (music/)
- **background.mp3** : Musique d'ambiance qui joue en boucle
  - Format recommandé : .mp3 ou .ogg
  - Durée suggérée : 1-3 minutes
  - Taille recommandée : < 5 MB

### Effets sonores (sfx/)
- **footstep.mp3** : Son joué à chaque pas du personnage
  - Format recommandé : .mp3, .wav ou .ogg
  - Durée suggérée : 0.1-0.3 secondes
  - Taille recommandée : < 50 KB

- **landing.mp3** : Son joué lors de l'atterrissage du personnage
  - Format recommandé : .mp3, .wav ou .ogg
  - Durée suggérée : 0.2-0.5 secondes
  - Taille recommandée : < 100 KB

## Ressources pour trouver des sons gratuits

### Musique
- [Incompetech](https://incompetech.com) - Musique libre de droits
- [Free Music Archive](https://freemusicarchive.org)
- [Pixabay Music](https://pixabay.com/music/)

### Effets sonores
- [Freesound](https://freesound.org)
- [Zapsplat](https://www.zapsplat.com)
- [Mixkit](https://mixkit.co/free-sound-effects/)

## Instructions

1. Téléchargez ou créez vos fichiers audio
2. Renommez-les selon les noms ci-dessus
3. Placez-les dans les dossiers appropriés
4. Rechargez l'application

**Note** : Si les fichiers ne sont pas présents, le jeu utilisera des sons synthétiques par défaut.
