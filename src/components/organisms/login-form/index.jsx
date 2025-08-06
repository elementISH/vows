"use client";

import { z } from "zod";
import { Box, Stack } from "@chakra-ui/react";
import { Divider, Input, Link } from "@/components/atoms";
import { Form, SocialLogin } from "@/components/molecules";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Minimum 8 characters required" }),
});

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const login = useStore.getState().login;

  const handleSubmit = async ({ value }) => {
    const success = await login(value);
  };

  return (
    <Box w="full" maxW={{ base: "full", sm: "400px" }} mx="auto">
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        formOptions={{
          validators: {
            onChange: loginSchema,
          },
        }}
        wrapperStyles={{
          w: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        submitText="Sign In"
      >
        {(form) => (
          <>
            <form.Field name="email">
              {(field) => (
                <Input
                  canError
                  label="Email"
                  name="email"
                  helperText="Your account email"
                  placeholder="you@example.com"
                  field={field}
                  rounded="xl"
                />
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <>
                  <Input
                    canError
                    label="Password"
                    name="password"
                    helperText="Your account password"
                    placeholder="••••••••"
                    isPassword
                    field={field}
                    rounded="xl"
                  />
                </>
              )}
            </form.Field>
            <Stack
              direction={{ base: "column-reverse", sm: "row" }}
              w={"full"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Box textStyle={"sm"}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" textStyle="sm">
                  Sign up
                </Link>
              </Box>
              <Link
                href="/forgot-password"
                textStyle="sm"
                color="text-black"
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Forgot password?
              </Link>
            </Stack>
          </>
        )}
      </Form>

      <Divider text="OR CONTINUE WITH" my={{ base: 4, md: 6 }} />

      <Box mt={{ base: 4, md: 6 }}>
        <SocialLogin />
      </Box>
    </Box>
  );
}
