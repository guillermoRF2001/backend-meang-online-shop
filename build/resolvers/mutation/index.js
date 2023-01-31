"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const email_1 = __importDefault(require("./email"));
const genre_1 = __importDefault(require("./genre"));
const tag_1 = __importDefault(require("./tag"));
const user_1 = __importDefault(require("./user"));
const mutationResolvers = graphql_merge_resolvers_1.default.merge([
    user_1.default,
    genre_1.default,
    tag_1.default,
    email_1.default
]);
exports.default = mutationResolvers;
