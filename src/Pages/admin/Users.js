import React, { useState, useEffect } from 'react';
import AdminNav from "../../Components/Admin-nav";
import { Redirect } from 'react-router';

const Users = (props) => {
    const [ accountTypes, setAccountTypes ] = useState(["donors", "beneficiaries"]);
    const [ accountSubtypes, setAccountSubtypes ] = useState(["all", "individual", "organization", "family"]);
    const [ sortBy, setSortBy ] = useState(["name", "userstate", "donations", "datecreated"]);

    const [ selectedUsers, setSelectedUsers ] = useState([]);


    const allUsers = props.users;
    const users = props.displayUsers.users;
    const message = props.message;


    useEffect(() => {
        const sortDetails = {
            accountType: accountTypes[0],
            accountSubtype: accountSubtypes[0],
            sortBy: sortBy[0],
        }

        if (JSON.stringify(props.sortDetails) === JSON.stringify(sortDetails)) return;
        props.setSortDetails(sortDetails);
    });

    useEffect(() => {
        const bool = props.displayUsers.bool;
        if (bool){
            const num = props.displayUsers.num;
            const index = allUsers[num *5] ? num*5 : allUsers.length ;
            const startIndex = num === 1 || index <=5 ? 0 : num *5 -5;

            const newUsers = {users: allUsers.slice(startIndex, index), num, bool: true};

            if (JSON.stringify(props.displayUsers) !== JSON.stringify(newUsers)){
                props.setDisplayUsers(newUsers);
                }

            return;
        }

    }, [allUsers, props])


    useEffect(() => {
        const userDiv = document.getElementById("users");
        const showUser = document.getElementById("show-user");
        const showUserDiv = document.querySelector(".show-user");
        if (props.user && showUser) {
            userDiv.style.opacity = 0.3;
            showUser.style.opacity = 1;

            document.body.onclick = (e) => {
                if (e.path.indexOf(showUserDiv) === -1){
                    props.setUser(null);
                }
            }
        }
        else userDiv.style.opacity = 1;
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
        const clone = sortBy.slice();
        let text = e.target.innerText.toLowerCase();
        if (text === clone[0]) return false;
        let index = clone.indexOf(text);
        clone[index] = clone[0];
        clone[0] = text;
        return setSortBy(clone);
    }

    const handleLogout = () => {
        props.setAuthData.updateUser(null);
        props.setAuthData.updateToken(null);
        return <Redirect to="/"/>
    };
    if (accountTypes[0] === "beneficiaries"){
        const index = sortBy.indexOf("donations");
        sortBy[index] = "requests";
    }
    else {
        const index = sortBy.indexOf("requests");
        sortBy[index] = "donations";
    }


    const handleSelection = (e, user) => {
        if (e.target.checked){
            const removeUser = selectedUsers.find(storedUser => storedUser._id === user._id);
            if (!removeUser){
            const newSelectedUsers = [...selectedUsers, user];
            setSelectedUsers(newSelectedUsers);
            }
        }
        else{
            const removeUser = selectedUsers.find(storedUser => storedUser._id === user._id);
            if (removeUser){
                const index = selectedUsers.indexOf(removeUser);
                const clone = selectedUsers.slice();
                clone.splice(index, 1);
                setSelectedUsers(clone);
            }
        }
    }
    const handleSelectAll = (e) => {
        if (e.target.checked){
        const newSelectedUsers = [...users];
        setSelectedUsers(newSelectedUsers);
        }
        else setSelectedUsers([]);
    }

    const checkCheckbox = (id) => {
        const user = selectedUsers.find(storedUser => storedUser._id === id);
            if (user) return true;
            return false;
    }
    const checkSelectAll = () => {
        return selectedUsers.length === users.length ? true : false;
    }

    const pagination = [];
    let i = Math.floor(allUsers.length/5);
    while (i > -1){
        pagination.push(i);
        i-= 1;
    }
    if (allUsers.length % 5 > 0){
        if (pagination.length < 1){
            pagination.push(1)
        }
        else pagination.unshift(pagination[0] +1)
    }
    pagination.pop();
    pagination.reverse();

    const handlePagination = (num) => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = document.getElementsByClassName("page-item");

        for (let i = 0; i < pageLinks.length; i++){
            pageLinks[i].classList.remove("active");
        }
        pageLinks[num].classList.add("active");
        if (num > 1){
            pageLinks[0].classList.remove("disabled")
        }
        else pageLinks[0].classList.add("disabled");

        if (pageLinks[num+2]){
            pageLinks[pageLinks.length -1].classList.remove("disabled")
        }
        else pageLinks[pageLinks.length -1].classList.add("disabled");

        props.setDisplayUsers({users:allUsers.slice(num*5 -5, num*5), num, bool: true});
    }

    const handlePrev = () => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[1].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        const num = pageLinks.indexOf(elem);
        pageLinks[num].classList.remove("active");
        pageLinks[num-1].classList.add("active");

        if (num > 2){
            pageLinks[0].classList.remove("disabled")
        }
        else pageLinks[0].classList.add("disabled");

        if (pageLinks[num+1]){
            pageLinks[pageLinks.length -1].classList.remove("disabled")
        }
        else pageLinks[pageLinks.length -1].classList.add("disabled");

        props.setDisplayUsers({users: allUsers.slice((num-1) *5 -5, (num-1) *5), num: num-1, bool: true})
    }

    const handleNext = () => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[pageLinks.length-2].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        const num = pageLinks.indexOf(elem);
        pageLinks[num].classList.remove("active");
        pageLinks[num+1].classList.add("active");

        if (num+1 > 1){
            pageLinks[0].classList.remove("disabled")
        }
        else pageLinks[0].classList.add("disabled");

        if (pageLinks[num+3]){
            pageLinks[pageLinks.length -1].classList.remove("disabled")
        }
        else pageLinks[pageLinks.length -1].classList.add("disabled");

        props.setDisplayUsers({users: allUsers.slice((num+1) *5 -5, (num+1) *5), num: num+1, bool: true})
    }

    const displayTime = (time) => {
       return time.split("T")[0] + ", " + time.split("T")[1].split(".")[0];
    }

    const handleSearchUsers = (e) => {
        e.preventDefault();
        const form = document.getElementById("search-users");
        const searchName = new FormData(form).get("search-name").toLowerCase();
        const newUsers = [];
        allUsers.forEach(user => {
            if (user.name.toLowerCase().split(" ").indexOf(searchName) !== -1){
                newUsers.push(user);
            }
        });
       props.setDisplayUsers({users: newUsers, num: 1, bool: false});
    }

    const handleDeleteUser = (id, accountType) => {
        const confirm = window.confirm("Are you sure you want to delete this user permanently?");
        if (confirm){
            const storageToken = localStorage.getItem("token");
            const token = props.token || storageToken;

            const bearer = "Bearer " + token;
            const Params = {
                headers: {
                    "authorization": bearer,
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/JSON",
                },
                body: JSON.stringify({
                    id
                }),
                method: "POST"
            }
            const url = accountType === "donor" ? "http://localhost:7890/api/admin/delete-donor" : "http://localhost:7890/api/admin/delete-beneficiary";

            async function deleteUser() {
                const res = await fetch(url, Params);
                const data = await res.json();
                if (data.users){
                    props.updateUserList(data.users);
                    props.setMessage("User deleted successfully!");
                }
                else return props.setMessage("There was an error, try again!");
            }
            deleteUser(Params).catch(err => {
                console.log(err);
                return props.setMessage("There was an error, try again!");
            })
        }
        return;
    }

    return (
        <div className="container admin">
            <div className="register-nav">
                <a href="/" className="login-home-link"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
                <button id="logout-btn" onClick={handleLogout}><img src="images/logout-icon.svg" alt="logout logo" className="mr-2"/>Logout of Oneshare </button>
            </div>
            <div className="d-flex justify-content-around">
                <AdminNav page="users"/>

                <div className="users" id="users">
                    <div className="search-users">
                        <form id="search-users" onSubmit={handleSearchUsers}>
                            <input type="name" name="search-name" placeholder={`Showing ${users.length} of ${allUsers.length} OneShare users`} required/>
                            <p className="text-right"><strong><span className="d-none d-sm-inline mr-2">Search users</span>
                                <button><i className="fa fa-search" type="submit"></i></button></strong></p>
                        </form>
                    </div>
                    {
                        message &&
                        <div className="d-flex justify-content-center">
                            <div className="alert alert-dismissible fade show" role="alert" data-aos="fade-up">
                                <p className="text-danger">{message}</p>
                                <button type="button" id="closeTerms"  className="close text-danger" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    }

                {selectedUsers.length > 0 &&
                    <div className="select-users d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <input type="checkbox" checked={checkSelectAll()} onChange={handleSelectAll} name="select-all" />
                            <span className="ml-4 mr-4">Select all</span><span className="ml-4"> • {selectedUsers.length} selected</span>

                        </div>
                        <div className="d-flex flex-column more-options mr-3">
                            <span>•</span>
                            <span>•</span>
                            <span>•</span>
                        </div>
                    </div>
                }

                {selectedUsers.length < 1 &&
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
                          {sortBy[0]}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="sortDropdownMenuButton">
                          <button onClick={handleSortByClick} className="dropdown-item">{sortBy[1]}</button>
                          <button onClick={handleSortByClick} className="dropdown-item">{sortBy[2]}</button>
                          <button onClick={handleSortByClick} className="dropdown-item">{sortBy[3]}</button>
                        </div>
                        </div>

                    </div>
                }

                    <div className="display-users">
                        {
                            users.length < 1 && <p className="text-center text-faded">• No user to display for this selection.</p>
                        }
                        {
                            users && users.length > 0 && users[0].accountType === "donor" && users.map(user => {
                                return (
                                    <div key={Math.random()} className="user d-flex flex-column flex-sm-row justify-content-between align-items-md-center">
                                        <div className="d-flex ml-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input type="checkbox" checked={checkCheckbox(user._id)} onChange={(e) => handleSelection(e, user)} name="check-user"/>
                                            </div>
                                            <div>
                                                <p><strong>{user.name}</strong></p>
                                                <p className="d-flex flex-md-row">
                                                    <span>{user.email} </span> <span className="text-faded">&nbsp; • {user.userLGA} LGA, {user.userState}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around align-items-sm-center ">
                                            <div className="d-flex flex-column ml-5 ml-sm-0">
                                                <p className="text-faded mr-4 mr-sm-0 text-capitalize">• {user.accountSubtype}</p>
                                                <p className="text-faded">• {user.donations.length} donations</p>
                                            </div>
                                            <div className="d-flex flex-column d-sm-none ml-5 more-options">

                                            <div className="dropdown">
                                                <div className="dropdown-toggle d-flex flex-column align-items-center justify-content-start" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item" onClick={() => props.setUser(user)}>User details</button>
                                                  <button className="dropdown-item text-danger" id="delete-btn" onClick={() => handleDeleteUser(user._id, user.accountType)}>Delete User</button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="d-none d-sm-flex flex-column mr-3 more-options">
                                            <div className="dropdown">

                                                <div className="dropdown-toggle d-flex flex-column align-items-center justify-content-start" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="mt-2">•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item" onClick={() => props.setUser(user)}>User details</button>
                                                  <button className="dropdown-item text-danger" id="delete-btn" onClick={() => handleDeleteUser(user._id, user.accountType)}>Delete User</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        {
                            users && users.length > 0 && users[0].accountType === "beneficiary" && users.map(user => {
                                return (
                                    <div key={Math.random()} className="user d-flex flex-column flex-sm-row justify-content-between align-items-md-center">
                                        <div className="d-flex ml-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input type="checkbox" checked={checkCheckbox(user._id)} onChange={(e) => handleSelection(e, user)} name="check-user"/>
                                            </div>
                                            <div>
                                                <p><strong>{user.name}</strong></p>
                                                <p className="d-flex">
                                                    <span>{user.email} </span> <span className="text-faded">&nbsp; • {user.userLGA} LGA, {user.userState}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around align-items-sm-center ">
                                            <div className="d-flex flex-column ml-5 ml-sm-0">
                                                <p className="text-faded mr-4 mr-sm-0 text-capitalize">• {user.accountSubtype}</p>
                                                <p className="text-faded">• {user.requests.length} requests</p>
                                            </div>
                                            <div className="d-flex flex-column d-sm-none ml-5 more-options">
                                            <div className="dropdown">
                                                <div className="dropdown-toggle d-flex flex-column align-items-center justify-content-start" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item" onClick={() => props.setUser(user)}>User details</button>
                                                  <button className="dropdown-item text-danger" id="delete-btn" onClick={() => handleDeleteUser(user._id, user.accountType)}>Delete User</button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="d-none d-sm-flex flex-column mr-3 more-options">
                                            <div className="dropdown">

                                                <div className="dropdown-toggle d-flex flex-column align-items-center justify-content-start" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="mt-2">•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item" onClick={() => props.setUser(user)}>User details</button>
                                                  <button className="dropdown-item text-danger" id="delete-btn" onClick={() => handleDeleteUser(user._id, user.accountType)}>Delete User</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                                </div>

                    <nav aria-label="...">
                      <ul className="pagination mt-4">
                        <li className="page-item disabled" onClick={handlePrev}>
                          <button className="page-link"><i className="fa fa-angle-left" aria-label="hidden"></i></button>
                        </li>
                        {
                            pagination.map(num => {
                                return (
                                    <li key={pagination.indexOf(num)} onClick={() => handlePagination(num)} className={num === 1 ? "active page-item" : "page-item"}><button className="page-link">{num}</button></li>
                                )
                            })
                        }
                        <li className="page-item" onClick={handleNext}>
                          <button className="page-link"><i className="fa fa-angle-right" aria-label="hidden"></i></button>
                        </li>
                      </ul>
                    </nav>

                </div>
            </div>

            {
                props.user &&
                <div id="show-user">
                    <div className="container d-flex justify-content-center" data-aos="zoom-in">
                        <div className="show-user">
                            <div className="d-flex">
                                <p><strong>{props.user.name}</strong></p>
                                <p className="text-faded text-capitalize">&nbsp; • {props.user.accountSubtype}</p>
                            </div>
                            <div className="d-flex flex-column flex-md-row">
                                <p className="text-faded">{props.user.email}</p>
                                <p>&nbsp; • Joined {displayTime(props.user.date)}</p>
                            </div>
                            <div className="d-flex">
                                {props.user.donations && <p>{props.user.donations.length} donations</p>}
                                {props.user.requests && <p>{props.user.requests.length} requests</p>}
                                <p>&nbsp; • {props.user.userLGA} LGA, {props.user.userState} state.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Users;
