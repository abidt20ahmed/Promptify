'use client'

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MyProfile = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
    };


    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

    useEffect(() => {
        if (session?.user.id) fetchPosts();
    }, []);

    return (
        <Profile name={'My'} desc={'welcome to my profile'} data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
    )
}

export default MyProfile