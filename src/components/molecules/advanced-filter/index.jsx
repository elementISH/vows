"use client";

import { HStack } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import AdvancedFilterForm from "./advanced-filter-form";
import { Drawer } from "@/components/atoms";

export default function AdvancedFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async ({ value }) => {
    console.log("Filter applied:", value);
    setIsOpen(false);
  };

  return (
    <Drawer
      size={{ base: "full", sm: "sm", md: "md", lg: "md", xl: "md" }}
      isOpen={isOpen}
      bodyStyles={{ overflowY: "hidden", pb: 0 }}
      onOpenChange={setIsOpen}
      title="Filter Products"
      trigger={
        <HStack
          color="fg.muted"
          gap={2}
          cursor="pointer"
          justifyContent={{ base: "flex-end" }}
          onClick={() => setIsOpen(true)}
        >
          Filter products <SlidersHorizontal size={18} />
        </HStack>
      }
      footer={<></>}
    >
      <AdvancedFilterForm />
    </Drawer>
  );
}
