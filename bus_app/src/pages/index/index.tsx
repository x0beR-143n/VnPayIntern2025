import { useEffect, useState } from 'react'
import { View, Text, Image } from '@vnxjs/components'
// icons
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegStar, FaHeadset, FaRegCircle, FaMapMarkerAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineCancel, MdOutlineSearch } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

//import local
import { Trip } from '../../interfaces/trip'
import { TripService } from '../../services/TripService' 
import './index.scss'
import { getVietnameseDay, getTodayDate, convertMinuteToHour } from '../../utils/date.util'
import logo from '../../assets/img/logo.png'
import to_icon from '../../assets/icon/ic_arrow.svg'
import circle from '../../assets/img/circle.png'
import rectangel from '../../assets/img/rectangle.png'
import heart from '../../assets/icon/ic_heart.svg'
import heart_selected from '../../assets/icon/ic_heart_selected.svg'

export default function Index() {
  
  const day = getVietnameseDay();

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await TripService.getTrips(1, 10)
      if (res.success) {
        setTrips(res.data)
        console.log("Gọi thành công")
      } else {
        console.error('Failed to fetch trips:', res.message)
      }
    }

    fetchTrips()
  }, [])


  return (
    <View className='bg-black'>
      <View className='bg-img-container'>
        <Image src={logo} className='bg-img' />
        <View className='back_n_title_container'>
          <IoArrowBackCircleOutline className='bg-back' />
          <Text className='bg-title'>Tìm vé</Text>
        </View>

        <View className='cancel_help_like_container'>
          <FaRegStar className='like' />
          <View className='cancel_help_container'>
            <FaHeadset />
            <View className='help_cancel_seperator'></View>
            <MdOutlineCancel />
          </View>
        </View>

        <View className='bg-description'>
          <Text>{day} vui vẻ</Text>
          <Text style={{marginTop: '-15px'}}>Giảm ngay 50k</Text>
        </View>

        <View className='vehicle-card'>
          <View className='destination-container'>
            <View className='destination-items'>
              <FaRegCircle  />
              <Text>Chọn điểm đi</Text>
            </View>
            <View className='horizontal-seperator'></View>
            <View className='destination-items'>
              <FaMapMarkerAlt />
              <Text>Chọn điểm đến</Text>
            </View>
            <View className='vehicle-date'>
              <LuCalendarDays />
              <Text>{day}, ngày {getTodayDate()};</Text>
            </View>
            <View>
              <button className='search-button'>
                <MdOutlineSearch />
                Tìm kiếm</button>
            </View>
          </View>
        </View>
      </View>
      
      <View className='trips-card-container'>
        {trips.map((trip, index) => (
          <View key={index} className='trip-card'>
            <View className='departure-and-duration'>
              <View className='departure-time'>
                <Text>{trip.departure_time}</Text>
                <Text>{trip.departure_date.replace(/-/g, "/")}</Text>
              </View>
              <View>
                <Text className='duration_in_mins'>{convertMinuteToHour(trip.duration_in_min)}</Text>
              </View>
            </View>
            <View className='start_end_point_name'>
              <Text className='text-align-r'>{trip.merchant_start_point_name}</Text>
              <View className='circle_n_rec_container'>
                <Image className='trip_card_circle' src={circle}></Image>
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image src={to_icon} className='to_icon' />
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image className='trip_card_rectangle' src={rectangel}></Image>
                <Image className='trip_card_circle' src={circle}></Image>
              </View>
              <Text className='text-align-l'>{trip.merchant_end_point_name }</Text>
            </View>
            
            <View class='transport_info'>
              <View class='transport_name_n_logo'>
                <Image className='transport_logo' src={trip.transport_information.image_url} />
                <View class='transport_name'>
                  <Text>{trip.transport_information.name}</Text>
                  <Text className='transport_rules'>Chi tiết quy định</Text>
                </View>
              </View>
              <View class='rating_n_detail'>
                <View className='rating'>
                  <FaStar className='star' />
                  <Text className='rating_score'>{trip.transport_information.rating}</Text>
                  <Image src={heart} className='heart'></Image>
                </View>
                <Text className='transport_detail'>{trip.vehicle_name}</Text>
              </View>
            </View>

          </View>
        ))}
      </View>

    </View>
  )
}

/*

*/