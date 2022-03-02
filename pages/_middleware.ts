import { NextRequest, NextResponse } from 'next/server'
import { setUserCookie } from "../lib/auth";

import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest ) {
  return setUserCookie(req, NextResponse.next());
}
