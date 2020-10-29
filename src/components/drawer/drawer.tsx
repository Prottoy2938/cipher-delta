import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  useDisclosure,
  DrawerCloseButton,
  IconButton,
  useToast,
} from "@chakra-ui/core";
import { BsBoundingBox } from "react-icons/bs";
import { BiKey } from "react-icons/bi";

//generate random string
const genRan = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const DashboardDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const showCopyToast = (): void => {
    navigator.clipboard.writeText(genRan());
    toast({
      title: "Copied",
      description: "Generated new encryption key, copied to clipboard",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <IconButton
        variant="outline"
        aria-label="open dashboard"
        size="sm"
        icon={<BsBoundingBox />}
        ref={btnRef}
        onClick={onOpen}
        pos="absolute"
        right="20px"
        top="5px"
        color="grey"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={12}>
            <Button
              leftIcon={<BiKey />}
              justifyContent="space-around"
              width="100%"
              mb={6}
              onClick={showCopyToast}
            >
              Secure Encryption Key
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashboardDrawer;
