"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var roomQuery_1 = require("../queries/roomQuery");
// 24-hours
var OPENING_TIME = "09:00";
var CLOSING_TIME = "17:00";
// For Booking
var NO_OF_DAYS = 20;
var SECTION_INTERVAL = 60; // Unit: minutes
var TimeTableClass = /** @class */ (function () {
    function TimeTableClass() {
    }
    var _a;
    _a = TimeTableClass;
    TimeTableClass.getRoomList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, roomQuery_1.fetchRoomList)()];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res.roomList];
            }
        });
    }); };
    TimeTableClass.getRoomSize = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, roomQuery_1.fetchRoomSize)()];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res.roomSize];
            }
        });
    }); };
    TimeTableClass.getBookingHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var bookingHistory;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, roomQuery_1.fetchRoomBookingRecords)()];
                case 1:
                    bookingHistory = _b.sent();
                    return [2 /*return*/, bookingHistory.booking];
            }
        });
    }); };
    TimeTableClass.getEquipmentList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, roomQuery_1.fetchEquipmentList)()];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res.equipmentList];
            }
        });
    }); };
    TimeTableClass.getEquipmentCategory = function (equipmentList) {
        return __spreadArray([], new Set(equipmentList.map(function (equipment) { return equipment.category; })), true);
    };
    TimeTableClass.getDates = function (dayCount, timeZone) {
        if (timeZone === void 0) { timeZone = "America/Toronto"; }
        var dateList = [];
        for (var i = 0; i < dayCount; ++i) {
            var currDateStr = new Date().toLocaleString("en-US", {
                timeZone: timeZone,
                hour12: false,
            });
            var date = new Date(currDateStr);
            date.setDate(date.getDate() + i);
            dateList.push(date);
        }
        return dateList;
    };
    TimeTableClass.getTimeSlots = function (startTime, endTime, interval, refDate) {
        var timeSlotList = [];
        if (!startTime.includes(":") || !endTime.includes(":")) {
            throw new Error("Error: Invalid Opening/Closing Time format");
        }
        var _b = startTime.split(":"), startHour = _b[0], startMinute = _b[1];
        var _c = endTime.split(":"), endHour = _c[0], endMinute = _c[1];
        var start = new Date(refDate.getTime());
        start.setHours(+startHour, +startMinute, 0);
        var end = new Date(refDate.getTime());
        end.setHours(+endHour, +endMinute, 0);
        if (start > end) {
            throw new Error("Error: Invalid Opening/Closing Time");
        }
        while (start < end) {
            var timeSlotStart = new Date(start.getTime());
            start.setMinutes(start.getMinutes() + interval);
            var timeSlotEnd = new Date(start.getTime());
            if (end >= timeSlotEnd) {
                var timeSlot = {
                    start: timeSlotStart,
                    end: timeSlotEnd,
                };
                timeSlotList.push(timeSlot);
            }
        }
        return timeSlotList;
    };
    TimeTableClass.getAvailabilityByDate = function (date, roomList, bookingHistory) {
        var timeSlotList = _a.getTimeSlots(OPENING_TIME, CLOSING_TIME, SECTION_INTERVAL, date);
        var availability = timeSlotList.map(function (timeSlot) {
            var availableRooms = roomList.filter(function (room) {
                return bookingHistory.every(function (booking) {
                    return !(booking.roomId === room._id &&
                        booking.timeSlot.end > timeSlot.start &&
                        booking.timeSlot.start < timeSlot.end);
                });
            });
            return { timeSlot: timeSlot, availableRooms: availableRooms };
        });
        return { date: date, availability: availability };
    };
    TimeTableClass.getTimeTableInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var roomList, roomSize, bookingHistory, equipmentList, DetailedRoomList, equipmentCategory, dateList, timeSlotList, availabilityList;
        var _this = _a;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getRoomList()];
                case 1:
                    roomList = _b.sent();
                    return [4 /*yield*/, this.getRoomSize()];
                case 2:
                    roomSize = _b.sent();
                    return [4 /*yield*/, this.getBookingHistory()];
                case 3:
                    bookingHistory = _b.sent();
                    return [4 /*yield*/, this.getEquipmentList()];
                case 4:
                    equipmentList = _b.sent();
                    DetailedRoomList = roomList.map(function (room) {
                        var equipment = equipmentList.filter(function (equipment) {
                            return equipment.roomId === room._id && equipment.status;
                        });
                        var equipmentCategory = __spreadArray([], new Set(equipment.map(function (equipment) { return equipment.category; })), true);
                        return __assign(__assign({}, room), { equipment: equipmentCategory });
                    });
                    equipmentCategory = this.getEquipmentCategory(equipmentList);
                    dateList = this.getDates(NO_OF_DAYS);
                    timeSlotList = this.getTimeSlots(OPENING_TIME, CLOSING_TIME, SECTION_INTERVAL, dateList[0]);
                    availabilityList = dateList.map(function (date) {
                        return _this.getAvailabilityByDate(date, DetailedRoomList, bookingHistory);
                    });
                    return [2 /*return*/, {
                            roomSize: roomSize,
                            equipmentCategory: equipmentCategory,
                            dateList: dateList,
                            timeSlotList: timeSlotList,
                            availabilityList: availabilityList,
                        }];
            }
        });
    }); };
    return TimeTableClass;
}());
exports.default = TimeTableClass;
