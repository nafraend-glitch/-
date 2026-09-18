import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  Sliders, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles,
  Smartphone,
  Eye,
  Activity,
  MousePointer
} from 'lucide-react';
import { DESIGN_TOKENS, SECTIONS_DATA } from '../data/specificationData';

export const DesignSystemViewer: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'anatomy' | 'mockups'>('tokens');

  const handleCopy = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const uiSection = SECTIONS_DATA.find(s => s.id === 'section-4');
  const chatListMockup = uiSection?.subsections.find(sub => sub.id === 'sec-4-1')?.mockupText;
  const conversationMockup = uiSection?.subsections.find(sub => sub.id === 'sec-4-2')?.mockupText;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>نظام التصميم والواجهات (Mobile Design System & UI Specs)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            مواصفات الألوان، الخطوط، وهندسة المكونات التفاعلية
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            الرموز التصميمية المعتمدة (Design Tokens) لضمان التكامل السلس مع الهوية البصرية الحالية للتطبيق، مع مراعاة معايير التباين البصري وإمكانية الوصول (WCAG AAA).
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tokens' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            رموز الألوان
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'typography' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            الخطوط والطباعة
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'anatomy' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            تشريح المكونات
          </button>
          <button
            onClick={() => setActiveTab('mockups')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'mockups' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            النماذج التخطيطية
          </button>
        </div>
      </div>

      {/* 1. Tokens Tab */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DESIGN_TOKENS.map((token, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400">
                      {token.category}
                    </span>
                    {token.contrastRatio && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold">
                        {token.contrastRatio}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {token.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {token.usage}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">الوضع الفاتح:</span>
                    <button
                      onClick={() => handleCopy(token.lightValue, `${token.name}-light`)}
                      className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600"
                    >
                      <span>{token.lightValue}</span>
                      {copiedToken === `${token.name}-light` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">الوضع الداكن:</span>
                    <button
                      onClick={() => handleCopy(token.darkValue, `${token.name}-dark`)}
                      className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600"
                    >
                      <span>{token.darkValue}</span>
                      {copiedToken === `${token.name}-dark` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>
              كافة الرموز التصميمية تم اختبار تباينها بموجب معايير WCAG AAA لضمان مقروئية تامة تحت ضوء الشمس المباشر وعند خفض إضاءة الشاشة.
            </span>
          </div>
        </div>
      )}

      {/* 2. Typography Tab */}
      {activeTab === 'typography' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                تدرج الخطوط والطباعة العربية والإنجليزية
              </h3>
              <p className="text-xs text-slate-500">
                Cairo للعربية و SF Pro / Roboto للإنجليزية والأرقام
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            
            <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <span className="font-mono text-indigo-600 font-bold block">Heading 1 (22px / Bold)</span>
                <span className="text-[11px] text-slate-400">عناوين الشاشات الرئيسية</span>
              </div>
              <div className="md:col-span-3 text-xl font-bold text-slate-900 dark:text-white">
                المحادثات وقائمة الرسائل الواردة
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <span className="font-mono text-indigo-600 font-bold block">Heading 2 (16px / SemiBold)</span>
                <span className="text-[11px] text-slate-400">أسماء جهات الاتصال والمجموعات</span>
              </div>
              <div className="md:col-span-3 text-base font-bold text-slate-900 dark:text-white">
                فريق الدعم الفني والمساعدة #9421
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <span className="font-mono text-indigo-600 font-bold block">Body Regular (14px / Line-height 1.55)</span>
                <span className="text-[11px] text-slate-400">نصوص فقاعات الدردشة الرئيسية</span>
              </div>
              <div className="md:col-span-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                مرحباً بك، تم استلام استفسارك بنجاح وسيقوم أحد ممثلي الخدمة بالرد الفوري خلال أقل من دقيقتين.
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <span className="font-mono text-indigo-600 font-bold block">Caption Mono (11px / Medium)</span>
                <span className="text-[11px] text-slate-400">الطوابع الزمنية وحالات التسليم</span>
              </div>
              <div className="md:col-span-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                10:42 ص • تم التسليم ✓✓
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. Anatomy Tab */}
      {activeTab === 'anatomy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Outgoing Bubble Anatomy */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>تشريح فقاعة الرسالة الصادرة (Outgoing Bubble)</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 flex justify-end">
              <div className="max-w-[85%] p-3.5 rounded-2xl rounded-bl-xs bg-indigo-600 text-white text-xs space-y-1.5 shadow-sm">
                <p>تم إرسال الملف المطلوب، بانتظار مراجعتك واعتماد الإصدار.</p>
                <div className="flex justify-end items-center gap-1 text-[10px] text-indigo-200 font-mono">
                  <span>09:42 ص</span>
                  <span className="text-sky-300">✓✓</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span><strong>انحناء الزوايا:</strong> 18px لثلاث زوايا وزاوية سفلية 4px (Directional Corner).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span><strong>الحشوة الداخلية (Padding):</strong> 14px أفقياً و 10px رأسياً.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span><strong>أيقونات التحقق:</strong> Sky 400 للقراءة، Slate 300 للتسليم، وعلامة مفردة للإرسال.</span>
              </li>
            </ul>
          </div>

          {/* Incoming Bubble Anatomy */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-600" />
              <span>تشريح فقاعة الرسالة الواردة (Incoming Bubble)</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 flex justify-start">
              <div className="max-w-[85%] p-3.5 rounded-2xl rounded-br-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs space-y-1.5 border border-slate-200 dark:border-slate-700 shadow-xs">
                <span className="text-[10px] font-bold text-indigo-600 block">سارة - الدعم الفني</span>
                <p>أهلاً بك! تم اعتماد التحديث بنجاح، وخدمة الإشعارات جاهزة للعمل.</p>
                <div className="flex justify-end text-[10px] text-slate-400 font-mono">
                  <span>09:44 ص</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5"></span>
                <span><strong>انحناء الزوايا:</strong> 18px لثلاث زوايا وزاوية سفلية 4px في اتجاه الورود.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5"></span>
                <span><strong>اسم المرسل:</strong> يظهر فقط في المحادثات الجماعية أو رسائل الدعم بلون مميز.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5"></span>
                <span><strong>مساحة اللمس للتفاعل:</strong> مساحة كامل الفقاعة تدعم الضغط المطول (450ms) لإظهار شريط الإيموجي.</span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* 4. Mockups Tab */}
      {activeTab === 'mockups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              النموذج التخطيطي النصي: شاشة قائمة المحادثات (Chat List Wireframe)
            </h3>
            <pre className="p-4 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs overflow-x-auto leading-relaxed dir-ltr text-left">
              {chatListMockup || "Loading Mockup..."}
            </pre>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              النموذج التخطيطي النصي: شاشة المحادثة النشطة (Conversation Wireframe)
            </h3>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed dir-ltr text-left">
              {conversationMockup || "Loading Mockup..."}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
