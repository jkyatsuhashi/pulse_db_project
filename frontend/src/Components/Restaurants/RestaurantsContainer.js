import RestaurantsParent from './RestaurantsParent'
export default function RestaurantsContainer({host, port}) {
    return (
        <div>
            <RestaurantsParent host={host} port={port} />
        </div>
    )
}