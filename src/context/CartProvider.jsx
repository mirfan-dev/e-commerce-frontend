import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import UserContext from "./user.context";
import {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
} from "../services/cart.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CartProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [heading, setHeading] = useState("Initial value");
   const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (isLogin) {
      loadUserCart(userData.user.userId);
    } else {
      setCart(null);
    }
  }, [isLogin]);

  const loadUserCart = async (userId) => {
    try {
      const data = await getCartByUserId(userId);
      console.log(data);
      setCart({
        ...data,
      });
    } catch (error) {
      console.log(error);
      setCart({ items: [] });
    }
  };

  // add item to cart
  const addItem = async (quantity, productId, next) => {
    try {
      if (!isLogin) {
       

        MySwal.fire({
          title: "Not Logged In",
          html: `
      <div class="alert alert-danger border-0">
        Please do login to add items to cart
      </div>
    `,
          icon: "error",
        });

        return;
      }
      const result = await addItemToCart(
        userData.user.userId,
        productId,
        quantity,
      );
      setCart({ ...result });
      if (next) {
        next();
      }
    } catch (error) {
      console.log(error);
      toast.error("error in add product in cart");
    }
  };

  // remove item to cart
  const removeItem = async (itemId) => {
    try {
      await removeItemFromCart(userData.user.userId, itemId);

      const newCartItems = cart.items.filter(
        (item) => item.cartItemId !== itemId,
      );

      setCart({
        ...cart,
        items: newCartItems,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
