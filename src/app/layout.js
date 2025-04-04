"use client"; // Ensure this is a client-side component

import { Provider } from "react-redux";
import { store } from "@/redux/store"; // Assuming your store is in this file
import "./globals.css";

function Head() {
  return (
    <>
      <link rel="icon" href="/favicon_io/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon_io/favicon-apple.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon_io/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicon_io/favicon-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon_io/favicon-192x192.png"
      />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          WhatsBroad - WhatsApp Broadcast & WA Blast Mudah dan Cepat
        </title>

        <Head />
        <meta
          name="description"
          content="Kirim pesan WhatsApp Broadcast dengan mudah menggunakan WhatsBroad. Cepat, aman, dan efisien untuk bisnis Anda. Coba sekarang!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="WhatsBroad" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="WhatsBroad" />
        <meta name="keywords" content="WhatsBroad" />
        <meta name="keywords" content="Whatsapp brodcast " />
        <meta name="keywords" content="wa broadcast" />
        <meta name="keywords" content="whatsapp blast" />
        <meta name="keywords" content="wa blast" />
        <meta name="keywords" content="blast whatsapp" />
        <meta name="keywords" content="blast wa" />
        <meta name="keywords" content="brodcast whatsapp" />
        <meta name="keywords" content="brodcast wa" />
        <meta name="google" content="notranslate" />
        <meta name="generator" content="WhatsBroad" />
        <meta name="application-name" content="WhatsBroad" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-TileImage"
          content="/favicon_io/favicon-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/favicon_io/browserconfig.xml"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="WhatsBroad" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>
        {/* Wrap your children with Redux Provider */}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
