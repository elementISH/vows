"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  Portal,
  CloseButton,
  Box,
  createListCollection,
  Select as ChakraSelect,
  Field,
  Stack,
} from "@chakra-ui/react";
import { z } from "zod";
import { Form } from "@/components/molecules";
import { COUNTRY_CODES } from "@/config";
import { Input } from "@/components/atoms";
import { useDefaultCountry } from "@/utils/hooks";
import { zodFieldValidator } from "@/utils/functions";

const addressSchema = {
  country: z.string().min(2, { message: "Country is required" }),
  street: z.string().min(2, { message: "Street is required" }),
  district: z.string().min(2, { message: "District is required" }),
  apartment: z.string().min(1, { message: "Apartment is required" }),
  floor: z.string().min(1, { message: "Floor is required" }),
};

export default function AddressDialog({
  open,
  onOpenChange,
  onSave,
  initialValues = {},
}) {
  const country = useDefaultCountry();
  const dialogContentRef = useRef(null);

  const handleSubmit = ({ value }) => {
    const result = z.object(addressSchema).safeParse(value);

    if (!result.success) {
      const issues = result.error.issues;
      const formatted = issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
      console.warn("Validation errors", formatted);
      return;
    }

    onSave(result.data);
    onOpenChange({ open: false });
  };

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={onOpenChange}
      closeOnInteractOutside={false}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            ref={dialogContentRef}
            rounded="2xl"
            p={2}
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 6 }}
            w="full"
            maxW={{ base: "95vw", md: "md", lg: "lg" }}
          >
            <Dialog.Header>
              <Dialog.Title fontWeight="bold" textStyle="xl">
                {initialValues?.id ? "Edit Address" : "Add Address"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Form
                defaultValues={{
                  country: country || "EG",
                  street: "",
                  district: "",
                  apartment: "",
                  floor: "",
                  ...initialValues,
                }}
                onSubmit={handleSubmit}
                wrapperStyles={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
                submitText="Save"
              >
                {(form) => (
                  <>
                    <Stack
                      gap={{ base: 2, sm: 4 }}
                      w="full"
                      direction={{ base: "column", sm: "row" }}
                    >
                      <form.Field
                        name="country"
                        validators={{
                          onChangeAsync: ({ value }) => {
                            return zodFieldValidator(
                              addressSchema.country,
                              value
                            );
                          },
                        }}
                      >
                        {(field) => (
                          <Field.Root
                            name={"country"}
                            error={field?.state?.meta?.errors?.[0]}
                          >
                            <Field.Label>Country</Field.Label>
                            <CountrySelectorOnly
                              onChange={(e) => {
                                const code = e?.items?.[0]?.code || "";
                                field.handleChange(code);
                              }}
                            />
                            <Box minH="1.25rem">
                              {field?.state?.meta?.errors?.[0] ? (
                                <Field.HelperText color="red.500">
                                  {field?.state?.meta?.errors?.[0]}
                                </Field.HelperText>
                              ) : null}
                            </Box>
                          </Field.Root>
                        )}
                      </form.Field>
                      <form.Field
                        name="district"
                        asyncDebounceMs={500}
                        validators={{
                          onChangeAsync: ({ value }) => {
                            return zodFieldValidator(
                              addressSchema.district,
                              value
                            );
                          },
                        }}
                      >
                        {(field) => (
                          <Input
                            canError
                            label="District"
                            placeholder="e.g Giza, Dokki"
                            field={field}
                            bg="transparent"
                            rounded="xl"
                          />
                        )}
                      </form.Field>
                    </Stack>
                    <form.Field
                      name="street"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(addressSchema.street, value);
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="Street"
                          placeholder="Street"
                          field={field}
                          bg="transparent"
                          rounded="xl"
                        />
                      )}
                    </form.Field>
                    <form.Field
                      name="apartment"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(
                            addressSchema.apartment,
                            value
                          );
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="Apartment"
                          placeholder="Apartment number"
                          field={field}
                          bg="transparent"
                          rounded="xl"
                        />
                      )}
                    </form.Field>

                    <form.Field
                      name="floor"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(addressSchema.floor, value);
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="Floor"
                          placeholder="Floor"
                          field={field}
                          bg="transparent"
                          rounded="xl"
                        />
                      )}
                    </form.Field>
                    <Box mb={2}></Box>
                  </>
                )}
              </Form>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
const collection = createListCollection({
  items: COUNTRY_CODES,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.name,
});

const defaultCountry =
  COUNTRY_CODES.find((c) => c.code === "EG") || COUNTRY_CODES[0];

function CountrySelectorOnly({
  onChange,
  defaultValue = defaultCountry.name,
  ...props
}) {
  const [selected, setSelected] = useState([defaultValue]);
  const handleChange = (e) => {
    setSelected(e.value);
    onChange?.(e);
  };
  return (
    <ChakraSelect.Root
      collection={collection}
      value={selected}
      onValueChange={handleChange}
      variant="solid"
      width="100%"
      {...props}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger
          px={4}
          py={2}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="primary"
          cursor="pointer"
        >
          <ChakraSelect.ValueText placeholder="Select country" />
          <ChakraSelect.Indicator />
        </ChakraSelect.Trigger>
      </ChakraSelect.Control>

      <ChakraSelect.Positioner>
        <ChakraSelect.Content
          maxH="18rem"
          overflowY="auto"
          w="100%"
          borderRadius="md"
        >
          {collection.items.map((item) => (
            <ChakraSelect.Item
              item={item}
              key={item.code}
              py={2}
              px={3}
              textStyle="md"
            >
              <Box>{item.name} </Box>
              <ChakraSelect.ItemIndicator />
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  );
}
