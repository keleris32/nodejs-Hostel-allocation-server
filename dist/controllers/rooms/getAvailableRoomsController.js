'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getAvailableRooms = void 0;
const randomizeRooms_1 = require('../../utils/randomizeRooms');
const errorResponse_1 = require('../../utils/errorResponse');
const successResponse_1 = require('../../utils/successResponse');
const dbConnector_1 = __importDefault(require('../../config/dbConnector'));
const getAvailableRooms = async (req, res) => {
  try {
    const studentGender = req.user.gender;
    const roomCapacity = 4;
    const availableRooms = await dbConnector_1.default.query(
      'SELECT id, hostel, room_type, room_number, price, no_of_inhabitants, type_of_hostel FROM rooms WHERE type_of_hostel = $1 AND no_of_inhabitants < $2',
      [studentGender, roomCapacity]
    );
    if (availableRooms.rowCount !== 0) {
      let responseMessage = 'Hostel rooms fetched successfully!';
      res
        .status(200)
        .json(
          (0, successResponse_1.successResponseBody)(
            responseMessage,
            (0, randomizeRooms_1.randomizeRooms)(availableRooms.rows)
          )
        );
    } else {
      throw new Error('There are no available rooms!');
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    res
      .status(500)
      .send((0, errorResponse_1.errorResponseBody)('Internal Server Error!'));
  }
};
exports.getAvailableRooms = getAvailableRooms;
//# sourceMappingURL=getAvailableRoomsController.js.map
