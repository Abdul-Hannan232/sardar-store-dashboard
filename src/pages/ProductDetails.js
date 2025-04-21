import { Badge } from "@windmill/react-ui";
import React from "react";
import { useParams } from "react-router";

import useAsync from "../hooks/useAsync";
import MainDrawer from "../components/drawer/MainDrawer";
import useToggleDrawer from "../hooks/useToggleDrawer";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import ProductServices from "../services/ProductServices";
import ProductDrawer from "../components/drawer/ProductDrawer";

const ProductDetails = () => {
  const { id } = useParams();
  const { handleUpdate } = useToggleDrawer();
  const { data, loading } = useAsync(() => ProductServices.getProductById(id));
  // console.log("🚀 ~ ProductDetails ~ data:", data)

  return (
    <>
      <MainDrawer>
        <ProductDrawer id={id} />
      </MainDrawer>

      <PageTitle>Product Details</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-center h-auto">
              {data.image && data.image !== "" ? (
                <img
                  // src={data.image}
                  src={data.image.replace("5055","4000")}
                  alt=""
                  // alt={data.title}
                  className="w-48  max-h-48 md:w-40  p-2"
                />
              ) : (
                <>
                  <aside className="flex md:flex-col flex-wrap mt-4 items-center justify-center">
                    {JSON.parse(data.gallery).map((file, i) => (
                      <img
                        className="w-48  max-h-48 md:w-40 md:max-h-40 p-2"
                        key={i}
                        // src={file}
                        src={file.replace("5055","4000")}
                        alt=""
                      />
                    ))}
                  </aside>
                </>
              )}
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="mb-5 block ">
                <div className="font-serif font-semibold py-1 text-sm">
                  <p className="text-sm text-gray-500 pr-4">
                    Status:{" "}
                    {data.status === "Show" ? (
                      <span className="base-color">This product Showing</span>
                    ) : (
                      <span className="text-red-400"> This product Hidden</span>
                    )}
                  </p>
                </div>
                <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif dark:text-gray-400">
                  {data.title}
                </h2>
                <p className="uppercase font-serif font-medium text-gray-500 dark:text-gray-400 text-sm">
                  SKU :{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {/* {data.id !== undefined && data.id.substring(18, 24)} */}
                    {data.id !== undefined && data.id}
                  </span>
                </p>
              </div>
              <div className="font-serif product-price font-bold dark:text-gray-400">
                <span className="inline-block text-2xl">
                  Rs {data?.promo_price_pkr ? data.promo_price_pkr : data?.price}
                  {data.promo_price_pkr > 0  && (
                    <del className="text-gray-400 dark:text-gray-500 text-lg pl-2">
                      Rs {data.price}
                    </del>
                  )}
                  {/* {data.discount >= 1 && (
                    <del className="text-gray-400 dark:text-gray-500 text-lg pl-2">
                      ${data.originalPrice}
                    </del>
                  )} */}
                </span>
              </div>
              <div className="mb-3">
                {data.stock <= 0 ? (
                  <Badge type="danger">
                    <span className="font-bold">Stock Out</span>{" "}
                  </Badge>
                ) : (
                  <Badge type="success">
                    {" "}
                    <span className="font-bold base-color">In Stock</span>
                  </Badge>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium pl-4">
                  Quantity: {data.stock}
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                {data.description}
              </p>
              <div className="flex flex-col mt-4">
                <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Category:{" "}
                  </span>{" "}
                  {data.children}
                </p>
                <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Brand:{" "}
                  </span>{" "}
                  {data.brand || "No Brand"}
                </p>
                <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Delivery:{" "}
                  </span>{" "}
                  {data.delivery >0 ?"Rs " +data.delivery  : "Free Delivery"}
                </p>
                <div className="flex flex-row">
                  {JSON.parse(data?.tag).map((t, i) => (
                    <span
                      key={i + 1}
                      className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(id)}
                  className="cursor-pointer leading-5  duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-color  border border-transparent  focus:ring focus:ring-purple-300"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
