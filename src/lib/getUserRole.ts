// lib/getUserRole.ts
import { createClient } from '@/lib/supabase/client'

export async function getUserRole(userId: string) {
  const supabase = createClient()

  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  return data?.role
}
