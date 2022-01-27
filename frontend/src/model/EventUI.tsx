export interface TrainnerInterface {

    ID: string, 
    Name:        string,
	Gender:      string,
	Age:         number,
	Email:       string,
	Tel:         string,
	Experience:  string,
}

export interface RoomInterface {

    ID: string, 
    Name:    string,
	Maximum: number,
}

export interface TypeEventInterface {

    ID:   string, 
    Name: string,
}

export interface EventInterface {

    ID:         string, 
    Name:       string,
	Details:    string,
	TimeStart:  Date,
	TimeEnd:    Date,
	Amount:     number,

    //fk
    TrainnerID : number
	Trainner   :TrainnerInterface

	RoomID :number
	Room   :RoomInterface

	TypeEventID : number
	TypeEvent   : TypeEventInterface

}
