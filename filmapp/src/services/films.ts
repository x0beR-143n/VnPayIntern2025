import Vnmf from '@vnxjs/vnmf';
import { ApiResponse } from '../interfaces/seat';

const BASE_URL = 'http://localhost:5555';

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

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = res.data as ApiResponse;

      if (!data.success) {
        throw new Error('API trả về success=false');
      }

      return data;
    } catch (error: any) {
      console.error('Lỗi khi lấy dữ liệu phim:', error);
      throw new Error(error?.message || 'Unknown error');
    }
  }
}
