import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

import OrderServices from "../../services/OrderServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
import SubscriptionServices from "../../services/SubscriptionServices";
import UserServices from "../../services/UserServices";

const SelectStatus = ({ id, order, component }) => {
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = (id, status) => {
    OrderServices.updateOrder(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };


  const handleChangeSubscriptionStatus = (id, status) => {
    SubscriptionServices.updateSubscriptionStatus(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  const handleChangeUserStatus = (id, status) => {
    UserServices.updateUserStatus(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  
  return (
    <>
      {component === "subscription" ? (
        <Select
          onChange={(e) => handleChangeSubscriptionStatus(id, e.target.value)}
          className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
        >
          {/* <option value="status" defaultValue hidden> */}
          <option value="status" hidden>
            {order?.status}
          </option>
          <option defaultValue={order?.status === "active"} value="active">
            Active
          </option>
          <option defaultValue={order?.status === "expired"} value="expired">
            Expired
          </option>
          <option defaultValue={order?.status === "canceled"} value="canceled">
            Cancel
          </option>
        </Select>
      ):component === "customer" ? (
          <Select
          onChange={(e) => handleChangeUserStatus(id, e.target.value)}
          className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
        >
          {/* <option value="status" defaultValue hidden> */}
          <option value="status" hidden>
            {order?.status}
          </option>
          <option defaultValue={order?.status === "active"} value="active">
            Active
          </option>
          <option defaultValue={order?.status === "block"} value="block">
            Block
          </option>
         
        </Select>
      ) : (
        <Select
          onChange={(e) => handleChangeStatus(id, e.target.value)}
          className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
        >
          {/* <option value="status" defaultValue hidden> */}
          <option value="status" hidden>
            {order?.status}
          </option>
          <option
            defaultValue={order?.status === "Delivered"}
            value="Delivered"
          >
            Delivered
          </option>
          <option defaultValue={order?.status === "Pending"} value="Pending">
            Pending
          </option>
          <option
            defaultValue={order?.status === "Processing"}
            value="Processing"
          >
            Processing
          </option>
          <option defaultValue={order?.status === "Cancel"} value="Cancel">
            Cancel
          </option>
        </Select>
      )}
    </>
  );
};

export default SelectStatus;
