import Backbone from 'backbone';
import _ from 'underscore';
import AlertModel from '../models/AlertModel';
import $ from 'jquery';

const dropdown = require('../templates/dropdown.handlebars');

class Filter extends Backbone.View {
    constructor() {
        super();
    }

    preinitialize(){
        let alert = new AlertModel();
        this.categories = alert.get("categories");
    }

    events(){
        return {
            "click .dropdown-item" : "handleFilterSelection"
        }
    }

    initialize(){
        _.bindAll(this, "handleFilterSelection");
        _.extend(this, Backbone.Events);
        this.render("Filter");
    }

    render(buttonText){
        this.$el.html(dropdown({buttonText: buttonText, categories: this.categories}));
        return this;
    }

    handleFilterSelection(e){
        let $element = $(e.target);
        if($element.hasClass("active")){
            this.$('.dropdown-item').removeClass("active");
            _.each(this.categories, (val) => {
                val.active = false;
            });
            this.render("Filter");
            this.trigger("off");
        } else {
            let filteredBy = $element.data("name");
            this.$('.dropdown-item').removeClass("active");
            _.each(this.categories, (val) => {
                val.active = false;
            });
            this.categories[filteredBy.toLowerCase()].active = true;
            this.render(filteredBy);
            this.trigger("filter", filteredBy.toLowerCase())
        }
    }
}

export default Filter;