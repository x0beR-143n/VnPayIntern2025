import { useState } from 'react';
import { View, Button, Text, Image, ScrollView } from '@vnxjs/components';
import './seatmap.scss';
import { Seat } from '../../interfaces/seat';
import selected_seat from '../../assets/icon/ic_seat_selected_path.svg';

interface SeatMapProp {
  seats: Seat[];
}

export default function SeatMap({ seats }: SeatMapProp) {
  const [selectedSeats, setSelectedSeats] = useState<boolean[]>(new Array(seats.length).fill(false));

  const handleSeatChose = (index: number) => {
    const tmp_arr = [... selectedSeats];
    tmp_arr[index] = !tmp_arr[index];
    setSelectedSeats(tmp_arr);
  }

  return (
    <View>
      <View className='seats_container'>
        {seats.map((seat, index) => {
          if (!seat.code) {
            // code rỗng => khoảng trống
            return (
              <View
                key={index}
                className='seat-aisle seat-wrapper'
              >
                  <Text>A001</Text>
              </View>
            )
          }

          const isSelected = selectedSeats[index];

          return (
            <View
              key={index}
              className={`seat-wrapper ${isSelected ? 'seat-selected' : ''}`}
              style={!isSelected ? `background-color: ${seat.color}` : ''}
              onClick={() => handleSeatChose(index)}
            >
              {isSelected ? (
                <Image src={selected_seat} />
              ) : (
                <Text>{seat.code}</Text>
              )}
            </View>
          );
        })}
      </View>
      <ScrollView scrollY className='seats-info-container'>
        <View className='empty-seat-container'>
          <Text className='empty-seat-text'>Quý khách vui lòng chọn vị trí ghế ngồi để tiếp tục</Text>
          <View className='continue-button disable-continue-button'>Tiếp tục</View>
        </View>
      </ScrollView>
    </View>
  );
}
