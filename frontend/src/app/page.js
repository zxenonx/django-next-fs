"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Deletes a menu item with the spcecfied ID.
 * @param {number} id ID of the menu item.
 */
async function deleteMenu(id){
  const response = await fetch(`http://localhost:8000/api/menus/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return Promise.resolve()
}

/**
 * Retrieves all menus from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of menus.
 * @throws {Error} If the API request fails.
 */
async function getAllMenus() {
  const response = await fetch("http://localhost:8000/api/menus/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}



/**
 * Represents a single menu item.
 * @returns {JSX.Element} JSX representing a single menu item.
 */
function MenuItem({ id, name }) {
  return (
    <li className="">
      <div className="">
        <h3 className="">{name}</h3>
        <button
          className=""
          onClick={() => deleteMenu(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

/**
 * The main component of the application.
 */
export default function Home() {
  const router = useRouter();
  const [menus, setMenuItems] = useState([]);
  const params = useSearchParams();


  // state for displaying a success message
  const [successMessage, setSuccessMessage] = useState({
    show: false,
    type: "",
  });

  // state for displaying an error message
  const [errorMessage, setErrorMessage] = useState(null);

  // fetch menu items on component mount
  useEffect(() => {
    getAllMenus().then(setMenuItems);
  }, []);

  // detect changes in url params for success messages
  useEffect(() => {
    const timer = setTimeout(() => {
      if(successMessage.show) {
        setSuccessMessage({
          show: false,
          type: "",
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [params, router]);

  // automatically hide success message after 3 seconds
  useEffect(() => {
    if (successMessage.show) {
      setTimeout(() => {
        setSuccessMessage({
          show: false,
          type: "",
        });
      }, 5000);
    }
  }, [successMessage]);

  // handle deletion of a menu item
  const handleDelete = (id) => {
    setMenuItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="">
      <h1 className="">Menu</h1>
      <ul className="">
        {menus.map((menu) => (
          <MenuItem
            key={menu.id}
            id={menu.id}
            name={menu.name}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}

