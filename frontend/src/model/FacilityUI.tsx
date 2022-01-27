import { UserInterface } from "./UserUI";

export interface FacilityInterface{
    ID:number,
    UserID:number,
    User:UserInterface,
    No:string,
    PackageTime:Date,
    Price:number,
    Confirm:boolean,
    PackageID:number,
    Package:PackageInterface,
    TrainnerID:number,
    Trainner:TrainnerInterface,
}

export interface PackageInterface{
    ID:number,
    Name:string,
}

export interface TrainnerInterface{
    ID:number,
    Name:string,
    Gender:string,
    Age:number,
    Email:string,
    Tel:string,
    Experience:string,
}


