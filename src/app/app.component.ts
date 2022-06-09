import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ViewChild: The change detector looks for the first element or the directive matching the selector in the view DOM.
  // If the view DOM changes, and a new child matches the selector, the property is updated.
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  title = 'my-gridapp';

  // ag grid grouping
  // row group 


  columnDefs = [
    { 
      headerName: 'Make', 
      field: 'make',
      rowGroup: true, 
      resizable: true ,
      wrapText: true, 
      cellStyle : {
        backgroundColor: 'skyblue'
      }
    },
     { 
     field: 'price',  
     cellClass: (params: { value: string; }) => {
      return params.value === '72000' ? 'green' : 'red';
  },
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  autoGroupColumnDef = {
    headerName: "Model",
    field: "model",
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams:{
      checkbox: true
    }
  }
 
  // columnDefs = [
  //   { headerName: 'Makefsfs', field: 'make', sortable: true ,filter:true, checkboxSelection:true, wrapText:true},
  //   { headerName: 'Modelsfsfsfsfsf', field: 'model',sortable: true ,filter:true},
  //   { headerName: 'Pricesfffffffffffdssere', field: 'price', sortable: true ,filter:true},
  //   // { headerName: 'Company', field: 'company',sortable: true ,filter:true , checkboxSelection:true}
  // ];


  rowData : any;

//   rowData = [
//     { make: 'Toyota random words', model: 'Celica', price: 35000},
//     { make: 'Ford is nwe model  for the making of new car', model: 'Mondeo', price: 32000},
//     { make: 'Porsche', model: 'Boxster gdsggsdgsgsggserterfsdg', price: 72000 }
// ];
  constructor(private http: HttpClient){
   
  }

//   columnDefs: ColDef[] = [
//     { field: 'make' , resizable: true, wrapText: true, autoHeight: true,},
//     { field: 'model', resizable: true },
//     { field: 'price' , resizable: true}
// ];



  ngOnInit(){
    this.rowData = this.http.get('https://www.ag-grid.com/example-assets/row-data.json');
  }

  getSelectedRows(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node=> node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + " " + node.model).join(",");
    alert(`Selected Nodes: ${selectedDataStringPresentation}`);
  }
}
