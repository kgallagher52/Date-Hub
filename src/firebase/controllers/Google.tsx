import Axios from "axios";

type GooglePlacesProps = {
    lat: String,
    long: string
}

const getPlaces = (lat: GooglePlacesProps, long: GooglePlacesProps): Card[] => {

   const places:any =  Axios.get(`json?location=${lat},${long}&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(data => {
            const formatedData = data.data.results.map((d:any) => {
                return {
                    place_id: d?.place_id,
                    name: d.name,
                    photo:d.photos ? d.photos[0].html_attributions[0].split("href=")[1].split(">")[0] :"" ,
                    rating:d.rating,
                    user_ratings_total:d.user_ratings_total,
                    reference:d.reference,
                    price_level: d.price_level,
                    opening_hours:d.opening_hours,
                    formatted_address: d.formatted_address
                }
            })
            return formatedData
        }).catch(err => {
            console.log({err})
            return ["err", err]
        })
        return places
}

export default getPlaces;