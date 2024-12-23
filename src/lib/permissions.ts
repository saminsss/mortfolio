import { SubscriptionLevel } from "./subscription";

export const canCreateResume = (
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) => {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    pro: 3,
    plus: Infinity,
  };

  return currentResumeCount < maxResumeMap[subscriptionLevel];
};

export const canUseAiTools = (subscriptionLevel: SubscriptionLevel) => {
  return subscriptionLevel !== "free";
};

export const canUseCustomizations = (subscriptionLevel: SubscriptionLevel) => {
  return subscriptionLevel === "plus";
};
