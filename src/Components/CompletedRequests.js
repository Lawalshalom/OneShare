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
    if (user.accountType !== "beneficiary"){
        return <Redirect to="/login"/>
    }
    const requests = user.requests;
    requests.forEach(req => {
        if (!req.approved && req.completed){
            completed.push(req);
        }
    });

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
                displayDate = "Today"
                break;
            case 1:
                displayDate = "Yesterday"
                break;
            case 2:
                displayDate = "Two days ago"
                break;
            default:
                displayDate = `${timeString.getDate()}, ${timeString.getMonth()}, ${timeString.getFullYear()}`;
                break;
        }
        return `${displayTime}, ${displayDate}`;
    }
    completed.reverse();

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