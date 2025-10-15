// Script pour générer des modèles GLB de test
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exporter = new GLTFExporter();

// Créer le dossier de destination
const modelsDir = path.join(__dirname, '../public/models/test');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Fonction pour exporter un modèle
function exportModel(scene, filename) {
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outputPath = path.join(modelsDir, filename);
        fs.writeFileSync(outputPath, Buffer.from(result));
        console.log(`✓ ${filename} créé`);
        resolve();
      },
      (error) => reject(error),
      { binary: true }
    );
  });
}

// 1. Créer un arbre stylisé (voxel style)
function createTree() {
  const group = new THREE.Group();

  // Tronc (marron)
  const trunkGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.3);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = 0.4;
  group.add(trunk);

  // Feuillage (3 niveaux de cubes verts)
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });

  // Niveau 1 (bas) - 3x3
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      if (x === 0 && z === 0) continue; // Centre vide pour le tronc
      const leafGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(x * 0.3, 0.9, z * 0.3);
      group.add(leaf);
    }
  }

  // Niveau 2 (milieu) - 3x3 complet
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      const leafGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(x * 0.3, 1.2, z * 0.3);
      group.add(leaf);
    }
  }

  // Niveau 3 (haut) - croix
  const topPositions = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
  topPositions.forEach(([x, z]) => {
    const leafGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(x * 0.3, 1.5, z * 0.3);
    group.add(leaf);
  });

  return group;
}

// 2. Créer un rocher (gris)
function createRock() {
  const group = new THREE.Group();
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.9
  });

  // Plusieurs cubes pour former un rocher irrégulier
  const positions = [
    { x: 0, y: 0.15, z: 0, scale: [0.5, 0.3, 0.5] },
    { x: 0.15, y: 0.2, z: 0.1, scale: [0.3, 0.4, 0.3] },
    { x: -0.12, y: 0.18, z: -0.08, scale: [0.35, 0.36, 0.35] },
    { x: 0.05, y: 0.1, z: -0.15, scale: [0.25, 0.2, 0.25] },
  ];

  positions.forEach((pos) => {
    const geometry = new THREE.BoxGeometry(...pos.scale);
    const rock = new THREE.Mesh(geometry, rockMaterial);
    rock.position.set(pos.x, pos.y, pos.z);
    rock.rotation.y = Math.random() * Math.PI;
    group.add(rock);
  });

  return group;
}

// 3. Créer une clôture (bois)
function createFence() {
  const group = new THREE.Group();
  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0xDEB887 });

  // 3 poteaux verticaux
  for (let i = 0; i < 3; i++) {
    const postGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.1);
    const post = new THREE.Mesh(postGeometry, woodMaterial);
    post.position.set((i - 1) * 0.4, 0.4, 0);
    group.add(post);
  }

  // 2 barres horizontales
  for (let i = 0; i < 2; i++) {
    const barGeometry = new THREE.BoxGeometry(1, 0.08, 0.08);
    const bar = new THREE.Mesh(barGeometry, woodMaterial);
    bar.position.set(0, 0.3 + i * 0.3, 0);
    group.add(bar);
  }

  return group;
}

// 4. Créer un buisson
function createBush() {
  const group = new THREE.Group();
  const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F2F });

  // Forme arrondie avec plusieurs cubes
  const positions = [
    { x: 0, y: 0.2, z: 0 },
    { x: 0.2, y: 0.2, z: 0 },
    { x: -0.2, y: 0.2, z: 0 },
    { x: 0, y: 0.2, z: 0.2 },
    { x: 0, y: 0.2, z: -0.2 },
    { x: 0, y: 0.4, z: 0 },
  ];

  positions.forEach((pos) => {
    const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const bush = new THREE.Mesh(geometry, bushMaterial);
    bush.position.set(pos.x, pos.y, pos.z);
    group.add(bush);
  });

  return group;
}

// 5. Créer une lampe
function createLamp() {
  const group = new THREE.Group();

  // Poteau (noir)
  const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = 0.6;
  group.add(pole);

  // Lampe (jaune lumineux)
  const lampGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.2);
  const lampMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFF88,
    emissive: 0xFFFF00,
    emissiveIntensity: 0.5
  });
  const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.y = 1.2;
  group.add(lamp);

  return group;
}

// Générer tous les modèles
async function generateAll() {
  console.log('Génération des modèles GLB de test...\n');

  try {
    await exportModel(createTree(), 'tree.glb');
    await exportModel(createRock(), 'rock.glb');
    await exportModel(createFence(), 'fence.glb');
    await exportModel(createBush(), 'bush.glb');
    await exportModel(createLamp(), 'lamp.glb');

    console.log('\n✓ Tous les modèles ont été créés dans public/models/test/');
    console.log('Vous pouvez maintenant les utiliser dans decorations.ts');
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
  }
}

generateAll();
