import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8" data-testid='footer-1'>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm">&copy; 2023 GOHOME</p>
          <p className="text-sm">Built by GOHOME club devloppement</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
