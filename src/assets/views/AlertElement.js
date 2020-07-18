import Backbone from 'backbone';
const logTemplate = require("../templates/log.handlebars");

export default class AlertElement extends Backbone.View {
    constructor(){
        super();
    }

    attributes(){
        return {
            class:"alert alert-secondary alert-dismissible fade show",
            role:"alert"
        }
    }

    events(){
        return {

        }
    }

    initialize(){
        this.render();
    }

    render(){
        this.$el.html(logTemplate());
        return this;
    }
}