import React from 'react';
import './index.css';

const EventCard = ({ event, onClick }: EventCardProps) => {
    return (
        <div key={event.place_id} className="event-card">
            <span className="card-header" style={{ backgroundImage: "url(http://placeimg.com/400/200/animals)" }}>
                <span className="card-title">
                    <h3>{event.name}</h3>
                </span>
            </span>
            <div className="card-summary">
                <div><span>Location:</span><p>{event.vicinity}</p></div>
                <div><button onClick={onClick}>Add to itinerary</button></div>
            </div>
        </div >
    )
}

export default EventCard
