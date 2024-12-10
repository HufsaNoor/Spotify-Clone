// import { Song } from "@/types";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// import { cookies } from "next/headers";


// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getSongsByUserId = async (id: string): Promise<Song[]> => {
//     const supabase = await createServerComponentClient({
//         cookies: cookies,
//     });

//     const {
//         data: sessionData,
//         error: sessionError

//     } = await supabase.auth.getSession();

//     if (sessionError) {
//         console.log(sessionError.message);
//         return [];
//     }
    

//     const { data, error } = await supabase
//         .from('songs')
//         .select('*')
//         .eq('user_id', sessionData.session?.user.id)
//         .order('created_at', { ascending: false });
//     if (error) {
//         console.log(error.message);
//     }
//     // return (data as any) || [];
//     return data || [];


// };
// export default getSongsByUserId;
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (userId: string | null): Promise<Song[]> => {
  try {
    if (!userId) {
      console.log("User ID is not provided.");
      return [];
    }

    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching songs:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error in getSongsByUserId:", error);
    return [];
  }
};

export default getSongsByUserId;
