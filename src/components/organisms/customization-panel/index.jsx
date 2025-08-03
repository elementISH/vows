"use client";

import { useRef, useState } from "react";
import {
  Box,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Text,
  Slider,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Check, CheckCircle, Palette, Plus, X } from "lucide-react";
import { Button, Image, Input } from "@/components/atoms";

const fontOptions = [
  { id: 1, label: "Roboto", value: "Roboto, sans-serif" },
  { id: 2, label: "Open Sans", value: "'Open Sans', sans-serif" },
  { id: 3, label: "Playfair Display", value: "'Playfair Display', serif" },
  { id: 4, label: "Lobster", value: "'Lobster', cursive" },
  { id: 5, label: "Pacifico", value: "'Pacifico', cursive" },
  { id: 6, label: "Anton", value: "'Anton', sans-serif" },
  { id: 7, label: "Oswald", value: "'Oswald', sans-serif" },
  { id: 8, label: "Dancing Script", value: "'Dancing Script', cursive" },
  { id: 9, label: "Raleway", value: "'Raleway', sans-serif" },
  { id: 10, label: "Merriweather", value: "'Merriweather', serif" },
];

const patternOptions = [
  { id: "pattern1", label: "Pattern 1", imageUrl: "/flags/arabic.svg" },
  { id: "pattern2", label: "Pattern 2", imageUrl: "/flags/english.svg" },
];

export default function CustomizationPanel({ maxImages = 3 }) {
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [images, setImages] = useState(Array(maxImages).fill(null));
  const fileInputRefs = useRef([]);
  const [errors, setErrors] = useState({});

  const handleSelectImage = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const getPreviewUrl = (fileOrUrl) => {
    if (typeof fileOrUrl === "string") return fileOrUrl;
    return URL.createObjectURL(fileOrUrl);
  };

  const validate = () => {
    const errs = {};
    if (!text.trim()) errs.text = "Text is required.";
    if (text.trim().split(/\s+/).length > 6)
      errs.text = "Maximum of 6 words allowed.";
    if (!selectedFont) errs.font = "Font selection is required.";
    if (!selectedPattern) errs.pattern = "Pattern selection is required.";
    if (images.some((img) => !img))
      errs.images = "All image slots must be filled.";
    Object.entries(errs).forEach(([key, msg]) => {
      toast.error(msg);
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      text,
      font: selectedFont,
      pattern: selectedPattern,
      letterSpacing,
      images,
    };

    console.log("Submitted customization:", payload);
    // You could now fire an API or propagate to parent
  };

  return (
    <Dialog.Root placement="top">
      <Dialog.Trigger asChild>
        <Button variant="outline" textStyle="sm" rounded="2xl" maxW="full">
          <Palette strokeWidth={2} color="var(--chakra-colors-primary)" />
          <Text truncate>Add custom text, choose patterns and more</Text>
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Customize Product</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body
              maxH="md"
              overflowY="auto"
              className="customScroll"
              me={2}
            >
              <Box w="full" display="flex" flexDirection="column" gap={6}>
                {/* TEXT + FONT */}
                <Box>
                  <Text fontWeight="semibold" textStyle="md" mb={2}>
                    Text & Font
                  </Text>

                  <Box
                    p={3}
                    mb={2}
                    border="1px solid"
                    borderColor="primary"
                    bg="rose.100"
                    rounded="md"
                    h={"24"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                    fontFamily={selectedFont?.value || "inherit"}
                    letterSpacing={`${letterSpacing}px`}
                    overflow={"hidden"}
                  >
                    <Text textStyle="lg" textAlign="center">
                      {text || "Start typing to see the magic!"}
                    </Text>
                  </Box>

                  <Flex gap={2} mb={3} flexWrap="wrap">
                    {fontOptions.map((font) => (
                      <Button
                        key={font.id}
                        variant={"outline"}
                        bg={
                          selectedFont?.id === font.id
                            ? "primary"
                            : "transparent"
                        }
                        color={
                          selectedFont?.id === font.id
                            ? "text-white"
                            : "text-black"
                        }
                        fontFamily={font.value}
                        size="xs"
                        rounded={"full"}
                        onClick={() => setSelectedFont(font)}
                      >
                        {font.label}
                      </Button>
                    ))}
                  </Flex>

                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter custom text"
                    bg="transparent"
                    rounded="xl"
                    mb={errors.text ? 1 : 4}
                  />
                  {errors.text && (
                    <Text color="red.500" textStyle="xs">
                      {errors.text}
                    </Text>
                  )}

                  <Slider.Root
                    value={[letterSpacing]}
                    min={0}
                    max={6}
                    step={0.1}
                    onValueChange={(val) => setLetterSpacing(val.value[0])}
                  >
                    <HStack justify="space-between">
                      <Slider.Label>letter Spacing</Slider.Label>
                      <Slider.ValueText />
                    </HStack>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumbs />
                    </Slider.Control>
                  </Slider.Root>
                </Box>

                {/* PATTERN */}
                <Box>
                  <Text fontWeight="semibold" textStyle="md" mb={2}>
                    Pattern
                  </Text>
                  <Flex gap={3} flexWrap="wrap">
                    {patternOptions.map((pattern) => (
                      <Box
                        key={pattern.id}
                        borderWidth="2px"
                        borderColor={
                          selectedPattern === pattern.id
                            ? "primary"
                            : "rose.200"
                        }
                        rounded="md"
                        overflow="hidden"
                        w={24}
                        h={24}
                        cursor="pointer"
                        position="relative"
                        onClick={() => setSelectedPattern(pattern.id)}
                      >
                        <Image
                          src={pattern.imageUrl}
                          alt={pattern.label}
                          nextProps={{ fill: true }}
                          chakraProps={{ objectFit: "cover" }}
                        />
                        {selectedPattern === pattern.id && (
                          <Box
                            bg={"rose.600"}
                            rounded={"full"}
                            position="absolute"
                            top={1}
                            right={1}
                          >
                            <Icon as={Check} boxSize={5} color="text-white" />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Flex>
                  {errors.pattern && (
                    <Text color="red.500" textStyle="xs">
                      {errors.pattern}
                    </Text>
                  )}
                </Box>

                {/* IMAGES */}
                <Box>
                  <Text fontWeight="semibold" textStyle="md" mb={2}>
                    Upload Images ({maxImages} required)
                  </Text>

                  <Flex gap={3} wrap="wrap">
                    {images.map((img, index) => (
                      <Box
                        key={index}
                        w={32}
                        h={32}
                        rounded="md"
                        border="2px dashed"
                        borderColor="rose.400"
                        position="relative"
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={() => fileInputRefs.current[index]?.click()}
                      >
                        {img ? (
                          <>
                            <Image
                              src={getPreviewUrl(img)}
                              alt={`Image ${index + 1}`}
                              nextProps={{ fill: true }}
                              chakraProps={{ objectFit: "cover" }}
                            />
                            <Button
                              icon
                              size="xs"
                              position="absolute"
                              top="1"
                              right="1"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                            >
                              <X size={12} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Plus
                              size={18}
                              color="var(--chakra-colors-rose\.400)"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              ref={(el) => (fileInputRefs.current[index] = el)}
                              onChange={(e) => handleSelectImage(e, index)}
                            />
                          </>
                        )}
                      </Box>
                    ))}
                  </Flex>
                  {errors.images && (
                    <Text color="red.500" textStyle="xs" mt={1}>
                      {errors.images}
                    </Text>
                  )}
                </Box>
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
