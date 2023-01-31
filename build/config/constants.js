"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_VALUES_FILTER = exports.EXPIRETIME = exports.MESSAGES = exports.COLLECTIONS = exports.SECRET_KEY = void 0;
const environments_1 = __importDefault(require("./environments"));
if (process.env.Node_ENV !== 'production') {
    const env = environments_1.default;
}
exports.SECRET_KEY = process.env.SECRET || 'GuillermoRamosCursoGraphQLTiendaOnline';
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["USERS"] = "users";
    COLLECTIONS["GENRES"] = "genres";
    COLLECTIONS["TAGS"] = "tags";
    COLLECTIONS["SHOP_PRODUCT"] = "products_platforms";
    COLLECTIONS["PRODUCTS"] = "products";
    COLLECTIONS["PLATFORMS"] = "platforms";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["TOKEN_VERIFICATION_FAILED"] = "token no valido, inicia sesion de nuevo";
})(MESSAGES = exports.MESSAGES || (exports.MESSAGES = {}));
var EXPIRETIME;
(function (EXPIRETIME) {
    EXPIRETIME[EXPIRETIME["H1"] = 3600] = "H1";
    EXPIRETIME[EXPIRETIME["H24"] = 86400] = "H24";
    EXPIRETIME[EXPIRETIME["M15"] = 900] = "M15";
    EXPIRETIME[EXPIRETIME["M20"] = 1200] = "M20";
    EXPIRETIME[EXPIRETIME["M30"] = 1800] = "M30";
    EXPIRETIME[EXPIRETIME["D3"] = 259200] = "D3";
})(EXPIRETIME = exports.EXPIRETIME || (exports.EXPIRETIME = {}));
var ACTIVE_VALUES_FILTER;
(function (ACTIVE_VALUES_FILTER) {
    ACTIVE_VALUES_FILTER["ALL"] = "ALL";
    ACTIVE_VALUES_FILTER["ACTIVE"] = "ACTIVE";
    ACTIVE_VALUES_FILTER["INACTIVE"] = "INACTIVE";
})(ACTIVE_VALUES_FILTER = exports.ACTIVE_VALUES_FILTER || (exports.ACTIVE_VALUES_FILTER = {}));
