"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genres_service_1 = __importDefault(require("../../services/genres.service"));
const resolversGenreMutation = {
    Mutation: {
        addGenre(_, variables, context) {
            return new genres_service_1.default(_, variables, context).insert();
        },
        updateGenre(_, variables, context) {
            return new genres_service_1.default(_, variables, context).modify();
        },
        deleteGenre(_, variables, context) {
            return new genres_service_1.default(_, variables, context).delete();
        },
        blockGenre(_, { id, unblock }, context) {
            return new genres_service_1.default(_, { id }, context).unblock(unblock);
        },
    },
};
exports.default = resolversGenreMutation;
