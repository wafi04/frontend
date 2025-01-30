// import { useEffect } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";

// export default function SearchProduct() {
// //   const {
// //     debouncedSearch,
// //     handleKeyDown,
// //     inputRef,
// //     openSearch,
// //     search,
// //     searchRef,
// //     setDebouncedSearch,
// //     setOpenSearch,
// //     setSearch,
// //     toggleSearch,
// //   } = useSearchHooks();
// //   const { data, status, isFetching } = getProductBySearch({
// //     query: debouncedSearch,
// //     limit: 3,
// //   });

//   useEffect(() => {
//     // function handleClickOutside(event: MouseEvent) {
//     //   if (
//     //     searchRef.current &&
//     //     !searchRef.current.contains(event.target as Node)
//     //   ) {
//     //     setOpenSearch(false);
//     //     setSearch("");
//     //     setDebouncedSearch("");
//     //   }
//     // }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (openSearch) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [openSearch]);

//   return (
//     // <div ref={searchRef} className="relative">
//     //   {!openSearch && (
//     //     <div
//     //       className="relative max-w-md flex cursor-pointer"
//     //       onClick={toggleSearch}
//     //     >
//     //       <Search className="absolute right-0 rounded-full p-2 bg-gray-300 top-0 size-10 text-gray-100" />
//     //       <Input
//     //         readOnly
//     //         placeholder="Search"
//     //         className="w-full bg-gray-100 cursor-pointer rounded-full pr-10 focus:outline-none"
//     //       />
//     //     </div>
//       )}
//       {/* {openSearch && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col">
//           <OpenSearch
//             data={data}
//             inputRef={inputRef}
//             handleKeyDown={handleKeyDown}
//             setSearch={setSearch}
//             toogleSearch={toggleSearch}
//             search={search}
//             status={status}
//             isFetching={isFetching}
//           />
//         </div>
//       )} */}
//     </div>
//   );
// }
