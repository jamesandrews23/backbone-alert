/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';
import AlertElement from './AlertElement';
import Navbar from './Navbar';

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
        let navBar = new Navbar().el;
        let alert = new AlertElement().el;

        this.$el.append(navBar);
        this.$el.append('<div class="container"></div>');
        this.$('.container').append(alert);
        return this;
    }
}