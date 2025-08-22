import { useState } from 'react'
import { View , Text, Image } from '@vnxjs/components'
import PaymentMovieInfo from '../PaymentMovieInfo/PaymentMovieInfo'
import PaymentTicketInfo from '../PaymentTicketInfo/PaymentTicketInfo'
import PaymentInfo from '../PaymentInfo/PaymentInfo'
import Promotion from '../Promotion/Promotion'
import checked_img from '../../../assets/icon/ic_term_checked.svg'
import unchecked_img from '../../../assets/icon/ic_multi_unselect.svg'
import './paymentitem.scss'

export default function PaymentItems() {
    const [confirmedPolicy, setPolicy] = useState(false);

    return (
        <View className='payment-item-main-container'>
            <PaymentMovieInfo />
            <PaymentTicketInfo />
            <PaymentInfo />
            <Promotion />
            <View className='payment-item-container'>
                <View className='confirm-n-checkbox'>
                    <Image src={confirmedPolicy ? checked_img : unchecked_img} 
                      onClick={() => {setPolicy(!confirmedPolicy)}} 
                      className='check_img'
                    />
                    <Text className='confirm-text'>Tôi đã xác nhận các thông tin tên đã chính xác và đồng ý với các
                        <Text className='policy-text'> điều khoản và chính sách</Text>
                    </Text>
                </View>
            </View>
            <View className='payment-item-container'>
                <View className={`book-button ${confirmedPolicy ? 'enabled-continue-button' : 'disable-continue-button'}`}>Đặt vé</View>
            </View>
        </View>
    )
}