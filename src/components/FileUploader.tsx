import Dropzone from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage, uploadVanImage } from "../api";
import { useEffect, useState } from "react";

const FileUploader = ({
  handleImageUpload,
  uploadTo,
}: {
  handleImageUpload: (imageUrl: string) => void;
  uploadTo: "profile" | "van";
}) => {
  // Mutation hook
  const { data, mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["uploadProfileOrVanImage"],
    mutationFn: (image: File) =>
      uploadTo === "profile"
        ? uploadProfileImage(image)
        : uploadVanImage(image),
  });
  // State declarations
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      handleImageUpload(data.data.imageUrl ?? "");
    }

    if (isError) {
      setErrorMessage(error.message);
    }
  }, [data, error, handleImageUpload, isError, isSuccess]);

  return (
    <Dropzone
      maxFiles={1}
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".svg"] }}
      onDropAccepted={(acceptedFiles) => mutate(acceptedFiles[0])}
      onDropRejected={(rejectedFiles) =>
        console.log("On Drop Rejected: ", rejectedFiles)
      }
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ className: "cursor-pointer" })}>
            <label htmlFor="profile-image">Image</label>
            <input {...getInputProps({ id: "profile-image" })} />
            {isPending ? (
              <div className="p-5 size-48 flex flex-1 justify-start items-center w-full">
                <img
                  src={"/icons/loader.svg"}
                  alt="Loader"
                  className="object-fit object-top"
                />
              </div>
            ) : isSuccess ? (
              <div className="p-5 space-y-4 shadow rounded-md">
                <div className="flex flex-1 justify-start w-full">
                  <img
                    src={data.data.imageUrl}
                    alt="Uploaded image"
                    className="size-40 rounded-[24px] object-fit object-top"
                  />
                </div>
                <p className="file_uploader-label">
                  Click or drop photo to replace.
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-start space-y-4 flex-col p-5 shadow rounded-md">
                <img
                  src="/icons/file-upload.svg"
                  alt="Upload file"
                  width={60}
                  height={60}
                />
                <h3 className="">Drag photo here</h3>
                <p className="">SVG, PNG, JPG</p>
                <button
                  type="button"
                  title="Select from computer"
                  className="bg-[#FF8C38] w-fit rounded-md p-2 text-base font-bold text-white hover:outline outline-2 outline-[#FF8C38] transition"
                >
                  Select from computer
                </button>
                {isError && (
                  <p className="font-semibold text-red-500 text-sm">
                    {errorMessage}, please try again.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
