import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { DigitalProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DigitalProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<DigitalProducts>('digitalproducts', id!);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await actions.addToCart({
        collectionId: 'digitalproducts',
        itemId: product._id,
        quantity: 1
      });
    }
  };

  const features = [
    'Instant digital download',
    'Lifetime access',
    'Free updates',
    'Premium support',
    'Commercial license included'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24" style={{ minHeight: '600px' }}>
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !product ? (
          <div className="text-center py-32">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Product Not Found
            </h2>
            <p className="font-paragraph text-foreground/70 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </div>
        ) : (
          <>
            {/* Back Button */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary font-paragraph font-medium mb-8 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-foreground/5 border border-foreground/10">
                  <Image
                    src={product.itemImage || 'https://static.wixstatic.com/media/c3436d_960230cb9a8848fe8a583650f07571d7~mv2.png?originWidth=576&originHeight=576'}
                    alt={product.itemName || 'Product image'}
                    className="w-full h-full object-cover"
                    width={600}
                  />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm text-foreground font-paragraph font-medium px-6 py-3 rounded-xl hover:bg-background transition-colors duration-300"
                >
                  Quick Preview
                </button>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                {product.category && (
                  <span className="inline-block w-fit px-4 py-2 bg-primary/10 text-primary font-paragraph text-sm font-medium rounded-lg mb-4">
                    {product.category}
                  </span>
                )}

                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {product.itemName}
                </h1>

                <p className="font-paragraph text-lg text-foreground/70 mb-6">
                  {product.itemDescription}
                </p>

                <div className="mb-8">
                  <span className="font-heading text-5xl font-bold text-primary">
                    {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Features List */}
                <div className="mb-8 p-6 bg-foreground/5 rounded-2xl">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    What's Included:
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-paragraph text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingItemId === product._id}
                    className="flex-1 bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>

                {/* Detailed Description */}
                {product.detailedDescription && (
                  <div className="mt-12 pt-8 border-t border-foreground/10">
                    <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                      Product Details
                    </h3>
                    <p className="font-paragraph text-foreground/70 leading-relaxed whitespace-pre-line">
                      {product.detailedDescription}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      {showModal && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Product Preview
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-foreground/5 rounded-lg transition-colors duration-300"
                  aria-label="Close modal"
                >
                  <ArrowLeft className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden bg-foreground/5 mb-6">
                <Image
                  src={product.itemImage || 'https://static.wixstatic.com/media/c3436d_7de8c965539a4f9e952d0fee5cc60822~mv2.png?originWidth=768&originHeight=448'}
                  alt={product.itemName || 'Product preview'}
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>

              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                {product.itemName}
              </h3>
              <p className="font-paragraph text-foreground/70 mb-6">
                {product.itemDescription}
              </p>

              {product.detailedDescription && (
                <div className="p-6 bg-foreground/5 rounded-xl">
                  <p className="font-paragraph text-foreground/70 whitespace-pre-line">
                    {product.detailedDescription}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
