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
import Error from "./Error";

const App = () => {
  const [ details, setDetails ] = useState(null);
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
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: 'ease-in', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  })
    return (
      <main>
          <Switch>
              <Route path="/" render={renderprops =>
                <Home {...renderprops} />} exact />
              <Route path="/register" render={renderprops =>
                <Register {...renderprops} />} />
              <Route path="/register-donor" render={renderprops =>
                <RegisterDonor {...renderprops} />} />
              <Route path="/register-beneficiary" render={renderprops =>
                <RegisterBeneficiary {...renderprops} />} />
              <Route path="/continue-beneficiary-registration" render={renderprops =>
                <ContinueBeneficiaryReg setDetails={setDetails} {...renderprops} />} />
              <Route path="/continue-donor-registration" render={renderprops =>
                <ContinueDonorReg setDetails={setDetails} {...renderprops} />} />
              <Route path="/finish-registration" render={renderprops =>
                <FinishReg details={details} {...renderprops} />} />
              <Route path="/login" render={renderprops =>
                <Login {...renderprops} />} />
              <Route path="/password-recovery" render={renderprops =>
                <PasswordRecovery {...renderprops} />} />
              <Route path="/donor-dashboard" render={renderprops =>
                <DonorDashboard {...renderprops} />} />
              <Route path="/beneficiary-dashboard" render={renderprops =>
                <BeneficiaryDashboard {...renderprops} />} />
              <Route path="/donation-item-details" render={renderprops =>
                <DonationItemDetails {...renderprops} />} />
              <Route path="/choose-beneficiary" render={renderprops =>
                <ChooseBeneficiary {...renderprops} />} />
              <Route path="/donor-form" render={renderprops =>
                <DonorForm {...renderprops} />} />
              <Route path="/request-form" render={renderprops =>
                <RequestForm {...renderprops} />} />
              <Route render={renderprops =>
                <Error {...renderprops} />} />
          </Switch>
      </main>
    )
  };
  export default App;