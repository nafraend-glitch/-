import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Send, 
  Smile, 
  Paperclip, 
  Mic, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  Search, 
  Plus, 
  Pin, 
  VolumeX, 
  FileText, 
  Play, 
  Pause, 
  Image as ImageIcon, 
  Camera, 
  MapPin, 
  X, 
  Bell, 
  Sparkles, 
  MessageSquare, 
  RotateCcw,
  Sliders,
  Maximize2
} from 'lucide-react';
import { INITIAL_CHAT_THREADS } from '../data/specificationData';
import { ChatThread, ChatMessage } from '../types';

export const MobileSimulator: React.FC = () => {
  const [devicePlatform, setDevicePlatform] = useState<'ios' | 'android'>('ios');
  const [entryMode, setEntryMode] = useState<'bottom-tab' | 'fab' | 'default-home'>('bottom-tab');
  const [activeScreen, setActiveScreen] = useState<'home' | 'chat-list' | 'conversation'>('chat-list');
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-support');
  const [chatFilter, setChatFilter] = useState<'all' | 'unread' | 'support' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Conversation Input State
  const [inputText, setInputText] = useState('');
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [showAttachSheet, setShowAttachSheet] = useState(false);
  const [showReactionPickerForId, setShowReactionPickerForId] = useState<string | null>(null);
  const [isTypingSimulation, setIsTypingSimulation] = useState(false);
  const [activeVoicePlaying, setActiveVoicePlaying] = useState<string | null>(null);

  // In-App Notification Toast Simulator
  const [inAppToast, setInAppToast] = useState<{
    show: boolean;
    senderName: string;
    avatar: string;
    text: string;
    threadId: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active Thread Reference
  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (activeScreen === 'conversation') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeThread?.messages, activeScreen, isTypingSimulation]);

  // Handle entering a conversation
  const handleOpenConversation = (threadId: string) => {
    setActiveThreadId(threadId);
    setActiveScreen('conversation');
    
    // Mark as read
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          unreadCount: 0,
          messages: t.messages.map(m => ({ ...m, status: 'read' }))
        };
      }
      return t;
    }));
  };

  // Send message handler
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user-me',
      senderName: 'أنا',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      senderRole: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      isMe: true,
      replyTo: replyTarget ? {
        senderName: replyTarget.senderName,
        text: replyTarget.text
      } : undefined
    };

    // Optimistic UI update
    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: newMsg.text,
          lastMessageTime: newMsg.timestamp,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setInputText('');
    setReplyTarget(null);

    // Simulate WebSocket sent -> delivered -> read sequence
    setTimeout(() => {
      setThreads(prev => prev.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            messages: t.messages.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)
          };
        }
        return t;
      }));
    }, 600);

    // Simulate simulated response from peer/support
    setTimeout(() => {
      setIsTypingSimulation(true);
      setTimeout(() => {
        setIsTypingSimulation(false);
        const replyText = activeThread.type === 'support'
          ? "أشكرك على رسالتك! تم توثيق طلبك في سجل الخدمة وسنقوم بموافيك بالتحديثات اللحظية هنا."
          : "تم استلام رسالتك بوضوح، سأقوم بمراجعة التفاصيل والرد عليك حالاً!";

        const peerMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          senderId: activeThread.id,
          senderName: activeThread.title,
          senderAvatar: activeThread.avatar,
          senderRole: activeThread.type === 'support' ? 'support' : 'member',
          text: replyText,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
          isMe: false
        };

        setThreads(prev => prev.map(t => {
          if (t.id === activeThreadId) {
            return {
              ...t,
              lastMessage: peerMsg.text,
              lastMessageTime: peerMsg.timestamp,
              messages: t.messages.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m).concat(peerMsg)
            };
          }
          return t;
        }));
      }, 1500);
    }, 1200);
  };

  // Add reaction to a message
  const handleAddReaction = (messageId: string, emoji: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: t.messages.map(m => m.id === messageId ? { ...m, reaction: emoji } : m)
        };
      }
      return t;
    }));
    setShowReactionPickerForId(null);
  };

  // Trigger Mock In-App Push Notification
  const triggerMockInAppNotification = () => {
    setInAppToast({
      show: true,
      senderName: "سارة - الدعم الفني",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "وصلك تحديث جديد بخصوص تذكرة الدعم الفني #9421. انقر للمتابعة.",
      threadId: "thread-support"
    });

    setTimeout(() => {
      setInAppToast(null);
    }, 5000);
  };

  // Filtered threads list
  const filteredThreads = threads.filter(t => {
    if (chatFilter === 'unread' && t.unreadCount === 0) return false;
    if (chatFilter === 'support' && t.type !== 'support') return false;
    if (chatFilter === 'groups' && t.type !== 'group') return false;
    if (searchQuery.trim()) {
      return t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const totalUnreadCount = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Control Strip & Interactive Simulator Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>المحاكي التفاعلي المباشر (Live In-App Chat Sandbox)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            تجربة ميزة الدردشة الداخلية بهندسة الوصول الفوري
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            اختبر الشاشات الحية لقائمة المحادثات وتدفق الرسائل، مع إمكانية تجربة نقاط الوصول الفوري الثلاث، إرسال الرسائل الحية، التفاعل بالإيموجي، واختبار لافتات الإشعارات داخل التطبيق.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={triggerMockInAppNotification}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/40 text-xs font-bold transition-all shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span>إطلاق إشعار تجريبي (Push Toast)</span>
          </button>

          <button
            onClick={() => {
              setThreads(INITIAL_CHAT_THREADS);
              setActiveScreen('chat-list');
              setInputText('');
              setReplyTarget(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط المحاكي</span>
          </button>
        </div>
      </div>

      {/* Simulator Layout: Controls + Mobile Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Sidebar: Interactive Controls & Guidelines */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Platform Toggle */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
              نظام التشغيل وإطار الجهاز:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDevicePlatform('ios')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  devicePlatform === 'ios'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Apple iOS (iPhone)</span>
              </button>
              <button
                onClick={() => setDevicePlatform('android')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  devicePlatform === 'android'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Google Android (Pixel)</span>
              </button>
            </div>
          </div>

          {/* Instant Access Mode Toggle */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                استراتيجية الوصول الفوري عند الفتح:
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                Zero-Friction
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setEntryMode('bottom-tab');
                  setActiveScreen('chat-list');
                }}
                className={`w-full text-right p-3 rounded-xl border text-xs transition-all ${
                  entryMode === 'bottom-tab'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>1. شريط التنقل السفلي المخصص (Bottom Tab)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">الأمثل</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1">
                  تبويب ثابت مع عداد رسائل نابض يتيح الدخول بنقرة واحدة من أي مكان داخل التطبيق.
                </p>
              </button>

              <button
                onClick={() => {
                  setEntryMode('fab');
                  setActiveScreen('home');
                }}
                className={`w-full text-right p-3 rounded-xl border text-xs transition-all ${
                  entryMode === 'fab'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>2. الزر العائم الذكي (Smart FAB)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 font-bold">مرن</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1">
                  زر دائري عائم يظهر في الشاشة الرئيسية مع مؤشر عداد الرسائل لفتح الدردشة سريعاً.
                </p>
              </button>

              <button
                onClick={() => {
                  setEntryMode('default-home');
                  setActiveScreen('chat-list');
                }}
                className={`w-full text-right p-3 rounded-xl border text-xs transition-all ${
                  entryMode === 'default-home'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>3. شاشة الانطلاق الافتراضية (Default Screen)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold">مباشر</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1">
                  تفتح قائمة المحادثات تلقائياً بمجرد تشغيل التطبيق أو النقر على إشعار خارجي.
                </p>
              </button>
            </div>
          </div>

          {/* Interactive Feature Guide */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-2">
            <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>إجراءات تفاعلية يمكنك تجربتها في المحاكي:</span>
            </span>
            <ul className="space-y-1.5 text-indigo-800 dark:text-indigo-300 text-[11px]">
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>إرسال رسالة:</strong> اكتب في الحقل السفلي واضغط إرسال لمشاهدة حالات التسليم المتسلسلة (✓ ثم ✓✓ ثم قراءة زرقاء) مع رد آلي فوري.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>التفاعل بالإيموجي:</strong> انقر على أيقونة الإيموجي أو تفاعل مع أي رسالة لفتح شريط التفاعل السريع.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>السحب للرد:</strong> اضغط على أي رسالة لتفعيل شريط الرد المقتبس المباشر.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span><strong>قائمة المرفقات (+):</strong> انقر على زر (+) لاستعراض خيارات إرفاق الصور، الكاميرا، والمستندات.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Center/Right: Realistic Mobile Device Shell */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="relative w-full max-w-[390px] h-[780px] rounded-[52px] bg-slate-900 p-3.5 shadow-2xl ring-1 ring-slate-800/80 select-none overflow-hidden flex flex-col justify-between">
            
            {/* Outer Physical Frame Speaker & Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8 flex items-center justify-center pointer-events-none z-50">
              {devicePlatform === 'ios' ? (
                <div className="w-28 h-6 bg-black rounded-full mt-2 flex items-center justify-between px-2.5 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-950"></div>
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-black mt-2 ring-1 ring-slate-800"></div>
              )}
            </div>

            {/* Inner Display Canvas */}
            <div className="relative w-full h-full rounded-[42px] bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col font-sans">
              
              {/* Device Status Bar */}
              <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-slate-200 z-40 shrink-0">
                <span className="tracking-tight font-mono">09:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono">5G</span>
                  <div className="w-5 h-2.5 rounded-sm border border-slate-700 dark:border-slate-300 p-0.5 flex items-center">
                    <div className="h-full w-3/4 bg-slate-800 dark:bg-slate-200 rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Simulated In-App Toast Notification Banner (Drops from top) */}
              {inAppToast && inAppToast.show && (
                <div 
                  onClick={() => {
                    handleOpenConversation(inAppToast.threadId);
                    setInAppToast(null);
                  }}
                  className="absolute top-10 left-3 right-3 z-50 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-indigo-200 dark:border-indigo-800 shadow-xl shadow-indigo-500/10 cursor-pointer animate-in fade-in slide-in-from-top-4 duration-300"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={inAppToast.avatar}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {inAppToast.senderName}
                        </span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">الآن</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                        {inAppToast.text}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setInAppToast(null);
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Screen Body Router */}
              <div className="flex-1 overflow-hidden flex flex-col relative">
                
                {/* 1. Dummy Home Screen (When testing FAB Entry Point) */}
                {activeScreen === 'home' && (
                  <div className="flex-1 p-5 overflow-y-auto space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">الرئيسية</h3>
                        <p className="text-[11px] text-slate-500">أهلاً بك، فيصل الراجحي</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80" alt="" />
                      </div>
                    </div>

                    {/* Dummy Content Cards */}
                    <div className="p-4 rounded-2xl bg-indigo-600 text-white space-y-2 shadow-md shadow-indigo-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-100">ملخص العمليات</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">نشط</span>
                      </div>
                      <div className="text-lg font-black font-mono">4,850.00 ر.س</div>
                      <p className="text-[11px] text-indigo-100/90">تم تحديث المزامنة اللحظية مع خوادم النظام.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[11px] text-slate-400">الطلبات النشطة</span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">3 طلبات جديدة</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[11px] text-slate-400">تذاكر الدعم</span>
                        <div className="text-sm font-bold text-emerald-600">قيد المتابعة #9421</div>
                      </div>
                    </div>

                    {/* Banner to open chat */}
                    <div 
                      onClick={() => setActiveScreen('chat-list')}
                      className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">صندوق المحادثات</span>
                          <span className="text-[11px] text-slate-500">لديك {totalUnreadCount} رسائل غير مقروءة</span>
                        </div>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                        {totalUnreadCount}
                      </span>
                    </div>

                    {/* Floating Action Button (FAB) Simulation */}
                    {entryMode === 'fab' && (
                      <button
                        onClick={() => setActiveScreen('chat-list')}
                        className="absolute bottom-6 left-6 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 ring-4 ring-white dark:ring-slate-900"
                        title="فتح الدردشة الفورية"
                      >
                        <MessageSquare className="w-6 h-6" />
                        {totalUnreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                            {totalUnreadCount}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* 2. Chat List Screen (Main Inbox) */}
                {activeScreen === 'chat-list' && (
                  <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
                    
                    {/* Header */}
                    <div className="px-5 pt-2 pb-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                          المحادثات
                        </h2>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => alert("بدء محادثة جديدة: اختيار جهة اتصال أو تذكرة دعم.")}
                            className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                            title="محادثة جديدة"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Search Input */}
                      <div className="relative mt-2.5">
                        <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="البحث في المحادثات والرسائل..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Segmented Filter Pills */}
                      <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px]">
                        <button
                          onClick={() => setChatFilter('all')}
                          className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
                            chatFilter === 'all'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          الكل
                        </button>
                        <button
                          onClick={() => setChatFilter('unread')}
                          className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 flex items-center gap-1 ${
                            chatFilter === 'unread'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          <span>غير مقروءة</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-mono">
                            {totalUnreadCount}
                          </span>
                        </button>
                        <button
                          onClick={() => setChatFilter('support')}
                          className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
                            chatFilter === 'support'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          الدعم الفني
                        </button>
                        <button
                          onClick={() => setChatFilter('groups')}
                          className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 ${
                            chatFilter === 'groups'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          المجموعات
                        </button>
                      </div>

                    </div>

                    {/* Chat Thread Items */}
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900">
                      {filteredThreads.map((thread) => (
                        <div
                          key={thread.id}
                          onClick={() => handleOpenConversation(thread.id)}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                            thread.id === activeThreadId
                              ? 'bg-indigo-50/40 dark:bg-indigo-950/20'
                              : 'hover:bg-white dark:hover:bg-slate-900/60'
                          }`}
                        >
                          {/* Avatar with Presence Dot */}
                          <div className="relative shrink-0">
                            <img
                              src={thread.avatar}
                              alt=""
                              className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-800"
                            />
                            {thread.online && (
                              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950"></span>
                            )}
                          </div>

                          {/* Middle Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 truncate">
                                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {thread.title}
                                </span>
                                {thread.type === 'support' && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                                    دعم
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                                {thread.lastMessageTime}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-1">
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate pl-2">
                                {thread.lastMessage}
                              </p>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {thread.muted && (
                                  <VolumeX className="w-3 h-3 text-slate-400" />
                                )}
                                {thread.pinned && (
                                  <Pin className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                                )}
                                {thread.unreadCount > 0 && (
                                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                                    {thread.unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}

                      {filteredThreads.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-xs">
                          لا توجد محادثات تطابق هذا التصنيف.
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* 3. Conversation Screen (Active Chat) */}
                {activeScreen === 'conversation' && (
                  <div className="flex-1 flex flex-col overflow-hidden bg-slate-100/60 dark:bg-slate-950">
                    
                    {/* Conversation Header */}
                    <div className="px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => setActiveScreen('chat-list')}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <div className="relative shrink-0">
                          <img
                            src={activeThread.avatar}
                            alt=""
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-800"
                          />
                          {activeThread.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-slate-900"></span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                            {activeThread.title}
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block leading-none">
                            {isTypingSimulation ? 'يكتب الآن...' : (activeThread.online ? 'متصل الآن' : activeThread.lastSeen)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500">
                        <button 
                          onClick={() => alert("بدء اتصال صوتي مشفر عبر WebRTC")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert("خيارات المحادثة: كتم، وسائط مشتركة، بحث في السجل")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Messages Flow Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      
                      {/* Date Divider */}
                      <div className="flex justify-center">
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
                          اليوم
                        </span>
                      </div>

                      {/* Messages Stream */}
                      {activeThread.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col group relative ${msg.isMe ? 'items-end' : 'items-start'}`}
                        >
                          {/* Reply Context preview inside bubble */}
                          <div
                            onClick={() => setReplyTarget(msg)}
                            className={`relative max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs transition-all shadow-xs cursor-pointer ${
                              msg.isMe
                                ? 'bg-indigo-600 text-white rounded-bl-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-br-xs border border-slate-200/70 dark:border-slate-800'
                            }`}
                          >
                            {/* In-Group Sender Name */}
                            {!msg.isMe && activeThread.type === 'group' && (
                              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 block mb-1">
                                {msg.senderName}
                              </span>
                            )}

                            {/* Reply to Preview */}
                            {msg.replyTo && (
                              <div className={`mb-1.5 p-1.5 rounded-lg border-r-2 text-[10px] line-clamp-1 ${
                                msg.isMe 
                                  ? 'bg-indigo-700/50 border-white text-indigo-100' 
                                  : 'bg-slate-100 dark:bg-slate-800 border-indigo-500 text-slate-600 dark:text-slate-300'
                              }`}>
                                <span className="font-bold block">{msg.replyTo.senderName}</span>
                                <span className="truncate block opacity-90">{msg.replyTo.text}</span>
                              </div>
                            )}

                            {/* Audio Message Rendering */}
                            {msg.mediaType === 'audio' && (
                              <div className="flex items-center gap-2.5 py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVoicePlaying(activeVoicePlaying === msg.id ? null : msg.id);
                                  }}
                                  className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs"
                                >
                                  {activeVoicePlaying === msg.id ? (
                                    <Pause className="w-3.5 h-3.5 fill-current" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                  )}
                                </button>
                                <div className="flex-1 space-y-1">
                                  <div className="h-2 w-28 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-indigo-500 rounded-full ${activeVoicePlaying === msg.id ? 'w-3/4 transition-all duration-1000' : 'w-1/4'}`}></div>
                                  </div>
                                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                                    <span>{activeVoicePlaying === msg.id ? '0:22' : '0:00'}</span>
                                    <span>{msg.mediaDuration}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Document File Rendering */}
                            {msg.mediaType === 'document' && (
                              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-1">
                                <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <span className="font-bold text-[11px] truncate block text-slate-900 dark:text-white">
                                    {msg.mediaFileName}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-mono">3.4 MB • PDF</span>
                                </div>
                              </div>
                            )}

                            {/* Main Text Content */}
                            <p className="leading-relaxed whitespace-pre-wrap select-text">
                              {msg.text}
                            </p>

                            {/* Timestamp & Status Checkmarks */}
                            <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] font-mono ${
                              msg.isMe ? 'text-indigo-200' : 'text-slate-400'
                            }`}>
                              <span>{msg.timestamp}</span>
                              {msg.isMe && (
                                <>
                                  {msg.status === 'sending' && <span className="w-2.5 h-2.5 rounded-full border border-current border-t-transparent animate-spin"></span>}
                                  {msg.status === 'sent' && <Check className="w-3 h-3" />}
                                  {msg.status === 'delivered' && <CheckCheck className="w-3 h-3 text-slate-300" />}
                                  {msg.status === 'read' && <CheckCheck className="w-3.5 h-3.5 text-sky-300 font-bold" />}
                                </>
                              )}
                            </div>

                            {/* Reaction Badge if attached */}
                            {msg.reaction && (
                              <div className="absolute -bottom-2.5 left-2 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-xs flex items-center gap-1">
                                <span>{msg.reaction}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Reaction Pill Trigger */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-0.5 px-1 text-[10px] text-slate-400">
                            <button
                              onClick={() => setShowReactionPickerForId(msg.id)}
                              className="hover:text-indigo-500 flex items-center gap-0.5"
                            >
                              <Smile className="w-3 h-3" />
                              <span>تفاعل</span>
                            </button>
                            <span>•</span>
                            <button
                              onClick={() => setReplyTarget(msg)}
                              className="hover:text-indigo-500"
                            >
                              رد
                            </button>
                          </div>

                          {/* Reaction Picker Popup */}
                          {showReactionPickerForId === msg.id && (
                            <div className="absolute -top-9 z-30 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                              {['❤️', '👍', '😂', '🔥', '😮', '🙏'].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleAddReaction(msg.id, emoji)}
                                  className="hover:scale-125 transition-transform text-sm p-1"
                                >
                                  {emoji}
                                </button>
                              ))}
                              <button
                                onClick={() => setShowReactionPickerForId(null)}
                                className="text-xs text-slate-400 p-1 hover:text-slate-600"
                              >
                                ✕
                              </button>
                            </div>
                          )}

                        </div>
                      ))}

                      {/* Typing Indicator Live Micro-animation */}
                      {isTypingSimulation && (
                        <div className="flex items-center gap-2 p-2.5 rounded-2xl rounded-br-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
                          <span className="text-[10px] text-slate-500 font-medium">يكتب الآن</span>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Active Reply Banner Preview */}
                    {replyTarget && (
                      <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 border-t border-indigo-200 dark:border-indigo-900 flex items-center justify-between text-xs shrink-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-1 h-7 rounded-full bg-indigo-600 shrink-0"></div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block">
                              الرد على {replyTarget.senderName}
                            </span>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate block">
                              {replyTarget.text}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setReplyTarget(null)}
                          className="text-slate-400 hover:text-slate-600 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Attachment Action Sheet Modal */}
                    {showAttachSheet && (
                      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-slate-700 dark:text-slate-300 shrink-0 animate-in slide-in-from-bottom-2">
                        <button
                          onClick={() => {
                            setShowAttachSheet(false);
                            setInputText('🖼️ [تم إرفاق صورة معمارية التطبيق]');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col items-center gap-1"
                        >
                          <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <span>الصور</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowAttachSheet(false);
                            setInputText('📷 [تم التقاط صورة حية]');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col items-center gap-1"
                        >
                          <div className="w-9 h-9 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
                            <Camera className="w-4 h-4" />
                          </div>
                          <span>الكاميرا</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowAttachSheet(false);
                            setInputText('📄 [تم إرفاق ملف مواصفات النظام.pdf]');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col items-center gap-1"
                        >
                          <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span>مستند</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowAttachSheet(false);
                            setInputText('📍 [موقعي الحالي: الرياض، حي النرجس]');
                          }}
                          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex flex-col items-center gap-1"
                        >
                          <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span>الموقع</span>
                        </button>
                      </div>
                    )}

                    {/* Bottom Message Input Bar */}
                    <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
                      
                      {/* Attachment Button */}
                      <button
                        onClick={() => setShowAttachSheet(!showAttachSheet)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                          showAttachSheet
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Text Input */}
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="text"
                          placeholder="اكتب رسالتك هنا..."
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                          }}
                          className="w-full pr-3 pl-8 py-2 text-xs rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => setInputText(prev => prev + ' 😊')}
                          className="absolute left-2.5 text-slate-400 hover:text-slate-600"
                        >
                          <Smile className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Send Button or Voice Mic */}
                      {inputText.trim() ? (
                        <button
                          onClick={handleSendMessage}
                          className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shrink-0 shadow-md shadow-indigo-500/20"
                        >
                          <Send className="w-4 h-4 rtl:rotate-180" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setInputText('🎤 [تسجيل صوتي تجريبي 0:34 ثانية]');
                          }}
                          className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0"
                          title="تسجيل صوتي"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* Bottom Navigation Bar (When in Tab Mode) */}
              {entryMode === 'bottom-tab' && activeScreen !== 'conversation' && (
                <div className="h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-6 flex items-center justify-around shrink-0 z-30">
                  
                  <button
                    onClick={() => setActiveScreen('home')}
                    className={`flex flex-col items-center gap-0.5 ${
                      activeScreen === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[10px]">الرئيسية</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('chat-list')}
                    className={`flex flex-col items-center gap-0.5 relative ${
                      activeScreen === 'chat-list' ? 'text-indigo-600 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <div className="relative">
                      <MessageSquare className="w-4 h-4" />
                      {totalUnreadCount > 0 && (
                        <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center font-mono animate-pulse">
                          {totalUnreadCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px]">الدردشة</span>
                  </button>

                  <button
                    onClick={() => alert("شاشة الإشعارات")}
                    className="flex flex-col items-center gap-0.5 text-slate-400"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="text-[10px]">التنبيهات</span>
                  </button>

                </div>
              )}

              {/* Bottom Home Indicator Bar (iOS / Android Gestures) */}
              <div className="h-5 flex items-center justify-center bg-white dark:bg-slate-900 shrink-0 pb-1">
                <div className="w-32 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
