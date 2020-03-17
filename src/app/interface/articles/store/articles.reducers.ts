import * as fromApp from '../../../app.reducers';
import * as ArticlesActions from './articles.actions';
import {Article} from '../article.model';


export interface FeatureState extends fromApp.AppState {
  Articles: State,
}

export interface State {
  Articles: Article[];
}

const initialStates: State = {
  Articles: [],
};

export function articlesListReducer(state = initialStates, action: ArticlesActions.ArticlesActions): State {
  switch (action.type) {

    // -----------------------------------Get Articles From DB and Set It
    case ArticlesActions.SET_ARTICLES:
      return {
        ...state,
        Articles: [...action.payload]
      };

    // -----------------------------------Add New Article
    case ArticlesActions.ADD_ARTICLE:
      return {
        ...state,
        Articles: [...state.Articles, action.payload]
      };

    // -----------------------------------Edit Article Local And in DB
    case (ArticlesActions.EDIT_ARTICLE):
      const article = state.Articles[action.payload.index];
      const UpdatedItem = {
        ...article,
        ...action.payload.value
      };
      const articles = [...state.Articles];
      articles[action.payload.index] = UpdatedItem;
      console.log(articles);
      return {
        ...state,
        Articles: articles
      };

    // -----------------------------------Delete Article
    case (ArticlesActions.DELETE_ARTICLE):
      const oldArticles = [...state.Articles];
      oldArticles.splice(action.payload.index, 1);
      return {
        ...state,
        Articles: oldArticles
      };

    default:
      return state;
  }

}
