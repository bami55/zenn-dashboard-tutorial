import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { WsMessage } from '../interface/WsEvent'
import {
  GameUpdateState,
  Ball,
  Team,
  Player,
} from '../interface/GameUpdateState'

const flexStyle = {
  display: 'flex',
}

const WsSignal = (): JSX.Element => {
  const [isOT, setIsOT] = useState(false)
  const [isReplay, setIsReplay] = useState(false)
  const [timeSeconds, setTimeSeconds] = useState(0)
  const [timeMilliseconds, setTimeMilliseconds] = useState(0.0)
  const [ball, setBall] = useState({} as Ball)
  const [teams, setTeams] = useState([null, null] as [Team, Team])
  const [players, setPlayers] = useState({} as { [key: string]: Player })

  const socketUrl = 'ws://localhost:49122'
  const { readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    onMessage: (e) => {
      const message: WsMessage = JSON.parse(e.data)
      if (message.event === 'game:update_state') {
        const data = message.data as GameUpdateState
        setIsOT(data.game.isOT)
        setIsReplay(data.game.isReplay)
        setTimeSeconds(data.game.time_seconds)
        setTimeMilliseconds(data.game.time_milliseconds)
        setBall(data.game.ball)
        setTeams(data.game.teams)
        setPlayers(data.players)
      }
    },
    shouldReconnect: () => true,
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: '接続試行中',
    [ReadyState.OPEN]: '接続',
    [ReadyState.CLOSING]: '切断試行中',
    [ReadyState.CLOSED]: '切断',
    [ReadyState.UNINSTANTIATED]: '動作停止',
  }[readyState]

  return (
    <div>
      <h1>{connectionStatus}</h1>
      <div style={flexStyle}>
        <div>
          <h2>
            {teams[0] && `${teams[0].name} ${teams[0].score}`}
            &nbsp;-&nbsp;
            {teams[1] && `${teams[1].score} ${teams[1].name}`}
          </h2>
          <h2>
            timeSeconds: {isReplay && 'Replay '}
            {isOT && 'OverTime: '}
            {timeSeconds}
          </h2>
          <h2>
            timeMilliseconds: {isReplay && 'Replay '}
            {isOT && 'OverTime: '}
            {timeMilliseconds}
          </h2>
          <div>
            <h2>Ball</h2>
            <ul>
              <li>Speed: {ball && ball.speed}</li>
              <li>Team: {ball && ball.team}</li>
              <li>X: {ball && ball.location && ball.location.X}</li>
              <li>Y: {ball && ball.location && ball.location.Y}</li>
              <li>Z: {ball && ball.location && ball.location.Z}</li>
            </ul>
          </div>
          <div>
            <h2>Players</h2>
            <ul>
              {players &&
                Object.entries(players).map(([key, val]) => (
                  <li key={key}>
                    {val.name} {val.boost}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WsSignal
