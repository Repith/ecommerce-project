"use client";

import { Store } from "@prisma/client";

import { Heading } from "@/components/ui/heading";

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Setings" description="Manage store preferences"></Heading>
    </div>
  );
};
