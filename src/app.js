import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer, camera, controls, scene, cube;

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.lighting();
    this.addObjects();
    this.animate();
  }

  sceneSetup = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8fbcd4);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    controls = new OrbitControls(camera, this.el);
    controls.enableZoom = true;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    this.mount.appendChild(renderer.domElement);
    window.addEventListener("resize", this.handleWindowResize);
  };

  addObjects = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x20b2aa });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  };

  lighting = () => {
    // Create a directional light
    const light = new THREE.DirectionalLight(0xffffff, 5.0);

    // move the light back and up a bit
    light.position.set(5, 5, 5);

    // remember to add the light to the scene
    scene.add(light);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  handleWindowResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    controls.dispose();
  }

  render() {
    return <div ref={el => (this.mount = el)} />;
  }
}

export default App;
