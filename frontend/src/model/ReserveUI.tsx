import { UserInterface } from "./UserUI";
import { FacilityInterface } from '../model/FacilityUI';
export interface BookingTimeInterface{
    ID: number,
    Name  : string
    Time  : string
    Amount : number
    Avalable : number
	CourtID : number
	Court : CourtInterface
   }
   export interface CourtInterface{
    ID: number
    Name   :string
	ZoneID : number
	Zone   : ZoneInterface

}
export interface ZoneInterface{
	ID :    number;
    Name   :string;
	status : number;
}
export interface ReserveInterface{
	ID : number

	AddedTime :Date
	Amount   :number
	Tel      : string
	
	UserID : number
	User   : UserInterface



	BookingTimeID: number
	BookingTime : BookingTimeInterface

	FacilityID : number
	Facility  : FacilityInterface


}
