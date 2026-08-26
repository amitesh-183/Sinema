// import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
// import { Card, CardContent } from "../ui/card";
// import { Link, useNavigate } from "react-router";
// import { useFetch } from "@/hooks/UseFetch";

// const PopularMovies = () => {
//   const navigate = useNavigate();
//   const { apiList } = useFetch("/movie/top_rated");
//   console.log(apiList);
//   return (
//     <>
//       {/* Popular Movie List */}
//       <div className="md:py-8 lg:px-20 md:px-10 sm:px-4 px-2">
//         <div className="flex items-center justify-between">
//           <h4 className=" font-bold sm:text-2xl text-lg">Top Rated Movies</h4>
//           <Link to="/movies" className="sm:text-base text-xs">
//             View All
//           </Link>
//         </div>
//         <Carousel className="">
//           <CarouselContent className="pt-4">
//             {apiList.map((item) => (
//               <CarouselItem
//                 key={item.id}
//                 className="basis-1/3 xl:basis-40 md:basis-1/6 sm:basis-1/4 hover:scale-105 sm:pl-2 pl-1 duration-300 ease-in-out"
//               >
//                 <div className="p-0">
//                   <Card
//                     onClick={() => navigate(`/movie-info/${item.id}`)}
//                     className="cursor-pointer p-0 rounded-none border-none"
//                   >
//                     <CardContent className="flex aspect-auto items-center justify-center p-0">
//                       <span className="text-4xl font-semibold">
//                         <img
//                           src={
//                             "https://image.tmdb.org/t/p/original" +
//                             item.poster_path
//                           }
//                           alt={item.title}
//                           className="w-full object-cover sm:h-[210px] h-[180px]"
//                         />
//                       </span>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {/* <CarouselPrevious />
//           <CarouselNext /> */}
//         </Carousel>
//       </div>
//       {/* {/* Popular Movie List */}
//     </>
//   );
// };

// export default PopularMovies;
