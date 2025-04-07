import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import BannerServices from "../services/BannerServices";
import dayjs from "dayjs";

const useBannerSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ title, startDate, endingDate, isVisible }) => {
    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }

    /////// validate Date

    const start = new Date(startDate);
    const end = new Date(endingDate);

    if (start >= end) {
      notifyError("Start date must be earlier than end date");
      return;
    }


    /////// end validate Date

    const bannerData = {
      title: title,
      startDate: startDate,
      endingDate: endingDate,
      isVisible: isVisible,
      image: imageUrl,
    };

     if (id) {
      BannerServices.updateBanner(id, bannerData)
        .then((res) => {

          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      BannerServices.addBanner(bannerData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
   
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("title");
      setValue("startDate");
      setValue("endingDate");
      // setValue("isVisible");
      setImageUrl("");
      clearErrors("title");
      clearErrors("startDate");
      clearErrors("endingDate");
      clearErrors("isVisible");
      return;
    }
    if (id) {
      console.log("hello");
      
      BannerServices.getBannerById(id)
    
        .then((res) => {
          if (res) {
            console.log(res.startDate);
            
            const formattedStart = dayjs(res?.startDate).format("YYYY-MM-DDTHH:mm");
            const formattedEnd = dayjs(res?.endingDate).format("YYYY-MM-DDTHH:mm");
                      
            setValue("startDate", formattedStart);
            setValue("endingDate", formattedEnd);
            setValue("title",res.title);
                       setValue("isVisible",res.isVisible);
            setImageUrl(res.image);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setValue,
    setImageUrl,
  };
};

export default useBannerSubmit;

