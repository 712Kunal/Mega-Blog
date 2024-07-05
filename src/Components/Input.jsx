import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id=useId();
    return(
    <div className='w-full'>

        {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
        
        <input type={type} className={`px-3 rounded-lg bg-[#f2f1f1] text-black
           outline-none focus:bg-gray-50 duration-200 w-full boder h-10 ${className}`}
           ref={ref}
           {...props}
           id={id}
            />
    </div>
)})

export default Input