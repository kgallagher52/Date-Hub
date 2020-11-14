type Card = {
    place_id: string,
    name: String,
    photo?: String,
    rating: Number,
    ratingsAmt: Number,
    reference: String,
    vicinity: String
}

type EventCardProps = {
    event: Card
}

