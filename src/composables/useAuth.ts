import { useAuthStore } from '@/stores/authStore.ts'

export function useAuth() {
  const authStore = useAuthStore()
  return {
    ...authStore
  }
}
