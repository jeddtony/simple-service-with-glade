import React, { Suspense, lazy, useContext } from "react";
import './App.css';
import {getToken} from './helpers';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getRole } from "./helpers/localStorageHelper";
// import ViewOnePaymentHistory from "./pages/vehicle/ViewOnePaymentHistory";



//================ USERS ==========
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// ========= VEHICLE =================
const CreateVehicle = lazy(() => import("./pages/vehicle/CreateVehicle"));
const ViewPaymentRequests = lazy(() =>  import("./pages/vehicle/ViewPaymentRequests"));
const MakePayment = lazy(() => import("./pages/vehicle/MakePayment"));
const ViewPayments = lazy(() => import("./pages/vehicle/ViewPayments"));
const ViewPaymentHistory = lazy(() => import("./pages/vehicle/ViewOnePaymentHistory"));


function App() {
  const baseUrl = process.env.PUBLIC_URL;

  return (
    <BrowserRouter basename={baseUrl}>
     <Suspense fallback={<div>Loading...</div>}>
     <Switch>
       <Route path="/" exact component={Login} />
       <Route path="/register" exact component={Register} />
 
       <Route path="/login" exact component={Login} />

       <Route path="/pay/:url" exact component={MakePayment} />

       <Authenticated>

        <Route path="/payments" exact component={ViewPaymentRequests} />

        <Route path="/payment-history" exact component={ViewPayments} />

        <Route path="/payment-history/:id" exact component={ViewPaymentHistory} />

        <Route path="/dashboard" exact component={Dashboard} />

        </Authenticated>
       </Switch>
       </Suspense>
    </BrowserRouter>
  );
}

export default App;

const Authenticated = ({children}) => {
    let token = getToken();

    return(
      <>
      {token? (
        <>
        {children}
        </>
      ): <Login />}
      </>
    )

}