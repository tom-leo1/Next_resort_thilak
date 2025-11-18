import React from 'react';
import {auth} from "@/app/auth";
import {redirect} from "next/navigation";
import AdminNavigation from "@/app/components/AdminNavigation";
import AddProductForm from "@/app/components/AddProductForm";

const AdminPage =async () => {
    const session = await auth()
    if(!session){
        redirect('/login');
    }
    console.log(session);
  return (
    <>
        <AdminNavigation/>
        <AddProductForm/>
    </>
  );
};

export default AdminPage;
