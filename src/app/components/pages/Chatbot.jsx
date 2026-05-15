import { useState, useEffect, useRef } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import { Send, Bot, User, HelpCircle, ShieldCheck, Scale, AlertCircle, MessageSquare, Gavel } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';

const suggestedQuestions = [
  'What are my rights if arrested?',
  'How to report a 500 BDT bribe?',
  'Whistleblower protection laws',
  'Process of land registration'
];

const initialMessages = [
  {
    id: 1,
    text: "Greetings! I am Shotto-AI, your Digital Legal Advocate. Ask me anything about citizen rights or transparency laws. I will guide you on exactly what actions you can take according to the law.",
    sender: 'bot',
    timestamp: new Date()
  }
];

export function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('arrest') || input.includes('rights')) {
      return `আপনার অধিকার সম্পর্কে: সংবিধানের ৩৩ অনুচ্ছেদ (Article 33) অনুযায়ী আপনি নিচের অ্যাকশনগুলো নিতে পারেন:

১. গ্রেফতারের কারণ না জানিয়ে আপনাকে আটকে রাখা যাবে না।
২. আপনার পছন্দমতো আইনজীবীর সাথে পরামর্শ করার পূর্ণ অধিকার আপনার আছে। 
৩. গ্রেফতারের ২৪ ঘণ্টার মধ্যে আপনাকে নিকটস্থ ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে।

অ্যাকশন: যদি এই নিয়ম না মানা হয়, তবে আপনি উচ্চ আদালতে 'Ret of Habeas Corpus' ফাইল করতে পারেন।`;
    }
    
    if (input.includes('bribe') || input.includes('ghush')) {
      return `ঘুষের দাবি একটি দণ্ডনীয় অপরাধ। দুর্নীতি দমন কমিশন আইন, ২০০৪ (ACC Act) অনুযায়ী আপনি যা করতে পারেন:

১. সরাসরি ঘুষ দিতে অস্বীকার করুন। 
২. দণ্ডবিধির ১৬১ ধারা (Penal Code 161) অনুযায়ী এটি একটি জামিন অযোগ্য অপরাধ, তাই আপনি আমাদের প্ল্যাটফর্মে প্রমাণসহ রিপোর্ট করুন। 
৩. দুদকের হটলাইন ১০৬-এ কল করে তাৎক্ষণিক সহায়তা চান।

অ্যাকশন: আমাদের 'Report Now' পেজে গিয়ে আপনি সরাসরি ওই কর্মকর্তার বিরুদ্ধে অভিযোগ দাখিল করুন, আমরা এটি যথাযথ কর্তৃপক্ষের কাছে পৌঁছে দেব।`;
    }
    
    if (input.includes('whistleblower') || input.includes('protection')) {
      return `জনস্বার্থ সংশ্লিষ্ট তথ্য প্রকাশ (সুরক্ষা) আইন, ২০১১ (Whistleblower Protection Act) অনুযায়ী আপনি সম্পূর্ণ সুরক্ষিত। 

আপনার অধিকার:
- এই আইন অনুযায়ী আপনার পরিচয় কোনোভাবেই প্রকাশ করা যাবে না।
- যদি কেউ আপনার পরিচয় প্রকাশ করার চেষ্টা করে, তবে তার ৩ বছর পর্যন্ত জেল হতে পারে।

অ্যাকশন: আপনি নির্ভয়ে রিপোর্ট করতে পারেন। যদি কোনো কর্মকর্তা আপনাকে হুমকি দেয়, তবে সরাসরি 'Protection Mode' অ্যাক্টিভেট করুন।`;
    }
    
    if (input.includes('land') || input.includes('registration')) {
      return `ভূমি রেজিস্ট্রেশনের ক্ষেত্রে সরকারি নিয়ম অনুযায়ী:

১. আপনি রেজিস্ট্রেশন আইন, ১৯০৮ (Registration Act 1908) অনুযায়ী শুধু সরকারি ফি ব্যাংকের মাধ্যমে জমা দেবেন।
২. অতিরিক্ত কোনো "স্পিড মানি" দাবি করলে সেটি অবৈধ।

অ্যাকশন: যদি সাব-রেজিস্ট্রার অফিসে বাড়তি টাকা চায়, তবে তাৎক্ষণিক আমাদের 'Live Ticker' এ রিপোর্ট করুন এবং কর্মকর্তাদের আইডি নম্বরটি টুকে রাখুন।`;
    }
    
    return "আমি আপনার প্রশ্নটি বিশ্লেষণ করছি। বাংলাদেশের প্রচলিত আইন (যেমন: দণ্ডবিধি বা তথ্য অধিকার আইন) অনুযায়ী আমি আপনাকে সঠিক পরামর্শ দিতে পারি। আপনি কী নিয়ে অ্যাকশন নিতে চান সেটি সুনির্দিষ্টভাবে বলুন।";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <div className="text-center mb-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" /> Secure Justice AI
             </div>
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Digital Legal Assistant
             </h1>
             <p className="text-muted-foreground max-w-2xl mx-auto">
                Get instant guidance based on Bangladesh's Laws. Find out exactly what actions you can take against corruption.
             </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-0 border-border shadow-2xl flex flex-col h-[650px] bg-card/40 overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/20">
                    <Gavel className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Shotto-AI (Advocate Mode)</div>
                    <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Knowledge Base Updated</div>
                  </div>
                </div>
                <div className="flex gap-2">
                   {['Arrest Rights', 'Bribe Info', 'RTI Act'].map(chip => (
                     <button 
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="hidden md:block text-[9px] font-bold text-muted-foreground border border-border px-2 py-1 rounded-md hover:bg-muted"
                     >
                       {chip}
                     </button>
                   ))}
                </div>
              </div>

              {/* Messages Container */}
              <div 
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-3 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${
                        message.sender === 'bot' 
                          ? 'bg-primary/20 border-primary/30 text-primary' 
                          : 'bg-muted border-border text-foreground'
                      }`}>
                        {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className="space-y-1">
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          message.sender === 'bot'
                            ? 'bg-muted/40 border border-border text-foreground'
                            : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        }`}>
                          <p className="whitespace-pre-line">{message.text}</p>
                        </div>
                        <div className={`text-[10px] font-bold text-muted-foreground uppercase ${
                           message.sender === 'user' ? 'text-right' : ''
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/[0.02] border-t border-white/5">
                <div className="flex items-center gap-3">
                  <Input
                    type="text"
                    placeholder="Describe your situation (e.g. 'Someone asked for a bribe')..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                    className="h-12 bg-white/[0.03] border-white/10 text-white focus:ring-primary/20"
                  />
                  <Button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 text-white shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
