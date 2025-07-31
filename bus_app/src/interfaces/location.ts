export interface City {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: string;
}

export interface LocationRequestFailed {
    success: false;
    message: string;
    error: string;
}

export interface LocationRequestSuccess {
    success: true;
    data: City[];
}