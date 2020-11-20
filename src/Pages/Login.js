import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Login = (props) => {

    const [ redirect, setRedirect ] = useState(null);
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);

   useEffect(() => {
       if (user){
           return;
       }
        const togglePassword = document.getElementById('toggle-password');
        togglePassword.addEventListener("click", () => {
            const password = document.getElementById('password');
            togglePassword.classList.contains('fa-eye') ?
            password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });

        const form = document.getElementById("login-form");
        const successDiv = document.getElementById("success-div");
        const failureDiv = document.getElementById("failure-div");
        const loadingDiv = document.getElementById("loading-div");
        const submitBtn = document.getElementById("submit-btn");

        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            successDiv.style.display = "none";
            failureDiv.style.display = "none";
            loadingDiv.style.display = "block";
            submitBtn.style.display = "none";
            const Params = {
				headers: {
					"Content-type": "application/JSON",
				},
				body: JSON.stringify({
                    email,
                    password
				}),
				method: "POST",
			};

            async function registerUser(params){
             const res = await fetch("https://oneshare-backend.herokuapp.com/api/user/user-login", params);
             const data = await res.json();
             console.log(data)
             if (data.success){
                 props.setAuthData.updateToken(data.token);
                 props.setAuthData.updateUser(data.user);
                 form.reset();
                 if (data.user.accountType === "donor"){
                     setRedirect("/donor-dashboard");
                 }
                 else setRedirect("/beneficiary-dashboard");
             }
             if (data.error){
                failureDiv.innerHTML = data.error;
                failureDiv.style.display = "block";
                successDiv.style.display = "none";
                submitBtn.style.display = "block";
             }
             loadingDiv.style.display = "none";
            }
            registerUser(Params).catch(err => {
                successDiv.style.display = "none";
                failureDiv.innerText = err;
                failureDiv.style.display = "block";
                loadingDiv.style.display = "none";
                submitBtn.style.display = "block";
            }
            )
        };
        return () => {
            togglePassword.removeEventListener("click", () => {
                const password = document.getElementById('password');
                togglePassword.classList.contains('fa-eye') ?
                password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
                togglePassword.classList.toggle('fa-eye');
                togglePassword.classList.toggle('fa-eye-slash');
            })
        }
    }, [props, user]);

    if (redirect !== null){
        return <Redirect to={redirect}/>
    }
    else return (
        <>
            <div className="bg-image"></div>
            <div className="container login">
                <div className="login-nav" data-aos="fade-down">
                    <a href="/" className="login-home-link"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                    <a href="/register">Go to Register <i className="fa fa-angle-right fa-2x"></i> </a>
                </div>

                <div className="continue-login">
                    <div className="login-info" data-aos="fade-right">
                        <h1><strong>The OneShare Vision.</strong></h1>
                        <p>Our vision is to leverage communal bonds in ensuring that every Nigerian gets needed food and medical supplies irrespective of where they live or their socioeconomic status.</p>
                        <div className="oneshare-logo" id="oneShare-logo">
                            <img src="images/Logo-white.svg" alt="oneshare logo" />
                        </div>
                    </div>

                    <div className="login-form" data-aos="fade-left">
                        <h2><strong>Login</strong></h2>
                        <div className="underline"></div>
                        <p className="text-center">Welcome back to OneShare.</p>
                        {!user &&  <form id="login-form">
                            <div className="mb-3 text-center w-100">
                                <input type="email" name="email" placeholder="Email address" autoFocus autoComplete="false" required/>
                            </div>
                             <div className="w-100 mt-2 mb-2 text-center">
                                <input type="password" name="password" id="password" placeholder="Password" autoComplete="false" required/>
                                <span><i className="fa fa-eye" id="toggle-password"></i></span>
                            </div>
                            <br/>
                            <div id="loading-div"></div>
                            <div id="success-div" className="text-success"></div>
                            <div id="failure-div" className="text-danger mb-3"></div>
                            <button type="submit" id="submit-btn" className="completed"><strong>Login</strong></button>
                        </form> }
                        {
                            user && <div className="d-flex flex-column">
                            <p className="text-center">You are already logged in</p>
                            <p className="text-center"><a href={user.accountType === "donor" ? "/donor-dashboard" : "beneficiary-dashboard"}>
                            <strong>Continue to dashboard</strong></a></p>
                            </div>
                        }
                        {!user && <div className="d-flex flex-column align-items-center">
                            <a href="/register"><strong>Don't have an account? Register</strong></a>
                            <a href="/password-recovery"><strong>Forgot Password?</strong></a>
                            </div>
                        }
                    </div>

                    <div className="bg-image-device"></div>
                </div>
            </div>
        </>
    )
}
export default Login;