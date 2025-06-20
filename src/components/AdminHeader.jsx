import React from "react";
import { AuthContext } from "../authContext";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../globalContext";
export const AdminHeader = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { state } = React.useContext(GlobalContext);

  return (
    <>
      <div className={`sidebar-holder ${!state.isOpen ? "open-nav" : ""}`}>
        <div className="sticky top-0 h-fit">
          <div className="w-full p-4 bg-sky-500">
            <div className="text-white font-bold text-center text-2xl">
              Admin
            </div>
          </div>
          <div className="w-full sidebar-list">
            <ul className="flex flex-wrap">
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/dashboard"
                  className={`${
                    state.path == "admin" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/projects"
                  className={`${
                    state.path == "projectss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Projects
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/rarity"
                  className={`${
                    state.path == "raritys" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Raritys
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/photo"
                  className={`${
                    state.path == "photos" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Photos
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/item_type"
                  className={`${
                    state.path == "item_types" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Item Types
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/users"
                  className={`${
                    state.path == "userss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Users
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/profile"
                  className={`${
                    state.path == "profile" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Profile
                </NavLink>
              </li>
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/login"
                  onClick={() =>
                    dispatch({
                      type: "LOGOUT",
                    })
                  }
                >
                  Logout
                </NavLink>
              </li>

              <li className="list-none block hidden cms w-full">
                <NavLink
                  to="/admin/cms"
                  className={`${
                    state.path == "cmss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Cms
                </NavLink>
              </li>

              <li className="list-none hidden emails block w-full">
                <NavLink
                  to="/admin/email"
                  className={`${
                    state.path == "emails" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Emails
                </NavLink>
              </li>

              <li className="list-none hidden child block w-full">
                <NavLink
                  to="/admin/child"
                  className={`${
                    state.path == "childs" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Childs
                </NavLink>
              </li>

              <li className="list-none hidden core-output block w-full">
                <NavLink
                  to="/admin/core_output"
                  className={`${
                    state.path == "core_outputs" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Core Outputs
                </NavLink>
              </li>

              <li className="list-none block hidden settings w-full">
                <NavLink
                  to="/admin/setting"
                  className={`${
                    state.path == "settings" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Settings
                </NavLink>
              </li>

              <li className="list-none hidden cores block w-full">
                <NavLink
                  to="/admin/core"
                  className={`${
                    state.path == "cores" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Cores
                </NavLink>
              </li>

              <li className="list-none hidden scheduling block w-full">
                <NavLink
                  to="/admin/scheduling"
                  className={`${
                    state.path == "schedulings" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Schedulings
                </NavLink>
              </li>

              <li className="list-none hidden posts block w-full">
                <NavLink
                  to="/admin/posts"
                  className={`${
                    state.path == "postss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Posts
                </NavLink>
              </li>

              <li className="list-none block hidden project-items w-full">
                <NavLink
                  to="/admin/project_items"
                  className={`${
                    state.path == "project_itemss"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Project Items
                </NavLink>
              </li>

              <li className="list-none hidden added-items block w-full">
                <NavLink
                  to="/admin/added_items"
                  className={`${
                    state.path == "added_itemss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Added Items
                </NavLink>
              </li>

              <li className="list-none hidden inventory-protection block w-full">
                <NavLink
                  to="/admin/inventory_protection"
                  className={`${
                    state.path == "inventory_protections"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Inventory Protections
                </NavLink>
              </li>

              <li className="list-none hidden invoice block w-full">
                <NavLink
                  to="/admin/invoice"
                  className={`${
                    state.path == "invoices" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Invoices
                </NavLink>
              </li>

              <li className="list-none block hidden order w-full">
                <NavLink
                  to="/admin/order"
                  className={`${
                    state.path == "orders" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Orders
                </NavLink>
              </li>

              <li className="list-none hidden price block w-full">
                <NavLink
                  to="/admin/price"
                  className={`${
                    state.path == "prices" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Prices
                </NavLink>
              </li>

              <li className="list-none hidden product block w-full">
                <NavLink
                  to="/admin/product"
                  className={`${
                    state.path == "products" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Products
                </NavLink>
              </li>

              <li className="list-none hidden subscription block w-full">
                <NavLink
                  to="/admin/subscription"
                  className={`${
                    state.path == "subscriptions"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Subscriptions
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
