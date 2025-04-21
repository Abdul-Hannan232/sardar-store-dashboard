import { Scrollbars } from "react-custom-scrollbars-2";
import Error from "../form/Error";
import Title from "../form/Title";
import InputArea from "../form/InputArea";
import LabelArea from "../form/LabelArea";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useAppPromotionSubmit from "../../hooks/useAppPromotionSubmit";
// import { BsToggleOff, BsToggleOn } from "react-icons/bs";
// import {  useState } from "react";

const AppPromoDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useAppPromotionSubmit(id);
// const [status,setStatus]= useState("Show")


//   const handleChangeStatus = (id) => {
//     let newStatus;
//     if (status === "Show") {
//       newStatus = "Hide";
//     } else {
//       newStatus = "Show";
//     }
//     setStatus(newStatus);
    
// }


// console.log(id , " ++");

  return (
    <>
      <div className="w-full relative p-6  border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Promo Banner"
            description="Updated your Product category and necessary information from here"
          />
        ) : (
          <Title
            title="Add Promo Banner"
            description=" Add your Product category and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Promo Banner Icon" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Promo Banner Title" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Promo Banner title"
                  name="title"
                  defaultValue=""
                  type="text"
                  placeholder="Enter title"
                />
                <Error errorName={errors.type} />
              </div>
            </div>

            {/* Start Date */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Start Date" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Start Date"
                  name="startDate"
                  type="datetime-local"
                  placeholder="Select start date"
                />
                <Error errorName={errors.startDate} />
              </div>
            </div>

            {/* End Date */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="End Date" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="End Date"
                  name="endingDate"
                  type="datetime-local"
                  placeholder="Select end date"
                />
                <Error errorName={errors.endingDate} />
              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="App Store URL" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="App Store URL"
                  name="app_store_url"
                  defaultValue=""
                  required={true}
                  type="text"
                  placeholder="Enter App Store URL"
                />
                <Error errorName={errors.app_store_url} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Play Store URL" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Play Store URL"
                  name="play_store_url"
                  defaultValue=""
                  required={true}
                  type="text"
                  placeholder="Enter Play Store URL"
                />
                <Error errorName={errors.play_store_url} />
              </div>
            </div>

            
          </div>

          <DrawerButton id={id} title="Promo Banner" />
        </form>
      </Scrollbars>
    </>
  );
};

export default AppPromoDrawer;
