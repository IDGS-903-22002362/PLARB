'use client';

import { useEffect, useRef, useState } from 'react';
import { MoveUpRight } from 'lucide-react';

export default function Sculpture({ paused }: { paused: boolean }) {
  const mountRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(paused);
  const controlRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  );

  useEffect(() => {
    pausedRef.current = paused;
    controlRef.current?.();
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      const THREE = await import('three');
      const { RoomEnvironment } =
        await import('three/addons/environments/RoomEnvironment.js');
      if (cancelled || !mount) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        });
      } catch {
        setStatus('fallback');
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.6;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
      camera.position.set(0, 0, 14.5);
      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(environment, 0.04);
      scene.environment = environmentTarget.texture;
      environment.dispose();
      pmrem.dispose();

      const group = new THREE.Group();
      group.rotation.set(0.35, -0.35, -0.4);
      scene.add(group);

      const chrome = new THREE.MeshPhysicalMaterial({
        color: 0xc0c4c6,
        metalness: 1,
        roughness: 0.19,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      });
      const knotGeometry = new THREE.TorusKnotGeometry(
        1.85,
        0.56,
        240,
        40,
        2,
        3,
      );
      const knot = new THREE.Mesh(knotGeometry, chrome);
      group.add(knot);

      const orange = new THREE.MeshPhysicalMaterial({
        color: 0xff4a0c,
        metalness: 0.28,
        roughness: 0.18,
        clearcoat: 1,
      });
      const orbGeometry = new THREE.SphereGeometry(0.58, 48, 32);
      const orb = new THREE.Mesh(orbGeometry, orange);
      orb.position.set(2.6, 1.85, 0.8);
      group.add(orb);
      const smallOrbGeometry = new THREE.SphereGeometry(0.17, 24, 16);
      const smallOrb = new THREE.Mesh(smallOrbGeometry, orange);
      smallOrb.position.set(-2.65, -1.8, 1.1);
      group.add(smallOrb);

      const fill = new THREE.DirectionalLight(0xfff8ed, 4);
      fill.position.set(3, 5, 5);
      scene.add(fill);
      const rim = new THREE.PointLight(0xff641e, 20, 15);
      rim.position.set(-4, -2, 3);
      scene.add(rim);

      mount.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.style.touchAction = 'pan-y';
      let visible = true;
      let dragging = false;
      let previousX = 0;
      let previousY = 0;
      let targetX = 0;
      let targetY = 0;
      let elapsed = 0;
      let lastTime = 0;
      let frame = 0;
      const render = () => renderer.render(scene, camera);
      const draw = (time: number) => {
        frame = 0;
        const delta = Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        elapsed += delta;
        if (!dragging) {
          group.rotation.y += delta * 0.105;
          group.rotation.x +=
            (0.35 + targetY * 0.12 - group.rotation.x) * 0.025;
          group.rotation.z +=
            (-0.4 + targetX * 0.08 - group.rotation.z) * 0.025;
        }
        group.position.y = Math.sin(elapsed * 0.65) * 0.12;
        orb.position.y = 1.85 + Math.sin(elapsed * 0.9) * 0.2;
        render();
        if (visible && !document.hidden && !pausedRef.current)
          frame = requestAnimationFrame(draw);
      };
      const sync = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        render();
        if (visible && !document.hidden && !pausedRef.current) {
          lastTime = performance.now();
          frame = requestAnimationFrame(draw);
        }
      };
      controlRef.current = sync;
      const resize = new ResizeObserver(() => {
        const { width, height } = mount.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        render();
      });
      resize.observe(mount);
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      observer.observe(mount);
      const onMove = (event: PointerEvent) => {
        if (pausedRef.current) return;
        const rect = mount.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        if (dragging) {
          group.rotation.y += (event.clientX - previousX) * 0.008;
          group.rotation.x += (event.clientY - previousY) * 0.008;
          previousX = event.clientX;
          previousY = event.clientY;
        }
      };
      const onDown = (event: PointerEvent) => {
        if (pausedRef.current || event.pointerType === 'touch') return;
        dragging = true;
        previousX = event.clientX;
        previousY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
      };
      const onUp = () => {
        dragging = false;
      };
      const onContextLost = (event: Event) => {
        event.preventDefault();
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        visible = false;
        setStatus('fallback');
      };
      renderer.domElement.addEventListener('pointermove', onMove);
      renderer.domElement.addEventListener('pointerdown', onDown);
      renderer.domElement.addEventListener('pointerup', onUp);
      renderer.domElement.addEventListener('pointercancel', onUp);
      renderer.domElement.addEventListener('webglcontextlost', onContextLost);
      document.addEventListener('visibilitychange', sync);
      setStatus('ready');
      sync();
      cleanup = () => {
        if (frame) cancelAnimationFrame(frame);
        controlRef.current = null;
        resize.disconnect();
        observer.disconnect();
        document.removeEventListener('visibilitychange', sync);
        renderer.domElement.removeEventListener('pointermove', onMove);
        renderer.domElement.removeEventListener('pointerdown', onDown);
        renderer.domElement.removeEventListener('pointerup', onUp);
        renderer.domElement.removeEventListener('pointercancel', onUp);
        renderer.domElement.removeEventListener(
          'webglcontextlost',
          onContextLost,
        );
        knotGeometry.dispose();
        orbGeometry.dispose();
        smallOrbGeometry.dispose();
        chrome.dispose();
        orange.dispose();
        environmentTarget.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    initialize().catch(() => {
      if (!cancelled) setStatus('fallback');
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className={`sculpture ${status}`}>
      <div className="sculpture-coordinate top-coordinate">
        <span>FIG. 01 — CONEXIONES</span>
        <span>↗</span>
      </div>
      <figure
        ref={mountRef}
        className="sculpture-canvas"
        aria-label="Escultura abstracta 3D de metal pulido con esferas naranjas. Reacciona al cursor y se puede girar arrastrando."
      />
      {status !== 'ready' && (
        <div className="sculpture-fallback" aria-hidden="true">
          <span>web</span>
          <MoveUpRight />
          <span>apps</span>
          <MoveUpRight />
          <strong>APIs.</strong>
        </div>
      )}
      <div className="sculpture-shadow" aria-hidden="true" />
      <div className="sculpture-caption">
        <span className="crosshair">+</span>
        <span>
          {status === 'fallback'
            ? 'WEB · APPS · APIs'
            : paused
              ? 'ANIMACIÓN EN PAUSA'
              : 'MUEVE EL CURSOR O ARRASTRA PARA GIRAR.'}
        </span>
      </div>
    </div>
  );
}

