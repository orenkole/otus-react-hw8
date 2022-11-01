import React from "react";
import { screen } from "@testing-library/react";
import { ControlPanel } from ".";
import {
  fieldActions,
  fieldReducer,
} from "./redux";
import { initialFieldMock } from "../../mocks/initialFieldMock";
import { cloneObj } from "../../utils/helperFunctions";
import { renderWithProviders } from "../../utils/test-utils";

describe("ControlPanel rendering", () => {
  test("renders ControlPanel component", () => {
    renderWithProviders(<ControlPanel fillingPercentage={0} width={2} height={2} />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Stop")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Slow")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Filling percentage:")).toBeInTheDocument();
    expect(screen.getByText("Field width:")).toBeInTheDocument();
    expect(screen.getByText("Field height:")).toBeInTheDocument();
  });
});

describe("Control panel reducer", () => {
  test("1 percent for 25 cells is 1 filled cell", () => {
    const updatedPercentageState = fieldReducer(initialFieldMock, fieldActions.updateFillingPercentage({ percentage: 1 }));
    let filledCells = 0;
    for (const row of updatedPercentageState.fieldInfo) {
      for (const cell of row) {
        if (cell.cellMode === 1) {
          filledCells = filledCells + 1;
        }
      }
    }
    expect(filledCells).toEqual(1);
  });
  test("10 percent for 25 cells is 3 filled cells", () => {
    const updatedPercentageState = fieldReducer(initialFieldMock, fieldActions.updateFillingPercentage({ percentage: 10 }));
    let filledCells = 0;
    for (const row of updatedPercentageState.fieldInfo) {
      for (const cell of row) {
        if (cell.cellMode === 1) {
          filledCells = filledCells + 1;
        }
      }
    }
    expect(filledCells).toEqual(3);
  });
  test("Update height", () => {
    const updatedState = fieldReducer(initialFieldMock, fieldActions.updateHeight({ height: 10 }));
    expect(updatedState.fieldInfo.length).toEqual(10);
  });
  test("Update width", () => {
    const updatedState = fieldReducer(initialFieldMock, fieldActions.updateWidth({ width: 10 }));
    for (const row of updatedState.fieldInfo) {
      expect(row).toHaveLength(10);
    }
  });
  test("Cell should change it's state on click", () => {
    const newState = cloneObj(initialFieldMock);
    newState.fieldInfo[0][1].cellMode = 1;
    expect(fieldReducer(initialFieldMock, fieldActions.cellClick({ id: "5LMc1bZvGS" }))).toEqual(newState);
  });
});
