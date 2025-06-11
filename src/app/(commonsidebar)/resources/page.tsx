"use client";

import PageContentSection from "@/components/layout/page-content-section";
import PageHeaderSection from "@/components/layout/page-header-section";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useState, useEffect } from "react";
import { BlogPost } from "../types";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const ResourcePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = `
          query Publication($host: String = "vishnumohanan.hashnode.dev") {
              publication(host: $host) {
                  posts(first: 50) {
                      totalDocuments
                      edges {
                          node {
                              id
                              title
                              brief
                              slug
                              url,
                              subtitle,
                              coverImage {
                                url
                              }
                          }
                      }
                  }
              }
          }`;

        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          !result.data ||
          !result.data.publication ||
          !result.data.publication.posts
        ) {
          console.error("GraphQL response structure:", result);
          throw new Error("Invalid response structure from Hashnode API");
        }

        const { data } = result;
        const allPosts: BlogPost[] = data.publication.posts.edges.map(
          (edge: any) => edge.node,
        );

        setPostsList(allPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(
          "Sorry, we couldn't load the blog posts at the moment. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate pagination
  const totalPosts = postsList.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = postsList.slice(startIndex, endIndex);

  // Helper function to generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of the posts section
    const postsSection = document.getElementById("posts-section");
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <main className="space-y-8 mb-5">
        <PageHeaderSection
          title="Explore Resources"
          description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
        />
        <Separator />
        <PageContentSection title="My blogs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loading skeleton */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card shadow-sm overflow-hidden animate-pulse"
              >
                <Skeleton className="h-40 w-full rounded-t-2xl rounded-b-none" />
                <div className="flex flex-col space-y-1.5 p-6">
                  <Skeleton className="h-5 w-[250px] font-semibold tracking-tight text-lg line-clamp-2" />
                  <Skeleton className="h-5 w-[200px] mb-4 font-semibold tracking-tight text-lg line-clamp-2" />
                  <Skeleton className="h-4 w-[160px]" />
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </PageContentSection>
      </main>
    );
  }

  if (error) {
    return (
      <main className="space-y-8 mb-5">
        <PageHeaderSection
          title="Explore Resources"
          description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
        />
        <Separator />
        <PageContentSection title="My blogs">
          <div className="text-center py-8">
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </PageContentSection>
      </main>
    );
  }

  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title="Explore Resources"
        description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
      />
      <Separator />
      <PageContentSection title="My blogs">
        <div className="space-y-6" id="posts-section">
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title || "Blog post cover image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={currentPage === 1} // Only prioritize first page images
                  />
                </div>

                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="font-semibold tracking-tight text-lg line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-base line-clamp-3">
                    {post.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 items-center justify-end mt-8">
            <div className="text-center text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, totalPosts)} of{" "}
              {totalPosts} posts
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center ">
                <Pagination>
                  <PaginationContent>
                    {/* Previous button */}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}

                    {/* Page numbers */}
                    {pageNumbers.map((pageNum, index) => (
                      <PaginationItem key={index}>
                        {pageNum === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum as number)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    {/* Next button */}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </PageContentSection>
    </main>
  );
};

export default ResourcePage;
