"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createReview } from "@/app/actions/Review";
import { StarRating } from "@/app/components/StarRating";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const reviewSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(500, "Subtitle cannot exceed 500 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(5000, "Content cannot exceed 5000 characters"),
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  image: z
    .any()
    .refine((files) => {
      if (!files || !files[0]) return true;
      const file = files[0];
      return file.size <= MAX_FILE_SIZE;
    }, "Image size must be less than 5MB")
    .refine((files) => {
      if (!files || !files[0]) return true;
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Only .jpg, .jpeg, and .png files are allowed")
    .optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6">
      <p className="text-green-400">{message}</p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
      <p className="text-red-400">{message}</p>
    </div>
  );
}

export default function ReviewForm({
  onClose,
  productId,
  userId,
}: {
  onClose: () => void;
  productId: string;
  userId: string;
}) {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const currentRating = watch("rating");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (formData: ReviewFormData) => {
    try {
      setSuccessMsg(null);
      setErrorMsg(null);

      const data = new FormData();
      data.append("productId", productId);
      data.append("userId", userId);
      data.append("rating", formData.rating.toString());
      data.append("title", formData.title);
      if (formData.subtitle) {
        data.append("subtitle", formData.subtitle);
      }
      data.append("content", formData.content);
      if (formData.image?.[0]) {
        data.append("image", formData.image[0]);
      }
      await createReview(data);
      setSuccessMsg("Your review has been submitted successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
      router.refresh();
    } catch (error) {
      console.error("Failed to submit review:", error);
      setErrorMsg("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Write a Review</h2>
        <button onClick={onClose} className="text-zinc-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {successMsg && <SuccessMessage message={successMsg} />}
      {errorMsg && <ErrorMessage message={errorMsg} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Rating
          </label>
          <StarRating
            rating={currentRating}
            onRatingChange={(rating) => setValue("rating", rating)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Give your review a title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Subtitle
          </label>
          <input
            {...register("subtitle")}
            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Add a brief subtitle"
          />
          {errors.subtitle && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subtitle.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Review
          </label>
          <textarea
            {...register("content")}
            rows={4}
            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Share your experience with this product"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-xl bg-black/20 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-black hover:file:bg-orange-600"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">
              {errors.image.message?.toString()}
            </p>
          )}
          {previewUrl && (
            <div className="mt-4 relative w-full aspect-video max-h-[400px] rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain w-full h-full bg-black/40"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setValue("image", null);
                }}
                className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-2 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
