import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";

const App: React.FC = () => {
  return (
    <Provider store={myStore}>
      <div className="App">
        <MyContent />
      </div>
    </Provider>
  );
};

let RENDER_COUNT = 0;
const MyContent: React.FC = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [, kick] = useState<{}>({});
  const r = useX();
  useEffect(() => kick({}), [r]);
  return (
    <div>
      <p>{++RENDER_COUNT} renders</p>
      <p>Store: {JSON.stringify(store)}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
    </div>
  );
};

interface Box<T> {
  readonly value: T;
}
interface MyStore {
  readonly count: number;
}
interface Increment {
  readonly type: "increment";
}
type MyAction = Increment;
const myReducer: Reducer<MyStore, MyAction> = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: (state?.count || 0) + 1 };
    default:
      return state || { count: 42 };
  }
};
const myStore: Store<MyStore, MyAction> = createStore(myReducer);

const ALWAYS_TRUE = () => true;
// This hook might look like it should be referentially stable.
// The equalityFn is ALWAYS_TRUE, so no updates to MyStore will
// ever trigger an update. But the selector itself is changing value,
// so the hook keeps triggering re-renders.
function useX(): Box<number> {
  const stableSelector = useCallback(
    (store: MyStore) => ({ value: store.count }),
    []
  );
  // const unstableSelector = (store: MyStore) => ({value: store.count});
  return useSelector(stableSelector, ALWAYS_TRUE);
}

export default App;
