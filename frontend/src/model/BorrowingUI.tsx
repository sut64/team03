import { EquipmentInterface } from "./EquipmentUI";
import { UserInterface } from "./UserUI";

export interface BorrowingInterface {
  ID: number,
  EquipmentID: number,
  Equipment: EquipmentInterface,
  BorrowStatusID: number,
  BorrowStatus: BorrowStatusInterface,
  CustomerBorrowID: number,
  StaffBorrowID: number,
  CustomerBorrow: UserInterface,
  StaffBorrow: UserInterface,
  Quantity: number,
  Contact: string,
  Comment:string,
  Borrowtime : Date
}

export interface BorrowStatusInterface {
  ID: number,
  Status: string,
}

