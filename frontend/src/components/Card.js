import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardTrashButtonClassName = `gallery__card-trash-button ${
    isOwn ? "gallery__card-trash-button_active" : ""
  }`;

  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `gallery__card-like_button ${
    isLiked ? "gallery__card-like_button_active" : ""
  }`;

  function handleImageClick() {
    props.onCardClick(props.card);
  }

  function handleTrashClick() {
    props.onTrashClick(props.card);
  }

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  return (
    <li className="gallery__card">
      <div
        className="gallery__card-image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleImageClick}
      ></div>
      <button
        type="button"
        className={cardTrashButtonClassName}
        onClick={handleTrashClick}
      ></button>
      <div className="gallery__card-footer">
        <h2 className="gallery__card-place">{props.card.name}</h2>
        <div className="gallery__card-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <div className="gallery__card-like_counter">
            {props.card.likes.length}
          </div>
        </div>
      </div>
    </li>
  );
}
