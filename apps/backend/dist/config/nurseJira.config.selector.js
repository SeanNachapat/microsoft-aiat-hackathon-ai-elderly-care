"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNurseJiraConfig = getNurseJiraConfig;
const nurseJira_config_en_1 = require("./nurseJira.config.en");
const nurseJira_config_th_1 = require("./nurseJira.config.th");
function getNurseJiraConfig(lang) {
    switch (lang) {
        case 'th': return nurseJira_config_th_1.nurseJiraConfigTH;
        case 'en':
        default: return nurseJira_config_en_1.nurseJiraConfigEN;
    }
}
//# sourceMappingURL=nurseJira.config.selector.js.map