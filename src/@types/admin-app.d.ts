interface Estimate {
  _homeowner: string
  _contractor: string
  address: Address
  milestones: Milestone[]
  receipts: Receipt[]
  activated: boolean
  completed: boolean
  totalCost: number
  remainingBalance: number
  dateCreated: Date
}

interface Milestone {
  _id: string
  _project: string
  _category: string
  _contractor: string
  name: string
  description: string
  price: number
  contractorPercentage: number
  status: string
  receipt: string // ref
  images: string[]
  notes: string
  __v?: string
}

interface Receipt {
  _milestone: string // ref
  _project: string // ref
  link: string
  dateCreated: Date
}

interface Homeowner {
  _id: string
  firstName: string
  lastName: string
  address: HomeownerAddress
  email: string
  phone: string
  stripeCustomerId: string
  estimates: string // ref
  dateCreated: Date
}

interface Address {
  street: string
  city: string
  state: string // TODO: change to enum
  zip: number
  place_id: string
  url: string
}

interface GenericAddress {
  street: string
  city: string
  state: string // TODO: change to enum
  zip: number
}

interface Contractor {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  personalAddress: {
    zip: number
    city: string
    state: string
    street: string
  }
  description: string
  profileImage: string
  companyName: string
  companyAddress: {
    zip: number
    city: string
    state: string
    street: string
  }
  contractorsLicense: {
    licenseVerified: true
    state: string
    licenseImage: string
    licenseNumber: string
    expirationDate: Date
  }
  insurancePolicy: {
    insuranceVerified: true
    policyNumber: string
    expirationDate: Date
    insuranceImage: string
  }
  backgroundCheckStatus: string
  activated: true
  projects: []
  stripeContractorId: string
  dateCreated: Date
  __v?: number
  category: string
}
