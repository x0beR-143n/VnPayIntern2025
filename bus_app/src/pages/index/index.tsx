import { useEffect, useState } from 'react'
import { View, Text, Image, Button, Picker, ScrollView } from '@vnxjs/components'
import Vnmf from '@vnxjs/vnmf';
// icons
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegStar, FaHeadset, FaRegCircle, FaMapMarkerAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineCancel, MdOutlineSearch } from "react-icons/md";
//import local
import { Trip } from '../../interfaces/trip'
import { TripService } from '../../services/TripService' 
import { LocationService } from '../..//services/LocationService';
import { getVietnameseDay} from '../../utils/date.util'
import logo from '../../assets/img/book.jpg'
import TripCard from '../../components/TripCard/TripCard';
import './index.scss'


export default function Index() {
  
  const day = getVietnameseDay();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [cities_name, setCitiesName] = useState<string[]>([]);
  //const [cities_code, setCitiesCode] = useState<number[]>([]);
  const [start_city_index, setStartCityIndex] = useState(0);
  const [end_city_index, setEndCityIndex] = useState(0);
  const [canGetNewData, setCanGetNewData] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await TripService.getTrips(1, 15);
      if (res.success) {
        setTrips(res.data)
      } else {
        console.error('Failed to fetch trips:', res.message)
      }
    }

    const fetchCities = async () => {
      const res = await LocationService.getProvinces();
      if(res.success) {
        let tmp_cities = res.data;
        let tmp_city_name: string[] = [];
        //let tmp_city_code: number[] = [];
        for(let i = 0 ; i<tmp_cities.length; i++) {
          tmp_city_name.push(tmp_cities[i].name);
          //tmp_city_code.push(tmp_cities[i].code);
        }
        tmp_city_name.push("Tất cả");
        setCitiesName(tmp_city_name);
        //setCitiesCode(tmp_city_code);
      } else {
        console.error("Không thể lấy dữ liệu tỉnh thành:", res.message)
      }
    }

    fetchTrips()
    fetchCities()
  }, [])

  const navigateToSearch = () => {
    Vnmf.navigateTo({
      url: 'pages/search/index',
    })  
  }

  const fetchNewData = async () => {
      const res = await TripService.getTrips(page, 15);
      if (res.success) {
        let current_array = trips;
        let added_array = res.data;
        const mergedArray = [...current_array, ...added_array];
        setTrips(mergedArray);
        let nextPage = page + 1;
        setPage(nextPage);
        setCanGetNewData(true);
        console.log("New Data Fetched")
      } else {
        console.error('Failed to fetch new trips:', res.message)
        setCanGetNewData(true);
      }
    }

  const onSCroll = (e) => {
      let max_height = e.detail.scrollHeight;
      let current_height = e.detail.scrollTop;
      if(max_height - current_height <= 2500) {
        if(canGetNewData) {
          setCanGetNewData(false);
          fetchNewData();
        }
        console.log("Get new data now")
      }
  }

  return (
    <ScrollView className='scroll-view' scrollY scrollWithAnimation onScroll={onSCroll}>
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
          <Text style={{marginTop: '-15px'}}>Đặt vé ngay</Text>
        </View>

        <View className='vehicle-card'>
          <View className='destination-container'>
            <Picker mode='selector' range={cities_name} onChange={(e) => {setStartCityIndex(e.detail.value)}}>
                  <View className='picker'>
                    <View className='destination-items'>
                      <FaRegCircle  />
                      <Text className=''>Chọn điểm đi:</Text>  
                    </View>
                    <Text className='chosen_destination_text'>{cities_name[start_city_index]}</Text>     
                  </View>
            </Picker>
            <View className='horizontal-seperator'></View>
            <View className='destination-items'>
              <Picker mode='selector' range={cities_name} onChange={(e) => {setEndCityIndex(e.detail.value)}}>
                  <View className='picker'>
                    <View className='destination-items'>
                      <FaMapMarkerAlt  />
                      <Text className=''>Chọn điểm đến:</Text>  
                    </View>
                    <Text className='chosen_destination_text'>{cities_name[end_city_index]}</Text>     
                  </View>
              </Picker>
            </View>
            <View className='vehicle-date'>
              <LuCalendarDays />
              <Text>{day}, ngày 20/03/2024;</Text>
            </View>
            <View>
              <Button className='search-button' onClick={navigateToSearch}>
                <MdOutlineSearch />
                Tìm kiếm</Button>
            </View>
          </View>
        </View>
      </View>
      
      <Text className='typical_trip_text font-R'>Các chuyến xe tiêu biểu</Text>

      <View className='trips-card-container'>
        {trips.map((trip, index) => (
          <TripCard trip={trip} key={index} />
        ))}
      </View>

    </ScrollView>
  )
}

/*

*/