import { createStore, applyMiddleware } from "redux";
import devToolsEnhancer, { composeWithDevTools } from "remote-redux-devtools";
import { rootReducer } from "./reducer";

// recipes here: https://www.npmjs.com/package/remote-redux-devtools

export const store = createStore(
  rootReducer,
  devToolsEnhancer({ realtime: true }),
);
