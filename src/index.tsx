/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './ServiceWorker';

ReactDOM.render(
    <React.StrictMode>
        <div />
    </React.StrictMode>,
    document.getElementById('root'),
);

unregister();
