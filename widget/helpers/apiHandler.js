import React from 'react';
import ReactDOM from 'react-dom';

import Widget from '../components/widget';
import Config from '../config'

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config'
let widgetComponent = null;

function apiHandler(api, params) {
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  let config = window[widgetConfigName];

  console.log(`Handling API call ${api}`, params, config);

  switch (api) {
      case 'init':
          config = Object.assign({}, config, params);
          window[widgetConfigName] = config;
          widgetComponent = React.createRef();
          ReactDOM.render(
            <Widget ref={widgetComponent} />,
            document.getElementById(config.targetElementId)
          );
          break;
      case 'message':
          widgetComponent.current.setMessage(params);
          break;
      default:
          throw Error(`Method ${api} is not supported`);
  }
}

export default apiHandler