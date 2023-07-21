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

// Create a second Cube Mesh with basic material
const geometry2 = new THREE.BoxGeometry( 0.5, 0.5, 2,10,10,10)
const material2 = new THREE.MeshBasicMaterial( { color: "#0000ff" } );
const cube2 = new THREE.Mesh( geometry2, material2 );



// Array to store profile points
const profilePoints = [
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(-0.5, 1, 0),
  new THREE.Vector3(0.5, 1, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, -1, 0),
];

  // Extend the profile in the third dimension (z-axis)
  let profileZ = 2; // Change this value to adjust the height in the third dimension

  // Function to update the profileZ value when the input field changes
  function updateProfileZ() {
    const profileZInput = document.getElementById('profileZInput');
    profileZ = parseFloat(profileZInput.value);
    extendProfile(); // Call the function to update the 3D profile with the new profileZ value
  }
  
  // Add an event listener to handle the change event on the input field
  const profileZInput = document.getElementById('profileZInput');
  profileZInput.addEventListener('input', updateProfileZ);
  

// Create the 2D profile geometry
const profileGeometry = new THREE.BufferGeometry().setFromPoints(profilePoints);
  
// Create the 2D profile material
const profileMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

// Create the 2D profile mesh and add it to the scene
const profileMesh = new THREE.LineLoop(profileGeometry, profileMaterial);

 // Function to extend the profile
 function extendProfile() {
  // Remove the existing 3D profile mesh from the scene (if exists)
  if (scene.getObjectByName('profileMesh3D')) {
    scene.remove(scene.getObjectByName('profileMesh3D'));
  }

  // Extend the profile in the third dimension (z-axis)
  const extrudeSettings = { depth: profileZ, bevelEnabled: false };
  const profileShape = new THREE.Shape(profilePoints);
  const profileGeometry3D = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  const profileMesh3D = new THREE.Mesh(profileGeometry3D, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  profileMesh3D.name = 'profileMesh3D'; // Give it a name so we can remove it later
  scene.add(profileMesh3D);
}

// Call the function to extend the initial 2D profile to 3D
extendProfile();

window.scene = scene;
window.cube = cube;
window.cube2 = cube2;


cube.material.wireframe = true;


// Add cube to Scene
scene.add( cube );
// scene.add( cube2 );
scene.add(profileMesh);

// Add axes to Scene
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


  

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