import { memo } from "react";
import { View, Text, Image } from "@vnxjs/components";

interface SeatProps {
  index: number;
  seat: any;
  isSelected: boolean;
  isError: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
  selectedSeatIcon: string;
}

const SeatComponent = memo(({ index, seat, isSelected, isError, disabled, onSelect, selectedSeatIcon }: SeatProps) => {
  if (!seat.code) {
    return (
      <View key={index} className='seat-aisle seat-wrapper'>
        <Text>A01</Text>
      </View>
    );
  }

  if (disabled) {
    return (
      <View
        key={index}
        className='seat-wrapper'
        style={`background-color: ${seat.color}; opacity: 0.3`}
      >
        <Text>{seat.code}</Text>
      </View>
    );
  }

  return (
    <View
      key={index}
      className={`seat-wrapper ${isSelected ? "seat-selected" : ""} ${
        isError ? "seat-bounce" : ""
      }`}
      style={!isSelected ? `background-color: ${seat.color}` : ""}
      onClick={() => onSelect(index)}
    >
      {isSelected ? (
        <Image src={selectedSeatIcon} />
      ) : (
        <Text>{seat.code}</Text>
      )}
    </View>
  );
});

export default SeatComponent;
