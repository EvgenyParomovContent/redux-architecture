import { useEffect, useState } from "react";

export function useNow(interval: number, enabled: boolean): number | undefined {
  const [now, setNow] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) {
      setNow(undefined);
      return;
    }

    const int = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(int);
    };
  }, [interval, enabled]);

  return now;
}

export function useInterval(
  interval: number,
  enabled: boolean,
  cb: (timestamp: number) => void,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const int = setInterval(() => {
      console.log("interval");
      cb(Date.now());
    }, interval);

    return () => {
      clearInterval(int);
    };
  }, [interval, enabled, cb]);
}
