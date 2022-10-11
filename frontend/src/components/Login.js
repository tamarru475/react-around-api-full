import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import InfoTooltip from './InfoTooltip';

export default function Login(props) {
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

        props.onLoginSubmit(values);
    }
    return (
        <div className='page'>
            <div className='login'>
                <Header>
                    <Link to='/register' className='header__button'>Sign up</Link>
                </Header>
                <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} isSuccess={props.isSuccess} />
                <h1 className='login__form-header'>Log in</h1>
                <form name='login' className='login__form' onSubmit={handleSubmit}>
                    <fieldset className="login__form-fieldset">
                        <input
                            className={`login__form-input `}
                            type="email"
                            id="email-input"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <input
                            className={`login__form-input `}
                            type="password"
                            id="password-input"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="login__form-fieldset_button">
                        <button
                            type="submit"
                            className={`login__form-button ${disabledButtonClass}`}
                            disabled={disableButton}
                        >
                            Log in
                        </button>
                    </fieldset>
                </form>
                <Link to='/register' className='login__link'> Not a member yet? Sign up here!</Link>
            </div>
        </div>
    );
}