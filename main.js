import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/FBXLoader.js";

const canvas = document.querySelector("#bg");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 5, 5);
scene.add(light);

const loader = new FBXLoader();

let baguette;

loader.load(
  "./baguette.fbx",             // <— Dein Modell liegt direkt im Root
  (object) => {
    baguette = object;
    baguette.scale.set(0.01, 0.01, 0.01);
    scene.add(baguette);
  },
  undefined,
  (err) => {
    console.error("FBX load error", err);
  }
);

function animate() {
  requestAnimationFrame(animate);

  if (baguette) {
    baguette.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();


