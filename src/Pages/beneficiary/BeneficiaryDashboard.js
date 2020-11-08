import React, { useEffect } from 'react';
import OngoingRequests from "../../Components/OngoingRequests";
import CompletedRequests from "../../Components/CompletedRequests";
import AccountSettings from "../../Components/AccountSettings";

const BeneficiaryDashboard = () => {
    useEffect(() => {
        const dashboardNav = document.getElementById("dashboard-nav");
        const navLists = dashboardNav.querySelectorAll("li");

        navLists.forEach(navItem => {
            navItem.addEventListener("click", () => {
                navLists.forEach(item =>{
                    if (item.classList.contains("active")){
                        item.classList.remove("active")
                    }
                })
                navItem.classList.add("active");
            })
        });
    });

    useEffect(() => {
        const ongoingRequestsBtn = document.getElementById("ongoing-requests-btn");
        const completedRequestsBtn = document.getElementById("completed-requests-btn");
        const accountSettingsBtn = document.getElementById("account-settings-btn");
        const helpBtn = document.getElementById("help-btn");
        const ongoingRequests = document.getElementById("ongoing-requests");
        const completedRequests = document.getElementById("completed-requests");
        const accountSettings = document.getElementById("account-settings");
        const help = document.getElementById("help");

        ongoingRequestsBtn.addEventListener("click", () => {
            ongoingRequests.style.display = "block";
            completedRequests.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "none";
        })

        completedRequestsBtn.addEventListener("click", () => {
            completedRequests.style.display = "block";
            ongoingRequests.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "none";
        })
        accountSettingsBtn.addEventListener("click", () => {
            accountSettings.style.display = "block";
            ongoingRequests.style.display = "none";
            completedRequests.style.display = "none";
            help.style.display = "none";
        })
        helpBtn.addEventListener("click", () => {
            ongoingRequests.style.display = "none";
            completedRequests.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "block";
        })
    });

    const dayHour = new Date().getHours();
    const timeOfDay =  dayHour < 12 ? 'morning' :
                    12 < dayHour  && dayHour < 16 ? 'afternoon' : 'evening';
    const name = 'Isaac';

    return (
    <div className="container">
        <div className="logo-nav">
            <a href="/"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
        </div>

            <div className="container row">
                <div className="dashboard">
                    <div className="container greeting d-flex flex-column">
                        <h2><strong>Good {timeOfDay}, {name}.</strong></h2>
                        <p>No matter how things seem right now, there's hope for you and yours!</p>
                        <p><strong>What are your needs? Let us know!</strong></p>
                        <a className="btn" href="/request-form">Create a Request</a>
                </div>
            </div>
        </div>

        <div className="dashboard-nav row">
            <ul className="row w-100 d-flex flex-nowrap" id="dashboard-nav">
                <li className="col-7 col-sm-5 col-md-4 col-lg-3 active" id="ongoing-requests-btn"><span><img src="images/icons/Frame.svg" alt="donations icon" />Ongoing Requests</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3" id="completed-requests-btn"><span><img src="images/icons/Frame-1.svg" alt="check icon" />Completed Requests</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3" id="account-settings-btn"><span><img src="images/icons/Frame-2.svg" alt="settings icon" />Account Settings</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3 ml-auto d-flex justify-content-end" id="help-btn"><span>Help <img src="images/icons/Frame-3.svg" alt="help icon" /></span></li>
            </ul>
        </div>

        <OngoingRequests />
        <CompletedRequests />
        <AccountSettings />

        <div className="dashboard-items row" id="help">
            <div className="col-12 col-md-4">
                <p>Having any issues? Send an email to <a href="mailto:oneshare.support@gmail.com">oneshare.support@gmail.com</a></p>
            </div>
        </div>
      </div>
    )
}
export default BeneficiaryDashboard;