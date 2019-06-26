import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Patacon App';

  customIcons = [
    {name: 'startDispatch', url: '../assets/icons/startDispatch.svg'},
    {name: 'stoppedDispatch', url: "../assets/icons/stopped.svg" },
    {name: 'delete', url: "../assets/icons/deleteCRUD.svg"},
    {name: 'sendSMS', url:"../assets/icons/sendSMS.svg"},
    {name: 'cancelDispatch', url: "../assets/icons/cancelDispatch.svg"},
    {name: 'dispatchDetails', url: "../assets/icons/dispatchDetails.svg"},
    {name: 'edit', url: "../assets/icons/editCRUD.svg"},
    {name: 'details', url: "../assets/icons/details.svg"},
    {name: 'terminateDispatch', url: "../assets/icons/terminateDispatch.svg"},
    {name: 'dashboard', url: "../assets/icons/dashboard.svg"},
    {name: 'gps', url: "../assets/icons/gps.svg"},
    {name: 'users', url: "../assets/icons/users.svg"},
    {name: 'driver', url: "../assets/icons/driver.svg"},
    {name: 'route', url: "../assets/icons/route.svg"},
    {name: 'trucks', url: "../assets/icons/trucks.svg"},
    {name: 'producer', url: "../assets/icons/producer.svg"},
    {name: 'planification', url: "../assets/icons/planification.svg"},
    {name: 'insights', url: "../assets/icons/insights.svg"}
    
  
  
  
  ];
    

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.customIcons.forEach(icon => {
      this.registerCustomIcon(icon.name, icon.url);
    });
  }

  registerCustomIcon(name, relativeUrl) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(relativeUrl)
    );
  }
}
