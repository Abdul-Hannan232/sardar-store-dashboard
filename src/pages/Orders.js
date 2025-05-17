import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import OrderServices from "../services/OrderServices";
import Loading from "../components/preloader/Loading";
import OrderTable from "../components/order/OrderTable";
import { SidebarContext } from "../context/SidebarContext";
const Orders = () => {
  const {
    time,
    currentPage,
    status,
    searchText,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    OrderServices.getAllOrders({
      contact: searchText,
      status,
      page: currentPage,
      limit: resultsPerPage,
      day: time,
    })
  );

  const { dataTable, serviceData } = useFilter(data.orders);

  // console.log('>>>>>>>>>>>>. dataTable', dataTable)

  const totalSum = dataTable?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  return (
    <>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 justify-between grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <h1 className="text-slate-600 text-2xl font-bold">Orders</h1>
            <h1 className="base-color text-xl font-bold">
              Total Value: ${totalSum}
            </h1>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ORDER NUMBER</TableCell>
                <TableCell>PRODUCTS</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CUSTOMER Phone</TableCell>
                <TableCell>CUSTOMER EMAIL</TableCell>
                <TableCell className="text-center">STATUS</TableCell>
                <TableCell className="text-center">SET STATUS</TableCell>
                <TableCell className="text-center">View</TableCell>
                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={8}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Order" />
      )}
    </>
  );
};

export default Orders;
