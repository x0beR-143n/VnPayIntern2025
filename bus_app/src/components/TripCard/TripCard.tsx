import { View, Button, Image, Text } from '@vnxjs/components'
import { Trip } from 'src/interfaces/trip'
import { FaStar } from "react-icons/fa6";
import { convertMinuteToHour, formatCurrencyVND } from '../../utils/date.util'
import to_icon from '../../assets/icon/ic_arrow.svg'
import circle from '../../assets/img/circle.png'
import rectangel from '../../assets/img/rectangle.png'
import heart from '../../assets/icon/ic_heart.svg'
import heart_selected from '../../assets/icon/ic_heart_selected.svg'
import './tripCard.scss'

interface TripCardProps {
    trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
    return (
        <View className='trip-card'>
            <View className='left-circle'></View>
            <View className='right-circle'></View>
            <View className='departure-and-duration'>
              <View className='departure-time'>
                <Text>{trip.departure_time}</Text>
                <Text>{trip.departure_date.replace(/-/g, "/")}</Text>
              </View>
              <View>
                <Text className='duration_in_mins'>{convertMinuteToHour(trip.duration_in_min)}</Text>
              </View>
            </View>
            <View className='trip-name'>
              <Text>{trip.name}</Text>
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
            
            <View className='transport_info'>
              <View className='transport_name_n_logo'>
                <Image className='transport_logo' src={trip.transport_information.image_url} />
                <View className='transport_name'>
                  <Text>{trip.transport_information.name}</Text>
                  <Text className='transport_rules'>Chi tiết quy định 1</Text>
                </View>
              </View>
              <View className='rating_n_detail'>
                <View className='rating'>
                  <FaStar className='star' />
                  <Text className='rating_score'>{trip.transport_information.rating}</Text>
                  {trip.transport_information.is_favourite ? (
                    <Image src={heart_selected} className='heart'></Image>
                  ) : (
                    <Image src={heart} className='heart'></Image>
                  )}
                </View>
                <Text className='transport_detail'>{trip.vehicle_name}</Text>
              </View>
            </View>
            
            <svg width='100%' height='5' className='dash-separator'>
              <line x1='0' y1='0' x2='100%' y2='0'
                stroke='#999999'
                strokeWidth='1'
                strokeDasharray='10,5'
              />
            </svg>

            <View className='price_seat_continue_button'>
              <View className='price_and_seat'>
                <Text className='price_seat_font_w'>Từ <Text className='price'>{formatCurrencyVND(trip.fare_amount)}</Text></Text>
                <Text className='price_seat_font_w'>Chỉ còn {trip.available_seat} chỗ trống</Text>
              </View>
              <Button className='continue_button'>Tiếp tục</Button>
            </View> 
        </View>
    )
}