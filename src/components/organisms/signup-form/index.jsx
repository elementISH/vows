"use client";

import { z } from "zod";
import { HStack, Stack } from "@chakra-ui/react";
import { Divider, Input } from "@/components/atoms";
import { useState } from "react";
import { CountrySelector, Form, SocialLogin } from "@/components/molecules";
import { zodFieldValidator } from "@/utils/functions";

// Validation Schema
const signupSchema = {
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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
};

// Default Values
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export default function SignupForm() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+20");
  const handleSubmit = async ({ value }) => {
    let { phone } = value;
    if (selectedCountryCode === "+20") {
      const egyptPattern = /^(?:\+?20)?0?(1[0125][0-9]{8})$/;
      const cleaned = phone.replace(/\D/g, "");

      const match = cleaned.match(egyptPattern);

      if (match) {
        phone = `+20${match[1]}`;
      }
    } else {
      const cleaned = phone.replace(/\D/g, "");
      phone = `${selectedCountryCode}${cleaned}`;
    }

    const finalPayload = {
      ...value,
      phone,
    };

    console.log("Final normalized signup payload:", finalPayload);
    // TODO: Submit to backend
  };

  return (
    <>
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        formOptions={{}}
        wrapperStyles={{
          w: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
        submitText="Sign Up"
      >
        {(form) => (
          <>
            {/* First & Last Name */}
            <Stack
              gap={{ base: 2, sm: 4 }}
              w="full"
              direction={{ base: "column", sm: "row" }}
            >
              <form.Field
                name="firstName"
                asyncDebounceMs={500}
                validators={{
                  onChangeAsync: ({ value }) => {
                    return zodFieldValidator(signupSchema.firstName, value);
                  },
                }}
              >
                {(field) => (
                  <Input
                    canError
                    label="First Name"
                    placeholder="e.g. John"
                    field={field}
                    helperText="Only one name allowed"
                    rounded="xl"
                  />
                )}
              </form.Field>
              <form.Field
                name="lastName"
                asyncDebounceMs={500}
                validators={{
                  onChangeAsync: ({ value }) => {
                    return zodFieldValidator(signupSchema.lastName, value);
                  },
                }}
              >
                {(field) => (
                  <Input
                    canError
                    label="Last Name"
                    placeholder="e.g. Doe"
                    field={field}
                    helperText="Only one name allowed"
                    rounded="xl"
                  />
                )}
              </form.Field>
            </Stack>

            {/* Email */}
            <form.Field
              name="email"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(signupSchema.email, value);
                },
              }}
            >
              {(field) => (
                <Input
                  canError
                  label="Email"
                  placeholder="you@example.com"
                  field={field}
                  helperText="We'll never share your email"
                  rounded="xl"
                />
              )}
            </form.Field>

            {/* Phone */}
            <form.Field
              name="phone"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(signupSchema.phone, value);
                },
              }}
            >
              {(field) => (
                <CountrySelector
                  inputProps={{
                    label: "Phone Number",
                    placeholder: "10 123 4567",
                    helperText:
                      "Write your phone number without the country code",
                    field: field,
                    rounded: "xl",
                    maxLength: 15,
                    canError: true,
                  }}
                  onChange={(code) => {
                    console.log(code);
                    setSelectedCountryCode(code.items[0].dial_code);
                  }}
                />
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              asyncDebounceMs={500}
              validators={{
                onChangeAsync: ({ value }) => {
                  return zodFieldValidator(signupSchema.password, value);
                },
              }}
            >
              {(field) => (
                <Input
                  canError
                  label="Password"
                  placeholder="••••••••"
                  isPassword
                  field={field}
                  helperText="Minimum 6 characters"
                  rounded="xl"
                />
              )}
            </form.Field>
          </>
        )}
      </Form>

      <Divider text="OR CONTINUE WITH" my={4} />
      <SocialLogin />
    </>
  );
}
