import { useEffect, useState } from 'react';
import { View, Text, Image } from '@vnxjs/components'
import Header from '../../components/Header/header'
import Loading from '../../components/Loading/loading'
import { FilmService } from '../../services/films'
import { ApiResponse } from '../../interfaces/seat'
import TicketTypes from '../../components/TicketTypes/TicketTypes';
import { formatDateTime } from '../../utils/format';
import screen from '../../assets/icon/ic_screen_seatmap.svg'
import './index.scss'

export default function Index() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFilm() {
      try {
        const filmData = await FilmService.getFilmSession();
        setData(filmData);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    }

    fetchFilm();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  if(data) {
    return (
      <View className='main-container'>
        <Header />
        <TicketTypes ticketTypes={data.ticketTypes} />
        <View className='movie-info'>
          <View className='cinema'>
            <Text className='movie-text-1'>Tên rạp chiếu: </Text>
            <Text className='movie-text-2'>{data.session.cinemaName}</Text>
          </View>
          <View className='time-n-room'>
            <View className='time'>
              <Text className='movie-text-1'>Suất chiếu: </Text>
              <Text className='movie-text-2'>{formatDateTime(data.session.sessionTime)}</Text>
            </View>
            <View className='room'>
              <Text className='movie-text-1'>Phòng chiếu: </Text>
              <Text className='movie-text-2'>{data.session.roomName}</Text>
            </View>
          </View>
        </View>
        <View className='screen'>
          <Image src={screen} />
        </View>
      </View>
    )
  }
}
