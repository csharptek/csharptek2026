-- Run once on Railway PostgreSQL
-- Connect via Railway CLI: railway connect PostgreSQL

-- Authors
CREATE TABLE IF NOT EXISTS blog_authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120),
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default author
INSERT INTO blog_authors (name, role, bio)
VALUES ('CSharpTek Team', 'AI Engineering Team', 'AI-first software development across healthcare, education, wellness and more.')
ON CONFLICT DO NOTHING;

-- Images
CREATE TABLE IF NOT EXISTS blog_images (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  url TEXT NOT NULL,
  alt TEXT,
  size_bytes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  excerpt TEXT,
  category VARCHAR(100),
  category_color VARCHAR(20) DEFAULT '#FF6B2B',
  read_time VARCHAR(30),
  icon VARCHAR(10) DEFAULT '📝',
  tags TEXT[] DEFAULT '{}',
  body JSONB DEFAULT '[]',
  author_id INTEGER REFERENCES blog_authors(id) ON DELETE SET NULL,
  og_image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  ip_address VARCHAR(60),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings (key-value store for admin settings)
CREATE TABLE IF NOT EXISTS admin_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings keys
INSERT INTO admin_settings (key, value) VALUES
  ('azure_storage_account', ''),
  ('azure_storage_key', ''),
  ('azure_container_name', 'blog-images'),
  ('microsoft_tenant_id', ''),
  ('microsoft_client_id', ''),
  ('microsoft_client_secret', ''),
  ('microsoft_sender_email', ''),
  ('comment_notify_email', 'info@csharptek.com')
ON CONFLICT (key) DO NOTHING;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(approved);
