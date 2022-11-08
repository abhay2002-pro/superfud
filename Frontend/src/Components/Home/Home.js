import React, { Component } from 'react'
import Wallpaper from './Wallpaper'
import Mealtype from './Mealtype'
export default class Home extends Component {
  render() {
    return (
      <div>
        <Wallpaper/>
        <Mealtype />
      </div>
    )
  }
}
