import React, { useEffect, useState } from 'react';

const DonorForm = () => {
    const [ dropImg, setDropImg ] = useState(null);

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
        dnd.classList.remove("active");
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.files.length === 1) {
            setDropImg(e.dataTransfer.files[0]);
            fileInput.style.display = "none";
            fileInput.innerHTML = e.dataTransfer.files[0].name;
          }
      }

    useEffect(() => {
        const form = document.getElementById("donation-form");
        const fileError = document.getElementById("file-error");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const donationType = formData.get("donation-type");
            const donationDetails = formData.get("donation-details");

            const picture = dropImg === null ? formData.get("myfile") : dropImg;
            let fileExt;
            if (picture){
                fileExt = picture.name.split(".")[1];
            }
            if (fileExt !== "jpg" && fileExt !== "jpeg" && fileExt !== "png"){
               return fileError.style.display = "block";
            }
            else {
                fileError.style.display = "none";
                const body = {picture, donationType, donationDetails}
                console.log(body)
                form.reset();
            }
        })
    }, [dropImg]);
    return (
        <>
        <div className="container">
            <div className="register-nav">
                <a href="/beneficiary-dashboard"><i className="fa fa-angle-left fa-2x"></i> Go back</a>
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
                <form id="donation-form" className="col-12 col-lg-10">

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
                                <div className="d-flex justify-content-center align-items-center flex-column" id="dropImgCont">
                                    <span>or</span>
                                    <input type="file" className="ml-5" id="myfile" name="myfile"/></div>
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
                                <input type="radio" id="food-items" name="donation-type" value="food-items" required/>
                                <label className="pl-2 pt-2" htmlFor="food-items">Food Items</label><br/>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="radio" id="ppe" name="donation-type" value="ppe" required/>
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
                            <textarea placeholder="Write here" minLength="20" maxLength="400" name="donation-details" required></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row request-detail">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                            <p className="text-center text-md-left"><strong>Hit submit once you're done</strong></p>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <button className="btn completed" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default DonorForm;