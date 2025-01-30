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
          <Link to={"/seasons"}>
            <Sidebar.Item icon={HiViewBoards}>Temporadas</Sidebar.Item>
          </Link>
          <Link to={"/teens"}>
            <Sidebar.Item icon={HiUserGroup}>Jovenes</Sidebar.Item>
          </Link>
          <Link to={"/parents"}>
            <Sidebar.Item icon={HiUsers}>Representantes</Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiBriefcase}>
            Equipo de trabajo
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
