import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { EstimationPortalComponent } from '../estimation-portal/estimation-portal.component';
import { count } from 'console';
 
@Component({
  selector: 'app-mycart',
  // standalone: true,
  // imports: [],
  templateUrl: './mycart.component.html',
  styleUrl: './mycart.component.css',
  styles: [`td {
    border: 1px solid #63666A;
    font-size: 9px;
    /* font-weight: bold; */
    // line-height: 16px;
    text-align: center;
}`]
})
export class MycartComponent {
  static count_CR:any=0;
  tab:any="Change Request";
  obj:any={};
  myObj_INC:any={};
  myObj_CR:any={};
  static previousLen:number=0;
  objLen:number=0;
  rowCount:number =0;
  isAbap: boolean = true;
  isPipo: boolean = false;
  isBasis: boolean = false;
  ismyQuoteVisible: boolean = false;
  cartData: any = {};

  constructor(private cartService: CartService,private http:HttpClient,private elRef:ElementRef<HTMLElement>, private estimation:EstimationPortalComponent) {}

  ngOnInit(): void {

    this.cartService.cartData$.subscribe(data => {
      this.cartData=data;
    });
    

    console.log(this.cartData);
  }

  ngAfterViewInit(){
    
    this.addToCart_mycart(this.cartData); 
  }

  // ngOnInit(): void {
  //   this.isChangeRequest = true;
  //  }

   isChangeRequest: boolean = true;
   isIncident: boolean = false;


 
private resetVisibility() {
    this.isChangeRequest = false;
    this.isIncident = false;    
    this.ismyQuoteVisible = false;
  }
 
  addToCart_mycart(crDetail:any){
    // console.log("CRDetails: "+this.objLen+"\nPreviousLen: "+MycartComponent.previousLen)
    // if(MycartComponent.previousLen==(this.objLen-1)){
    //   console.log("EQUAL")
    // }
    // else{
    //   MycartComponent.previousLen=this.objLen;
    //   this.rowCount++;
    // }
    
    //var count=0;
    //var viewCartButton1 = document.getElementById("viewCart1");
    
    //var requestType = (document.getElementById("requestType")! as HTMLSelectElement).value;
    
    console.log("\n\n\n"+this.tab+" was pressed now")

    for(var i in crDetail){
      if (crDetail[i].requestType == "CR") {
        
        this.myObj_CR[i]=crDetail[i]
      }else{
        
        this.myObj_INC[i]=crDetail[i];
      }
      console.log("myOBJ_INC: "+JSON.stringify(this.myObj_INC))
      console.log("\n\n\nmyOBJ_CR: "+JSON.stringify(this.myObj_CR))
      
    }

      
      if (this.tab === "Incident") {
        console.log("in Incident if")
        
        //viewCartButton1!.style.display = "block";
        var table:any;

       
        table = document.getElementById("incLineItems");
        console.log("TABLE LENGTH: "+table.childNodes.length)
        while (table.childNodes.length>1) {
          table.removeChild(table.lastChild);
        }

        
        if(table){
      for(i in this.myObj_INC){
        MycartComponent.count_CR++;
        console.log("COUNT: "+i)
        var row = document.createElement("tr");
        row.id = "btr-" + i;
        
   
        var td0 = row.appendChild(document.createElement('td'));
        var td1 = row.appendChild(document.createElement('td'));
        var td2 = row.appendChild(document.createElement('td'));
        var td3 = row.appendChild(document.createElement('td'));
        var td4 = row.appendChild(document.createElement('td'));
        var td5 = row.appendChild(document.createElement('td'));
        var td6 = row.appendChild(document.createElement('td'));
        var td7 = row.appendChild(document.createElement('td'));
        var td8 = row.appendChild(document.createElement('td'));
        var td9 = row.appendChild(document.createElement('td'));
       
      const button = document.createElement('button');
      button.id = "tr-"+i;
      button.innerHTML = '<em class="fa-solid fa-trash-can fa-lg" style="color: #041E42" aria-hidden="true"></em>';
      button.addEventListener('click', () => this.removeItem_inc(button.id));
      td0.appendChild(button);  
      
      td1.innerHTML = this.myObj_INC[i].clientID; 
    
      td2.innerHTML = this.myObj_INC[i].requestType;
  
      td3.innerHTML = this.myObj_INC[i].defectCategory;
    
      td4.innerHTML = this.myObj_INC[i].devRequired;
    
      td5.innerHTML = this.myObj_INC[i].Priority;
    
      td6.innerHTML = this.myObj_INC[i].objectTestType1;
    
      td7.innerHTML = this.myObj_INC[i].objectQa1;
    
      td8.innerHTML = this.myObj_INC[i].objectRt1;
    
      td9.innerHTML = this.myObj_INC[i].objectRtQual1;
      

   
        console.log("TABLE: "+table)
        table.appendChild(row);
   
        table.style.display = "table"; // Ensure that the table is set to "table" display
    
        }
 
      }
  } 
else if(this.tab === "Change Request"){
      
      console.log("in CR if")
      var table:any;

      
      //console.log("i:"+i+"\nnxtKey: "+nxtKey);
      //console.log(crDetail[i])
      table = document.getElementById("lineItems");

        while (table.childNodes.length>1) {
          table.removeChild(table.lastChild);
        }
      
        for(i in this.myObj_CR){
      
            var row = document.createElement("tr");
            row.id = "btr-" + i;
            console.log("row.id: "+row.id)
            
            
        
            var td0 = row.appendChild(document.createElement('td'));
            td0.id = "td";
            var td1 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td2 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td3 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td4 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td5 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td6 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td7 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td8 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td9 = row.appendChild(document.createElement('td'));
            td1.id = "td";
            var td10 = row.appendChild(document.createElement('td'));
            td1.id = "td";
        
            //console.log(row.id);
            //td0.innerHTML = '<a id=\"cart\" (click)=removeItem(\"' + row.id + '\")><em class=\"fa fa-trash fa-lg\" style=\"color:black\"aria-hidden=\"true\"></em></a>';

            const button = document.createElement('button');
            button.id = "tr-"+i;
            button.innerHTML = '<em class="fa-solid fa-trash-can fa-lg" style="color: #041E42" aria-hidden="true"></em>';
            button.addEventListener('click', () => this.removeItem(button.id));
            td0.appendChild(button);  
            // td0.style.borderStyle = "none";
            //var i = document.getElementById("clientID").selectedIndex;
            td1.innerHTML = this.myObj_CR[i].clientID; ///////hello
        
            var tmp = document.getElementById("requestType");
            ////console.log("RT: "+tmp[tmp.selectedIndex].innerHTML)
          
            td2.innerHTML = this.myObj_CR[i].requestType;
            //tmp = document.getElementById("objectType");

            td3.innerHTML = this.myObj_CR[i].objectType;
            //tmp = document.getElementById("objectComplexity");
            td4.innerHTML = this.myObj_CR[i].objectComplexity;
            //tmp = document.getElementById("objectDevCategory");
            td5.innerHTML = this.myObj_CR[i].objectDevCategory;
            //tmp = document.getElementById("objectDevConfig");
            td6.innerHTML = this.myObj_CR[i].objectDevConfig;
            //tmp = document.getElementById("objectTestType");
            td7.innerHTML = this.myObj_CR[i].objectTestType;
            //tmp = document.getElementById("objectQa");
            td8.innerHTML = this.myObj_CR[i].objectQa;
            //tmp = document.getElementById("objectRt");
            td9.innerHTML = this.myObj_CR[i].objectRt;
            //tmp = document.getElementById("objectRtQual");
            td10.innerHTML = this.myObj_CR[i].objectRtQual;
        
        
            table!.appendChild(row);
        
            // Ensure that the table is set to "table" display
            table!.style.display = "table";
        }
      //count++;
  
      //console.log("InnerHTML:"+td10.innerHTML)
    }


    // //console.log("Tr0: "+document.getElementById("tr0")!.id)
    // //console.log("Tr1 "+document.getElementById("tr1")!.id)
  }

  async reqQuote_inc() {
    console.log("CartData:"+JSON.stringify(this.cartData))
    for(var i in this.cartData){
      console.log("ClientID: "+this.cartData[i].clientID)
      await fetch("http://localhost:8080/estimation/abap/clientQualification/"+this.cartData[i].clientID,{
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
              }).then(data=>{return data.json()}).then(json=>{
                //console.log("JSON:"+JSON.stringify(json))
                this.obj[this.cartData[i].clientID]=json
                //console.log("OBJ: "+JSON.stringify(this.obj))
              })
    }
    console.log("Object outside:"+JSON.stringify(this.obj));
    var clientData;
    var myTable = document.getElementById("incLineItems") as HTMLTableElement;
    var requestJson = "{\"estimationRequest\":{\"quoteStatus\":\"Created\",\"totalEffort\": 0,\"createdBy\": \"Portal\",\"changedBy\": \"Portal\",\"approvedBy\": \"\",\"technology\": [{";
    requestJson += "\"technologyName\": \"ABAP\",\"effort\": 0.0,\"abapDetails\": [";
    console.log("req quote1")
    if (myTable.rows.length > 2) {
        console.log("Inc length: "+myTable.rows.length);
        for (var a = 2; a < myTable.rows.length; a++) {
            var objCells = myTable.rows.item(a)!.cells;
            
            for(var b in this.obj){
              clientData=this.obj[b]
            }
            console.log("ClientData: "+clientData)
            for (var j = 1; j < objCells.length; j++) {
                switch (j) {
                    case 1:
                        if (a > 2) {
                            requestJson += ",";
                        }
                        requestJson += "{\"clientID\":" + objCells.item(j)!.innerHTML;
                        break;

                    case 2:
                        requestJson += ",\"requestType\":\"" + objCells.item(j)!.innerHTML + "\"";
                        requestJson += ",\"releaseType\":\"" + clientData.itReleasesPerYear + "\"";
                        break;
                    case 3:
                        requestJson += ",\"objectType\":\"" + objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 4:        
                        requestJson += ",\"complexity\":\"" +  objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 5:
                        requestJson += ",\"priority\":\"" + objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 6:
                        if (objCells.item(j)!.innerHTML == "Manual") {
                            requestJson += ",\"automation\":false";
                        } else {
                            requestJson += ",\"automation\":true";
                        }
                        break;
                   
                    case 7:
                        if (objCells.item(j)!.innerHTML == "Yes") {
                            requestJson += ",\"qa\":true";
                        } else {
                            requestJson += ",\"qa\":false";
                        }
                        break;
                    case 8:
                        if (objCells.item(j)!.innerHTML == "Yes") {
                            requestJson += ",\"rt\":true";
                        } else {
                            requestJson += ",\"rt\":false";
                        }
                        break;
                    case 9:
                        requestJson += ",\"regressionQualification\":\"" + objCells.item(j)!.innerHTML + "\"}";
                        break;
                }
            }
        }
        var reateQuoteStatus:any;
        requestJson += "]}]}}";
 
        console.log(JSON.stringify(requestJson));
        // document.getElementById("tmpTxtArea").innerHTML=requestJson;
        fetch('http://localhost:8080/estimation', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: requestJson
        })
            .then(response => {
                reateQuoteStatus = response.status;
                return response.json();
            }).then(data2 => {
            if (reateQuoteStatus == "201") {
                var respCell = myTable.rows.item(0)!.cells;
                alert("Quote Number: " + data2.estimationResponse.quoteID + " created");
                respCell.item(0)!.innerHTML = "<a href=\"http://127.0.0.1:5501/ABAPGetQuote2.html?quoteID=" + data2.estimationResponse.quoteID + "\">Quote #: " + data2.estimationResponse.quoteID + "</a>";
                for(var c in this.cartData){
                  if(this.cartData[c].requestType=="Incident")this.removeItem_inc("tr-"+c)
                }
            
              }
        });
    } else {
        alert("Please add Line Items");
    }
 
}

  async reqQuote() {
    
    var response_status:any;
    console.log("CartData:"+JSON.stringify(this.cartData))
    for(var i in this.cartData){
      console.log("ClientID: "+this.cartData[i].clientID)
      await fetch("http://localhost:8080/estimation/abap/clientQualification/"+this.cartData[i].clientID,{
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
              }).then(data=>{return data.json()}).then(json=>{
                //console.log("JSON:"+JSON.stringify(json))
                this.obj[this.cartData[i].clientID]=json
                //console.log("OBJ: "+JSON.stringify(this.obj))
              })
    }
    console.log("Object outside:"+JSON.stringify(this.obj));
    
    var clientData;
    var myTable = document.getElementById("lineItems") as HTMLTableElement;
    var requestJson = "{\"estimationRequest\":{\"quoteStatus\":\"Created\",\"totalEffort\": 0,\"createdBy\": \"Portal\",\"changedBy\": \"Portal\",\"approvedBy\": \"\",\"technology\": [{";
    requestJson += "\"technologyName\": \"ABAP\",\"effort\": 0.0,\"abapDetails\": [";
    if (myTable.rows.length > 2) {
        //console.log("Table: "+myTable.rows.length)
        for (var a = 2; a < myTable.rows.length; a++) {
            console.log("i: "+a);
            var objCells = myTable.rows.item(a)!.cells;
            for(var b in this.obj){
              clientData=this.obj[b]
            }
            console.log("clientData: "+clientData)
            for (var j = 1; j < objCells.length; j++) {
                switch (j) {
                    case 1:
                        if (a > 2) {
                            requestJson += ",";
                        }
                        requestJson += "{\"clientID\":" + objCells.item(j)!.innerHTML;
                        console.log("Client ID: "+objCells.item(j)!.innerHTML)
                        break;
                    case 2:
                        requestJson += ",\"requestType\":\"" + objCells.item(j)!.innerHTML + "\"";
                        requestJson += ",\"releaseType\":\"" + clientData.itReleasesPerYear + "\"";
                        break;
                    case 3:
                        requestJson += ",\"objectType\":\"" + objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 4:
                        requestJson += ",\"complexity\":\"" + objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 5:
                        requestJson += ",\"category\":\"" + objCells.item(j)!.innerHTML + "\"";
                        break;
                    case 6:
                        if (objCells.item(j)!.innerHTML == "Yes") {
                            requestJson += ",\"devConfig\":true";
                        } else {
                            requestJson += ",\"devConfig\":false";
                        }
                        break;
                    case 7:
                        if (objCells.item(j)!.innerHTML == "Manual") {
                            requestJson += ",\"automation\":false";
                        } else {
                            requestJson += ",\"automation\":true";
                        }
                        break;
                    case 8:
                        if (objCells.item(j)!.innerHTML == "Yes") {
                            requestJson += ",\"qa\":true";
                        } else {
                            requestJson += ",\"qa\":false";
                        }
                        break;
                    case 9:
                        if (objCells.item(j)!.innerHTML == "Yes") {
                            requestJson += ",\"rt\":true";
                        } else {
                            requestJson += ",\"rt\":false";
                        }
                        break;
                    case 10:
                        requestJson += ",\"regressionQualification\":\"" + objCells.item(j)!.innerHTML + "\"}";
                        break;
                }
            }
        }
 
        requestJson += "]}]}}";
        var reateQuoteStatus:any;
        console.log(JSON.stringify (requestJson));
        // document.getElementById("tmpTxtArea").innerHTML=requestJson;
        fetch('http://localhost:8080/estimation', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: requestJson
        })
            .then(response => {
                reateQuoteStatus = response.status;
                return response.json();
            }).then(data2 => {
            if (reateQuoteStatus == "201") {
                var respCell = myTable.rows.item(0)!.cells;
                alert("Quote Number: " + data2.estimationResponse.quoteID + " created");
                for(var c in this.cartData){
                  if(this.cartData[c].requestType=="CR")this.removeItem("tr-"+c)
                }
                respCell.item(0)!.innerHTML = "<a target=\"_blank\" href=\"http://localhost:4200/#/EstimationPortalComponent\">Quote #: " + data2.estimationResponse.quoteID + "</a>";
            }
        });
    } else {
        alert("Please add Line Items");
    }
 
}

tabChange(event:any){
  console.log(event.tab)
  this.tab = event.tab.textLabel;
  this.addToCart_mycart(this.cartData);
}
 

  removeItem(id:any) {
    console.log("RemoveID:"+id)
    var myTable = document.getElementById("lineItems");
    //var myTable1 = document.getElementById("incLineItems");

    this.cartService.removeFromCart(id.split('-')[1]);
    delete this.myObj_CR[id.split('-')[1]];
    this.cartService.cartData$.subscribe(data => {
      this.cartData=data;
    });
    console.log("Neeche wala: "+JSON.stringify(this.cartData));
    
    //console.log("ID: "+JSON.stringify(document.getElementById("b"+id)?.id))
    
    myTable!.removeChild(document.getElementById("b"+id)!);

    //myTable1!.removeChild(document.getElementById(id)!);
}

removeItem_inc(id:any) {
  console.log("RemoveID:"+id)
  //var myTable = document.getElementById("lineItems");
  var myTable1 = document.getElementById("incLineItems");

  this.cartService.removeFromCart(id.split('-')[1]);
  delete this.myObj_INC[id.split('-')[1]];
  this.cartService.cartData$.subscribe(data => {
    this.cartData=data;
  });
  console.log("Neeche wala: "+JSON.stringify(this.cartData));
  
  //console.log("ID: "+JSON.stringify(document.getElementById("b"+id)?.id))
  
  myTable1!.removeChild(document.getElementById("b"+id)!);
}
  showChangeRequest() {
    this.resetVisibility();
    this.isChangeRequest = true;
  }
 
  showIncident() {
 
    this.resetVisibility();
    this.isIncident = true;
 
  }
 

  showAbap(): void {
    this.isAbap = true;
    this.isPipo = false;
    this.isBasis = false;
  }

  showPipo(): void {
    this.isAbap = false;
    this.isPipo = true;
    this.isBasis = false;
  }

  showBasis(): void {
    this.isAbap = false;
    this.isPipo = false;
    this.isBasis = true;
  }

  showMyquote() {
    this.resetVisibility();
    this.ismyQuoteVisible = true;
  }
 




}
 