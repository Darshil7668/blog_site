
import { fetch, getPostDetails } from '@/components/Fetch'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '@/components/Index'
import React from 'react'
const PostDetails = ({ post }) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <Author author={post.author} />
                    <PostDetail post={post} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                    <Categories />
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
        props: {
            post: data,
        },
    };
}

export async function getStaticPaths() {
    const posts = await fetch();
    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    };
}