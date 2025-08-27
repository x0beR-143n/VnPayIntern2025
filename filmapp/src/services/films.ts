import Vnmf from '@vnxjs/vnmf';
import { ApiResponse } from '../interfaces/seat';
import { FoodApiResponse } from '../interfaces/food';
import { PromotionApiResponse } from '../interfaces/promotion';

const BASE_URL = 'http://172.20.10.2:5555';

export class FilmService {
  static async getFilmSession(): Promise<ApiResponse> {
    try {
      const res = await Vnmf.request({
        url: `${BASE_URL}/api/films`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
      });   
      
      const data = res.data as ApiResponse;

      if (!data.success) {
        throw new Error('API đặt ghế trả về success=false');
      }

      return data;
    } catch (error: any) {
      console.error('Lỗi khi lấy dữ liệu phim:', error);
      throw new Error(error?.message || 'Unknown error');
    }
  }

  static async getFoodSession(): Promise<FoodApiResponse> {
    try {
      const res = await Vnmf.request({
        url: `${BASE_URL}/api/films/food`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
      });   

      const data = res.data as FoodApiResponse;

      if (!data.success) {
        throw new Error('API đồ ăn trả về success=false');
      }

      return data;
    } catch (error: any) {
      console.error('Lỗi khi lấy dữ liệu đồ ăn:', error);
      throw new Error(error?.message || 'Unknown error');
    }
  }

  static async getPromotion(): Promise<PromotionApiResponse> {
    try {
      const res = await Vnmf.request({
        url: `${BASE_URL}/api/films/promotion`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
      });   

      const data = res.data as PromotionApiResponse;

      if (!data.success) {
        throw new Error('API giảm giá trả về success=false');
      }

      return data;
    } catch (error: any) {
      console.error('Lỗi khi lấy dữ liệu mã giảm giá:', error);
      throw new Error(error?.message || 'Unknown error');
    }
  }
}
