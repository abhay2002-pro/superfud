import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Header.Module.css'

export default function Header() {
  return (
    <div className="header">
        <div className="slogo">
          <Link to="/" style={{color: "#ce0505", textDecoration: "none"}}>e!</Link>
        </div>
    </div>
  )
}
