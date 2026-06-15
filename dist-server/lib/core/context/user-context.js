"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserContext = setUserContext;
exports.getUserContext = getUserContext;
let currentUser = null;
function setUserContext(ctx) {
    currentUser = ctx;
}
function getUserContext() {
    return currentUser;
}
