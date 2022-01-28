import { UserInterface } from "./UserUI";

    export interface SportTypesInterface {

    ID: number,
   
    Type: string,

   }

   export interface CompaniesInterface {

    ID: number,
   
    Company: string,

    Tel: string,

    About: string,

   }

   export interface RoleItemsInterface {

    ID: number,
   
    Role: string,

   }

   export interface EquipmentsInterface {
    ID: number,
  
    Name: string,
  
    Quantity: string,
  
    InputDate: Date ,
  
    SportTypeID: number,
    SportType: SportTypesInterface
    
    CompanyID: number,
    Company: CompaniesInterface,
  
    RoleItemID: number,
    RoleItem: RoleItemsInterface,
  
    EquipmentStaffID: number,
    EquipmentStaff: UserInterface,
    
  }