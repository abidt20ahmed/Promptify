'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    const promptId = 'searchParams.get("id")';

    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();
                console.log(data);
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!promptId) return alert("Missing PromptId!");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
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

    if (loading) {
        // Suspense: Show loading indicator or fallback UI while data is being fetched
        return <img
            src='assets/icons/loader.svg'
            width={50}
            height={50}
            alt='loader'
            className='absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2'
        />;
    }

    return (
        <Suspense fallback={<img src='assets/icons/loader.svg' alt='Loading' />}>
            <Form
                type='Update'
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>
    );
};

export default UpdatePrompt;
