import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { createTheCube } from './objects.js';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x505050);

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add VR button
document.body.appendChild(VRButton.createButton(renderer));

// Create cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ 
    color: 0xff0000,
    flatShading: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


var theCube = createTheCube();
scene.add(theCube);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// XR Controllers and Hands setup
const controllers = [];
const controllerGrips = [];
const hands = [];

// Controller Model Factory
const controllerModelFactory = new XRControllerModelFactory();
const handModelFactory = new XRHandModelFactory();

// Controller setup
for (let i = 0; i < 2; i++) {
    // Add controller
    const controller = renderer.xr.getController(i);
    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
    scene.add(controller);
    controllers.push(controller);

    // Add controller grip (visual model of the controller)
    const controllerGrip = renderer.xr.getControllerGrip(i);
    controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
    scene.add(controllerGrip);
    controllerGrips.push(controllerGrip);

    // Add hand
    const hand = renderer.xr.getHand(i);
    hand.add(handModelFactory.createHandModel(hand, 'mesh'));
    scene.add(hand);
    hands.push(hand);
}

// Add controller ray visualization
controllers.forEach((controller) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1)
    ]);
    const line = new THREE.Line(geometry);
    line.name = 'line';
    line.scale.z = 5;
    controller.add(line);
});

// Raycaster for selection
const raycaster = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();
let intersected = [];

function onSelectStart(event) {
    const controller = event.target;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        const intersection = intersections[0];
        const object = intersection.object;
        object.material.emissive.b = 1;
        controller.attached = object;
    }
}

function onSelectEnd(event) {
    const controller = event.target;
    if (controller.attached !== undefined) {
        controller.attached.material.emissive.b = 0;
        controller.attached = undefined;
    }
}

function getIntersections(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    return raycaster.intersectObjects(scene.children, true);
}

function handleController(controller) {
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
        if (controller.userData.selected !== undefined) {
            const object = controller.userData.selected;
            object.material.emissive.b = 0;
            controller.userData.selected = undefined;
        }

        const intersection = intersections[0];
        const object = intersection.object;
        if (object !== undefined && object.material !== undefined && object.material.emissive !== undefined) {
            object.material.emissive.b = 0.5;
            controller.userData.selected = object;
        }
    } else {
        if (controller.userData.selected !== undefined) {
            const object = controller.userData.selected;
            object.material.emissive.b = 0;
            controller.userData.selected = undefined;
        }
    }
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    // Handle controller interactions
    controllers.forEach((controller) => {
        handleController(controller);
    });

    // Handle hand tracking
    hands.forEach((hand) => {
        if (hand.joints['index-finger-tip']) {
            const indexTip = hand.joints['index-finger-tip'];
            raycaster.ray.origin.setFromMatrixPosition(indexTip.matrixWorld);
            raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix.identity().extractRotation(indexTip.matrixWorld));
            
            const intersections = raycaster.intersectObjects(scene.children, true);
            if (intersections.length > 0) {
                const intersection = intersections[0];
                const object = intersection.object;
                object.material.emissive.r = 0.5;
            }
        }
    });

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate(); 