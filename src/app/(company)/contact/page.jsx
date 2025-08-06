"use client";

import { z } from "zod";
import {
  Box,
  Field,
  Icon,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Input, Button } from "@/components/atoms";
import { useState } from "react";
import { CountrySelector, Form, Section } from "@/components/molecules";
import { toast } from "sonner";
import { PageWrapper } from "@/components/organisms";
import { Mail } from "lucide-react";
import { zodFieldValidator } from "@/utils/functions";
const contactSchema = {
  first_name: z
    .string()
    .min(2, { message: "Please enter your first name" })
    .regex(/^[^\s]+$/, { message: "Only one first name is allowed" }),
  last_name: z
    .string()
    .min(2, { message: "Please enter your last name" })
    .regex(/^[^\s]+$/, { message: "Only one last name is allowed" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z.string().min(8, { message: "Phone number is too short" }).max(15, {
    message: "Phone number must be 15 digits or fewer",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must be under 1000 characters" }),
};

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+20");

  const handleSubmit = async ({ value }) => {
    let { phone } = value;
    const cleaned = phone.replace(/\D/g, "");

    if (selectedCountryCode === "+20") {
      const match = cleaned.match(/^(?:\+?20)?0?(1[0125][0-9]{8})$/);
      if (!match) return toast.error("Please check your phone number");
      phone = `+20${match[1]}`;
    } else {
      phone = `${selectedCountryCode}${cleaned}`;
    }

    const finalPayload = { ...value, phone };
    console.log("Final normalized message payload:", finalPayload);
    toast.success("Message sent successfully");
    // TODO: Send to backend
  };

  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section>
        <Stack
          direction={{ base: "column", md: "row" }}
          w="full"
          gap={6}
          align="start"
        >
          <Box flex="1" w="full">
            <Form
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              formOptions={{}}
              wrapperStyles={{
                w: "100%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
              }}
              submitText="Send message"
              submitButtonProps={{
                w: { base: "full", sm: "2xs" },
                rounded: "xl",
                ms: "auto",
              }}
            >
              {(form) => (
                <>
                  <Stack
                    gap={{ base: 0, sm: 4 }}
                    w="full"
                    direction={{ base: "column", sm: "row" }}
                  >
                    <form.Field
                      name="first_name"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(
                            contactSchema.first_name,
                            value
                          );
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="First Name"
                          placeholder="e.g. John"
                          field={field}
                          rounded="xl"
                        />
                      )}
                    </form.Field>

                    <form.Field
                      name="last_name"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(
                            contactSchema.last_name,
                            value
                          );
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="Last Name"
                          placeholder="e.g. Doe"
                          field={field}
                          rounded="xl"
                        />
                      )}
                    </form.Field>
                  </Stack>

                  <Stack
                    gap={{ base: 0, sm: 4 }}
                    w="full"
                    direction={{ base: "column", sm: "row" }}
                  >
                    <form.Field
                      name="email"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(contactSchema.email, value);
                        },
                      }}
                    >
                      {(field) => (
                        <Input
                          canError
                          label="Email"
                          placeholder="you@example.com"
                          field={field}
                          rounded="xl"
                        />
                      )}
                    </form.Field>

                    <form.Field
                      name="phone"
                      asyncDebounceMs={500}
                      validators={{
                        onChangeAsync: ({ value }) => {
                          return zodFieldValidator(contactSchema.phone, value);
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
                            canError: true,
                          }}
                          onChange={(code) =>
                            setSelectedCountryCode(code.items[0].dial_code)
                          }
                        />
                      )}
                    </form.Field>
                  </Stack>

                  <form.Field
                    name="message"
                    asyncDebounceMs={500}
                    validators={{
                      onChangeAsync: ({ value }) => {
                        return zodFieldValidator(contactSchema.message, value);
                      },
                    }}
                  >
                    {(field) => (
                      <Field.Root
                        name={field.name}
                        error={field.state.meta.errors?.[0]}
                      >
                        {console.log(field.state.meta.errors[0])}
                        <Field.Label>Message</Field.Label>
                        <Textarea
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Write your message here..."
                          textStyle="md"
                          p={3}
                          rounded="xl"
                          bg="bg-color"
                          border="1px solid"
                          borderColor={
                            field.state.meta.errors?.length
                              ? "red.500"
                              : "primary"
                          }
                          _focus={{
                            outline: "none",
                            ring: 2,
                            ringColor: "primary",
                          }}
                          rows={6}
                        />
                        <Box minH="1.25rem" mb={2}>
                          {field.state.meta.errors?.[0] && (
                            <Field.HelperText color="red.500">
                              {field.state.meta.errors[0]}
                            </Field.HelperText>
                          )}
                        </Box>
                      </Field.Root>
                    )}
                  </form.Field>
                </>
              )}
            </Form>
          </Box>
          <VStack
            w={{ base: "100%" }}
            maxW={{ base: "100%", md: "fit-content", xl: "md" }}
            gap={6}
            align="stretch"
            flex={1}
            height={"stretch"}
          >
            <VStack
              gap={4}
              flex={1}
              height={"stretch"}
              bg="rose.50"
              rounded="2xl"
              p={6}
              w="full"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                bg="primary"
                p={4}
                rounded="full"
                color="text-white"
                w="fit"
                mx="auto"
              >
                <Icon as={Mail} boxSize={8} />
              </Box>
              <Text textStyle="lg" fontWeight="500" textAlign="center">
                Chat with us over whatsapp
              </Text>
              <Button w="full" rounded="xl">
                Start chatting
              </Button>
            </VStack>

            <VStack
              gap={4}
              flex={1}
              height={"stretch"}
              bg="rose.50"
              rounded="2xl"
              p={6}
              w="full"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                bg="primary"
                p={4}
                rounded="full"
                color="text-white"
                w="fit"
                mx="auto"
              >
                <Mail size={32} />
              </Box>
              <Text textStyle="lg" fontWeight="500" textAlign="center">
                Send us a message via mail
              </Text>
              <Button w="full" rounded="xl">
                Send message
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Section>
    </PageWrapper>
  );
}
