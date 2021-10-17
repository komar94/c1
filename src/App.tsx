import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ImageList = lazy(() => import('./ImageList'));
const ImageEditor = lazy(() => import('./ImageEditor'));

const FallBack = () => <span>Loading...</span>;

const NotFound = () => <span>Not found</span>;

function App() {
  return (
    <Suspense fallback={<FallBack />}>
    <Router>
      <Switch>
        <Route path="/" exact component={ImageList} />
        <Route path="/edit/:imageId/:height/:width?" component={ImageEditor} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
    </Suspense>
  );
}

export default App;
