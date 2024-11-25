import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent {
  fileURL: string | null = null;
  fileType: string | null = null;
  maxFileSize = 5 * 1024 * 1024;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Check if file size exceeds the limit
      if (file.size > this.maxFileSize) {
        alert('File is too large. Maximum file size is 5MB.');
        return;
      }
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'pdf') {
        this.fileType = 'pdf';
        const reader = new FileReader();
        reader.onload = () => {
          this.fileURL = typeof reader.result === 'string' ? reader.result : null;
        };
        reader.readAsDataURL(file);
      } else if (fileExtension === 'docx') {
        this.fileType = 'docx';
        this.fileURL = URL.createObjectURL(file);
      } else {
        alert('Invalid file type. Only PDF or DOCX files are allowed.');
        this.fileURL = null;
        this.fileType = null;
      }
    }
  }
}
