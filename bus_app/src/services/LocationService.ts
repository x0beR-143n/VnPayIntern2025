import Vnmf from "@vnxjs/vnmf";
import { LocationRequestFailed, LocationRequestSuccess } from "../interfaces/location";

const BASE_URL = 'http://10.97.136.159:5555';

export class LocationService {
    static async getProvinces(): Promise<LocationRequestFailed | LocationRequestSuccess> {
        try {
            const res = await Vnmf.request({
                url: BASE_URL + '/api/provinces',
                method: 'GET',
                header: {
                    'content-type': 'application/json',
                },
            });
            return {
                success: true,
                data: res.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: 'Failed to fetch provinces',
                error: error?.message || 'Unknown error',
            };
        }
    }  
}