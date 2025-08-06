import { Button, Link } from "@/components/atoms";
import { HStack, Menu, Portal } from "@chakra-ui/react";
import { History, LogOut, User } from "lucide-react";
import React from "react";
import { useNavbarState } from "./states";
import { ShoppingBasket } from "@/components/organisms";
import { SearchTrigger } from "@/components/molecules";

export default function NavBarActions() {
  const { isAuthed, logout } = useNavbarState();
  return (
    <HStack gap={{ base: 2 }}>
      {!isAuthed && (
        <Button
          variant="solid"
          colorScheme="pink"
          size="sm"
          rounded={"full"}
          px={10}
          asChild
        >
          <Link href={"/signup"} color="text-white" textDecoration="none">
            Sign up
          </Link>
        </Button>
      )}
      <SearchTrigger />
      <ShoppingBasket />
      {isAuthed && (
        <Menu.Root>
          <Menu.Trigger rounded="full" focusRing="outside" asChild>
            <Button icon rounded={"full"} variant={"outline"}>
              <User />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="account" cursor="pointer" asChild>
                  <Link
                    href="/account"
                    color="text-black"
                    textDecoration="none"
                  >
                    <User size={16} />
                    Account
                  </Link>
                </Menu.Item>
                <Menu.Item value="history" cursor="pointer" asChild>
                  <Link
                    href="/history"
                    color="text-black"
                    textDecoration="none"
                  >
                    <History size={16} />
                    Order History
                  </Link>
                </Menu.Item>
                <Menu.Item
                  value="logout"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                  cursor="pointer"
                  onClick={() => logout()}
                >
                  <LogOut size={16} />
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </HStack>
  );
}
