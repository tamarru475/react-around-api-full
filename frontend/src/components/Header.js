import React from "react";
import logo from "../images/logo.svg";

export default function Header(props) {
  const headerNavActiveClass = `${props.loggedIn ? 'header__nav_active' : ''}`
  const fadeInCloseButtonClass = `${props.isOpen ? "header__nav-button_active" : ""}`;
  const headerActiveClass = `${props.isOpen ? "header_active" : ""}`
  const headerContainerActiveClass = `${props.isOpen ? "header__container-active" : ""}`;

  function onNavClick() {
    props.onNavClick();
  }
  return (
    <header className={`header ${headerActiveClass}`}>
      <div className={`header__container ${headerContainerActiveClass}`}>
        <img src={logo} alt="Around The U.S" className="logo" />
        <div
          className={`header__nav ${fadeInCloseButtonClass} ${headerNavActiveClass}`}
          onClick={onNavClick}
        >
          <div className="header__nav-line"></div>
          <div className="header__nav-line"></div>
          <div className="header__nav-line"></div>
        </div>
      </div>
      {props.children}
    </header>
  );
}
