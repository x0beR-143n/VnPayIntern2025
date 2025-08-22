import { useState, useEffect } from 'react'
import Vnmf from '@vnxjs/vnmf';
import { Provider, useDispatch } from 'react-redux';
import { View, Image, Text, Button, ScrollView } from '@vnxjs/components'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PiBusThin } from "react-icons/pi";
import { store } from '../../store/index';
import { setFilter } from '../../store/slices/fitlerSlices';
import close from '../../assets/icon/ic_close.svg'
import TimeCard from '../TimeCard/TimeCard'
import { formatCurrencyVND } from '../../utils/date.util'
import select from '../../assets/icon/ic_select.svg'
import selected from '../../assets/icon/ic_selected.svg'
import { TripFilter, StartTime, TransportType } from '../../interfaces/filter';
import { TripService } from '../../services/TripService';
import './index.scss'


const STORAGE_KEY = "trip_filter_state";
 
const timePeriods = [
    { time: 'Sáng sớm', start_time_hour: 0, start_time_mins: 0, arrived_time_hour: 6, arrived_time_mins: 0 },
    { time: 'Buổi sáng', start_time_hour: 6, start_time_mins: 1, arrived_time_hour: 12, arrived_time_mins: 0 },
    { time: 'Buổi trưa', start_time_hour: 12, start_time_mins: 1, arrived_time_hour: 18, arrived_time_mins: 0 },
    { time: 'Buổi tối', start_time_hour: 18, start_time_mins: 1, arrived_time_hour: 23, arrived_time_mins: 59 },
];

const merchants = [
    { "name": "Tiến Oanh", "id": 56 },
    { "name": "Đà Lạt ơi", "id": 68 },
    { "name": "Điền Linh Limousine", "id": 437 },
    { "name": "Long Vân Limousine", "id": 175 },
    { "name": "Nhật Đoan Limousine", "id": 215 },
    { "name": "Trọng Minh", "id": 307 },
    { "name": "An Anh Limousine", "id": 61 },
    { "name": "Thịnh Thái Limousine", "id": 369 },
    { "name": "Tân Quang Dũng", "id": 1707 },
    { "name": "Phong Phú", "id": 185 },
    { "name": "Nguyễn Kim Limousine", "id": 181 },
    { "name": "Bến Tre Limousine", "id": 374 },
    { "name": "Lạc Hồng (Minh Trí)", "id": 65 },
    { "name": "Nam Phát", "id": 1757 },
    { "name": "Minh Thư", "id": 333 },
    { "name": "Giáp Diệp (Bảo Lộc)", "id": 217 },
    { "name": "Nhà xe Phương Trang", "id": 27 }
];

const transports = [
    TransportType.LIMOUSINE,
    TransportType.SLEEPER,
    TransportType.NORMAL
];

const transportLabels: Record<TransportType, string> = {
    [TransportType.LIMOUSINE]: 'Limousine',
    [TransportType.SLEEPER]: 'Giường nằm',
    [TransportType.NORMAL]: 'Thường'
};

function FilterContent() {

    const [selected_hour, setSelectedHour] = useState<boolean[]>(new Array(4).fill(false));
    const [priceRange, setPriceRange] = useState<number | number[]>([100000, 900000]);
    const [selected_merchant, setSelectedMer] = useState<boolean[]>(new Array(merchants.length).fill(false));
    const [selected_transport, setSelectedTransport] = useState<boolean[]>(new Array(transports.length).fill(false));
    const [numberOfOptions, setNummberOptions] = useState(-1);

    const [changeData, setChangData] = useState(true);

    //get state from session storage
    useEffect(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.selected_hour) setSelectedHour(parsed.selected_hour);
                if (parsed.min_price !== undefined && parsed.max_price !== undefined) {
                    setPriceRange([parsed.min_price, parsed.max_price]);
                }
                if (parsed.selected_merchant) setSelectedMer(parsed.selected_merchant);
                if (parsed.selected_transport) setSelectedTransport(parsed.selected_transport);
                setChangData(!changeData)
            } catch (e) {
                console.error("Error parsing saved filter", e);
            }
        }
    }, []);
    
    useEffect(() => {
        const fetchTripsLength = async () => {
            const filterData = getFilterData();
            const res = await TripService.getFilterLength(filterData);
            setNummberOptions(res);
        }
        fetchTripsLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeData])


    const saveFilterToStorage = (hour, min_price, max_price, merchant, transport, ) => {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                selected_hour: hour,
                max_price: max_price,
                min_price: min_price,
                selected_merchant: merchant,
                selected_transport: transport,
            })
        );
    };

    const handleClickHourCard = (index: number) => {
        let tmp_arr = [...selected_hour];        
        tmp_arr[index] = !tmp_arr[index];
        setSelectedHour(tmp_arr);
        saveFilterToStorage(tmp_arr, priceRange[0], priceRange[1] , selected_merchant, selected_transport);
        setChangData(!changeData);
    };

    const handleClickMerchantCard = (index: number) => {
        let tmp_arr = [...selected_merchant];
        tmp_arr[index] = !tmp_arr[index];
        setSelectedMer(tmp_arr);
        saveFilterToStorage(selected_hour, priceRange[0], priceRange[1] , tmp_arr, selected_transport);
        setChangData(!changeData);
    };

    const handleClickTransportCard = (index: number) => {
        let tmp_arr = [...selected_transport];
        tmp_arr[index] = !tmp_arr[index];
        setSelectedTransport(tmp_arr);
        saveFilterToStorage(selected_hour, priceRange[0], priceRange[1] , selected_merchant, tmp_arr);
        setChangData(!changeData);
    };

    const clearFilter = () => {
        const mer_arr = new Array(merchants.length).fill(false);
        const trans_arr = new Array(transports.length).fill(false);
        const time_arr = new Array(timePeriods.length).fill(false);

        setPriceRange([100000, 900000])
        setSelectedHour(time_arr);
        setSelectedMer(mer_arr);
        setSelectedTransport(trans_arr);

        sessionStorage.removeItem(STORAGE_KEY);

        setChangData(!changeData);

    };

    const navigate_to_search = () => {
        Vnmf.navigateBack({ delta: 1 });
    };

    const dispatch = useDispatch();

    const getFilterData = () => {
        let current_min_price = priceRange[0];
        let current_max_price = priceRange[1];
        let start_arr: StartTime[] = [];
        selected_hour.forEach((hour, index) => {
            if (hour) start_arr.push(timePeriods[index]);
        });
        let merchant_id_arr: number[] = [];
        selected_merchant.forEach((merchant, index) => {
            if (merchant) merchant_id_arr.push(merchants[index].id);
        });
        let transport_arr: TransportType[] = [];
        selected_transport.forEach((transport, index) => {
            if (transport) transport_arr.push(transports[index]);
        });
        const filterData: TripFilter = {
            max_price: current_max_price,
            min_price: current_min_price,
            start_time: start_arr.length > 0 ? start_arr : undefined,
            merchants: merchant_id_arr.length > 0 ? merchant_id_arr : undefined,
            transports: transport_arr.length > 0 ? transport_arr : undefined
        };
        return filterData;
    }

    const handleApply = () => {
        const filterData = getFilterData();
        console.log(filterData);
        dispatch(setFilter(filterData))
        Vnmf.navigateBack({ delta: 1 });
    };

    return (
        <View>
            <View className='filter-header'>
                <Image src={close} onClick={navigate_to_search} />
                <Text>Lọc chuyến xe</Text>
            </View>
            <ScrollView className='filter-body' scrollY scrollWithAnimation>
                <View className='filter-body-items'>
                    <Text className='filter-title-text'>Thời gian khởi hành</Text>
                    <View className='time-card-holder'>
                        {timePeriods.map((period, index) => (
                            <TimeCard
                              key={index}
                              time={period.time}
                              start_time_hour={period.start_time_hour}
                              start_time_mins={period.start_time_mins}
                              arrived_time_hour={period.arrived_time_hour}
                              arrived_time_mins={period.arrived_time_mins}
                              is_selected={selected_hour[index]}
                              onClick={() => handleClickHourCard(index)}
                            />
                        ))}
                    </View>
                </View>
                <View className='filter-body-items'>
                    <Text className='filter-title-text'>Khoảng giá</Text>
                    <Text className='max_price'>Lựa chọn khoảng giá của bạn: <Text>{formatCurrencyVND(priceRange[0])}</Text> - <Text>{formatCurrencyVND(priceRange[1])}</Text></Text>
                    <Slider
                      range
                      min={100000}
                      max={900000}
                      value={priceRange}
                      onChange={(val) => {
                        setPriceRange(val);
                        saveFilterToStorage(selected_hour, val[0], val[1], selected_merchant, selected_transport);
                        setChangData(!changeData);
                      }}
                    />
                </View>
                <View className='filter-body-items'>
                    <Text className='filter-title-text'>Nhà xe</Text>
                    <View className='filter-transport-card'>
                        {merchants.map((merchant, index) => (
                            <View key={index} className='filter-transport-card-item'
                              onClick={() => { handleClickMerchantCard(index) }}
                            >
                                <View className='filter-transport-item-name'>
                                    <PiBusThin />
                                    <Text>{merchant.name}</Text>
                                </View>
                                {selected_merchant[index] ? (
                                    <Image src={selected} className='select' />
                                ) : (
                                    <Image src={select} className='select' />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <View className='filter-body-items'>
                    <Text className='filter-title-text'>Loại xe</Text>
                    <View className='filter-transport-card'>
                        {transports.map((transport, index) => (
                            <View key={index} className='filter-transport-card-item'
                              onClick={() => { handleClickTransportCard(index) }}
                            >
                                <View className='filter-transport-item-name'>
                                    <PiBusThin />
                                    <Text>{transportLabels[transport]}</Text>
                                </View>
                                {selected_transport[index] ? (
                                    <Image src={selected} className='select' />
                                ) : (
                                    <Image src={select} className='select' />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View className='filter-footer'>
                    <View>
                        <Button className='clear_filter' onClick={clearFilter}>
                            Xóa lọc
                        </Button>
                    </View>
                    <View>
                        <Button className='apply_button' onClick={handleApply}>
                            Áp dụng {numberOfOptions >= 0 ? ' (' + numberOfOptions + ')' : ''}
                        </Button>
                    </View>
                </View>
        </View>
    )
}

export default function Filter() {
  return (
    <Provider store={store}>
      <FilterContent />
    </Provider>
  );
}