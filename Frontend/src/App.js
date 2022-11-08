import Home from './Components/Home/Home'
import RestaurantDetails from './Components/RestaurentDetail/RestaurantDetails'
import Filter from './Components/RestaurentDetail/Filter'
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
   <div>
      {/* <Home /> */}
      {/* <RestaurantDetails/> */}
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/Details/:rName" element = {<RestaurantDetails/>}/>
        <Route path = "/filter" element = {<Filter />}/>
      </Routes>
   </div>
  );
}

export default App;
