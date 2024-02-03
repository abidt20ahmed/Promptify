"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true;
    return (
        <div className='container mx-auto flex justify-between mb-16 pt-3'>
            <Link href={'/'} className="flex justify-center gap-2" >
                <Image src={'/assets/images/chatbot.png'} height={40} width={40} alt="ChatBot Logo" />
                <p className="logo_text">Promptify</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ?
                    <div className="flex gap-3 md:gap-5">
                        <Link href={'/create-prompt'} className="black_btn">
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image src={'https://placekitten.com/360/360'} width={37} height={37} className="rounded-full" />
                        </Link>
                    </div>
                    :
                    <div></div>
                }
            </div>

        </div>
    )
}

export default Nav