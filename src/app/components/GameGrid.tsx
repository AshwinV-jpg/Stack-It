import React from "react";
import { useDrop } from "react-dnd";
import { LegoBlock, LegoColor } from "./LegoBlock";

export interface GridCell {
  row: number;
  col: number;
  color: LegoColor | null;
}

interface GameGridProps {
  grid: GridCell[];
  onPlaceBlock?: (row: number, col: number, color: LegoColor) => void;
  onRemoveBlock?: (row: number, col: number) => void;
  size: number; // grid size (e.g. 3 for 3x3)
  isInteractive?: boolean;
}

export function GameGrid({ grid, onPlaceBlock, onRemoveBlock, size, isInteractive = false }: GameGridProps) {
  
  const getCell = (row: number, col: number) => grid.find(c => c.row === row && c.col === col);

  return (
    <div 
      className="grid gap-2 p-4 bg-gray-100/50 rounded-xl shadow-inner border-4 border-gray-200"
      style={{ 
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: size }).map((_, r) => (
        Array.from({ length: size }).map((_, c) => {
          const cell = getCell(r, c);
          return (
            <GridSquare 
              key={`${r}-${c}`}
              row={r}
              col={c}
              color={cell?.color || null}
              onPlaceBlock={onPlaceBlock}
              onRemoveBlock={onRemoveBlock}
              isInteractive={isInteractive}
            />
          );
        })
      ))}
    </div>
  );
}

interface GridSquareProps {
  row: number;
  col: number;
  color: LegoColor | null;
  onPlaceBlock?: (row: number, col: number, color: LegoColor) => void;
  onRemoveBlock?: (row: number, col: number) => void;
  isInteractive: boolean;
}

function GridSquare({ row, col, color, onPlaceBlock, onRemoveBlock, isInteractive }: GridSquareProps) {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "LEGO_BLOCK",
    drop: (item: { color: LegoColor }) => {
      if (isInteractive && onPlaceBlock) {
        onPlaceBlock(row, col, item.color);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [row, col, isInteractive, onPlaceBlock]);

  return (
    <div
      ref={isInteractive ? (dropRef as unknown as React.Ref<HTMLDivElement>) : null}
      className={`
        w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-sm
        ${isInteractive ? "bg-white/80" : "bg-transparent"}
        ${isOver ? "bg-blue-100 ring-2 ring-blue-300" : ""}
        ${!color && isInteractive ? "border-2 border-dashed border-gray-300" : ""}
        transition-all duration-200
      `}
      onClick={() => isInteractive && onRemoveBlock && onRemoveBlock(row, col)}
    >
      {color ? (
        <LegoBlock color={color} size="md" />
      ) : (
        isInteractive && <div className="w-2 h-2 rounded-full bg-gray-200 shadow-inner" />
      )}
    </div>
  );
}
