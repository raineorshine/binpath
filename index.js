'use strict';
var path = require('path');

module.exports = function(name){

	// read the project package.json
	var pkg = require('./package.json');

	// make sure that the specified module exists
	var hasDep = pkg.dependencies && pkg.dependencies[name];
	var hasDevDep = pkg.devDependencies && pkg.devDependencies[name];
  if(!hasDep && !hasDevDep) {
    throw new Error('Requested module "' + name + '" not installed in dependencies or devDependencies.');
  }

  // get the bin path from the module's package.json
	var bin = require(name + '/package').bin;

	// make sure there is exactly one executable
	if(Object.keys(bin).length === 0) {
    throw new Error('Requested module "' + name + '" does not have a binary executable listed in its package.json.');
	}
	else if(Object.keys(bin).length > 1) {
    console.log('WARNING: Requested module "' + name + '" has more than 1 binary executable so I\'m going to return the first one. Returning others is not currently implemented.');
		console.log(bin);
	}

	// return the path of the first binary
  return path.join(__dirname, 'node_modules', name, bin[Object.keys(bin)[0]]);
};
