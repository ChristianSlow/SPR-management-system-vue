export interface Curriculum {
  uid?: string
  name?: string
  course?: string
  major?: string
  firstYear?: Year
  secondYear?: Year
  thirdYear?: Year
  fourthYear?: Year
  createdAt?: any
}

export interface Year {
  first?: string[]
  second?: string[]
}
