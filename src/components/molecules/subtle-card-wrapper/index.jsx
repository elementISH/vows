"use client";

import { Card } from "@/components/atoms";

export default function SubtleCardWrapper({
  children,
  header,
  footer,
  bodyStyles = {},
  rootStyles = {},
  wrapperStyles = {},
}) {
  return (
    <Card
      variant="subtle"
      body={children}
      header={header}
      footer={footer}
      bodyStyles={{ px: 2, ...bodyStyles }}
      rootStyles={{ bg: "rose.50", w: "full", flex: 1, ...rootStyles }}
      wrapperStyles={{ p: 0, w: "full", flex: 1, ...wrapperStyles }}
    />
  );
}
