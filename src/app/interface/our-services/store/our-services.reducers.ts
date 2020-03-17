import * as fromApp from '../../../app.reducers';
import * as ServicesActions from './our-services.actions';
import {OurServices} from '../our-services.model';


export interface FeatureState extends fromApp.AppState {
  Services: State,
}

export interface State {
  Services: OurServices[];
}

const initialStates: State = {
  Services: [],
};

export function ServicesListReducer(state = initialStates, action: ServicesActions.ServicesActions): State {
  switch (action.type) {

    // -----------------------------------Get Services From DB and Set It
    case ServicesActions.SET_SERVICES:
      return {
        ...state,
        Services: [...action.payload]
      };

    // -----------------------------------Add New Service
    case ServicesActions.ADD_SERVICE:
      return {
        ...state,
        Services: [...state.Services, action.payload]
      };

    // -----------------------------------Edit Service Local And in DB
    case (ServicesActions.EDIT_SERVICE):
      const Service = state.Services[action.payload.index];
      const UpdatedItem = {
        ...Service,
        ...action.payload.value
      };
      const Services = [...state.Services];
      Services[action.payload.index] = UpdatedItem;
      console.log(Services);
      return {
        ...state,
        Services: Services
      };

    // -----------------------------------Delete Service
    case (ServicesActions.DELETE_SERVICE):
      const oldServices = [...state.Services];
      oldServices.splice(action.payload.index, 1);
      return {
        ...state,
        Services: oldServices
      };

    default:
      return state;
  }

}
