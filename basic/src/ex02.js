import * as THREE from "three";

function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
}

export default example;
