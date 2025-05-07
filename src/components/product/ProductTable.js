import React from "react";
import { Link } from "react-router-dom";
import {
  TableCell,
  TableBody,
  TableRow,
  // Badge,
  Avatar,
} from "@windmill/react-ui";
import { FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ProductDrawer from "../drawer/ProductDrawer";
import ShowHideButton from "../table/ShowHideButton";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { RxCaretDown } from "react-icons/rx";

const ProductTable = ({ products }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "....";
    } else {
      return text;
    }
  }

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {/* {console.log(products)} */}
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            {/* {console.log(`''''''''''''''''''' '`, product.title , JSON.parse(product.gallery)[0])} */}
            {/* <TableCell>
              <span className="text-xs uppercase font-semibold">
                {' '}
                {product.id}
              </span>
            </TableCell> */}
            <TableCell>
              <span className="text-xs capitalize font-semibold">
                {" "}
                {product.productCode}
              </span>
            </TableCell>

            <TableCell>
              <span
                title={product.title}
                className="text-xs capitalize font-semibold"
              >
                {" "}
                {product.title.length > 20
                  ? `${product.title.substring(0, 20)}...`
                  : product.title}
              </span>
            </TableCell>
            {/* {console.log('ffffffffffffff',product)
                } */}
            <TableCell>
              <div className="flex items-center">
                {product.image && product.image !== "" ? (
                  <Avatar
                    size="large"
                    className="hidden  mr-2 md:block bg-gray-50 shadow-none"
                    // src={product.image}
                    src={product.image.replace("5055", "4000")}
                    alt={product.title}
                  />
                ) : (
                  <Avatar
                    size="large"
                    className="hidden  mr-2 md:block bg-gray-50 shadow-none"
                    src={JSON.parse(product.gallery)[0].replace("5055", "4000")}
                    //  src={JSON.parse(product.gallery)[0]}
                    alt={product.title}
                  />
                )}
                {/* <div>
                  <h2 className="text-sm font-medium">{product.title}</h2>
                </div> */}
              </div>
            </TableCell>
            {/* <TableCell>
              <span className="text-sm">{product.parent}</span>
            </TableCell> */}

            <TableCell>
              <span className="text-sm font-semibold">
                {product.price || "-"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {product.promo_price_pkr || "-"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {product.delivery ? "Rs " + product.delivery : "Free Delivery"}
              </span>
            </TableCell>
           

            <TableCell>
              {JSON.parse(product.variations) &&
              JSON.parse(product.variations).length > 0 ? (
                <div className="relative  ">
                  <select className="block   rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500 appearance-none ">
                    {JSON.parse(product.variations)
                      .sort((a, b) => {
                        const priceA = a.promo_price_pkr || a.price;
                        const priceB = b.promo_price_pkr || b.price;
                        return priceA - priceB; 
                      })
                      .map((v, i) => (
                        <option key={i} value={v.size}>
                          {v.size} ({v.stock}) - (Rs{" "}
                          {v.promo_price_pkr
                            ? `${v.promo_price_pkr} - Rs ${v.price}`
                            : v.price}
                          )
                        </option>
                      ))}
                  </select>
                  <div className="absolute h-full text-2xl inset-y-0 right-0 pr-2 flex items-center justify-center pointer-events-none">
                    <RxCaretDown className="text-gray-400 w-full" />
                  </div>
                </div>
              ) : (
                <p className="w-full text-center">-</p>
              )}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {product.brand || "No Brand"}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-xs capitalize font-semibold">
                {" "}
                {truncateText(product.description, 16)}
              </span>
            </TableCell>

            {/* <TableCell>
              <span className="text-sm">{product.quantity}</span>
            </TableCell> */}

            {/* <TableCell>
              {product.quantity > 0 ? (
                <Badge type="success">Selling</Badge>
              ) : (
                <Badge type="danger">Sold Out</Badge>
              )}
            </TableCell> */}

            {/* <TableCell>
              <span className="text-sm font-semibold">
                {product.discount !== 0 && (
                  <span>{product.discount.toFixed(0)}% Off</span>
                )}
              </span>
            </TableCell> */}
            {/* <TableCell>
              <Link
                to={`/product/${product.id}`}
                className="flex justify-center text-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="details"
                  Icon={FiZoomIn}
                  title="Details"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell> */}
            <TableCell>
              {product.tag
                .slice(1, product.tag.length - 1)
                .split(",")
                .map((t, i) => {
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mx-1"
                    >
                      {t.slice(1, t.length - 1)}
                    </span>
                  );
                })}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{product.stock}</span>
            </TableCell>

            <TableCell>
              <Link
                to={`/product/${product.id}`}
                className="flex justify-center text-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="details"
                  Icon={FiZoomIn}
                  title="Details"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <ShowHideButton id={product.id} status={product.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={product.id}
                title={product.title}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ProductTable);
