import React from "react";
import { Props } from "./more-feature.model";
import { FaSave } from "react-icons/fa";
import { Tooltip, IconButton, useColorMode } from "@chakra-ui/core";

const MoreFeature: React.FC<Props> = (props: Props) => {
  const { colorMode } = useColorMode();

  return (
    <div>
      {" "}
      <Tooltip
        // hasArrow
        label="save key to browser storage (localstorage)"
        bg={colorMode === "dark" ? "gray.300" : "black"}
        placement="top"
      >
        <IconButton
          variant="outline"
          size="sm"
          aria-label="save key to browser storage (localstorage)"
          icon={<FaSave />}
          borderRadius={1}
          ml={4}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        />
      </Tooltip>
    </div>
  );
};

export default MoreFeature;
