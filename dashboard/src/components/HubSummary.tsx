import { Hub } from "../types/Hub";

export type AppProps ={
    hub: Hub
}

export default function HubSummary({hub} : AppProps): JSX.Element{
    return <p>{hub.hub_id}</p>;
}