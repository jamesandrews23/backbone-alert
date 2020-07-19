/**
 * Created by James on 7/18/2020.
 */
import Backbone from 'backbone';

export default class AlertModel extends Backbone.Model {
    constructor(category, content, title){
        super();
        this.category = category;
        this.content = content;
        this.title = title;
    }
}