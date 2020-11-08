import React, { useState, useEffect } from 'react';

import lgaList from '../Components/states-and-lgs';
import { Redirect } from 'react-router';

const FinishReg = (props) => {
    const [ selectedLga, setSelectedLga ] = useState('');
    const [ readTerms, updateReadTerms ] = useState(false);
    const [ redirect, setRedirect ] = useState(null);
    const accountType = sessionStorage.getItem('account-type');

    useEffect(() => {
        if (!accountType) return setRedirect('/register');
        if (!props.details) return setRedirect('/register');


        const { email, password } = props.details;
        const userStateSelect = document.getElementById("userState");
        userStateSelect.onchange = e => setSelectedLga(e.target.value);

        const checkTerms = document.getElementById("terms");
        checkTerms.onchange = () => {
            checkTerms.checked ? updateReadTerms(true) : updateReadTerms(false);
        };

        const form = document.getElementById("finish-reg-form");

        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const userState = formData.get('userState');
            const userLga = formData.get('userLga');
            const params = {
                body: {
                    name,
                    email,
                    password,
                    userState,
                    userLga,
                    accountType,
                }
            }
            console.log(params);
        })
        return () => {
            form.removeEventListener('submit', (e) =>{
                e.preventDefault();
            })
        }
    }, [props.details, accountType])


    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return (
        <>
            <div className="bg-color"></div>
            <div className="container container-xl continue-donor-reg">
                <div className="register-nav">
                    <a href="/"><i className="fa fa-angle-left fa-2x"></i> Go to Home</a>
                </div>

                <div className="continue-registration">
                    <div className="register-info">
                        <h1><strong>Welcome to OneShare!</strong></h1>
                        <p>To complete your registration, we'll need some of your information for identification and also to give you the best recommendation in your location.</p>
                        <div className="oneshare-logo">
                            <img src="images/Logo-blue.svg" alt="oneshare logo" />
                        </div>
                    </div>

                    <div className="register-form">
                        <h2 className="text-center"><strong>Complete Registration</strong></h2>
                        <div className="underline"></div>
                        <p className="text-center">Final steps to register on OneShare.</p>
                        <form id="finish-reg-form">
                            <input type="name" name="name" placeholder="Full Name" autoComplete="false" autoFocus required/> <br/>

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
                                <label htmlFor="terms" className="d-inline">I have read and agreed to the <a href="/terms-and-conditions">Terms and Conditions</a></label>
                            </div>
                            <br/>
                            <button type="submit" id="submit-btn" className={readTerms ? "completed" : ""}>
                                <strong>Finish</strong>
                            </button>
                        </form>
                    </div>
                  <div className="bg-color-device" id="finish-page"></div>
                </div>
            </div>
        </>
    )
};
export default FinishReg;