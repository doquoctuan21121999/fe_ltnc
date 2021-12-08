import React from "react";
import ReactDOM from "react-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import "react-toastify/dist/ReactToastify.css";
// import "assets/vendor/select2/dist/css/select2.min.css";
import App from "./App";
import "./assets/vendor/fullcalendar.min.css";
import "./assets/vendor/sweetalert2.min.css";
import "antd/dist/antd.css";
import "./style.scss";

import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AppReducer from "./redux/reducers";
import { Provider } from "react-redux";
export const store = createStore(
  AppReducer,
  {},
  compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);
