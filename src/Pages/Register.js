import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [ redirect, setRedirect ] = useState(null);
    useEffect(() => {
        const benefitDiv = document.getElementById("beneficiary");
        const donorDiv = document.getElementById("donor");
        const continueDiv = document.getElementById('continue-register');
        const beneficiaryIcon = document.getElementById("benefit-icon");
        const beneficiaryCheckIcon = document.getElementById("benefit-check-icon");
        const donorIcon = document.getElementById("donor-icon");
        const donorCheckIcon = document.getElementById("donor-check-icon");

        benefitDiv.addEventListener('click', () => {
            benefitDiv.classList.toggle('selected');
            if (benefitDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                donorIcon.style.display = 'block';
                donorCheckIcon.style.display = 'none';
                beneficiaryIcon.style.display = 'none';
                beneficiaryCheckIcon.style.display = 'block';
            } else {
                continueDiv.style.display = 'none';
                beneficiaryIcon.style.display = 'block';
                beneficiaryCheckIcon.style.display = 'none';
            };
            if (donorDiv.classList.contains('selected')){
                donorDiv.classList.remove('selected');
            };
        });

        donorDiv.addEventListener('click', () => {
            donorDiv.classList.toggle('selected');

            if (donorDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                donorIcon.style.display = 'none';
                donorCheckIcon.style.display = 'block';
                beneficiaryIcon.style.display = 'block';
                beneficiaryCheckIcon.style.display = 'none';
            } else {
                continueDiv.style.display = 'none';
                donorIcon.style.display = 'block';
                donorCheckIcon.style.display = 'none';
            };
            if (benefitDiv.classList.contains('selected')){
                benefitDiv.classList.remove('selected');
            };
        });

        continueDiv.addEventListener('click', () => {
            if (benefitDiv.classList.contains('selected')) {
               return setRedirect('register-beneficiary');
            }
            else if (donorDiv.classList.contains('selected')){
               return setRedirect('register-donor');
            }
        });
        return () => {
            benefitDiv.removeEventListener('click', () => {
                benefitDiv.classList.toogle('selected');
                benefitDiv.classList.contains('selected') ?
                continueDiv.style.display = 'flex' :
                continueDiv.style.display = 'none';
                if (donorDiv.classList.contains('selected')){
                    donorDiv.classList.remove('selected');
                };
            });
            donorDiv.removeEventListener('click', () => {
                donorDiv.classList.toogle('selected');
                donorDiv.classList.contains('selected') ?
                continueDiv.style.display = 'flex' :
                continueDiv.style.display = 'none';
                if (benefitDiv.classList.contains('selected')){
                    benefitDiv.classList.remove('selected');
                };
            });

            continueDiv.removeEventListener('click', () => {
                if (benefitDiv.classList.contains('selected')) {
                    setRedirect('register-beneficiary');
                }
                else if (donorDiv.classList.contains('selected')){
                    setRedirect('register-donor');
                }
            });
        }
    }, []);


    if (redirect === 'register-beneficiary'){
       return <Redirect to="/register-beneficiary" />
    }
    else if (redirect === 'register-donor'){
       return <Redirect to="/register-donor" />
    }
    else return (
        <>
        <div className="container choose-account">
            <div className="register-nav">
                <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                <a href="/login">Go to Login <i className="fa fa-angle-right fa-2x"></i> </a>
            </div>

            <div className="account-types">
                <div className="account-type-intro">
                    <h2>Choosing an Account type</h2>
                    <div className="underline"></div>
                    <p>There are two account types on OneShare: Beneficiary and Donor accounts. For the best experience it's best to pick an account that suits your motivations.</p>
                </div>
                <div className="account-list">
                    <div className="account-item" id="beneficiary">
                        <div className="account-icon">
                            <img src="images/icons/beneficiary.svg" id="benefit-icon" alt="benefit icon"/>
                            <img className="check" src="images/icons/check.svg" id="benefit-check-icon" alt="check icon"/>
                        </div>
                        <div className="account-type-details">
                            <p><strong>Beneficiary</strong></p>
                            <p>You want to post your needs</p>
                        </div>
                    </div>

                    <div className="account-item" id="donor">
                        <div className="account-icon">
                            <img src="images/icons/donor.svg" id="donor-icon" alt="beneficiary icon"/>
                            <img className="check" src="images/icons/check.svg" id="donor-check-icon" alt="check icon"/>
                        </div>
                        <div className="account-type-details">
                            <p><strong>Donor</strong></p>
                            <p>You want to fulfil other's needs</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="continue-register" id="continue-register">
                <button>Continue <i className="fa fa-arrow-right"></i></button>
            </div>
        </div>
        </>
    )
};
export default Register;