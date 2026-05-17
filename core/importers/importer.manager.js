"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importAllProducts = importAllProducts;
const amazon_importer_1 = require("./amazon.importer");
const aliexpress_importer_1 = require("./aliexpress.importer");
const cjdropshipping_importer_1 = require("./cjdropshipping.importer");
async function importAllProducts() {
    const amazon = await (0, amazon_importer_1.importAmazonProducts)();
    const aliexpress = await (0, aliexpress_importer_1.importAliExpressProducts)();
    const cj = await (0, cjdropshipping_importer_1.importCJProducts)();
    return [
        ...amazon,
        ...aliexpress,
        ...cj
    ];
}
