import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Aurora } from './components/glass/Aurora';
import { Island } from './components/glass/Island';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WritingSection } from './components/WritingSection';
import { SideWorkSection } from './components/SideWorkSection';
import { StackSection } from './components/StackSection';
import { AboutSection } from './components/AboutSection';
import { RecommendationSection } from './components/RecommendationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Aurora />
        <div className="relative min-h-screen text-foreground">
          <SmoothScroll />
          <CommandPalette />
          <Island />
          <Navbar />

          <main>
            <HeroSection />
            <WorkSection />
            <ExperienceSection />
            <WritingSection />
            <SideWorkSection />
            <StackSection />
            <AboutSection />
            <RecommendationSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
