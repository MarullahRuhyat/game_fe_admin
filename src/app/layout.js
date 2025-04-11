"use client"; // Ensure this is a client-side component

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>BanCo - Dashboard</title>
        <link rel="stylesheet" href="/template/assets/css/slick.css" />
        <link rel="stylesheet" href="/template/assets/css/aos.css" />
        <link rel="stylesheet" href="/template/assets/css/output.css" />
        <link rel="stylesheet" href="/template/assets/css/style.css" />
        <link rel="stylesheet" href="/template/assets/css/new_style.css" />
        <Script
          src="/template/assets/js/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
