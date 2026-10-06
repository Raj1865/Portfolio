import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Floating 3D coins + question blocks that drift and follow the mouse. */
export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const sun = new THREE.DirectionalLight(0xfff2c4, 1.6);
    sun.position.set(4, 6, 8);
    scene.add(sun);

    const gold = new THREE.MeshStandardMaterial({ color: 0xfee600, metalness: 0.55, roughness: 0.28 });
    const goldEdge = new THREE.MeshStandardMaterial({ color: 0xeb6325, metalness: 0.4, roughness: 0.4 });
    const blockMat = new THREE.MeshStandardMaterial({ color: 0xfee600, metalness: 0.15, roughness: 0.6 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xf03749, metalness: 0.2, roughness: 0.5 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x009146, metalness: 0.2, roughness: 0.5 });

    const items: { mesh: THREE.Object3D; baseY: number; speed: number; spin: number }[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // coins: gold disc with orange rim
    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 28);
    const rimGeo = new THREE.TorusGeometry(0.55, 0.09, 10, 28);
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group();
      const c = new THREE.Mesh(coinGeo, gold);
      c.rotation.x = Math.PI / 2;
      const rim = new THREE.Mesh(rimGeo, goldEdge);
      g.add(c, rim);
      g.position.set(rand(-9, 9), rand(-4, 4.5), rand(-4, 2));
      scene.add(g);
      items.push({ mesh: g, baseY: g.position.y, speed: rand(0.5, 1.2), spin: rand(0.8, 2) });
    }

    // question blocks: yellow cube with darker studs
    const boxGeo = new THREE.BoxGeometry(1.05, 1.05, 1.05);
    const studGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(boxGeo, blockMat));
      const mat = i % 2 ? redMat : greenMat;
      [[-0.36, 0.36], [0.36, 0.36], [-0.36, -0.36], [0.36, -0.36]].forEach(([x, y]) => {
        const s = new THREE.Mesh(studGeo, mat);
        s.position.set(x, y, 0.53);
        g.add(s);
      });
      g.position.set(rand(-9, 9), rand(-4, 4.5), rand(-4, 1));
      g.rotation.set(rand(0, 0.6), rand(0, 0.6), 0);
      scene.add(g);
      items.push({ mesh: g, baseY: g.position.y, speed: rand(0.4, 0.9), spin: rand(0.15, 0.45) });
    }

    // mouse parallax
    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      items.forEach((it, i) => {
        it.mesh.position.y = it.baseY + Math.sin(t * it.speed + i) * 0.45;
        it.mesh.rotation.y += 0.008 * it.spin;
        it.mesh.rotation.x += 0.003 * it.spin;
      });
      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (-target.y * 1.1 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      coinGeo.dispose(); rimGeo.dispose(); boxGeo.dispose(); studGeo.dispose();
      [gold, goldEdge, blockMat, redMat, greenMat].forEach((m) => m.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas-3d" aria-hidden />;
}
