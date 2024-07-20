"use client";
import { Card } from "./helpers/card";
import { ProtectedRoute } from "./protected";
import Footer from "./user/footer";
import Navbar from "./user/navbar";

export default function Home() {


  const ourProducts = new Array(8).fill({
    Title: "Wooden House, Florida",
    Description: "Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.",
    Img: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
    productId: "",
  });

  return (
    <ProtectedRoute route="/" >
      <Navbar />
      <div className="flex m-5 mt-20 h-[450px] overflow-hidden">
        <img className="w-full h-full object-cover" src="/HomeBannerImage.jpg" alt="Home Banner" />
      </div>

      <h1 className="text-xl m-3 ml-8 font-bold">Why Should You Choose Us ?</h1>

      <div className="flex flex-wrap justify-center lg:justify-around gap-4 p-4">
        <div className="w-40 h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden relative">
          <img className="w-full h-full object-cover transform transition-transform hover:scale-125 cursor-pointer" src="/kidsImage.jpg" alt="Kid Image" />
          <h1 className="text-black absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-center py-2">Kid's Wear</h1>
        </div>

        <div className="w-40 h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 lg:ml-5 rounded-full overflow-hidden relative">
          <img className="w-full h-full object-cover transform transition-transform hover:scale-125 cursor-pointer" src="/gentsCostume.jpg" alt="Men's Wear" />
          <h1 className="text-black absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-center py-2">Men's Wear</h1>
        </div>

        <div className="w-40 h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden relative">
          <img className="w-full h-full object-cover transform transition-transform hover:scale-125 cursor-pointer" src="/ladiesCostume.jpg" alt="Ladies' Wear" />
          <h1 className="text-black absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-center py-2">Ladies' Wear</h1>
        </div>

        <div className="w-40 h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden relative">
          <img className="w-full h-full object-cover transform transition-transform hover:scale-110 cursor-pointer" src="/babyCostume.webp" alt="Kids Wear" />
          <h1 className="text-black absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 text-center py-2">Kids Wear</h1>
        </div>
      </div>

      <div className="mt-5 mb-8" id="about">
        <h1 className="text-xl m-3 ml-16 font-bold">About Us</h1>
        <div className="md:flex w-[85%] mx-auto">
          <div className="w-[400px]">
            <img className="w-[400px] h-[400px] rounded-full mx-auto" src="/Logo.jpg" alt="" />
          </div>
          <div className=" w-[600px]">
            <div className="m-24">
              <h1 className="text-xl font-semibold">Av streams</h1>
              <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi suscipit aperiam quo optio blanditiis quasi quis fugiat nam, vero deserunt aliquid eaque in nobis, dolor voluptas consectetur adipisci deleniti cupiditate!</p>
              <p className="mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi suscipit aperiam quo </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5" id="Products">
        <h1 className="text-xl m-3 ml-16 font-bold">Our Products</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          {ourProducts.length > 0 && ourProducts.map((item, index) => (
            <Card key={index} product={item} />
          ))}
        </div>
      </div>

      <Footer />
    </ProtectedRoute >
  );
}
