import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import isNil from 'lodash-es/isNil';

import palettesJson from './palettes.json';

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
  templateUrl: './material-palette-picker.component.html',
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

  constructor() {

  }

  public ngOnInit(): void {
    this.palettes = palettesJson as Palette[];
    if (this.palette) {
      if (this.variant) {
        this.selectedPalette = this.palettes.find((palette: Palette) => {
          return palette.name === this.palette;
        });
        this.selectedPaletteVariant = this.selectedPalette.variants.find((variant: PaletteVariant) => {
          return variant.name === this.variant;
        });
        this.selectPalette(this.selectedPalette, this.selectedPaletteVariant);
      } else {
        this.openedPalette = this.palettes.find((palette: Palette) => {
          return palette.name === this.palette;
        });
      }
    } else if (this.color) {
      this.selectedPalette = this.palettes.find((palette) => {
        this.selectedPaletteVariant = palette.variants.find((variant) => {
          return variant.color === this.color;
        });
        return !isNil(this.selectedPaletteVariant);
      });
      this.selectPalette(this.selectedPalette, this.selectedPaletteVariant);
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
