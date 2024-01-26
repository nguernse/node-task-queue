"use client";

import { createScrapeJob } from "@/shared/actions/jobs";
import { SubmitButton } from "@/shared/components/SubmitButton";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateJobPage() {
  const [formState, setFormState] = useState<{
    message?: string;
    errors?: Record<string, any>;
  }>({});
  const [status, setStatus] = useState<
    "loading" | "idle" | "error" | "success"
  >("idle");
  const isDisabled = status === "loading" || status === "success";
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    setStatus("loading");
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await createScrapeJob(formData);

    setFormState(response);

    if (response.errors) {
      setStatus("error");
    } else {
      setStatus("success");
      alert("job submitted");
      router.push("/jobs");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-3">Scrape Website</h1>
      <form
        className="flex flex-col space-y-3 w-full md:max-w-lg rounded-md border bg-white shadow p-5"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col space-y-2">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            className="rounded bg-white border p-2"
            type="text"
            name="url"
            required
            placeholder="Enter URL"
          />
          {formState?.errors?.data &&
            formState.errors?.data.map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </fieldset>

        <SubmitButton disabled={isDisabled}>Submit</SubmitButton>

        {formState?.message && <p>{formState.message}</p>}
      </form>
    </main>
  );
}
