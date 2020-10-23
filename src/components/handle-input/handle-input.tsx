import React from "react";
import VerificationInput from "react-verification-input";
import { Props } from "./handle-input.model";

const HandleInput: React.FC<Props> = (props: Props) => {
  const { setUserContent } = props;
  return (
    <VerificationInput
      input={{ onChange: (e: string) => setUserContent(e) }}
      removeDefaultStyles
      length={12}
      placeholder=" "
      container={{
        className: "container",
      }}
      characters={{
        className: "characters",
      }}
      character={{
        className: "character",
        classNameInactive: "character--inactive",
        classNameSelected: "character--selected",
      }}
    />
  );
};

export default HandleInput;
