import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

import * as ArticleActions from '../../../interface/articles/store/articles.actions';
import * as fromArticle from '../../../interface/articles/store/articles.reducers';
import { Article } from '../../../interface/articles/article.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  fireBaseID: string;
  id: number;
  editMode = false;
  articleForm: FormGroup;
  imgURL: string;
  finalImage;
  editorVal: string;
  UploadImageLoading = false;
  userName: string;

  constructor(private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar,
    private store: Store<fromArticle.FeatureState>, private http: HttpClient) {
  }

  ngOnInit() {

    // -------------------------- Check URL then Fill The Form
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.store.select('Articles').subscribe(articles => {
            if (articles.Articles.length !== 0) {
              this.initForm();
            } else {
              this.initForm();
            }
          });
        }
      );
  }

  // --------------------------- Save Article
  onSubmit() {
    this.UploadImageLoading = true;
    if (this.finalImage || this.imgURL != null) {

      this.http.post('http://smartslimclinics.com/api/Articles', this.finalImage)
        .subscribe(res => {
          if (res) {
            const getUser = this.store.select('auth')
              .subscribe(user => {
                this.userName = user.user.name;
              });

            const ArticlesPath = 'http://smartslimclinics.com/assets/Articles/';
            let finalDate = formatDate(new Date(), 'dd-MMMM-yyyy hh:mm a', 'en');
            let lastImg: string;
            if (this.finalImage) {
              lastImg = ArticlesPath + this.finalImage.get('Image').name;
            } else {
              lastImg = this.imgURL;
              //console.log(this.finalImage);
            }

            const updateArticle: Article = {
              imageURL: lastImg,
              title: this.articleForm.value.title,
              description: this.articleForm.value.description,
              content: this.editorVal,
              dateTime: finalDate.toString(),
              author: this.userName,
              category: this.articleForm.value.category
            };

            if (this.editMode) {
              this.store.dispatch(new ArticleActions.EditArticle({ index: this.id, key: this.fireBaseID, value: updateArticle }));
              this.msg('CHANGES SAVED SUCCESSFULLY');
            } else {
              this.store.dispatch(new ArticleActions.AddArticle(updateArticle));
              this.msg('ARTICLE ADDED SUCCESSFULLY');

            }

            this.UploadImageLoading = false;
            this.onCancel();
          }
        });
    } else {
      this.msg('Please Choose Image');
      this.UploadImageLoading = false;
    }
  }

  // -----------------------Cancel Button and Clear Form
  onCancel() {
    this.router.navigateByUrl('/admin/articles');
  }

  // -------------------------------Popup Message
  msg(message) {
    this.snackBar.open(message, 'x', {
      duration: 4000,
    });
  }

  // ---------------------------------- Set Form Fields
  private initForm() {
    let title = '';
    let description = '';
    let category = 'Health';
    if (this.editMode) {
      this.store.select('Articles')
        .pipe(take(1))
        .subscribe((ArticleState: fromArticle.State) => {
          if (ArticleState.Articles.length !== 0) {
            const article = ArticleState.Articles[this.id];
            this.fireBaseID = article['key'];
            this.imgURL = article.imageURL;
            title = article.title;
            description = article.description;
            category = article.category;
            this.editorVal = article.content;
          }

        });
    }
    this.articleForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      category: new FormControl(category, Validators.required)
    });
  }

  // ----------------------Upload Image Component Results
  Image(image) {
    this.finalImage = image;
  }

  // ----------------------Get Image URL To Show it
  imgBase64(imgBase64) {
    this.imgURL = imgBase64;
  }


  // ----------------------Get Result Value From Editor Component
  editorValue(value) {
    this.editorVal = value;
  }
}
