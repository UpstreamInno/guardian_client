import { createStore, applyMiddleware } from "redux";
import devToolsEnhancer, { composeWithDevTools } from "remote-redux-devtools";
import { rootReducer } from "./reducer";
import { rootSaga } from "../sagas/RootSaga"
import createSagaMiddleware from 'redux-saga'

// recipes here: https://www.npmjs.com/package/remote-redux-devtools

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    )
    // devToolsEnhancer(sagaMiddleware, { realtime: true }),
  );

  sagaMiddleware.run(rootSaga)
  return store;
}
