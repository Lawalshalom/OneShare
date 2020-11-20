import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

const RequestForm = (props) => {

    const [ redirect, setRedirect ] = useState(null);

    const user =  props.authData.user || JSON.parse(localStorage.getItem("user"));
    const storedToken = props.authData.token || localStorage.getItem("token");

    useEffect(() => {

        if (!user){
           return setRedirect("/login")
        }
        if (user.accountType !== "beneficiary"){
            return setRedirect("/login");
         }


        const form = document.getElementById("request-form");
        const successDiv = document.getElementById("success-div");
        const failureDiv = document.getElementById("failure-div");
        const loadingDiv = document.getElementById("loading-div");
        const submitBtn = document.getElementById("submit-btn");

        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const requestType = formData.get("request-type");
            const requestDetails = formData.get("request-details");
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
                    requestType,
                    requestDetails
				}),
				method: "POST",
			};

            async function submitRequest(params){
             const res = await fetch("http://localhost:7890/api/beneficiary/create-request", params);
             const data = await res.json();
             if (data.success){
                props.setAuthData.updateUser(data.user);
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
            submitRequest(Params).catch(err => {
                successDiv.style.display = "none";
                failureDiv.innerText = err;
                failureDiv.style.display = "block";
                loadingDiv.style.display = "none";
                submitBtn.style.display = "block";
            }
            )
        }
    }, [props, user, storedToken])

    if (redirect !== null){
        return <Redirect to={redirect}/>
    }
    else return (
        <>
        <div className="container">
            <div className="register-nav">
                <a href="/beneficiary-dashboard"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="container row">
                <div className="dashboard mt-3 pt-5">
                    <div className="container greeting d-flex flex-column">
                        <h2 className="pt-5"><strong>Request Creation Form</strong></h2>
                        <p className="pt-2">Please fill this form to tell us more about what you need</p>
                    </div>
                </div>
            </div>

            <div className="request-form dashboard-nav row">
                <form id="request-form" className="col-12 col-lg-10">
                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6">
                            <p><strong>Which of these do you need?</strong></p>
                            <p>Please pick the option that best suits your need at this time.</p>
                        </div>
                        <div className="ml-md-5">
                            <div className="d-flex align-items-center">
                                <input type="radio" id="food-items" name="request-type" value="food-items" required/>
                                <label className="pl-2 pt-2" htmlFor="food-items">Food Items</label><br/>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="radio" id="ppe" name="request-type" value="ppe" required/>
                                <label className="pl-2 pt-2" htmlFor="ppe">PPE Equipment</label><br/>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6">
                            <p><strong>Additional comments or info?</strong></p>
                            <p>We want to know more about this request, in about 50 words (there's a 400 character limit).</p>
                        </div>
                        <div className="d-flex justify-content-center ml-md-5">
                            <textarea placeholder="Write here" minLength="50" maxLength="400" name="request-details" required></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                            <p className="text-center text-md-left"><strong>Hit submit once you're done</strong></p>
                        </div>

                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <div id="loading-div"></div>
                            <div id="success-div" className="text-success"></div>
                            <div id="failure-div" className="text-danger mb-3"></div>
                            <button className="btn completed" id="submit-btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default RequestForm;