// Import required modules from Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append renderer's DOM element to the document body
document.body.appendChild(renderer.domElement);

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 1000);

// const tabWidths = window.innerWidth;
// if (tabWidths > 800){
//   camera.position.set(0, 7.5, 0);
// } else {
//   camera.position.set(0, 12.5, 0);
// }


// Function to calculate and set camera distance based on tab width
function updateCameraDistance() {
  const tabWidth = window.innerWidth;
  if (tabWidth > 800) {
    const scaleFactor = -1 * (1 - (tabWidth - 600) / 400);
    Math.abs(scaleFactor);
    const newDistance = 90 / scaleFactor;
    if(tabWidth <= 1200){
      camera.position.set(5, 170, 0);
    }else{
    camera.position.set(0, newDistance, 0);
  }
  } else if (tabWidth <= 800) {
    camera.position.set(0, 170, 0);
  }
}

// Call the function when the tab is initially loaded
updateCameraDistance();

// Update camera aspect ratio and renderer size on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Call the function to update camera distance
  updateCameraDistance();
});

// Initialize OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 20;
controls.maxDistance = 170;
controls.minPolarAngle = 0;
controls.maxPolarAngle = 5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

// Load the 3D model using GLTFLoader
const loader = new GLTFLoader().setPath('public/3dModel/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  // Set position and rotation of the loaded model
  mesh.position.set(0, 0, 0);
  camera.lookAt(0, 0, 0);

  scene.add(mesh);

  // Hide the loading progress container
  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

// Function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

