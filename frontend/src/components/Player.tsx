import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';


export default function Player({
                                   url} : {
    url : string
}) {
    return (
        <div className="w-full h-full">
            <MediaPlayer
                src={url}
                crossOrigin
                viewType='video'
                streamType='on-demand'
                logLevel='warn'

            >
                <MediaProvider />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                />
            </MediaPlayer>
        </div>
    );
}
