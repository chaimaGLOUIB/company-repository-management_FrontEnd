import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import {
  NbSelectModule,

  NbActionsModule,
 
  NbAlertModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  
  NbDialogModule,
  NbPopoverModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbTreeGridModule,
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbUserModule,
} from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    MaterialModule,
    NbButtonModule,
    NbActionsModule,
  NbAlertModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbActionsModule,
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule, NbUserModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbButtonModule,
    NbDialogModule,
    NbPopoverModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
})
export class TablesModule { }
