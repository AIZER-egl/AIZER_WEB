import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service.service';
import api from '../keys';
import { Observable } from 'rxjs';
import { ItemsObservable, ItemObservable, ShipmentObservable } from 'src/@types/observables/ItemObservable';
import { ShipmentQuantities, ShipmentStatus } from 'src/@types/groups/shipment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  public getItems(uuid: string) {
    return this.http.get(`${api.groupsEndpoint}/${uuid}/items`, { withCredentials: true }) as Observable<ItemsObservable | null>;
  }

  public getItem(uuid: string, itemUuid: string) {
    return this.http.get(`${api.groupsEndpoint}/${uuid}/items/${itemUuid}`, { withCredentials: true }) as Observable<ItemObservable | null>;
  }

  public createItem(uuid: string, { name, description, price }: { name: string, description: string, price: number }) {
    return this.http.put(`${api.groupsEndpoint}/${uuid}/items`, { name, description, price }, { withCredentials: true }) as Observable<ItemObservable | null>;
  }

  public updateItem(uuid: string, itemUuid: string, { name, description, price, amount }: { name: string, description: string, price: number, amount: number }) {
    return this.http.patch(`${api.groupsEndpoint}/${uuid}/items/${itemUuid}`, { name, description, price, amount }, { withCredentials: true }) as Observable<ItemObservable | null>;
  }

  public deleteItem(uuid: string, itemUuid: string) {
    return this.http.delete(`${api.groupsEndpoint}/${uuid}/items/${itemUuid}`, { withCredentials: true }) as Observable<ItemObservable | null>;
  }

  public setAmount(uuid: string, itemUuid: string, amount: number) {
    return this.http.patch(`${api.groupsEndpoint}/${uuid}/items/${itemUuid}`, { amount }, { withCredentials: true }) as Observable<ItemObservable | null>;
  }

  public createShipment(uuid: string, {
    items,
    store,
    delieveryFee,
    delieveryStatus,
    delieveryReference }: { items: ShipmentQuantities[], store: string, delieveryFee: number, delieveryStatus: ShipmentStatus, delieveryReference?: string }) {
    return this.http.put(`${api.groupsEndpoint}/${uuid}/items/shipments`, { items, store, delieveryFee, delieveryStatus, delieveryReference }, { withCredentials: true }) as Observable<ShipmentObservable | null>;
  }

  public getShipments(uuid: string) {
    return this.http.get(`${api.groupsEndpoint}/${uuid}/items/shipments`, { withCredentials: true }) as Observable<ShipmentObservable| null>;
  }

  public updateShipment(uuid: string, shipmentUuid: string, delieveryStatus: ShipmentStatus) {
    return this.http.patch(`${api.groupsEndpoint}/${uuid}/items/shipments/${shipmentUuid}`, { delieveryStatus }, { withCredentials: true }) as Observable<ShipmentObservable | null>;
  };
}
