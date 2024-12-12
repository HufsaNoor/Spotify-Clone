// import type { Metadata } from "next";
// import Sidebar from "@/components/Sidebar"
// import Figtree from "next/font/local";
// import "./globals.css";
// import SupabaseProvider from "@/providers/SupabaseProvider";
// import ModalProvider from "@/providers/ModalProvider";
// import UserProvider from "@/providers/UserProvider";
// import ToasterProvider from "@/providers/ToasterProvider";

// import Player from "@/components/Player";
// import getSongsByUserId from "@/actions/getSongsByUserId";


// const font = Figtree({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });



// export const metadata: Metadata = {
//   title: "Spotify Clone",
//   description: "Listen to music!",
// };

// export const revalidate = 0;

// export default async function Rootlayout({
//   children,
// }:{
//   children: React.ReactNode
// }) {
//   const userSongs = await getSongsByUserId();
//   return (
//     <html lang="en">
//       <body
//         className={font.className}
//       >
//         <ToasterProvider />


//         <SupabaseProvider>
//           <UserProvider>
//             <ModalProvider />

//             <Sidebar songs={userSongs}>

//               {children}
//             </Sidebar>
//             <Player/>
//           </UserProvider>

//         </SupabaseProvider>

//       </body>
//     </html>
//   );
// }






























// import type { Metadata } from "next";
// import Sidebar from "@/components/Sidebar";
// import Figtree from "next/font/local";
// import "./globals.css";
// import SupabaseProvider from "@/providers/SupabaseProvider";
// import ModalProvider from "@/providers/ModalProvider";
// import UserProvider from "@/providers/UserProvider";
// import ToasterProvider from "@/providers/ToasterProvider";

// import Player from "@/components/Player";
// import getActiveProductWithPrices from "@/actions/getActiveProductWithPrices";

// const font = Figtree({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Spotify Clone",
//   description: "Listen to music!",
// };

// export const revalidate = 0;

// export default function Rootlayout({
//   children,
//   userSongs,
// }: {
//   children: React.ReactNode;
//   userSongs: any; // Adjust type as needed
// }) {
//   const products = await getActiveProductWithPrices();
  
//   return (
//     <html lang="en">
//       <body className={font.className}>
//         <ToasterProvider />
//         <SupabaseProvider>
//           <UserProvider>
//             <ModalProvider products={products}/>
//             <Sidebar songs={userSongs}>{children}</Sidebar>
//             <Player />
//           </UserProvider>
//         </SupabaseProvider>
//       </body>
//     </html>
//   );
// }











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

// Use async function in the layout if using Next.js 13+
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

export default async function Rootlayout({
  children,
  userSongs,
}: {
  children: React.ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userSongs: any; // Adjust type as needed
}) {
  const products = await getActiveProductWithPrices();
  console.log("userSongs before passing to Sidebar:", userSongs);
  
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            

            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
