import React, { useState } from 'react';
import { Redirect } from 'react-router';

const DonationItemDetails = (props) => {
    const [ beneficiaries, setBeneficiaries ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);

    const donation = props.location.state.donation;
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");
    const user = appLoginData || JSON.parse(storageData);
    const token = props.authData.token || storageToken;

    const bearer = "Bearer " + token;
    const Params = {
        headers: {
            "authorization": bearer
        },
        method: "GET"
    }
    async function getBeneficiaries(params){
        if(beneficiaries !== null) return;
        const res = await fetch("http://localhost:7890/api/donor/choose-beneficiary", params);
        const data = await res.json();
        setBeneficiaries(data.requests);
    }
    getBeneficiaries(Params).catch(err => {
        console.log(err);
    })

    const handleReadMore = (e) => {
        const dots = e.target.previousElementSibling;
        const moreRead = e.target.nextSibling;
        const readLess = moreRead.nextSibling;
        dots.style.display = "none";
        e.target.style.display = "none";
        moreRead.style.display = "inline";
        readLess.style.display = "inline";
    }
    const handleReadLess = (e) => {
        const moreRead = e.target.previousElementSibling;
        const readMore = moreRead.previousElementSibling;
        const dots = readMore.previousElementSibling;
        e.target.style.display = "none";
        dots.style.display = "inline";
        moreRead.style.display = "none";
        readMore.style.display = "inline";
    }
    const displayTime = (time) => {
        const timeString = new Date(time);
        const diff = (new Date().getHours()) - (timeString.getHours());
        const minuteDiff = (new Date().getMinutes()) - (timeString.getMinutes());
        const dateDiff = (new Date().getDate()) - (timeString.getDate());
        const displayDate = dateDiff === 0 ? "Today"
            : dateDiff === 1 ? "Yesterday" : dateDiff === 2 ? "Two days ago"
            : `${timeString.getDate()}, ${timeString.getMonth}, ${timeString.getFullYear()}`;
        const displayTime = diff === 0 ? `${minuteDiff} minutes ago`
                :diff === 1 ? `${diff} hour ago` : (1 <= diff && diff < 12)
                ? `${diff} hours ago` : timeString.toLocaleTimeString();
        return `${displayTime}, ${displayDate}`;
    }

    const lgaBeneficiaries = [];
    const stateBeneficiaries = [];
    console.log(beneficiaries);

    if (beneficiaries){
        beneficiaries.forEach(beneficiary => {
            if (beneficiary.userState === user.useState && beneficiary.approved === true  && beneficiary.requestType === donation.donationType && beneficiary.userLGA === user.userLGA){
                return lgaBeneficiaries.push(beneficiary);
            }
            else if (beneficiary.userState === user.useState && beneficiary.approved === true && beneficiary.requestType === donation.donationType){
                return stateBeneficiaries.push(beneficiary);
            }
        });
    }

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return(
    <>
        <div className="container">
            <div className="register-nav">
                <a href="/donor-dashboard"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="row dashboard-item-details">
                <div className="dashboard-item col-md-11 col-lg-11 row">
                    <div className="item-img col-12 col-md-4">
                        <img className="w-100" src={`http://localhost:7890/${donation.id}`} alt="donor item"/>
                    </div>
                    <div className="item-details col-12 col-md-8 d-flex flex-column">
                        <div className="item-name d-flex">
                            <p><strong>{donation.donationType.toUpperCase()}</strong></p>
                            <p className="faded">{donation.beneficiary ? " • Beneficiary chosen, in contact"
                                        : " • No Beneficiaries yet"}</p>
                        </div>
                        <div className="item-location d-flex flex-column flex-md-row">
                            <p><img src="images/icons/frames01.svg" alt="location icon" /> {user.userLGA} LGA, {user.userState} State</p>
                            <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(donation.dateCreated)}</p>
                        </div>
                        <p className="faded">{donation.donationDetails}</p>
                    </div>
                </div>
            </div>
            <p className="beneficiaries-header"><strong>People who need this in {user.userLGA} LGA, {user.userState}</strong></p>

            {lgaBeneficiaries.length < 1 && <p className="faded"><em>• No {donation.donationType.toUpperCase()} requests have been made in your LGA yet.</em></p>}

            {
                lgaBeneficiaries.map(request => {
                    return (
                        <div className="row beneficiaries-details">
                            <div className="dashboard-item col-md-10 col-lg-9 row">
                                <div className="item-details col-12 col-md-8 d-flex flex-column">
                                    <div className="item-name d-flex">
                                        <p><strong>{request.name} </strong></p>
                                        <p className="faded"> • {request.accountSubtype}</p>
                                    </div>
                                    <div className="item-location d-flex flex-column flex-md-row">
                                        <p><img src="images/icons/frames01.svg" alt="time icon" /> Posted {displayTime(request.dateCreated)}</p>
                                    </div>
                                    <p className="faded">{request.requestDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                                        <span className="more-read">{request.requestDetails.slice(36, request.requestDetails.length)}</span>
                                        <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                                </div>
                                <div className="contact-btn col-md-4">
                                    <span className="btn" onClick={() => setRedirect({
                                                            pathname: "/choose-beneficiary",
                                                            state: { request }
                                                          })}>Get in Contact</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }



            <p className="beneficiaries-header"><strong>Other people who need this in {user.userState} state</strong></p>


            {stateBeneficiaries.length < 1 && <p className="faded"><em>• No other {donation.donationType.toUpperCase()} requests have been made in your state yet.</em></p>}

            {
                stateBeneficiaries.map(request => {
                    return (
                        <div className="row beneficiaries-details">
                            <div className="dashboard-item col-md-10 col-lg-9 row">
                                <div className="item-details col-12 col-md-8 d-flex flex-column">
                                    <div className="item-name d-flex">
                                        <p><strong>{request.name} </strong></p>
                                        <p className="faded"> • {request.accountSubtype}</p>
                                    </div>
                                    <div className="item-location d-flex flex-column flex-md-row">
                                        <p><img src="images/icons/frames01.svg" alt="time icon" /> Posted {displayTime(request.dateCreated)}</p>
                                    </div>
                                    <p className="faded">{request.requestDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                                        <span className="more-read">{request.requestDetails.slice(36, request.requestDetails.length)}</span>
                                        <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                                </div>
                                <div className="contact-btn col-md-4">
                                    <span className="btn" onClick={() => setRedirect({
                                                            pathname: "/choose-beneficiary",
                                                            state: { request }
                                                          })}>Get in Contact</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

    </div>
    </>
    )
}
export default DonationItemDetails;