# Guide d'ajout de décors 3D (GLB)

## Structure du système

Le système de décoration permet d'ajouter facilement des modèles 3D GLB dans votre jeu voxel.

### Fichiers créés

- **`src/components/game/PropModel.tsx`** : Composant réutilisable pour charger des modèles GLB
- **`src/components/game/DecorationLayer.tsx`** : Gère l'affichage de tous les décors
- **`src/config/decorations.ts`** : Configuration centralisée des décors

## Comment ajouter un décor GLB

### 1. Placez votre fichier GLB

Créez un dossier dans `public/models/` pour chaque type de décor :

```
public/
├── models/
│   ├── tree/
│   │   └── tree.glb
│   ├── rock/
│   │   └── rock.glb
│   ├── fence/
│   │   └── fence.glb
│   └── building/
│       └── house.glb
```

### 2. Ajoutez la configuration dans `decorations.ts`

Ouvrez `src/config/decorations.ts` et ajoutez vos décors dans le tableau :

```typescript
export const decorations: Decoration[] = [
  {
    id: 'tree-1',
    modelPath: '/models/tree/tree.glb',
    gridPosition: { x: 5, z: 5 },      // Position sur la grille 20x20
    yOffset: 0,                         // Hauteur (optionnel)
    scale: 1,                           // Échelle (optionnel)
  },
  {
    id: 'rock-1',
    modelPath: '/models/rock/rock.glb',
    gridPosition: { x: 8, z: 12 },
    yOffset: 0,
    rotation: [0, Math.PI / 4, 0],     // Rotation Y de 45° (optionnel)
    scale: 0.8,
  },
  {
    id: 'fence-1',
    modelPath: '/models/fence/fence.glb',
    gridPosition: { x: 3, z: 7 },
    rotation: [0, Math.PI / 2, 0],     // Rotation Y de 90°
  },
  {
    id: 'tree-2',
    modelPath: '/models/tree/tree.glb',
    gridPosition: { x: 15, z: 3 },
    scale: [1.2, 1.5, 1.2],            // Échelle non-uniforme
  },
];
```

### 3. Paramètres disponibles

| Paramètre | Type | Description | Obligatoire |
|-----------|------|-------------|-------------|
| `id` | string | Identifiant unique | ✅ |
| `modelPath` | string | Chemin vers le fichier GLB | ✅ |
| `gridPosition` | {x, z} | Position sur la grille (0-19) | ✅ |
| `yOffset` | number | Décalage vertical | ❌ (défaut: 0) |
| `rotation` | [x,y,z] | Rotation en radians | ❌ (défaut: [0,0,0]) |
| `scale` | number ou [x,y,z] | Échelle du modèle | ❌ (défaut: 1) |

### 4. Système de coordonnées

La grille est **20x20** avec le personnage qui démarre au centre (10, 10).

```
      z →
    ┌─────────────────────┐
  x │  (0,0)              │
  ↓ │         (10,10)     │ Centre
    │              (19,19)│
    └─────────────────────┘
```

## Exemples pratiques

### Créer une forêt
```typescript
const trees = Array.from({ length: 10 }, (_, i) => ({
  id: `tree-${i}`,
  modelPath: '/models/tree/tree.glb',
  gridPosition: {
    x: Math.floor(Math.random() * 20),
    z: Math.floor(Math.random() * 20)
  },
  rotation: [0, Math.random() * Math.PI * 2, 0],
  scale: 0.8 + Math.random() * 0.4,
}));

export const decorations: Decoration[] = [...trees];
```

### Créer une allée de lampadaires
```typescript
export const decorations: Decoration[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `lamp-${i}`,
    modelPath: '/models/lamp/streetlamp.glb',
    gridPosition: { x: 5, z: i * 2 },
    scale: 1,
  })),
];
```

## Optimisation

### Préchargement des modèles
Pour éviter les lags au chargement, préchargez vos modèles dans `App.tsx` :

```typescript
import { preloadProp } from './components/game/PropModel';

// Dans votre composant
useEffect(() => {
  preloadProp('/models/tree/tree.glb');
  preloadProp('/models/rock/rock.glb');
}, []);
```

### Compression Draco
Pour réduire la taille des fichiers GLB, utilisez la compression Draco dans Blender :
1. File > Export > glTF 2.0
2. Cochez "Draco Compression"
3. Format: GLB Binary

## Création de modèles GLB

### Depuis Blender
1. Créez votre modèle
2. File > Export > glTF 2.0
3. Format : **glTF Binary (.glb)**
4. Include : Vérifiez que les textures sont incluses
5. Export GLB

### Depuis MagicaVoxel
1. Créez votre modèle voxel
2. File > Export > obj
3. Importez le .obj dans Blender
4. Ajoutez les matériaux/textures
5. Exportez en GLB

## Dépannage

**Le modèle n'apparaît pas :**
- Vérifiez que le chemin dans `modelPath` est correct
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que la position est dans la grille (0-19)

**Le modèle est trop grand/petit :**
- Ajustez le paramètre `scale`
- Dans Blender, appliquez l'échelle (Ctrl+A > Scale)

**Le modèle est noir :**
- Vérifiez que les matériaux sont exportés
- Augmentez `ambientLight intensity` dans Scene.tsx

**Collisions avec le personnage :**
- Utilisez `isPositionOccupied(x, z)` pour vérifier si une case est occupée
- Empêchez le joueur de se déplacer sur ces cases

## Prochaines étapes

Pour ajouter des collisions et empêcher le joueur de traverser les décors, modifiez `Player.tsx` pour vérifier `isPositionOccupied()` avant de se déplacer.
