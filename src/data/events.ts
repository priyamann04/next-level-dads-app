/**
 * Shared event data used across Discover and Groups
 */

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'Local' | 'Virtual'
  price: string // "Free" or "$15" (includes currency symbol)
  attending: number
  host: string
  hostAvatar?: string
  hostEmail?: string
  hostPhone?: string
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Saturday Morning Coffee Meetup',
    description: 'Join fellow dads for a relaxed Saturday morning coffee. Share stories, swap parenting tips, and build lasting friendships in a casual setting.',
    date: 'Sat, Nov 16',
    time: '9:00 AM',
    location: "Joe's Coffee Shop",
    type: 'Local',
    price: 'Free',
    attending: 12,
    host: 'Saturday Coffee Dads',
    hostEmail: 'coffee@saturdaydads.com',
    hostPhone: '(555) 123-4567',
  },
  {
    id: 2,
    title: 'Virtual Parenting Q&A',
    description: 'An interactive online session where dads can ask questions and share experiences with a panel of experienced fathers and parenting experts.',
    date: 'Thu, Nov 14',
    time: '7:00 PM',
    location: 'Online via Zoom',
    type: 'Virtual',
    price: 'Free',
    attending: 28,
    host: 'New Dads Support',
    hostEmail: 'support@newdads.org',
    hostPhone: '(555) 987-6543',
  },
  {
    id: 3,
    title: 'Dad & Kids Hiking Adventure',
    description: 'A family-friendly hike through Mountain View Trail. Perfect for dads looking to spend quality outdoor time with their kids while connecting with other fathers.',
    date: 'Sun, Nov 17',
    time: '10:00 AM',
    location: 'Mountain View Trail',
    type: 'Local',
    price: '$10',
    attending: 15,
    host: 'Outdoor Adventure Dads',
    hostEmail: 'hikes@outdoordads.com',
    hostPhone: '(555) 456-7890',
  },
]

export const getEventById = (id: number): Event | undefined => {
  return events.find(event => event.id === id)
}

export const getEventsByIds = (ids: number[]): Event[] => {
  return events.filter(event => ids.includes(event.id))
}
