import { useEffect, useState } from "react";
import Loader from "./Layout/Loader";
import { useGetHeroLayoutQuery } from "../redux/features/layout/layoutApi";
import { HiMinus, HiPlus } from "react-icons/hi";
import styles from "../styles/styles";

const Faq = () => {
  const { data, isLoading } = useGetHeroLayoutQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    setQuestions(data?.layout?.faq);
  }, [data]);

  const toggleQuestions = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  console.log(questions, data);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} !text-[40px]`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-5">
          <dl className="space-y-8">
            {questions?.map((q: any, index: number) => (
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
                    <span className="font-medium text-black dark:text-white">
                      {index + 1}. {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="h-6 w-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-5 pr-12">
                    <span className="text-base font-Poppins text-black dark:text-white">
                      {q.answer}
                    </span>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Faq;
