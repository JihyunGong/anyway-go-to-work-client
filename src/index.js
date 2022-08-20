import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import GlobalStyle from "./components/shared/GlobalStyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
