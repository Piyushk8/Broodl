import React from 'react'
import type { Metadata } from "next";
import Main from '@/components/main';
import Dashboard from '@/components/dashboard';

export const metadata: Metadata = {
    title: "Broadl ⋅ Dashboard",
    description: "Dashboard",
  };

  

const DashboardPage = () => {
 
  return (
    <Main><Dashboard/></Main>
  )
}

export default DashboardPage