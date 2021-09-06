export interface WsEvent {
  'sos:version': string
  'game:match_created': string
  'game:initialized': string
  'game:pre_countdown_begin': string
  'game:post_countdown_begin': string
  'game:update_state': {
    event: string
    game: {
      arena: string
      ball: {
        location: {
          X: number
          Y: number
          Z: number
        }
        speed: number
        team: number
      }
      hasTarget: boolean
      hasWinner: boolean
      isOT: boolean
      isReplay: boolean
      target: string
      teams: {
        '0': {
          color_primary: string
          color_secondary: string
          name: string
          score: number
        }
        '1': {
          color_primary: string
          color_secondary: string
          name: string
          score: number
        }
      }
      time: number
      winner: string
    }
    hasGame: boolean
    players: {
      'PLAYER OBJECT': {
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
    }
  }
  'game:ball_hit': {
    ball: {
      location: {
        X: number
        Y: number
        Z: number
      }
      post_hit_speed: number
      pre_hit_speed: number
    }
    player: {
      id: string
      name: string
    }
  }
  'game:statfeed_event': {
    event_name: string
    main_target: {
      id: string
      name: string
      team_num: number
    }
    secondary_target: {
      id: string
      name: string
      team_num: number
    }
    type: string
  }
  'game:goal_scored': {
    ball_last_touch: {
      player: string
      speed: number
    }
    goalspeed: number
    impact_location: {
      X: number
      Y: number
    }
    scorer: {
      id: string
      name: string
      teamnum: number
    }
  }
  'game:replay_start': string
  'game:replay_will_end': string
  'game:replay_end': string
  'game:match_ended': {
    winner_team_num: number
  }
  'game:podium_start': string
  'game:match_destroyed': string
}

export interface WsMessage {
  data: any
  event: string
}
