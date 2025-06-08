import { useState, useRef, useEffect } from "react";

function useWebWorker<Task, Return>(workerScript: Worker, defaultState: Return) {
  const [result, setResult] = useState<Return>(defaultState);
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    workerRef.current = workerScript;

    workerRef.current.onmessage = (event: MessageEvent<Return>) => {
      setResult(event.data);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [workerScript]);

  function newTask(data: Task) {
    if (!workerRef.current) return;
    workerRef.current.postMessage(data);
  }

  return { result, newTask };
}

export default useWebWorker;
