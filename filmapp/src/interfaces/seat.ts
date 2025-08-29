// types.ts

export interface Session {
  roomName: string;
  maxSeats: number;
  cinemaName: string; 
  cinemaGroupName: string;
  filmName: string;
  filmNameEn: string;
  version: string;
  filmAge: string;
  sessionTime: string; 
  duration: number;
  category: string;
  poster: string;
}

export interface TicketType {
  id: number;
  name: string;
  colorCode: string;
  price: number;
  originalPrice: number;
  ishow_orgPrice: number; // int (0 hoặc 1)
}

export interface Seat {
  seatId: string;
  code: string;
  status: number;
  type: number;
  price: number;
  ticketTypeId: number;
  color: string;
  isEnable: boolean;
}

export enum SeatBookingStatus {
  GAP_IN_MIDDLE_SEATS,
  GAP_AT_EDGE_SEATS,
  VALIDATED,
}

export interface SeatBookingValidation {
  GAP_IN_MIDDLE_SEATS: boolean,
  GAP_AT_EDGE_SEATS : boolean,
  VALIDATED : boolean,
  error_index: number[];
}

export interface ApiResponse {
  success: boolean;
  session: Session;
  ticketTypes: TicketType[];
  seats: Seat[];
  paymentNote: string; // HTML string
}
