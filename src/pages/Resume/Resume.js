import React, { useState, useEffect, useMemo, useRef } from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import './Resume.css';
import enResume from '../../assets/resumes/resume-en.json';
import jaResume from '../../assets/resumes/resume-ja.json';
import frResume from '../../assets/resumes/resume-fr.json';
import esResume from '../../assets/resumes/resume-es.json';
import zhResume from '../../assets/resumes/resume-zh.json';
import koResume from '../../assets/resumes/resume-ko.json';
import ruResume from '../../assets/resumes/resume-ru.json';
import deResume from '../../assets/resumes/resume-de.json';
import itResume from '../../assets/resumes/resume-it.json';
import ptResume from '../../assets/resumes/resume-pt.json';
import arResume from '../../assets/resumes/resume-ar.json';
import hiResume from '../../assets/resumes/resume-hi.json';
import trResume from '../../assets/resumes/resume-tr.json';
import viResume from '../../assets/resumes/resume-vi.json';
import thResume from '../../assets/resumes/resume-th.json';
import plResume from '../../assets/resumes/resume-pl.json';
import nlResume from '../../assets/resumes/resume-nl.json';
import svResume from '../../assets/resumes/resume-sv.json';
import elResume from '../../assets/resumes/resume-el.json';
import csResume from '../../assets/resumes/resume-cs.json';
import huResume from '../../assets/resumes/resume-hu.json';
import roResume from '../../assets/resumes/resume-ro.json';
import idResume from '../../assets/resumes/resume-id.json';
import bgResume from '../../assets/resumes/resume-bg.json';
import daResume from '../../assets/resumes/resume-da.json';
import ukResume from '../../assets/resumes/resume-uk.json';
import skResume from '../../assets/resumes/resume-sk.json';
import hrResume from '../../assets/resumes/resume-hr.json';
import ltResume from '../../assets/resumes/resume-lt.json';
import slResume from '../../assets/resumes/resume-sl.json';
import lvResume from '../../assets/resumes/resume-lv.json';
import etResume from '../../assets/resumes/resume-et.json';
import srResume from '../../assets/resumes/resume-sr.json';
import noResume from '../../assets/resumes/resume-no.json';
import heResume from '../../assets/resumes/resume-he.json';
import fiResume from '../../assets/resumes/resume-fi.json';
import sgResume from '../../assets/resumes/resume-sg.json';
import ffResume from '../../assets/resumes/resume-ff.json';
import woResume from '../../assets/resumes/resume-wo.json';
import siResume from '../../assets/resumes/resume-si.json';
import mgResume from '../../assets/resumes/resume-mg.json';
import stResume from '../../assets/resumes/resume-st.json';
import soResume from '../../assets/resumes/resume-so.json';
import haResume from '../../assets/resumes/resume-ha.json';
import smResume from '../../assets/resumes/resume-sm.json';
import krResume from '../../assets/resumes/resume-kr.json';
import uzResume from '../../assets/resumes/resume-uz.json';
import kuResume from '../../assets/resumes/resume-ku.json';
import brResume from '../../assets/resumes/resume-br.json';
import tiResume from '../../assets/resumes/resume-ti.json';
import chResume from '../../assets/resumes/resume-ch.json';
import cvResume from '../../assets/resumes/resume-cv.json';
import gvResume from '../../assets/resumes/resume-gv.json';
import isResume from '../../assets/resumes/resume-is.json';
import jvResume from '../../assets/resumes/resume-jv.json';
import foResume from '../../assets/resumes/resume-fo.json';
import kvResume from '../../assets/resumes/resume-kv.json';
import bsResume from '../../assets/resumes/resume-bs.json';
import loResume from '../../assets/resumes/resume-lo.json';
import quResume from '../../assets/resumes/resume-qu.json';
import coResume from '../../assets/resumes/resume-co.json';
import euResume from '../../assets/resumes/resume-eu.json';
import knResume from '../../assets/resumes/resume-kn.json';
import fjResume from '../../assets/resumes/resume-fj.json';
import ssResume from '../../assets/resumes/resume-ss.json';
import yiResume from '../../assets/resumes/resume-yi.json';
import kkResume from '../../assets/resumes/resume-kk.json';
import msResume from '../../assets/resumes/resume-ms.json';
import tsResume from '../../assets/resumes/resume-ts.json';
import iuResume from '../../assets/resumes/resume-iu.json';
import miResume from '../../assets/resumes/resume-mi.json';
import tyResume from '../../assets/resumes/resume-ty.json';
import psResume from '../../assets/resumes/resume-ps.json';
import orResume from '../../assets/resumes/resume-or.json';
import ugResume from '../../assets/resumes/resume-ug.json';
import kaResume from '../../assets/resumes/resume-ka.json';
import mlResume from '../../assets/resumes/resume-ml.json';
import nrResume from '../../assets/resumes/resume-nr.json';
import suResume from '../../assets/resumes/resume-su.json';
import toResume from '../../assets/resumes/resume-to.json';
import tnResume from '../../assets/resumes/resume-tn.json';
import nyResume from '../../assets/resumes/resume-ny.json';
import guResume from '../../assets/resumes/resume-gu.json';
import saResume from '../../assets/resumes/resume-sa.json';
import dzResume from '../../assets/resumes/resume-dz.json';
import eeResume from '../../assets/resumes/resume-ee.json';
import sdResume from '../../assets/resumes/resume-sd.json';
import igResume from '../../assets/resumes/resume-ig.json';
import gaResume from '../../assets/resumes/resume-ga.json';
import gnResume from '../../assets/resumes/resume-gn.json';
import ayResume from '../../assets/resumes/resume-ay.json';
import fyResume from '../../assets/resumes/resume-fy.json';
import gdResume from '../../assets/resumes/resume-gd.json';
import snResume from '../../assets/resumes/resume-sn.json';
import taResume from '../../assets/resumes/resume-ta.json';
import mkResume from '../../assets/resumes/resume-mk.json';
import glResume from '../../assets/resumes/resume-gl.json';
import beResume from '../../assets/resumes/resume-be.json';
import tlResume from '../../assets/resumes/resume-tl.json';
import htResume from '../../assets/resumes/resume-ht.json';
import osResume from '../../assets/resumes/resume-os.json';
import zuResume from '../../assets/resumes/resume-zu.json';
import mhResume from '../../assets/resumes/resume-mh.json';
import tgResume from '../../assets/resumes/resume-tg.json';
import cyResume from '../../assets/resumes/resume-cy.json';
import mrResume from '../../assets/resumes/resume-mr.json';
import veResume from '../../assets/resumes/resume-ve.json';
import boResume from '../../assets/resumes/resume-bo.json';
import twResume from '../../assets/resumes/resume-tw.json';

// Resume component styles
const styles = {
  minimal: 'resume-style-minimal',
  modern: 'resume-style-modern',
  creative: 'resume-style-creative',
  professional: 'resume-style-professional',
  technical: 'resume-style-technical',
  compact: 'resume-style-compact',
  elegant: 'resume-style-elegant'
};

// Map of language codes to resume data
const resumeDataMap = {
  'en': enResume,
  'ja': jaResume,
  'fr': frResume,
  'es': esResume,
  'zh': zhResume,
  'ko': koResume,
  'ru': ruResume,
  'de': deResume,
  'it': itResume,
  'pt': ptResume,
  'ar': arResume, 
  'hi': hiResume,
  'tr': trResume,
  'vi': viResume,
  'th': thResume,
  'pl': plResume,
  'nl': nlResume,
  'sv': svResume,
  'el': elResume,
  'cs': csResume,
  'hu': huResume,
  'ro': roResume,
  'id': idResume,
  'bg': bgResume,
  'da': daResume,
  'uk': ukResume,
  'sk': skResume,
  'hr': hrResume,
  'lt': ltResume,
  'sl': slResume,
  'lv': lvResume,
  'et': etResume,
  'sr': srResume,
  'no': noResume,
  'he': heResume,
  'fi': fiResume,
  'sg': sgResume,
  'ff': ffResume,
  'wo': woResume,
  'si': siResume,
  'mg': mgResume,
  'st': stResume,
  'so': soResume,
  'ha': haResume,
  'sm': smResume,
  'kr': krResume,
  'uz': uzResume,
  'ku': kuResume,
  'br': brResume,
  'ti': tiResume,
  'ch': chResume,
  'cv': cvResume,
  'gv': gvResume,
  'is': isResume,
  'jv': jvResume,
  'fo': foResume,
  'kv': kvResume,
  'bs': bsResume,
  'lo': loResume,
  'qu': quResume,
  'co': coResume,
  'eu': euResume,
  'kn': knResume,
  'fj': fjResume,
  'ss': ssResume,
  'yi': yiResume,
  'kk': kkResume,
  'ms': msResume,
  'ts': tsResume,
  'iu': iuResume,
  'mi': miResume,
  'ty': tyResume,
  'ps': psResume,
  'or': orResume,
  'ug': ugResume,
  'ka': kaResume,
  'ml': mlResume,
  'nr': nrResume,
  'su': suResume,
  'to': toResume,
  'tn': tnResume,
  'ny': nyResume,
  'gu': guResume,
  'sa': saResume,
  'dz': dzResume,
  'ee': eeResume,
  'sd': sdResume,
  'ig': igResume,
  'ga': gaResume,
  'gn': gnResume,
  'ay': ayResume,
  'fy': fyResume,
  'gd': gdResume,
  'sn': snResume,
  'ta': taResume,
  'mk': mkResume,
  'gl': glResume,
  'be': beResume,
  'tl': tlResume,
  'ht': htResume,
  'os': osResume,
  'zu': zuResume,
  'mh': mhResume,
  'tg': tgResume,
  'cy': cyResume,
  'mr': mrResume,
  've': veResume,
  'bo': boResume,
  'tw': twResume
};

// Map of language codes to language names
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
  // State for resume language and style
  const [language, setLanguage] = useState('en');
  const [uiLanguage, setUiLanguage] = useState('en'); // UI language (for website interface text)
  const [style, setStyle] = useState('modern');
  const [resumeData, setResumeData] = useState(resumeDataMap['en']);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  const contentRef = useRef(); // Add the contentRef for the entire resume view
  const headerContentRef = useRef();
  const summaryContentRef = useRef();
  const educationContentRef = useRef();
  const experienceContentRef = useRef();
  const skillsContentRef = useRef();
  const languagesContentRef = useRef();
  const projectsContentRef = useRef();

  // Filtered language options based on search
  const filteredLanguages = useMemo(() => {
    if (!languageSearchQuery.trim()) return Object.entries(languageNames);
    
    return Object.entries(languageNames).filter(([code, name]) => 
      name.toLowerCase().includes(languageSearchQuery.toLowerCase()) ||
      code.toLowerCase().includes(languageSearchQuery.toLowerCase())
    );
  }, [languageSearchQuery]);

  // Update resume data when language changes
  useEffect(() => {
    setResumeData(resumeDataMap[language] || resumeDataMap['en']);
    setSearchQuery(''); // Reset search when language changes
    setSearchResults(null);
    
    // Set UI language based on selected resume language
    setUiLanguage(language === 'ja' ? 'ja' : 'en');
  }, [language]);

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  
  // Function to handle language search input change
  const handleLanguageSearch = (e) => {
    setLanguageSearchQuery(e.target.value);
  };

  // Function to handle style change
  const handleStyleChange = (newStyle) => {
    setStyle(newStyle);
  };

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    // Search through the resume data for matches
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
    
    // Only set results if we have any matches
    const hasResults = results.summary.length > 0 || 
                       results.education.length > 0 || 
                       results.experience.length > 0 || 
                       Object.keys(results.skills).length > 0 ||
                       results.projects.length > 0;
                       
    setSearchResults(hasResults ? results : null);
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };
  
  // Function to clear language search
  const clearLanguageSearch = () => {
    setLanguageSearchQuery('');
  };

  // Function to handle resume JSON download
  const handleJsonDownload = () => {
    // Create a hidden link element
    const element = document.createElement('a');
    
    // Create a Blob with the resume data
    const resumeBlob = new Blob(
      [JSON.stringify(resumeData, null, 2)], 
      { type: 'application/json' }
    );
    
    // Create download URL
    const url = URL.createObjectURL(resumeBlob);
    
    // Set up download attributes
    element.href = url;
    if(uiLanguage === 'en') {
      element.download = `Resume-Ricky-Iwasaki-${language}.json`;
    } else {
      element.download = `履歴書-岩崎力樹.json`;
    }
    
    // Simulate click to trigger download
    document.body.appendChild(element);
    element.click();
    
    // Clean up
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handlePdfDownload = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Create a temporary container to combine all sections
    const tempContainer = document.createElement('div');
    tempContainer.className = `resume-view ${styles[style]}`;
    
    // Clone and append each section if it exists and should be shown
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
          scale: 0.24,
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
          scale: 0.198,
          letterRendering: true,
        }
      });
    } else if(style === 'creative') {
      tempContainer.style.width = '850px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.color = '#333333';
      tempContainer.style.borderRadius = '0';
      
      // Apply colors that match the HTML view
      const headings = tempContainer.querySelectorAll('.summary h3, .education h3, .experience h3, .skills h3, .projects h3, .languages h3');
      
      // Apply the different colors to different section headers
      headings.forEach((heading, index) => {
        const colors = ['#3F51B5', '#FF5E7D', '#FFB74D', '#66BB6A', '#26C6DA', '#9C27B0'];
        const color = colors[index % colors.length];
        heading.style.backgroundColor = color;
        heading.style.color = '#ffffff';
        heading.style.boxShadow = 'none';
        heading.style.borderRadius = '50px';
        heading.style.padding = '0.6rem 1.5rem';
        heading.style.display = 'inline-block';
        heading.style.fontWeight = '600';
        heading.style.textTransform = 'uppercase';
        heading.style.letterSpacing = '1px';
        heading.style.border = 'none';
        heading.style.textShadow = 'none';
        heading.style.webkitFontSmoothing = 'antialiased';
        heading.style.outline = 'none';
      });
      
      // Style the sections to match HTML view
      const sections = tempContainer.querySelectorAll('section');
      sections.forEach((section, index) => {
        section.style.padding = '2rem';
        section.style.marginBottom = '0';
        section.style.borderBottom = '1px solid #f0f0f0';
        section.style.backgroundColor = index % 2 === 0 ? '#fcfcfc' : '#ffffff';
      });
      
      // Style the experience items
      const experienceItems = tempContainer.querySelectorAll('.experience-item');
      experienceItems.forEach(item => {
        item.style.borderRadius = '12px';
        item.style.background = '#fff';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        item.style.padding = '1.5rem';
        item.style.marginBottom = '2rem';
        item.style.position = 'relative';
        item.style.borderTop = '3px solid #f0f0f0';
        // Create left border with color
        const leftBorder = document.createElement('div');
        leftBorder.style.position = 'absolute';
        leftBorder.style.left = '0';
        leftBorder.style.top = '0';
        leftBorder.style.height = '100%';
        leftBorder.style.width = '7px';
        leftBorder.style.backgroundColor = '#3F51B5';
        leftBorder.style.borderRadius = '7px 0 0 7px';
        item.insertBefore(leftBorder, item.firstChild);
      });
      
      // Style the education items
      const educationItems = tempContainer.querySelectorAll('.education-item');
      educationItems.forEach(item => {
        item.style.borderRadius = '12px';
        item.style.background = '#fff';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        item.style.padding = '1.5rem';
        item.style.marginBottom = '2rem';
        item.style.position = 'relative';
        item.style.borderTop = '3px solid #f0f0f0';
        // Create left border with color
        const leftBorder = document.createElement('div');
        leftBorder.style.position = 'absolute';
        leftBorder.style.left = '0';
        leftBorder.style.top = '0';
        leftBorder.style.height = '100%';
        leftBorder.style.width = '7px';
        leftBorder.style.backgroundColor = '#FF5E7D';
        leftBorder.style.borderRadius = '7px 0 0 7px';
        item.insertBefore(leftBorder, item.firstChild);
      });
      
      // Style the project items
      const projectItems = tempContainer.querySelectorAll('.project-item');
      projectItems.forEach(item => {
        item.style.borderRadius = '12px';
        item.style.background = '#fff';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        item.style.padding = '1.5rem';
        item.style.marginBottom = '2rem';
        item.style.position = 'relative';
        item.style.borderTop = '3px solid #f0f0f0';
        // Create left border with color
        const leftBorder = document.createElement('div');
        leftBorder.style.position = 'absolute';
        leftBorder.style.left = '0';
        leftBorder.style.top = '0';
        leftBorder.style.height = '100%';
        leftBorder.style.width = '7px';
        leftBorder.style.backgroundColor = '#FFB74D';
        leftBorder.style.borderRadius = '7px 0 0 7px';
        item.insertBefore(leftBorder, item.firstChild);
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
        margin: [10, 0, 10, 0], 
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.23,
          letterRendering: true,
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
        margin: [10, 10, 10, 10],
        width: doc.internal.pageSize.getWidth(),
        windowWidth: tempContainer.offsetWidth,
        autoPaging: 'text',
        html2canvas: {
          scale: 0.185,
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
          scale: 0.194,
          letterRendering: true,
        }
      });
    }
  };

  // Section visibility flags based on search results
  const showSummary = !searchResults || searchResults.summary.length > 0;
  const showEducation = !searchResults || searchResults.education.length > 0;
  const showExperience = !searchResults || searchResults.experience.length > 0;
  const showSkills = !searchResults || Object.keys(searchResults.skills).length > 0;
  const showProjects = !searchResults || searchResults.projects.length > 0;

  return (
    <div className="resume-container">
      <h1>{uiLanguage === 'en' ? 'My Resume' : '履歴書'}</h1>
      
      {/* Controls area */}
      <div className="resume-controls">
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
        
        <div className="resume-options-row">
          <div className="resume-language-switcher">
            <label htmlFor="language-select">{uiLanguage === 'en' ? 'Language:' : '言語:'} </label>
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
          
          <div className="resume-style-switcher">
            <span>{uiLanguage === 'en' ? 'Style:' : 'スタイル:'} </span>
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
              className={style === 'creative' ? 'active' : ''}
              onClick={() => handleStyleChange('creative')}
            >
              {uiLanguage === 'en' ? 'Creative' : 'クリエイティブ'}
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
              className={style === 'compact' ? 'active' : ''}
              onClick={() => handleStyleChange('compact')}
            >
              {uiLanguage === 'en' ? 'Compact' : 'コンパクト'}
            </button>
            <button 
              className={style === 'elegant' ? 'active' : ''}
              onClick={() => handleStyleChange('elegant')}
            >
              {uiLanguage === 'en' ? 'Elegant' : 'エレガント'}
            </button>
          </div>
        </div>
        
        <div className="download-options">
          <button className="download-button" onClick={handleJsonDownload}>
            {uiLanguage === 'en' ? 'Download JSON' : 'JSONをダウンロード'}
          </button>
          <button className="download-button" onClick={handlePdfDownload}>
            {uiLanguage === 'en' ? 'Download PDF' : 'PDFをダウンロード'}
          </button>
        </div>
      </div>
      
      {/* Search results indicator */}
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
      
      <div className={`resume-view ${styles[style]}`} ref={contentRef}>
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