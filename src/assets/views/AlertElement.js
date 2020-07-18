import Backbone from 'backbone';
import $ from 'jquery';
const logTemplate = require("../templates/log.handlebars");

export default class AlertElement extends Backbone.View {
    constructor(){
        super();
    }

    attributes(){
        return {
            "class":"alert alert-custom alert-secondary alert-dismissible fade show",
            "role":"alert",
            "data-toggle":"modal",
            "data-target": "#staticBackdrop"
        }
    }

    events(){
        return {
            "click" : "handleClick"
        }
    }

    initialize(){
        this.render();
    }

    render(){
        this.$el.html(logTemplate());
        return this;
    }

    handleClick(e){
        $('#alertModal').modal('show');
    }
}