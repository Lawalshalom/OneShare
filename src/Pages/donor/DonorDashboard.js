import React, { useEffect } from "react";
import OngoingDonations from "../../Components/OngoingDonations";
import CompletedDonations from "../../Components/CompletedDonations";
import AccountSettings from "../../Components/AccountSettings";

const DonorDashboard = () => {

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
        const ongoingDonationsBtn = document.getElementById("ongoing-donations-btn");
        const completedDonationsBtn = document.getElementById("completed-donations-btn");
        const accountSettingsBtn = document.getElementById("account-settings-btn");
        const helpBtn = document.getElementById("help-btn");
        const ongoingDonations = document.getElementById("ongoing-donations");
        const completedDonations = document.getElementById("completed-donations");
        const accountSettings = document.getElementById("account-settings");
        const help = document.getElementById("help");

        ongoingDonationsBtn.addEventListener("click", () => {
            ongoingDonations.style.display = "block";
            completedDonations.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "none";
        })

        completedDonationsBtn.addEventListener("click", () => {
            completedDonations.style.display = "block";
            ongoingDonations.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "none";
        })
        accountSettingsBtn.addEventListener("click", () => {
            accountSettings.style.display = "block";
            ongoingDonations.style.display = "none";
            completedDonations.style.display = "none";
            help.style.display = "none";
        })
        helpBtn.addEventListener("click", () => {
            ongoingDonations.style.display = "none";
            completedDonations.style.display = "none";
            accountSettings.style.display = "none";
            help.style.display = "block";
        })
    });

    const dayHour = new Date().getHours();
    const timeOfDay =  dayHour < 12 ? "morning" :
                    12 < dayHour  && dayHour < 16 ? "afternoon" : 'evening';
    const name = "Isaac";

    return (
    <div className="container">
        <div className="logo-nav">
            <a href="/"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
        </div>

        <div className="container row">
            <div className="dashboard">
                <div className="container greeting d-flex flex-column">
                    <h2><strong>Good {timeOfDay}, {name}.</strong></h2>
                    <p>It's a good time to donate towards a better and healthier community.</p>
                    <p><strong>Have any items to donate?</strong></p>
                    <a className="btn" href="/donor-form">Donate now</a>
                </div>
            </div>
        </div>

        <div className="dashboard-nav row">
            <ul className="row w-100 d-flex flex-nowrap" id="dashboard-nav">
                <li className="col-7 col-sm-5 col-md-4 col-lg-3 active" id="ongoing-donations-btn"><span><img src="images/icons/Frame.svg" alt="donations icon" />Ongoing Donations</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3" id="completed-donations-btn"><span><img src="images/icons/Frame-1.svg" alt="check icon" />Completed Donations</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3" id="account-settings-btn"><span><img src="images/icons/Frame-2.svg" alt="settings icon" />Account Settings</span></li>
                <li className="col-7 col-sm-5 col-md-4 col-lg-3 ml-auto d-flex justify-content-md-end" id="help-btn"><span>Help <img src="images/icons/Frame-3.svg" alt="help icon" /></span></li>
            </ul>

        </div>

        <OngoingDonations />
        <CompletedDonations/>
        <AccountSettings />

        <div className="dashboard-items row" id="help">
            <div className="col-12 col-md-4">
                <p>Having any issues? Send an email to <a href="mailto:oneshare.support@gmail.com">oneshare.support@gmail.com</a></p>
            </div>
        </div>
      </div>
    )
}
export default DonorDashboard;