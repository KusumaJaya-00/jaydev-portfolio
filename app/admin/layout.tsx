'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/admin/LogoutButton'
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Mail,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
]

const bottomLinkCls =
  'flex items-center notch-sm text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 glass p-6 flex flex-col transition-[width] duration-200',
          collapsed ? 'w-[76px]' : 'w-64'
        )}
      >
        <div className={cn('flex items-center h-8', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <Link href="/admin" className="text-xl font-bold text-primary">
              Admin Dashboard
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <nav className={cn('space-y-2 flex-1', collapsed ? 'mt-8' : 'mt-8')}>
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                'flex items-center notch-sm text-sm transition-colors',
                collapsed ? 'justify-center px-0 py-2' : 'gap-2 px-3 py-2',
                pathname === href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && label}
            </Link>
          ))}
        </nav>
        <div className={cn('space-y-2', collapsed && 'flex flex-col items-center')}>
          <Link
            href="/"
            title="Beranda"
            className={cn(bottomLinkCls, collapsed ? 'px-0 py-2' : 'w-full gap-2 px-3 py-2')}
          >
            <Home className="h-4 w-4 shrink-0" />
            {!collapsed && 'Beranda'}
          </Link>
          <LogoutButton iconOnly={collapsed} />
        </div>
      </aside>
      <main className={cn('p-8 transition-[margin] duration-200', collapsed ? 'ml-[76px]' : 'ml-64')}>
        {children}
      </main>
    </div>
  )
}
