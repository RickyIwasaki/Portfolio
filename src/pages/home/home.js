import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { FaArrowDown, FaFileAlt, FaBrain, FaEnvelope } from 'react-icons/fa';

const Home = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const observerRef = useRef(null);
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Handle scroll to show/hide navigation
        const handleScroll = () => {
            if (containerRef.current) {
                if (window.scrollY > 100) {
                    setIsScrolled(true);
                    containerRef.current.classList.add('scrolled');
                } else {
                    setIsScrolled(false);
                    containerRef.current.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Initialize Intersection Observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Find the index of the section that is currently in view
                        const index = sectionRefs.findIndex(ref => ref.current === entry.target);
                        if (index !== -1) {
                            setActiveSection(index);
                            
                            // Add active class to the current section and remove from others
                            sectionRefs.forEach((ref, i) => {
                                if (i === index) {
                                    ref.current.classList.add('active');
                                } else {
                                    ref.current.classList.remove('active');
                                }
                            });
                        }
                    }
                });
            },
            { 
                threshold: 0.3, // Lower threshold to 30% visibility
                rootMargin: '-70px 0px 0px 0px' // Updated offset for the navigation bar
            }
        );

        // Observe all sections
        sectionRefs.forEach(ref => {
            if (ref.current) {
                observerRef.current.observe(ref.current);
            }
        });

        // Set first section as active initially
        if (sectionRefs[0].current) {
            sectionRefs[0].current.classList.add('active');
        }

        // Clean up observer on unmount
        return () => {
            if (observerRef.current) {
                sectionRefs.forEach(ref => {
                    if (ref.current) {
                        observerRef.current.unobserve(ref.current);
                    }
                });
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Fix for potential white space at bottom
        const fixContainerHeight = () => {
            if (containerRef.current) {
                // Ensure the last section exactly fills the remaining space
                const lastSection = sectionRefs[3].current;
                if (lastSection) {
                    // Force recalculation of heights
                    const navHeight = 70;
                    const windowHeight = window.innerHeight;
                    // Calculate exact heights for sections
                    const sectionHeight = windowHeight - navHeight;
                    
                    // Apply consistent heights to all sections
                    sectionRefs.forEach(ref => {
                        if (ref.current) {
                            ref.current.style.height = `${sectionHeight}px`;
                            ref.current.style.minHeight = `${sectionHeight}px`;
                        }
                    });
                }
            }
        };
        
        // Call initially and on resize
        fixContainerHeight();
        window.addEventListener('resize', fixContainerHeight);
        
        return () => {
            window.removeEventListener('resize', fixContainerHeight);
        };
    }, []);

    const scrollToNextSection = (index) => {
        if (index < sectionRefs.length - 1 && sectionRefs[index + 1].current) {
            // Use scrollIntoView with the containing element as the scrolling container
            const navHeight = 70; // Updated height of the navigation bar
            const nextSectionTop = sectionRefs[index + 1].current.offsetTop - navHeight;
            
            // Ensure we don't scroll beyond the container
            const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
            const safeScrollTop = Math.min(nextSectionTop, maxScroll);
            
            containerRef.current.scrollTo({
                top: safeScrollTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div ref={containerRef} className="home-container">
                {/* Hero Section */}
                <section ref={sectionRefs[0]} className="section hero-section">
                    <div className="content">
                        <h1 className="hero-title">Ricky Iwasaki</h1>
                        <p className="hero-subtitle">Welcome to my portfolio</p>
                        <div className="scroll-down" onClick={() => scrollToNextSection(0)}>
                            <span>Scroll Down</span>
                            <FaArrowDown className="scroll-icon" />
                        </div>
                    </div>
                </section>

                {/* Beliefs Section */}
                <section ref={sectionRefs[1]} className="section beliefs-section">
                    <div className="content">
                        <div className="section-icon">
                            <FaBrain />
                        </div>
                        <h2>My Beliefs</h2>
                        <p>Explore my perspectives on free speech, morality, conflict, and human progress. I believe in looking beyond surface-level morality to understand the complex mechanisms that drive advancement.</p>
                        <div className="section-details">
                            <p>"What seems morally good on the surface level of your community may not account for the complex mechanisms of human progress."</p>
                            <Link to="/beliefs" className="section-button">Explore My Beliefs</Link>
                        </div>
                        <div className="scroll-down" onClick={() => scrollToNextSection(1)}>
                            <FaArrowDown className="scroll-icon" />
                        </div>
                    </div>
                </section>

                {/* Resume Section */}
                <section ref={sectionRefs[2]} className="section resume-section">
                    <div className="content">
                        <div className="section-icon">
                            <FaFileAlt />
                        </div>
                        <h2>My Resume</h2>
                        <p>A comprehensive view of my professional journey, skills, and accomplishments. My resume is available in multiple languages and styles to suit your preferences.</p>
                        <div className="section-details">
                            <ul className="resume-features">
                                <li>Available in 100+ languages</li>
                                <li>Multiple visual styles</li>
                                <li>Downloadable as PDF or JSON</li>
                                <li>Search functionality</li>
                            </ul>
                            <Link to="/resume" className="section-button">View My Resume</Link>
                        </div>
                        <div className="scroll-down" onClick={() => scrollToNextSection(2)}>
                            <FaArrowDown className="scroll-icon" />
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section ref={sectionRefs[3]} className="section contact-section">
                    <div className="content">
                        <div className="section-icon">
                            <FaEnvelope />
                        </div>
                        <h2>Contact Me</h2>
                        <p>Reach out through various channels for opportunities, collaborations, or just a friendly chat. I'm always open to connecting with new people.</p>
                        <div className="section-details">
                            <p>Find me on LinkedIn, GitHub, or send me an email directly. All my contact information is just one click away.</p>
                            <Link to="/contacts" className="section-button">Get In Touch</Link>
                        </div>
                    </div>
                </section>
            </div>
            
            {/* Navigation dots - moved outside container */}
            <div className="section-dots">
                {[0, 1, 2, 3].map((index) => (
                    <div 
                        key={index} 
                        className={`dot ${activeSection === index ? 'active' : ''}`}
                        data-tooltip={index === 0 ? 'Home' : index === 1 ? 'Beliefs' : index === 2 ? 'Resume' : 'Contact'}
                        onClick={() => {
                            if (sectionRefs[index].current) {
                                const navHeight = 70; // Updated height of the navigation bar
                                containerRef.current.scrollTo({
                                    top: sectionRefs[index].current.offsetTop - navHeight,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
