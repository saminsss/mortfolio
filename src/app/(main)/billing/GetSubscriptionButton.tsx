"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";

const GetSubscriptionButton = () => {
  const premiumModal = usePremiumModal();
  return (
    <Button variant="premium" onClick={() => premiumModal.setOpen(true)}>
      Get Premium subscription
    </Button>
  );
};

export default GetSubscriptionButton;
