import { render } from "@testing-library/react";
import { FC, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
const wrapper: FC = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

export const renderWithRouter = (ui: ReactElement, route = "/") => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper });
};
