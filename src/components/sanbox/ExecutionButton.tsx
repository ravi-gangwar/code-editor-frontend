import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { Activelanguage, setExecutionResponse, tabs } from "@/slices/editor";
import { useCodeExecuteMutation } from "@/slices/rtk-query/apis";
import { useState } from "react";
import { ExecutionType } from "@/types";
import { Execution, Submission } from "@/constants/constants";
import useSocket from "@/hooks/useSocket";
import useSocketActions from "@/hooks/useSocketActions";
import { useSearchParams } from "next/navigation";
const ExecutionButton = () => {
  const dp = useDispatch();
  const [executeCode] = useCodeExecuteMutation();
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const [isLoadingExecution, setIsLoadingExecution] = useState(false);
  const language = useSelector(Activelanguage);
  const tabList = useSelector(tabs);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("session");
  const socket = useSocket();
  const { setOutput } = useSocketActions({ socket });

  // Find the active tab's content matching the selected language
  const activeTab = tabList.find((tab) => tab.language === language);
  const code = activeTab ? activeTab.content : "";

  const executeCodeFn = async (type: ExecutionType) => {
    if (type === Submission) {
      try {
        setIsLoadingSubmission(true);
        const response = await executeCode({
          code,
          language: language.toLowerCase(),
          type: Submission,
        });
        if (response.data) {
          dp(setExecutionResponse(response.data));
          setOutput(JSON.stringify(response.data), roomId as string);
        }
        setIsLoadingSubmission(false);
      } catch (error) {
        console.error("Execution failed", error);
        setIsLoadingSubmission(false);
      }
    } else if (type === Execution) {
      try {
        setIsLoadingExecution(true);
        const response = await executeCode({
          code,
          language: language.toLowerCase(),
          type: Execution,
        });
        if (response.data) {
          dp(setExecutionResponse(response.data));
          setOutput(JSON.stringify(response.data), roomId as string);
        }
        setIsLoadingExecution(false);
      } catch (error) {
        console.error("Execution failed", error);
        setIsLoadingExecution(false);
      }
    }
  };

  return (
    <div className="relative flex gap-2">
      <CustomButton
        disabled={isLoadingExecution}
        color="orange"
        title="Execute Code"
        executeCodeFn={() => executeCodeFn(Execution)}
        isLoading={isLoadingExecution}
      />
      <CustomButton
        disabled={isLoadingSubmission}
        color="blue"
        title="Submit Code"
        executeCodeFn={() => executeCodeFn(Submission)}
        isLoading={isLoadingSubmission}
      />
    </div>
  );
};

export default ExecutionButton;
