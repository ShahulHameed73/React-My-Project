import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importing Bootstrap Modal for popups
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

const UnifiedLoginButton = () => {
  // State for handling the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handle Google login success
  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login Success:', response);
    // You can extract token or user details here
  };

  // Handle Google login failure
  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failed:', error);
  };

  // Handle Facebook login response
  const responseFacebook = (response) => {
    console.log('Facebook Login Response:', response);
    // Handle response and store user details as needed
  };

  // Handle GitHub login response
  const responseGitHub = (response) => {
    console.log('GitHub Login Response:', response);
    // Handle response and store user details as needed
  };

  return (
    <div>
      {/* Button that triggers modal */}
      <Button variant="primary" onClick={() => setShowModal(true)} className="w-100">
        Login with Google, Facebook, or GitHub
      </Button>

      {/* Modal for Login Options */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Google Login */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            shape="pill"
            size="large"
            text="Login with Google"
            className="w-100 mb-3"
          />

          {/* Facebook Login */}
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            textButton="Login with Facebook"
            className="w-100 mb-3"
          />

          {/* GitHub Login */}
          <GitHubLogin
            clientId="YOUR_GITHUB_CLIENT_ID"
            onSuccess={responseGitHub}
            onFailure={responseGitHub}
            buttonText="Login with GitHub"
            className="w-100"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UnifiedLoginButton;
