import { Room } from '../types/rooms';

export const randomizeRooms = (roomsArr: Room[]) => {
  let shuffledExecutiveRooms = [];
  let shuffledStandardRooms = [];

  // Filter to get Executive rooms only
  let executiveRoomArr = roomsArr.filter(
    (room) => room.room_type === 'Executive Room'
  );

  // Filter to get Standard rooms only
  let standardRoomArr = roomsArr.filter(
    (room) => room.room_type === 'Standard Room'
  );

  if (executiveRoomArr.length > 0) {
    while (executiveRoomArr.length !== 0) {
      // Randomize the index based on array length
      let randomIndex = Math.floor(Math.random() * executiveRoomArr.length);

      // Push the shuffled room objs into the shuffledExectiveRooms array
      shuffledExecutiveRooms.push(executiveRoomArr[randomIndex]);

      // Remover the content of the original array
      executiveRoomArr.splice(randomIndex, 1);
    }
    // Let the original array be equal to the shuffled array
    executiveRoomArr = shuffledExecutiveRooms;
  }

  if (standardRoomArr.length > 0) {
    while (standardRoomArr.length !== 0) {
      // Randomize the index based on array length
      let randomIndex = Math.floor(Math.random() * standardRoomArr.length);

      // Push the shuffled room objs into the shuffledStandardRooms array
      shuffledStandardRooms.push(standardRoomArr[randomIndex]);

      // Remover the content of the original array
      standardRoomArr.splice(randomIndex, 1);
    }
    // Let the original array be equal to the shuffled array
    standardRoomArr = shuffledStandardRooms;
  }

  return [executiveRoomArr[0], standardRoomArr[0]];
};
