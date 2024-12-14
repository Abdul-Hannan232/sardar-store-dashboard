import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";
import useAsync from "./useAsync";
import CategoryServices from "../services/CategoryServices";

const useProductSubmit = (id, type) => {
  // const { data, loading } = useAsync(CategoryServices.getAllCategory);
  const { data} = useAsync(CategoryServices.getAllCategory);

  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

// console.log('---------- imageUrl', imageUrl);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {

    const result = data.find((parent) =>
      formData?.parent?.toLowerCase() === parent.name.toLowerCase()
       
    );

    // console.log('result ', result);

    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }
   
    // console.log('imageUrl', imageUrl);
    const productData = {
      title: formData.title,
      description: formData.description,
      parent: formData.parent,
      children: formData.children,
      price: formData.price,
      gallery: imageUrl.length > 1 ? JSON.stringify(imageUrl) : '[]',
      image: imageUrl.length === 1 ? imageUrl[0] : '',
      // image: typeof imageUrl === 'string' ? imageUrl : '',
      // image: imageUrl.length === 1 ? imageUrl[0] : '',
      tag: JSON.stringify(tag),
      stock: formData.stock,
      category_id: result.id,
    };
    // console.log(productData);

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          // console.log('addProduct ',res.reqz);
          
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  if (id && type) {
    ProductServices.getProductsByCategory(id)
      .then((res) => {
        if (res) {
          // setValue("sku", res.sku);
          setValue("title", res.title);
          // setValue("slug", res.slug);
          setValue("description", res.description);
          setValue("parent", res.parent);
          setValue("children", res.children);
          // setValue("type", res.type);
          setValue("unit", res.unit);
          // setValue("quantity", res.quantity);
          setValue("originalPrice", res.price);
          setValue("salePrice", res.price);
          setTag(JSON.parse(res.tag));
          setImageUrl(res.image ? res.image : res.gallery);
        
        }
      })
      .catch((err) => {
        notifyError("There is a server error!");
      });
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("sku");
      setValue("title");
      setValue("slug");
      setValue("description");
      setValue("parent");
      setValue("children");
      setValue("type");
      setValue("unit");
      setValue("quantity");
      setValue("originalPrice");
      setValue("salePrice");
      setValue("stock");
      setValue("price");
      setImageUrl("");
      setChildren("");
      setTag([]);
      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("parent");
      clearErrors("children");
      clearErrors("type");
      clearErrors("unit");
      clearErrors("quantity");
      clearErrors("originalPrice");
      clearErrors("salePrice");
      clearErrors("tax1");
      clearErrors("tax2");
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          // console.log('price-------- ', res.children);
          if (res) {
            setValue("sku", res.sku);
            setValue("title", res.title);
            setValue("slug", res.slug);
            setValue("description", res.description);
            setValue("parent", res.parent);
            setValue("children", res.children);
            setValue("type", res.type);
            setValue("unit", res.unit);
            setValue("quantity", res.quantity);
            // setValue("originalPrice", res.originalPrice);
            // setValue("salePrice", res.price);
            setValue("stock", res.stock);
            setValue("price", res.price);
            setTag(JSON.parse(res.tag));
            setImageUrl(res.image ? [ res.image] : JSON.parse(res.gallery));
            setTitle(res.title);
            // setStock(res.stock);
            // setPrice(res.price)
            
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
    title,
    setTitle,
    stock,
    setStock,
    price,
    setPrice
  };
};

export default useProductSubmit;