import React, { useState, useEffect } from 'react';
import AdminNav from "../../Components/Admin-nav";
import { Redirect } from 'react-router';

const Users = (props) => {
    const users = props.users;
    const [ accountTypes, setAccountTypes ] = useState(["donors", "beneficiaries"]);
    const [ accountSubtypes, setAccountSubtypes ] = useState(["all", "individual", "organization", "family"]);
    const [ sortBy, setSortBy ] = useState(["name", "userstate", "donations", "datecreated"]);

    const [ selectedUsers, setSelectedUsers ] = useState([]);

    useEffect(() => {
        const sortDetails = {
            accountType: accountTypes[0],
            accountSubtype: accountSubtypes[0],
            sortBy: sortBy[0],
        }

        if (JSON.stringify(props.sortDetails) === JSON.stringify(sortDetails)) return;
        props.setSortDetails(sortDetails);

    }, [accountTypes, accountSubtypes, sortBy, props]);

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

    return (
        <div className="container admin">
            <div className="register-nav">
                <a href="/" className="login-home-link"><img src="images/logo-stretch.png" alt="oneshare logo" /></a>
                <button id="logout-btn" onClick={handleLogout}><img src="images/logout-icon.svg" alt="logout logo" className="mr-2"/>Logout of Oneshare </button>
            </div>
            <div className="d-flex justify-content-around">
                <AdminNav page="users"/>



                <div className="users">
                    <div className="search-users">
                        <form id="search-users">
                            <input type="name" name="search-name" placeholder={`Showing 10 of ${users.length} OneShare users`} required/>
                            <p className="text-right"><strong><span className="d-none d-sm-inline mr-2">Search users</span>
                                <button><i className="fa fa-search" type="submit"></i></button></strong></p>
                        </form>
                    </div>

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
                            users && users.length > 0 && users[0].accountType === "donor" && users.map(user => {
                                return (
                                    <div key={user._id} className="user d-flex flex-column flex-sm-row justify-content-between align-items-md-center">
                                        <div className="d-flex ml-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input type="checkbox" checked={checkCheckbox(user._id)} onChange={(e) => handleSelection(e, user)} name="check-user"/>
                                            </div>
                                            <div>
                                                <p><strong>{user.name}</strong></p>
                                                <p className="d-flex flex-column flex-md-row">
                                                    <span>{user.email} </span> <span className="text-faded">&nbsp; • {user.userLGA} LGA, {user.userState}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around align-items-sm-center ">
                                            <div className="d-flex flex-sm-column ml-5 ml-sm-0">
                                                <p className="text-faded mr-4 mr-sm-0 text-capitalize">• {user.accountSubtype}</p>
                                                <p className="text-faded ml-4 ml-sm-0">• {user.donations.length} donations</p>
                                            </div>
                                            <div className="d-flex flex-column d-sm-none ml-5 more-options">

                                            <div className="dropdown">
                                                <span>•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                <button className="btn dropdown-toggle" type="button" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                  {accountTypes[0]}
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item">{accountTypes[1]}</button>
                                                </div>
                                            </div>

                                        </div>
                                        </div>
                                        <div className="d-none d-sm-flex flex-column mr-3 more-options">
                                            <div className="dropdown">

                                                <button className="btn dropdown-toggle" type="button" id={user._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>•</span>
                                                <span>•</span>
                                                <span>•</span>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby={user._id}>
                                                  <button className="dropdown-item">User details</button>
                                                  <button className="dropdown-item text-danger">Delete User</button>
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
                                    <div key={user._id} className="user d-flex flex-column flex-sm-row justify-content-between align-items-md-center">
                                        <div className="d-flex ml-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input type="checkbox" checked={checkCheckbox(user._id)} onChange={(e) => handleSelection(e, user)} name="check-user"/>
                                            </div>
                                            <div>
                                                <p><strong>{user.name}</strong></p>
                                                <p className="d-flex flex-column flex-md-row">
                                                    <span>{user.email} </span> <span className="text-faded">&nbsp; • {user.userLGA} LGA, {user.userState}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around align-items-sm-center ">
                                            <div className="d-flex flex-sm-column ml-5 ml-sm-0">
                                                <p className="text-faded mr-4 mr-sm-0 text-capitalize">• {user.accountSubtype}</p>
                                                <p className="text-faded ml-4 ml-sm-0">• {user.requests.length} requests</p>
                                            </div>
                                            <div className="d-flex flex-column d-sm-none ml-5 more-options">
                                            <span>•</span>
                                            <span>•</span>
                                            <span>•</span>
                                        </div>
                                        </div>
                                        <div className="d-none d-sm-flex flex-column mr-3 more-options">
                                            <span>•</span>
                                            <span>•</span>
                                            <span>•</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                                </div>

                    <nav aria-label="...">
                      <ul className="pagination mt-4">
                        <li className="page-item disabled">
                          <button className="page-link"><i className="fa fa-angle-left" aria-label="hidden"></i></button>
                        </li>
                        <li className="page-item"><button className="page-link">1</button></li>
                        <li className="page-item active">
                          <span className="page-link">
                            2
                            <span className="sr-only">(current)</span>
                          </span>
                        </li>
                        <li className="page-item"><button className="page-link">3</button></li>
                        <li className="page-item"><button className="page-link">4</button></li>
                        <li className="page-item">
                          <button className="page-link"><i className="fa fa-angle-right" aria-label="hidden"></i></button>
                        </li>
                      </ul>
                    </nav>

                </div>
            </div>

        </div>
    )
}
export default Users;
