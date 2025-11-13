// super minimal three.js scene mit einem "baguette"-ähnlichen Objekt
const container = document.getElementById('canvas-wrap');

const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
container.appendChild(renderer.domElement);

// Licht
const hemi = new THREE.HemisphereLight(0xffffcc, 0x222244, 0.8);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(5, 10, 7);
scene.add(dir);

// Baguette = lange leicht konische Zylinder mit "Kruste"-Material
const length = 4.5;
const radiusTop = 0.35;
const radiusBottom = 0.45;
const radialSegments = 32;
const heightSegments = 30;
const baguetteGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, radialSegments, heightSegments);

// leichte Biegung: verschiebe Scheitelpunkte ein bisschen
const pos = baguetteGeo.attributes.position;
for (let i = 0; i < pos.count; i++) {
  const y = pos.getY(i); // entlang Höhe
  // sinusförmige leichte Krümmung
  const bend = 0.12 * Math.sin((y / length) * Math.PI * 2);
  pos.setX(i, pos.getX(i) + bend);
  // kleine zufällige Kruste-Unebenheit
  const noise = (Math.random() - 0.5) * 0.02;
  pos.setZ(i, pos.getZ(i) + noise);
}
pos.needsUpdate = true;
baguetteGeo.computeVertexNormals();

// Material: einfaches MeshStandardMaterial mit warmem Farbton
const baguetteMat = new THREE.MeshStandardMaterial({
  color: 0xd7a56b,
  metalness: 0.05,
  roughness: 0.7
});

const baguette = new THREE.Mesh(baguetteGeo, baguetteMat);
baguette.rotation.z = Math.PI / 2; // horizontal legen
scene.add(baguette);

// kleiner "boden" für Schatten-Optik (nur visuell)
const groundGeo = new THREE.CircleGeometry(6, 32);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x071020, roughness: 1, metalness: 0 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2.2;
scene.add(ground);

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation: langsames Drehen + leichte Wobble-Animation
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;
  baguette.rotation.y += 0.007;           // kontinuierliches Drehen
  baguette.rotation.z = Math.sin(t * 0.6) * 0.05 + Math.PI / 2; // leichter Wobble
  renderer.render(scene, camera);
}
animate();
