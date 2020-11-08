import React from 'react';

const CompletedDonations = () => {
    return (
        <div className="dashboard-items" id="completed-donations">
        <div className="row item-cover">
            <div className="dashboard-item col-md-10 col-lg-9 row">
                <div className="item-img col-12 col-md-4">
                    <img className="w-100" src="images/rectangle31.png" alt="donor item"/>
                </div>
                <div className="item-details col-12 col-md-8 d-flex flex-column">
                    <div className="item-name d-flex">
                        <p><strong>Food items  • </strong></p>
                        <p className="text-primary"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></p>
                    </div>
                        <p className="faded">Donated to Isaac Fayemi</p>
                    <div className="item-location d-flex flex-column flex-md-row">
                        <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                        <p><img src="images/icons/Frame.png" alt="time icon" /> Completed 8:30AM, Yersterday</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};
export default CompletedDonations;
