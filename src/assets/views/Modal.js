import Backbone from 'backbone';
import _ from 'underscore';
import 'bootstrap';
import AlertModel from '../models/AlertModel'
import 'bootstrap-select';

const modalTemplate = require('../templates/modal.handlebars');


class Modal extends Backbone.View {
    constructor(){
        super();
    }

    preinitialize(){
        this.model = new AlertModel();
    }

    events(){
        return {
            "click #save" : "handleSubmitForm",
            "change #category" : "handleCategoryChange"
        }
    }

    attributes(){
        return {
            "class": "modal fade",
            "id":"alertModal",
            "data-backdrop": "static",
            "data-keyboard": false,
            "tabindex":"-1",
            "role":"dialog",
            "aria-labelledby":"staticBackdropLabel",
            "aria-hidden":"true"
        }
    }

    initialize(){
        _.bindAll(this, "showModal", "handleSubmitForm", "handleCategoryChange");
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

    handleSubmitForm(){
        this.model.set({content: this.$('#logText').val(), title: this.$('#category').val(), category: this.$('#category').val()});
        this.model.save();
        this.$el.modal("hide");
    }

    handleCategoryChange(e){
        let value = e.currentTarget.value;
        let options = this.model.get("categories");
        _.each(options, (category) => {
            category.selected = false;
        });
        let selectedCategory = options[value];
        selectedCategory.selected = true;
        this.model.set({
            categories: options,
            title: selectedCategory.name,
            icon: selectedCategory.icon,
            type: selectedCategory.type
        });
        this.render();
    }
}

export default new Modal();