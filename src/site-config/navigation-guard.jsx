"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const NavigationGuardContext = createContext();

export function NavigationGuardProvider({ children }) {
  const router = useRouter();
  const [shouldBlock, setShouldBlock] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const originalPush = useRef(router.push);
  useEffect(() => {
    const blockPush = (...args) => {
      const [url] = args;
      if (shouldBlock) {
        return;
      }
      originalPush.current(...args);
    };

    router.push = blockPush;

    return () => {
      router.push = originalPush.current;
    };
  }, [shouldBlock]);

  return (
    <NavigationGuardContext.Provider value={{ setShouldBlock, shouldBlock }}>
      {children}
    </NavigationGuardContext.Provider>
  );
}

export function useNavigationGuard() {
  return useContext(NavigationGuardContext);
}
