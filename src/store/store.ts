import { create } from "zustand";

const useStore = create((set) => ({
  user: 0,
  updateBears: (user: number) => set({ user: user }),
}));

interface Cart {
  productImage: string;
  productName: string;
  sellerInfo: string;
  currentPrice: string;
  originalPrice: string;
  discountOffer: string;
}

interface CartState {
  cartItems: any;
  incrementItem: any;
  decrementItem: any;
  removeItem: any;
}

interface cartItems {
  id: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

export const useCart = create<CartState>((set) => ({
  cartItems: [],

  // Increment item quantity
  incrementItem: (item: cartItems) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (i: any) => i.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Item exists, update its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1,
        };

        return { cartItems: updatedCartItems };
      } else {
        // Item does not exist, add it
        return {
          cartItems: [
            ...state.cartItems,
            {
              ...item,
              quantity: 1,
            },
          ],
        };
      }
    }),

  // Decrement item quantity
  decrementItem: (item: cartItems) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (i: any) => i.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const currentItem = updatedCartItems[existingItemIndex];

        if (currentItem.quantity > 1) {
          // Decrease quantity
          updatedCartItems[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
        } else {
          // Remove item if quantity reaches 0 or less
          updatedCartItems.splice(existingItemIndex, 1);
        }

        return { cartItems: updatedCartItems };
      }

      return state;
    }),

  // Remove item completely
  removeItem: (item: cartItems) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (i: any) => i.id !== item.id
      );
      return { cartItems: updatedCartItems };
    }),
}));
