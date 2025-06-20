import React from "react";
import { AuthContext } from "../authContext";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../globalContext";
import { ChevronDown, ChevronUp, Plus, Upload, User } from "lucide-react"
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";
import icon3 from "../assets/icon-3.png";
import icon4 from "../assets/icon-4.png";
import icon5 from "../assets/icon-5.png";
import icon6 from "../assets/icon-6.png";
import profImg from "../assets/prof-img.png";
import { Link } from "react-router-dom";


export const UserHeader = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { state } = React.useContext(GlobalContext);

  const setupLinks= [
    {
      value: "Item and Values",
      src: icon1,
      link: "/user/item-manager/table1",  
    }, 
    {
      value: "Inventory Duplicate",
      src: icon2,
      link: "/user/item-manager/table3",  
    },
    {
      value: "Core Gacha",
      src: icon3,
      link: "/user/item-manager/table2",
    },
    {
      value: "Child Gacha",
      src: icon4,
      link: "/user/item-manager/table5",
    },
    
  ]

  const simLinks= [
    {
      value: "Step Simulation",
      src: icon5,
      link: "/user/step-simulation",  
    }, 
    {
      value: "Target Simulation",
      src: icon6,
      link: "/user/target-simulation",  
    },
  ]


  
  return (
    /*<>
      <div className={`sidebar-holder ${!state.isOpen ? "open-nav" : ""}`}>
        <div className="sticky top-0 h-fit">
          <div className="w-full p-4 bg-sky-500">
            <div className="text-2xl font-bold text-center text-white">
              User
            </div>
          </div>
          <div className="w-full sidebar-list">
            <ul className="flex flex-wrap">
              <li className="hidden block w-full list-none dashboard">
                <NavLink
                  to="/user/dashboard"
                  className={`${
                    state.path == "user" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="hidden block w-full list-none user-rarity">
                <NavLink
                  to="/user/rarity"
                  className={`${
                    state.path == "raritys" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Raritys
                </NavLink>
              </li>

              <li className="hidden block w-full list-none user-child">
                <NavLink
                  to="/user/child"
                  className={`${
                    state.path == "childs" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Childs
                </NavLink>
              </li>

              <li className="hidden block w-full list-none core-output">
                <NavLink
                  to="/user/core_output"
                  className={`${
                    state.path == "core_outputs" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Core Outputs
                </NavLink>
              </li>

              <li className="hidden block w-full list-none setting">
                <NavLink
                  to="/user/setting"
                  className={`${
                    state.path == "settings" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Settings
                </NavLink>
              </li>

              <li className="hidden block w-full list-none item-type">
                <NavLink
                  to="/user/item_type"
                  className={`${
                    state.path == "item_types" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Item Types
                </NavLink>
              </li>

              <li className="hidden block w-full list-none core">
                <NavLink
                  to="/user/core"
                  className={`${
                    state.path == "cores" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Cores
                </NavLink>
              </li>

              <li className="hidden block w-full list-none scheduling">
                <NavLink
                  to="/user/scheduling"
                  className={`${
                    state.path == "schedulings" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Schedulings
                </NavLink>
              </li>

              <li className="block w-full list-none">
                <NavLink
                  to="/user/projects"
                  className={`${
                    state.path == "projectss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Projects
                </NavLink>
              </li>

              <li className="hidden block w-full list-none post">
                <NavLink
                  to="/user/posts"
                  className={`${
                    state.path == "postss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Posts
                </NavLink>
              </li>

              <li className="hidden block w-full list-none project_items">
                <NavLink
                  to="/user/project_items"
                  className={`${
                    state.path == "project_itemss"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Project Items
                </NavLink>
              </li>

              <li className="hidden block w-full list-none added_items">
                <NavLink
                  to="/user/added_items"
                  className={`${
                    state.path == "added_itemss" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Added Items
                </NavLink>
              </li>

              <li className="hidden block w-full list-none inventory_protection">
                <NavLink
                  to="/user/inventory_protection"
                  className={`${
                    state.path == "inventory_protections"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Inventory Protections
                </NavLink>
              </li>

              <li className="block w-full list-none">
                <NavLink
                  to="/user/profile"
                  className={`${
                    state.path == "profile" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Profile
                </NavLink>
              </li>
              <li className="block w-full list-none">
                <NavLink
                  to="/user/login"
                  onClick={() =>
                    dispatch({
                      type: "LOGOUT",
                    })
                  }
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>*/

    <>
    {/* Sidebar */}
      
      <div className="sticky top-0 flex flex-col h-screen text-white w-60 bg-[#262626] px-2 ">
        {/* Header */}
        <div className="p-4 border-gray-700">
          <h1 className="text-3xl font-bold text-white">Gacha</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <div className="">
            {/* Project Section */}
            <div className= "w-full px-4 pt-4 pb-4 font-normal">
              <span className="text-[1.1rem] font-normal text-[#B2BEB5] ">Project</span>
              <Link to="/user/projects" >
              <div className="w-[210px] -ml-[.5rem] mt-3 p-3 rounded-[6px]  flex items-center border border-[#6F6F6F80] justify-between">
                <span className="text-[#B2BEB5] text-[1.1rem] ">Silver chest</span>
                <div className="flex flex-col">
                  <ChevronUp className="w-3 h-3" />
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
              </Link>
            </div>

            {/* Set-up Section */}
            <hr className= "mt-[.6rem] -ml-[.5rem] border-1 border-[#6F6F6F80] h-[1px]"/>

            <div>
              <div className="mb-2 px-4 mt-3 block text-[1rem] font-normal text-[#B2BEB5]">Set-up</div>
              <div className="relative w-full h-full sidebar-list">
                <ul className= "relative flex flex-col h-full">
                  {setupLinks.map((item, index) => (
                    
                    <li className="block w-full list-none " key={index}>
                      <NavLink to={item.link} className="p-0">
                        <img src= {item.src} className="inline-block w-5 h-5 rounded"/>
                        <span className="font-normal text-[1rem] ml-3">{item.value}</span>
                      </NavLink>
                    </li>
                  
                  ))}
                  
                </ul>
              </div>
            </div>

            {/* Simulate Section */}
            <hr className= "mt-[.6rem] -ml-[.5rem] border-1 border-[#6F6F6F80] h-[1px]"/>
            <div>
              
              <div className=" mb-2 px-4 mt-3 block text-[1rem] font-normal text-[#B2BEB5] ">Simulate</div>
              <div className="relative w-full h-full sidebar-list">
                <ul className= "relative flex flex-col h-full">
                  {simLinks.map((item, index) => (
                    
                    <li className="block w-full list-none dashboard" key={index}>
                      <NavLink to={item.link}  className="p-0">
                        <img src= {item.src} className="inline-block w-5 h-5 rounded"/>
                        <span className="font-normal text-[1rem] ml-3">{item.value}</span>
                      </NavLink>
                    </li>
                  
                  ))}
                  
                </ul>

              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">

              <img src={profImg} alt="Profile" className="w-8 h-8 mr-2 rounded-full" />

              <span className="text-sm">My profile</span>
            </div>
            <div className="flex flex-col">
              <ChevronUp className="w-3 h-3" />
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
