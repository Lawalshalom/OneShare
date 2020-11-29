import React, { useState } from 'react';
import { Redirect } from 'react-router';

const DonationItemDetails = (props) => {
    const [ beneficiaries, setBeneficiaries ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);
    let storedDonation;
    let propsDonation;

    if (props.location.state){
        localStorage.setItem("donation", JSON.stringify(props.location.state.donation));
        propsDonation = props.location.state.donation;
    }
    else {
        storedDonation = JSON.parse(localStorage.getItem("donation"));
    }
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");
    const user = appLoginData || JSON.parse(storageData);
    const token = props.authData.token || storageToken;

    let donation = propsDonation || storedDonation;

    if (!donation || !user.donations){
        return <Redirect to="/donor-dashboard"/>
    }

    user.donations.forEach(dona => {
        if (dona.id === donation.id && JSON.stringify(donation) !== JSON.stringify(dona)){
           return donation = dona;
        }
    })

    const bearer = "Bearer " + token;
    const Params = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "authorization": bearer
        },
        method: "GET"
    }
    async function getBeneficiaries(params){
        if(beneficiaries !== null) return;
        const res = await fetch("https://oneshare-backend.herokuapp.com/api/donor/choose-beneficiary", params);
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
        const dateDiff = (new Date().getDate()) - (timeString.getDate());
        const minDiff = (new Date().getMinutes()) - (timeString.getMinutes());
        let displayTime, displayDate;

        const displayMins = minDiff === 0 ? "Just Now"
                          : minDiff === 1 ? `${minDiff} minute ago`
                          : `${minDiff} minutes ago`

        const hours = timeString.getHours() === 0 ? "12"
                    : timeString.getHours() > 0 && timeString.getHours() < 10 ? `0${timeString.getHours()}`
                    : timeString.getHours() > 10 && timeString.getHours() <= 12 ? timeString.getHours()
                    : timeString.getHours() > 12 && timeString.getHours() < 22 ? `0${timeString.getHours() - 12}`
                    : `${timeString.getHours() - 12}`;

        const amPM = timeString.getHours() > 12 ? "PM" : "AM";
        switch (diff) {
            case 0:
                displayTime = displayMins;
                break;
            case 1:
                displayTime = `${diff} hour ago`
                break;
            case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
               displayTime = `${diff} hours ago`
                break;
            default: displayTime = `${hours}:${timeString.getMinutes() === 0 ? "00" : timeString.getMinutes() < 10 ? `0${timeString.getMinutes()}` : timeString.getMinutes()} ${amPM}`;
                break;
        }
        switch (dateDiff) {
            case 0:
                displayDate = ""
                break;
            case 1:
                displayDate = ", Yesterday"
                break;
            case 2:
                displayDate = ", Two days ago"
                break;
            default:
                displayDate = `${timeString.getDate()}, ${timeString.getMonth()}, ${timeString.getFullYear()}`;
                break;
        }
        return `${displayTime} ${displayDate}`;
    }

const handleSelect = (request) => {
    const confirm = window.confirm(`Do you want to choose ${request.name} as beneficiary for this donation?`);
    if (confirm) {
            const successDiv = document.getElementById("success-div");
            const failureDiv = document.getElementById("failure-div");
            const loadingDiv = document.getElementById("loading-div");
            const submitBtn = document.getElementById("submit-btn");

            const fetchParams = {
                headers: {
                    "authorization": bearer,
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/JSON",
                },
                body: JSON.stringify({
                    donationId: donation.id,
                    beneficiary: request,
                    email: user.email
                }),
                method: "POST"
            }
                successDiv.style.display = "none";
                failureDiv.style.display = "none";
                loadingDiv.style.display = "block";
                submitBtn.style.display = "none";

            async function chooseBeneficiary(params){
                const res = await fetch("https://oneshare-backend.herokuapp.com/api/donor/save-chosen-beneficiary", params);
                const data = await res.json();
                console.log(data)
                if (data.success){
                    props.setAuthData.updateUser(data.user);
                    const updatedDonation = data.user.donations.find((dona => dona.id === donation.id))
                    localStorage.setItem("donation", JSON.stringify(updatedDonation));
                       return setRedirect({
                            pathname: "/choose-beneficiary",
                            state: { request, donation }
                          })
                }
            }
            chooseBeneficiary(fetchParams).catch(err => {
                console.log(err)
            })
        }
    }

    const lgaBeneficiaries = [];
    const stateBeneficiaries = [];

    if (beneficiaries){
        for (let i = 0; i < beneficiaries.length; i++){
            // eslint-disable-next-line no-loop-func
            beneficiaries[i].forEach(beneficiary => {
                if (beneficiary.userState === user.userState && !beneficiary.approved  && !beneficiary.completed &&  beneficiary.requestType === donation.donationType && beneficiary.userLGA === user.userLGA){
                    return lgaBeneficiaries.push(beneficiary);
                }
                else if (beneficiary.userState === user.userState && !beneficiary.approved &&  !beneficiary.completed && beneficiary.requestType === donation.donationType){
                    return stateBeneficiaries.push(beneficiary);
                }
            });
        }
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
                        <img className="w-100" src={`https://oneshare-backend.herokuapp.com/${donation.id}`} alt="donor item"/>
                    </div>
                    <div className="item-details col-12 col-md-8 d-flex flex-column">
                        <div className="item-name d-flex">
                            <p><strong>{donation.donationType.toUpperCase()}</strong></p>
                            <p className="faded">
                                {donation.completed ? <span className="text-primary"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></span> :
                                    donation.beneficiary ? " • Beneficiary chosen, in contact"
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
                {!donation.completed && <p className="beneficiaries-header"><strong>People who need this in {user.userLGA} LGA, {user.userState}</strong></p>}

            {!donation.completed && lgaBeneficiaries.length < 1 && <p className="faded"><em>• No {donation.donationType.toUpperCase()} requests have been made in your LGA yet.</em></p>}

            {
                !donation.completed && lgaBeneficiaries.map(request => {
                    return (
                        <div key={request.id} className="row beneficiaries-details">
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
                                    <div id="loading-div"></div>
                                    <div id="success-div" className="text-success"></div>
                                    <div id="failure-div" className="text-danger mb-3"></div>
                                    <span className="btn" id="submit-btn" onClick={() => handleSelect(request)}>Get in Contact</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                donation.completed &&
                <div className="beneficiaries-header">
                    <p className="faded">Donated to {donation.beneficiary.name}</p>
                </div>

            }



            {!donation.completed && <p className="beneficiaries-header"><strong>Other people who need this in {user.userState} state</strong></p>}


            {!donation.completed && stateBeneficiaries.length < 1 && <p className="faded"><em>• No other {donation.donationType.toUpperCase()} requests have been made in your state yet.</em></p>}

            {
               !donation.completed && stateBeneficiaries.map(request => {
                    return (
                        <div key={request.id} className="row beneficiaries-details">
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
                                    <span className="btn" onClick={() => {
                                        return setRedirect({
                                            pathname: "/choose-beneficiary",
                                            state: { request, user }
                                          })}}>Get in Contact</span>
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