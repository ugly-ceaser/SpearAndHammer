import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
    return (
        <div className="h-[23vh] w-full flex flex-col items-start justify-start border-b border-gray-900" role="banner">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-left mb-4 text-gray-800 flex items-start">
                Career
            </h1>

            <button className="bg-black text-white p-2 inline-flex items-center justify-center rounded align-self-end mt-auto mb-4" aria-label="Scroll down">
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
        </div>
    );
}
