// import Image from "next/image";

export default function Hero(){
    return(
        <div className="relative w-full h-[60vh]  overflow-hidden">
        {/* Background image and overlay */}
        <div className="absolute inset-0 bg-[url('/bg/bg2.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-2 sm:px-4 md:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 
              transition-all duration-300 ease-in-out 
              hover:scale-110 hover:text-black hover:rounded-full">
            Sharpen Your{" "}
            <span className="bg-black text-white px-2 
                transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-black hover:rounded-full">
              Ideas
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 
              transition-all duration-300 ease-in-out 
              hover:scale-110 hover:text-black hover:rounded-full">
            into Digital Excellence
          </h2>

          <p className="max-w-3xl text-center text-gray-600 text-sm sm:text-base md:text-lg px-2 
              transition-all duration-300 ease-in-out 
              hover:scale-105 hover:text-black hover:rounded-3xl">
            We deliver cutting-edge software solutions and comprehensive IT training programs that empower businesses and individuals to thrive in the digital age. From custom web applications to enterprise software development, we transform your vision into robust, scalable technology solutions.
          </p>
        </div>
      </div>
    )
}