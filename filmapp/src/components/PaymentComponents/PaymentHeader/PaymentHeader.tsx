import { View, Image, Text } from "@vnxjs/components";
import Vnmf from "@vnxjs/vnmf";
import { BsThreeDots } from "react-icons/bs";
import { FaXmark  } from "react-icons/fa6";
import back from '../../../assets/icon/ic_back.svg'
import './paymentheader.scss'

export default function PaymentHeader() {
    const navigateFood = () => {
        Vnmf.navigateBack({
            delta: 1,
        })
    }

    return (
        <View className='header'>
            <View className='back_n_title'>
                <Image src={back} onClick={navigateFood} />
                <Text>Thanh toán vé xem phim</Text>
            </View>
            <View className='menu_n_cancel'>
                <BsThreeDots />
                <View className='separator'></View>
                <FaXmark />
            </View>
        </View>        
    )
}