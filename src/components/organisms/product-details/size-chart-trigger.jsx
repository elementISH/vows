import { Button, SizeChart, Tooltip } from "@/components/atoms";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { CircleQuestionMark } from "lucide-react";

export default function SizeChartTrigger({ chart }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* <Tooltip content="View size chart"> */}
        <CircleQuestionMark
          size={18}
          color="var(--chakra-colors-fg-muted)"
          cursor="pointer"
        />
        {/* </Tooltip> */}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Size Chart</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SizeChart />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
