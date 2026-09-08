import * as THREE from 'three';
export type SceneController = {
  setActive: (value: boolean) => void;
  setMotion: (value: boolean) => void;
  dispose: () => void;
};
/** Demand-rendered scene: no permanent animation loop, remote textures or post-processing. */
export function createSystemScene(
  container: HTMLElement,
  onContextLost: () => void,
): SceneController {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: container.clientWidth > 500,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(
    Math.min(devicePixelRatio || 1, container.clientWidth < 500 ? 1.25 : 1.6),
  );
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(6.5, 5.4, 7.5);
  camera.lookAt(0, -0.05, 0);
  const assembly = new THREE.Group();
  scene.add(assembly);
  scene.add(new THREE.AmbientLight(0x91b8eb, 2));
  const key = new THREE.DirectionalLight(0xc1d8ff, 5);
  key.position.set(4, 7, 2);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x3fe1d3, 3);
  rim.position.set(-5, 1, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0x4c8dff, 4);
  fill.position.set(2, -3, 5);
  scene.add(fill);
  const resources: { dispose: () => void }[] = [];
  const material = (color: number, metalness = 0.6, roughness = 0.32) => {
    const item = new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
    });
    resources.push(item);
    return item;
  };
  const panelMaterial = material(0x17375b, 0.75, 0.3);
  const darkMaterial = material(0x081522, 0.6, 0.3);
  const blueMaterial = material(0x438bff, 0.5, 0.24);
  const silverMaterial = material(0x82a9cd, 0.72, 0.26);
  const cyanMaterial = new THREE.MeshStandardMaterial({
    color: 0x39d0c8,
    emissive: 0x127772,
    emissiveIntensity: 0.7,
    metalness: 0.35,
    roughness: 0.35,
  });
  resources.push(cyanMaterial);
  const borderMaterial = new THREE.LineBasicMaterial({
    color: 0x548de1,
    transparent: true,
    opacity: 0.7,
  });
  resources.push(borderMaterial);
  const interfaceLayer = new THREE.Group();
  const servicesLayer = new THREE.Group();
  const dataLayer = new THREE.Group();
  assembly.add(interfaceLayer, servicesLayer, dataLayer);
  const box = (
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    outline = false,
    parent: THREE.Object3D = assembly,
  ) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    resources.push(geometry);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    if (outline) {
      const edge = new THREE.EdgesGeometry(geometry);
      resources.push(edge);
      mesh.add(new THREE.LineSegments(edge, borderMaterial));
    }
    return mesh;
  };
  const planes = [dataLayer, servicesLayer, interfaceLayer];
  [-1.55, 0, 1.55].forEach((y, layer) => {
    const parent = planes[layer];
    box(4.1, 0.13, 2.9, panelMaterial, 0, y, 0, true, parent);
    box(3.95, 0.035, 0.025, cyanMaterial, 0, y + 0.08, 1.45, false, parent);
    for (let i = 0; i < 5; i++)
      box(
        0.055,
        0.05,
        0.055,
        layer === 1 ? cyanMaterial : blueMaterial,
        -1.7 + i * 0.14,
        y + 0.105,
        1.24,
        false,
        parent,
      );
    for (const x of [-1.85, 1.85])
      for (const z of [-1.25, 1.25])
        box(0.085, 0.04, 0.085, silverMaterial, x, y + 0.095, z, false, parent);
  });
  // Frontend surface: a browser-like frame and intentional content regions.
  box(3.45, 0.055, 2.22, darkMaterial, 0, 1.66, -0.02, false, interfaceLayer);
  box(3.3, 0.035, 0.16, silverMaterial, 0, 1.71, -0.99, false, interfaceLayer);
  box(1.2, 0.09, 1.6, blueMaterial, -0.98, 1.72, 0.04, true, interfaceLayer);
  box(1.66, 0.05, 0.16, silverMaterial, 0.63, 1.73, -0.56, false, interfaceLayer);
  box(1.66, 0.05, 0.1, silverMaterial, 0.63, 1.73, -0.29, false, interfaceLayer);
  box(1.14, 0.05, 0.1, silverMaterial, 0.37, 1.73, -0.05, false, interfaceLayer);
  box(0.65, 0.08, 0.32, cyanMaterial, 0.12, 1.74, 0.52, true, interfaceLayer);
  // Backend nodes share one geometric vocabulary.
  for (const x of [-1.2, 0, 1.2]) {
    box(0.8, 0.28, 0.94, darkMaterial, x, 0.23, 0, true, servicesLayer);
    box(0.57, 0.06, 0.57, blueMaterial, x, 0.41, 0, false, servicesLayer);
    box(0.21, 0.06, 0.21, cyanMaterial, x, 0.47, 0, false, servicesLayer);
  }
  // Database canisters, without high polygon geometry.
  for (const x of [-1.1, 1.1]) {
    for (let tier = 0; tier < 3; tier++) {
      const geometry = new THREE.CylinderGeometry(0.53, 0.53, 0.2, 24);
      resources.push(geometry);
      const mesh = new THREE.Mesh(
        geometry,
        tier === 2 ? blueMaterial : darkMaterial,
      );
      mesh.position.set(x, -1.35 + tier * 0.23, 0);
      dataLayer.add(mesh);
      const ring = new THREE.TorusGeometry(0.53, 0.018, 5, 24);
      resources.push(ring);
      const ringMesh = new THREE.Mesh(ring, cyanMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(x, -1.25 + tier * 0.23, 0);
      dataLayer.add(ringMesh);
    }
  }
  // Vertical buses communicate the relationship between the three planes.
  for (const x of [-1.8, 1.8]) {
    const points = [
      new THREE.Vector3(x, -1.5, -1.1),
      new THREE.Vector3(x, 1.55, -1.1),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    resources.push(geometry);
    assembly.add(new THREE.Line(geometry, borderMaterial));
    for (const y of [-0.9, 0.8])
      box(0.09, 0.18, 0.09, cyanMaterial, x, y, -1.1);
  }
  let active = true;
  let motion = true;
  let disposed = false;
  let frame = 0;
  let targetX = 0;
  let targetY = -0.08;
  assembly.rotation.y = -0.22;
  const render = () => {
    frame = 0;
    if (!active || disposed) return;
    const x = motion ? targetX : 0;
    const y = motion ? targetY : -0.08;
    assembly.rotation.x += (x - assembly.rotation.x) * 0.08;
    assembly.rotation.y += (y - assembly.rotation.y) * 0.08;
    renderer.render(scene, camera);
    if (
      motion &&
      Math.abs(x - assembly.rotation.x) + Math.abs(y - assembly.rotation.y) >
        0.0005
    )
      schedule();
  };
  const schedule = () => {
    if (!frame && active && !disposed) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.position.set(6.5, 5.4, 7.5).multiplyScalar(w < 420 ? 1.09 : 1);
    camera.updateProjectionMatrix();
    schedule();
  };
  const pointer = (event: PointerEvent) => {
    if (!motion || event.pointerType === 'touch') return;
    const bounds = container.getBoundingClientRect();
    targetY =
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.34 - 0.08;
    targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.12;
    schedule();
  };
  const reset = () => {
    targetX = 0;
    targetY = -0.08;
    schedule();
  };
  const scroll = () => {
    if (!motion || !active) return;
    const bounds = container.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, -bounds.top / Math.max(innerHeight * 0.72, 1)),
    );
    const spread =
      progress < 0.58 ? progress / 0.58 : 1 - (progress - 0.58) / 0.42;
    interfaceLayer.position.y = spread * 0.42;
    dataLayer.position.y = -spread * 0.38;
    servicesLayer.position.y = spread * 0.04;
    targetX = Math.max(-0.1, Math.min(0.16, progress * 0.14));
    schedule();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    active = false;
    cancelAnimationFrame(frame);
    onContextLost();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  container.addEventListener('pointermove', pointer);
  container.addEventListener('pointerleave', reset);
  window.addEventListener('scroll', scroll, { passive: true });
  renderer.domElement.addEventListener('webglcontextlost', lost);
  resize();
  return {
    setActive(value) {
      active = value;
      if (value) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    setMotion(value) {
      motion = value;
      if (!motion) {
        assembly.rotation.set(0, -0.08, 0);
      }
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', pointer);
      container.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', scroll);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
