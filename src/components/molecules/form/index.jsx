"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Button } from "@/components/atoms";
import { Box, Field } from "@chakra-ui/react";
const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton: ({ children = "Submit", ...props }) => (
      <Button type="submit" w="full" {...props}>
        {children}
      </Button>
    ),
  },
  fieldComponents: {
    Input: ({ label, field, helperText }) => (
      <Field.Root
        name={field.name}
        error={field.state.meta.errors?.[0]?.message}
      >
        {label && <Field.Label>{label}</Field.Label>}
        <field.Component />
        {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      </Field.Root>
    ),
  },
});

export default function Form({
  children,
  defaultValues = {},
  onSubmit,
  formOptions = {},
  submitText = "Submit",
  wrapperStyles = {},
  limitHeight,
}) {
  const form = useAppForm({
    defaultValues,
    onSubmit,
    ...formOptions,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      style={{ width: "100%", ...wrapperStyles }}
    >
      {limitHeight ? (
        <Box h={"90%"}>
          {typeof children === "function" ? children(form) : children}
        </Box>
      ) : typeof children === "function" ? (
        children(form)
      ) : (
        children
      )}
      {}
      <form.AppForm>
        <form.SubmitButton>{submitText}</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
