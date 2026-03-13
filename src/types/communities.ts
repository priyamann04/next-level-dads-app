export type CommunityRole = 'admin' | 'member' | null

export interface Community {
  id: string
  name: string
  description: string | null
  member_count: number
  created_by: string | null
  created_at: string
  is_member: boolean
  role: CommunityRole
}

export interface DiscoverCommunitiesFilters {
  name: string
}

export interface DiscoverCommunitiesCursor {
  cursor_id: string
  cursor_created_at: string
}
