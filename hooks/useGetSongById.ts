import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song[] | undefined>(undefined); 
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      console.log("No song ID provided.");
      return;
    }
    console.log("Fetching song with ID:", id);

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching song:", error);
        setIsLoading(false);
        return toast.error(error.message);
      }
      console.log("Fetched song data:", data); 

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]); 

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]  
  );
};

export default useGetSongById;
