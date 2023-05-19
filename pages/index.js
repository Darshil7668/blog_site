import { getPosts } from '@/components/Fetch';
import { Categories, PostCard, PostWidget } from '@/components/Index';
import FeaturedPosts from '@/section/FeaturedPost';

export default function Home({ posts }) {
  console.log("hi")
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
              <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
