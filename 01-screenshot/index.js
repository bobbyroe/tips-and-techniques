import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0044ff);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// size = 50, segments = 10, bottom = true, lid = true, body = true, fitLid = true, blinn = true
// const geometry = new TeapotGeometry(1, 10, true, true, true, true, true);
// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const outlineMaterial = new THREE.MeshBasicMaterial({ 
  color: 0x000000, 
  side: THREE.BackSide,
});
const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
outlineMesh.scale.setScalar(1.05);
mesh.add(outlineMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.01;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
  controls.update();
}

animate();

// save to file
function saveImage() {
  renderer.render(scene, camera);
  let imgData = renderer.domElement.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.setAttribute("href", imgData);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", "canvas.png");
  link.click();
}
window.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    saveImage();
  }
});

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);