import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ValidationContext from "../contexts/ValidationContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const errorMessages = React.useContext(ValidationContext);
  const [name, setName] = React.useState(currentUser.name || "");
  const [description, setDescription] = React.useState(currentUser.about || "");
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);
  const disabledButtonClass = `${!disableButton ? "" : "form__button_disabled"
    }`;

  const showErrorMessageClass = `${props.isValid ? "" : "form__input-error_active"
    }`;

  const showErrorInputClass = `${props.isValid ? "" : "form__input_type_error"
    }`;

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, props.isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setNameError(`${errorMessages.emptyField}`);
      props.onValidityChange(false);
      setDisableButton(true);
    } else if (e.target.value.length < 2) {
      setNameError(`${errorMessages.toShort}`);
      props.onValidityChange(false);
      setDisableButton(true);
    } else {
      setNameError("");
      props.onValidityChange(true);
      setDisableButton(false);
    }
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length === 0) {
      setDescriptionError(`${errorMessages.emptyField}`);
      props.onValidityChange(false);
      setDisableButton(true);
    } else if (e.target.value.length < 2) {
      setDescriptionError(`${errorMessages.toShort}`);
      props.onValidityChange(false);
      setDisableButton(true);
    } else {
      setDescriptionError("");
      props.onValidityChange(true);
      setDisableButton(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
      disabledButtonClass={disabledButtonClass}
      disableButton={disableButton}
    >
      <fieldset className="form__fieldset">
        <input
          className={`form__input form__input-name ${showErrorInputClass}`}
          type="text"
          id="name-input"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onNameChange}
        />
        <span
          className={`form__input-error name-input-error ${showErrorMessageClass}`}
        >
          {nameError}
        </span>
        <input
          className={`form__input form__input-job ${showErrorInputClass}`}
          type="text"
          id="job-input"
          placeholder="About"
          name="job"
          value={description}
          onChange={onDescriptionChange}
        />
        <span
          className={`form__input-error job-input-error ${showErrorMessageClass}`}
        >
          {descriptionError}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
