"use strict";
const _ = require('lodash');
const Entity = require('./Entity');
class Game {

	constructor(props) {
		super(props);
		if(!this.players) {
			this.players = [];
		}
	}
}

module.exports = Game;