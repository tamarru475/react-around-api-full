import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img
              src={currentUser.avatar}
              alt="profile picture"
              className="profile__image"
            />
            <div className="profile__image-overlay" onClick={props.onEditAvatarClick}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name" id="profile-name">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__edit-button profile-button"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__name-discription" id="profile-job">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button profile-button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>
      {props.children}
      <section className="gallery">
        <ul className="gallery__container" id="gallery-container">
          {props.cardsArray.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onTrashClick={props.onTrashClick}
              onLikeClick={props.onLikeClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
