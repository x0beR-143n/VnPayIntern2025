import { Seat, SeatBookingStatus, SeatBookingValidation } from "../interfaces/seat";

export const validateBookingSeats = (seats: Seat[], selectedIndex: number[]): SeatBookingValidation => {    
    for(const index of selectedIndex) {
        if(seats[index].code.includes('12')) {
            if(!selectedIndex.includes(index +1)) {
                return {
                    status: SeatBookingStatus.GAP_AT_EDGE_SEATS,
                    error_index: index + 1,
                }
            }
        }
         if(seats[index].code.includes('02')) {
            if(!selectedIndex.includes(index - 1)) {
                return {
                    status: SeatBookingStatus.GAP_AT_EDGE_SEATS,
                    error_index: index - 1,
                }
            }
        }
    }
    for (const index of selectedIndex) {
        // rules 1: nếu đặt ở giữa thì không được bỏ trống 2 đầu
        if (!selectedIndex.includes(index + 1)) {    
            if (seats[index + 2]?.code.length === 0) {
                return {
                    status: SeatBookingStatus.GAP_AT_EDGE_SEATS,
                    error_index: index + 1,
                }
            }
        }
        if (!selectedIndex.includes(index - 1)) {    
            if (seats[index - 2]?.code.length === 0) {
                return {
                    status: SeatBookingStatus.GAP_AT_EDGE_SEATS,
                    error_index: index - 1,
                }
            }
        }
        // rules 2: nếu đặt ở giữa thì không được bỏ trống 1 ghế ở giữa
        if (!selectedIndex.includes(index - 1)) {    
            if (selectedIndex.includes(index - 2)) {
                return {
                    status: SeatBookingStatus.GAP_IN_MIDDLE_SEATS,
                    error_index: index - 1,
                }
            }
        }
    }
    return {
        status: SeatBookingStatus.VALIDATED,
        error_index: -1,
    }
};
