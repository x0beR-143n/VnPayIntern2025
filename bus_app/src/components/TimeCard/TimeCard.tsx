import { View, Text } from '@vnxjs/components'
import './time_card.scss'

interface TimeCardProps {
    time: string;
    start_time_hour: number;
    start_time_mins: number
    arrived_time_hour: number;
    arrived_time_mins: number;
    is_selected: boolean;
    onClick: () => void; 
}

export default function TimeCard({time, start_time_hour, start_time_mins, arrived_time_hour, arrived_time_mins, is_selected, onClick} : TimeCardProps) {
    return (
        <View className={`time-card ${is_selected ? 'selected' : ''}`} onClick={onClick}>
            <View className='time_start_text'>
                <Text>{time}</Text>
            </View>
            <View className='hour_n_minute_text'>
                <Text>
                    {start_time_hour < 10 ? '0' + start_time_hour : start_time_hour}
                    :
                    {start_time_mins < 10 ? '0' + start_time_mins : start_time_mins}
                    -  
                    {arrived_time_hour < 10 ? '0' + arrived_time_hour : arrived_time_hour}
                    :
                    {arrived_time_mins < 10 ? '0' + arrived_time_mins : arrived_time_mins}
                </Text>
            </View>
        </View>
    )
}