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
const db_operations_1 = require("../lib/db-operations");
const jwt_1 = __importDefault(require("../lib/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
const mail_service_1 = __importDefault(require("./mail.service"));
class UsersService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collectionGenre = constants_1.COLLECTIONS.USERS;
    }
    items(active = constants_1.ACTIVE_VALUES_FILTER.ACTIVE) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { active: { $ne: false } };
            if (active == constants_1.ACTIVE_VALUES_FILTER.ALL) {
                filter = {};
            }
            else if (active == constants_1.ACTIVE_VALUES_FILTER.INACTIVE) {
                filter = { active: false };
            }
            const page = (_a = this.getVariables().pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.getVariables().pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            const result = yield this.list(this.collectionGenre, 'usuarios', page, itemsPage, filter);
            return { info: result.info, status: result.status, message: result.message, users: result.items };
        });
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            let info = new jwt_1.default().verify(this.getContext().token);
            if (info === constants_1.MESSAGES.TOKEN_VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Usuario autenticado correctamente mediante el token',
                user: Object.values(info)[0]
            };
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const variables = this.getVariables().user;
                const user = yield db_operations_1.findOneElement(this.getDb(), this.collectionGenre, { email: variables === null || variables === void 0 ? void 0 : variables.email });
                if (user === null) {
                    return {
                        status: false,
                        message: 'Usuario no existe',
                        token: null,
                    };
                }
                const passwordCheck = bcrypt_1.default.compareSync(variables === null || variables === void 0 ? void 0 : variables.password, user.password);
                if (passwordCheck !== null) {
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status: passwordCheck,
                    message: !passwordCheck
                        ? 'Password o usuario no correctos, sesion no iniciada'
                        : 'Sesion iniciada, usuario correctamente',
                    token: !passwordCheck
                        ? null
                        : new jwt_1.default().sign({ user }, constants_1.EXPIRETIME.H24),
                    user: !passwordCheck
                        ? null
                        : user,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuarios.',
                    user: null,
                };
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getVariables().user;
            if (user === null) {
                return {
                    status: false,
                    message: 'Usuario no definido, procura definirlo.',
                    user: null
                };
            }
            if ((user === null || user === void 0 ? void 0 : user.password) === null ||
                (user === null || user === void 0 ? void 0 : user.password) === undefined ||
                (user === null || user === void 0 ? void 0 : user.password) === '') {
                return {
                    status: false,
                    message: 'Usuario sin contraseña, procura definirla.',
                    user: null
                };
            }
            const userCheck = yield db_operations_1.findOneElement(this.getDb(), this.collectionGenre, { email: user === null || user === void 0 ? void 0 : user.email });
            if (userCheck !== null) {
                return {
                    status: false,
                    message: `El correo ${user === null || user === void 0 ? void 0 : user.email} esta ya en uso, utilize otro correo.`,
                    user: null
                };
            }
            user.id = yield db_operations_1.asignDocumentId(this.getDb(), this.collectionGenre, { registerDate: -1 });
            user.registerDate = new Date().toISOString();
            user.password = bcrypt_1.default.hashSync(user === null || user === void 0 ? void 0 : user.password, 10);
            const result = yield this.add(this.collectionGenre, user || {}, 'usuario');
            return {
                status: result.status,
                message: result.message,
                user: result.item
            };
        });
    }
    modify() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getVariables().user;
            if (user === null) {
                return {
                    status: false,
                    message: 'Usuario no definido, procura definirlo',
                    user: null
                };
            }
            const filter = { id: user === null || user === void 0 ? void 0 : user.id };
            const result = yield this.update(this.collectionGenre, filter, user || {}, 'usuario');
            return {
                status: result.status,
                message: result.message,
                user: result.item
            };
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            if (id === undefined || id === '') {
                return {
                    status: false,
                    message: 'ID del usuario no definido, procura definirlo',
                    user: null
                };
            }
            const result = yield this.del(this.collectionGenre, { id }, 'usuario');
            return {
                status: result.status,
                message: result.message
            };
        });
    }
    unblock(unblock, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            const user = this.getVariables().user;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del usuario no se ha especificado correctamente.',
                    user: null
                };
            }
            if ((user === null || user === void 0 ? void 0 : user.password) === '1234') {
                return {
                    status: false,
                    message: 'No es posible la activacion hasta que se cambie la contraseña.'
                };
            }
            let update = { active: unblock };
            if (unblock && !admin) {
                console.log('Soy cliente y estoy cambiando la contraseña');
                update = Object.assign({}, { active: true }, {
                    birthday: user === null || user === void 0 ? void 0 : user.birthday,
                    password: bcrypt_1.default.hashSync(user === null || user === void 0 ? void 0 : user.password, 10)
                });
            }
            console.log(update);
            const result = yield this.update(this.collectionGenre, { id }, update, 'usuario');
            const action = (unblock) ? 'Desbloqueado' : 'Bloqueado';
            return {
                status: result.status,
                message: (result.status) ? `${action} correctamente.` : `No se ha ${action.toLowerCase()} comprobarlo por favor.`,
            };
        });
    }
    active() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = this.getVariables().user) === null || _a === void 0 ? void 0 : _a.id;
            const email = ((_b = this.getVariables().user) === null || _b === void 0 ? void 0 : _b.email) || '';
            if (email === undefined || email === '') {
                return {
                    status: false,
                    message: 'El email no se ha definido correctamente.'
                };
            }
            const token = new jwt_1.default().sign({ user: { id, email } }, constants_1.EXPIRETIME.H1);
            const html = `Para activar la cuenta haz click en el link <a href="${process.env.CLIENT_URL}/#/active/${token}">Clic aquí</a>`;
            const mail = {
                subject: 'Activar usuario',
                to: email,
                html,
            };
            return new mail_service_1.default().send(mail);
        });
    }
    checkData(value) {
        return (value === '' || value === undefined) ? false : true;
    }
}
exports.default = UsersService;
