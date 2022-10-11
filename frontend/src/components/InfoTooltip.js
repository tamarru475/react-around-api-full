import React from 'react';

export default function InfoTooltip(props) {
    const fadeIn = `${props.isOpen ? "popup_fadein" : ""}`;
    const isSuccessImage = `${props.isSuccess ? "infotoolstip__seccess_image" : "infotoolstip__error_image"}`;
    const isSuccessMessage = `${props.isSuccess ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}`;

    return (
        <section
            className={` infotoolstip infotoolstip__popup ${fadeIn}`}
            id="infotoolstip-popup"
        >
            <div className={`infotoolstip__container container`}>
                <button
                    type="button"
                    className={`infotoolstip__close-button close-button`}
                    onClick={props.onClose}
                ></button>
                <div className={`infotoolstip__content-container`}>
                    <div className={isSuccessImage}></div>
                    <p className="infotoolstip__message">{isSuccessMessage}</p>
                </div>
            </div>
        </section>
    );

}