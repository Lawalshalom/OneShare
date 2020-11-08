import React from 'react';

const ChooseBeneficiary = () => {

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

    return (
        <div className="container">
            <div className="register-nav">
                <a href="/donation-item-details"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="mt-5 dashboard-item row">
                <div className="item-img col-12 col-md-4">
                    <img className="w-100" src="images/rectangle31.png" alt="donor item"/>
                </div>
                <div className="mt-3 mt-md-0 item-details col-12 col-md-8 d-flex flex-column">
                    <div className="item-name d-flex">
                        <p><strong>Food items </strong></p>
                        <p className="faded"> • Beneficiary Chosen, in contact</p>
                    </div>
                    <div className="item-location d-flex flex-column flex-md-row">
                        <p><img src="images/icons/frames01.svg" alt="location icon" /> Eti-Osa LGA, Lagos State</p>
                        <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                    </div>
                    <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</p>
                    <div className="mark-donation d-flex flex-column-reverse flex-lg-row align-items-lg-center">
                        <div className="mt-2 mt-lg-0">
                            <button className="btn">Mark Donation as Completed</button>
                        </div>
                        <div className="p-lg-4 overflow-hidden">
                            <i className="fa fa-arrow-left d-none d-md-inline"></i>
                            <span className="p-2">Click this after the items have been handed over.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="chosen-p"><strong>For this donation, you have chosen:</strong></p>
            </div>

            <div className="mt-3 row flex-column flex-md-row">
                <div className="col-12 col-md-4">
                    <p><strong>Isaac Fayemi</strong></p>
                    <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted 8:30AM, Yersterday</p>
                    <p className="faded">Lorem ipsum dolor sit amet, consectetur adipiscing<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                            <span className="more-read">Nulla porta ullamcorper velit molestie egestas. Nam feugiat orci eget ullamcorper rutrum. Maecenas malesuada nec mauris a lobortis. Suspendisse id metus vestibulum, euismod lacus eu, venenatis turpis. Etiam placerat finibus urna sit amet sagittis.</span>
                            <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>
                </div>
                <div className="col-12 col-md-4">
                    <p className="faded">Email</p>
                    <p>examplemail@client.com</p>
                    <p className="overflow-hidden"><img src="images/icons/message.png" alt="message icon" /><a className="p-2" href="mailto:examplemail@client.com">Send a mail</a></p>
                </div>
                <div className="col-12 col-md-4">
                    <p className="faded">Telephone</p>
                    <p>09034421786</p>
                    <p className="overflow-hidden"><img src="images/icons/call.png" alt="call icon" /><a href="tel:09034421786" className="p-2">Call</a></p>
                </div>
            </div>

        </div>
    )
}
export default ChooseBeneficiary;
