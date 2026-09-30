import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type LegoColor = "red" | "blue" | "yellow" | "green" | "orange" | "purple" | "cyan";

// Brighter, more iconic Lego-style colors
export const LEGO_COLORS_3D: Record<LegoColor, string> = {
  red: "#ef3f54",
  blue: "#5851ee",
  yellow: "#fdc73e",
  green: "#00bfa6",
  orange: "#ff8800",
  purple: "#5d00a3",
  cyan: "#3ec1ff",
};

export interface GridCell3D {
  row: number;
  col: number;
  height: number;
  color: LegoColor;
}

interface Scene3DProps {
  grid: GridCell3D[];
  size: number;
  isInteractive?: boolean;
  onPlaceBlock?: (row: number, col: number) => void;
  selectedColor?: LegoColor | null;
  movingBlock?: GridCell3D | null;
  phase: string;
  transparent?: boolean;
}

export function Scene3D({ grid, size, isInteractive, onPlaceBlock, selectedColor, movingBlock, phase, transparent }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const bricksGroupRef = useRef<THREE.Group | null>(null);
  const hoverBrickRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const moveOverlayRef = useRef<{ outline: THREE.LineSegments; icon: THREE.Sprite } | null>(null);
  const pulseTimeRef = useRef(0);

  const offset = (size - 1) / 2;
  const BRICK_HEIGHT = 0.4;

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = transparent ? null : new THREE.Color("#f1f5f9"); // Light slate background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(6, 6, 6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2.1;
    controlsRef.current = controls;

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    scene.add(dirLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.3);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    // ── Lego-style 3D baseplate ───────────────────────────────────────────────────
    // MeshBasicMaterial → colours are EXACT hex values regardless of lighting,
    // matching the Figma design (top #F1F5F9, sides #D9D9D9, edges black).
    const plateW   = size + 2;    // 1 unit border on every side beyond the grid
    const plateTh  = 0.45;        // visible plate thickness
    const plateTopY = -0.2;       // top surface level = brick bottom level

    const mkFlat = (hex: number) => new THREE.MeshBasicMaterial({ color: hex });

    // BoxGeometry face order: +x, -x, +y (top), -y (bottom), +z, -z
    const plateGeo  = new THREE.BoxGeometry(plateW, plateTh, plateW);
    const plateMats = [
      mkFlat(0xd9d9d9),   // +x side  — Figma #D9D9D9
      mkFlat(0xd9d9d9),   // -x side
      mkFlat(0xf1f5f9),   // +y top   — Figma #F1F5F9 (lightest)
      mkFlat(0x9aa6b4),   // -y bottom — darkest underside
      mkFlat(0xd9d9d9),   // +z front
      mkFlat(0xd9d9d9),   // -z back
    ];

    const plate = new THREE.Mesh(plateGeo, plateMats);
    plate.position.y = plateTopY - plateTh * 0.5;
    scene.add(plate);

    // Black edge outlines around the whole plate — Figma stroke="black"
    const plateEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(plateGeo),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    plateEdges.position.copy(plate.position);
    scene.add(plateEdges);

    // ── 3×3 (or size×size) grid lines on the plate top ───────────────────────
    // GridHelper(totalSize, divisions) draws (divisions+1) lines in each axis.
    // Both colour params set to #B5B5B5 to match Figma stroke="#B5B5B5".
    const gridHelper = new THREE.GridHelper(size, size, 0xb5b5b5, 0xb5b5b5);
    gridHelper.position.y = plateTopY + 0.005; // just above plate to prevent z-fight
    scene.add(gridHelper);

    // ── Per-cell labels: G1, G2 … G(size²) ──────────────────────────────────
    // Placed at the near-corner of every cell (−0.35 offset in x & z) so
    // they sit on the grid edge, not the centre, and don't clash with bricks.
    const cellOffset = (size - 1) / 2;
    const labelY = plateTopY + 0.015;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const num   = row * size + col + 1;
        const label = createGridLabel(`G${num}`);
        label.position.set(
          row - cellOffset - 0.35,
          labelY,
          col - cellOffset - 0.35,
        );
        scene.add(label);
      }
    }

    const bricksGroup = new THREE.Group();
    scene.add(bricksGroup);
    bricksGroupRef.current = bricksGroup;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      // Pulse the move overlay (green outline + icon)
      if (moveOverlayRef.current) {
        pulseTimeRef.current += 0.05;
        const p = 0.5 + 0.5 * Math.sin(pulseTimeRef.current * 4);
        const mat = moveOverlayRef.current.outline.material as THREE.LineBasicMaterial;
        mat.opacity = 0.45 + 0.55 * p;
        (moveOverlayRef.current.icon.material as THREE.SpriteMaterial).opacity = 0.7 + 0.3 * p;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size, transparent]);

  // Update Bricks rendering including stack logic
  useEffect(() => {
    if (!bricksGroupRef.current) return;
    
    while(bricksGroupRef.current.children.length > 0){ 
      const child = bricksGroupRef.current.children[0];
      if (child instanceof THREE.Group) {
        child.children.forEach(c => {
          if (c instanceof THREE.Mesh) {
            c.geometry.dispose();
            if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
            else c.material.dispose();
          }
        });
      }
      bricksGroupRef.current.remove(child); 
    }

    grid.forEach((cell) => {
      const brick = createBrickMesh(cell.color);
      // Height stacking: each brick is 0.4 units high
      brick.position.set(cell.row - offset, cell.height * BRICK_HEIGHT, cell.col - offset);
      bricksGroupRef.current?.add(brick);
    });
  }, [grid, offset, BRICK_HEIGHT]);

  // Handle Moving Block Overlay — green pulsing outline + move icon above picked-up block
  useEffect(() => {
    // Tear down any previous overlay whenever movingBlock changes (inc. null)
    if (moveOverlayRef.current && sceneRef.current) {
      sceneRef.current.remove(moveOverlayRef.current.outline);
      sceneRef.current.remove(moveOverlayRef.current.icon);
      moveOverlayRef.current.outline.geometry.dispose();
      (moveOverlayRef.current.outline.material as THREE.LineBasicMaterial).dispose();
      (moveOverlayRef.current.icon.material as THREE.SpriteMaterial).dispose();
      moveOverlayRef.current = null;
    }
    if (!movingBlock || !sceneRef.current) return;

    // Green outline — slightly oversize so it glows around the brick
    const outlineGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06, 0.46, 1.06));
    const outlineMat = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 1.0 });
    const outline = new THREE.LineSegments(outlineGeo, outlineMat);
    outline.position.set(
      movingBlock.row - offset,
      movingBlock.height * BRICK_HEIGHT,
      movingBlock.col - offset
    );
    sceneRef.current.add(outline);

    // Move icon sprite floating above the brick
    const icon = createMoveIcon();
    icon.position.set(
      movingBlock.row - offset,
      movingBlock.height * BRICK_HEIGHT + 0.68,
      movingBlock.col - offset
    );
    sceneRef.current.add(icon);

    moveOverlayRef.current = { outline, icon };
    pulseTimeRef.current = 0;

    return () => {
      if (sceneRef.current) {
        sceneRef.current.remove(outline);
        sceneRef.current.remove(icon);
      }
      outlineGeo.dispose();
      outlineMat.dispose();
      moveOverlayRef.current = null;
    };
  }, [movingBlock, offset, BRICK_HEIGHT]);

  // Update mouse ghost — show when selectedColor OR movingBlock is active
  useEffect(() => {
    if (!isInteractive || !rendererRef.current) return;

    const el = rendererRef.current.domElement;

    const onMouseMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const activeColor: LegoColor | null = selectedColor ?? movingBlock?.color ?? null;

      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
        const intersectPoint = new THREE.Vector3();
        raycasterRef.current.ray.intersectPlane(plane, intersectPoint);

        const r = Math.round(intersectPoint.x + offset);
        const c = Math.round(intersectPoint.z + offset);

        if (r >= 0 && r < size && c >= 0 && c < size && activeColor) {
          // When moving: ghost lands at the target cell's current top (excluding the moving block itself)
          const cellStack = movingBlock
            ? grid.filter(g => g.row === r && g.col === c && !(g.row === movingBlock.row && g.col === movingBlock.col && g.height === movingBlock.height))
            : grid.filter(g => g.row === r && g.col === c);
          const ghostHeight = cellStack.length;

          if (!hoverBrickRef.current || hoverBrickRef.current.userData.color !== activeColor) {
            if (hoverBrickRef.current) sceneRef.current.remove(hoverBrickRef.current);
            const ghost = createBrickMesh(activeColor, 0.4);
            ghost.userData.color = activeColor;
            hoverBrickRef.current = ghost;
            sceneRef.current.add(ghost);
          }
          hoverBrickRef.current.position.set(r - offset, ghostHeight * BRICK_HEIGHT, c - offset);
          hoverBrickRef.current.visible = true;
        } else if (hoverBrickRef.current) {
          hoverBrickRef.current.visible = false;
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current) return;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
      const intersectPoint = new THREE.Vector3();
      raycasterRef.current.ray.intersectPlane(plane, intersectPoint);

      const r = Math.round(intersectPoint.x + offset);
      const c = Math.round(intersectPoint.z + offset);

      if (r >= 0 && r < size && c >= 0 && c < size) {
        onPlaceBlock?.(r, c);
      }
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("click", onClick);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("click", onClick);
      if (hoverBrickRef.current && sceneRef.current) {
        sceneRef.current.remove(hoverBrickRef.current);
        hoverBrickRef.current = null;
      }
    };
  }, [isInteractive, selectedColor, movingBlock, size, offset, onPlaceBlock, grid, BRICK_HEIGHT]);

  return (
    <div
      className={`w-full h-full min-h-[500px] relative rounded-2xl overflow-hidden ${transparent ? "" : "bg-slate-50 shadow-inner"}`}
      ref={containerRef}
    >
      {!transparent && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none z-10">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">3D Controls</p>
            <p className="text-xs text-slate-700 flex items-center gap-2">🖱️ Orbit: Left Click</p>
            <p className="text-xs text-slate-700 flex items-center gap-2">🔍 Zoom: Scroll</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function createBrickMesh(color: LegoColor, opacity: number = 1) {
  const group = new THREE.Group();
  const colorHex = LEGO_COLORS_3D[color];

  // Base brick color
  const baseColor = new THREE.Color(colorHex);

  // Slightly lighter top-face color so top is distinct from sides
  const topColor = new THREE.Color(colorHex).lerp(new THREE.Color(0xffffff), 0.18);

  // Stud color — noticeably darker than body so connectors stand out
  const studColor = new THREE.Color(colorHex).multiplyScalar(0.52);

  const makeMatFor = (c: THREE.Color, emissiveScale = 0.25, rough = 0.55) =>
    new THREE.MeshStandardMaterial({
      color: c,
      emissive: c,
      emissiveIntensity: emissiveScale * opacity,
      transparent: opacity < 1,
      opacity,
      roughness: rough,
      metalness: 0.0,
    });

  // Per-face materials: sides use baseColor, top gets topColor, bottom gets baseColor
  // BoxGeometry face order: +x, -x, +y (top), -y (bottom), +z, -z
  const bodyMaterials = [
    makeMatFor(baseColor, 0.22, 0.6),  // +x side
    makeMatFor(baseColor, 0.22, 0.6),  // -x side
    makeMatFor(topColor,  0.28, 0.45), // +y top  ← brighter
    makeMatFor(baseColor, 0.15, 0.6),  // -y bottom
    makeMatFor(baseColor, 0.22, 0.6),  // +z side
    makeMatFor(baseColor, 0.22, 0.6),  // -z side
  ];

  const studMat = makeMatFor(studColor, 0.18, 0.5);

  // ── Main body ──────────────────────────────────────────────────────────────
  const bodyGeo = new THREE.BoxGeometry(0.95, 0.4, 0.95);
  const body = new THREE.Mesh(bodyGeo, bodyMaterials);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // White edge outline on body
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55 * opacity,
  });
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), edgeMat));

  // ── Studs + dark rims ──────────────────────────────────────────────────────
  const studPositions: [number, number, number][] = [
    [-0.25, 0.2, -0.25],
    [ 0.25, 0.2, -0.25],
    [-0.25, 0.2,  0.25],
    [ 0.25, 0.2,  0.25],
  ];

  const studGeo = new THREE.CylinderGeometry(0.165, 0.165, 0.11, 20);

  studPositions.forEach(([x, y, z]) => {
    // The stud cylinder on top
    const stud = new THREE.Mesh(studGeo, studMat);
    stud.position.set(x, y + 0.055, z);
    stud.castShadow = true;
    group.add(stud);

    // White edge outline on each stud
    const studEdge = new THREE.LineSegments(new THREE.EdgesGeometry(studGeo), edgeMat.clone());
    studEdge.position.copy(stud.position);
    group.add(studEdge);
  });

  return group;
}

export function createColorLabel(color: LegoColor) {
  const hexColor = LEGO_COLORS_3D[color];

  // Canvas sized for a pill: wide enough for the longest colour name ("purple" = 6 chars)
  const cw = 160, ch = 52;
  const canvas = document.createElement("canvas");
  canvas.width  = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Sprite();

  const r = ch / 2;          // corner radius = half height → full pill
  const pad = 6;             // inset from canvas edge

  // ── Pill background (brick colour) ────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(pad + r, pad);
  ctx.lineTo(cw - pad - r, pad);
  ctx.arcTo(cw - pad, pad,     cw - pad, pad + r,      r);
  ctx.lineTo(cw - pad, ch - pad - r);
  ctx.arcTo(cw - pad, ch - pad, cw - pad - r, ch - pad, r);
  ctx.lineTo(pad + r, ch - pad);
  ctx.arcTo(pad, ch - pad, pad, ch - pad - r, r);
  ctx.lineTo(pad, pad + r);
  ctx.arcTo(pad, pad, pad + r, pad, r);
  ctx.closePath();
  ctx.fillStyle = hexColor;
  ctx.fill();

  // ── Thin white border ──────────────────────────────────────────────────────
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // ── Colour name text ───────────────────────────────────────────────────────
  // Decide text colour: yellow bricks get dark text, everything else white
  const isDark = color === "yellow";
  ctx.fillStyle = isDark ? "#333" : "#fff";
  ctx.font = "bold 26px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(color.toUpperCase(), cw / 2, ch / 2);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,   // renders in front of transparent surfaces cleanly
  });

  const sprite = new THREE.Sprite(material);
  // World-space scale: keep the pill readable but compact
  // ratio = cw/ch = 160/52 ≈ 3.08
  sprite.scale.set(0.9, 0.9 * (ch / cw), 1);

  return sprite;
}

export function createGridLabel(label: string): THREE.Sprite {
  // High-res canvas so the text is crisp when rendered at small world size
  const cw = 256, ch = 128;
  const canvas = document.createElement("canvas");
  canvas.width  = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Sprite();

  // Fully transparent background — label blends into the plate surface
  ctx.clearRect(0, 0, cw, ch);

  // Subtle, lightweight text — normal weight, muted slate colour
  ctx.fillStyle = "rgba(80, 100, 120, 0.80)";
  ctx.font      = "normal 56px Arial, sans-serif"; // NOT bold
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cw / 2, ch / 2);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  // World-space size: larger so label is legible in the grid cell corner
  sprite.scale.set(0.75, 0.375, 1);

  return sprite;
}

export function createMoveIcon(): THREE.Sprite {
  const sz = 128;
  const canvas = document.createElement("canvas");
  canvas.width = sz; canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, sz, sz);

  const cx = sz / 2, cy = sz / 2;

  // Green circle background
  ctx.beginPath();
  ctx.arc(cx, cy, 56, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,255,136,0.88)";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Draw 4 arrows (N/S/E/W) in white
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const drawArrow = (ax: number, ay: number, bx: number, by: number) => {
    const angle = Math.atan2(by - ay, bx - ax);
    const headLen = 13;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx - headLen * Math.cos(angle - Math.PI / 6), by - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(bx - headLen * Math.cos(angle + Math.PI / 6), by - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath(); ctx.fill();
  };

  const arm = 30, gap = 10;
  drawArrow(cx, cy - gap, cx, cy - arm);  // up
  drawArrow(cx, cy + gap, cx, cy + arm);  // down
  drawArrow(cx - gap, cy, cx - arm, cy);  // left
  drawArrow(cx + gap, cy, cx + arm, cy);  // right

  const mat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.65, 0.65, 1);
  return sprite;
}