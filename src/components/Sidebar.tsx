import React from 'react';
import { 
  Compass, 
  Layers, 
  Cpu, 
  Database, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  Milestone, 
  Activity, 
  ChevronDown, 
  ChevronLeft,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  activeSubSectionId?: string;
  onSelectSubSection?: (subId: string) => void;
  searchQuery: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Layers,
  Cpu,
  Database,
  Layout,
  TrendingUp,
  ShieldCheck,
  Milestone,
  Activity
};

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  activeSubSectionId,
  onSelectSubSection,
  searchQuery
}) => {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    "section-1": true,
    "section-2": true,
    "section-3": true
  });

  const toggleExpand = (secId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
          <span>فهرس الأقسام والمواصفات</span>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {sections.length} أقسام رئيسية
        </span>
      </div>

      <nav className="space-y-1.5 text-sm">
        {sections.map(section => {
          const IconComp = ICON_MAP[section.icon] || Compass;
          const isActive = activeSectionId === section.id;
          const isExpanded = expandedSections[section.id] ?? false;

          // Check if section matches search
          const matchesSearch = searchQuery === '' || 
            section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.subsections.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.content.toLowerCase().includes(searchQuery.toLowerCase()));

          if (!matchesSearch) return null;

          return (
            <div key={section.id} className="rounded-xl transition-all">
              <div
                onClick={() => onSelectSection(section.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-right transition-all group ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-mono ml-1.5 opacity-70">{section.number}</span>
                    <span className="text-xs sm:text-sm">{section.title}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleExpand(section.id, e)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronLeft className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Subsections List */}
              {isExpanded && (
                <div className="pr-7 pl-1 py-1 space-y-0.5 border-r-2 border-slate-200 dark:border-slate-800 mr-4 mt-0.5">
                  {section.subsections.map(sub => {
                    const isSubActive = activeSubSectionId === sub.id;
                    const subMatches = searchQuery === '' || 
                      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      sub.content.toLowerCase().includes(searchQuery.toLowerCase());

                    if (!subMatches) return null;

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          onSelectSection(section.id);
                          if (onSelectSubSection) onSelectSubSection(sub.id);
                        }}
                        className={`w-full text-right py-1.5 px-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          isSubActive
                            ? 'bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <span className="truncate">
                          <span className="font-mono ml-1 opacity-60">{sub.number}</span>
                          {sub.title.split('(')[0]}
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-slate-300 dark:text-slate-700 shrink-0 mr-1" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Info in Sidebar */}
      <div className="mt-8 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
        <div className="font-bold text-slate-700 dark:text-slate-300">معايير التصميم المعتمدة:</div>
        <div>• معمارية موجهة بالأحداث (Event-Driven)</div>
        <div>• استرجاع هجين Hybrid Sparse+Dense RAG</div>
        <div>• سيادة لغوية عربية تامة مع تكافؤ إنجليزي</div>
        <div>• توافق كامل مع معايير PDPL وGDPR</div>
      </div>
    </aside>
  );
};
