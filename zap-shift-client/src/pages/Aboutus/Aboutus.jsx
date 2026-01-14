import React, { useState, useEffect } from 'react';


const Aboutus = () => {

    const [activeTab, setActiveTab] = useState('story');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="min-h-screen">
            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10 lg:p-16">

                    {/* Main Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">About Us</h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                            We believe in commitment and dedication. Our primary goal is to meet your needs and exceed expectations.
                        </p>
                    </div>

                    {/* Tabs Navigation (Story, Mission, Success, Team & Others) */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-6 md:space-x-10" aria-label="Tabs">
                            {/* Tab Button: Story */}
                            <button
                                onClick={() => handleTabClick('story')}
                                className={`
                                    whitespace-nowrap py-3 px-1 text-base font-medium transition duration-150 ease-in-out
                                    ${activeTab === 'story'
                                        ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                                    }
                                `}
                                role="tab"
                                aria-controls="tab-content-story"
                            >
                                Story
                            </button>
                            {/* Tab Button: Mission */}
                            <button
                                onClick={() => handleTabClick('mission')}
                                className={`
                                    whitespace-nowrap py-3 px-1 text-base font-medium transition duration-150 ease-in-out
                                    ${activeTab === 'mission'
                                        ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                                    }
                                `}
                                role="tab"
                                aria-controls="tab-content-mission"
                            >
                                Mission
                            </button>
                            {/* Tab Button: Success */}
                            <button
                                onClick={() => handleTabClick('success')}
                                className={`
                                    whitespace-nowrap py-3 px-1 text-base font-medium transition duration-150 ease-in-out
                                    ${activeTab === 'success'
                                        ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                                    }
                                `}
                                role="tab"
                                aria-controls="tab-content-success"
                            >
                                Success
                            </button>
                            {/* Tab Button: Team */}
                            <button
                                onClick={() => handleTabClick('team')}
                                className={`
                                    whitespace-nowrap py-3 px-1 text-base font-medium transition duration-150 ease-in-out
                                    ${activeTab === 'team'
                                        ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                                    }
                                `}
                                role="tab"
                                aria-controls="tab-content-team"
                            >
                                Team & Others
                            </button>
                        </nav>
                    </div>

                    {/* Tabs Content Area */}
                    <div className="mt-8">

                        {/* Story Content */}
                        <div
                            id="tab-content-story"
                            className={`space-y-6 ${activeTab !== 'story' ? 'hidden' : ''}`}
                        >
                            <h2 className="text-2xl font-bold text-gray-800">The Beginning of Our Journey</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our journey began in 2014 with a small team, aiming to create a simple and reliable solution. We faced many challenges initially, but our commitment and faith in our customers helped us move forward. We wanted to solve common market problems through technological innovation.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                In the first few years, we worked tirelessly to improve our platform. Every piece of customer feedback was crucial to us, helping us make our product more refined and user-friendly. Today, we are proud to successfully serve thousands of customers and earn their trust.
                            </p>
                        </div>

                        {/* Mission Content */}
                        <div
                            id="tab-content-mission"
                            className={`space-y-6 ${activeTab !== 'mission' ? 'hidden' : ''}`}
                        >
                            <h2 className="text-2xl font-bold text-gray-800">Our Core Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our mission is to use technology to create a simple, fast, and trustworthy platform that makes our customers' daily tasks smoother. We are always striving to deliver innovative solutions that not only meet customer needs but also surpass their expectations.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Ensuring customer satisfaction is our top priority.</li>
                                <li>Continuous innovation and platform development.</li>
                                <li>Maintaining ethics and transparency in all operations.</li>
                                <li>Fostering a supportive and motivating environment for our employees.</li>
                            </ul>
                        </div>

     {/* Success Content */}
                        <div
                            id="tab-content-success"
                            className={`space-y-6 ${activeTab !== 'success' ? 'hidden' : ''}`}
                        >
                            <h2 className="text-2xl font-bold text-gray-800">Our Achievements</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Over the past few years, we have achieved significant success. Our platform is now trusted by millions of users. Some of our key accomplishments include:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-4xl font-extrabold text-indigo-600">10K+</p>
                                    <p className="text-gray-500">Satisfied Customers</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-4xl font-extrabold text-pink-500">25+</p>
                                    <p className="text-gray-500">Awards & Honors</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-4xl font-extrabold text-blue-500">99.9%</p>
                                    <p className="text-gray-500">Service Reliability</p>
                                </div>
                            </div>
                        </div>

                        {/* Team & Others Content */}
                        <div
                            id="tab-content-team"
                            className={`space-y-6 ${activeTab !== 'team' ? 'hidden' : ''}`}
                        >
                            <h2 className="text-2xl font-bold text-gray-800">Our Team</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We are committed to moving forward through a collaborative team effort. Every member of our team is highly skilled and experienced in their respective fields. We are determined to achieve our goals by working together.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-800 mt-8">Other Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To learn more about our values, environmental responsibility, and future plans, please visit our contact page or follow the links provided below.
                            </p>
                        </div>

                    </div>

                    {/* Company Email/Contact Mockup */}
                    <div className="mt-12 text-center p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                        <p className="text-lg text-gray-700">For 
                            inquiries, contact us at:
                             <a href="mailto:info@zapshift.com"
             className="text-blue-600 hover:underline
              font-semibold">info@zapshift.com</a></p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Aboutus;