"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      mid: "38rem",
      midL: "54rem",
    },
    keyframes: {
      fillAnim: {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.2)" },
        "100%": { transform: "scale(1)" },
      },
      sparkleBurst: {
        "0%": {
          transform: "scale(1) translate(0, 0)",
          opacity: 1,
        },
        "50%": {
          transform: "scale(1.8) translate(var(--x), var(--y))",
          opacity: 0.8,
        },
        "100%": {
          transform: "scale(0.2) translate(var(--x), var(--y))",
          opacity: 0,
        },
      },
      heartPulse: {
        "0%": { transform: "scale(1)" },
        "30%": { transform: "scale(0.65)" },
        "60%": { transform: "scale(1.3)" },
        "100%": { transform: "scale(1)" },
      },
    },
    tokens: {
      animations: {
        fillAnim: { value: "fillAnim 1s ease-in-out" },
        sparkleBurst: { value: "sparkleBurst 0.6s ease-out forwards" },
        heartPulse: { value: "heartPulse 400ms ease-in-out" },
      },
      fonts: {
        heading: { value: "var(--font-krub)" },
        body: { value: "var(--font-krub)" },
      },
      colors: {
        primary: "#D59D9A",
        "bg-color": "#FFF9F5",
        "text-white": "#F6F5F4",
        "text-black": "#2F2F2F",
        "rose.50": "#f9eeeb",
        "rose.100": "#F4E0DC",
        "rose.200": "#EAC2B9",
        "rose.400": "#d27e6b",
        "rose.500": "#c65c43",
      },
    },
  },
  globalCss: {
    "html, body": {
      backgroundColor: "#FFF9F5",
      color: "text-black",
      scrollBehavior: "smooth",
    },
    img: { userSelect: "none" },
    body: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

const system = createSystem(defaultConfig, config);
export default function Provider({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
