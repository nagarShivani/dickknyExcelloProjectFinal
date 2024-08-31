export class FileUpload {
  $key: string | undefined;
  file: File;
  name: string | undefined;
  url: string | undefined;
  progress: number | undefined;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
