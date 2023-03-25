import * as THREE from "three";

function example() {
  // const renderer = new THREE.WebGLRenderer();

  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75, // 시야각(field of view)
  //     window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //     0.1, // near
  //     1000 // far
  //   );
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight),
    window.innerWidth / window.innerHeight,
    1,
    -1,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();
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
}

export default example;
