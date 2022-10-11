import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <span className="form__input-error title-input-error"></span>
        <input
          className="form__input"
          type="url"
          id="avatar-input"
          placeholder="Image link"
          name="avatar"
          ref={avatarRef}
        />
        <span className="form__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
