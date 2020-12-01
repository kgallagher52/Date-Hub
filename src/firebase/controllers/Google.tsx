import Axios from "axios";

type GooglePlacesProps = {
    lat: String,
    long: string
}

const getPlaces = (lat: GooglePlacesProps, long: GooglePlacesProps) => {

    Axios.get(`json?location=${lat},${long}&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(data => {
            console.log(data.data.results);
        })
}
export default getPlaces;