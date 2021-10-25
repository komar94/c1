import { screen } from "@testing-library/react";
import ImageEditor from "../ImageEditor";
import { renderWithRouter } from "../../test-utils";
import { ImageEditorPath } from "../../consts";
import { generatePath, Route } from "react-router";

const path = generatePath(ImageEditorPath, { id: 10, width: 100, height: 200 });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({ id: 10, width: 100, height: 200 }),
  useRouteMatch: () => ({ url: "localhost/edit/10/100/200" }),
}));

describe("ImageEditor", () => {
  describe("As a user, I want to be able to edit image", () => {
    it("User can land on page and has values filled", async () => {
      renderWithRouter(
        <Route path={path}>
          <ImageEditor />
        </Route>,
        path
      );

      const heightInput = await screen.getByLabelText("Height:");
      const widthInput = await screen.getByLabelText("Width:");

      expect(heightInput).toHaveValue(200);
      expect(widthInput).toHaveValue(100);
    });
  });
});
