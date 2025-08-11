// LoadingCinema.tsx
import { FaFilm } from 'react-icons/fa';
import './loading.scss';

const Loading = () => {
  return (
    <div className='loading-wrapper'>
      <div className='film-animation'>
        <FaFilm className='film-icon' />
        <div className='reel'></div>
      </div>
      <p className='loading-text'>Đang tìm suất chiếu phù hợp...</p>
    </div>
  );
};

export default Loading;
