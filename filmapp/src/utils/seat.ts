import { Seat, SeatBookingStatus } from "../interfaces/seat";

export const validateBookingSeats = (seats: Seat[], selectedIndex: number[]): SeatBookingStatus => {
    for (const index of selectedIndex) {
        // rules 1: nếu đặt ở giữa thì không được bỏ trống 2 đầu
        if (!selectedIndex.includes(index + 1)) {    
            if (seats[index + 2]?.code.length === 0) {
                return SeatBookingStatus.GAP_AT_EDGE_SEATS;
            }
        }
        if (!selectedIndex.includes(index - 1)) {    
            if (seats[index - 2]?.code.length === 0) {
                return SeatBookingStatus.GAP_AT_EDGE_SEATS;
            }
        }
        // rules 2: nếu đặt ở giữa thì không được bỏ trống 1 ghế ở giữa
        if (!selectedIndex.includes(index - 1)) {    
            if (selectedIndex.includes(index - 2)) {
                return SeatBookingStatus.GAP_IN_MIDDLE_SEATS
            }
        }
        
    }
    return SeatBookingStatus.VALIDATED;
};
