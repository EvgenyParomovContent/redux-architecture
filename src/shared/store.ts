import { useDispatch, useSelector } from "react-redux";
import {
  combineSlices,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";

export const slicesRegistry = combineSlices();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
export type AppGetState = () => AppState;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = ThunkDispatch<any, unknown, UnknownAction> & Dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes();
