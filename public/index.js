import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';


// Create an empty scene
const scene = new THREE.Scene();

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Create a Cube Mesh with basic material
const geometry = new THREE.BoxGeometry( 2, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "#A33F81" } );
const cube = new THREE.Mesh( geometry, material );

window.scene = scene;
window.cube = cube;

cube.material.wireframe = true;

// Add cube to Scene
scene.add( cube );

// Set the initial camera position and target
camera.position.set(0, 0, 5); // Set the initial camera position (e.g., 5 units along the Z-axis)
camera.lookAt(0, 0, 0); // Set the point the camera will look at initially (e.g., the origin)

const control = new OrbitControls(camera, renderer.domElement);

// Render Loop
var render = function () {
  requestAnimationFrame( render );

 //cube.rotation.x += 0.01;
 //cube.rotation.y += 0.01;
 
  // Render the scene
  renderer.render(scene, camera);
  control.update();
  
};

render();