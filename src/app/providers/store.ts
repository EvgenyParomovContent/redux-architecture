import { slicesRegistry } from "@/shared/store";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: slicesRegistry,
});
