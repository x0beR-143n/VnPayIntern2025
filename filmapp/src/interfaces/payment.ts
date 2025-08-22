export interface FoodCombo {
    foodName: string;
    count: number;
    price: number;
}

export interface PaymentInfoType {
    filmName: string;
    duration: number;
    sessionTime: string;
    roomName: string;
    selectedSeats: string[]; 
    cinemaName: string;
    ticket_type: string;
    price_per_ticket: number;
    foodCombo: FoodCombo[];
    discountValue: number;
}