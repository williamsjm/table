import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import TableDetail from "./pages/TableDetail/TableDetail";

// Views

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/:id">
        <TableDetail />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
}
