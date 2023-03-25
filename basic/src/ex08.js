import * as THREE from "three";
import gsap from "gsap";

function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true, // 계단 제거
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 화면
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  //  조명
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 5;
  light.position.z = 5;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    // 빛에 반응 x
    color: "red",
  });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  function draw() {
    renderer.render(scene, camera);
    // requestAnimationFrame(draw);
    meshes.forEach((item) => {
      item.rotation.y += THREE.MathUtils.degToRad(1);
    });

    renderer.setAnimationLoop(draw);
  }

  // gsap
  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

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
