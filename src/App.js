import React, { useState, useEffect, createContext } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Registrasi from "./scenes/registrasi";
import ForgotPassword from "./scenes/ForgotPassword";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Layout from "./layout";
import { getLocalStorage } from "./utils/helpers";
import PrivateRoute from "./config/PrivateRoute";

export const RootContext = createContext();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogin = getLocalStorage("user");
    if (userLogin) {
      setUser(userLogin);
    }
  }, []);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RootContext.Provider value={{ user }}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrasi" element={<Registrasi />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<PrivateRoute />}>
              {/* <Route element={<Layout />}> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              {/* </Route> */}
            </Route>
          </Routes>
        </RootContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
