import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Proveedor from "./components/Proveedor";
import categoria from "./components/categoria";
import unidadmedida from "./components/unidadmedida";
import Navegation from "./components/Navegation";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/components/temaConfig";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navegation></Navegation>
      <Router>
        <Route path="/Proveedor" exact component={Proveedor} />
        <Route path="/categoria" exact component={categoria} />
        <Route path="/unidaddemedida" exact component={unidadmedida} />
      </Router>
    </ThemeProvider>
  );
}
export default App;
