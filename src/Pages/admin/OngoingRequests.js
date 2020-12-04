import React, { useEffect } from 'react';

const OngoingRequests = (props) => {

    const allUsers = props.users;
    const users = props.displayUsers.users;

    const ongoing = [];
    users.forEach(user => {
        if (user.requests){
            if (user.requests.length > 0){
                user.requests.forEach(req => {
                    if (req.approved && !req.completed)
                    ongoing.push(req);
                })
            }
        }
    })

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


    const handleReadMore = (e) => {
        const dots = e.target.previousElementSibling;
        const moreRead = e.target.nextSibling;
        const readLess = moreRead.nextSibling;
        dots.style.display = "none";
        e.target.style.display = "none";
        moreRead.style.display = "inline";
        readLess.style.display = "inline";
    }
    const handleReadLess = (e) => {
        const moreRead = e.target.previousElementSibling;
        const readMore = moreRead.previousElementSibling;
        const dots = readMore.previousElementSibling;
        e.target.style.display = "none";
        dots.style.display = "inline";
        moreRead.style.display = "none";
        readMore.style.display = "inline";
    }

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
    let i = Math.floor(ongoing.length/5);
    while (i > -1){
        pagination.push(i);
        i-= 1;
    }
    if (ongoing.length % 5 > 0){
        if (pagination.length < 1){
            pagination.push(1)
        }
        else pagination.unshift(pagination[0] +1)
    }
    pagination.pop();
    pagination.reverse();

    const handlePagination = (num) => {
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

        props.setDisplayUsers({users:ongoing.slice(num*5 -5, num*5), num, bool: true});
    }

    const handlePrev = () => {
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

        props.setDisplayUsers({users: ongoing.slice((num-1) *5 -5, (num-1) *5), num: num-1, bool: true})
    }

    const handleNext = () => {
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[pageLinks.length-2].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        const num = pageLinks.indexOf(elem);
        if (!elem) return;
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

        props.setDisplayUsers({users: ongoing.slice((num+1) *5 -5, (num+1) *5), num: num+1, bool: true})
    }

    return (
        <div id="ongoing">
            {
                ongoing.length < 1 &&
                <p className="text-center faded">• No ongoing requests currently</p>
            }

            {
            ongoing.map(req => {
              return  <div key={req.id} className="row item-cover">
                    <div className="dashboard-item col-12 row">
                        <div className="item-details col-10 col-md-7 d-flex flex-column">
                            <div className="item-name d-flex flex-column">
                                <div className="d-flex">
                                    <strong className="text-capitalize">{req.name}</strong>
                                    <p className="faded"> {req.email}</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <p><strong className="text-capitalize">{req.reqType}</strong></p>
                            </div>
                            <div className="item-location d-flex flex-column flex-md-row">
                                <p><img src="images/icons/frames01.svg" alt="location icon" /> {req.userLGA} LGA, {req.userState}</p>
                                <p><img src="images/icons/frames02.svg" alt="time icon" /> Posted {displayTime(req.dateCreated)}</p>
                            </div>
                            <p className="faded">{req.requestDetails.slice(0, 35)}<span>...</span><span onClick={handleReadMore} className="read-more-span text-primary">Read More</span>
                                    <span className="more-read">{req.requestDetails.slice(36, req.requestDetails.length)}</span>
                                    <span onClick={handleReadLess} className="text-primary p-2 read-less">Read Less</span></p>

                        </div>
                    </div>
                </div>
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
export default OngoingRequests;
