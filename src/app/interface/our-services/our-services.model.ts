export class OurServices {
  public imageURL: string;
  public title: string;
  public description: string;
  public content: string;
  public dateTime: string;
  public author: string;
  public category: string;

  constructor(imageURL: string,
    title: string,
    description: string,
    content: string,
    dateTime: string,
    author: string,
    category: string) 
    {
    this.imageURL = imageURL;
    this.title = title;
    this.description = description;
    this.content = content;
    this.dateTime = dateTime;
    this.author = author;
    this.category= category;
  }
}

/*export interface Article {
  imageURL: string;
  title: string;
  description: string;
  content: string;
  dateTime: string
}*/
