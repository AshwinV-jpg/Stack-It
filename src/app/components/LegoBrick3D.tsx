import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export type LegoColor = "red" | "blue" | "yellow" | "green" | "orange" | "purple" | "cyan";

export const LEGO_COLORS_3D: Record<LegoColor, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  yellow: "#eab308",
  green: "#22c55e",
  orange: "#f97316",
  purple: "#a855f7",
  cyan: "#06b6d4",
};

interface LegoBrick3DProps {
  color: LegoColor;
  position: [number, number, number];
  onClick?: () => void;
  scale?: number;
  hovered?: boolean;
}

export function LegoBrick3D({ color, position, onClick, scale = 1, hovered = false }: LegoBrick3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const colorHex = LEGO_COLORS_3D[color];

  useFrame((state) => {
    if (hovered && meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05 + 0.1;
    } else if (meshRef.current) {
      // Use linear interpolation to return to original position
      meshRef.current.position.y += (position[1] - meshRef.current.position.y) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={[scale, scale, scale]} onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}>
      {/* Main Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.4, 0.9]} />
        <meshStandardMaterial color={colorHex} />
      </mesh>

      {/* Studs */}
      {[
        [-0.25, 0.2, -0.25],
        [0.25, 0.2, -0.25],
        [-0.25, 0.2, 0.25],
        [0.25, 0.2, 0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color={colorHex} />
        </mesh>
      ))}
    </group>
  );
}
