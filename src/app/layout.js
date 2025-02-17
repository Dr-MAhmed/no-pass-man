import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "No-pass-man - your own password manager",
  description: "I created this password manager for you to save your card and website/application credentials. you dont have to take worries, Its totly free and secure. Go and enjoy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel='icon' href='/passman.png' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
