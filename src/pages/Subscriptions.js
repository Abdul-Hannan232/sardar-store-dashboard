import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import SubscriptionTable from "../components/subscription/SubscriptionTable";
import SubscriptionServices from "../services/SubscriptionServices";
import { SidebarContext } from "../context/SidebarContext";

const Subscriptions = () => {

     const { data, loading } = useAsync(SubscriptionServices.getAllSubscriptions);

  const {
    subscriptionRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    subscriptionType,
    setSubscriptionType,
    handleSubmiSubscription,
  } = useFilter(data);

  return (
    <>
      <PageTitle>Subscriptions</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmiSubscription}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={subscriptionRef}
                value={subscriptionType}
                onChange={(e) => setSubscriptionType(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by email/status"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
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
                <TableCell>ID</TableCell>
                <TableCell>JOINING DATE</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell  >SET STATUS</TableCell>
                <TableCell className="text-center">ACTIONS</TableCell>
              </tr>
            </TableHeader>
            <SubscriptionTable subscriptions={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Subscriptions" />
      )}
    </>
  );
};

export default Subscriptions;
