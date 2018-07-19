import React, { Component } from 'react'
import MathJax from 'react-mathjax'
import classNames from 'classnames'
import classes from './index.css'
import PropTypes from 'prop-types'

class LaTeX extends Component {
  static propTypes = {
    onDidUpdate: PropTypes.func,
    formula: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    onDidUpdate: () => {},
    inline: false,
    onClick: () => {},
    className: undefined
  }

  state = {
    formula: this.props.formula,
    nextFormula: null,
    rendering: true
  };

  componentWillReceiveProps(props) {
    const last = this.state.nextFormula || this.state.formula
    if (last === props.formula) return
    if (this.state.rendering) {
      this.setState({
        nextFormula: props.formula
      })
    } else {
      this.setState({
        nextFormula: null,
        formula: props.formula,
        rendering: true
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props && nextState === this.state) return false
    return true
  }

  componentDidUpdate() {
    if (this.state.rendering) return
    if (this.props.onDidUpdate) this.props.onDidUpdate(this.wrap)
  }

  latexOnRender = () => {
    if (this.state.nextFormula) {
      this.setState({
        formula: this.state.nextFormula,
        nextFormula: null,
        rendering: true
      })
    } else {
      this.setState({ rendering: false })
    }
  };

  render() {
    return (
      <div
        ref={c => (this.wrap = c)}
        className={classNames(this.props.className, {
          [classes.Inline]: this.props.inline
        })}
        onClick={this.props.onClick}
      >
        <MathJax.Provider inline={this.props.inline}>
          <MathJax.Node
            inline={this.props.inline}
            onRender={this.latexOnRender}
            formula={this.state.formula}
          />
        </MathJax.Provider>
      </div>
    )
  }
}

export default LaTeX
