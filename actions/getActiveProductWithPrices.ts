import {ProductWithPrice} from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";


const getActiveProductWithPrices = async (): Promise<ProductWithPrice[]> =>{
    const supabase = createServerComponentClient({
        cookies: cookies,
   });

   const {data,error} = await supabase
   .from ('products')
   .select('*,prices(*)')
   .eq('active', true)
   .order('metadata->index')
   .order('unit_amount',{foreignTable :'prices'});

  
   if(error) {
    console.log(error);
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   return (data as any) || [];
}

export default getActiveProductWithPrices;