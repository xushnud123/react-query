import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroes } from "./components/RQSuperHeroes";
import ParallelQueriesPage from "./components/ParallelQueriesPage";
import DynamicParallel from "./components/DynamicParallel";
import DependentQuery from "./components/DependentQuery";
import { PaginatedQueries } from "./components/PaginatedQueries";
import { InfiniteQueries } from "./components/InfiniteQueries";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/rq-infinite'>
              <InfiniteQueries />
            </Route>
            <Route path='/rq-paginated'>
              <PaginatedQueries />
            </Route>
            <Route path='/rq-dependent'>
              <DependentQuery email='12xushnudbek34@gmail.com' />
            </Route>
            <Route path={"/rq-dynamic-parallel"}>
              <DynamicParallel heroIds={[1, 3]} />
            </Route>
            <Route path='/rq-parallel'>
              <ParallelQueriesPage />
            </Route>
            <Route path='/rq-super-heroes/:heroId'>
              <RQSuperHeroes />
            </Route>
            <Route path='/super-heroes'>
              <SuperHeroesPage />
            </Route>
            <Route path='/rq-super-heroes'>
              <RQSuperHeroesPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
