/**
 * Created by James on 7/17/2020.
 */
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Filter from './Filter';
const navBarTemplate = require("../templates/navbar.handlebars");

export default class Navbar extends Backbone.View {
    constructor(){
        super();
    }

    events(){
        return {
            "click #addRecord":"handleAddRecord",
            "click #removeAllRecords":"handleRemoveAllRecords",
            "input #searchValue" : "runSearch"
        }
    }

    initialize(){
        _.bindAll(this, "handleAddRecord", "runSearch");
        $.extend(this, Backbone.Events);
        this.filter = new Filter();
        this.listenTo(this.filter, "filter", this.handleFilterEvent);
        this.listenTo(this.filter, "off", this.handleFilterOff);
        this.render();
    }

    render(){
        this.$el.html(navBarTemplate());
        this.$('#filter').append(this.filter.el);
        return this;
    }

    handleAddRecord(){
        this.trigger("addRecord");
    }

    handleRemoveAllRecords(){
        this.trigger("removeAllRecords");
    }

    runSearch(e){
        this.trigger("search", e.target.value);
    }

    handleFilterEvent(value){
        this.trigger("filter", value);
    }

    handleFilterOff(){
        this.trigger("filter:off")
    }
}