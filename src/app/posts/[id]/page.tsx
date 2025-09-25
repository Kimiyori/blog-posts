import { postsApi } from "@/lib/api";
import { Post } from "@/types/post";
import { Metadata } from "next";
import { InvalidPostId, PostNotFound, PostDetail } from "./_components";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await postsApi.getAllPosts();
    const posts: Post[] = response.data;

    return posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await postsApi.getPostById(+id);
    const post: Post = response.data;

    return {
      title: post.title,
      description: post.body.slice(0, 160),
    };
  } catch (error) {
    return {
      title: "Статья не найдена",
      description: "Запрашиваемая статья не найдена.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return <InvalidPostId />;
  }

  const { data: post } = await postsApi.getPostById(postId);

  if (!post) {
    return <PostNotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PostDetail post={post} />
    </div>
  );
}
