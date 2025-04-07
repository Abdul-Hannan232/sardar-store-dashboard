import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Select, Textarea } from "@windmill/react-ui";
import ReactTagInput from "@pathofdev/react-tag-input";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import DrawerButton from "../form/DrawerButton";
import ChildrenCategory from "../category/ChildrenCategory";
import useProductSubmit from "../../hooks/useProductSubmit";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";
import ProductImgUploader from "../image-uploader/ProductImgUploader";

const ProductDrawer = ({ id }) => {
  const {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  } = useProductSubmit(id);

  const { data } = useAsync(CategoryServices.getAllCategory);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Product"
            description="Update your product and necessary information from here"
          />
        ) : (
          <Title
            title="Add Product"
            description="Add your product and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Image" />
              <div className="col-span-8 sm:col-span-4">
                <ProductImgUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Name"
                  name="title"
                  type="text"
                  placeholder="Enter Name"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="parent"
                  {...register("parent", {
                    required: "Product parent category is required!",
                  })}
                >
                  <option value="" hidden>
                    Select category
                  </option>
                  {data?.map((category) => (
                    <option key={`${category.id}`} value={category.name}>
                      {category?.name}
                    </option>
                  ))}
                </Select>
                <Error errorName={errors.parent} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Child Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="children"
                  {...register("children", {
                    required: "Product children category is required!",
                  })}
                  value={watch("children") || ""} // Ensure it's never null
                >
                  {!id && (
                    <option value="" hidden>
                      Select child category
                    </option>
                  )}
                  <ChildrenCategory value={watch("parent")} />
                </Select>
                <Error errorName={errors.children} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  label="price (pkr)"
                  name="price"
                  type="number"
                  {...register("price", {
                    required: "Price in PKR is required!",
                  })}
                  placeholder="Price in PKR"
                  value={watch("price") || ""} // Ensure it's never null
                />
                <Error errorName={errors.price} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Price ($)" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  label="Price in ($)"
                  required={true}
                  name="price_usd"
                  type="number"
                  placeholder="Price in Dollar ($)"
                  // value={watch("price_usd") || ""} // Ensure it's never null
                  value={watch("price_usd") || ""} // Ensure it's never null
                />
                <Error errorName={errors.price_usd} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Promotion Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  label="Promotion price in PKR"
                  name="promo_price_pkr"
                  type="number"
                  placeholder="Promotion Price in PKR"
                  value={watch("promo_price_pkr") || ""} // Ensure it's never null
                />
                <Error errorName={errors.promo_price_pkr} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Promotion Price ($)" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  required={true}
                  label="Promotion Price ($)"
                  name="promo_price_usd"
                  type="number"
                  placeholder="Promotion Price in Dollar ($)"
                  value={watch("promo_price_usd") || ""} // Ensure it's never null
                />
                <Error errorName={errors.promo_price_usd} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Stock" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  label="Stock"
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  value={watch("stock") || ""} // Ensure it's never null
                />
                <Error errorName={errors.stock} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Details" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: "Description is required!",
                    minLength: {
                      value: 20,
                      message: "Minimum 20 character!",
                    },
                  })}
                  name="description"
                  placeholder="Product details"
                  rows="4"
                  spellCheck="false"
                  value={watch("description") || ""} // Ensure it's never null
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Tags" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Product Tag (Write then press enter to add new tag)"
                  tags={tag}
                  onChange={(newTags) => setTag(newTags)}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Product" />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);

