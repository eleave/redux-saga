import { useSelector } from "react-redux";

const App = () => {
  const store = useSelector(store => store);
  console.log(store);
  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
