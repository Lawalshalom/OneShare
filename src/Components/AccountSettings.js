import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

const AccountSettings = (props) => {
    const [ redirect, setRedirect ] = useState(null);
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storedToken = props.authData.token || localStorage.getItem("token");

    useEffect(() => {
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            props.setAuthData.updateUser(null);
            props.setAuthData.updateToken(null);
            setRedirect("/");
        });
        return () => {
            logoutBtn.removeEventListener("click", () => {
                props.setAuthData.updateUser(null);
                props.setAuthData.updateToken(null);
                setRedirect("/");
            })
        }
    }, [props]);

    useEffect(() => {
        const form = document.getElementById("password-form");
        const successDiv = document.getElementById("success-div");
        const failureDiv = document.getElementById("failure-div");
        const loadingDiv = document.getElementById("loading-div");
        const submitBtn = document.getElementById("submit-btn");

        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const oldPassword = formData.get("old-password");
            const newPassword = formData.get("new-password");
            if (oldPassword === newPassword){
                failureDiv.innerHTML = "Passwords can't be the same."
               return failureDiv.style.display = "block";
            }
            else {
                successDiv.style.display = "none";
                failureDiv.style.display = "none";
                loadingDiv.style.display = "block";
                submitBtn.style.display = "none";
                const accessToken = "Bearer " + storedToken
                const Params = {
			    	headers: {
                        "Content-type": "application/JSON",
                        "Authorization": accessToken
			    	},
			    	body: JSON.stringify({
                        oldPassword,
                        newPassword
			    	}),
			    	method: "POST",
                };

                const fetchUrl = user.accountType === "donor" ? "https://oneshare-backend.herokuapp.com/api/donor/change-password" : "https://oneshare-backend.herokuapp.com/api/beneficiary/change-password";

                async function changePassword(params){
                 const res = await fetch(fetchUrl, params);
                 const data = await res.json();
                 console.log(data)
                 if (data.success){
                    props.setAuthData.updateUser(data.newUser);
                    successDiv.innerHTML = data.success;
                    successDiv.style.display = "block";
                    failureDiv.style.display = "none";
                    submitBtn.style.display = "block";
                     form.reset();
                 }
                 if (data.error){
                    failureDiv.innerHTML = data.error;
                    failureDiv.style.display = "block";
                    successDiv.style.display = "none";
                    submitBtn.style.display = "block";
                 }
                 loadingDiv.style.display = "none";
                }
                changePassword(Params).catch(err => {
                    successDiv.style.display = "none";
                    failureDiv.innerText = err;
                    failureDiv.style.display = "block";
                    loadingDiv.style.display = "none";
                    submitBtn.style.display = "block";
                }
                )
            }
        }
        form.addEventListener("submit", handleSubmit);

        return () => {
            form.removeEventListener("submit", handleSubmit);
        }
    }, [props, storedToken, user]);


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
    });
}, []);

    if (redirect !== null){
        return <Redirect to={redirect}/>
    }
    else return (
        <div className="dashboard-items" id="account-settings">
        <div className="row">
            <div className="col-12 col-md-6">
                <form id="password-form">
                <p>Change your OneShare password at any time!</p>
                <div className="w-60">
                    <input type="password" name="old-password" id="password1" placeholder="Current Password" autoComplete="false" required/>
                    <span><i className="fa fa-eye" id="toggle-password1"></i></span>
                </div><br/>
                <div className="w-60">
                    <input type="password" name="new-password" id="password2" placeholder="New Password" autoComplete="false" required/>
                    <span><i className="fa fa-eye" id="toggle-password2"></i></span>
                </div><br/>
                <div id="loading-div"></div>
                <div id="success-div" className="text-success"></div>
                <div id="failure-div" className="text-danger mb-3"></div>
                <button type="submit" id="submit-btn" className="btn completed">Submit</button><br/>
                <a href="/login">Forgot Password?</a>
                </form>
            </div>
            <div className="col-12 col-md-6">
                <p id="logout-btn" className="text-primary logout"><img src="images/logout-icon.svg" alt="logout icon" />Logout of OneShare</p>
            </div>
        </div>
    </div>
    )
};
export default AccountSettings;