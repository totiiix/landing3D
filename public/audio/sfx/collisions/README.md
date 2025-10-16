# Sons de Collision Personnalisés

Ce dossier contient les fichiers audio pour les sons de collision personnalisés de chaque type d'objet.

## Structure des fichiers

Placez vos fichiers MP3 dans ce dossier avec les noms suivants :

### Sons de collision par type d'objet

- `tree.mp3` - Son pour les arbres (Tree)
- `rock.mp3` - Son pour les rochers (TestRock)
- `fence.mp3` - Son pour les clôtures (TestFence)
- `bush.mp3` - Son pour les buissons (TestBush)
- `big_tree.mp3` - Son pour les grands arbres (BigTree)
- `cactus.mp3` - Son pour les cactus (Cactus)
- `house.mp3` - Son pour la maison (House)
- `car.mp3` - Son pour la voiture (Car)
- `duck.mp3` - Son pour le canard (Duck)
- `old_man.mp3` - Son pour le vieil homme (OldMan)

## Comment ça fonctionne

1. **Sons par défaut** : Si un fichier n'existe pas, le système utilisera automatiquement un son synthétisé de fallback.

2. **Configuration dans testDecorations.tsx** :
   Chaque décoration peut avoir un paramètre `collisionSound` qui définit quel son jouer lors d'une collision.

   Exemple :
   ```typescript
   {
     id: 'tree-1',
     Component: Tree,
     gridPosition: { x: 5, z: 3 },
     collisionSound: 'tree', // Jouera tree.mp3
   }
   ```

3. **Volume** : Le volume de tous les sons de collision peut être ajusté dans `src/config/audioConfig.ts` avec la propriété `collision`.

4. **Format** : Les fichiers doivent être au format MP3 pour une meilleure compatibilité.

## Conseils pour les sons

- **Durée** : Les sons de collision doivent être courts (0.1 - 0.5 secondes) pour éviter le chevauchement.
- **Volume** : Normalisez vos fichiers audio pour qu'ils aient un volume similaire.
- **Variété** : Utilisez des sons différents pour chaque type d'objet pour améliorer l'immersion :
  - Arbres : bruit de bois/feuilles
  - Rochers : bruit de pierre/impact dur
  - Clôtures : bruit de bois craquant
  - Buissons : bruit de feuillage
  - Cactus : son piquant/sec
  - etc.

## Ajout d'un nouveau type de collision

Pour ajouter un nouveau type de son de collision :

1. Ajoutez le fichier MP3 dans ce dossier
2. Ajoutez le chemin dans `src/config/audioConfig.ts` :
   ```typescript
   collisions: {
     // ... autres sons
     nouveauType: '/audio/sfx/collisions/nouveau_type.mp3',
   }
   ```
3. Ajoutez le type dans `src/config/testDecorations.tsx` :
   ```typescript
   export type CollisionSoundType = '...' | 'nouveauType';
   ```
4. Utilisez-le dans vos décorations :
   ```typescript
   {
     id: 'mon-objet',
     Component: MonComposant,
     gridPosition: { x: 5, z: 5 },
     collisionSound: 'nouveauType',
   }
   ```
