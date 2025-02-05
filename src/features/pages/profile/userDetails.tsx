"use client";
import React, { useState, useEffect } from "react";
import { useGetProfiles, useUpdateProfile } from "@/lib/api/user/user-profile";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatDateForServer } from "@/utils/Format";
import {
  FormProfileDataNotFound,
  FormprofileError,
  Formprofileskeleton,
} from "@/components/ui/skeleton/form-profiles";
import { HelpersDetails } from "./helpersProfile";

export function UserDetailsComponent() {
  const { data, error, isLoading } = useGetProfiles();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const update = useUpdateProfile(data?.user_id as string);

  useEffect(() => {
    if (data && !formData) {
      setFormData(data);
    }
  }, [data, formData]);

  const handleFieldChange = async (field: string, value: string | boolean) => {
    const newFormData = { ...formData };

    const processedValue =
      field === "date_birth" ? formatDateForServer(value as string) : value;

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      newFormData[parent] = {
        ...(newFormData[parent] || {}),
        [child]: processedValue,
      };
    } else {
      newFormData[field] = processedValue;
    }

    setFormData(newFormData);

    if (field.includes("preferences.") || field === "gender") {
      try {
        await update.mutateAsync(newFormData);
      } catch (error) {
        console.error("Failed to update profile:", error);
        setFormData(formData);
      }
    }
  };

  const saveChanges = async () => {
    try {
      await update.mutateAsync(formData);
      setIsEditing(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isLoading) return <Formprofileskeleton />;
  if (error) return <FormprofileError />;
  if (!formData || Object.keys(formData).length === 0) {
    return <FormProfileDataNotFound />;
  }

  return (
    <section className="w-full py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Your Profile Details
          </CardTitle>
          <CardDescription>Here are your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <HelpersDetails
              field="date_birth"
              label="Date of Birth"
              type="date"
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
            />
            <HelpersDetails
              field="place_birth"
              label="Place of Birth"
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <HelpersDetails
              field="phone_number"
              label="Phone Number"
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
            />
            <HelpersDetails
              field="gender"
              label="Gender"
              type="select"
              options={["Man", "Women"]}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
            />
          </div>

          <HelpersDetails
            field="bio"
            label="Bio"
            type="textarea"
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            formData={formData}
            handleFieldChange={handleFieldChange}
            saveChanges={saveChanges}
          />
        </CardContent>
      </Card>
    </section>
  );
}
