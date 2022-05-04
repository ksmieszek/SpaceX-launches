import Launches from "views/Launches/Launches";
import Launch from "views/Launch/Launch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "graphql/client";
import GlobalStyle from "theme/GlobalStyle";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Launches} />
          <Route path="/launch/:id" component={Launch} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
