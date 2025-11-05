"use client";

import { deepClone } from "@/lib/utils";
import CartItem from "@/types/shoppingCart.types";
import { useState } from "react";

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Premium T-Shirt",
    price: 29.99,
    quantity: 2,
    options: {
      size: "L",
      color: "Blue",
      customizations: ["Logo Print", "Gift Wrap"],
    },
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    options: {
      size: "One Size",
      color: "Black",
      customizations: ["Engraving"],
    },
  },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>(deepClone(initialCart));

  // Deep Clone in Action: Safe quantity updates
  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    console.log("🔄 Updating quantity for item:", itemId, "to:", newQuantity);

    const cartCopy = deepClone(cart);
    const itemIndex = cartCopy.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1 && newQuantity >= 0) {
      if (newQuantity === 0) {
        cartCopy.splice(itemIndex, 1);
        console.log("🗑️ Item removed from cart");
      } else {
        cartCopy[itemIndex].quantity = newQuantity;
        console.log("✅ Quantity updated safely with deepClone");
      }
      setCart(cartCopy);
    }
  };

  // Deep Clone in Action: Bulk operations
  const applyDiscountToAll = (discountPercent: number) => {
    console.log("🎯 Applying discount to all items:", discountPercent + "%");

    const cartCopy = deepClone(cart);
    const discountedCart = cartCopy.map((item) => ({
      ...item,
      price: Number((item.price * (1 - discountPercent / 100)).toFixed(2)),
    }));

    setCart(discountedCart);
    console.log("💰 Discount applied to all items using deepClone");
  };

  // Deep Clone in Action: Adding new items
  const addNewItem = () => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: "New Product",
      price: 49.99,
      quantity: 1,
      options: {
        size: "M",
        color: "Red",
        customizations: [],
      },
    };

    const cartCopy = deepClone(cart);
    cartCopy.push(newItem);
    setCart(cartCopy);
    console.log("🆕 New item added with deepClone");
  };

  // FIXED: Safe reset function
  const resetToFirstItem = () => {
    console.log("🔄 Resetting cart to initial state");

    if (initialCart.length > 0) {
      // Deep clone the initial first item
      const firstItemCopy = deepClone(initialCart[0]);
      setCart([firstItemCopy]);
      console.log("✅ Cart reset to first item using deepClone");
    } else {
      console.log("⚠️ No items available to reset");
      setCart([]);
    }
  };

  // FIXED: Reset to full initial cart
  const resetToInitialCart = () => {
    console.log("🔄 Resetting to full initial cart");
    setCart(deepClone(initialCart));
    console.log("✅ Full cart reset using deepClone");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <section
      id="ShoppingCart"
      className="flex flex-col items-center justify-center min-h-screen pt-34 px-4 xl:px-0 mb-6"
    >
      <div className="w-full max-w-6xl text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
          Shopping Cart + DeepClone Demo{" "}
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-4xl mx-auto leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <strong>Educational Purpose:</strong> This demonstrates how
          <code>deepClone</code> prevents state mutations by creating completely
          new objects. Each operation safely modifies a cloned copy without
          affecting the original data.
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={resetToInitialCart}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reset Cart
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">
                    Price: <span className="font-mono">${item.price}</span>
                  </p>
                  <p className="text-gray-600">
                    Size: {item.options.size} | Color: {item.options.color}
                  </p>
                  {item.options.customizations.length > 0 && (
                    <p className="text-sm text-purple-600">
                      Customizations: {item.options.customizations.join(", ")}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="font-mono bg-gray-100 px-3 py-1 rounded min-w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-mono text-lg">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Cart Summary - Only show if cart has items */}
      {cart.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Cart Total</h3>
            <p className="text-2xl font-bold text-green-600">
              ${getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => applyDiscountToAll(10)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Apply 10% Discount
            </button>
            <button
              onClick={() => applyDiscountToAll(20)}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Apply 20% Discount
            </button>
            <button
              onClick={addNewItem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add New Item
            </button>
            <button
              onClick={resetToFirstItem}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Reset to First Item
            </button>
            <button
              onClick={resetToInitialCart}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Reset Full Cart
            </button>
          </div>
        </div>
      )}
      {/* DeepClone Explanation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">
          How DeepClone Works Here:
        </h3>
        <ul className="text-yellow-700 list-disc list-inside space-y-1">
          <li>
            <strong>Quantity Changes:</strong> Creates new cart array with
            updated quantities
          </li>
          <li>
            <strong>Discount Application:</strong> Safely modifies prices
            without affecting original data
          </li>
          <li>
            <strong>Item Removal:</strong> Completely new array when items are
            deleted
          </li>
          <li>
            <strong>Reset Operations:</strong> Uses deepClone to restore
            original state safely
          </li>
          <li>
            <strong>State Safety:</strong> Prevents accidental mutations in
            React's state management
          </li>
        </ul>
      </div>
    </section>
  );
}
