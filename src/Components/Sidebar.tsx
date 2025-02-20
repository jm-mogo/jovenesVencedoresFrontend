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
import { useAuth } from "../hooks/useAuth";

export function SidebarComponent({
  handleClose,
}: {
  handleClose?: () => void;
}) {
  const isAuthorized = useAuth("owner");
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="[&>div]:bg-transparent [&>div]:p-0"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup onClick={handleClose}>
          <Link to="/">
            <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
          </Link>

          <Link to={"/seasons"}>
            <Sidebar.Item icon={HiViewBoards}>Temporadas</Sidebar.Item>
          </Link>
          <Link to={"/teens"}>
            <Sidebar.Item icon={HiUserGroup}>Jovenes</Sidebar.Item>
          </Link>
          <Link to={"/parents"}>
            <Sidebar.Item icon={HiUsers}>Representantes</Sidebar.Item>
          </Link>
          {isAuthorized && (
            <Link to={"/workgroup"}>
              <Sidebar.Item icon={HiBriefcase}>Equipo de trabajo</Sidebar.Item>
            </Link>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
