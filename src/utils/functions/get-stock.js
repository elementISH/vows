const MOCK_STOCK = {
  "#B28C86": { "x-small": 5, small: 3, medium: 10, large: 2 },
  "#F4C6C6": { "x-small": 1, small: 1, medium: 2, large: 0 },
  "#FFFFFF": { "x-small": 0, small: 2, medium: 3, large: 1 },
};
export default function getAvailableStock(color, size) {
  return color && size ? MOCK_STOCK[color]?.[size] ?? 999 : 999;
}
