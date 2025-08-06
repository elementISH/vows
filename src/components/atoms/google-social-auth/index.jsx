"use client";
import { Button, GoogleIcon } from "@/components/atoms";
import { useStore } from "@/store";
import { googleAuth } from "@/utils/functions";
import { toast } from "sonner";
export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { idToken } = await googleAuth();
    const login = useStore.getState().login;

    if (idToken) {
      const success = await login({ token: idToken }, "google");
      if (success.success) {
        redirect("/shop");
      }
      return;
    }
  };

  return (
    <Button
      onClick={handleLogin}
      icon
      color="rose.50"
      boxSize={"fit"}
      p={3}
      fontWeight="bold"
      rounded="xl"
      border="1px solid"
      borderColor="rose.500"
    >
      <GoogleIcon size="xl" color="rose.50" />
    </Button>
  );
}
