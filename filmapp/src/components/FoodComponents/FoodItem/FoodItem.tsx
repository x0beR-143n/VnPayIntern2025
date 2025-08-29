import { useState } from "react";
import Vnmf from "@vnxjs/vnmf";
import { View, Image, Text, ScrollView } from "@vnxjs/components";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { setFoodCombo } from '../../../store/slices/filmSlice'; 
import { Food } from "../../../interfaces/food";
import { FoodCombo } from "../../../interfaces/payment";
import { formatPrice } from "../../../utils/format";
import './fooditem.scss'

interface FoodItemProps {
    foodData: Food[];
    maxConcession: number;
}

export default function FoodItem ({foodData, maxConcession} : FoodItemProps) {    
    const [count, setCount] = useState<number[]>(new Array(foodData.length).fill(0));
    const dispatch = useDispatch();

    const validateConcession = (arr: number[]) => {
        let sum = 0;
        arr.forEach(c => {
            sum += c;
        })
        if(sum > maxConcession) {
            return false;
        }
        return true;
    }

    const increaseCount = (index) => {  
        const newCount = [...count];
        newCount[index]++;
        const result = validateConcession(newCount);
        if(result) {
            setCount(newCount);
        } else {
            Vnmf.showToast({
                title: "Bạn không thể đặt quá " + maxConcession + " suất combo ăn/uống",
                icon: 'error',
                duration: 1500
            });
        }
    }

    const minusCount = (index) => {
        setCount(prevCount => {
            const newCount = [...prevCount];
            newCount[index]--;
            if(newCount[index] < 0) {
                newCount[index] = 0;
            }
            return newCount;
        });
    }

    const showPrice = (price:number, index:number) => {        
        if(count[index] <= 0) {
            return formatPrice(price);
        }
        return formatPrice(price * count[index]);
    }

    const clearCount = () => {
        setCount(new Array(foodData.length).fill(0));
    }

    const getFoodCombo = () => {
        let result:FoodCombo[] = [];
        for(let i = 0; i<foodData.length; i++) {
            if(count[i] > 0) {
                result.push({
                    foodName: foodData[i].name,
                    count: count[i],
                    price: foodData[i].price
                })
            }
        }
        return result;
    }

    const navigatePayment = () => {
        const foodComboCount = getFoodCombo();
        console.log(foodComboCount);
        dispatch(setFoodCombo(foodComboCount));
        Vnmf.navigateTo({
            url: 'pages/payment/index'
        })
    }

    return (
    <View>
        <ScrollView className='food-container' scrollY scrollWithAnimation>
            {foodData.map((food, index) => (
                <View key={index} className='food-item'>
                    <View className='food-img-wrapper'>
                        <Image src={food.images} className='food-img' />
                    </View>
                    <View className='food-info'>
                        <Text className='food-name'>{food.name}</Text>
                        <Text className='food-des'>Combo bao gồm: {food.description}</Text>
                        <View className='food-price-container'>
                            <Text className='food-price'>{showPrice(food.price, index)} VND</Text>
                            <View className='food-count-container'>
                                {count[index] > 0 && (
                                    <LuMinus className='count-button' size={12} 
                                      onClick={() => {minusCount(index)}}
                                    />
                                )}
                                <Text className='count'>{count[index]}</Text>
                                <LuPlus className='count-button' size={12} onClick={()=>{increaseCount(index)}} />
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
        <View className='food-footer'>
                <View className='reset-button' onClick={clearCount}>Xóa chọn</View>
                <View className='food-continue-button' onClick={navigatePayment}>Tiếp tục</View>
        </View> 
    </View>
    )
}