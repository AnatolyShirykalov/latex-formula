import React, { Component } from 'react'
import './app.css'
import LaTeX from 'latex-formula'

export default class App extends Component {
  state = {
    formula: "\\int\\limits_0^\\infty e^{-\\frac{x^2}2}\\,dx"
  }
  render () {
    const {formula} = this.state
    return (
      <div>
        <div>
          <textarea
            value={formula}
            onChange={(e)=>this.setState({formula: e.target.value})}
          />
        </div>
        <div>
          <h1>Выключная</h1>
          <LaTeX formula={formula} />
        </div>
        <div>
          <h1>Строчная</h1>
          <LaTeX inline formula={formula} />
        </div>
        <div>
          <h1>Свой стиль</h1>
          <LaTeX className='my-class' formula={formula} />
        </div>
      </div>
    )
  }
}
