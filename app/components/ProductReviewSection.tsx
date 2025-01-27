"use client";

import Link from "next/link";
import { useState } from "react";
import { StarRating } from "./StarRating";
import ReviewForm from "./ReviewForm";
import type { Review } from "@/app/components/InterfaceType";
import { deleteReview } from "@/app/actions/Review";
import { useRouter } from "next/navigation";

function ReviewCard({
  id,
  title,
  subtitle,
  content,
  imageUrl,
  rating,
  createdAt,
  userId,
  currentUserId,
}: Review & { currentUserId?: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteReview(id.toString());
      if (result) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 hover:bg-black/30 transition-all duration-300">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-zinc-300 text-sm mt-0.5">{subtitle}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <StarRating rating={rating} />
              <span className="text-sm font-medium text-orange-500">
                {rating}/5
              </span>
            </div>
            <div className="flex items-center gap-4">
              <time className="text-sm text-zinc-400">
                {new Date(createdAt).toLocaleString("en-AU", {
                  timeZone: "Australia/Sydney",
                })}
              </time>
              {userId === currentUserId && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <span className="text-sm">Deleting...</span>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        {imageUrl && (
          <div className="relative w-full aspect-video max-h-[400px] rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Review image"
              className="object-contain w-full h-full bg-black/40"
            />
          </div>
        )}
        <p className="text-zinc-300 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export default function ProductReviewSection({
  userId,
  productId,
  reviews,
}: {
  userId: string | undefined;
  productId: string;
  reviews: Review[];
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const isLoggedIn = userId !== undefined;
  const hasUserReviewed = userId
    ? reviews.some((review) => review.userId === userId)
    : false;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
        reviews.length
      : 0;

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-sm text-zinc-400">
                  {reviews.length} verified review{reviews.length !== 1 && "s"}
                </span>
              </div>
            </div>
          </div>
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              Login to Write a Review
            </Link>
          ) : hasUserReviewed ? (
            <div className="text-zinc-400 text-sm">
              You have already reviewed this product
            </div>
          ) : (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              {showReviewForm ? "Cancel Review" : "Write a Review"}
            </button>
          )}
        </div>

        {showReviewForm && isLoggedIn && userId && !hasUserReviewed && (
          <ReviewForm
            onClose={() => setShowReviewForm(false)}
            productId={productId}
            userId={userId}
          />
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} currentUserId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
