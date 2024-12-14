import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = ({ setImageUrl, imageUrl }) => {
  
  const [files, setFiles] = useState([]);
  const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL;
  // const upload_Preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  // console.log('>>>>>>>>>>>>>> ', uploadUrl);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    maxSize: 500000,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    // const uploadURL = uploadUrl;
    // const uploadPreset = upload_Preset;
    if (files) {
      files.forEach((file) => {
        
        const formData = new FormData();
        formData.append("file", file);

        // for (let pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }

        axios({
          url: uploadUrl,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            // const correctedImageUrl = res.data.image.replace("5055", "4000");
            // console.log(res.data.image);
            // setImageUrl(correctedImageUrl);
            setImageUrl(res.data.image);
            // console.log('00000000',res.data.image);
          })
          .catch((err) => console.log(err));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, uploadUrl, setImageUrl]);

  // const thumbs = files.map((file) => (
  //   <div key={file.name}>
  //     <div>
  //       <img
  //         className="inline-flex  border-2 border-gray-100 w-24 max-h-24"
  //         src={file.preview}
  //         alt={file.name}
  //       />
  //     </div>
  //   </div>
  // ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="w-full text-center">
      <div
        className="px-6 pt-5 pb-6 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
        // className="px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl base-color" />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-gray-400">
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>
      <aside className="flex flex-row flex-wrap mt-4">
        {imageUrl && (
        <>
          <img
            className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
            // src={
            //   imageUrl.startsWith("http")
            //     ? imageUrl
            //     : `http://localhost:5055/upload/${imageUrl}`
            // }
            // src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:4000/upload/${imageUrl}`}
            src={imageUrl.replace("5055", "4000")}
            // src={imageUrl}
            alt="Uploaded pic"
          />
          {/* {console.log('00000000000 ',imageUrl)} */}
        </>
        )}
      </aside>
    </div>
  );
};

export default Uploader;





// import React, { useState } from "react";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";

// const Uploader = ({ setImageUrl, imageUrl }) => {
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     multiple: false,
//     maxSize: 500000,
//     onDrop: async (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         const formData = new FormData();
//         formData.append("icon", file);

//         const previewUrl = URL.createObjectURL(file);
//         setImagePreviewUrl(previewUrl);

//         // Debugging: Check if formData has the file
//         for (let pair of formData.entries()) {
//           console.log(`${pair[0]}: ${pair[1]}`);
//         }


//         setImageUrl(formData)
//         // try {
//         //   const response = await axios.post("http://localhost:4000/upload", formData, {
//         //     headers: {
//         //       "Content-Type": "multipart/form-data",
//         //     },
//         //   });

//         //   if (response.data && response.data.imageUrl) {
//         //     setImageUrl(response.data.imageUrl);
//         //   }
//         // } catch (error) {
//         //   console.error("Error uploading the image:", error);
//         // }
//       }
//     },
//   });

//   return (
//     <div className="w-full text-center">
//       <div
//         className="px-6 pt-5 pb-6 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
//         {...getRootProps()}
//       >
//         <input {...getInputProps()} />
//         <span className="mx-auto flex justify-center">
//           <FiUploadCloud className="text-3xl base-color" />
//         </span>
//         <p className="text-sm mt-2">Drag your image here</p>
//         <em className="text-xs text-gray-400">
//           (Only *.jpeg and *.png images will be accepted)
//         </em>
//       </div>
//       <aside className="flex flex-row flex-wrap mt-4">
//       {imagePreviewUrl && (
//           <img
//             className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
//             src={imagePreviewUrl}
//             alt="Preview"
//           />
//         )}
//       </aside>
//     </div>
//   );
// };

// export default Uploader;