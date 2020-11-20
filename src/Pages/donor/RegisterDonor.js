import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const RegisterDonor = () => {
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {

        const individualDiv = document.getElementById("individual");
        const organizationDiv = document.getElementById("organization");
        const continueDiv = document.getElementById('continue-register');
        const individualIcon = document.getElementById("individual-icon");
        const individualCheckIcon = document.getElementById("individual-check-icon");
        const organizationIcon = document.getElementById("organization-icon");
        const organizationCheckIcon = document.getElementById("organization-check-icon");

        individualDiv.addEventListener('click', () => {
            individualDiv.classList.toggle('selected');
            if (individualDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                organizationIcon.style.display = 'block';
                organizationCheckIcon.style.display = 'none';
                individualIcon.style.display = 'none';
                individualCheckIcon.style.display = 'block';
            } else {
                continueDiv.style.display = 'none';
                individualIcon.style.display = 'block';
                individualCheckIcon.style.display = 'none';
            };
            if (organizationDiv.classList.contains('selected')){
                organizationDiv.classList.remove('selected');
            };
        });

        organizationDiv.addEventListener('click', () => {
            organizationDiv.classList.toggle('selected');

            if (organizationDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                organizationIcon.style.display = 'none';
                organizationCheckIcon.style.display = 'block';
                individualIcon.style.display = 'block';
                individualCheckIcon.style.display = 'none';
            } else {
                continueDiv.style.display = 'none';
                organizationIcon.style.display = 'block';
                organizationCheckIcon.style.display = 'none';
            };
            if (individualDiv.classList.contains('selected')){
                individualDiv.classList.remove('selected');
            };
        });

        continueDiv.addEventListener('click', () => {
            if (sessionStorage.getItem('account-type')){
                sessionStorage.removeItem('account-type');
            };

            if (individualDiv.classList.contains('selected')) {
                sessionStorage.setItem('account-type', 'donor-individual');
                return setRedirect('/continue-donor-registration');
            }
            else if (organizationDiv.classList.contains('selected')) {
                sessionStorage.setItem('account-type', 'donor-organization');
                return setRedirect('/continue-donor-registration');
            };
        });
        return () => {
            individualDiv.removeEventListener('click', () => {
                individualDiv.classList.toogle('selected');
                individualDiv.classList.contains('selected') ?
                continueDiv.style.display = 'flex' :
                continueDiv.style.display = 'none';
                if (organizationDiv.classList.contains('selected')){
                    organizationDiv.classList.remove('selected');
                };
            });
            organizationDiv.removeEventListener('click', () => {
                organizationDiv.classList.toogle('selected');
                organizationDiv.classList.contains('selected') ?
                continueDiv.style.display = 'flex' :
                continueDiv.style.display = 'none';
                if (individualDiv.classList.contains('selected')){
                    individualDiv.classList.remove('selected');
                };
            });

            continueDiv.removeEventListener('click', () => {
                if (sessionStorage.getItem('account-type')){
                    sessionStorage.removeItem('account-type');
                };

                if (individualDiv.classList.contains('selected')) {
                    sessionStorage.setItem('account-type', 'donor-individual');
                    return setRedirect('/continue-donor-registration');
                }
                else if (organizationDiv.classList.contains('selected')) {
                    sessionStorage.setItem('account-type', 'donor-organization');
                    return setRedirect('/continue-donor-registration');
                };
            });
        }
    }, []);


    if (redirect !== null){
       return <Redirect to={redirect} />
    }
    else return (
        <>
        <div className="container choose-donor-account">
            <div className="register-nav">
                <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                <a href="/login">Go to Login <i className="fa fa-angle-right fa-2x"></i> </a>
            </div>

            <div className="donor-types">
                <div className="donor-type-intro">
                    <h2 data-aos="fade-down">Choosing an Account type</h2>
                    <div className="underline" data-aos="fade-down"></div>
                    <p data-aos="fade-up">We'd also want to know whom you'll be donating as on OneShare.</p>
                </div>
                <div className="donor-list" data-aos="fade-up" data-aos-delay="100">
                    <div className="donor-account-item" id="individual">
                        <div className="donor-account-icon">
                            <i className="fa fa-user fa-2x" id="individual-icon"></i>
                            <i className="fa fa-check-circle fa-2x" id="individual-check-icon"></i>
                        </div>
                        <div className="donor-account-type-details">
                            <p><strong>Individual</strong></p>
                            <p>You'll be donating in your name</p>
                        </div>
                    </div>

                    <div className="donor-account-item" id="organization">
                        <div className="donor-account-icon">
                            <i className="fa fa-group fa-2x" id="organization-icon"></i>
                            <i className="fa fa-check-circle fa-2x" id="organization-check-icon"></i>
                        </div>
                        <div className="donor-account-type-details">
                            <p><strong>Organization</strong></p>
                            <p>You'll donate as an organization</p>
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
export default RegisterDonor;