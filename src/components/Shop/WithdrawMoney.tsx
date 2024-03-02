import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
// import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
// import { loadSeller } from "../../redux/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import PaymentModal from "../../modals/PaymentModal";
import { useGetAllOrdersBySellerQuery } from "../../redux/features/orders/orderApi";
import {
  useDeleteWithdrawMethodMutation,
  useUpdatePaymentMethodMutation,
} from "../../redux/features/shop/shopApi";
import { useCreateWithdrawRequestBySellerMutation } from "../../redux/features/withdraw/withdrawApi";
import {
  addPaymentFormData,
  addPaymentSchema,
} from "../../validations/PaymentMethod";
import { setErrorOptions, setSuccessOptions } from "../options";
import { useLoadSellerQuery } from "../../redux/features/api/apiSlice";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  const { seller } = useSelector((state: any) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const { refetch } = useLoadSellerQuery({ refetchOnMountOrArgChange: true });
  // const [bankInfo, setBankInfo] = useState({
  //   bankName: "",
  //   bankCountry: "",
  //   bankSwiftCode: null,
  //   bankAccountNumber: null,
  //   bankHolderName: "",
  //   bankAddress: "",
  // });

  // useEffect(() => {
  //   dispatch(getAllOrdersOfShop(seller._id));
  // }, [dispatch]);

  // const { data, isLoading, refetch } = useGetAllOrdersBySellerQuery(
  //   seller?._id,
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

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
    // console.log(response);

    // await axios
    //   .put(
    //     `${server}/shop/update-payment-methods`,
    //     {
    //       withdrawMethod,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     toast.success("Withdraw method added successfully!");
    //     dispatch(loadSeller());
    //     setBankInfo({
    //       bankName: "",
    //       bankCountry: "",
    //       bankSwiftCode: null,
    //       bankAccountNumber: null,
    //       bankHolderName: "",
    //       bankAddress: "",
    //     });
    //   })
    // .catch((error) => {
    //   console.log(error.response.data.message);
    // });
  };

  const deleteHandler = async () => {
    await deleteWithdraw({});
    // await axios
    //   .delete(`${server}/shop/delete-withdraw-method`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     toast.success("Withdraw method deleted successfully!");
    //     dispatch(loadSeller());
    //   });
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
      const amount = withdrawAmount;
      await createWithdraw(amount);
      // await axios
      //   .post(
      //     `${server}/withdraw/create-withdraw-request`,
      //     { amount },
      //     { withCredentials: true }
      //   )
      //   .then((res) => {
      //     toast.success("Withdraw money request is successful!");
      //   });
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
