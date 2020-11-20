import React from 'react';
import AdminNav from '../../Components/Admin-nav';

const Overview = () => {
    const dayHour = new Date().getHours();
    const timeOfDay =  dayHour < 12 ? 'morning' :
                    12 < dayHour  && dayHour < 16 ? 'afternoon' : 'evening';
    const name = 'Isaac';
    return (
        <>
        <div className="container admin">
            <div className="register-nav">
                <a href="/" className="login-home-link"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
                <button id="logout-btn"><img src="images/logout-icon.svg" alt="logout logo" className="mr-2"/>Logout of Oneshare </button>
            </div>
            <div className="row">
                <AdminNav page="overview"/>

                <div className="overview col-8">
                    <div className="greeting">
                        <h2><strong>Good {timeOfDay}, {name}.</strong></h2>
                        <p>Welcome to the OneShare admin dashboard.</p>
                    </div>
                    <div className="stats row">
                            <button className="btn active"><span>249,999</span><br/> Total Users</button>
                            <button className="btn"><span>1,500,000</span><br/> Total Donations</button>
                            <button className="btn"><span>249,999</span><br/> Total Requests</button>
                    </div>
                    <div className="summary d-flex flex-column flex-md-row">
                        <div className="d-flex">
                            <p><span>100,095</span> beneficiaries</p>
                            <p><span>149,904</span> donors</p>
                        </div>
                        <div className="d-flex">
                            <p><span>221,345</span> active users</p>
                            <p><span>28,654</span> inactive users</p>
                        </div>
                    </div>

                </div>
                </div>
            </div>

        </>
    )
};
export default Overview;
