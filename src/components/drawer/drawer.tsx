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
  DrawerFooter,
  Box,
  Image,
  useColorMode,
  Tooltip,
} from "@chakra-ui/core";
import { BsBoundingBox } from "react-icons/bs";
import { BiKey } from "react-icons/bi";
import { SunIcon, MoonIcon, EmailIcon } from "@chakra-ui/icons";
import { ImNewspaper } from "react-icons/im";

//generate random string
const genRan = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const DashboardDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const { toggleColorMode, colorMode } = useColorMode();

  const showCopyToast = (): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(genRan(18));
      toast({
        title: "Copied",
        description: "Generated new encryption key, copied to clipboard",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Couldn't copy the generated code",
        description: "Copy to clipboard not supported on this device",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
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
        right={["5px", "8px", "12px", "20px"]}
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
            <Button
              leftIcon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
              justifyContent="space-around"
              width="100%"
              mb={6}
              onClick={toggleColorMode}
            >
              Appearance
            </Button>
            <a href="https://blog.edrini.xyz/posts/cipher-delta">
              <Button
                leftIcon={<ImNewspaper />}
                justifyContent="space-around"
                width="100%"
                mb={6}
              >
                How its build
              </Button>
            </a>
            <Tooltip
              label="svesp@protonmail.com"
              aria-label="contact email: svesp@protonmail.com"
            >
              <a href="mailto:svesp@protonmail.com">
                <Button
                  leftIcon={<EmailIcon />}
                  justifyContent="space-around"
                  width="100%"
                  mb={6}
                >
                  Send Feedback
                </Button>
              </a>
            </Tooltip>
          </DrawerBody>
          <DrawerFooter>
            <Box>
              <Image src="/tree.svg" alt="tree" />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashboardDrawer;
