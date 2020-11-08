import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const OngoingDonations = () => {
    const [ redirect, setRedirect ] = useState(null);

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return(
        <div className="dashboard-items" data-aos="fade-up" id="ongoing-donations">
        <div className="row item-cover">
            <div className="dashboard-item col-md-10 col-lg-9 row">
                <div className="item-img col-12 col-md-4">
                    <img className="w-100" src="images/rectangle31.png" alt="donor item"/>
                </div>
                <div className="item-details col-12 col-md-8 d-flex flex-column">
                    <div className="item-name d-flex">
                        <p><strong>Food items </strong></p>
                        <p className="faded"> • No Beneficiaries yet</p>
                    </div>
                    <div className="item-location d-flex flex-column flex-md-row">
                        <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                        <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                    </div>
                    <p className="faded">Lorem ipsum i an a dog in a garden and this is a ....<a href="/donation-item-details">Read More</a></p>
                </div>
            </div>
        </div>

    <div className="row item-cover">
        <div className="dashboard-item col-md-10 col-lg-9 row">
            <div className="item-img col-12 col-md-4">
                <img className="w-100" src="images/rectangle3.png" alt="donor item"/>
            </div>
            <div className="item-details col-12 col-md-8 d-flex flex-column">
                <div className="item-name d-flex">
                    <p><strong>PPE Equipment </strong></p>
                    <p className="faded-blue"> • Beneficiary chosen, in contact</p>
                </div>
                <div className="item-location d-flex flex-column flex-md-row">
                    <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                    <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                </div>
                    <p className="faded">Lorem ipsum i an a dog in a garden and this is a ....<a href="/donation-item-details">Read More</a></p>
            </div>
        </div>
    </div>
</div>

    )
};
export default OngoingDonations;
