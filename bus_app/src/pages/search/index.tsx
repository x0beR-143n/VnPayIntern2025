import { useEffect, useState } from "react";
import Vnmf from "@vnxjs/vnmf";
import { View, Text, Image, ScrollView, Button } from "@vnxjs/components";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
//import local
import back_icon from '../../assets/icon/ic_back.svg'
import filter_icon_gray from '../../assets/icon/ic_filter_grey.svg'
import filter_icon_white from '../../assets/icon/ic_filter_white.svg'
import DateCard from "../../components/DateCard/DateCard";
import { Trip } from "../../interfaces/trip";
import { TripService } from "../../services/TripService";
import TripCard from "../../components/TripCard/TripCard";
import './index.scss'
import Filter from "../../components/filter";
import { TripFilter } from "../../interfaces/filter";
import sad from '../../assets/img/sad.png';

export default function Index() {    
    const [renderSearch, setRenderSearch] = useState(true);
    const [filterData, setFilterData] = useState<TripFilter>({
        max_price: 0,
        start_time: [],
        merchants: [],
        transports: []
    });
    
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
    const [page, setPage] = useState(1);
    const [canGetNewData, setCanGetNewData] = useState(true);
    const [criteria, setCriteria] = useState('');
    const [ascending, setAscending] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
          const res = await TripService.getTripsWithFilter(1, 15, filterData, criteria, ascending);
          if (res.success) {
            if(res.data.length > 0) {
                setPage(2);
            } else {
                showToast(false);
            }
            setTrips(res.data);
          } else {
            console.error('Failed to fetch trips:', res.message)
          }
        }
        
        fetchTrips()
    }, [filterData, criteria, ascending])
    
    const fetchNewData = async () => {
      const res = await TripService.getTripsWithFilter(page, 15, filterData, criteria, ascending);
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

    const navigateToFilter = () => {
        setRenderSearch(false);
        setSelectedButton(4);
    }

    const navigateToHome = () => {
        Vnmf.navigateBack({
            delta: 1
        })
    }

    const setButtonAction = (index:number, current_criteria: string) => {
        if(index === selected_button) {
            const newAscending = !ascending;
            setAscending(newAscending);
        } else {
            setSelectedButton(index); // Cập nhật nút được chọn
            setCriteria(current_criteria); // Cập nhật tiêu chí sắp xếp
            setAscending(true); 
        }
    }
    
    const setDateAction = (index: number) => {
        setSelectedDate(index);
    }

    const onSCroll = (e) => {
        let max_height = e.detail.scrollHeight;
        let current_height = e.detail.scrollTop;
        if(max_height - current_height <= 2500) {
            if(canGetNewData) {
                setCanGetNewData(false);
                setCanGetNewData(false);
                fetchNewData();
            }
        }
    }

    const clearFilter = () => {
        const newFilterData = {
            max_price: 0,
            start_time: [],
            merchants: [],
            transports: []  
        }
        setFilterData(newFilterData)
        showToast(true)
    }

    const showToast = (success: boolean) => {
        if(success) {
            Vnmf.showToast({
                title: 'Xóa lọc thành công!',
                icon: 'success', 
                duration: 3000  
            })
        } else {
            Vnmf.showToast({
                title: 'Không tìm thấy chuyến đi nào phù hợp!',
                icon: 'error', 
                duration: 3000
            })
        }
        
    }

    if(renderSearch) { 
    return (
        <ScrollView className='scroll-view' scrollY scrollWithAnimation onScroll={onSCroll}>
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
                    <Text onClick={clearFilter}>Xóa lọc</Text>
                </View>
            </View> 
            <ScrollView scrollX className='day_picker_container'>
                {days.map((day, index) => (
                    <DateCard key={index} day={day} month={3} day_of_week={days_str[index]} is_selected={index === selected_date} onClick={() => setDateAction(index)} />    
                ))}
            </ScrollView>  
            <View className='button_container'>
                <View>
                    <Button
                      onClick={() => setButtonAction(1, 'time')}
                      className={selected_button === 1 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Giờ chạy
                        {selected_button === 1 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </Button>
                </View>
                <View>
                    <Button
                      onClick={() => setButtonAction(2, 'price')}
                      className={selected_button === 2 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Giá vé
                        {selected_button === 2 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </Button>
                </View>
                <View>
                    <Button
                      onClick={() => setButtonAction(3, 'rating')}
                      className={selected_button === 3 ? 'chosen_button' : 'unchosen_button'}
                    >
                        Đánh giá
                        {selected_button === 3 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </Button>                
                </View>
                <View>
                    <Button
                      onClick={() => navigateToFilter()}
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
                {trips.length === 0 ? (
                    <Text className='empty-trips'>Hiện chưa có chuyến xe nào phù hợp với bạn
                        <Image src={sad} className='sad-pic' />
                    </Text>
                ) : (
                    trips.map((trip, index) => (
                    <TripCard trip={trip} key={index} />
                    ))
                )}
            </View>     
        </ScrollView>
    )} else {
        return(
            <Filter setDisplaySearch={setRenderSearch} setFilter={setFilterData} setCriteria={setCriteria} />
        )
    }
}