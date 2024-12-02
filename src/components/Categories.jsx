import React from 'react';

// Sample JSON data for categories
const categoriesData = [
    { name: "Computer & Office", emoji: "💻" },
    { name: "Collectibles & Toys", emoji: "🧸" },
    { name: "Books", emoji: "📚" },
    { name: "Fashion/Clothes", emoji: "👗" },
    { name: "Sports & Outdoors", emoji: "🏀" },
    { name: "Electronics", emoji: "📱" },
    { name: "Food & Grocery", emoji: "🍎" },
    { name: "Music", emoji: "🎵" },
    { name: "Health & Beauty", emoji: "💄" },
    { name: "Gaming/Consoles", emoji: "🎮" },
    { name: "Watches", emoji: "⌚" },
    { name: "Printers", emoji: "🖨️" },
    { name: "Projectors", emoji: "📽️" },
    { name: "Skin Care", emoji: "🧴" },
    { name: "Photo/Video", emoji: "📸" },
    { name: "Office Supplies", emoji: "🖊️" }
];

const Categories = () => {
    return (
        <section className="max-w-screen-xl p-8 antialiased md:p-16">
            <div className="mx-auto p-8 2xl:px-0 bg-secondary rounded">
                <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shop by category</h2>
                    <a href="#" title=""
                       className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500">
                        See more categories
                        <svg className="ms-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 12H5m14 0-4 4m4-4-4-4"/>
                        </svg>
                    </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {categoriesData.map((category, index) => (
                        <a key={index}
                           href="#"
                           className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span className="me-2 text-2xl">{category.emoji}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
            </a>
            ))}
        </div>
</div>
</section>
);
}

export default Categories;