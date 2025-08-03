"use client";

import { Table, Box } from "@chakra-ui/react";

export default function SizeChart({
  chart = [
    { size: "X-Small", length: 67, width: 61 },
    { size: "Small", length: 69, width: 63 },
    { size: "Medium", length: 71, width: 65 },
    { size: "Large", length: 73, width: 67 },
    { size: "XLarge", length: 75, width: 69 },
    { size: "2XLarge", length: 77, width: 71 },
  ],
}) {
  return (
    <Box overflowX="auto" pb={1}>
      <Table.Root
        size="md"
        width="full"
        variant="simple"
        border="1px solid"
        borderColor="rose.200"
        borderRadius="md"
      >
        <Table.Header>
          <Table.Row bg="primary">
            <Table.ColumnHeader
              border="1px solid"
              borderColor="rose.200"
              px={4}
              py={2}
              color="white"
              textAlign="center"
            >
              Size
            </Table.ColumnHeader>
            <Table.ColumnHeader
              border="1px solid"
              borderColor="rose.200"
              px={4}
              py={2}
              color="white"
              textAlign="center"
            >
              Length (cm)
            </Table.ColumnHeader>
            <Table.ColumnHeader
              border="1px solid"
              borderColor="rose.200"
              px={4}
              py={2}
              color="white"
              textAlign="center"
            >
              Width (cm)
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {chart.map((row, index) => (
            <Table.Row key={index} _hover={{ bg: "rose.100" }}>
              <Table.Cell
                border="1px solid"
                borderColor="rose.200"
                px={4}
                py={2}
                textAlign="center"
              >
                {row.size}
              </Table.Cell>
              <Table.Cell
                border="1px solid"
                borderColor="rose.200"
                px={4}
                py={2}
                textAlign="center"
              >
                {row.length}
              </Table.Cell>
              <Table.Cell
                border="1px solid"
                borderColor="rose.200"
                px={4}
                py={2}
                textAlign="center"
              >
                {row.width}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
