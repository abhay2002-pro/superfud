import React from 'react'
import '../../Styles/RestaurantDetails.Module.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Common/Header'
import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Modal from 'react-modal'

const modalStyle={
  overlay: {
      position: 'fixed',
      zIndex: 1020,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  content:{
      left:'auto',
      right:'auto',
      width:'auto',
      tranform:'translate(-50%,-50%)'
  }
}

export default function RestaurantDetails() {
    let {rName}=useParams()
    const[restaurant,setRestaurant]=useState({})
    
    const [isMenuModalOpen, setisMenuModalOpen] = useState(false)
    const[menu,setMenu]=useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isUserDModalOpen, setIsUserDModalOpen] = useState(false)


    const addItem=(item)=>{
      let price=totalPrice + item.itemPrice;
      console.log("price",price)
      setTotalPrice(price);
      console.log(totalPrice)
   }
    useEffect(() => {
        fetch(`http://localhost:7070/restaurant/Details/${rName}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>setRestaurant(data.data))
  
        }
    , [])
    
    
    const fetchMenu = ()=>{
      fetch(`http://localhost:7070/menu/${rName}`,{method:'GET'})
      .then(response=>response.json())
      .then(data=>setMenu(data.data))
    }

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
  

    const OpenRazorPay=async ()=>{
      try{
        let orderData;
      orderData = await fetch('http://localhost:7070/pay',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify({amount : totalPrice})
      })
      .then(response=> response.json())

      console.log(orderData)






      const options={
        key : "rzp_test_vqSttmyYoPbowi",
        name : "Zomato food delivery app",
        amount : orderData.amount,
        currency : orderData.currency,
        order_id : orderData.id,
        prefill : {
          email : "kegamir420@teasya.com",
          contact : "592-041-3408"
        },
        handler:function(response){
          fetch('http://localhost:7070/pay/save',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify({razorpay_order_id:response.razorpay_order_id,
                                 razorpay_payment_id :response.razorpay_payment_id ,
                                 razorpay_signature : response.razorpay_signature,
                                 razorpay_amount : orderData.amount
                                })
          }).then(response => console.log(response))
        }
      }
      const paymentWindow = window.Razorpay(options);
      paymentWindow.open()
      } catch(error){
        console.log(error)
      }
    }


    console.log(restaurant)
    const{name,thumb,cost,address,Cuisine} = restaurant
    let cuisineList = !(Cuisine == undefined) && Cuisine.length && Cuisine.map((item) => item.name)
    // console.log(restaurant[0])
  return (
    <div>
        <Header/>
        <div>
            <img src={thumb} width="100%" height="400px" alt=''/>
        </div>
        <div>
            <h2>{name}
                <button className="btn btn-danger" style = {{float: 'right',margin:'10px'}}
                        onClick = {()=>{
                          setisMenuModalOpen(true);
                          fetchMenu();
                          }}>
                            Place Online Order
                </button>
            </h2>
            
        </div>
        <div>
        <Tabs>
    <TabList>
      <Tab>Overview</Tab>
      <Tab>Contact</Tab>
    </TabList>

    <TabPanel>
      <div className = "about">About the place</div>
      <div className = "head">Cuisine</div> 
      {cuisineList}
      <div className = "head">Average Cost</div>
      <div className = "value">&#8377; {cost}</div>
    </TabPanel>
    <TabPanel>
      <div className = "head">Phone number</div>
      <div className = "value">+91-5678392947</div>
      <div className = "head">{name}</div>
      <div className = "value">{address}</div>
    </TabPanel>
  </Tabs>
  <Modal
  isOpen={isMenuModalOpen} 
  // style={modalStyle}
  ariaHideApp={false}>
            <div>
               <h2>
                Menu
                <button onClick={()=>setisMenuModalOpen(false)} className="btn btn-danger float-end">X</button>
            </h2>
            <h3>
                {name}
            </h3>
            <ul className="">
                {
                    menu.length && 
                        menu.map((item, index)=><li key={index}>
                            <div className="col-10">
                               <div>
                                   {
                                       item.isVeg ?
                                       <div className="text-success fs-6">Veg</div>:
                                       <div className="text-danger fs-6">Non-veg</div>
                                   }
                               </div> 
                              <div className="cuisines"> {item.itemName} </div>
                              <div className="cuisines">&#8377;{item.itemPrice}</div>
                              <div className="cuisines">{item.itemDescription}</div>
                            </div>
                            <div className="col-2">
                              <button className="btn btn-secondary" onClick={()=>addItem(item)}>Add</button>
                            </div>
                            </li>)
                }
            </ul>
            <hr/>
            <h3>Total Price:{totalPrice}
            <button style = {{float : 'right'}} onClick={()=>{setisMenuModalOpen(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');OpenRazorPay(); }}>Pay Now</button></h3>

            </div>
           
            {/* <ul className="">
              {
                menu?.length && 
                  menu.map((item, index)=><li key={index}>
                     <div className="col-10">
                               <div>
                                   {
                                       item.isVeg ?
                                       <div className="text-success fs-6">Veg</div>:
                                       <div className="text-danger fs-6">Non-veg</div>
                                   }
                               </div> 
                              <div className="cuisines"> {item.itemName} </div>
                              <div className="cuisines">&#8377;{item.itemPrice}</div>
                              <div className="cuisines">{item.itemDescription}</div>
                            </div>
                            <div className="col-2">
                              <button className="btn btn-secondary" onClick={()=>addItem(item)}>Add</button>
                            </div>
                  </li>)
                
              }
            </ul> */}
            
    
  </Modal>
        </div>
    </div>
  )
}
