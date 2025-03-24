import React, { useEffect, useState } from 'react';
import videoData from '@/data/video.json';

export default function Project() {
    // Define the type for the video data
    type VideoCardProps = {
        id?: number;  // Made optional with ?
        projectName: string;
        description: string;
        videoUrl: string;
        dateCompleted?: string;  // Made optional
        tags?: string[];  // Made optional
    };

    const VideoCard: React.FC<VideoCardProps> = ({ projectName, description, videoUrl }) => (
        <div className="w-full sm:w-[35vw] h-auto m-2 mt-4 mb-4">
            <video width="100%" height="auto" controls className="mb-[3vh]">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-left mb-4 text-gray-800 flex items-start mb-[3vh]">
                {projectName}
            </h3>
            <p className="font-medium text-left mb-4 text-gray-600">{description}</p>
        </div>
    );

    const [videos, setVideos] = useState<VideoCardProps[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('All');

    useEffect(() => {
        const fetchVideos = () => {
            try {
                const data = videoData; // Replace with your JSON data
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setVideos([]); // Handle errors gracefully
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos =
        selectedTag === 'All'
            ? videos
            : videos.filter((video) => video.tags?.includes(selectedTag) || video.tags === undefined);

    const uniqueTags = Array.from(
        new Set(videos.flatMap((video) => video.tags || []))
    );

    return (
        <div>
            {/* Tag filter buttons */}
            <div className="flex justify-start align-end border-b border-gray-900">
                <div className="flex flex-wrap justify-start mb-5">
                    <button
                        onClick={() => setSelectedTag('All')}
                        className="m-2 p-2 border border-black rounded text-black hover:bg-gray-300 w-full sm:w-auto"
                    >
                        All Projects
                    </button>
                    {uniqueTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="m-2 p-2 border border-black rounded text-black hover:bg-gray-300 w-full sm:w-auto"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video cards */}
            <div className="flex flex-wrap justify-between w-full mt-[3vh]">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                        <VideoCard
                            key={video.id}
                            projectName={video.projectName}
                            description={video.description}
                            videoUrl={video.videoUrl}
                        />
                    ))
                ) : (
                    <div className="flex justify-center align-center items-center w-full h-[45vh]">
                        <p className="text-lg font-bold bg-black text-white p-8">
                            Looks like our project shelf is as empty as a cat&apos;s schedule—purrhaps it&apos;s time to get to work! 🐾✨
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
