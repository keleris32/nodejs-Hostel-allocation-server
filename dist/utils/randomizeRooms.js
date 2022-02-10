"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeRooms = void 0;
const randomizeRooms = (roomsArr) => {
    let shuffledExecutiveRooms = [];
    let shuffledStandardRooms = [];
    let executiveRoomArr = roomsArr.filter((room) => room.room_type === 'Executive Room');
    let standardRoomArr = roomsArr.filter((room) => room.room_type === 'Standard Room');
    if (executiveRoomArr.length > 0) {
        while (executiveRoomArr.length !== 0) {
            let randomIndex = Math.floor(Math.random() * executiveRoomArr.length);
            shuffledExecutiveRooms.push(executiveRoomArr[randomIndex]);
            executiveRoomArr.splice(randomIndex, 1);
        }
        executiveRoomArr = shuffledExecutiveRooms;
    }
    if (standardRoomArr.length > 0) {
        while (standardRoomArr.length !== 0) {
            let randomIndex = Math.floor(Math.random() * standardRoomArr.length);
            shuffledStandardRooms.push(standardRoomArr[randomIndex]);
            standardRoomArr.splice(randomIndex, 1);
        }
        standardRoomArr = shuffledStandardRooms;
    }
    return [executiveRoomArr[0], standardRoomArr[0]];
};
exports.randomizeRooms = randomizeRooms;
//# sourceMappingURL=randomizeRooms.js.map