export type EventType = 'local' | 'virtual'

export interface Event {
  id: string
  name: string
  description: string | null
  type: EventType
  starts_at: string
  ends_at: string | null
  location: string
  latitude: number | null
  longitude: number | null
  hosted_by_user_id: string | null
  hosted_by_org_name: string | null
  hosted_by_community_id: string | null
  contact_email: string | null
  contact_phone: string | null
  price_cad: string
  attendee_count: number
  created_by: string | null
  created_at: string
  is_attending: boolean
}

export interface DiscoverEventsFilters {
  name: string
  type: EventType | null
  is_free: boolean | null
}

export interface DiscoverEventsCursor {
  cursor_id: string
  cursor_starts_at: string
}
