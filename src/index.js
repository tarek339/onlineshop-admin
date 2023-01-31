import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from "./redux/store"

// default url to the backend
axios.defaults.baseURL = "http://localhost:5000"
// sending the updated token after sign in and sign up
axios.interceptors.request.use((request) => {
  request.headers = {Authorization: localStorage.getItem("token")}
  return request
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)