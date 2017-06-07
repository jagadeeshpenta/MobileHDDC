import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {NavComponent} from "../nav/nav.component";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
import {ConfigComponent} from "../config/config.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
declare var $: any;
declare var _: any;


@Component({
    selector: 'app-res-additional-options',
    templateUrl: './res-additional-options-comp.html',
    styleUrls: ['./additional-options.component.less']
})
export class ResAdditionalOptionsComponent implements OnInit {
    //install

    @ViewChild('resInstallFlowMed') resInstallFlowMed: ModalComponent;
    @ViewChild('resInstallFlowMiles') resInstallFlowMiles: ModalComponent;
    @ViewChild('resInstallFlowHeadRoom') resInstallFlowHeadRoom: ModalComponent;
    @ViewChild('resFlowReleaseKit') resFlowReleaseKit: ModalComponent;
    //diy 
    @ViewChild('resDiyFlowHeadRoom') resDiyFlowHeadRoom: ModalComponent;
    @ViewChild('resDiyFlowMiles') resDiyFlowMiles: ModalComponent;
    @ViewChild('resDiyPerimeterSeal') resDiyPerimeterSeal: ModalComponent;
    @ViewChild('resDiyHangerKit') resDiyHangerKit: ModalComponent;
    @ViewChild('resDiyReleaseKit') resDiyReleaseKit: ModalComponent;
    @ViewChild('resDiyBottomWeatherSeal') resDiyBottomWeatherSeal: ModalComponent;

    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance: any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;
    hidePrev = false;
    singleDrop = false;
    doubleDrop = false;
    gdoFlowManualDoorInfo = false;
    gdoFlowPowerHeadInfo = false;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    installOrDiy;
    resAdditionalQuestions;
    resDiyQuestions;
    resInstallQuestions;

    showMedImg;
    showInstallMiles;
    defaultMiles: any;
    moreMiles;
    updatedMiles;
    defaultMilesDiy: any;
    vinyls;
    installMed;
    installMiles;
    installHeadRoom;
    installReleaseKit;

    aditionalDiyPrice;

    // options
    medallion = true;
    milesAway = true;
    conversionKit = true;
    emergencyKit = true;

    t = _.sumBy(this.gdoOpenerSelected, function (o) {
        return o.price * o.count
    });

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent: AppComponent
        , private utils: AppUtilities
        , private route: Router
        , private navComp: NavService
        , private dataStore: CollectionData
        , private activeRoute: ActivatedRoute
        , private config: ConfigComponent
        , private navComponent: NavComponent
        , private dataService: CollectionService) {
    }


    setNavComponent() {
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 12,
                currentStepUrl: '/config/additionalOptions',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '12.Additional Options';
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 8,
                currentStepUrl: '/config/additionalOptions',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '8.Additional Options';
        }
    }


    ngOnInit() {
        this.installOrDiy = this.appComponent.selectedInstallDiy

        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.setNavComponent();
        let resDoorObj = this.utils.resFlowSession.resDoorObj;
        let dataParams = {
            "wi": this.utils.utilities.wi,
            "windcode": this.utils.utilities.winCode,
            "NatMarketID": this.utils.utilities.natmarketid,
            "productid": resDoorObj.product.product['item_id'],
            "hf": this.utils.utilities.hf,
            "hi": this.utils.utilities.hi,
            "wt": 8,
            "dtype": this.utils.utilities.dtype,
            "clopaymodelnumber": resDoorObj.construction.construction['ClopayModelNumber'],
            "localmarketid": this.utils.utilities.localmarketid,
            "lang": this.utils.utilities.lang,
            "storeNumber": this.utils.utilities.storenumber,
            "colorConfig": resDoorObj.color.base['colorconfig']
        }
        this.dataService.getInstallDiyq(dataParams).subscribe(res => {
            this.resAdditionalQuestions = res;
            this.resDiyQuestions = _.filter(this.resAdditionalQuestions, ['item_type', 'DIY']);
            this.resInstallQuestions = _.filter(this.resAdditionalQuestions, ['item_type', 'INSTALL']);

            //console.log("one"+JSON.stringify(this.resDiyQuestions[2].Answers[1].vinyls));
            this.vinyls = this.resDiyQuestions[2].Answers[1].vinyls
            //console.log('resDiyQuestions' + JSON.stringify(this.resDiyQuestions));
            //            if (this.resInstallQuestions.item_id == 7 && this.resInstallQuestions.item_id == 5) {
            //
            //            }

        });
        if (this.installOrDiy == 'install') {
            this.showMedImg = true;
        }
    }

    nextBtn(path) {
        this.appComponent.updatePrice();
        this.route.navigateByUrl('/config/doorConfiguration');
    }

    prevBtn(path) {
        this.utils.resFlowSession.resDoorObj.resetFromStep(8);
        if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
            this.route.navigateByUrl('/config/install');
        } else {
            this.route.navigateByUrl('/config/opener');
        }

    }

    installQuestionsPopup(installQuestions) {
        if (installQuestions.item_id == 7) {
            this.resInstallFlowMed.open();
        } else if (installQuestions.item_id == 5) {
            this.resInstallFlowMiles.open();
        } else if (installQuestions.item_id == 4) {
            this.resInstallFlowHeadRoom.open();
        } else if (installQuestions.item_id == 11) {
            this.resFlowReleaseKit.open();
        }

    }


    diyQuestionsPopup(diyQuestions) {
        if (diyQuestions.item_id == 5) {
            this.resDiyFlowMiles.open();
        } else if (diyQuestions.item_id == 1) {
            this.resDiyPerimeterSeal.open();
        } else if (diyQuestions.item_id == 4) {
            this.resDiyFlowHeadRoom.open();
        } else if (diyQuestions.item_id == 3) {
            this.resDiyHangerKit.open();
        } else if (diyQuestions.item_id == 11) {
            this.resDiyReleaseKit.open();
        } else if (diyQuestions.item_id == 12) {
            this.resDiyBottomWeatherSeal.open();
        }

    }
    itmObj;

    installQuestionsOptions(itm, obj) {
        let k = {
            id: obj.item_id,
            name: obj.item_name,
            price: obj.Answers[1].item_price
        }
        this.itmObj = this.utils.resFlowSession.resDoorObj.additional;
        if (itm.srcElement.checked === true) {

            switch (obj.item_id) {
                case 7:
                    $('#' + obj.item_id).removeClass('hide');
                    this.itmObj.items.push(k);
                    break;
                case 5:
                    $('#' + obj.item_id).addClass('hide');
                    this.removeItmOptions(obj.item_id)
                    break;
                case 11:
                    $('#' + obj.item_id).addClass('hide');
                    this.removeItmOptions(obj.item_id)
                    break;
                case 4:
                    $('#' + obj.item_id).addClass('hide');
                    this.removeItmOptions(obj.item_id)
                    break;
            }

        } else {

            switch (obj.item_id) {
                case 7:
                    $('#' + obj.item_id).addClass('hide');
                    this.removeItmOptions(obj.item_id)
                    break;
                case 5:
                    $('#' + obj.item_id).removeClass('hide');
                    k.price = 51;
                    k.name = 'Delivery 31 miles from store';
                    this.itmObj.items.push(k);
                    break;
                case 11:
                    $('#' + obj.item_id).removeClass('hide');
                    this.itmObj.items.push(k);
                    break;
                case 4:
                    $('#' + obj.item_id).removeClass('hide');
                    this.itmObj.items.push(k);
                    break;
            }
        }

        //alert('the final install med is'+this.installMed);
        this.aditionalDiyPrice = this.installMed + this.installMiles + this.installHeadRoom + this.installReleaseKit;
    }

    removeItmOptions(id) {
        this.itmObj.items = this.itmObj.items.filter(function (el) {
            return el.id != id;
        });
    }

    diyQuestionsOptions(itm, obj) {
        if (itm.srcElement.checked === true) {
            //alert('true');
            // alert("obj.item_name" + obj.item_name);
            // alert("obj item price" + obj.Answers[1].item_price);
            //  console.log("obj" + JSON.stringify(obj));
            if (obj.item_id == 5) {
                this.defaultMilesDiy = "31";
                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 1) {

                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 4) {

                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 3) {
                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 11) {
                this.defaultMilesDiy = "31";
                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 12) {
                if (obj.Answers[1].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
        } else {
            //  alert('false');
            //  alert("obj item price" + obj.Answers[0].item_price);
            if (obj.item_id == 5) {
                this.defaultMilesDiy = "";
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 1) {
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 4) {
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 3) {
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 11) {
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
            if (obj.item_id == 12) {
                if (obj.Answers[0].item_price !== 0) {
                    //  this.installMiles = obj.Answers[0].item_price;

                }
            }
        }
    }

    selectedVinyls(vin) {

    }
    flow = 'res';

    singleOpener = 0;
    doubleOpener = 0;
    mileOpenPr = 0;
    qty = this.utils.utilities.gdoOpenerQty;


    showPowerHead(itm) {
        if (itm.srcElement.checked === true) {
            this.gdoFlowPowerHeadInfo = false;
        } else {

            this.gdoFlowPowerHeadInfo = true;
        }
    }
    calculatemilesInstall(miles) {
        if (miles > 31 && miles < 51) {
            this.updatedMiles = 51;
        } else if (miles > 51) {
            this.moreMiles = 51 - miles;
            this.updatedMiles = this.moreMiles * 3;

        }


    }
    calculatemilesDiy(miles) {
        if (miles > 31) {
            // alert('the price need to be 3 Dollars')
        } else if (miles > 31) {
            this.moreMiles = 31 - miles;
            //alert('the more miles are'+  this.moreMiles);
            this.updatedMiles = this.moreMiles * 3;
            // alert( this.updatedMiles+3);

        }


    }
    directDoorVal = 1;

    directDoor(event, flow) {
        let val = +event.target.value;
        this.directDoorVal = +event.target.value;
        let k = flow;
        if (flow === 0) {
            this.singleOpener = 0;
            this.singleOpener = 50 * (val);
            k = {
                name: "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.singleOpener,
                id: 0,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoSingleDoor = k.price;
            this.utils.utilities.singlep = 0;
        } else {
            this.doubleOpener = 0;
            this.doubleOpener = 65 * (val);
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.doubleOpener,
                id: 1,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
            this.utils.utilities.doublep = 0;
        }
        // this.gdoConfig.itemPrice += k.price;
        // this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.dataStore.gdoDirectQuestions.push(k);
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        this.utils.utilities.kPrice = kPrice;
    }

    removeItm(flow) {
        // flow = 0 ? this.utils.utilities.singlep = 0 : this.utils.utilities.doublep = 0;
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.utils.utilities.doublep = 0;
        this.utils.utilities.singlep = 0;
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        return kPrice;
    }

    singleDropVal;
    doubleDropVal;


    globalPrice = 0;


    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;

        let miles = +itm.target.value;
        if (flow === 'direct') {
            let k = miles - 31;
            if (k >= 0) {
                this.distancePrice = (k * 2.50) + 2.50;
                // this.mileOpenPr = this.distancePrice;
            }
            else {
                this.distancePrice = 0;
            }

            // this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
        } else {
            let k = miles - 50;

            if (k >= 0) {
                this.distancePrice = (k * 3) + 51;
                // this.mileOpenPr = this.distancePrice;
            } else {
                this.distancePrice = 0;
                // this.mileOpenPr = this.distancePrice;
            }

        }
        this.mileOpenPr = this.distancePrice;
        this.utils.utilities.distancePrice = this.distancePrice;
    }

}
