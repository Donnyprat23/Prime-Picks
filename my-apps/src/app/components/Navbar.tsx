"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleLogout } from "../actions/logout";


export default function NavBar() {
  const [authCookie, setAuthCookie] = useState("");

  useEffect(() => {
    const getToken = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="))
        ?.split("=")[1];
      setAuthCookie(cookie || "");
    };
    getToken();
  }, []);

  const handleLogoutClick = async () => {
    await handleLogout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          type="email"
          placeholder="Search Something..."
          className="w-full outline-none bg-white pl-4 text-sm"
        />
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
        >
          Search
        </button>
      </div> */}
      <header className="flex py-4 px-4 sm:px-10 sticky top-0 bg-white min-h-[70px] tracking-wide z-50 border-b border-black">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <a href="">
            <h1 className="font-bold text-2xl">PrimePicks</h1>
          </a>
          <div
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
            id="collapseMenu"
          >
            <button
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
              id="toggleClose"
            >
              <svg
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
              </svg>
            </button>
            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img
                    alt="logo"
                    className="w-36"
                    src="https://readymadeui.com/readymadeui.svg"
                  />
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <Link
                  className="text-black hover:text-[#903167] block font-semibold text-[15px]"
                  href="/"
                >
                  HOME
                </Link>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <Link
                  className="text-black hover:text-[#903167] block font-semibold text-[15px]"
                  href="/products"
                >
                  PRODUCTS
                </Link>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <Link
                  className="text-black hover:text-[#903167] block font-semibold text-[15px]"
                  href="/wishlist"
                >
                  WISHLIST
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex max-lg:ml-auto space-x-3">
            {authCookie ? (
              <button
                onClick={handleLogoutClick}
                className="rounded-md px-4 py-2 text-sm font-bold text-black border border-black bg-white transition-all ease-in-out duration-300 hover:bg-[#903167]"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-sm font-bold text-black border border-black bg-white transition-all ease-in-out duration-300 hover:bg-[#903167]"
              >
                LOGIN
              </Link>
            )}
            <button className="lg:hidden" id="toggleOpen">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="PJLV PJLV-ibYIsDR-css"></div>
    </>
  );
}
