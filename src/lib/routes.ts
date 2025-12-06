/**
 * Centralized Route Configuration
 * 
 * This file defines all routes in the application using clean, REST-style patterns.
 * All navigation should use these constants or helper functions.
 * 
 * Route Structure:
 * ├── / (Welcome)
 * ├── /setup (Profile Setup)
 * ├── /match (Match Screen)
 * ├── /discover/:tab (Discover - dads, communities, events)
 * ├── /communities/:communityId (Community Detail)
 * │   ├── /communities/:communityId/chat (Community Chat)
 * │   └── /communities/:communityId/members (Community Members)
 * ├── /groups/:tab (My Groups - communities, events)
 * ├── /chats (Chats List)
 * │   └── /chats/:chatId (Chat Detail)
 * ├── /profiles/:profileId (Profile Detail)
 * ├── /profile (Own Profile)
 * ├── /connections (Connections)
 * └── /requests (Requests)
 */

// ============================================
// Static Routes
// ============================================
export const ROUTES = {
  // Auth & Onboarding
  WELCOME: '/',
  SETUP: '/setup',
  MATCH: '/match',
  
  // Discover (tabbed)
  DISCOVER: '/discover',
  DISCOVER_DADS: '/discover/dads',
  DISCOVER_COMMUNITIES: '/discover/communities',
  DISCOVER_EVENTS: '/discover/events',
  
  // Dad Detail (from Discover)
  DAD_DETAIL: '/discover/dads/:dadId',
  
  // Communities
  COMMUNITIES: '/communities',
  
  // Groups (My joined communities/events - tabbed)
  GROUPS: '/groups',
  GROUPS_COMMUNITIES: '/groups/communities',
  GROUPS_EVENTS: '/groups/events',
  
  // Chats
  CHATS: '/chats',
  
  // Profile
  PROFILE: '/profile',
  PROFILES: '/profiles',
  CONNECTIONS: '/connections',
  REQUESTS: '/requests',
} as const

// ============================================
// Dynamic Route Helpers
// ============================================

/**
 * Get route for a specific discover tab
 */
export const discoverTab = (tab: 'dads' | 'communities' | 'events') => 
  `/discover/${tab}` as const

/**
 * Get route for a dad detail page (from Discover)
 */
export const dadDetail = (dadId: string) => 
  `/discover/dads/${dadId}` as const

/**
 * Get route for a specific groups tab
 */
export const groupsTab = (tab: 'communities' | 'events') => 
  `/groups/${tab}` as const

/**
 * Get route for community detail page
 */
export const communityDetail = (communityId: number | string) => 
  `/communities/${communityId}` as const

/**
 * Get route for community chat
 */
export const communityChat = (communityId: number | string) => 
  `/communities/${communityId}/chat` as const

/**
 * Get route for community members
 */
export const communityMembers = (communityId: number | string) => 
  `/communities/${communityId}/members` as const

/**
 * Get route for a specific chat
 */
export const chatDetail = (chatId: string) => 
  `/chats/${chatId}` as const

/**
 * Get route for a profile
 */
export const profileDetail = (profileId: string) => 
  `/profiles/${profileId}` as const

/**
 * Get route for profile with return context
 */
export const profileWithContext = (
  profileId: string, 
  from?: 'community' | 'discover' | 'match',
  communityId?: number | string
) => {
  let url = `/profiles/${profileId}`
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (communityId) params.set('communityId', String(communityId))
  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}

// ============================================
// Route Params Types
// ============================================
export type DiscoverTab = 'dads' | 'communities' | 'events'
export type GroupsTab = 'communities' | 'events'

// ============================================
// Navigation Defaults
// ============================================
export const DEFAULTS = {
  DISCOVER_TAB: 'dads' as DiscoverTab,
  GROUPS_TAB: 'communities' as GroupsTab,
}
