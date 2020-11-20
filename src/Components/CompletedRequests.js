import React from 'react';
import { Redirect } from 'react-router';

const CompletedRequests = (props) => {

    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);

    const completed = [];

    if (!user){
        return <Redirect to="/login"/>
    }
    const requests = user.requests;
    requests.forEach(req => {
        if (!req.approved && req.completed){
            completed.push(req);
        }
    });

    console.log(completed)

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

    return (
        <div className="dashboard-items" id="completed-requests">

        {completed.length < 1 && <p className="faded"><em> • Requests will show here after you've gotten the items from a donor.</em></p>}


        {
            completed.map(req => {
                return (
                    <div key={req.id} className="row item-cover">
                        <div className="dashboard-item col-12 row">
                            <div className="item-details col-12 col-md-8 d-flex flex-column">
                                <div className="item-name d-flex flex-column flex-md-row">
                                    <p><strong>{user.name} is in need of {req.requestType}  • </strong></p>
                                    <p className="text-primary"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></p>
                                </div>
                                <div className="item-location d-flex flex-column flex-md-row">
                                    <p><img src="images/icons/frames01.svg" alt="location icon" /> {req.requestLGA} LGA, {req.requestState} state</p>
                                    <p><img src="images/icons/Frame.png" alt="time icon" /> Completed {displayTime(req.dateCreated)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
};
export default CompletedRequests;