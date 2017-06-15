import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/AppContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import injectTapEventPlugin from "react-tap-event-plugin";
import "cesium/Source/Widgets/widgets.css";
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
import "./index.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

injectTapEventPlugin();
buildModuleUrl.setBaseUrl("./cesium/");

import paleBlue from "./reducers";
let store = createStore(paleBlue, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <AppContainer />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

////
// Websockets
////
import socket from "./websockets";
import { submitDotSuccess } from "./actions/submitDot";

socket.on("new content", content => {
  store.dispatch(submitDotSuccess(content));
});
