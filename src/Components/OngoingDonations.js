import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const OngoingDonations = (props) => {
    const [ redirect, setRedirect ] = useState(null);
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const ongoing = [];
    console.log(user);


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

     const displayTime = (time) => {
        const timeString = new Date(time);
        const diff = (new Date().getHours()) - (timeString.getHours());
        const dateDiff = (new Date().getDate()) - (timeString.getDate());
        const displayDate = dateDiff === 0 ? "Today"
            : dateDiff === 1 ? "Yesterday" : dateDiff === 2 ? "Two days ago"
            : `${timeString.getDate()}, ${timeString.getMonth}, ${timeString.getFullYear()}`;
        const displayTime = (0 <= diff && diff < 12) ? `${diff} hours ago` : timeString.toLocaleTimeString();
        return `${displayTime}, ${displayDate}`;
    }

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return(
        <div className="dashboard-items" data-aos="fade-up" id="ongoing-donations">

        {ongoing.length < 1 && <p className="faded">Post your donations to see them here</p>}


        {
            ongoing.map(donation => {
                return (
                    <div key={donation.id} className="row item-cover">
                        <div className="dashboard-item col-md-10 col-lg-9 row">
                            <div className="item-img col-12 col-md-4">
                                <img className="w-100" src={`http://localhost:7890/${donation.id}`} alt="donor item"/>
                            </div>
                            <div className="item-details col-12 col-md-8 d-flex flex-column">
                                <div className="item-name d-flex">
                                    <p><strong>{donation.donationType}</strong></p>
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
                    </div>
                )}
            )
        }

    <p className="faded"><em> • Only approved donations are displayed</em></p>
</div>

    )
};
export default OngoingDonations;
