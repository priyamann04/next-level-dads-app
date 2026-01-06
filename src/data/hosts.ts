/**
 * Host/organizer data for events
 */

export interface Host {
  id: string
  name: string
  email: string
  phone: string
  description: string
}

export const hosts: Host[] = [
  {
    id: 'saturday-coffee-dads',
    name: 'Saturday Coffee Dads',
    email: 'saturdaycoffee@nextleveldads.com',
    phone: '(416) 555-0123',
    description: 'A community of dads who meet every Saturday morning for coffee, conversation, and connection.',
  },
  {
    id: 'new-dads-support',
    name: 'New Dads Support',
    email: 'newdads@nextleveldads.com',
    phone: '(604) 555-0456',
    description: 'Supporting new fathers through the early stages of parenthood with resources, events, and peer connections.',
  },
  {
    id: 'outdoor-adventure-dads',
    name: 'Outdoor Adventure Dads',
    email: 'outdoors@nextleveldads.com',
    phone: '(403) 555-0789',
    description: 'For dads who love hiking, camping, and exploring nature with their kids.',
  },
]

export const getHostById = (id: string): Host | undefined => {
  return hosts.find(host => host.id === id)
}

export const getHostByName = (name: string): Host | undefined => {
  return hosts.find(host => host.name === name)
}

/**
 * Convert host name to URL-friendly slug
 */
export const hostNameToId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
