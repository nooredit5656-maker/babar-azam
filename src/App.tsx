/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CareerSection } from './components/CareerSection';
import { FanZoneSection } from './components/FanZoneSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { RecordsSection } from './components/RecordsSection';

const OBSERVED_SECTIONS = ['hero', 'about', 'career', 'records', 'gallery', 'fan-zone'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const tributeNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const elements = OBSERVED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinFanWall = () => {
    scrollToSection('fan-zone');
    window.setTimeout(() => {
      tributeNameRef.current?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#040706] text-[#F2F5F3] flex flex-col">
        <Navbar activeSection={activeSection} onJoinFanWall={handleJoinFanWall} />

        <main className="flex-1">
          <HeroSection
            onExploreCareer={() => scrollToSection('career')}
            onViewRecords={() => scrollToSection('records')}
          />
          <AboutSection />
          <CareerSection />
          <RecordsSection />
          <GallerySection />
          <FanZoneSection tributeNameRef={tributeNameRef} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
