import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { ChartjsBarHorizontalComponent } from './chartjs/chartjs-bar-horizontal.component';
import { ChartjsRadarComponent } from './chartjs/chartjs-radar.component';
import { D3BarComponent } from './d3/d3-bar.component';
import { D3LineComponent } from './d3/d3-line.component';
import { D3PieComponent } from './d3/d3-pie.component';
import { D3AreaStackComponent } from './d3/d3-area-stack.component';
import { D3PolarComponent } from './d3/d3-polar.component';
import { D3AdvancedPieComponent } from './d3/d3-advanced-pie.component';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbUserModule,
} from '@nebular/theme';
const components = [
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3AdvancedPieComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
];

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
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
