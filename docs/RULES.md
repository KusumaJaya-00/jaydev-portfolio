# RULES.md
# Coding Rules & Conventions

## 🚨 Golden Rules

1. **TypeScript Strict** — No `any`, define all types
2. **No Hardcoded Values** — Use constants or env vars
3. **Component Reuse** — Check `components/ui/` first
4. **Server by Default** — Only use `"use client"` when needed
5. **Error Handling** — Always handle errors gracefully

---

## 📝 TypeScript Rules

### Always Define Types
```typescript
// ❌ Bad
function getProjects(projects: any[]) { ... }

// ✅ Good
interface ProjectType {
  id: string;
  title: string;
  slug: string;
}

function getProjects(projects: ProjectType[]) { ... }
```

### Use Interfaces for Props
```typescript
// ❌ Bad
function Card({ title, description }: { title: string; description: string }) { ... }

// ✅ Good
interface CardProps {
  title: string;
  description: string;
}

function Card({ title, description }: CardProps) { ... }
```

### No `any` Type
```typescript
// ❌ Bad
const data: any = await fetchData();

// ✅ Good
const data: ProjectType[] = await fetchData();
```

---

## 🎨 Component Rules

### File Naming
```
components/
├── ui/           # shadcn (PascalCase)
├── layout/       # PascalCase
├── sections/     # PascalCase + Section suffix
└── effects/      # PascalCase + Effect name
```

### Component Structure
```tsx
// 1. "use client" ONLY if uses hooks
"use client";

// 2. Imports (external first, then internal)
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 3. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 4. Component
export function Component({ title }: ComponentProps) {
  // 5. Hooks
  const [state, setState] = useState(false);

  // 6. Derived state
  const computed = state ? "yes" : "no";

  // 7. Handlers
  const handleClick = () => { ... };

  // 8. Render
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### Server vs Client Components
```typescript
// Server Component (default) — for data fetching
export default async function Page() {
  const data = await getData(); // Direct DB call
  return <ClientComponent data={data} />;
}

// Client Component — for interactivity
"use client";
export function InteractiveComponent({ data }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

## 🎨 Styling Rules

### Tailwind Classes
```tsx
// ❌ Bad
<div style={{ backgroundColor: "red" }}>

// ✅ Good
<div className="bg-red-500">
```

### Class Order (Tailwind recommended order)
```
1. Layout:    block, flex, grid, container
2. Position:  relative, absolute, fixed
3. Box:       w-, h-, p-, m-
4. Typography: text-, font-, leading-
5. Background: bg-
6. Border:    border-, rounded-
7. Effects:   shadow-, opacity-
8. Interactive: hover:, focus:
```

### Responsive Classes
```tsx
// Mobile first approach
<div className="p-4 md:p-8 lg:p-12">
```

### Dark Theme
```tsx
// Dark is default, use light overrides if needed
<div className="bg-background text-foreground">
  {/* Light mode override (if added later) */}
  <div className="dark:bg-background">
```

---

## 📁 File Organization

### Imports Order
```typescript
// 1. React/Next.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 2. External libraries
import { motion } from "framer-motion";
import { format } from "date-fns";

// 3. UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 4. Internal components
import { ProjectCard } from "@/components/projects/ProjectCard";

// 5. Lib/utilities
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// 6. Types
import type { ProjectType } from "@/types";
```

### Export Convention
```typescript
// Named export for components
export function MyComponent() { ... }

// Default export for pages
export default function Page() { ... }
```

---

## 🔧 Supabase Rules

### Always Handle Errors
```typescript
// ❌ Bad
const { data } = await supabase.from("projects").select("*");

// ✅ Good
const { data, error } = await supabase.from("projects").select("*");

if (error) {
  console.error("Error fetching projects:", error);
  throw new Error("Failed to fetch projects");
}
```

### Use Proper Client
```typescript
// Server-side (Server Components, Route Handlers)
import { createClient } from "@/lib/supabase/server";
const supabase = createClient();

// Client-side (Client Components)
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
```

### Query Building
```typescript
// Select specific fields
const { data } = await supabase
  .from("projects")
  .select("id, title, slug, featured_image")
  .eq("status", "published")
  .order("created_at", { ascending: false })
  .limit(6);
```

---

## 🐛 Error Handling

### API Routes
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Process...
    return Response.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Components
```typescript
export async function ProjectsSection() {
  try {
    const projects = await getProjects();
    return <ProjectGrid projects={projects} />;
  } catch (error) {
    return <ErrorState message="Failed to load projects" />;
  }
}
```

---

## 📝 Commit Rules

### Format
```
type(scope): description

Examples:
feat(homepage): add hero section with cursor effect
fix(blog): correct date formatting
style(admin): improve responsive layout
```

### Rules
1. **One logical change per commit**
2. **Descriptive message** — what and why
3. **No WIP commits** — commit when feature works
4. **Test before commit** — `npm run build` should pass

---

## ✅ Pre-Commit Checklist

- [ ] No TypeScript errors (`npm run build`)
- [ ] No lint errors (`npm run lint`)
- [ ] Components render correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Env vars not committed

---

*Last Updated: August 2026*