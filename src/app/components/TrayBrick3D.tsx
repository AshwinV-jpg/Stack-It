import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { LegoColor, applyStudioLighting, createBrickMesh } from "./Scene3D";

interface TrayBrick3DProps {
  color: LegoColor;
  /** Width and height of the canvas in CSS pixels */
  size?: number;
}

export function TrayBrick3D({ color, size = 96 }: TrayBrick3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = size;
    const h = size;

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null; // transparent

    // ── Camera: isometric-ish angle ──────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(1.8, 1.6, 1.8);
    camera.lookAt(0, 0.1, 0);

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────────────────────
    const lighting = applyStudioLighting(scene, renderer);

    // ── Brick ─────────────────────────────────────────────────────────────────
    const brick = createBrickMesh(color);
    scene.add(brick);

    // ── Render loop with slow rotation ───────────────────────────────────────
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      brick.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      lighting.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [color, size]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size, flexShrink: 0 }}
      className="pointer-events-none"
    />
  );
}
