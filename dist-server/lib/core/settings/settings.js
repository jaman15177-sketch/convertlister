"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSettings = void 0;
exports.getSettings = getSettings;
exports.updateSettings = updateSettings;
exports.defaultSettings = {
    alert_threshold: 5,
    severity_multiplier: 2,
    realtime_enabled: true,
};
let runtimeSettings = { ...exports.defaultSettings };
function getSettings() {
    return runtimeSettings;
}
function updateSettings(partial) {
    runtimeSettings = {
        ...runtimeSettings,
        ...partial,
    };
}
