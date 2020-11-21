import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import EventCard from '../EventCard';
import './index.css';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState<string>('food');
    const [error, setError] = useState<string>('');
    const [cardData, setCardData] = useState<Card[]>([]);
    const [, setItinerary] = useState<Card[]>([]);

    useEffect(() => {
        const userLocation: any = sessionStorage.getItem('GEO');
        if (userLocation === null) {
            setError('Need location to get data.')
        }
        const userObj = JSON.parse(userLocation);
        const payload = { lat: userObj.latitude, lon: userObj.longitude, type: "restaurant" }
        Axios.get(`/${activeLink === 'food' ? 'get-food' : 'get-activities'}`, { params: { ...payload } }).then((res) => {
            setCardData(res.data.results);

        }).catch(err => {
            console.error({ err })
        })
        return () => {
            setActiveLink('food');
            setCardData([]);
        }
    }, [activeLink])

    const handleItinerary = (event: any) => {
        setItinerary(itinerary => {
            const newItinerary = [...itinerary]
            const index = newItinerary.findIndex(e => e.place_id === event.place_id);
            if (index === -1) {
                newItinerary.push(event);
            } else {
                newItinerary.splice(index, 1)
            }
            return newItinerary
        })
    }

    return (
        <div className="dashboard wrapper">
            {error !== '' ? <span className="error">{error}</span> :
                <>
                    <div className="tabs">
                        <div onClick={() => setActiveLink('food')} className={activeLink === "food" ? 'active' : ''}>Food</div>
                        <span>|</span>
                        <div onClick={() => setActiveLink('activities')} className={activeLink === "activities" ? 'active' : ''}>Activities</div>
                    </div>
                    {cardData.length > 0 ?
                        <div className="cards">
                            {cardData.map((c, i) => (
                                <EventCard onClick={() => handleItinerary(c)} key={i} event={c} />
                            ))
                            }
                        </div>
                        : null}
                </>
            }
        </div>
    )
}

export default Dashboard
