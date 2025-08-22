import { View, Text, Image } from '@vnxjs/components'
import { useState } from 'react'
import drop_down from '../../../assets/icon/ic_dropdown_down.svg'
import drop_up from '../../../assets/icon/ic_dropdown_up.svg'
import './index.scss'

export default function PaymentTicketInfo() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const toggleOpen = () => {
        let tmp = !isOpen;
        setOpen(tmp);
    }
    const message: string = "Chúng tôi sẽ gửi thông tin vé về SMS, email và mục \"Thông báo\" trên ứng dụng. Để xem thông tin vé đã mua, vui lòng truy cập mục \"Vé của tôi\".";

    return (
        <View className='payment-item-container'>
            <View className='item-header'>
                <Text>THÔNG TIN NHẬN VÉ</Text>
                <Image src={isOpen ? drop_up : drop_down} onClick={toggleOpen} /> 
            </View>
            {isOpen && (
                <View className='ticket-content'>
                    <View>
                       <p className='ticket_description'>{message}</p>
                    </View>
                    <View className='ticket-item'>
                        <Text className='item-description'>Họ và Tên</Text>
                        <Text className='item-detail'>back van the</Text>
                    </View>
                    <View className='ticket-item'>
                        <Text className='item-description'>Số điện thoại</Text>
                        <Text className='item-detail'>0948196260</Text>
                    </View>
                    <View className='ticket-item border-bottom-none'>
                        <Text className='item-description'>E-mail</Text>
                        <Text className='item-detail'>nguyenvana@vnpay.vn</Text>
                    </View>
                </View>
            )}
        </View>
    )
}
