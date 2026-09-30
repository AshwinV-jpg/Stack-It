import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

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
  /** >1 frames the board closer (bigger on screen) */
  zoom?: number;
}

export function Scene3D({ grid, size, isInteractive, onPlaceBlock, selectedColor, movingBlock, phase, transparent, zoom = 1 }: Scene3DProps) {
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
    // Frame the board by grid size so small levels don't look tiny, and pull
    // back in narrow (portrait) views so the board isn't cropped at the sides
    // Aim a little below the board so it sits higher in the frame, clear of
    // the buttons along the bottom of the panels
    const lookTarget = new THREE.Vector3(0, -0.95, 0);
    const frameBoard = (aspect: number) => {
      const viewDistance = (2.5 + size * 1.8) * Math.max(1, 1.1 / aspect) / zoom;
      camera.position.setScalar(viewDistance / Math.sqrt(3)).add(lookTarget);
      camera.lookAt(lookTarget);
    };
    frameBoard(width / height);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.target.copy(lookTarget);
    controlsRef.current = controls;

    const lighting = applyStudioLighting(scene, renderer);
    const keyLight = lighting.keyLight;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    const shadowExtent = size / 2 + 2;
    keyLight.shadow.camera.left = -shadowExtent;
    keyLight.shadow.camera.right = shadowExtent;
    keyLight.shadow.camera.top = shadowExtent;
    keyLight.shadow.camera.bottom = -shadowExtent;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.radius = 4;

    // ── Lego-style 3D baseplate ───────────────────────────────────────────────
    scene.add(createBaseplate(size));

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

    // Watch the container itself: switching between the landscape and portrait
    // layouts resizes it without necessarily firing a window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      frameBoard(w / h);
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      lighting.dispose();
      renderer.dispose();
    };
  }, [size, transparent, zoom]);

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

  // Latest props for the pointer handlers, so they are bound once instead of
  // on every render (re-binding used to delete the ghost on each timer tick)
  const latestRef = useRef({ grid, selectedColor, movingBlock, onPlaceBlock });
  latestRef.current = { grid, selectedColor, movingBlock, onPlaceBlock };
  const pointerInsideRef = useRef(false);
  const touchAimRef = useRef(false);          // a finger is aiming a held brick
  const ignoreClickUntilRef = useRef(0);      // swallow the click after a touch placement
  const updateGhostRef = useRef<(() => void) | null>(null);

  // Mouse ghost — shows where the held brick (selected or being moved) would land
  useEffect(() => {
    if (!isInteractive || !rendererRef.current) return;

    const el = rendererRef.current.domElement;

    const setPointer = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    /** Grid cell under the pointer (raycast onto the brick-bottom plane) */
    const cellUnderPointer = () => {
      if (!cameraRef.current) return null;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
      const intersectPoint = new THREE.Vector3();
      if (!raycasterRef.current.ray.intersectPlane(plane, intersectPoint)) return null;
      const r = Math.round(intersectPoint.x + offset);
      const c = Math.round(intersectPoint.z + offset);
      return r >= 0 && r < size && c >= 0 && c < size ? { r, c } : null;
    };

    const updateGhost = () => {
      const { grid, selectedColor, movingBlock } = latestRef.current;
      const activeColor: LegoColor | null = selectedColor ?? movingBlock?.color ?? null;
      const cell = pointerInsideRef.current ? cellUnderPointer() : null;

      if (cell && activeColor && sceneRef.current) {
        const { r, c } = cell;
        // When moving: ghost lands at the target cell's current top (excluding the moving block itself)
        const cellStack = movingBlock
          ? grid.filter(g => g.row === r && g.col === c && !(g.row === movingBlock.row && g.col === movingBlock.col && g.height === movingBlock.height))
          : grid.filter(g => g.row === r && g.col === c);

        if (!hoverBrickRef.current || hoverBrickRef.current.userData.color !== activeColor) {
          if (hoverBrickRef.current) sceneRef.current.remove(hoverBrickRef.current);
          const ghost = createBrickMesh(activeColor, 0.65);
          ghost.userData.color = activeColor;
          hoverBrickRef.current = ghost;
          sceneRef.current.add(ghost);
        }
        hoverBrickRef.current.position.set(r - offset, cellStack.length * BRICK_HEIGHT, c - offset);
        hoverBrickRef.current.visible = true;
      } else if (hoverBrickRef.current) {
        hoverBrickRef.current.visible = false;
      }
      // Tell the page whether the ghost preview is showing (the held-brick
      // cursor hides only then). Runs before window listeners see the event.
      el.dataset.ghost = hoverBrickRef.current?.visible ? "1" : "0";
    };
    updateGhostRef.current = updateGhost;

    const onMouseMove = (event: MouseEvent) => {
      // Ignore the compatibility mousemove browsers send after a touch tap
      if (touchAimRef.current || performance.now() < ignoreClickUntilRef.current) return;
      setPointer(event);
      pointerInsideRef.current = true;
      updateGhost();
    };
    const onMouseLeave = () => {
      if (touchAimRef.current) return;
      pointerInsideRef.current = false;
      updateGhost();
    };
    const onClick = (event: MouseEvent) => {
      // A touch placement already happened on finger lift
      if (performance.now() < ignoreClickUntilRef.current) return;
      setPointer(event);
      const cell = cellUnderPointer();
      if (cell) latestRef.current.onPlaceBlock?.(cell.r, cell.c);
    };

    // ── Touch: there is no hover, so while a brick is held, pressing on the
    // board shows the ghost, dragging aims it and lifting places it. The
    // board doesn't rotate during that drag; with nothing held it rotates.
    const holding = () => !!(latestRef.current.selectedColor ?? latestRef.current.movingBlock);
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || !event.isPrimary || !holding()) return;
      touchAimRef.current = true;
      if (controlsRef.current) controlsRef.current.enabled = false;
      setPointer(event);
      pointerInsideRef.current = true;
      updateGhost();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!touchAimRef.current || !event.isPrimary) return;
      setPointer(event);
      updateGhost();
    };
    const endTouchAim = (place: boolean, event?: PointerEvent) => {
      if (!touchAimRef.current) return;
      touchAimRef.current = false;
      if (controlsRef.current) controlsRef.current.enabled = true;
      if (place && event) {
        setPointer(event);
        const cell = cellUnderPointer();
        if (cell) latestRef.current.onPlaceBlock?.(cell.r, cell.c);
        ignoreClickUntilRef.current = performance.now() + 500;
      }
      pointerInsideRef.current = false;
      updateGhost();
    };
    const onPointerUp = (event: PointerEvent) => { if (event.isPrimary) endTouchAim(true, event); };
    const onPointerCancel = () => endTouchAim(false);

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click", onClick);
    // Capture phase so these run before the orbit controls see the touch
    el.addEventListener("pointerdown", onPointerDown, true);
    el.addEventListener("pointermove", onPointerMove, true);
    el.addEventListener("pointerup", onPointerUp, true);
    el.addEventListener("pointercancel", onPointerCancel, true);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("click", onClick);
      el.removeEventListener("pointerdown", onPointerDown, true);
      el.removeEventListener("pointermove", onPointerMove, true);
      el.removeEventListener("pointerup", onPointerUp, true);
      el.removeEventListener("pointercancel", onPointerCancel, true);
      if (controlsRef.current) controlsRef.current.enabled = true;
      touchAimRef.current = false;
      updateGhostRef.current = null;
      el.dataset.ghost = "0";
      if (hoverBrickRef.current && sceneRef.current) {
        sceneRef.current.remove(hoverBrickRef.current);
        hoverBrickRef.current = null;
      }
    };
  }, [isInteractive, size, offset]);

  // Refresh the ghost when the build or the held brick changes — e.g. right
  // after placing, so it rises to sit on top of the brick just placed
  useEffect(() => {
    updateGhostRef.current?.();
  }, [grid, selectedColor, movingBlock]);

  return (
    <div
      className={`w-full h-full relative rounded-2xl overflow-hidden ${transparent ? "" : "bg-slate-50 shadow-inner"}`}
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

// Stud: a straight wall topped by a short chamfered cap, so the rim catches a
// highlight like moulded plastic. Built from cylinders (not a lathe) so the
// flat top keeps clean upward normals.
const STUD_RADIUS = 0.155;
const STUD_HEIGHT = 0.1;
const STUD_BEVEL = 0.018;

function createStudGeometry() {
  const wall = new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT - STUD_BEVEL, 40, 1, true);
  wall.translate(0, (STUD_HEIGHT - STUD_BEVEL) / 2, 0);
  const cap = new THREE.CylinderGeometry(STUD_RADIUS - STUD_BEVEL, STUD_RADIUS, STUD_BEVEL, 40);
  cap.translate(0, STUD_HEIGHT - STUD_BEVEL / 2, 0);
  const merged = mergeGeometries([wall, cap]);
  wall.dispose();
  cap.dispose();
  return merged;
}

export function createBrickMesh(color: LegoColor, opacity: number = 1) {
  const group = new THREE.Group();
  const isGhost = opacity < 1;

  // Glossy ABS-plastic look: one material for body and studs, like a real brick
  const material = new THREE.MeshPhysicalMaterial({
    // Slightly muted in 3D so bricks read as plastic, not neon (UI keeps the full palette)
    color: new THREE.Color(LEGO_COLORS_3D[color]).offsetHSL(0, -0.08, -0.1),
    roughness: 0.3,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.25,
    envMapIntensity: 0.08,
    transparent: isGhost,
    opacity,
    depthWrite: !isGhost,
  });

  // ── Main body: softly rounded edges instead of hard box corners ────────────
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.4, 0.95, 3, 0.035), material);
  body.castShadow = !isGhost;
  body.receiveShadow = true;
  group.add(body);

  // ── Studs ──────────────────────────────────────────────────────────────────
  const studGeo = createStudGeometry();
  const studPositions: [number, number][] = [
    [-0.24, -0.24],
    [ 0.24, -0.24],
    [-0.24,  0.24],
    [ 0.24,  0.24],
  ];
  studPositions.forEach(([x, z]) => {
    const stud = new THREE.Mesh(studGeo, material);
    stud.position.set(x, 0.2 - 0.005, z); // sink slightly so no seam shows at the base
    stud.castShadow = !isGhost;
    stud.receiveShadow = true;
    group.add(stud);
  });

  return group;
}

/**
 * Soft studio lighting shared by the board and the tray bricks: an environment
 * map for glossy reflections, a sky/ground fill, and a key light for shape.
 * Returns the key light (so callers can configure shadows) and a dispose fn.
 */
export function applyStudioLighting(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  // No tone mapping: lights are balanced so a brick's top face lands on its
  // exact palette colour, and the sides fall into gentle shade.
  renderer.toneMapping = THREE.NoToneMapping;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8d99ab, 0.34));

  // Lower angle keeps top faces calm and puts more light on the sides
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
  keyLight.position.set(8, 9, 5);
  scene.add(keyLight);

  return { keyLight, dispose: () => envTexture.dispose() };
}

/* ── Baseplate ────────────────────────────────────────────────────────────────
   One continuous studded Lego plate. Play cells are a lighter tint of the same
   plastic, raised a hair and split by thin grooves, so bricks look snapped onto
   the plate rather than placed on stickers. Cell tops sit at y = -0.2, exactly
   where bricks rest, so placement and raycasting are unchanged. */
const PLATE_TOP_Y = -0.2;          // cell top = brick bottom
const RIM_TOP_Y = PLATE_TOP_Y - 0.03;
const PLATE_THICKNESS = 0.42;
const BASE_STUD_SCALE = new THREE.Vector3(0.72, 0.6, 0.72); // baseplate studs are smaller than brick studs
const STUD_OFFSETS: [number, number][] = [[-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24]];

export function createBaseplate(size: number): THREE.Group {
  const group = new THREE.Group();
  const plateW = size + 2;         // one-unit studded rim on every side
  const offset = (size - 1) / 2;

  const rimMat = new THREE.MeshStandardMaterial({ color: 0x8295ad, roughness: 0.55, metalness: 0 });
  const cellMat = new THREE.MeshStandardMaterial({ color: 0x9fb0c6, roughness: 0.5, metalness: 0 });

  // Main plate with softly rounded edges
  const plate = new THREE.Mesh(new RoundedBoxGeometry(plateW, PLATE_THICKNESS, plateW, 4, 0.1), rimMat);
  plate.position.y = RIM_TOP_Y - PLATE_THICKNESS / 2;
  plate.receiveShadow = true;
  group.add(plate);

  // Play cells: same plastic, lighter tint, thin grooves between them
  const cellH = PLATE_TOP_Y - RIM_TOP_Y + 0.02; // tucks slightly into the plate
  const cellGeo = new RoundedBoxGeometry(0.94, cellH, 0.94, 3, 0.03);
  const cells: [number, number][] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const x = row - offset, z = col - offset;
      cells.push([x, z]);
      const cell = new THREE.Mesh(cellGeo, cellMat);
      cell.position.set(x, PLATE_TOP_Y - cellH / 2, z);
      cell.receiveShadow = true;
      group.add(cell);

      // Cell number printed in the centre, just above the stud tops so the
      // studs never clip it (a placed brick still covers it)
      const decal = createGridDecal(`G${row * size + col + 1}`);
      decal.position.set(x, PLATE_TOP_Y + 0.07, z);
      group.add(decal);
    }
  }

  // Rim cells around the play area
  const rimCells: [number, number][] = [];
  const edge = (size + 1) / 2;
  for (let i = 0; i < plateW; i++) {
    for (let j = 0; j < plateW; j++) {
      const x = i - edge, z = j - edge;
      if (Math.abs(x) === edge || Math.abs(z) === edge) rimCells.push([x, z]);
    }
  }

  // Studs everywhere: 2×2 per unit, like a real baseplate
  const studGeo = createStudGeometry();
  const addStuds = (spots: [number, number][], topY: number, mat: THREE.Material) => {
    const studs = new THREE.InstancedMesh(studGeo, mat, spots.length * STUD_OFFSETS.length);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    let n = 0;
    for (const [x, z] of spots) {
      for (const [dx, dz] of STUD_OFFSETS) {
        m.compose(new THREE.Vector3(x + dx, topY - 0.004, z + dz), q, BASE_STUD_SCALE);
        studs.setMatrixAt(n++, m);
      }
    }
    studs.castShadow = true;
    studs.receiveShadow = true;
    group.add(studs);
  };
  addStuds(rimCells, RIM_TOP_Y, rimMat);
  addStuds(cells, PLATE_TOP_Y, cellMat);

  return group;
}

/** Cell label lying flat on the board, turned to read upright from the default camera */
function createGridDecal(label: string): THREE.Mesh {
  const cw = 256, ch = 128;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(71, 85, 105, 0.45)";
  ctx.font = "700 96px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cw / 2, ch / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.25),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 }),
  );
  mesh.rotation.set(-Math.PI / 2, 0, Math.PI / 4);
  return mesh;
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