# Context for app/layout.tsx

## Purpose
This file defines the root layout for the JFDI application using Next.js 13+ app router. It sets up the basic HTML structure, applies global styles, and initializes custom fonts.

## Key Components
1. Custom font declarations (Geist Sans and Geist Mono)
2. Metadata configuration
3. Root layout component
4. AppProvider wrapper

## Functionality
- Declares and applies custom Geist Sans and Geist Mono fonts using Next.js local font optimization.
- Sets up basic metadata for the application (title and description).
- Defines the RootLayout component that wraps all pages in the application.
- Applies custom fonts and antialiasing to the body.
- Wraps the entire application with the AppProvider for global state management.

## Interactions with Other Files
- Imports global CSS from "./globals.css".
- Uses font files from "./fonts/GeistVF.woff" and "./fonts/GeistMonoVF.woff".
- Imports AppProvider from '@/contexts/AppContext'.

## Notable Code Elements
- Uses 'use client' directive, indicating it's a client-side component.
- Utilizes Next.js's local font optimization feature.
- Sets up CSS variables for the custom fonts (--font-geist-sans and --font-geist-mono).
- Configures fonts with a weight range of 100 to 900.

## Implications
- This layout will be applied to all pages in the application.
- The custom Geist fonts will be available throughout the application via CSS variables.
- Global state management is set up for the entire application through AppProvider.

## Notes
- The metadata is currently set to default values and should be updated for the JFDI application.
- The use of custom fonts may impact initial load performance, but Next.js font optimization should mitigate this.
- The 'use client' directive means this component and its children will be rendered on the client side.

This layout.tsx file is crucial as it sets up the foundational structure and styling for the entire JFDI application. Any global changes to the application's layout or initialization should be made here.