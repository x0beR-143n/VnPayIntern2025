import { View, Text } from '@vnxjs/components'
import './movieinfo.scss'
import { formatDateTime } from '../../../utils/format'

interface MovieInfoProps {
    cinemaName: string;
    sessionTime: string;
    roomName: string;
}

export default function MovieInfo({cinemaName, sessionTime, roomName} : MovieInfoProps) {
    return (
        <View className='movie-info'>
          <View className='cinema'>
            <Text className='movie-text-1'>Tên rạp chiếu: </Text>
            <Text className='movie-text-2'>{cinemaName}</Text>
          </View>
          <View className='time-n-room'>
            <View className='time'>
              <Text className='movie-text-1'>Suất chiếu: </Text>
              <Text className='movie-text-2'>{formatDateTime(sessionTime)}</Text>
            </View>
            <View className='room'>
              <Text className='movie-text-1'>Phòng chiếu: </Text>
              <Text className='movie-text-2'>{roomName}</Text>
            </View>
          </View>
        </View>
    )
}