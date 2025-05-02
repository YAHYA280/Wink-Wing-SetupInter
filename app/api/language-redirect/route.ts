// app/api/language-redirect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/config';

export async function GET(request: NextRequest) {
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Parse the Accept-Language header to get preferred languages
  const userLanguages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase().substring(0, 2));
  
  // Find the first supported locale in the user's preferences
  const preferredLocale = userLanguages.find(lang => 
    locales.includes(lang as any)
  );
  
  // Default to 'en' if no match is found
  const redirectLocale = preferredLocale || 'en';
  
  // Create the URL for redirection using NextURL
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${redirectLocale}`;
  
  // Redirect to the appropriate locale
  return NextResponse.redirect(newUrl);
}