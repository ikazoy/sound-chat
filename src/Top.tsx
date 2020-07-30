import React, { useEffect, useState } from 'react'
import './App.css'
import { WindowOpener } from './window-opener'

export class Home extends React.Component {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props)
  }

  sonResponse(err: any, res: any) {
    if (err) {
      // this.setState({ message: res })
    }
    // this.setState({ message: res })
  }

  render() {
    return (
      <div>
        <WindowOpener url="/chat" bridge={this.sonResponse}>
          Open app in a new window
        </WindowOpener>
      </div>
    )
  }
}
