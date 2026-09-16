-- Tambah kolom gallery ke posts — multi images feature, persis seperti projects.
ALTER TABLE posts
  ADD COLUMN gallery TEXT[] DEFAULT '{}';