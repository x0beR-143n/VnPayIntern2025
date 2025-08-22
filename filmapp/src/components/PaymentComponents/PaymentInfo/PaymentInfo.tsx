import { View, Text, Image } from '@vnxjs/components'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import drop_down from '../../../assets/icon/ic_dropdown_down.svg'
import drop_up from '../../../assets/icon/ic_dropdown_up.svg'
import { formatPrice } from '../../../utils/format'
import './index.scss'

export default function PaymentInfo() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isOpenFood, setOpenFood] = useState<boolean>(false);
    const filmData = useSelector((state: RootState) => state.film);

    const toggleOpen = () => {
        let tmp = !isOpen;
        setOpen(tmp);
    }

    const toggleOpenFood = () => {
        let tmp = !isOpenFood;
        setOpenFood(tmp);
    }

    const ticketType = filmData.ticket_type;
    const tickets = filmData.selectedSeats;
    const price = filmData.price_per_ticket;
    const foodCombo = filmData.foodCombo;

    const getFoodComboPrice = () => {
        let sum = 0;
        foodCombo.forEach(food => {
            sum += food.price * food.count;
        })
        return sum;
    }

    const getTotalMoney = () => {
        const total = (price * tickets.length + getFoodComboPrice()) - filmData.discountValue;
        return formatPrice(total);
    }

    return (
        <View className='payment-item-container'>
            <View className='item-header'>
                <Text>THÔNG TIN THANH TOÁN</Text>
            </View>
            <View className='payment-separator'></View>
            <View className='payment-content'>
                <View className='payment-content-header'>
                    <Text className='payment-text'>Vé xem phim ({tickets.length})</Text>
                    <View className='price-header'>
                        <Text>{formatPrice(price * tickets.length)} VND</Text>
                        <Image src={isOpen ? drop_up : drop_down} onClick={toggleOpen} /> 
                    </View>
                </View>
                {isOpen && (
                    <View className='price-detail'>
                        {tickets.map((ticket, index) => (
                            <View key={index} className='payment-ticket-price-container'>
                                <View>
                                    <Text className='payment-ticket-type'>{ticketType}</Text>
                                    <Text className='payment-ticket-name'>{ticket}</Text>
                                </View>
                                <Text className='payment-ticket-price'>{formatPrice(price)} VND</Text>
                            </View>
                        ))}
                    </View>
                )}
                {foodCombo.length > 0 && (
                    <View className='mt-30'>
                        <View className='payment-content-header'>
                            <Text className='payment-text'>Combo đồ ăn ({foodCombo.length})</Text>
                            <View className='price-header'>
                                <Text>{formatPrice(getFoodComboPrice())} VND</Text>
                                <Image src={isOpenFood ? drop_up : drop_down} onClick={toggleOpenFood} /> 
                            </View>
                        </View>
                        {isOpenFood && (
                            <View className='price-detail'>
                                {foodCombo.map((food, index) => (
                                    <View key={index} className='payment-ticket-price-container'>
                                        <View>
                                            <Text className='payment-ticket-type'>SL: {food.count}</Text>
                                            <Text className='payment-ticket-name'>{food.foodName}</Text>
                                        </View>
                                        <Text className='payment-ticket-price'>{formatPrice(food.price * food.count)} VND</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}
                
                <View className='total-price mt-50'>
                    <Text className='total-price-des'>Tổng tiền</Text>
                    <Text className='total-price-detail'>{getTotalMoney()} VND</Text>
                </View>
                <View className='total-price mt-30'>
                    <Text className='total-price-des'>Tổng tiền thanh toán</Text>
                    <View className='vat-section'>
                        <Text className='vat-price'>{getTotalMoney()} VND</Text>
                        <Text className='vat-des'>Đã bao gồm VAT</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
