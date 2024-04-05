export const ShoppingCart = () => {
  const handleCheckout = () => {
    fetch("http://localhost:3000/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e: any) => {
        console.error(e.error);
      });
  };
  return <button onClick={handleCheckout}>Checkout</button>;
};
