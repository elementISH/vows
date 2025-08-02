import { toast } from "sonner";

export default function googleAuth() {
  return new Promise((resolve) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google-callback`;
    const scope = "openid email profile";
    const state = crypto.randomUUID();
    const responseType = "token id_token";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&nonce=${state}&prompt=select_account`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      const error = "popup_failed_to_open";
      toast.error("Popup blocked. Please enable popups in your browser.");
      console.error("[Google Auth] Failed to open popup");
      resolve({ idToken: null, error });
      return;
    }

    const messageHandler = (event) => {
      if (
        event.origin !== window.location.origin ||
        !event.data?.source === "google-auth"
      ) {
        return;
      }

      const { idToken, error } = event.data;

      clearTimeout(timeout);
      window.removeEventListener("message", messageHandler);

      try {
        popup.close();
      } catch {}

      if (idToken) {
        console.log("[Google Auth] Token received");
        resolve({ idToken });
      } else {
        toast.error("Authentication failed. No token returned.");
        console.warn("[Google Auth] No token in response", error);
        resolve({ idToken: null, error: error || "no_token" });
      }
    };

    window.addEventListener("message", messageHandler);

    const timeout = setTimeout(() => {
      try {
        popup.close();
      } catch {}
      window.removeEventListener("message", messageHandler);
      const error = "timeout";
      toast.error("Authentication timed out. Please try again.");
      console.error("[Google Auth] Timed out after waiting");
      resolve({ idToken: null, error });
    }, 15000);
  });
}
