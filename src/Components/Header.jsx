import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-purple-600 text-white p-4 flex gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : "hover:underline"
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/foods"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : "hover:underline"
        }
      >
        Foods
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : "hover:underline"
        }
      >
        Users
      </NavLink>
    </header>
  );
}
