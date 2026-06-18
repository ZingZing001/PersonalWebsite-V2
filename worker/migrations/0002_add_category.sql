-- Add an AI-assigned category so the admin can see at a glance what *kinds*
-- of questions visitors ask (long question text gets cropped otherwise).
ALTER TABLE questions ADD COLUMN category TEXT;
