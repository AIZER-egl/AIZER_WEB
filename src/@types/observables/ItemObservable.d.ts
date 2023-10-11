import { Items } from '../groups/items';
import { Shipments } from '../groups/shipment';

interface ItemsObservable {
    items: Items[];
}

interface ItemObservable {
    item: Items;
}

interface ShipmentsObservable {
    shipments: Shipments[];
}

interface ShipmentObservable {
    shipment: Shipments;
}

export { ItemObservable, ItemsObservable, ShipmentsObservable, ShipmentObservable };
