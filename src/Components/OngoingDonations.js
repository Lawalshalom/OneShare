import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const OngoingDonations = (props) => {
    const [ redirect, setRedirect ] = useState(null);
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storageToken = localStorage.getItem("token");
    const token = props.authData.token || storageToken;
    const ongoing = [];


    if (!user){
        return <Redirect to="/login"/>;
     }
     if (user.accountType !== "donor"){
        return <Redirect to="/login"/>;
     }

     const donations = user.donations;
     donations.forEach(donation => {
         if (!donation.approved && !donation.completed){
             ongoing.push(donation);
         }
     });

     const deleteRequest = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this donation?");
        if (confirm){
            const loadingDiv = document.getElementById(`loading-div-${id}`);
            const submitBtn = document.getElementById(`delete-btn-${id}`);
            const successDiv = document.getElementById("delete-success-div");
            loadingDiv.style.display = "block";
            submitBtn.style.display = "none";


            const bearer = "Bearer " + token;
                const Params = {
                    headers: {
                        "authorization": bearer,
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "application/JSON",
                    },
                    body: JSON.stringify({
                        donationId: id
                    }),
                    method: "POST"
            }

            async function deleteRequest() {
                const res = await fetch("https://oneshare-backend.herokuapp.com/api/donor/delete-donation", Params);
                const data = await res.json();
                loadingDiv.style.display = "none";
                successDiv.style.display = "block";
                submitBtn.style.display = "block";
                if (data.success){
                    return props.setAuthData.updateUser(data.user);
                }
            }

            deleteRequest(Params).catch(err => {
                console.log(err);
            })
        }
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
    ongoing.reverse();

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return(
        <div className="dashboard-items" data-aos="fade-up" id="ongoing-donations">
            <div className="d-flex justify-content-center">
                <div id="delete-success-div" className="alert alert-dismissible col-md-8 fade show" role="alert" data-aos="fade-up">
                    <p className="text-success">Donation deleted successfully</p>
                </div>
            </div>

        {ongoing.length < 1 && <p className="faded">Post your donations to see them here</p>}


        {
            ongoing.map(donation => {
                return (
                    <div key={donation.id} className="row item-cover">
                        <div className="dashboard-item col-md-10 col-lg-9 row">
                            <div className="item-img col-12 col-md-4">
                                <img className="w-100" src={`https://oneshare-backend.herokuapp.com/${donation.id}`} alt="donor item"/>
                            </div>
                            <div className="item-details col-10 col-md-8 d-flex flex-column">
                                <div className="item-name d-flex">
                                    <p><strong>{donation.donationType.toUpperCase()}</strong></p>
                                    <p className="faded">{donation.beneficiary ? " • Beneficiary chosen, in contact"
                                        : " • No Beneficiaries yet"}</p>
                                </div>
                                <div className="item-location d-flex flex-column flex-md-row">
                                    <p><img src="images/icons/frames01.svg" alt="location icon" /> {user.userLGA} LGA, {user.userState} State</p>
                                    <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(donation.dateCreated)}</p>
                                </div>
                                <p className="faded">{donation.donationDetails.slice(0, 35)}...
                                    <span className="text-primary" onClick={() => setRedirect({
                                                            pathname: "/donation-item-details",
                                                            state: { donation }
                                                          })}>
                                        Read More</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-2 delete-btn">
                            <div id={`loading-div-${donation.id}`}></div>
                            <button onClick={() => deleteRequest(donation.id)} id={`delete-btn-${donation.id}`}><strong>X</strong></button>
                        </div>
                    </div>
                )}
            )
        }

    <p className="faded"><em> • Only approved donations are displayed</em></p>
</div>

    )
};
export default OngoingDonations;
