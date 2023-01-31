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
const constants_1 = require("./../config/constants");
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
const slugify_1 = __importDefault(require("slugify"));
class GenresService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collectionGenre = constants_1.COLLECTIONS.GENRES;
    }
    items(active = constants_1.ACTIVE_VALUES_FILTER.ACTIVE) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { active: { $ne: false } };
            if (active === constants_1.ACTIVE_VALUES_FILTER.ALL) {
                filter = {};
            }
            else if (active === constants_1.ACTIVE_VALUES_FILTER.INACTIVE) {
                filter = { active: false };
            }
            const page = (_a = this.getVariables().pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.getVariables().pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            const result = yield this.list(this.collectionGenre, 'géneros', page, itemsPage, filter);
            return {
                info: result.info,
                status: result.status,
                message: result.message,
                genres: result.items,
            };
        });
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.get(this.collectionGenre);
            return {
                status: result.status,
                message: result.message,
                genre: result.item,
            };
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = this.getVariables().genre;
            if (!this.checkData(genre || '')) {
                return {
                    status: false,
                    message: 'El genero no se ha especificado correctamente',
                    genre: null,
                };
            }
            if (yield this.checkInDatabase(genre || '')) {
                return {
                    status: false,
                    message: 'El género existe en la base de datos, intenta con otro género',
                    genre: null
                };
            }
            const genreObject = {
                id: yield db_operations_1.asignDocumentId(this.getDb(), this.collectionGenre, { id: -1 }),
                name: genre,
                slug: slugify_1.default(genre || '', { lower: true }),
            };
            const result = yield this.add(this.collectionGenre, genreObject, 'género');
            return {
                status: result.status,
                message: result.message,
                genre: result.item,
            };
        });
    }
    modify() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            const genre = this.getVariables().genre;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del genero no se ha especificado correctamente',
                    genre: null,
                };
            }
            if (!this.checkData(genre || '')) {
                return {
                    status: false,
                    message: 'El genero existe en la base de datos,por favor introduzca otro genero.',
                    genre: null,
                };
            }
            const objectUpdate = {
                name: genre,
                slug: slugify_1.default(genre || '', { lower: true })
            };
            const result = yield this.update(this.collectionGenre, { id }, objectUpdate, 'género');
            return {
                status: result.status,
                message: result.message,
                genre: result.item,
            };
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del genero no se ha especificado correctamente',
                    genre: null,
                };
            }
            const result = yield this.del(this.collectionGenre, { id }, 'género');
            return {
                status: result.status,
                message: result.message
            };
        });
    }
    unblock(unblock = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del genero no se ha especificado correctamente',
                    genre: null,
                };
            }
            const result = yield this.update(this.collectionGenre, { id }, { active: unblock }, 'género');
            const action = (unblock) ? 'Desbloqueado' : 'Bloqueado';
            return {
                status: result.status,
                message: (result.status) ? `${action} correctamente.` : `No se ha ${action.toLowerCase()} comprobarlo por favor.`,
            };
        });
    }
    checkData(value) {
        return (value === '' || value === undefined) ? false : true;
    }
    checkInDatabase(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_operations_1.findOneElement(this.getDb(), this.collectionGenre, {
                name: value,
            });
        });
    }
}
exports.default = GenresService;
