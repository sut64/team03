import { FacilityInterface } from "./FacilityUI";
import { UserInterface } from "./UserUI";

export interface PaymentInterface {
    ID: number,
	StaffPaymentID:  number,
	StaffPayment: UserInterface,
    CustomerPaymentID:    number,
	CustomerPayment: UserInterface,
    PaymentMethodID:  number,
	PaymentMethod: PaymentMethodInterface
    Bill: string,
	Discount: number,
	Total:  number,
	Note:	string,
	AddedTime:  Date,
    FacilityID: number,
    Facility:   FacilityInterface
}

export interface PaymentMethodInterface {
    ID: number,
	Name:	string
}