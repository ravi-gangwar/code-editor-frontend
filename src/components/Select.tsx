import { AppDispatch } from "@/app/store";
import { languages } from "@/constants/constants";
import { Activelanguage, setLanguage } from "@/slices/editor";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "@/hooks/useSocket";
import useSocketActions from "@/hooks/useSocketActions";
import { useSearchParams } from "next/navigation";
function Select() {
  const dp = useDispatch<AppDispatch>();
  const socket = useSocket();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("session");
  const { setLanguage: SetLangSocket } = useSocketActions({ socket });
  const activeLanguage = useSelector(Activelanguage);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    SetLangSocket(e.target.value, roomId as string);
    dp(setLanguage(e.target.value as "Javascript" | "Java" | "Python"));
  };
  return (
    <select
      value={activeLanguage}
      onChange={onChange}
      className="bg-transparent text-sm font-medium text-muted-foreground outline-none"
    >
      {languages.map((lang) => (
        <option value={lang} key={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

export default Select;
