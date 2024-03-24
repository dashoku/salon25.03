import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import CategorySalon from "./store/CategorySalon";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStore(),
        category: new CategorySalon(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

