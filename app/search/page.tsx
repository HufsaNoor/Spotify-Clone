// import getSongsByTitle from "@/actions/getSongsBYTitle";
// import Header from "@/components/Header";
// import SearchInput from "@/components/SearchInput";
// import SearchContent from "./components/SearchContent";

// interface SearchProps {
//     searchParams: {
//         title: string;
//     }
// };
// export const revalidate = 0;

// const Search = async ({searchParams}: SearchProps)=>{
//     console.log('Is searchParams a Promise?', searchParams instanceof Promise);
//     const songs = await getSongsByTitle(searchParams.title);

//     return (
//         <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
//             <Header className="from-bg-neytral-900">
//                 <div className="mb-2 flex flex-col gap-y-6">
//                     <h1 className="text-white text-3xl font-semibold">
//                         Search
//                     </h1>
//                     <SearchInput/>
//                 </div>
                
//             </Header>
//             <SearchContent songs={songs}/>


//         </div>
//     )

// }
// export default Search;

import getSongsByTitle from "@/actions/getSongsBYTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
import { PageProps } from "@/.next/types/app/search/page";

// interface SearchProps {
//     searchParams: {
//         title: string;
//     }
// };
export const revalidate = 0;

const Search = async ({searchParams}: PageProps)=>{
    console.log('Is searchParams a Promise?', searchParams instanceof Promise);
    const params = await searchParams;

    const title = params?.title || ''; 
    const songs = await getSongsByTitle(title);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neytral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput/>
                </div>
                
            </Header>
            <SearchContent songs={songs}/>


        </div>
    )

}
export default Search;