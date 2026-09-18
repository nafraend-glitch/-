import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Compass, 
  Layers, 
  Cpu, 
  Database, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  Milestone, 
  Activity, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { Section } from '../types';

interface SectionRendererProps {
  section: Section;
  onPrevSection?: () => void;
  onNextSection?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
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

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  onPrevSection,
  onNextSection,
  hasPrev,
  hasNext
}) => {
  const [copied, setCopied] = useState(false);
  const IconComp = ICON_MAP[section.icon] || Compass;

  const handleCopyFullSection = () => {
    let fullText = `${section.number} ${section.title} (${section.englishTitle})\n\n${section.summary}\n\n`;
    section.subsections.forEach(sub => {
      fullText += `### ${sub.number} ${sub.title}\n${sub.content}\n\n`;
      if (sub.keyPoints) {
        fullText += `النقاط الجوهرية:\n` + sub.keyPoints.map(p => `• ${p}`).join('\n') + '\n\n';
      }
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Section Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <IconComp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
                  {section.number}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {section.title}
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-0.5">
                {section.englishTitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyFullSection}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ القسم' : 'نسخ نصوص القسم'}</span>
          </button>

        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 ml-1.5">الملخص التنفيذي:</span>
            {section.summary}
          </p>
        </div>
      </div>

      {/* Subsections Detailed Content */}
      <div className="space-y-6">
        {section.subsections.map((sub) => (
          <div
            key={sub.id}
            id={sub.id}
            className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-xs font-bold font-mono">
                  {sub.number}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {sub.title}
                </h2>
              </div>
            </div>

            {/* Sub-summary if exists */}
            {sub.summary && (
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {sub.summary}
              </p>
            )}

            {/* Main Content Body */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {sub.content}
            </div>

            {/* Key Takeaways */}
            {sub.keyPoints && sub.keyPoints.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
                <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>الاشتراطات الهندسية والنتائج المستهدفة:</span>
                </div>
                <ul className="space-y-1 text-xs text-indigo-800 dark:text-indigo-300">
                  {sub.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Bottom Prev / Next Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        {hasPrev ? (
          <button
            onClick={onPrevSection}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>القسم السابق</span>
          </button>
        ) : (
          <div></div>
        )}

        {hasNext ? (
          <button
            onClick={onNextSection}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>القسم التالي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  );
};
