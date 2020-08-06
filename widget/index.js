import Config from './config';
import apiHandler from './helpers/apiHandler'

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config'
const defaultconfig = {
    someDefaultConfiguration: false
};

function app(window) {
    console.log(`${widgetName} starting`);

    if (!window[widgetName]) {
        let tag = document.getElementById(widgetName + '-Script');

        if (!tag) {
            throw Error(`Cannot find script tag with id {$widgetName}-Script`);
        }

        let rawData = tag.getAttribute('data-config');
        rawData = rawData.replace(/'/g, "\"");
        console.log('rawData', rawData);
        let data = JSON.parse(rawData);

        window[widgetName] = data.name;

        let placeholder = {};
        (placeholder.q = []).push(['init', data.config]);

        window[window[widgetName]] = placeholder;
    }


    let placeholder = window[window[widgetName]];

    window[window[widgetName]] = apiHandler;
    window[widgetConfigName] = defaultconfig;

    if (placeholder) {
        console.log('Get placeholder', placeholder)
        console.log(`${widgetName} placeholder found`);

        let queue = placeholder.q;
        if (queue) {
            console.log(`${widgetName} placeholder queue found`);

            for (var i = 0; i < queue.length; i++) {
                apiHandler(queue[i][0], queue[i][1]);
            }
        }
    }
}

app(window);

export default app;