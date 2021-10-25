import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
        <>
          <Router>
            <div className="bg-gray-100 rounded-xl p-8">
              <Link to="/">List of images</Link>
            </div>
            <div className="p-2">
              <Switch>
                <Route path="/" exact component={ImageList} />
                <Route path={ImageEditorPath} component={ImageEditor} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </Router>
          <ReactQueryDevtools />
        </>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
