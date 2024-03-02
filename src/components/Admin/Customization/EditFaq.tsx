import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  useEditLayoutMutation,
  useGetHeroLayoutQuery,
} from "../../../redux/features/layout/layoutApi";
import styles from "../../../styles/styles";
import Loader from "../../Layout/Loader";

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroLayoutQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  console.log(data);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated succesfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data, refetch]);

  const toggleQuestions = (id: any) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnChanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !isAnyQuestionEmpty(questions) ||
      !areQuestionsUnChanged(data?.layout?.faq, questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-[12px]">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start justify-between text-black dark:text-white w-full text-left focus:outline-none"
                      onClick={() => toggleQuestions(q._id)}
                    >
                      <input
                        className={`${styles.input} !border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder="Add your Question..."
                      />
                      <span className="ml-6 mt-3 flex-shrink-0">
                        {q.active ? (
                          <HiMinus title="close" className="h-6 w-6" />
                        ) : (
                          <HiPlus title="open" className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        className={`${styles.input} !border-none`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder="Add your Answer...."
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiFillDelete
                          title="Remove FAQ"
                          className="text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestion: any) =>
                              prevQuestion.filter(
                                (item: any) => item._id !== q._id
                              )
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              title="Create New FAQ"
              className="text-black dark:text-white text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <button
            className={`${
              styles.button
            } !w-[100px] !text-black !bg-[#cccccc34] !h-[40px] !min-h-[40px]  
              ${
                areQuestionsUnChanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? "cursor-not-allowed"
                  : "cursor-pointer !bg-[#42d383]"
              } rounded absolute bottom-12 right-12`}
            onClick={
              areQuestionsUnChanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
            disabled={
              areQuestionsUnChanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
            }
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditFaq;
