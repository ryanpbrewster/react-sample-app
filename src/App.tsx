import React, { useEffect, useState }  from 'react';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import { createStore, Store, Reducer } from 'redux';

const App: React.FC = () => {
  return (
    <Provider store={myStore}>
      <div className="App">
        <MyContent />
      </div>
    </Provider>
  );
};

const MyContent: React.FC = () => {
  const [x, setX] = useState<number>(41);
  const r = useX(x);
  useEffect(() => {
    console.log("setting x = ", r);
    setX(r.value + 1);
  }, [r]);
  return <p>{x}</p>;
};

interface Box<T> {
  readonly value: T;
}
interface MyStore {
  readonly count: Box<number>;
}
interface Noop {
  readonly type: 'noop';
}
type MyAction = Noop;
const myReducer: Reducer<MyStore, MyAction> = (state, action) => {
  switch (action.type) {
    default:
      return state || {count: {value: 42}};
  }
};
const myStore: Store<MyStore, MyAction> = createStore(myReducer);

function useX(ignored: number): Box<number> {
  const mySelector = (store: MyStore) => {
    return store.count.value === ignored ? {value: -1} : {value: store.count.value};
  };
  const r = useSelector(mySelector, () => false);
  console.log("emitting", r);
  return r;
}

export default App;
