import { screen } from "@testing-library/react";
import TextFieldWrapper from "./textFieldWrapper";
import { renderWithReactHookForm } from "./utils/test-utils";


describe("ControlledTextInput", () => {
  describe("when rendering default", () => {
    it("should render a texbox", () => {
      renderWithReactHookForm(
        <TextFieldWrapper name={"name"} defaultValue={""} />
      );
      const textbox = screen.getByRole(/textbox/i, { name: "name" });
      expect(textbox).toBeInTheDocument();
      expect(textbox).toHaveValue("");
    });
    it("should render a texbox", () => {
      renderWithReactHookForm(
        <TextFieldWrapper name={"name"}/>,
        { defaultValues: { name: "Abril" } }
      );
      const textbox = screen.getByRole(/textbox/i, { name: "name" });
      expect(textbox).toHaveValue("Abril");
    });

    it("should render an input with type password when it has an CVV name", () => {
        renderWithReactHookForm(
          <TextFieldWrapper name={"CVV"}/>,
        );
        const textbox = screen.getByLabelText("CVV");
        expect(textbox).toHaveAttribute("type", "password");
      })
  });
});