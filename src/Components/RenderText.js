import React from 'react'

export default function RenderText({text, id}) {
    return(
        <p className={id}>{text}</p>
    )
}
