import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { AppComponent } from "../app.component";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import {ConfigComponent } from "../config/config.component";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-door-configuration',
    templateUrl: './res-door-configuration.comp.html',
    styleUrls: ['./door-configuration.component.less']
})
export class ResDoorConfigurationComponent implements OnInit {

    pageNo;
    isGdo = this.utils.utilities.isGDO;
    store = this.dataStore.store;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

    // t = _.sumBy(this.gdoOpenerSelected, function(o){ return o.price * o.count });
    itemPrice;
    qty = this.utils.utilities.gdoOpenerQty;
    itmPrice = this.utils.utilities.itmPrice;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;
    accessories;
    gdodirectquestions = this.dataStore.gdoDirectQuestions;
    gdodirect;
    showDirectText = this.utils.utilities.directFlow;

    gdoOpeners = [];



    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils: AppUtilities
        , private route: Router
        , private appComp: AppComponent
        , private navComp: NavService
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private config: ConfigComponent) {
    }

    setNavComponent() {
        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 13,
            currentStepUrl: '/config/doorConfiguration',
            showStepIndicator: true,
            nextStepFn: () => {
                
            }
        });
    }
    ngOnInit() {
        this.setNavComponent();
    }
    updateQuantity(flow) {
        
    }

    nextBtn(path) {
      
    }

    prevBtn(path) {
        
    }


}