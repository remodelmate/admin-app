interface Estimate {
  _id: string
  _homeowner: Homeowner
  _contractor: Contractor
  collectionName: string
  layout: string
  address: Address
  milestones: Milestone[]
  receipts: Receipt[]
  activated: boolean
  completed: boolean
  totalCost: number
  remainingBalance: number
  dateCreated: Date
  contractors: Contractor[]
}

interface Milestone {
  _id: string
  _project: string
  _category: string
  _contractor: Contractor
  name: string
  description: string
  price: number
  contractorPercentage: number
  contractorPayoutAmount: number
  status: string
  receipt: Receipt // ref
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
  estimates: [] // ref
  dateCreated: Date
}

interface Address {
  street: string
  city: string
  state: string // TODO: change to enum
  zip: number
  additional: string
  place_id: string
  url: string
}

interface HomeownerAddress {
  street: string
  city: string
  state: string // TODO: change to enum
  zip: number
  additional: string
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
    additional: string
  }
  description: string
  profileImage: string
  companyName: string
  companyAddress: {
    zip: number
    city: string
    state: string
    street: string
    additional: string
  }
  contractorsLicense: [
    {
      licenseVerified: boolean
      state: string
      licenseImage: string
      licenseNumber: string
      expirationDate: Date
      status: string
    }
  ]
  insurancePolicy: [
    {
      insuranceVerified: true
      policyNumber: string
      expirationDate: Date
      insuranceImage: string
      status: string
    }
  ]
  localLicense: [
    {
      _id: string
      licenseImage: string
      companyName: string
      licenseCity: string
      licenseCode: string
      licenseNumber: string
      commercialActivityLicense: string
      dateIssued: Date
      dateExpire: Date
      dateCreated: Date
      licenseVerified: boolean
      status: string
    }
  ]
  backgroundCheckStatus: string
  activated: true
  projects: []
  stripeContractorId: string
  dateCreated: Date
  __v?: number
  category: string
}
