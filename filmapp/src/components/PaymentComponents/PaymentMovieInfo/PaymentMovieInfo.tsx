import { View, Text, Image } from '@vnxjs/components'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import drop_down from '../../../assets/icon/ic_dropdown_down.svg'
import drop_up from '../../../assets/icon/ic_dropdown_up.svg'
import './index.scss'


export default function PaymentMovieInfo() {
    const filmData = useSelector((state: RootState) => state.film);
    const [isOpen, setOpen] = useState<boolean>(false);
    const toggleOpen = () => {
        let tmp = !isOpen;
        setOpen(tmp);
    }

    return (
        <View className='payment-item-container'>
            <View className='item-header'>
                <Text>THÔNG TIN PHIM</Text>
                <Image src={isOpen ? drop_up : drop_down} onClick={toggleOpen} /> 
            </View>
            {isOpen && (
                <View className='film-content'>
                    <View>
                        <Text className='description'>Tên phim</Text>
                        <Text className='details'>{filmData.filmName}</Text>
                    </View>
                    <View>
                        <Text className='description'>Thời lượng</Text>
                        <Text className='details'>{filmData.duration} phút</Text>
                    </View>
                    <View>
                        <Text className='description'>Suất chiếu</Text>
                        <Text className='details'>{filmData.sessionTime}</Text>
                    </View>
                    <View>
                        <Text className='description'>Phòng chiếu</Text>
                        <Text className='details'>{filmData.roomName}</Text>
                    </View>
                    <View>
                        <Text className='description'>Số ghế</Text>
                        <Text className='details'>{filmData.selectedSeats.toString()}</Text>
                    </View>
                    <View>
                        <Text className='description'>Rạp chiếu</Text>
                        <Text className='details'>{filmData.cinemaName}</Text>
                    </View>
                    <View>
                        <Text className='description'>Địa chỉ</Text>
                        <Text></Text>
                    </View>
                </View>
            )}
        </View>
    )
}