import React from 'react';

const CompletedDonations = (props) => {
    const completed = [];
    props.users.forEach(user => {
        if (user.donations){
            if (user.donations.length > 0){
                user.donations.forEach(donation => {
                    if (donation.completed)
                    completed.push(donation);
                })
            }
        }
    })

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
        <div id="completed">
            {
                completed.length < 1 &&
                <p className="text-center faded">• No unapproved requests have been made yet</p>
            }

            {
                completed.map(donation => {
                    return <div key={donation.id} className="row item-cover">
                    <div className="dashboard-item col-md-10 col-lg-9 row">
                        <div className="item-img col-12 col-md-4">
                            <img className="w-100" src={`https://oneshare-backend.herokuapp.com/${donation.id}`} alt="donor item"/>
                        </div>
                        <div className="item-details col-12 col-md-8 d-flex flex-column">
                            <div className="item-name d-flex">
                                <p><strong>{donation.donationType.toUpperCase()} • </strong></p>
                                <p className="text-primary"> Completed <img className="check-icon" src="images/icons/check.svg" alt="check icon" /></p>
                            </div>
                                <p className="faded">Donated to {donation.beneficiary.name}</p>
                            <div className="item-location d-flex flex-column flex-md-row">
                                <p><img src="images/icons/frames01.svg" alt="location icon" />{donation.userLGA} LGA, {donation.userState} State</p>
                                <p><img src="images/icons/Frame.png" alt="time icon" /> Completed {displayTime(donation.dateCreated)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                })
            }

        </div>
    )
}
export default CompletedDonations;
