'use client'
import "./globals.css";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className='min-h-screen'>
            <div>
                {children}
            </div>
        </body>
        </html>
    );
}
