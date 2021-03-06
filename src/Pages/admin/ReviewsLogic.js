import React,{ useState, useEffect } from 'react';
import AdminNav from "../../Components/Admin-nav";
import { Redirect } from 'react-router';

import Reviews from "./Reviews";

const ReviewsLogic = (props) => {


    const [ redirect, setRedirect ] = useState(null);
    const [ accountTypes, setAccountTypes ] = useState(["donors", "beneficiaries"]);
    const [ accountSubtypes, setAccountSubtypes ] = useState(["all", "individual", "organization", "family"]);
    const [ sortOptions, setSortOptions ] = useState(["name", "userstate", "donations", "datecreated"]);
    const [ sortDetails, setSortDetails ] = useState({accountType: "donors", accountSubtype: "all", sortBy: "name"});
    const [ displayUsers, setDisplayUsers ] = useState({users: [], num:1, bool:true});

    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storageToken = localStorage.getItem("token");
    const token = props.authData.token || storageToken;
    const storageUserList = localStorage.getItem("userList");
    const userList = props.authData.userList || JSON.parse(storageUserList);

    useEffect(() => {
        if (!user){
            props.setAuthData.setMessage("You have to login first!");
            return setRedirect("/admin-login");
        }
    }, [user, props]);


    useEffect(() => {
        const newSortDetails = {
            accountType: accountTypes[0],
            accountSubtype: accountSubtypes[0],
            sortBy: sortOptions[0],
        }

        if (JSON.stringify(sortDetails) === JSON.stringify(newSortDetails)) return;
        return setSortDetails(newSortDetails);

    }, [accountTypes, accountSubtypes, sortOptions, sortDetails]);


    const bearer = "Bearer " + token;
            const Params = {
                headers: {
                    "authorization": bearer,
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/JSON",
                },
                method: "GET"
        }

        async function updateUsers() {
            const res = await fetch("https://oneshare-backend.herokuapp.com/api/admin/overview-all", Params);
            const data = await res.json();
            if (data.users){
                if (data.users.length === userList.length){
                    return;
                }
                   else return props.setAuthData.updateUserList(data.users);
            }
            else return;
        }
        updateUsers(Params).catch(err => {
            console.log(err);
            props.setAuthData.setMessage("You have to login first!");
            return props.setAuthData.updateUser(null);
        })


        const handleAccountTypeClick = (e) => {
            const text = e.target.innerText.toLowerCase();
            if (text === accountTypes[0]) return false;
            let temp = accountTypes[0];
            return setAccountTypes([text, temp]);
        }

        const handleAccountSubtypeClick = (e) => {
            const clone = accountSubtypes.slice();
            let text = e.target.innerText.toLowerCase();
            if (text === clone[0]) return false;
            let index = clone.indexOf(text);
            clone[index] = clone[0];
            clone[0] = text;
            return setAccountSubtypes(clone);
        }

        const handleSortByClick = (e) => {
            const clone = sortOptions.slice();
            let text = e.target.innerText.toLowerCase();
            if (text === clone[0]) return false;
            let index = clone.indexOf(text);
            clone[index] = clone[0];
            clone[0] = text;
            return setSortOptions(clone);
        }

        const handleLogout = () => {
            props.setAuthData.updateUser(null);
            props.setAuthData.updateToken(null);
            return <Redirect to="/"/>
        };
        if (accountTypes[0] === "beneficiaries"){
            const index = sortOptions.indexOf("donations");
            sortOptions[index] = "requests";
        }
        else {
            const index = sortOptions.indexOf("requests");
            sortOptions[index] = "donations";
        }

    const beneficiaries = [];
    const donors = [];
    const individualDonors = [];
    const organizationDonors = [];
    const individualBeneficiaries = [];
    const familyBeneficiaries = [];
    const organizationBeneficiaries = [];

    userList.forEach(user => {
        if (user.accountType === "donor"){
            donors.push(user);
            if (user.accountSubtype === "individual"){
                individualDonors.push(user);
            }
            else organizationDonors.push(user);
        }
        else if (user.accountType === "beneficiary"){
            beneficiaries.push(user);
            if (user.accountSubtype === "individual"){
                individualBeneficiaries.push(user);
            }
            else if (user.accountSubtype === "family"){
                familyBeneficiaries.push(user);
            }
            else organizationBeneficiaries.push(user);
        }
    });


function sortArr(arr, property){
    if (property === "userstate") property = "userState";
    if (property === "datecreated") property = "dateCreated";
    if (arr.length <= 1) return arr;
    else {
        let leftArr = [];
        let rightArr = [];
        let newArr = [];

        let pivot = arr.pop();

        for (let i = 0; i < arr.length; i++){

            if (arr[i][property] < pivot[property]) leftArr.push(arr[i]);
            else rightArr.push(arr[i]);
        }
        return newArr.concat(sortArr(leftArr, property), pivot, sortArr(rightArr, property));
    }
}

    let users = [];

    let {accountType, accountSubtype, sortBy} = sortDetails;

    if (accountType === "donors"){
        if (accountSubtype === "all"){
         users = sortArr(donors.slice(), sortBy)
        }
        else if (accountSubtype === "individual"){
         users = sortArr(individualDonors.slice(), sortBy);
        }
        else if (accountSubtype === "organization"){
            users = sortArr(organizationDonors.slice(), sortBy);
        }
    }
    else {
        if (accountSubtype === "all"){
         users = sortArr(beneficiaries.slice(), sortBy);
        }
        else if (accountSubtype === "individual"){
         users = sortArr(individualBeneficiaries.slice(), sortBy);
        }
        else if (accountSubtype === "family"){
         users = sortArr(familyBeneficiaries.slice(), sortBy)
        }
        else users = sortArr(organizationBeneficiaries.slice(), sortBy);
    }
    if (sortBy === "donations" || sortBy === "requests"){
        users = users.reverse();
    }

    if (redirect !== null){
        return <Redirect to={redirect}/>
    }
    else return (
        <div className="container admin">
            <div className="register-nav">
                <a href="/" className="login-home-link"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
                <button id="logout-btn" onClick={handleLogout}><img src="images/logout-icon.svg" alt="logout logo" className="mr-2"/>Logout of Oneshare </button>
            </div>
            <div className="d-flex justify-content-around">
                <AdminNav page="reviews"/>

                <div className="reviews">
                <Reviews users={users} displayUsers={displayUsers} setDisplayUsers={setDisplayUsers} search={"search"}/>

                    <div className="sort-users d-flex justify-content-between">

                        <div className="dropdown">
                            <span>Showing</span>
                            <button className="btn dropdown-toggle" onClick={handleAccountTypeClick} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {accountTypes[0]}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <button className="dropdown-item" onClick={handleAccountTypeClick}>{accountTypes[1]}</button>
                            </div>
                        </div>

                        <div className="dropdown">
                            <span>Account type</span>
                            <button className="btn dropdown-toggle" type="button" id="accountDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {accountSubtypes[0]}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="accountDropdownMenuButton">
                              <button onClick={handleAccountSubtypeClick} className="dropdown-item"> {accountSubtypes[1]}</button>
                              <button onClick={handleAccountSubtypeClick} className="dropdown-item">{accountSubtypes[2]}</button>
                              <button  onClick={handleAccountSubtypeClick} className="dropdown-item"> {accountSubtypes[3]}</button>
                            </div>
                        </div>

                        <div className="dropdown">
                            Sort by:
                        <button onClick={handleSortByClick} className="btn dropdown-toggle" type="button" id="sortDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {sortOptions[0]}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="sortDropdownMenuButton">
                          <button onClick={handleSortByClick} className="dropdown-item">{sortOptions[1]}</button>
                          <button onClick={handleSortByClick} className="dropdown-item">{sortOptions[2]}</button>
                          <button onClick={handleSortByClick} className="dropdown-item">{sortOptions[3]}</button>
                        </div>
                        </div>
                    </div>

                <Reviews users={users} displayUsers={displayUsers} setDisplayUsers={setDisplayUsers} reviews={"reviews"}/>

                </div>
            </div>
        </div>
    )
}
export default ReviewsLogic;