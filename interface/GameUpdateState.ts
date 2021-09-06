export interface Ball {
  location: {
    X: number
    Y: number
    Z: number
  }
  speed: number
  team: number
}

export interface Team {
  color_primary: string
  color_secondary: string
  name: string
  score: number
}

export interface Player {
  assists: number
  attacker: string
  boost: number
  cartouches: number
  demos: number
  goals: number
  hasCar: boolean
  id: string
  isDead: boolean
  isPowersliding: boolean
  isSonic: boolean
  location: {
    X: number
    Y: number
    Z: number
    pitch: number
    roll: number
    yaw: number
  }
  name: string
  onGround: boolean
  onWall: boolean
  primaryID: string
  saves: number
  score: number
  shortcut: number
  shots: number
  speed: number
  team: number
  touches: number
}

export interface GameUpdateState {
  event: string
  game: {
    arena: string
    ball: Ball
    hasTarget: boolean
    hasWinner: boolean
    isOT: boolean
    isReplay: boolean
    target: string
    teams: [Team, Team]
    time_milliseconds: number
    time_seconds: number
    winner: string
  }
  hasGame: boolean
  players: {
    [key: string]: Player
  }
}
