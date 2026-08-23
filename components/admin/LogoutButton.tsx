'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function LogoutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Full navigation (bukan router.push) so proxy re-evaluates the cleared session cookie
    window.location.assign('/login')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      title="Logout"
      className={cn(
        'text-muted-foreground hover:text-destructive notch-sm',
        iconOnly ? 'px-0' : 'w-full justify-start px-3 gap-2'
      )}
    >
      <LogOut className="h-4 w-4 shrink-0" />
      {!iconOnly && 'Logout'}
    </Button>
  )
}
