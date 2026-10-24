import { Button } from '@/components/ui/Button'
import { FeaturedSelector } from '@/pages/dashboard/FeaturedSelector'
import { MessageList } from '@/pages/dashboard/MessageList'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/auth'

export default function DashboardPage() {
  const { session } = useAuth()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted">{session?.user.email}</p>
        </div>
        <Button variant="ghost" onClick={() => signOut()}>
          Sair
        </Button>
      </header>
      <MessageList />
      <FeaturedSelector />
    </div>
  )
}
