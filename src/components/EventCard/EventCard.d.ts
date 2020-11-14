type Card = {
    place_id: string,
    name: String,
    photo?: String,
    rating: Number,
    user_ratings_total: Number,
    reference: String,
    vicinity: String
}

type EventCardProps = {
    event: Card;
    onClick: () => void;
}

