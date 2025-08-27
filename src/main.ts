import './style.css';
import {
  WebGLRenderer,
  Scene,
  Color,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Mesh,
  SphereGeometry,
  MeshStandardMaterial
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Text } from 'troika-three-text';
import { DepthPass } from './DepthPass';

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app')!.appendChild(renderer.domElement);

const scene = new Scene();
scene.background = new Color(0x222222);

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const ambient = new AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const directional = new DirectionalLight(0xffffff, 0.8);
directional.position.set(5, 5, 5);
scene.add(directional);

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshStandardMaterial({ color: 0x0088ff })
);
scene.add(sphere);

const text = new Text();
text.text = 'Troika Text';
text.fontSize = 0.5;
text.position.set(0, 0, 2);
text.anchorX = 'center';
text.anchorY = 'middle';
scene.add(text);
text.sync();

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
composer.addPass(ssaoPass);

// Uncomment the following line to visualize the scene depth
// composer.addPass(new DepthPass(scene, camera));

composer.addPass(new OutputPass());

function onWindowResize(): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
  ssaoPass.setSize(width, height);
}
window.addEventListener('resize', onWindowResize);

function animate(): void {
  requestAnimationFrame(animate);
  composer.render();
}

animate();
