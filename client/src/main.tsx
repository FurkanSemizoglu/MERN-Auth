import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'react-redux'
import './index.css'
import store from './redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>

      <App />

    </Provider>


)
