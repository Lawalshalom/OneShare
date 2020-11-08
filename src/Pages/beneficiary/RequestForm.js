import React, { useEffect } from 'react';

const RequestForm = () => {

    useEffect(() => {
        const form = document.getElementById("request-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const requestType = formData.get("request-type");
            const requestDetails = formData.get("request-details");

            const body = {requestType, requestDetails}
            console.log(body)
        })
    })
    return (
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
                            <textarea placeholder="Write here" minLength="20" maxLength="400" name="request-details" required></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                            <p className="text-center text-md-left"><strong>Hit submit once you're done</strong></p>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <button className="btn completed" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default RequestForm;