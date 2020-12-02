import React from 'react';

const OngoingDonations = (props) => {
    const ongoing = [];
    props.users.forEach(user => {
        if (user.donations){
            if (user.donations.length > 0){
                user.donations.forEach(donation => {
                    if (donation.approved && !donation.completed)
                    ongoing.push(donation);
                })
            }
        }
    })

    return (
        <div id="ongoing">
            <p><strong>Ongoing</strong></p>

        </div>
    )
}
export default OngoingDonations;
