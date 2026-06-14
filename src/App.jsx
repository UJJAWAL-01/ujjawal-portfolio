import "./App.css";
import { ThemeProvider } from './context/ThemeContext';
import { MotionProvider } from './context/MotionContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { StatusBar } from './components/StatusBar';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <div className="App min-h-screen bg-background text-foreground relative overflow-x-hidden scanlines pb-7">
          {/* Scroll + interaction layer */}
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <StatusBar />
          <CommandPalette />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ResearchSection />
            <ExperienceSection />
            <CertificationsSection />
            <RecommendationsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </MotionProvider>
    </ThemeProvider>
  );
}

export default App;