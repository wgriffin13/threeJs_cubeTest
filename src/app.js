import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.lighting();
    this.addObjects();
    this.animate();
  }

  sceneSetup = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff); // white background
    // this.scene.background = new THREE.Color(0x000000); // black background

    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 7;

    this.controls = new OrbitControls(this.camera, this.el);
    this.controls.enableZoom = true;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.mount.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.handleWindowResize);
  };

  lighting = () => {
    // Directional Light
    // const light = new THREE.DirectionalLight(0xffffff, 3.0);
    // light.position.set(5, 5, 5);
    // scene.add(light);

    // Ambient Light
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    //Green
    const pointLight = new THREE.PointLight(0x1bc236, 1);
    pointLight.position.x = 800;
    pointLight.position.z = 300;
    this.scene.add(pointLight);

    //Red
    const pointLight2 = new THREE.PointLight(0xfb3f3f, 1);
    pointLight2.position.x = -8;
    pointLight2.position.z = 3;
    this.scene.add(pointLight2);

    //Blue
    const pointLight3 = new THREE.PointLight(0x0000ff, 1);
    pointLight3.position.y = 8;
    pointLight3.position.z = 3;
    this.scene.add(pointLight3);

    //Cyan
    const pointLight4 = new THREE.PointLight(0x00f6ff, 1);
    pointLight4.position.y = -8;
    pointLight4.position.z = 3;
    this.scene.add(pointLight4);
  };

  addObjects = () => {
    const geometryOne = new THREE.BoxBufferGeometry(1, 1, 1);
    const materialOne = new THREE.MeshStandardMaterial({
      color: 0xababab,
      metalness: 0.5,
      roughness: 0.8
    });

    const materialTwo = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.97,
      roughness: 0.3
    });

    const textureLoader = new THREE.TextureLoader();

    const materialThree = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    this.cubeThree = new THREE.Mesh(geometryOne, materialThree);
    this.cubeThree.position.x = -1.5;
    this.cubeThree.material.map = textureLoader.load(
      "http://localhost:3000/marble512px.jpg"
    );

    this.cubeOne = new THREE.Mesh(geometryOne, materialOne);
    this.cubeTwo = new THREE.Mesh(geometryOne, materialTwo);
    this.cubeTwo.position.x = 1.5;

    this.scene.add(this.cubeOne);
    this.scene.add(this.cubeTwo);
    this.scene.add(this.cubeThree);

    // GLTF Loader

    const gltfLoader = new GLTFLoader().setPath(
      "http://localhost:3000/theAppAge.glb"
    );
    gltfLoader.load(
      "theAppAge.glb",
      function(gltf) {
        this.scene.add(gltf.scene);
      },

      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },

      function(error) {
        console.log("An error happened");
      }
    );
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.cubeOne.rotation.x += 0.01;
    this.cubeOne.rotation.y += 0.01;
    this.cubeTwo.rotation.x += 0.01;
    this.cubeTwo.rotation.y += 0.01;
    this.cubeThree.rotation.x += 0.01;
    this.cubeThree.rotation.y += 0.01;

    // console.log(renderer.info.render.calls); //add right above the render call
    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  render() {
    return <div ref={el => (this.mount = el)} />;
  }
}

export default App;
