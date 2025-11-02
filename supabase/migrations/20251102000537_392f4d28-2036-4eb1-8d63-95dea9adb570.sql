-- Add granular notification settings
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS notifications_matches boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS notifications_messages boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS notifications_events boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS notifications_mentions boolean NOT NULL DEFAULT true;

-- Drop old notification columns if they exist (since we're replacing with more granular ones)
-- Keep notifications_push and notifications_email as they represent different channels