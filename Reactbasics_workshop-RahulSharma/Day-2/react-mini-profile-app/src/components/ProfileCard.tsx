import React from 'react';

// TypeScript interface for ProfileCard props
interface ProfileCardProps {
  name: string;
  age: number;
  email: string;
  children: React.ReactNode; // bio content passed as children
  isExpanded: boolean; // Controlled by parent
  onToggle: (name: string) => void; // Callback to parent
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, age, email, children, isExpanded, onToggle }) => {
  // Event handler with proper TypeScript typing
  const handleToggleBio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onToggle(name); // Call the parent's toggle function
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-age">Age: {age}</p>
        <p className="profile-email">Email: {email}</p>
      </div>
      
      <button 
        className="toggle-bio-btn"
        onClick={handleToggleBio}
        type="button"
      >
        {isExpanded ? 'Hide Bio' : 'Show Bio'}
      </button>
      
      {isExpanded && (
        <div className="profile-bio">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
