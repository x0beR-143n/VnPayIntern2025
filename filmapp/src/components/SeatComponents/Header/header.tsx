import { View, Image, Text } from "@vnxjs/components";
import { BsThreeDots } from "react-icons/bs";
import { FaXmark  } from "react-icons/fa6";
import back from '../../../assets/icon/ic_back.svg'
import './header.scss'

export default function Header() {
    return (
        <View className='header'>
            <View className='back_n_title'>
                <Image src={back} />
                <Text>AVATAR: DÒNG CHẢY CỦA NƯỚC</Text>
            </View>
            <View className='menu_n_cancel'>
                <BsThreeDots />
                <View className='separator'></View>
                <FaXmark />
            </View>
        </View>
    )
}