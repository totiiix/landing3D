# 🔊 Ajout des Sons de Voiture

Ce guide explique comment ajouter vos propres sons personnalisés pour la fonctionnalité de sortie du jeu en voiture.

## 📁 Structure des Fichiers

Les fichiers audio doivent être placés dans le dossier suivant :
```
public/audio/sfx/car/
```

**Note** : Les sons de voiture sont intégrés au système audio principal du jeu, configuré dans `src/config/audioConfig.ts`.

## 🎵 Fichiers Requis

Créez ou téléchargez les fichiers audio suivants au format MP3 :

### 1. `door-open.mp3`
- **Utilisation** : Joué quand le personnage ouvre la portière
- **Durée recommandée** : 0.5-1 seconde
- **Type de son** : Clic, grincement, bruit de portière qui s'ouvre

### 2. `door-close.mp3`
- **Utilisation** : Joué quand la portière se ferme (0.8s après l'ouverture)
- **Durée recommandée** : 0.5-1 seconde
- **Type de son** : Claquement, bruit sourd de portière qui se ferme

### 3. `engine-start.mp3`
- **Utilisation** : Joué quand le moteur démarre (0.5s après la montée)
- **Durée recommandée** : 1-2 secondes
- **Type de son** : Démarrage de moteur, contact, vrombissement initial

### 4. `engine-driving.mp3`
- **Utilisation** : Joué en boucle pendant que la voiture roule (démarre à 1.5s)
- **Durée recommandée** : 3-5 secondes (doit être loopable)
- **Type de son** : Ronronnement de moteur constant, bruit de conduite
- **Important** : Le son doit pouvoir se répéter sans coupure

## 🎼 Timeline de l'Animation

Voici la séquence complète avec les sons :

```
0.0s  : Joueur appuie sur E
0.0s  : 🔊 door-open.mp3 (portière s'ouvre)
0.8s  : 🔊 door-close.mp3 (portière se ferme)
1.2s  : Personnage disparaît, voiture apparaît
1.7s  : 🔊 engine-start.mp3 (moteur démarre)
2.7s  : 🔊 engine-driving.mp3 [LOOP] (voiture commence à rouler)
5.7s  : Animation terminée, fade out
6.7s  : Retour au jeu
```

## 🎨 Sources de Sons Gratuits

Vous pouvez trouver des effets sonores gratuits sur :

1. **[Freesound.org](https://freesound.org/)**
   - Recherchez : "car door open", "car door close", "engine start", "engine idle"
   - Licence Creative Commons, vérifiez les attributions

2. **[Zapsplat.com](https://www.zapsplat.com/)**
   - Catégorie : Transport > Cars
   - Gratuit avec attribution

3. **[Mixkit.co](https://mixkit.co/free-sound-effects/)**
   - Section "Transport & Vehicles"
   - Totalement gratuit sans attribution

4. **[BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/)**
   - Archive de la BBC
   - Utilisation personnelle et éducative

## 🛠️ Conversion et Édition

Si vos fichiers ne sont pas au format MP3 :

### Avec Audacity (gratuit)
1. Téléchargez [Audacity](https://www.audacityteam.org/)
2. Ouvrez votre fichier audio
3. Fichier > Exporter > Exporter en MP3
4. Paramètres recommandés :
   - Débit : 192 kbps
   - Mode : Stéréo
   - Fréquence : 44100 Hz

### En ligne
- [Online Audio Converter](https://online-audio-converter.com/)
- [Convertio](https://convertio.co/fr/audio-converter/)

## 📊 Paramètres de Volume

Les volumes par défaut dans le code sont :

```typescript
door-open.mp3      : volume 0.4 (40%)
door-close.mp3     : volume 0.4 (40%)
engine-start.mp3   : volume 0.5 (50%)
engine-driving.mp3 : volume 0.3 (30%, en boucle)
```

Pour ajuster les volumes, modifiez `src/hooks/useCarSounds.ts`

## ⚙️ Configuration

Les sons sont configurés dans `src/config/audioConfig.ts` :

```typescript
// Chemins des fichiers
AUDIO_PATHS.sfx: {
  carDoorOpen: '/audio/sfx/car/door-open.mp3',
  carDoorClose: '/audio/sfx/car/door-close.mp3',
  carEngineStart: '/audio/sfx/car/engine-start.mp3',
  carEngineDriving: '/audio/sfx/car/engine-driving.mp3',
}

// Volumes
AUDIO_VOLUMES: {
  carDoor: 0.4,           // 40%
  carEngineStart: 0.5,    // 50%
  carEngineDriving: 0.3,  // 30%
}
```

Pour modifier les volumes, éditez ce fichier.

## ✅ Checklist

- [ ] Créer le dossier `public/audio/sfx/car/` s'il n'existe pas
- [ ] Ajouter `door-open.mp3`
- [ ] Ajouter `door-close.mp3`
- [ ] Ajouter `engine-start.mp3`
- [ ] Ajouter `engine-driving.mp3`
- [ ] Vérifier que engine-driving.mp3 peut se répéter en boucle sans coupure
- [ ] Tester in-game : aller vers la voiture, appuyer sur E
- [ ] Vérifier que les sons sont activés dans le menu audio du jeu

## 🐛 Dépannage

### Les sons ne jouent pas
1. Vérifiez que les fichiers sont bien dans `public/audio/sfx/car/`
2. Vérifiez les noms de fichiers (sensible à la casse)
3. Vérifiez que les sons sont activés dans le menu du jeu
4. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les sons sont trop forts/faibles
- Modifiez les valeurs dans `AUDIO_VOLUMES` dans `src/config/audioConfig.ts`

### Le son de conduite a une coupure dans la boucle
- Éditez le fichier avec Audacity
- Utilisez "Effet > Fade In" au début et "Effet > Fade Out" à la fin
- Assurez-vous que le son commence et finit de manière similaire

## 🎯 Exemple de Sons à Chercher

Sur Freesound.org, essayez ces recherches :

- `car door open metal` → door-open.mp3
- `car door slam close` → door-close.mp3
- `car engine ignition start` → engine-start.mp3
- `car engine idle loop` → engine-driving.mp3

## 💡 Conseils Pro

1. **Cohérence** : Utilisez des sons de la même voiture pour un effet réaliste
2. **Normalization** : Normalisez vos sons à -3dB pour éviter la saturation
3. **Silence** : Supprimez les silences au début/fin des fichiers
4. **Test** : Testez les sons in-game plusieurs fois pour valider la synchronisation

---

**Note** : Le jeu fonctionnera même si les fichiers MP3 sont manquants, mais sans effets sonores. Les erreurs de chargement audio sont gérées gracieusement.
