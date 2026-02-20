import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Shopping Cart
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors duration-300"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-foreground/20 mb-4" />
                  <p className="font-paragraph text-lg text-foreground/70 mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-paragraph text-sm text-foreground/50">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-foreground/5 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-foreground/10">
                        <Image
                          src={item.image || 'https://static.wixstatic.com/media/c3436d_900acc4728e54306988d3f9cd2aebe2d~mv2.png?originWidth=128&originHeight=128'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          width={80}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-paragraph font-semibold text-foreground mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="font-paragraph text-sm text-primary font-bold mb-2">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-colors duration-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-foreground" />
                          </button>
                          <span className="font-paragraph font-medium text-foreground w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-colors duration-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => actions.removeFromCart(item)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors duration-300 self-start"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 text-destructive" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-foreground/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-paragraph text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-heading text-3xl font-bold text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold py-4 rounded-xl hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full border-2 border-primary text-primary font-paragraph font-semibold py-4 rounded-xl hover:bg-primary/5 transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
