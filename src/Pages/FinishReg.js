import React, { useState, useEffect } from 'react';

import lgaList from '../Components/states-and-lgs';
import { Redirect } from 'react-router';
import Terms from '../Components/Terms';

const FinishReg = (props) => {
    const [ selectedLga, setSelectedLga ] = useState('');
    const [ readTerms, updateReadTerms ] = useState(false);
    const [ redirect, setRedirect ] = useState(null);
    const [ showTerms, updateShowTerms ] = useState(false);
    const accountGeneralType = sessionStorage.getItem('account-type');


    useEffect(() => {
        const conditionsSpan = document.getElementById("conditionsSpan");
        if (conditionsSpan) {
                conditionsSpan.onclick =  (e) => {
                e.preventDefault();
                e.stopPropagation();
                return updateShowTerms(true);
            }
        }
    });

    useEffect(() => {
        if (!accountGeneralType) return setRedirect('/register');
        if (!props.details) return setRedirect('/register');


        const { email, password } = props.details;
        const userStateSelect = document.getElementById("userState");
        userStateSelect.onchange = e => setSelectedLga(e.target.value);

        const checkTerms = document.getElementById("terms");
        checkTerms.onchange = () => {
            checkTerms.checked ? updateReadTerms(true) : updateReadTerms(false);
        };

        const form = document.getElementById("finish-reg-form");
        const successDiv = document.getElementById("success-div");
        const failureDiv = document.getElementById("failure-div");
        const loadingDiv = document.getElementById("loading-div");
        const submitBtn = document.getElementById("submit-btn");

        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const userState = formData.get('userState');
            const userLGA = formData.get('userLga');
            const accountTypeSplit = accountGeneralType.split("-");
            const accountType = accountTypeSplit[0];
            const accountSubtype = accountTypeSplit[1];
            successDiv.style.display = "none";
            failureDiv.style.display = "none";
            loadingDiv.style.display = "block";
            submitBtn.style.display = "none";

            const Params = {
				headers: {
					"Content-type": "application/JSON",
				},
				body: JSON.stringify({
                    name,
                    email,
                    password,
                    userState,
                    userLGA,
                    accountType,
                    accountSubtype
				}),
				method: "POST",
			};

            async function registerUser(params){
             const res = await fetch("https://oneshare-backend.herokuapp.com/api/user/register-user", params);
             const data = await res.json();
             console.log(data)
             console.log(data.error)
             if (data.success){
                 successDiv.innerHTML = data.success + " <a href='/login'> Continue to Login</a>";
                 successDiv.style.display = "block";
                 failureDiv.style.display = "none";
                 submitBtn.style.display = "none";
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
            try {
                registerUser(Params);
            } catch (err) {
                successDiv.style.display = "none";
                failureDiv.innerText = err.error;
                failureDiv.style.display = "block";
                loadingDiv.style.display = "none";
                submitBtn.style.display = "block";
            }
        })
        return () => {
            form.removeEventListener('submit', (e) =>{
                e.preventDefault();
            })
        }
    }, [props.details, accountGeneralType])


   if (redirect !== null){
    return <Redirect to={redirect} />
   }
    else return (
        <>
            <div className="bg-color"></div>
            <div className="container container-xl continue-donor-reg">
                <div className="register-nav" data-aos="fade-down">
                    <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                </div>

                <div className="continue-registration">
                    <div className="register-info" data-aos="fade-right">
                        <h1><strong>Welcome to OneShare!</strong></h1>
                        <p>To complete your registration, we'll need some of your information for identification and also to give you the best recommendation in your location.</p>
                        <div className="oneshare-logo">
                            <img src="images/Logo-blue.svg" alt="oneshare logo" />
                        </div>
                    </div>

                    <div className="register-form" data-aos="fade-left">
                        <h2 className="text-center"><strong>Complete Registration</strong></h2>
                        <div className="underline"></div>
                        <p className="text-center">Final steps to register on OneShare.</p>
                        <form id="finish-reg-form">
                            <input type="name" name="name" placeholder="Full Name"
                            autoComplete="false" autoFocus required minLength="3"
                            maxLength="30" pattern="[a-zA-Z]{3,}\s[a-zA-Z]{3,}"/> <br/>

                            <select name="userState" id="userState" required>
                                <option value="">State of Residence</option>
                                {
                                    Object.keys(lgaList).map(state => {
                                        return (<option value={state} key={Object.keys(lgaList).indexOf(state)}>{state}</option>)
                                    })
                                }
                            </select>
                            <br/>
                            <select name="userLga" id="userLga" required>
                                <option value="">Local Government Area (LGA)</option>
                                {
                                   lgaList[selectedLga] && lgaList[selectedLga].map(lga => {
                                   return (<option value={lga} key={lgaList[selectedLga].indexOf(lga)}>{lga}</option>)
                                    })
                                }
                            </select>
                            <br/>
                            <div className="text-center">
                                <input type="checkbox" id="terms" name="terms" required/>
                                <label htmlFor="terms" className="d-inline">I have read and agreed to the
                                    <span id="conditionsSpan" className="text-primary" style={{cursor: "pointer"}}> Terms and Conditions</span></label>
                            </div>
                            <br/>
                            <div id="loading-div"></div>
                            <div id="success-div" className="text-success"></div>
                            <div id="failure-div" className="text-danger mb-3"></div>
                            <button type="submit" id="submit-btn" className={readTerms ? "completed" : ""}>
                                <strong>Finish</strong>
                            </button>
                        </form>
                    </div>
                  <div className="bg-color-device" id="finish-page"></div>
                </div>
                {showTerms && <Terms show={updateShowTerms}/>}
            </div>
        </>
    )
};
export default FinishReg;