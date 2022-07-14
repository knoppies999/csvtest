

    import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';  
import { TestBed } from '@angular/core/testing';
    import { CSVRecord } from './CSV';  
      
    @Component({  
      selector: 'app-root',  
      templateUrl: './app.component.html',  
      styleUrls: ['./app.component.css']  
    })  
      
    export class AppComponent {  
      title = 'test';  

      public records: any[] = [];  
      public recordCount = 0;
      public currRecord: any[] = [];
      public currentArray = [];
      public selected: any[] = [];
      
        private Postion1 = 0;
        private Postion2 = 0;
        private Postion3 = 0;
        private Postion4 = 0;
        private Postion5 = 0;
        
      private csvFile: any[] = [];
        
      @ViewChild('csvReader') csvReader: any;  
      
      uploadListener($event: any): void {  
      
        let text = [];  
        let files = $event.srcElement.files;  
      
        if (this.isValidCSVFile(files[0])) {  
      
          let input = $event.target;  
          let reader = new FileReader();  
          reader.readAsText(input.files[0]);  
      
          reader.onload = () => {  
            let csvData = reader.result;  
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  //the whole csv file in text form split by operator
            this.csvFile = csvRecordsArray;
             let headersRow = this.getHeaderArray(csvRecordsArray);  
             let currentRecord = this.getcurrentArray(csvRecordsArray);

         
          };  
      
          reader.onerror = function () {  
            console.log('Could not read file');  
          };  
      
        } else {  
          alert("csv file is invalid");  
          this.fileReset();  
        }  
      }  

      currentRecord(i : any)
      {
       let f = this.currRecord[i];
       f = 5;
        return f;
      }


      getarr(i : any)
      {

      }
      getcurrentArray(csvRecordsArr: any) {
        let currentArray = [];  
       
          let headers = (<string>csvRecordsArr[1]).split(',');  
          
        
         

        for (let j = 0; j < headers.length; j++) {  
          
          currentArray.push(headers[j]);  
          this.currRecord[j] = headers[j];
        }  
          
        
        
        return currentArray;  
      }  
      createRange(number: any) 
      { 
        
        return new Array(number); 
      
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
      
      onSelected(value:string, i:any): void
      {
        
        this.selected[i] = value;
        
      }
      
    verifyUpload()
    {
        
        let duplicate1 = 0; //employee
        let duplicate2 = 0; //Inititives
        let duplicate3 = 0; //TimePeriod
        let duplicate4 = 0; //Hours allocated
        let duplicate5 = 0; //Percentage allocated

        

      for (let index = 0; index < this.recordCount; index++) {
        
        if (this.selected[index] == 1) {
          duplicate1++;
          this.Postion1 = index;
        }
        if (this.selected[index] == 2) {
          duplicate2 ++;
          this.Postion2 = index;
        }
        if (this.selected[index] == 3) {
          duplicate3 ++;
          this.Postion3 = index;
        }
        if (this.selected[index] == 4) {
          duplicate4 ++;
          this.Postion4 = index;
        }
        if (this.selected[index] == 5) {
          duplicate5 ++;
          this.Postion5 = index;
        }

        
        
      }

      if (duplicate1 == 1 && duplicate2 == 1 && duplicate3 == 1 && duplicate4 == 1 && duplicate5 == 1) {
        
         this.Map(this.csvFile, this.recordCount); 
      }
      else
      {
        //add error message here, there are dupicates or not all the fields have been mapped
        if (duplicate1 > 1 || duplicate2 > 1 || duplicate3 > 1 ||duplicate4 > 1 ||duplicate5 > 1) {
          return null;
            //add error message here, there are dupicates
        }
        else
        {
          return null;
          //add error message here, not all the fields have been mapped
        }
      }
      
      return null;
    }

    Map(csvRecordsArray: any, headerLength: any) :void
    {
     
      let csvArr = [];  
        for (let i = 0; i < csvRecordsArray.length; i++) {  
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
         
           if (curruntRecord.length == headerLength) {   
             let csvRecord: CSVRecord = new CSVRecord();  
            
         
              
             csvRecord.Employee = curruntRecord[this.Postion1].trim();  
             csvRecord.Initiative = curruntRecord[this.Postion2].trim();  
             csvRecord.Time_period = curruntRecord[this.Postion3].trim(); 
             csvRecord.Hours_allocated = curruntRecord[this.Postion4].trim(); 
             csvRecord.percentageAllocated = curruntRecord[this.Postion5].trim(); 
            

            
             
             console.log(csvRecord);
             
            
        }  
        
      }  
       
    }

    }  

    

