import { useEffect, useState } from "react";
import Vnmf, {getCurrentInstance} from "@vnxjs/vnmf";
import { View, Text, Image, ScrollView } from "@vnxjs/components";
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
import { TripFilter } from "../../interfaces/filter";
//import sad from '../../assets/img/sad.png';

export default function Index() {    
    // biến lọc nhận từ params
    const [filterData, setFilterData] = useState<TripFilter>({
        max_price: 0,
        start_time: [],
        merchants: [],
        transports: []
    });
    
    // lấy ngày hiện tại và + thêm 1 tháng vào
    const day_of_week_str = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const days: number[] = [];
    const days_str: string[] = [];

    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    let current = new Date(today);
    while (current <= oneMonthLater) {
        days.push(current.getDate());
        days_str.push(day_of_week_str[current.getDay()]);
        current.setDate(current.getDate() + 1);
    }

    // khai báo các biến liên quan đến sắp xếp và hiển thị trips
    const [scrollTop, setScrollTop] = useState(0);
    const [selected_date, setSelectedDate] = useState(3);
    const [selected_button, setSelectedButton] = useState(0);
    const [trips, setTrips] = useState<Trip[]>([])
    const [page, setPage] = useState(1);
    const [canGetNewData, setCanGetNewData] = useState(true);
    const [criteria, setCriteria] = useState(() => {
        let tmp_criteria = sessionStorage.getItem('criteria');
        if(!tmp_criteria) {
            return '';
        }
        if(tmp_criteria === 'time') {
            setSelectedButton(1)
        }
        if(tmp_criteria === 'price') {
            setSelectedButton(2)
        }
        if(tmp_criteria === 'rating') {
            setSelectedButton(3)
        }
        return tmp_criteria;
    });

    const [ascending, setAscending] = useState(() => {
        const asc = sessionStorage.getItem('ascending');
        return asc !== null ? asc === 'true' : true;
    });

    useEffect(() => {
        sessionStorage.setItem('criteria', criteria);
        sessionStorage.setItem('ascending', ascending.toString());
    }, [criteria, ascending]);

    // lấy params từ url để set cho filterData
    useEffect(() => {
        const router = getCurrentInstance().router;
        const encoded = router?.params?.filter;
        if (encoded) {
        try {
            const decoded = decodeURIComponent(encoded);
            const parsed: TripFilter = JSON.parse(decoded);
            console.log('✅ TripFilter received:', parsed);
            setFilterData(parsed);
        } catch (err) {
            console.error('❌ Failed to parse filter', err);
        }
        }
    }, [])

    // lấy trips với filterData và criteria và ascending
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
            setScrollTop(0)
          } else {
            console.error('Failed to fetch trips:', res.message)
          }
        }
        
        fetchTrips()
    }, [filterData, criteria, ascending])
    
    // lấy dữ liệu mới với page ++
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

    // chuyển sang trang filter
    const navigateToFilter = () => {
        Vnmf.navigateTo({
            url: 'pages/filter/index',
        })
    }

    // chuyển sang trang home
    const navigateToHome = () => {
        Vnmf.navigateTo({
            url: 'pages/index/index'
        })
    }

    // Thay đổi tiêu chí sắp xếp
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
    
    // hiển thị ngày được chọn
    const setDateAction = (index: number) => {
        setSelectedDate(index);
    }

    // kiểm tra để lấy dữ liệu mới
    const onSCroll = (e) => {
        let max_height = e.detail.scrollHeight;
        let current_height = e.detail.scrollTop;
        setScrollTop(current_height);
        if(max_height - current_height <= 2500) {
            if(canGetNewData) {
                setCanGetNewData(false);
                setCanGetNewData(false);
                fetchNewData();
            }
        }
    }

    // xóa filter
    const clearFilter = () => {
        showToast(true);
        sessionStorage.clear();
        Vnmf.redirectTo({
            url: 'pages/search/index'
        })
    }

    // hiển thị toast mà thôi
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

    return (
       <View>
        <View className='header'>
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
                    <DateCard key={index} day={day} month={today.getMonth() + 1} day_of_week={days_str[index]} is_selected={index === selected_date} onClick={() => setDateAction(index)} />    
                ))}
            </ScrollView>  
            <View className='button_container'>
                <View>
                    <View 
                      onClick={() => setButtonAction(1, 'time')}
                      className={selected_button === 1 ? 'chosen_button sort_button' : 'unchosen_button sort_button'}
                    >
                        Giờ chạy
                        {selected_button === 1 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </View>
                </View>
                <View>
                    <View
                      onClick={() => setButtonAction(2, 'price')}
                      className={selected_button === 2 ? 'chosen_button sort_button' : 'unchosen_button sort_button'}
                    >
                        Giá vé
                        {selected_button === 2 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </View>
                </View>
                <View>
                    <View
                      onClick={() => setButtonAction(3, 'rating')}
                      className={selected_button === 3 ? 'chosen_button sort_button' : 'unchosen_button sort_button'}
                    >
                        Đánh giá
                        {selected_button === 3 &&
                        (ascending ? (
                            <MdOutlineKeyboardArrowUp />
                        ) : (
                            <MdOutlineKeyboardArrowDown />
                        ))}
                    </View>                
                </View>
                <View>
                    <View
                      onClick={() => navigateToFilter()}
                      className='filter_button'
                    >
                        Lọc
                    {selected_button === 4 ? (
                         <Image src={filter_icon_white} className='filter-ic' />
                    ) : (
                         <Image src={filter_icon_gray} className='filter-ic' />
                    )}
                        
                    </View>
                </View>
            </View>     
        </View>
            <ScrollView className='scroll-view' scrollY scrollWithAnimation onScroll={onSCroll} scrollTop={scrollTop}>
                <View className='trips-card-container'>
                    {trips.map((trip, index) => (
                            <TripCard trip={trip} key={index} />
                    ))}
                </View>     
            </ScrollView>
        </View>
    )
}