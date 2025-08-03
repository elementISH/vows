"use client";

import { z } from "zod";
import {
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Icon,
  CheckboxGroup,
  Checkbox,
  Fieldset,
} from "@chakra-ui/react";
import { Check, SlidersHorizontal, Star } from "lucide-react";
import { Input, Drawer } from "@/components/atoms";
import { Form } from "@/components/molecules";
import { useState } from "react";
import AdvancedFilterForm from "./advanced-filter-form";

const COLORS = ["#FFC229", "#E53E3E", "#3182CE", "#38A169", "#D53F8C"];
const CATEGORIES = [
  { label: "Jewelry", subcategories: ["Rings", "Necklaces", "Bracelets"] },
  { label: "Decor", subcategories: ["Flowers", "Lights", "Furniture"] },
];
const SORT_OPTIONS = [
  "Best Price",
  "Best Selling",
  "Cheapest",
  "Back in Stock",
  "Discounted",
];

// Schema
const filterSchema = z.object({
  categories: z.array(z.string()).optional(),
  subcategories: z.array(z.string()).optional(),
  color: z.string().optional(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  rating: z.string().optional(),
  customizable: z.boolean().optional(),
  sort: z.string().optional(),
});

// Default values
const defaultValues = {
  categories: [],
  subcategories: [],
  color: "",
  priceFrom: "",
  priceTo: "",
  rating: "",
  customizable: false,
  sort: "",
};

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
