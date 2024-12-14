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
