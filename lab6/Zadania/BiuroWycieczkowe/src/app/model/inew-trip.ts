import { IOpinion } from "./iopinion";

export interface INewTrip {
    id: number;
    name: string;
    destination: string;
    start: string;
    end: string;
    price: number;
    quantity: number;
    description: string;
    images: Array<string>;
    numOfReviews: number;
    rating: number;
    reviews: Array<IOpinion>
}
