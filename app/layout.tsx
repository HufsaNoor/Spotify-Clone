import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Figtree from "next/font/local";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ModalProvider from "@/providers/ModalProvider";
import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";

import Player from "@/components/Player";
import getActiveProductWithPrices from "@/actions/getActiveProductWithPrices";
import getSongsByUserId from "@/actions/getSongsByUserId";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

console.log(getSongsByUserId);

const font = Figtree({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the active products (could be used for subscription or pricing)
  const products = await getActiveProductWithPrices();

  // Initialize Supabase client and get user session
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user ID and fetch user's songs
  const userId = session?.user?.id || null;
  const userSongs = await getSongsByUserId(userId);

  console.log("userSongs before passing to Sidebar:", userSongs);

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

