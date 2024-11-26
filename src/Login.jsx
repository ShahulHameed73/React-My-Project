import React from 'react';

const GitHubLoginButton = () => {
  // GitHub OAuth configuration
  const clientId = 'Ov23liQvebWUL2Z139Fr';  // Replace with your GitHub Client ID
  const redirectUri = 'http://localhost:3000/auth/github/callback';  // Replace with your redirect URI

  // Function to handle GitHub login
  const loginWithGitHub = () => {
    // Redirect to GitHub OAuth URL
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={loginWithGitHub}
        style={{
          padding: '10px 20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default GitHubLoginButton;
