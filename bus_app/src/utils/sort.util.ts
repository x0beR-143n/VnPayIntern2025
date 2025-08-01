import { Trip } from "../interfaces/trip";

const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

const sortTripsByCriteria = (trips: Trip[], criteria: string, ascending = true): Trip[] => {
  const sorted = [...trips].sort((a, b) => {
    let valA: number | string = 0;
    let valB: number | string = 0;

    switch (criteria) {
      case 'time':
        valA = parseTimeToMinutes(a.departure_time);
        valB = parseTimeToMinutes(b.departure_time);
        break;
      case 'price':
        valA = a.fare_amount;
        valB = b.fare_amount;
        break;
      case 'rating':
        valA = a.transport_information.rating;
        valB = b.transport_information.rating;
        break;
    }

    const result = valA < valB ? -1 : valA > valB ? 1 : 0;
    return ascending ? result : -result;
  });

  return sorted;
};

export { sortTripsByCriteria };
