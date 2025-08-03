"use client";

import { Button, Link } from "@/components/atoms";
import {
  AddressActions,
  AddressDialog,
  Section,
  Slider,
} from "@/components/molecules";
import { AccountForm, PageWrapper, ProductCard } from "@/components/organisms";
import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Crosshair, Share2 } from "lucide-react";
import { useState } from "react";

export default function AccountPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const handleAdd = () => {
    setEditAddress(null);
    setDialogOpen(true);
  };

  const handleSave = (addr) => {
    if (editAddress) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editAddress.id ? { ...a, ...addr } : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...addr, id: Math.random(), label: addr.street },
      ]);
    }
    setDialogOpen(false);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleView = (addr) => {
    setEditAddress(addr);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section
        heading="Hello, John Doe"
        subheading="Track orders, update details and manage everything!"
        wrapperStyles={{ gap: 8 }}
      >
        <VStack w="full" gap={{ base: 8 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 8 }}
            w="full"
            align="flex-start"
            wrap="wrap"
          >
            <Box flex={1} w="full">
              <AccountForm />
            </Box>

            <Stack
              flex={1}
              w="full"
              gap={{ base: 4, md: 8 }}
              align="stretch"
              direction={{ base: "column", md: "row", lg: "column" }}
              maxW={{ base: "100%", lg: "md" }}
            >
              <Box w="full">
                <AddressActions
                  mode="account"
                  title="Deliver to"
                  addresses={addresses}
                  selectedId={selectedId}
                  onAdd={handleAdd}
                  onSelect={handleSelect}
                  onView={handleView}
                  onDelete={handleDelete}
                  notifyOnSelect
                  maxAddresses={3}
                />
              </Box>

              <AddressDialog
                open={dialogOpen}
                onOpenChange={({ open }) => setDialogOpen(open)}
                onSave={handleSave}
                initialValues={editAddress}
              />

              <Flex
                bg="rose.50"
                rounded="2xl"
                p={6}
                w="full"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <VStack
                  gap={4}
                  w="full"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    bg="primary"
                    p={4}
                    rounded="full"
                    color="text-white"
                    w="fit-content"
                    mx="auto"
                  >
                    <Crosshair size={32} />
                  </Box>
                  <Text textStyle="lg" fontWeight="500" textAlign="center">
                    View and track your orders
                  </Text>
                  <Button rounded="xl" minW={"2xs"} asChild>
                    <Link
                      color="text-white"
                      textDecoration="none"
                      href={"/history"}
                    >
                      {" "}
                      Check order history
                    </Link>
                  </Button>
                </VStack>
              </Flex>
            </Stack>
          </Flex>
          <Slider
            variant="functional"
            endElement={<Box fontWeight="semibold">Browse All →</Box>}
            heading="Wishlist"
            headingStyles={{
              textStyle: {
                base: "xl",
                sm: "2xl",
                md: "2xl",
                lg: "4xl",
              },
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "shorter",
            }}
            headingFollower={
              <Button
                icon
                variant="outline"
                rounded="full"
                size="2xs"
                boxSize={8}
                ms={2}
              >
                <Share2 strokeWidth={1.5} size={8} />
              </Button>
            }
            slidesPerPage={"auto"}
            action={
              <Flex color="fg.muted" gap={2} alignItems={"center"}>
                Browse All <ArrowRight strokeWidth={1.5} />
              </Flex>
            }
            snap
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCard
                id={i}
                key={i}
                image="/test_image.png"
                imageProps={{ fill: true }}
                title="Ivory Heels"
                colors={["#fff", "#d5b4b4", "#000"]}
                sizes={[
                  "x-small",
                  "small",
                  "medium",
                  "large",
                  "x-large",
                  "2x-large",
                  "38",
                  "39",
                ]}
                price={1999}
                originalPrice={2499}
                onAddToCart={() => console.log("Add to cart")}
                onLike={() => console.log("Liked")}
              />
            ))}
          </Slider>
        </VStack>
      </Section>
    </PageWrapper>
  );
}
