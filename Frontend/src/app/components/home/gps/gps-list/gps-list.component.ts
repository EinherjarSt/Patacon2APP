import { Component, OnInit, ViewChild } from '@angular/core';
import { Gps } from 'src/app/model-classes/gps';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { GpsService } from 'src/app/services/gps.service';
import { AddGpsComponent } from '../add-gps/add-gps.component';

@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.css']
})
export class GpsListComponent implements OnInit {

  gps: Gps[];
  displayedColumns: string[] = ["imei", "number", "brand", "model"];
  dataSource: MatTableDataSource<Gps>;
  dialogResult ="";


  //Esto es para ver como se ve
  testList: Gps[] = [
    {imei: '1111111111', number: '975730599', brand: 'China', model: 'Chino'},
    {
      "imei": "1624082004999",
      "number": "(597) 329-4696",
      "brand": "Ipsum Company",
      "model": "Amet Company"
    },
    {
      "imei": "1648080111199",
      "number": "(529) 506-0138",
      "brand": "Eu Odio Tristique Corp.",
      "model": "Suspendisse Institute"
    },
    {
      "imei": "1619100275999",
      "number": "(390) 952-7926",
      "brand": "Vulputate Ullamcorper Corporation",
      "model": "Gravida Inc."
    },
    {
      "imei": "1610061422599",
      "number": "(309) 819-4246",
      "brand": "Ac Incorporated",
      "model": "Ut Nec Urna Ltd"
    },
    {
      "imei": "1690041440099",
      "number": "(807) 583-9601",
      "brand": "Nulla In Ltd",
      "model": "Mauris Integer Limited"
    },
    {
      "imei": "1668080353599",
      "number": "(319) 700-3594",
      "brand": "Ante LLP",
      "model": "Amet Metus LLP"
    },
    {
      "imei": "1696060641299",
      "number": "(683) 423-8525",
      "brand": "Molestie Pharetra Inc.",
      "model": "Luctus Institute"
    },
    {
      "imei": "1614021433899",
      "number": "(930) 980-8740",
      "brand": "Et Lacinia Foundation",
      "model": "Aliquet Sem Limited"
    },
    {
      "imei": "1683071848799",
      "number": "(876) 631-1596",
      "brand": "Et Arcu Imperdiet Consulting",
      "model": "Ipsum Nunc Id LLP"
    },
    {
      "imei": "1687031160599",
      "number": "(548) 676-2169",
      "brand": "Urna Nullam Limited",
      "model": "Sagittis Felis Inc."
    },
    {
      "imei": "1637031246399",
      "number": "(565) 901-0089",
      "brand": "Nulla In Institute",
      "model": "Adipiscing Lobortis Risus Consulting"
    },
    {
      "imei": "1681121353799",
      "number": "(424) 484-1324",
      "brand": "Egestas Aliquam Nec Incorporated",
      "model": "Sollicitudin Adipiscing Ligula Limited"
    },
    {
      "imei": "1688032431099",
      "number": "(648) 423-1644",
      "brand": "Dolor Sit Amet Consulting",
      "model": "Convallis Incorporated"
    },
    {
      "imei": "1651071489099",
      "number": "(430) 742-7800",
      "brand": "Id Associates",
      "model": "Scelerisque Neque Nullam Limited"
    },
    {
      "imei": "1644052050099",
      "number": "(236) 260-4914",
      "brand": "Iaculis Foundation",
      "model": "Enim Commodo Consulting"
    },
    {
      "imei": "1656050897699",
      "number": "(891) 780-7182",
      "brand": "Tincidunt Pede Industries",
      "model": "Nisi Aenean Ltd"
    },
    {
      "imei": "1620091299799",
      "number": "(290) 778-3162",
      "brand": "Eget Lacus Mauris Industries",
      "model": "Malesuada Inc."
    },
    {
      "imei": "1691081109299",
      "number": "(489) 333-8254",
      "brand": "Cursus Consulting",
      "model": "Maecenas Ornare Industries"
    },
    {
      "imei": "1602010832699",
      "number": "(426) 753-5393",
      "brand": "Integer In Magna PC",
      "model": "Convallis Ligula Associates"
    },
    {
      "imei": "1688060326799",
      "number": "(292) 558-7018",
      "brand": "In Industries",
      "model": "Urna Ut Tincidunt Corporation"
    },
    {
      "imei": "1652050351999",
      "number": "(914) 137-8565",
      "brand": "Duis Foundation",
      "model": "Nec Corporation"
    },
    {
      "imei": "1652083073399",
      "number": "(587) 617-5077",
      "brand": "Dolor Consulting",
      "model": "Congue A Aliquet LLP"
    },
    {
      "imei": "1644052970099",
      "number": "(396) 568-5041",
      "brand": "Dictum Eleifend Nunc PC",
      "model": "Pharetra LLP"
    },
    {
      "imei": "1611041953199",
      "number": "(581) 854-4230",
      "brand": "Lobortis Mauris Ltd",
      "model": "Ac Libero Limited"
    },
    {
      "imei": "1623122567699",
      "number": "(178) 358-6995",
      "brand": "Vitae Velit PC",
      "model": "Ridiculus Mus LLP"
    },
    {
      "imei": "1620082894599",
      "number": "(583) 318-8056",
      "brand": "Augue Scelerisque Limited",
      "model": "Tellus Non Inc."
    },
    {
      "imei": "1686081540299",
      "number": "(319) 245-7777",
      "brand": "Magnis Dis Incorporated",
      "model": "Integer Sem Elit Foundation"
    },
    {
      "imei": "1634051053899",
      "number": "(916) 889-9084",
      "brand": "Purus Maecenas Inc.",
      "model": "Egestas Industries"
    },
    {
      "imei": "1672120753999",
      "number": "(950) 181-2874",
      "brand": "Lorem Company",
      "model": "Eget Magna Suspendisse Institute"
    },
    {
      "imei": "1687082587899",
      "number": "(336) 944-6949",
      "brand": "Tortor Consulting",
      "model": "Felis Foundation"
    },
    {
      "imei": "1669100107599",
      "number": "(414) 613-5599",
      "brand": "Sapien Molestie Corp.",
      "model": "Tristique LLC"
    },
    {
      "imei": "1695020226699",
      "number": "(241) 911-7577",
      "brand": "Curabitur Massa Vestibulum Consulting",
      "model": "Inceptos Hymenaeos Mauris Inc."
    },
    {
      "imei": "1663050534799",
      "number": "(387) 725-9686",
      "brand": "Vel LLC",
      "model": "Cras Eget Nisi Foundation"
    },
    {
      "imei": "1644100218399",
      "number": "(524) 472-5679",
      "brand": "Nulla Donec Institute",
      "model": "Ipsum Institute"
    },
    {
      "imei": "1620110225699",
      "number": "(544) 530-8329",
      "brand": "Mauris Industries",
      "model": "Id LLP"
    },
    {
      "imei": "1624072814899",
      "number": "(169) 180-6098",
      "brand": "Luctus Curabitur Corporation",
      "model": "Donec Tempus Lorem Incorporated"
    },
    {
      "imei": "1606110209999",
      "number": "(954) 540-7886",
      "brand": "Sed Consequat Auctor LLC",
      "model": "Dignissim Tempor Arcu LLP"
    },
    {
      "imei": "1616101154999",
      "number": "(937) 290-8628",
      "brand": "Et Netus Et Institute",
      "model": "Amet Lorem Semper Limited"
    },
    {
      "imei": "1642040629799",
      "number": "(618) 688-8206",
      "brand": "Aenean Gravida Limited",
      "model": "Nisi Aenean Incorporated"
    },
    {
      "imei": "1614110102399",
      "number": "(385) 795-8283",
      "brand": "Odio Aliquam Limited",
      "model": "Ullamcorper Incorporated"
    },
    {
      "imei": "1655011076699",
      "number": "(727) 909-6611",
      "brand": "Donec Est Mauris LLC",
      "model": "Dui Fusce Diam Ltd"
    },
    {
      "imei": "1601081834199",
      "number": "(783) 115-4090",
      "brand": "Facilisi Sed Neque Institute",
      "model": "Malesuada PC"
    },
    {
      "imei": "1677122702799",
      "number": "(174) 549-3432",
      "brand": "Pellentesque Habitant Industries",
      "model": "Ut Institute"
    },
    {
      "imei": "1620030558399",
      "number": "(879) 660-6924",
      "brand": "Sed PC",
      "model": "Quam Dignissim Foundation"
    },
    {
      "imei": "1662071036199",
      "number": "(352) 417-0219",
      "brand": "Aliquam Associates",
      "model": "Non Quam Pellentesque Consulting"
    },
    {
      "imei": "1696110794399",
      "number": "(735) 108-7285",
      "brand": "Turpis Aliquam Associates",
      "model": "Nisl Sem Incorporated"
    },
    {
      "imei": "1633042463999",
      "number": "(674) 295-9618",
      "brand": "Ante Maecenas Mi Ltd",
      "model": "Ut Sagittis Lobortis Consulting"
    },
    {
      "imei": "1631062059899",
      "number": "(461) 982-9393",
      "brand": "Integer Aliquam Associates",
      "model": "Ligula Nullam Feugiat Consulting"
    },
    {
      "imei": "1654051820699",
      "number": "(359) 325-2178",
      "brand": "Sollicitudin Industries",
      "model": "Vestibulum Ante Ipsum Associates"
    },
    {
      "imei": "1657060289499",
      "number": "(930) 723-4955",
      "brand": "Sapien Gravida Consulting",
      "model": "Eget Incorporated"
    },
    {
      "imei": "1603100195999",
      "number": "(789) 783-2195",
      "brand": "Tortor Corporation",
      "model": "Accumsan Sed Corp."
    },
    {
      "imei": "1679082141099",
      "number": "(825) 309-5136",
      "brand": "Congue Corporation",
      "model": "Dolor Company"
    },
    {
      "imei": "1648022778899",
      "number": "(365) 732-2102",
      "brand": "Nec Leo LLP",
      "model": "Lacus Company"
    },
    {
      "imei": "1693090185699",
      "number": "(882) 339-7208",
      "brand": "Dui Corporation",
      "model": "Pede Limited"
    },
    {
      "imei": "1681031210799",
      "number": "(407) 411-3020",
      "brand": "Amet Risus Donec Foundation",
      "model": "Quam Quis Institute"
    },
    {
      "imei": "1655021633699",
      "number": "(631) 488-2446",
      "brand": "Vestibulum Corporation",
      "model": "Proin Mi Aliquam Company"
    },
    {
      "imei": "1639042170599",
      "number": "(323) 361-1922",
      "brand": "Donec PC",
      "model": "Velit Egestas LLP"
    },
    {
      "imei": "1666060628799",
      "number": "(572) 726-8665",
      "brand": "Aliquam Institute",
      "model": "Adipiscing Incorporated"
    },
    {
      "imei": "1625091562999",
      "number": "(166) 683-6482",
      "brand": "Quam Quis Diam Foundation",
      "model": "Eu Ligula Ltd"
    },
    {
      "imei": "1675090405799",
      "number": "(590) 994-2564",
      "brand": "Vitae Erat LLC",
      "model": "Id Risus PC"
    },
    {
      "imei": "1676012188399",
      "number": "(446) 312-3872",
      "brand": "Pede Foundation",
      "model": "Erat Consulting"
    },
    {
      "imei": "1643060333099",
      "number": "(379) 670-2264",
      "brand": "Est Associates",
      "model": "Nulla Cras Inc."
    },
    {
      "imei": "1697082550299",
      "number": "(261) 495-2584",
      "brand": "Quam Associates",
      "model": "Dictum Eu Corp."
    },
    {
      "imei": "1676070109699",
      "number": "(550) 382-4933",
      "brand": "Scelerisque Dui Corp.",
      "model": "Mi Eleifend Egestas Consulting"
    },
    {
      "imei": "1690030378399",
      "number": "(243) 224-5956",
      "brand": "Mus Incorporated",
      "model": "Lorem Fringilla Ornare Institute"
    },
    {
      "imei": "1669070738999",
      "number": "(722) 481-4422",
      "brand": "Tellus Phasellus Company",
      "model": "Interdum Industries"
    },
    {
      "imei": "1611100229899",
      "number": "(386) 784-0050",
      "brand": "Proin Dolor Corporation",
      "model": "Eu Tempor Erat Ltd"
    },
    {
      "imei": "1690082760999",
      "number": "(432) 250-1579",
      "brand": "Arcu Foundation",
      "model": "Dignissim Lacus PC"
    },
    {
      "imei": "1632081223699",
      "number": "(873) 782-6759",
      "brand": "Fringilla Euismod Enim Institute",
      "model": "Fringilla Inc."
    },
    {
      "imei": "1661012071599",
      "number": "(446) 576-6879",
      "brand": "Sed Leo Cras Incorporated",
      "model": "Dictum Magna Industries"
    },
    {
      "imei": "1601051725799",
      "number": "(945) 869-0415",
      "brand": "Ultricies Incorporated",
      "model": "Tellus Industries"
    },
    {
      "imei": "1647112920999",
      "number": "(113) 246-7979",
      "brand": "Ullamcorper Velit Industries",
      "model": "Vitae Purus LLC"
    },
    {
      "imei": "1642061220799",
      "number": "(859) 289-8380",
      "brand": "Eget Corporation",
      "model": "Iaculis Corp."
    },
    {
      "imei": "1645122524999",
      "number": "(141) 107-9339",
      "brand": "Nunc In At Company",
      "model": "Lacinia Sed Congue Ltd"
    },
    {
      "imei": "1603123072899",
      "number": "(211) 221-8860",
      "brand": "Duis Mi Industries",
      "model": "Proin Institute"
    },
    {
      "imei": "1663090763499",
      "number": "(534) 519-4455",
      "brand": "Turpis Limited",
      "model": "Vel Lectus LLP"
    },
    {
      "imei": "1614091610599",
      "number": "(506) 795-0369",
      "brand": "Nunc Incorporated",
      "model": "Cum Associates"
    },
    {
      "imei": "1614032480799",
      "number": "(526) 555-1721",
      "brand": "Quis Company",
      "model": "Porttitor Interdum Associates"
    },
    {
      "imei": "1671102622099",
      "number": "(948) 313-2384",
      "brand": "Vitae Dolor Corporation",
      "model": "Dolor Tempus Non Industries"
    },
    {
      "imei": "1646010965499",
      "number": "(777) 702-2010",
      "brand": "Ipsum Porta Corporation",
      "model": "Vel Pede Blandit Incorporated"
    },
    {
      "imei": "1603092797399",
      "number": "(260) 317-9082",
      "brand": "Luctus Ipsum Consulting",
      "model": "Pede Ultrices A Corp."
    },
    {
      "imei": "1666011491599",
      "number": "(890) 446-8069",
      "brand": "Congue Inc.",
      "model": "Ac Feugiat Limited"
    },
    {
      "imei": "1673062573699",
      "number": "(183) 806-1781",
      "brand": "Aliquam Nisl Corp.",
      "model": "Ultrices Corporation"
    },
    {
      "imei": "1697050989699",
      "number": "(456) 435-7601",
      "brand": "Justo Sit Industries",
      "model": "Libero Et Tristique LLC"
    },
    {
      "imei": "1699050118699",
      "number": "(526) 302-5955",
      "brand": "Vehicula Risus Nulla Institute",
      "model": "Vel Arcu PC"
    },
    {
      "imei": "1635013089699",
      "number": "(228) 974-3321",
      "brand": "Urna Corp.",
      "model": "Nulla Facilisis Suspendisse Industries"
    },
    {
      "imei": "1688051760599",
      "number": "(950) 851-4111",
      "brand": "Vulputate Ullamcorper Magna Ltd",
      "model": "Massa Quisque Porttitor LLP"
    },
    {
      "imei": "1675021474299",
      "number": "(652) 124-8110",
      "brand": "Vitae Posuere At Incorporated",
      "model": "Dui Ltd"
    },
    {
      "imei": "1676083088399",
      "number": "(437) 520-3012",
      "brand": "Sodales Purus In Consulting",
      "model": "Sed Eget Foundation"
    },
    {
      "imei": "1643080222199",
      "number": "(636) 398-8125",
      "brand": "Ultrices PC",
      "model": "Dolor Fusce Consulting"
    },
    {
      "imei": "1628110565999",
      "number": "(767) 753-1497",
      "brand": "Diam Industries",
      "model": "Proin Velit Industries"
    },
    {
      "imei": "1618012667699",
      "number": "(619) 105-0503",
      "brand": "Egestas A Scelerisque Foundation",
      "model": "Pretium Aliquet Corporation"
    },
    {
      "imei": "1650032463899",
      "number": "(522) 935-9914",
      "brand": "Phasellus Dolor Elit Corp.",
      "model": "Sollicitudin Incorporated"
    },
    {
      "imei": "1667072928099",
      "number": "(988) 728-7247",
      "brand": "Odio Associates",
      "model": "Nulla Semper Institute"
    },
    {
      "imei": "1651112200699",
      "number": "(490) 382-9843",
      "brand": "Sapien Nunc LLC",
      "model": "Massa Mauris Vestibulum Limited"
    },
    {
      "imei": "1695042107699",
      "number": "(368) 525-9685",
      "brand": "Phasellus Corp.",
      "model": "Quis Diam Luctus Institute"
    },
    {
      "imei": "1685120573299",
      "number": "(456) 826-7753",
      "brand": "Sed Ltd",
      "model": "Aenean Eget Limited"
    },
    {
      "imei": "1683060326399",
      "number": "(430) 799-2653",
      "brand": "Quis Lectus Institute",
      "model": "Parturient LLC"
    },
    {
      "imei": "1607060892999",
      "number": "(755) 803-5459",
      "brand": "Facilisis Magna Tellus Consulting",
      "model": "Nulla LLP"
    },
    {
      "imei": "1698082198599",
      "number": "(694) 139-5423",
      "brand": "Feugiat Institute",
      "model": "Duis Ltd"
    }


  ];

  constructor(private gpsService: GpsService, private dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.testList);
  }

  getGps(): void {
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(){
    let dialogRef = this.dialog.open(AddGpsComponent, {
      width: '450px',
      data: 'This text is passed into the dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed: ${result}');
      this.dialogResult = result;
    })
  }


}
