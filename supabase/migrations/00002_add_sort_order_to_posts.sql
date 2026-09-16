-- Tambah sort_order ke posts untuk urutan manual via admin dashboard.
ALTER TABLE posts
  ADD COLUMN sort_order INTEGER DEFAULT 0;

CREATE INDEX idx_posts_sort_order ON posts(sort_order ASC);