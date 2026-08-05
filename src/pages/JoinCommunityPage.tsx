import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { ShieldCheck, BookOpen, Users, Heart, ArrowRight, CheckCircle2, Star, Check, Gift, Sparkles, Award, Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import EditableText from '../components/EditableText';
import { Link } from 'react-router-dom';

export default function JoinCommunityPage() {
  const { content } = useContent();

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={32} />;
      case 'BookOpen': return <BookOpen size={32} />;
      case 'Users': return <Users size={32} />;
      case 'Heart': return <Heart size={32} />;
      default: return <Star size={32} />;
    }
  };

  let benefits = [];
  try {
    benefits = JSON.parse(content.joinCommunityBenefitsJson || '[]');
  } catch (e) {
    console.error("Error parsing joinCommunityBenefitsJson", e);
  }

  let whatYouGet = [];
  try {
    whatYouGet = JSON.parse(content.joinCommunityWhatYouGetJson || '[]');
  } catch (e) {
    console.error("Error parsing joinCommunityWhatYouGetJson", e);
  }

  let goldFeatures = [];
  try {
    goldFeatures = JSON.parse(content.goldPlanFeaturesJson || '[]');
  } catch (e) {
    goldFeatures = [
      "3 Months Full Membership Access",
      "Two Live Group Therapy Sessions Per Month (6 Sessions)",
      "Live Workshops & Masterclasses",
      "Private Community Lounge",
      "Personalized Wellness Dashboard",
      "Women's Health Assessment Checklists",
      "Educational Review of Laboratory Test Results",
      "Trusted Women's Health Product Guide",
      "DIY Wellness Remedies Library",
      "Nutrition & Food Guide for Women's Health",
      "Weekly Accountability & Progress Tracking",
      "Monthly Wellness Challenges",
      "Member Discounts on Selected Products & Services"
    ];
  }

  let diamondFeatures = [];
  try {
    diamondFeatures = JSON.parse(content.diamondPlanFeaturesJson || '[]');
  } catch (e) {
    diamondFeatures = [
      "12 Months Unlimited Membership Access",
      "Twenty-Four Live Group Therapy Sessions Per Year",
      "Priority Member Support",
      "Priority Review of Health Questions",
      "Exclusive Members-Only Masterclasses",
      "VIP Resource Library",
      "Annual Women's Wellness Planning Session",
      "Early Access to New Programs",
      "Exclusive Member Discounts",
      "Special Guest Expert Sessions",
      "VIP Recognition & Rewards"
    ];
  }

  let detailedBenefits: any[] = [];
  try {
    detailedBenefits = JSON.parse(content.membershipDetailedBenefitsJson || '[]');
  } catch (e) {
    detailedBenefits = [];
  }

  let whoShouldJoin: any[] = [];
  try {
    whoShouldJoin = JSON.parse(content.whoShouldJoinDetailedJson || '[]');
  } catch (e) {
    whoShouldJoin = [];
  }

  return (
    <>
      <SEO 
        title={content.joinCommunityTitle || "Join The Community"} 
        description={content.joinCommunitySubheading}
      />
      
      <div className="bg-brand-black text-white min-h-screen selection:bg-brand-gold selection:text-brand-black">
        <Navigation />
        
        <main className="pt-32">
          {/* Redesigned Hero Section */}
          <section className="relative py-28 md:py-36 px-6 overflow-hidden bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black border-b border-white/10">
            {/* Background Image Overlay with Glow */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity"
              style={{
                backgroundImage: `url(${content.joinCommunityHeroBgUrl || "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1600"})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0A0A0A_90%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Glowing Pill Tag */}
                <div className="inline-flex items-center gap-2.5 bg-brand-gold/10 border border-brand-gold/40 px-5 py-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-brand-gold shadow-[0_0_25px_rgba(212,175,55,0.15)] backdrop-blur-md">
                  <Sparkles size={14} className="text-brand-gold animate-pulse" />
                  <span><EditableText field="joinCommunityHeroLabel" /></span>
                </div>

                {/* Hero Title */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
                  <EditableText field="joinCommunityHeading" fancyMode="inline" />
                </h1>

                {/* Subtitle Card */}
                <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold" />
                  <p className="text-base sm:text-lg text-white/80 font-serif italic leading-relaxed">
                    <EditableText field="joinCommunitySubheading" multiline />
                  </p>
                </div>

                {/* Call to Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a 
                    href="#pricing"
                    className="w-full sm:w-auto bg-brand-gold text-brand-black px-10 py-5 text-xs font-mono font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex items-center justify-center group"
                  >
                    <span><EditableText field="joinCommunityCtaText" /></span>
                    <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={16} />
                  </a>

                  <a 
                    href="#benefits"
                    className="w-full sm:w-auto bg-white/5 border border-white/20 text-white px-8 py-5 text-xs font-mono tracking-[0.25em] uppercase hover:bg-white/10 hover:border-brand-gold/50 transition-all duration-300 flex items-center justify-center"
                  >
                    <span>Explore Benefits</span>
                  </a>
                </motion.div>

                {/* Key Highlight Strip */}
                <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 max-w-4xl mx-auto text-left">
                  <div className="p-3 bg-white/[0.01] border border-white/5 flex items-center gap-3">
                    <Shield size={18} className="text-brand-gold flex-shrink-0" />
                    <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">100% Private & Confidential</span>
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 flex items-center gap-3">
                    <Award size={18} className="text-brand-gold flex-shrink-0" />
                    <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Led by Dr. FID</span>
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 flex items-center gap-3">
                    <Users size={18} className="text-brand-gold flex-shrink-0" />
                    <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Global Sisterhood</span>
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 flex items-center gap-3">
                    <Gift size={18} className="text-brand-gold flex-shrink-0" />
                    <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Free Welcome Gift</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About This Membership Section */}
          <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-b from-brand-black via-white/[0.02] to-brand-black relative">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-12 bg-white/[0.02] border border-brand-gold/20 relative backdrop-blur-sm"
              >
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-brand-gold" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] block mb-2">
                      <EditableText field="joinCommunityAboutBadge" />
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
                      <EditableText field="joinCommunityAboutTitle" />
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Star size={20} />
                  </div>
                </div>

                <div className="space-y-6 text-white/80 leading-relaxed text-sm md:text-base">
                  <p className="border-l-2 border-brand-gold pl-4 md:pl-6 text-white/90 italic font-serif text-base md:text-lg">
                    <EditableText field="joinCommunityAboutText1" multiline />
                  </p>
                  <p className="pl-4 md:pl-6 text-white/70 font-light">
                    <EditableText field="joinCommunityAboutText2" multiline />
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Welcome Gift Section */}
          <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-r from-brand-black via-brand-gold/5 to-brand-black relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="p-8 md:p-12 bg-white/[0.02] border-2 border-brand-gold/40 relative backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/40 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-gold">
                      <Gift size={14} className="text-brand-gold" />
                      <span><EditableText field="welcomeGiftBadge" /></span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                      <EditableText field="welcomeGiftTitle" />
                    </h2>

                    <p className="text-white/80 leading-relaxed text-sm md:text-base font-light border-l-2 border-brand-gold pl-4">
                      <EditableText field="welcomeGiftText" multiline />
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs text-brand-gold/90 font-mono tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                      <span>Free Gift Included for First-Time Subscribers</span>
                    </div>
                  </div>

                  <div className="md:col-span-5 relative group">
                    <div className="aspect-square relative overflow-hidden border border-brand-gold/30 bg-black/40 shadow-2xl">
                      <img 
                        src={content.welcomeGiftImageUrl || "https://res.cloudinary.com/dhqlhxjcj/image/upload/v1785892041/IMG-20260731-WA0004_sazcb3.jpg"} 
                        alt="Welcome Gift - Women's Probiotic & Slippery Elm Supplement" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Detailed Membership Benefits Section (01 - 09) */}
          <section id="benefits" className="py-28 px-6 border-t border-white/10 bg-black relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] block mb-3">
                  WHAT YOUR MEMBERSHIP INCLUDES
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white">
                  Membership Benefits
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedBenefits.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 bg-white/[0.02] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                        <span className="text-2xl font-mono font-bold text-brand-gold">
                          {item.number}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-brand-gold/40 group-hover:bg-brand-gold transition-colors" />
                      </div>

                      <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-brand-gold/90 font-medium italic mb-4 leading-relaxed bg-brand-gold/5 p-2.5 border-l-2 border-brand-gold">
                          {item.description}
                        </p>
                      )}

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="space-y-2 mt-3">
                          {item.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                              <Check size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Who Should Join? Section (01 - 09) */}
          <section className="py-28 px-6 border-t border-white/10 bg-gradient-to-b from-brand-black via-white/[0.01] to-brand-black relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] block mb-3">
                  TAILORED CARE FOR EVERY STAGE
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
                  Who Should Join?
                </h2>
                <p className="text-white/70 font-serif italic text-base md:text-lg">
                  <EditableText field="whoShouldJoinSubheading" multiline />
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whoShouldJoin.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 md:p-8 bg-black border border-white/10 hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                        <span className="text-xl font-mono font-bold text-brand-gold">
                          {item.number}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-[10px] group-hover:bg-brand-gold group-hover:text-brand-black transition-all">
                          ✓
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="py-32 px-6 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto">
              <EditableText field="joinCommunityBenefitsJson" multiline className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 block" as="div">
                {benefits.map((benefit: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-white/[0.02] border border-white/5 hover:border-brand-gold/30 transition-all group"
                  >
                    <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-white mb-4">{benefit.title}</h3>
                    <p className="text-[13px] text-white/40 italic leading-relaxed font-light">{benefit.text}</p>
                  </motion.div>
                ))}
              </EditableText>
            </div>
          </section>

          {/* Privacy & Confidentiality Guarantee Section */}
          <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-b from-black via-brand-gold/[0.03] to-black relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-12 bg-white/[0.02] border-2 border-brand-gold/40 relative backdrop-blur-md shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <ShieldCheck size={32} />
                </div>

                <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] block mb-3 font-semibold">
                  <EditableText field="joinCommunityPrivacyTitle" />
                </span>

                <h3 className="text-xl md:text-3xl font-serif font-bold text-white tracking-tight leading-snug max-w-2xl mx-auto">
                  <EditableText field="joinCommunityPrivacyText" multiline />
                </h3>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-brand-gold inline-block" />
                  <span>Strictly Confidential • HIPAA Compliant Ethics • Private Community</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-28 px-6 bg-white/[0.01] relative border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] block mb-3">INVEST IN YOUR HEALTH</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white">Membership Plans</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* Gold Plan Card */}
                <div className="p-8 md:p-10 bg-black border border-white/10 flex flex-col justify-between relative hover:border-brand-gold/40 transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-serif font-bold text-brand-gold flex items-center gap-2">
                        <span>🥇</span> Gold Plan
                      </h3>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold/80 bg-brand-gold/10 border border-brand-gold/30 px-3 py-1">Quarterly</span>
                    </div>

                    <p className="text-xs text-white/50 uppercase font-mono tracking-wider mb-6 pb-4 border-b border-white/10">
                      Quarterly (3 Months)
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-black text-white">
                          ₦{Number(content.membershipPriceGoldNGN || "35000").toLocaleString()}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-white/50">
                          / ${Number(content.membershipPriceGoldUSD || "35").toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1 italic">Billed every 3 months</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-brand-gold/90 mb-4 pb-2 border-b border-white/5">
                        Includes:
                      </h4>
                      <ul className="text-sm text-white/80 space-y-3">
                        {goldFeatures.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-xs md:text-sm leading-relaxed">
                            <Check size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link 
                    to="/register?plan=gold" 
                    className="w-full bg-white/10 hover:bg-brand-gold hover:text-brand-black text-white text-center py-4 font-black uppercase tracking-widest text-xs transition-all duration-300 block border border-white/20 mt-4"
                  >
                    Select Gold Plan
                  </Link>
                </div>

                {/* Diamond Plan Card */}
                <div className="p-8 md:p-10 bg-gradient-to-b from-brand-gold/15 via-black to-black border-2 border-brand-gold flex flex-col justify-between relative shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all">
                  <div className="absolute -top-3 right-6 bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-widest px-4 py-1 shadow-md">
                    Most Value
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                        <span>💎</span> Diamond Plan
                      </h3>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-brand-black font-bold bg-brand-gold px-3 py-1">Annual</span>
                    </div>

                    <p className="text-xs text-white/60 uppercase font-mono tracking-wider mb-2">
                      Annual (12 Months)
                    </p>
                    <p className="text-xs text-brand-gold font-medium italic mb-6 pb-4 border-b border-white/10">
                      Save ₦20,000 ($20) compared to paying quarterly for a full year.
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-black text-brand-gold">
                          ₦{Number(content.membershipPriceDiamondNGN || "120000").toLocaleString()}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-white/50">
                          / ${Number(content.membershipPriceDiamondUSD || "120").toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1 italic">Billed annually</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-4 pb-2 border-b border-white/10">
                        Includes Everything in Gold, PLUS:
                      </h4>
                      <ul className="text-sm text-white/90 space-y-3">
                        {diamondFeatures.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-xs md:text-sm leading-relaxed">
                            <Check size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link 
                    to="/register?plan=diamond" 
                    className="w-full bg-brand-gold text-brand-black hover:bg-white hover:text-black text-center py-4 font-black uppercase tracking-widest text-xs transition-all duration-300 block shadow-lg mt-4"
                  >
                    Select Diamond Plan
                  </Link>
                </div>
              </div>
            </div>
          </section>



          {/* Simple Final CTA Banner */}
          <section className="py-40 px-6 bg-brand-gold text-brand-black text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-none">
                <EditableText field="joinCommunityFinalHeading" />
              </h2>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-60 mb-12">
                <EditableText field="joinCommunityFinalLabel" />
              </p>
              <div className="w-24 h-[1px] bg-brand-black mx-auto" />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
