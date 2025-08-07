import { Component, PropsWithChildren } from 'react'
import './app.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    console.log("Component did mount");
  }

  componentDidShow () {
    console.log("Component did show here");
  }

  componentDidHide () {}

  render () {
    // this.props.children It's the page that's about to be rendered.
    return this.props.children
  }
}

export default App
