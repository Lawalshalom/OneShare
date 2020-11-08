import React, { useEffect } from 'react';

const Login = () => {
   useEffect(() => {
        const togglePassword = document.getElementById('toggle-password');
        togglePassword.addEventListener('click', () => {
            const password = document.getElementById('password');
            togglePassword.classList.contains('fa-eye') ?
            password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        })

        const form = document.getElementById("login-form");
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');

        });
    });

    return (
        <>
            <div className="bg-image"></div>
            <div className="container login">
                <div className="login-nav">
                    <a href="/" className="login-home-link"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                    <a href="/register">Go to Register <i className="fa fa-angle-right fa-2x"></i> </a>
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
                        <h2><strong>Login</strong></h2>
                        <div className="underline"></div>
                        <p className="text-center">Welcome back to OneShare.</p>
                        <form id="login-form">
                            <input type="email" name="email" placeholder="Email address" autoComplete="false" required/> <br/>
                             <div className="w-100 text-center">
                                <input type="password" name="password" id="password" placeholder="Password" autoComplete="false" required/>
                                <span><i className="fa fa-eye" id="toggle-password"></i></span>
                            </div>
                            <br/>
                            <button type="submit" id="submit-btn" className="completed"><strong>Login</strong></button>
                        </form>
                        <a href="/register"><strong>Don't have an account? Register</strong></a>
                        <a href="/password-recovery"><strong>Forgot Password?</strong></a>
                    </div>
                    <div className="bg-image-device"></div>
                </div>
            </div>
        </>
    )
}
export default Login;