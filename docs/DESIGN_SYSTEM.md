# DESIGN_SYSTEM.md
# Design Tokens, Colors, Typography & Components

## 🎨 Color System

### CSS Variables (in `globals.css`)
```css
:root {
  /* Background */
  --background: 0 0% 3.9%;        /* #0a0a0a */
  --foreground: 0 0% 98%;         /* #fafafa */

  /* Card */
  --card: 0 0% 6%;                /* #111111 */
  --card-foreground: 0 0% 98%;    /* #fafafa */

  /* Popover */
  --popover: 0 0% 6%;             /* #111111 */
  --popover-foreground: 0 0% 98%; /* #fafafa */

  /* Primary */
  --primary: 239 84% 67%;         /* #6366f1 (Indigo) */
  --primary-foreground: 0 0% 100%; /* #ffffff */

  /* Secondary */
  --secondary: 0 0% 10%;          /* #1a1a1a */
  --secondary-foreground: 0 0% 98%; /* #fafafa */

  /* Muted */
  --muted: 0 0% 10%;              /* #1a1a1a */
  --muted-foreground: 0 0% 63.9%; /* #a3a3a3 */

  /* Accent */
  --accent: 0 0% 10%;             /* #1a1a1a */
  --accent-foreground: 0 0% 98%;  /* #fafafa */

  /* Destructive */
  --destructive: 0 84.2% 60.2%;   /* #ef4444 */
  --destructive-foreground: 0 0% 98%; /* #fafafa */

  /* Border */
  --border: 0 0% 14.9%;           /* #262626 */

  /* Input */
  --input: 0 0% 14.9%;            /* #262626 */

  /* Ring */
  --ring: 239 84% 67%;            /* #6366f1 */

  /* Sidebar */
  --sidebar-background: 0 0% 3.9%;
  --sidebar-foreground: 0 0% 98%;
  --sidebar-primary: 239 84% 67%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 0 0% 10%;
  --sidebar-accent-foreground: 0 0% 98%;
  --sidebar-border: 0 0% 14.9%;
  --sidebar-ring: 239 84% 67%;
}
```

### Color Palette Reference

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#0a0a0a` | Main background |
| Surface | `#111111` | Cards, modals |
| Elevated | `#1a1a1a` | Hover states, secondary bg |
| Border | `#262626` | Dividers, borders |
| Text Primary | `#fafafa` | Headings, body |
| Text Secondary | `#a3a3a3` | Captions, muted text |
| Accent | `#6366f1` | Buttons, links, highlights |
| Accent Hover | `#818cf8` | Hover state |
| Success | `#22c55e` | Success messages |
| Warning | `#f59e0b` | Warnings |
| Error | `#ef4444` | Errors, destructive |

---

## 🔤 Typography

### Font Stack
```css
/* Body */
font-family: "Inter", system-ui, sans-serif;

/* Headings */
font-family: "Space Grotesk", "Inter", system-ui, sans-serif;

/* Code */
font-family: "JetBrains Mono", "Fira Code", monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-5xl` | 3rem (48px) | Bold | 1.1 | Hero title |
| `text-4xl` | 2.25rem (36px) | Bold | 1.2 | Section title |
| `text-3xl` | 1.875rem (30px) | Semibold | 1.3 | Page title |
| `text-2xl` | 1.5rem (24px) | Semibold | 1.4 | Card title |
| `text-xl` | 1.25rem (20px) | Medium | 1.5 | Subtitle |
| `text-lg` | 1.125rem (18px) | Regular | 1.6 | Large body |
| `text-base` | 1rem (16px) | Regular | 1.5 | Body |
| `text-sm` | 0.875rem (14px) | Regular | 1.5 | Small text |
| `text-xs` | 0.75rem (12px) | Regular | 1.5 | Caption |

### Usage Examples
```tsx
<h1 className="text-5xl font-bold tracking-tight">Hero Title</h1>
<h2 className="text-4xl font-bold">Section Title</h2>
<h3 className="text-2xl font-semibold">Card Title</h3>
<p className="text-base text-muted-foreground">Body text</p>
<span className="text-sm text-muted-foreground">Caption</span>
```

---

## 📏 Spacing System

### Scale
| Token | Value | Usage |
|-------|-------|-------|
| `p-0` | 0 | Reset |
| `p-1` | 0.25rem (4px) | Tight spacing |
| `p-2` | 0.5rem (8px) | Small spacing |
| `p-3` | 0.75rem (12px) | Medium spacing |
| `p-4` | 1rem (16px) | Default spacing |
| `p-6` | 1.5rem (24px) | Section spacing |
| `p-8` | 2rem (32px) | Large spacing |
| `p-12` | 3rem (48px) | Section padding |
| `p-16` | 4rem (64px) | Hero padding |

### Layout Spacing
```tsx
/* Page padding */
<div className="container mx-auto px-4 md:px-8 lg:px-12">

/* Section spacing */
<section className="py-12 md:py-20">

/* Card padding */
<div className="p-6">

/* Gap between items */
<div className="gap-4 md:gap-6">
```

---

## 🎭 Components (shadcn/ui)

### Button
```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔔</Button>
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

### Input
```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Textarea placeholder="Write something..." rows={4} />
```

### Select
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="web">Web</SelectItem>
    <SelectItem value="mobile">Mobile</SelectItem>
    <SelectItem value="design">Design</SelectItem>
  </SelectContent>
</Select>
```

### Dialog (Modal)
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    <p>Modal content goes here.</p>
  </DialogContent>
</Dialog>
```

### Table
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Project A</TableCell>
      <TableCell>Published</TableCell>
      <TableCell><Button size="sm">Edit</Button></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Toast (Notification)
```tsx
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Your changes have been saved.",
});

toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
});
```

---

## 🖱️ Cursor Effect

### Glow Effect
```tsx
"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
      }}
    />
  );
}
```

### Particle Effect (Advanced)
```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

### Usage
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<h1 className="text-3xl md:text-5xl">
  {/* Responsive text */}
</h1>

<section className="py-12 md:py-20 px-4 md:px-8">
  {/* Responsive padding */}
</section>
```

---

## 🎬 Animations

### Framer Motion Presets
```tsx
import { motion } from "framer-motion";

// Fade in up
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Scale on hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};
```

### Usage
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Card>...</Card>
</motion.div>
```

---

## 🎨 Design Patterns

### Card Pattern
```tsx
<motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
  <Card className="bg-card border-border hover:border-primary/50 transition-colors">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
</motion.div>
```

### Section Pattern
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Section Title</h2>
      {/* Content */}
    </motion.div>
  </div>
</section>
```

---