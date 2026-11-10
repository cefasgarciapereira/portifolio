const HAND_ROWS = [
  ".....XX.........",
  "....XooX........",
  "....XooX........",
  "....XooX........",
  "....XooXXX......",
  "....XooXooXX....",
  ".XX.XooXooXoXX..",
  "XooXXooooooXooX.",
  "XoooXoooooooooX.",
  ".XooooooooooooX.",
  "..XoooooooooooX.",
  "..XooooooooooX..",
  "...XoooooooooX..",
  "...XooooooooX...",
  "....XoooooooX...",
  "....XXXXXXXXX...",
];

function pixelPath(symbol: string) {
  return HAND_ROWS.flatMap((row, y) =>
    row.split("").map((cell, x) => (cell === symbol ? `M${x} ${y}h1v1h-1z` : ""))
  ).join("");
}

const OUTLINE_PATH = pixelPath("X");
const FILL_PATH = pixelPath("o");

interface PixelHandProps {
  className?: string;
}

export default function PixelHand({ className }: PixelHandProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <path d={FILL_PATH} fill="#FFFFFF" />
      <path d={OUTLINE_PATH} fill="#111111" />
    </svg>
  );
}
