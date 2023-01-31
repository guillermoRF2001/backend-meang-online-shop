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
const db_operations_1 = require("./../lib/db-operations");
const constants_1 = require("../config/constants");
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
class ShopProductsService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collectionGenre = constants_1.COLLECTIONS.SHOP_PRODUCT;
    }
    items(active = constants_1.ACTIVE_VALUES_FILTER.ACTIVE, platform = ['-1'], random = false, otherFilters = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { active: { $ne: false } };
            if (active == constants_1.ACTIVE_VALUES_FILTER.ALL) {
                filter = {};
            }
            else if (active == constants_1.ACTIVE_VALUES_FILTER.INACTIVE) {
                filter = { active: false };
            }
            if (platform[0] !== '-1' && platform !== undefined) {
                filter = Object.assign(Object.assign({}, filter), { platform_id: { $in: platform } });
            }
            if (otherFilters !== {} && otherFilters !== undefined) {
                filter = Object.assign(Object.assign({}, filter), otherFilters);
            }
            const page = (_a = this.getVariables().pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.getVariables().pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            if (!random) {
                const result = yield this.list(this.collectionGenre, 'productos de la tienda', page, itemsPage, filter);
                return {
                    info: result.info,
                    status: result.status,
                    message: result.message,
                    shopProducts: result.items,
                };
            }
            const result = yield db_operations_1.randomItems(this.getDb(), this.collectionGenre, filter, itemsPage);
            if (result.length === 0 || result.length !== itemsPage) {
                return {
                    info: { page: 1, pages: 1, itemsPage, total: 0 },
                    status: false,
                    message: 'La informacion que hemos pedido no ha cargado correctamente.',
                    shopProducts: [],
                };
            }
            return {
                info: { page: 1, pages: 1, itemsPage, total: itemsPage },
                status: true,
                message: 'La informacion que hemos pedido ha cargado correctamente.',
                shopProducts: result,
            };
        });
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.get(this.collectionGenre);
            return {
                status: result.status,
                message: result.message,
                shopProduct: result.item,
            };
        });
    }
}
exports.default = ShopProductsService;
