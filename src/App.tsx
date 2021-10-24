import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ImageEditorPath } from "./consts";

const ImageList = lazy(() => import("./ImageList"));
const ImageEditor = lazy(() => import("./ImageEditor"));

const queryClient = new QueryClient();

const FallBack = () => <span>Loading...</span>;

const NotFound = () => <span>Not found</span>;

function App() {
  return (
    <Suspense fallback={<FallBack />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/" exact component={ImageList} />
            <Route path={ImageEditorPath} component={ImageEditor} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
