import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import InfoTooltip from './InfoTooltip';

export default function Register(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [disableButton, setDisableButton] = React.useState(true);

    const disabledButtonClass = `${!disableButton ? "" : "form__button_disabled"
        }`;


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        if (values.email.length === 0 || values.password.length === 0) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegisterSubmit(values);
    }
    return (
        <div className='page'>
            <div className='register'>
                <Header>
                    <Link to='/login' className='header__button'>Log in</Link>
                </Header>
                <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} isSuccess={props.isSuccess} />
                <h1 className='register__form-header'>Sign up</h1>
                <form name='register' className='register__form' onSubmit={handleSubmit}>
                    <fieldset className="register__form-fieldset">
                        <input
                            className={`register__form-input`}
                            type="email"
                            id="email-input"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <input
                            className={`register__form-input`}
                            type="password"
                            id="password-input"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="register__form-fieldset_button">
                        <button
                            type="submit"
                            className={`register__form-button ${disabledButtonClass}`}
                            disabled={disableButton}
                        >
                            Sign up
                        </button>
                    </fieldset>
                </form>
                <Link to='/login' className='register__link'> Already a member? Log in here!</Link>
            </div>
        </div>
    );
}