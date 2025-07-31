import { View, Text } from '@vnxjs/components';
import './datecard.scss'

interface DateCardProps{
    day: number;
    month: number;
    day_of_week: string;
    is_selected: boolean;
    onClick: () => void; 
}

export default function DateCard({ day, month, day_of_week, is_selected, onClick  }: DateCardProps) {
    if(is_selected) {
        return (
            <View className='date_card_selected'>
                <Text className='day_of_week'>{day_of_week}</Text>
                <Text className='day_n_month'>{day}/{month}</Text>
            </View>
        ) 
    }
    else {
        return (
            <View className='date_card' onClick={onClick}>
                <Text className='day_of_week'>{day_of_week}</Text>
                <Text className='day_n_month_gray'>{day}/{month}</Text>
            </View>
        )  
    }
}