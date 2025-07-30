"use client";

import { z } from "zod";
import {
  Box,
  Field,
  Stack,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { Input } from "@/components/atoms";
import { useState } from "react";
import { CountrySelector, Form } from "@/components/molecules";
import { toast } from "sonner";
import { zodFieldValidator } from "@/utils/functions";

const accountSchema = {
  firstName: z
    .string()
    .min(2, { message: "Please enter your first name" })
    .regex(/^[^\s]+$/, { message: "Only one first name is allowed" }),
  lastName: z
    .string()
    .min(2, { message: "Please enter your last name" })
    .regex(/^[^\s]+$/, { message: "Only one last name is allowed" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z.string().min(8, { message: "Phone number is too short" }).max(15, {
    message: "Phone number must be 15 digits or fewer",
  }),
  age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .int("Age must be an integer")
      .min(0, "Age must be at least 0")
      .max(120, "Please enter a valid age")
      .optional()
  ),
  gender: z.string().array().optional(),
};

const genderOptions = createListCollection({
  items: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: null,
};

export default function AccountForm() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+20");

  const handleSubmit = async ({ value }) => {
    let { phone } = value;
    if (selectedCountryCode === "+20") {
      const egyptPattern = /^(?:\+?20)?0?(1[0125][0-9]{8})$/;
      const cleaned = phone.replace(/\D/g, "");

      const match = cleaned.match(egyptPattern);
      if (match) {
        phone = `+20${match[1]}`;
      } else {
        return toast.error("Please check your phone number");
      }
    } else {
      const cleaned = phone.replace(/\D/g, "");
      phone = `${selectedCountryCode}${cleaned}`;
    }

    const finalPayload = { ...value, phone };
    console.log("Final normalized account payload:", finalPayload);
    // TODO: submit to backend
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      formOptions={{}}
      wrapperStyles={{
        w: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
      submitText="Save data"
    >
      {(form) => (
        <>
          {/* First & Last Name */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 4 }}
            w="full"
          >
            <form.Field
              name="firstName"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(accountSchema.firstName, value);
                },
              }}
            >
              {(field) => (
                <Input
                  canError
                  label="First Name"
                  placeholder="e.g. John"
                  field={field}
                  flex={1}
                  rounded="xl"
                  _focus={{ boxShadow: "none", bg: "transparent" }}
                />
              )}
            </form.Field>
            <form.Field
              name="lastName"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(accountSchema.lastName, value);
                },
              }}
            >
              {(field) => (
                <Input
                  canError
                  label="Last Name"
                  placeholder="e.g. Doe"
                  field={field}
                  flex={1}
                  rounded="xl"
                />
              )}
            </form.Field>
          </Stack>

          {/* Email & Phone */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 4 }}
            w="full"
          >
            <form.Field
              name="email"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(accountSchema.email, value);
                },
              }}
            >
              {(field) => (
                <Input
                  canError
                  label="Email"
                  placeholder="you@example.com"
                  field={field}
                  flex={1}
                  rounded="xl"
                />
              )}
            </form.Field>

            <form.Field
              name="phone"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(accountSchema.phone, value);
                },
              }}
            >
              {(field) => (
                <CountrySelector
                  inputProps={{
                    label: "Phone Number",
                    placeholder: "10 123 4567",
                    field: field,
                    rounded: "xl",
                    maxLength: 15,
                    flex: 1,
                    canError: true,
                  }}
                  onChange={(code) => {
                    setSelectedCountryCode(code.items[0].dial_code);
                  }}
                />
              )}
            </form.Field>
          </Stack>

          {/* Age & Gender */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 4 }}
            mb={4}
            w="full"
          >
            <Box flex={1}>
              <form.Field
                name="age"
                asyncDebounceMs={500}
                validators={{
                  onChangeAsync: ({ value }) => {
                    const result = accountSchema.age.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0].message;
                  },
                }}
              >
                {(field) => (
                  <>
                    <Input
                      canError
                      type="number"
                      label="Age"
                      placeholder="e.g. 28"
                      field={field}
                      rounded="xl"
                    />
                  </>
                )}
              </form.Field>
            </Box>
            <form.Field
              name="gender"
              w="full"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return undefined;
                  return zodFieldValidator(accountSchema.gender, value);
                },
              }}
            >
              {(field) => {
                const fieldName = field.name;
                const fieldValue = field.state.value ?? "";
                const errorMessage = field.state.meta.errors?.[0];

                return (
                  <Field.Root
                    name={fieldName}
                    error={errorMessage}
                    width="full"
                    flex={1}
                  >
                    <Field.Label>Gender</Field.Label>

                    <Select.Root
                      name={fieldName}
                      value={fieldValue}
                      onValueChange={({ value }) => field.handleChange(value)}
                      onInteractOutside={field.handleBlur}
                      invalid={!!errorMessage}
                      collection={genderOptions}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger
                          bg="bg-color"
                          borderColor={errorMessage ? "red.500" : "primary"}
                          textStyle="md"
                          rounded="xl"
                          px="3"
                        >
                          <Select.ValueText placeholder="Select gender" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>

                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {genderOptions.items.map((item) => (
                              <Select.Item
                                item={item}
                                key={item.value}
                                textStyle="md"
                              >
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>

                    <Box minH="1.25rem">
                      {errorMessage ? (
                        <Field.HelperText color="red.500">
                          {errorMessage}
                        </Field.HelperText>
                      ) : null}
                    </Box>
                  </Field.Root>
                );
              }}
            </form.Field>
          </Stack>
        </>
      )}
    </Form>
  );
}
