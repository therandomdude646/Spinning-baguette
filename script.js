const container = document.getElementById("canvas-wrap");

const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Licht
const hemi = new THREE.HemisphereLight(0xffffff, 0x222244, 1);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 1.2);
dir.position.set(5, 10, 7);
scene.add(dir);

// FBX Loader
const loader = new THREE.FBXLoader();
let baguette = null;

// FBX liegt im ROOT → "./baguette.fbx"
loader.load(
  "./baguette.fbx",
  function (object) {
    baguette = object;

    // meistens ist ein FBX viel zu groß → runter skalieren
    baguette.scale.set(0.01, 0.01, 0.01);

    scene.add(baguette);
  },
  undefined,
  function (error) {
    console.error("FBX konnte nicht geladen werden:", error);
  }
);

// Fenster-Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  if (baguette) {
    baguette.rotation.y += 0.01; // spin spin uwu
  }

  renderer.render(scene, camera);
}
animate();

