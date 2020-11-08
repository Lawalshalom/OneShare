import React, { useState, useEffect } from 'react';

const PasswordRecovery = () => {
    let password1, password2 = '';


    const handlePassword1 = (e) => {
        password1 = e.target.value;
    }

    const comparePassword = (e) => {
        const match = document.getElementById('password-match');
        const unmatch = document.getElementById('password-unmatch');
        if (e.target.value === password1){
            match.style.display = 'block';
            unmatch.style.display = 'none';
        } else {
            match.style.display = 'none';
            unmatch.style.display = 'block'
        }
    }
   useEffect(() => {
        const togglePassword1 = document.getElementById('toggle-password1');
        const togglePassword2 = document.getElementById('toggle-password2');

        togglePassword1.addEventListener('click', () => {
            const password1 = document.getElementById('password1');
            togglePassword1.classList.contains('fa-eye') ?
            password1.setAttribute('type', 'text') : password1.setAttribute('type', 'password');
            togglePassword1.classList.toggle('fa-eye');
            togglePassword1.classList.toggle('fa-eye-slash');
        });

        togglePassword2.addEventListener('click', () => {
            const password2 = document.getElementById('password2');
            togglePassword2.classList.contains('fa-eye') ?
            password2.setAttribute('type', 'text') : password2.setAttribute('type', 'password');
            togglePassword2.classList.toggle('fa-eye');
            togglePassword2.classList.toggle('fa-eye-slash');
        })

        const inputEmail = document.getElementById("input-email");
        const inputResetCode = document.getElementById("input-reset-code");
        const setNewPassword = document.getElementById("set-new-password");
        const passwordSuccess = document.getElementById("password-success");
        inputEmail.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(inputEmail);
            const email = formData.get('email');

            inputEmail.style.display = 'none';
            inputResetCode.style.display = 'flex'
        });

        inputResetCode.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(inputResetCode);
            const resetCode = formData.get('reset-code');

            inputEmail.style.display = 'none';
            inputResetCode.style.display = 'none';
            setNewPassword.style.display = 'flex';
        });

        setNewPassword.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(setNewPassword);
            const password1 = formData.get('password1');
            const password2 = formData.get('password2');
            const match = document.getElementById('password-match');
            const unmatch = document.getElementById('password-unmatch');

            if (password1 !== password2){
                match.style.display = 'none';
                unmatch.style.display = 'block';
            } else {
                match.style.display = 'block';
                unmatch.style.display = 'none';
                inputEmail.style.display = 'none';
                inputResetCode.style.display = 'none'
                setNewPassword.style.display = 'none';
                passwordSuccess.style.display = 'block';
            }

        });


    });

    return (
        <>
            <div className="bg-image"></div>
            <div className="container login">
                <div className="login-nav">
                    <a href="/" className="login-home-link"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                </div>

                <div className="continue-login">
                    <div className="login-info">
                        <h1><strong>The OneShare Vision.</strong></h1>
                        <p>Our vision is to leverage communal bonds in ensuring that every Nigerian gets needed food and medical supplies irrespective of where they live or their socioeconomic status.</p>
                        <div className="oneshare-logo" id="oneShare-logo">
                            <img src="images/Logo-white.svg" alt="oneshare logo" />
                        </div>
                    </div>

                    <div className="login-form">
                        <h2><strong>Password Recovery</strong></h2>
                        <div className="underline"></div>

                        <form id="input-email">
                            <p className="text-center">Please input your OneShare registered email address.</p>
                            <p className="text-center">We'll send a password reset code to your inbox.</p>
                                <input type="email" name="email" placeholder="Email address" autoComplete="false" required/> <br/>
                                <button type="submit" id="submit-btn" className="completed"><strong>Continue</strong></button>
                        </form>

                        <form id="input-reset-code">
                            <p className="text-center">Input the reset code sent to your mail.</p>
                                <input type="text" name="reset-code" placeholder="Reset Code" autoComplete="false" required/> <br/>
                                <button type="submit" id="submit-btn" className="completed"><strong>Continue</strong></button> <br/>
                                <p id="resend-code" className="text-primary text-center">Resend Code</p>
                        </form>

                        <form id="set-new-password">
                            <p className="text-center">Set a new password. You can write down and store in a safe physical space or use a password manager.</p>
                            <div className="w-100 text-center">
                                <input type="password" name="password1" id="password1" onChange={handlePassword1} placeholder="Password" autoComplete="false" required/>
                                <span><i className="fa fa-eye" id="toggle-password1"></i></span>
                            </div> <br/>
                            <div className="w-100 text-center">
                                <input type="password" name="password2" id="password2" onChange={comparePassword} placeholder="Confirm Password" autoComplete="false" required/>
                                <span><i className="fa fa-eye" id="toggle-password2"></i></span>
                            </div>
                            <p id="password-unmatch">Passwords do not match</p>
                            <p id="password-match">Passwords match!</p> <br/>
                            <button type="submit" id="submit-btn" className="completed"><strong>Continue</strong></button>
                        </form>

                        <div id="password-success">
                            <p>Password reset successful!</p>
                            <p>Proceed to <a href="/login">Login</a> now.</p>
                        </div>
                    </div>
                    <div className="bg-image-device"></div>
                </div>
            </div>
        </>
    )
}
export default PasswordRecovery;