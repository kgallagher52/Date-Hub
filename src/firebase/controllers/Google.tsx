import Axios from "axios";

type GooglePlacesProps = {
    lat: String,
    long: string
}

const getPlaces = (lat: GooglePlacesProps, long: GooglePlacesProps): Card[] => {

    const places: any = Axios.get(`http://localhost:8080/getFood?lat=${lat}&lon=${long}`)
        .then(res => {
            const cards = res.data.map((d: any) => {
                return {
                    place_id: d?.place_id,
                    name: d.name,
                    photo: d.photos ? d.photos[0].photo_reference : "",
                    rating: d.rating,
                    user_ratings_total: d.user_ratings_total,
                    reference: d.reference,
                    price_level: d.price_level,
                    opening_hours: d.opening_hours,
                    formatted_address: d.formatted_address
                }
            })
            // Getting the image for each card
            // cards.forEach(async (c: any) => {
            //     if (c.reference !== "") {
            //         Axios.get(`http://localhost:8080/getItemPhoto?reference=${c.photo}`).then(data => {
            //             console.log("sdsdw", data);
            //         }).catch(err => {
            //             console.log(err);
            //         })
            //     }
            // });

            return cards
        }).catch(err => {
            console.log({ err })
            return ["err", err]
        })
    return places
}

export default getPlaces;