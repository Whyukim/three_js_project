import * as THREE from "three";

function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true, // 계단 제거
  });
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
  camera.position.z = 5;
  scene.add(camera);

  //  조명
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 1;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    // 빛에 반응 x
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();
  function draw() {
    const time = clock.getDelta();

    // mesh.rotation.y += 0.01;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y += 2 * time;
    mesh.position.y += time;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // requestAnimationFrame(draw);
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

export default example;
