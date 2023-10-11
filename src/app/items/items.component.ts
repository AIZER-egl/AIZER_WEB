import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { ItemsService } from '../items.service';
import { AlertsService } from '../alerts.service';
import type { Items } from 'src/@types/groups/items';
import { ShipmentStatus, Shipments } from 'src/@types/groups/shipment';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent {
  public content_type: 'items' | 'shipments';
  public content: any;
  public content_original: any;
  public action: 'create' | 'edit' | 'view';

  public group_uuid: string = '';
  public selectedItems: Items[] = [];
  public currentPage: number = 0;
  constructor(
    private router: Router,
    private urlSerializer: UrlSerializer,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private alertsService: AlertsService,
  ) {
    
    this.content_type = this.getContentType(this.url)[0];
    this.action = this.getContentType(this.url)[1];
    this.group_uuid = this.url[2];

    if (this.content_type == 'items' && (this.action == 'edit' || this.action == 'view')) {
      this.itemsService.getItem(this.group_uuid, this.url[4]).subscribe({
        next: (data) => {
          this.content = data?.item;
          this.content_original = data?.item;
          this.patchValue();
        },
        error: () => {
          window.location.href = `/groups/${this.group_uuid}?q=items`;
          this.alertsService.danger('No se ha podido procesar la solicitud');
        },
      });
    } else if (this.content_type == 'shipments' && (this.action == 'edit' || this.action == 'view')) {
      this.itemsService.getShipments(this.group_uuid).subscribe({
        next: (data) => {
          this.content = data;
          this.content_original = data;
        },
        error: () => {
          window.location.href = `/groups/${this.group_uuid}?q=items`;
          this.alertsService.danger('No se ha podido procesar la solicitud');
        },
      });
    } else if (this.content_type == 'shipments' && this.action == 'create') {
      this.itemsService.getItems(this.group_uuid).subscribe({
        next: (data) => {
          this.content = data;
          this.content_original = data;
        },
        error: () => {
          window.location.href = `/groups/${this.group_uuid}?q=items`;
          this.alertsService.danger('No se ha podido procesar la solicitud');
        },
      });
    }
  }

  private patchValue() {
    if (this.content_type == 'items' && this.action == 'edit') {
      this.editItemForm.patchValue({
        name: this.content.name,
        description: this.content.description,
        price: this.content.price,
        amount: this.content.amount,
      });
    }
  }

  public createItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    description:  ['', Validators.required],
    price: ['', Validators.required],
  });

  public editItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    description:  ['', Validators.required],
    price: ['', Validators.required],
    amount: ['', Validators.required],
  });

  public createShipmentForm = this.formBuilder.group({
    store: ['', Validators.required],
    delieveryFee: ['', Validators.required],
    delieveryReference: ['', Validators.required],
    delieveryStatus: ['', Validators.required],
  })

  public submitCreateItemForm() {
    this.itemsService.createItem(this.group_uuid, {
      name: this.createItemForm.value.name!,
      description: this.createItemForm.value.description!,
      price: Number(this.createItemForm.value.price!),
    }).subscribe({
      next: () => {
        window.location.href = `/groups/${this.group_uuid}?q=items`;
        this.alertsService.success('Producto creado!')
      },
      error: (error) => this.alertsService.danger(error.error.message),
    });
  }

  public addItemToShipment(itemUuid: string) {
    this.selectedItems.push(this.content.items.find((i: Items) => i.uuid == itemUuid));
    this.content.items = this.content.items.filter((i: Items) => i.uuid != itemUuid);
  }
  public removeItemToShipment(itemUuid: string) {
    let itemToRemove: Items = this.selectedItems.find((i) => i.uuid == itemUuid)!;
    itemToRemove.amount = this.content_original.items.find((i: Items) => i.uuid == itemUuid)?.amount || 0;
    this.content.items.push(itemToRemove);
    this.selectedItems = this.selectedItems.filter((i) => i.uuid != itemUuid);
  }
  public substractItemAmountToShipment(itemUuid: string) {
    this.selectedItems = this.selectedItems.map((i) => {
      if (i.uuid == itemUuid) {
        i.amount = i.amount == 0 ? 0 : i.amount - 1;
      }
      return i;
    });
  }
  public addItemAmountToShipment(itemUuid: string) {
    this.selectedItems = this.selectedItems.map((i) => {
      if (i.uuid == itemUuid) {
        i.amount = i.amount + 1;
      }
      return i;
    });
  }

  public submitEditItemForm() {
    this.itemsService.updateItem(this.group_uuid, this.content.uuid, {
      name: this.editItemForm.value.name || '',
      description: this.editItemForm.value.description || '',
      price: Number(this.editItemForm.value.price),
      amount: Number(this.content.amount),
    }).subscribe({
      next: () => this.alertsService.success('Producto actualizado!'),
      error: (error) => this.alertsService.danger(error.error.message),
    });
  }

  public submitCreateShipmentForm() {
    this.itemsService.createShipment(this.group_uuid, {
      items: this.selectedItems.map((i) => { return { item: i.uuid, quantity: i.amount } }),
      store: this.createShipmentForm.value.store || '',
      delieveryFee: Number(this.createShipmentForm.value.delieveryFee) || 0,
      delieveryStatus: (this.createShipmentForm.value.delieveryStatus || 'pending') as ShipmentStatus,
      delieveryReference: this.createShipmentForm.value.delieveryReference || '',
    }).subscribe({
      next: () => {
        window.location.href = `/groups/${this.group_uuid}?q=items`;
        this.alertsService.success('Envío creado!')
      },
      error: (error) => this.alertsService.danger(error.error.message),
    })
  }

  public deleteItem(uuid: string) {
    this.itemsService.deleteItem(this.group_uuid, uuid).subscribe({
      next: () => {
        window.location.href = `/groups/${this.group_uuid}/items`;
        this.alertsService.success('Producto eliminado!')
      },
      error: (error) => this.alertsService.danger(error.error.message),
    });
  }

  public url = this.urlSerializer.serialize(this.router.createUrlTree([], { relativeTo: this.router.routerState.root })).toLowerCase().split('/');
  private getContentType(url: string[]): ['items' | 'shipments', 'create' | 'edit' | 'view'] {
    if (url.includes('shipments')) {
      if (url.includes('create')) {
        return ['shipments', 'create'];
      } else if (url.includes('edit')) {
        return ['shipments', 'edit'];
      } else {
        return ['shipments', 'view'];
      }
    } else {
      if (url.includes('create')) {
        return ['items', 'create'];
      } else if (url.includes('edit')) {
        return ['items', 'edit'];
      } else {
        return ['items', 'view'];
      }
    }
  }
}
