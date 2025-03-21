import React, { useState, useEffect } from 'react';
import './Beliefs.css';
import BackgroundShapes from '../../components/BackgroundShapes';
import Particles from '../../components/Particles';
import beliefsData from '../../assets/beliefs.json';

// Simulate an API fetch with a delay
const fetchBeliefsData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(beliefsData);
        }, 800); // Simulate network delay
    });
};

const Beliefs = () => {
    const [activeCategory, setActiveCategory] = useState('ideas');
    const [expandedCards, setExpandedCards] = useState(new Set());
    const [isCategoryChanging, setIsCategoryChanging] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchBeliefsData();
                setData(response);
                setError(null);
            } catch (error) {
                console.error("Error loading beliefs data:", error);
                setError("Failed to load beliefs data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, []);

    // Handle parallax effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleCategoryChange = (category) => {
        if (category === activeCategory) return;
        
        setIsCategoryChanging(true);
        setTimeout(() => {
            setActiveCategory(category);
            setExpandedCards(new Set()); // Reset expanded cards when changing categories
            setIsCategoryChanging(false);
        }, 300);
    };

    const toggleCard = (cardId) => {
        setExpandedCards(prevExpandedCards => {
            const newExpandedCards = new Set(prevExpandedCards);
            if (newExpandedCards.has(cardId)) {
                newExpandedCards.delete(cardId);
            } else {
                newExpandedCards.add(cardId);
            }
            return newExpandedCards;
        });
        
        // Scroll to the card if it's being expanded
        if (!expandedCards.has(cardId)) {
            setTimeout(() => {
                const element = document.getElementById(cardId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    const renderContent = (contentArray = []) => {
        if (!contentArray || contentArray.length === 0) {
            return <div className="no-content">No content available for this category.</div>;
        }
        
        return contentArray.map((item, index) => (
            <section 
                className="belief-section" 
                key={item.id}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
                <h2>{item.title}</h2>
                <div 
                    className={`belief-card ${expandedCards.has(item.id) ? 'expanded' : ''}`}
                    onClick={() => toggleCard(item.id)}
                    id={item.id}
                >
                    <div className="card-header">
                        <p className="card-summary">{item.summary}</p>
                        <div className="belief-icon">{item.icon}</div>
                        <div className="expand-icon">{expandedCards.has(item.id) ? '−' : '+'}</div>
                    </div>
                    
                    {expandedCards.has(item.id) && (
                        <div className="card-content fade-in">
                            <p>{item.fullContent}</p>
                        </div>
                    )}
                </div>
            </section>
        ));
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="beliefs-container loading">
                <Particles />
                <BackgroundShapes />
                <h1 className="beliefs-title">Loading Beliefs...</h1>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    // Show error if data not available
    if (error || !data) {
        return (
            <div className="beliefs-container error">
                <Particles />
                <BackgroundShapes />
                <h1 className="beliefs-title">Something went wrong</h1>
                <p className="error-message">{error || "Could not load beliefs data. Please try again later."}</p>
                <button 
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="beliefs-container" style={{ '--scroll-position': scrollPosition / 100 }}>
            <Particles />
            <BackgroundShapes />
            <div className="parallax-layer layer-1" style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}></div>
            <div className="parallax-layer layer-2" style={{ transform: `translateY(${scrollPosition * 0.05}px)` }}></div>
            
            <h1 className="beliefs-title">My Belief Framework</h1>
            
            <p className="beliefs-disclaimer">
                These are my current thoughts. I am still young so my perspectives 
                will change as I learn more about the world. Everyone should be good people, it's just we disagree on how to do it. We are simply too narrow minded.
            </p>
            
            <div className="beliefs-tabs">
                <button 
                    className={`tab-button ${activeCategory === 'ideas' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('ideas')}
                >
                    Ideas
                </button>
                <button 
                    className={`tab-button ${activeCategory === 'theories' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('theories')}
                >
                    Theories
                </button>
                <button 
                    className={`tab-button ${activeCategory === 'examples' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('examples')}
                >
                    Examples
                </button>
            </div>
            
            <div className={`beliefs-content ${isCategoryChanging ? 'category-changing' : ''}`}>
                {activeCategory === 'ideas' && (
                    <div className="category-content fade-in" data-category="ideas">
                        {renderContent(data.ideas)}
                    </div>
                )}
                
                {activeCategory === 'theories' && (
                    <div className="category-content fade-in" data-category="theories">
                        {renderContent(data.theories)}
                    </div>
                )}
                
                {activeCategory === 'examples' && (
                    <div className="category-content fade-in" data-category="examples">
                        {renderContent(data.examples)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Beliefs;