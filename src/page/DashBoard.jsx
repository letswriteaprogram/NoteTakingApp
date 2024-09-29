import React, { useEffect, useState } from "react";
import Header from "../components/util/Header";
import Sidebar from "../components/Sidebar";
import Noteslist from "../components/note/Noteslist";
import { SidebarProvider } from "../context/SidebarContext";



function DashBoard() {
  return (
    <SidebarProvider>
      <Header></Header>
      <section className="w-full  flex">
        <Sidebar />
        <Noteslist />
      </section>
    </SidebarProvider>
  );
}
export default DashBoard;
