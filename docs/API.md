# API.md
# API Documentation (Supabase)

## 🔗 Supabase Client Setup

### Server Client (Server Components, Route Handlers)
```typescript
// lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    }
  );
}
```

### Browser Client (Client Components)
```typescript
// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 📦 Projects API

### Get All Projects
```typescript
// Server-side
const { data, error } = await supabase
  .from("projects")
  .select("*")
  .eq("status", "published")
  .order("created_at", { ascending: false });

// Response type
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tech_stack: string[];
  live_url: string;
  github_url: string;
  featured_image: string;
  gallery: string[];
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}
```

### Get Project by Slug
```typescript
const { data, error } = await supabase
  .from("projects")
  .select("*")
  .eq("slug", slug)
  .single();
```

### Get Featured Projects
```typescript
const { data, error } = await supabase
  .from("projects")
  .select("*")
  .eq("status", "published")
  .eq("is_featured", true)
  .order("sort_order", { ascending: true })
  .limit(6);
```

### Create Project
```typescript
const { data, error } = await supabase
  .from("projects")
  .insert([
    {
      title: "Project Name",
      slug: "project-name",
      description: "Short description",
      content: "# Markdown content",
      category: "web",
      tech_stack: ["React", "Next.js", "TypeScript"],
      live_url: "https://project.vercel.app",
      github_url: "https://github.com/user/project",
      featured_image: "https://...",
      gallery: ["url1", "url2"],
      status: "draft",
      is_featured: false,
      sort_order: 0,
      seo_title: "SEO Title",
      seo_description: "SEO Description",
    },
  ])
  .select();
```

### Update Project
```typescript
const { data, error } = await supabase
  .from("projects")
  .update({
    title: "Updated Title",
    status: "published",
    updated_at: new Date().toISOString(),
  })
  .eq("id", projectId)
  .select();
```

### Delete Project
```typescript
const { error } = await supabase
  .from("projects")
  .delete()
  .eq("id", projectId);
```

---

## 📝 Blog Posts API

### Get All Posts
```typescript
const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false });
```

### Get Post by Slug
```typescript
const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("slug", slug)
  .single();
```

### Create Post
```typescript
const { data, error } = await supabase
  .from("posts")
  .insert([
    {
      title: "Blog Post Title",
      slug: "blog-post-title",
      content: "# Markdown content here",
      excerpt: "Short excerpt...",
      featured_image: "https://...",
      category: "tutorial",
      tags: ["nextjs", "supabase", "tutorial"],
      status: "draft",
      published_at: new Date().toISOString(),
      read_time: 5,
      seo_title: "SEO Title",
      seo_description: "SEO Description",
    },
  ])
  .select();
```

### Update Post
```typescript
const { data, error } = await supabase
  .from("posts")
  .update({
    title: "Updated Title",
    content: "Updated content",
    status: "published",
    updated_at: new Date().toISOString(),
  })
  .eq("id", postId)
  .select();
```

### Delete Post
```typescript
const { error } = await supabase
  .from("posts")
  .delete()
  .eq("id", postId);
```

---

## ✉️ Messages API

### Get All Messages
```typescript
const { data, error } = await supabase
  .from("messages")
  .select("*")
  .order("created_at", { ascending: false });
```

### Get Unread Messages
```typescript
const { data, error } = await supabase
  .from("messages")
  .select("*")
  .eq("is_read", false)
  .order("created_at", { ascending: false });
```

### Create Message (Contact Form)
```typescript
const { data, error } = await supabase
  .from("messages")
  .insert([
    {
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "Hello, I'd like to discuss a project...",
    },
  ])
  .select();
```

### Mark as Read
```typescript
const { error } = await supabase
  .from("messages")
  .update({ is_read: true })
  .eq("id", messageId);
```

### Delete Message
```typescript
const { error } = await supabase
  .from("messages")
  .delete()
  .eq("id", messageId);
```

---

## ⚙️ Settings API

### Get Setting
```typescript
const { data, error } = await supabase
  .from("settings")
  .select("value")
  .eq("key", "site_title")
  .single();

// data.value = "My Portfolio"
```

### Get All Settings
```typescript
const { data, error } = await supabase
  .from("settings")
  .select("*");

// data = [
//   { key: "site_title", value: "My Portfolio" },
//   { key: "social_github", value: "https://github.com/user" },
//   ...
// ]
```

### Upsert Setting
```typescript
const { error } = await supabase
  .from("settings")
  .upsert(
    { key: "site_title", value: "My Portfolio" },
    { onConflict: "key" }
  );
```

---

## 🛠️ Skills API

### Get All Skills
```typescript
const { data, error } = await supabase
  .from("skills")
  .select("*")
  .order("sort_order", { ascending: true });
```

### Get Skills by Category
```typescript
const { data, error } = await supabase
  .from("skills")
  .select("*")
  .eq("category", "frontend")
  .order("proficiency", { ascending: false });
```

### Create Skill
```typescript
const { data, error } = await supabase
  .from("skills")
  .insert([
    {
      name: "React",
      category: "frontend",
      proficiency: 90,
      icon: "react",
      sort_order: 1,
    },
  ])
  .select();
```

---

## 📁 File Upload (Supabase Storage)

### Upload Image
```typescript
const file = event.target.files?.[0];
if (!file) return;

const fileExt = file.name.split(".").pop();
const fileName = `${Math.random()}.${fileExt}`;
const filePath = `projects/${fileName}`;

const { data, error } = await supabase.storage
  .from("images")
  .upload(filePath, file);

if (error) {
  console.error("Upload error:", error);
  return;
}

// Get public URL
const { data: urlData } = supabase.storage
  .from("images")
  .getPublicUrl(filePath);

console.log("Image URL:", urlData.publicUrl);
```

### Delete Image
```typescript
const { error } = await supabase.storage
  .from("images")
  .remove(["projects/image.jpg"]);
```

---

## 🔐 Auth API

### Login
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: "admin@example.com",
  password: "password123",
});

if (error) {
  console.error("Login error:", error);
  return;
}

console.log("Logged in:", data.user);
```

### Logout
```typescript
const { error } = await supabase.auth.signOut();
```

### Get Current User
```typescript
const { data: { user }, error } = await supabase.auth.getUser();

if (!user) {
  // Redirect to login
  redirect("/login");
}
```

### Check Auth (Middleware)
```typescript
// middleware.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
```

---

## 🔄 Real-time Subscriptions (Optional)

### Listen for New Messages
```typescript
useEffect(() => {
  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        console.log("New message:", payload.new);
        // Show notification
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## ⚠️ Error Handling Pattern

```typescript
async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching projects:", error.message);
    throw new Error("Failed to fetch projects");
  }

  return data;
}
```

---

## 📊 Response Types

```typescript
// Supabase response wrapper
interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
  count: number | null;
  status: number;
  statusText: string;
}

interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}
```

---

*Last Updated: August 2026*