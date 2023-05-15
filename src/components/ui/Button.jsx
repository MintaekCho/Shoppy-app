import React from 'react';

export default function Button({text, onClick}) {
    return (
        <button className='bg-red-400 px-4 py-2 rounded-sm text-white hover:brightness-110' onClick={onClick}>
            {text}
        </button>
    );
}

