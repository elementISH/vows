"use client";
import {
  Button,
  Card,
  Divider,
  Heading,
  Image,
  Input,
  Link,
} from "@/components/atoms";
import {
  AddressActions,
  AddressDialog,
  CardShell,
  PaymentActions,
  Section,
} from "@/components/molecules";
import { PageWrapper } from "@/components/organisms";
import CartItems from "@/components/organisms/basket/cartItems";
import {
  Box,
  Flex,
  FormatNumber,
  HStack,
  RadioCard,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  Banknote,
  Check,
  CreditCard,
  Info,
  MapPinHouse,
  TicketPercent,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("COW");
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const selectedAddress =
    addresses.find((address) => address.id == selectedId) || null;
  const selectedPayemntMethod = paymentMethod || null;
  const handleAdd = () => {
    setEditAddress(null);
    setDialogOpen(true);
  };
  const handleDialogOpenClose = () => {
    setDialogOpen(!dialogOpen);
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
    // use `id` for delivery or primary-address logic
  };

  const handleView = (addr) => {
    setEditAddress(addr);
    setDialogOpen(true);
  };
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };
  const handleSubmitOrder = () => {
    console.log({
      address: selectedAddress,
      payment: selectedPayemntMethod,
    });
  };
  return (
    <PageWrapper px={{ base: 4, sm: 4, md: 8 }}>
      <Section
        heading="Checkout"
        subheading="Double-check everything. We’ll take care of the rest."
      >
        <Flex
          direction={{ base: "column", md: "row", xl: "row" }}
          wrap={{ base: "nowrap", sm: "wrap", lg: "nowrap" }}
          w="full"
          flex={1}
          gap={4}
        >
          <VStack w="full" flex={1} gap={4} order={1}>
            <Stack
              w="full"
              gap={4}
              direction={{ base: "column", md: "row" }}
              order={{
                base: 2,
                md: 2,
                lg: 0, // appears on top in large view
              }}
            >
              <AddressActions
                mode="checkout"
                title="Deliver to"
                addresses={addresses}
                selectedId={selectedId}
                onAdd={handleAdd}
                onSelect={handleSelect}
                onView={handleView}
                notifyOnSelect={false}
                maxAddresses={3}
              />
              <AddressDialog
                open={dialogOpen}
                onOpenChange={handleDialogOpenClose}
                onSave={handleSave}
                initialValues={editAddress}
              />
              <PaymentActions
                value={paymentMethod}
                onChange={setPaymentMethod}
                disabledOptions={["COD"]}
              />
            </Stack>
            <CardShell
              topContent={
                <HStack gap={4} alignItems={"start"}>
                  <Info />
                  <Heading
                    heading="Check all your items before checking out"
                    subheading="ensure all sizes, colors, and product details are correct"
                    wrapperStyles={{ gap: 1 }}
                    headingStyles={{
                      textStyle: {
                        base: "md",
                        sm: "lg",
                        md: "xl",
                        lg: "2xl",
                        xl: "2xl",
                      },
                    }}
                    subheadingStyles={{
                      color: "text-white",
                      textStyle: {
                        base: "xs",
                        sm: "sm",
                        md: "md",
                        lg: "lg",
                        xl: "lg",
                      },
                    }}
                  />
                </HStack>
              }
              heading="Basket"
              headingFollower="3 items"
              actions={
                <Button
                  variant="ghost"
                  color="red.500"
                  px={0}
                  alignItems={"stretch"}
                  _hover={{ bg: "transparent" }}
                >
                  <Trash strokeWidth={2} />
                  Remove all
                </Button>
              }
              cardStyles={{
                variant: "subtle",
                roundedTop: "2xl",
                bg: "#fff9f9",
              }}
              topLayerStyles={{
                mb: 6,
              }}
              wrapperStyles={{
                w: "full",
                order: 1,
              }}
            >
              {/* Main card content here */}
              <CartItems switchActions />
            </CardShell>
          </VStack>
          <Card
            order={{ base: 3, md: 2, lg: 2 }}
            variant="subtle"
            bodyStyles={{ p: 2 }}
            header={
              <Heading
                heading="Order Summary"
                headingStyles={{
                  textStyle: { base: "lg", md: "xl" },
                  fontWeight: "500",
                }}
              />
            }
            body={
              <>
                <Input
                  name="discount-code"
                  rounded="xl"
                  bg="transparent"
                  placeholder="XXXXXX"
                  py="6"
                  startElement={<TicketPercent strokeWidth={1.5} />}
                  ps="12"
                  label="Discount Code"
                  labelProps={{
                    textStyle: { base: "sm", md: "md", lg: "lg" },
                    fontWeight: "normal",
                  }}
                  helperText={
                    <Box
                      as="span"
                      color="rose.500"
                      fontWeight={500}
                      textStyle="sm"
                    >
                      XXXXXX code applied!{" "}
                      <Box as="span" textDecoration="underline wavy">
                        saved 20%
                      </Box>
                    </Box>
                  }
                />

                <Divider color="primary" mt="6" mb="4" />

                <VStack flex={1} w="full" gap={2} align="stretch">
                  <HStack justify="space-between" w="full">
                    <Text textStyle={{ base: "sm", md: "md" }}>Subtotal</Text>
                    <Text
                      fontWeight="bold"
                      textStyle={{ base: "sm", md: "md" }}
                    >
                      <FormatNumber
                        value="37900"
                        style="currency"
                        currency="EGP"
                      />
                    </Text>
                  </HStack>

                  <HStack justify="space-between" w="full">
                    <Text textStyle={{ base: "sm", md: "md" }}>Shipping</Text>
                    <Text
                      fontWeight="bold"
                      textStyle={{ base: "sm", md: "md" }}
                    >
                      <FormatNumber
                        value="200"
                        style="currency"
                        currency="EGP"
                      />
                    </Text>
                  </HStack>

                  <HStack justify="space-between" color="primary" w="full">
                    <Text textStyle={{ base: "sm", md: "md" }}>You saved</Text>
                    <Text
                      fontWeight="bold"
                      textStyle={{ base: "sm", md: "md" }}
                      css={{
                        textDecoration: "underline wavy",
                        textDecorationThickness: "2px",
                        textDecorationSkipInk: "none",
                        textUnderlineOffset: "20%",
                      }}
                    >
                      <FormatNumber
                        value="2000"
                        style="currency"
                        currency="EGP"
                      />
                    </Text>
                  </HStack>

                  <HStack
                    justify="space-between"
                    mt={4}
                    bg="rose.100"
                    p={3}
                    rounded="xl"
                    w="full"
                  >
                    <Text textStyle={{ base: "md", md: "lg" }}>
                      Total{" "}
                      <Box as="span" textStyle="2xs" color="fg.muted">
                        (tax incl.)
                      </Box>
                    </Text>
                    <Text
                      fontWeight="bold"
                      textStyle={{ base: "md", md: "lg" }}
                    >
                      <FormatNumber
                        value="200"
                        style="currency"
                        currency="EGP"
                      />
                    </Text>
                  </HStack>
                </VStack>

                <Button
                  mt={4}
                  py={6}
                  rounded="2xl"
                  fontWeight="bold"
                  w="full"
                  disabled={!selectedAddress || !selectedPayemntMethod}
                  onClick={() => handleSubmitOrder()}
                  asChild
                >
                  <Link
                    href={"thank-you"}
                    color="text-white"
                    textDecoration="none"
                  >
                    <CreditCard />
                    Continue to payment
                  </Link>
                </Button>

                {/* Payment method logos */}
                <Wrap
                  gap={{ base: 2, sm: 4 }}
                  align="center"
                  justify="center"
                  mt={4}
                  px={{ base: 0, md: 2 }}
                >
                  {[
                    { src: "/visa_logo.svg", alt: "visa logo" },
                    { src: "/paymob_logo.svg", alt: "paymob logo" },
                    { src: "/mastercard_logo.svg", alt: "mastercard logo" },
                  ].map(({ src, alt }, i) => (
                    <Image
                      key={i}
                      src={src}
                      chakraProps={{
                        boxSize: { base: "14", md: "16", lg: "20" },
                        filter: "grayscale(100) contrast(0.5)",
                      }}
                      alt={alt}
                      nextProps={{ width: 600, height: 600 }}
                    />
                  ))}
                  <Text
                    fontWeight="bold"
                    textStyle={{ base: "md", sm: "lg", md: "xl" }}
                    filter="grayscale(100) contrast(0.5)"
                  >
                    Cash
                  </Text>
                </Wrap>
              </>
            }
            footer={
              <Text textStyle="xs" color="fg.muted">
                Can't find what you need?{" "}
                <Link href="/contact">Contact Us</Link>
              </Text>
            }
            rootStyles={{
              bg: "rose.50",
              px: 4,
              w: "full",
              maxW: { base: "unset", lg: "sm", xl: "md" },
              maxH: "fit",
            }}
            headerStyles={{ px: 2 }}
            footerStyles={{ px: 2 }}
          />
        </Flex>
      </Section>
    </PageWrapper>
  );
}
