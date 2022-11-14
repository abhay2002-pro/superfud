import Home from './Components/Home/Home'
import RestaurantDetails from './Components/RestaurentDetail/RestaurantDetails'

import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/Details/:rName" element = {<RestaurantDetails/>}/>
      </Routes>
   </div>
  );
}

export default App;
