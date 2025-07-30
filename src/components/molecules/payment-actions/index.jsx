"use client";

import { useState } from "react";
import { VStack, HStack, Box, Text, RadioCard } from "@chakra-ui/react";
import { Check, CreditCard, Banknote } from "lucide-react";
import { Card, Heading, Link, Tooltip } from "@/components/atoms";

const methodMeta = {
  COD: {
    label: "Cash on delivery",
    icon: <Banknote strokeWidth={1.5} />,
  },
  COW: {
    label: "Card or Wallet",
    icon: <CreditCard strokeWidth={1.5} />,
  },
};

export default function PaymentActions({
  value,
  onChange,
  disabledOptions = [],
  title = "Choose how to pay",
}) {
  const renderMethodOption = (method) => {
    const isSelected = value === method;
    const isDisabled = disabledOptions.includes(method);
    const tooltipLabel =
      "you have customizable products in your cart, this option is unavailable.";

    const item = (
      <RadioCard.Item
        key={method}
        value={method}
        disabled={isDisabled}
        _disabled={{ background: "transparent" }}
        bg="transparent"
        cursor="pointer"
        _checked={{
          bg: "rose.100",
          borderColor: "primary",
          boxShadow: "none",
        }}
        _hover={{
          bg: isDisabled ? "transparent" : "rose.100",
        }}
        border="none"
        rounded="2xl"
        onClick={() => {
          if (!isDisabled) onChange?.(method);
        }}
      >
        <RadioCard.ItemHiddenInput />
        <RadioCard.ItemControl
          _disabled={{ background: "transparent", opacity: 0.5 }}
        >
          <RadioCard.ItemText>
            <HStack>
              {methodMeta[method].icon}
              {methodMeta[method].label}
            </HStack>
          </RadioCard.ItemText>
          {isSelected ? (
            <Box
              bg="primary"
              color="white"
              rounded="full"
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Check size={16} strokeWidth={3} />
            </Box>
          ) : (
            <Box
              bg="transparent"
              color="text-white"
              boxSize="6"
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={"2px solid"}
              borderColor={"gray.400"}
            />
          )}
        </RadioCard.ItemControl>
      </RadioCard.Item>
    );

    return isDisabled ? (
      <Tooltip
        key={method}
        content={tooltipLabel}
        contentProps={{
          minW: { base: "unset", md: "fit" },
          textAlign: "center",
        }}
      >
        {item}
      </Tooltip>
    ) : (
      item
    );
  };

  return (
    <Card
      variant="subtle"
      bodyStyles={{ p: 2 }}
      header={<Heading heading={title} headingStyles={{ fontWeight: "500" }} />}
      body={
        <RadioCard.Root value={value} onValueChange={onChange} width="full">
          <VStack align="stretch">
            {["COD", "COW"].map(renderMethodOption)}
          </VStack>
        </RadioCard.Root>
      }
      footer={
        <Text textStyle="xs" color="fg.muted">
          Can't find what you need? <Link href="/contact">Contact Us</Link>
        </Text>
      }
      rootStyles={{
        bg: "rose.50",
        px: 2,
        w: "full",
        flex: 1,
        height: "stretch",
      }}
      wrapperStyles={{ p: 0, w: "full", flex: 1 }}
    />
  );
}
