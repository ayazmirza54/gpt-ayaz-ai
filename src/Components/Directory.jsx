import React from "react";
// Create this for custom styles

const categories = [
    { name: "TypeScript", count: 22 },
    { name: "Python", count: 16 },
    { name: "Next.js", count: 12 },
    { name: "React", count: 12 },
    { name: "PHP", count: 8 },
    { name: "JavaScript", count: 5 },
    { name: "TailwindCSS", count: 5 },
    { name: "Laravel", count: 5 },
    { name: "C#", count: 4 },
    { name: "Web Development", count: 4 },
];

const cards = [
    {
        content: `You are an expert Chrome extension developer, proficient in JavaScript/TypeScript, browser extension APIs, and web development.

Code Style and Structure
- Write clear, modular TypeScript code with proper type definitions
- Follow functional`,
    },
    {
        content: `You are an expert in TypeScript, React Native, Expo, and Mobile UI development.

Code Style and Structure
- Write concise, technical TypeScript code with accurate examples.
- Use functional and`,
    },
    // Add more cards as needed
];

export default function Directory() {
    return (
        <div style={{ background: "#181818", minHeight: "100vh", color: "#fff" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #222" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>cursor.directory</div>
                <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <a href="#" style={{ color: "#fff", fontWeight: "bold" }}>Rules</a>
                    <a href="#">Trending</a>
                    <a href="#">Jobs</a>
                    <a href="#">MCPs</a>
                    <a href="#">Generate</a>
                    <a href="#">Members</a>
                    <a href="#">More</a>
                    <button style={{ background: "#fff", color: "#181818", borderRadius: "24px", padding: "8px 24px", border: "none", fontWeight: "bold" }}>Sign In</button>
                </nav>
            </div>
            {/* Main Layout */}
            <div style={{ display: "flex" }}>
                {/* Sidebar */}
                <aside style={{ width: "240px", background: "#181818", borderRight: "1px solid #222", padding: "32px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "calc(100vh - 64px)" }}>
                    <div>
                        <div style={{ fontWeight: "bold", marginBottom: "32px" }}>cursor.directory</div>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {categories.map((cat) => (
                                <li key={cat.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontWeight: "bold" }}>
                                    <span>{cat.name}</span>
                                    <span>{cat.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button style={{ background: "#333", color: "#fff", borderRadius: "24px", padding: "12px 0", border: "none", fontWeight: "bold", width: "100%", marginTop: "32px" }}>Submit +</button>
                </aside>
                {/* Main Content */}
                <main style={{ flex: 1, padding: "32px" }}>
                    {/* Tabs and Search */}
                    <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
                        <div>
                            <button style={{ background: "#222", color: "#fff", border: "none", padding: "8px 24px", borderRadius: "6px", fontWeight: "bold", marginRight: "8px" }}>All</button>
                            <button style={{ background: "none", color: "#aaa", border: "none", padding: "8px 24px", borderRadius: "6px", marginRight: "8px" }}>Popular</button>
                            <button style={{ background: "none", color: "#aaa", border: "none", padding: "8px 24px", borderRadius: "6px" }}>Official</button>
                        </div>
                        <input type="text" placeholder="Search rules..." style={{ flex: 1, background: "#222", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px" }} />
                    </div>
                    {/* Section Title */}
                    <h2 style={{ margin: "24px 0" }}>TypeScript</h2>
                    {/* Cards */}
                    <div style={{ display: "flex", gap: "32px" }}>
                        {cards.map((card, idx) => (
                            <div key={idx} style={{ background: "#111", borderRadius: "12px", padding: "16px", width: "320px", minHeight: "240px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                                <pre style={{ color: "#ccc", background: "none", flex: 1, overflowY: "auto", fontFamily: "monospace", fontSize: "1rem" }}>
                                    {card.content}
                                </pre>
                            </div>
                        ))}
                        {/* Example ad/info card */}
                        <div style={{ background: "#222", borderRadius: "12px", padding: "16px", width: "320px", minHeight: "240px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ color: "#ff6600", fontWeight: "bold", fontSize: "1.2rem" }}>Ship <span style={{ color: "#fff" }}>100x</span> Faster with Cursor</div>
                            <div style={{ color: "#fff", marginTop: "16px" }}>AI-Powered Requirements and Task Management for Cursor Developers</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
