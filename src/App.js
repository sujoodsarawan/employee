import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./js/Layout/Navbar";
import RenewId from "./js/Pages/ID/RenewId/RenewId";
import userDatails from "./js/Pages/ID/RenewId/userDatails";
import FirstId from "./js/Pages/ID/FirstId/FirstId";
import userDetails from "./js/Pages/ID/FirstId/userDetails";
import SearchId from "./js/Pages/ID/SearchId/SearchId";
import OrderBirthCertificate from "./js/Pages/BirthCertificate/OrderBirthCertificate/OrderBirthCertificate";
import userBirthDetails from "./js/Pages/BirthCertificate/OrderBirthCertificate/userBirthDetails";
import ChildBirthCertificate from "./js/Pages/BirthCertificate/ChildBirthCertificate/ChildBirthCertificate";
import ChildBirthDetails from "./js/Pages/BirthCertificate/ChildBirthCertificate/ChildBirthDetails";
import SearchResult from "./js/Pages/BirthCertificate/SerachResult/SearchResult";
import RenewPassport from "./js/Pages/Passport/RenewPassport/RenewPassport";
import UserRenewPassport from "./js/Pages/Passport/RenewPassport/UserRenewPassport";


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
          <Route exact path="/order/birth/certificate/:id" component={userBirthDetails} />
          <Route exact path="/child/birth/certificate" component={ChildBirthCertificate} />
          <Route exact path="/child/birth/certificate/:id" component={ChildBirthDetails} />
          <Route path="birth/search/result/:term"  component={SearchResult}/>
          <Route exact path="/renew/passport" component={RenewPassport}/>
          <Route exact path="/renew/passport/:id" component={UserRenewPassport} />


          <Redirect from="/" to="/first/id/requests" component={FirstId} />
        </Switch>
      </div>
    );
  }
}

export default App;
