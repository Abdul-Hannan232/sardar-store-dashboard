import React from 'react';
import { TableCell, TableBody, TableRow, Avatar } from '@windmill/react-ui';

const Invoice = ({ data }) => {

  /////////// handle null\]

// console.log('>>>>>>>>>>>>>>>> data ', data);

  if (!data.items || !Array.isArray(data.items)) {
    // console.log(data.items);
    return (
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">

        <TableRow className="dark:border-gray-700 dark:text-gray-400">
          <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            No data available
          </TableCell></TableRow></TableBody>
    )
  }
  return (
    <>
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
        {data?.items?.map((item, i) => (
          <TableRow key={i} className="dark:border-gray-700 dark:text-gray-400">
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
              {i + 1}{' '}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            {item.productDetails.image  && item.productDetails.image !== '' ?  (
                
                <Avatar
                 size="large"
                  className="hidden  mr-2 md:block bg-gray-50 shadow-none"
                  src={item.productDetails.image}
                  alt={item.productDetails.title}
                />) : ( <Avatar
                size="large"
                 className="hidden  mr-2 md:block bg-gray-50 shadow-none"
                //  src={JSON.parse(product.gallery)[0].replace('4000', '5055')}
                 src={JSON.parse(item?.productDetails.gallery)[0]}
                 alt={item.productDetails.title}
               />
              )}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
              {item.productDetails.title}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.quantity}{' '}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              ${item.productDetails.price}.00{' '}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap text-center font-bold text-red-500 dark:text-green-500">
              ${item.quantity * item.productDetails.price}.00
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default Invoice;
