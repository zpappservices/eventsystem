/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const StyledImage = ({ src, className, alt, ...props }) => {
    return <img src={src} className={className} {...props} />;
}

export default StyledImage;