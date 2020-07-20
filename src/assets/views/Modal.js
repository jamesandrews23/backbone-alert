import Backbone from 'backbone';
import _ from 'underscore';
import 'bootstrap';
import AlertModel from '../models/AlertModel'

const modalTemplate = require('../templates/modal.handlebars');


class Modal extends Backbone.View {
    constructor(){
        super();
    }

    preinitialize(){
        this.model = new AlertModel();
    }

    attributes(){
        return {
            class: "modal fade",
            id:"alertModal",
            "data-backdrop": "static",
            "data-keyboard": false,
            tabindex:"-1",
            role:"dialog",
            "aria-labelledby":"staticBackdropLabel",
            "aria-hidden":"true"
        }
    }

    initialize(){
        _.bindAll(this, "showModal");
        this.render();
    }

    render(){
        this.$el.html(modalTemplate(this.model.attributes));
        this.$el.modal({show: false});
        return this;
    }

    showModal(model){
        this.model = model;
        this.render();
        this.$el.modal("show");
    }
}

export default new Modal();