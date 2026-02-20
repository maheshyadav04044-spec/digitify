import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-8 z-50 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
        >
          <span className="text-2xl">✅</span>
          <span className="font-paragraph font-medium">Message sent successfully!</span>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Have a question or need support? We're here to help. Send us a message and we'll get back to you as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <p className="font-paragraph text-foreground/70 mb-8">
                We're committed to providing excellent customer service. Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Email Us
                  </h3>
                  <p className="font-paragraph text-foreground/70 mb-2">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:support@digitalstore.com"
                    className="font-paragraph text-primary hover:underline"
                  >
                    support@digitalstore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-foreground/5 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Live Chat
                  </h3>
                  <p className="font-paragraph text-foreground/70 mb-2">
                    Available Monday - Friday, 9am - 5pm EST
                  </p>
                  <button className="font-paragraph text-primary hover:underline">
                    Start a conversation
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end rounded-2xl">
              <h3 className="font-heading text-xl font-semibold text-primary-foreground mb-2">
                Response Time
              </h3>
              <p className="font-paragraph text-primary-foreground/90">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-paragraph font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl font-paragraph text-foreground bg-foreground/5 border-2 transition-colors duration-300 focus:outline-none ${
                    errors.name
                      ? 'border-destructive focus:border-destructive'
                      : 'border-transparent focus:border-primary'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-2 font-paragraph text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-paragraph font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl font-paragraph text-foreground bg-foreground/5 border-2 transition-colors duration-300 focus:outline-none ${
                    errors.email
                      ? 'border-destructive focus:border-destructive'
                      : 'border-transparent focus:border-primary'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-2 font-paragraph text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block font-paragraph font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl font-paragraph text-foreground bg-foreground/5 border-2 transition-colors duration-300 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-destructive focus:border-destructive'
                      : 'border-transparent focus:border-primary'
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-2 font-paragraph text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8">
              Get the latest updates, exclusive offers, and creative tips delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-xl font-paragraph text-foreground border-2 border-transparent focus:border-accent-gold focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent-gold text-accent-gold-foreground font-paragraph font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
