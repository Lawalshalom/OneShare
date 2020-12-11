import React, { useState, useEffect } from 'react';
import Users from "./Users";
import { Redirect } from 'react-router';

const UsersLogic = (props) => {

    const [ showUser, setShowUser ] = useState(null);
    const [ redirect, setRedirect ] = useState(null);
    const [ sortDetails, setSortDetails ] = useState({accountType: "donors", accountSubtype: "all", sortBy: "name"});
    const [ displayUsers, setDisplayUsers ] = useState({users: [], num:1, bool:true});

    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storageToken = localStorage.getItem("token");
    const token = props.authData.token || storageToken;
    const storageUserList = localStorage.getItem("userList");
    const userList = props.authData.userList || JSON.parse(storageUserList);
    const message = props.authData.message;

    useEffect(() => {
        if (!user){
            props.setAuthData.setMessage("You have to login first!");
            return setRedirect("/admin-login");
        }
    }, [user, props]);


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
        })

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
        <Users users={users}
            user={showUser} setUser={setShowUser} displayUsers={displayUsers}
            setDisplayUsers={setDisplayUsers} sortDetails={sortDetails}
            setSortDetails={setSortDetails} message={message} setMessage={props.setAuthData.setMessage}
            updateUserList={props.setAuthData.updateUserList} token={token}/>
    )
}

export default UsersLogic;