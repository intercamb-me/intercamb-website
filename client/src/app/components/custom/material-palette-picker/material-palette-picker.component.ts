import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import find from 'lodash-es/find';
import isNil from 'lodash-es/isNil';

import palettesJson from 'app/components/custom/material-palette-picker/palettes.json';

export interface Palette {
  name: string;
  main: number;
  variants: PaletteVariant[];
}

export interface PaletteVariant {
  name: string;
  color: string;
  textColor: string;
}

export interface ColorSelected {
  palette: Palette;
  variant: PaletteVariant;
}

@Component({
  selector: 'app-material-palette-picker',
  template: `
    <div class="palette">
      <ng-container *ngFor="let palette of palettes; trackBy: trackByIndex">
        <span
          *ngIf="!openedPalette"
          [ngStyle]="{
            'background-color': palette.variants[palette.main].color,
            'color': palette.variants[palette.main].textColor
          }"
          (click)="displayVariants(palette)"
          class="color">
          <fa-icon *ngIf="palette === selectedPalette" [icon]="icons.check"></fa-icon>
        </span>
      </ng-container>
      <ng-container *ngIf="openedPalette">
        <span
          (click)="backToPaletteSelection()"
          class="color">
          <fa-icon [icon]="icons.arrowLeft"></fa-icon>
        </span>
        <span
          *ngFor="let variant of openedPalette.variants; trackBy: trackByIndex"
          [ngStyle]="{
            'background-color': variant.color,
            'color': variant.textColor
          }"
          (click)="selectPalette(openedPalette, variant)"
          class="color">
          <fa-icon *ngIf="variant === selectedPaletteVariant" [icon]="icons.check"></fa-icon>
        </span>
      </ng-container>
    </div>
  `,
  styles: [

  ],
})
export class MaterialPalettePickerComponent implements OnInit {

  @Input()
  public palette: string;
  @Input()
  public variant: string;
  @Input()
  public color: string;
  @Output()
  public colorSelected = new EventEmitter<ColorSelected>();

  public palettes: Palette[];
  public openedPalette: Palette;
  public selectedPalette: Palette;
  public selectedPaletteVariant: PaletteVariant;
  public selectedTextColor: string;
  public icons = {
    check: faCheck,
    arrowLeft: faArrowLeft,
  };

  constructor() {

  }

  public ngOnInit(): void {
    this.palettes = palettesJson as Palette[];
    if (this.palette) {
      if (this.variant) {
        this.selectedPalette = find(this.palettes, (palette: Palette) => {
          return palette.name === this.palette;
        });
        this.selectedPaletteVariant = find(this.selectedPalette.variants, (variant: PaletteVariant) => {
          return variant.name === this.variant;
        });
      } else {
        this.openedPalette = find(this.palettes, (palette: Palette) => {
          return palette.name === this.palette;
        });
      }
    } else if (this.color) {
      this.selectedPalette = find(this.palettes, (palette) => {
        this.selectedPaletteVariant = find(palette.variants, (variant) => {
          return variant.color === this.color;
        });
        return !isNil(this.selectedPaletteVariant);
      });
    }
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public displayVariants(palette: Palette): void {
    this.openedPalette = palette;
  }

  public backToPaletteSelection(): void {
    this.openedPalette = null;
  }

  public selectPalette(palette: Palette, variant: PaletteVariant): void {
    this.selectedPalette = palette;
    this.selectedPaletteVariant = variant;
    this.colorSelected.next({palette, variant});
  }
}
