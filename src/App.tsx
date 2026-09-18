import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SectionRenderer } from './components/SectionRenderer';
import { MobileSimulator } from './components/MobileSimulator';
import { DesignSystemViewer } from './components/DesignSystemViewer';
import { TechnicalArchitectureView } from './components/TechnicalArchitectureView';
import { SECTIONS_DATA, SYSTEM_META } from './data/specificationData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'document' | 'simulator' | 'design-system' | 'technical'>('document');
  const [activeSectionId, setActiveSectionId] = useState<string>('section-1');
  const [activeSubSectionId, setActiveSubSectionId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize Dark Mode based on system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Current active section
  const currentSection = SECTIONS_DATA.find(s => s.id === activeSectionId) || SECTIONS_DATA[0];
  const currentIndex = SECTIONS_DATA.findIndex(s => s.id === activeSectionId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < SECTIONS_DATA.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setActiveSectionId(SECTIONS_DATA[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveSectionId(SECTIONS_DATA[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Export full document as Markdown
  const handleExportMarkdown = () => {
    let md = `# ${SYSTEM_META.documentTitle}\n`;
    md += `**المنصة:** ${SYSTEM_META.platformName} | **الإصدار:** ${SYSTEM_META.version}\n`;
    md += `**الدور التقني:** ${SYSTEM_META.roleArchitect}\n`;
    md += `**التاريخ:** ${SYSTEM_META.date}\n\n`;
    md += `---\n\n`;

    SECTIONS_DATA.forEach(sec => {
      md += `## ${sec.number} ${sec.title} (${sec.englishTitle})\n\n`;
      md += `*الملخص:* ${sec.summary}\n\n`;
      sec.subsections.forEach(sub => {
        md += `### ${sub.number} ${sub.title}\n\n`;
        md += `${sub.content}\n\n`;
        if (sub.keyPoints && sub.keyPoints.length > 0) {
          md += `**الاشتراطات الهندسية:**\n`;
          sub.keyPoints.forEach(kp => {
            md += `- ${kp}\n`;
          });
          md += `\n`;
        }
      });
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `InApp_Chat_Mobile_UXUI_Technical_Specification_${SYSTEM_META.date}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onExportMarkdown={handleExportMarkdown}
      />

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'document' ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Table of Contents */}
            <Sidebar
              sections={SECTIONS_DATA}
              activeSectionId={activeSectionId}
              onSelectSection={(id) => {
                setActiveSectionId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              activeSubSectionId={activeSubSectionId}
              onSelectSubSection={(subId) => {
                setActiveSubSectionId(subId);
                const el = document.getElementById(subId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              searchQuery={searchQuery}
            />

            {/* Main Content Viewer */}
            <main className="flex-1 w-full min-w-0 pb-16">
              <SectionRenderer
                section={currentSection}
                onPrevSection={handlePrev}
                onNextSection={handleNext}
                hasPrev={hasPrev}
                hasNext={hasNext}
              />
            </main>

          </div>
        ) : activeTab === 'simulator' ? (
          <main className="w-full pb-16">
            <MobileSimulator />
          </main>
        ) : activeTab === 'design-system' ? (
          <main className="w-full pb-16">
            <DesignSystemViewer />
          </main>
        ) : (
          <main className="w-full pb-16">
            <TechnicalArchitectureView />
          </main>
        )}

      </div>

      {/* Persistent Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{SYSTEM_META.platformName} • {SYSTEM_META.documentTitle} ({SYSTEM_META.version})</span>
          <span>هندسة تجربة وواجهة المستخدم للأنظمة المحمولة • {SYSTEM_META.date}</span>
        </div>
      </footer>

    </div>
  );
}
