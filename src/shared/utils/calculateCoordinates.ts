export default function calculateCoordinates(
  x: number,
  y: number,
  selfSize: { width: number; height: number } | null,
  parentWidth: number,
  parentHeight: number,
) {
  if (selfSize) {
    if (x + selfSize.width > parentWidth) {
      x = x - selfSize.width;
    }

    if (y + selfSize.height > parentHeight+100) {
      y = y - selfSize.height;
    }
  }
  return { x, y };
}
