import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { WsEvent } from '../interface/WsEvent'

const preStyle = {
  background: '#333',
  color: '#eee',
  height: '300px',
  width: '500px',
  overflow: 'auto',
}

const WsSignal = (): JSX.Element => {
  const [messages, setMessages] = useState([] as Array<WsEvent>)

  const socketUrl = 'ws://localhost:49122';
  const {
    readyState
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    onMessage: (e) => {
      const message: WsEvent = e.data
      setMessages(messages.concat(message))
    },
    shouldReconnect: () => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: '接続中',
    [ReadyState.OPEN]: '接続完了',
    [ReadyState.CLOSING]: '切断中',
    [ReadyState.CLOSED]: '切断完了',
    [ReadyState.UNINSTANTIATED]: '動作停止',
  }[readyState];

  return (
    <div>
      <h1>{connectionStatus}</h1>
      <pre style={preStyle}>{messages.join('\n')}</pre>
    </div>
  )
}

export default WsSignal
