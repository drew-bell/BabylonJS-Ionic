import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
 
/** 
 * Generated class for the ModalPage page. 
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on 
 * Ionic pages and navigation. 
 */ 
 
@IonicPage() 
@Component({ 
    selector: 'page-modal', 
    templateUrl: 'modal.html', 
}) 
export class ModalPage { 
 
    private name: String; 
    private desc: String; 
    private dist: String; 
 
    constructor(public navCtrl: NavController, public navParams: NavParams) { 
        this.name = navParams.get('name'); 
        this.desc = navParams.get('desc'); 
        this.dist = navParams.get('dist'); 
    } 
 
    ionViewDidLoad() { 
        document.addEventListener('click', function(e){ 
            e.stopPropagation(); 
            e.preventDefault() 
            return false; 
        }); 
    } 
 
    dismiss(){ 
        this.navCtrl.pop(); 
    } 
 
} 