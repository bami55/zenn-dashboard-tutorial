import { useState } from 'react'

import { WsEvent } from '../interface/WsEvent'

const preStyle = {
  background: '#333',
  color: '#eee',
  height: '300px',
  width: '500px',
  overflowY: 'auto',
}

const WsSignal = (): JSX.Element => {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([] as Array<WsEvent>)

  const ws = new WebSocket('ws://localhost:42321')

  ws.onopen = () => {
    setConnected(true)
  }

  ws.onmessage = (e) => {
    const message: WsEvent = e.data
    setMessages(messages.concat(message))
  }

  ws.onclose = () => {
    setConnected(false)
  }

  ws.onerror = (e) => {
    console.error(e)
  }

  return (
    <div>
      <h1>{connected ? '接続' : '切断'}</h1>
      <pre style={preStyle}>{messages.join('\n')}</pre>
    </div>
  )
}

export default WsSignal
