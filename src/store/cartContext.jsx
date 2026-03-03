import { createContext, useReducer, useEffect, useContext } from "react";
import AuthContext from "./auth.context";

const getInitialCart = (userId) => {
  if(!userId) {
    console.warn('getInitialCart called without userId');
    return [];
  }
  try {
    const cartKey = `cart_${userId}`;
    const storedCart = localStorage.getItem(cartKey);
    console.log(`Loading cart for ${userId} from key ${cartKey}`, storedCart);
    
    if (!storedCart) return [];
    
    const parsed = JSON.parse(storedCart);
    if (!Array.isArray(parsed)) {
      console.error('Invalid cart format - not an array:', parsed);
      return [];
    }
    return parsed;
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADDITEM":
      const existAdd = state.find(item => item.id === action.payload.id);
      return existAdd
        ? state.map(item =>
            item.id === action.payload.id 
              ? {...item, qty: item.qty + 1} 
              : item
          )
        : [...state, {...action.payload, qty: 1}];

    case "DELITEM":
      const existDel = state.find(item => item.id === action.payload.id);
      if (existDel.qty === 1) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return state.map(item =>
        item.id === action.payload.id 
          ? {...item, qty: item.qty - 1} 
          : item
      );

    case "SETCART":
      return action.payload;

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const [cart, dispatch] = useReducer(cartReducer, [], () => getInitialCart(authCtx.userId));

  // Save cart to localStorage
  useEffect(() => {
    if (authCtx.userId && cart.length > 0) {
      const cartKey = `cart_${authCtx.userId}`;
      console.log('Saving cart to', cartKey, cart);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, authCtx.userId]);

  // Handle user changes
  useEffect(() => {
    console.log('User changed to:', authCtx.userId);
    if(authCtx.userId) {
      const timer = setTimeout(() => {
        const loadedCart = getInitialCart(authCtx.userId);
        console.log('Loaded cart for user:', loadedCart);
        dispatch({ type: "SETCART", payload: loadedCart });
      }, 500); // Increased delay to ensure all processes complete
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: "SETCART", payload: [] });
    }
  }, [authCtx.userId]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};