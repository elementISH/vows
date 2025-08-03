"use client";

import { useEffect } from "react";

export default function GoogleCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");
    const error = params.get("error");

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
  }, []);

  return null;
}
