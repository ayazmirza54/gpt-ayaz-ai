import React, { useState, useEffect, useRef } from 'react';
import {
    Copy,
    Moon,
    Sun,
    Terminal,
    Code,
    FileText,
    Home,
    ChevronRight,
    Loader,
    Play,
    Square,
    Menu,
    X
} from 'lucide-react';
import Docs from './Docs';
const GPTAyazWebsite = () => {
    const [theme, setTheme] = useState('dark');
    const [isLoading, setIsLoading] = useState(true);
    const [terminalInput, setTerminalInput] = useState('');
    const [terminalOutput, setTerminalOutput] = useState([
        { type: 'system', content: 'Welcome to GPT.AYAZ Interactive Terminal' },
        { type: 'system', content: "Type 'help' for available commands" }
    ]);
    const [heroText, setHeroText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const terminalRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const heroTexts = [
        'npm install gpt-ayaz',
        'gpt-ayaz generate "React component"',
        'Building AI-powered applications...',
        'Ready for development! 🚀'
    ];

    const terminalCommands = {
        help: () => `Available commands:
- help: Show this help message
- about: About GPT.AYAZ
- skills: List AI capabilities
- clear: Clear terminal
- date: Show current date
- whoami: Display user info
- ls: List directory contents
- cat [file]: Display file contents`,

        about: () => `GPT.AYAZ v2.0
AI-Powered Development Hub
Built with React + Vite + Tailwind CSS
Repository: github.com/ayaz/gpt-ayaz`,

        skills: () => `AI Capabilities:
→ Code Generation & Review
→ Documentation Writing  
→ Bug Detection & Fixing
→ Architecture Planning
→ Performance Optimization
→ API Integration
→ Testing Automation`,

        clear: () => 'CLEAR',
        date: () => new Date().toLocaleString(),
        whoami: () => 'root@gpt-ayaz-terminal',
        ls: () => `total 8
drwxr-xr-x  2 ayaz ayaz 4096 Jun 17 10:30 projects/
drwxr-xr-x  2 ayaz ayaz 4096 Jun 17 10:30 docs/
-rw-r--r--  1 ayaz ayaz  256 Jun 17 10:30 README.md
-rw-r--r--  1 ayaz ayaz  128 Jun 17 10:30 config.json`,

        cat: (args) => {
            const file = args?.[0];
            const files = {
                'README.md': `# GPT.AYAZ
AI-powered development tools and utilities.
Visit: https://gpt.ayaz.dev`,
                'config.json': `{
  "version": "2.0.0",
  "environment": "production", 
  "ai_model": "gpt-4",
  "features": ["code-gen", "docs", "debug"]
}`
            };
            return files[file] || `cat: ${file}: No such file or directory`;
        }
    };

    const codeSnippets = [
        {
            language: 'Data Analysis',
            title: 'Data Analysis',
            prompt: 'Create a comprehensive data analysis project using Python that includes:\n1. Data cleaning and preprocessing\n2. Exploratory data analysis with visualizations\n3. Statistical analysis and hypothesis testing\n4. Machine learning model implementation\n5. Results interpretation and reporting\nUse pandas, numpy, matplotlib, and scikit-learn libraries.'
        },
        {
            language: 'Content Writing',
            title: 'Content Writing',
            prompt: 'Generate a detailed content writing project that includes:\n1. Topic research and keyword analysis\n2. Content outline and structure\n3. SEO optimization guidelines\n4. Writing style and tone guidelines\n5. Content calendar and publishing schedule\nFocus on creating engaging, informative, and shareable content.'
        },
        {
            language: 'Web Development',
            title: 'Web Development',
            prompt: 'Create a modern web development project that includes:\n1. Frontend development with React/Vue/Angular\n2. Backend API development with Node.js/Python\n3. Database design and implementation\n4. Authentication and authorization\n5. Responsive design and UI/UX best practices\nInclude code examples and deployment instructions.'
        },
        {
            language: 'CLI Commands',
            title: 'CLI Commands',
            prompt: 'Develop a robust CLI command-line tool that includes:\n1. Command argument parsing and validation\n2. Interactive user interface with progress bars\n3. File system operations and error handling\n4. Configuration management\n5. Logging and debugging features\nUse Python\'s argparse, click, or typer libraries for implementation.'
        }
    ];

    // Loading animation effect
    useEffect(() => {
        const timer = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        return () => clearInterval(timer);
    }, []);

    // Hero text typing effect
    useEffect(() => {
        if (!isLoading) {
            const typeText = (text, callback) => {
                let i = 0;
                const timer = setInterval(() => {
                    setHeroText(text.slice(0, i));
                    i++;
                    if (i > text.length) {
                        clearInterval(timer);
                        setTimeout(callback, 2000);
                    }
                }, 80);
            };

            const cycleTexts = () => {
                typeText(heroTexts[currentTextIndex], () => {
                    setCurrentTextIndex(prev => (prev + 1) % heroTexts.length);
                });
            };

            setTimeout(cycleTexts, 1000);
        }
    }, [currentTextIndex, isLoading]);

    // Terminal auto-scroll
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalOutput]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Could add toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleTerminalSubmit = (e) => {
        e.preventDefault();
        if (!terminalInput.trim()) return;

        const newOutput = [...terminalOutput];
        newOutput.push({ type: 'input', content: `ayaz@gpt:~$ ${terminalInput}` });

        const [cmd, ...args] = terminalInput.trim().split(' ');

        if (terminalCommands[cmd]) {
            const result = terminalCommands[cmd](args);
            if (result === 'CLEAR') {
                setTerminalOutput([
                    { type: 'system', content: 'Terminal cleared' }
                ]);
            } else {
                newOutput.push({ type: 'output', content: result });
                setTerminalOutput(newOutput);
            }
        } else {
            newOutput.push({
                type: 'error',
                content: `Command not found: ${cmd}. Type 'help' for available commands.`
            });
            setTerminalOutput(newOutput);
        }

        setTerminalInput('');
    };

    const SyntaxHighlight = ({ code, language }) => {
        const highlightCode = (code) => {
            return code
                .replace(/(const|let|var|function|class|import|export|from|async|await|try|catch|if|else|return)/g, '<span class="text-pink-400">$1</span>')
                .replace(/('([^']*)'|"([^"]*)")/g, '<span class="text-yellow-300">$1</span>')
                .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500">$1</span>')
                .replace(/(\d+)/g, '<span class="text-purple-400">$1</span>');
        };

        return (
            <pre className="text-sm leading-relaxed overflow-x-auto">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
            </pre>
        );
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#181818] flex items-center justify-center z-50">
                <div className="text-center space-y-4">
                    <div className="text-orange-400 text-xl">Compiling GPT.AYAZ...</div>
                    <div className="w-80 h-1 bg-[#222] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-400 transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        />
                    </div>
                    <div className="text-gray-400 text-sm ">{loadingProgress}%</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#181818] text-white">
            {/* Header */}
            <header className="w-full border-b border-[#222] bg-[#181818]">
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg sm:text-xl font-bold text-orange-400">GPT.AYAZ</span>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="sm:hidden p-2 rounded-md hover:bg-[#222]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-4 md:gap-8">
                        <a href="#home" className="flex items-center gap-1 hover:text-orange-400 font-bold">
                            <Home size={18} className="text-orange-400" />
                            <span className="hidden md:inline">home</span>
                        </a>
                        <a href="#code" className="flex items-center gap-1 hover:text-orange-400">
                            <Code size={18} className="text-orange-400" />
                            <span className="hidden md:inline">code</span>
                        </a>
                        <a href="#terminal" className="flex items-center gap-1 hover:text-orange-400">
                            <Terminal size={18} className="text-orange-400" />
                            <span className="hidden md:inline">terminal</span>
                        </a>
                        <a href="#docs" className="flex items-center gap-1 hover:text-orange-400">
                            <FileText size={18} className="text-orange-400" />
                            <span className="hidden md:inline">docs</span>
                        </a>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-[#222] hover:bg-[#222] transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden px-4 py-2 space-y-2 border-t border-[#222]">
                        <a href="#home" className="flex items-center gap-2 p-2 hover:bg-[#222] rounded-md">
                            <Home size={18} className="text-orange-400" />
                            <span>home</span>
                        </a>
                        <a href="#code" className="flex items-center gap-2 p-2 hover:bg-[#222] rounded-md">
                            <Code size={18} className="text-orange-400" />
                            <span>code</span>
                        </a>
                        <a href="#terminal" className="flex items-center gap-2 p-2 hover:bg-[#222] rounded-md">
                            <Terminal size={18} className="text-orange-400" />
                            <span>terminal</span>
                        </a>
                        <a href="#docs" className="flex items-center gap-2 p-2 hover:bg-[#222] rounded-md">
                            <FileText size={18} className="text-orange-400" />
                            <span>docs</span>
                        </a>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section id="home" className="pt-12 sm:pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-orange-900/20" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">
                        GPT.AYAZ
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12">
                        ONE STOP SHOP FOR ALL YOUR AI NEEDS
                    </p>
                    {/* Terminal Window */}
                    <div className="max-w-2xl mx-auto rounded-lg border border-[#222] shadow-2xl overflow-hidden bg-[#181818]">
                        <div className="px-4 py-3 border-b border-[#222] flex items-center space-x-2 bg-[#222]">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-auto text-sm text-gray-400">gpt-ayaz-terminal</span>
                        </div>
                        <div className="p-6 h-48 flex flex-col">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-orange-400">ayaz@gpt:~$</span>
                                <span className="text-orange-400">{heroText}</span>
                                <span className="w-2 h-5 bg-orange-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Snippets Section */}
            <section id="code" className="py-12 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16">Prompt Snippets</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {codeSnippets.map((snippet, index) => (
                            <div key={index} className="rounded-lg border border-[#222] bg-[#181818] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Code Header */}
                                <div className="px-4 py-3 border-b border-[#222] bg-[#222] flex items-center justify-between">
                                    <span className="text-sm text-gray-400">{snippet.language}</span>
                                    <button
                                        onClick={() => copyToClipboard(snippet.prompt)}
                                        className="flex items-center space-x-1 px-2 py-1 text-xs bg-orange-400 hover:bg-orange-500 text-white rounded transition-colors"
                                    >
                                        <Copy size={12} />
                                        <span>Copy</span>
                                    </button>
                                </div>

                                {/* Code Content */}
                                <div className="p-4 overflow-x-auto">
                                    <SyntaxHighlight code={snippet.prompt} language={snippet.language} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Terminal Section */}
            <section id="terminal" className="py-12 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16">Interactive Terminal</h2>

                    <div className="rounded-lg border border-[#222] bg-[#181818] shadow-2xl overflow-hidden">
                        {/* Terminal Header */}
                        <div className="px-4 py-3 border-b border-[#222] bg-[#222] flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-auto text-sm text-gray-400">gpt-ayaz-interactive</span>
                        </div>

                        {/* Terminal Output */}
                        <div
                            ref={terminalRef}
                            className="h-80 overflow-y-auto p-4 space-y-2"
                        >
                            {terminalOutput.map((line, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                    {line.type === 'input' && (
                                        <span className="text-orange-400 shrink-0">ayaz@gpt:~$</span>
                                    )}
                                    <span className={`whitespace-pre-wrap ${line.type === 'error' ? 'text-red-400' :
                                        line.type === 'system' ? 'text-orange-400' :
                                            'text-gray-400'
                                        }`}>
                                        {line.content}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Terminal Input */}
                        <div className="border-t border-[#222] p-4 flex items-center space-x-2">
                            <span className="text-orange-400">ayaz@gpt:~$</span>
                            <input
                                type="text"
                                value={terminalInput}
                                onChange={(e) => setTerminalInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleTerminalSubmit(e);
                                    }
                                }}
                                placeholder="Enter command..."
                                className="flex-1 bg-transparent outline-none text-gray-400 placeholder-gray-400"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Section */}
            <Docs theme={theme} />

            {/* Footer */}
            <footer className="py-8 sm:py-12 border-t border-[#222] bg-[#181818]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-sm sm:text-base text-gray-400">
                        Built with React + Vite | GPT.AYAZ v2.0
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default GPTAyazWebsite;