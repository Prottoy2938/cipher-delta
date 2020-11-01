import React, { useState } from "react";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  InputRightAddon,
  Button,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Kbd,
  Code,
  Link,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { CopyIcon, InfoIcon } from "@chakra-ui/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrEmergency } from "react-icons/gr";
import { Props } from "./encryption-key.model";
import { isMobile } from "react-device-detect";
import { FaSave } from "react-icons/fa";

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

const EncryptionKey: React.FC<Props> = (props: Props) => {
  const toast = useToast();

  const { colorMode } = useColorMode();

  const { setEncKey, encKey, skip, setSkip } = props;

  const [showEncKey, setShowEncKey] = useState(false);

  const handleSkipChange = (skip: any) => {
    if (skip <= 25 && skip >= -25) {
      setSkip(Number(skip));
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEncKey({ ...encKey, key: e.target.value });
  };

  const handleKeyCopy = (): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(encKey.key);

      toast({
        status: "info",
        description: "Copied",
        isClosable: true,
        duration: 1500,
      });
    } else {
      toast({
        description: "Something went wrong, couldn't copy",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEncryptContent = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (encKey.key.length) {
      toast({
        status: "info",
        description: "Encryption key removed",
        isClosable: true,
        duration: 2200,
      });
      setEncKey({ ...encKey, enabled: true });
    } else {
      toast({
        status: "warning",
        description: "Encryption key is empty",
        isClosable: true,
        duration: 2200,
      });
    }
  };

  const removeEncryption = (): void => {
    setEncKey({ key: "", enabled: false });
    toast({
      status: "warning",
      description: "Encryption key removed",
      isClosable: true,
      duration: 2200,
    });
  };

  const handleUpdateKey = (): void => {
    setEncKey({ enabled: true, key: genRan(18) });
    toast({
      title: "Generated new encryption key",
      description: "Applied newly generated encryption key",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  const removeSavedKey = (): void => {
    window.localStorage.removeItem("cd-enc-key");
    toast({
      description: "key removed from localstorage",
      status: "warning",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleStoreKey = (): void => {
    window.localStorage.setItem("cd-enc-key", encKey.key);
    toast({
      position: isMobile ? "bottom" : "bottom-right",
      isClosable: true,
      duration: 9000,
      // eslint-disable-next-line react/display-name
      render: ({ onClose }: any) => (
        <Alert
          status="success"
          variant={colorMode === "dark" ? "solid" : "subtle"}
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Saved key</AlertTitle>
            <AlertDescription display="block" mt={6}>
              <Text>Saved key to browser storage (local storage)</Text>

              <Text mt={7}>
                If this was a mistake,{" "}
                <Button size="xs" onClick={removeSavedKey}>
                  remove it.
                </Button>{" "}
                from storage
              </Text>
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={onClose}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      ),
    });
  };

  return (
    <Box width="100%" mt={["10%", "10%", "10%", "28%"]}>
      <Box display="flex" justifyContent="center">
        <Text mr={5}>Substitute Letter Position: </Text>
        <NumberInput
          size="sm"
          max={25}
          min={-25}
          w="70px"
          h="30px"
          keepWithinRange={false}
          clampValueOnBlur={false}
          onChange={handleSkipChange}
          value={skip}
          borderColor={colorMode === "dark" ? "#292929 !important" : "gray.200"}
        >
          <NumberInputField />

          <NumberInputStepper
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            <Tooltip
              // hasArrow
              label="forward substitute letter position"
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="top"
            >
              <NumberIncrementStepper />
            </Tooltip>
            <Tooltip
              hasArrow
              label="backward substitute letter position"
              bg={colorMode === "dark" ? "gray.300" : "black"}
              placement="bottom"
            >
              <NumberDecrementStepper />
            </Tooltip>
          </NumberInputStepper>
        </NumberInput>
        <Popover>
          <PopoverTrigger>
            <IconButton
              bg="transparent"
              size="sm"
              ml={3}
              aria-label="whats substitute letter position"
              icon={<InfoIcon />}
            />
          </PopoverTrigger>
          <PopoverContent
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader
              borderBottom="2px solid"
              borderColor={
                colorMode === "dark" ? "#292929 !important" : "gray.200"
              }
            >
              Substitute letter position
            </PopoverHeader>
            <PopoverBody textAlign="start">
              Set the substitute letter position. For example, if the position
              is in <Kbd>5</Kbd>, then for the letter <Code>a</Code> it would be
              replaced by the letter <Code>e</Code>, and for the letter{" "}
              <Code>b</Code> it would be replaced by the letter <Code>f</Code>{" "}
              and the pattern will continue on all letters respectively.
              <Text mt={3}>
                Learn more about{" "}
                <Link
                  color="purple.700"
                  href="https://en.wikipedia.org/wiki/Substitution_cipher"
                >
                  substitution cipher
                </Link>
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <Box
        display="grid"
        justifyContent="center"
        mt={5}
        as="form"
        onSubmit={handleEncryptContent}
      >
        <InputGroup size="sm">
          {!isMobile && (
            <InputLeftAddon
              borderColor={
                colorMode === "dark" ? "#292929 !important" : "gray.200"
              }
              pl={[1, 2, 3, 4]}
              pr={[1, 2, 3, 4]}
            >
              optional
            </InputLeftAddon>
          )}
          <Input
            type="text"
            placeholder={
              isMobile ? "encryption key (optional)" : "encryption key"
            }
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
            width="250px"
            value={showEncKey ? encKey.key : "•".repeat(encKey.key.length)}
            onChange={handleKeyChange}
            disabled={encKey.enabled}
          />
          <InputRightAddon
            mr={3}
            padding="0"
            borderColor={
              colorMode === "dark" ? "#292929 !important" : "gray.200"
            }
          >
            {encKey.enabled ? (
              <Button
                borderRadius={0}
                height="100%"
                pl={[1, 2, 3, 4]}
                pr={[1, 2, 3, 4]}
                size="sm"
                fontWeight="regular"
                type="button"
                onClick={removeEncryption}
              >
                {isMobile ? "remove" : "remove encryption"}
              </Button>
            ) : (
              <Button
                borderRadius={0}
                height="100%"
                width="60px"
                size="sm"
                fontWeight="regular"
                type="submit"
              >
                use
              </Button>
            )}
          </InputRightAddon>
        </InputGroup>
        <Box mt={[6, 6, 6, 3]}>
          <Tooltip
            label={`${showEncKey ? "hide" : "view"} key`}
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              variant="outline"
              size="sm"
              aria-label="view key"
              icon={showEncKey ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              onClick={(): void => setShowEncKey(!showEncKey)}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>

          <Tooltip
            bg={colorMode === "dark" ? "gray.300" : "black"}
            shouldWrapChildren
            label="copy key"
            placement="top"
          >
            <IconButton
              onClick={handleKeyCopy}
              ml={2}
              variant="outline"
              size="sm"
              aria-label="copy encryption key"
              icon={<CopyIcon />}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>
          <Tooltip
            // hasArrow
            textAlign="center"
            label="save key to browser storage (localstorage) for later use"
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              variant="outline"
              size="sm"
              aria-label="save key to browser storage (localstorage) for later use"
              icon={<FaSave />}
              borderRadius={1}
              ml={4}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              onClick={handleStoreKey}
            />
          </Tooltip>
          <Tooltip
            label="generate new key and apply"
            bg={colorMode === "dark" ? "gray.300" : "black"}
            placement="top"
          >
            <IconButton
              ml={4}
              variant="outline"
              size="sm"
              aria-label="generate new key and apply"
              icon={<GrEmergency />}
              onClick={handleUpdateKey}
              borderRadius={1}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </Tooltip>
        </Box>
      </Box>
      <Image
        src="/line-arrow-sketch.svg"
        width="300px"
        m="0 auto"
        mt={8}
        height="30px"
        className={colorMode === "dark" ? "svg-white" : "svg-black"}
      />
    </Box>
  );
};

export default EncryptionKey;
