import { FC } from "react";

type User = {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
    dates?: string[];
}
type PrivateRouteProps = {
    user: User;
    children: FC;
}