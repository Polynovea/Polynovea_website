import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent, { type BlogPost } from "@/components/BlogContent";

async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? "https://admin.polynovea.in/api/content";
    const res = await fetch(`${apiBase}/blog-posts`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []).filter((p: BlogPost) => p.status === "published");
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const initialPosts = await getPublishedPosts();
  return (
    <>
      <Navbar />
      <BlogContent initialPosts={initialPosts} />
      <Footer />
    </>
  );
}
