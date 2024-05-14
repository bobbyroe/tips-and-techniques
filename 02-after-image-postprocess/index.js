import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from 'jsm/postprocessing/AfterimagePass.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// post-processing
const renderScene = new RenderPass(scene, camera);
const afterImagePass = new AfterimagePass();
afterImagePass.uniforms["damp"].value = 0.98;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(afterImagePass);

const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.01;
  mesh.rotation.y += 0.02;
  composer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);