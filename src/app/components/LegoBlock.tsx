import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "motion/react";

export type LegoColor = "red" | "blue" | "yellow" | "green" | "orange" | "purple" | "cyan";

export const LEGO_COLORS: Record<LegoColor, { bg: string; shadow: string; border: string; stud: string }> = {
  red: { bg: "bg-red-500", shadow: "shadow-red-700", border: "border-red-600", stud: "bg-red-400" },
  blue: { bg: "bg-blue-500", shadow: "shadow-blue-700", border: "border-blue-600", stud: "bg-blue-400" },
  yellow: { bg: "bg-yellow-400", shadow: "shadow-yellow-600", border: "border-yellow-500", stud: "bg-yellow-300" },
  green: { bg: "bg-green-500", shadow: "shadow-green-700", border: "border-green-600", stud: "bg-green-400" },
  orange: { bg: "bg-orange-500", shadow: "shadow-orange-700", border: "border-orange-600", stud: "bg-orange-400" },
  purple: { bg: "bg-purple-500", shadow: "shadow-purple-700", border: "border-purple-600", stud: "bg-purple-400" },
  cyan: { bg: "bg-cyan-500", shadow: "shadow-cyan-700", border: "border-cyan-600", stud: "bg-cyan-400" },
};

interface LegoBlockProps {
  color: LegoColor;
  id?: string;
  isDraggable?: boolean;
  size?: "sm" | "md" | "lg";
}

export function LegoBlock({ color, id, isDraggable = false, size = "md" }: LegoBlockProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "LEGO_BLOCK",
    item: { color, id },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [color, id, isDraggable]);

  const config = LEGO_COLORS[color];
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const studSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <motion.div
      ref={isDraggable ? (dragRef as unknown as React.Ref<HTMLDivElement>) : null}
      whileHover={isDraggable ? { scale: 1.05, y: -2 } : {}}
      whileTap={isDraggable ? { scale: 0.95 } : {}}
      className={`
        relative rounded-sm border-b-4 border-r-4 ${config.bg} ${config.border} ${config.shadow}
        flex items-center justify-center transition-opacity
        ${sizeClasses[size]}
        ${isDragging ? "opacity-50" : "opacity-100"}
        cursor-${isDraggable ? "grab" : "default"}
      `}
    >
      {/* Studs */}
      <div className="grid grid-cols-2 gap-1 p-1">
        <div className={`${studSizes[size]} rounded-full ${config.stud} shadow-inner`}></div>
        <div className={`${studSizes[size]} rounded-full ${config.stud} shadow-inner`}></div>
        <div className={`${studSizes[size]} rounded-full ${config.stud} shadow-inner`}></div>
        <div className={`${studSizes[size]} rounded-full ${config.stud} shadow-inner`}></div>
      </div>
    </motion.div>
  );
}
