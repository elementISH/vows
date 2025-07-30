"use client";

import { z } from "zod";
import {
  Box,
  VStack,
  Checkbox,
  CheckboxGroup,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Form } from "@/components/molecules";
import { Button, Input } from "@/components/atoms";
import { zodFieldValidator } from "@/utils/functions";
import { Star } from "lucide-react";
import { toast } from "sonner";

// 2. Default Values
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

const CATEGORY_OPTIONS = ["Clothing", "Accessories", "Shoes", "Bags"];
const SUBCATEGORY_OPTIONS = ["Hijab", "Wedding", "Casual"];
const SORT_OPTIONS = [
  "Best Price",
  "Best Selling",
  "Cheapest",
  "Back in Stock",
  "Discounted",
];
const COLOR_OPTIONS = ["red", "blue", "green", "yellow", "black", "white"];

export default function AdvancedProductFilterForm() {
  const handleSubmit = async ({ value }) => {
    const errors = [];

    if (value.priceFrom !== undefined && value.priceFrom !== "") {
      const priceFromNum = Number(value.priceFrom);
      if (isNaN(priceFromNum) || priceFromNum < 0) {
        errors.push("Price From must be a valid non-negative number.");
      }
    }

    if (value.priceTo !== undefined && value.priceTo !== "") {
      const priceToNum = Number(value.priceTo);
      if (isNaN(priceToNum) || priceToNum < 0) {
        errors.push("Price To must be a valid non-negative number.");
      }
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    console.log("Filtered values:", value);
    // Proceed with filtering logic
  };

  return (
    <Box w="full">
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        formOptions={{}}
        submitText="Apply Filters"
        wrapperStyles={{
          gap: 6,
          w: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {(form) => (
          <>
            {/* Categories */}
            <form.Field name="categories">
              {(field) => {
                const selected = field.state.value || [];

                const toggleCategory = (value) => {
                  const newValue = selected?.includes(value)
                    ? selected.filter((v) => v !== value)
                    : [...selected, value];
                  field.handleChange(newValue);
                };

                return (
                  <VStack align="start">
                    <Text fontWeight="bold">Categories</Text>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <Checkbox.Root
                        key={cat}
                        checked={selected?.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          bg={selected?.includes(cat) && "primary"}
                          borderColor={selected?.includes(cat) && "primary"}
                        />
                        <Checkbox.Label> {cat}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                );
              }}
            </form.Field>

            {/* Subcategories */}
            <form.Field name="subcategories">
              {(field) => {
                const selected = field.state.value || [];

                const toggleSubCategory = (value) => {
                  const newValue = selected?.includes(value)
                    ? selected.filter((v) => v !== value)
                    : [...selected, value];
                  field.handleChange(newValue);
                };

                return (
                  <VStack align="start">
                    <Text fontWeight="bold">Sub Categories</Text>
                    {SUBCATEGORY_OPTIONS.map((sub) => (
                      <Checkbox.Root
                        key={sub}
                        checked={selected?.includes(sub)}
                        onCheckedChange={() => toggleSubCategory(sub)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          bg={selected?.includes(sub) && "primary"}
                          borderColor={selected?.includes(sub) && "primary"}
                        />
                        <Checkbox.Label> {sub}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                );
              }}
            </form.Field>

            {/* Color */}
            <form.Field name="color">
              {(field) => {
                const selected = field.state.value || [];

                const toggleColor = (value) => {
                  const newValue = selected.includes(value)
                    ? selected.filter((v) => v !== value)
                    : [...selected, value];
                  field.handleChange(newValue);
                };

                return (
                  <Wrap>
                    {COLOR_OPTIONS.map((color) => (
                      <Checkbox.Root
                        key={color}
                        checked={selected.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          boxSize="8"
                          borderRadius="full"
                          bg={color}
                          borderColor={
                            selected.includes(color) ? "primary" : "gray.200"
                          }
                          borderWidth="2px"
                          _checked={{
                            boxShadow: "0 0 0 2px var(--chakra-colors-primary)",
                          }}
                        />
                      </Checkbox.Root>
                    ))}
                  </Wrap>
                );
              }}
            </form.Field>

            {/* Price Range */}
            <HStack gap={4}>
              <form.Field name="priceFrom">
                {(field) => (
                  <Input
                    label="Price From"
                    placeholder="0"
                    type="number"
                    field={field}
                    rounded="xl"
                  />
                )}
              </form.Field>
              <form.Field name="priceTo">
                {(field) => (
                  <Input
                    label="Price To"
                    placeholder="1000"
                    type="number"
                    field={field}
                    rounded="xl"
                  />
                )}
              </form.Field>
            </HStack>

            {/* Rating */}
            <form.Field name="rating">
              {(field) => {
                const selected = Number(field.state.value || 0);

                return (
                  <HStack spacing={1} mt={1} wrap="wrap">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      return (
                        <Box
                          as="button"
                          key={i}
                          type="button"
                          onClick={() =>
                            field.handleChange(starValue.toString())
                          }
                          aria-label={`Rate ${starValue} star${
                            starValue > 1 ? "s" : ""
                          }`}
                        >
                          <Star
                            size={20}
                            color="#FFC229"
                            fill={
                              starValue <= selected
                                ? "#FFC229"
                                : "var(--chakra-colors-bg)"
                            }
                          />
                        </Box>
                      );
                    })}
                  </HStack>
                );
              }}
            </form.Field>

            {/* Customizable Checkbox */}
            <form.Field name="customizable" type="checkbox">
              {(field) => (
                <>
                  <Checkbox.Root
                    checked={field.state.value}
                    onCheckedChange={({ checked }) =>
                      field.handleChange(checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                      bg={field.state.value && "primary"}
                      borderColor={field.state.value && "primary"}
                    />
                    <Checkbox.Label>Customizable</Checkbox.Label>
                  </Checkbox.Root>
                </>
              )}
            </form.Field>

            {/* Sort Options */}
            <form.Field name="sort">
              {(field) => (
                <Wrap spacing={2} mt={2}>
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = field.state.value === opt;
                    return (
                      <WrapItem key={opt}>
                        <Button
                          type="button"
                          size="sm"
                          variant={"outline"}
                          bg={isSelected ? "primary" : "transparent"}
                          color={isSelected ? "text-white" : "text-black"}
                          onClick={() => field.handleChange(opt)}
                          rounded="full"
                        >
                          {opt}
                        </Button>
                      </WrapItem>
                    );
                  })}
                </Wrap>
              )}
            </form.Field>
          </>
        )}
      </Form>
    </Box>
  );
}
