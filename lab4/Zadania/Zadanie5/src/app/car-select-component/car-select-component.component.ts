import { Output } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';
import CarsJson from '../../assets/cars.json';
import { ICar } from '../model/icar';
import { ICars } from '../model/icars';
import { IModel } from '../model/imodel';

@Component({
  selector: 'app-car-select-component',
  templateUrl: './car-select-component.component.html',
  styleUrls: ['./car-select-component.component.css']
})
export class CarSelectComponentComponent {
  cars: ICars = CarsJson;
  allCars: Array<ICar> = this.cars.cars;
  selectedBrand: number = 0;
  models: Array<IModel> = [];
  selectedModel: number = 0;
  color: Array<string> = [];
  description: string = "";
  modelDisabled: boolean = false;
  colorDisabled: boolean = false;
  specDisabled: boolean = false;
  selectedColor: string = "";

  setSelectedBrand(event: any): void {
    this.selectedBrand = event.target.value;
    this.models = this.allCars[this.selectedBrand].models;
    this.modelDisabled = true;
    this.specDisabled = false;
    this.colorDisabled = false;
  }

  setSelectedModel(event: any): void {
    this.selectedModel = event.target.value;
    this.color = this.models[this.selectedModel].color
    this.description = this.models[this.selectedModel].description
    this.colorDisabled = true;
    this.specDisabled = false;
  }

  onNotifyDisabled(spdis: number): void{
    this.specDisabled = true;
  }

  onNotifyColor(slcol: number): void{
    this.selectedColor = this.color[slcol];
  }
}
