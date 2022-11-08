import React, { Component } from 'react'
import homepage from '../../Assets/Images/homepage.png';
import {Link} from 'react-router-dom'
import '../../Styles/Wallpaper.Module.css';

export default class Wallpaper extends Component {
  constructor(){ 
    super(); 
    this.state={ 
      locations:[],
      restaurants:[]
    } 
    // console.log("Wallpaper constructor is called!") 
  } 
  
  fetchRestaurants=(event)=>{ 
    console.log(event.target.value)
    fetch(`http://localhost:7070/restaurant/${event.target.value}`,{method:'GET'})
    .then(response => response.json())
    .then(data=>this.setState({restaurants:data.data}))
     
  }
  static getDerivedStateFromProps(props,state){
    // console.log("Wallpaper static getDerivedStateFromProps");
    return{}
  }
  componentDidMount() {
    // console.log("Wallpaper Component is mounted")
    //call APi here
    fetch('http://localhost:7070/restaurant/Locations',{method:'GET'})
    .then(response => response.json())
    .then(data=>this.setState({locations:data.data}))

  }
  shouldComponentUpdate(){
    return true
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    // console.log(`getSnapShotBerforeUpdate is called with prevprops : ${prevProps} prevState : ${prevState.locations}`);
    return null;
  }
  componentDidUpdate(){
    // console.log(`Wallpaper componentDidUpdate is called!`);
  }
  render() {
    let locationOptions = this.state.locations.length && this.state.locations.map((item)=><option key = {item.name} value={item.city_id}>{item.name}</option>)
    // console.log("Wallpaper Render");
    let restaurantsList = this.state.restaurants.length && <ul>
        {
            this.state.restaurants.map((item)=>
            <li key = {item.name}>
              <Link to ={`/Details/${item.name}`}>
              {item.name}
              </Link>
              
            </li>)
        }
    </ul>
    return (
      <div>
        <div>
          <img src={homepage} alt = "homeimage" width="100%" height="450px"/>
          <div className = "logo">
            e!
          </div>
          <div className = "headings">
            Find the best restuarants, cafes and bars
          </div>
          <div className="locationSelector"> 
          <select className="locationDropdown" onChange={this.fetchRestaurants}> 
             <option value="0">Select</option> 
             {locationOptions} 
          </select> 
          <div id="notebooks"> 
              <input className="restaurantsinput" type="text" placeholder="Search Restaurant" /> 
              {restaurantsList} 
          </div> 
          
      </div> 
        </div>
        
      </div>
    )
  }
}
