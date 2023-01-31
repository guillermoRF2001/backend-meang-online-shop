"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolversProductType = {
    Product: {
        screenshoot: (parent) => parent.shortScreenshots
    },
};
exports.default = resolversProductType;
