import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageList from "../ImageList";
import { renderWithRouter } from "../../test-utils";

// - As a user, I want to be able to search through the list of images.
//     - Images list should be paginated.
//     - Image item should include image preview and author's name.
// - As a user, I want to click an image and be navigated to the edit image page.

describe("ImageList", () => {
  describe("As a user, I want to be able to search through the list of images", () => {
    it("Image item should include image preview and author's name", async () => {
      renderWithRouter(<ImageList />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      const pictures = await screen.findAllByRole("listitem");
      expect(pictures.length).toBe(2);

      for (const picture of pictures) {
        const li = within(picture);
        expect(li.getByText("Alejandro Escamilla")).toBeInTheDocument(); // Author name
        expect(li.getByRole("img")).toHaveAttribute(
          "alt",
          "by Alejandro Escamilla"
        );
      }
    });

    it("Images list should be paginated.", async () => {
      renderWithRouter(<ImageList />);

      const nextPage = await screen.findByRole("button", { name: "Next" });
      userEvent.click(nextPage);

      const pictures = await screen.findAllByRole("listitem");

      expect(pictures.length).toBe(1);
      const li = within(pictures[0]);
      expect(li.getByText("Ziga Ajdnik")).toBeInTheDocument();

      const previous = await screen.findByRole("button", { name: "Previous" });
      userEvent.click(previous);

      expect(screen.queryByText("Ziga Ajdnik")).not.toBeInTheDocument();
    });

    it("When on second page next should be disabled", async () => {
      renderWithRouter(<ImageList />);

      let nextPage = await screen.findByRole("button", { name: "Next" });
      userEvent.click(nextPage);

      nextPage = await screen.findByRole("button", { name: "Next" });
      expect(nextPage).toBeDisabled();
    });

    it("When on first page previous should be disabled", async () => {
      renderWithRouter(<ImageList />);
      const previous = await screen.findByRole("button", { name: "Previous" });
      expect(previous).toBeDisabled();
    });
  });

  it("As a user, I want to click an image and be navigated to the edit image page", async () => {
    renderWithRouter(<ImageList />);

    const picture = (await screen.findAllByRole("img"))[0];
    userEvent.click(picture);

    expect(window.location.pathname).toBe("/edit/0/3744/5616");
  });
});
