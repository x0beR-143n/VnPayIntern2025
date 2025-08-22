import { useEffect, useState } from 'react';
import { View, Text, Image } from '@vnxjs/components'
//redux
import { Provider } from 'react-redux';
import { store } from '../../store/index';
//---------------
import Header from '../../components/SeatComponents/Header/header'
import Loading from '../../components/Loading/loading'
import { FilmService } from '../../services/films'
import { ApiResponse } from '../../interfaces/seat'
import TicketTypes from '../../components/SeatComponents/TicketTypes/TicketTypes';
import MovieInfo from '../../components/SeatComponents/MovieInfo/MovieInfo';
import screen from '../../assets/icon/ic_screen_seatmap.svg'
import SeatMap from '../../components/SeatComponents/Seats/SeatMap';
import './index.scss'

function FilmIndex() {
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
    return <Text>{error}</Text>;
  }

  if(data) {
    return (
      <View className='main-container'>
        <Header />
        <TicketTypes ticketTypes={data.ticketTypes} />
        <MovieInfo cinemaName={data.session.cinemaName} sessionTime={data.session.sessionTime} roomName={data.session.roomName} />
        <View className='screen'>
          <Image src={screen} />
          <SeatMap seats={data.seats} session={data.session} />
        </View>
      </View> 
    )
  }
}

export default function Index() {
    return (
        <Provider store={store}>
            <FilmIndex />
        </Provider>
    )
}