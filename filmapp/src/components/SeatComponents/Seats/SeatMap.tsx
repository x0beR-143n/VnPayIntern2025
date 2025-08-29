import { useState } from 'react';
import Vnmf from '@vnxjs/vnmf';
import { View, Text, Image, ScrollView } from '@vnxjs/components';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { setFilmSession } from '../../../store/slices/filmSlice'; 
import './seatmap.scss';
import { Seat, Session, SeatBookingValidation } from '../../../interfaces/seat';
import selected_seat from '../../../assets/icon/ic_seat_selected_path.svg';
import { formatDateTime, formatPrice } from '../../../utils/format';
import { validateBookingSeats } from '../../../utils/seat';
import drop_down from '../../../assets/icon/ic_dropdown_down.svg';
import drop_up from '../../../assets/icon/ic_dropdown_up.svg';
import cancel_seat from '../../../assets/icon/ic_remove_seat.svg'
import SeatComponent from './SeatComponents';

interface SeatMapProp {
  seats: Seat[];
  session: Session;
}

export default function SeatMap({ seats, session }: SeatMapProp) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showSeatEditor, setSeatEditor] = useState(false)
  const [selectNormalSeat, setSelectNormalSeat] = useState(false);
  const [errorSeatIndex, setErrorSeatIndex] = useState<number[]>([]);

  const dispatch = useDispatch();

  const handleSeatChose = (index: number) => {
      let tmp_arr: number[];
      if(selectedSeats.includes(index)) {
        tmp_arr = selectedSeats.filter(num => num !== index);
        setSelectedSeats(tmp_arr);
      } else {
        setSelectedSeats(prev => [...prev, index]);
      }
      const seat:Seat = seats[index];
      if(seat.ticketTypeId === 0) {
        setSelectNormalSeat(true);
      } else {
        setSelectNormalSeat(false);
      }
  }

  const getPrice = (normal_price:number, vip_price:number) => {
    let sum = 0;
    for(let i = 0; i<selectedSeats.length; i++) {
      let seat:Seat = seats[selectedSeats[i]];
      if(seat.ticketTypeId === 0) {
        sum += normal_price
      } else {
        sum += vip_price;
      }
    }
    return sum;
  }

  const clearSeat = (index:number) => {
    let tmp_arr: number[];
    tmp_arr = selectedSeats.filter(num => num !== index);
    setSelectedSeats(tmp_arr);
  }

  const getSelectedSeatID= () => {
    let result:String[] = [];
    selectedSeats.forEach(seat => {
      result.push(seats[seat].code);
    })
    return result;
  }

  const handleContinue = () => {
    let validationResult:SeatBookingValidation = validateBookingSeats(seats, selectedSeats);
    if (validationResult.VALIDATED) {
      // Validate Thành Công
      const seatID = getSelectedSeatID();
      const data = {
        filmName: session.filmName,
        duration: session.duration,
        sessionTime: formatDateTime(session.sessionTime),
        roomName: session.roomName,
        selectedSeats: seatID,
        cinemaName: session.cinemaName,
        ticket_type: selectNormalSeat ? "Thường" : "VI2P",
        price_per_ticket: seats[0].price,
      };
      console.log(data);
      dispatch(setFilmSession(data));
      Vnmf.navigateTo({
        url: 'pages/food/index'
      })
    } else {
      setTimeout(() => {setErrorSeatIndex(validationResult.error_index)}, 2000);
      setTimeout(() => {setErrorSeatIndex([])}, 4000);
      let errorMessage = "Đã xảy ra lỗi khi đặt ghế";
      if(validationResult.GAP_AT_EDGE_SEATS && validationResult.GAP_IN_MIDDLE_SEATS) {
        errorMessage = "Không được bỏ trống ghế ở giữa và ở ngoài cùng. Vui lòng chọn lại!";
      } else {
        if(validationResult.GAP_AT_EDGE_SEATS) {
          errorMessage = "Không được bỏ trống ghế ở ngoài cùng. Vui lòng chọn lại!";
        }
        if(validationResult.GAP_IN_MIDDLE_SEATS) {
          errorMessage = "Không được bỏ trống ghế ở giữa trừ khi có 2 ghế trống trở lên. Vui lòng chọn lại!";
        }
      }
      Vnmf.showToast({
        title: errorMessage,
        icon: 'error',
        duration: 2000
      });
    }
  }

  return (
    <View className='seatmap_main_container'>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={3}
        centerOnInit // căn giữa khi mới khởi tạo
        panning={{ disabled: true }}
        wheel={{ disabled: true }} // tắt zoom bằng chuột, chỉ cho pinch bằng tay
      >
        <TransformComponent>
          <ScrollView className={`seats_container ${
                        !showSeatEditor || selectedSeats.length === 0
                          ? ""
                          : selectedSeats.length <= 3
                          ? "seat-container-max-h-1"
                          : "seat-container-max-h-2"
                      }`}
            scrollY scrollWithAnimation
          > 
            {seats.map((seat, index) => {
              const isSelected = selectedSeats.includes(index);
              const isError = errorSeatIndex.includes(index);

              let disabled = false;
              if (selectedSeats.length !== 0) {
                if (seat.ticketTypeId === 0 && !selectNormalSeat) disabled = true;
                if (seat.ticketTypeId === 1 && selectNormalSeat) disabled = true;
              }

              return (
                <SeatComponent
                  key={index}
                  index={index}
                  seat={seat}
                  isSelected={isSelected}
                  isError={isError}
                  disabled={disabled}
                  onSelect={handleSeatChose}
                  selectedSeatIcon={selected_seat}
                />
              );
            })}
          </ScrollView>
        </TransformComponent>
      </TransformWrapper>
      {selectedSeats.length > 0 && (
        <View className='seats-edit-container'>
          <View className='seat-edit'>
            <View>
              <Text className='seat-edit-text-1'>Danh sách ghế đã chọn ({selectedSeats.length})</Text>
              <Text className='seat-edit-text-2'>Chỉnh sửa vị trí ghế bên trên hoặc tại đây</Text>
            </View>
            <Image src={showSeatEditor ? drop_down:drop_up} onClick={() => {setSeatEditor(!showSeatEditor)}} />
          </View>
          {showSeatEditor && (
            <ScrollView scrollY scrollWithAnimation className='seat-info'>
              {selectedSeats.map((seat_index, index) => {
                const seat:Seat = seats[seat_index];
                let price;
                if(seat.ticketTypeId === 0) price = 91000;
                if(seat.ticketTypeId === 1) price = 96000;
                return (
                  <View key={index} className='seat-detail-edit'>
                    <Text className='seat-detail-text'>Ghế {seat.code}</Text>
                    <Text  className='seat-detail-o-price'>{formatPrice(price)}</Text>
                    <Text  className='seat-detail-price'>{formatPrice(79000)} VND</Text>
                    <Image src={cancel_seat} className='remove-seat-ic' onClick={() => {clearSeat(seat_index)}} />
                  </View>
                )
              })}
            </ScrollView>
          )}
        </View>
      )}
      {selectedSeats.length > 0 ? (
          <View className='seats-info-container'>
            <View className='seat-available-price-container'>
              <Text className='seat-available-text'>Tổng tiền vé</Text>
              <Text className='seat-available-original-price'>{formatPrice(getPrice(91000, 96000))} VND</Text>
              <Text className='seat-available-price'>{formatPrice(getPrice(76000,76000))} VND</Text>
            </View>
            <View className='continue-button enabled-continue-button' onClick={handleContinue}>Tiếp tục</View>
          </View> 
      ) : (
        <View className='empty-seat-container'>
          <Text className='empty-seat-text'>Quý khách vui lòng chọn vị trí ghế ngồi để tiếp tục</Text>
          <View className='continue-button disable-continue-button'>Tiếp tục</View>
        </View>
      )}
    </View>
  );
}
