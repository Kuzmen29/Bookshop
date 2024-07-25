import { createRoot } from 'react-dom/client';

const appRoot = document.querySelector('.root')

const app = createRoot(appRoot);

import './styles/style.scss'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './stores/store';


app.render(
    <Provider store={store}>
        <App />
    </Provider>
)