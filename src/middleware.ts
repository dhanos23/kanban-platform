// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Definir rutas públicas que no requieren autenticación
const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/callback",
];

// Definir rutas que siempre son accesibles
const openRoutes = ["/_next", "/api", "/static", "/favicon.ico"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // No aplicar middleware a rutas estáticas o API
  if (openRoutes.some((route) => pathname.startsWith(route))) {
    return res;
  }

  try {
    // Crear el cliente de Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => {
            return req.cookies.getAll().map((cookie) => ({
              name: cookie.name,
              value: cookie.value,
            }));
          },
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              res.cookies.set({
                name,
                value,
                ...options,
              });
            });
            return Promise.resolve();
          },
        },
      },
    );

    // Verificar sesión
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Comprobar si es una ruta pública
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route),
    );

    // Redireccionar si no hay sesión y no es ruta pública
    if (!session && !isPublicRoute) {
      const redirectUrl = new URL("/auth/login", req.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redireccionar si hay sesión y es ruta de autenticación
    if (session && isPublicRoute) {
      // Recoger la URL de redirección si existe
      const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";
      const redirectUrl = new URL(redirectTo, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    // En caso de error, permitir el acceso y manejar el error en la capa de la aplicación
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
