import { Button, Drawer, Heading, Input, Link } from "@/components/atoms";
import { Box, HStack, Show, useBreakpointValue } from "@chakra-ui/react";
import { Search, User } from "lucide-react";
import React from "react";
import { handleSearch } from "./logic";
import { useNavbarState } from "./states";
import { ShoppingBasket } from "@/components/organisms";
import { SearchTrigger } from "@/components/molecules";

export default function NavBarActions() {
  const { isAuthed } = useNavbarState();
  const isDesktop = useBreakpointValue({ base: false, sm: true });

  return (
    <HStack gap={{ base: 2, md: 4 }}>
      {!isAuthed && (
        <Button
          variant="solid"
          colorScheme="pink"
          size="sm"
          rounded={"full"}
          px={10}
        >
          Sign up
        </Button>
      )}
      <SearchTrigger />
      <ShoppingBasket />
      {isAuthed && (
        <Button icon rounded={"full"} variant={"outline"} asChild>
          <Link href={"/account"}>
            <User />
          </Link>
        </Button>
      )}
    </HStack>
  );
}
