import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Role } from './model/Role';

// Centralizamos la lógica de permisos en una función
function checkPermissions(pathName: string, role: Role.Admin | Role.Student | Role.Recruiter): boolean {
  const allowedRoutes = roleRoutes[role] || [];

  return allowedRoutes.some((route) => {
    // Si la ruta en roleRoutes es dinámica, usar una expresión regular para validar
    if (route.includes(':')) {
      const dynamicRouteRegex = new RegExp(`^${route.replace(/:([^/]+)/g, '[^/]+')}$`);
      return dynamicRouteRegex.test(pathName);
    }

    // Para rutas estáticas, seguir usando startsWith
    return pathName.startsWith(route);
  });
}

// interface IChekProfilePermissions {
//   pathName: string;
//   role: Role.Admin | Role.Student | Role.Recruiter;
//   currentUserName: string;
// }
// function checkProfilePermissions({
//   pathName,
//   role,
//   currentUserName,
// }:IChekProfilePermissions){
//   if(pathName.startsWith("/profile/") && pathName.endsWith("/edit") && role === Role.Student){
//     console.log(":test")
//     const userName = pathName.split("/")[2];
//     return  userName === currentUserName && NextResponse.next(); 
//   }

//   return NextResponse.redirect(new URL('/'));
// }

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Si no hay token, redirigir al error 419
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const userRole = req.nextauth.token.rol as Role.Admin | Role.Student | Role.Recruiter;
    const currentUserName = req.nextauth.token.userName;

    
    //checkProfilePermissions({pathName:pathname, role:userRole, currentUserName});
    // Verificamos si el usuario tiene permisos para la ruta actual
    const isAuthorized = checkPermissions(pathname, userRole);

    if (!isAuthorized) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ message: 'No tienes permisos para acceder a esta ruta' }, { status: 401 });
      }

      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next(); // Continuar si la autorización es correcta
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Token debe existir para autorizar
    },
    pages: {
      signIn: '/iniciar',
    },
  }
);

// Definimos las rutas permitidas por rol
const roleRoutes: Record<Role.Admin | Role.Student | Role.Recruiter, string[]> = {
  ADMIN: ['/dashboard', '/dashboard/home', '/api/admin'],
  RECRUITER: ['/dashboard', '/dashboard/home', '/api/recruiter'],
  STUDENT: ['/nuevo-proyecto', '/profile/:userName/edit'],
};

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/profile/:userName/edit',
    '/nuevo-proyecto',
  ],
};
