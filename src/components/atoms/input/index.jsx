"use client";

import {
  Field,
  Input as ChakraInput,
  InputGroup,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/atoms";

export default function Input({
  name,
  label,
  helperText,
  placeholder,
  isPassword = false,
  isClearable = false,
  enableDebounce = false,
  onDebouncedChange,
  defaultValue = "",
  startElement,
  endElement,
  field,
  canError = false,
  startElementProps = {},
  endElementProps = {},
  labelProps = {},
  ...rest
}) {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(defaultValue);

  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";
  const fieldName = field?.name ?? name;
  const fieldValue = field?.state?.value ?? "";
  const errorRaw = field?.state?.meta?.errors?.[0];

  const errorMessage = (() => {
    const err = field?.state?.meta?.errors?.[0];
    if (!err) return "";
    if (typeof err === "string") return err;
    if (Array.isArray(err)) return err.join(", ");
    if (typeof err === "object" && "message" in err) return err.message;
    return String(err);
  })();

  useEffect(() => {
    if (!enableDebounce || typeof onDebouncedChange !== "function") return;
    const timeout = setTimeout(() => {
      onDebouncedChange(debouncedValue);
    }, 400);
    return () => clearTimeout(timeout);
  }, [debouncedValue, enableDebounce, onDebouncedChange]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (field?.handleChange) field.handleChange(val);
    setDebouncedValue(val);
  };

  const handleClear = () => {
    if (field?.handleChange) field.handleChange("");
    setDebouncedValue("");
    inputRef.current?.focus();
  };

  const endElementPassword = (
    <>
      {isPassword && (
        <Button
          size="sm"
          onClick={() => setShowPassword((prev) => !prev)}
          icon
          variant="ghost"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      )}
      {isClearable && fieldValue && !isPassword && (
        <CloseButton size="sm" aria-label="Clear input" onClick={handleClear} />
      )}
    </>
  );

  return (
    <Field.Root name={fieldName} error={errorMessage}>
      {label && <Field.Label {...labelProps}>{label}</Field.Label>}

      <InputGroup
        startElementProps={{ ...startElementProps }}
        endElementProps={{ ...endElementProps }}
        startElement={startElement}
        endElement={isPassword ? endElementPassword : endElement}
      >
        <ChakraInput
          ref={inputRef}
          name={fieldName}
          value={field ? fieldValue : undefined}
          placeholder={placeholder}
          type={inputType}
          bg="bg-color"
          outlineColor="primary"
          borderColor={`${
            errorMessage ? "red.500" : rest.borderColor || "primary"
          }`}
          textStyle="md"
          onChange={handleChange}
          onBlur={field?.handleBlur}
          {...rest}
        />
      </InputGroup>

      {canError ? (
        <Box minH="1.5rem">
          {errorMessage ? (
            <Field.HelperText color="red.500">{errorMessage}</Field.HelperText>
          ) : helperText ? (
            <Field.HelperText>{helperText}</Field.HelperText>
          ) : null}
        </Box>
      ) : helperText ? (
        <Field.HelperText>{helperText}</Field.HelperText>
      ) : null}
    </Field.Root>
  );
}
