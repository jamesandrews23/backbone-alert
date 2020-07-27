/**
 * Created by James on 7/17/2020.
 */
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
const navBarTemplate = require("../templates/navbar.handlebars");

export default class Navbar extends Backbone.View {
    constructor(){
        super();
    }

    events(){
        return {
            "click #addRecord":"handleAddRecord",
            "click #removeAllRecords":"handleRemoveAllRecords"
        }
    }

    initialize(){
        _.bindAll(this, "handleAddRecord");
        $.extend(this, Backbone.Events);
        this.render();
    }

    render(){
        this.$el.html(navBarTemplate());
        return this;
    }

    handleAddRecord(){
        this.trigger("addRecord");
    }

    handleRemoveAllRecords(){
        this.trigger("removeAllRecords");
    }
}