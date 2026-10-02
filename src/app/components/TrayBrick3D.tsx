import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { LegoColor, applyStudioLighting, createBrickMesh, disposeObject } from "./Scene3D";

interface TrayBrick3DProps {
  color: LegoColor;
  /** Width and height of the canvas in CSS pixels */
  size?: number;
  /** Slowly turn the brick (tray display). Off for a brick held in the hand. */
  spin?: boolean;
}

/* All tray bricks share ONE WebGL renderer: each frame it renders every brick
   in turn and copies the pixels into that brick's own 2D canvas. Browsers cap
   live WebGL contexts (~16 on desktop, fewer on phones); a context per brick
   ran out and the browser dropped the oldest one — often the board's. */
interface Item { brick: THREE.Group; ctx: CanvasRenderingContext2D; px: number; spin: boolean }

let shared: { renderer: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.PerspectiveCamera; items: Set<Item>; raf: number } | null = null;

function getShared() {
  if (shared) return shared;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(1); // sizes below are already in device pixels
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  applyStudioLighting(scene, renderer);
  // Isometric-ish angle
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(1.8, 1.6, 1.8);
  camera.lookAt(0, 0.1, 0);
  shared = { renderer, scene, camera, items: new Set(), raf: 0 };
  return shared;
}

function renderAll() {
  if (!shared) return;
  const { renderer, scene, camera, items } = shared;
  if (!items.size) { shared.raf = 0; return; }
  shared.raf = requestAnimationFrame(renderAll);
  const canvas = renderer.domElement;
  const maxPx = Math.max(...[...items].map(i => i.px));
  if (canvas.width < maxPx || canvas.height < maxPx) renderer.setSize(maxPx, maxPx, false);
  for (const item of items) {
    if (item.spin) item.brick.rotation.y += 0.012;
    // Draw into the bottom-left px×px corner (GL origin), then copy it out
    renderer.setViewport(0, 0, item.px, item.px);
    renderer.setScissor(0, 0, item.px, item.px);
    renderer.setScissorTest(true);
    scene.add(item.brick);
    renderer.render(scene, camera);
    scene.remove(item.brick);
    item.ctx.clearRect(0, 0, item.px, item.px);
    item.ctx.drawImage(canvas, 0, canvas.height - item.px, item.px, item.px, 0, 0, item.px, item.px);
  }
}

export function TrayBrick3D({ color, size = 96, spin = true }: TrayBrick3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const px = Math.round(size * Math.min(window.devicePixelRatio, 2));
    canvas.width = px;
    canvas.height = px;

    const s = getShared();
    const item: Item = { brick: createBrickMesh(color), ctx, px, spin };
    s.items.add(item);
    if (!s.raf) s.raf = requestAnimationFrame(renderAll);

    return () => {
      s.items.delete(item);
      disposeObject(item.brick);
    };
  }, [color, size, spin]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      className="pointer-events-none"
    />
  );
}
