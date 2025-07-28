import Vnmf from '@vnxjs/vnmf';
import { TripApiResponseSuccess, TripApiResponseFailed } from '../interfaces/trip';

const BASE_URL = 'http://localhost:5555';

export class TripService {
  static async getTrips(
    page: number = 1,
    limit: number = 10
  ): Promise<TripApiResponseSuccess | TripApiResponseFailed> {
    try {
      const res = await Vnmf.request({
        url: BASE_URL + `/api/trips?page=${page}&limit=${limit}`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
      });

      return res.data as TripApiResponseSuccess;
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch trips',
        error: error?.message || 'Unknown error',
      };
    }
  }
}
