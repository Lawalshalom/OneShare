import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const OngoingRequests = () => {
    const [ redirect, setRedirect ] = useState(null);

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

    if (redirect !== null){
        return <Redirect to={redirect} />
    }
    else return(
        <div className="dashboard-items" data-aos="fade-up" id="ongoing-requests">
        <div className="row item-cover">
            <div className="dashboard-item col-12 row">
                <div className="item-details col-12 col-md-10 d-flex flex-column">
                    <div className="item-name d-flex flex-column flex-md-row">
                        <p><strong>Isaac Fayemi is in need of Food Items </strong></p>
                        <p className="faded"> • No Donors matched yet</p>
                    </div>
                    <div className="item-location d-flex flex-column flex-md-row">
                        <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                        <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                    </div>
                    <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                        <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                        <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span>
                    </p>
                </div>
            </div>
        </div>

    <div className="row item-cover">
        <div className="dashboard-item col-12 row">
            <div className="item-details col-12 col-md-8 d-flex flex-column">
                <div className="item-name d-flex flex-column flex-md-row">
                    <p><strong>John Doe is in need of PPE Equipments</strong></p>
                    <p className="faded-blue"> • Donor chosen, in contact</p>
                </div>
                <div className="item-location d-flex flex-column flex-md-row">
                    <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                    <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                </div>
                <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                    <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                    <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span>
                </p>
            </div>
        </div>
    </div>
</div>

    )
};
export default OngoingRequests;
