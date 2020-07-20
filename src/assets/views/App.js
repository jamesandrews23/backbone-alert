/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';
import AlertElement from './AlertElement';
import Navbar from './Navbar';
import _ from 'underscore';
import Modal from './Modal';
import AlertSystemCollection from '../collections/AlertSystemCollection';

const alertModal = require("../templates/modal.handlebars");

export default class App extends Backbone.View {
    constructor(){
        super();
    }

    preinitialize(){
        this.navBar = new Navbar();
        this.collection = AlertSystemCollection;
        this.collection.fetch();
    }

    initialize(){
        _.bindAll(this, "addRecord");
        this.setElement("#root");
        this.listenTo(this.navBar, "addRecord", this.addRecord);
        this.render();
    }

    render(){
        this.$el.append(this.navBar.el);
        this.$el.append('<div class="container"></div>');

        if(this.collection.size() > 0){
            let views = this.collection.map(function(model){ return new AlertElement({model: model}) }) || [];
            for(var i=0; i < views.length; i++){
                this.$('.container').append(views[i].el);
            }
        }

        this.$el.append(Modal.el);
        return this;
    }

    addRecord(){
        let alert = new AlertElement();
        this.collection.add(alert.model);
        this.collection.sync();
        this.$('.container').append(alert.el);
    }
}