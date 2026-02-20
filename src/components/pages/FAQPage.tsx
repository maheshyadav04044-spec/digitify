import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs');
      setFaqs(result.items);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Find answers to common questions about our products, purchases, and policies
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="max-w-4xl mx-auto" style={{ minHeight: isLoading ? '400px' : 'auto' }}>
          {isLoading ? null : faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-background rounded-2xl border border-foreground/10 overflow-hidden"
                  style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-foreground/5 transition-colors duration-300"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl font-semibold text-foreground">
                          {faq.question}
                        </h3>
                        {faq.isFeatured && (
                          <span className="px-2 py-1 bg-accent-gold/20 text-accent-gold text-xs font-paragraph font-medium rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      {faq.category && (
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-paragraph text-sm font-medium rounded-lg">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-foreground" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-foreground/10">
                      <p className="font-paragraph text-foreground/70 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                      {faq.lastUpdated && (
                        <p className="font-paragraph text-sm text-foreground/50 mt-4">
                          Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                No FAQs available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8">
              Our support team is here to help. Get in touch and we'll respond as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-block bg-accent-gold text-accent-gold-foreground font-paragraph font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
