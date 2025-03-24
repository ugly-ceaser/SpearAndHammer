// import Image from "next/image";

export default function Hero(){
    return(
        <div className="relative w-full h-[60vh]  overflow-hidden">
        {/* Background image and overlay */}
        <div className="absolute inset-0 bg-[url('/bg/bg2.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-2 sm:px-4 md:px-8">
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
            Et pellentesque porttitor odio dui. Erat sit platea vitae in parturient egestas etiam. 
            Ornare vitae orci maecenas adipiscing dolor facilisis habitasse mattis. 
            Eget magna neque eget eleifend velit viverra sem praesent ultricies. 
            Facilisi diam luctus tortor fusce parturient proin nulla. 
            Integer mi elit amet mollis gravida sapien mollis. Tempor bibendu
          </p>
        </div>
      </div>
    )
}