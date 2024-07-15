import React from 'react';
import { Hub, HubInfo } from "../types/Hub";

export type AppProps = {
    hub: HubInfo[]
}

const HubSummary: React.FC<AppProps> = ({ hub }: AppProps) => {
    return (
        <div>
            {hub.map((h, index) => (
                <p key={index}>
                    {`${h.hub_id} => temperature: ${h.tempreture}C, humidity: ${h.humidity}%, timestamp: ${h.timestamp}`}
                </p>
            ))}
        </div>
    );
}

export default HubSummary;
