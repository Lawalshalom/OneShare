import React, { useState } from 'react';
import { Redirect } from 'react-router';

const ChooseBeneficiary = (props) => {

    const [ data, setData ] = useState(null);
        if (!props.location.state){
            return <Redirect to="/donor-dashboard"/>
        }

    const redirectDonation = props.location.state.donation;
    const redirectRequest = props.location.state.request;
    localStorage.setItem("donation", JSON.stringify(redirectDonation));
    localStorage.setItem("request", JSON.stringify(redirectRequest));
    const savedDonation = JSON.parse(localStorage.getItem("chosen-donation"))
    const savedRequest = JSON.parse(localStorage.getItem("chosen-request"));

    let donation = redirectDonation || savedDonation;
    const request = redirectRequest || savedRequest;

    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");
    const user = appLoginData || JSON.parse(storageData);
    const token = props.authData.token || storageToken;

    user.donations.forEach(dona => {
        if (dona.id === donation.id && JSON.stringify(donation) !== JSON.stringify(dona)){
           return donation = dona;
        }
    })

    const bearer = "Bearer " + token;


    const handleMarkCompleted = () => {
        const confirm = window.confirm(`Are you sure items have been delivered to ${request.name}?`);
        if (confirm){
            const loadingDiv = document.getElementById("loading-div");
            const submitBtn = document.getElementById("submit-btn");
            loadingDiv.style.display = "block";
            submitBtn.style.display = "none";
            const Params = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/JSON",
                    "authorization": bearer
                },
                body: JSON.stringify({
                    donationId: donation.id,
                    donationEmail: user.email,
                    requestId: request.id,
                    requestEmail: request.email
                }),
                method: "POST"
            }
            async function completedDonation(params){
                const res = await fetch("https://oneshare-backend.herokuapp.com/api/donor/complete-donation", params);
                const data = await res.json();
                console.log(data)
                if (data.success){
                    props.setAuthData.updateUser(data.user);
                    setData(data.success);
                    loadingDiv.style.display = "none";
                }
            }
            completedDonation(Params).catch(err => {
                console.log(err);
            })
        }
    }
    console.log(data)

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

    return (
        <div className="container">
            <div className="register-nav">
                <a href="/donation-item-details"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="mt-5 dashboard-item row">
                <div className="item-img col-12 col-md-4">
                    <img className="w-100" src={`https://oneshare-backend.herokuapp.com/${donation.id}`} alt="donor item"/>
                </div>
                <div className="mt-3 mt-md-0 item-details col-12 col-md-8 d-flex flex-column">
                    <div className="item-name d-flex">
                        <p><strong>{donation.donationType.toUpperCase()}</strong></p>
                        <p className="faded"> • Beneficiary Chosen, in contact</p>
                    </div>
                    <div className="item-location d-flex flex-column flex-md-row">
                        <p><img src="images/icons/frames01.svg" alt="location icon" /> {user.userLGA} LGA, {user.userState} State</p>
                        <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(donation.dateCreated)}</p>
                    </div>
                    <p className="faded">{donation.donationDetails}</p>
                    <div className="mark-donation d-flex flex-column-reverse flex-lg-row align-items-lg-center">
                        <div className="mt-2 mt-lg-0">
                            <div id="loading-div"></div>
                           {
                               donation.completed ?
                               <button id="completed-btn" className="btn"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></button>
                               : <button className="btn" id="submit-btn" onClick={handleMarkCompleted}>Mark Donation as Completed</button>
                            }
                        </div>
                        <div className="p-lg-4 overflow-hidden">
                            <i className="fa fa-arrow-down d-inline d-lg-none" aria-hidden="true"></i>
                            <i className="fa fa-arrow-left d-none d-lg-inline" aria-hidden="true"></i>
                            <span className="p-2">Click this <strong>only after</strong>  the items have been handed over.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="chosen-p"><strong>For this donation, you have chosen:</strong></p>
            </div>

            <div className="mt-3 row flex-column flex-md-row mb-5">
                <div className="col-12 col-md-4">
                    <p><strong>{request.name}</strong></p>
                    <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(request.dateCreated)}</p>
                    <p className="faded">{request.requestDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">{request.requestDetails.slice(36, request.requestDetails.length)}.</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                </div>
                <div className="col-12 col-md-4">
                    <p className="faded">Email</p>
                    <p>{request.email}</p>
                    <p className="overflow-hidden"><img src="images/icons/message.png" alt="message icon" /><a className="p-2" href={`mailto:${request.email}`}>Send a mail</a></p>
                </div>
                <div className="col-12 col-md-4">
                    <p className="faded">Telephone</p>
                    <p>{request.phoneNumber}</p>
                    <p className="overflow-hidden"><img src="images/icons/call.png" alt="call icon" /><a href={`tel:${request.phoneNumber}`} className="p-2">Call</a></p>
                </div>
            </div>

        </div>
    )
}
export default ChooseBeneficiary;
