// AuthGuard.tsx
import  useAuth  from "./AuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function AuthGuard({ children }) {
  const { user, initializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        router.push("/login")
      }
    }
  }, [initializing, router, user])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return <h1> لطفا صبر کنید </h1>
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}


