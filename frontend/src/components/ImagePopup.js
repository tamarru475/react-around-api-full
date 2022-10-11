import React from "react";
export default function ImagePopup(props) {
  const fadeIn = `${props.card.visibility ? "popup_fadein" : ""}`;
  return (
    <section className={`image ${fadeIn} popup`} id="image-popup">
      <div className="image__container container">
        <button
          type="button"
          className="image__close-button close-button"
          onClick={props.onClose}
        ></button>
        <img
          className="image__popup"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="image__discription">{props.card.name}</p>
      </div>
    </section>
  );
}
