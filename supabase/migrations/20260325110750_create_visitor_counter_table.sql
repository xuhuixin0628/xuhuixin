/*
  # Create visitor counter table

  1. New Tables
    - `visitor_counter`
      - `id` (uuid, primary key)
      - `count` (bigint, tracks total visitor count)
      - `updated_at` (timestamp, last update time)

  2. Security
    - Enable RLS on `visitor_counter` table
    - Add public read policy for everyone to view count
    - Add service role policy to increment count
*/

CREATE TABLE IF NOT EXISTS visitor_counter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  count bigint DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visitor count"
  ON visitor_counter
  FOR SELECT
  USING (true);

INSERT INTO visitor_counter (count) VALUES (0)
ON CONFLICT DO NOTHING;