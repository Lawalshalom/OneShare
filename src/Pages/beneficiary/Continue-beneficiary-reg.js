import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const ContinueBeneficiaryReg = (props) => {
    const [ redirect, setRedirect ] = useState(null);
    useEffect(() => {
        const togglePassword = document.getElementById('toggle-password');
        togglePassword.addEventListener('click', () => {
            const password = document.getElementById('password');
            togglePassword.classList.contains('fa-eye') ?
            password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        })

        const form = document.getElementById("continue-donor-form");
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            props.setDetails({
                email,
                password
            });
           return setRedirect('finish-registration');
        });
        return () => {
            form.removeEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const email = formData.get('email');
                const password = formData.get('password');
                props.setDetails({
                    email,
                    password
                });
               return setRedirect('finish-registration');
            });
        }
    }, [props]);

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return (
        <>
            <div className="bg-color"></div>
            <div className="container container-xl continue-donor-reg">
                <div className="register-nav" data-aos="fade-down">
                    <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                    <a href="/login">Go to Login <i className="fa fa-angle-right fa-2x"></i> </a>
                </div>

                <div className="continue-registration">
                    <div className="register-info"  data-aos="fade-right">
                        <h1><strong>You're registering to be a <span>Beneficiary</span> on OneShare.</strong></h1>
                        <p>As a Beneficiary, you'll be able to post your needs on OneShare and meet with Donors in your community.</p>
                        <p>To register as a donor account instead, <a href="/register-donor">click here.</a></p>
                        <div className="oneshare-logo" id="oneShare-logo">
                            <img src="images/Logo-blue.svg" alt="oneshare logo" />
                        </div>
                    </div>

                    <div className="register-form"  data-aos="fade-left">
                        <h2><strong>Register</strong></h2>
                        <div className="underline"></div>
                        <p className="text-center">Register on OneShare, help protect the vulnerable in our communities!</p>
                        <form id="continue-donor-form">
                            <div className="w-100 text-center">
                                <input type="email" name="email" placeholder="Email address" autoComplete="false" required/>
                            </div>
                            <br/>
                            <div className="w-100 text-center">
                                <input type="password" name="password" id="password" placeholder="Password" autoComplete="false" required/>
                                <span><i className="fa fa-eye" id="toggle-password"></i></span>
                            </div>
                            <br/>
                            <button type="submit" id="submit-btn" className="completed"><strong>Register</strong></button>
                        </form>
                        <a href="/login">Already have an account? Login</a>
                    </div>
                    <div className="bg-color-device"></div>
                </div>
            </div>
        </>
    )
}
export default ContinueBeneficiaryReg;