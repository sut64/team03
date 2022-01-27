export interface EquipmentInterface {
    ID: number,
    RoleItemID: number,
    RoleItem: RoleItemInterface,
    Name:string,
    Quantity: number,
    inputDate : Date
  }
  
  export interface RoleItemInterface {
    ID: number,
    Name:string,
  }