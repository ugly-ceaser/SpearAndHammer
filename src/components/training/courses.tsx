'use client';
import Image from 'next/image';

export default function Courses() {
    const courses = [
        {
            id: 1,
            title: "Full-Stack Web Development",
            duration: "12-16 weeks",
            level: "Beginner to Advanced",
            description: "Master modern web development with React, Node.js, and databases. Build complete web applications from scratch.",
            technologies: ["React", "Node.js", "MongoDB", "Express.js", "TypeScript"],
            image: "/bg/bg1.png"
        },
        {
            id: 2,
            title: "Mobile App Development",
            duration: "10-14 weeks",
            level: "Intermediate",
            description: "Learn to build cross-platform mobile apps using React Native and Flutter frameworks.",
            technologies: ["React Native", "Flutter", "Firebase", "API Integration"],
            image: "/bg/bg2.png"
        },
        {
            id: 3,
            title: "Data Science & Analytics",
            duration: "14-18 weeks",
            level: "Beginner to Advanced",
            description: "Dive into data science with Python, machine learning, and statistical analysis techniques.",
            technologies: ["Python", "Pandas", "Machine Learning", "SQL", "Visualization"],
            image: "/bg/bg1.png"
        },
        {
            id: 4,
            title: "Cloud Computing & DevOps",
            duration: "8-12 weeks",
            level: "Intermediate to Advanced",
            description: "Master cloud platforms and DevOps practices for scalable application deployment.",
            technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
            image: "/bg/bg2.png"
        },
        {
            id: 5,
            title: "Cybersecurity Fundamentals",
            duration: "10-12 weeks",
            level: "Beginner to Intermediate",
            description: "Learn essential cybersecurity principles, ethical hacking, and security best practices.",
            technologies: ["Network Security", "Penetration Testing", "Security Tools", "Risk Assessment"],
            image: "/bg/bg1.png"
        },
        {
            id: 6,
            title: "UI/UX Design & Prototyping",
            duration: "8-10 weeks",
            level: "Beginner",
            description: "Create stunning user interfaces and experiences using design thinking and modern tools.",
            technologies: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
            image: "/bg/bg2.png"
        }
    ];

    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="w-[80vw] mx-auto px-4">
                {/* Header Section */}
                <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-left text-gray-800 mb-6">
                    Available Private Courses
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                    Choose from our comprehensive range of technology courses, each designed to provide 
                    deep expertise and practical skills in high-demand areas.
                </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden
                        transition-all duration-300 hover:shadow-xl hover:scale-105">
                        {/* Course Image */}
                        <div className="relative h-48 w-full">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {course.level}
                                </span>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {course.title}
                            </h3>
                            
                            <div className="flex items-center text-gray-600 text-sm mb-4">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                Duration: {course.duration}
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                {course.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">Technologies:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {course.technologies.map((tech, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 
                                transition-colors duration-300 font-medium">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Don&apos;t See Your Desired Course?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        We offer custom curriculum design for specialized training needs. 
                        Contact us to discuss your specific learning objectives.
                    </p>
                    <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 
                        transition-colors duration-300 font-medium">
                        Request Custom Course
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}