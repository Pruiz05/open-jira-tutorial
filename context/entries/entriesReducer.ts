import { IEntry } from "@/interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entry] - Add-Entry"; payload: IEntry }
  | { type: "[Entry] - Update-Entry"; payload: IEntry }
  | { type: "[Entry] - Load-Entry"; payload: IEntry[] }
  | { type: "[Entry] - Delete-Entry"; payload: string };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] - Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entry] - Update-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            (entry.status = action.payload.status),
              (entry.description = action.payload.description);
          }
          return entry;
        }),
      };

    case "[Entry] - Load-Entry":
      return {
        ...state,
        entries: [...action.payload],
      };

    case "[Entry] - Delete-Entry":
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    default:
      return state;
  }
};
