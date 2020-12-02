import React from 'react';

const AwaitingApprovalDonations = (props) => {
    const donations = [];
    props.users.forEach(user => {
        if (user.donations){
            if (user.donations.length > 0){
                user.donations.forEach(donation => {
                    if (!donation.approved)
                    donations.push(donation);
                })
            }
        }
    })

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

    const handleApproval = (id) => {

    }

    return (
            <div id="awaiting-approval">
         {
            donations.length < 1 &&
            <p className="text-center faded">• No unapproved donations have been made yet</p>
        }


        {
            donations.map(donation => {
              return  <div key={donation.id} className="row item-cover">
                    <div className="dashboard-item col-12 row">
                        <div className="item-img col-12 col-md-3">
                            <img className="w-100" src={`https://oneshare-backend.herokuapp.com/${donation.id}`} alt="donor item"/>
                        </div>
                        <div className="item-details col-10 col-md-7 d-flex flex-column">
                            <div className="item-name d-flex">
                                <p><strong className="text-capitalize">{donation.name}</strong></p>
                                <p><strong className="text-capitalize">• {donation.donationType}</strong></p>
                            </div>
                            <div className="item-location d-flex flex-column flex-md-row">
                                <p className="faded text-capitalize">• {donation.accountSubtype}</p>
                                <p><img src="images/icons/frames01.svg" alt="location icon" /> {donation.userLGA} LGA, {donation.userState}</p>
                            </div>
                            <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(donation.dateCreated)}</p>
                            <p className="faded">{donation.donationDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                                    <span className="more-read">{donation.donationDetails.slice(36, donation.donationDetails.length)}</span>
                                    <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                        </div>
                        <div className="contact-btn col-md-2">
                            <span className="btn" id={donation.id} onClick={() => handleApproval(donation.id)}>Approve</span>
                        </div>
                        </div>
                </div>
            })
        }

    </div>
    )
}
export default AwaitingApprovalDonations;
