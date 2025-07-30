import { Button as ChakraButton, IconButton } from "@chakra-ui/react";

/**
 * @typedef {import("@chakra-ui/react").ButtonProps} ButtonProps
 */

/**
 * @param {ButtonProps & {
 *   variant?: "solid" | "outline",
 *   loading?: boolean,
 *   icon?: boolean,
 * }} props
 */
export default function Button({
  children,
  variant = "solid",
  loading = false,
  icon = false,
  active = false,
  activeColor = "primary",
  ...props
}) {
  const styles = {
    solid: {
      bg: "primary",
      color: "text-white",
      border: "none",
    },
    outline: {
      bg: "bg-color",
      color: "black",
      border: "1px solid",
      borderColor: "primary",
    },
  };

  const styleProps = styles[variant] ?? { variant };
  const stopHover =
    styleProps.variant === "ghost"
      ? {
          _hover: {
            bg: "primary/20",
          },
        }
      : {
          _hover: {
            filter: "brightness(0.95)",
          },
        };
  if (icon) {
    return (
      <IconButton
        isLoading={loading}
        rounded="lg"
        textStyle="md"
        padding={2}
        {...styleProps}
        {...stopHover}
        {...props}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <ChakraButton
      size="md"
      textStyle="md"
      padding={4}
      rounded="lg"
      isLoading={loading}
      {...styleProps}
      {...props}
      bg={
        variant == "outline" && active && activeColor
          ? activeColor
          : props?.bg || styles[variant]?.bg
      }
    >
      {children}
    </ChakraButton>
  );
}
