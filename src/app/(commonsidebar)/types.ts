export type BlogPost = {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  subtitle: string;
  coverImage: { url: string };
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  badges: string[];
  topic: string;
  featured: boolean;
  createdOn: string; // or Date if you parse it
};
