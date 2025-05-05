import { NextRequest, NextResponse } from 'next/server';
import { locales } from './config';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  const userLanguages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, priority] = lang.split(';');
      return language.trim().split('-')[0].toLowerCase();
    });
  
  
  const preferredLocale = userLanguages.find(lang => 
    locales.includes(lang as any)
  );
  
  const redirectLocale = preferredLocale || 'en';
  
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${redirectLocale}`;
  
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: '/'
};