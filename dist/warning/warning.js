"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShowWarning = void 0;
const createShowWarning = () => {
    let warningShown = false;
    return () => {
        if (!window.opener && window.parent === window && !warningShown) {
            const warning = document.createElement('div');
            warning.style.position = 'fixed';
            warning.style.top = '0';
            warning.style.left = '0';
            warning.style.width = '100%';
            warning.style.backgroundColor = '#FFF59D'; // Yellow background
            warning.style.color = '#333';
            warning.style.padding = '12px';
            warning.style.textAlign = 'center';
            warning.style.fontWeight = 'bold';
            warning.style.fontSize = '14px';
            warning.style.zIndex = '1000';
            warning.style.borderBottom = '1px solid #FFC107';
            warning.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            warning.innerHTML = 'Warning: This app must be opened from Snowsight in order to work properly. Please close this window and open the app from Snowsight.<br/><a href="https://pr85400.apps-beach.preprodc1.us-west-2.aws-dev.app.snowflake.com/eventsharing/na_pupr_provider_pp6/#/snowlets">https://pr85400.apps-beach.preprodc1.us-west-2.aws-dev.app.snowflake.com/eventsharing/na_pupr_provider_pp6/#/snowlets</a>';
            document.body.prepend(warning);
            warningShown = true;
        }
    };
};
exports.createShowWarning = createShowWarning;
