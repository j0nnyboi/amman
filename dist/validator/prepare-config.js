"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safecoinConfig = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
async function safecoinConfig(config) {
    const { jsonRpcUrl, websocketUrl, commitment } = config;
    const configText = `---
json_rpc_url: "${jsonRpcUrl}"
websocket_url: "${websocketUrl}"
commitment: ${commitment} 
`;
    const configHash = (0, utils_1.createHash)(Buffer.from(configText));
    const configPath = path_1.default.join((0, os_1.tmpdir)(), `amman-config.${configHash}.yml`);
    await fs_1.promises.writeFile(configPath, configText, 'utf8');
    return { configPath, cleanupConfig: () => fs_1.promises.unlink(configPath) };
}
exports.safecoinConfig = safecoinConfig;
//# sourceMappingURL=prepare-config.js.map