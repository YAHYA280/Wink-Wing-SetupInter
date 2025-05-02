import { NextRequest, NextResponse } from 'next/server';
import { locales } from './config';

export function middleware(request: NextRequest) {
  // Only apply this middleware to the root path
  if (request.nextUrl.pathname !== '/') {
    console.log('Not root path, skipping middleware');
    return NextResponse.next();
  }

  console.log('Middleware running for root path');
  
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  console.log('Accept-Language header:', acceptLanguage);
  
  // Parse language preferences from the header
  const userLanguages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, priority] = lang.split(';');
      return language.trim().split('-')[0].toLowerCase();
    });
  
  console.log('Parsed language preferences:', userLanguages);
  
  // Find the first supported locale from the user's preferences
  const preferredLocale = userLanguages.find(lang => 
    locales.includes(lang as any)
  );
  
  // Default to 'en' if no match is found
  const redirectLocale = preferredLocale || 'en';
  console.log('Selected locale for redirect:', redirectLocale);
  
  // Create a new URL with the selected locale
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${redirectLocale}`;
  
  console.log('Redirecting to:', newUrl.toString());
  
  // Perform the redirect
  return NextResponse.redirect(newUrl);
}

// Configure middleware to only run on the homepage
export const config = {
  matcher: '/'
};