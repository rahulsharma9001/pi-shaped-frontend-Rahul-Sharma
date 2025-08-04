import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard.tsx';
import './App.css';

function App() {
  const [expandedCardName, setExpandedCardName] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setExpandedCardName(prevName => (prevName === name ? null : name));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini Profile Card App</h1>
        <p>React & TypeScript Fundamentals Assignment</p>
      </header>
      
      <main className="profile-cards-container">
        <ProfileCard
          name="Alice Johnson"
          age={28}
          email="alice.johnson@email.com"
          isExpanded={expandedCardName === "Alice Johnson"}
          onToggle={handleToggle}
        >
          Alice is a frontend developer with 5 years of experience in React and TypeScript. 
          She loves creating beautiful user interfaces and is passionate about accessibility 
          and user experience design.
        </ProfileCard>

        <ProfileCard
          name="Bob Smith"
          age={34}
          email="bob.smith@email.com"
          isExpanded={expandedCardName === "Bob Smith"}
          onToggle={handleToggle}
        >
          Bob is a software engineer specializing in full-stack development. He has extensive 
          experience with Node.js, Python, and cloud technologies. In his free time, he 
          contributes to open-source projects.
        </ProfileCard>

        <ProfileCard
          name="Carol Williams"
          age={26}
          email="carol.williams@email.com"
          isExpanded={expandedCardName === "Carol Williams"}
          onToggle={handleToggle}
        >
          Carol is a UX/UI designer who transitioned into frontend development. She combines 
          her design background with coding skills to create intuitive and visually appealing 
          web applications.
        </ProfileCard>

        <ProfileCard
          name="David Chen"
          age={31}
          email="david.chen@email.com"
          isExpanded={expandedCardName === "David Chen"}
          onToggle={handleToggle}
        >
          David is a data scientist turned software developer. He specializes in building 
          data visualization tools and analytics dashboards. He's particularly interested 
          in machine learning applications in web development.
        </ProfileCard>
      </main>
    </div>
  );
}

export default App;
