import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";



// for selectively running the middleware for every path 
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
        

    //if path name is /admin then redirect to home page
    if (request.nextUrl.pathname.startsWith('/signup')) {
      if(token){
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } else{
        NextResponse.next();
      }
    }

    if (request.nextUrl.pathname.startsWith('/api/auth/signin')) {
        if(token){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else{
            NextResponse.next();
        }
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if(!token){
            return NextResponse.redirect(new URL('/signup', request.url))
        } else{
            NextResponse.next();
        }
    }
   
    if (request.nextUrl.pathname.endsWith('/')) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    
  }