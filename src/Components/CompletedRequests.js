import React from 'react';

const CompletedRequests = () => {
    return (
        <div className="dashboard-items" id="completed-requests">
        <div className="row item-cover">
            <div className="dashboard-item col-12 row">
                <div className="item-details col-12 col-md-8 d-flex flex-column">
                    <div className="item-name d-flex flex-column flex-md-row">
                        <p><strong>Isaac Adeyemi is in need of Food items  • </strong></p>
                        <p className="text-primary"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></p>
                    </div>
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
export default CompletedRequests;