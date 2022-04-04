import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navi from "./Component/Navi";
import TableData from "./Component/TableData";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRecords from "./Component/AddRecords";
import './App.css'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navi />
        <Switch>
          <Route exact path="/tabledata" component={TableData} />
          <Route exact path="/AddRecordsform" component={AddRecords} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
