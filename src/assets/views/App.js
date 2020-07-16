/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';

export default class App extends Backbone.View {
    constructor(){
        super();
        this.initialize();
    }

    initialize(){
        this.setElement("#root");
        this.render();
    }

    render(){
        this.$el.html("hello");
        return this;
    }
}