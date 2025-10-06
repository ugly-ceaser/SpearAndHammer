import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
    return (
        <div className="h-[30vh] w-full flex flex-col items-center md:items-start justify-between border-b border-gray-900 py-8" role="banner">
            <div className="flex-grow flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center md:text-left mb-4 text-gray-800">
                    Corporate Training
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center md:text-left max-w-2xl">
                    Empower your team with cutting-edge technology skills through customized corporate training programs 
                    designed to boost productivity and drive innovation.
                </p>
            </div>

            <div className="w-full flex justify-center md:justify-start">
                <button className="bg-black text-white p-3 inline-flex items-center justify-center rounded hover:bg-gray-800 transition-colors duration-300" aria-label="Scroll down">
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>
        </div>
    );
}