import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const DonorForm = (props) => {
    const [ dropImg, setDropImg ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);

    const user =  props.authData.user || JSON.parse(localStorage.getItem("user"));
    const storedToken = props.authData.token || localStorage.getItem("token");


    useEffect(() => {
        if (!user){
            props.setAuthData.setMessage("You have to login first!");
            return setRedirect("/login")
         }
         if (user.accountType !== "donor"){
            props.setAuthData.setMessage("You have to login first!");
             return setRedirect("/login");
          }

          document.getElementById("donation-form").enctype = "multipart/form-data";
    }, [user, props])

   const handleDrag = (e) => {
       e.preventDefault();
       e.stopPropagation();
        const dnd = document.getElementById("dnd");
        dnd.classList.add("active");
      }

    const handleDragIn = (e) => {
        const dnd = document.getElementById("dnd");
        e.preventDefault();
        e.stopPropagation();
            dnd.classList.add("active");
      }

    const handleDragOut = (e) => {
        const dnd = document.getElementById("dnd");
        e.preventDefault();
        e.stopPropagation();
        dnd.classList.remove("active");
      }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dnd = document.getElementById("dnd");
        const fileInput = document.getElementById("dropImgCont");
        const fileName = document.getElementById("file-name");
        dnd.classList.remove("active");
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.files.length === 1) {
            setDropImg(e.dataTransfer.files[0]);
            fileInput.style.display = "none";
            fileName.style.display = "block";
            fileName.innerHTML = e.dataTransfer.files[0].name;
          }
      }

        const formSubmission = (e) => {
            const form = document.getElementById("donation-form");
            form.enctype = "multipart/form-data";
            const successDiv = document.getElementById("success-div");
            const failureDiv = document.getElementById("failure-div");
            const loadingDiv = document.getElementById("loading-div");
            const submitBtn = document.getElementById("submit-btn");
            const fileError = document.getElementById("file-error");
            const fileInput = document.getElementById("dropImgCont");
            const fileName = document.getElementById("file-name");
            successDiv.style.display = "none";
            failureDiv.style.display = "none";
            loadingDiv.style.display = "block";
            submitBtn.style.display = "none";

            e.preventDefault();
            const formData = new FormData(form);
            const donationType = formData.get("donation-type");
            const donationDetails = formData.get("donation-details");

            const picture = dropImg ?dropImg : formData.get("myfile");
            let fileExt;
            if (!picture.name){
                failureDiv.innerHTML = "Please upload a picture!";
                failureDiv.style.display = "block";
                successDiv.style.display = "none";
                loadingDiv.style.display = "none";
                submitBtn.style.display = "block";
                return;
            }
            else if (picture.size > (1000*1024)) {
                failureDiv.innerHTML = 'Sorry, the max allowed size for images is 1MB';
                failureDiv.style.display = "block";
                successDiv.style.display = "none";
                loadingDiv.style.display = "none";
                submitBtn.style.display = "block";
                return;
              }
            else {
                fileExt = picture.name.split(".")[1].toLowerCase();

            if (fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png"){
                fileError.style.display = "none";
            const accessToken = "Bearer " + storedToken;
            const myFormData = new FormData();
            myFormData.append("myfile", picture);
            myFormData.append("donationType", donationType);
            myFormData.append("donationDetails", donationDetails);
            const Params = {
				headers: {
                    "Authorization": accessToken
                },
                body: myFormData,
                method: "POST",
            };

            async function submitDonation(params){
                const res = await fetch("https://oneshare-backend.herokuapp.com/api/donor/create-donation", params);
                const data = await res.json();
                if (data.success){
                   props.setAuthData.updateUser(data.user);
                   successDiv.innerHTML = data.success;
                   successDiv.style.display = "block";
                   failureDiv.style.display = "none";
                   submitBtn.style.display = "block";
                   fileName.style.display = "none";
                   fileInput.style.display = "flex";
                   form.reset();
                }
                if (data.error){
                   failureDiv.innerHTML = data.error;
                   failureDiv.style.display = "block";
                   successDiv.style.display = "none";
                   submitBtn.style.display = "block";
                }
                loadingDiv.style.display = "none";
               }
               submitDonation(Params).catch(err => {
                   successDiv.style.display = "none";
                   failureDiv.innerText = err;
                   failureDiv.style.display = "block";
                   loadingDiv.style.display = "none";
                   submitBtn.style.display = "block";
               })

           }
            else {
                return fileError.style.display = "block";
            }
        }
        };

        if (redirect !== null){
            return <Redirect to={redirect}/>
        }
        else return (
        <>
        <div className="container">
            <div className="register-nav">
                <a href="/donor-dashboard"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
            </div>

            <div className="container row">
                <div className="dashboard mt-3 pt-5">
                    <div className="container greeting d-flex flex-column">
                        <h2 className="pt-5"><strong>Donation Form</strong></h2>
                        <p className="pt-2">Please fill this form to tell us more about your intended donation</p>
                    </div>
                </div>
            </div>

            <div className="request-form dashboard-nav row">
                <form id="donation-form" onSubmit={formSubmission} encType="multipart/form-data" className="col-12 col-lg-10">

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6">
                            <p><strong>It all starts with a picture</strong></p>
                            <p>We'd need you to upload a clear picture of the items you want to donate, an 800x600px image is recommended.</p>
                        </div>
                        <div className="ml-md-5">
                            <div className="dnd d-flex justify-content-center flex-column" id="dnd"
                                onDragEnter={handleDragIn} onDragLeave={handleDragOut} onDrop={handleDrop} onDragOver={handleDrag}>
                                <img src="images/upload.svg" alt="upload icon" />
                                <p className="text-center mt-3"><strong>Drag and drop an image</strong></p>
                                <p id="file-name" className="text-primary text-center"></p>
                                <div id="dropImgCont">
                                    <span>or</span>
                                    <input type="file" className="ml-5" id="myfile" accept="image/*" name="myfile"/></div>
                                <p className="faded text-center mt-3">An 800x600px image is recommended</p>
                                <p className="text-danger text-center" id="file-error">File must be in jpg, jpeg or png formats only</p>
                            </div>

                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6">
                            <p><strong>What do you wish to give?</strong></p>
                            <p>Please pick the option that best suits your donation type.</p>
                        </div>
                        <div className="ml-md-5">
                            <div className="d-flex align-items-center">
                                <input type="radio" id="food-items" name="donation-type" value="Food Items" required/>
                                <label className="pl-2 pt-2" htmlFor="food-items">Food Items</label><br/>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="radio" id="ppe" name="donation-type" value="Protective Equipments" required/>
                                <label className="pl-2 pt-2" htmlFor="ppe">PPE Equipment</label><br/>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6">
                            <p><strong>Additional comments or info?</strong></p>
                            <p>We want to know more about this donation, in about 50 words (there's a 400 character limit).</p>
                        </div>
                        <div className="d-flex justify-content-center ml-md-5">
                            <textarea placeholder="Write here" minLength="50" maxLength="400" pattern="[w+]{50,}"  name="donation-details" required></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                            <p className="text-center text-md-left"><strong>Hit submit once you're done</strong></p>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <div id="loading-div"></div>
                            <div id="success-div" className="text-success"></div>
                            <div id="failure-div" className="text-danger mb-3"></div>
                            <button className="btn completed" id="submit-btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default DonorForm;