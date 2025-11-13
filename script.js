const container = document.getElementById("canvas-wrap");

const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Licht
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 1.4);
dir.position.set(3, 10, 10);
scene.add(dir);

// FBX Loader
const loader = new THREE.FBXLoader();

let baguette = null;

// FBX liegt im ROOT → "./baguette.fbx"
loader.load(
  "./baguette.fbx",
  (object) => {
    baguette = object;

    // Falls gigantisch → runterskalieren
    baguette.scale.set(0.01, 0.01, 0.01);

    baguette.position.set(0, 0, 0);

    scene.add(baguette);
  },
  (xhr) => {
    console.log(`Laden: ${((xhr.loaded / xhr.total) * 100).toFixed(0)}%`);
  },
  (err) => {
    console.error("FBX Ladefehler:", err);
  }
);

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (baguette) {
    baguette.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();

