import React from 'react';
import { 
  FileText, 
  Cpu, 
  Layers, 
  Milestone, 
  Search, 
  Sun, 
  Moon, 
  Download, 
  Share2, 
  Printer, 
  Check, 
  ShieldCheck,
  MessageSquare,
  Smartphone,
  Palette
} from 'lucide-react';
import { SYSTEM_META } from '../data/specificationData';

interface HeaderProps {
  activeTab: 'document' | 'simulator' | 'design-system' | 'technical';
  setActiveTab: (tab: 'document' | 'simulator' | 'design-system' | 'technical') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onExportMarkdown: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onExportMarkdown,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Meta Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  {SYSTEM_META.platformName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <ShieldCheck className="w-3 h-3" />
                  {SYSTEM_META.version}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {SYSTEM_META.documentTitle} • {SYSTEM_META.roleArchitect}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs font-semibold">
            <button
              id="tab-document-btn"
              onClick={() => setActiveTab('document')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'document'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>المستند التنفيذي (الأقسام التسعة)</span>
            </button>

            <button
              id="tab-simulator-btn"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'simulator'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>المحاكي التفاعلي المباشر</span>
            </button>

            <button
              id="tab-design-system-btn"
              onClick={() => setActiveTab('design-system')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'design-system'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>نظام التصميم والأنماط</span>
            </button>

            <button
              id="tab-technical-btn"
              onClick={() => setActiveTab('technical')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'technical'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>المواصفات التقنية والبنية</span>
            </button>
          </nav>

          {/* Quick Actions & Search */}
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block w-48 xl:w-56">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="بحث في المواصفات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={onExportMarkdown}
              title="تصدير الوثيقة بصيغة Markdown"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              title="طباعة / حفظ كـ PDF"
              className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              title="مشاركة الرابط"
              className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden py-2 border-t border-slate-100 dark:border-slate-800 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('document')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'document' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            المستند التنفيذي
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            المحاكي المباشر
          </button>
          <button
            onClick={() => setActiveTab('design-system')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'design-system' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            نظام التصميم
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'technical' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            المواصفات التقنية
          </button>
        </div>

      </div>
    </header>
  );
};
