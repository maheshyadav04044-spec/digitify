// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Shield, ArrowRight, CheckCircle2, Plus, Minus, Star, Download, Layers } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { DigitalProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---
interface FAQItem {
  question: string;
  answer: string;
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomePage() {
  // --- State & Hooks ---
  const [products, setProducts] = useState<DigitalProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();
  
  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Data Sources ---
  const carouselSlides = [
    {
      id: 1,
      title: 'Elevate Your Digital Craft',
      subtitle: 'Premium assets for the modern creator. Meticulously designed to transform your workflow.',
      cta: 'Explore Collection',
      link: '/products',
      image: 'https://static.wixstatic.com/media/c3436d_eab91ab3b7ef4036b0eb51d296ff6dbc~mv2.png?originWidth=960&originHeight=576'
    },
    {
      id: 2,
      title: 'Professional Templates',
      subtitle: 'Save hundreds of hours with ready-to-use, enterprise-grade templates.',
      cta: 'Browse Templates',
      link: '/products',
      image: 'https://static.wixstatic.com/media/c3436d_f23aad2fd41b4ba0ae70f0ac796cdc12~mv2.png?originWidth=960&originHeight=576'
    },
    {
      id: 3,
      title: 'The Creator Toolkit',
      subtitle: 'Everything you need to build, launch, and scale your digital presence.',
      cta: 'Get Started',
      link: '/products',
      image: 'https://static.wixstatic.com/media/c3436d_749ceafbc009437b9b49c91afd9014f8~mv2.png?originWidth=960&originHeight=576'
    }
  ];

  const faqs: FAQItem[] = [
    { question: "How do I access my files after purchase?", answer: "Instant gratification is our standard. Immediately after your payment is processed, you will receive a secure download link via email. You can also access your files directly from your account dashboard at any time." },
    { question: "What is your refund policy?", answer: "We stand behind the quality of our digital craftsmanship. If you encounter any technical issues that we cannot resolve, we offer a 30-day money-back guarantee. Your satisfaction is paramount." },
    { question: "Are the templates compatible with my software?", answer: "Our assets are built for universal compatibility. We provide standard formats (PDF, Figma, Sketch, Notion) that work seamlessly with industry-standard tools. Check individual product details for specific requirements." },
    { question: "Do I get free updates?", answer: "Yes. When you purchase a product, you secure lifetime access to that version and all future enhancements we release for it. It's an investment that grows with you." }
  ];

  const features = [
    { icon: Sparkles, title: "Premium Quality", desc: "Pixel-perfect designs crafted by industry veterans." },
    { icon: Zap, title: "Instant Delivery", desc: "Automated systems ensure you get your files in seconds." },
    { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encryption for all your transactions." },
    { icon: Layers, title: "Fully Editable", desc: "Complete control over every layer, color, and font." }
  ];

  // --- Effects ---
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // --- Handlers ---
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<DigitalProducts>('digitalproducts', {}, { limit: 6 });
      setProducts(result.items);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent, product: DigitalProducts) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    e.stopPropagation();
    await actions.addToCart({
      collectionId: 'digitalproducts',
      itemId: product._id,
      quantity: 1
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowToast(true);
      setEmail('');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <div className="min-h-screen bg-off-white font-paragraph selection:bg-primary selection:text-white overflow-x-clip">
      <Header />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-gold origin-left z-50"
        style={{ scaleX }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-24 right-8 z-[100] bg-white/90 backdrop-blur-md border border-primary/10 text-foreground px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm">Success</h4>
              <p className="text-sm text-foreground/70">Action completed successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[90vh] min-h-[700px] overflow-hidden bg-dark-grey">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-violet-gradient-start via-primary to-deep-violet-gradient-end opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        {/* Animated Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-gold/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px]" 
        />

        <div className="relative h-full w-full max-w-[120rem] mx-auto px-6 md:px-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: "circOut" }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Text Content */}
              <div className="lg:col-span-7 text-left z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium tracking-wider mb-8">
                    PREMIUM DIGITAL ASSETS
                  </span>
                  <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
                    {carouselSlides[currentSlide].title}
                  </h1>
                  <p className="font-paragraph text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
                    {carouselSlides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={carouselSlides[currentSlide].link}
                      className="group relative px-8 py-4 bg-white text-primary font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {carouselSlides[currentSlide].cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                    <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                      View Showreel
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Hero Image/Visual */}
              <div className="hidden lg:block lg:col-span-5 relative h-[600px]">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full h-full"
                 >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/20 to-transparent rounded-[3rem] transform rotate-6 blur-2xl" />
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
                        <Image 
                            src={carouselSlides[currentSlide].image} 
                            alt={carouselSlides[currentSlide].title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        {/* Glass Overlay Card */}
                        <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                            <div className="flex items-center justify-between text-white">
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-70">Featured Collection</p>
                                    <p className="font-heading text-xl">Summer Bundle '24</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-12 right-12 flex gap-4 z-20">
            <button onClick={prevSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* --- TRUST TICKER --- */}
      <div className="w-full bg-white border-b border-gray-100 py-8 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6">
          <p className="text-center text-sm font-medium text-gray-400 mb-6 tracking-widest uppercase">Trusted by creators from</p>
          <div className="flex justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholder Logos using text for demo purposes as no logo assets provided */}
             {['Acme Corp', 'Global Tech', 'Nebula', 'FoxRun', 'Circle'].map((brand, i) => (
                 <span key={i} className="font-heading text-xl md:text-2xl font-bold">{brand}</span>
             ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION (Bento Grid) --- */}
      <section className="py-32 bg-off-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">Why Top Creators Choose Us</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">We don't just sell files; we provide the infrastructure for your creative success.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-off-white flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION (Sticky Layout) --- */}
      <section className="py-32 bg-white relative" id="products">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Curated Collection</span>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                  Digital Assets<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end">
                    For The Pros
                  </span>
                </h2>
                <p className="text-lg text-foreground/60 mb-10 max-w-md">
                  Explore our hand-picked selection of premium resources. From UI kits to 3D assets, find exactly what you need to ship faster.
                </p>
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary transition-colors group"
                >
                  View Full Catalog 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Decorative Element */}
                <div className="mt-20 hidden lg:block">
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-8" />
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="font-heading text-3xl font-bold">10k+</p>
                            <p className="text-xs text-gray-400 uppercase">Downloads</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <p className="font-heading text-3xl font-bold">4.9</p>
                            <p className="text-xs text-gray-400 uppercase">Rating</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                  // Loading Skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-[4/5] bg-gray-100 rounded-3xl animate-pulse" />
                  ))
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative bg-off-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                      {/* Image Container */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <Link to={`/products/${product._id}`}>
                          <Image
                            src={product.itemImage || 'https://static.wixstatic.com/media/c3436d_db6becd475c242c68351447141147667~mv2.png?originWidth=576&originHeight=768'}
                            alt={product.itemName || 'Product'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            width={600}
                          />
                        </Link>
                        {/* Quick Add Button Overlay */}
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={addingItemId === product._id}
                          className="absolute bottom-4 right-4 w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50"
                          aria-label="Add to cart"
                        >
                          {addingItemId === product._id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Plus className="w-6 h-6" />}
                        </button>
                        {product.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full">
                                {product.category}
                            </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/products/${product._id}`}>
                            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {product.itemName}
                            </h3>
                          </Link>
                          <span className="font-paragraph font-semibold text-lg text-primary">
                            {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                          {product.itemDescription}
                        </p>
                        <div className="flex items-center gap-1 text-accent-gold text-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-gray-400 ml-1">(24)</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400">
                    No products found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROMO BANNER (Parallax) --- */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-dark-grey">
            <Image 
                src="https://static.wixstatic.com/media/c3436d_ac6d4daf64184c9db9a21c8aed76e272~mv2.png?originWidth=1152&originHeight=576" 
                alt="Background" 
                className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-grey via-transparent to-dark-grey" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="inline-block px-4 py-1 rounded-full border border-accent-gold/50 text-accent-gold text-sm font-medium mb-6">LIMITED TIME OFFER</span>
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8">
                    Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end">Ultimate Bundle</span>
                </h2>
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                    Get access to our entire library of premium templates, UI kits, and 3D assets for a fraction of the price.
                </p>
                <button className="px-10 py-5 bg-accent-gold text-accent-gold-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]">
                    Get All Access Pass - $99
                </button>
            </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION (Accordion) --- */}
      <section className="py-32 bg-off-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground/60">Everything you need to know about our products and billing.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-heading text-lg font-semibold text-foreground">{faq.question}</span>
                  <span className={`p-2 rounded-full bg-off-white transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronLeft className="w-5 h-5 -rotate-90" />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pt-0 text-foreground/70 leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-deep-violet-gradient-start to-deep-violet-gradient-end rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Join the Inner Circle</h2>
              <p className="text-white/80 text-lg mb-10">
                Get exclusive access to new drops, secret discounts, and design insights delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="px-10 py-4 bg-white text-primary font-bold rounded-full hover:bg-accent-gold hover:text-accent-gold-foreground transition-colors shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-6 text-xs text-white/40">No spam, ever. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}