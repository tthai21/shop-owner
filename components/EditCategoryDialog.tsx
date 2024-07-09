import isTokenExpired from "@/helper/CheckTokenExpired";
import { refreshToken } from "@/helper/RefreshToken";
import { getToken } from "@/helper/getToken";
import { axiosWithToken } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = {
  typeName: string;
  levelType: number;
  typeId: string;
  // active: boolean;
};

const schemaValidation = yup.object({
  typeName: yup
    .string()
    .required("Please enter type name")
    .max(20, "Type name must be less than 20 characters"),
  typeId: yup.string().required("").max(3, ""),
  // active: yup.boolean().required(""),
  levelType: yup
    .number()
    .required("Please enter level type")
    .positive("Level type must be a positive number")
    .integer("Level type must be an integer"),
});

interface Category {
  id: number;
  type: string;
  levelType: number;
  description: string | null;
  storeUuid: string;
  active: boolean;
  tenantUuid: string;
}

interface EditCategoryDialogType {
  category?: Category;
}

const EditCategoryDialog: React.FC<EditCategoryDialogType> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  const handleUpdate = () => {
    setUpdateTrigger(!updateTrigger);
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setFormData(data);
    const payloadEdit = {
      type: data.typeName,
      levelType: data.levelType,
      description: null,
      active: true,
    };
    console.log(payloadEdit);
    
    if (sessionStorage.getItem("authToken")) {
      const token = getToken();

      if (isTokenExpired(token)) {
        await refreshToken();
      }
    } else {
      router.push("/session-expired");
    }
    try {
      const response = await axiosWithToken.put(
        `/serviceType/${data.typeId}`,
        payloadEdit
      );
      console.log(response.data);
      handleUpdate();
      setOpen(false);

      if (response.status !== 200) {
        throw new Error("Failed to edit Type..");
      }
    } catch (error) {
      console.error("Error editing type:", error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn-primary">Edit</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow overlay-dialog" />
        <Dialog.Content className="data-[state=open]:animate-contentShow content-dialog">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-5">
           Edit
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="typeName"
              >
                Type
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="typeName"
                defaultValue={category?.type}
                {...register("typeName")}
              />
              {errors.typeName && (
                <span className="text-red-500 text-sm">
                  {errors.typeName.message}
                </span>
              )}
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="levelType"
              >
                Level Type
              </label>
              <input
                className={` text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]`}
                id="levelType"
                type="number"
                defaultValue={category?.levelType}
                {...register("levelType")}
              />
              {errors.levelType && (
                <span className="text-red-500 text-sm">
                  {errors.levelType.message}
                </span>
              )}
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
            
                <label
                  className="text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="typeId"
                >
                  Type ID
                </label>
           
              <input
                className={`text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]`}
                id="typeId"
                type="text"
                defaultValue={category?.id}
                {...register("typeId")}
              />
              {errors.typeId && (
                <span className="text-red-500 text-sm">
                  {errors.typeId.message}
                </span>
              )}
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                Edit
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default EditCategoryDialog;
