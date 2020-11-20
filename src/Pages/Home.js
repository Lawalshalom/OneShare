import React, { useEffect } from 'react';

const Home = (props) => {

  const appLoginData =  props.authData.user;
  const storedUser = localStorage.getItem("user");
  const user = appLoginData || JSON.parse(storedUser);
  console.log(user)

  useEffect(() => {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100){
        header.classList.add('scrolled');
      }
      else header.classList.remove('scrolled');
    })
  });
  return (
    <>
    <div className="homepage container">
      <div className="container navbar fixed-top" id="header">
        <div className="container d-flex row flex-sm-row justify-content-between">
          <div className="col-6 oneshare-logo">
            <img src="images/Logo.svg" alt="oneshare logo" />
          </div>
          <div className="col-6 d-sm-flex d-none justify-content-end login-btn">
            {!user ? <a href="/register">Register / Login</a>
            : user.accountType === "donor" ?
            <a href="/donor-dashboard" className="d-flex"><span className="mt-1 pl-1">Dashboard</span><i className="fa fa-angle-right fa-2x pl-2"></i></a>
            : <a href="/beneficiary-dashboard" className="d-flex"><span className="mt-1 pl-1">Dashboard</span><i className="fa fa-angle-right fa-2x pl-2"></i></a>
          }
          </div>
          <div className="col-6 d-flex d-sm-none justify-content-end login-btn">
          {!user ? <a href="/register">Register / Login</a>
            : user.accountType === "donor" ?
            <a href="/donor-dashboard" className="d-flex"><span className="mt-1 pl-1">Dashboard</span><i className="fa fa-angle-right fa-2x pl-2"></i></a>
            : <a href="/beneficiary-dashboard" className="d-flex"><span className="mt-1 pl-1">Dashboard</span><i className="fa fa-angle-right fa-2x pl-2"></i></a>
          }
          </div>
        </div>
      </div>

      <div className="home-intro d-flex flex-column flex-md-row row">
        <div className="col-lg-8 col-md-8 ">
          <h1><strong>Help get food and supplies to the prople who need them</strong></h1>
          <p>We are a non-profit set up to provide food and personal equipment to vulnerable persons by connecting those who have to those in need within their vicinity.</p>
          <p><strong>You can register to be a donor or an intending beneficiary</strong></p>
          {!user && <div><a className="btn" href="/register">Register on OneShare</a></div>}
        </div>
        <div className="info-div col-lg-4 col-md-4 d-flex flex-md-column flex-sm-row align-items-center justify-content-center">

          <div className="info text-center">
            <h2>250K</h2>
            <p>Registered</p>
             <p>Donors</p>
          </div>
          <div className="underline"></div>
          <div className="info text-center">
            <h2>1.5M</h2>
            <p>OneShare</p>
            <p>Beneficiaries</p>
          </div>
        </div>
      </div>

      <div className="picture-carousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"  data-aos="fade-up">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://res.cloudinary.com/lawfirm1000/image/upload/v1605899005/oneshare/1_xb2ahb.png" alt="Prefirst slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/2.png" alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/3.png" alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="images/4.png" alt="Second slide"/>
            </div>
          </div>
        </div>
      </div>

    <div className="about-oneshare d-flex row flex-column flex-md-row">
      <div className="col-lg-4 col-md-6 info">
        <p>OneShare is a non-profit set up to provide food and personal equipment to vulnerable persons by connecting those who have to those in need within their vicinity.</p>
      </div>
      <div className="col-lg-8 col-md-6 text">
        <p>Food is a basic human need and as evidenced by the surge in armed robbery rates across Nigeria during the lockdown, people can do anything in the face of hunger and perceived injustice. As restrictions are gradually being lifted, many would need a steady supply of personal protective equipment to reduce their risk of infection. However, the prices of food and personal protective equipment have skyrocketed in recent weeks.</p>
      </div>
    </div>

    <div className="stories">
      <h2><strong>OneShare Stories</strong></h2>

      <div className="row d-flex flex-sm-column flex-md-row justify-content-center">
        <div className="col-sm-12 col-md-5 col-lg-3 story">
            <p>"Donating to my community members is so easy with OneShare, I've been able to reach out to more people than I can imagine, in such little time."</p>
            <p><strong>Cameron Williamson</strong></p>
            <p>Donor on OneShare.</p>
        </div>

        <div className="col-sm-12 col-md-5 col-lg-3 story">
          <p>"Donating to my community members is so easy with OneShare, I've been able to reach out to more people than I can imagine, in such little time."</p>
          <p><strong>Cameron Williamson</strong></p>
          <p>Donor on OneShare.</p>
        </div>

        <div className="col-sm-12 col-md-5 col-lg-3 story">
          <p>"Donating to my community members is so easy with OneShare, I've been able to reach out to more people than I can imagine, in such little time."</p>
          <p><strong>Cameron Williamson</strong></p>
          <p>Donor on OneShare.</p>
        </div>

      </div>
    </div>

    <div className="mission">
    <div className="mission-background">
        <img src="images/vectors/missionbackground.svg" alt="mission background"/>
      </div>
      <h2><strong>The OneShare Mission</strong></h2>
      <div className="row d-flex flex-sm-column flex-md-row">
        <div className="col-sm-12 col-md-7 col-lg-7 mission-item">
          <img src="images/icons/mission-check.svg" alt="mission-check" /><p> To pool scarce resources from willing benefactors.</p><br/><br/>
          <img src="images/icons/mission-check.svg" alt="mission-check" /><p> To provide a platform where such resources can be publicly displayed.</p><br/><br/>
          <img src="images/icons/mission-check.svg" alt="mission-check" /><p> To connect benefactors and Beneficiaries with matching resources and needs respectively.</p><br/><br/>
          <img src="images/icons/mission-check.svg" alt="mission-check" /><p> To promote a sense of shared responsibility among Nigerian citizens.</p><br/><br/>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-5 action">
          <p><strong>Together, let's help the needy</strong></p>
          <p>Register on OneShare and start impacting your community, one person at a time.</p>
          {!user && <div><a className="btn" href="/register">Register</a></div>}
        </div>
      </div>
    </div>

    <div className="process">
      <div className="d-none d-sm-block">
        <p className="text-primary">The OneShare Process</p>
      </div>

      <div className="process-intro">
        <h2><strong>How OneShare works</strong></h2>
      </div>
      <div className="process-bg">
        <img src="images/vectors/oneshareworks.svg" alt="processes illustration" />
      </div>

        <div className="row">
          <div className="col-12 col-md-9 col-lg-8">

            <p>We are a web-based food and PPE sharing platform unique for leveraging proximity between potential beneficiaries and donors.</p>
            <div className="row flex-column flex-sm-row">
              <div className="col-sm-12 col-md-5 col-lg-5 processes">
                <img src="images/icons/cursor.svg" alt="register icon" />
                <p>Register on the OneShare website, depending on your needs, sign up as a donor or an intending beneficiary</p>
              </div>
              <div className="col-sm-12 col-md-5 col-lg-5 processes">
                <img src="images/icons/beneficiary.svg" alt="beneficiary icon" />
                <p>Intending beneficiaries record a video and put up a request, they would get notified if they get a donor</p>
              </div>
              <div className="col-sm-12 col-md-5 col-lg-5 processes">
                <img src="images/icons/post.svg" alt="donor icon" />
                <p>Donors get the contact details of their chosen beneficiary, meet with and fulfil the beneficiary's needs.</p>
              </div>
            </div>
          </div>
        </div>

    </div>

    <div className="contact">
      <div className="d-none d-sm-block">
        <p className="text-primary">Get in Touch</p>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <h2><strong>Contact us</strong></h2>
          <p>For enquiries and support, drop us a line at <a href="mailto:oneshare.support@gmail.com">oneshare.support@gmail.com</a></p>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 logo">
          <img src="images/Logo.svg" alt="oneshare logo"/>
          <p>Follow us on social media pages</p>
          <div className="socials">
            <a href="https://facebook.com/oneshare"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com/oneshare"><i className="fa fa-twitter"></i></a>
            <a href="https://linkedin.com/oneshare"><i className="fa fa-linkedin"></i></a>
            <a href="https://instagram.com/oneshare"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 action">
        <p>OneShare is a non-profit set up to provide food and personal protective equipment to vulnerable persons.</p>
        {!user && <p className="d-flex flex-column flex-md-row justify-content-center"><strong>Join OneShare now!</strong> <span><a className="btn" href="/register">Register</a></span></p>}
        </div>
      </div>
    </div>

    <div className="d-md-none d-flex flex-column justify-content-center">
      <a className="text-center" href="/terms">Terms and Conditions</a>
      <a className="text-center" href="/privacy">Privacy Policy</a>
    </div>

    <div className="footer text-center">
      <div className="container row">
        <div className="col-md-4 col-lg-4 d-none d-md-flex">
          <a href="/">OneShare.support</a>
        </div>
        <div className="col-md-4 col-lg-4 d-none d-md-flex">
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <p>&copy;2020 OneShare Team</p>
        </div>
      </div>

    </div>
    </div>
    </>
  )
}
export default Home;