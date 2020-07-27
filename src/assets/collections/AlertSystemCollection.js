import Backbone from 'backbone';
import AlertModel from '../models/AlertModel';
import _ from 'underscore';


class AlertSystemCollection extends Backbone.Collection {
    preinitialize(){
        this.model = AlertModel;
    }
}

export default new AlertSystemCollection();