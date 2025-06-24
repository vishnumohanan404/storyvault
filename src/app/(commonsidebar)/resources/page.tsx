'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import PageContentSection from '@/components/layout/page-content-section';
import PageHeaderSection from '@/components/layout/page-header-section';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { BlogPost } from '../types';

const ResourcePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line unicorn/no-null
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // eslint-disable-next-line unicorn/no-null
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

        const response = await fetch('https://gql.hashnode.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          console.error('GraphQL response structure:', result);
          throw new Error('Invalid response structure from Hashnode API');
        }

        const { data } = result;
        const allPosts: BlogPost[] = data.publication.posts.edges.map(
          (edge: any) => edge.node,
        );

        setPostsList(allPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
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
      for (let index = 1; index <= totalPages; index++) {
        pages.push(index);
      }
    } else {
      if (currentPage <= 3) {
        for (let index = 1; index <= 4; index++) {
          pages.push(index);
        }
        pages.push('ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis');
        for (let index = totalPages - 3; index <= totalPages; index++) {
          pages.push(index);
        }
      } else {
        pages.push(1, 'ellipsis');
        for (let index = currentPage - 1; index <= currentPage + 1; index++) {
          pages.push(index);
        }
        pages.push('ellipsis', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of the posts section
    const postsSection = document.querySelector('#posts-section');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <main className="mb-5 w-full space-y-8">
        <PageHeaderSection
          title="Explore Resources"
          description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
        />
        <Separator />
        <PageContentSection title="My blogs">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Loading skeleton */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-card animate-pulse overflow-hidden rounded-lg border shadow-sm"
              >
                <Skeleton className="h-40 w-full rounded-b-none rounded-t-2xl" />
                <div className="flex flex-col space-y-1.5 p-6">
                  <Skeleton className="line-clamp-2 h-5 w-[250px] text-lg font-semibold tracking-tight" />
                  <Skeleton className="mb-4 line-clamp-2 h-5 w-[200px] text-lg font-semibold tracking-tight" />
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
      <main className="mb-5 space-y-8">
        <PageHeaderSection
          title="Explore Resources"
          description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
        />
        <Separator />
        <PageContentSection title="My blogs">
          <div className="py-8 text-center">
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </PageContentSection>
      </main>
    );
  }

  return (
    <main className="mb-5 space-y-8">
      <PageHeaderSection
        title="Explore Resources"
        description="A handpicked collection of tutorials, articles, videos, and tools I've found valuable throughout my journey — regularly updated and thoughtfully organized."
      />
      <Separator />
      <PageContentSection title="My blogs">
        <div className="space-y-6" id="posts-section">
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map(post => (
              <div
                key={post.id}
                className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title || 'Blog post cover image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={currentPage === 1} // Only prioritize first page images
                  />
                </div>

                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-base text-gray-700">
                    {post.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end gap-6">
            <div className="text-center text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, totalPosts)} of{' '}
              {totalPosts} posts
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center">
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
                    {pageNumbers.map((pageNumber, index) => (
                      <PaginationItem key={index}>
                        {pageNumber === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() =>
                              handlePageChange(pageNumber as number)
                            }
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
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
