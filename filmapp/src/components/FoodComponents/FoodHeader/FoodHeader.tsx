import Vnmf from "@vnxjs/vnmf";
import { View, Image, Text } from "@vnxjs/components";
import { BsThreeDots } from "react-icons/bs";
import { FaXmark  } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setFoodCombo } from '../../../store/slices/filmSlice'; 
import back from '../../../assets/icon/ic_back.svg'
import './foodheader.scss'

export default function FoodHeader () {
    const dispatch = useDispatch();

    const navigateBack = () => {
        Vnmf.navigateBack({
            delta: 1
        })
    }

    const navigatePayment = () => {
        dispatch(setFoodCombo([]));
        Vnmf.navigateTo({
            url: "pages/payment/index",
        })
    }

    return (
        <View className='food_header'>
            <View className='food_back_n_title'>
                <Image src={back} onClick={navigateBack} />
                <Text>Chọn đồ ăn & uống</Text>
            </View>
            <Text className='food_skip' onClick={navigatePayment}>Bỏ qua</Text>
            <View className='food_menu_n_cancel'>
                <BsThreeDots />
                <View className='food_separator'></View>
                <FaXmark />
            </View>
        </View>
    )
}