"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Input,
  Label,
  FieldError,
  Select,
  ListBox,
  Button,
  toast,
} from "@heroui/react";
import {
  Factory,
  Globe,
  LocationArrow,
  Person,
  Pencil,
  Plus,
  CircleCheckFill,
  Clock,
  Xmark,
} from "@gravity-ui/icons";
import Image from "next/image";
import { createCompany } from "@/lib/actions/company";

export default function MyCompanyPage() {
  const [company, setCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // নতুন স্টেট: লোগো ফাইল এবং প্রিভিউয়ের জন্য
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // কমন স্টাইলিং ভেরিয়েবল
  const textInputClass =
    "bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-600 transition-colors w-full";
  const selectBoxClass = "flex flex-col gap-1 w-full";
  const triggerClasses =
    "bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm flex items-center justify-between outline-none cursor-pointer";
  const popoverClasses =
    "bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 z-50 w-[300px] min-w-[200px]";
  const listItemClasses =
    "px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md cursor-pointer outline-none data-[selected=true]:bg-zinc-800";
  const textAreaClass =
    "bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 rounded-lg p-3 text-sm outline-none focus:border-zinc-600 transition-colors w-full resize-none";

  // ফাইল সিলেক্ট করলে প্রিভিউ দেখানোর জন্য
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRegisterOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("companyName");
    if (!name) {
      setErrors({ companyName: "Company name is required." });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let uploadedLogoUrl = company?.logoUrl || "";

      // ১. যদি নতুন কোনো লোগো ফাইল সিলেক্ট করা হয়ে থাকে, তবে তা ImgBB-তে আপলোড করুন
      if (logoFile) {
        const imgBbFormData = new FormData();
        imgBbFormData.append("image", logoFile);

        // আপনার ImgBB API Key এখানে দিন (অথবা .env.local থেকে process.NEXT_PUBLIC_IMGBB_API_KEY ব্যবহার করুন)
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imgBbFormData,
          },
        );

        const imgbbData = await imgbbRes.json();
        if (imgbbData.success) {
          uploadedLogoUrl = imgbbData.data.url; // ImgBB থেকে প্রাপ্ত সরাসরি ইমেজ URL
        } else {
          throw new Error("Failed to upload logo to ImgBB");
        }
      }

      // ২. ফর্মের অন্যান্য ডাটা প্রস্তুত করা
      const payload = {
        name,
        industry: formData.get("industry") || "Technology",
        website: formData.get("website") || "",
        location: formData.get("location") || "",
        employeeCount: formData.get("employeeCount") || "1-10 employees",
        description: formData.get("description") || "",
        logoUrl: uploadedLogoUrl,
        status: "Pending", // Admin approve না করা পর্যন্ত pending থাকবে
      };
      console.log(payload);

      const res = await createCompany(payload);
      if (!res || res.error) {
        throw new Error(res?.error || "Failed to save company data");
      }

      if (res.insertedId) {
        toast.success("Company registered successfully!");

        // সার্ভার থেকে প্রাপ্ত কোম্পানি ডাটা সেট করুন
      }

      // সিম্যুলেশনের জন্য লোকাল স্টেট আপডেট
      setCompany(payload);
      setIsModalOpen(false);
      setLogoFile(null);
    } catch (err) {
      console.error(err);
      setErrors({
        form: "Something went wrong during upload or save. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-900 pb-5">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            My Company
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your organization profile and track admin approval status.
          </p>
        </div>
        {company && (
          <Button
            onPress={() => {
              setLogoPreview(company.logoUrl || "");
              setIsModalOpen(true);
            }}
            className="bg-white text-black font-medium text-sm px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 self-start cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Edit Company
          </Button>
        )}
      </div>

      {/* Conditional Rendering: No Company vs Registered */}
      {!company ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-950/50">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-800">
            <Factory className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">
            No Company Registered
          </h3>
          <p className="text-sm text-zinc-400 max-w-sm mb-6">
            You haven't registered your business profile yet. Register your
            company to start posting jobs and hiring talent.
          </p>
          <Button
            onPress={() => {
              setLogoPreview("");
              setIsModalOpen(true);
            }}
            className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Register Company
          </Button>
        </div>
      ) : (
        /* Registered State Details Card */
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                {company.logoUrl ? (
                  <Image
                    width={64}
                    height={64}
                    src={company.logoUrl}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  company.name.charAt(0)
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">
                    {company.name}
                  </h2>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      company.status === "Approved"
                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/50"
                        : company.status === "Rejected"
                          ? "bg-rose-950/50 text-rose-400 border-rose-900/50"
                          : "bg-amber-950/50 text-amber-400 border-amber-900/50"
                    }`}
                  >
                    {company.status === "Approved" && (
                      <CircleCheckFill className="w-3.5 h-3.5" />
                    )}
                    {company.status === "Pending" && (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {company.status === "Rejected" && (
                      <Xmark className="w-3.5 h-3.5" />
                    )}
                    {company.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {company.industry}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-900 text-sm">
            <div>
              <span className="text-zinc-500 block mb-1">Website</span>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline flex items-center gap-1.5 truncate"
              >
                <Globe className="w-4 h-4 text-zinc-400 shrink-0" />
                {company.website || "Not provided"}
              </a>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Location</span>
              <span className="text-white flex items-center gap-1.5">
                <LocationArrow className="w-4 h-4 text-zinc-400 shrink-0" />
                {company.location || "Remote / Worldwide"}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Company Size</span>
              <span className="text-white flex items-center gap-1.5">
                <Person className="w-4 h-4 text-zinc-400 shrink-0" />
                {company.employeeCount}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900">
            <span className="text-zinc-500 block mb-2 text-sm">
              Brief Description
            </span>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {company.description || "No description provided."}
            </p>
          </div>
        </div>
      )}

      {/* Registration / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {company
                    ? "Edit Company Information"
                    : "Register New Company"}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Enter your business details to start hiring on the platform.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <Xmark className="w-5 h-5" />
              </button>
            </div>

            <Form
              onSubmit={handleRegisterOrUpdate}
              className="space-y-6"
              validationErrors={errors}
              validationBehavior="aria"
            >
              <Fieldset className="space-y-6 w-full">
                {errors.form && (
                  <div className="p-3 bg-rose-950/50 border border-rose-900 text-rose-400 text-xs rounded-lg">
                    {errors.form}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <TextField
                    name="companyName"
                    defaultValue={company?.name || ""}
                    isInvalid={!!errors.companyName}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Company Name
                    </Label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      className={textInputClass}
                    />
                    {errors.companyName && (
                      <FieldError className="text-xs text-danger mt-1">
                        {errors.companyName}
                      </FieldError>
                    )}
                  </TextField>

                  {/* Industry / Category */}
                  <Select
                    className={selectBoxClass}
                    name="industry"
                    defaultSelectedKeys={[
                      company?.industry
                        ? company.industry.toLowerCase()
                        : "technology",
                    ]}
                  >
                    <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                      Industry / Category
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value className="text-white placeholder:text-zinc-600" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                      <ListBox className="outline-none">
                        <ListBox.Item
                          id="technology"
                          className={listItemClasses}
                          textValue="Technology"
                        >
                          Technology
                        </ListBox.Item>
                        <ListBox.Item
                          id="design"
                          className={listItemClasses}
                          textValue="Design"
                        >
                          Design
                        </ListBox.Item>
                        <ListBox.Item
                          id="finance"
                          className={listItemClasses}
                          textValue="Finance"
                        >
                          Finance
                        </ListBox.Item>
                        <ListBox.Item
                          id="healthcare"
                          className={listItemClasses}
                          textValue="Healthcare"
                        >
                          Healthcare
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Website URL */}
                  <TextField
                    name="website"
                    defaultValue={company?.website || ""}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Website URL
                    </Label>
                    <div className="relative flex items-center">
                      <Globe
                        size={16}
                        className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                      />
                      <Input
                        placeholder="https://www.company.com"
                        className={`${textInputClass} pl-10`}
                      />
                    </div>
                  </TextField>

                  {/* Location */}
                  <TextField
                    name="location"
                    defaultValue={company?.location || ""}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Location
                    </Label>
                    <div className="relative flex items-center">
                      <LocationArrow
                        size={16}
                        className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                      />
                      <Input
                        placeholder="e.g. Austin, TX"
                        className={`${textInputClass} pl-10`}
                      />
                    </div>
                  </TextField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Employee Count Range */}
                  <Select
                    className={selectBoxClass}
                    name="employeeCount"
                    defaultSelectedKeys={[
                      company?.employeeCount
                        ? company.employeeCount
                            .replace(" employees", "")
                            .toLowerCase()
                        : "11-50",
                    ]}
                  >
                    <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                      Employee Count Range
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                      <ListBox className="outline-none">
                        <ListBox.Item
                          id="1-10"
                          className={listItemClasses}
                          textValue="1-10 employees"
                        >
                          1-10 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="11-50"
                          className={listItemClasses}
                          textValue="11-50 employees"
                        >
                          11-50 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="51-200"
                          className={listItemClasses}
                          textValue="51-200 employees"
                        >
                          51-200 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="201+"
                          className={listItemClasses}
                          textValue="201+ employees"
                        >
                          201+ employees
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Company Logo Upload Field with ImgBB Support */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-zinc-400 font-medium text-sm">
                      Company Logo
                    </Label>
                    <label className="border border-zinc-800 bg-zinc-900 rounded-lg p-2.5 flex items-center gap-3 text-xs text-zinc-400 cursor-pointer hover:border-zinc-700 transition-colors">
                      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-300 overflow-hidden shrink-0">
                        {logoPreview ? (
                          <Image
                            width={32}
                            height={32}
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Factory className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 truncate">
                        <span className="text-white font-medium block">
                          {logoFile ? logoFile.name : "Upload image"}
                        </span>
                        PNG, JPG up to 5MB
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Brief Description */}
                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-zinc-400 font-medium text-sm">
                    Brief Description
                  </Label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={company?.description || ""}
                    placeholder="Tell us about your company's mission and culture..."
                    className={textAreaClass}
                  />
                </div>
              </Fieldset>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 w-full">
                <Button
                  type="button"
                  onPress={() => setIsModalOpen(false)}
                  className="border border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900 rounded-lg px-5 font-medium h-10 text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-5 transition-colors h-10 text-sm cursor-pointer disabled:opacity-50"
                >
                  {isLoading
                    ? "Uploading & Saving..."
                    : company
                      ? "Save Changes"
                      : "Register Company"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
