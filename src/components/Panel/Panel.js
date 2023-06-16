import React from 'react'

function Panel({ title, children }) {
    return (
        <div className='bg-zinc-50 border border-zinc-300 rounded-md p-3 shadow-md'>
            {
                title && (
                    <div className='pb-2 border-b border-b-zinc-300 mb-5'>
                        <h2 className='text-gray-600 text-lg font-semibold'>{title}</h2>
                    </div>
                )
            }
            {children}
        </div>
    )
}

export default Panel