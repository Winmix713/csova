export interface LeagueData {
  id: string
  name: string
  season: string
  winner: string
  secondPlace: string
  thirdPlace: string
  status: "In Progress" | "Completed"
}

export interface Match {
  date: string
  home_team: string
  away_team: string
  ht_home_score: number
  ht_away_score: number
  home_score: number
  away_score: number
  round?: string
}

export interface TeamForm {
  position: number
  team: string
  played: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: string
}
