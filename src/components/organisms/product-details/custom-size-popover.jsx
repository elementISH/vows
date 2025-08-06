import { Button, Input, Tag } from "@/components/atoms";
import { HStack, Popover } from "@chakra-ui/react";
import { Plus } from "lucide-react";

export default function CustomSizePopover({
  selected,
  onSubmit,
  value,
  onChange,
}) {
  const { length = "", width = "" } = value || {};

  const handleLengthChange = (e) => {
    const newLength = e.target.value;
    onChange({ length: newLength, width });
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    onChange({ length, width: newWidth });
  };

  const isValid = () => {
    const len = parseFloat(length);
    const wid = parseFloat(width);
    return !isNaN(len) && !isNaN(wid) && len > 0 && wid > 0;
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {length && width ? (
          <Tag
            rounded="full"
            px={4}
            bg={selected === `${length}x${width}` ? "rose.100" : "transparent"}
            color="primary"
            fontWeight="600"
            flexShrink={0}
            shadowColor="rose.400"
            cursor={"pointer"}
          >
            {length}x{width}
          </Tag>
        ) : (
          // <Tooltip content="Customize your own size!" asChild>
          <Tag
            px={4}
            bg="bg-color"
            h="stretch"
            rounded="full"
            border="2px dashed"
            borderColor="primary"
            boxShadow="none"
            color="primary"
            cursor="pointer"
          >
            <Plus size={16} color="var(--chakra-colors-primary)" />
          </Tag>
          // </Tooltip>
        )}
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger />
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body>
            <HStack gap={2} mb={2}>
              <Input
                placeholder="Length"
                value={length}
                onChange={handleLengthChange}
                bg="transparent"
                size="sm"
              />
              <Input
                placeholder="Width"
                value={width}
                onChange={handleWidthChange}
                bg="transparent"
                size="sm"
              />
            </HStack>
            <Popover.CloseTrigger asChild>
              <Button
                size="sm"
                w="full"
                onClick={() => {
                  if (!isValid()) return;
                  onSubmit({ length, width });
                }}
                disabled={!isValid()}
              >
                Save
              </Button>
            </Popover.CloseTrigger>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
