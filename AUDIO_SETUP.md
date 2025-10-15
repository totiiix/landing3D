# 🔊 Configuration Audio - Instructions

Le jeu est maintenant configuré pour utiliser de vrais fichiers audio (.mp3, .ogg, .wav) !

## 📁 Structure des fichiers

```
voxel-onboarding/
└── public/
    └── audio/
        ├── music/
        │   └── background.mp3      ← Musique de fond (requis)
        │
        └── sfx/
            ├── footstep.mp3        ← Bruit de pas (requis)
            └── landing.mp3         ← Bruit d'atterrissage (requis)
```

## 📋 Fichiers à ajouter

### 1. **Musique de fond** (`public/audio/music/background.mp3`)
- **Rôle** : Musique d'ambiance qui joue en boucle pendant le jeu
- **Format recommandé** : .mp3 ou .ogg
- **Durée suggérée** : 1-3 minutes
- **Taille** : < 5 MB
- **Style suggéré** : Musique calme, ambiance joyeuse et légère

### 2. **Bruit de pas** (`public/audio/sfx/footstep.mp3`)
- **Rôle** : Joué chaque fois que le personnage se déplace d'une case
- **Format recommandé** : .mp3, .wav ou .ogg
- **Durée** : 0.1-0.3 secondes
- **Taille** : < 50 KB
- **Style suggéré** : Son court et sec de pas sur de l'herbe ou du sol

### 3. **Bruit d'atterrissage** (`public/audio/sfx/landing.mp3`)
- **Rôle** : Joué lors de l'atterrissage du personnage (entrée ou saut)
- **Format recommandé** : .mp3, .wav ou .ogg
- **Durée** : 0.2-0.5 secondes
- **Taille** : < 100 KB
- **Style suggéré** : Impact plus fort que le pas normal

## 🎵 Où trouver des sons gratuits ?

### Musique
- **[Incompetech](https://incompetech.com/music/royalty-free/music.html)** - Excellente bibliothèque, filtrer par "Happy" ou "Playful"
- **[Pixabay Music](https://pixabay.com/music/)** - Musiques libres de droits
- **[Free Music Archive](https://freemusicarchive.org)** - Grande collection

### Effets sonores
- **[Freesound](https://freesound.org)** - Recherche : "footstep grass", "landing impact"
- **[Zapsplat](https://www.zapsplat.com/sound-effect-category/footsteps/)** - Catégorie footsteps
- **[Mixkit](https://mixkit.co/free-sound-effects/)** - Effets sonores gratuits

## 🚀 Installation rapide

1. **Créer les fichiers** :
   - Télécharge ou crée tes fichiers audio
   - Renomme-les exactement comme indiqué ci-dessus

2. **Les placer dans le bon dossier** :
   ```
   voxel-onboarding/public/audio/music/background.mp3
   voxel-onboarding/public/audio/sfx/footstep.mp3
   voxel-onboarding/public/audio/sfx/landing.mp3
   ```

3. **Recharger l'application** :
   - Les fichiers seront automatiquement chargés
   - Ouvre la console (F12) pour voir les messages de chargement

## ⚙️ Personnalisation avancée

### Changer les noms de fichiers

Édite `src/config/audioConfig.ts` :

```typescript
export const AUDIO_PATHS = {
  music: {
    background: '/audio/music/MON_FICHIER.mp3',  // Ton nom ici
  },
  sfx: {
    footstep: '/audio/sfx/MON_PAS.wav',
    landing: '/audio/sfx/MON_IMPACT.ogg',
  },
};
```

### Ajuster les volumes

Dans le même fichier :

```typescript
export const AUDIO_VOLUMES = {
  music: 0.3,        // 0.0 = muet, 1.0 = max
  footstep: 0.4,
  landing: 0.6,
};
```

## 🔄 Système de fallback

**Important** : Si les fichiers audio ne sont pas trouvés, le jeu utilisera automatiquement des sons synthétiques (les sons actuels). Tu verras un message dans la console :

```
⚠️ Could not load background music file, using synthesized fallback
```

Pas de panique ! Ajoute simplement les fichiers et recharge la page.

## 🎮 Test

1. Lance le jeu : `npm run dev`
2. Clique n'importe où pour activer l'audio
3. Ouvre la console (F12) pour voir :
   ```
   ✅ Background music loaded successfully
   ✅ Footstep sound loaded
   ✅ Landing sound loaded
   ```
4. Teste les contrôles audio avec l'icône 🔊 en haut à droite

## 📝 Exemple de recherche sur Freesound.org

1. Va sur [freesound.org](https://freesound.org)
2. Cherche "footstep grass" ou "walking dirt"
3. Filtre par licence "Creative Commons 0" (domaine public)
4. Télécharge un son court (0.1-0.3s)
5. Renomme en `footstep.mp3` et place dans `public/audio/sfx/`

Pareil pour "landing impact" ou "thud soft" pour l'atterrissage.

---

**Besoin d'aide ?** Vérifie la console du navigateur (F12) pour les messages d'erreur !
