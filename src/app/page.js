import React from 'react';
import {auth} from "@/app/auth";
import {redirect} from "next/navigation";
import UserNavigation from "@/app/components/UserNavigation";
import AdminPage from "@/app/admin/page";
import ProductCollections from "@/app/components/ProductCollections";

const HomePage = async () => {
    const session = await auth()
    console.log(session,'session');
    if(!session){
        redirect('/login');
    }
  return (
    <>
        {
            session?.role === 'user' &&
            <>  <UserNavigation userName={session?.userName}/>
                <ProductCollections/>
            </>
        }
        {
            session?.role === 'admin' && <AdminPage/>
        }
    </>
  );
};

export default HomePage;
