import { setTurnOnPopup } from "@/lib/state/popup/popupSlice";
import { AppDispatch, RootState } from "@/lib/state/store";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import ButtonDefault from "../../common/Button/ButtonDefault";
import useLocalStorage from "@/lib/hook/useLocalStorage";
import { useRouter } from "next/router";

const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();
  const [token, setToken] = useLocalStorage("token", "");

  const handleOpenPopupWel = () => {
    if (token != "") {
      push("/admin");
    } else {
      dispatch(setTurnOnPopup("popup_login"));
    }
  };

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-5 my-10">
          <h1 className="text-[#1D4645] font-bold text-[72px] leading-tight">
            Play Online Quiz & Win Cash Daily!
          </h1>
          <p className="mt-[33px] text-[#3F3F3F] text-2xl">
            Win up to 1000৳ monthly from QuizBaj.
          </p>
          <ButtonDefault
            className="py-5 bg-[#E8C5B0] w-2/3 rounded-md my-12 text-center text-xl font-medium hover:scale-110 transition-all hover:font-bold"
            content=" Play Quizz"
            onClick={handleOpenPopupWel}
          />
          <p className="font-medium text-[25px] mb-5">
            Number of Active Users Right Now
          </p>
          <p className="text-[55px] text-[#1D4645] font-medium">20,000+</p>
        </div>
        <div className="col-span-7 w-full h-full relative">
          <Image
            src="/images/banner-home-page.svg"
            fill
            sizes="300"
            alt="Play Online Quiz &
Win Cash Daily!"
            priority={true}
            loading="eager"
            className=" w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
export default Banner;
