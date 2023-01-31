"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
class PlatformService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collectionGenre = constants_1.COLLECTIONS.PLATFORMS;
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.get(this.collectionGenre);
            return {
                status: result.status,
                message: result.message,
                platform: result.item,
            };
        });
    }
}
exports.default = PlatformService;
