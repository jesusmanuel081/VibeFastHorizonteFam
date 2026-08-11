import Link from "next/link"
import { redirect } from "next/navigation"
import config from "@/config"
import { getUser } from "@/lib/supabase/server"
import GoogleButton from "@/components/auth/GoogleButton"
import EmailLoginForm from "@/components/auth/EmailLoginForm"
import Logo from "@/components/Logo"

export const metadata = { title: "Entrar" }

export default async function LoginPage({ searchParams }) {
  const user = await getUser()
  if (user) redirect(config.auth.afterLoginUrl)

  const params = await searchParams
  const next =
    typeof params?.next === "string" ? params.next : config.auth.afterLoginUrl
  const hasError = params?.error

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-base-200 bg-base-100 p-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Logo className="size-7" />
          {config.brand.logoText}
        </Link>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">Entra a tu cuenta</h1>
        <p className="mt-2 text-sm text-base-content/70">
          Usa tu cuenta de Google o un acceso con correo y contraseña.
        </p>

        {hasError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-error/40 bg-error/10 px-3 py-2 text-sm text-error"
          >
            No pudimos iniciar sesión. Intenta de nuevo.
          </div>
        )}

        {config.features.emailLogin && <EmailLoginForm next={next} />}

        {config.features.googleAuth && (
          <>
            <div className="my-5 flex items-center gap-3 text-xs text-base-content/40">
              <span className="h-px flex-1 bg-base-300" />
              o continúa con
              <span className="h-px flex-1 bg-base-300" />
            </div>
            <GoogleButton next={next} />
          </>
        )}

        {!config.features.googleAuth && !config.features.emailLogin && (
          <p className="mt-6 text-sm text-base-content/60">
            El login está desactivado en <code>config.features.*</code>.
          </p>
        )}

        <p className="mt-6 text-center text-xs text-base-content/50">
          Al continuar aceptas los términos del curso VibeFast.
        </p>
      </div>
    </main>
  )
}
