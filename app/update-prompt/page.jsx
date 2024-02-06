'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Form from '@components/Form';

const fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const { data, error } = useSWR(`/api/prompt/${promptId}`, fetcher);
    const [post, setPost] = useState(data)

    const [submitting, setIsSubmitting] = useState(false);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!promptId) return alert('Missing PromptId!');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.back();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        // Handle error state
        return <div>Error loading data</div>;
    }

    if (!post) {
        // Handle loading state
        return (
            <img
                src="assets/icons/loader.svg"
                width={50}
                height={50}
                alt="loader"
                className="absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"
            />
        );
    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default UpdatePrompt;
