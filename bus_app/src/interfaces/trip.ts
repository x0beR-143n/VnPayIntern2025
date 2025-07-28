export interface TransportInformation {
    rating: number;
    allow_view_detail: boolean;
    id: number;
    code: string;
    image_url: string;  
    is_favourite: boolean;
    notification: {
        label: string;
        description: string;
    };
    comment_number: number;
    direct_connect: boolean;
    name: string;
}

export interface Trip {
  allow_picking_seat: boolean;
  vehicle_type: string;
  status: string;
  total_seat: number;
  seat_type: string;
  duration_in_min: number;
  merchant_start_point_name: string;
  start_point: string;
  discount_amount: number;
  refund_able: boolean;
  search_request_id: number;
  departure_time: string;
  vehicle_name: string;
  uuid: string;
  merchant_id: number;
  pick_up_date: string;
  drop_off_date: string;
  name: string;
  drop_off_time: string;
  priority: number;
  departure_date: string;
  merchant_end_point_name: string;
  available_seat: number;
  merchant_name: string;
  fare_amount: number;
  end_location_id: number;
  transport_information: TransportInformation;
  end_point: string;
  start_location_id: number;
  merchant_trip_code: string;
  pick_up_time: string;
  merchant_code: string;
}

export interface TripApiResponseSuccess {
    success: boolean;
    message: string;
    data: Trip[];
    pagination: {
        currentPage: number,
        totalPages: number,
        totalItems: number,
        itemsPerPage: number,
        hasNext: boolean,
        hasPrev: boolean,
        startIndex: number, 
        endIndex: number,
    }
}

export interface TripApiResponseFailed {
    success: false;
    message: string;
    error: string;
}