import React from 'react';
import './index.css';
const EventCard = ({ event }: EventCardProps) => {
    console.log(event);
    return (
        <div className="card">
            <span className="card-header" style={{ backgroundImage: "url(http://placeimg.com/400/200/animals)" }}>
                <span className="card-title">
                    <h3>{event.name}</h3>
                </span>
            </span>
            <div className="card-summary">
                <ul>
                    <li><span>Location:</span>{event.vicinity}</li>
                    <li><span>Rating:</span>{event.rating}</li>
                    <li><span>Total Ratings:</span>{event.ratingsAmt}</li>
                </ul>
            </div>
        </div>
    )
}

export default EventCard
