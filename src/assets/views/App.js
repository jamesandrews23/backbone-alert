/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';
import AlertElement from './AlertElement';

const appTemplate = require("../templates/app.handlebars");

export default class App extends Backbone.View {
    constructor(){
        super();
    }

    initialize(){
        this.setElement("#root");
        this.render();
    }

    render(){
        this.$el.html(`<div class="container">${new AlertElement().el}</div>`);
        return this;
    }
}