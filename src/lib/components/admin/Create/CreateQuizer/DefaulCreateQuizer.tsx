import { getListCollection } from "@/api/collection";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import Form from "@/lib/components/common/Form";
import Input from "@/lib/components/common/Input";
import Select from "@/lib/components/common/Select/DefaultSelect";
import { Collection } from "@/lib/modal/collection";
import { QuizzPost } from "@/lib/modal/quizz";
import { setTurnOnPopup } from "@/lib/state/popup/popupSlice";
import { addQuestion } from "@/lib/state/questions/questionSlice";
import { addQuizz } from "@/lib/state/quizz/questionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DefaulCreateQuizer = () => {
  const dispatch = useDispatch();
  const [collection, setCollection] = useState<Collection[]>([]);
  const visibility = [
    { id: 1111, title: "Public", value: "public" },
    { id: 2222, title: "Private", value: "private" },
  ];

  const optionsCollection = collection.map((iteams) => {
    return {
      title: iteams.title,
      value: iteams._id,
    };
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await getListCollection();
      setCollection(res);
    };
    fetch();
  }, []);

  const handleSubmitForm = async (data: QuizzPost) => {
    if (data) {
      dispatch(addQuizz(data));
      dispatch(setTurnOnPopup("popup_choose_category_question"));
    }
  };

  return (
    <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-[935px]">
      <p className="text-xl font-bold">Create quizer 🙋</p>
      <Form classForm="mt-6" onSubmitForm={handleSubmitForm}>
        {(props: any) => (
          <>
            <div className="space-y-4">
              <Input
                label="Url Thumbnail"
                name="urlThumbnail"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="Url Thumbnail Quizer"
                errorsOption={{
                  required: {
                    value: true,
                    message: "Url Thumbnail is empty",
                  },
                }}
                classLabel="hidden"
                classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
              />
              <Input
                label="Title"
                name="title"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="Title quizer"
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
              <Input
                label="Description"
                name="description"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="Description"
                errorsOption={{
                  required: {
                    value: true,
                    message: "Description is empty",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                  minLength: {
                    value: 16,
                    message: "Description must not be less than 16 characters",
                  },
                }}
                classLabel="hidden"
                classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
              />
              <Select
                label="Collection"
                name="idCollection"
                register={props.registers}
                errors={props.error}
                textSelect="Choose Collection"
                errorsOption={{
                  required: {
                    value: true,
                    message: "Collection is empty",
                  },
                }}
                classLabel="hidden"
                classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                options={optionsCollection}
              />
              <Select
                label="Visibility"
                name="visibility"
                register={props.registers}
                errors={props.error}
                textSelect="Choose Visibility"
                errorsOption={{
                  required: {
                    value: true,
                    message: "Visibility is empty",
                  },
                }}
                classLabel="hidden"
                classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                options={visibility}
              />
              <Input
                label="Keyword"
                name="keyword"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="Keyword"
                errorsOption={{
                  required: {
                    value: true,
                    message: "Keyword is empty",
                  },
                  pattern: {
                    value: /#[^\s#]+/g,
                    message: "You need to add '#' hashtags !",
                  },
                  maxLength: {
                    value: 50,
                    message: "Keyword cannot exceed 50 characters",
                  },
                  minLength: {
                    value: 2,
                    message: "Keyword must not be less than 2 characters",
                  },
                }}
                classLabel="hidden"
                classInput="text-[#036be5] font-bold bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
              />
            </div>
            <div className="flex items-center justify-center w-full mt-6">
              <ButtonDefault
                content="Creat quzier"
                className="font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full"
              />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
export default DefaulCreateQuizer;
