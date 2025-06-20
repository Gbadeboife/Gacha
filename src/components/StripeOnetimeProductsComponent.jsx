
  import React, { useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import { tokenExpireError } from "../authContext";

const StripeOnetimeProductsComponent = () => {
  const sdk = new MkdSDK();
  const { dispatch, state } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [productsList, setProductsList] = useState([]);

  const checkout = async ({ priceId, priceCurrency, priceStripeId, priceName, productName, quantity = 1 }) => {
    let params = {
      success_url: `${sdk.fe_baseurl}/user/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${sdk.fe_baseurl}/user/checkout?success=false&session_id={CHECKOUT_SESSION_ID}`,
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Shipping fees",
            fixed_amount: {
              currency: priceCurrency,
              amount: 500,
            },
          },
        },
      ],
      locale: "en",
      line_items: [
        {
          price: priceStripeId,
          quantity,
        },
      ],
      phone_number_collection: {
        enabled: false,
      },
      payment_intent_data: {
        metadata: {
          app_price_id: priceId,
          app_product_name: priceName,
          app_highlevel_product_name: productName,
          is_order: "true",
        },
      },
    };

    try {
      const { error, model: checkout, message } = await sdk.initCheckoutSession(params);
      if (error) {
        showToast(globalDispatch, message);
        return;
      }
      if (checkout?.url) location.href = checkout.url;
    } catch (error) {
      console.error("Error", error);
      showToast(globalDispatch, error.message, 7500);
      tokenExpireError(dispatch, error.code);
    }
  };

  const fetchOnetimeProducts = async () => {
    try {
      const data = await sdk.getStripePrices({ limit: "all" }, { type: "one_time" });
      if (data.error) {
        showToast(globalDispatch, data.message, 7500);
        return;
      }
      setProductsList(data.list);
    } catch (error) {
      showToast(globalDispatch, error.message, 7500);
      tokenExpireError(dispatch, error.code);
    }
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "billing",
      },
    });

    fetchOnetimeProducts();
  }, []);
  return (
    <div className="bg-white rounded p-5 shadow-lg my-4">
      <h2 className="font-medium leading-tight text-2xl mt-0 text-black mb-3">Products</h2>

      <div className="container py-5 flex flex-wrap">
        {productsList.map((product, index) => {
          return (
            <div className="flex justify-center border mx-1" key={index}>
              <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <div className="">
                  <img
                    className="mx-auto rounded-t-lg object-cover max-h-60"
                    src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_large.png?format=jpg&quality=90&v=1530129292"
                    alt=""
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-gray-900 text-2xl font-medium mb-2">{product.product_name}</h3>
                  <h5 className="text-xl font-medium mb-2 text-slate-500">{product.name}</h5>
                  <p className="text-gray-700 text-base mb-4">${+product.amount}</p>
                  <button
                    onClick={() =>
                      checkout({
                        priceId: product.id,
                        priceName: product.name,
                        productName: product.product_name,
                        priceStripeId: product.stripe_id,
                        priceCurrency: product.currency,
                      })
                    }
                    type="button"
                    className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StripeOnetimeProductsComponent;

  