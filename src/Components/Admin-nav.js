import React, { useEffect } from 'react';

const AdminNav = (props) => {
    useEffect(() => {
        const nav = document.querySelector(".admin-nav");
        const li = nav.querySelectorAll("li");
        li.forEach(item => {
            if (item.getAttribute("name") === props.page){
                item.classList.add("active");
            }
            else item.classList.remove("active");
        });
    })
    return (
        <div className="admin-nav  col-4">
            <ul className="d-flex flex-column p-0">
                <li name="overview"><img src="images/icons/admin/Frame.svg" alt="overview icon" />Overview</li>
                <li name="users"><img src="images/icons/admin/Frame-1.svg" alt="users icon" />Users</li>
                <li name="approvals"><img src="images/icons/admin/Frame-2.svg" alt="approvals icon" />Approvals</li>
                <li name="reviews"><img src="images/icons/admin/Frame-4.svg" alt="reviews icon" />Reviews</li>
                <li><a href="/"><img src="images/icons/admin/Frame-3.svg" alt="logout icon" />Go to OneShare</a></li>
            </ul>
        </div>
    )
};

export default AdminNav;
