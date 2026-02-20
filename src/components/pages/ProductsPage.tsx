import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { DigitalProducts } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<DigitalProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DigitalProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<DigitalProducts>('digitalproducts');
      setProducts(result.items);
      setFilteredProducts(result.items);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(result.items.map(p => p.category).filter(Boolean))
      ) as string[];
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (product: DigitalProducts) => {
    await actions.addToCart({
      collectionId: 'digitalproducts',
      itemId: product._id,
      quantity: 1
    });
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
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Discover our complete collection of premium digital products designed to elevate your creative workflow
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-foreground">
            <Filter className="w-5 h-5" />
            <span className="font-paragraph font-semibold">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-paragraph font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground'
                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ minHeight: isLoading ? '600px' : 'auto' }}>
          {isLoading ? null : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/30 transition-all duration-300"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <Link to={`/products/${product._id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-foreground/5">
                    <Image
                      src={product.itemImage || 'https://static.wixstatic.com/media/c3436d_44f4782df5cd4db48873b3d812739959~mv2.png?originWidth=384&originHeight=256'}
                      alt={product.itemName || 'Product image'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      width={400}
                    />
                  </div>
                </Link>
                <div className="p-6">
                  {product.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-paragraph text-sm font-medium rounded-lg mb-3">
                      {product.category}
                    </span>
                  )}
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-heading text-2xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                      {product.itemName}
                    </h3>
                  </Link>
                  <p className="font-paragraph text-foreground/70 mb-4 line-clamp-2">
                    {product.itemDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-bold text-primary">
                      {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingItemId === product._id}
                      className="bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
