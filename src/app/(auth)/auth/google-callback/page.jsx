"use client";

import { Heading } from "@/components/atoms";
import { useUserState } from "@/utils/hooks";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallback() {
  const { isAuthenticated } = useUserState();
  const router = useRouter();

  useEffect(() => {
    const parseParams = () => {
      const hash = window.location.hash
        ? new URLSearchParams(window.location.hash.slice(1))
        : null;
      const search = window.location.search
        ? new URLSearchParams(window.location.search)
        : null;
      return {
        idToken: hash?.get("id_token") ?? search?.get("id_token"),
        accessToken: hash?.get("access_token") ?? search?.get("access_token"),
        error: hash?.get("error") ?? search?.get("error"),
        state: hash?.get("state") ?? search?.get("state"),
      };
    };

    const { idToken, accessToken, error } = parseParams();
    const hasValidTokens = Boolean(idToken || accessToken);

    if (!hasValidTokens || isAuthenticated) {
      if (window.opener) {
        try {
          window.close();
        } catch (e) {
          router.replace("/shop");
        }
      } else {
        router.replace("/shop");
      }
    }

    try {
      const message = {
        source: "google-auth",
        idToken,
        accessToken,
        error,
      };

      const targetOrigin =
        (window.opener &&
          window.opener.location &&
          window.opener.location.origin) ||
        window.location.origin ||
        "*";

      window.opener?.postMessage(message, targetOrigin);
    } catch (err) {
      window.opener?.postMessage(
        {
          source: "google-auth",
          idToken,
          accessToken,
          error,
        },
        "*"
      );
    } finally {
      window.close();
    }
  }, [isAuthenticated, router]);

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Heading
        heading="Authenticating..."
        headingStyles={{ color: "rose.500", textStyle: "4xl" }}
      />
    </Flex>
  );
}
