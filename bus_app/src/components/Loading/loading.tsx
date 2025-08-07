import { FaCarSide } from 'react-icons/fa'
import './FancyLoading.css'

const Loading = () => {
  return (
    <div className='loading-wrapper'>
      <div className='car-animation'>
        <FaCarSide className='car-icon' />
        <div className='road'>
          <div className='dash'></div>
        </div>
      </div>
      <p className='loading-text'>Đang tìm chuyến xe phù hợp...</p>
    </div>
  )
}

export default Loading;
