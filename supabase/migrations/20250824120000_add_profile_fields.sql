-- Add name and interests fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}';

-- Update existing profiles to have empty interests array
UPDATE profiles SET interests = '{}' WHERE interests IS NULL;

-- Add comment to explain the interests field
COMMENT ON COLUMN profiles.interests IS 'Array of user interests as strings';
