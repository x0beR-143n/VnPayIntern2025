import Vnmf from '@vnxjs/vnmf';
import { TripApiResponseSuccess, TripApiResponseFailed } from '../interfaces/trip';
import { TripFilter } from '../interfaces/filter';

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

  static async getTripsWithFilter(
    page: number = 1,
    limit: number = 10,
    filter?: TripFilter,
    criteria?: string,
    ascending?: boolean
  ): Promise<TripApiResponseSuccess | TripApiResponseFailed> {
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (criteria) {
        queryParams.append('criteria', criteria);
      }

      if (typeof ascending === 'boolean') {
        queryParams.append('ascending', String(ascending));
      
      }

      const res = await Vnmf.request({
        url: `${BASE_URL}/api/trips/filter?${queryParams.toString()}`,
        method: 'POST',
        header: {
          'content-type': 'application/json',
        },
        data: filter || {}
      });

      return res.data as TripApiResponseSuccess;
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch filtered trips',
        error: error?.message || 'Unknown error',
      };
    }
  }
}
