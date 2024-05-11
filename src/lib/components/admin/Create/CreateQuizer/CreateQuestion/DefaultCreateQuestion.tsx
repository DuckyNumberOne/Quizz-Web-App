import React, { useEffect, useState } from "react";
import Image from "next/image";
import Form from "@/lib/components/common/Form";
import Input from "@/lib/components/common/Input";
import Select from "@/lib/components/common/Select/DefaultSelect";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import DefaultCardAnsswer from "../../../CardAnswer/DefaultCardAnswer";
import { Anwsers, Question } from "@/lib/modal/question";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestionByIndex,
  updateQuestion,
} from "@/lib/state/questions/questionSlice";
import { RootState } from "@/lib/state/store";
import { setTurnOffPopup, setTurnOnPopup } from "@/lib/state/popup/popupSlice";
import {
  addAnswer,
  addMultipleAnswers,
  clearAnswer,
} from "@/lib/state/answer/answerSlice";

interface PropsData {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  answers: Anwsers[];
  [key: string]: string | number | Anwsers[];
}

const DefaultCreateQuestion = () => {
  const dispatch = useDispatch();
  const dataQuestion = useSelector((state: RootState) => state.question);
  const { popup_error_question } = useSelector(
    (state: RootState) => state.popup
  );
  const [popupRule, setPopupRule] = useState(true);
  const [indexs, setIndex] = useState(-1);
  const [error, setError] = useState("");

  const defaultAnswer = {
    number: 0,
    text: "",
    isCorrect: false,
  };

  const timeQuestion = [
    { id: 43331, title: "10s", value: 10 },
    { id: 43333, title: "12s", value: 12 },
    { id: 43332, title: "15s", value: 15 },
    { id: 43334, title: "17s", value: 17 },
  ];

  const pointQuestion = [
    { id: 33331, title: "2.000 Point", value: 2000 },
    { id: 33333, title: "1.500 Point", value: 1500 },
    { id: 33332, title: "1.000 Point", value: 1000 },
    { id: 33334, title: "500 Point", value: 500 },
  ];

  const colorCardAnser = [
    { id: 1, colorBackground: "#e35454", colorBoder: "#bf2d49" },
    { id: 2, colorBackground: "#30b0c7", colorBoder: "#0093ad" },
    { id: 3, colorBackground: "#ff9500", colorBoder: "#c27810" },
    { id: 4, colorBackground: "#3ed684", colorBoder: "#81ab8b" },
  ];

  useEffect(() => {
    if (popupRule === true) {
      const timeoutId: any = setTimeout(() => {
        if (popupRule) {
          setPopupRule(false);
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [popupRule]);

  const transformData = (inputData: PropsData) => {
    const answers: Anwsers[] = [];
    for (let i = 1; i <= 4; i++) {
      if (inputData[`text${i}`]) {
        answers.push({
          number: i,
          isCorrect: Boolean(inputData[`isCorrect${i}`]),
          text: String(inputData[`text${i}`]),
        });
      }
    }
    return {
      _id: String(inputData._id),
      imgQuestion: String(inputData.imgQuestion),
      point: Number(inputData.point),
      time: Number(inputData.time),
      title: String(inputData.title),
      anwsers: answers as Anwsers[],
    };
  };

  function convertQuestionFormat(question: Question) {
    let newQuestion = {
      _id: String(question._id),
      imgQuestion: String(question.imgQuestion),
      point: Number(question.point),
      time: Number(question.time),
      title: String(question.title),
    };
    for (let i = 0; i < question.anwsers.length; i++) {
      newQuestion["isCorrect" + (i + 1)] = question.anwsers[i].isCorrect;
      newQuestion["text" + (i + 1)] = question.anwsers[i].text;
    }

    return newQuestion;
  }

  const handleScrollToTop = () => {
    const content = document.getElementById("main-content");
    if (content) {
      window.scrollTo({
        top: content?.offsetTop - 90,
        behavior: "instant",
      });
    }
  };

  const defaultValue =
    indexs != -1
      ? convertQuestionFormat(dataQuestion[indexs])
      : dataQuestion[indexs];

  const handleOpenQuestion = (index: number) => {
    if (error != "" && indexs != -1) {
      handleScrollToTop();
      dispatch(setTurnOnPopup("popup_error_question"));
    } else {
      setIndex(index);
    }
  };

  const handleStayQuestionIndex = () => {
    dispatch(setTurnOffPopup("popup_error_question"));
  };

  const handleDeleteQuestion = () => {
    if (indexs !== -1) {
      dispatch(deleteQuestionByIndex(indexs));
      setIndex(-1); // Đặt lại giá trị của indexs sau khi xóa thành -1
      dispatch(setTurnOffPopup("popup_create_question"));
      dispatch(setTurnOnPopup("popup_choose_category_question"));
    }
  };

  function generateUniqueId() {
    // Tạo một chuỗi ngẫu nhiên có độ dài 8 ký tự từ các ký tự a-z và số từ 0-9
    const randomString = Math.random().toString(36).substring(2, 10);
    // Tạo một timestamp từ thời gian hiện tại
    const timestamp = Date.now();
    // Kết hợp chuỗi ngẫu nhiên và timestamp để tạo ID
    const uniqueId = randomString + timestamp;
    return uniqueId;
  }

  const valueId = indexs != -1 ? dataQuestion[indexs]._id : generateUniqueId();

  const handleSubmitForm = async (data: PropsData) => {
    if (!data) return;

    const validatedData = transformData(data);
    const isCorrectTrue = validatedData.anwsers.filter(
      (item) => item.isCorrect
    ).length;
    const existsId = dataQuestion.some(
      (question) => question._id === validatedData._id
    );
    const existingQuestion = dataQuestion.find(
      (question) => question._id === validatedData._id
    );
    const titleChanged = existingQuestion
      ? existingQuestion.title !== validatedData.title
      : true;

    // Kiểm tra xem có các text giống nhau không
    const uniqueTexts = new Set(
      validatedData.anwsers.map((answer) => answer.text)
    );
    const isTextsUnique = uniqueTexts.size === validatedData.anwsers.length;

    if (!isTextsUnique) {
      setError("Answers should have unique text!");
      return;
    }

    if (isCorrectTrue === 0 && validatedData.anwsers.length > 0) {
      dispatch(updateQuestion(validatedData));
      setError("Please choose 1 correct answer !");
    } else {
      if (existsId) {
        dispatch(clearAnswer());
        if (!titleChanged) {
          // Title is not changed, continue without checking existence
          dispatch(updateQuestion(validatedData));
          dispatch(setTurnOffPopup("popup_create_question"));
          dispatch(setTurnOnPopup("popup_choose_category_question"));
        } else {
          // Title is changed, check existence
          const existsTitle = dataQuestion.some(
            (question) => question.title === validatedData.title
          );
          if (existsTitle) {
            setError("This title question already exists !");
          } else {
            dispatch(updateQuestion(validatedData));
            dispatch(setTurnOffPopup("popup_create_question"));
            dispatch(setTurnOnPopup("popup_choose_category_question"));
          }
        }
      } else {
        const existsTitle = dataQuestion.some(
          (question) => question.title === validatedData.title
        );
        if (existsTitle) {
          setError("This title question already exists !");
        } else {
          dispatch(clearAnswer());
          dispatch(addQuestion(validatedData));
          dispatch(setTurnOffPopup("popup_create_question"));
          dispatch(setTurnOnPopup("popup_choose_category_question"));
        }
      }
    }
  };

  useEffect(() => {
    if (indexs != -1) {
      const anwsers = dataQuestion[indexs].anwsers;
      dispatch(addMultipleAnswers({ anwsers }));
    }
    setError("");
  }, [indexs]);

  return (
    <div
      className={`px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg fade-in-1s h-[935px] relative ${
        !popup_error_question && "overflow-y-auto"
      }`}
    >
      {popup_error_question && (
        <div className="absolute top-0 right-0 w-full h-screen bg-black-shadow z-10 rounded-lg flex items-center justify-center">
          <div className="bg-white shadow-2 shadow-purple-500 w-[300px] h-[220px] rounded-2xl p-4">
            <p className="text-base font-normal">
              Cannot move another question because the question is experiencing
              an
              <span className="text-[#cc0000] font-semibold"> error </span>!
            </p>
            <div className=" mt-6 space-y-2">
              <button
                className="block w-full bg-white text-black font-medium shadow-2 shadow-graydark rounded-md hover:bg-whiten"
                onClick={handleStayQuestionIndex}
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center relative">
        <p className="text-xl font-bold">
          {indexs != -1 ? `Question ${indexs + 1}` : "Create question"}
        </p>
        <div className="flex items-center gap-6">
          <Image
            src="/images/preview-2.webp"
            width={40}
            height={40}
            alt="Preview"
            className="cursor-pointer"
          />
          <Image
            src="/images/about.webp"
            width={30}
            height={30}
            alt="About"
            className="cursor-pointer"
            onClick={() => setPopupRule(!popupRule)}
          />
        </div>
        {popupRule && (
          <div className="absolute right-[-6px] top-14 z-10">
            <div className="absolute right-4 top-[-10px] triangle"></div>
            <div className="bg-[#f8f8f8] border-[#e8e8e8] border-4 rounded-xl w-[250px] h-[140px] mx-2">
              <p className="text-center font-bold text-rose-600">RULE</p>
              <ul className="text-sm text-[#333] text font-semibold text-start px-2">
                <li>
                  <p>
                    - Minimum <span className="text-red">5</span> questions
                    required, maximum <span className="text-red">20</span>.
                  </p>
                </li>
                <li>
                  <p>
                    - Maximum <span className="text-red">3</span> correct
                    answers per question.
                  </p>
                </li>
                <li>
                  <p>- Unique content for each answer.</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <Form
          classForm="mt-3"
          onSubmitForm={handleSubmitForm}
          defaultValue={defaultValue}
        >
          {(props: any) => (
            <>
              <div className="space-y-4">
                <Input
                  label="_id"
                  name="_id"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  errorsOption={{
                    required: {
                      value: true,
                      message: "_id is empty",
                    },
                  }}
                  defaultValue={valueId}
                  classLabel="hidden"
                  classInput="hidden"
                />
                <Input
                  label="Url Thumbnail"
                  name="imgQuestion"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  placeholder="Url Thumbnail Question"
                  defaultValue={
                    indexs != -1 ? dataQuestion[indexs].imgQuestion : ""
                  }
                  errorsOption={{
                    required: {
                      value: true,
                      message: "Url Thumbnail is empty",
                    },
                  }}
                  classLabel="hidden"
                  classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                />
                <div className="flex gap-4">
                  <div className="w-full">
                    <Select
                      label="Point"
                      name="point"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose point"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Point is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={pointQuestion}
                    />
                  </div>
                  <div className="w-full">
                    <Select
                      label="Time"
                      name="time"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose time"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Time is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={timeQuestion}
                    />
                  </div>
                </div>
                <Input
                  label="Title"
                  name="title"
                  type="text"
                  register={props.registers}
                  errors={props.error}
                  placeholder="Title question"
                  errorsOption={{
                    required: {
                      value: true,
                      message: "Title is empty",
                    },
                    maxLength: {
                      value: 50,
                      message: "Title cannot exceed 50 characters",
                    },
                    minLength: {
                      value: 5,
                      message: "Title must not be less than 6 characters",
                    },
                  }}
                  classLabel="hidden"
                  classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                />
              </div>
              <div>
                <div className="w-full flex-row flex-wrap mt-12">
                  {/* Box */}
                  <div className="w-full border-r-[5px] border-white mb-3 grid grid-cols-2 grid-rows-2 gap-4">
                    {colorCardAnser.map((items, index) => (
                      <div key={items.id}>
                        <DefaultCardAnsswer
                          indexs={indexs}
                          number={index}
                          register={props.registers}
                          errors={props.error}
                          placeholder="Text question"
                          defaultValue={
                            dataQuestion &&
                            dataQuestion[indexs] &&
                            dataQuestion[indexs].anwsers &&
                            dataQuestion[indexs].anwsers.length > 0 &&
                            dataQuestion[indexs].anwsers[index]
                              ? dataQuestion[indexs].anwsers[index]
                              : defaultAnswer
                          }
                          errorsOptionInput={{
                            required: { value: true, message: "Text is empty" },
                            maxLength: {
                              value: 20,
                              message: "Title cannot exceed 20 characters",
                            },
                          }}
                          classInput="text-white font-semibold text-[18px] text-center mt-12 relative"
                          backgroundColor={items.colorBackground}
                          borderShadowColor={items.colorBoder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-6">
                {error != "" && (
                  <p className="text-rose-600 text-center font-medium">
                    {error}
                  </p>
                )}
              </div>
              <div className="border-t-2 border-[#b5b2c1] w-full mt-10" />
              <div className="flex gap-1 h-[150px]">
                <div
                  className={`h-full flex items-center gap-3 justify-between overflow-auto w-3/4`}
                >
                  <div className="h-full flex items-center gap-1">
                    {dataQuestion.map((items, index) => (
                      <div
                        className="bg-white-shadow-2 h-[100px] w-[160px] rounded-2xl cursor-pointer hover:shadow-2 hover:shadow-graydark ease-in-out duration-300"
                        key={index}
                        onClick={() => handleOpenQuestion(index)}
                      >
                        <img
                          src={items.imgQuestion}
                          width={140}
                          height={80}
                          alt="Thumbnail question"
                          className="w-full h-full rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-full flex justify-center items-center  w-1/4 relative">
                  {indexs !== -1 ? (
                    <div className="w-full space-y-2 ease-in-out duration-300">
                      <button className="bg-yellow-300 w-full rounded-md flex justify-center items-center p-2">
                        <Image
                          src={"/images/edit.png"}
                          width={40}
                          height={40}
                          alt={"Edit"}
                        />
                      </button>
                      <div
                        className="bg-red w-full rounded-md cursor-pointer flex justify-center items-center p-2"
                        onClick={handleDeleteQuestion}
                      >
                        <Image
                          src={"/images/delete.png"}
                          width={40}
                          height={40}
                          alt={"Trash"}
                        />
                      </div>
                    </div>
                  ) : (
                    <button className="bg-[#036be5] hover:bg-[#509bf0] p-5 rounded-full cursor-pointer">
                      <Image
                        src={"/images/plus.png"}
                        width={40}
                        height={40}
                        alt={"Plus"}
                      />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
export default DefaultCreateQuestion;