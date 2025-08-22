import React from 'react';
import { View, Text } from '@vnxjs/components';
import { TicketType } from '../../../interfaces/seat';
import { formatPrice } from '../../../utils/format';
import './ticket_types.scss';

interface TicketTypesProps {
  ticketTypes: TicketType[];
}

const TicketTypes: React.FC<TicketTypesProps> = ({ ticketTypes }) => {
  return (
    <View className='ticket-types-wrapper'>
      {ticketTypes.map((ticket, index) => (
        <View className='ticket-info' key={index}>
           <View className='ticket-color' style={`background-color: ${ticket.colorCode}`}></View>
           <View className='ticket-price-container'>
             <Text className='ticket-name'>{ticket.name}</Text>
             <Text className='ticket-original-price'>{formatPrice(ticket.originalPrice)}</Text>
             <Text className='ticket-price'>{formatPrice(ticket.price)}</Text>
           </View>
        </View>
      ))}
    </View>
  );
};

export default TicketTypes;
