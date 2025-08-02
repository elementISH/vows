"use client";
import { Button, GoogleIcon } from "@/components/atoms";
import { googleAuth } from "@/utils/functions";
import { toast } from "sonner";
export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { idToken, error } = await googleAuth();

    if (idToken) {
      console.log("Google ID Token:", idToken);
      toast.success("Signed in successfully!");
      // You can now forward this token to your backend
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
