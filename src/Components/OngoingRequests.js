import React from 'react';
import { Redirect } from 'react-router';

const OngoingRequests = (props) => {

    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storageToken = localStorage.getItem("token");
    const token = props.authData.token || storageToken;

    const ongoing = [];


    if (!user){
        return <Redirect to="/login"/>
    }
    if (user.accountType !== "beneficiary"){
        return <Redirect to="/login"/>
    }

    const requests = user.requests;
    requests.forEach(req => {
        if (!req.approved && !req.completed){
            ongoing.push(req);
        }
    });


    const deleteRequest = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this request?");
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
                        requestId: id
                    }),
                    method: "POST"
            }

            async function deleteRequest() {
                const res = await fetch("https://oneshare-backend.herokuapp.com/api/beneficiary/delete-request", Params);
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

    ongoing.reverse();

     return(
        <div className="dashboard-items" data-aos="fade-up" id="ongoing-requests">
            <div className="d-flex justify-content-center">
                <div id="delete-success-div" className="alert alert-dismissible col-md-8 fade show" role="alert" data-aos="fade-up">
                    <p className="text-success">Request deleted successfully</p>
                </div>
            </div>

        {ongoing.length < 1 && <p className="faded">Create your requests to see them here</p>}

        {
            ongoing.map(req => {
             return (  <div key={req.id} className="item-cover">
                <div className="dashboard-item col-12 row">
                    <div className="item-details col-10 d-flex flex-column">
                        <div className="item-name d-flex flex-column flex-md-row">
                            <p><strong>{user.name} is in need of {req.requestType}</strong></p>
                            <p className="faded">
                                {req.matchedDonor ? " • Donor matched, in contact" : " • No Donors matched yet"}</p>
                        </div>
                        <div className="item-location d-flex flex-column flex-md-row">
                            <p><img src="images/icons/frames01.svg" alt="location icon" /> {req.userLGA} LGA, {req.userState} State</p>
                            <p><img src="images/icons/frames02.svg" alt="time icon" />{displayTime(req.dateCreated)}</p>
                        </div>
                        <p className="faded">{req.requestDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">{req.requestDetails.slice(36, req.requestDetails.length)}</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span>
                        </p>
                    </div>
                    <div className="col-2 delete-btn">
                        <div id={`loading-div-${req.id}`}></div>
                        <button onClick={() => deleteRequest(req.id)} id={`delete-btn-${req.id}`}><strong>X</strong></button>
                    </div>
                </div>
            </div>
             )

            })
        }
        <p className="faded"><em> • Only approved requests are displayed</em></p>
</div>

    )
};
export default OngoingRequests;
