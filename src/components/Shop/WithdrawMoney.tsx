import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import PaymentModal from "../../modals/PaymentModal";
import { useLoadSellerQuery } from "../../redux/features/api/apiSlice";
import {
  useDeleteWithdrawMethodMutation,
  useUpdatePaymentMethodMutation,
} from "../../redux/features/shop/shopApi";
import { useCreateWithdrawRequestBySellerMutation } from "../../redux/features/withdraw/withdrawApi";
import {
  addPaymentFormData,
  addPaymentSchema,
} from "../../validations/PaymentMethod";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const { seller } = useSelector((state: any) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const { refetch } = useLoadSellerQuery({ refetchOnMountOrArgChange: true });

  const [
    updatePayment,
    { isLoading: updateLoading, isSuccess, error: updateError },
  ] = useUpdatePaymentMethodMutation();
  const [
    createWithdraw,
    {
      isLoading: withdrawLoading,
      isSuccess: withdrawSuccess,
      error: withdrawError,
    },
  ] = useCreateWithdrawRequestBySellerMutation();

  const [
    deleteWithdraw,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteWithdrawMethodMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addPaymentFormData>({
    resolver: zodResolver(addPaymentSchema),
  });

  useEffect(() => {
    if (updateLoading) {
      toast.loading("Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (withdrawLoading) {
      toast.loading("Just a Sec...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Payment Method Updated Successfully", {
        style: setSuccessOptions,
      });
      refetch();
      // setPaymentMethod(false);
    }
    if (withdrawSuccess) {
      toast.success("Payment Withdraw request send successfully", {
        style: setSuccessOptions,
      });
    }
    if (deleteSuccess) {
      toast.success("Payment Withdraw Method deleted successfully", {
        style: setSuccessOptions,
      });
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (withdrawError) {
      if ("data" in withdrawError) {
        const errorData = withdrawError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [
    deleteError,
    deleteSuccess,
    isSuccess,
    updateError,
    withdrawError,
    withdrawSuccess,
    withdrawLoading,
    updateLoading,
  ]);

  const onSubmit: SubmitHandler<addPaymentFormData> = async (data) => {
    const withdrawMethod = {
      bankName: data.bankName,
      bankCountry: data.bankCountry,
      bankSwiftCode: data.bankSwiftCode,
      bankAccountNumber: data.bankAccountNumber,
      bankHolderName: data.bankHolderName,
      bankAddress: data.bankAddress,
    };
    console.log(withdrawMethod);
    await updatePayment(withdrawMethod);
  };

  const deleteHandler = async () => {
    await deleteWithdraw({});
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error(
        "You can't withdraw this amount!. You not have enough balance to withdraw!"
      );
    } else {
      const data = { amount: withdrawAmount };
      console.log("amount :", data);

      await createWithdraw(data);
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(0);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: &#8377;. {availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 500 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <PaymentModal
          availableBalance={availableBalance}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          setOpen={setOpen}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          seller={seller}
          updateLoading={updateLoading}
          deleteLoading={deleteLoading}
          withdrawLoading={withdrawLoading}
          withdrawHandler={withdrawHandler}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
};

export default WithdrawMoney;
