'use strict';
/*!
 * Renderer
 */

/**
 * Module Dependencies
 */
var Renderer,
    diff = require('virtual-dom/diff'),
    patch = require('virtual-dom/patch'),
    createElement = require('virtual-dom/create-element'),
    virtualize = require('vdom-virtualize');

Renderer = function (rootNode) {
  var self = {},
      tree,
      rootNode,
      newTree,
      patches;

  self.render = function (newTree) {
    if (!tree) {
      tree = virtualize(rootNode);
    };
    patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
  };

  return self;
};

/**
 * Module Exports
 */
exports = module.exports = Renderer;
