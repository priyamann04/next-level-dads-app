import { STAGE_DISPLAY_MAP } from '@/config/constants'

export const getStageDisplayLabel = (stage: string): string =>
  STAGE_DISPLAY_MAP[stage] ?? stage
