DROP DATABASE IF EXISTS preme_dev;
CREATE DATABASE preme_dev;

\c preme_dev;

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For UUID generation

DROP TABLE IF EXISTS affirmations;
CREATE TABLE affirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  source_db TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
