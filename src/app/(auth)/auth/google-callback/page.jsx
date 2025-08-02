// pages/auth/google-callback.js
"use client";

import { useEffect } from "react";

export default function GoogleCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const idToken = params.get("id_token");
    const error = params.get("error");

    if (window.opener) {
      window.opener.postMessage(
        {
          source: "google-auth",
          idToken,
          error,
        },
        window.location.origin
      );
    }

    window.close();
  }, []);

  return null;
}
