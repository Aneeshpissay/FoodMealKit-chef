import React from 'react';
import ReactPlayer from 'react-player'

export const Video = (props) => {
    const {
        url
    } = props;
    console.log(props)
    return (
        <div>
            <ReactPlayer url={url} controls width={600} playing={true} />
        </div>
    )
}