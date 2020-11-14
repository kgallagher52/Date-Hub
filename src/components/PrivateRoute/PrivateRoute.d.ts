import { FC } from "react";

type User = {
    name?: string;
    email?: string;
    photo?: string;
    dates?: string[];
}
type PrivateRouteProps = {
    user: User;
    children: FC;
}