"use client";

import { Heading } from "@/components/atoms";
import { useUserState } from "@/utils/hooks";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallback() {
  const { isAuthenticated } = useUserState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");
    const error = params.get("error");

    const hasValidTokens = idToken || accessToken;

    if (!hasValidTokens || isAuthenticated) {
      redirect("/shop");
      return;
    }

    window.opener?.postMessage(
      {
        source: "google-auth",
        idToken,
        error,
        accessToken,
      },
      window.location.origin
    );

    window.close();
  }, [isAuthenticated]);

  return (
    <Flex flex="1" justifyContent={"center"} alignItems={"center"}>
      <Heading
        heading={"Authenticating..."}
        headingStyles={{ color: "rose.500", textStyle: "4xl" }}
      />
    </Flex>
  );
}
