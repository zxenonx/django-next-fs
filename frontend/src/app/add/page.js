"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Asynchronously adds a menu to the API.
 *
 * @param {Object} data - The menu data to be added
 * @return {Promise} A promise that resolves with the JSON response
 */
async function addMenu(data) {
    const response = await fetch("http://localhost:8000/api/menus/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", price: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

        /**
     * Asynchronous function to handle form submission.
     *
     * @param {event} event - the event object
     * @return {Promise} a Promise that resolves when the form submission is complete
     */
    const onSubmit = async (event) => { 
        event.preventDefault();
        setIsLoading(true);
        addMenu(formData).then(() => {
            // navigate to the main page with a query param to show a success message
            router.push(`/?action=add`);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    // cleanup effect for resetting loading state
    useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    }, []);

    return (
        <form className="menu-form" onSubmit={onSubmit}>
            <label>
                Name
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                    }
                />
            </label>
            <label>
                Price
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={(event) =>
                        setFormData({ ...formData, price: event.target.value })
                    }
                />
            </label>  
            {error && <p>{error.message}</p>}

            <button type="submit" disabled={isLoading} className="add-button">
                Add
            </button>
            
            </form>
            )
            



        
}