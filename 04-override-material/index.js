import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'jsm/geometries/TeapotGeometry.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true, wireframeLinewidth: 1, wireframeLinecap: 'round', wireframeLinejoin: 'round' });
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// size = 50, segments = 10, bottom = true, lid = true, body = true, fitLid = true, blinn = true
const geometry = new TeapotGeometry(1, 4, true, true, true, true, true);
// const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.scale.setScalar(0.02);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);