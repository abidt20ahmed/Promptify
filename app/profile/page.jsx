'use client'

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
    };


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

                const filteredPosts = posts.filter(eachPost => eachPost._id !== post._id);

                setPosts(filteredPosts);

            } catch (error) {
                console.log(ErrorBoundary)
            }
        }
    }

    useEffect(() => {
        if (session?.user.id) fetchPosts();
    }, []);

    return (
        <Profile name={'My'} desc={'welcome to my profile'} data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
    )
}

export default MyProfile