import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads: any[];
  fileUploadsimages;

  // imagearray :any []
  // videoarray : any []
  newarray :any []
  videoarray: number[] = [];
  imagearray: number[] = [];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.videoarray= [];
      this.imagearray= [];
      this.fileUploads = fileUploads;
      console.log(this.fileUploads,'this.fileUploads')
      // this.fileUploadsimages = fileUploads[0].url;
for (let i = 0; i < this.fileUploads.length; i++) {
  const name =  fileUploads[i].name
 if( fileUploads[i].name.match(/mp4/g)) {
  this.videoarray.push( this.fileUploads[i])
  // console.log(this.videoarray,'this.videoarray')
 }
 else{
  this.imagearray.push( this.fileUploads[i])
  // console.log(this.imagearray,'this.imagearray')
 }   
}
    });
  }
}
