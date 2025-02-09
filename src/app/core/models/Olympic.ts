// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import { participations } from "./Participation";

export interface country {
    id: number;
    country: string;
    participations : participations[];
}