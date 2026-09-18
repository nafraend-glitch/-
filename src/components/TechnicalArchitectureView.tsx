import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Wifi, 
  ShieldCheck, 
  RefreshCw, 
  Server, 
  Lock, 
  Radio, 
  Smartphone, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { SECTIONS_DATA } from '../data/specificationData';

export const TechnicalArchitectureView: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<'realtime' | 'offline' | 'security' | 'push'>('realtime');

  const techSection = SECTIONS_DATA.find(s => s.id === 'section-7');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>المواصفات التقنية والبنية التحتية (Technical Infrastructure Specs)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            معمارية الاتصال اللحظي والتخزين دون اتصال والتشفير
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            مخططات هندسية لفرق تطوير الواجهات (iOS & Android) والخلفية (Backend) لتشغيل قنوات WebSockets وSQLite وإدارة التزامن الفوري.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveFlow('realtime')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFlow === 'realtime' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            الاتصال اللحظي (WebSockets)
          </button>
          <button
            onClick={() => setActiveFlow('offline')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFlow === 'offline' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            التخزين دون اتصال (Offline-first)
          </button>
          <button
            onClick={() => setActiveFlow('security')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFlow === 'security' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            الأمان والتشفير (AES-256)
          </button>
          <button
            onClick={() => setActiveFlow('push')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFlow === 'push' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            مسار الإشعارات (APNs/FCM)
          </button>
        </div>
      </div>

      {/* 1. Realtime WebSockets Flow */}
      {activeFlow === 'realtime' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  دورة حياة اتصال WebSocket ثنائي الاتجاه (WSS Protocol)
                </h3>
                <p className="text-xs text-slate-500">زمن استجابة أقل من 200ms مع تحسين استهلاك البطارية</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold">
              Latency &lt; 180ms
            </span>
          </div>

          {/* Step Sequence Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">1</span>
              <h4 className="font-bold text-slate-900 dark:text-white">مصافحة TLS 1.3 & Upgrade</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                تأسيس قناة WSS مشفرة فور فتح التطبيق بالاعتماد على JWT Token محقون في رأس الاتصال.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">2</span>
              <h4 className="font-bold text-slate-900 dark:text-white">نبضات الحيوية (Heartbeat)</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                تبادل Ping/Pong كل 45 ثانية أثناء نشاط الشاشة، مع مراقبة استقرار الإشارة اللاسلكية.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">3</span>
              <h4 className="font-bold text-slate-900 dark:text-white">إغلاق نظيف في الخلفية</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                قطع الاتصال بعد 30 ثانية من انتقال التطبيق للخلفية لحفظ طاقة البطارية والتحويل لـ Push.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">4</span>
              <h4 className="font-bold text-slate-900 dark:text-white">إعادة الاتصال الأسي</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                خوارزمية Exponential Backoff + Jitter (1s, 2s, 4s, 8s) لتفادي انهيار الخوادم عند عودة الشبكة.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>توجيه التراجع الاحتياطي (Fallback):</strong> في حال كانت شبكة الواي فاي للشركات تحظر منافذ WebSocket، يتم التراجع آلياً خلال 800ms إلى Server-Sent Events (SSE) عبر HTTP/2 للحفاظ على الاتصال اللحظي.
          </div>
        </div>
      )}

      {/* 2. Offline-First Flow */}
      {activeFlow === 'offline' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  معمارية التخزين المحلي والواجهة التفاؤلية (Optimistic UI Pipeline)
                </h3>
                <p className="text-xs text-slate-500">تجربة فورية بدون أوقات انتظار بيضاء أثناء انقطاع الشبكة</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold">
              SQLite / Room / CoreData
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>1. الإرسال التفاؤلي الفوري</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                توليد Client UUID للرسالة وحفظها فوراً في قاعدة البيانات المحلية (Room على Android و CoreData على iOS)، وعرض الفقاعة في شاشة المستخدم بأيقونة ساعة الانتظار في 0ms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>2. صندوق الصادر المحلي (Outbox)</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                في حال كان الجهاز غير متصل، توضع الرسائل في طابور الصادر المحلي وتتم المزامنة الصامتة في الخلفية فور التقاط إشارة الشبكة تلقائياً.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>3. ضغط الوسائط ومعاينة BlurHash</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                ضغط الصور محلياً حتى 80% بصيغة WebP مع توليد BlurHash صغير (&lt; 1KB) لعرض المعاينة فوراً قبل اكتمال رفع الملف الأصلي لخادم التخزين.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Security Flow */}
      {activeFlow === 'security' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  بروتوكولات الأمان والتشفير والامتثال لنظام حماية البيانات
                </h3>
                <p className="text-xs text-slate-500">تشفير التخزين والنقل وتثبيت الشهادات الرقمية (SSL Pinning)</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 font-bold">
              AES-256 + TLS 1.3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>تشفير المخازن المحلية (Encrypted Local Storage)</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                تشفير قاعدة بيانات SQLite على الجهاز باستخدام مفتاح تشفير 256-bit AES مشتق من بيئة التخزين الآمن للأجهزة: iOS Keychain و Android KeyStore لضمان عدم استخراج الرسائل حتى في حال كسر حماية الجهاز (Jailbreak / Root).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-600" />
                <span>تثبيت الشهادات الرقمية (SSL/TLS Pinning)</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                تضمين بصمات الشهادات الرقمية (SHA-256 Public Key Pinning) داخل كود التطبيق، لرفض أي اتصال غير موثوق ومنع هجمات الوسيط (Man-In-The-Middle) على شبكات الواي فاي العامة.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Push Flow */}
      {activeFlow === 'push' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  مسار تسليم الإشعارات والربط العميق (APNs / FCM Pipeline)
                </h3>
                <p className="text-xs text-slate-500">توجيه فوري بنقرة واحدة إلى صلب المحادثة المحددة</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold">
              Deep Linking Engine
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto dir-ltr text-left leading-relaxed">
{`// نموذج حمولة الإشعار الخارجي (Push Payload)
{
  "aps": {
    "alert": {
      "title": "سارة - الدعم الفني",
      "body": "تم تحديث طلبك الأخير رقم #9421..."
    },
    "badge": 1,
    "sound": "chat_alert.caf",
    "category": "CHAT_MESSAGE_CATEGORY"
  },
  "data": {
    "action": "open_conversation",
    "conversation_id": "thread-support",
    "message_id": "msg-98214",
    "deep_link": "app://chat/conversation?id=thread-support"
  }
}`}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            عند لمس الإشعار في نظامي iOS و Android، يقوم معالج الروابط العميقة (Deep Link Resolver) بتخطي الشاشة الترحيبية وتوجيه المستخدم مباشرة لعمق المحادثة المحددة مع استدعاء أحدث 30 رسالة في الخلفية.
          </p>
        </div>
      )}

    </div>
  );
};
