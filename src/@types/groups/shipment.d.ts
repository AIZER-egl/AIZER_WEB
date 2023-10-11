import type { Items } from './items';

type ShipmentStatus = 'pending' | 'shipped' | 'delievered' | 'cancelled' | 'returned';
interface ShipmentQuantities {
    item: string;
    quantity: number;
}

interface Shipments {
    uuid: string;
    items: ShipmentQuantities[];
    delieveryFee: number;
    delieveryStatus: ShipmentStatus;
    delieveryReference?: string;
    store: string;
    createdAt: Date;
    lastModified: Date;
}

interface FullShipmentQuantities {
    item: Items[];
    quantity: number;
}
interface FullShipments {
    uuid: string;
    items: FullShipmentQuantities[];
    delieveryFee: number;
    delieveryStatus: ShipmentStatus;
    delieveryReference?: string; // Clave de referencia (ej, numero de guía)
    store: string;
    createdAt: Date;
    lastModified: Date;
}

export { Shipments, FullShipmentQuantities, FullShipments, ShipmentQuantities, ShipmentStatus };
