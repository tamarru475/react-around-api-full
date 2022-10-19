import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from "../contexts/CurrentUserContext";
import ValidationContext, {
  errorMessages,
} from "../contexts/ValidationContext";
import api from "../utils/api";
import * as auth from "../utils/auth";


function App() {
  const history = useHistory();
  /// Register & Login hook ///
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSeccess] = React.useState(false);
  const [email, setEmail] = React.useState('');
  /// Popup open/close status ///
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [isInfoToolsTipOpen, setIsInfoToolsTipOpen] = React.useState(false);
  const [isPopupNavOpen, setIsPopupNavOpen] = React.useState(false);

  /// Card hookes ///

  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });

  const [currentCard, setCurrentCard] = React.useState({});

  /// Context hooks ///
  const [currentUser, setCurrentUser] = React.useState({});
  const [valid, setValid] = React.useState(true);



  /// Initial requests from api ///

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.email);
          setIsLoggedIn(true);
          history.push('/homepage');

        }
      })
        .catch(err => console.log(err))
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
      .getUserInfo(token)
      .then((userData) => {
        setCurrentUser({
          avatar: userData.avatar,
          about: userData.about,
          name: userData.name,
          _id: userData._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
     api
      .getInitialCards(token)
      .then((cardsArray) => {
        console.log(cardsArray);
        setCards(cardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
    }   
  }, [console.log(cards)]);

  /// Popup open/close handlers ///

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePopupClick(cardData) {
    setDeletePopupOpen(true);
    setCurrentCard({ _id: cardData._id });
  }

  function handleCardClick(cardData) {
    setSelectedCard({
      ...selectedCard,
      visibility: true,
      name: cardData.name,
      link: cardData.link,
    });
  }

  function handlePopupNavClick() {
    if (isPopupNavOpen) {
      setIsPopupNavOpen(false);
    } else {
      setIsPopupNavOpen(true);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({ visibility: false });
    setIsInfoToolsTipOpen(false);
  }

  /// Register & Login & token & signout submit ///

  function handleRegistrationSubmit(values) {
    auth.register(values).then(() => {
      setIsRegisterSeccess(true);
      history.push('/login');
    })
      .catch((err) => {
        console.log(err);
        setIsRegisterSeccess(false);
      }).finally(() => {
        setIsInfoToolsTipOpen(true);
      });
  }

  function handleLoginSubmit(values) {
    auth.login(values)
      .then((user) => {
        console.log(user);
        setCurrentUser(user.user);
        setIsLoggedIn(true);
        setEmail(values.email);
        history.push('/homepage');
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSeccess(false);
        setIsInfoToolsTipOpen(true);
      });

  }


  function handleSignout() {
    localStorage.removeItem('jwt');
    history.push('/login');
  }

  /// Likes & Delete Card ///
  function handleCardLike(card) {
    const token = localStorage.getItem('jwt');
    const isLiked = !card.likes || card.likes.length === 0 ? false : card.likes.some((user) => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem('jwt');
    api
      .deleteCard(card._id, token)
      .then(() => {
        const newCards = cards.filter((currentCard) => {
          return currentCard._id !== card._id;
        });
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /// After Submit updaters ///
  function handleUpdateAvatar(inputData) {
    const token = localStorage.getItem('jwt');
    api
      .setUserAavatar(inputData, token)
      .then((updatedInfo) => {
        console.log(updatedInfo)
        setCurrentUser({
          ...currentUser,
          avatar: updatedInfo.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(inputData) {
    const token = localStorage.getItem('jwt');
    api
      .setUserInfo(inputData, token)
      .then((updatedInfo) => {
        console.log(updatedInfo);
        setCurrentUser({
          ...currentUser,
          name: updatedInfo.name,
          about: updatedInfo.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleAddPlaceSubmit(inputData) {
    const token = localStorage.getItem('jwt');
    api
      .setNewCard(inputData, token)
      .then((newCard) => {
        console.log(cards);
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      }).finally(cards);
  }

  return (
    <Switch>
      <ProtectedRoute path="/homepage" loggedIn={isLoggedIn}>
        <div className="App">
          <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
              <Header loggedIn={isLoggedIn} isOpen={isPopupNavOpen} onNavClick={handlePopupNavClick}>
                <div className={`header__content-container ${isPopupNavOpen ? 'header__content-container_active' : ''}`}>
                  <p className={`header__email `}>{email}</p>
                  <button className={`header__logout `} type='click' onClick={handleSignout}>Log out</button>
                </div>
              </Header>
              <Main
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onTrashClick={handleDeletePopupClick}
                onCardClick={handleCardClick}
                cardsArray={cards}
                onCardDelete={handleCardDelete}
                onLikeClick={handleCardLike}
              >
                <ValidationContext.Provider value={errorMessages}>
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isValid={valid}
                    onValidityChange={setValid}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    isValid={valid}
                    onValidityChange={setValid}
                  />
                  <DeleteCardPopup
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={currentCard}
                  />
                </ValidationContext.Provider>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </Main>
              <Footer />
            </CurrentUserContext.Provider>
          </div>
        </div>
      </ProtectedRoute>
      <Route path="/register">
        <div className="registerContainer">
          <Register
            isValid={valid} onValidityChange={setValid}
            isOpen={isInfoToolsTipOpen}
            onClose={closeAllPopups}
            isSuccess={isRegisterSuccess}
            onRegisterSubmit={handleRegistrationSubmit} />
        </div>
      </Route>
      <Route path="/login">
        <div className="loginContainer">
          <Login isValid={valid}
            onValidityChange={setValid}
            isOpen={isInfoToolsTipOpen}
            onClose={closeAllPopups}
            isSuccess={isRegisterSuccess}
            onLoginSubmit={handleLoginSubmit} />
        </div>
      </Route>
      <Route path="/">
        {isLoggedIn ? (
          <Redirect to="/homepage" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Switch>
  );
}

export default App;
