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
    useEffect(() => {
        const hamburger = document.querySelector('.hamburger-menu');
        const siteNav = document.querySelector('.admin-nav');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            siteNav.classList.toggle('show');
        });

    })

    return (
        <>
            <div className="admin-nav">
                <ul className="d-flex flex-column p-0">
                    <li name="overview"><img src="images/icons/admin/Frame.svg" alt="overview icon" /><a href="/admin-overview">Overview</a></li>
                    <li name="users"><img src="images/icons/admin/Frame-1.svg" alt="users icon" /><a href="admin-users">Users</a></li>
                    <li name="approvals"><img src="images/icons/admin/Frame-2.svg" alt="approvals icon" /><a href="/admin-approvals">Approvals</a></li>
                    <li name="reviews"><img src="images/icons/admin/Frame-4.svg" alt="reviews icon" /><a href="/admin-reviews">Reviews</a></li>
                    <li><a href="/"><img src="images/icons/admin/Frame-3.svg" alt="logout icon" />Go to OneShare</a></li>
                </ul>

                <div className="hamburger-menu d-lg-none">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

        </>
    )
};

export default AdminNav;
