import { Seat, SeatBookingValidation } from "../interfaces/seat";

export const validateBookingSeats = (seats: Seat[], selectedIndex: number[]): SeatBookingValidation => {    
    const result:SeatBookingValidation = {
        GAP_IN_MIDDLE_SEATS: false,
        GAP_AT_EDGE_SEATS : false,
        VALIDATED : true,
        error_index: [],
    }
    for(const index of selectedIndex) {
        if(seats[index-1].code.length === 0) {
            if(!selectedIndex.includes(index + 1)) {
                const currentSeatCode = seats[index].code[0];
                const validateSeatCode = seats[index + 2].code[0];
                if(currentSeatCode !== validateSeatCode) {
                    result.GAP_AT_EDGE_SEATS = true;
                    result.VALIDATED = false;
                    result.error_index.push(index + 1);
                }
            }
        }
        if(seats[index+1].code.length === 0) {
            if(!selectedIndex.includes(index - 1)) {
                const currentSeatCode = seats[index].code[0];
                const validateSeatCode = seats[index - 2].code[0];
                if(currentSeatCode !== validateSeatCode) {
                    result.GAP_AT_EDGE_SEATS = true;
                    result.VALIDATED = false;
                    result.error_index.push(index - 1);
                }
            }
        }
    }
    for (const index of selectedIndex) {
        // rules 1: nếu đặt ở giữa thì không được bỏ trống 2 đầu
        if (!selectedIndex.includes(index + 1)) {    
            if (seats[index + 2]?.code.length === 0) {
                result.GAP_AT_EDGE_SEATS = true;
                result.VALIDATED = false;
                result.error_index.push(index + 1);
            }
        }
        if (!selectedIndex.includes(index - 1)) {    
            if (seats[index - 2]?.code.length === 0) {
                result.GAP_AT_EDGE_SEATS = true;
                result.VALIDATED = false;
                result.error_index.push(index - 1);
            }
        }
        // rules 2: nếu đặt ở giữa thì không được bỏ trống 1 ghế ở giữa
        if (!selectedIndex.includes(index - 1)) {    
            if (selectedIndex.includes(index - 2)) {
                result.GAP_IN_MIDDLE_SEATS = true;
                result.VALIDATED = false;
                result.error_index.push(index - 1);
            }
        }
    }
    return result;
};
