type Props = {
  x: number;
  y: number;
  offsetHeight: number;
  offsetWidth: number;
  dx: number;
  dy: number;
};

export default function HoverGuidlines({
  x,
  y,
  offsetHeight,
  offsetWidth,
  dx,
  dy,
}: Props) {
  return (
    <>
      <div
        className="absolute bg-blue-300 opacity-20 pointer-events-none z-30"
        style={{
          top: 0,
          left: x - dx - 3,
          width: "6px",
          height: offsetHeight,
        }}
      />
      <div
        className="absolute bg-blue-300 opacity-20 pointer-events-none  z-30"
        style={{
          left: 0,
          top: y - dy - 3,
          width: offsetWidth,
          height: "6px",
        }}
      />
    </>
  );
}
