import { Component, OnInit, Injectable } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user = '';
  nameUser = '';
  emailUser = '';
  photo = '';
  BarChart ;
  auth = false;

  private urlapi = 'https://my.api.mockaroo.com/test1.json';
  public dataMockaroo: any = null;

  constructor( private http: HttpClient) {
    if(this.auth){
      //Se obtienen la información del usuarion  loggeado
      this.user = localStorage.getItem('user');
      this.nameUser = JSON.parse(this.user)['name'];
      this.emailUser = JSON.parse(this.user)['email'];
      this.photo = JSON.parse(this.user)['image'];
    }
   }

   //Se obtiene la data aleatoria de la api de mockaroo.
   private getDataMockaroo() {
    const clave = '8670f7e0';
    const url = `${this.urlapi}?key=${clave}`;
    this.http
      .get(url)
      .subscribe(apiData => {
        this.dataMockaroo = apiData
        this.graficar(this.dataMockaroo);
      });
      
  }

  private graficar(data){
    let arrayPaises = [];
    let arrayNumberDuns = [];
    let arrayMoney = [];

    //Se llenan los arreglos de paises y numeros duns
    data.forEach(pais => {
      arrayPaises.push(pais.name);
      arrayNumberDuns.push(pais.duns_name);
      arrayMoney.push(pais.money);
    });
    // Data para grafica de barras:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
      labels: arrayPaises,
      datasets: [{
          label: '# de Money',
          data: arrayMoney,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
      }, 
      options: {
      title:{
          text:"Bar Chart",
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
      }
      });
    //console.log(data[0]['cctype_name']);
  }

  private validarLoggeo(){
    if (localStorage.getItem('user') == null) {
      localStorage.setItem('errorLogin', 'Se requiere autentificación');
      location.href = 'http://localhost:4200/loginGoogle';
    }else{
      this.auth = true;
    }
  }
  
  ngOnInit() {
    this.validarLoggeo();
    this.getDataMockaroo()

  }

}
