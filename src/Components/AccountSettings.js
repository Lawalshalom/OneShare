import React from 'react';

const AccountSettings = () => {
    return (
        <div className="dashboard-items" id="account-settings">
        <div className="row">
            <div className="col-12 col-md-6">
                <p>Change your OneShare password at any time!</p>
                <div className="w-60">
                    <input type="password" name="password" id="password" placeholder="Current Password" autoComplete="false" required/>
                    <span><i className="fa fa-eye" id="toggle-password"></i></span>
                </div><br/>
                <div className="w-60">
                    <input type="password" name="password" id="password" placeholder="New Password" autoComplete="false" required/>
                    <span><i className="fa fa-eye" id="toggle-password"></i></span>
                </div><br/>
                <button type="submit" className="btn completed">Submit</button><br/>
                <a href="/login">Forgot Password?</a>
            </div>
            <div className="col-12 col-md-6">
                <p className="text-primary logout"><img src="images/logout-icon.svg" alt="logout icon" />Logout of OneShare</p>
            </div>
        </div>
    </div>
    )
};
export default AccountSettings;