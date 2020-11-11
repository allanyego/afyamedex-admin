import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useAppContext } from "./context/app";
import Conditions from "./pages/Conditions";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

function Main() {
  const { url, path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/users`} component={Users} exact />
      <Route path={`${path}/conditions`} component={Conditions} exact />
      <Route render={() => <Redirect to={`${url}/users`} />} />
    </Switch>
  );
}

function AppRoutes() {
  const { currentUser } = useAppContext();

  return (
    <Switch>
      <Route
        path="/sign-in"
        render={() => (currentUser ? <Redirect to="/app" /> : <SignIn />)}
        exact
      />
      <Route
        path="/sign-up"
        render={() => (currentUser ? <Redirect to="/app" /> : <SignUp />)}
        exact
      />
      <Route
        path="/app"
        render={() => (!currentUser ? <Redirect to="/sign-in" /> : <Main />)}
      />
      <Route render={() => <Redirect to="/sign-in" />} />
    </Switch>
  );
}

export default AppRoutes;
