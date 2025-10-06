import React, { useEffect, useState, useMemo } from 'react';
import videoData from '@/data/video.json';

// Type definitions for better scalability
interface ProjectVideo {
    id: number;
    projectName: string;
    description: string;
    videoUrl: string;
    dateCompleted?: string;
    tags?: string[];
}

interface FilterButtonProps {
    tag: string;
    isActive: boolean;
    onClick: () => void;
}

interface VideoCardProps {
    video: ProjectVideo;
    priority?: boolean;
}

export default function Project() {
    // State management
    const [videos, setVideos] = useState<ProjectVideo[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('All');
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6); // Show 6 initially on mobile
    const [loadingMore, setLoadingMore] = useState(false);

    // Memoized computations for performance
    const uniqueTags = useMemo(() => {
        const allTags = Array.from(new Set(videos.flatMap((video) => video.tags || [])));
        // Limit to top 5 most common tags to compress categories
        const tagCounts = allTags.map(tag => ({
            tag,
            count: videos.filter(video => video.tags?.includes(tag)).length
        }));
        
        return tagCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(item => item.tag);
    }, [videos]);

    const filteredVideos = useMemo(() =>
        selectedTag === 'All'
            ? videos
            : videos.filter((video) => video.tags?.includes(selectedTag)),
        [videos, selectedTag]
    );

    // Pagination logic for mobile
    const displayedVideos = useMemo(() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
            // Desktop: show all videos
            return filteredVideos;
        }
        // Mobile/Tablet: show limited count
        return filteredVideos.slice(0, displayCount);
    }, [filteredVideos, displayCount]);

    const hasMoreVideos = filteredVideos.length > displayCount;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    // Enhanced video card component with better UX
    const VideoCard: React.FC<VideoCardProps> = ({ video, priority = false }) => (
        <article className="group w-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 
                          overflow-hidden border border-gray-200 hover:scale-[1.02] hover:border-gray-800">
            <div className="relative overflow-hidden bg-gray-100 aspect-video rounded-t-xl">
                <video 
                    width="100%" 
                    height="100%" 
                    controls 
                    preload={priority ? "metadata" : "none"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    poster="/placeholder-video.jpg"
                >
                    <source src={video.videoUrl} type="video/mp4" />
                    <p className="flex items-center justify-center h-full text-gray-500">
                        Your browser does not support the video tag.
                    </p>
                </video>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>
            
            <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 line-clamp-2 
                              group-hover:text-black transition-colors duration-300">
                    {video.projectName}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
                    {video.description}
                </p>
                
                {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {video.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                                {tag}
                            </span>
                        ))}
                        {video.tags.length > 3 && (
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-500 text-sm rounded-full font-medium">
                                +{video.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </article>
    );

    // Enhanced filter button component
    const FilterButton: React.FC<FilterButtonProps> = ({ tag, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                       whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2
                       ${isActive 
                         ? 'bg-black text-white shadow-md' 
                         : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-800 hover:bg-gray-100'
                       }`}
            aria-pressed={isActive}
        >
            {tag}
        </button>
    );

    // Data fetching with better error handling
    useEffect(() => {
        const initializeData = async () => {
            try {
                setIsLoading(true);
                // Simulate async data loading for better UX
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const data = videoData.map((video, index) => ({
                    ...video,
                    id: video.id || index + 1
                })) as ProjectVideo[];
                
                setVideos(data);
            } catch (error) {
                console.error('Error loading projects:', error);
                setVideos([]);
            } finally {
                setIsLoading(false);
                setMounted(true);
            }
        };

        initializeData();
    }, []);

    // Reset display count when filter changes
    useEffect(() => {
        setDisplayCount(6);
    }, [selectedTag]);

    // Load more functionality
    const handleLoadMore = async () => {
        setLoadingMore(true);
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        setDisplayCount(prev => prev + 6);
        setLoadingMore(false);
    };

    // Enhanced loading state
    if (!mounted || isLoading) {
        return (
            <div className="space-y-6">
                {/* Filter skeleton */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="flex flex-wrap gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                        ))}
                    </div>
                </div>
                
                {/* Grid skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="aspect-video bg-gray-200 animate-pulse rounded-t-xl"></div>
                            <div className="p-6 md:p-8 space-y-4">
                                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="space-y-3">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-[80vw] mx-auto px-4">
            <div className="space-y-8">
                {/* Enhanced filter section */}
                <section className="border-b border-gray-200 pb-6" aria-label="Project filters">
                <div className="flex flex-wrap gap-3 mb-4">
                    <FilterButton
                        tag="All Projects"
                        isActive={selectedTag === 'All'}
                        onClick={() => setSelectedTag('All')}
                    />
                    {uniqueTags.map((tag) => (
                        <FilterButton
                            key={tag}
                            tag={tag}
                            isActive={selectedTag === tag}
                            onClick={() => setSelectedTag(tag)}
                        />
                    ))}
                </div>
                
                {/* Results count */}
                <p className="text-sm text-gray-600">
                    {filteredVideos.length} project{filteredVideos.length !== 1 ? 's' : ''} found
                    {selectedTag !== 'All' && ` in "${selectedTag}"`}
                    {isMobile && filteredVideos.length > displayCount && 
                        ` (showing ${displayCount})`
                    }
                </p>
            </section>

            {/* Enhanced project grid */}
            <section aria-label="Projects" className="min-h-[400px]">
                {filteredVideos.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                            {displayedVideos.map((video, index) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    priority={index < 3} // Prioritize first 3 videos
                                />
                            ))}
                        </div>
                        
                        {/* Load More Button - Only show on mobile/tablet when there are more videos */}
                        {isMobile && hasMoreVideos && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 
                                             transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                                             flex items-center gap-3 font-medium"
                                >
                                    {loadingMore ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load More Projects
                                            <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                                                +{Math.min(6, filteredVideos.length - displayCount)}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                        
                        {/* Progress indicator */}
                        {isMobile && filteredVideos.length > 6 && (
                            <div className="flex justify-center mt-6">
                                <p className="text-sm text-gray-500">
                                    Showing {Math.min(displayCount, filteredVideos.length)} of {filteredVideos.length} projects
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No projects found</h3>
                        <p className="text-gray-600 max-w-md">
                            {selectedTag === 'All' 
                                ? "We're working on some amazing projects. Check back soon!"
                                : `No projects found for "${selectedTag}". Try selecting a different category.`
                            }
                        </p>
                        {selectedTag !== 'All' && (
                            <button
                                onClick={() => setSelectedTag('All')}
                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                View All Projects
                            </button>
                        )}
                    </div>
                )}
            </section>
            </div>
        </div>
    );
}
