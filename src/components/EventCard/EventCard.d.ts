type Card = {
    place_id: string,
    name: string,
    photo?: string,
    rating: number,
    user_ratings_total: number,
    reference: string,
    vicinity: string
    price_level: number,
    opening_hours?: boolean
    formatted_address: string
}

type EventCardProps = {
    event: Card;
    onClick: () => void;
}

