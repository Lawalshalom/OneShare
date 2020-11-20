import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const RegisterBeneficiary = () => {
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        const individualDiv = document.getElementById("individual");
        const familyDiv = document.getElementById("family");
        const organizationDiv = document.getElementById("organization");
        const continueDiv = document.getElementById('continue-register');
        const individualIcon = document.getElementById("individual-icon");
        const individualCheckIcon = document.getElementById("individual-check-icon");
        const familyIcon = document.getElementById("family-icon");
        const familyCheckIcon = document.getElementById("family-check-icon");
        const organizationIcon = document.getElementById("organization-icon");
        const organizationCheckIcon = document.getElementById("organization-check-icon");

        individualDiv.addEventListener('click', () => {
            individualDiv.classList.toggle('selected');
            if (individualDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                organizationIcon.style.display = 'block';
                organizationCheckIcon.style.display = 'none';
                familyIcon.style.display = 'block';
                familyCheckIcon.style.display = 'none';
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
            if (familyDiv.classList.contains('selected')){
                familyDiv.classList.remove('selected');
            };
        });

        familyDiv.addEventListener('click', () => {
            familyDiv.classList.toggle('selected');
            if (familyDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                familyIcon.style.display = 'none';
                familyCheckIcon.style.display = 'block';
                organizationIcon.style.display = 'block';
                organizationCheckIcon.style.display = 'none';
                individualIcon.style.display = 'block';
                individualCheckIcon.style.display = 'none';
            } else {
                continueDiv.style.display = 'none';
                familyIcon.style.display = 'block';
                familyCheckIcon.style.display = 'none';
            };
            if (organizationDiv.classList.contains('selected')){
                organizationDiv.classList.remove('selected');
            };
            if (individualDiv.classList.contains('selected')){
                individualDiv.classList.remove('selected');
            };
        });

        organizationDiv.addEventListener('click', () => {
            organizationDiv.classList.toggle('selected');
            if (organizationDiv.classList.contains('selected')){
                continueDiv.style.display = 'flex';
                organizationIcon.style.display = 'none';
                organizationCheckIcon.style.display = 'block';
                familyIcon.style.display = 'block';
                familyCheckIcon.style.display = 'none';
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
            if (familyDiv.classList.contains('selected')){
                familyDiv.classList.remove('selected');
            };
        });

        continueDiv.addEventListener('click', () => {
            if (sessionStorage.getItem('account-type')){
                sessionStorage.removeItem('account-type');
            };

            if (individualDiv.classList.contains('selected')) {
                sessionStorage.setItem('account-type', 'beneficiary-individual');
                return setRedirect('continue-beneficiary-registration');
            }
            else if (familyDiv.classList.contains('selected')) {
                sessionStorage.setItem('account-type', 'beneficiary-family');
                return setRedirect('continue-beneficiary-registration');
            }
            else if (organizationDiv.classList.contains('selected')) {
                sessionStorage.setItem('account-type', 'beneficiary-organization');
                return setRedirect('continue-beneficiary-registration');
            };
        });
        return () => {
            individualDiv.removeEventListener('click', () => {
                individualDiv.classList.toggle('selected');
                if (individualDiv.classList.contains('selected')){
                    continueDiv.style.display = 'flex';
                    organizationIcon.style.display = 'block';
                    organizationCheckIcon.style.display = 'none';
                    familyIcon.style.display = 'block';
                    familyCheckIcon.style.display = 'none';
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
                if (familyDiv.classList.contains('selected')){
                    familyDiv.classList.remove('selected');
                };
            });

            familyDiv.removeEventListener('click', () => {
                familyDiv.classList.toggle('selected');
                if (familyDiv.classList.contains('selected')){
                    continueDiv.style.display = 'flex';
                    familyIcon.style.display = 'none';
                    familyCheckIcon.style.display = 'block';
                    organizationIcon.style.display = 'block';
                    organizationCheckIcon.style.display = 'none';
                    individualIcon.style.display = 'block';
                    individualCheckIcon.style.display = 'none';
                } else {
                    continueDiv.style.display = 'none';
                    familyIcon.style.display = 'block';
                    familyCheckIcon.style.display = 'none';
                };
                if (organizationDiv.classList.contains('selected')){
                    organizationDiv.classList.remove('selected');
                };
                if (individualDiv.classList.contains('selected')){
                    individualDiv.classList.remove('selected');
                };
            });

            organizationDiv.removeEventListener('click', () => {
                organizationDiv.classList.toggle('selected');
                if (organizationDiv.classList.contains('selected')){
                    continueDiv.style.display = 'flex';
                    organizationIcon.style.display = 'none';
                    organizationCheckIcon.style.display = 'block';
                    familyIcon.style.display = 'block';
                    familyCheckIcon.style.display = 'none';
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
                if (familyDiv.classList.contains('selected')){
                    familyDiv.classList.remove('selected');
                };
            });


            continueDiv.removeEventListener('click', () => {
                if (sessionStorage.getItem('account-type')){
                    sessionStorage.removeItem('account-type');
                };

                if (individualDiv.classList.contains('selected')) {
                    sessionStorage.setItem('account-type', 'beneficiary-individual');
                    return setRedirect('continue-beneficiary-registration');
                }
                else if (familyDiv.classList.contains('selected')) {
                    sessionStorage.setItem('account-type', 'beneficiary-family');
                    return setRedirect('continue-beneficiary-registration');
                }
                else if (organizationDiv.classList.contains('selected')) {
                    sessionStorage.setItem('account-type', 'beneficiary-organization');
                    return setRedirect('continue-beneficiary-registration');
                };
            });
        }
    }, []);


    if (redirect === 'continue-beneficiary-registration'){
       return <Redirect to="/continue-beneficiary-registration" />
    }
    else return (
        <>
        <div className="container choose-beneficiary-account">
            <div className="register-nav" data-aos="fade-down">
                <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                <a href="/login">Go to Login <i className="fa fa-angle-right fa-2x"></i> </a>
            </div>

            <div className="beneficiary-types">
                <div className="beneficiary-type-intro">
                    <h2 data-aos="fade-down" data-aos-delay="100">Choosing an Account type</h2>
                    <div className="underline" data-aos="fade-down"></div>
                    <p  data-aos="fade-up">We'd also want to know whom you'll be making requests as on OneShare.</p>
                </div>
                <div className="beneficiary-list" data-aos="fade-up">
                    <div className="beneficiary-account-item" id="individual">
                        <div className="beneficiary-account-icon">
                            <img src="images/icons/individual.svg" id="individual-icon" alt="individual icon"/>
                            <img src="images/icons/check.svg" id="individual-check-icon" alt="check icon" className="check"/>
                        </div>
                        <div className="beneficiary-account-type-details">
                            <p><strong>Individual</strong></p>
                            <p>Your requests will be personal</p>
                        </div>
                    </div>

                    <div className="beneficiary-account-item" id="family">
                        <div className="beneficiary-account-icon">
                            <img src="images/icons/family.svg" id="family-icon" alt="family icon"/>
                            <img src="images/icons/check.svg" id="family-check-icon" alt="check icon" className="check"/>
                        </div>
                        <div className="beneficiary-account-type-details">
                            <p><strong>Family</strong></p>
                            <p>You'll be requesting as a family</p>
                        </div>
                    </div>
                </div>
                    <div className="beneficiary-account-item" id="organization" data-aos="fade-up" data-aos-delay="100">
                        <div className="beneficiary-account-icon">
                            <img src="images/icons/organization.svg" id="organization-icon" alt="organization icon"/>
                            <img src="images/icons/check.svg" id="organization-check-icon" alt="check icon" className="check"/>
                        </div>
                        <div className="beneficiary-account-type-details">
                            <p><strong>Organization</strong></p>
                            <p>You'll be requesting as a group</p>
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
export default RegisterBeneficiary;