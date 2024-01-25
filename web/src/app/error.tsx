"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-5">
      <section>
        <h1 className="font-bold text-3xl">🤖</h1>
        <p>Something Unexpected Happened</p>
      </section>
      <section>
        <button
          className="py-2 px-3 rounded bg-blue-500 text-white"
          onClick={() => reset()}
        >
          Please Try Again
        </button>
      </section>
    </div>
  );
}
