# CHECKPOINT — Horizonte Familiar
## 2026-08-18 · Sesión de trabajo

---

## Estado actual de la plataforma
- **Repo:** https://github.com/jesusmanuel081/VibeFastHorizonteFam.git
- **Branch:** main (commit `d88a672`)
- **Deploy Vercel:** https://vibe-fast-horizonte-fam-web.vercel.app (producción, auto-deploy desde main)
- **Supabase project:** ref `ywukvpxjgazcylwxphyo`, nombre "HorizonteFamiliar"
- **Dev server:** `yarn workspace web dev` en `C:\Users\jesus\OneDrive\Escritorio\LIVING LAB\HORIZONTEFAM\VibeFastHorizonteFam`

## Lo que funciona
- ✅ Plataforma web completa: 11 páginas públicas, dashboard con CRUD de Programas
- ✅ IA funcional: Agente de revisión de expedientes con Gemini `3.5-flash-lite`
  - Ruta pública: `/diagnostico-expediente` (sin login)
  - Ruta protegida: `/expediente` (requiere sesión)
  - API: `POST /api/ai/expediente` → análisis estructurado con Zod
- ✅ Login con email/contraseña para pruebas (`EmailLoginForm`)
- ✅ Google OAuth configurado en Supabase (provider habilitado, client id/secret set)
- ✅ Migración `008_programas.sql` aplicada al remoto (tabla `public.programas` + RLS)
- ✅ Variables de entorno en Vercel: Supabase keys, Gemini, Google OAuth
- ✅ Multi-proveedor IA: soporta OpenAI, OpenRouter, Gemini, Ollama

## Lo que está pendiente
- ⚠️ **Supabase auth en 503** — el servicio de autenticación (gotrue) del proyecto lleva caído desde el 2026-08-16. No es problema de configuración: es una incidencia de plataforma Supabase. Cuando se recupere, el login con Google funcionará automáticamente.
- 🔲 Conectar MCP de Supabase en opencode (config ya en `opencode.json`, falta autenticar OAuth)
- 🔲 Verificar login completo (Google OAuth + email) una vez que auth se recupere
- 🔲 Crear usuario de prueba en Supabase para email login
- 🔲 Variables faltantes: `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL` (producción)

## Archivos clave
- `web/.env.local` — keys Supabase + Gemini + Google OAuth
- `web/config.js` — copy institucional, features, config de IA
- `web/lib/openai/client.js` — cliente multi-proveedor (Gemini por defecto)
- `web/lib/agents/expediente.js` — agente de revisión de expedientes (Zod schema + system prompt)
- `web/app/api/ai/expediente/route.js` — API route del expediente
- `web/components/ai/ExpedienteAnalyzer.js` — UI del analyzer
- `web/components/auth/EmailLoginForm.js` — login con email/contraseña
- `supabase/migrations/008_programas.sql` — tabla programas + RLS
- `opencode.json` — config de opencode con MCP de Supabase

## Config de IA
- Proveedor: Gemini (AI_PROVIDER=gemini)
- Modelo: gemini-3.5-flash-lite
- Structured outputs: Zod schema con fallback a JSON plano
- API key en `.env.local` y en Vercel

## Credenciales (en `.env.local`, no commiteadas)
- Todas las keys están en `web/.env.local` (gitignored)
- Google OAuth client id y secret — en Vercel env vars
- Supabase access token (MCP) — configurado en `opencode.json`

## Para el MCP de Supabase
- `opencode.json` ya tiene el servidor configurado
- Al reiniciar opencode, debe pedir autenticación OAuth con Supabase
- Elegir la organización que contiene el proyecto HorizonteFamiliar
- Herramientas disponibles: database, auth, storage, edge functions, logs, realtime, docs
