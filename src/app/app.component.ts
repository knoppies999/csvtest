

    import { Component, ViewChild } from '@angular/core';  
    import { CSVRecord } from './CSV';  
      
    @Component({  
      selector: 'app-root',  
      templateUrl: './app.component.html',  
      styleUrls: ['./app.component.css']  
    })  
      
    export class AppComponent {  
      title = 'test';  
      
      public records: any[] = [];  
      public recordCount =0;
      @ViewChild('csvReader') csvReader: any;  
      
      uploadListener($event: any): void {  
      
        let text = [];  
        let files = $event.srcElement.files;  
      
        if (this.isValidCSVFile(files[0])) {  //can use multiple files if you use a for loop here I think?
      
          let input = $event.target;  
          let reader = new FileReader();  
          reader.readAsText(input.files[0]);  
      
          reader.onload = () => {  
            let csvData = reader.result;  
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  //the whole csv file in text form split by operator
            
             let headersRow = this.getHeaderArray(csvRecordsArray);  
      
            this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
          };  
      
          reader.onerror = function () {  
            console.log('Could not read file');  
          };  
      
        } else {  
          alert("csv file is invalid");  
          this.fileReset();  
        }  
      }  
      
      getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
        let csvArr = [];  
      
        for (let i = 0; i < csvRecordsArray.length; i++) {  //will iterate through the entire csv file
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');  //this array contains a line of a csv file 
          if (curruntRecord.length == headerLength) {   
            let csvRecord: CSVRecord = new CSVRecord();  
            
              //we just need them to map which is which, eg: if employee = position 3 in csv then we plug it in 
              
            csvRecord.Employee = curruntRecord[].trim();  //in the [] add mapping of employee in relation to line in csv, eg: if its the 3rd item index is 2
            csvRecord.Initiative = curruntRecord[].trim();  
            csvRecord.Time_period = curruntRecord[].trim(); 
            csvRecord.Hours_allocated = curruntRecord[].trim(); 
            csvRecord.percentageAllocated = curruntRecord[].trim(); 
            

            //we can consider pushing the whole array rather than trimming it here, just seperate and decide after
            //we can have an array which checks headers of csv, eg : name surname dob gender etc
            //send 2 things to c# backend, Header + raw array
            //Proccess array allowing you to get only data you want eg: If header == "Name"
            //  {find names position in its array, then iterate through csv finding all names (they will have the same position as the header)}
            // do data handling, eg if name in db etc
            //can do data handling on frontend the same way all except for database querys 
            
            csvArr.push(csvRecord);  
          }  
        }  
        return csvArr;  
      }  
      
      isValidCSVFile(file: any) {  
        return file.name.endsWith(".csv");  
      }  
      
       getHeaderArray(csvRecordsArr: any) {  
         let headers = (<string>csvRecordsArr[0]).split(',');  
         let headerArray = [];  
         for (let j = 0; j < headers.length; j++) {  
           this.recordCount++;
           headerArray.push(headers[j]);  
         }  
         return headerArray;  
       }  
      
      fileReset() {  
        this.csvReader.nativeElement.value = "";  
        this.records = [];  
      }  
    }  

