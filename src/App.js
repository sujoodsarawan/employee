import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./js/Layout/Navbar";
import RenewId from "./js/Pages/ID/RenewId/RenewId";
import userDatails from "./js/Pages/ID/RenewId/userDatails";
import FirstId from "./js/Pages/ID/FirstId/FirstId";
import userDetails from "./js/Pages/ID/FirstId/userDetails";
import SearchId from "./js/Pages/ID/SearchId/SearchId";
import userDetail from './js/Pages/BirthCertificate/OrderBirthCertificate/userDetails'
import OrderBirthCertificate from "./js/Pages/BirthCertificate/OrderBirthCertificate/OrderBirthCertificate";


class App extends React.Component {
  render() {
    return (
      <div className="header">
        <Navbar />

        <Switch>
          <Route exact path="/renew/id/requests" component={RenewId} />
          <Route exact path="/renew/id/requests/:ssn" component={userDatails} />
          <Route exact path="/first/id/requests" component={FirstId} />
          <Route exact path="/first/id/requests/:id" component={userDetails} />
          <Route path="/search-result/:term" component={SearchId} />
          <Route exact path="/order/birth/certificate" component={OrderBirthCertificate} />
          <Route exact path="/order/birth/certificate/:ssn" component={userDetail} />
          <Redirect from="/" to="/first/id/requests" component={FirstId} />
        </Switch>
      </div>
    );
  }
}

export default App;
