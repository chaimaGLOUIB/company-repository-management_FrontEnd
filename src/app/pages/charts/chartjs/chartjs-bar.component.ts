import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { RapportService } from '../../../services/rapport/rapport.service';
import { DatePipe } from '@angular/common';
import { EquipementService } from '../../../services/equipement/equipement.service';
import * as moment from 'moment'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-chartjs-bar',
  template: `<form [formGroup]="registerForm">

  <nb-select  formControlName="machine" fullWidth shape="rectangle" >

    <nb-option *ngFor="let p of machines" [value]="p.nom">{{p.nom}}</nb-option>

  </nb-select>
</form>
    <chart *ngIf='machines' type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  registerForm: FormGroup;
  rapportsW = [{}];
  myDate: any;
  rapports: any;
  options: any;
  Poste1 = [];
  Poste2 = [];
  Poste3 = [];
  Poste1N = [];
  Poste2N = [];
  Poste3N = [];
  machines: any
  themeSubscription: any;
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder,
    private theme: NbThemeService,
    private servEqui: EquipementService,
    private serviveRapport: RapportService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.serviveRapport.getRapports().subscribe(
        data => {
          this.rapports = data;

          console.log(data);
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
          var weekday = new Array(7);
          weekday[0] = "Dimanche";
          weekday[1] = "Lundi";
          weekday[2] = "Mardi";
          weekday[3] = "Mercredi";
          weekday[4] = "Jeudi";
          weekday[5] = "Vendredi";
          weekday[6] = "Samedi";


          this.data = {
            labels: [weekday[moment().subtract(7, 'd').day()],
            weekday[moment().subtract(6, 'd').day()],
            weekday[moment().subtract(5, 'd').day()],
            weekday[moment().subtract(4, 'd').day()],
            weekday[moment().subtract(3, 'd').day()],
            weekday[moment().subtract(2, 'd').day()],
            weekday[moment().subtract(1, 'd').day()],
            ],
            datasets: [{

              data: ['3', '32', '33', '4', '4', '84', '9'],
              label: 'Poste N°1',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            }, {
              data: ['8', '99', '4', '54', '24', '42', '45'],
              label: 'Poste N°2',
              backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.8),
            },
            {
              data: ['55', '11', '50', '53', '24', '8', '33'],
              label: 'Poste N°3',
              backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8),
            }
            ],
          };

          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
            },
          };
        });
    }, error => console.log(error));
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      machine: ['']

    });
    this.serviveRapport.getRapports().subscribe(
      data => {
        this.rapports = data;
        console.log(data);
      });
    this.servEqui.getEquipements().subscribe(
      data => {
        this.machines = data;
        console.log(data);
      });
    this.registerForm.get('machine').valueChanges.subscribe(val => {

      console.log('choo')
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
        var weekday = new Array(7);
        weekday[0] = "Dimanche";
        weekday[1] = "Lundi";
        weekday[2] = "Mardi";
        weekday[3] = "Mercredi";
        weekday[4] = "Jeudi";
        weekday[5] = "Vendredi";
        weekday[6] = "Samedi";
        let j = -1;
        for (let n = 7; n > 0; n--) {
          var date = new Date();
          date.setDate(date.getDate() - n);
          j++;
          this.Poste1[j] = 0;
          this.Poste2[j] = 0;
          this.Poste3[j] = 0;
          for (let i of this.rapports) {
            console.log(n);
            console.log(this.datePipe.transform(date, 'yyyy-MM-dd'));
            console.log(i.date);

            console.log(Date.parse(this.datePipe.transform(i.date, 'yyyy-MM-dd')));
            if ((Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd')) == Date.parse(this.datePipe.transform(i.date, 'yyyy-MM-dd'))) &&
              val == i.equipement.nom) {
              console.log('ici');

              if (i.posteRapport.numPoste == 1) {

                this.Poste1[j] = i.consommationGasoilRapport.consommationGasoil;


              }
              if (i.posteRapport.numPoste == 2) {
                this.Poste2[j] = i.consommationGasoilRapport.consommationGasoil;

              }
              if (i.posteRapport.numPoste == 3) {
                this.Poste3[j] = i.consommationGasoilRapport.consommationGasoil;

              }
            }
          }
        }

        console.log(this.Poste1);

        console.log(this.Poste2);

        console.log(this.Poste3);


        this.data = {
          labels: [weekday[moment().subtract(7, 'd').day()],
          weekday[moment().subtract(6, 'd').day()],
          weekday[moment().subtract(5, 'd').day()],
          weekday[moment().subtract(4, 'd').day()],
          weekday[moment().subtract(3, 'd').day()],
          weekday[moment().subtract(2, 'd').day()],
          weekday[moment().subtract(1, 'd').day()],
          ],
          datasets: [{

            data: [this.Poste1[0], this.Poste1[1], this.Poste1[2], this.Poste1[3], this.Poste1[4],
            this.Poste1[5], this.Poste1[6]],
            label: 'Poste N°1',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          }, {
            data: [this.Poste2[0], this.Poste2[1], this.Poste2[2], this.Poste2[3], this.Poste2[4],
            this.Poste2[5], this.Poste2[6]],
            label: 'Poste N°2',
            backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.8),
          },
          {
            data: [this.Poste3[0], this.Poste3[1], this.Poste3[2], this.Poste3[3], this.Poste3[4],
            this.Poste3[5], this.Poste3[6]],
            label: 'Poste N°3',
            backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8),
          }
          ],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
    });


  }

}


