import React, { useEffect } from 'react'

const Reviews = (props) => {
    const allUsers = props.users;
    const users = props.displayUsers.users;

    const reviews = [];
    users.forEach(user => {
        if (user.reviews){
            reviews.push(user.reviews);
        };
    });

   useEffect(() => {
        const bool = props.displayUsers.bool;
        if (bool){
            const num = props.displayUsers.num;
            const index = reviews[num *5] ? num*5 : reviews.length ;
            const startIndex = num === 1 || index <=5 ? 0 : num *5 -5;

            const newUsers = {users: reviews.slice(startIndex, index), num, bool: true};

            if (JSON.stringify(props.displayUsers) !== JSON.stringify(newUsers)){
                props.setDisplayUsers(newUsers);
                }

            return;
        }

    }, [allUsers, props, reviews])


    const displayTime = (time) => {
        const timeString = new Date(time);
        const diff = (new Date().getHours()) - (timeString.getHours());
        const dateDiff = (new Date().getDate()) - (timeString.getDate());
        const minDiff = (new Date().getMinutes()) - (timeString.getMinutes());
        let displayTime, displayDate;

        const displayMins = minDiff === 0 ? "Just Now"
                          : minDiff === 1 ? `${minDiff} minute ago`
                          : `${minDiff} minutes ago`

        const hours = timeString.getHours() === 0 ? "12"
                    : timeString.getHours() > 0 && timeString.getHours() < 10 ? `0${timeString.getHours()}`
                    : timeString.getHours() > 10 && timeString.getHours() <= 12 ? timeString.getHours()
                    : timeString.getHours() > 12 && timeString.getHours() < 22 ? `0${timeString.getHours() - 12}`
                    : `${timeString.getHours() - 12}`;

        const amPM = timeString.getHours() > 12 ? "PM" : "AM";
        switch (diff) {
            case 0:
                displayTime = displayMins;
                break;
            case 1:
                displayTime = `${diff} hour ago`
                break;
            case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
               displayTime = `${diff} hours ago`
                break;
            default: displayTime = `${hours}:${timeString.getMinutes() === 0 ? "00" : timeString.getMinutes() < 10 ? `0${timeString.getMinutes()}` : timeString.getMinutes()} ${amPM}`;
                break;
        }
        switch (dateDiff) {
            case 0:
                displayDate = ""
                break;
            case 1:
                displayDate = ", Yesterday"
                break;
            case 2:
                displayDate = ", Two days ago"
                break;
            default:
                displayDate = `${timeString.getDate()}, ${timeString.getMonth()}, ${timeString.getFullYear()}`;
                break;
        }
        return `${displayTime} ${displayDate}`;
    }

    const pagination = [];
    let i = Math.floor(reviews.length/5);
    while (i > -1){
        pagination.push(i);
        i-= 1;
    }
    if (reviews.length % 5 > 0){
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

        props.setDisplayUsers({users:reviews.slice(num*5 -5, num*5), num, bool: true});
    }

    const handlePrev = () => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[1].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        if (!elem) return;
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

        props.setDisplayUsers({users: reviews.slice((num-1) *5 -5, (num-1) *5), num: num-1, bool: true})
    }

    const handleNext = () => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[pageLinks.length-2].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        if (!elem) return;
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

        props.setDisplayUsers({users: reviews.slice((num+1) *5 -5, (num+1) *5), num: num+1, bool: true})
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

    if (props.search){
        return (
            <div className="search-users">
            <form id="search-users" onSubmit={handleSearchUsers}>
                <input type="name" name="search-name" placeholder={`Showing ${users.length} of ${reviews.length} OneShare users`} required/>
                <p className="text-right"><strong><span className="d-none d-sm-inline mr-2">Search users</span>
                    <button><i className="fa fa-search" type="submit"></i></button></strong></p>
            </form>
            </div>
        )
    }

    else if (props.reviews){
        return (
            <div className="display-reviews">

            {
                reviews.length < 1 &&
                <p className="text-center faded">• No reviews have been made yet.</p>
            }

            {
                reviews.map(review => {
                    return (
                        <div>
                            <div className="d-flex flex-column flex-md-row">
                                <div className="d-flex">
                                    <p><strong>{review.name}</strong></p>
                                    <p>&nbsp; • {review.accountType}</p>
                                    <p>&nbsp; • {review.accountSubtype}</p>
                                </div>
                                <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(review.dateCreated)}</p>
                                <p><img src="images/icons/frames01.svg" alt="location icon" /> {review.userLGA} LGA, {review.userState}</p>
                            </div>
                            <div>
                                <p>{review.body}</p>
                            </div>
                        </div>
                    )
                })
            }

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
        )
    }
}
export default Reviews;