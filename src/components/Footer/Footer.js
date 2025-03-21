import React, { useEffect, useState } from 'react';
import './Footer.css';
import contactsData from '../../assets/contacts.json';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaGlobe, FaDiscord, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [contacts, setContacts] = useState({});

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'phone number': return <FaPhone />;
      case 'email': return <FaEnvelope />;
      case 'linkedin': return <FaLinkedin />;
      case 'github': return <FaGithub />;
      case 'website': return <FaGlobe />;
      case 'discord': return <FaDiscord />;
      case 'instagram': return <FaInstagram />;
      case 'x': return <FaTwitter />;
      case 'tiktok': return <FaTiktok />;
      case 'youtube': return <FaYoutube />;
      default: return null;
    }
  };

  const getHref = (type, value) => {
    switch (type) {
      case 'phone number': return `tel:${value}`;
      case 'email': return `mailto:${value}`;
      case 'linkedin': return value.startsWith('http') ? value : `https://${value}`;
      case 'github': return value.startsWith('http') ? value : `https://${value}`;
      case 'website': return value;
      case 'discord': return `https://discord.com/users/${value}`;
      case 'instagram': return value.startsWith('http') ? value : `https://${value}`;
      case 'x': return value.startsWith('http') ? value : `https://${value}`;
      case 'tiktok': return value;
      case 'youtube': return value;
      default: return '#';
    }
  };

  const footerDisplayContacts = ['email', 'linkedin', 'github', 'x', 'instagram'];

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Ricky Iwasaki</h3>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        
        <div className="footer-contacts">
          {Object.entries(contacts)
            .filter(([type]) => footerDisplayContacts.includes(type))
            .map(([type, value]) => (
              <a 
                key={type}
                href={getHref(type, value)}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
                title={type.charAt(0).toUpperCase() + type.slice(1)}
              >
                {getIcon(type)}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 