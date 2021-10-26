import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import NewRoom from "./Pages/NewRoom";

import { AuthContextProvider } from "./Contexts/AuthContext";
import Room from "./Pages/Room";
import AdminRoom from "./Pages/AdminRoom";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />
          <Route path="/admin/rooms/:id" exact component={AdminRoom} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
