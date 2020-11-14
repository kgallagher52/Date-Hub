import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './index.css';
import EventCard from '../EventCard';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState<string>('food');
    const [error, setError] = useState<string>('');
    const [cardData, setCardData] = useState<Card[]>([]);

    useEffect(() => {
        const userLocation: any = sessionStorage.getItem('GEO');
        if (userLocation === null) {
            setError('Need location to get data.')
        }
        const userObj = JSON.parse(userLocation);
        const payload = { lat: userObj.latitude, lon: userObj.longitude, type: "restaurant" }
        console.log(JSON.stringify(payload))
        Axios.get(`/${activeLink === 'food' ? 'get-food' : 'get-activities'}`, { params: { ...payload } }).then((res) => {
            setCardData(res.data.results);
            console.log(res.data.results);
        }).catch(err => {
            console.error({ err })
        })
        return () => {
            setActiveLink('food');
            setCardData([]);
        }
    }, [activeLink])

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
                                <EventCard key={i} event={{ ...c }} />
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
