import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import injectTapEventPlugin from "react-tap-event-plugin";
import "cesium/Source/Widgets/widgets.css";
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
import "./index.css";

injectTapEventPlugin();
buildModuleUrl.setBaseUrl("./cesium/");

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
