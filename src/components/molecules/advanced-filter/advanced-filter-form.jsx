"use client";

import {
  Box,
  Text,
  Wrap,
  WrapItem,
  HStack,
  Collapsible,
  Icon,
  Switch,
} from "@chakra-ui/react";
import { Check, Minus, Plus, Star, X } from "lucide-react";
import { Form } from "@/components/molecules";
import { Button, Input } from "@/components/atoms";
import { toast } from "sonner";

const defaultValues = {
  categories: [],
  subcategories: [],
  color: [],
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

export default function AdvancedFilterForm() {
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
    if (
      value.priceFrom !== undefined &&
      value.priceTo !== undefined &&
      value.priceFrom !== "" &&
      value.priceTo !== ""
    ) {
      const priceFromNum = Number(value.priceFrom) || 0;
      const priceToNum = Number(value.priceTo) || 0;
      if (priceToNum <= priceFromNum) {
        errors.push("Price To must be greater than Price From.");
      }
    }
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    console.log("Filtered values:", value);
  };

  return (
    <Box w="full" h={"full"}>
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
          height: "100%",
        }}
        limitHeight
      >
        {(form) => {
          return (
            <Box maxH={"98%"} overflow={"auto"} pe={2} className="customScroll">
              <Collapsible.Root>
                <form.Subscribe
                  selector={(state) => state.values["categories"]}
                >
                  {(categories) => (
                    <Collapsible.Trigger
                      py="3"
                      cursor="pointer"
                      w="full"
                      display="flex"
                      justifyContent="space-between"
                      _focus={{ outline: "none" }}
                    >
                      <HStack>
                        <Text fontWeight="bold">Categories</Text>
                        {categories?.length > 0 && (
                          <Box
                            as="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              form.setFieldValue("categories", []);
                            }}
                            cursor={"pointer"}
                            color="rose.500"
                          >
                            - Clear
                          </Box>
                        )}
                      </HStack>
                      <Collapsible.Context>
                        {(store) =>
                          store.open ? <Minus size={16} /> : <Plus size={16} />
                        }
                      </Collapsible.Context>
                    </Collapsible.Trigger>
                  )}
                </form.Subscribe>
                <Collapsible.Content>
                  <form.Field name="categories">
                    {(field) => {
                      const selected = field.state.value || [];
                      const toggle = (v) =>
                        field.handleChange(
                          selected.includes(v)
                            ? selected.filter((s) => s !== v)
                            : [...selected, v]
                        );

                      return (
                        <Wrap>
                          {CATEGORY_OPTIONS.map((opt) => {
                            const isSelected = selected.includes(opt);
                            return (
                              <WrapItem key={opt}>
                                <Button
                                  size="2xs"
                                  variant="outline"
                                  bg={isSelected ? "primary" : "transparent"}
                                  color={
                                    isSelected ? "text-white" : "text-black"
                                  }
                                  onClick={() => toggle(opt)}
                                  rounded="full"
                                  textStyle={"sm"}
                                >
                                  {opt}
                                </Button>
                              </WrapItem>
                            );
                          })}
                        </Wrap>
                      );
                    }}
                  </form.Field>
                </Collapsible.Content>
              </Collapsible.Root>

              <Collapsible.Root>
                <form.Subscribe
                  selector={(state) => state.values["subcategories"]}
                >
                  {(subcategories) => (
                    <Collapsible.Trigger
                      py="3"
                      cursor="pointer"
                      w="full"
                      display="flex"
                      justifyContent="space-between"
                      _focus={{ outline: "none" }}
                    >
                      <HStack>
                        <Text fontWeight="bold">Sub categories</Text>
                        {subcategories?.length > 0 && (
                          <Box
                            as="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              form.setFieldValue("subcategories", []);
                            }}
                            cursor={"pointer"}
                            color="rose.500"
                          >
                            - Clear
                          </Box>
                        )}
                      </HStack>
                      <Collapsible.Context>
                        {(store) =>
                          store.open ? <Minus size={16} /> : <Plus size={16} />
                        }
                      </Collapsible.Context>
                    </Collapsible.Trigger>
                  )}
                </form.Subscribe>

                <Collapsible.Content>
                  <form.Field name="subcategories">
                    {(field) => {
                      const selected = field.state.value || [];
                      const toggle = (v) =>
                        field.handleChange(
                          selected.includes(v)
                            ? selected.filter((s) => s !== v)
                            : [...selected, v]
                        );

                      return (
                        <Wrap>
                          {SUBCATEGORY_OPTIONS.map((opt) => {
                            const isSelected = selected.includes(opt);
                            return (
                              <WrapItem key={opt}>
                                <Button
                                  size="2xs"
                                  variant="outline"
                                  bg={isSelected ? "primary" : "transparent"}
                                  color={
                                    isSelected ? "text-white" : "text-black"
                                  }
                                  onClick={() => toggle(opt)}
                                  rounded="full"
                                  textStyle={"sm"}
                                >
                                  {opt}
                                </Button>
                              </WrapItem>
                            );
                          })}
                        </Wrap>
                      );
                    }}
                  </form.Field>
                </Collapsible.Content>
              </Collapsible.Root>

              <Collapsible.Root>
                <form.Subscribe selector={(state) => state.values["color"]}>
                  {(color) => (
                    <Collapsible.Trigger
                      py="3"
                      cursor="pointer"
                      w="full"
                      display="flex"
                      justifyContent="space-between"
                      _focus={{ outline: "none" }}
                    >
                      <HStack>
                        <Text fontWeight="bold">Color</Text>
                        {color?.length > 0 && (
                          <Box
                            as="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              form.setFieldValue("color", []);
                            }}
                            cursor={"pointer"}
                            color="rose.500"
                          >
                            - Clear
                          </Box>
                        )}
                      </HStack>
                      <Collapsible.Context>
                        {(store) =>
                          store.open ? <Minus size={16} /> : <Plus size={16} />
                        }
                      </Collapsible.Context>
                    </Collapsible.Trigger>
                  )}
                </form.Subscribe>

                <Collapsible.Content>
                  <form.Field name="color">
                    {(field) => {
                      const selectedColors = field.state.value || [];

                      const toggleColor = (c) => {
                        const updated = selectedColors.includes(c)
                          ? selectedColors.filter((color) => color !== c)
                          : [...selectedColors, c];
                        field.handleChange(updated);
                      };

                      return (
                        <HStack gap={3} wrap="wrap" mt={2}>
                          {COLOR_OPTIONS.map((c) => {
                            const isSelected = selectedColors.includes(c);
                            return (
                              <Box
                                key={c}
                                boxSize="28px"
                                rounded="full"
                                bg={c}
                                border="2px solid"
                                borderColor={
                                  isSelected ? "primary" : "gray.200"
                                }
                                position="relative"
                                cursor="pointer"
                                onClick={() => toggleColor(c)}
                              >
                                {isSelected && (
                                  <Box
                                    position="absolute"
                                    w="70%"
                                    h="70%"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    rounded="full"
                                    bg="whiteAlpha.500"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Icon
                                      as={Check}
                                      boxSize={3}
                                      color="primary"
                                      strokeWidth={3}
                                    />
                                  </Box>
                                )}
                              </Box>
                            );
                          })}
                        </HStack>
                      );
                    }}
                  </form.Field>
                </Collapsible.Content>
              </Collapsible.Root>

              <Collapsible.Root>
                <Collapsible.Trigger
                  py="3"
                  cursor="pointer"
                  w="full"
                  display="flex"
                  justifyContent="space-between"
                  _focus={{
                    outline: "none",
                  }}
                >
                  <Text fontWeight="bold">Price Range</Text>
                  <Collapsible.Context>
                    {(store) =>
                      store.open ? <Minus size={16} /> : <Plus size={16} />
                    }
                  </Collapsible.Context>
                </Collapsible.Trigger>
                <Collapsible.Content py={"0.1px"}>
                  <HStack gap={2} mt={2}>
                    <form.Field name="priceFrom">
                      {(field) => (
                        <Input
                          label="From"
                          placeholder="0"
                          type="number"
                          field={field}
                          rounded="xl"
                          bg="transparent"
                          endElement="EGP"
                        />
                      )}
                    </form.Field>
                    <form.Field name="priceTo">
                      {(field) => (
                        <Input
                          label="To"
                          placeholder="1000"
                          type="number"
                          field={field}
                          rounded="xl"
                          bg="transparent"
                          endElement="EGP"
                        />
                      )}
                    </form.Field>
                  </HStack>
                </Collapsible.Content>
              </Collapsible.Root>

              <form.Subscribe selector={(state) => state.values["rating"]}>
                {(rating) => (
                  <HStack>
                    <Text fontWeight="bold" py={3}>
                      Rating
                    </Text>
                    {rating && rating > 0 && (
                      <Box
                        as="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setFieldValue("rating", "");
                        }}
                        cursor={"pointer"}
                        color="rose.500"
                      >
                        - Clear
                      </Box>
                    )}
                  </HStack>
                )}
              </form.Subscribe>
              <form.Field name="rating">
                {(field) => {
                  const selected = Number(field.state.value || 0);

                  return (
                    <HStack gap={1} mt={2} wrap="wrap">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <Box
                            as="button"
                            key={i}
                            type="button"
                            cursor={"pointer"}
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
                                  : "var(--chakra-colors-bg-color)"
                              }
                            />
                          </Box>
                        );
                      })}
                    </HStack>
                  );
                }}
              </form.Field>


              <Text fontWeight="bold" py={3}>
                Customizable
              </Text>

              <form.Field name="customizable" type="checkbox">
                {(field) => (
                  <Box mt={2}>
                    <Switch.Root
                      checked={field.state.value}
                      onCheckedChange={() =>
                        field.handleChange(!field.state.value)
                      }
                      _focus={{ outline: "none" }}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control
                        _focus={{ outline: "none" }}
                        bg={field.state.value ? "primary" : "rose.200"}
                      >
                        <Switch.Thumb _focus={{ outline: "none" }}>
                          <Switch.ThumbIndicator
                            fallback={<X color="black" size={14} />}
                          >
                            <Check size={14} />
                          </Switch.ThumbIndicator>
                        </Switch.Thumb>
                      </Switch.Control>
                      <Switch.Label>
                        Products that contain customization
                      </Switch.Label>
                    </Switch.Root>
                  </Box>
                )}
              </form.Field>

              <form.Subscribe selector={(state) => state.values["sort"]}>
                {(sort) => (
                  <HStack>
                    <Text fontWeight="bold" py={3}>
                      Sort By
                    </Text>
                    {sort?.length > 0 && (
                      <Box
                        as="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setFieldValue("sort", []);
                        }}
                        cursor={"pointer"}
                        color="rose.500"
                      >
                        - Clear
                      </Box>
                    )}
                  </HStack>
                )}
              </form.Subscribe>

              <form.Field name="sort">
                {(field) => (
                  <Wrap gap={2} mt={2}>
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = field.state.value === opt;
                      return (
                        <WrapItem key={opt}>
                          <Button
                            type="button"
                            size="2xs"
                            variant="outline"
                            bg={isSelected ? "primary" : "transparent"}
                            color={isSelected ? "text-white" : "text-black"}
                            onClick={() => field.handleChange(opt)}
                            rounded="full"
                            textStyle={"sm"}
                          >
                            {opt}
                          </Button>
                        </WrapItem>
                      );
                    })}
                  </Wrap>
                )}
              </form.Field>
            </Box>
          );
        }}
      </Form>
    </Box>
  );
}
