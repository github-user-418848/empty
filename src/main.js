import * as THREE from "three";
import { GLTFLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.144.0/examples/jsm/controls/OrbitControls.js';

var width = 500, height = 500, zoom = 10;
let scene, camera, renderer, controls, geometry, texture, material, object;
var container = document.getElementById("container");

function init() {

    scene = new THREE.Scene();
    const loader = new GLTFLoader();
    loader.load('/src/room.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
    }, undefined, function (error) {
        console.error(error);
    });


    camera = new THREE.PerspectiveCamera(zoom, width / height, 0.1, 1000);
    camera.position.set(-30, 20, 25);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2, 2, 2).copy(camera.position);
    light.target = scene;
    scene.add(light);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;
    controls.screenSpacePanning = false;
    controls.minDistance = 30;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function events() {
    window.onresize = function () {
        width = innerWidth, height = innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
}

init();
animate();
events();