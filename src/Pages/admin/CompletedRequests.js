import React from 'react';

const CompletedRequests = (props) => {
    const completed = [];
    props.users.forEach(user => {
        if (user.donations){
            if (user.donations.length > 0){
                user.donations.forEach(donation => {
                    if (donation.completed)
                    completed.push(donation);
                })
            }
        }
    })

    return (
        <div id="completed">
            <p><strong>Completed</strong></p>

        </div>
    )
}
export default CompletedRequests;
