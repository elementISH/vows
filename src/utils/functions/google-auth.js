import { toast } from "sonner";

export default function googleAuth() {
  return new Promise((resolve) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google-callback`;
    const scope = "openid email profile";
    const state = crypto.randomUUID();
    const nonce = state;
    const responseType = "token id_token";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&nonce=${nonce}&prompt=select_account`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "google_oauth_popup",
      `width=${width},height=${height},left=${left},top=${top},popup`
    );

    if (!popup) {
      const error = "popup_blocked";
      toast.error("Popup blocked. Please enable popups in your browser.");
      console.error("[Google Auth] Failed to open popup");
      resolve({ idToken: null, error });
      return;
    }

    // Listen for response from redirect page
    const messageHandler = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.source !== "google-auth") return;

      const { idToken, error } = event.data;

      cleanup();

      try {
        popup.close();
      } catch {}

      if (error === "access_denied") {
        toast.warning("Access denied. You didn’t authorize the login.");
        resolve({ idToken: null, error });
      } else if (error === "immediate_failed") {
        toast.error("Auto sign-in failed. Please sign in manually.");
        resolve({ idToken: null, error });
      } else if (!idToken) {
        toast.error("Authentication failed. No token returned.");
        resolve({ idToken: null, error: error || "no_token" });
      } else {
        console.log("[Google Auth] Token received");
        resolve({ idToken });
      }
    };

    // Watch if user closes popup manually
    const popupCheck = setInterval(() => {
      try {
        if (popup.closed) {
          cleanup();
          toast.warning("Sign-in cancelled. You closed the window.");
          console.warn("[Google Auth] Popup closed by user");
          resolve({ idToken: null, error: "popup_closed_by_user" });
        }
      } catch {
        // Ignore cross-origin error
      }
    }, 500);

    // Timeout fallback
    const timeout = setTimeout(() => {
      cleanup();
      try {
        popup.close();
      } catch {}
      toast.warning("Sign-in timed out. Please try again.");
      resolve({ idToken: null, error: "timeout" });
    }, 15000);

    // Attach listener
    window.addEventListener("message", messageHandler);

    // Cleanup everything
    function cleanup() {
      clearTimeout(timeout);
      clearInterval(popupCheck);
      window.removeEventListener("message", messageHandler);
    }
  });
}
