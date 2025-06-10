import PageContentSection from "@/components/layout/page-content-section";
import PageHeaderSection from "@/components/layout/page-header-section";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BlogPost } from "../types";

const ResourcePage = async () => {
  const query = `
    query Publication($host: String = "vishnumohanan.hashnode.dev") {
        publication(host: $host) {
            posts(first: 5) {
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

  const { data } = await response.json();
  const postsList: BlogPost[] = data.publication.posts.edges.map(
    (edge: any) => edge.node
  );

  console.log("postsList :>> ", postsList);
  return (
    <main className="space-y-8 mb-5">
      <PageHeaderSection
        title="Explore Resources"
        description="A handpicked collection of tutorials, articles, videos, and tools I’ve found valuable throughout my journey — regularly updated and thoughtfully organized."
      />
      <Separator />
      <PageContentSection title="My blogs">
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
          {postsList.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
              <img
                className="w-full h-40 object-cover"
                src={post.coverImage.url}
                alt="cover-image"
              />
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-lg">
                  {post.title}
                </h3>
                <p className="text-gray-700 text-base">{post.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContentSection>
    </main>
  );
};

export default ResourcePage;
