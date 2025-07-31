import { useEffect, useState } from "react";
import Vnmf from "@vnxjs/vnmf";
import { View, Text, Image, ScrollView, Button } from "@vnxjs/components";
import back_icon from '../../assets/icon/ic_back.svg'
import filter_icon_gray from '../../assets/icon/ic_filter_grey.svg'
import filter_icon_white from '../../assets/icon/ic_filter_white.svg'
import DateCard from "../../components/DateCard/DateCard";
import { Trip } from "../../interfaces/trip";
import { TripService } from "../../services/TripService";
import TripCard from "../../components/TripCard/TripCard";
import './index.scss'

export default function Index() {    
    const days: number[] = [];
    const days_str : string[] = [];
    const day_of_week = ["T6", "T7", "CN", "T2", "T3", "T4", "T5"];
    let d_index = 0;    
    for(let i = 17; i <= 30; i++) {
        days.push(i);
        days_str.push(day_of_week[d_index]);
        d_index++;
        if(d_index > 6) {
            d_index = 0;
        }
    }

    const [selected_date, setSelectedDate] = useState(3);
    const [selected_button, setSelectedButton] = useState(0);

    const [trips, setTrips] = useState<Trip[]>([])
    
    useEffect(() => {
        const fetchTrips = async () => {
          const res = await TripService.getTrips(1, 15);
          if (res.success) {
            setTrips(res.data)
          } else {
            console.error('Failed to fetch trips:', res.message)
          }
        }
    
        fetchTrips()
      }, [])
    
    const navigateToFilter = () => {
        Vnmf.navigateTo({
            url: 'pages/filter/index',
        })  
    }

    const navigateToHome = () => {
        Vnmf.navigateBack({
            delta: 1
        })
    }

    const setButtonAction = (index:number) => {
        setSelectedButton(index)
        if(index === 4) {
            navigateToFilter();
        }
    }

    return (
        <ScrollView className='scroll-view' scrollY scrollWithAnimation>
            <View className='search_header'> 
                <View className='trip_name_n_back'>
                    <Image src={back_icon} className='back_ic' onClick={navigateToHome} />
                    <View className='trip_name'>
                        <Text className='trip_name_title'>Chọn chuyến đi</Text>
                        <Text className='trip_name_description'>Hồ Chí Minh - Lâm Đồng</Text>
                    </View>
                </View>
                <View className='filter-clear'>
                    <Image src={filter_icon_gray} />
                    <Text>Xóa lọc</Text>
                </View>
            </View>
            <ScrollView scrollX className='day_picker_container'>
                {days.map((day, index) => (
                    <DateCard key={index} day={day} month={3} day_of_week={days_str[index]} is_selected={index === selected_date} onClick={() => setSelectedDate(index)} />    
                ))}
            </ScrollView>  
            <View className='button_container'>
                <View>
                    <Button
                      onClick={() => setButtonAction(1)}
                      className={selected_button === 1 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Giờ chạy
                    </Button>
                </View>
                <View>
                    <Button
                      onClick={() => setButtonAction(2)}
                      className={selected_button === 2 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Giá vé
                    </Button>
                </View>
                <View>
                    <Button
                      onClick={() => setButtonAction(3)}
                      className={selected_button === 3 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Đánh giá
                    </Button>                
                </View>
                <View>
                    <Button
                      onClick={() => setButtonAction(4)}
                      className={selected_button === 4 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Lọc
                    {selected_button === 4 ? (
                         <Image src={filter_icon_white} className='filter-ic' />
                    ) : (
                         <Image src={filter_icon_gray} className='filter-ic' />
                    )}
                        
                    </Button>
                </View>
            </View>     

            <View className='trips-card-container'>
                {trips.map((trip, index) => (
                <TripCard trip={trip} key={index} />
                ))}
            </View>     
        </ScrollView>
    )
}