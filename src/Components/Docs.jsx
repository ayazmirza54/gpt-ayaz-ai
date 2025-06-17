import React from "react";

const Docs = ({ theme }) => (
    <section id="docs" className={`py-20 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6">
            <h2 className={`text-4xl font-bold text-center mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Documentation</h2>
            <div className={`rounded-lg border shadow-xl p-8 ${theme === 'dark' ? 'border-[#222] bg-[#181818] text-white' : 'border-gray-200 bg-white text-gray-900'}`}>
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">What is GPT.AYAZ?</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <b className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>GPT.AYAZ</b> is an AI-powered development hub that provides code generation, documentation, bug detection, architecture planning, and more—all in an interactive, terminal-inspired web interface.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-orange-400">Getting Started</h3>
                <ol className={`list-decimal list-inside mb-6 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>
                        <b className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Install:</b> <code className={`${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'} text-orange-400 px-2 py-1 rounded`}>npm install gpt-ayaz</code>
                    </li>
                    <li>
                        <b className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Generate:</b> <code className={`${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'} text-orange-400 px-2 py-1 rounded`}>gpt-ayaz generate "React component"</code>
                    </li>
                    <li>
                        <b className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Explore:</b> Use the interactive terminal and prompt snippets on the website.
                    </li>
                </ol>

                <h3 className="text-xl font-semibold mb-3 text-orange-400">Features</h3>
                <ul className={`list-disc list-inside mb-6 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>Code Generation & Review</li>
                    <li>Documentation Writing</li>
                    <li>Bug Detection & Fixing</li>
                    <li>Architecture Planning</li>
                    <li>Performance Optimization</li>
                    <li>API Integration</li>
                    <li>Testing Automation</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-orange-400">Terminal Commands</h3>
                <div className="mb-6">
                    <pre className={`${theme === 'dark' ? 'bg-[#222]' : 'bg-gray-100'} text-white rounded p-4 text-sm overflow-x-auto`}>
                        {`help      Show this help message
about     About GPT.AYAZ
skills    List AI capabilities
clear     Clear terminal
date      Show current date
whoami    Display user info
ls        List directory contents
cat [file] Display file contents`}
                    </pre>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-orange-400">Repository & Credits</h3>
                <p>
                    <a
                        href="https://github.com/ayaz/gpt-ayaz"
                        className="text-orange-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        github.com/ayaz/gpt-ayaz
                    </a>
                </p>
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Built with React, Vite, and Tailwind CSS.
                </p>
            </div>
        </div>
    </section>
);

export default Docs;
