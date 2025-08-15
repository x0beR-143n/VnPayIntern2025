export interface StartTime {
    time: string;
    start_time_hour: number;
    start_time_mins: number;
    arrived_time_hour: number;
    arrived_time_mins: number;
}

export enum TransportType {
    LIMOUSINE = 'LIMOUSINE',
    SLEEPER = 'SLEEPER',
    NORMAL = 'NORMAL'
}

export interface TripFilter {
    max_price?: number; 
    min_price?: number;
    start_time?: StartTime[];
    merchants?: number[];
    transports?: TransportType[];
}

interface merchantResponse {
    name: string;
    id: number;
}

export interface TripFilterAPIResponse {
    success: boolean;
    message: string;
    transportProviders: merchantResponse[];
    vehicleTypes: TransportType[];
}