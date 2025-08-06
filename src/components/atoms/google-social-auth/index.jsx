"use client";
import { Button, GoogleIcon } from "@/components/atoms";
import { useStore } from "@/store";
import { googleAuth } from "@/utils/functions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { accessToken } = await googleAuth();
    const login = useStore.getState().login;

    if (accessToken) {
      const success = await login({ token: accessToken }, "google");
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
