import React from 'react';

function Articles() {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-black">
            <div className="max-w-md w-full px-4 py-8 bg-black text-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-green-700 mb-4">Article Title</h1>
                <div className="mb-4">
                    <p className="text-sm text-gray-400"></p>
                </div>
                <div className="mb-6">
                    <img src="article-image.jpg" alt="Article" className="w-full rounded-lg" />
                </div>
                <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget turpis sed nisi interdum rutrum. Integer ut orci sit amet arcu faucibus volutpat vel sit amet sem. Sed eget odio eget nisi bibendum tincidunt.</p>
            </div>
        </div>
    );
};

export default Articles;
