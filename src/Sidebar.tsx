"use client";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiUserGroup,
  HiViewBoards,
  HiUsers,
  HiBriefcase,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export function SidebarComponent() {
  return (
    <Sidebar aria-label="Default sidebar example" className="h-screen ">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards}>
            <Link to={"/seasons"}>Temporadas</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiUserGroup}>
            <Link to={"/teens"}>Jovenes</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiUsers}>
            <Link to={"/parents"}>Representantes</Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiBriefcase}>
            Equipo de trabajo
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
