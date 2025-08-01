import { useState } from 'react'
import { View, Image, Text, Slider, Button } from '@vnxjs/components'
import { PiBusThin } from "react-icons/pi";
import close from '../../assets/icon/ic_close.svg'
import TimeCard from '../TimeCard/TimeCard'
import { formatCurrencyVND } from '../../utils/date.util'
import select from '../../assets/icon/ic_select.svg'
import selected from '../../assets/icon/ic_selected.svg'
import { TripFilter, StartTime, TransportType } from '../../interfaces/filter';
import './index.scss'

const timePeriods = [
    { time: 'Sáng sớm', start_time_hour: 0, start_time_mins: 0, arrived_time_hour: 6, arrived_time_mins: 0 },
    { time: 'Buổi sáng', start_time_hour: 6, start_time_mins: 1, arrived_time_hour: 12, arrived_time_mins: 0 },
    { time: 'Buổi trưa', start_time_hour: 12, start_time_mins: 1, arrived_time_hour: 18, arrived_time_mins: 0 },
    { time: 'Buổi tối', start_time_hour: 18, start_time_mins: 1, arrived_time_hour: 23, arrived_time_mins: 59 },
];

const merchants = [
    {
        "name": "Tiến Oanh",
        "id": 56
    },
    {
        "name": "Đà Lạt ơi",
        "id": 68
    },
    {
        "name": "Điền Linh Limousine",
        "id": 437
    },
    {
        "name": "Long Vân Limousine",
        "id": 175
    },
    {
        "name": "Nhật Đoan Limousine",
        "id": 215
    },
    {
        "name": "Trọng Minh",
        "id": 307
    },
    {
        "name": "An Anh Limousine",
        "id": 61
    },
    {
        "name": "Thịnh Thái Limousine",
        "id": 369
    },
    {
        "name": "Tân Quang Dũng",
        "id": 1707
    },
    {
        "name": "Phong Phú",
        "id": 185
    },
    {
        "name": "Nguyễn Kim Limousine",
        "id": 181
    },
    {
        "name": "Bến Tre Limousine",
        "id": 374
    },
    {
        "name": "Lạc Hồng (Minh Trí)",
        "id": 65
    },
    {
        "name": "Nam Phát",
        "id": 1757
    },
    {
        "name": "Minh Thư",
        "id": 333
    },
    {
        "name": "Giáp Diệp (Bảo Lộc)",
        "id": 217
    },
    {
        "name": "Nhà xe Phương Trang",
        "id": 27
    }
]

const transports = [
    TransportType.LIMOUSINE,
    TransportType.SLEEPER,
    TransportType.NORMAL
]

const transportLabels: Record<TransportType, string> = {
  [TransportType.LIMOUSINE]: 'Limousine',
  [TransportType.SLEEPER]: 'Giường nằm',
  [TransportType.NORMAL]: 'Thường'
};

interface FilterProp {
  setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter: React.Dispatch<React.SetStateAction<TripFilter>>;
  setCriteria: React.Dispatch<React.SetStateAction<string>>
}

export default function Filter({setDisplaySearch, setFilter, setCriteria} : FilterProp) {

    const [selected_hour, setSelectedHour] = useState<boolean[]>(new Array(4).fill(false));
    const [max_price, setMaxPrice] = useState(100000);
    const [selected_merchant, setSelectedMer] = useState<boolean[]>(new Array(merchants.length).fill(false));
    const [selected_transport, setSelectedTransport] = useState<boolean[]>(new Array(transports.length).fill(false));

    const handleClickHourCard = (index:number) => {
        let tmp_arr = [...selected_hour]; ;
        tmp_arr[index] = !tmp_arr[index];
        setSelectedHour(tmp_arr);
    }

    const handleClickMerchantCard = (index:number) => {
        let tmp_arr = [...selected_merchant]; ;
        tmp_arr[index] = !tmp_arr[index];
        setSelectedMer(tmp_arr);
    }

    const handleClickTransportCard = (index:number) => {
        let tmp_arr = [...selected_transport]; ;
        tmp_arr[index] = !tmp_arr[index];
        setSelectedTransport(tmp_arr);
    }

    const handleMaxPriceChange= (e) => {
        setMaxPrice(e.detail.value);
    }

    const clearFilter = () => {
        setMaxPrice(100000)
        let mer_arr = new Array(merchants.length).fill(false);
        let trans_arr = new Array(transports.length).fill(false);
        let time_arr = new Array(timePeriods.length).fill(false);
        setSelectedHour(time_arr);
        setSelectedMer(mer_arr);
        setSelectedTransport(trans_arr);
    }

    const navigate_to_search = () => {
        setDisplaySearch(true);
    }

    const handleApply = () => {
        let current_max_price = max_price;
        let start_arr: StartTime[] = [];
        selected_hour.forEach((hour, index) => {
            if(hour) {
                start_arr.push(timePeriods[index]);
            }
        })
        let merchant_id_arr:number[]  = [];
        selected_merchant.forEach((merchant, index) => {
            if(merchant) {
                merchant_id_arr.push(merchants[index].id);
            }
        })
        let transport_arr:TransportType[] = [];
        selected_transport.forEach((transport, index) => {
            if(transport) {
                transport_arr.push(transports[index]);
            }
        })
        const filterData: TripFilter = {
            max_price: current_max_price === 100000 ? undefined : current_max_price,
            start_time: start_arr.length > 0 ? start_arr : undefined,
            merchants: merchant_id_arr.length > 0 ? merchant_id_arr : undefined,
            transports: transport_arr.length > 0 ? transport_arr : undefined
        };
        console.log(filterData);
        setFilter(filterData);
        setCriteria('');
        setDisplaySearch(true)
    }

    return (
        <View>
            <View className='filter-header'> 
                <Image src={close} onClick={navigate_to_search} />
                <Text>Lọc chuyến xe</Text>
            </View>
            <View className='filter-body'>
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
                    <Text className='max_price'>Lựa chọn khoảng giá của bạn: 100,000đ - <Text>{formatCurrencyVND(max_price)}</Text></Text>
                    <Slider step={100000} min={100000} className='slider'
                      max={3000000} blockSize={22} handleSize='2' activeColor='#3556d8' blockColor='#3556d8'
                      onChanging={handleMaxPriceChange} value={max_price}
                    />    
                </View>
                <View className='filter-body-items'>
                    <Text className='filter-title-text'>Nhà xe</Text>
                    <View className='filter-transport-card'>
                        {merchants.map((merchant, index) => (
                            <View key={index} className='filter-transport-card-item' 
                              onClick={() => {handleClickMerchantCard(index)}}
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
                              onClick={() => {handleClickTransportCard(index)}}
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
                <View className='filter-footer'>
                    <View>
                        <Button className='clear_filter' onClick={clearFilter}>
                            Xóa lọc
                        </Button>
                    </View>
                    <View>
                        <Button className='apply_button' onClick={handleApply}>
                            Áp dụng 
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}