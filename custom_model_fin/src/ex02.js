import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import dat from "dat.gui";

// ----- 주제: glb 애니메이션

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.setClearColor(0xe5e5e5, 1);

  // gltf loader
  const gltfLoader = new GLTFLoader();
  let mixer;

  gltfLoader.load("/models/dog.glb", (gltf) => {
    // console.log(gltf.scene.children[0]);
    const ilbuniMesh = gltf.scene;
    scene.add(ilbuniMesh);

    mixer = new THREE.AnimationMixer(ilbuniMesh);
    const actions = [];
    for (let i = 0; i < gltf.animations.length; i++) {
      actions.push(mixer.clipAction(gltf.animations[i]));
      actions[i].repetitions = 2;
      actions[i].clampWhenFinished = true;
    }
    actions[8].play();

    const gui = new dat.GUI();

    // actions 배열의 각 요소에 대해 GUI 컨트롤 추가
    const animationNames = []; // 애니메이션 이름을 담을 배열 생성
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      console.log(action._mixer._actions[i]._clip.name);
      animationNames.push(action._mixer._actions[i]._clip.name);
    }

    const selectBox = gui.addFolder("애니메이션 선택"); // select box를 담을 폴더 생성
    const animationController = selectBox.add(
      { animation: animationNames[0] },
      "animation",
      animationNames
    ); // select box 생성

    animationController.onChange((value) => {
      const selectedIndex = animationNames.indexOf(value);
      const selectedAction = actions[selectedIndex];
      mixer.stopAllAction(); // 현재 재생 중인 모든 애니메이션을 멈춤
      selectedAction.reset(); // 선택한 애니메이션의 재생 시간을 초기화
      selectedAction.play(); // 선택한 애니메이션을 플레이
    });
  });

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
