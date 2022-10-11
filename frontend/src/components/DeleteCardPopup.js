import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Are you sure?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Yes"
      onSubmit={handleSubmit}
    />
  );
}
