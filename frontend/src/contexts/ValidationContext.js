import React from "react";
const ValidationContext = React.createContext();

export const errorMessages = {
  emptyField: "Please fill out this field.",
  toShort:
    "Please lengthen this text to 2 characters or more (you are currently using 1 character)",
  notUrl: "Please enter a URL.",
  notValidEmail: "please enter a valid email.",
};

export default ValidationContext;
