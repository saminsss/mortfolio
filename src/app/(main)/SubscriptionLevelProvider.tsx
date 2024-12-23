"use client";

import { SubscriptionLevel } from "@/lib/subscription";
import React, { createContext, ReactNode, useContext } from "react";

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined,
);

type SubscriptionLevelProviderProps = {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
};

const SubscriptionLevelProvider = ({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) => {
  return (
    <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
};

export const useSubscriptionLevel = () => {
  const context = useContext(SubscriptionLevelContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a subscription level provider",
    );
  }

  return context;
};

export default SubscriptionLevelProvider;
