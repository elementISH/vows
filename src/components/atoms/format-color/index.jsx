import { Text } from "@chakra-ui/react";
import { name as nameColor } from "ntcjs";
export default function FormatColor({ value, ghost, ...props }) {
  if (ghost) return nameColor(value)[1];
  return <Text>{nameColor(value)[1]}</Text>;
}
