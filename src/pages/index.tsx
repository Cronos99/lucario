import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const CreatePostWizrad = () => {

  const {user} = useUser();
  if (!user){
    return null;
  }
  return (
    <div className="flex gap-4 w-full">
      <img src={user.profileImageUrl} alt="Profile Image" className="w-16 h-16 rounded-full"/>
      <input placeholder="enter text!" className="bg-transparent grow outline-none"/>
    </div>
  )

}

const Home: NextPage = () => {
  const user  = useUser();

  const {data} = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
         <div className=" h-full w-full md:max-w-2xl border-x border-slate-400"> 
          <div className="border-b border-slate-400 p-4">
            <div className="flex justify-center">{!user.isSignedIn && <SignInButton />}</div>
            {user.isSignedIn && <CreatePostWizrad/>}
            
          </div>
          
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"></SignIn>

          <div className="flex flex-col">
            {data?.map((post) => (
              <div key={post.id} className="p-8 border-b border-slate-400">{post.content}</div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
