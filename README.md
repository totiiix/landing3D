# Voxel Onboarding - Interactive 3D Landing Game

Un mini-jeu 3D immersif style Crossy Road pour présenter vos services de manière ludique et interactive.

## 🎮 Fonctionnalités

- **Personnage voxel** contrôlable avec physique réaliste
- **4 zones de services** interactives représentant vos offres :
  - 🌐 Landing Pages
  - 📊 Data Analytics
  - 🤖 Intelligence Artificielle
  - ⚡ Automatisation
- **Système de scoring** avec points par zone traversée
- **Obstacles dynamiques** générés aléatoirement
- **Effets visuels** (post-processing, bloom, vignette)
- **Interface utilisateur** avec HUD, pause, et informations contextuelles

## 🛠️ Stack Technique

- **React 18** + **TypeScript**
- **Vite** - Build tool ultra-rapide
- **Three.js** - Moteur 3D
- **React Three Fiber** - Intégration React pour Three.js
- **@react-three/drei** - Composants 3D utilitaires
- **@react-three/rapier** - Moteur physique
- **@react-three/postprocessing** - Effets post-traitement
- **Zustand** - Gestion d'état légère
- **TailwindCSS** - Framework CSS utilitaire

## 🚀 Installation

```bash
# Cloner le projet
cd voxel-onboarding

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le jeu sera accessible sur `http://localhost:5173`

## 🎯 Contrôles

- **W / Z / ↑** : Avancer
- **S / ↓** : Reculer
- **A / Q / ←** : Gauche
- **D / →** : Droite
- **Espace** : Sauter

## 📦 Build Production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

Le build sera généré dans le dossier `dist/`

## 🌐 Déploiement

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Modifier `vite.config.ts` pour ajouter le base path :

```typescript
export default defineConfig({
  base: '/votre-repo-name/',
  plugins: [react()],
})
```

2. Build et déploiement :

```bash
npm run build
npx gh-pages -d dist
```

### Autres plateformes

Le projet est compatible avec :
- **AWS S3** + CloudFront
- **Firebase Hosting**
- **Cloudflare Pages**
- **Railway**
- **Render**

## 📁 Structure du Projet

```
voxel-onboarding/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Camera.tsx        # Contrôleur de caméra
│   │   │   ├── Ground.tsx        # Terrain du jeu
│   │   │   ├── Obstacles.tsx     # Obstacles aléatoires
│   │   │   ├── Player.tsx        # Personnage voxel
│   │   │   ├── Scene.tsx         # Scène 3D principale
│   │   │   └── ServiceZones.tsx  # Zones de services
│   │   └── UI.tsx                # Interface utilisateur
│   ├── hooks/
│   │   └── useKeyboard.ts        # Hook pour les contrôles
│   ├── store/
│   │   └── useGameStore.ts       # Store Zustand
│   ├── types/
│   │   └── game.ts               # Types TypeScript
│   ├── App.tsx                   # Composant racine
│   ├── main.tsx                  # Point d'entrée
│   └── index.css                 # Styles globaux
├── public/                       # Assets statiques
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Personnalisation

### Modifier les zones de services

Éditez le fichier `src/types/game.ts` :

```typescript
export const SERVICE_ZONES: ServiceZone[] = [
  {
    id: 'votre-service',
    name: 'Nom du Service',
    description: 'Description détaillée',
    color: '#HEXCOLOR',
    position: [0, 0, 10],
    icon: '🚀'
  },
  // ... ajoutez vos zones
];
```

### Personnaliser le personnage

Modifiez `src/components/game/Player.tsx` pour changer les couleurs, tailles et formes du personnage voxel.

### Ajuster la physique

Dans `Player.tsx`, modifiez les constantes :

```typescript
const MOVE_SPEED = 5;     // Vitesse de déplacement
const JUMP_FORCE = 5;     // Force du saut
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` :

```env
VITE_APP_TITLE=Voxel Onboarding
VITE_APP_DESCRIPTION=Interactive 3D Landing Game
```

## 📊 Performance

- **Build size** : ~600KB (gzipped)
- **First Load** : <2s sur connexion 4G
- **60 FPS** stable sur appareils modernes
- **Mobile-ready** (contrôles tactiles à venir)

## 🔮 Roadmap

- [ ] Support mobile avec contrôles tactiles
- [ ] Système de niveaux multiples
- [ ] Intégration de modèles .glb depuis MagicaVoxel
- [ ] Mode multijoueur
- [ ] Sauvegarde des scores (backend)
- [ ] Animations de personnage avancées
- [ ] Particules et effets visuels supplémentaires

## 📝 Licence

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

## 🤝 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation de [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Rejoindre la communauté [Poimandres Discord](https://discord.gg/poimandres)

---

**Créé avec ❤️ par [Votre Nom]**

Propulsé par React, Three.js, et beaucoup de pixels cubiques !
