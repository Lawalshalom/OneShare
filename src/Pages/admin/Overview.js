import React, { useState, useEffect } from 'react';
import AdminNav from '../../Components/Admin-nav';
import { Redirect } from 'react-router';

const Overview = (props) => {
    const [ redirect, setRedirect ] = useState(null);
    const appLoginData =  props.authData.user;
    const storageData = localStorage.getItem("user");
    const user = appLoginData || JSON.parse(storageData);
    const storageToken = localStorage.getItem("token");
    const token = props.authData.token || storageToken;
    const storageUserList = localStorage.getItem("userList");
    const userList = props.authData.userList || JSON.parse(storageUserList);


    const handleLogout = () => {
        props.setAuthData.updateUser(null);
        props.setAuthData.updateToken(null);
        props.setAuthData.setMessage("You have been logged out!");
        return setRedirect("/admin-login");
    };

    useEffect(() => {
        if (!user){
            props.setAuthData.setMessage("You have to login first!");
            return setRedirect("/admin-login");
        }
    }, [user, props])


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
            console.log(data);
            if (data.users){
                if (JSON.stringify(data.users) === JSON.stringify(userList)){
                    return;
                }
                   else return props.setAuthData.updateUserList(data.users);
            }
            else {
                props.setAuthData.setMessage("You have to login first!");
                props.setAuthData.updateUser(null);
                return setRedirect({pathName: "/admin-login", state: {message: "You have to login again first"}});
            }
        }
        updateUsers(Params).catch(err => {
            console.log(err);
            props.setAuthData.setMessage("You have to login first!");
            return props.setAuthData.updateUser(null);
        })

    const dayHour = new Date().getHours();
    const timeOfDay =  dayHour < 12 ? "morning" :
                    11 < dayHour  && dayHour < 16 ? "afternoon" : 'evening';

    const beneficiaries = [];
    const donors = [];
    const donations = [];
    const requests = [];
    const inactiveUsers = [];
    const activeUsers = [];

    userList.forEach(user => {
        if (user.accountType === "donor"){
            donors.push(user);
            if (user.donations.length < 1){
               return inactiveUsers.push(user);
            }
            else {
                activeUsers.push(user);
                return user.donations.forEach(donation => {
                    return donations.push(donation)
                });
            }
        }
        else if (user.accountType === "beneficiary"){
            beneficiaries.push(user);
            if (user.requests.length < 1){
               return inactiveUsers.push(user)
            }
            else {
                activeUsers.push(user);
                return user.requests.forEach(request => {
                    return requests.push(request);
                })
            }
        }
    })

    if (redirect !== null){
        return <Redirect to={redirect}/>
    }
    else return (
        <>
        <div className="container admin">
            <div className="register-nav">
                <a href="/" className="login-home-link"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
                <button id="logout-btn" onClick={handleLogout}><img src="images/logout-icon.svg" alt="logout logo" className="mr-2"/>Logout of Oneshare </button>
            </div>
            <div className="d-flex justify-content-around">
                <AdminNav page="overview"/>

                <div className="overview">
                    <div className="greeting">
                        <h2><strong>Good {timeOfDay}, {user ? user.name.split(" ")[0] : ""}.</strong></h2>
                        <p>Welcome to the OneShare admin dashboard.</p>
                    </div>
                    <div className="stats row">
                            <button className="btn active"><span>{userList.length}</span><br/> Total Users</button>
                            <button className="btn"><span>{donations.length}</span><br/> Total Donations</button>
                            <button className="btn"><span>{requests.length}</span><br/> Total Requests</button>
                    </div>
                    <div className="summary d-flex flex-column flex-md-row">
                        <div className="d-flex">
                            <p><span>{beneficiaries.length}</span> beneficiaries</p>
                            <p><span>{donors.length}</span> donors</p>
                        </div>
                        <div className="d-flex">
                            <p><span>{activeUsers.length}</span> active users</p>
                            <p><span>{inactiveUsers.length}</span> inactive users</p>
                        </div>
                    </div>

                </div>
                </div>
            </div>

        </>
    )
};
export default Overview;
