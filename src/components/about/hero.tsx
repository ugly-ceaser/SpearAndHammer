'use client';
import Image from "next/image";

export default function Hero() {
  return (
    <div>
    <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0 bg-[url('/bg/bg2.png')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 
              transition-all duration-300 ease-in-out 
              hover:scale-110 hover:text-black hover:rounded-full">
          About{" "}
          <span className="bg-black text-white px-2 
                transition-all duration-300 ease-in-out 
                hover:bg-white hover:text-black hover:rounded-full">
            Us
          </span>
        </h1>

        <p className="max-w-2xl md:max-w-3xl text-center text-gray-600 text-sm sm:text-base md:text-lg px-4 
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

    {/* CEO Card - Hidden on mobile, visible from md breakpoint up */}
    <div className="hidden md:block relative -mt-[12vh] lg:-mt-[15vh] mx-auto z-10
        md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 
        h-[50vh] md:h-[55vh] lg:h-[60vh] bg-white/90  
        shadow-xl rounded-lg">
      <div className="flex flex-row items-center md:items-end justify-between h-full ">
        {/* Brief History - adjusted width */}
        <div className="w-[50%] md:w-[45%] h-full p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Meet Our Director</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
            Odo Brenda, our visionary CEO, brings over 15 years of experience in software development 
            and technology leadership. Starting her journey as a software engineer, she has led numerous 
            successful projects and teams across multiple Fortune 500 companies. Her passion for 
            technology education and commitment to excellence has been the driving force behind 
            Spear &amp; Hammer&apos;s growth and success in both software development and IT training sectors.
          </p>
        </div>

        {/* CEO Image - modified container */}
        <div className="w-[50%] md:w-[55%] h-full">
          <div className="relative w-full h-full md:aspect-[3/4] rounded-r-lg md:rounded-l-lg overflow-hidden">
            <Image
              src="/team/bg3.jpg"
              alt="Odo Brenda - CEO"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 50vw, 300px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}