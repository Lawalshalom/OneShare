import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AOS from 'aos';

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RegisterDonor from './Pages/donor/RegisterDonor';
import RegisterBeneficiary from './Pages/beneficiary/RegisterBeneficiary';
import ContinueDonorReg from './Pages/donor/Continue-donor-reg';
import ContinueBeneficiaryReg from './Pages/beneficiary/Continue-beneficiary-reg';
import FinishReg from './Pages/FinishReg';
import PasswordRecovery from './Pages/PasswordRecovery';
import DonorDashboard from "./Pages/donor/DonorDashboard";
import BeneficiaryDashboard from "./Pages/beneficiary/BeneficiaryDashboard";
import DonationItemDetails from "./Pages/donor/DonationItemDetails";
import ChooseBeneficiary from "./Pages/donor/ChooseBeneficiary";
import DonorForm from "./Pages/donor/Donor-form";
import RequestForm from "./Pages/beneficiary/RequestForm";
import AdminRegister from "./Pages/admin/AdminRegister";
import AdminLogin from "./Pages/admin/AdminLogin";
import Overview from "./Pages/admin/Overview";
import Approvals from "./Pages/admin/Approvals";
import UsersLogic from "./Pages/admin/UsersLogic";
import ReviewsLogic from "./Pages/admin/ReviewsLogic";
import Error from "./Error";

const App = () => {
  const [ details, setDetails ] = useState(null);
  const [ token, setToken ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ message, setMessage ] = useState(null);
  const [ userList, setUserList ] = useState(null);

  const updateToken = (data) => {
    setToken(data);
    localStorage.setItem("token", data);
  }

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  const updateUserList = (users) => {
    setUserList(users);
    localStorage.setItem("userList", JSON.stringify(users));
  }

  const setAuthData = {
    updateToken,
    updateUser,
    setMessage,
    updateUserList
  }

  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 20, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease-in', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  })
    return (
      <main>
          <Switch>
              <Route path="/" render={renderprops =>
                <Home authData={{user, token}} {...renderprops} />} exact />
              <Route path="/register" render={renderprops =>
                <Register authData={{user}} {...renderprops} />} />
              <Route path="/register-donor" render={renderprops =>
                <RegisterDonor {...renderprops} />} />
              <Route path="/register-beneficiary" render={renderprops =>
                <RegisterBeneficiary {...renderprops} />} />
              <Route path="/continue-beneficiary-registration" render={renderprops =>
                <ContinueBeneficiaryReg setDetails={setDetails} details={details} {...renderprops} />} />
              <Route path="/continue-donor-registration" render={renderprops =>
                <ContinueDonorReg setDetails={setDetails} details={details} {...renderprops} />} />
              <Route path="/finish-registration" render={renderprops =>
                <FinishReg details={details} {...renderprops} />} />
              <Route path="/login" render={renderprops =>
                <Login setAuthData={setAuthData} authData={{user, token, message}} {...renderprops} />} />
              <Route path="/password-recovery" render={renderprops =>
                <PasswordRecovery {...renderprops} />} />
              <Route path="/donor-dashboard" render={renderprops =>
                <DonorDashboard authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/beneficiary-dashboard" render={renderprops =>
                <BeneficiaryDashboard authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/donation-item-details" render={renderprops =>
                <DonationItemDetails authData={{user}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/choose-beneficiary" render={renderprops =>
                <ChooseBeneficiary authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/donor-form" render={renderprops =>
                <DonorForm authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/request-form" render={renderprops =>
                <RequestForm authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-register" render={renderprops =>
                <AdminRegister authData={{user, token}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-login" render={renderprops =>
                <AdminLogin authData={{user, token, message}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-overview" render={renderprops =>
                <Overview authData={{user, token, userList}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-users" render={renderprops =>
                <UsersLogic authData={{user, token, userList, message}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-approvals" render={renderprops =>
                <Approvals authData={{user, token, userList, message}} setAuthData={setAuthData} {...renderprops} />} />
              <Route path="/admin-reviews" render={renderprops =>
                <ReviewsLogic authData={{user, token, userList}} setAuthData={setAuthData} {...renderprops} />} />
              <Route render={renderprops =>
                <Error {...renderprops} />} />
          </Switch>
      </main>
    )
  };
  export default App;