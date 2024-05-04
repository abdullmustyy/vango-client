import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MyTextArea, MyTextInput } from "../FormItems";
import { Form, Formik, FormikHelpers } from "formik";
import { initialCreateVanValues } from "@/utils/constants/van.constant";
import { createVanSchema } from "@/utils/validations/van.validation";
import FileUploader from "../FileUploader";
import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setVanImageUrl } from "@/state/vansSlice";
import { useMutation } from "@tanstack/react-query";
import { createVan } from "@/api";
import { ICreateVanValues, TCreateVan } from "@/utils/interfaces/van.interface";
import { localStorageAuthValues } from "@/utils/auth.util";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "@/components/ui/dialog";

export function CreateVan() {
  const { vanImageUrl } = useAppSelector((state) => state.vans);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate } = useMutation({
    mutationKey: ["createVan"],
    mutationFn: (van: TCreateVan) => createVan(van),
  });

  const handleImageUpload = useCallback(
    (vanImageUrl: string) => {
      dispatch(setVanImageUrl(vanImageUrl));
    },
    [dispatch]
  );

  const handleCreateVan = useCallback(
    (
      { name, description, price, type }: ICreateVanValues,
      { resetForm, setSubmitting }: FormikHelpers<ICreateVanValues>
    ) => {
      try {
        const { userId } = localStorageAuthValues();

        mutate(
          {
            name,
            description,
            price,
            type,
            imageUrl: vanImageUrl,
            hostId: userId ?? "",
          },
          {
            onSettled(_, error) {
              if (error) {
                toast({
                  message: error.message,
                });
              }

              setSubmitting(false);
            },
            onSuccess() {
              resetForm();

              toast({
                message: "Van created successfully",
                variant: "success",
              });

              buttonRef.current?.click();
            },
          }
        );
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({
          message: errorMessage,
        });
      }
    },
    [buttonRef, mutate, toast, vanImageUrl]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          title="Create Van"
          className=" bg-[#FF8C38] rounded-md p-2 text-base font-bold text-white hover:outline outline-2 outline-[#FF8C38] transition"
        >
          Create Van
        </button>
      </DialogTrigger>
      <DialogContent className="sm:size-[500px] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>Create van</DialogTitle>
          <DialogDescription>
            Create a new van for that next adventure, fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialCreateVanValues}
          validationSchema={createVanSchema}
          onSubmit={(values, actions) => handleCreateVan(values, actions)}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4">
              <MyTextInput
                name="name"
                type="text"
                placeholder="Name"
                label="Name"
              />
              <FileUploader
                handleImageUpload={(vanImageUrl: string) =>
                  handleImageUpload(vanImageUrl)
                }
                uploadTo="van"
              />
              <MyTextArea
                name="description"
                placeholder="Description"
                label="Description"
              />
              <MyTextInput
                name="price"
                type="number"
                placeholder="Price"
                label="Price"
              />
              <MyTextInput
                name="type"
                type="text"
                placeholder="Type"
                label="Type"
              />
              {/* {errorState && (
                <h3 className="text-base text-center text-red-600 font-semibold">
                  {errorState}
                </h3>
              )} */}
              <DialogFooter>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : null
                  } bg-[#FF8C38] w-full rounded-md py-3 text-base font-bold text-white place-self-center hover:outline outline-2 outline-[#FF8C38] transition`}
                >
                  {isSubmitting ? "Creating" : "Create"}
                </button>
                <DialogClose asChild>
                  <button
                    ref={buttonRef}
                    type="button"
                    title="Close"
                    className="hidden"
                  >
                    Close
                  </button>
                </DialogClose>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
