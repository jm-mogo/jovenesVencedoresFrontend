"use client";

import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiUserGroup,
  HiViewBoards,
  HiUsers,
  HiBriefcase,
} from "react-icons/hi";

export function SidebarComponent() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Temporadas
          </Sidebar.Item>
          <Sidebar.Item href="/teens" icon={HiUserGroup}>
            Jovenes
          </Sidebar.Item>
          <Sidebar.Item href="/parents" icon={HiUsers}>
            Representantes
          </Sidebar.Item>
          <Sidebar.Item href="/representantes" icon={HiBriefcase}>
            Equipo de trabajo
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}