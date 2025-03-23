import React, { useEffect, useState } from 'react';
import './Contacts.css';
import contactsData from '../../assets/contacts.json';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaGlobe, FaDiscord, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

const Contacts = () => {
  const [contacts, setContacts] = useState({});
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  
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

  
  const getDisplayText = (type, value) => {
    if (['linkedin', 'github', 'instagram', 'x'].includes(type)) {
      
      const parts = value.split('/');
      return parts[parts.length - 1];
    }
    return value;
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

  return (
    <div className="contacts-container">
      <h1>Contact Information</h1>
      <p className="contacts-intro">
        Feel free to reach out to me through any of the following channels. 
        I'm always open to new opportunities, collaborations, or just a friendly chat!
      </p>
      
      <div className="contacts-grid">
        {Object.entries(contacts).map(([type, value]) => (
          <div className="contact-card" key={type}>
            <div className="contact-icon">{getIcon(type)}</div>
            <div className="contact-info">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <a 
                href={getHref(type, value)} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {getDisplayText(type, value)}
              </a>
            </div>
            <button 
              className="copy-button" 
              onClick={() => copyToClipboard(value, type)}
              title="Copy to clipboard"
            >
              {copied === type ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts; 