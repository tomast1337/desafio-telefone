import React from "react";
import { PhoneContext } from "./phone-context";

export const usePhone = () => {
  if (!React.useContext(PhoneContext)) {
    throw new Error("usePhone must be used within a PhoneProvider");
  }
  return React.useContext(PhoneContext);
};

export default usePhone;
