/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';
import '../util/BackboneSync';
import AlertElement from './AlertElement';
import AlertModel from '../models/AlertModel';
import Navbar from './Navbar';
import _ from 'underscore';
import Modal from './Modal';
import AlertSystemCollection from '../collections/AlertSystemCollection';
import {retrieveAlerts} from '../util/BackboneSync';

const alertModal = require("../templates/modal.handlebars");

export default class App extends Backbone.View {
    constructor(){
        super();
    }

    preinitialize(){
        this.navBar = new Navbar();
        this.collection = AlertSystemCollection;
        this.collection.fetch();
        this.filteredCollection = [];
    }

    initialize(){
        _.bindAll(this, "addRecord", "removeAllRecords", "search", "filterRecords", "filterOff");
        this.setElement("#root");
        this.listenTo(this.navBar, "addRecord", this.addRecord);
        this.listenTo(this.navBar, "removeAllRecords", this.removeAllRecords);
        this.listenTo(this.navBar, "search", this.search);
        this.listenTo(this.navBar, "filter", this.filterRecords);
        this.listenTo(this.navBar, "filter:off", this.filterOff);
        this.listenTo(this.collection, "reset add remove change", this.render);
        this.$el.append(this.navBar.el);
        this.$el.append('<div class="container"></div>');
        this.$el.append(Modal.el);

        this.render();
    }

    render(){
        let views = this.collection.map(function(model){ return new AlertElement({model: model}) }) || [];
        let fragment = document.createDocumentFragment();
        for(const view of views){
            fragment.appendChild(view.el);
        }
        this.$('.container').html(fragment);

        return this;
    }

    addRecord(){
        let addedAlert = new AlertModel();
        addedAlert.save();
        this.collection.add(addedAlert);
    }

    removeAllRecords(){
        this.collection.sync("delete", this.collection);
    }

    search(searchValue){
        if(searchValue && searchValue.length > 3){
            let searchResult = this.collection.filter((model) => {
                let content = model.get("content");
                if(!content) return false;
                return content.match(new RegExp(searchValue, 'gi')) !== null;
            });

            if(searchResult.length > 0)
                this.collection.reset(searchResult);
        } else {
            if(this.filteredCollection.length > 0){
                this.collection.set(this.filteredCollection);
            } else {
                this.collection.fetch();
            }
        }
    }

    filterRecords(filteredBy){
        let storedRecords = retrieveAlerts();
        let filteredCollection = _.where(storedRecords, {category: filteredBy});
        if(filteredCollection){
            this.filteredCollection = filteredCollection;
            this.collection.reset(filteredCollection);
        }
    }

    filterOff(){
        this.filteredCollection = [];
        this.collection.fetch();
    }
}