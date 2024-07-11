export type Trip = {
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export type Participant = {
  id: string
  name: string
  email: string
  is_confirmed: boolean
}

export type Activity = {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export type ImportantLink = {
  id: string
  title: string
  url: string
}
