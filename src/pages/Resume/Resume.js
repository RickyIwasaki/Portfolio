import React, { useState, useEffect, useMemo, useRef } from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import './Resume.css';

const resumeDataMap = {};
const languageCodes = [
  'en', 'ja', 'fr', 'es', 'zh', 'ko', 'ru', 'de', 'it', 'pt', 'ar', 'hi', 'tr', 'vi', 'th',
  'pl', 'nl', 'sv', 'el', 'cs', 'hu', 'ro', 'id', 'bg', 'da', 'uk', 'sk', 'hr', 'lt', 'sl',
  'lv', 'et', 'sr', 'no', 'he', 'fi', 'sg', 'ff', 'wo', 'si', 'mg', 'st', 'so', 'ha', 'sm',
  'kr', 'uz', 'ku', 'br', 'ti', 'ch', 'cv', 'gv', 'is', 'jv', 'fo', 'kv', 'bs', 'lo', 'qu',
  'co', 'eu', 'kn', 'fj', 'ss', 'yi', 'kk', 'ms', 'ts', 'iu', 'mi', 'ty', 'ps', 'or', 'ug',
  'ka', 'ml', 'nr', 'su', 'to', 'tn', 'ny', 'gu', 'sa', 'dz', 'ee', 'sd', 'ig', 'ga', 'gn',
  'ay', 'fy', 'gd', 'sn', 'ta', 'mk', 'gl', 'be', 'tl', 'ht', 'os', 'zu', 'mh', 'tg', 'cy',
  'mr', 've', 'bo', 'tw'
];


try {
  resumeDataMap['en'] = require('../../assets/resumes/resume-en.json');
  
  languageCodes.forEach(code => {
    if (code !== 'en') {
      try {
        resumeDataMap[code] = require(`../../assets/resumes/resume-${code}.json`);
      } catch (error) {
        console.warn(`Failed to load resume for language: ${code}`);
      }
    }
  });
} catch (error) {
  console.error('Failed to load English resume file. This is a critical error:', error);
}


const styles = {
  minimal: 'resume-style-minimal',
  modern: 'resume-style-modern',
  vibrant: 'resume-style-vibrant',
  professional: 'resume-style-professional',
  technical: 'resume-style-technical',
  elegant: 'resume-style-elegant',
  onepage: 'resume-style-onepage'
};


const languageNames = {
  'en': 'English',
  'ja': '日本語',
  'fr': 'Français',
  'es': 'Español',
  'zh': '中文',
  'ko': '한국어',
  'ru': 'Русский',
  'de': 'Deutsch',
  'it': 'Italiano',
  'pt': 'Português',
  'ar': 'العربية',
  'hi': 'हिन्दी',
  'tr': 'Türkçe',
  'vi': 'Tiếng Việt',
  'th': 'ไทย',
  'pl': 'Polski',
  'nl': 'Nederlands',
  'sv': 'Svenska',
  'el': 'Ελληνικά',
  'cs': 'Čeština',
  'hu': 'Magyar',
  'ro': 'Română',
  'id': 'Bahasa Indonesia',
  'bg': 'Български',
  'da': 'Dansk',
  'uk': 'Українська',
  'sk': 'Slovenčina',
  'hr': 'Hrvatski',
  'lt': 'Lietuvių',
  'sl': 'Slovenščina',
  'lv': 'Latviešu',
  'et': 'Eesti',
  'sr': 'Српски',
  'no': 'Norsk',
  'he': 'עברית',
  'fi': 'Suomi',
  'sg': 'Sango',
  'ff': 'Fulfulde',
  'wo': 'Wolof',
  'si': 'සිංහල',
  'mg': 'Malagasy',
  'st': 'Sesotho',
  'so': 'Soomaali',
  'ha': 'Hausa',
  'sm': 'Samoa',
  'kr': 'Kanuri',
  'uz': 'Oʻzbek',
  'ku': 'Kurdî',
  'br': 'Brezhoneg',
  'ti': 'ትግርኛ',
  'ch': 'Chamoru',
  'cv': 'Чӑвашла',
  'gv': 'Gaelg',
  'is': 'Íslenska',
  'jv': 'Basa Jawa',
  'fo': 'Føroyskt',
  'kv': 'Коми',
  'bs': 'Bosanski',
  'lo': 'ລາວ',
  'qu': 'Runa Simi',
  'co': 'Corsu',
  'eu': 'Euskara',
  'kn': 'ಕನ್ನಡ',
  'fj': 'Vosa Vakaviti',
  'ss': 'SiSwati',
  'yi': 'ייִדיש',
  'kk': 'Қазақ тілі',
  'ms': 'Bahasa Melayu',
  'ts': 'Xitsonga',
  'iu': 'ᐃᓄᒃᑎᑐᑦ',
  'mi': 'Māori',
  'ty': 'Reo Tahiti',
  'ps': 'پښتو',
  'or': 'ଓଡ଼ିଆ',
  'ug': 'ئۇيغۇرچە',
  'ka': 'ქართული',
  'ml': 'മലയാളം',
  'nr': 'isiNdebele',
  'su': 'Basa Sunda',
  'to': 'Lea Fakatonga',
  'tn': 'Setswana',
  'ny': 'Chichewa',
  'gu': 'ગુજરાતી',
  'sa': 'संस्कृतम्',
  'dz': 'རྫོང་ཁ',
  'ee': 'Eʋegbe',
  'sd': 'سنڌي',
  'ig': 'Igbo',
  'ga': 'Gaeilge',
  'gn': 'Avañeʼẽ',
  'ay': 'Aymar aru',
  'fy': 'Frysk',
  'gd': 'Gàidhlig',
  'sn': 'ChiShona',
  'ta': 'தமிழ்',
  'mk': 'Македонски',
  'gl': 'Galego',
  'be': 'Беларуская',
  'tl': 'Tagalog',
  'ht': 'Kreyòl Ayisyen',
  'os': 'Ирон',
  'zu': 'isiZulu',
  'mh': 'Kajin Majel',
  'tg': 'Тоҷикӣ',
  'cy': 'Cymraeg',
  'mr': 'मराठी',
  've': 'Tshivenḓa',
  'bo': 'བོད་སྐད་',
  'tw': 'Twi'
};

const Resume = () => {
  
  const [language, setLanguage] = useState('en');
  const [uiLanguage, setUiLanguage] = useState('en'); 
  const [style, setStyle] = useState('modern');
  const [resumeData, setResumeData] = useState(resumeDataMap['en'] || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  const contentRef = useRef(); 
  const headerContentRef = useRef();
  const summaryContentRef = useRef();
  const educationContentRef = useRef();
  const experienceContentRef = useRef();
  const skillsContentRef = useRef();
  const languagesContentRef = useRef();
  const projectsContentRef = useRef();

  
  const filteredLanguages = useMemo(() => {
    if (!languageSearchQuery.trim()) return Object.entries(languageNames);
    
    return Object.entries(languageNames).filter(([code, name]) => 
      name.toLowerCase().includes(languageSearchQuery.toLowerCase()) ||
      code.toLowerCase().includes(languageSearchQuery.toLowerCase())
    );
  }, [languageSearchQuery]);

  
  useEffect(() => {
    setResumeData(resumeDataMap[language] || resumeDataMap['en']);
    setSearchQuery(''); 
    setSearchResults(null);
    
    
    setUiLanguage(language === 'ja' ? 'ja' : 'en');
  }, [language]);

  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  
  
  const handleLanguageSearch = (e) => {
    setLanguageSearchQuery(e.target.value);
  };

  
  const handleStyleChange = (newStyle) => {
    setStyle('');
    
    if (contentRef.current) {
      const element = contentRef.current;
      element.style.animation = 'none';
      element.style.transition = 'none';
      
      void element.offsetHeight;
    }
    
    setTimeout(() => {
      setStyle(newStyle);
      if (contentRef.current) {
        contentRef.current.style.animation = '';
        contentRef.current.style.transition = '';
      }
    }, 20);
  };

  
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    
    const results = {
      summary: query && resumeData.summary.toLowerCase().includes(query.toLowerCase()) ? [resumeData.summary] : [],
      education: query ? resumeData.education.filter(edu => 
        Object.values(edu).some(val => 
          typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())
        )
      ) : [],
      experience: query ? resumeData.experience.filter(exp => 
        Object.values(exp).some(val => 
          (typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())) ||
          (Array.isArray(val) && val.some(item => 
            typeof item === 'string' && item.toLowerCase().includes(query.toLowerCase())
          ))
        )
      ) : [],
      skills: query ? Object.entries(resumeData.skills).filter(([key, values]) => 
        values.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      ).reduce((acc, [key, values]) => {
        acc[key] = values.filter(skill => skill.toLowerCase().includes(query.toLowerCase()));
        return acc;
      }, {}) : {},
      projects: query ? resumeData.projects.filter(project => 
        Object.values(project).some(val => 
          (typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())) ||
          (Array.isArray(val) && val.some(item => 
            typeof item === 'string' && item.toLowerCase().includes(query.toLowerCase())
          ))
        )
      ) : []
    };
    
    
    const hasResults = results.summary.length > 0 || 
                       results.education.length > 0 || 
                       results.experience.length > 0 || 
                       Object.keys(results.skills).length > 0 ||
                       results.projects.length > 0;
                       
    setSearchResults(hasResults ? results : null);
  };

  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };
  
  
  const clearLanguageSearch = () => {
    setLanguageSearchQuery('');
  };

  
  const handleJsonDownload = () => {
    
    const element = document.createElement('a');
    
    
    const resumeBlob = new Blob(
      [JSON.stringify(resumeData, null, 2)], 
      { type: 'application/json' }
    );
    
    
    const url = URL.createObjectURL(resumeBlob);
    
    
    element.href = url;
    if(uiLanguage === 'en') {
      element.download = `Resume-Ricky-Iwasaki-${language}.json`;
    } else {
      element.download = `履歴書-岩崎力樹.json`;
    }
    
    
    document.body.appendChild(element);
    element.click();
    
    
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handlePdfDownload = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const tempContainer = document.createElement('div');
    tempContainer.className = `resume-view ${style ? styles[style] : ''}`;
    
    tempContainer.style.animation = 'none';
    tempContainer.style.transition = 'none';
    
    if (headerContentRef.current) {
      const headerClone = headerContentRef.current.cloneNode(true);
      tempContainer.appendChild(headerClone);
    }
    
    if (showSummary && summaryContentRef.current) {
      const summaryClone = summaryContentRef.current.cloneNode(true);
      tempContainer.appendChild(summaryClone);
    }
    
    if (showEducation && educationContentRef.current) {
      const educationClone = educationContentRef.current.cloneNode(true);
      tempContainer.appendChild(educationClone);
    }
    
    if (showExperience && experienceContentRef.current) {
      const experienceClone = experienceContentRef.current.cloneNode(true);
      tempContainer.appendChild(experienceClone);
    }
    
    if (showSkills && skillsContentRef.current) {
      const skillsClone = skillsContentRef.current.cloneNode(true);
      tempContainer.appendChild(skillsClone);
    }
    
    if (languagesContentRef.current) {
      const languagesClone = languagesContentRef.current.cloneNode(true);
      tempContainer.appendChild(languagesClone);
    }
    
    if (showProjects && projectsContentRef.current) {
      const projectsClone = projectsContentRef.current.cloneNode(true);
      tempContainer.appendChild(projectsClone);
    }
    
    document.body.appendChild(tempContainer);
    
    if(style === 'minimal') {
      tempContainer.style.width = '800px';
      tempContainer.style.marginTop = '-20px';
      
      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        margin: [10, 10, 10, 10], 
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.238,
          letterRendering: true,
        }
      });
    } else if(style === 'modern') {
      tempContainer.style.width = '900px';

      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        margin: [10, 10, 10, 10],
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.212,
          letterRendering: true,
        }
      });
    } else if(style === 'vibrant') {
      // Set specific width for the vibrant style
      tempContainer.style.width = '900px';
      tempContainer.style.position = 'relative';
      tempContainer.style.zIndex = '1';
      
      // Enhance the vibrant effects for PDF output
      tempContainer.style.background = 'linear-gradient(135deg, #111 0%, #222 100%)';
      tempContainer.style.padding = '20px'; // Add padding to ensure content doesn't overlap with border
      
      // Remove animation that won't work in PDF and enhance static effects
      const beforeElement = document.createElement('div');
      beforeElement.style.position = 'absolute';
      beforeElement.style.inset = '0';
      beforeElement.style.borderRadius = '11px';
      beforeElement.style.padding = '2px';
      beforeElement.style.background = 'linear-gradient(45deg, #ff00e0, #00f0ff, #00ff9d, #ff0058)';
      beforeElement.style.pointerEvents = 'none';
      beforeElement.style.zIndex = '-1';
      
      // Insert the static gradient border as the first child
      tempContainer.insertBefore(beforeElement, tempContainer.firstChild);
      
      // Add a content wrapper to ensure proper positioning
      const contentWrapper = document.createElement('div');
      contentWrapper.style.position = 'relative';
      contentWrapper.style.zIndex = '2';
      
      // Move all children to the wrapper
      while (tempContainer.children.length > 1) { // Skip the first child (beforeElement)
        contentWrapper.appendChild(tempContainer.children[1]);
      }
      
      // Add the wrapper back to the container
      tempContainer.appendChild(contentWrapper);
      
      // Set background of sections
      const sections = tempContainer.querySelectorAll('section');
      sections.forEach(section => {
        section.style.background = 'rgba(0, 0, 0, 0.2)';
        section.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        section.style.padding = '2rem';
        section.style.marginBottom = '0';
      });
      
      // Special styling for the header
      const header = tempContainer.querySelector('header');
      if (header) {
        header.style.background = 'rgba(0, 0, 0, 0.5)';
        header.style.padding = '2rem';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.marginBottom = '0';
      }
      
      // Enhance text shadows and effects for better PDF rendering
      const headings = tempContainer.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => {
        if (heading.tagName === 'H1') {
          heading.style.textShadow = '0 0 10px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.5)';
          heading.style.color = '#fff';
          heading.style.fontSize = '2.5rem';
          heading.style.fontWeight = '700';
          heading.style.letterSpacing = '1px';
        } else if (heading.tagName === 'H2') {
          heading.style.textShadow = '0 0 8px rgba(0, 240, 255, 0.7)';
          heading.style.color = '#00f0ff';
          heading.style.fontSize = '1.3rem';
          heading.style.fontWeight = '400';
          heading.style.letterSpacing = '0.5px';
        } else if (heading.tagName === 'H3') {
          heading.style.textShadow = '0 0 8px rgba(255, 0, 224, 0.7)';
          heading.style.color = '#ff00e0';
          heading.style.fontSize = '1.5rem';
          heading.style.fontWeight = '600';
          heading.style.letterSpacing = '1px';
          heading.style.paddingBottom = '0.6rem';
          heading.style.position = 'relative';
          
          // Add the gradient line under section headings
          const afterElement = document.createElement('div');
          afterElement.style.position = 'absolute';
          afterElement.style.bottom = '0';
          afterElement.style.left = '0';
          afterElement.style.width = '60px';
          afterElement.style.height = '3px';
          afterElement.style.background = 'linear-gradient(90deg, #ff00e0, #00f0ff)';
          afterElement.style.boxShadow = '0 0 10px rgba(255, 0, 224, 0.7)';
          heading.appendChild(afterElement);
        }
      });
      
      // Enhance the contact info boxes
      const contactInfo = tempContainer.querySelectorAll('.contact-info p');
      contactInfo.forEach(p => {
        p.style.background = 'rgba(0, 0, 0, 0.3)';
        p.style.padding = '0.5rem 1rem';
        p.style.borderRadius = '30px';
        p.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.2)';
        p.style.border = '1px solid rgba(0, 240, 255, 0.3)';
        p.style.color = 'rgba(255, 255, 255, 0.8)';
      });
      
      // Enhance experience, education and project items
      const items = tempContainer.querySelectorAll('.experience-item, .education-item, .project-item');
      items.forEach(item => {
        item.style.background = 'rgba(0, 0, 0, 0.4)';
        item.style.borderRadius = '8px';
        item.style.border = 'none';
        item.style.borderLeft = '3px solid #00ff9d';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 255, 157, 0.2)';
        item.style.padding = '1.2rem';
        item.style.marginBottom = '1.8rem';
      });
      
      // Style the experience item titles
      const itemHeadings = tempContainer.querySelectorAll('.experience-item h4, .education-item h4, .project-item h4');
      itemHeadings.forEach(heading => {
        heading.style.fontWeight = '600';
        heading.style.color = '#00ff9d';
        heading.style.fontSize = '1.2rem';
        heading.style.marginBottom = '0.8rem';
        heading.style.textShadow = '0 0 8px rgba(0, 255, 157, 0.5)';
      });
      
      // Enhance skill groups
      const skillGroups = tempContainer.querySelectorAll('.skills-group');
      skillGroups.forEach(group => {
        const heading = group.querySelector('h4');
        if (heading) {
          heading.style.fontWeight = '600';
          heading.style.color = '#ff0058';
          heading.style.marginBottom = '0.8rem';
          heading.style.fontSize = '1.1rem';
          heading.style.textShadow = '0 0 8px rgba(255, 0, 88, 0.6)';
        }
        
        const paragraph = group.querySelector('p');
        if (paragraph) {
          paragraph.style.background = 'rgba(0, 0, 0, 0.4)';
          paragraph.style.padding = '1rem';
          paragraph.style.borderRadius = '8px';
          paragraph.style.color = 'rgba(255, 255, 255, 0.9)';
          paragraph.style.border = '1px solid rgba(255, 0, 88, 0.3)';
          paragraph.style.boxShadow = '0 0 10px rgba(255, 0, 88, 0.2)';
        }
      });
      
      // Style list items and markers
      const lists = tempContainer.querySelectorAll('ul');
      lists.forEach(list => {
        list.style.listStyleType = 'disc';
        list.style.paddingLeft = '1.2rem';
        list.style.margin = '0.8rem 0';
        
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
          item.style.marginBottom = '0.7rem';
          item.style.color = 'rgba(255, 255, 255, 0.75)';
          
          // Can't style ::marker directly in inline styles, so add a span before each item
          const markerSpan = document.createElement('span');
          markerSpan.textContent = '• ';
          markerSpan.style.color = '#00f0ff';
          markerSpan.style.textShadow = '0 0 5px #00f0ff';
          
          item.insertBefore(markerSpan, item.firstChild);
        });
      });
      
      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.235,
          letterRendering: true,
          backgroundColor: '#111', // Ensure dark background
          logging: false, // Disable logging
          allowTaint: true, // Allow custom styling
          useCORS: true, // Use CORS to handle cross-origin content
        }
      });
    }
    else if(style === 'professional') {
      tempContainer.style.width = '850px';

      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        margin: [10, 10, 10, 10],
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.222,
          letterRendering: true,
        }
      });
    }
    else if(style === 'technical') {
      tempContainer.style.width = '950px';
      tempContainer.style.backgroundColor = '#1e1e1e';
      
      // Add padding to the top to move content down
      tempContainer.style.paddingTop = '25px';
      
      // Add more space to header specifically
      const headerElement = tempContainer.querySelector('header');
      if (headerElement) {
        headerElement.style.marginTop = '15px';
        headerElement.style.paddingTop = '15px';
      }
      
      // Add more space to first section
      const firstSection = tempContainer.querySelector('section');
      if (firstSection) {
        firstSection.style.marginTop = '10px';
      }

      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.234,
          letterRendering: true,
        }
      });
    }
    else if(style === 'elegant') {
      tempContainer.style.width = '850px';

      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        margin: [10, 10, 10, 10],
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.223,
          letterRendering: true,
        }
      });
    }
    else if(style === 'onepage') {
      tempContainer.style.width = '800px';
      
      tempContainer.style.padding = '10px';
      
      const headings = tempContainer.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => {
        heading.style.margin = '0.1rem 0';
        heading.style.lineHeight = '1.2';
      });
      
      const lists = tempContainer.querySelectorAll('ul');
      lists.forEach(list => {
        list.style.margin = '0.1rem 0';
        list.style.paddingLeft = '1rem';
      });
      
      const listItems = tempContainer.querySelectorAll('li');
      listItems.forEach(item => {
        item.style.margin = '0';
        item.style.fontSize = '8px';
        item.style.lineHeight = '1.1';
        
        if (item.textContent.length > 100) {
          item.textContent = item.textContent.substring(0, 97) + '...';
        }
      });
      
      const paragraphs = tempContainer.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.margin = '0.05rem 0';
        p.style.fontSize = '8px';
        p.style.lineHeight = '1.1';
      });
      
      const experienceItems = tempContainer.querySelectorAll('.experience-item');
      experienceItems.forEach(item => {
        const bullets = item.querySelectorAll('li');
        if (bullets.length > 3) {
          // Keep only the first 3 bullet points for each experience to save space
          for (let i = 3; i < bullets.length; i++) {
            bullets[i].style.display = 'none';
          }
        }
      });
      
      const skillsGroups = tempContainer.querySelectorAll('.skills-group');
      skillsGroups.forEach(group => {
        const skillsText = group.querySelector('p');
        if (skillsText && skillsText.textContent.length > 120) {
          // Truncate very long skill lists
          skillsText.textContent = skillsText.textContent.substring(0, 117) + '...';
        }
      });
      
      doc.html(tempContainer, {
        callback: function (doc) {
          document.body.removeChild(tempContainer);
  
          if(uiLanguage === 'en') {
            doc.save(`Resume-Ricky-Iwasaki-${language}.pdf`);
          } else {
            doc.save(`履歴書-岩崎力樹.pdf`);
          }
        },
        margin: [5, 5, 5, 5], 
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: false, 
        html2canvas: {
          scale: 0.263,
          letterRendering: true,
        }
      });
    }
  };
  
  const showSummary = !searchResults || searchResults.summary.length > 0;
  const showEducation = !searchResults || searchResults.education.length > 0;
  const showExperience = !searchResults || searchResults.experience.length > 0;
  const showSkills = !searchResults || Object.keys(searchResults.skills).length > 0;
  const showProjects = !searchResults || searchResults.projects.length > 0;

  return (
    <div className="resume-container">
      <h1>{uiLanguage === 'en' ? 'My Resume' : '履歴書'}</h1>
      
      
      <div className="resume-controls">
        <div className="resume-controls-panel">
          
          <div className="controls-panel">
            <div className="panel-header">
              <h3>{uiLanguage === 'en' ? 'Search' : '検索'}</h3>
            </div>
            <div className="panel-content">
              <div className="resume-search">
                <input
                  type="text"
                  placeholder={uiLanguage === 'en' ? "Search resume..." : "履歴書を検索..."}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="clear-search" onClick={clearSearch}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          
          
          <div className="controls-panel">
            <div className="panel-header">
              <h3>{uiLanguage === 'en' ? 'Language' : '言語'}</h3>
            </div>
            <div className="panel-content">
              <div className="resume-language-switcher">
                <div className="language-selection-container">
                  <div className="language-search-wrapper">
                    <input
                      type="text"
                      placeholder={uiLanguage === 'en' ? "Search languages..." : "言語を検索..."}
                      value={languageSearchQuery}
                      onChange={handleLanguageSearch}
                      className="language-search-input"
                    />
                    {languageSearchQuery && (
                      <button className="clear-language-search" onClick={clearLanguageSearch}>
                        ✕
                      </button>
                    )}
                  </div>
                  <select 
                    id="language-select"
                    value={language} 
                    onChange={handleLanguageChange}
                    className="language-select"
                  >
                    {filteredLanguages.map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="controls-panel">
            <div className="panel-header">
              <h3>{uiLanguage === 'en' ? 'Style' : 'スタイル'}</h3>
            </div>
            <div className="panel-content">
              <div className="resume-style-grid">
                <button 
                  className={style === 'minimal' ? 'active' : ''}
                  onClick={() => handleStyleChange('minimal')}
                >
                  {uiLanguage === 'en' ? 'Simple' : 'シンプル'}
                </button>
                <button 
                  className={style === 'modern' ? 'active' : ''}
                  onClick={() => handleStyleChange('modern')}
                >
                  {uiLanguage === 'en' ? 'Modern' : 'モダン'}
                </button>
                <button 
                  className={style === 'vibrant' ? 'active' : ''}
                  onClick={() => handleStyleChange('vibrant')}
                >
                  {uiLanguage === 'en' ? 'Vibrant' : 'バイブラント'}
                </button>
                <button 
                  className={style === 'professional' ? 'active' : ''}
                  onClick={() => handleStyleChange('professional')}
                >
                  {uiLanguage === 'en' ? 'Professional' : 'プロフェッショナル'}
                </button>
                <button 
                  className={style === 'technical' ? 'active' : ''}
                  onClick={() => handleStyleChange('technical')}
                >
                  {uiLanguage === 'en' ? 'Technical' : '技術的'}
                </button>
                <button 
                  className={style === 'elegant' ? 'active' : ''}
                  onClick={() => handleStyleChange('elegant')}
                >
                  {uiLanguage === 'en' ? 'Elegant' : 'エレガント'}
                </button>
                <button 
                  className={style === 'onepage' ? 'active' : ''}
                  onClick={() => handleStyleChange('onepage')}
                >
                  {uiLanguage === 'en' ? 'One-Page' : '1ページ'}
                </button>
              </div>
            </div>
          </div>
          
          
          <div className="controls-panel">
            <div className="panel-header">
              <h3>{uiLanguage === 'en' ? 'Download' : 'ダウンロード'}</h3>
            </div>
            <div className="panel-content">
              <div className="download-options">
                <button className="download-button" onClick={handleJsonDownload}>
                  {uiLanguage === 'en' ? 'JSON Format' : 'JSON形式'}
                </button>
                <button className="download-button" onClick={handlePdfDownload}>
                  {uiLanguage === 'en' ? 'PDF Format' : 'PDF形式'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      {searchQuery && (
        <div className="search-indicator">
          {searchResults ? (
            <p>
              {uiLanguage === 'en' 
                ? `Showing results for "${searchQuery}"` 
                : `"${searchQuery}"の検索結果`}
            </p>
          ) : (
            <p className="no-results">
              {uiLanguage === 'en' 
                ? `No results found for "${searchQuery}"` 
                : `"${searchQuery}"に一致する結果はありません`}
            </p>
          )}
        </div>
      )}
      
      <div className={`resume-view ${style ? styles[style] : ''}`} ref={contentRef}>
        <header ref={headerContentRef}>
          <h1>{resumeData.name}</h1>
          <h2>{resumeData.title}</h2>
          
          <div className="contact-info">
            <p>Email: {resumeData.contact.email}</p>
            <p>Phone: {resumeData.contact.phone}</p>
            <p>Location: {resumeData.contact.location}</p>
            <p>Website: {resumeData.contact.website}</p>
            <p>LinkedIn: {resumeData.contact.linkedin}</p>
            <p>GitHub: {resumeData.contact.github}</p>
          </div>
        </header>
        
        {showSummary && (
          <section className="summary" ref={summaryContentRef}>
            <h3>{uiLanguage === 'en' ? 'Summary' : '概要'}</h3>
            <p>{searchResults ? searchResults.summary[0] : resumeData.summary}</p>
          </section>
        )}
        
        {showEducation && (
          <section className="education" ref={educationContentRef}>
            <h3>{uiLanguage === 'en' ? 'Education' : '学歴'}</h3>
            {(searchResults ? searchResults.education : resumeData.education).map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.degree}</h4>
                <p>{edu.school}, {edu.location}</p>
                <p>{edu.dates}</p>
              </div>
            ))}
          </section>
        )}
        
        {showExperience && (
          <section className="experience" ref={experienceContentRef}>
            <h3>{uiLanguage === 'en' ? 'Experience' : '職歴'}</h3>
            {(searchResults ? searchResults.experience : resumeData.experience).map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>{exp.title}</h4>
                <p>{exp.company}, {exp.location}</p>
                <p>{exp.dates}</p>
                <ul>
                  {exp.responsibilities.map((responsibility, i) => (
                    <li key={i}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        
        {showSkills && (
          <section className="skills" ref={skillsContentRef}>
            <h3>{uiLanguage === 'en' ? 'Skills' : 'スキル'}</h3>
            {Object.entries(searchResults ? searchResults.skills : resumeData.skills).map(([key, values], index) => (
              values.length > 0 && (
                <div key={index} className="skills-group">
                  <h4>
                    {uiLanguage === 'en' 
                      ? key.charAt(0).toUpperCase() + key.slice(1) 
                      : key === 'languages' ? 'プログラミング言語' 
                      : key === 'frameworks' ? 'フレームワーク'
                      : key === 'tools' ? 'ツール'
                      : key === 'databases' ? 'データベース' : key}
                  </h4>
                  <p>{values.join(', ')}</p>
                </div>
              )
            ))}
          </section>
        )}
        
        <section className="languages" ref={languagesContentRef}>
          <h3>{uiLanguage === 'en' ? 'Languages' : '言語'}</h3>
          {resumeData.languages.map((lang, index) => (
            <p key={index}>{lang.name}: {lang.proficiency}</p>
          ))}
        </section>
        
        {showProjects && (
          <section className="projects" ref={projectsContentRef}>
            <h3>{uiLanguage === 'en' ? 'Projects' : 'プロジェクト'}</h3>
            {(searchResults ? searchResults.projects : resumeData.projects).map((project, index) => (
              <div key={index} className="project-item">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p><strong>{uiLanguage === 'en' ? 'Technologies' : '使用技術'}:</strong> {project.technologies.join(', ')}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Resume; 