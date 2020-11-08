import React, { useState } from 'react';

const DonationItemDetails = (props) => {

    console.log(props.location.state)

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

    return(
    <>
        <div className="container">
            <div className="register-nav">
                <a href="/donor-dashboard"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="row dashboard-item-details">
                <div className="dashboard-item col-md-11 col-lg-11 row">
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
                        <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</p>
                    </div>
                </div>
            </div>
            <p className="beneficiaries-header"><strong>People who need this in Eti Osa LGA, Lagos State</strong></p>

            <div className="row beneficiaries-details">
                <div className="dashboard-item col-md-10 col-lg-9 row">
                    <div className="item-details col-12 col-md-8 d-flex flex-column">
                        <div className="item-name d-flex">
                            <p><strong>Isaac Fayemi </strong></p>
                            <p className="faded"> • Individual</p>
                        </div>
                        <div className="item-location d-flex flex-column flex-md-row">
                            <p><img src="images/icons/frames01.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                        </div>
                        <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                    </div>
                    <div className="contact-btn col-md-4">
                        <a href="/choose-beneficiary" className="btn">Get in Contact</a>
                    </div>
                </div>
            </div>

            <div className="row beneficiaries-details">
                <div className="dashboard-item col-md-10 col-lg-9 row">
                    <div className="item-details col-12 col-md-8 d-flex flex-column">
                        <div className="item-name d-flex">
                            <p><strong>John Doe </strong></p>
                            <p className="faded"> • Organization</p>
                        </div>
                        <div className="item-location d-flex flex-column flex-md-row">
                            <p><img src="images/icons/frames01.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                        </div>
                        <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                    </div>
                    <div className="contact-btn col-md-4">
                        <a href="/choose-beneficiary" className="btn">Get in Contact</a>
                    </div>
                </div>
            </div>

            <div className="row beneficiaries-details">
                <div className="dashboard-item col-md-10 col-lg-9 row">
                    <div className="item-details col-12 col-md-8 d-flex flex-column">
                        <div className="item-name d-flex">
                            <p><strong>Isaac Fayemi</strong></p>
                            <p className="faded"> • Family</p>
                        </div>
                        <div className="item-location d-flex flex-column flex-md-row">
                            <p><img src="images/icons/frames01.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                        </div>
                        <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span>
                        </p>
                    </div>
                    <div className="contact-btn col-md-4">
                        <a href="/choose-beneficiary" className="btn">Get in Contact</a>
                    </div>
                </div>
            </div>

    </div>
    </>
    )
}
export default DonationItemDetails;